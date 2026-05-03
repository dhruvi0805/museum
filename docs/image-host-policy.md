# Image host policy (Museum Chronology)

## Problem

`next/image` normally serves remote images through Next.js image optimization (`/_next/image?url=…`). Wikimedia Foundation hosts often **reject or throttle** those server-side fetches, while the **same URL works** when loaded directly in the browser.

Symptoms: broken images and visible `alt` text.

## What we do

- **Hero carousel and artwork grids** use `<Image>` with **`unoptimized`** so the browser loads `upload.wikimedia.org` / `en.wikipedia.org` URLs directly, matching static `<img>` behavior.
- **`referrerPolicy="no-referrer"`** is set on those images to avoid referrer-based blocking on some CDNs.

## Configuration

- Allowed remote hosts remain listed in [`next.config.mjs`](../next.config.mjs) under `images.remotePatterns` for any future optimized images.
- Canonical era data: [`content/eras.json`](../content/eras.json) (synced to static [`src/data/data.js`](../src/data/data.js) via `npm run build:data` when you use that pipeline).

## Verification

```bash
npm run check-images
```

This runs [`scripts/check-era-image-urls.cjs`](../scripts/check-era-image-urls.cjs), which issues small `GET` requests (with an optional full `GET` fallback if the ranged request returns `400`) and paces calls (~850ms apart). **Wikimedia may return `429`**; the script lists those separately and **exits 0 if every problem was only 429** (rate limit, not a bad URL). A **404** (or persistent non-429 error) means fix the path in [`scripts/eras-data.cjs`](../scripts/eras-data.cjs) and run `npm run build:data`.

Some thumb URLs that differ only by width (`1280px` vs `1024px`) can produce **400** in checks even when the browser loads the image; the audit is best-effort.

## Optional hardening

- Mirror critical assets under `public/movements/<slug>/` and register paths in [`src/lib/movementBanner.ts`](../src/lib/movementBanner.ts) (`movementBannerLocalBySlug`) for fully offline or zero-external reliance.
