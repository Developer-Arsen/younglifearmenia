export async function onRequest(context) {
  const { request, env, params } = context;
  
  // Get video ID from URL
  let videoId = params.path || '';
  
  // Strip extension if present
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
    return new Response("Video not found", { 
      status: 404,
      statusText: "Not Found"
    });
  }
  
  const r2Key = ALLOWED_VIDEOS[videoId];
  
  // -----------------------------------------------
  // 2. Get object metadata from R2
  // -----------------------------------------------
  try {
    const object = await env.MEDIA.head(r2Key);
    
    if (!object) {
      return new Response("Video not found on server", { 
        status: 404,
        statusText: "Not Found"
      });
    }
    
    const fileSize = object.size;
    const rangeHeader = request.headers.get('range');
    
    // -----------------------------------------------
    // 3. Handle range requests (for seeking/scrubbing)
    // -----------------------------------------------
    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      
      if (start >= fileSize || end >= fileSize) {
        return new Response("Requested Range Not Satisfiable", {
          status: 416,
          statusText: "Range Not Satisfiable",
          headers: {
            "Content-Range": `bytes */${fileSize}`,
          }
        });
      }
      
      const chunkSize = (end - start) + 1;
      const objectRange = await env.MEDIA.get(r2Key, {
        range: { offset: start, length: chunkSize }
      });
      
      return new Response(objectRange.body, {
        status: 206,
        statusText: "Partial Content",
        headers: {
          "Content-Type": "video/mp4",
          "Content-Length": chunkSize.toString(),
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=3600",
        }
      });
    }
    
    // -----------------------------------------------
    // 4. Full file request
    // -----------------------------------------------
    const object = await env.MEDIA.get(r2Key);
    
    if (!object) {
      return new Response("Video not found", { 
        status: 404,
        statusText: "Not Found"
      });
    }
    
    const headers = new Headers();
    headers.set("Content-Type", "video/mp4");
    headers.set("Content-Length", fileSize.toString());
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=3600");
    headers.set("Access-Control-Allow-Origin", "*");
    
    return new Response(object.body, {
      status: 200,
      headers,
    });
    
  } catch (error) {
    console.error("Video streaming error:", error);
    return new Response("Internal server error", { 
      status: 500,
      statusText: "Internal Server Error"
    });
  }
}
