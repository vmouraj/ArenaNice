(function(){
  const DEFAULT_VIPS=['Vittim','Netto','Andrezão','Nice','Renata','Presidente','Fernandão','Chafic','Sérgio Jacarandá','Casão','Bringel','Juliana','Janaína'];
  const STORAGE_KEY='arena-vips';
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').replace(/\s+/g,' ').trim();

  let stored=[];
  try{stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');if(!Array.isArray(stored))stored=[]}catch(e){stored=[]}
  const merged=[];const seen=new Set();
  [...stored,...DEFAULT_VIPS].forEach(name=>{const k=norm(name);if(k&&!seen.has(k)){seen.add(k);merged.push(String(name).trim())}});
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(merged))}catch(e){}
  const vipSet=new Set(merged.map(norm));
  window.arenaVIPs=merged.slice();

  if(!document.getElementById('arena-vip-portaria-style')){
    const style=document.createElement('style');
    style.id='arena-vip-portaria-style';
    style.textContent=`
      #openList .row.arena-portaria{background:#EEF4FF!important;border-color:#AFC7F4!important;box-shadow:0 7px 18px rgba(21,86,192,.09)!important}
      #openList .row.arena-portaria .info{color:#0D2F67!important}
      .arena-portaria-label{display:inline-flex;align-items:center;margin-left:7px;padding:2px 7px;border-radius:999px;background:#1556C0;color:#fff;font-size:8px;font-weight:900;letter-spacing:.35px;vertical-align:2px}
      .arena-vip-seal{display:inline-flex;align-items:center;margin-left:7px;padding:2px 6px;border-radius:999px;background:#FFF4C8;border:1px solid #F0C84F;color:#7A5800;font-size:8px;font-weight:900;letter-spacing:.35px;vertical-align:2px}
      dialog{border-radius:20px!important;border:1px solid #E2E8F1!important;padding:16px!important;box-shadow:0 28px 80px rgba(13,47,103,.22)!important;background:#fff!important}
      dialog::backdrop{background:rgba(9,22,47,.34)!important;backdrop-filter:blur(3px)!important;-webkit-backdrop-filter:blur(3px)!important}
      dialog .top{padding-bottom:8px!important;border-bottom:1px solid #EEF1F5!important;margin-bottom:4px!important}
      dialog .top h2{font-size:20px!important;letter-spacing:-.25px!important;color:#10234A!important}
      dialog .x{width:38px!important;height:38px!important;border-radius:11px!important;background:#F2F5F9!important;color:#43516A!important}
      dialog .topDelete{width:38px!important;height:38px!important;border-radius:11px!important;background:#FFF5F5!important;color:#D95353!important}
      .checkoutGrid{gap:8px!important;margin-top:13px!important}.checkoutPay{height:68px!important;border-radius:13px!important;background:#fff!important;font-size:12px!important;box-shadow:0 3px 11px rgba(16,35,74,.03)!important}.checkoutPay:active{background:#F2F6FF!important;border-color:#AFC7F4!important}
      .primary,.secondary,.danger,.finish{border-radius:12px!important;letter-spacing:.05px!important}.secondary{background:#F1F4F8!important;color:#24334F!important}.finish{background:#FFB000!important;color:#4D3900!important}.danger{background:#E34A4A!important}
      .empty{padding:20px 16px!important;border:1px dashed #C9D5E5!important;border-radius:14px!important;background:#FBFCFE!important;color:#7D899B!important;font-size:11px!important;line-height:1.5!important;box-shadow:none!important}
      .consumingSummary{border-radius:12px!important;padding:9px 11px!important;font-size:10.5px!important}.lock{background:#F7F9FC!important}.lockCard{border-radius:20px!important;border-color:#E1E7F0!important;box-shadow:0 22px 60px rgba(16,35,74,.13)!important}.lockCard h2{font-size:21px!important;letter-spacing:-.2px!important}.lockCard p{font-size:11px!important;line-height:1.45!important}.lockCard .pin{border-radius:12px!important;background:#FBFCFE!important}#syncStatus{opacity:.8!important}
      #salesPage>.filter{width:100%!important;max-width:100%!important;overflow:hidden!important;box-sizing:border-box!important}#salesPage>.filter input[type="month"]{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important;overflow:hidden!important;padding-right:8px!important}
      #menu[open]{overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior:contain!important}#menu .menuAdd{margin:8px 0 14px!important;padding:13px!important;border:1px solid #DDE5F0!important;border-radius:15px!important;background:#F8FAFD!important}#menu .menuAdd b{display:block;color:#10234A;font-size:12px!important;margin-bottom:2px!important}#menuItems{padding-bottom:22px!important}
      .arena-year-block{margin-top:22px;padding-top:18px;border-top:1px solid #DDE5F0}.arena-year-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.arena-year-head strong{font-size:11px;letter-spacing:.45px;color:#10234A}.arena-year-select{width:auto!important;max-width:122px!important;height:40px!important;padding:0 10px!important;border:1px solid #DDE5F0!important;border-radius:11px!important;background:#fff!important;color:#10234A!important;font-weight:800!important}.arena-year-summary{display:grid;grid-template-columns:1.2fr .8fr;gap:8px;margin-bottom:10px}.arena-year-card{background:#fff;border:1px solid #DDE5F0;border-radius:14px;padding:12px;min-width:0}.arena-year-card.primary{background:#1556C0;border-color:#1556C0;color:#fff}.arena-year-card strong{display:block;font-size:19px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.arena-year-card span{display:block;margin-top:6px;font-size:8px;font-weight:900;color:#72809A}.arena-year-card.primary span{color:#fff}.arena-month-row{display:flex;align-items:center;gap:10px;padding:11px 12px;border:1px solid #DDE5F0;border-radius:13px;background:#fff;margin-bottom:7px}.arena-month-row .info{flex:1;font-size:12px;font-weight:800}.arena-month-row .info small{display:block;margin-top:3px;color:#72809A;font-size:9px;font-weight:500}.arena-month-row .price{font-size:13px;font-weight:900;color:#1556C0}
      html.arena-mobile-force #menu{max-height:38vh!important;height:auto!important;overflow-y:auto!important;padding-bottom:30px!important}
      @media(max-width:360px){dialog{padding:14px!important}.checkoutGrid{gap:7px!important}.checkoutPay{height:64px!important}}
    `;
    document.head.appendChild(style);
  }

  let observer=null,scheduled=false;
  function rowName(row){
    const info=row.querySelector('.info');if(!info)return'';
    const textNode=Array.from(info.childNodes).find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());
    if(textNode)return textNode.textContent.trim();
    const clone=info.cloneNode(true);clone.querySelectorAll('small,.arena-vip-seal,.arena-portaria-label').forEach(x=>x.remove());
    return clone.textContent.trim();
  }
  function decorateAndSort(){
    scheduled=false;
    const list=document.getElementById('openList');if(!list)return;
    if(observer)observer.disconnect();
    const rows=Array.from(list.children).filter(el=>el.classList&&el.classList.contains('row'));
    rows.forEach(row=>{
      row.classList.remove('arena-portaria');
      row.querySelectorAll('.arena-vip-seal,.arena-portaria-label').forEach(x=>x.remove());
      const info=row.querySelector('.info');const name=rowName(row);const key=norm(name);if(!info||!key)return;
      const small=info.querySelector('small');
      if(key==='portaria'){
        row.classList.add('arena-portaria');
        const tag=document.createElement('span');tag.className='arena-portaria-label';tag.textContent='PORTARIA';
        if(small)info.insertBefore(tag,small);else info.appendChild(tag);
      }else if(vipSet.has(key)){
        const tag=document.createElement('span');tag.className='arena-vip-seal';tag.textContent='VIP';
        if(small)info.insertBefore(tag,small);else info.appendChild(tag);
      }
    });
    rows.sort((a,b)=>{
      const an=rowName(a),bn=rowName(b),ak=norm(an),bk=norm(bn);
      if(ak==='portaria'&&bk!=='portaria')return-1;
      if(bk==='portaria'&&ak!=='portaria')return 1;
      return an.localeCompare(bn,'pt-BR',{sensitivity:'base',numeric:true});
    });
    rows.forEach(row=>list.appendChild(row));
    if(observer)observer.observe(list,{childList:true,subtree:true,characterData:true});
  }
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(decorateAndSort)}
  function start(){
    const list=document.getElementById('openList');if(!list){setTimeout(start,200);return}
    observer=new MutationObserver(schedule);observer.observe(list,{childList:true,subtree:true,characterData:true});
    schedule();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();

(function(){
  function m(v){try{return typeof money==='function'?money(v):Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}catch(e){return'R$ 0,00'}}
  function moveAdd(){const d=document.getElementById('menu'),a=d&&d.querySelector('.menuAdd'),i=document.getElementById('menuItems');if(a&&i&&a.nextElementSibling!==i)i.parentNode.insertBefore(a,i)}
  function sortRows(){const i=document.getElementById('menuItems');if(!i)return;Array.from(i.children).filter(x=>x.classList&&x.classList.contains('manage')).sort((a,b)=>(a.querySelector('input')?.value||'').localeCompare(b.querySelector('input')?.value||'','pt-BR',{sensitivity:'base',numeric:true})).forEach(r=>i.appendChild(r))}
  function watchMenu(){const i=document.getElementById('menuItems');if(!i)return setTimeout(watchMenu,300);let busy=false;const run=()=>{if(busy)return;busy=true;requestAnimationFrame(()=>{sortRows();busy=false})};new MutationObserver(run).observe(i,{childList:true});run()}
  function menuScroll(){const d=document.getElementById('menu');if(!d||d.dataset.ts)return;d.dataset.ts='1';let y=null;d.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('input,button,select,textarea')){y=null;return}y=e.touches[0].clientY},{passive:true,capture:true});d.addEventListener('touchmove',e=>{if(y===null||e.touches.length!==1)return;const ny=e.touches[0].clientY,dy=y-ny;if(Math.abs(dy)>1){d.scrollTop+=dy/(document.documentElement.classList.contains('arena-mobile-force')?2.45:1);y=ny;e.preventDefault()}},{passive:false,capture:true});d.addEventListener('touchend',()=>y=null,{passive:true,capture:true})}
  function renderYear(){if(typeof state==='undefined'||!state||!Array.isArray(state.sales))return;const s=document.getElementById('arenaYear');if(!s)return;const y=s.value,months=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],closed=state.sales.filter(x=>x.status==='closed'&&String(x.createdAt||'').startsWith(y+'-'));document.getElementById('arenaYearTotal').textContent=m(closed.reduce((a,x)=>a+Number(x.total||0),0));document.getElementById('arenaYearCount').textContent=closed.length;document.getElementById('arenaYearList').innerHTML=months.map((name,idx)=>{const key=y+'-'+String(idx+1).padStart(2,'0'),a=closed.filter(x=>String(x.createdAt||'').startsWith(key)),t=a.reduce((v,x)=>v+Number(x.total||0),0);return`<div class="arena-month-row" data-month="${key}"><div class="info">${name}<small>${a.length} contas fechadas</small></div><div class="price">${m(t)}</div></div>`}).join('')}
  function yearBlock(){const p=document.getElementById('salesPage');if(!p||document.getElementById('arenaYearBlock'))return;const years=new Set();try{state.sales.filter(x=>x.status==='closed'&&x.createdAt).forEach(x=>years.add(String(x.createdAt).slice(0,4)))}catch(e){}const current=(window.arenaBusinessDay?window.arenaBusinessDay():new Date().toISOString().slice(0,10)).slice(0,4);years.add(current);const b=document.createElement('div');b.id='arenaYearBlock';b.className='arena-year-block';b.innerHTML=`<div class="arena-year-head"><strong>VISÃO ANUAL</strong><select id="arenaYear" class="arena-year-select">${Array.from(years).sort().reverse().map(y=>`<option value="${y}"${y===current?' selected':''}>${y}</option>`).join('')}</select></div><div class="arena-year-summary"><div class="arena-year-card primary"><strong id="arenaYearTotal">R$ 0,00</strong><span>FATURAMENTO NO ANO</span></div><div class="arena-year-card"><strong id="arenaYearCount">0</strong><span>CONTAS FECHADAS</span></div></div><div id="arenaYearList"></div>`;p.appendChild(b);document.getElementById('arenaYear').addEventListener('change',renderYear);document.getElementById('arenaYearList').addEventListener('click',e=>{const r=e.target.closest('[data-month]');if(!r)return;const mon=document.getElementById('month');if(mon){mon.value=r.dataset.month;try{renderMonth()}catch(_){}}document.querySelector('.app')?.scrollTo({top:0,behavior:'smooth'})});renderYear();try{const old=renderAll;renderAll=function(){old();renderYear()}}catch(e){}}
  function boot(){moveAdd();watchMenu();menuScroll();yearBlock();setTimeout(()=>{moveAdd();sortRows();renderYear()},700)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* Ajustes isolados: não altera renderMonth, renderReport, pullRemote ou histórico de vendas */
(function(){
  function currentYear(){return (window.arenaBusinessDay?window.arenaBusinessDay():new Date().toISOString().slice(0,10)).slice(0,4)}
  function monthLabel(v){if(!/^\d{4}-\d{2}$/.test(v||''))return'Mês atual';const [y,mo]=v.split('-'),names=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];return names[Number(mo)-1]+' de '+y}
  function addCss(){if(document.getElementById('arena-safe-fixes'))return;const s=document.createElement('style');s.id='arena-safe-fixes';s.textContent=`
    #salesPage>.filter{position:relative!important;width:100%!important;max-width:100%!important;height:46px!important;margin:10px 0 13px!important;overflow:hidden!important;border:0!important}
    #salesPage>.filter input[type="month"]{position:absolute!important;inset:0!important;width:100%!important;height:46px!important;opacity:0!important;z-index:3!important;margin:0!important;padding:0!important;cursor:pointer!important}
    #arenaMonthDisplay{position:absolute!important;inset:0!important;display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;height:46px!important;padding:0 13px!important;border:1px solid #DDE5F0!important;border-radius:13px!important;background:#fff!important;color:#10234A!important;box-sizing:border-box!important;overflow:hidden!important;font-size:13px!important;font-weight:850!important}
    #arenaMonthDisplay span{display:block!important;min-width:0!important;max-width:calc(100% - 28px)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;text-align:left!important}
    #arenaMonthDisplay b{flex:0 0 auto!important;margin-left:8px!important;color:#1556C0!important;font-size:13px!important}
    #arenaYearBlock{margin-top:22px!important;padding-top:18px!important;border-top:1px solid #DDE5F0!important}
    #arenaYearBlock .arena-year-head{display:none!important}
    #arenaYearBlock .arena-year-summary{display:grid!important;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr)!important;gap:8px!important;width:100%!important;margin:10px 0!important}
    #arenaYearBlock .arena-year-card{width:100%!important;min-width:0!important;box-sizing:border-box!important;overflow:hidden!important}
    #arenaYearBlock .arena-year-card strong{font-size:18px!important;line-height:1.1!important}
    #arenaYearToggle{display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;height:52px!important;padding:0 14px!important;border:1px solid #DDE5F0!important;border-radius:14px!important;background:#fff!important;color:#10234A!important;box-sizing:border-box!important;font-size:12px!important;font-weight:900!important}
    #arenaYearToggle small{display:block!important;margin-top:2px!important;color:#72809A!important;font-size:9px!important;font-weight:600!important;text-align:left!important}
    #arenaYearToggle b{color:#1556C0!important;font-size:16px!important}
    #arenaYearContent{display:none!important}.arena-year-block.arena-open #arenaYearContent{display:block!important}
    .arena-month-row{width:100%!important;box-sizing:border-box!important;overflow:hidden!important}
    .arena-reopen{height:46px!important;background:#EEF4FF!important;color:#1556C0!important;border:1px solid #B9CBFF!important}
  `;document.head.appendChild(s)}
  function monthControl(){const input=document.getElementById('month'),f=input&&input.parentElement;if(!input||!f)return;let d=document.getElementById('arenaMonthDisplay');if(!d){d=document.createElement('div');d.id='arenaMonthDisplay';d.innerHTML='<span></span><b>▾</b>';f.appendChild(d)}const update=()=>{const sp=d.querySelector('span');if(sp)sp.textContent=monthLabel(input.value)};input.addEventListener('change',update);update()}
  function rebuildYear(){const old=document.getElementById('arenaYearBlock');if(!old||old.dataset.safe==='1')return;old.dataset.safe='1';const y=currentYear(),head=old.querySelector('.arena-year-head'),summary=old.querySelector('.arena-year-summary'),list=old.querySelector('#arenaYearList');if(head){const select=head.querySelector('#arenaYear');if(select){select.innerHTML='<option value="'+y+'">'+y+'</option>';select.value=y;try{select.dispatchEvent(new Event('change',{bubbles:true}))}catch(e){}}const toggle=document.createElement('button');toggle.type='button';toggle.id='arenaYearToggle';toggle.innerHTML='<span>VISÃO ANUAL '+y+'<small>Toque para ver os meses</small></span><b>⌄</b>';old.insertBefore(toggle,head);head.style.display='none';const content=document.createElement('div');content.id='arenaYearContent';if(summary)content.appendChild(summary);if(list)content.appendChild(list);old.appendChild(content);toggle.addEventListener('click',()=>{old.classList.toggle('arena-open');toggle.querySelector('b').textContent=old.classList.contains('arena-open')?'⌃':'⌄'})}}
  function keepMenuSorted(){const i=document.getElementById('menuItems');if(!i)return;Array.from(i.children).filter(x=>x.classList&&x.classList.contains('manage')).sort((a,b)=>(a.querySelector('input')?.value||'').localeCompare(b.querySelector('input')?.value||'','pt-BR',{sensitivity:'base',numeric:true})).forEach(r=>i.appendChild(r));const a=document.querySelector('#menu .menuAdd');if(a&&a.parentNode&&a.nextElementSibling!==i)a.parentNode.insertBefore(a,i)}
  function reopen(){const a=document.getElementById('accountActions');if(!a)return;document.getElementById('arenaReopen')?.remove();try{if(typeof edit==='undefined'||!edit||edit.status!=='closed')return}catch(e){return}const b=document.createElement('button');b.id='arenaReopen';b.type='button';b.className='secondary arena-reopen';b.textContent='↻ Reabrir conta';b.onclick=function(){if(!edit||edit.status!=='closed')return;if(!confirm('Reabrir esta conta? Ela voltará para Contas abertas com os mesmos itens.'))return;edit.status='open';edit.payment='';const idx=state.sales.findIndex(x=>x.id===edit.id);if(idx>=0)state.sales[idx]=edit;saveState();localChange('sale',edit.id);try{setupAccount('open')}catch(e){}reopen();status('Conta reaberta')};a.appendChild(b)}
  function wrapOpen(){try{if(window.__arenaOpenWrapped)return;window.__arenaOpenWrapped=true;const oo=openAccount;openAccount=function(id){oo(id);setTimeout(reopen,0)};const nn=newAccount;newAccount=function(){nn();setTimeout(reopen,0)}}catch(e){}}
  function boot(){addCss();monthControl();setTimeout(rebuildYear,50);keepMenuSorted();wrapOpen();const i=document.getElementById('menuItems');if(i)new MutationObserver(()=>requestAnimationFrame(keepMenuSorted)).observe(i,{childList:true});setTimeout(()=>{monthControl();rebuildYear();keepMenuSorted()},700)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();