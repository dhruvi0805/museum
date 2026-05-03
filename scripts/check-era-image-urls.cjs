/**
 * HTTP check for every bgImage and artwork imageUrl in content/eras.json.
 * Run: node scripts/check-era-image-urls.cjs
 *
 * Uses GET with Range: bytes=0-0 (tiny payload) because Wikimedia often returns
 * 400 to HEAD on thumb URLs. Throttles requests to avoid 429 rate limits.
 */

const fs = require("fs");
const path = require("path");

const JSON_PATH = path.join(__dirname, "..", "content", "eras.json");
const DELAY_MS = 850;
const TIMEOUT_MS = 25000;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function drainResponseBody(res) {
  try {
    await res.body?.cancel?.();
  } catch {
    /* ignore */
  }
}

const UA = "MuseumChronologyImageAudit/1.0 (educational; +local-dev)";

async function fetchProbe(url, useRange) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const headers = { "User-Agent": UA };
    if (useRange) headers.Range = "bytes=0-0";
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers,
    });
    clearTimeout(timer);
    await drainResponseBody(res);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

async function checkUrl(url) {
  try {
    let res = await fetchProbe(url, true);
    let ok = res.status === 200 || res.status === 206;
    if (!ok && res.status === 400) {
      res = await fetchProbe(url, false);
      ok = res.ok;
    }
    if (ok) {
      return { ok: true, status: res.status, url, rateLimited: false };
    }
    if (res.status === 429) {
      await sleep(3000);
      res = await fetchProbe(url, true);
      ok = res.status === 200 || res.status === 206;
      if (!ok && res.status === 400) {
        res = await fetchProbe(url, false);
        ok = res.ok;
      }
      if (ok) {
        return { ok: true, status: res.status, url, rateLimited: false };
      }
      if (res.status === 429) {
        return { ok: false, status: 429, url, rateLimited: true };
      }
    }
    return { ok: false, status: res.status, url, rateLimited: res.status === 429 };
  } catch (e) {
    return { ok: false, status: 0, url, error: e.message, rateLimited: false };
  }
}

function collectUrls(eras) {
  const out = [];
  for (const era of eras) {
    if (era.bgImage) out.push({ ref: `${era.slug} bgImage`, url: era.bgImage });
    for (const work of era.artworks || []) {
      if (work.imageUrl) {
        out.push({ ref: `${era.slug} / ${work.title}`, url: work.imageUrl });
      }
    }
  }
  return out;
}

async function main() {
  const raw = fs.readFileSync(JSON_PATH, "utf8");
  const data = JSON.parse(raw);
  const eras = data.eras || [];
  const entries = collectUrls(eras);
  const unique = new Map();
  for (const e of entries) {
    if (!unique.has(e.url)) unique.set(e.url, []);
    unique.get(e.url).push(e.ref);
  }

  console.log(`Checking ${unique.size} unique URLs (${entries.length} references)…\n`);

  const failures = [];
  let i = 0;
  for (const [url, refs] of unique) {
    i += 1;
    process.stdout.write(`[${i}/${unique.size}] ${url.slice(0, 72)}… `);
    const result = await checkUrl(url);
    if (result.ok) {
      console.log(result.status);
    } else {
      console.log("FAIL", result.status, result.error || "");
      failures.push({ url, refs, ...result });
    }
    await sleep(DELAY_MS);
  }

  const rateLimited = failures.filter((f) => f.rateLimited || f.status === 429);
  const hardFails = failures.filter((f) => !f.rateLimited && f.status !== 429);

  if (rateLimited.length > 0) {
    console.log(
      `\n${rateLimited.length} URL(s) hit HTTP 429 (Wikimedia rate limit). Re-run later or increase DELAY_MS; this does not mean the URL is wrong in the app.\n`,
    );
    for (const f of rateLimited) {
      console.log(`  (429) ${f.url}`);
    }
  }

  if (hardFails.length === 0) {
    console.log(
      rateLimited.length
        ? "\nNo definite broken URLs (only rate limits). Exit 0."
        : "\nAll URLs returned OK.",
    );
    process.exit(0);
  }

  console.log(`\n${hardFails.length} URL(s) need fixing (non-429):\n`);
  for (const f of hardFails) {
    console.log(f.url);
    console.log(`  refs: ${f.refs.join("; ")}`);
    console.log(`  status: ${f.status} ${f.error || ""}\n`);
  }
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
