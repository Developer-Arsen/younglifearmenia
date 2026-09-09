/* ============================================================
   Testimonials carousel.
   Manual only — no autoplay, because a quote that moves on its
   own is a quote half the audience never finishes reading.
   ============================================================ */
window.YL = window.YL || {};

YL.testimonials = (function () {
  "use strict";

  let slides, dots;
  let index = 0;

  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    YL.dom.$$("button", dots).forEach((dot, i) => dot.setAttribute("aria-current", String(i === index)));
  }

  function init() {
    slides = YL.dom.$$(".voice");
    dots   = YL.dom.$("#voiceDots");
    if (!slides.length || !dots) return;

    slides.forEach((slide, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.innerHTML = "<i></i>";
      dot.setAttribute("aria-label", String(i + 1));
      dot.setAttribute("aria-current", String(i === 0));
      dot.addEventListener("click", () => show(i));
      dots.appendChild(dot);
    });

    YL.dom.$("#vPrev").addEventListener("click", () => show(index - 1));
    YL.dom.$("#vNext").addEventListener("click", () => show(index + 1));
  }

  return { init };
})();
