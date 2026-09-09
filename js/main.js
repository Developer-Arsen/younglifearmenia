/* ============================================================
   Boot sequence.
   The gallery and the videos build their own markup, so they go
   first; everything else only attaches behaviour to markup already
   in the page. `reveal` stays last, so it sees those new elements.

   Each module starts inside its own try/catch. A single broken
   component should degrade to "that one feature is dead", never
   to a blank page — which is exactly what happened once when a
   removed element left a stale reference in the header.
   ============================================================ */
(function () {
  "use strict";

  function start(name, fn) {
    try { fn(); }
    catch (err) { console.error("YL: " + name + " failed to start", err); }
  }

  start("gallery",      () => YL.gallery.init());     // builds the masonry markup
  start("videos",       () => YL.videos.init());      // builds the videos section
  start("images",       () => YL.images.wireAll());   // every remaining <img data-img>
  start("lightbox",     () => YL.lightbox.init());
  start("header",       () => YL.header.init());
  start("mobileMenu",   () => YL.mobileMenu.init());
  start("navSubmenu",   () => YL.navSubmenu.init());
  start("campHistory",  () => YL.campHistory.init());
  start("testimonials", () => YL.testimonials.init());
  start("contactForm",  () => YL.contactForm.init());
  start("donate",       () => YL.donate.init());
  start("reveal",       () => YL.reveal.init());

  start("year", () => { YL.dom.$("#year").textContent = new Date().getFullYear(); });
})();
