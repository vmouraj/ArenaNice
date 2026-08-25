const CACHE='arena-nice-v10';
const WRONG_SUPABASE='yibtlwnxdflogthsnhkwt.supabase.co';
const CORRECT_SUPABASE='yibtlwnxdflogthsnkwt.supabase.co';
const ASSETS=['/','/safe-shell.html','/arena-v4.html','/manifest.webmanifest','/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
  const u=new URL(event.request.url);
  if(u.hostname===WRONG_SUPABASE){u.hostname=CORRECT_SUPABASE;event.respondWith(fetch(new Request(u.toString(),event.request)));return;}
  if(event.request.method!=='GET')return;
  if(u.hostname.endsWith('supabase.co'))return;
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request).then(r=>r||caches.match('/safe-shell.html'))));
});