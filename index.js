const prods=[
  {id:1,name:"Thiof fumé entier",artisan:"Fatimata B.",role:"Spécialiste fumage",exp:"12 ans",cat:"fumé",price:1800,unit:"kg",emoji:"🐟",bg:"#E6F1FB",wave:"#185FA5",badge:"new",stars:5,desc:"Fumage traditionnel au bois de mangrove, sans additifs. Idéal pour le thiéboudiène.",tags:["Sans additifs","Fumage bois"],methode:"Fumage bois de mangrove",conservation:"3 mois en lieu sec"},
  {id:2,name:"Courbine séchée",artisan:"Aichetou M.",role:"Mareyeuse-transformatrice",exp:"15 ans",cat:"séché",price:1200,unit:"kg",emoji:"🐠",bg:"#FAEEDA",wave:"#BA7517",badge:"bio",stars:5,desc:"Séchage solaire naturel. Texture ferme, riche en protéines.",tags:["Séchage solaire","Naturel"],methode:"Séchage solaire 3–5 jours",conservation:"2 mois température ambiante"},
  {id:3,name:"Sardinelle salée",artisan:"Rokhaya D.",role:"Spécialiste salage",exp:"8 ans",cat:"salé",price:650,unit:"kg",emoji:"🐡",bg:"#FAECE7",wave:"#993C1D",badge:"promo",stars:4,desc:"Salage artisanal traditionnel, base de nombreux plats mauritaniens.",tags:["Traditionnel","Fort en goût"],methode:"Salage artisanal",conservation:"4 mois en saumure"},
  {id:4,name:"Capitaine fumé filets",artisan:"Fatimata B.",role:"Spécialiste fumage",exp:"12 ans",cat:"fumé",price:2400,unit:"500g",emoji:"🎣",bg:"#E6F1FB",wave:"#185FA5",badge:null,stars:5,desc:"Filets désarêtés, fumage léger. Prêt à consommer.",tags:["Désarêté","Prêt à l'emploi"],methode:"Fumage léger 4h",conservation:"2 mois au réfrigérateur"},
  {id:5,name:"Mulet séché tranches",artisan:"Nena K.",role:"Transformatrice",exp:"6 ans",cat:"séché",price:900,unit:"kg",emoji:"🍤",bg:"#EAF3DE",wave:"#3B6D11",badge:null,stars:4,desc:"Tranches régulières, idéal pour sauces et ragoûts.",tags:["Artisanal","Tranches"],methode:"Séchage solaire",conservation:"2 mois température ambiante"},
  {id:6,name:"Coffret découverte",artisan:"La Coopérative",role:"Produit collectif",exp:"",cat:"tous",price:3500,unit:"coffret",emoji:"🎁",bg:"#FBEAF0",wave:"#993556",badge:"new",stars:5,desc:"Fumé + séché + salé — les 3 spécialités en coffret cadeau.",tags:["Cadeau","3 spécialités"],methode:"Assortiment",conservation:"Selon produit"},
];

let cart=[],curProd=null,qty=1,activeCat='tous',curView='mobile';

