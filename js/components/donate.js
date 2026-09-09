/* ============================================================
   Donate buttons.
   Every .js-donate link on the page points at DONATION_URL from
   config.js. Nothing here processes a payment — the site only
   hands the visitor over to the official donation platform.
   ============================================================ */
window.YL = window.YL || {};

YL.donate = (function () {
  "use strict";

  const NOT_SET = "DONATION_URL_HERE";

  const REMINDER = "The official donation link will be added here.";

  function init() {
    YL.dom.$$(".js-donate").forEach(link => {
      link.href = DONATION_URL;
      link.setAttribute("rel", "noopener");
      link.setAttribute("target", "_blank");

      link.addEventListener("click", e => {
        if (DONATION_URL !== NOT_SET) return;
        e.preventDefault();
        window.alert(NOT_SET + "\n\n" + REMINDER);
      });
    });
  }

  return { init };
})();
