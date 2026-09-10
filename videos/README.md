---
name: videos
description: The films are served from media.younglifearmenia.com, not this folder. How to change or add one.
---

# Videos

**This folder is empty on purpose.** The films are far too big to ship with
the site — Cloudflare Pages refuses any single file over **25 MiB**, GitHub
over **100 MB** — so they are served from the media subdomain and embedded
on demand:

    https://media.younglifearmenia.com/videos/CampTourWithLeeAnn.mp4
    https://media.younglifearmenia.com/videos/YoungLife25thbirthdayFullHD.mp4
    https://media.younglifearmenia.com/videos/YoungLife2.mp4

Nothing is requested until a visitor presses play. Until then each slot
shows a poster photograph from `images/`, like the rest of the page.

## Where each film appears

| Film | Appears |
|---|---|
| A tour of Pioneer Camp with Lee Ann | Videos section — the large player at the top |
| 25 years of Young Life Armenia | **25 Years in Armenia** section *and* Videos |
| Young Life Armenia | Videos |

## Adding or replacing a film

Upload the `.mp4` to the same folder on the media host, then add a line to
`YL_VIDEOS` in `js/config.js`:

```js
{
  file:   "MyNewFilm",    // filename WITHOUT the extension
  title:  "What the film is",
  blurb:  "One sentence about it.",
  poster: "campHero",     // any key from YL_IMAGES
  scene:  "forest",       // forest | fire | archive | ridge | people | water | stone | sun
  dur:    "06:40",        // leave "" to hide the label
  featured: true          // optional: the large player at the top
}
```

`VIDEO_DIR` at the top of the same file is the base URL every `file:` entry
hangs off, so moving all three films to another host is one line.

The Videos section rebuilds itself from that list — add, remove or reorder
freely. `years: true` puts a film in the 25 Years section as well.

## Things that quietly break this

- **Filenames are case-sensitive on the server**, even though Windows and
  macOS let it slide locally. `younglife2.mp4` and `YoungLife2.mp4` are two
  different files once it is live.
- **Encode as MP4 (H.264 + AAC) with the "web optimized" / faststart flag
  set.** That flag moves the file's index to the front so playback can begin
  before the whole thing downloads; without it a film feels broken on a slow
  connection. HandBrake's "Fast 1080p30" preset plus the Web Optimized tick
  does both, and usually turns a 600 MB export into 40–120 MB.
- **CORS is not needed** for a plain `<video>` tag, but the host must send
  `Accept-Ranges: bytes` or visitors cannot skip forward. Both Cloudflare R2
  and any normal static host do this by default.
- **Check it signed out.** Open the site in a private window and press play
  on all three before launch.

## Other formats

The player tries `.mp4`, then `.webm`, then `.mov` under the same name, so a
`.webm` alongside the `.mp4` will be used by browsers that prefer it. `.mov`
is a fallback of last resort and is not reliable everywhere — convert it.

## If films stall on slow phones

One file is served at one quality to everyone. **Cloudflare Stream**
re-encodes each film into several qualities and picks per viewer; it bills
$5 per 1,000 minutes stored and $1 per 1,000 minutes watched, so three films
of roughly 90 minutes runs about $1–2/month. The code already supports it:
use `stream: "VIDEO_UID"` in place of `file:`, and put the account code from
the embed URL into `STREAM_CUSTOMER` at the top of `js/config.js`.

## Posters

The frame shown before play is a photograph from `images/`, set per film by
the `poster` key. The 25 Years section's copy is built from the same entry.