function buildSiteHTML(isMobile){
  return `
  <div class="snav">
    <div class="sbrand">
      <div class="sbrand-logo">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10 Q5 8 8 10 Q11 12 14 10" stroke="#042C53" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M8 2 C6 2 3.5 4 3.5 6.5 C3.5 8.5 5 9.5 8 11 C11 9.5 12.5 8.5 12.5 6.5 C12.5 4 10 2 8 2Z" fill="#0C447C"/>
          <ellipse cx="6.5" cy="6" rx="0.9" ry="0.9" fill="#B5D4F4"/>
        </svg>
      </div>
      <span class="sbrand-name">Femmes de la Mer</span>
    </div>
    <div class="snav-links">
      <button class="snav-link on" onclick="showScreen('home')">Accueil</button>
      <button class="snav-link" onclick="showScreen('contact')">Contact</button>
    </div>
    <button class="scart" onclick="showScreen('panier')">
      <i class="ti ti-shopping-cart" aria-hidden="true" style="font-size:12px;"></i>
      <span class="scbadge" id="cn">0</span>
    </button>
  </div>

  <div id="screen-home" class="screen on">
    <div class="shero" style="height:${isMobile?'200px':'220px'};">
      <svg class="waves" viewBox="0 0 320 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;bottom:0;left:0;width:100%;height:100%;">
        <rect width="320" height="200" fill="#042C53"/>
        <path d="M0 140 Q40 118 80 138 Q120 158 160 132 Q200 106 240 130 Q280 154 320 130 L320 200 L0 200Z" fill="#0C447C"/>
        <path d="M0 155 Q40 136 80 152 Q120 168 160 148 Q200 128 240 145 Q280 162 320 145 L320 200 L0 200Z" fill="#185FA5"/>
        <path d="M0 170 Q40 155 80 167 Q120 179 160 163 Q200 147 240 160 Q280 173 320 160 L320 200 L0 200Z" fill="#378ADD"/>
      </svg>
      <div class="shero-content">
        <div class="shero-tag"><i class="ti ti-waves" aria-hidden="true" style="font-size:10px;"></i> Port artisanal · Nouakchott</div>
        <h1>Produits de la mer,<br>par des femmes</h1>
        <p>Poisson fumé, séché et salé — savoir-faire mauritanien certifié HACCP.</p>
        <div class="shero-btns">
          <button class="btn-sea" onclick="document.getElementById('produits-section').scrollIntoView({behavior:'smooth'})">Voir les produits</button>
          <button class="btn-ghost" onclick="showScreen('contact')">Nous contacter</button>
        </div>
      </div>
    </div>

    <div class="sfilters" id="produits-section">
      <span style="font-size:10px;color:#0C447C;font-weight:500;flex-shrink:0;">Filtrer :</span>
      <span class="schip on" onclick="filterP('tous',this)">Tous</span>
      <span class="schip" onclick="filterP('fumé',this)">Fumé</span>
      <span class="schip" onclick="filterP('séché',this)">Séché</span>
      <span class="schip" onclick="filterP('salé',this)">Salé</span>
    </div>

    <div class="sgrid" id="sgrid"></div>

    <div style="padding:10px 14px 12px;background:var(--bg2);">
      <div style="background:var(--d);border-radius:var(--border-radius-lg);padding:14px;text-align:center;">
        <p style="color:var(--ll);font-size:11px;line-height:1.6;margin-bottom:10px;">Vous êtes mareyeuse ou transformatrice ?<br>Rejoignez la coopérative.</p>
        <button class="btn-sea" onclick="showScreen('contact')" style="font-size:11px;">Nous rejoindre</button>
      </div>
    </div>

    <div class="strust">
      <div class="strust-item">
        <div class="strust-icon"><i class="ti ti-certificate" aria-hidden="true"></i></div>
        <div><p>Certifié HACCP</p><span>Hygiène rigoureuse</span></div>
      </div>
      <div class="strust-item">
        <div class="strust-icon"><i class="ti ti-truck-delivery" aria-hidden="true"></i></div>
        <div><p>Livraison 24h</p><span>Tout Nouakchott</span></div>
      </div>
      <div class="strust-item">
        <div class="strust-icon"><i class="ti ti-building-community" aria-hidden="true"></i></div>
        <div><p>Emploi formel</p><span>CNAM · CNASS</span></div>
      </div>
      <div class="strust-item">
        <div class="strust-icon"><i class="ti ti-device-mobile" aria-hidden="true"></i></div>
        <div><p>Mobile money</p><span>Masrivi · Bankily</span></div>
      </div>
    </div>

    <div class="sfooter">
      <p>© 2025 Femmes de la Mer · Nouakchott</p>
      <div class="sfooter-links">
        <a onclick="showScreen('contact')">Contact</a>
        <a>À propos</a>
      </div>
    </div>
  </div>

  <div id="screen-detail" class="screen">
    <div class="sdetail">
      <button class="sback" onclick="showScreen('home')"><i class="ti ti-arrow-left" aria-hidden="true"></i> Retour</button>
      <div class="sdetail-img" id="d2-img"></div>
      <div class="sdetail-wave" id="d2-wave"></div>
      <div class="scard-stars" id="d2-stars" style="margin-bottom:4px;"></div>
      <div class="dtitle" id="d2-name"></div>
      <div class="dby2"><i class="ti ti-user" aria-hidden="true" style="font-size:10px;"></i><span id="d2-by"></span></div>
      <div class="dprice2"><span id="d2-price"></span></div>
      <div class="ddesc2" id="d2-desc"></div>
      <div class="dtags2" id="d2-tags"></div>
      <div class="dqty">
        <span style="font-size:11px;color:var(--muted);">Quantité :</span>
        <button class="dqbtn" onclick="chgQ(-1)">−</button>
        <span class="dqv" id="dqv">1</span>
        <button class="dqbtn" onclick="chgQ(1)">+</button>
        <span style="font-size:10px;color:var(--muted);" id="d2-unit"></span>
      </div>
      <button class="dadd" onclick="addDetail()"><i class="ti ti-shopping-cart" aria-hidden="true"></i> Ajouter au panier</button>
      <div class="specs2">
        <h3>Informations produit</h3>
        <div class="sr"><span class="sk">Méthode</span><span class="sv" id="sp2-m"></span></div>
        <div class="sr"><span class="sk">Conservation</span><span class="sv" id="sp2-c"></span></div>
        <div class="sr"><span class="sk">Certification</span><span class="sv">HACCP · Sans additifs</span></div>
        <div class="sr"><span class="sk">Origine</span><span class="sv">Port artisanal, Nouakchott</span></div>
        <div class="sr"><span class="sk">Livraison</span><span class="sv">24h · dès 500 MRU</span></div>
      </div>
    </div>
  </div>

  <div id="screen-panier" class="screen">
    <div class="spanier">
      <h2><i class="ti ti-shopping-cart" aria-hidden="true" style="color:var(--m);font-size:15px;"></i>Mon panier</h2>
      <div id="citems2"></div>
      <div class="summ2">
        <h3>Résumé de commande</h3>
        <div class="sr2"><span class="sl">Sous-total</span><span class="sv" id="sub2">0 MRU</span></div>
        <div class="sr2"><span class="sl">Livraison</span><span class="sv">150 MRU</span></div>
        <div class="sr2 tot"><span class="sl" style="font-weight:500;">Total</span><span class="sv" id="tot2">150 MRU</span></div>
        <div class="pm">
          <p>Modes de paiement</p>
          <div class="pmopts">
            <span class="pmopt">À la livraison</span>
            <span class="pmopt">Masrivi</span>
            <span class="pmopt">Bankily</span>
          </div>
        </div>
        <button class="ckbtn" onclick="showToast2('Commande confirmée !')">Confirmer la commande ↗</button>
      </div>
    </div>
  </div>

  <div id="screen-contact" class="screen">
    <div class="scontact">
      <h2>Nous contacter</h2>
      <p>Commande, livraison, ou rejoindre la coopérative — on vous répond sous 24h.</p>
      <div class="form-row">
        <label>Votre nom</label>
        <input type="text" placeholder="Fatimata Diallo"/>
      </div>
      <div class="form-row">
        <label>Téléphone / WhatsApp</label>
        <input type="tel" placeholder="+222 XX XX XX XX"/>
      </div>
      <div class="form-row">
        <label>Sujet</label>
        <select>
          <option>Passer une commande</option>
          <option>Question livraison</option>
          <option>Rejoindre la coopérative</option>
          <option>Partenariat</option>
          <option>Autre</option>
        </select>
      </div>
      <div class="form-row">
        <label>Message</label>
        <textarea placeholder="Votre message..."></textarea>
      </div>
      <button class="submit-btn" onclick="showToast2('Message envoyé ! On vous contacte sous 24h.')">Envoyer le message</button>
      <div class="contact-cards">
        <div class="ccard">
          <i class="ti ti-brand-whatsapp" aria-hidden="true"></i>
          <p>WhatsApp</p>
          <span>+222 22 00 00 00</span>
        </div>
        <div class="ccard">
          <i class="ti ti-map-pin" aria-hidden="true"></i>
          <p>Port artisanal</p>
          <span>Nouakchott, MR</span>
        </div>
        <div class="ccard">
          <i class="ti ti-clock" aria-hidden="true"></i>
          <p>Horaires</p>
          <span>Lun–Sam 7h–18h</span>
        </div>
        <div class="ccard">
          <i class="ti ti-mail" aria-hidden="true"></i>
          <p>Email</p>
          <span>coop@fdlm.mr</span>
        </div>
      </div>
    </div>
  </div>
  `;
}

