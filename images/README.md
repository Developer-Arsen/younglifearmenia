# Photographs

These are the real Young Life Armenia and Pioneer Camp photographs, filed by
subject: `camp/`, `club/`, `colour/`, `games/`, `wet-games/`, `archive/`.
Every one of them is referenced from `YL_IMAGES` in `js/config.js`, and
`USE_LOCAL_IMAGES` is `true`, so nothing on the page loads from an outside
host. To replace a photo, overwrite the file under the same name.

Guidance:
- Export at 1600px on the long edge, JPEG quality ~75, or WebP.
- Landscape for hero, camp panorama and the donation CTA; portrait works well
  in the gallery and the 25-year archive strip.
- Update the matching `alt` text on the `<img>` in `index.html` whenever a
  photo changes — the alt describes the picture, not the filename.
- The `*-sm.jpg` files in `wet-games/` are phone-sized copies kept for a
  future `srcset`; nothing references them yet.
