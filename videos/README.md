---
name: videos
description: Videos are protected via a Cloudflare Pages Function that streams from a private R2 bucket. This folder is empty.
---

# Videos — Protected Streaming

**This folder is empty on purpose.** The three films are hosted on a private Cloudflare R2 bucket and streamed through a Pages Function at `/video/<id>`, which validates requests and controls access.

## How it works

1. **Pages Function** (`functions/video/[[path]].js`) intercepts `/video/<id>` requests
2. **Whitelist check** — only these three video IDs are allowed:
   - `camp-tour` → CampTourWithLeeAnn.mp4
   - `25-years` → YoungLife25thbirthdayFullHD.mp4
   - `younglife-2` → YoungLife-2-New.mp4
3. **R2 fetch** — function retrieves the file from the private bucket
4. **Stream** — returns the video with proper headers (Accept-Ranges, Cache-Control, etc.)

A visitor can only access videos through the website. The R2 bucket itself is never publicly accessible.

## The mapping

| Video ID | R2 key | Page |
|---|---|---|
| `camp-tour` | `videos/CampTourWithLeeAnn.mp4` | Videos section (large player) |
| `25-years` | `videos/YoungLife25thbirthdayFullHD.mp4` | 25 Years section + Videos |
| `younglife-2` | `videos/YoungLife-2-New.mp4` | Videos section |

## To change a video

1. Upload the new `.mp4` to the R2 bucket at the correct path
2. Update the filename in the function's `ALLOWED_VIDEOS` object
3. Redeploy

## To add a fourth video

1. Upload the file to `videos/` in R2
2. Add an entry to `ALLOWED_VIDEOS` in the function
3. Add an entry to `YL_VIDEOS` in `js/config.js` with the same ID as `file:`
4. Change `VIDEO_DIR` to `/video/` (already done) or it will work automatically
5. Redeploy

## Format requirements

- **MP4 (H.264 + AAC)** with faststart flag set (so playback starts before the whole file is downloaded)
- HandBrake's "Fast 1080p30" preset + Web Optimized tick usually produces 40–120 MB from a 600 MB export

## The pages function

- File: `functions/video/[[path]].js`
- Binding: `MEDIA` (connected to the private `younglife-media` R2 bucket in `wrangler.toml`)
- Behavior: strips file extensions (.mp4, .webm, .mov) from the URL, serves the protected video with proper headers