function renderSite(){
  const html = buildSiteHTML(curView==='mobile');
  document.getElementById('mobile-screen').innerHTML = html;
  document.getElementById('desktop-screen').innerHTML = html;
  renderGrid(prods);
}

function setView(v, btn){
  curView=v;
  document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('mobile-frame').style.display = v==='mobile'?'block':'none';
  document.getElementById('desktop-frame').style.display = v==='desktop'?'block':'none';
}

function getDoc(){
  return curView==='mobile'
    ? document.getElementById('mobile-screen')
    : document.getElementById('desktop-screen');
}

function showScreen(id){
  getDoc().querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  const el=getDoc().querySelector('#screen-'+id);
  if(el) el.classList.add('on');
  if(id==='panier') renderCart();
  getDoc().querySelectorAll('.snav-link').forEach(l=>l.classList.remove('on'));
  if(id==='home') getDoc().querySelector('.snav-link')?.classList.add('on');
}

function filterP(cat, el){
  activeCat=cat;
  getDoc().querySelectorAll('.schip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  renderGrid(cat==='tous'?prods:prods.filter(p=>p.cat===cat));
}

function renderGrid(list){
  const g=getDoc().querySelector('#sgrid');
  if(!g) return;
  g.innerHTML=list.map(p=>`
    <div class="scard" onclick="openD(${p.id})">
      <div class="scard-img" style="background:${p.bg};">
        <span>${p.emoji}</span>
        ${p.badge?`<span class="sbdg ${p.badge==='new'?'bn':p.badge==='promo'?'bp':'bb'}">${p.badge==='new'?'Nouveau':p.badge==='promo'?'-15%':'Bio'}</span>`:''}
      </div>
      <div class="scard-wave" style="background:${p.wave};"></div>
      <div class="scard-body">
        <div class="scard-stars">${'★'.repeat(p.stars)}${'☆'.repeat(5-p.stars)}</div>
        <div class="scard-name">${p.name}</div>
        <div class="scard-by">${p.artisan}</div>
        <div class="scard-foot">
          <div><span class="scard-price">${p.price.toLocaleString()} MRU</span><span class="scard-unit"> /${p.unit}</span></div>
          <button class="sadd" onclick="event.stopPropagation();qadd2(${p.id})" aria-label="Ajouter">+</button>
        </div>
      </div>
    </div>`).join('');
}

function openD(id){
  const p=prods.find(x=>x.id===id);
  curProd=p; qty=1;
  const doc=getDoc();
  doc.querySelector('#d2-img').innerHTML=`<span style="font-size:56px;">${p.emoji}</span>`;
  doc.querySelector('#d2-img').style.background=p.bg;
  doc.querySelector('#d2-wave').style.background=p.wave;
  doc.querySelector('#d2-stars').textContent='★'.repeat(p.stars)+'☆'.repeat(5-p.stars);
  doc.querySelector('#d2-name').textContent=p.name;
  doc.querySelector('#d2-by').textContent=p.artisan+' · '+p.role+' ('+p.exp+')';
  doc.querySelector('#d2-price').textContent=p.price.toLocaleString()+' MRU / '+p.unit;
  doc.querySelector('#d2-desc').textContent=p.desc;
  doc.querySelector('#d2-unit').textContent=p.unit;
  doc.querySelector('#d2-tags').innerHTML=p.tags.map(t=>`<span class="dtag2">${t}</span>`).join('');
  doc.querySelector('#sp2-m').textContent=p.methode;
  doc.querySelector('#sp2-c').textContent=p.conservation;
  doc.querySelector('#dqv').textContent=1;
  showScreen('detail');
}

function chgQ(d){qty=Math.max(1,qty+d);getDoc().querySelector('#dqv').textContent=qty;}
function addDetail(){if(!curProd)return;addC(curProd,qty);showToast2('"'+curProd.name+'" (×'+qty+') ajouté');}
function qadd2(id){const p=prods.find(x=>x.id===id);addC(p,1);showToast2('"'+p.name+'" ajouté au panier');}

function addC(p,q){
  const ex=cart.find(x=>x.id===p.id);
  if(ex)ex.qty+=q;else cart.push({...p,qty:q});
  const n=cart.reduce((a,x)=>a+x.qty,0);
  document.querySelectorAll('#cn').forEach(el=>el.textContent=n);
}

function renderCart(){
  const doc=getDoc();
  const el=doc.querySelector('#citems2');
  if(!el) return;
  if(!cart.length){
    el.innerHTML='<div style="text-align:center;padding:24px;color:var(--muted);"><i class="ti ti-shopping-cart" aria-hidden="true" style="font-size:36px;display:block;margin-bottom:8px;"></i><p style="font-size:12px;">Panier vide</p><button class="btn-sea" style="margin-top:8px;" onclick="showScreen(\'home\')">Voir les produits</button></div>';
    doc.querySelector('#sub2').textContent='0 MRU';
    doc.querySelector('#tot2').textContent='150 MRU';
    return;
  }
  el.innerHTML=cart.map((p,i)=>`
    <div class="ci2">
      <div class="ci2-img" style="background:${p.bg};">${p.emoji}</div>
      <div style="flex:1;min-width:0;">
        <div class="ci2-name">${p.name}</div>
        <div class="ci2-by">${p.artisan}</div>
        <div class="ci2-price">${(p.price*p.qty).toLocaleString()} MRU</div>
      </div>
      <div class="ci2-qty">
        <button class="ciq2" onclick="cqty2(${i},-1)">−</button>
        <span style="font-size:12px;font-weight:500;min-width:16px;text-align:center;">${p.qty}</span>
        <button class="ciq2" onclick="cqty2(${i},1)">+</button>
        <button class="cdel2" onclick="del2(${i})" aria-label="Supprimer"><i class="ti ti-trash" aria-hidden="true"></i></button>
      </div>
    </div>`).join('');
  const s=cart.reduce((a,x)=>a+x.price*x.qty,0);
  doc.querySelector('#sub2').textContent=s.toLocaleString()+' MRU';
  doc.querySelector('#tot2').textContent=(s+150).toLocaleString()+' MRU';
}

function cqty2(i,d){cart[i].qty=Math.max(1,cart[i].qty+d);const n=cart.reduce((a,x)=>a+x.qty,0);document.querySelectorAll('#cn').forEach(el=>el.textContent=n);renderCart();}
function del2(i){cart.splice(i,1);const n=cart.reduce((a,x)=>a+x.qty,0);document.querySelectorAll('#cn').forEach(el=>el.textContent=n);renderCart();}

function showToast2(msg){
  const t=document.getElementById('toast2');
  document.getElementById('tmsg2').textContent=msg;
  t.style.display='flex';setTimeout(()=>t.style.display='none',2200);
}

renderSite();
