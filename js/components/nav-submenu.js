/* ============================================================
   Desktop navigation submenu.
   Opens on hover and on click, closes on Escape, on outside
   click, and when focus leaves the group — so it works the same
   with a mouse, a keyboard or a screen reader. The mobile menu
   needs none of this: there the submenu is simply always open.
   ============================================================ */
window.YL = window.YL || {};

YL.navSubmenu = (function () {
  "use strict";

  function init() {
    YL.dom.$$(".nav .has-sub").forEach(group => {
      const toggle = group.querySelector(".sub-toggle");
      if (!toggle) return;

      const set = open => {
        group.setAttribute("data-open", String(open));
        toggle.setAttribute("aria-expanded", String(open));
      };

      group.addEventListener("mouseenter", () => set(true));
      group.addEventListener("mouseleave", () => set(false));

      toggle.addEventListener("click", e => {
        e.preventDefault();
        set(toggle.getAttribute("aria-expanded") !== "true");
      });

      /* focusout fires after focus has moved, so relatedTarget tells us
         whether the new target is still inside the group. */
      group.addEventListener("focusout", e => {
        if (!group.contains(e.relatedTarget)) set(false);
      });

      group.addEventListener("keydown", e => {
        if (e.key === "Escape") { set(false); toggle.focus(); }
      });

      group.querySelectorAll(".submenu a").forEach(link => {
        link.addEventListener("click", () => set(false));
      });
    });

    document.addEventListener("click", e => {
      YL.dom.$$(".nav .has-sub").forEach(group => {
        if (!group.contains(e.target)) {
          group.setAttribute("data-open", "false");
          group.querySelector(".sub-toggle").setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  return { init };
})();
