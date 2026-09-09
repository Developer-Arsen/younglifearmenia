/* ============================================================
   Image loading.
   Reads YL_IMAGES from config.js. Photos fade in when they load;
   if one fails, it stays transparent and the painted scene behind
   it shows through, so a missing photo never looks broken.
   ============================================================ */
window.YL = window.YL || {};

YL.images = (function () {
  "use strict";

  function srcFor(key) {
    const entry = YL_IMAGES[key];
    if (!entry) return "";
    return USE_LOCAL_IMAGES ? entry.local : entry.remote;
  }

  function wire(img) {
    img.addEventListener("load", () => img.classList.add("loaded"));
    img.addEventListener("error", () => {
      img.classList.add("failed");
      img.classList.remove("loaded");
    });

    const key = img.getAttribute("data-img");
    if (key) img.src = srcFor(key);

    /* Cached images can finish before the listener is attached. */
    if (img.complete && img.naturalWidth) img.classList.add("loaded");
  }

  function wireAll(scope) {
    YL.dom.$$("img[data-img]", scope).forEach(img => { if (!img.src) wire(img); });
  }

  return { srcFor, wire, wireAll };
})();
