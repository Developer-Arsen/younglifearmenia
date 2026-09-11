
/* ---- js/config.js ---- */
/* ============================================================
   CONFIGURATION — the file to edit before launch.
   Loaded first; everything else reads from these globals.
   ============================================================ */

/* 1. Where every Donate button goes.

   Young Life's own giving platform, pre-filled for the Armenia area
   and the Operating class code. Nothing on this site touches a
   payment — every Donate button simply opens this in a new tab.

   The query string carries the designation. Do not trim it: strip
   the ids and the gift lands in Young Life's general fund instead
   of Armenia. If it ever needs replacing, get the new link from the
   Young Life giving page rather than editing the parameters here. */
const DONATION_URL = "https://giving.younglife.org/s/?GiftType=Area&Name=armenia&Frequency=One-Time&AppealCodeId=70141000000tvBDAAY&BypassDesignationPage=false&MissionUnitId=a2s410000002vjaAAA&MissionUnitName=Armenia&ClassCodeId=a2j41000000Nj93AAC&ClassCodeName=Operating";

/* 2. Every photo on the page is now a real Young Life Armenia
      photograph in /images/, so this stays true. Nothing on the
      page loads from an outside host any more. */
const USE_LOCAL_IMAGES = true;

/* 3. Every photo on the page, in one place.
      local  = filename in /images/
      remote = kept equal to local; the prototype's stock photos are gone
      Replacing a photo = drop the file in /images/ with the same name. */
