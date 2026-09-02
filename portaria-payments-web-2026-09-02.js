/* Arena Nice — detalhes visuais web: Portaria e formas de pagamento. Não altera dados. */
(function(){
  const isDesktop=()=>matchMedia('(min-width:900px) and (hover:hover)').matches;
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const payClass=p=>({'Pix':'pix','Débito':'debit','Crédito':'credit','Dinheiro':'cash'}[p]||'');
  const gateSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V8l8-4 8 4v12M8 20v-7h8v7M3 20h18M9 9h.01M15 9h.01"/></svg>';
  function saleId(row){const oc=row.getAttribute('onclick')||'';const m=oc.match(/openAccount\(['\"]([^'\"]+)/);return m&&m[1]}
  function badge(payment){const b=document.createElement('span');b.className='arena-payment-badge '+payClass(payment);b.textContent=String(payment||'').toUpperCase();return b}
  function apply(){
    if(!isDesktop())return;
    if(!document.getElementById('arena-portaria-payment-style')){const s=document.createElement('style');s.id='arena-portaria-payment-style';s.textContent=`
@media (min-width:900px) and (hover:hover){
.arena-client-avatar.arena-gate-avatar:after{display:none!important}.arena-client-avatar.arena-gate-avatar svg{width:23px!important;height:23px!important;fill:none!important;stroke:#fff!important;stroke-width:1.9!important;stroke-linecap:round!important;stroke-linejoin:round!important}
.arena-payment-badge{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:58px!important;height:25px!important;padding:0 9px!important;border:1px solid!important;border-radius:8px!important;font-size:8px!important;font-weight:900!important;letter-spacing:.2px!important;white-space:nowrap!important;margin-left:8px!important}.arena-payment-badge.pix{color:#159447!important;background:#ECFBF1!important;border-color:#A8E1B8!important}.arena-payment-badge.debit{color:#1556C0!important;background:#EEF5FF!important;border-color:#B9D3FF!important}.arena-payment-badge.credit{color:#6F3CE8!important;background:#F5F0FF!important;border-color:#CFB9FF!important}.arena-payment-badge.cash{color:#B97800!important;background:#FFF8DF!important;border-color:#F1D47A!important}
#arenaClosedPanel .arena-closed-row{grid-template-columns:48px minmax(0,1fr) auto auto 22px!important}#arenaClosedPanel .arena-closed-row .arena-payment-badge{grid-column:3!important;margin-left:0!important}#arenaClosedPanel .arena-closed-row .price{grid-column:4!important}#arenaClosedPanel .arena-closed-row:after{grid-column:5!important}
#openList .row.arena-portaria.has-payment{grid-template-columns:48px minmax(0,1fr) auto auto 22px!important}#openList .row.arena-portaria .arena-payment-badge{grid-column:3!important;margin-left:0!important}#openList .row.arena-portaria.has-payment .price{grid-column:4!important}#openList .row.arena-portaria.has-payment:after{grid-column:5!important}
}
`;document.head.appendChild(s)}
    document.querySelectorAll('#openList .row').forEach(row=>{const name=row.querySelector('.info')?.textContent||'';if(norm(name).startsWith('portaria')){const av=row.querySelector('.arena-client-avatar');if(av&&!av.classList.contains('arena-gate-avatar')){av.classList.add('arena-gate-avatar');av.innerHTML=gateSvg}const id=saleId(row),sale=typeof state!=='undefined'&&state.sales?.find(x=>x.id===id);if(sale?.payment&&!row.querySelector('.arena-payment-badge')){row.classList.add('has-payment');row.querySelector('.price')?.before(badge(sale.payment))}}});
    document.querySelectorAll('#clientReport .row').forEach(row=>{if(row.querySelector('.arena-payment-badge'))return;const id=saleId(row),sale=typeof state!=='undefined'&&state.sales?.find(x=>x.id===id);if(sale?.payment)row.querySelector('.price')?.before(badge(sale.payment))});
  }
  function boot(){apply();new MutationObserver(apply).observe(document.body,{childList:true,subtree:true});setInterval(apply,1500)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();