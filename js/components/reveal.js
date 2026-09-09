/* ============================================================
   Scroll reveal + the years counter.
   Both are decoration: without IntersectionObserver, or with
   reduced motion on, everything is simply shown at its final
   value straight away.
   ============================================================ */
window.YL = window.YL || {};

YL.reveal = (function () {
  "use strict";

  const SELECTOR = ".reveal, .trail li";

  function format(n) {
    try { return n.toLocaleString("en"); }
    catch (e) { return String(n); }
  }

  function countUp(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";

    if (YL.dom.prefersReducedMotion()) {
      el.textContent = format(target) + suffix;
      return;
    }

    let value = 0;
    const step = Math.max(1, Math.round(target / 28));

    (function tick() {
      value = Math.min(target, value + step);
      el.textContent = format(value) + suffix;
      if (value < target) requestAnimationFrame(tick);
    })();
  }


  function showAll() {
    YL.dom.$$(SELECTOR).forEach(el => el.classList.add("in"));
    YL.dom.$$("[data-count]").forEach(countUp);
  }

  function init() {
    if (!("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");

        const counter = entry.target.querySelector("[data-count]");
        if (counter && !counter.dataset.done) {
          counter.dataset.done = "1";
          countUp(counter);
        }

        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    YL.dom.$$(SELECTOR).forEach(el => observer.observe(el));
  }

  return { init };
})();