const YL_IMAGES = {
  hero:      { local:"images/games/games-hoop-relay.jpg", remote:"images/games/games-hoop-relay.jpg" },
  storyNew:  { local:"images/club/club-cafe-table.jpg", remote:"images/club/club-cafe-table.jpg" },
  storyFriends: { local:"images/club/club-cafe-cards.jpg", remote:"images/club/club-cafe-cards.jpg" },
  arch1:     { local:"images/games/games-legs.jpg", remote:"images/games/games-legs.jpg" },
  arch2:     { local:"images/wet-games/wet-games-hose.jpg", remote:"images/wet-games/wet-games-hose.jpg" },
  arch3:     { local:"images/archive/archive-stage.jpg", remote:"images/archive/archive-stage.jpg" },
  arch4:     { local:"images/camp/camp-courtyard.jpg", remote:"images/camp/camp-courtyard.jpg" },
  campHero:  { local:"images/camp/camp-main-building.jpg", remote:"images/camp/camp-main-building.jpg" },
  histNew:   { local:"images/camp/camp-grounds.jpg", remote:"images/camp/camp-grounds.jpg" },
  video1:    { local:"images/wet-games/wet-games-group-wide.jpg", remote:"images/wet-games/wet-games-group-wide.jpg" },
  video2:    { local:"images/club/club-stage.jpg", remote:"images/club/club-stage.jpg" },
  video3:    { local:"images/camp/camp-grounds.jpg", remote:"images/camp/camp-grounds.jpg" },
  video4:    { local:"images/club/club-clapping.jpg", remote:"images/club/club-clapping.jpg" },
  blog1:     { local:"images/wet-games/wet-games-run.jpg", remote:"images/wet-games/wet-games-run.jpg" },
  blog2:     { local:"images/games/games-stilts.jpg", remote:"images/games/games-stilts.jpg" },
  blog3:     { local:"images/camp/camp-main-building.jpg", remote:"images/camp/camp-main-building.jpg" },
  blog4:     { local:"images/colour/colour-pair.jpg", remote:"images/colour/colour-pair.jpg" },
  blog5:     { local:"images/club/club-hands.jpg", remote:"images/club/club-hands.jpg" },
  blog6:     { local:"images/camp/camp-grounds.jpg", remote:"images/camp/camp-grounds.jpg" },
  face1:     { local:"images/games/games-face-girl.jpg", remote:"images/games/games-face-girl.jpg" },
  face2:     { local:"images/games/games-face-boy.jpg", remote:"images/games/games-face-boy.jpg" },
  jerryNelda: { local:"images/people/jerry-and-nelda.jpg", remote:"images/people/jerry-and-nelda.jpg" },
  way1:      { local:"images/wet-games/wet-games-group-wide.jpg", remote:"images/wet-games/wet-games-group-wide.jpg" },
  way2:      { local:"images/games/games-stilts-team.jpg", remote:"images/games/games-stilts-team.jpg" },
  way3:      { local:"images/archive/archive-stage.jpg", remote:"images/archive/archive-stage.jpg" },
  /* ---- Pioneer Camp itself: real photographs of the grounds ---- */
  campGrounds:  { local:"images/camp/camp-grounds.jpg",       remote:"images/camp/camp-grounds.jpg" },
  campBuilding: { local:"images/camp/camp-main-building.jpg", remote:"images/camp/camp-main-building.jpg" },
  campCourtyard:{ local:"images/camp/camp-courtyard.jpg",     remote:"images/camp/camp-courtyard.jpg" },

  /* ---- In the mountains: real Young Life Armenia photographs ---- */
  mtnRidge:     { local:"images/mountains/mountains-ridge-line.jpg", remote:"images/mountains/mountains-ridge-line.jpg" },
  mtnUphill:    { local:"images/mountains/mountains-uphill.jpg",     remote:"images/mountains/mountains-uphill.jpg" },
  mtnHikers:    { local:"images/mountains/mountains-two-hikers.jpg", remote:"images/mountains/mountains-two-hikers.jpg" },
  mtnTruck:     { local:"images/mountains/mountains-truck.jpg",      remote:"images/mountains/mountains-truck.jpg" },

  /* ---- Young Life Sport: real Young Life Armenia photographs ---- */
  sportHuddle:  { local:"images/sport/sport-huddle-grass.jpg",   remote:"images/sport/sport-huddle-grass.jpg" },
  sportEmbrace: { local:"images/sport/sport-embrace.jpg",        remote:"images/sport/sport-embrace.jpg" },
  sportMatch:   { local:"images/sport/sport-match-wide.jpg",     remote:"images/sport/sport-match-wide.jpg" },
  sportDuel:    { local:"images/sport/sport-duel.jpg",           remote:"images/sport/sport-duel.jpg" },
  sportBall:    { local:"images/sport/sport-on-the-ball.jpg",    remote:"images/sport/sport-on-the-ball.jpg" },
  sportPlayer:  { local:"images/sport/sport-portrait.jpg",       remote:"images/sport/sport-portrait.jpg" },
  sportTeamTalk:{ local:"images/sport/sport-team-talk.jpg",      remote:"images/sport/sport-team-talk.jpg" },
  sportMedals1: { local:"images/sport/sport-medals-young.jpg",   remote:"images/sport/sport-medals-young.jpg" },
  sportMedals2: { local:"images/sport/sport-medals-gold.jpg",    remote:"images/sport/sport-medals-gold.jpg" },
  sportMedals3: { local:"images/sport/sport-medals-bronze.jpg",  remote:"images/sport/sport-medals-bronze.jpg" },

  /* ---- Club nights: real Young Life Armenia photographs ---- */
  clubNight:    { local:"images/archive/archive-club-night.jpg", remote:"images/archive/archive-club-night.jpg" },
  clubStage:    { local:"images/archive/archive-stage.jpg",      remote:"images/archive/archive-stage.jpg" },
  clubHands:    { local:"images/club/club-hands.jpg",            remote:"images/club/club-hands.jpg" },
  clubMics:     { local:"images/club/club-stage.jpg",            remote:"images/club/club-stage.jpg" },
  clubClapping: { local:"images/club/club-clapping.jpg",         remote:"images/club/club-clapping.jpg" },
  clubWorship:  { local:"images/club/club-worship.jpg",          remote:"images/club/club-worship.jpg" },
  clubMicPair:  { local:"images/club/club-mic-pair.jpg",         remote:"images/club/club-mic-pair.jpg" },
  clubPanel:    { local:"images/club/club-panel.jpg",            remote:"images/club/club-panel.jpg" },
  clubCrowd:    { local:"images/club/club-crowd.jpg",            remote:"images/club/club-crowd.jpg" },
  clubLaugh:    { local:"images/club/club-laugh.jpg",            remote:"images/club/club-laugh.jpg" },

  /* ---- Colour Day: powder paint, foam and a hosepipe ---- */
  colourGroup:  { local:"images/colour/colour-group.jpg",  remote:"images/colour/colour-group.jpg" },
  colourThrow:  { local:"images/colour/colour-throw.jpg",  remote:"images/colour/colour-throw.jpg" },
  colourPair:   { local:"images/colour/colour-pair.jpg",   remote:"images/colour/colour-pair.jpg" },
  colourFoam:   { local:"images/colour/colour-foam.jpg",   remote:"images/colour/colour-foam.jpg" },
  colourHelmet: { local:"images/colour/colour-helmet.jpg", remote:"images/colour/colour-helmet.jpg" },
  colourFace:   { local:"images/colour/colour-face.jpg",   remote:"images/colour/colour-face.jpg" },
  colourCrew:   { local:"images/colour/colour-crew.jpg",   remote:"images/colour/colour-crew.jpg" },
  /* Everyone throwing powder at once — portrait, so it lives in the
     gallery rather than the full-bleed 21:9 finale. */
  colourLaunch: { local:"images/colour/colour-launch.jpg", remote:"images/colour/colour-launch.jpg" },

  /* ---- Relays & team games: real Young Life Armenia photographs ---- */
  gameHoopRelay: { local:"images/games/games-hoop-relay.jpg", remote:"images/games/games-hoop-relay.jpg" },
  gameDuo:       { local:"images/games/games-duo.jpg",        remote:"images/games/games-duo.jpg" },
  gameHoopRun:   { local:"images/games/games-hoop-run.jpg",   remote:"images/games/games-hoop-run.jpg" },
  gameHoopBoys:  { local:"images/games/games-hoop-boys.jpg",  remote:"images/games/games-hoop-boys.jpg" },
  gameBoysRelay: { local:"images/games/games-boys-relay.jpg", remote:"images/games/games-boys-relay.jpg" },
  gameLegs:      { local:"images/games/games-legs.jpg",       remote:"images/games/games-legs.jpg" },
  gameStilts:    { local:"images/games/games-stilts.jpg",     remote:"images/games/games-stilts.jpg" },
  gameStiltsTeam:{ local:"images/games/games-stilts-team.jpg",remote:"images/games/games-stilts-team.jpg" },
  gamePass:      { local:"images/games/games-pass.jpg",       remote:"images/games/games-pass.jpg" },
  gameFaceGirl:  { local:"images/games/games-face-girl.jpg",  remote:"images/games/games-face-girl.jpg" },
  gameFaceBoy:   { local:"images/games/games-face-boy.jpg",   remote:"images/games/games-face-boy.jpg" },
  gameWatermelon:{ local:"images/games/games-watermelon.jpg", remote:"images/games/games-watermelon.jpg" },

  /* ---- Wet Games: real Young Life Armenia photographs. -------------
     Not placeholders, so local and remote point at the same file and
     they render whichever mode USE_LOCAL_IMAGES is in. ---------------- */
  wetGroup:  { local:"images/wet-games/wet-games-group.jpg",  remote:"images/wet-games/wet-games-group.jpg" },
  /* the same group shot, cropped to a band so the crowd fills a wide frame */
  wetGroupWide: { local:"images/wet-games/wet-games-group-wide.jpg", remote:"images/wet-games/wet-games-group-wide.jpg" },
  wetHose:   { local:"images/wet-games/wet-games-hose.jpg",   remote:"images/wet-games/wet-games-hose.jpg" },
  wetPool:   { local:"images/wet-games/wet-games-pool.jpg",   remote:"images/wet-games/wet-games-pool.jpg" },
  wetRun:    { local:"images/wet-games/wet-games-run.jpg",    remote:"images/wet-games/wet-games-run.jpg" },
  wetLaugh:  { local:"images/wet-games/wet-games-laugh.jpg",  remote:"images/wet-games/wet-games-laugh.jpg" },
  wetFoamOrca: { local:"images/wet-games/wet-games-foam-orca.jpg", remote:"images/wet-games/wet-games-foam-orca.jpg" },
  wetOrcaGirl: { local:"images/wet-games/wet-games-orca-girl.jpg", remote:"images/wet-games/wet-games-orca-girl.jpg" },
  wetFlippers: { local:"images/wet-games/wet-games-flippers.jpg",  remote:"images/wet-games/wet-games-flippers.jpg" },

  cta:       { local:"images/games/games-hoop-run.jpg", remote:"images/games/games-hoop-run.jpg" }
};

