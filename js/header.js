/* =========================================================
   Online Journal — Header Component
   Injects a shared, accessible site header.
   ========================================================= */
(function () {
  "use strict";
 
  const NAV_ITEMS = [
    { label: "Home", path: "home" },
    { label: "My Journal", path: "my-journal" },
    { label: "Calendar", path: "calendar" },
    { label: "Tools", path: "tools" },
    { label: "Prompts", path: "prompts" },
    { label: "Community", path: "community" },
    { label: "Pricing", path: "pricing" }
  ];

  const LOGO_SVG = `
    <svg class="brand__mark" viewBox="0 0 40 40" role="img" aria-label="Online Journal logo">
      <rect width="40" height="40" rx="8" fill="#1e2b37"/>
      <rect x="11" y="8" width="18" height="24" rx="1.5" fill="#fdfaf6"/>
      <path d="M15 14h10M15 19h10M15 24h6" stroke="#1e2b37" stroke-width="1.6" stroke-linecap="round"/>
      <rect x="11" y="8" width="4" height="24" rx="1.5" fill="#521401"/>
    </svg>
  `;

  const AVATAR_SVG = `
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <rect width="32" height="32" fill="#c5e7d6"/>
      <circle cx="16" cy="12" r="6" fill="#466557"/>
      <path d="M4 32c0-7 5.4-12 12-12s12 5 12 12" fill="#466557"/>
    </svg>
  `;

  function buildNav(activePath) {
    return NAV_ITEMS.map(item => {
      const isActive = item.path === activePath;
      return `
        <a href="#${item.path}" class="nav__link ${isActive ? "is-active" : ""}"
           data-path="${item.path}" ${isActive ? 'aria-current="page"' : ""}>
          ${item.label}
        </a>`;
    }).join("");
  }

  function buildMobileNav(activePath) {
    return NAV_ITEMS.map(item => {
      const isActive = item.path === activePath;
      return `
        <a href="#${item.path}" class="mobile-nav__link ${isActive ? "is-active" : ""}"
           data-path="${item.path}" ${isActive ? 'aria-current="page"' : ""}>
          ${item.label}
        </a>`;
    }).join("");
  }

  function mount() {
    const host = document.getElementById("site-header");
    if (!host) return;

    const currentPath = document.body.dataset.nav || "home";

    host.innerHTML = `
      <header class="site-header" role="banner">
        <div class="site-header__inner">
          <a href="#home" class="brand" aria-label="Online Journal home">
            ${LOGO_SVG}
            <span class="brand__name">Online Journal</span>
          </a>

          <nav class="nav" role="navigation" aria-label="Primary">
            ${buildNav(currentPath)}
          </nav>

          <div class="header-search" role="search">
            <span class="material-symbols-outlined" aria-hidden="true">search</span>
            <input type="search" placeholder="Search journal entries, tags..." aria-label="Search journal entries" />
          </div>

          <div class="header-actions">
            <div class="theme-toggle" role="group" aria-label="Theme">
              <button type="button" class="is-active" data-theme="parchment" aria-pressed="true">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">menu_book</span>
                <span>Parchment</span>
              </button>
              <button type="button" data-theme="midnight" aria-pressed="false">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">bedtime</span>
                <span>Midnight</span>
              </button>
            </div>

            <button type="button" class="icon-btn" aria-label="Notifications">
              <span class="material-symbols-outlined" aria-hidden="true">notifications</span>
              <span class="dot-new" aria-hidden="true"></span>
            </button>

            <a href="#new-entry" class="btn btn-terra" aria-label="Create new entry">
              <span class="material-symbols-outlined icon-sm" aria-hidden="true">history_edu</span>
              <span>New Entry</span>
            </a>

            <span class="avatar" aria-hidden="true">${AVATAR_SVG}</span>

            <button type="button" class="icon-btn menu-btn" id="menu-toggle"
                    aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
              <span class="material-symbols-outlined" aria-hidden="true">menu</span>
            </button>
          </div>
        </div>

        <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>
          <ul class="mobile-nav__list">${buildMobileNav(currentPath)}</ul>
        </nav>
      </header>
    `;

    // Mobile menu toggle
    const menuBtn = host.querySelector("#menu-toggle");
    const mobileNav = host.querySelector("#mobile-nav");
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("is-open");
        mobileNav.hidden = !isOpen;
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        menuBtn.querySelector(".material-symbols-outlined").textContent =
          isOpen ? "close" : "menu";
      });

      mobileNav.querySelectorAll(".mobile-nav__link").forEach(link => {
        link.addEventListener("click", () => {
          mobileNav.classList.remove("is-open");
          mobileNav.hidden = true;
          menuBtn.setAttribute("aria-expanded", "false");
          menuBtn.querySelector(".material-symbols-outlined").textContent = "menu";
        });
      });
    }

    // Theme toggle (visual only — persists to localStorage)
    const themeButtons = host.querySelectorAll("[data-theme]");
    const stored = localStorage.getItem("oj-theme") || "parchment";
    applyTheme(stored);

    themeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        applyTheme(theme);
        localStorage.setItem("oj-theme", theme);
      });
    });

    function applyTheme(theme) {
      themeButtons.forEach(b => {
        const isActive = b.dataset.theme === theme;
        b.classList.toggle("is-active", isActive);
        b.setAttribute("aria-pressed", String(isActive));
      });
      document.documentElement.dataset.theme = theme;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
