(()=>{
const originalMakeAccount=window.makeAccount;
window.makeAccount=function(status='open'){
  const name=document.getElementById('customer').value.trim();
  const total=calc();
  if(!name){alert('Informe o cliente.');return null;}
  return {
    name,
    total,
    status,
    createdAt:edit===null?dateKey():(sales[edit].createdAt||dateKey()),
    payment:edit===null?'':(sales[edit].payment||''),
    items:catalog.map((p,i)=>({name:p.name,qty:qty[i]||0,price:Number(p.price)})).filter(x=>x.qty)
  };
};
window.openClose=function(){
  const a=window.makeAccount('open');
  if(!a)return;
  if(!a.total){alert('Adicione ao menos um produto antes de fechar a conta.');return;}
  sales[edit]={...sales[edit],...a};
  persist();
  document.getElementById('checkoutName').textContent=sales[edit].name;
  document.getElementById('checkoutTotal').textContent='Total: '+money(sales[edit].total);
  document.getElementById('payment').value=sales[edit].payment||'';
  account.close();
  checkout.showModal();
};
})();