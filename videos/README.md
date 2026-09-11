---
name: videos
description: The three films are on a Cloudflare R2 bucket, streamed via CDN. The folder is empty.
---

# Videos

**This folder is empty on purpose.** The films are hosted on a private Cloudflare R2 bucket and served via Cloudflare's CDN at:

```
https://younglife-media.r2.cloudflarecdn.com/videos/
```

The bucket itself is **private** — visitors can only access these three files:

- `CampTourWithLeeAnn.mp4` — Camp tour
- `YoungLife25thbirthdayFullHD.mp4` — 25th anniversary film  
- `YoungLife-2-New.mp4` — Young Life Armenia

## How it works

1. Videos are in `younglife-media` R2 bucket (private)
2. Only the three files above have public read access
3. Cloudflare CDN caches them at the edge for fast delivery worldwide
4. Accept-Ranges header is set, so visitors can skip/scrub through videos

## To change a video

1. Upload new `.mp4` to `younglife-media` R2 bucket in the `videos/` folder
2. If replacing a file, use the exact same name (or update the name in `js/config.js`)
3. Make sure the file has public read access in R2
4. Redeploy the site (builds will pick up `VIDEO_DIR` from config)

## To add a fourth video

1. Upload `.mp4` to `videos/` in R2, e.g. `MyNewFilm.mp4`
2. Add entry to `YL_VIDEOS` in `js/config.js`:
   ```js
   {
     file:   "MyNewFilm",
     title:  "What the film is",
     blurb:  "One sentence.",
     poster: "campHero",
     scene:  "forest",
     dur:    "06:40"
   }
   ```
3. Redeploy

## Video format

- **MP4 (H.264 + AAC)** with faststart flag
- HandBrake "Fast 1080p30" preset + Web Optimized tick usually gives 40–120 MB from a 600 MB export

## R2 bucket setup

Bucket name: `younglife-media`  
Location: Automatic  
Access: Private (only these three files have public access)

The `VIDEO_DIR` in `js/config.js` points to the public CDN URL so videos play directly in the browser's `<video>` tag.
