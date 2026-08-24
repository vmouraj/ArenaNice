(()=>{const s=document.createElement('style');s.textContent=`
:root{--content:460px}
body{background:linear-gradient(180deg,#0b1a2a 0,#06111d 36%,#030a11 100%)}
.app{width:min(100%,var(--content));padding:calc(22px + env(safe-area-inset-top)) 20px calc(118px + env(safe-area-inset-bottom));}
.brand{padding:4px 0 12px}.brand h1{font-size:clamp(32px,9.4vw,42px);letter-spacing:-1.8px}.brand small{margin-top:9px;font-size:9px;letter-spacing:4.8px;color:#d8dde2}.date{margin:12px 0 30px;font-size:12px}
.title{font-size:26px;line-height:1.1;letter-spacing:-.7px;margin:0 0 8px}.hint{font-size:12px;line-height:1.4}.filter{margin:22px 0 20px}.filter input{height:56px;border-radius:16px;text-align:center;background:#08131d;border-color:#304150;font-size:16px}
.summary{gap:12px;margin:0 0 26px}.stat{min-height:94px;padding:17px 16px;border-radius:18px}.stat strong{font-size:21px;letter-spacing:-.25px}.stat span{font-size:9.5px;letter-spacing:.3px;margin-top:8px}
.sub{margin:28px 0 11px;font-size:10px;letter-spacing:1px}.paygrid{gap:10px;margin:0}.paycard{min-height:78px;padding:14px;border-radius:16px}.paycard strong{font-size:17px}.paycard span{margin-top:6px;display:block;font-size:9px}
.list{gap:10px}.row{min-height:70px;padding:14px 15px;border-radius:17px}.info{font-size:15px}.info small{font-size:10.5px;margin-top:5px}.price{font-size:16px}.paytag{font-size:9px;padding:2px 6px;margin-left:5px}
.bottom{width:min(100%,var(--content));grid-template-columns:repeat(3,1fr);padding:8px 12px calc(8px + env(safe-area-inset-bottom));background:rgba(7,15,23,.97);backdrop-filter:blur(18px)}.nav{min-height:58px;font-size:10px;border-radius:15px}.nav b{font-size:19px;margin-bottom:3px}.nav.active{background:rgba(239,189,100,.08)}
#report{padding-bottom:22px}#report .title{margin-bottom:0}
@media(max-width:380px){.app{padding-left:16px;padding-right:16px}.summary{gap:9px}.stat{padding:14px 12px}.stat strong{font-size:19px}}
`;document.head.appendChild(s);
const settings=document.getElementById('settings');if(settings)settings.remove();
const navs=[...document.querySelectorAll('.bottom .nav')];if(navs[2]){navs[2].lastChild.textContent='Hoje';navs[2].setAttribute('aria-label','Hoje')};if(navs[3])navs[3].remove();
const reportTitle=document.querySelector('#report .title');if(reportTitle)reportTitle.textContent='Hoje';
const report=document.getElementById('report');if(report){const oldHint=report.querySelector(':scope > .hint');if(!oldHint){const h=document.createElement('div');h.className='hint';h.textContent='Resumo das vendas e recebimentos do dia.';reportTitle.insertAdjacentElement('afterend',h)}}
})();