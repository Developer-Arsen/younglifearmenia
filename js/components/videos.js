/* ============================================================
   Videos.
   Builds the Videos section from YL_VIDEOS (config.js): one large
   featured player, then a card for each of the rest. Nothing is
   downloaded until somebody presses play — until then each slot is
   a poster photograph, exactly like the rest of the page.

   A film is hosted in one of three places, chosen per entry in
   config.js — Google Drive (`drive`), a plain .mp4 under VIDEO_DIR
   such as a Cloudflare R2 bucket (`file`), or Cloudflare Stream
   (`stream`). Only the first two lines of play() differ between
   them; everything else on the page is identical.

   Also mounts the anniversary film in the 25 Years section, from
   the entry marked years:true.
   ============================================================ */
window.YL = window.YL || {};

YL.videos = (function () {
  "use strict";

  const PLAY_ICON =
    '<svg viewBox="0 0 24 24" width="30" height="30" fill="#05334C" aria-hidden="true">' +
      '<path d="M8 5v14l11-7z"></path>' +
    '</svg>';

  /* ---------- markup ---------- */

  function posterHtml(video) {
    return '' +
      '<div class="media">' +
        '<span class="scene scene--' + (video.scene || "fire") + '" aria-hidden="true"></span>' +
        '<img data-img="' + video.poster + '" alt="" loading="lazy" decoding="async">' +
      '</div>' +
      '<button class="play js-video" type="button" aria-label="Play: ' + video.title + '">' +
        '<span class="ring" aria-hidden="true">' + PLAY_ICON + '</span>' +
      '</button>';
  }

  function durHtml(video) {
    return video.dur ? '<span class="vdur">' + video.dur + '</span>' : "";
  }

  /* ---------- playback ---------- */

  /* Drive and Stream both hand back their own player in an iframe.
     Drive will not stream to a <video> tag at all — it answers with
     an HTML page, not the file. Built only on the first press, so a
     visitor who watches nothing never contacts either host. */
  function playFrame(slot, video, src) {
    const frame = document.createElement("iframe");
    frame.className = "vframe";
    frame.src = src;
    frame.title = video.title;
    frame.allow = "autoplay; fullscreen; encrypted-media; picture-in-picture";
    frame.setAttribute("allowfullscreen", "");
    frame.referrerPolicy = "no-referrer";

    slot.innerHTML = "";
    slot.appendChild(frame);
    slot.classList.add("is-playing");
  }

  function driveSrc(video) {
    return "https://drive.google.com/file/d/" + video.drive + "/preview";
  }

  /* Cloudflare gives every account its own embed host. The generic
     one still works and is the safe default until somebody pastes
     the account's code into STREAM_CUSTOMER. */
  function streamSrc(video) {
    const host = STREAM_CUSTOMER
      ? "https://" + STREAM_CUSTOMER + ".cloudflarestream.com/"
      : "https://iframe.videodelivery.net/";
    return host + video.stream + "/iframe";
  }

  /* Local file. Sources are tried in the order VIDEO_FORMATS lists
     them; if every one 404s — which is what happens before the file
     has been added — the poster comes back with a line explaining
     why, instead of a black rectangle. */
  function playFile(slot, video) {
    const player = document.createElement("video");
    player.className = "vplayer";
    player.controls = true;
    player.autoplay = true;
    player.setAttribute("playsinline", "");
    player.preload = "auto";

    const poster = YL.images.srcFor(video.poster);
    if (poster) player.poster = poster;

    let failed = 0;
    VIDEO_FORMATS.forEach(format => {
      const source = document.createElement("source");
      source.src = VIDEO_DIR + video.file + "." + format.ext;
      if (format.type) source.type = format.type;
      source.addEventListener("error", () => {
        failed += 1;
        if (failed === VIDEO_FORMATS.length) missing(slot, video);
      });
      player.appendChild(source);
    });

    slot.innerHTML = "";
    slot.appendChild(player);
    slot.classList.add("is-playing");

    const attempt = player.play();
    if (attempt && attempt.catch) attempt.catch(() => {});
  }

  function missing(slot, video) {
    slot.classList.remove("is-playing");
    slot.innerHTML = posterHtml(video) +
      '<p class="vmissing" role="status">' +
        "This film has not been added yet. Drop <code>" + video.file + ".mp4</code> " +
        "into the <code>videos/</code> folder — see <code>videos/README.md</code>." +
      "</p>";
    YL.images.wireAll(slot);
    wire(slot, video);
  }

  function play(slot, video) {
    if (video.stream)     playFrame(slot, video, streamSrc(video));
    else if (video.drive) playFrame(slot, video, driveSrc(video));
    else if (video.file)  playFile(slot, video);
  }

  function wire(slot, video) {
    const button = YL.dom.$(".js-video", slot);
    if (button) button.addEventListener("click", () => play(slot, video));
  }

  /* ---------- build ---------- */

  function buildFeatured(host, video) {
    const slot = document.createElement("div");
    slot.className = "video-main reveal d1";
    slot.innerHTML = posterHtml(video);
    host.appendChild(slot);

    const meta = document.createElement("div");
    meta.className = "video-meta";
    meta.innerHTML =
      durHtml(video) +
      "<h3>" + video.title + "</h3>" +
      '<p class="lead">' + video.blurb + "</p>";
    host.appendChild(meta);

    YL.images.wireAll(slot);
    wire(slot, video);
  }

  function buildCard(grid, video, index) {
    const card = document.createElement("article");
    card.className = "vcard reveal" + (index ? " d" + index : "");

    const slot = document.createElement("div");
    slot.className = "thumb";
    slot.innerHTML = posterHtml(video);
    card.appendChild(slot);

    const body = document.createElement("div");
    body.className = "vcard-body";
    body.innerHTML =
      durHtml(video) +
      "<h4>" + video.title + "</h4>" +
      "<p>" + video.blurb + "</p>";
    card.appendChild(body);

    grid.appendChild(card);
    YL.images.wireAll(slot);
    wire(slot, video);
  }

  /* The 25 Years section shows the anniversary film in its own
     wide frame. Same poster-then-player behaviour, different shell. */
  function buildYears(video) {
    const slot = YL.dom.$("#years-film");
    if (!slot || !video) return;

    slot.innerHTML = posterHtml(video);
    YL.images.wireAll(slot);
    wire(slot, video);
  }

  function init() {
    if (typeof YL_VIDEOS === "undefined") return;

    const host = YL.dom.$("#video-featured");
    const grid = YL.dom.$("#video-grid");
    if (!host || !grid) {
      buildYears(YL_VIDEOS.filter(v => v.years)[0]);
      return;
    }

    host.innerHTML = "";
    grid.innerHTML = "";

    /* The one marked featured leads; if nobody is, the first does. */
    const featured = YL_VIDEOS.filter(v => v.featured)[0] || YL_VIDEOS[0];
    if (!featured) return;

    buildFeatured(host, featured);
    YL_VIDEOS.filter(v => v !== featured).forEach((v, i) => buildCard(grid, v, i));

    buildYears(YL_VIDEOS.filter(v => v.years)[0]);
  }

  return { init };
})();
