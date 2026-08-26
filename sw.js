const CACHE='arena-nice-runtime-v16';
const OFFLINE='/app-v6.html';

function transformHtml(html){
  const css=`
<style id="arena-v16-ui">
.app{padding-left:16px!important;padding-right:16px!important}.date{width:100%;text-align:center!important;margin:20px auto 16px!important;line-height:1.35}.title{margin:8px 0 5px!important;line-height:1.2}.hint{line-height:1.4}.section{margin-top:30px}.sectionHead{align-items:center!important;margin-bottom:13px!important}.summary{grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr)!important;width:100%;gap:10px}.stat{width:100%;min-width:0;overflow:hidden}.stat strong{font-size:clamp(21px,6vw,27px)!important;white-space:nowrap}.filter,.filter input{width:100%;max-width:100%}.actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));width:100%;gap:10px}.actions button{width:100%;min-width:0}.quietDelete{width:38px!important;height:38px!important;min-height:38px!important;border:0!important;border-radius:10px!important;background:transparent!important;color:#9AA6B8!important;font-size:16px!important;display:none;align-items:center;justify-content:center;margin-left:auto!important;padding:0!important;grid-column:2}.accountCats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:16px 0 12px}.accountCat{position:relative;min-width:0;height:80px;border:1px solid var(--line);border-radius:14px;background:#fff;color:var(--ink);font-size:10px;font-weight:900;padding:7px 3px}.accountCat b{display:block;font-size:23px;margin-bottom:5px}.accountCat.hasConsumption{background:#FFF8DF;border-color:#F0C84F;color:#6E5300}.accountCat .badge{position:absolute;top:7px;right:7px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:var(--yellow);color:#553F00;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900}.consumingTitle{margin:14px 0 7px;color:var(--royal);font-size:10px;font-weight:900;letter-spacing:.6px}.consumingChips{display:flex;gap:7px;overflow-x:auto;padding-bottom:4px}.consumingChip{flex:0 0 auto;border:1px solid #F0C84F;background:#FFF8DF;color:#6E5300;border-radius:999px;padding:8px 10px;font-size:11px;font-weight:800}.productBack{height:42px;border:0;border-radius:11px;background:#EEF2F7;color:var(--royal);font-weight:900;padding:0 14px;margin:4px 0 9px}.prod.consumed{background:#EEF4FF;border:1px solid #AFC7F4;border-radius:13px;padding:10px;margin:7px 0}.prod.consumed>span b{color:var(--royal)}.prod .taking{display:inline-block;margin-top:5px;background:var(--yellow);color:#5B4300;border-radius:999px;padding:3px 7px;font-size:9px;font-weight:900}.products{max-height:none!important;overflow:visible!important}
</style>`;
  const injected=`
<script id="arena-v16-flow">
(function(){
  let selectedCategory=null;
  const deletedKey='arena-deleted-sales-v1';
  const getDeleted=()=>{try{return JSON.parse(localStorage.getItem(deletedKey)||'[]')}catch(e){return[]}};
  const setDeleted=a=>localStorage.setItem(deletedKey,JSON.stringify([...new Set(a)]));

  function categoryQty(cat){let n=0;state.catalog.forEach((p,i)=>{if(p.active!==false&&p.cat===cat)n+=Number(qty[i]||0)});return n}
  function consumedItems(){return state.catalog.map((p,i)=>({p,i,q:Number(qty[i]||0)})).filter(x=>x.p.active!==false&&x.q>0)}

  renderProducts=function(){
    const current=consumedItems();
    if(!selectedCategory){
      const chips=current.length?'<div class="consumingTitle">EM CONSUMO</div><div class="consumingChips">'+current.map(x=>'<button class="consumingChip" onclick="openAccountCategory(\''+x.p.cat+'\')">'+x.q+'× '+esc(x.p.name)+'</button>').join('')+'</div>':'';
      $('products').innerHTML=chips+'<div class="accountCats">'+C.map(c=>{const q=categoryQty(c[0]);return '<button class="accountCat '+(q?'hasConsumption':'')+'" onclick="openAccountCategory(\''+c[0]+'\')"><b>'+c[1]+'</b>'+c[2]+(q?'<span class="badge">'+q+'</span>':'')+'</button>'}).join('')+'</div>';
      calc();return;
    }
    const c=C.find(x=>x[0]===selectedCategory);
    const arr=state.catalog.map((p,i)=>({p,i,q:Number(qty[i]||0)})).filter(x=>x.p.active!==false&&x.p.cat===selectedCategory).sort((a,b)=>b.q-a.q);
    $('products').innerHTML='<button class="productBack" onclick="backAccountCategories()">← Categorias</button><div class="group">'+(c?c[1]+' '+c[2]:'PRODUTOS')+'</div>'+(arr.length?arr.map(x=>'<div class="prod '+(x.q?'consumed':'')+'"><span>'+esc(x.p.name)+'<small>'+money(x.p.price)+'</small>'+(x.q?'<span class="taking">EM CONSUMO · '+x.q+'</span>':'')+'</span><div class="step"><button onclick="chg('+x.i+',-1)">−</button><b>'+x.q+'</b><button onclick="chg('+x.i+',1)">+</button></div></div>').join(''):'<div class="empty">Nenhum produto nesta categoria.</div>');
    calc();
  };
  window.openAccountCategory=function(cat){selectedCategory=cat;renderProducts()};
  window.backAccountCategories=function(){selectedCategory=null;renderProducts()};

  const oldNewAccount=newAccount;
  newAccount=function(){selectedCategory=null;return oldNewAccount()};
  const oldOpenAccount=openAccount;
  openAccount=function(id){selectedCategory=null;const r=oldOpenAccount(id);try{$('deleteBtn').style.display=edit&&edit.status==='open'?'inline-flex':'none'}catch(e){}return r};

  async function deleteRemote(id){
    await req('tab_items?tab_id=eq.'+encodeURIComponent(id),{method:'DELETE'});
    await req('tabs?id=eq.'+encodeURIComponent(id),{method:'DELETE'});
  }
  async function flushDeleted(){
    if(!navigator.onLine)return;
    const ids=getDeleted();if(!ids.length)return;
    const left=[];for(const id of ids){try{await deleteRemote(id)}catch(e){left.push(id)}}setDeleted(left);
  }
  archiveAccount=async function(){
    if(!edit||!edit.id)return;
    if(!confirm('Excluir esta comanda inteira?'))return;
    const id=edit.id;
    setDeleted([...getDeleted(),id]);
    state.sales=state.sales.filter(s=>s.id!==id);
    state.outbox=state.outbox.filter(x=>!(x.type==='sale'&&x.id===id));
    saveState();renderAll();account.close();status('Comanda excluída');
    await flushDeleted();
    if(!getDeleted().includes(id))status('Sincronizado');else status('Excluída neste aparelho • sincronização pendente');
  };

  const basePull=pullRemote;
  pullRemote=async function(){
    await basePull();
    const deleted=new Set(getDeleted());
    if(deleted.size){state.sales=state.sales.filter(s=>!deleted.has(s.id));saveState();renderAll()}
    await flushDeleted();
  };
  window.addEventListener('online',flushDeleted);
  flushDeleted();
})();
</script>`;
  html=html.replace('</head>',css+'</head>');
  html=html.replace('<button class="danger" id="deleteBtn" onclick="archiveAccount()" style="display:none">Excluir conta</button>','<button class="quietDelete" id="deleteBtn" onclick="archiveAccount()" aria-label="Excluir comanda" title="Excluir comanda">🗑</button>');
  html=html.replace('</body>',injected+'</body>');
  return html;
}

