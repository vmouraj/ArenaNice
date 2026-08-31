(function(){
  const MIGRATION='arena-menu-2026-08-30-v1';
  if(localStorage.getItem(MIGRATION)) return;
  const seed=[
    // CERVEJAS — LATA 269ML
    ['Antártica Lata 269ml',4.50,'cervejas'],['Brahma Lata 269ml',4.50,'cervejas'],['Skol Lata 269ml',4.50,'cervejas'],['Amstel Lata 269ml',5.00,'cervejas'],['Bohemia Lata 269ml',5.00,'cervejas'],['Budweiser Lata 269ml',5.00,'cervejas'],['Original Lata 269ml',5.00,'cervejas'],['Heineken Lata 269ml',8.00,'cervejas'],
    // CERVEJAS — LATA 350ML
    ['Antártica Lata 350ml',5.00,'cervejas'],['Brahma Lata 350ml',5.00,'cervejas'],['Skol Lata 350ml',5.00,'cervejas'],['Amstel Lata 350ml',6.00,'cervejas'],['Bohemia Lata 350ml',6.00,'cervejas'],['Brahma Duplo Malte Lata 350ml',6.00,'cervejas'],['Original Lata 350ml',6.00,'cervejas'],['Caracu Lata 350ml',6.50,'cervejas'],['Spaten Lata 350ml',7.00,'cervejas'],['Heineken Lata 350ml',9.00,'cervejas'],
    // CERVEJAS ZERO — LATA 350ML
    ['Brahma Zero Lata 350ml',5.00,'cervejas'],['Budweiser Zero Lata 350ml',5.00,'cervejas'],['Heineken Zero Lata 350ml',9.00,'cervejas'],
    // CERVEJAS PROFISSA 300ML
    ['Antártica Profissa 300ml',4.50,'cervejas'],['Brahma Profissa 300ml',4.50,'cervejas'],['Budweiser Profissa 300ml',5.00,'cervejas'],['Original Profissa 300ml',5.00,'cervejas'],
    // LONG NECK 330ML
    ['Amstel Long Neck 330ml',8.00,'cervejas'],['Michelob Long Neck 330ml',9.00,'cervejas'],['Stella Sem Glúten Long Neck 330ml',10.00,'cervejas'],['Corona Long Neck 330ml',10.00,'cervejas'],['Heineken Long Neck 330ml',10.00,'cervejas'],
    // CERVEJAS 600ML
    ['Antártica 600ml',12.00,'cervejas'],['Brahma 600ml',12.00,'cervejas'],['Amstel 600ml',14.00,'cervejas'],['Original 600ml',14.00,'cervejas'],['Spaten 600ml',14.00,'cervejas'],['Heineken 600ml',17.00,'cervejas'],['Corona 600ml',17.00,'cervejas'],['Stella 600ml',17.00,'cervejas'],
    // CERVEJAS 1L
    ['Antártica 1L',14.00,'cervejas'],['Amstel 1L',17.00,'cervejas'],['Original 1L',17.00,'cervejas'],
    // OUTRAS OPÇÕES GELADAS / DRINKS
    ['Skol Beats',13.00,'drinks'],['Ice Smirnoff',13.00,'drinks'],['Energético Red Bull',13.00,'drinks'],['Caipirinha',16.00,'drinks'],['Licor Amaretto',18.00,'drinks'],['Campari com gelo e laranja',20.00,'drinks'],['Vinho',100.00,'drinks'],
    // DOSES — preços manuscritos considerados como atualização quando aplicável
    ['Paratudo (dose)',5.00,'drinks'],['Tequila (dose)',25.00,'drinks'],['Whisky (dose)',25.00,'drinks'],['Vodka (dose)',15.00,'drinks'],['Cachaça Brasil (dose)',6.00,'drinks'],['Domecq (dose)',8.00,'drinks'],['Gin (dose)',15.00,'drinks'],['Velho Barreiro / Caninha / 51 (dose)',4.00,'drinks'],['Ypióca (dose)',6.00,'drinks'],['Seletta (dose)',8.00,'drinks'],['Pinga de Raiz e Engenho',6.00,'drinks'],['Paratudo copo cheio',9.00,'drinks'],['Campari (dose)',15.00,'drinks'],['Old Parr (dose)',25.00,'drinks'],
    // REFRIGERANTES LATA 350ML
    ['FYS Lata 350ml',4.50,'bebidas'],['Guaraná Lata 350ml',4.50,'bebidas'],['Pepsi Lata 350ml',4.50,'bebidas'],['Soda Lata 350ml',4.50,'bebidas'],['Sukita Lata 350ml',4.50,'bebidas'],['Coca-Cola Lata 350ml',5.00,'bebidas'],['Coca-Cola Zero Lata 350ml',5.00,'bebidas'],['Pepsi Black Lata 350ml',5.00,'bebidas'],
    // REFRIGERANTES 1,5L E 2L
    ['Guaraná Antártica 1,5L',10.00,'bebidas'],['Pepsi 1,5L',10.00,'bebidas'],['Pepsi 2L',11.00,'bebidas'],['Soda 2L',11.00,'bebidas'],['Sukita 2L',11.00,'bebidas'],['Coca-Cola 2L',14.00,'bebidas'],['Coca-Cola Zero 2L',14.00,'bebidas'],
    // SEM ÁLCOOL
    ['Água sem gás',4.00,'bebidas'],['Água com gás',4.50,'bebidas'],['Mamba com gás',5.00,'bebidas'],['Água Tônica',5.00,'bebidas'],['Suco',5.00,'bebidas'],['Água 1,5L',7.00,'bebidas'],['H2O',7.00,'bebidas'],['Gatorade',7.00,'bebidas'],
    // PORÇÕES
    ['Tilápia (porção)',50.00,'comidas'],['Caranha (porção)',50.00,'comidas'],['Panceta (porção)',50.00,'comidas'],['Filé (porção)',50.00,'comidas'],['Cupim (porção)',50.00,'comidas'],['Carne de Sol (porção)',50.00,'comidas'],['Tábua de Frios',40.00,'comidas'],['Frango à Passarinho',35.00,'comidas'],['Torresmo (porção)',30.00,'comidas'],['Calabresa (porção)',30.00,'comidas'],['Batata Frita (porção)',30.00,'comidas'],['Minipastel 12 unidades',30.00,'comidas'],
    // ESPETOS COM MANDIOCA
    ['Espeto de Filé com mandioca',15.00,'comidas'],['Espeto de Cupim com mandioca',15.00,'comidas'],['Espeto de Carne de Sol com mandioca',15.00,'comidas'],['Espeto Fran Bacon com mandioca',15.00,'comidas'],['Espeto de Queijo com mandioca',15.00,'comidas'],
    // CALDOS — 370ML
    ['Caldo de Frango 370ml',15.00,'comidas'],['Caldo de Feijão 370ml',15.00,'comidas'],['Caldo Franjão 370ml',15.00,'comidas'],['Caldo de Mocotó 370ml',15.00,'comidas'],['Caldo de Vaca Atolada 370ml',15.00,'comidas'],['Caldo Verde 370ml',15.00,'comidas'],
    // CALDOS — 500ML
    ['Caldo de Frango 500ml',20.00,'comidas'],['Caldo de Feijão 500ml',20.00,'comidas'],['Caldo Franjão 500ml',20.00,'comidas'],['Caldo de Mocotó 500ml',20.00,'comidas'],['Caldo de Vaca Atolada 500ml',20.00,'comidas'],['Caldo Verde 500ml',20.00,'comidas'],
    // NO PÃO
    ['Espeto no Pão',20.00,'comidas'],['Hotdog da Nice',15.00,'comidas'],
    // SALGADINHOS
    ['Milhopã',4.50,'outros'],['Batata (salgadinho)',4.50,'outros'],['Skiny',4.50,'outros'],['Bacon (salgadinho)',5.00,'outros'],
    // BALAS E DOCES
    ['Balas',0.25,'outros'],['Baba-lo',0.50,'outros'],['Pirulito',1.00,'outros'],['Paçoca',1.00,'outros'],['Amendoim',2.50,'outros'],['Sonho de Valsa',2.50,'outros'],['Hall',2.50,'outros'],['Trident',3.00,'outros'],['Doce de Leite',3.00,'outros'],
    // CIGARROS — UNIDADE
    ['Lucky Strike (unidade)',1.25,'outros'],['Marlboro (unidade)',1.50,'outros'],['Carlton (unidade)',1.50,'outros'],['Piracanjuba (unidade)',2.00,'outros'],['Paulistinha (unidade)',3.00,'outros']
  ];
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const existing=new Map((state.catalog||[]).map(p=>[norm(p.name)+'|'+(p.cat||p.category||'outros'),p]));
  const changed=[];
  for(const [name,price,cat] of seed){
    const key=norm(name)+'|'+cat;
    const found=existing.get(key);
    if(found){
      if(Number(found.price)!==Number(price)||found.active===false){found.price=Number(price);found.active=true;found.cat=cat;changed.push(found);}
    }else{
      const p={id:crypto.randomUUID(),name,price:Number(price),cat,active:true};
      state.catalog.push(p);existing.set(key,p);changed.push(p);
    }
  }
  for(const p of changed) enqueue('product',p.id);
  saveState();
  localStorage.setItem(MIGRATION,new Date().toISOString());
  renderAll();
  status(changed.length?'Cardápio completo atualizado':'Cardápio já atualizado');
  scheduleFlush(80);
})();