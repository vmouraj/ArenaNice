const CACHE='arena-nice-runtime-v12';
const OFFLINE='/app-v6.html';

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll([
      '/manifest.webmanifest',
      '/apple-touch-icon.png'
    ])).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    if(self.registration.navigationPreload){
      try{await self.registration.navigationPreload.enable()}catch(e){}
    }
    await self.clients.claim();
    const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const client of clients){
      try{await client.navigate(client.url)}catch(e){}
    }
  })());
});

self.addEventListener('message',event=>{
  if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);

  // Supabase nunca passa pelo cache do PWA.
  if(url.hostname.endsWith('supabase.co'))return;

  // Navegação/HTML: rede sempre primeiro. O último HTML válido serve somente como fallback offline.
  if(event.request.mode==='navigate'||event.request.destination==='document'){
    event.respondWith((async()=>{
      try{
        const preload=await event.preloadResponse;
        const response=preload||await fetch(event.request,{cache:'no-store'});
        if(response&&response.ok){
          const cache=await caches.open(CACHE);
          await cache.put(OFFLINE,response.clone());
        }
        return response;
      }catch(e){
        return (await caches.match(OFFLINE))||Response.error();
      }
    })());
    return;
  }

  // Demais arquivos: rede primeiro; cache apenas se estiver offline.
  event.respondWith(
    fetch(event.request,{cache:'no-store'}).then(async response=>{
      if(response&&response.ok&&url.origin===self.location.origin){
        const cache=await caches.open(CACHE);
        cache.put(event.request,response.clone()).catch(()=>{});
      }
      return response;
    }).catch(()=>caches.match(event.request))
  );
});