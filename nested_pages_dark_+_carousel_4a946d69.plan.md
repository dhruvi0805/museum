---
name: Nested pages dark + carousel
overview: Align all movement/era detail experiences with a strict black canvas and white type without changing layout, spacing, or component structure; add (or reuse) an interactive artwork carousel in the hero for every nested detail surface. Next.js `/movements/[slug]` is largely done—focus on `/detail`, static `detail.html`, and small token consistency.
todos:
  - id: tokens-detail
    content: Normalize nested Next detail surfaces to bg-black / white text (detail page + fallbacks)
    status: pending
  - id: detail-carousel
    content: Wire MovementBannerCarousel + getMovementBannerSlides into src/app/detail/page.tsx hero
    status: pending
  - id: static-dark-css
    content: Scope dark theme overrides in style.css for body.detail-page without changing layout tokens
    status: pending
  - id: static-carousel-js
    content: Implement hero carousel in src/js/detail.js (slides from era.artworks, a11y, reduced motion)
    status: pending
  - id: qa-routes
    content: QA all slugs, links (detail.html vs /movements), images.remotePatterns, keyboard/swipe
    status: pending
isProject: false
---

# Sprint: Dark nested pages + hero carousel

## Current state (repo)

| Surface | Dark canvas | Hero carousel |
|---------|-------------|-----------------|
| [src/app/movements/[slug]/page.tsx](c:\Users\drm23\personal\is 117\museum\src\app\movements\[slug]\page.tsx) + [MovementPageClient.tsx](c:\Users\drm23\personal\is 117\museum\src\components\movements\MovementPageClient.tsx) | Yes (`bg-black`, [layout.tsx](c:\Users\drm23\personal\is 117\museum\src\app\movements\[slug]\layout.tsx)) | Yes — [MovementBannerCarousel.tsx](c:\Users\drm23\personal\is 117\museum\src\components\movements\MovementBannerCarousel.tsx) + [movementBanner.ts](c:\Users\drm23\personal\is 117\museum\src\lib\movementBanner.ts) (`getMovementBannerSlides` → `movement.artworks` or optional local overrides) |
| [src/app/detail/page.tsx](c:\Users\drm23\personal\is 117\museum\src\app\detail\page.tsx) | Near-black `#0a0a0a`, mixed `text-white/xx` | No — single `<Image src={movement.bgImage} />` |
| [detail.html](c:\Users\drm23\personal\is 117\museum\detail.html) + [style.css](c:\Users\drm23\personal\is 117\museum\style.css) (imported by [src/css/style.css](c:\Users\drm23\personal\is 117\museum\src\css\style.css)) | Light hero / light gallery (`.detail-*`) | No — `detail-hero-visual` uses `era.bgImage` only ([src/js/detail.js](c:\Users\drm23\personal\is 117\museum\src\js\detail.js)) |

Home ([src/app/page.tsx](c:\Users\drm23\personal\is 117\museum\src\app\page.tsx)) stays `#0a0a0a` unless you explicitly want it pure black; this sprint targets **nested** detail routes only.

---

## Sprint goal

- **Visual:** Nested movement/era pages use **#000 background** and **white foreground** for body copy and headings; preserve existing structure (glass panels, borders, radii, spacing, pagination) — only swap surface/text tokens and any hero-specific colors needed for contrast.
- **Feature:** **Interactive image carousel** in the **section header (hero)** of each movement, driven by **that movement’s example works** (same source as today: `artworks` / `museumData[].artworks`, plus optional `movementBannerLocalBySlug` for local assets).

---

## Definition of done

1. `/movements/[slug]` and `/detail?era=` render a **full-viewport hero** with **carousel** (prev/next, dots, swipe, keyboard, `prefers-reduced-motion`), slides from `getMovementBannerSlides(movement)` (or equivalent for static build).
2. Nested page **main canvas** is **black**; primary text is **white** (muted lines may stay as `white` + opacity for hierarchy — “same design,” not necessarily every token at 100% opacity).
3. **Static** `detail.html` matches the same product intent (dark + carousel) so `index.html` → `detail.html` flows are not broken.
4. **Accessibility:** carousel `aria-label` / roledescription, focusable region, visible focus rings unchanged from current Next component patterns.
5. **Images:** remote URLs already allowed in [next.config.mjs](c:\Users\drm23\personal\is 117\museum\next.config.mjs); add patterns only if new hostnames appear in data.

