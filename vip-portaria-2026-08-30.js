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