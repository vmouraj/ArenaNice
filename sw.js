const CACHE='arena-nice-production-v21';
const APP='/app-v6.html';
const STATIC=['/manifest.webmanifest','/apple-touch-icon.png'];

const DESIGN_FIX=`<style id="arena-design-fix-v21">
.lock{position:fixed!important;inset:0!important;z-index:100!important;display:none!important;place-items:center!important;background:var(--bg)!important;padding:22px!important;overflow:auto!important}
.lock.active{display:grid!important}
.lockCard{width:min(100%,390px)!important;max-width:390px!important;background:#fff!important;border:1px solid var(--line)!important;border-radius:22px!important;padding:25px!important;text-align:center!important;box-shadow:0 24px 70px rgba(16,35,74,.16)!important}
.lockCard .brand{margin-bottom:18px!important}.lockCard h2{margin:8px 0 10px!important;font-size:24px!important;color:var(--navy)!important}.lockCard p{margin:0 0 14px!important}.lockCard .pin{width:100%!important;height:52px!important;letter-spacing:10px!important;text-align:center!important;font-size:22px!important;font-weight:900!important;margin:0!important}.lockCard .primary{width:100%!important;height:52px!important;margin-top:10px!important}
.app{width:100%!important;max-width:540px!important;margin:0 auto!important;padding-left:16px!important;padding-right:16px!important}.new{max-width:100%!important}.summary{width:100%!important}.stat{min-width:0!important}.row{max-width:100%!important}.bottom{width:100%!important;max-width:540px!important}.nav{min-width:0!important}.primary,.secondary,.danger,.finish{max-width:100%!important}.checkoutPay{max-width:100%!important}
@media(max-width:430px){.brand h1{font-size:40px!important}.brand small{font-size:9px!important;letter-spacing:3.2px!important}.app{padding-left:15px!important;padding-right:15px!important}.new{height:56px!important;font-size:16px!important}.stat{min-height:100px!important;padding:15px!important}.stat strong{font-size:24px!important}.row{padding:13px!important}.bottom{padding-left:7px!important;padding-right:7px!important}.nav{height:58px!important;font-size:9px!important}.nav b{font-size:19px!important}}
</style>`;
const AUTH_FIX=`<script id="arena-auth-fix-v21">(function(){try{if(!localStorage.getItem('arena-device-pin')&&localStorage.getItem('arena-device-authorized'))localStorage.setItem('arena-device-pin','migrated');const l=document.getElementById('lock');if(l&&localStorage.getItem('arena-device-pin'))l.classList.remove('active')}catch(e){}})();</script>`;

async function prepareHtml(response){
  if(!response||!response.ok)return response;
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return response;
  let html=await response.text();
  html=html.replace('</head>',DESIGN_FIX+'</head>').replace('</body>',AUTH_FIX+'</body>');
  const headers=new Headers(response.headers);headers.set('cache-control','no-store');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(const client of clients){try{await client.navigate(client.url)}catch(e){}}})())});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.hostname.endsWith('supabase.co'))return;if(event.request.mode==='navigate'||event.request.destination==='document'){event.respondWith((async()=>{try{const raw=await fetch(event.request,{cache:'no-store'});const response=await prepareHtml(raw);if(response&&response.ok){const cache=await caches.open(CACHE);await cache.put(APP,response.clone())}return response}catch(e){return(await caches.match(APP))||Response.error()}})());return}event.respondWith((async()=>{try{const response=await fetch(event.request,{cache:'no-store'});if(response&&response.ok&&url.origin===self.location.origin){const cache=await caches.open(CACHE);cache.put(event.request,response.clone()).catch(()=>{})}return response}catch(e){return(await caches.match(event.request))||Response.error()}})())});