/* ============================================================
   Photo gallery.
   Builds the grid from YL_GALLERY (config.js) and filters it by
   category. Owns the list of currently visible photos; the lightbox
   reads that list so arrow keys only walk the current filter.

   There is deliberately no "All" chip. All fifty-odd photographs at
   once made the section an endless scroll; one category at a time is
   three or four rows. The chips are built from the categories that
   actually appear in YL_GALLERY, in the order GALLERY_LABELS lists
   them, so adding a category to the config cannot leave the page
   without a chip for it.
   ============================================================ */
window.YL = window.YL || {};

YL.gallery = (function () {
  "use strict";

  let grid;
  let chipHost;
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

  function categories() {
    const present = new Set(YL_GALLERY.map(item => item.cat));
    return Object.keys(GALLERY_LABELS).filter(cat => present.has(cat));
  }

  function buildChips(list, current) {
    chipHost.innerHTML = "";

    list.forEach(cat => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.setAttribute("data-filter", cat);
      chip.setAttribute("aria-pressed", String(cat === current));
      chip.textContent = GALLERY_LABELS[cat];

      chip.addEventListener("click", () => {
        YL.dom.$$(".chip", chipHost).forEach(c => c.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        filter(cat);
      });

      chipHost.appendChild(chip);
    });
  }

  function filter(category) {
    visible = [];

    YL.dom.$$("figure", grid).forEach(figure => {
      const shown = figure.getAttribute("data-cat") === category;
      figure.hidden = !shown;
      if (shown) visible.push(parseInt(figure.getAttribute("data-index"), 10));
    });
  }

  function init() {
    grid = YL.dom.$("#masonry");
    chipHost = YL.dom.$("#gal-filters");
    if (!grid || !chipHost) return;

    const list = categories();
    if (!list.length) return;

    build();
    buildChips(list, list[0]);
    filter(list[0]);

    grid.addEventListener("click", e => {
      const button = e.target.closest("[data-open]");
      if (button) YL.lightbox.open(parseInt(button.getAttribute("data-open"), 10));
    });
  }

  return { init, getVisible: () => visible };
})();
