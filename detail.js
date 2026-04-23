// ─── Parse URL slug ───────────────────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
const slug   = params.get("era");

const detailContent = document.getElementById("detailContent");

// ─── Find matching era ────────────────────────────────────────────────────────
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

  const index    = museumData.indexOf(era);
  const labelNum = String(index + 1).padStart(2, "0");

  // Prev / Next
  const prev = museumData[index - 1];
  const next = museumData[index + 1];

  const prevHTML = prev
    ? `<a href="detail.html?era=${prev.slug}" class="pagination-link">
        <span class="pag-dir">← Previous</span>
        <span class="pag-name">${prev.title}</span>
       </a>`
    : `<span class="pagination-link disabled">—</span>`;

  const nextHTML = next
    ? `<a href="detail.html?era=${next.slug}" class="pagination-link">
        <span class="pag-dir">Next →</span>
        <span class="pag-name">${next.title}</span>
       </a>`
    : `<span class="pagination-link disabled">—</span>`;

  detailContent.innerHTML = `
    <div class="detail-hero fade-target visible">
      <div class="detail-hero-image" style="background-image: url('${era.bgImage}')">
        <span class="era-placeholder-text large">${era.imagePlaceholder}</span>
      </div>
      <div class="detail-hero-text">
        <p class="detail-eyebrow"><span class="era-number-detail">${labelNum}</span> ${era.period}</p>
        <h1 class="detail-title">${era.title}</h1>
        <p class="detail-description">${era.description}</p>
        <div class="detail-context">
          <div class="context-card">
            <span class="context-label">Visual Mood</span>
            <span class="context-value">${era.visualMood}</span>
          </div>
          <div class="context-card">
            <span class="context-label">Why It Matters</span>
            <span class="context-value">${era.heroSubtitle}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-body fade-target visible">
      <div class="detail-section">
        <h3 class="detail-section-title">Curated Objects</h3>
        <ul class="detail-highlights-full">
          ${era.objects.map((obj) => `<li><strong>${obj.title}</strong><br>${obj.artist} · ${obj.date}<br>${obj.story}</li>`).join("")}
        </ul>
      </div>

      <div class="detail-section">
        <h3 class="detail-section-title">At a Glance</h3>
        <div class="detail-facts">
          <div class="fact-row">
            <span class="fact-label">Medium</span>
            <span class="fact-value">${era.facts.medium}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Geography</span>
            <span class="fact-value">${era.facts.geography}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Key Figures</span>
            <span class="fact-value">${era.facts.keyFigures}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Comparison Tags</span>
            <span class="fact-value">${(era.compareTags || []).join(", ")}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-pagination">
      ${prevHTML}
      ${nextHTML}
    </div>
  `;
}

// ─── Smooth Scroll & Lenis ────────────────────────────────────────────────────
let lenis;

function initLenis() {
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
