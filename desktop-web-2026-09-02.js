/* Arena Nice — layout desktop responsivo. Somente apresentação; não altera dados nem regras. */
(function(){
  const CSS=`
@media (min-width:900px) and (hover:hover){
  html,body{min-height:100%;background:#f8fafc!important;overflow-x:hidden!important}
  body{padding-left:260px!important;overscroll-behavior:auto!important;color:#10234A!important}
  .app{width:auto!important;max-width:none!important;margin:0!important;padding:34px 40px 70px!important;overflow:visible!important}

  /* Marca e menu lateral */
  .app>.brand{position:fixed!important;z-index:90!important;left:0!important;top:0!important;width:260px!important;height:118px!important;padding:28px 24px 20px!important;background:#fff!important;border-right:1px solid #E7ECF3!important;border-bottom:1px solid #EEF1F5!important;text-align:left!important}
  .app>.brand h1{font-size:30px!important;line-height:1!important;letter-spacing:-1.1px!important;color:#0D2F67!important;white-space:nowrap!important}
  .app>.brand h1 i{color:#FFB000!important}.app>.brand small{font-size:8px!important;letter-spacing:2px!important;margin-top:8px!important;color:#10234A!important}.app>.brand small:before,.app>.brand small:after{display:none!important}
  .bottom{position:fixed!important;z-index:85!important;left:0!important;top:118px!important;bottom:0!important;transform:none!important;width:260px!important;max-width:none!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:9px!important;padding:24px 14px!important;background:#fff!important;border:0!important;border-right:1px solid #E7ECF3!important;border-radius:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:visible!important}
  .bottom .nav{width:100%!important;height:56px!important;min-height:56px!important;flex:0 0 56px!important;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:14px!important;padding:0 18px!important;border-radius:13px!important;background:transparent!important;color:#25334C!important;font-size:14px!important;font-weight:800!important;line-height:1!important;text-align:left!important;overflow:visible!important}
  .bottom .nav b{display:flex!important;align-items:center!important;justify-content:center!important;flex:0 0 25px!important;width:25px!important;height:25px!important;font-size:0!important;color:inherit!important;line-height:0!important}
  .bottom .nav b svg{display:block!important;width:24px!important;height:24px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.9!important;stroke-linecap:round!important;stroke-linejoin:round!important}
  .bottom .nav.active{background:#FFF0F0!important;color:#E51B23!important;box-shadow:none!important}
  .bottom .nav.active b{color:#E51B23!important}.bottom .nav[data-page="report"] b{color:#18B850!important}.bottom .nav[data-page="salesPage"] b{color:#1976F3!important}.bottom .nav[data-page="menuPage"] b{color:#7948F5!important}.bottom .nav[data-page="home"] b{color:#E51B23!important}
  .bottom .nav.active[data-page="report"]{background:#ECFBF1!important;color:#159447!important}.bottom .nav.active[data-page="salesPage"]{background:#EEF5FF!important;color:#1556C0!important}.bottom .nav.active[data-page="menuPage"]{background:#F5F0FF!important;color:#6F3CE8!important}

  /* Cabeçalho */
  .app>.date{position:fixed!important;z-index:86!important;right:38px!important;top:24px!important;margin:0!important;padding:10px 14px 10px 42px!important;min-width:270px!important;background:#fff!important;border:1px solid #E5EAF1!important;border-radius:13px!important;font-size:12px!important;font-weight:800!important;color:#10234A!important;box-shadow:0 5px 16px rgba(16,35,74,.04)!important;text-align:left!important}
  .app>.date:before{content:'📅';position:absolute;left:14px;top:8px;font-size:18px}.app>#syncStatus{position:fixed!important;z-index:87!important;right:52px!important;top:69px!important;width:auto!important;margin:0!important;font-size:9px!important;color:#8691A4!important}

  /* Área de conteúdo */
  .page{max-width:1340px!important;margin:0 auto!important}.page.active{display:block!important}.page:not(.active){display:none!important}
  .title{text-align:left!important;font-size:28px!important;line-height:1.1!important;color:#10234A!important;margin:4px 0 4px!important;letter-spacing:-.5px!important}.hint{text-align:left!important;font-size:12px!important;line-height:1.4!important;margin:0 0 24px!important;color:#7B879A!important}
  .section{margin-top:24px!important}.sectionHead{margin-bottom:12px!important}.sectionHead h2,.sub{font-size:12px!important;color:#10234A!important;letter-spacing:.35px!important}.sectionHead span{font-size:10px!important;color:#8792A3!important}
  .summary{grid-template-columns:repeat(2,minmax(210px,300px))!important;justify-content:start!important;gap:12px!important;margin:12px 0 22px!important}.stat{min-height:96px!important;padding:17px 18px!important;border-radius:16px!important;border:1px solid #E2E8F1!important;background:#fff!important;box-shadow:0 5px 18px rgba(16,35,74,.04)!important}.stat strong{font-size:25px!important}.stat span{font-size:9px!important;margin-top:8px!important}.stat.primaryStat{background:linear-gradient(135deg,#1976F3,#1556C0)!important;border-color:#1976F3!important;box-shadow:0 8px 22px rgba(21,86,192,.16)!important}
  .row{border-color:#E2E8F1!important;background:#fff!important;box-shadow:0 4px 14px rgba(16,35,74,.035)!important}.row:hover{border-color:#C9D6E8!important;box-shadow:0 7px 20px rgba(16,35,74,.06)!important;transform:translateY(-1px)}

  /* Início */
  #home{padding-top:34px!important}#home>.new{float:right!important;width:190px!important;height:48px!important;border-radius:12px!important;font-size:13px!important;margin:0 0 12px 22px!important;background:#1976F3!important;box-shadow:0 7px 18px rgba(25,118,243,.16)!important}#home>.section:first-of-type{margin-top:0!important;clear:none!important}#home>.section:nth-of-type(2){display:none!important}
  #home .summary{grid-template-columns:310px 220px!important;margin-top:10px!important}#home #openList{clear:both!important;display:grid!important;grid-template-columns:repeat(3,minmax(260px,1fr))!important;gap:11px!important}#home #openList .row{min-height:76px!important;padding:14px 16px!important;border-radius:15px!important}#home #openList .info{font-size:14px!important}#home #openList .info small{font-size:10px!important;margin-top:5px!important}#home #openList .price{font-size:15px!important;color:#1556C0!important}
  #home #openList .row.arena-portaria{background:#F4F8FF!important;border-color:#BBD0F4!important;box-shadow:inset 4px 0 0 #1556C0,0 4px 14px rgba(21,86,192,.05)!important}

  /* Hoje */
  #report{padding-top:20px!important}#report>.filter{display:block!important;width:240px!important;margin:12px 0 18px!important}#report>.filter input{height:46px!important;border-radius:12px!important;background:#fff!important}.paygrid{grid-template-columns:repeat(4,minmax(160px,1fr))!important;gap:10px!important}.paycard{min-height:88px!important;padding:15px!important;border-radius:15px!important}#clientReport,#productReport{display:grid!important;grid-template-columns:repeat(2,minmax(320px,1fr))!important;gap:9px!important}.sub{margin-top:24px!important;margin-bottom:9px!important}

  /* Vendas */
  #salesPage{padding-top:20px!important}#salesPage>.filter{width:340px!important;height:48px!important;margin:12px 0 18px!important}#salesPage #arenaMonthDisplay{height:48px!important;border-radius:12px!important;padding:0 16px!important}#salesPage .summary{grid-template-columns:310px 220px!important}#salesPage #monthList{display:grid!important;grid-template-columns:repeat(3,minmax(260px,1fr))!important;gap:10px!important}#salesPage #monthList .row{min-height:70px!important;padding:14px 16px!important;border-radius:15px!important}#salesPage #monthList .row:first-child{background:#FFF5F5!important;border-color:#FFD0D0!important}#salesPage #monthList .row:first-child .info,#salesPage #monthList .row:first-child .price{color:#E51B23!important}
  .arena-year-block{margin-top:28px!important;padding-top:24px!important}.arena-year-summary{grid-template-columns:310px 220px!important}.arena-year-card{border-radius:15px!important}.arena-year-card.primary{background:#1556C0!important}.arena-year-head strong{font-size:12px!important}#arenaYearList{display:grid!important;grid-template-columns:repeat(3,minmax(260px,1fr))!important;gap:9px!important}.arena-month-row{margin:0!important;min-height:62px!important;padding:13px 15px!important;border-radius:14px!important}

  /* Cardápio */
  #menuPage{padding-top:20px!important}#menuPage .cats{grid-template-columns:repeat(5,minmax(130px,1fr))!important;gap:10px!important;margin-top:16px!important}#menuPage .cat{height:94px!important;border-radius:15px!important;box-shadow:0 4px 14px rgba(16,35,74,.035)!important}.menuAdd{max-width:720px!important;border-radius:16px!important}#menuItems{display:grid!important;grid-template-columns:repeat(2,minmax(320px,1fr))!important;gap:0 24px!important}.manage{padding:9px 0!important}.manage input{background:#fff!important}

  /* Modais */
  dialog{width:min(760px,calc(100vw - 320px))!important;max-width:760px!important;max-height:88vh!important;padding:22px!important;border-radius:20px!important}#account .accountCats{grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:9px!important}.checkoutGrid{grid-template-columns:repeat(4,1fr)!important}.lock{left:260px!important}.lockCard{max-width:420px!important}
}
`;
  function apply(){
    let s=document.getElementById('arena-desktop-style');if(s)s.remove();
    s=document.createElement('style');s.id='arena-desktop-style';s.textContent=CSS;document.head.appendChild(s);
  }
  function boot(){apply();setTimeout(apply,350);setTimeout(apply,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();