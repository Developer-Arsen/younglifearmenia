/* ============================================================
   Worker entry point.

   Two jobs:
   1. /video/<id>  -> stream the film out of the private R2
      bucket, with byte-range support so seeking works.
   2. everything else -> hand back to the static assets in dist/.

   Static assets are served before this Worker runs (assets are
   matched first unless run_worker_first is set), so in practice
   only /video/* and genuine 404s reach the code below.
   ============================================================ */

/* The only three keys that can ever be read out of the bucket.
   A request for anything else is a 404 — the bucket is never
   browsable and no other object can be addressed. */
const ALLOWED_VIDEOS = {
  "camp-tour":   "videos/CampTourWithLeeAnn.mp4",
  "25-years":    "videos/YoungLife25thbirthdayFullHD.mp4",
  "younglife-2": "videos/YoungLife-2-New.mp4",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/video/")) {
      return env.ASSETS.fetch(request);
    }

    const id = url.pathname.slice("/video/".length).replace(/\.(mp4|webm|mov)$/i, "");
    const key = ALLOWED_VIDEOS[id];
    if (!key) return new Response("Not found", { status: 404 });

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    const head = await env.MEDIA.head(key);
    if (!head) return new Response("Not found", { status: 404 });

    const size = head.size;
    const base = {
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=86400",
    };

    if (request.method === "HEAD") {
      return new Response(null, { status: 200, headers: { ...base, "Content-Length": String(size) } });
    }

    /* Range request: what the browser sends when someone drags the
       scrubber. Without a 206 here, seeking restarts the download. */
    const range = request.headers.get("Range");
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
      if (match) {
        const hasStart = match[1] !== "";
        const hasEnd = match[2] !== "";
        let start, end;

        if (hasStart) {
          start = parseInt(match[1], 10);
          end = hasEnd ? parseInt(match[2], 10) : size - 1;
        } else if (hasEnd) {
          const suffix = parseInt(match[2], 10);   /* bytes=-500 = last 500 */
          start = Math.max(0, size - suffix);
          end = size - 1;
        }

        if (start !== undefined && start <= end && start < size) {
          end = Math.min(end, size - 1);
          const length = end - start + 1;
          const part = await env.MEDIA.get(key, { range: { offset: start, length } });
          if (part) {
            return new Response(part.body, {
              status: 206,
              headers: {
                ...base,
                "Content-Length": String(length),
                "Content-Range": `bytes ${start}-${end}/${size}`,
              },
            });
          }
        }

        return new Response("Range not satisfiable", {
          status: 416,
          headers: { ...base, "Content-Range": `bytes */${size}` },
        });
      }
    }

    const object = await env.MEDIA.get(key);
    if (!object) return new Response("Not found", { status: 404 });

    return new Response(object.body, {
      status: 200,
      headers: { ...base, "Content-Length": String(size) },
    });
  },
};
