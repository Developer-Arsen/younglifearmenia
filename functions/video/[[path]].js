export async function onRequest(context) {
  const { request, env, params } = context;
  const videoId = params.path;

  // Only these 3 videos allowed — match the IDs in js/config.js
  const VIDEOS = {
    "camp-tour": "videos/video1.mp4",
    "25-years": "videos/video1.mp4",
    "younglife-2": "videos/video3.mp4",
  };

  if (!VIDEOS[videoId]) {
    return new Response("Not found", { status: 404 });
  }

  const r2Key = VIDEOS[videoId];
  const object = await env.MEDIA.get(r2Key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(object.body, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(object.size),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=86400",
    },
  });
}