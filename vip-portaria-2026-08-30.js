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

      /* ETAPA 4: acabamento visual final */
      dialog{border-radius:20px!important;border:1px solid #E2E8F1!important;padding:16px!important;box-shadow:0 28px 80px rgba(13,47,103,.22)!important;background:#fff!important}
      dialog::backdrop{background:rgba(9,22,47,.34)!important;backdrop-filter:blur(3px)!important;-webkit-backdrop-filter:blur(3px)!important}
      dialog .top{padding-bottom:8px!important;border-bottom:1px solid #EEF1F5!important;margin-bottom:4px!important}
      dialog .top h2{font-size:20px!important;letter-spacing:-.25px!important;color:#10234A!important}
      dialog .x{width:38px!important;height:38px!important;border-radius:11px!important;background:#F2F5F9!important;color:#43516A!important}
      dialog .topDelete{width:38px!important;height:38px!important;border-radius:11px!important;background:#FFF5F5!important;color:#D95353!important}
      .checkoutGrid{gap:8px!important;margin-top:13px!important}
      .checkoutPay{height:68px!important;border-radius:13px!important;background:#fff!important;font-size:12px!important;box-shadow:0 3px 11px rgba(16,35,74,.03)!important}
      .checkoutPay:active{background:#F2F6FF!important;border-color:#AFC7F4!important}
      .primary,.secondary,.danger,.finish{border-radius:12px!important;letter-spacing:.05px!important}
      .secondary{background:#F1F4F8!important;color:#24334F!important}
      .finish{background:#FFB000!important;color:#4D3900!important}
      .danger{background:#E34A4A!important}
      .empty{padding:20px 16px!important;border:1px dashed #C9D5E5!important;border-radius:14px!important;background:#FBFCFE!important;color:#7D899B!important;font-size:11px!important;line-height:1.5!important;box-shadow:none!important}
      .consumingSummary{border-radius:12px!important;padding:9px 11px!important;font-size:10.5px!important}
      .lock{background:#F7F9FC!important}
      .lockCard{border-radius:20px!important;border-color:#E1E7F0!important;box-shadow:0 22px 60px rgba(16,35,74,.13)!important}
      .lockCard h2{font-size:21px!important;letter-spacing:-.2px!important}
      .lockCard p{font-size:11px!important;line-height:1.45!important}
      .lockCard .pin{border-radius:12px!important;background:#FBFCFE!important}
      #syncStatus{opacity:.8!important}
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