---

## Recommended backlog (1–2 week sprint)

### Epic A — Token pass (quick)

- Normalize `/detail` and 404/fallback backgrounds from `#0a0a0a` → `black` / `bg-black` to match movements layout.
- Optional: add `wikipedia.org` to `images.remotePatterns` if any `imageUrl` uses that host (Wikimedia is already listed).

**Owner:** front-end | **Estimate:** 0.5d

---

### Epic B — `/detail` hero = carousel (main Next gap)

- Refactor [src/app/detail/page.tsx](c:\Users\drm23\personal\is 117\museum\src\app\detail\page.tsx) hero `<section>` to mirror [MovementPageClient.tsx](c:\Users\drm23\personal\is 117\museum\src\components\movements\MovementPageClient.tsx): `MovementBannerCarousel` + same gradient scrim + header + bottom glass content.
- Import `getMovementBannerSlides` and reuse `MovementBannerCarousel` to avoid duplicate carousel logic.
- Ensure `Suspense` fallback uses `bg-black` for consistency.

**Owner:** front-end | **Estimate:** 1d

---

### Epic C — Static `detail.html` dark + carousel

- **CSS:** Under `body.detail-page` (or `.detail-layout`), override [style.css](c:\Users\drm23\personal\is 117\museum\style.css) detail blocks: page background `#000`, text white, borders/glass adjusted for dark (keep same radii/spacing variables).
- **JS:** In [src/js/detail.js](c:\Users\drm23\personal\is 117\museum\src\js\detail.js), replace single `detail-hero-visual` bg with a **carousel strip** (same slide list as Next: `era.artworks` mapped to images; include `era.bgImage` as first slide if you want parity with “hero + collection”).
- **JS behavior:** index state, prev/next buttons, dot indicators, touch swipe, optional keyboard on focused region; respect `prefers-reduced-motion` (instant slide change).
- **HTML:** Inject minimal markup/classes so styles match the mental model of the Next hero (scrim + glass panel unchanged in structure).

**Owner:** front-end | **Estimate:** 1.5–2d (more than Next because vanilla a11y + CSS)

---

### Epic D — Deduplication / tech debt (stretch)

- Extract a small **shared** `MovementHeroSection` (props: movement, labelNum, slides, back link) used by both `MovementPageClient` and `/detail`, or document that `/detail` is legacy and redirect to `/movements/[slug]` (product decision).

**Owner:** front-end | **Estimate:** 0.5–1d (optional)

---

### Epic E — QA & polish

- Cross-check all slugs in [src/data/movements](c:\Users\drm23\personal\is 117\museum\src\data) / [src/data/data.js](c:\Users\drm23\personal\is 117\museum\src\data\data.js) for broken images or missing `artworks`.
- Lighthouse / keyboard-only pass on carousel.
- Update internal links: if timeline still points to `detail.html`, keep static path; if app uses Next, ensure `MovementCard` / nav targets the canonical nested route you want long-term.

**Owner:** QA + front-end | **Estimate:** 0.5d

---

## Risks and mitigations

- **Many full-bleed remote images:** lazy-load non-first slides; carousel already uses `priority` on first slide in Next.
- **Two Next routes** (`/movements/...` vs `/detail`): risk of drift; mitigated by shared component or clear deprecation of one route.
- **Static site parity:** vanilla carousel must not regress Lenis scroll on [detail.html](c:\Users\drm23\personal\is 117\museum\detail.html); test touch on mobile.

---

## Out of scope (unless you expand the sprint)

- Redesigning gallery cards or typography scale.
- Dark mode for [compare.html](c:\Users\drm23\personal\is 117\museum\compare.html) / [src/app/compare/page.tsx](c:\Users\drm23\personal\is 117\museum\src\app\compare\page.tsx).
- New artwork data beyond existing `artworks` arrays.
