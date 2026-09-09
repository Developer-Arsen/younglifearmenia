/* ============================================================
   Contact form.
   Prototype behaviour: validate, then show the success message.
   Point this at the real endpoint when the backend exists —
   replace the body of submit() and nothing else changes.
   ============================================================ */
window.YL = window.YL || {};

YL.contactForm = (function () {
  "use strict";

  function init() {
    const form = YL.dom.$("#contactForm");
    if (!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      YL.dom.$("#formOk").hidden = false;
      form.reset();
    });
  }

  return { init };
})();
