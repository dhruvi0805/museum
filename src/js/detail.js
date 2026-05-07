const params = new URLSearchParams(window.location.search);
const slug = params.get("era");

const detailContent = document.getElementById("detailContent");

function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function artistBlurb(era, work) {
  if (work.artistId && era.artists && era.artists[work.artistId]) {
    return era.artists[work.artistId].blurb;
  }
  return `${work.artist} worked within the visual world of ${era.title}, leaving a mark on how we read art from ${work.date}.`;
}

/** Banner slides: artwork images with fallback to era bgImage. */
function buildBannerSlides(era) {
  const works = era.artworks || [];
  if (works.length === 0) {
    return [{ src: era.bgImage, alt: `${era.title} — era image` }];
  }
  return works.map((w) => ({
    src: w.imageUrl,
    alt: `${w.title} by ${w.artist}`,
  }));
}

/**
 * Cinematic fade carousel — auto-rotating, no arrows.
 * Pauses on hover / focus-in, resumes on leave.
 * Respects prefers-reduced-motion.
 */
function initDetailHeroCarousel(region, slides) {
  if (!region || slides.length === 0) return;

  const slideEls = region.querySelectorAll(".detail-hero-slide");
  const dotsWrap = region.querySelector(".detail-hero-carousel-dots");

  let index = 0;
  const count = slides.length;
  const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduceMotion = mqReduce.matches;
  mqReduce.addEventListener("change", () => { reduceMotion = mqReduce.matches; });

  let autoplayTimer = null;

  function syncSlides() {
    slideEls.forEach((el, i) => el.classList.toggle("is-active", i === index));
  }

  function syncDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll(".detail-carousel-dot").forEach((btn, i) => {
      const active = i === index;
      btn.classList.toggle("is-selected", active);
      btn.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function goTo(nextIndex) {
    index = ((nextIndex % count) + count) % count;
    syncSlides();
    syncDots();
  }

  function go(delta) {
    goTo(index + delta);
  }

  function startAutoplay() {
    if (count < 2 || reduceMotion || autoplayTimer) return;
    autoplayTimer = setInterval(() => go(1), 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  syncSlides();
  syncDots();
  startAutoplay();

  region.addEventListener("mouseenter", stopAutoplay);
  region.addEventListener("mouseleave", startAutoplay);
  region.addEventListener("focusin", stopAutoplay);
  region.addEventListener("focusout", startAutoplay);

  dotsWrap?.querySelectorAll(".detail-carousel-dot").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-slide-index"));
      if (!Number.isNaN(i)) {
        stopAutoplay();
        goTo(i);
        startAutoplay();
      }
    });
  });

  let touchStartX = null;
  region.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0]?.clientX ?? null;
  }, { passive: true });
  region.addEventListener("touchend", (e) => {
    const start = touchStartX;
    touchStartX = null;
    if (start == null || count < 2) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const dx = end - start;
    if (Math.abs(dx) < 40) return;
    stopAutoplay();
    go(dx < 0 ? 1 : -1);
    startAutoplay();
  });

  region.addEventListener("keydown", (e) => {
    if (count < 2) return;
    const actions = {
      ArrowLeft: () => go(-1),
      ArrowRight: () => go(1),
      Home: () => goTo(0),
      End: () => goTo(count - 1),
    };
    if (actions[e.key]) {
      e.preventDefault();
      stopAutoplay();
      actions[e.key]();
      startAutoplay();
    }
  });
}

/**
 * Left artwork timeline navigation.
 * Builds dots for each artwork card, tracks scroll via IntersectionObserver,
 * and smooth-scrolls on dot click.
 */
