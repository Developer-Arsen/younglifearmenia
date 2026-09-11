export async function onRequest(context) {
  const { request, env, params } = context;
  
  // Get video ID from URL: /video/camp-tour or /video/camp-tour.mp4
  let videoId = params.path;
  
  // Strip extension if present (.mp4, .webm, .mov)
  videoId = videoId.replace(/\.(mp4|webm|mov)$/i, '');
  
  // -----------------------------------------------
  // 1. Only allow these 3 videos
  // -----------------------------------------------
  const ALLOWED_VIDEOS = {
    "camp-tour": "videos/CampTourWithLeeAnn.mp4",
    "25-years": "videos/YoungLife25thbirthdayFullHD.mp4",
    "younglife-2": "videos/YoungLife-2-New.mp4",
  };
  
  if (!ALLOWED_VIDEOS[videoId]) {
    return new Response("Not found", { status: 404 });
  }
  
  const r2Key = ALLOWED_VIDEOS[videoId];
  
  // -----------------------------------------------
  // 2. Get from R2 bucket
  // -----------------------------------------------
  const object = await env.MEDIA.get(r2Key);
  
  if (!object) {
    return new Response("Not found", { status: 404 });
  }
  
  // -----------------------------------------------
  // 3. Return video with proper headers
  // -----------------------------------------------
  const headers = new Headers();
  headers.set("Content-Type", "video/mp4");
  headers.set("Content-Length", String(object.size));
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "public, max-age=86400");
  
  return new Response(object.body, {
    status: 200,
    headers,
  });
}
