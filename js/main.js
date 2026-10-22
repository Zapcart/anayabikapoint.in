/* Anaya Bika Point — static storefront / WhatsApp enquiry checkout.
 * EDIT HERE: store phone, catalogue names/descriptions and service options.
 * Catalogue entries are representative, NOT live inventory or confirmed prices.
 * No payment or personal details are stored. Only item IDs/quantities and saves.
 * Keep index.html, styles.css, main.js and site.webmanifest in one directory.
 */
(() => {
  'use strict';
  const PHONE = '919324396437';
  const STORAGE_KEY = 'anaya-enquiry-v2';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const products = [
    {id:'helmet',name:'Full-face riding helmet',group:'Accessories',category:'Riding essentials',sub:'Protection for the everyday ride',tag:'RIDE ESSENTIAL',art:'helmet',description:'Explore full-face helmet options for your daily commute and weekend rides. Ask about available brands, sizes and safety certification before choosing.',details:['Confirm fit and size in store','Ask about certification for the exact model','Colours and brands subject to availability']},
    {id:'oil',name:'4T motorcycle engine oil',group:'Care',category:'Engine care',sub:'A smoother-running engine starts here',tag:'BIKE CARE',art:'oil',description:'Find engine oil suited to your motorcycle. Our team can help check the grade, specification and quantity recommended for your bike.',details:['Share your model and year','Oil grade depends on manufacturer guidance','Ask about oil change service']},
    {id:'brakes',name:'Disc brake pad set',group:'Parts',category:'Braking',sub:'Make every stop count',tag:'SPARE PART',art:'brake',description:'Enquire about replacement disc brake pads for your two-wheeler. Exact pad shapes and specifications vary by model.',details:['Model-specific fitment required','Front and rear options may differ','Ask about inspection and fitting']},
    {id:'chain',name:'Drive chain & sprocket kit',group:'Parts',category:'Drivetrain',sub:'Keep the good rides rolling',tag:'SPARE PART',art:'chain',description:'Refresh your bike’s drivetrain with a compatible chain and sprocket kit. Send your bike details to confirm chain size and sprocket specification.',details:['Confirm chain pitch and sprocket size','Ask about compatible brand options','Installation quote available on request']},
    {id:'gloves',name:'Protective riding gloves',group:'Accessories',category:'Riding essentials',sub:'A better grip on every adventure',tag:'RIDE ESSENTIAL',art:'gloves',description:'Explore riding gloves for everyday comfort and grip. Ask our team about sizes, materials and protection features available.',details:['Confirm hand size before ordering','Ask about knuckle and palm protection','Available styles confirmed on WhatsApp']},
    {id:'mirror',name:'Rear-view mirror pair',group:'Parts',category:'Visibility',sub:'A clearer view of what’s behind',tag:'SPARE PART',art:'mirror',description:'Ask about replacement rear-view mirrors for your motorcycle or scooter. Thread size, mounting and design depend on the model.',details:['Share a photo of the existing mirror','Check mount and thread compatibility','Ask about left and right options']},
    {id:'spark',name:'Motorcycle spark plug',group:'Parts',category:'Ignition',sub:'The spark your ride needs',tag:'SPARE PART',art:'spark',description:'Enquire about the right spark plug for your engine. Heat range, reach and plug type must match manufacturer specifications.',details:['Exact bike model and variant needed','Ask about available brands','Check replacement needs with our team']},
    {id:'care',name:'Chain care essentials',group:'Care',category:'Cleaning & maintenance',sub:'A little upkeep. A lot more riding.',tag:'BIKE CARE',art:'care',description:'Give your chain some attention. Ask about chain cleaner, compatible lubricant and maintenance essentials for your motorcycle.',details:['Confirm suitability for your chain type','Ask about cleaner and lubricant options','Follow the bike manufacturer’s care advice']}
  ];
  let serial = 0;
  function art(type, className = 'product-art') {
    const n = 'a' + (++serial);
    const fill = `url(#${n})`;
    const common = `<defs><linearGradient id="${n}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#4b5449"/><stop offset=".48" stop-color="#262e29"/><stop offset="1" stop-color="#131b17"/></linearGradient><linearGradient id="${n}m" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#919b91"/><stop offset=".4" stop-color="#d9dfd6"/><stop offset=".65" stop-color="#7d8b7b"/><stop offset="1" stop-color="#c2cbbc"/></linearGradient></defs>`;
    const metal = `url(#${n}m)`;
    const drawings = {
      helmet:`<path d="M39 151C26 74 66 31 128 31c63 0 99 46 96 103l-20 36-42 20-99-7Z" fill="${fill}"/><path d="M48 96c18-19 59-35 100-26l54 19-10 35-114 10-35-17Z" fill="#0e1718" stroke="#6f7f76" stroke-width="3"/><path d="m57 93 132-3-6 22-121 8Z" fill="#57746e" opacity=".55"/><path d="m166 127 48 8-14 26-43 10Z" fill="#455142"/><path d="m91 32 28-4 45 43-19-2Z" fill="#cfef55"/><path d="m183 81-16-35 11 8 18 34Z" fill="#cfef55"/><path d="m77 137 15 3-6 36-15-1Z" fill="#cfef55"/><path d="m98 145 47 2-2 8-47-2Zm1 16 44 1-2 7-44-1Z" fill="#0b130f"/><path d="m43 156 25 19 93 10 45-18-9 17-37 15-99-10-25-22Z" fill="#121a15"/><path d="M63 57q25-23 64-19" stroke="#83927a" stroke-width="3" fill="none"/><circle cx="170" cy="127" r="7" fill="#8a987d"/><circle cx="170" cy="127" r="3" fill="#283326"/>`,
      oil:`<path d="m94 46-11 26-15 18-5 115q0 11 11 11h111q11 0 9-13l-9-119-15-11-13-27Z" fill="${fill}"/><path d="m99 37 49-2 9 28-66 2Z" fill="#101b15"/><path d="M100 34h46v13h-46Z" fill="#cfef55"/><path d="m154 78 17 11 4 28-17-2-8-23Z" fill="#dee6d6"/><path d="m76 103 100-1 6 89-111 2Z" fill="#c8e952"/><path d="m76 103 100-1 2 24-104 3Z" fill="#e2f7a4"/><text x="85" y="143" font-family="Arial,sans-serif" font-size="15" font-weight="bold" fill="#263825">MOTO</text><text x="82" y="177" font-family="Arial,sans-serif" font-size="36" font-weight="bold" fill="#263825">4T</text><path d="M83 186h63v3H83Z" fill="#57703a"/><path d="m81 83-7 14-5 98" fill="none" stroke="#77856c" stroke-width="2"/>`,
      brake:`<g transform="rotate(-22 125 125)"><path d="m48 94 12-22 101-9 28 14 6 59-27 19-109 7-17-20Z" fill="${metal}" stroke="#6d7968" stroke-width="3"/><path d="m59 96 12-13 85-8 19 10 4 42-18 14-97 7-10-15Z" fill="${fill}"/><path d="M78 93v43m27-46v45m28-47v45m27-47v43" stroke="#58634e" stroke-width="3"/><circle cx="60" cy="78" r="6" fill="#172315"/><circle cx="179" cy="77" r="6" fill="#172315"/><path d="m81 154 15-14 88 1 24 15-1 37-18 17-104-6-11-19Z" fill="#9d6346" stroke="#5b4836" stroke-width="3"/><path d="m87 161 16-12 75 2 19 11-2 24-14 14-91-5Z" fill="#b17a57"/><path d="m108 157-7 30m30-27-8 30m29-30-7 31m26-28-7 28" stroke="#855239" stroke-width="3"/></g>`,
      chain:`<g fill="${metal}" stroke="#718069" stroke-width="2"><path d="m153 34 10 9 14-2 5 15 13 7-4 15 8 12-11 11-1 15-15 3-8 12-14-6-14 5-8-13-15-4 1-15-9-12 10-12 2-15 15-2 9-12Z"/><circle cx="153" cy="83" r="25" fill="#eeefe7"/><path d="m85 123 9 8 13-2 4 12 11 6-3 13 7 10-10 9-1 13-12 2-7 11-12-5-11 4-7-11-13-3 1-13-8-10 9-10 2-13 12-2 8-10Z"/><circle cx="84" cy="165" r="20" fill="#eeefe7"/></g><g fill="none" stroke="#394634" stroke-width="11"><path d="M84 123c-23 0-42 15-42 41s23 49 50 42l79-27c22-8 39-32 35-60l-11-55"/></g><path d="M84 123c-23 0-42 15-42 41s23 49 50 42l79-27c22-8 39-32 35-60l-11-55" fill="none" stroke="#b0bc9b" stroke-width="5" stroke-dasharray="5 7"/><circle cx="153" cy="83" r="8" fill="#7b896b"/><circle cx="84" cy="165" r="6" fill="#7b896b"/>`,
      gloves:`<g transform="rotate(-18 125 125)"><path d="m65 173-6-47-15-33q-2-15 10-13l19 26-2-57q5-15 14-4l8 47 3-61q9-12 16 0l3 60 9-52q10-11 15 3l-4 61 14-38q13-6 14 7l-12 63-20 39-2 26-59-2Z" fill="${fill}" stroke="#53604b" stroke-width="2"/><path d="m78 108 43-4 15 24-18 21-30-9Z" fill="#131e17" stroke="#718260" stroke-width="3"/><path d="m88 114 9 22m5-25 8 25m5-25 8 16" stroke="#96a581" stroke-width="5"/><path d="m70 171 55 7-4 20-49-2Z" fill="#bcd76b"/><path d="m81 177 34 5-1 8-33-3Z" fill="#2c3d24"/></g><g transform="translate(92 29) rotate(12 90 120) scale(.72)"><path d="m65 173-6-47-15-33q-2-15 10-13l19 26-2-57q5-15 14-4l8 47 3-61q9-12 16 0l3 60 9-52q10-11 15 3l-4 61 14-38q13-6 14 7l-12 63-20 39-2 26-59-2Z" fill="#3e4d36" stroke="#6a7b5a" stroke-width="2"/><path d="m78 108 43-4 15 24-18 21-30-9Z" fill="#18251a"/><path d="m70 171 55 7-4 20-49-2Z" fill="#bed46e"/></g>`,
      mirror:`<path d="m92 118 17 57 21 26m43-95-12 58-12 19" fill="none" stroke="#303e2b" stroke-width="9" stroke-linecap="round"/><path d="M89 58c-33-20-68-1-58 30s49 51 66 24 16-38-8-54Z" fill="${fill}" stroke="#617253" stroke-width="4"/><path d="M84 63c-24-14-51-1-45 20s38 43 51 23 14-32-6-43Z" fill="#b0c3b9"/><path d="m47 75 33-10-30 31" fill="#d8e4da" opacity=".7"/><path d="M172 46c34-15 63 5 51 35s-49 46-63 19-13-35 12-54Z" fill="${fill}" stroke="#617253" stroke-width="4"/><path d="M177 53c25-11 47 3 38 25s-36 34-48 15-9-25 10-40Z" fill="#a6bcb1"/><path d="m174 60 29 3-33 20" fill="#d4e5d7" opacity=".7"/><path d="m123 197 11-8 8 10-12 11Zm22-17 11-8 8 10-12 11Z" fill="${metal}"/>`,
      spark:`<g transform="rotate(28 125 125)"><path d="M117 24h17v29h-17Z" fill="${metal}"/><path d="m113 48 25-1 4 63-34 1Z" fill="#e6e8dc" stroke="#b7c1ad" stroke-width="2"/><path d="M108 61h34m-34 10h34m-34 10h34m-34 10h34m-34 10h34" stroke="#a7b299" stroke-width="3"/><path d="m105 112 40-1 10 17-10 19-40 1-10-17Z" fill="${metal}" stroke="#62735c" stroke-width="2"/><path d="M108 148h34v51h-34Z" fill="${metal}"/><path d="m108 154 34-6m-34 16 34-6m-34 16 34-6m-34 16 34-6m-34 16 34-6" stroke="#6a7b60" stroke-width="3"/><path d="M119 199h10v15h-10Z" fill="#c9d8bc"/><path d="M139 194v24h-15" fill="none" stroke="#667a58" stroke-width="5"/></g>`,
      care:`<path d="M57 83h61v124q-30 17-61 0Z" fill="${fill}"/><path d="M58 73h59v15H58Z" fill="#77886a"/><path d="M72 53h31v22H72Z" fill="#1c2d1d"/><path d="M81 45h24v12H81Z" fill="#263a22"/><path d="M102 49h27" stroke="#cb5341" stroke-width="3"/><path d="M60 112h55v74H60Z" fill="#cfef55"/><text x="68" y="138" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="#233820">CHAIN</text><text x="66" y="154" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="#233820">CLEAN</text><path d="M70 163h32v3H70Zm0 8h25v3H70Z" fill="#7e9c39"/><path d="M140 98h53v111q-26 13-53 0Z" fill="${metal}"/><path d="M141 88h51v13h-51Z" fill="#31472b"/><path d="M151 69h31v20h-31Z" fill="#22371e"/><path d="M150 65h34v9h-34Z" fill="#cfef55"/><path d="M143 122h47v63h-47Z" fill="#31472b"/><text x="148" y="144" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="#cfef55">CHAIN</text><text x="152" y="160" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="#cfef55">LUBE</text><path d="M151 170h31v3h-31Z" fill="#8fa866"/>`
    };
    return `<svg class="${className}" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${common}${drawings[type] || drawings.helmet}</svg>`;
  }
  const getProduct = id => products.find(p => p.id === id);
  let cart = {}, saved = new Set();
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (value && typeof value === 'object') {
      if (value.cart && typeof value.cart === 'object') for (const [id, qty] of Object.entries(value.cart)) {
        if (getProduct(id) && Number.isInteger(qty) && qty > 0 && qty <= 99) cart[id] = qty;
      }
      if (Array.isArray(value.saved)) saved = new Set(value.saved.filter(id => typeof id === 'string' && getProduct(id)));
    }
  } catch (_) { /* Private browsing / invalid storage: run normally in memory. */ }
  let filter = 'All', query = '', onlySaved = false;
  let toastTimer;
  function toast(message) {
    $('#toast').textContent = message;
    $('#toast').classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2800);
  }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({cart, saved:[...saved]})); } catch (_) { /* No persistence required to order. */ }
    syncCounts();
  }
  function syncCounts() {
    const count = Object.values(cart).reduce((sum, n) => sum + n, 0);
    $('#cartCount').textContent = count;
    $('#cartToggle').setAttribute('aria-label', `Open enquiry bag, ${count} items`);
    $('#wishCount').textContent = saved.size;
    $('#wishCount').hidden = saved.size === 0;
    $('#wishlistToggle').setAttribute('aria-pressed', String(onlySaved));
  }
  function sendWhatsApp(message) {
    const link = document.createElement('a');
    link.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    document.body.appendChild(link); link.click(); link.remove();
  }
  const categories = [
    {title:'Riding gear',sub:'Gear up for the road',art:'helmet',filter:'Accessories',query:''},
    {title:'Engine care',sub:'Keep it running right',art:'oil',filter:'Care',query:'engine'},
    {title:'Spare parts',sub:'Every little part matters',art:'chain',filter:'Parts',query:''},
    {title:'Bike care',sub:'A little love for your ride',art:'care',filter:'Care',query:''}
  ];
  $('#categoryGrid').innerHTML = categories.map((c, i) => `<button class="category-card" data-category="${i}" aria-label="Browse ${c.title}"><h3>${c.title}</h3><p>${c.sub}</p>${icon('arrow')}${art(c.art,'category-art')}</button>`).join('');
  function renderProducts() {
    let list = products.filter(p => (filter === 'All' || p.group === filter) && (!onlySaved || saved.has(p.id)) && `${p.name} ${p.group} ${p.category} ${p.sub}`.toLowerCase().includes(query));
    const sort = $('#sortProducts').value;
    if (sort !== 'featured') list.sort((a,b) => sort === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    $('#resultCount').textContent = `${list.length} ${onlySaved ? 'saved ' : ''}essential${list.length === 1 ? '' : 's'} to explore`;
    $('#clearFilters').hidden = filter === 'All' && !query && !onlySaved;
    $$('.filter').forEach(b => { const active = b.dataset.filter === filter; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    syncCounts();
    $('#productGrid').innerHTML = list.length ? list.map(p => `<article class="product-card"><div class="product-visual"><span class="product-tag">${p.tag}</span><button class="save-product ${saved.has(p.id) ? 'saved' : ''}" data-save="${p.id}" aria-label="Save ${p.name}" aria-pressed="${saved.has(p.id)}">${icon('heart')}</button><button class="product-art-button" data-quick="${p.id}" aria-label="View ${p.name}">${art(p.art)}<span class="quick-label">Take a closer look ↗</span></button></div><p class="product-meta">${p.category}</p><h3>${p.name}</h3><p class="product-subtitle">${p.sub}</p><div class="product-bottom"><span class="quote-price">Request price <span>↗</span></span><button class="add-product" data-add="${p.id}" aria-label="Add ${p.name} to enquiry bag">${icon('bag')}</button></div></article>`).join('') : `<div class="empty-results"><h3>${onlySaved ? 'Your saved essentials will appear here.' : 'No essentials found just yet.'}</h3><p>Try another search, or message us for the part you need.</p><button class="button dark" data-reset>Explore all essentials ${icon('arrow')}</button></div>`;
  }
  function clearFilters() {
    filter = 'All'; query = ''; onlySaved = false; $('#productSearch').value = ''; renderProducts();
  }
  function addToCart(id) {
    if (!getProduct(id)) return;
    if ((cart[id] || 0) >= 99) return toast('Maximum 99 per item. Ask us about a bulk quote.');
    cart[id] = (cart[id] || 0) + 1; persist();
    toast('Added to your enquiry bag.');
    if ($('#cartDialog').open) renderCart();
  }
  function openDialog(dialog) {
    if (dialog.open) return;
    const current = $('dialog[open]');
    if (current) current.close();
    dialog.showModal(); document.body.classList.add('modal-open');
  }
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => { if (!$('dialog[open]')) document.body.classList.remove('modal-open'); });
    dialog.addEventListener('click', e => {
      if (e.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    });
  });
  function renderCart() {
    const ids = Object.keys(cart);
    $('#orderForm').hidden = !ids.length;
    $('#cartItems').innerHTML = ids.length ? ids.map(id => {
      const p = getProduct(id);
      return `<article class="cart-row"><div class="cart-art">${art(p.art,'')}</div><div><h3>${p.name}</h3><p>Price & availability on request</p><div class="cart-quantity"><button type="button" data-qty="${id}" data-step="-1" aria-label="Reduce quantity of ${p.name}">−</button><span aria-label="Quantity">${cart[id]}</span><button type="button" data-qty="${id}" data-step="1" aria-label="Increase quantity of ${p.name}" ${cart[id] >= 99 ? 'disabled' : ''}>+</button></div></div><button class="remove-item" data-remove="${id}" aria-label="Remove ${p.name}">${icon('close')}</button></article>`;
    }).join('') : `<div class="empty-bag">${icon('bag')}<h3>Every good ride starts somewhere.</h3><p>Add a few essentials and send us your list.</p><button class="button dark" data-close-shop>Explore the store ${icon('arrow')}</button></div>`;
  }
  function quickView(id) {
    const p = getProduct(id); if (!p) return;
    $('#quickContent').innerHTML = `<div class="quick-layout"><div class="quick-art">${art(p.art,'')}</div><div class="quick-details"><p class="eyebrow">${p.category}</p><h2 id="quickTitle">${p.name}</h2><p>${p.description}</p><ul>${p.details.map(d => `<li>${d}</li>`).join('')}</ul><p class="form-note">Representative illustration. Confirm brand, specifications and price with our team.</p><button class="button lime full" data-add="${p.id}">${icon('bag')} Add to enquiry bag ${icon('arrow')}</button><button class="plain-link" data-direct="${p.id}">Ask about this on WhatsApp ↗</button></div></div>`;
    openDialog($('#productDialog'));
  }
  document.addEventListener('click', e => {
    const button = e.target.closest('button'); if (!button) return;
    if (button.matches('.close-dialog')) { button.closest('dialog').close(); return; }
    if (button.hasAttribute('data-add')) addToCart(button.dataset.add);
    if (button.hasAttribute('data-quick')) quickView(button.dataset.quick);
    if (button.hasAttribute('data-save')) {
      const id = button.dataset.save;
      saved.has(id) ? saved.delete(id) : saved.add(id); persist();
      // Preserve keyboard focus unless removal changes the saved-products list.
      if (onlySaved) { renderProducts(); $('#wishlistToggle').focus(); }
      else { button.classList.toggle('saved', saved.has(id)); button.setAttribute('aria-pressed', String(saved.has(id))); }
      toast(saved.has(id) ? 'Saved for your next ride.' : 'Removed from saved essentials.');
    }
    if (button.hasAttribute('data-filter')) { filter = button.dataset.filter; renderProducts(); }
    if (button.hasAttribute('data-category')) {
      const c = categories[Number(button.dataset.category)]; filter = c.filter; query = c.query; onlySaved = false;
      $('#productSearch').value = query; renderProducts(); $('#shop').scrollIntoView({behavior:'smooth'});
    }
    if (button.hasAttribute('data-reset')) clearFilters();
    if (button.hasAttribute('data-remove')) { delete cart[button.dataset.remove]; persist(); renderCart(); $('#cartDialog .close-dialog').focus(); }
    if (button.hasAttribute('data-qty')) {
      const id = button.dataset.qty;
      if (!getProduct(id) || !cart[id]) return;
      cart[id] = Math.min(99, cart[id] + Number(button.dataset.step));
      if (cart[id] <= 0) delete cart[id]; persist(); renderCart();
      const replacement = $(`[data-qty="${id}"][data-step="${button.dataset.step}"]`);
      (replacement || $('#cartDialog .close-dialog')).focus();
    }
    if (button.hasAttribute('data-close-shop')) { $('#cartDialog').close(); $('#shop').scrollIntoView({behavior:'smooth'}); }
    if (button.hasAttribute('data-book')) {
      $('#serviceType').value = button.dataset.book;
      $('#serviceDate').min = istDate();
      openDialog($('#bookingDialog'));
    }
    if (button.hasAttribute('data-direct')) {
      const p = getProduct(button.dataset.direct);
      if (p) sendWhatsApp(`Hi Anaya Bika Point! I'm interested in: ${p.name}.\n\nPlease confirm compatible options, current price and availability.\nMy bike model & year: `);
    }
  });
  $('#productSearch').addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); renderProducts(); });
  $('#sortProducts').addEventListener('change', renderProducts);
  $('#clearFilters').addEventListener('click', clearFilters);
  $('#searchToggle').addEventListener('click', () => { $('#shop').scrollIntoView({behavior:'smooth'}); $('#productSearch').focus({preventScroll:true}); });
  $('#wishlistToggle').addEventListener('click', () => { onlySaved = !onlySaved; query = ''; filter = 'All'; $('#productSearch').value = ''; renderProducts(); $('#shop').scrollIntoView({behavior:'smooth'}); });
  $('#cartToggle').addEventListener('click', () => { renderCart(); openDialog($('#cartDialog')); });
  $('#orderForm').addEventListener('submit', e => {
    e.preventDefault();
    const ids = Object.keys(cart); if (!ids.length) return;
    const list = ids.map((id,i) => `${i+1}. ${getProduct(id).name} — Qty ${cart[id]}`).join('\n');
    const bike = $('#orderBike').value.trim(); const notes = $('#orderNotes').value.trim();
    sendWhatsApp(`Hi Anaya Bika Point! I'd like a quote for:\n\n${list}\n\nBike model & year: ${bike || 'Please help me check compatibility'}${notes ? `\nNotes: ${notes}` : ''}\n\nPlease confirm current prices, availability, fitment and collection/delivery options.\nEnquiry from https://anayabikapoint.in/`);
  });
  $('#fitForm').addEventListener('submit', e => {
    e.preventDefault();
    sendWhatsApp(`Hi Anaya Bika Point! Please help me find compatible parts.\nBrand: ${$('#bikeBrand').value}\nModel & year: ${$('#bikeModel').value.trim()}\n\nThe part I need: `);
  });
  function istDate() {
    const parts = new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const v = Object.fromEntries(parts.map(p => [p.type,p.value]));
    return `${v.year}-${v.month}-${v.day}`;
  }
  $('#serviceDate').min = istDate();
  function validateServiceDate() {
    const field = $('#serviceDate'); field.setCustomValidity('');
    if (!field.value) return;
    if (field.value < istDate()) field.setCustomValidity('Please choose today or a future date.');
    else if (new Date(field.value + 'T12:00:00Z').getUTCDay() === 5) field.setCustomValidity('Friday is our weekly off. Please choose another day.');
  }
  $('#serviceDate').addEventListener('input', validateServiceDate);
  $('#bookingForm').addEventListener('submit', e => {
    e.preventDefault(); validateServiceDate(); if (!e.target.reportValidity()) return;
    const date = new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'}).format(new Date($('#serviceDate').value + 'T12:00:00Z'));
    sendWhatsApp(`Hi Anaya Bika Point! I'd like to request a service.\n\nService: ${$('#serviceType').value}\nBike: ${$('#serviceBike').value.trim()}\nPreferred date: ${date}\n${$('#serviceNotes').value.trim() ? `Details: ${$('#serviceNotes').value.trim()}\n` : ''}\nPlease confirm an available time and an estimate. I understand the appointment needs your confirmation.`);
  });
  function menu(open) { $('#navigation').classList.toggle('open',open); $('#menuToggle').setAttribute('aria-expanded',String(open)); $('#menuToggle').setAttribute('aria-label',open?'Close menu':'Open menu'); }
  $('#menuToggle').addEventListener('click', () => menu($('#menuToggle').getAttribute('aria-expanded') !== 'true'));
  $$('#navigation a').forEach(a => a.addEventListener('click', () => menu(false)));
  document.addEventListener('click', e => { if (!$('#header').contains(e.target)) menu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#navigation').classList.contains('open')) { menu(false); $('#menuToggle').focus(); } });
  window.matchMedia('(min-width:651px)').addEventListener('change', e => { if(e.matches) menu(false); });
  function updateStatus() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()).map(p => [p.type,p.value]));
    const minutes = Number(p.hour)*60 + Number(p.minute);
    const open = p.weekday !== 'Fri' && minutes >= 600 && minutes < 1260;
    let text = 'Open now · Until 9:00 PM';
    if (!open) text = p.weekday === 'Fri' ? 'Friday weekly off · Opens Saturday at 10 AM' : minutes < 600 ? 'Closed now · Opens today at 10 AM' : p.weekday === 'Thu' ? 'Closed now · Opens Saturday at 10 AM' : 'Closed now · Opens tomorrow at 10 AM';
    $('#storeStatus').textContent = text; $('.store-status').classList.toggle('closed',!open);
  }
  updateStatus(); setInterval(() => { if (!document.hidden) updateStatus(); },60000);
  $('#year').textContent = new Date().getFullYear();
  $$('.story-visual img').forEach(img => {
    const fallback = () => { img.hidden = true; $('.image-fallback',img.parentElement).hidden = false; };
    img.addEventListener('error', fallback); if (img.complete && !img.naturalWidth) fallback();
  });
  // Keep all content visible without JavaScript or on reduced-motion devices.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reveal-enabled');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold:.08});
    $$('.reveal').forEach(el => observer.observe(el));
  }
  renderProducts();
})();