/* ------------------------------------------------------------
   4. VIDEOS — the three films, and the only place they are listed.

   The films are NOT in this repository. They are far too big: a
   Cloudflare Pages deploy rejects any single file over 25 MiB, and
   GitHub over 100 MB. So they are hosted elsewhere and embedded on
   demand. Nothing is requested from any video host until a visitor
   presses play — until then each slot is a poster photograph from
   images/, like the rest of the page.

   Each film names its host with exactly ONE of these three keys:

     drive:  "FILE_ID"   Google Drive. Where things stand today.
                         The id is the long string in a share link:
                         drive.google.com/file/d/THIS_PART/view
                         The file MUST be shared "Anyone with the
                         link -> Viewer" or visitors see "You need
                         access" while the owner sees it working.

     file:   "Name"      A plain .mp4 served from VIDEO_DIR below —
                         a Cloudflare R2 bucket, or any web server.
                         No extension here: the player tries .mp4,
                         then .webm, then .mov. This is the one to
                         move to; see videos/README.md.

     stream: "VIDEO_UID" Cloudflare Stream. Costs a little, but
                         re-encodes each film so a phone on a slow
                         connection gets a smaller version instead
                         of stalling. Also set STREAM_CUSTOMER.

   Switching host = changing that one key. Nothing else moves.

   featured: true  -> the large player at the top of the section
   years:    true  -> also embedded in the 25 Years section
   dur:            -> small label. Leave "" to hide it.
   ------------------------------------------------------------ */

