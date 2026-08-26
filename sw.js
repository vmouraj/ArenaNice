const CACHE='arena-nice-runtime-v17';
const OFFLINE='/app-v6.html';

function transformHtml(html){
  const css=`<style id="arena-v17-ui">
.accountTopActions{display:flex;align-items:center;gap:6px;margin-left:auto}.top>.x{margin-left:0!important}.topDelete{width:40px;height:40px;border:0;border-radius:10px;background:transparent;color:#9AA6B8;font-size:17px;display:none;align-items:center;justify-content:center;padding:0}.topDelete:active{background:#F1F4F8;color:#667085}.actions #deleteBtn{display:none!important}.catalogSearch{position:sticky;top:-18px;z-index:4;background:#fff;padding:10px 0 8px;margin:8px 0 4px}.catalogSearch input{height:46px;border:1px solid var(--line);border-radius:13px;background:#F8FAFD;padding:0 13px;font-size:16px}.accountCats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:12px 0}.accountCat{position:relative;min-width:0;height:80px;border:1px solid var(--line);border-radius:14px;background:#fff;color:var(--ink);font-size:10px;font-weight:900;padding:7px 3px}.accountCat b{display:block;font-size:23px;margin-bottom:5px}.accountCat.hasConsumption{background:#FFF8DF;border-color:#F0C84F;color:#6E5300}.accountCat .badge{position:absolute;top:7px;right:7px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:var(--yellow);color:#553F00;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900}.consumingTitle{margin:12px 0 7px;color:var(--royal);font-size:10px;font-weight:900;letter-spacing:.6px}.consumingChips{display:flex;gap:7px;overflow-x:auto;padding-bottom:5px}.consumingChip{flex:0 0 auto;border:1px solid #F0C84F;background:#FFF8DF;color:#6E5300;border-radius:999px;padding:8px 10px;font-size:11px;font-weight:800}.productBack{height:42px;border:0;border-radius:11px;background:#EEF2F7;color:var(--royal);font-weight:900;padding:0 14px;margin:4px 0 9px}.prod.consumed{background:#EEF4FF;border:1px solid #AFC7F4;border-radius:13px;padding:10px;margin:7px 0}.prod.consumed>span{font-weight:800;color:var(--royal)}.taking{display:inline-block;margin-top:5px;background:var(--yellow);color:#5B4300;border-radius:999px;padding:3px 7px;font-size:9px;font-weight:900}.searchResultTitle{margin:10px 0 4px;color:var(--royal);font-size:10px;font-weight:900;letter-spacing:.5px}.products{max-height:none!important;overflow:visible!important}
</style>`;
  const injected=`<script id="arena-v17-flow">
(function(){
 let selectedCategory=null,searchTerm='';
 const deletedKey='arena-deleted-sales-v1';
 const getDeleted=()=>{try{return JSON.parse(localStorage.getItem(deletedKey)||'[]')}catch(e){return[]}};
 const setDeleted=a=>localStorage.setItem(deletedKey,JSON.stringify([...new Set(a)]));
 function categoryQty(cat){let n=0;state.catalog.forEach((p,i)=>{if(p.active!==false&&p.cat===cat)n+=Number(qty[i]||0)});return n}
 function items(){return state.catalog.map((p,i)=>({p,i,q:Number(qty[i]||0)})).filter(x=>x.p.active!==false)}
 function row(x){return '<div class="prod '+(x.q?'consumed':'')+'"><span>'+esc(x.p.name)+'<small>'+money(x.p.price)+'</small>'+(x.q?'<span class="taking">EM CONSUMO · '+x.q+'</span>':'')+'</span><div class="step"><button onclick="chg('+x.i+',-1)">−</button><b>'+x.q+'</b><button onclick="chg('+x.i+',1)">+</button></div></div>'}
 function searchBox(){return '<div class="catalogSearch"><input id="catalogSearchInput" value="'+esc(searchTerm)+'" placeholder="Buscar produto no cardápio…" oninput="catalogSearch(this.value)"></div>'}
 renderProducts=function(){
   const all=items(),current=all.filter(x=>x.q>0);
   if(searchTerm.trim()){
     const q=searchTerm.trim().toLocaleLowerCase('pt-BR');const found=all.filter(x=>x.p.name.toLocaleLowerCase('pt-BR').includes(q)).sort((a,b)=>b.q-a.q);
     $('products').innerHTML=searchBox()+'<div class="searchResultTitle">RESULTADOS</div>'+(found.length?found.map(row).join(''):'<div class="empty">Nenhum produto encontrado.</div>');calc();setTimeout(()=>{const el=$('catalogSearchInput');if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length)}},0);return;
   }
   if(!selectedCategory){
     const chips=current.length?'<div class="consumingTitle">EM CONSUMO</div><div class="consumingChips">'+current.map(x=>'<button class="consumingChip" onclick="openAccountCategory(\''+x.p.cat+'\')">'+x.q+'× '+esc(x.p.name)+'</button>').join('')+'</div>':'';
     $('products').innerHTML=searchBox()+chips+'<div class="accountCats">'+C.map(c=>{const q=categoryQty(c[0]);return '<button class="accountCat '+(q?'hasConsumption':'')+'" onclick="openAccountCategory(\''+c[0]+'\')"><b>'+c[1]+'</b>'+c[2]+(q?'<span class="badge">'+q+'</span>':'')+'</button>'}).join('')+'</div>';calc();return;
   }
   const c=C.find(x=>x[0]===selectedCategory),arr=all.filter(x=>x.p.cat===selectedCategory).sort((a,b)=>b.q-a.q);
   $('products').innerHTML=searchBox()+'<button class="productBack" onclick="backAccountCategories()">← Categorias</button><div class="group">'+(c?c[1]+' '+c[2]:'PRODUTOS')+'</div>'+(arr.length?arr.map(row).join(''):'<div class="empty">Nenhum produto nesta categoria.</div>');calc();
 };
 window.catalogSearch=function(v){searchTerm=v||'';if(searchTerm)selectedCategory=null;renderProducts()};
 window.openAccountCategory=function(cat){selectedCategory=cat;searchTerm='';renderProducts()};
 window.backAccountCategories=function(){selectedCategory=null;searchTerm='';renderProducts()};
 const oldNewAccount=newAccount;newAccount=function(){selectedCategory=null;searchTerm='';const r=oldNewAccount();syncTopDelete();return r};
 const oldOpenAccount=openAccount;openAccount=function(id){selectedCategory=null;searchTerm='';const r=oldOpenAccount(id);syncTopDelete();return r};
 function syncTopDelete(){setTimeout(()=>{const dlg=$('account');if(!dlg)return;const top=dlg.querySelector('.top');if(!top)return;let wrap=top.querySelector('.accountTopActions');if(!wrap){wrap=document.createElement('div');wrap.className='accountTopActions';const close=top.querySelector('.x');if(close){top.insertBefore(wrap,close);wrap.appendChild(close)}}let del=top.querySelector('.topDelete');if(!del){del=document.createElement('button');del.className='topDelete';del.innerHTML='🗑';del.setAttribute('aria-label','Excluir comanda');del.onclick=()=>archiveAccount();wrap.insertBefore(del,wrap.firstChild)}del.style.display=edit&&edit.id&&edit.status==='open'?'inline-flex':'none'},0)}
 async function deleteRemote(id){await req('tab_items?tab_id=eq.'+encodeURIComponent(id),{method:'DELETE'});await req('tabs?id=eq.'+encodeURIComponent(id),{method:'DELETE'})}
 async function flushDeleted(){if(!navigator.onLine)return;const ids=getDeleted();if(!ids.length)return;const left=[];for(const id of ids){try{await deleteRemote(id)}catch(e){left.push(id)}}setDeleted(left)}
 archiveAccount=async function(){if(!edit||!edit.id)return;if(!confirm('Excluir esta comanda inteira?'))return;const id=edit.id;setDeleted([...getDeleted(),id]);state.sales=state.sales.filter(s=>s.id!==id);state.outbox=state.outbox.filter(x=>!(x.type==='sale'&&x.id===id));saveState();renderAll();account.close();status('Comanda excluída');await flushDeleted();status(getDeleted().includes(id)?'Excluída neste aparelho • sincronização pendente':'Sincronizado')};
 const basePull=pullRemote;pullRemote=async function(){await basePull();const deleted=new Set(getDeleted());if(deleted.size){state.sales=state.sales.filter(s=>!deleted.has(s.id));saveState();renderAll()}await flushDeleted()};
 window.addEventListener('online',flushDeleted);flushDeleted();
})();
</script>`;
  html=html.replace('</head>',css+'</head>');
  html=html.replace('</body>',injected+'</body>');
  return html;
}
async function freshHtmlResponse(request,preload){const response=preload||await fetch(request,{cache:'no-store'});if(!response||!response.ok)return response;const type=response.headers.get('content-type')||'';if(!type.includes('text/html'))return response;const html=transformHtml(await response.text());const headers=new Headers(response.headers);headers.set('cache-control','no-store');return new Response(html,{status:response.status,statusText:response.statusText,headers})}
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['/manifest.webmanifest','/apple-touch-icon.png'])).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));if(self.registration.navigationPreload){try{await self.registration.navigationPreload.enable()}catch(e){}}await self.clients.claim();const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(const client of clients){try{await client.navigate(client.url)}catch(e){}}})())});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.hostname.endsWith('supabase.co'))return;if(event.request.mode==='navigate'||event.request.destination==='document'){event.respondWith((async()=>{try{const response=await freshHtmlResponse(event.request,await event.preloadResponse);if(response&&response.ok){const cache=await caches.open(CACHE);await cache.put(OFFLINE,response.clone())}return response}catch(e){return(await caches.match(OFFLINE))||Response.error()}})());return}event.respondWith(fetch(event.request,{cache:'no-store'}).then(async response=>{if(response&&response.ok&&url.origin===self.location.origin){const cache=await caches.open(CACHE);cache.put(event.request,response.clone()).catch(()=>{})}return response}).catch(()=>caches.match(event.request))) });