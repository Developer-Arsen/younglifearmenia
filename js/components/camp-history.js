/* ============================================================
   Camp history tabs (then / transformation / today).
   Standard ARIA tab pattern: one tab in the tab order, arrow
   keys move between them.
   ============================================================ */
window.YL = window.YL || {};

YL.campHistory = (function () {
  "use strict";

  function init() {
    const tabs = YL.dom.$$(".hist-tab");
    if (!tabs.length) return;

    function select(tab) {
      tabs.forEach(other => {
        const selected = other === tab;
        other.setAttribute("aria-selected", String(selected));
        other.tabIndex = selected ? 0 : -1;

        const panel = document.getElementById(other.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", e => {
        let next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft")  next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (!next) return;
        e.preventDefault();
        select(next);
        next.focus();
      });
    });
  }

  return { init };
})();