function buildArtworkTimeline(artworks) {
  const nav = document.getElementById("artworkTimeline");
  const dotsContainer = document.getElementById("timelineDots");
  if (!nav || !dotsContainer || artworks.length === 0) return;

  const cards = Array.from(document.querySelectorAll(".detail-artwork-card"));
  if (cards.length === 0) return;

  cards.forEach((card, i) => {
    card.id = `artwork-${i}`;
    card.dataset.artworkIndex = i;
  });

  artworks.forEach((work, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tl-dot";
    btn.dataset.idx = i;
    btn.setAttribute("aria-label", `Go to: ${work.title}`);

    const tooltip = document.createElement("span");
    tooltip.className = "tl-tooltip";
    tooltip.textContent = work.title;
    tooltip.setAttribute("aria-hidden", "true");
    btn.appendChild(tooltip);

    btn.addEventListener("click", () => {
      const target = document.getElementById(`artwork-${i}`);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });

    dotsContainer.appendChild(btn);
  });

  nav.removeAttribute("hidden");

  const dotBtns = Array.from(dotsContainer.querySelectorAll(".tl-dot"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.artworkIndex);
          dotBtns.forEach((d, i) => d.classList.toggle("is-active", i === idx));
        }
      });
    },
    { threshold: 0.45 }
  );

  cards.forEach((card) => observer.observe(card));
}