/* Where `file:` videos are served from. Keep the trailing slash.
   The /video/ endpoint, which streams from R2 via a Pages Function.
   Videos are protected: only these three IDs are allowed to stream,
   and the R2 bucket itself is not publicly accessible. */
const VIDEO_DIR = "/video/";

/* Only for `stream:`. Copy the customer code out of the embed URL
   Cloudflare shows on the Stream dashboard — it looks like
   customer-a1b2c3d4e5.cloudflarestream.com. Leave "" if unused. */
const STREAM_CUSTOMER = "";

/* Only used for `file:` videos. Tried in order. .mov carries no type
   on purpose: some browsers refuse video/quicktime outright but play
   the H.264 inside it happily when left to sniff the file. */
const VIDEO_FORMATS = [
  { ext:"mp4",  type:"video/mp4" },
  { ext:"webm", type:"video/webm" },
  { ext:"mov",  type:"" }
];

const YL_VIDEOS = [
  {
    file:   "camp-tour",
    title:  "A tour of Pioneer Camp with Lee Ann",
    blurb:  "A walk through the camp — the buildings, the grounds and what happens in them.",
    poster: "campHero",
    scene:  "forest",
    dur:    "",
    featured: true
  },
  {
    file:   "25-years",
    title:  "25 years of Young Life Armenia",
    blurb:  "The anniversary film: archive footage and today's camp, twenty-five years side by side.",
    poster: "arch3",
    scene:  "archive",
    dur:    "",
    years:  true
  },
  {
    file:   "younglife-2",
    /* TODO: rename this once someone confirms what the film is. */
    title:  "Young Life Armenia",
    blurb:  "<span class=\"ph\">A short description of this film</span>",
    poster: "video1",
    scene:  "fire",
    dur:    ""
  }
];

/* Filter labels shown on each gallery card. */
/* Also the chip order in the gallery, left to right. The first one
   is what the section opens on, so keep the camp at the front. */
const GALLERY_LABELS = {
  camp:"Pioneer Camp", mountains:"In the mountains", archive:"Club nights",
  wet:"Water Games", colour:"Colour Day", games:"Relays", sport:"Sport"
};

