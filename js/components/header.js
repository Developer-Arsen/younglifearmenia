/* ============================================================
   Header.
   Transparent over the hero, solid once the visitor starts
   reading, so the navigation stays legible over any photograph.
   ============================================================ */
window.YL = window.YL || {};

YL.header = (function () {
  "use strict";

  const SOLID_AFTER = 40; // px

  function init() {
    const header = YL.dom.$("#header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("solid", window.pageYOffset > SOLID_AFTER);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  return { init };
})();
