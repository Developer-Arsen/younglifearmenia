/* ============================================================
   Mobile menu.
   Closes on link click, on Escape, and after a language change,
   and returns focus to the button that opened it.
   ============================================================ */
window.YL = window.YL || {};

YL.mobileMenu = (function () {
  "use strict";

  const CLOSE_DELAY = 320; // must match the CSS transition
  let menu, burger;

  function open() {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add("open"));
    burger.setAttribute("aria-expanded", "true");
    YL.dom.lockScroll();

    const first = menu.querySelector("a, button");
    if (first) first.focus();
  }

  function close() {
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    YL.dom.unlockScroll();
    window.setTimeout(() => { menu.hidden = true; }, CLOSE_DELAY);
    burger.focus();
  }

  function init() {
    menu   = YL.dom.$("#menu");
    burger = YL.dom.$("#burger");

    burger.addEventListener("click", open);
    YL.dom.$("#menuClose").addEventListener("click", close);
    YL.dom.$$("#menu nav a").forEach(link => link.addEventListener("click", close));

    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  return { init, open, close };
})();