/* Gallery contents. Read by js/components/gallery.js.
    cat = filter category, r = shape, cap = caption key. */
const YL_GALLERY = [
  { img:"mtnRidge",   cat:"mountains", r:"g-2", cap:"Walking out under the peak" },
  { img:"mtnUphill",  cat:"mountains", r:"g-1", cap:"The last stretch uphill" },
  { img:"mtnHikers",  cat:"mountains", r:"g-1", cap:"Weather coming in across the gorge" },
  { img:"mtnTruck",   cat:"mountains", r:"g-1", cap:"Getting there is half of it" },
  { img:"sportMatch",     cat:"sport", r:"g-1", cap:"The match, with the valley behind" },
  { img:"sportDuel",      cat:"sport", r:"g-1", cap:"Shoulder to shoulder for the ball" },
  { img:"sportBall",      cat:"sport", r:"g-1", cap:"On the ball" },
  { img:"sportEmbrace",   cat:"sport", r:"g-1", cap:"Full time" },
  { img:"sportHuddle",    cat:"sport", r:"g-1", cap:"Catching breath between halves" },
  { img:"sportTeamTalk",  cat:"sport", r:"g-1", cap:"The team talk" },
  { img:"sportPlayer",    cat:"sport", r:"g-1", cap:"Waiting for the restart" },
  { img:"sportMedals1",   cat:"sport", r:"g-1", cap:"Young Life Sport, with the cup" },
  { img:"sportMedals2",   cat:"sport", r:"g-1", cap:"Gold, and the trophy to prove it" },
  { img:"sportMedals3",   cat:"sport", r:"g-1", cap:"Bronze, and no complaints" },
  { img:"campGrounds",   cat:"camp", r:"g-1", cap:"The camp grounds from above" },
  { img:"campBuilding",  cat:"camp", r:"g-2", cap:"The main building" },
  { img:"campCourtyard", cat:"camp", r:"g-1", cap:"The courtyard, looking into the forest" },
  { img:"wetHose",  cat:"wet", r:"g-1", cap:"The hose reaches everybody" },
  { img:"wetPool",  cat:"wet", r:"g-4", cap:"The pool is the most dangerous place to stand" },
  { img:"wetRun",   cat:"wet", r:"g-1", cap:"Running away doesn't help" },
  { img:"wetLaugh", cat:"wet", r:"g-4", cap:"Laughing to the last drop" },
  { img:"wetGroup", cat:"wet", r:"g-2", cap:"The whole camp in one frame" },
  { img:"wetFoamOrca",  cat:"wet", r:"g-1", cap:"Riding the orca through the foam" },
  { img:"wetOrcaGirl",  cat:"wet", r:"g-4", cap:"Dragging the orca back for another go" },
  { img:"wetFlippers",  cat:"wet", r:"g-1", cap:"Goggles and flippers, on dry grass" },
  { img:"gameHoopRelay",  cat:"games", r:"g-5", cap:"The hoop must not drop — everything else is a detail" },
  { img:"gameDuo",        cat:"games", r:"g-2", cap:"The orange team, halfway through" },
  { img:"gameHoopRun",    cat:"games", r:"g-5", cap:"The whole team inside one hoop" },
  { img:"gameBoysRelay",  cat:"games", r:"g-2", cap:"The reds are ahead, for now" },
  { img:"gameLegs",       cat:"games", r:"g-5", cap:"The green team learning to walk together" },
  { img:"gameStilts",     cat:"games", r:"g-2", cap:"First steps on the stilts" },
  { img:"gamePass",       cat:"games", r:"g-2", cap:"The hand-off, without hands" },
  { img:"gameFaceGirl",   cat:"games", r:"g-3", cap:"After the game" },
  { img:"gameWatermelon", cat:"games", r:"g-1", cap:"A break, with watermelon" },
  { img:"gameHoopBoys",   cat:"games", r:"g-5", cap:"The green team, hoop still on" },
  { img:"colourThrow",    cat:"colour", r:"g-5", cap:"The bucket that starts it" },
  { img:"colourPair",     cat:"colour", r:"g-2", cap:"Soaked, painted, still standing" },
  { img:"colourHelmet",   cat:"colour", r:"g-1", cap:"A watermelon rind makes a good helmet" },
  { img:"colourFoam",     cat:"colour", r:"g-2", cap:"Shaving foam, and no complaints" },
  { img:"colourGroup",    cat:"colour", r:"g-5", cap:"Everyone, at the end of Colour Day" },
  { img:"colourLaunch",   cat:"colour", r:"g-1", cap:"Everyone throws at once, on three" },
  { img:"colourFace",     cat:"colour", r:"g-1", cap:"Green on one side, red on the other" },
  { img:"colourCrew",     cat:"colour", r:"g-2", cap:"Five of them, unrecognisable" },
  { img:"clubStage",      cat:"archive", r:"g-5", cap:"Club night, from the stage" },
  { img:"clubNight",      cat:"archive", r:"g-2", cap:"From the front row" },
  { img:"clubMics",       cat:"archive", r:"g-2", cap:"A leader and a camper share the microphone" },
  { img:"clubHands",      cat:"archive", r:"g-5", cap:"Hands up, singing together" },
  { img:"clubClapping",   cat:"archive", r:"g-2", cap:"The front row, mid-song" },
  { img:"clubWorship",    cat:"archive", r:"g-5", cap:"Three voices and the words on the screen" },
  { img:"clubPanel",      cat:"archive", r:"g-5", cap:"Four of them answering questions on stage" },
  { img:"clubCrowd",      cat:"archive", r:"g-2", cap:"Arms out, halfway through the song" },
  { img:"clubLaugh",      cat:"archive", r:"g-1", cap:"Somewhere in the middle of the room" },
  { img:"clubMicPair",    cat:"archive", r:"g-2", cap:"Called up to the front" }
];

