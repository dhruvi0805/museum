// ─── DOM Refs ─────────────────────────────────────────────────────────────────
const sectionsContainer = document.getElementById("sectionsContainer");
const sidebarLinks      = document.getElementById("sidebarLinks");
const overlayLinks      = document.getElementById("overlayLinks");
const hamburger         = document.getElementById("hamburger");
const mobileOverlay     = document.getElementById("mobileOverlay");
const overlayClose      = document.getElementById("overlayClose");

// ─── Render Sections ──────────────────────────────────────────────────────────
function renderSections() {
  museumData.forEach((era, index) => {
    const section = document.createElement("section");
    section.className = "era-section fade-target";
    section.id = `era-${era.slug}`;
    section.setAttribute("data-index", index);

    const labelNum = String(index + 1).padStart(2, "0");

    section.innerHTML = `
      <!-- Full-bleed blurred background -->
      <div class="era-bg" style="background-image: url('${era.bgImage}')"></div>
      <div class="era-bg-overlay"></div>

      <!-- Liquid glass card containing all text content -->
      <div class="era-glass-card">
        <div class="era-meta">
          <span class="era-number">${labelNum}</span>
          <span class="era-period">${era.period}</span>
        </div>
        <h2 class="era-title">${era.title}</h2>
        <p class="era-description">${era.description}</p>
        <ul class="era-highlights">
          ${era.highlights.slice(0, 4).map(h => `<li>${h}</li>`).join("")}
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

// ─── Render Sidebar Nav ───────────────────────────────────────────────────────
function renderNav() {
  museumData.forEach((era, index) => {
    const labelNum = String(index + 1).padStart(2, "0");

    // Sidebar
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="#era-${era.slug}" class="sidebar-link" data-target="era-${era.slug}">
        <span class="nav-num">${labelNum}</span>
        <span class="nav-label">${era.title}</span>
      </a>
    `;
    sidebarLinks.appendChild(li);

    // Overlay
    const oli = document.createElement("li");
    oli.innerHTML = `
      <a href="#era-${era.slug}" class="overlay-link" data-target="era-${era.slug}">
        <span class="nav-num">${labelNum}</span>
        <span class="nav-label">${era.title}</span>
      </a>
    `;
    overlayLinks.appendChild(oli);
  });
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

function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-target]");
    if (!link) return;
    e.preventDefault();

    const targetId = link.getAttribute("data-target");
    const target   = document.getElementById(targetId);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Close mobile overlay if open
    closeMobileMenu();
  });
}

// ─── Active Sidebar Link via IntersectionObserver ─────────────────────────────
function initActiveTracking() {
  const sections = document.querySelectorAll(".era-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slug    = entry.target.id.replace("era-", "");
          const allLinks = document.querySelectorAll("[data-target]");
          allLinks.forEach((l) => {
            l.classList.toggle(
              "active",
              l.getAttribute("data-target") === `era-${slug}`
            );
          });
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

// ─── Fade-In / Slide-Up Entrance Animations ───────────────────────────────────
function initEntranceAnimations() {
  const targets = document.querySelectorAll(".fade-target");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-index") % 3 * 60;
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((t) => observer.observe(t));
}

// ─── Hamburger / Mobile Overlay ───────────────────────────────────────────────
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
    if (mobileOverlay.classList.contains("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  overlayClose.addEventListener("click", closeMobileMenu);

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}

// ─── Boot ──────────────────────────────────────────────────────────────────────
renderSections();
renderNav();
initLenis();
initSmoothScroll();
initActiveTracking();
initEntranceAnimations();
initMobileMenu();