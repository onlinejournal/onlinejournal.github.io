/* =========================================================
   Online Journal — Footer Component
   Injects a shared, accessible site footer.
   ========================================================= */
(function () {
  "use strict";

  function mount() {
    const host = document.getElementById("site-footer");
    if (!host) return;

    const year = new Date().getFullYear();

    host.innerHTML = `
      <footer class="site-footer" role="contentinfo">
        <div class="container">
          <div class="site-footer__inner">
            <div class="site-footer__brand">
              <strong>Online Journal</strong>
              <span>— A tactile sanctuary for your personal reflections.</span>
            </div>

            <nav class="site-footer__links" aria-label="Footer navigation">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#archive">Archive Guidelines</a>
            </nav>
          </div>

          <p class="site-footer__copy">
            © ${year} Online Journal · onlinejournal.github.io · Made with ink, paper &amp; care.
          </p>
        </div>
      </footer>
    `;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