async function freshHtmlResponse(request,preload){const response=preload||await fetch(request,{cache:'no-store'});if(!response||!response.ok)return response;const type=response.headers.get('content-type')||'';if(!type.includes('text/html'))return response;const html=transformHtml(await response.text());const headers=new Headers(response.headers);headers.set('cache-control','no-store');return new Response(html,{status:response.status,statusText:response.statusText,headers})}
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['/manifest.webmanifest','/apple-touch-icon.png'])).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));if(self.registration.navigationPreload){try{await self.registration.navigationPreload.enable()}catch(e){}}await self.clients.claim();const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(const client of clients){try{await client.navigate(client.url)}catch(e){}}})())});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.hostname.endsWith('supabase.co'))return;if(event.request.mode==='navigate'||event.request.destination==='document'){event.respondWith((async()=>{try{const response=await freshHtmlResponse(event.request,await event.preloadResponse);if(response&&response.ok){const cache=await caches.open(CACHE);await cache.put(OFFLINE,response.clone())}return response}catch(e){return(await caches.match(OFFLINE))||Response.error()}})());return}event.respondWith(fetch(event.request,{cache:'no-store'}).then(async response=>{if(response&&response.ok&&url.origin===self.location.origin){const cache=await caches.open(CACHE);cache.put(event.request,response.clone()).catch(()=>{})}return response}).catch(()=>caches.match(event.request))) });