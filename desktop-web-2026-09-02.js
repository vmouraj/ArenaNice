/* Arena Nice — layout desktop responsivo. Somente apresentação; não altera dados nem regras. */
(function(){
  function boot(){
    if(document.getElementById('arena-desktop-style'))return;
    const style=document.createElement('style');style.id='arena-desktop-style';style.textContent=`
@media (min-width:900px) and (hover:hover){
  html,body{min-height:100%;background:#f7f9fc!important;overflow-x:hidden!important}
  body{padding-left:248px!important;overscroll-behavior:auto!important}
  .app{width:auto!important;max-width:none!important;margin:0!important;padding:38px 42px 60px!important;overflow:visible!important}
  .app>.brand{position:fixed!important;z-index:80!important;left:0!important;top:0!important;width:248px!important;height:112px!important;padding:28px 22px 18px!important;background:#fff!important;border-right:1px solid #e5eaf1!important;text-align:left!important}
  .app>.brand h1{font-size:28px!important;line-height:1!important;letter-spacing:-1px!important;color:#0D2F67!important;white-space:nowrap!important}
  .app>.brand small{font-size:8px!important;letter-spacing:2px!important;margin-top:7px!important}.app>.brand small:before,.app>.brand small:after{display:none!important}
  .app>.date{position:fixed!important;z-index:81!important;right:38px!important;top:23px!important;margin:0!important;padding:10px 14px!important;background:#fff!important;border:1px solid #e5eaf1!important;border-radius:12px!important;font-size:12px!important;color:#53627D!important;box-shadow:0 4px 14px rgba(16,35,74,.035)!important}
  .app>#syncStatus{position:fixed!important;z-index:81!important;right:45px!important;top:70px!important;width:auto!important;margin:0!important;font-size:9px!important}
  .bottom{position:fixed!important;z-index:70!important;left:0!important;top:112px!important;bottom:0!important;transform:none!important;width:248px!important;max-width:none!important;display:flex!important;flex-direction:column!important;gap:8px!important;padding:22px 14px!important;background:#fff!important;border:0!important;border-right:1px solid #e5eaf1!important;box-shadow:none!important;backdrop-filter:none!important}
  .nav{width:100%!important;height:54px!important;flex:0 0 54px!important;display:flex!important;flex-direction:row!important;justify-content:flex-start!important;gap:13px!important;padding:0 16px!important;border-radius:12px!important;font-size:13px!important;color:#25334c!important;text-align:left!important}
  .nav b{width:24px!important;font-size:20px!important;text-align:center!important}.nav.active{background:#EEF4FF!important;color:#1556C0!important;box-shadow:inset 3px 0 0 #1556C0!important}
  .page{max-width:1280px!important;margin:0 auto!important}.page.active{display:block!important}
  .title{text-align:left!important;font-size:28px!important;color:#10234A!important;margin:8px 0 3px!important}.hint{text-align:left!important;font-size:12px!important;margin:0 0 24px!important}
  .new{width:220px!important;height:50px!important;border-radius:12px!important;font-size:13px!important;margin-bottom:4px!important}
  .section{margin-top:24px!important}.sectionHead h2,.sub{font-size:12px!important;color:#10234A!important}.sectionHead span{font-size:10px!important}
  .summary{grid-template-columns:repeat(2,minmax(180px,300px))!important;justify-content:start!important;gap:12px!important;margin:12px 0 20px!important}.stat{min-height:100px!important;padding:16px 18px!important;border-radius:16px!important}.stat strong{font-size:25px!important}
  #home>.section:first-of-type{margin-top:24px!important}#home #openList{grid-template-columns:repeat(3,minmax(260px,1fr))!important;gap:10px!important}#home #openList .row{min-height:72px!important}
  #report>.filter{display:block!important;width:230px!important;margin:10px 0 16px!important}#report>.filter input{height:46px!important}
  #report .summary,#salesPage .summary{grid-template-columns:repeat(2,minmax(220px,320px))!important;justify-content:start!important}#report .paygrid{grid-template-columns:repeat(4,minmax(150px,1fr))!important;gap:10px!important}#report .paycard{min-height:88px!important}
  #clientReport,#productReport{grid-template-columns:repeat(2,minmax(300px,1fr))!important;gap:8px!important}
  #salesPage>.filter{width:340px!important;height:46px!important;margin:12px 0 18px!important}#salesPage #monthList{grid-template-columns:repeat(3,minmax(260px,1fr))!important;gap:9px!important}.arena-year-block{max-width:100%!important}.arena-year-summary{grid-template-columns:repeat(2,minmax(220px,320px))!important;justify-content:start!important}.arena-year-content,#arenaYearList{max-width:100%!important}#arenaYearList{display:grid!important;grid-template-columns:repeat(3,minmax(260px,1fr))!important;gap:8px!important}.arena-month-row{margin:0!important}
  #menuPage .cats{grid-template-columns:repeat(5,minmax(130px,1fr))!important;gap:10px!important}#menuPage .cat{height:92px!important}#menuPage .filter{max-width:520px!important}#menuList{display:grid!important;grid-template-columns:repeat(2,minmax(320px,1fr))!important;gap:0 22px!important}
  dialog{width:min(720px,calc(100vw - 300px))!important;max-width:720px!important;max-height:88vh!important;padding:22px!important}#account .accountCats{grid-template-columns:repeat(5,minmax(0,1fr))!important}.checkoutGrid{grid-template-columns:repeat(4,1fr)!important}
  .lock{left:248px!important}.lockCard{max-width:420px!important}
}
`;
    document.head.appendChild(style);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();