const sectionsContainer = document.getElementById("sectionsContainer");
const sidebarLinks = document.getElementById("sidebarLinks");
const overlayLinks = document.getElementById("overlayLinks");
const hamburger = document.getElementById("hamburger");
const mobileOverlay = document.getElementById("mobileOverlay");
const overlayClose = document.getElementById("overlayClose");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const compareSelectA = document.getElementById("compareSelectA");
const compareSelectB = document.getElementById("compareSelectB");
const compareResult = document.getElementById("compareResult");

const state = {
  query: "",
  facet: "all",
};

let lenis;

function renderSections() {
  sectionsContainer.innerHTML = "";
  museumData.forEach((era, index) => {
    const section = document.createElement("section");
    section.className = "era-section fade-target";
    section.id = `era-${era.slug}`;
    section.setAttribute("data-index", index);
    section.setAttribute("data-facet", era.filterFacet || "all");

    const labelNum = String(index + 1).padStart(2, "0");

    section.innerHTML = `
      <div class="era-bg" data-bg="${era.bgImage}" role="img" aria-label="${era.title} background"></div>
      <div class="era-bg-overlay"></div>
      <div class="era-glass-card">
        <div class="era-meta">
          <span class="era-number">${labelNum}</span>
          <span class="era-period">${era.period}</span>
        </div>
        <h2 class="era-title">${era.title}</h2>
        <p class="era-description">${era.heroSubtitle || era.description}</p>
        <ul class="era-highlights">
          ${era.highlights.slice(0, 4).map((h) => `<li>${h}</li>`).join("")}
        </ul>
        <a href="detail.html?era=${era.slug}" class="learn-more-btn">
          Learn More
          <span class="btn-arrow">→</span>
        </a>
      </div>
    `;

    sectionsContainer.appendChild(section);
  });
}

function renderNav() {
  sidebarLinks.innerHTML = "";
  overlayLinks.innerHTML = "";
  museumData.forEach((era, index) => {
    const labelNum = String(index + 1).padStart(2, "0");
    const item = `
      <a href="#era-${era.slug}" class="sidebar-link" data-target="era-${era.slug}">
        <span class="nav-num">${labelNum}</span>
        <span class="nav-label">${era.title}</span>
      </a>
    `;
    const li = document.createElement("li");
    li.innerHTML = item;
    sidebarLinks.appendChild(li);

    const overlayItem = `
      <a href="#era-${era.slug}" class="overlay-link" data-target="era-${era.slug}">
        <span class="nav-num">${labelNum}</span>
        <span class="nav-label">${era.title}</span>
      </a>
    `;
    const oli = document.createElement("li");
    oli.innerHTML = overlayItem;
    overlayLinks.appendChild(oli);
  });
}

function initFilterControls() {
  const facets = Array.from(new Set(museumData.map((era) => era.filterFacet).filter(Boolean)));
  facets.forEach((facet) => {
    const opt = document.createElement("option");
    opt.value = facet;
    opt.textContent = facet;
    filterSelect.appendChild(opt);
  });

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    applyFilters();
  });

  filterSelect.addEventListener("change", (event) => {
    state.facet = event.target.value;
    applyFilters();
  });
}

function applyFilters() {
  const sections = document.querySelectorAll(".era-section");
  sections.forEach((section) => {
    const slug = section.id.replace("era-", "");
    const era = museumData.find((item) => item.slug === slug);
    if (!era) return;

    const searchable = [era.title, era.period, era.description, ...(era.highlights || []), ...(era.searchTags || [])]
      .join(" ")
      .toLowerCase();
    const facetMatch = state.facet === "all" || era.filterFacet === state.facet;
    const queryMatch = !state.query || searchable.includes(state.query);
    section.classList.toggle("hidden-era", !(facetMatch && queryMatch));
  });
}

function initComparePanel() {
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

  compareSelectA.value = museumData[1].slug;
  compareSelectB.value = museumData[6].slug;

  const onCompareChange = () => {
    const eraA = museumData.find((era) => era.slug === compareSelectA.value);
    const eraB = museumData.find((era) => era.slug === compareSelectB.value);
    if (!eraA || !eraB) return;
    compareResult.innerHTML = `
      <article>
        <p class="compare-card-title">${eraA.title}</p>
        <p class="compare-item"><strong>Period:</strong> ${eraA.period}</p>
        <p class="compare-item"><strong>Mood:</strong> ${eraA.visualMood}</p>
        <p class="compare-item"><strong>Medium focus:</strong> ${eraA.facts.medium}</p>
        <p class="compare-item"><strong>Key figures:</strong> ${eraA.facts.keyFigures}</p>
      </article>
      <article>
        <p class="compare-card-title">${eraB.title}</p>
        <p class="compare-item"><strong>Period:</strong> ${eraB.period}</p>
        <p class="compare-item"><strong>Mood:</strong> ${eraB.visualMood}</p>
        <p class="compare-item"><strong>Medium focus:</strong> ${eraB.facts.medium}</p>
        <p class="compare-item"><strong>Key figures:</strong> ${eraB.facts.keyFigures}</p>
      </article>
    `;
  };

  compareSelectA.addEventListener("change", onCompareChange);
  compareSelectB.addEventListener("change", onCompareChange);
  onCompareChange();
}

function initLenis() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  lenis = new Lenis({
    duration: 1.3,
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

function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-target]");
    if (!link) return;
    e.preventDefault();

    const targetId = link.getAttribute("data-target");
    const target = document.getElementById(targetId);
    if (!target) return;

    if (lenis) lenis.scrollTo(target, { offset: -20 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMobileMenu();
  });
}

function initActiveTracking() {
  const sections = document.querySelectorAll(".era-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.classList.contains("hidden-era")) return;
        const slug = entry.target.id.replace("era-", "");
        const allLinks = document.querySelectorAll("[data-target]");
        allLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("data-target") === `era-${slug}`);
        });
      });
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );
  sections.forEach((s) => observer.observe(s));
}

function initEntranceAnimations() {
  const targets = document.querySelectorAll(".fade-target");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = (entry.target.getAttribute("data-index") || 0) % 3 * 70;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );
  targets.forEach((target) => observer.observe(target));
}

function initCinematicScrollFx() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const backgrounds = document.querySelectorAll(".era-bg");
  const onScroll = () => {
    backgrounds.forEach((bg) => {
      const section = bg.closest(".era-section");
      const rect = section.getBoundingClientRect();
      const progress = rect.top / window.innerHeight;
      bg.style.transform = `scale(1.08) translateY(${progress * -18}px)`;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initBackgroundLazyLoad() {
  const backgrounds = document.querySelectorAll(".era-bg");
  const loader = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bg = entry.target;
        const src = bg.getAttribute("data-bg");
        if (src) {
          bg.style.backgroundImage = `url('${src}')`;
          bg.removeAttribute("data-bg");
        }
        loader.unobserve(bg);
      });
    },
    { rootMargin: "200px 0px" },
  );
  backgrounds.forEach((bg) => loader.observe(bg));
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

renderSections();
renderNav();
initFilterControls();
initComparePanel();
initLenis();
initSmoothScroll();
initActiveTracking();
initEntranceAnimations();
initCinematicScrollFx();
initBackgroundLazyLoad();
initMobileMenu();