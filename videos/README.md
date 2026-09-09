---
name: videos
description: Why this folder is empty, how to host the films on Cloudflare R2, and how to point the site at them.
---

# Videos

**This folder is empty on purpose.** The films are far too big to ship
with the site: Cloudflare Pages refuses any single file over **25 MiB**,
and GitHub refuses anything over **100 MB**. Putting an `.mp4` in here is
what makes a deploy fail.

So the films live on a host, and the site embeds them on demand. Which
host is one line per film in `js/config.js`.

| Key in `js/config.js` | Host | Cost |
|---|---|---|
| `drive: "id"` | Google Drive | free, fragile |
| `file: "Name"` | Cloudflare R2 (or any web server) | free at this size |
| `stream: "uid"` | Cloudflare Stream | ~$1–2/month |

**Today the three films are on Google Drive.** That works, but Drive is
not a video host — it is rate-limited, it brands the player, and it
breaks silently if anyone changes the file's sharing setting. The rest of
this file is how to move to R2, which is better in every way and costs
nothing at this size.

---

## Step 1 — Compress the films first

Do this before uploading, whichever host you pick. A 600 MB export will
technically work and will buffer horribly on a phone.

1. Install **HandBrake** (free, handbrake.fr).
2. Open a film, choose the preset **Fast 1080p30**.
3. Set the format to **MP4** and tick **Web Optimized** — this moves the
   index to the front of the file so playback can start before the whole
   thing has downloaded. Skip it and the film feels broken on a slow
   connection.
4. Start Encode. Expect 40–120 MB out of a 600 MB source, with no
   visible loss.

Name the outputs exactly:

    CampTourWithLeeAnn.mp4
    YoungLife25thbirthdayFullHD.mp4
    YoungLife2.mp4

## Step 2 — Make an R2 bucket

1. Sign in at **dash.cloudflare.com** → **R2** in the sidebar. Adding a
   payment card is required even though this will cost nothing; the free
   tier is 10 GB of storage and unlimited egress, and three compressed
   films are well under 1 GB.
2. **Create bucket**. Name it `younglife-videos`. Leave the location on
   Automatic.
3. Open the bucket → **Upload** → drag in the three `.mp4` files.

## Step 3 — Put the bucket on a subdomain

Cloudflare gives every bucket a free `…r2.dev` address, but **do not use
it for the live site**. Cloudflare's own docs say it is for testing only,
it is rate-limited, and it starts returning 429 errors under load. A
custom domain also gets you Cloudflare's cache, which the r2.dev address
does not.

1. The site's domain has to be on Cloudflare for this. If it is not yet:
   **Add a site** in the dashboard and change the nameservers at your
   registrar to the two Cloudflare gives you. Allow a few hours.
2. In the bucket: **Settings** → **Custom Domains** → **Connect Domain**.
3. Enter a subdomain — `video.younglifearmenia.org` (whatever the real
   domain turns out to be). Cloudflare creates the DNS record itself.
4. Wait for it to go green, then check one film loads by opening
   `https://video.younglifearmenia.org/YoungLife2.mp4` in a browser.
   If it plays or downloads, this step is done.

## Step 4 — Point the site at it

Two edits in `js/config.js`, and nothing else in the project changes.

**One:** set the base URL. Keep the trailing slash.

```js
const VIDEO_DIR = "https://video.younglifearmenia.org/";
```

**Two:** in `YL_VIDEOS`, swap each film's `drive:` line for the `file:`
line already sitting commented out beneath it:

```js
// drive: "1UIITmogez_34RTUhL6gt_1oiKLxlRpRp",
file: "CampTourWithLeeAnn",
```

Then bump the `?v=` number in `index.html` (see CLAUDE.md) and run
`./build.sh`. Done — the films now play in the site's own player, with
the poster photographs, no Google branding and no sharing settings to
get wrong.

---

## If the films still stall on phones

R2 serves one file at one quality to everyone. If people on slow
connections complain, that is the moment to switch to **Cloudflare
Stream**, which re-encodes each film into several qualities and picks per
viewer. It bills $5 per 1,000 minutes stored and $1 per 1,000 minutes
watched, so three films of roughly 90 minutes total costs about
**$0.45/month** to store and a few cents per hour anyone actually
watches — call it $1–2/month.

To switch: upload in the dashboard under **Stream**, copy the video's
UID, then in `js/config.js` use `stream: "UID"` in place of `file:`, and
paste the account code from the embed URL Cloudflare shows you into
`STREAM_CUSTOMER` at the top of the file.

## Changing or adding a film later

Add a line to `YL_VIDEOS`:

```js
{
  file:   "MyNewFilm",    // or drive: "id"  /  stream: "uid"
  title:  "What the film is",
  blurb:  "One sentence about it.",
  poster: "campHero",     // any key from YL_IMAGES
  scene:  "forest",       // forest | fire | archive | ridge | people | water | stone | sun
  dur:    "06:40",        // leave "" to hide the label
  featured: true          // optional: the large player at the top
}
```

The Videos section rebuilds itself from that list. `years: true` puts a
film in the 25 Years section as well.

## Where each film appears now

| Film | Appears |
|---|---|
| A tour of Pioneer Camp with Lee Ann | Videos — the large player at the top |
| 25 years of Young Life Armenia | **25 Years in Armenia** section *and* Videos |
| Young Life Armenia | Videos |

## While the films are still on Drive

Every one must be shared **Anyone with the link → Viewer**. A restricted
file shows a grey "You need access" box to every visitor while looking
perfectly fine to whoever set it up, because they are signed in. Test it
in a private window, or on a phone that is not signed in to that account.
That is the only test that means anything.
