/* ============================================================
   DOM helpers + a tiny event bus.
   Every module below hangs off the single global `YL`, so load
   order is the only dependency management this site needs.
   ============================================================ */
window.YL = window.YL || {};

YL.dom = (function () {
  "use strict";

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel));

  /* Modules never call each other directly — they announce and listen.
     Language change, for example, is broadcast once and picked up by
     the lightbox and the mobile menu independently. */
  const emit = (name, detail) => document.dispatchEvent(new CustomEvent(name, { detail: detail }));
  const on   = (name, fn) => document.addEventListener(name, fn);

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Used by the menu and the lightbox, which must not scroll the page behind them. */
  const lockScroll   = () => { document.body.style.overflow = "hidden"; };
  const unlockScroll = () => { document.body.style.overflow = ""; };

  return { $, $$, emit, on, prefersReducedMotion, lockScroll, unlockScroll };
})();
