/* ============================================================
   Gallery lightbox.
   Modal dialog: Escape closes, arrows move, Tab is trapped, and
   focus returns to the thumbnail that opened it.
   ============================================================ */
window.YL = window.YL || {};

YL.lightbox = (function () {
  "use strict";

  let box, image, caption, counter;
  let position = 0;
  let lastFocused = null;

  const isOpen = () => box.classList.contains("open");

  function refreshText() {
    if (!isOpen()) return;

    const visible = YL.gallery.getVisible();
    counter.textContent = (position + 1) + " of " + visible.length;

    const item = YL_GALLERY[visible[position]];
    if (!item) return;
    caption.textContent = item.cap;
    image.alt = item.cap;
  }

  function show(next) {
    const visible = YL.gallery.getVisible();
    if (!visible.length) return;

    position = (next + visible.length) % visible.length;
    image.classList.remove("loaded");
    image.src = YL.images.srcFor(YL_GALLERY[visible[position]].img);
    refreshText();
  }

  function open(galleryIndex) {
    lastFocused = document.activeElement;
    const at = YL.gallery.getVisible().indexOf(galleryIndex);

    box.classList.add("open");
    YL.dom.lockScroll();
    show(at > -1 ? at : 0);
    YL.dom.$("#lbClose").focus();
  }

  function close() {
    if (!isOpen()) return;
    box.classList.remove("open");
    YL.dom.unlockScroll();
    if (lastFocused) lastFocused.focus();
  }

  function trapTab(e) {
    const focusable = YL.dom.$$("button", box);
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  function init() {
    box     = YL.dom.$("#lightbox");
    image   = YL.dom.$("#lbImg");
    caption = YL.dom.$("#lbCap");
    counter = YL.dom.$("#lbCount");
    if (!box) return;

    YL.images.wire(image);

    YL.dom.$("#lbClose").addEventListener("click", close);
    YL.dom.$("#lbPrev").addEventListener("click", () => show(position - 1));
    YL.dom.$("#lbNext").addEventListener("click", () => show(position + 1));

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") close();
      if (!isOpen()) return;
      if (e.key === "ArrowLeft")  show(position - 1);
      if (e.key === "ArrowRight") show(position + 1);
      if (e.key === "Tab")        trapTab(e);
    });
  }

  return { init, open, close };
})();
