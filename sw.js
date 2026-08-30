const CACHE='arena-nice-production-v19';
const APP='/app-v6.html';
const STATIC=['/manifest.webmanifest','/apple-touch-icon.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message',event=>{
  if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.hostname.endsWith('supabase.co'))return;

  if(event.request.mode==='navigate'||event.request.destination==='document'){
    event.respondWith((async()=>{
      try{
        const response=await fetch(event.request,{cache:'no-store'});
        if(response&&response.ok){
          const cache=await caches.open(CACHE);
          await cache.put(APP,response.clone());
        }
        return response;
      }catch(e){
        return (await caches.match(APP))||Response.error();
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    try{
      const response=await fetch(event.request,{cache:'no-store'});
      if(response&&response.ok&&url.origin===self.location.origin){
        const cache=await caches.open(CACHE);
        cache.put(event.request,response.clone()).catch(()=>{});
      }
      return response;
    }catch(e){
      return (await caches.match(event.request))||Response.error();
    }
  })());
});