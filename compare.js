const compareSelectA = document.getElementById("compareSelectA");
const compareSelectB = document.getElementById("compareSelectB");
const compareGrid = document.getElementById("compareGrid");
const overlayLinks = document.getElementById("overlayLinks");
const hamburger = document.getElementById("hamburger");
const mobileOverlay = document.getElementById("mobileOverlay");
const overlayClose = document.getElementById("overlayClose");

function renderOverlayLinks() {
  overlayLinks.innerHTML = `
    <li>
      <a href="index.html" class="overlay-link">
        <span class="nav-num">←</span>
        <span class="nav-label">Back to Timeline</span>
      </a>
    </li>
    <li>
      <a href="compare.html" class="overlay-link active">
        <span class="nav-num">↗</span>
        <span class="nav-label">Compare Movements</span>
      </a>
    </li>
  `;
}

function buildCompareCard(era) {
  return `
    <article class="compare-movement-card">
      <a href="detail.html?era=${era.slug}" class="compare-movement-image" style="background-image:url('${era.bgImage}')" aria-label="${era.title} image"></a>
      <div class="compare-movement-body">
        <a href="detail.html?era=${era.slug}">
          <h2 class="compare-movement-title">${era.title}</h2>
        </a>
        <p class="compare-movement-period">${era.period}</p>
        <p class="compare-movement-text">${era.heroSubtitle || era.description}</p>
        <p class="compare-movement-meta"><strong>Mood:</strong> ${era.visualMood}</p>
        <p class="compare-movement-meta"><strong>Key Figures:</strong> ${era.facts.keyFigures}</p>
        <a class="learn-more-btn compare-movement-link" href="detail.html?era=${era.slug}">
          Open Movement
          <span class="btn-arrow">→</span>
        </a>
      </div>
    </article>
  `;
}

function renderCompare() {
  const eraA = museumData.find((era) => era.slug === compareSelectA.value);
  const eraB = museumData.find((era) => era.slug === compareSelectB.value);
  if (!eraA || !eraB) return;
  compareGrid.innerHTML = `${buildCompareCard(eraA)}${buildCompareCard(eraB)}`;
}

function initSelectors() {
  museumData.forEach((era) => {
    const optionA = document.createElement("option");
    optionA.value = era.slug;
    optionA.textContent = era.title;
    compareSelectA.appendChild(optionA);

    const optionB = document.createElement("option");
    optionB.value = era.slug;
    optionB.textContent = era.title;
    compareSelectB.appendChild(optionB);
  });

  compareSelectA.value = museumData[1]?.slug || museumData[0].slug;
  compareSelectB.value = museumData[6]?.slug || museumData[museumData.length - 1].slug;

  compareSelectA.addEventListener("change", renderCompare);
  compareSelectB.addEventListener("change", renderCompare);
  renderCompare();
}

function openMobileMenu() {
  mobileOverlay.classList.add("open");
  mobileOverlay.setAttribute("aria-hidden", "false");
  hamburger.setAttribute("aria-expanded", "true");
  hamburger.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  mobileOverlay.classList.remove("open");
  mobileOverlay.setAttribute("aria-hidden", "true");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.classList.remove("active");
  document.body.style.overflow = "";
}

function initMobileMenu() {
  hamburger.addEventListener("click", () => {
    if (mobileOverlay.classList.contains("open")) closeMobileMenu();
    else openMobileMenu();
  });
  overlayClose.addEventListener("click", closeMobileMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}

renderOverlayLinks();
initSelectors();
initMobileMenu();
