const CACHE='arena-nice-runtime-v14';
const OFFLINE='/app-v6.html';

function transformHtml(html){
  return html
    .replace('.del{border:0;border-radius:9px;color:var(--red)}', '.del{border:0;border-radius:9px;color:var(--red)}.quietDelete{width:36px;height:36px;border:0;border-radius:10px;background:transparent;color:#9AA6B8;font-size:16px;display:none;align-items:center;justify-content:center;margin-left:auto;padding:0}.quietDelete:active{background:#F1F4F8;color:#667085}')
    .replace('<button class="danger" id="deleteBtn" onclick="archiveAccount()" style="display:none">Excluir conta</button>', '<button class="quietDelete" id="deleteBtn" onclick="archiveAccount()" aria-label="Excluir conta" title="Excluir conta">🗑</button>')
    .replace("$('deleteBtn').style.display='block';renderProducts()", "$('deleteBtn').style.display=edit.status==='open'?'inline-flex':'none';renderProducts()")
    .replace("function archiveAccount(){if(!edit)return;if(!confirm('Excluir esta conta do sistema?'))return;edit.status='archived';saveSale(edit);account.close()}", "function archiveAccount(){if(!edit)return;if(!confirm('Excluir esta conta aberta?'))return;const id=edit.id;state.sales=state.sales.filter(s=>s.id!==id);state.outbox=state.outbox.filter(x=>!(x.type==='sale'&&x.id===id));saveState();renderAll();account.close();status('Conta excluída');if(navigator.onLine){req('tab_items?tab_id=eq.'+encodeURIComponent(id),{method:'DELETE'}).then(()=>req('tabs?id=eq.'+encodeURIComponent(id),{method:'DELETE'})).then(()=>{status('Sincronizado');return pullRemote()}).catch(e=>{console.warn(e);status('Excluída neste aparelho • sincronização pendente')})}}")
    .replace("function archiveAccount(){if(!edit)return;if(!confirm('Excluir esta conta aberta?'))return;edit.status='archived';saveSale(edit);account.close()}", "function archiveAccount(){if(!edit)return;if(!confirm('Excluir esta conta aberta?'))return;const id=edit.id;state.sales=state.sales.filter(s=>s.id!==id);state.outbox=state.outbox.filter(x=>!(x.type==='sale'&&x.id===id));saveState();renderAll();account.close();status('Conta excluída');if(navigator.onLine){req('tab_items?tab_id=eq.'+encodeURIComponent(id),{method:'DELETE'}).then(()=>req('tabs?id=eq.'+encodeURIComponent(id),{method:'DELETE'})).then(()=>{status('Sincronizado');return pullRemote()}).catch(e=>{console.warn(e);status('Excluída neste aparelho • sincronização pendente')})}}")
    .replace("if(!confirm('Excluir esta conta do sistema?'))return;", "if(!confirm('Excluir esta conta aberta?'))return;");
}

async function freshHtmlResponse(request,preload){
  const response=preload||await fetch(request,{cache:'no-store'});
  if(!response||!response.ok)return response;
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return response;
  const html=transformHtml(await response.text());
  const headers=new Headers(response.headers);
  headers.set('cache-control','no-store');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['/manifest.webmanifest','/apple-touch-icon.png'])).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    if(self.registration.navigationPreload){try{await self.registration.navigationPreload.enable()}catch(e){}}
    await self.clients.claim();
    const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const client of clients){try{await client.navigate(client.url)}catch(e){}}
  })());
});

self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.hostname.endsWith('supabase.co'))return;

  if(event.request.mode==='navigate'||event.request.destination==='document'){
    event.respondWith((async()=>{
      try{
        const response=await freshHtmlResponse(event.request,await event.preloadResponse);
        if(response&&response.ok){const cache=await caches.open(CACHE);await cache.put(OFFLINE,response.clone())}
        return response;
      }catch(e){return (await caches.match(OFFLINE))||Response.error()}
    })());
    return;
  }

  event.respondWith(fetch(event.request,{cache:'no-store'}).then(async response=>{
    if(response&&response.ok&&url.origin===self.location.origin){const cache=await caches.open(CACHE);cache.put(event.request,response.clone()).catch(()=>{})}
    return response;
  }).catch(()=>caches.match(event.request)));
});