/* ============================================================
   Photo gallery.
   Builds the masonry from YL_GALLERY (config.js) and filters it
   by category. Owns the list of currently visible photos; the
   lightbox reads that list so arrow keys only walk the filter.
   ============================================================ */
window.YL = window.YL || {};

YL.gallery = (function () {
  "use strict";

  let grid;
  let visible = [];   // indices into YL_GALLERY, in display order

  function cardHtml(item, index) {
    return '' +
      '<button class="gal-btn" type="button" data-open="' + index + '">' +
        '<span class="media media--zoom ' + item.r + '">' +
          '<span class="scene scene--forest"></span>' +
          '<img data-img="' + item.img + '" loading="lazy" decoding="async" ' +
               'alt="' + item.cap + '">' +
        '</span>' +
      '</button>' +
      '<figcaption>' +
        '<span class="tag">' + GALLERY_LABELS[item.cat] + '</span>' +
        '<span>' + item.cap + '</span>' +
      '</figcaption>';
  }

  function build() {
    grid.innerHTML = "";

    YL_GALLERY.forEach((item, index) => {
      const figure = document.createElement("figure");
      figure.setAttribute("data-cat", item.cat);
      figure.setAttribute("data-index", index);
      figure.innerHTML = cardHtml(item, index);
      grid.appendChild(figure);
    });

    YL.images.wireAll(grid);
  }

  function filter(category) {
    visible = [];

    YL.dom.$$("figure", grid).forEach(figure => {
      const shown = category === "all" || figure.getAttribute("data-cat") === category;
      figure.hidden = !shown;
      if (shown) visible.push(parseInt(figure.getAttribute("data-index"), 10));
    });
  }

  function init() {
    grid = YL.dom.$("#masonry");
    if (!grid) return;

    build();
    filter("all");

    YL.dom.$$(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        YL.dom.$$(".chip").forEach(c => c.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        filter(chip.getAttribute("data-filter"));
      });
    });

    grid.addEventListener("click", e => {
      const button = e.target.closest("[data-open]");
      if (button) YL.lightbox.open(parseInt(button.getAttribute("data-open"), 10));
    });
  }

  return { init, getVisible: () => visible };
})();
