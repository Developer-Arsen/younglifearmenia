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
   Currently the media subdomain, where the three films are hosted.
   "videos/" would serve them from this repo instead, which a
   Cloudflare Pages deploy rejects for anything over 25 MiB. */
const VIDEO_DIR = "https://media.younglifearmenia.com/videos/";

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
    file:   "CampTourWithLeeAnn",
    title:  "A tour of Pioneer Camp with Lee Ann",
    blurb:  "A walk through the camp — the buildings, the grounds and what happens in them.",
    poster: "campHero",
    scene:  "forest",
    dur:    "",
    featured: true
  },
  {
    file:   "YoungLife25thbirthdayFullHD",
    title:  "25 years of Young Life Armenia",
    blurb:  "The anniversary film: archive footage and today's camp, twenty-five years side by side.",
    poster: "arch3",
    scene:  "archive",
    dur:    "",
    years:  true
  },
  {
    file:   "YoungLife-2-New",
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