/* ------------------------------------------------------------
   Hero preload.
   The hero photo is the largest paint on the page, and its URL
   only exists here — so the browser cannot discover it from the
   markup. Injecting the preload while config.js parses lets the
   download start immediately instead of waiting for main.js.
   ------------------------------------------------------------ */
(function preloadHero() {
  const hero = YL_IMAGES.hero;
  if (!hero) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = USE_LOCAL_IMAGES ? hero.local : hero.remote;
  link.setAttribute("fetchpriority", "high");
  document.head.appendChild(link);
})();

/* ---- js/core/dom.js ---- */
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

/* ---- js/core/images.js ---- */
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

/* ---- js/components/donate.js ---- */
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

/* ---- js/components/header.js ---- */
/* ============================================================
   Header.
   Transparent over the hero, solid once the visitor starts
   reading, so the navigation stays legible over any photograph.
   ============================================================ */
window.YL = window.YL || {};

YL.header = (function () {
  "use strict";

  const SOLID_AFTER = 40; // px

  function init() {
    const header = YL.dom.$("#header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("solid", window.pageYOffset > SOLID_AFTER);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  return { init };
})();

/* ---- js/components/mobile-menu.js ---- */
/* ============================================================
   Mobile menu.
   Closes on link click, on Escape, and after a language change,
   and returns focus to the button that opened it.
   ============================================================ */
window.YL = window.YL || {};

YL.mobileMenu = (function () {
  "use strict";

  const CLOSE_DELAY = 320; // must match the CSS transition
  let menu, burger;

  function open() {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add("open"));
    burger.setAttribute("aria-expanded", "true");
    YL.dom.lockScroll();

    const first = menu.querySelector("a, button");
    if (first) first.focus();
  }

  function close() {
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    YL.dom.unlockScroll();
    window.setTimeout(() => { menu.hidden = true; }, CLOSE_DELAY);
    burger.focus();
  }

  function init() {
    menu   = YL.dom.$("#menu");
    burger = YL.dom.$("#burger");

    burger.addEventListener("click", open);
    YL.dom.$("#menuClose").addEventListener("click", close);
    YL.dom.$$("#menu nav a").forEach(link => link.addEventListener("click", close));

    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  return { init, open, close };
})();

/* ---- js/components/nav-submenu.js ---- */
/* ============================================================
   Desktop navigation submenu.
   Opens on hover and on click, closes on Escape, on outside
   click, and when focus leaves the group — so it works the same
   with a mouse, a keyboard or a screen reader. The mobile menu
   needs none of this: there the submenu is simply always open.
   ============================================================ */
window.YL = window.YL || {};

YL.navSubmenu = (function () {
  "use strict";

  function init() {
    YL.dom.$$(".nav .has-sub").forEach(group => {
      const toggle = group.querySelector(".sub-toggle");
      if (!toggle) return;

      const set = open => {
        group.setAttribute("data-open", String(open));
        toggle.setAttribute("aria-expanded", String(open));
      };

      group.addEventListener("mouseenter", () => set(true));
      group.addEventListener("mouseleave", () => set(false));

      toggle.addEventListener("click", e => {
        e.preventDefault();
        set(toggle.getAttribute("aria-expanded") !== "true");
      });

      /* focusout fires after focus has moved, so relatedTarget tells us
         whether the new target is still inside the group. */
      group.addEventListener("focusout", e => {
        if (!group.contains(e.relatedTarget)) set(false);
      });

      group.addEventListener("keydown", e => {
        if (e.key === "Escape") { set(false); toggle.focus(); }
      });

      group.querySelectorAll(".submenu a").forEach(link => {
        link.addEventListener("click", () => set(false));
      });
    });

    document.addEventListener("click", e => {
      YL.dom.$$(".nav .has-sub").forEach(group => {
        if (!group.contains(e.target)) {
          group.setAttribute("data-open", "false");
          group.querySelector(".sub-toggle").setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  return { init };
})();

/* ---- js/components/camp-history.js ---- */
/* ============================================================
   Camp history tabs (then / transformation / today).
   Standard ARIA tab pattern: one tab in the tab order, arrow
   keys move between them.
   ============================================================ */
window.YL = window.YL || {};

YL.campHistory = (function () {
  "use strict";

  function init() {
    const tabs = YL.dom.$$(".hist-tab");
    if (!tabs.length) return;

    function select(tab) {
      tabs.forEach(other => {
        const selected = other === tab;
        other.setAttribute("aria-selected", String(selected));
        other.tabIndex = selected ? 0 : -1;

        const panel = document.getElementById(other.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", e => {
        let next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft")  next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (!next) return;
        e.preventDefault();
        select(next);
        next.focus();
      });
    });
  }

  return { init };
})();

/* ---- js/components/gallery.js ---- */
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

/* ---- js/components/lightbox.js ---- */
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

/* ---- js/components/videos.js ---- */
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

/* ---- js/components/testimonials.js ---- */
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

/* ---- js/components/contact-form.js ---- */
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

/* ---- js/components/reveal.js ---- */
/* ============================================================
   Scroll reveal + the years counter.
   Both are decoration: without IntersectionObserver, or with
   reduced motion on, everything is simply shown at its final
   value straight away.
   ============================================================ */
window.YL = window.YL || {};

YL.reveal = (function () {
  "use strict";

  const SELECTOR = ".reveal, .trail li";

  function format(n) {
    try { return n.toLocaleString("en"); }
    catch (e) { return String(n); }
  }

  function countUp(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";

    if (YL.dom.prefersReducedMotion()) {
      el.textContent = format(target) + suffix;
      return;
    }

    let value = 0;
    const step = Math.max(1, Math.round(target / 28));

    (function tick() {
      value = Math.min(target, value + step);
      el.textContent = format(value) + suffix;
      if (value < target) requestAnimationFrame(tick);
    })();
  }


  function showAll() {
    YL.dom.$$(SELECTOR).forEach(el => el.classList.add("in"));
    YL.dom.$$("[data-count]").forEach(countUp);
  }

  function init() {
    if (!("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");

        const counter = entry.target.querySelector("[data-count]");
        if (counter && !counter.dataset.done) {
          counter.dataset.done = "1";
          countUp(counter);
        }

        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    YL.dom.$$(SELECTOR).forEach(el => observer.observe(el));
  }

  return { init };
})();

/* ---- js/main.js ---- */
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