/** Back to top — reveals after 600px scroll, uses Lenis for smooth animation. */
function initBackToTop() {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("is-visible", window.scrollY > 600),
    { passive: true }
  );

  btn.addEventListener("click", () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/* ─── Main render ──────────────────────────────────────────────────────────── */

const era = museumData.find((d) => d.slug === slug);

if (!era) {
  detailContent.innerHTML = `
    <div class="detail-not-found">
      <p class="not-found-code">404</p>
      <p class="not-found-msg">Era not found.</p>
      <a href="index.html" class="learn-more-btn">← Return to Timeline</a>
    </div>
  `;
  document.title = "Not Found — Museum Chronology";
} else {
  document.title = `${era.title} — Museum Chronology`;

  const index = museumData.indexOf(era);
  const labelNum = String(index + 1).padStart(2, "0");

  const prev = museumData[index - 1];
  const next = museumData[index + 1];

  const prevHTML = prev
    ? `<a href="detail.html?era=${escapeHtml(prev.slug)}" class="pagination-link">
        <span class="pag-dir">← Previous</span>
        <span class="pag-name">${escapeHtml(prev.title)}</span>
       </a>`
    : `<span class="pagination-link disabled">—</span>`;

  const nextHTML = next
    ? `<a href="detail.html?era=${escapeHtml(next.slug)}" class="pagination-link">
        <span class="pag-dir">Next →</span>
        <span class="pag-name">${escapeHtml(next.title)}</span>
       </a>`
    : `<span class="pagination-link disabled">—</span>`;

  const artworksHtml = (era.artworks || [])
    .map((work, i) => {
      const feats = (work.keyFeatures || [])
        .map((f) => `<li class="detail-feature-tag">${escapeHtml(f)}</li>`)
        .join("");
      const blurb = artistBlurb(era, work);
      return `
      <article class="detail-artwork-card fade-target visible">
        <div class="detail-artwork-frame">
          <img
            class="detail-artwork-img"
            src="${escapeHtml(work.imageUrl)}"
            alt="${escapeHtml(work.title)} by ${escapeHtml(work.artist)}"
            width="1200"
            height="900"
            loading="${i < 2 ? "eager" : "lazy"}"
            decoding="async"
          />
        </div>
        <div class="detail-artwork-glass">
          <h3 class="detail-artwork-title">${escapeHtml(work.title)}</h3>
          <p class="detail-artwork-meta">${escapeHtml(work.artist)} · ${escapeHtml(work.date)}</p>
          <ul class="detail-feature-list">${feats}</ul>
          <p class="detail-artwork-blurb">${escapeHtml(work.workBlurb)}</p>
          <p class="detail-artist-note">
            <span class="detail-artist-label">About the artist</span><br />
            ${escapeHtml(blurb)}
          </p>
          <p class="detail-art-attribution">
            ${escapeHtml(work.attribution.creditLine)} · ${escapeHtml(work.attribution.license)}
          </p>
          <a class="detail-source-link" href="${escapeHtml(work.attribution.sourceUrl)}" target="_blank" rel="noopener noreferrer">View source</a>
        </div>
      </article>`;
    })
    .join("");

  const bannerSlides = buildBannerSlides(era);

  const slidesHtml = bannerSlides
    .map(
      (s, i) => `
    <div class="detail-hero-slide${i === 0 ? " is-active" : ""}">
      <img
        src="${escapeHtml(s.src)}"
        alt="${escapeHtml(s.alt)}"
        width="1920"
        height="1080"
        draggable="false"
        decoding="async"
        loading="${i === 0 ? "eager" : "lazy"}"
      />
    </div>`,
    )
    .join("");

  const dotsHtml =
    bannerSlides.length > 1
      ? bannerSlides
          .map(
            (_, i) =>
              `<button type="button" class="detail-carousel-dot${i === 0 ? " is-selected" : ""}" data-slide-index="${i}" aria-label="Slide ${i + 1} of ${bannerSlides.length}"${i === 0 ? ' aria-current="true"' : ""}></button>`,
          )
          .join("")
      : "";

  const carouselNav =
    bannerSlides.length > 1
      ? `<div class="detail-hero-carousel-dots">${dotsHtml}</div>`
      : "";

  detailContent.innerHTML = `
    <div class="detail-hero-full fade-target visible">
      <div
        id="detailHeroCarousel"
        class="detail-hero-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="${escapeHtml(era.title)} example works"
        tabindex="0"
      >
        <div class="detail-hero-carousel-viewport">
          ${slidesHtml}
        </div>
        ${carouselNav}
      </div>
      <div class="detail-hero-scrim" aria-hidden="true"></div>
      <div class="detail-hero-glass">
        <p class="detail-eyebrow"><span class="era-number-detail">${escapeHtml(labelNum)}</span> ${escapeHtml(era.period)}</p>
        <h1 class="detail-title detail-title-hero">${escapeHtml(era.title)}</h1>
        <p class="detail-description detail-description-hero">${escapeHtml(era.description)}</p>
        <div class="detail-context detail-context-hero">
          <div class="context-card">
            <span class="context-label">Visual Mood</span>
            <span class="context-value">${escapeHtml(era.visualMood)}</span>
          </div>
          <div class="context-card">
            <span class="context-label">Why It Matters</span>
            <span class="context-value">${escapeHtml(era.heroSubtitle)}</span>
          </div>
        </div>
      </div>
    </div>

    <section class="detail-gallery-section" aria-labelledby="detail-gallery-heading">
      <p class="detail-gallery-kicker" id="detail-gallery-heading">Collection</p>
      <h2 class="detail-gallery-title">Works in this era</h2>
      <p class="detail-gallery-intro">Ten landmark examples with key visual traits, short context, and artist notes—sources linked for classroom use.</p>
      <div class="detail-gallery">
        ${artworksHtml}
      </div>
    </section>

    <div class="detail-body fade-target visible detail-body-wide">
      <div class="detail-section detail-section-full">
        <h3 class="detail-section-title">At a Glance</h3>
        <div class="detail-facts">
          <div class="fact-row">
            <span class="fact-label">Medium</span>
            <span class="fact-value">${escapeHtml(era.facts.medium)}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Geography</span>
            <span class="fact-value">${escapeHtml(era.facts.geography)}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Key Figures</span>
            <span class="fact-value">${escapeHtml(era.facts.keyFigures)}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Comparison Tags</span>
            <span class="fact-value">${escapeHtml((era.compareTags || []).join(", "))}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-pagination">
      ${prevHTML}
      ${nextHTML}
    </div>
  `;

  const carouselEl = document.getElementById("detailHeroCarousel");
  initDetailHeroCarousel(carouselEl, bannerSlides);
  buildArtworkTimeline(era.artworks || []);
  initBackToTop();
}

/* ─── Lenis smooth scroll ──────────────────────────────────────────────────── */

let lenis;

function initLenis() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

initLenis();
