/* Anaya Bike Point — Complete Body Kits & Body Panels Storefront
 * Exclusively exterior body kits & individual panels for scooters and motorcycles.
 * WhatsApp enquiry checkout with vehicle model, variant, year and colour matching.
 */
(() => {
  'use strict';
  const PHONE = '919324396437';
  const STORAGE_KEY = 'anaya-bodykits-v1';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const products = [
    {
      id: 'burgman-new',
      name: 'Suzuki Burgman Street — Body Kit (New Model)',
      group: 'Scooter Kits',
      category: 'Suzuki · Maxi Scooter',
      sub: 'Front apron, side panels, visor & rear cowls',
      tag: 'COMPLETE KIT',
      art: 'burgmanKit',
      description: 'Complete replacement exterior body kit set for the new-model Suzuki Burgman Street. Available in factory-style shades (Matte Black, Matte Bordeaux Red, Pearl White, etc.). Customers must confirm exact model year, edition and panel requirements on WhatsApp before ordering.',
      details: [
        'Available as complete exterior set or select panels',
        'Front apron, side cowls, handlebar cowl & rear body panels',
        'Confirm exact colour code and variant on WhatsApp',
        'Send vehicle photo for 100% fitment check'
      ]
    },
    {
      id: 'burgman-old',
      name: 'Suzuki Burgman Street — Body Kit (Old Model)',
      group: 'Scooter Kits',
      category: 'Suzuki · Previous Generation',
      sub: 'Complete body panels for earlier Burgman models',
      tag: 'COMPLETE KIT',
      art: 'burgmanKit',
      description: 'Full exterior replacement body kit for previous-generation Suzuki Burgman Street scooters. Preserves factory mounting points and contours. Confirm your scooter year and colour on WhatsApp.',
      details: [
        'Designed specifically for earlier-generation Burgman Street',
        'Front apron, mudguard, side body panels & tail section',
        'Check bracket compatibility with our team',
        'Single replacement panels also available on request'
      ]
    },
    {
      id: 'access-new',
      name: 'Suzuki Access 125 — Body Kit (New Model / BS6)',
      group: 'Scooter Kits',
      category: 'Suzuki · Retro Classic',
      sub: 'Front apron shield, side body panels & mudguard',
      tag: 'COMPLETE KIT',
      art: 'accessKit',
      description: 'Full exterior body kit set for new-model Suzuki Access 125 (BS6 / Special Edition / Ride Connect). Available in popular colours including Matte Red, Pearl Mirage White, Metallic Matte Black, and Royal Bronze. Confirm your exact model on WhatsApp.',
      details: [
        'Complete set: Front apron, front fender & left/right side panels',
        'Matches new-model headlamp and side body contours',
        'Emblem cutouts and mounting brackets aligned',
        'WhatsApp photo verification available for colour match'
      ]
    },
    {
      id: 'access-old',
      name: 'Suzuki Access 125 — Body Kit (Old Model)',
      group: 'Scooter Kits',
      category: 'Suzuki · Previous Generation',
      sub: 'Replacement body set for earlier Access models',
      tag: 'COMPLETE KIT',
      art: 'accessKit',
      description: 'Exterior body kit panels tailored for old-generation Suzuki Access 125 scooters. Ideal for restoring accident-damaged or weathered bodywork. Confirm exact variant with our Kurla West team.',
      details: [
        'Suits earlier Access 125 generation models',
        'Full set or individual front/rear panels available',
        'Confirm drum vs disc cowl specifications',
        'Send vehicle photo for exact model confirmation'
      ]
    },
    {
      id: 'ntorq-kit',
      name: 'TVS Ntorq 125 — Complete Body Kit',
      group: 'Scooter Kits',
      category: 'TVS · Sporty Scooter',
      sub: 'Stealth front apron, split rear cowls & sporty visor',
      tag: 'COMPLETE KIT',
      art: 'ntorqKit',
      description: 'Aggressively styled exterior body kit for TVS Ntorq 125 (Standard, Race Edition & Super Squad variants). Features signature aerodynamic lines. Confirm your exact edition and colourway on WhatsApp.',
      details: [
        'Sporty front apron, front fender, floorboard trims & split tail cowls',
        'Available for Race Edition and Standard colourways',
        'Visor and badge cutouts matched to model specifications',
        'Confirm exact panel list on WhatsApp before ordering'
      ]
    },
    {
      id: 'activa-kit',
      name: 'Honda Activa — Body Kit (6G / 5G / 4G / 3G)',
      group: 'Scooter Kits',
      category: 'Honda · Everyday Scooter',
      sub: 'Full metal & fiber exterior panels for all generations',
      tag: 'COMPLETE KIT',
      art: 'activaKit',
      description: 'Exterior body panel sets for Honda Activa models across generations (3G, 4G, 5G, and 6G). Covers front nose shield, side body covers, handlebar cowl, and front fender. Please state your exact Activa generation on WhatsApp.',
      details: [
        'Generations handled: Activa 3G, 4G, 5G & 6G',
        'Front apron, handlebar cowl, mudguard & side panels',
        'Confirm generation and colour shade with our team',
        'Full kit or separate front/side panels available'
      ]
    },
    {
      id: 'shine-kit',
      name: 'Honda CB Shine 125 — Motorcycle Body Kit',
      group: 'Motorcycle Kits',
      category: 'Honda · Commuter Motorcycle',
      sub: 'Fuel tank panels, visor mask, side covers & tail cowl',
      tag: 'MOTORCYCLE KIT',
      art: 'bikeKit',
      description: 'Complete exterior body kit set for Honda CB Shine 125. Includes front headlight visor cowl, side battery covers, and rear tail cowl. Confirm model year, drum/disc variant, and tank graphics on WhatsApp.',
      details: [
        'Headlight mask cowl, side utility covers & rear tail cowl',
        'Colour matched to standard Honda Shine colourways',
        'Send motorcycle photo to match graphic decals',
        'Volume rates available for workshop/reseller orders'
      ]
    },
    {
      id: 'unicorn-kit',
      name: 'Honda Unicorn 150 / 160 — Body Kit',
      group: 'Motorcycle Kits',
      category: 'Honda · Premium Commuter',
      sub: 'Front visor cowl, tank shrouds, side panels & tail piece',
      tag: 'MOTORCYCLE KIT',
      art: 'bikeKit',
      description: 'Exterior body panel set for Honda Unicorn 150 and Unicorn 160. Designed for clean fitment over factory chassis brackets. Confirm your model year and colour on WhatsApp.',
      details: [
        'Front bikini fairing / visor cowl, side body panels & tail piece',
        'Suits Unicorn 150 and 160 generations',
        'Confirm colour and graphics before ordering',
        'Inspect panels in-store at Kurla West or enquire for delivery'
      ]
    },
    {
      id: 'apron-shield',
      name: 'Front Apron / Nose Shield Panel',
      group: 'Individual Panels',
      category: 'Scooter Front Body',
      sub: 'For Burgman, Access, Activa & Ntorq',
      tag: 'INDIVIDUAL PANEL',
      art: 'apron',
      description: 'Individual replacement front apron (nose shield / front body cover) for popular scooters. Protects the radiator and electrical harness while restoring front-end look after scrapes or collision.',
      details: [
        'Available for Burgman, Access, Activa, Ntorq and others',
        'High-grade ABS / virgin plastic with durable finish',
        'Confirm vehicle model, year, and colour code',
        'Single panel purchase — no need to buy full kit'
      ]
    },
    {
      id: 'side-panels',
      name: 'Side Body Panels (Left / Right / Pair)',
      group: 'Individual Panels',
      category: 'Exterior Bodywork',
      sub: 'Left and right rear body cowls with emblem slots',
      tag: 'INDIVIDUAL PANEL',
      art: 'sidePanel',
      description: 'Replacement side body panels for scooters and motorcycles. Order as a matching pair or a single side (left or right). Available in matte and gloss factory-matching colours.',
      details: [
        'Order as Left Side, Right Side, or Complete Pair',
        'Emblem cutouts and mounting tabs intact',
        'Available for all major scooter and motorcycle models',
        'Share photo of existing panel for 100% shade match'
      ]
    },
    {
      id: 'headlight-cowl',
      name: 'Headlight Cowl Mask & Visor Set',
      group: 'Individual Panels',
      category: 'Handlebar & Front Fairing',
      sub: 'Upper headlight fairings, masks & windscreen visors',
      tag: 'INDIVIDUAL PANEL',
      art: 'headlightCowl',
      description: 'Upper handlebar cowls, front headlight masks, and acrylic/polycarbonate tinted visors for commuter motorcycles and scooters. Restores front-end styling after breakage.',
      details: [
        'Fits models: Activa, Access, Burgman, Ntorq, Shine, Unicorn',
        'Available in painted and textured matte finishes',
        'Includes visor mounting provisions',
        'Check variant compatibility on WhatsApp'
      ]
    },
    {
      id: 'mudguard-fender',
      name: 'Front & Rear Mudguards / Fenders',
      group: 'Individual Panels',
      category: 'Wheel Protection Bodywork',
      sub: 'Front wheel fenders and rear mudguard assemblies',
      tag: 'INDIVIDUAL PANEL',
      art: 'mudguard',
      description: 'Replacement front mudguards and rear fenders for scooters and motorcycles. Made from resilient, impact-resistant plastic to withstand Mumbai road debris and wet weather.',
      details: [
        'Front fenders and rear tyre huggers/mud flaps',
        'Accurate mounting holes for direct chassis fitment',
        'Painted front mudguards in standard factory colours',
        'Confirm model year and brake type (disc/drum)'
      ]
    }
  ];

  let serial = 0;
  function art(type, className = 'product-art') {
    const n = 'bk' + (++serial);
    const fill = `url(#${n})`;
    const accent = '#cfef55';
    const darkShade = '#192219';
    const midShade = '#2d3b2f';
    const lightShade = '#e9ede0';

    const common = `<defs>
      <linearGradient id="${n}" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#3b483c"/>
        <stop offset=".5" stop-color="#232e25"/>
        <stop offset="1" stop-color="#141c16"/>
      </linearGradient>
      <linearGradient id="${n}lime" x1="0" y1="0" x2="1" y2="0">
        <stop stop-color="#d6f865"/>
        <stop offset="1" stop-color="#a4c62f"/>
      </linearGradient>
      <linearGradient id="${n}panel" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#4a5a4c"/>
        <stop offset=".6" stop-color="#2a382d"/>
        <stop offset="1" stop-color="#1b241e"/>
      </linearGradient>
    </defs>`;

    const drawings = {
      // Complete Maxi-Scooter kit (Burgman style)
      burgmanKit: `
        <g transform="translate(15, 20)">
          <!-- Large Front Apron -->
          <path d="M75 10 L145 10 L170 65 L190 120 L150 145 L110 160 L70 145 L30 120 L50 65 Z" fill="${fill}" stroke="#657662" stroke-width="2.5"/>
          <path d="M85 18 L135 18 L155 60 L135 110 L110 135 L85 110 L65 60 Z" fill="${darkShade}" opacity=".85"/>
          <!-- Sporty Tinted Visor -->
          <path d="M88 5 L132 5 L145 38 L110 50 L75 38 Z" fill="#1b2520" stroke="${accent}" stroke-width="2"/>
          <path d="M100 10 L120 10 L125 32 L110 40 L95 32 Z" fill="${accent}" opacity=".4"/>
          <!-- Headlight Cluster -->
          <polygon points="80,75 140,75 155,105 110,122 65,105" fill="#f2f5ed" stroke="#687864" stroke-width="2"/>
          <line x1="110" y1="75" x2="110" y2="122" stroke="#abb7a4" stroke-width="2"/>
          <!-- Side Body Panels flanking -->
          <path d="M15 115 L45 80 L35 145 L10 185 L5 160 Z" fill="${fill}" stroke="#657662" stroke-width="2"/>
          <path d="M205 115 L175 80 L185 145 L210 185 L215 160 Z" fill="${fill}" stroke="#657662" stroke-width="2"/>
          <!-- Front Mudguard lower -->
          <path d="M80 168 Q110 155 140 168 L148 195 Q110 188 72 195 Z" fill="${fill}" stroke="#657662" stroke-width="2"/>
          <rect x="85" y="178" width="50" height="4" rx="2" fill="${accent}"/>
          <!-- Badge -->
          <circle cx="110" cy="58" r="6" fill="${accent}"/>
        </g>`,

      // Classic & Sleek Scooter kit (Access / Activa style)
      accessKit: `
        <g transform="translate(20, 20)">
          <!-- Classic Front Apron -->
          <path d="M60 25 C80 15 130 15 150 25 C175 70 180 130 155 155 C130 168 80 168 55 155 C30 130 35 70 60 25 Z" fill="${fill}" stroke="#60715d" stroke-width="2.5"/>
          <!-- Headlight Pod -->
          <ellipse cx="105" cy="35" rx="32" ry="24" fill="#f7faf0" stroke="#60715d" stroke-width="2.5"/>
          <ellipse cx="105" cy="35" rx="22" ry="16" fill="${darkShade}" opacity=".2"/>
          <circle cx="105" cy="35" r="8" fill="${accent}"/>
          <!-- Chrome / Accent Grille -->
          <path d="M90 75 Q105 70 120 75 L125 105 Q105 112 85 105 Z" fill="${darkShade}" stroke="${accent}" stroke-width="2"/>
          <line x1="93" y1="85" x2="117" y2="85" stroke="${accent}" stroke-width="2"/>
          <line x1="91" y1="95" x2="119" y2="95" stroke="${accent}" stroke-width="2"/>
          <!-- Pair of Curved Side Panels -->
          <path d="M25 90 C15 130 15 165 30 185 C42 165 42 130 35 90 Z" fill="${fill}" stroke="#60715d" stroke-width="2"/>
          <path d="M185 90 C195 130 195 165 180 185 C168 165 168 130 175 90 Z" fill="${fill}" stroke="#60715d" stroke-width="2"/>
          <!-- Front Mudguard -->
          <path d="M75 162 C90 152 120 152 135 162 L142 188 C120 180 90 180 68 188 Z" fill="${fill}" stroke="#60715d" stroke-width="2"/>
          <path d="M75 170 Q105 160 135 170" stroke="${accent}" stroke-width="3" fill="none"/>
        </g>`,

      // Sharp Sporty Scooter kit (TVS Ntorq style)
      ntorqKit: `
        <g transform="translate(15, 15)">
          <!-- Aggressive Stealth Apron -->
          <polygon points="110,15 165,30 185,85 160,140 110,165 60,140 35,85 55,30" fill="${fill}" stroke="#637560" stroke-width="2.5"/>
          <!-- Dark Contrast Centre -->
          <polygon points="110,25 145,38 150,90 110,135 70,90 75,38" fill="${darkShade}"/>
          <!-- LED DRL 'T' Shape / Winglet -->
          <path d="M80 50 L140 50 L145 62 L118 66 L118 105 L102 105 L102 66 L75 62 Z" fill="${accent}"/>
          <!-- Dual Angular Headlamp Pockets -->
          <polygon points="80,105 105,108 105,128 75,120" fill="#f0f4e8" stroke="#5d6f5a" stroke-width="1.5"/>
          <polygon points="140,105 115,108 115,128 145,120" fill="#f0f4e8" stroke="#5d6f5a" stroke-width="1.5"/>
          <!-- Sharp Split Rear Cowls -->
          <path d="M18 110 L48 95 L40 155 L10 185 Z" fill="${fill}" stroke="#637560" stroke-width="2"/>
          <polygon points="16,115 42,102 36,145 12,170" fill="${accent}" opacity=".3"/>
          <path d="M202 110 L172 95 L180 155 L210 185 Z" fill="${fill}" stroke="#637560" stroke-width="2"/>
          <!-- Aerodynamic Fender -->
          <polygon points="80,168 140,168 150,195 110,188 70,195" fill="${fill}" stroke="#637560" stroke-width="2"/>
          <line x1="85" y1="180" x2="135" y2="180" stroke="${accent}" stroke-width="2"/>
        </g>`,

      // Activa Multi-Gen Full Set
      activaKit: `
        <g transform="translate(20, 20)">
          <!-- Sturdy Metal-Fibre Shell -->
          <path d="M65 30 Q105 18 145 30 L168 95 Q145 155 105 162 Q65 155 42 95 Z" fill="${fill}" stroke="#5e705b" stroke-width="2.5"/>
          <!-- Handlebar Upper Cowl -->
          <path d="M72 15 Q105 8 138 15 L145 38 Q105 45 65 38 Z" fill="${darkShade}" stroke="${accent}" stroke-width="2"/>
          <ellipse cx="105" cy="27" rx="20" ry="10" fill="#f5f7ee" stroke="#5e705b" stroke-width="1.5"/>
          <!-- Centre Fin / Emblem Line -->
          <path d="M102 52 L108 52 L112 110 L105 120 L98 110 Z" fill="${accent}"/>
          <!-- Chrome Turn Signal Accents -->
          <polygon points="62,75 88,85 85,105 58,92" fill="#eff3e6" stroke="#5e705b" stroke-width="1.5"/>
          <polygon points="148,75 122,85 125,105 152,92" fill="#eff3e6" stroke="#5e705b" stroke-width="1.5"/>
          <!-- Full Side Panels left & right -->
          <path d="M28 85 Q18 135 32 185 Q45 150 40 85 Z" fill="${fill}" stroke="#5e705b" stroke-width="2"/>
          <path d="M182 85 Q192 135 178 185 Q165 150 170 85 Z" fill="${fill}" stroke="#5e705b" stroke-width="2"/>
          <!-- Mudguard -->
          <path d="M75 164 Q105 152 135 164 L142 192 Q105 182 68 192 Z" fill="${fill}" stroke="#5e705b" stroke-width="2"/>
        </g>`,

      // Motorcycle Body Kit (Shine / Unicorn / Commuter)
      bikeKit: `
        <g transform="translate(15, 20)">
          <!-- Fuel Tank Shroud -->
          <path d="M35 85 C45 35 110 30 155 45 C190 60 195 105 175 115 C135 110 70 120 35 85 Z" fill="${fill}" stroke="#657662" stroke-width="2.5"/>
          <path d="M60 55 C95 48 135 55 160 75 C145 92 105 92 65 78 Z" fill="${accent}" opacity=".4"/>
          <!-- Front Visor / Bikini Fairing Cowl -->
          <path d="M145 15 L190 35 L180 75 L145 60 Z" fill="${darkShade}" stroke="${accent}" stroke-width="2"/>
          <polygon points="160,35 185,45 175,68 155,55" fill="#f7faf0" stroke="#657662" stroke-width="1.5"/>
          <!-- Side Battery Utility Cover -->
          <polygon points="75,115 125,105 138,150 82,158" fill="${darkShade}" stroke="#657662" stroke-width="2"/>
          <rect x="88" y="122" width="30" height="4" rx="2" fill="${accent}"/>
          <!-- Rear Tail Cowl -->
          <path d="M15 95 L55 95 L50 135 L5 118 Z" fill="${fill}" stroke="#657662" stroke-width="2"/>
          <polygon points="8,106 35,106 32,125 6,115" fill="${accent}" opacity=".3"/>
          <!-- Front Mudguard -->
          <path d="M140 145 C165 125 195 138 210 162 L198 172 C185 155 160 145 135 155 Z" fill="${fill}" stroke="#657662" stroke-width="2"/>
        </g>`,

      // Individual Front Apron Panel
      apron: `
        <g transform="translate(25, 20)">
          <path d="M40 20 L160 20 L185 85 L160 160 L100 185 L40 160 L15 85 Z" fill="${fill}" stroke="#657662" stroke-width="3"/>
          <path d="M55 35 L145 35 L165 85 L145 145 L100 165 L55 145 L35 85 Z" fill="${darkShade}" opacity=".8"/>
          <!-- Centre Ventilation / Radiator Grille -->
          <path d="M85 80 L115 80 L122 135 L100 150 L78 135 Z" fill="#111813" stroke="${accent}" stroke-width="2"/>
          <line x1="88" y1="95" x2="112" y2="95" stroke="${accent}" stroke-width="2.5"/>
          <line x1="86" y1="110" x2="114" y2="110" stroke="${accent}" stroke-width="2.5"/>
          <line x1="84" y1="125" x2="116" y2="125" stroke="${accent}" stroke-width="2.5"/>
          <!-- Emblem Mount -->
          <circle cx="100" cy="55" r="9" fill="${accent}"/>
          <path d="M45 50 L75 60 L68 75 L40 62 Z" fill="${accent}" opacity=".5"/>
          <path d="M155 50 L125 60 L132 75 L160 62 Z" fill="${accent}" opacity=".5"/>
        </g>`,

      // Individual Side Panels Pair
      sidePanel: `
        <g transform="translate(20, 25)">
          <!-- Top Left Panel -->
          <path d="M20 30 C75 15 150 25 190 55 C160 85 95 85 30 75 C15 65 10 45 20 30 Z" fill="${fill}" stroke="#657662" stroke-width="2.5"/>
          <path d="M45 42 C85 35 140 42 170 60 C145 75 90 75 42 66 Z" fill="${accent}" opacity=".4"/>
          <!-- Chrome / Raised Emblem Plate Bar -->
          <rect x="70" y="50" width="70" height="6" rx="3" fill="#f2f5eb" stroke="#657662" stroke-width="1"/>
          <!-- Lower Right Panel -->
          <path d="M20 120 C75 105 150 115 190 145 C160 175 95 175 30 165 C15 155 10 135 20 120 Z" fill="${fill}" stroke="#657662" stroke-width="2.5"/>
          <path d="M45 132 C85 125 140 132 170 150 C145 165 90 165 42 156 Z" fill="${accent}" opacity=".4"/>
          <rect x="70" y="140" width="70" height="6" rx="3" fill="#f2f5eb" stroke="#657662" stroke-width="1"/>
        </g>`,

      // Headlight Cowl / Fairing Mask
      headlightCowl: `
        <g transform="translate(25, 25)">
          <!-- Handlebar Cowl Outline -->
          <path d="M25 45 C40 20 160 20 175 45 L185 110 C165 145 35 145 15 110 Z" fill="${fill}" stroke="#657662" stroke-width="3"/>
          <!-- Smoked Visor Top -->
          <path d="M50 22 C75 12 125 12 150 22 L158 52 C125 58 75 58 42 52 Z" fill="#141c16" stroke="${accent}" stroke-width="2"/>
          <polygon points="80,26 120,26 128,45 72,45" fill="${accent}" opacity=".35"/>
          <!-- Headlight Cavity / Lens -->
          <ellipse cx="100" cy="95" rx="42" ry="28" fill="#f7faf0" stroke="#657662" stroke-width="2.5"/>
          <line x1="60" y1="95" x2="140" y2="95" stroke="#abb7a4" stroke-width="2"/>
          <ellipse cx="100" cy="95" rx="20" ry="14" fill="${darkShade}" opacity=".25"/>
          <circle cx="100" cy="95" r="7" fill="${accent}"/>
          <!-- Turn Indicators -->
          <polygon points="32,75 50,82 45,102 28,95" fill="#e6a827" stroke="#657662" stroke-width="1.5"/>
          <polygon points="168,75 150,82 155,102 172,95" fill="#e6a827" stroke="#657662" stroke-width="1.5"/>
        </g>`,

      // Front Mudguard / Fender
      mudguard: `
        <g transform="translate(25, 25)">
          <path d="M20 135 C25 65 85 30 175 45 L185 85 C120 70 65 95 45 145 Z" fill="${fill}" stroke="#657662" stroke-width="3"/>
          <path d="M45 120 C55 75 95 50 165 60 L172 75 C115 68 70 85 55 125 Z" fill="${accent}" opacity=".4"/>
          <!-- Mounting Bracket Bosses -->
          <circle cx="95" cy="78" r="5" fill="#f5f7ee" stroke="#556452" stroke-width="2"/>
          <circle cx="125" cy="85" r="5" fill="#f5f7ee" stroke="#556452" stroke-width="2"/>
          <!-- Reflector -->
          <rect x="35" y="125" width="8" height="18" rx="2" fill="#d9534f" stroke="#333" stroke-width="1"/>
        </g>`
    };

    return `<svg class="${className}" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${common}${drawings[type] || drawings.burgmanKit}</svg>`;
  }

  const getProduct = id => products.find(p => p.id === id);
  let cart = {}, saved = new Set();
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (value && typeof value === 'object') {
      if (value.cart && typeof value.cart === 'object') {
        for (const [id, qty] of Object.entries(value.cart)) {
          if (getProduct(id) && Number.isInteger(qty) && qty > 0 && qty <= 99) cart[id] = qty;
        }
      }
      if (Array.isArray(value.saved)) {
        saved = new Set(value.saved.filter(id => typeof id === 'string' && getProduct(id)));
      }
    }
  } catch (_) { /* Private browsing / invalid storage: run in memory */ }

  let filter = 'All', query = '', onlySaved = false;
  let toastTimer;

  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('visible'), 2800);
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, saved: [...saved] }));
    } catch (_) {}
    syncCounts();
  }

  function syncCounts() {
    const count = Object.values(cart).reduce((sum, n) => sum + n, 0);
    const cartCountEl = $('#cartCount');
    if (cartCountEl) cartCountEl.textContent = count;
    const cartToggleEl = $('#cartToggle');
    if (cartToggleEl) cartToggleEl.setAttribute('aria-label', `Open enquiry bag, ${count} items`);
    const wishCountEl = $('#wishCount');
    if (wishCountEl) {
      wishCountEl.textContent = saved.size;
      wishCountEl.hidden = saved.size === 0;
    }
    const wishToggleEl = $('#wishlistToggle');
    if (wishToggleEl) wishToggleEl.setAttribute('aria-pressed', String(onlySaved));
  }

  function sendWhatsApp(message) {
    const link = document.createElement('a');
    link.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const categories = [
    {
      title: 'Scooter Body Kits',
      sub: 'Burgman, Access, Ntorq, Activa full sets',
      art: 'burgmanKit',
      filter: 'Scooter Kits',
      query: ''
    },
    {
      title: 'Motorcycle Body Kits',
      sub: 'Shine, Unicorn, commuter & sporty bikes',
      art: 'bikeKit',
      filter: 'Motorcycle Kits',
      query: ''
    },
    {
      title: 'Individual Body Panels',
      sub: 'Front aprons, side body panels, masks & cowls',
      art: 'apron',
      filter: 'Individual Panels',
      query: ''
    },
    {
      title: 'Access & Burgman Hub',
      sub: 'Old-model & new-model panels in stock',
      art: 'accessKit',
      filter: 'All',
      query: 'Burgman'
    }
  ];

  const catGrid = $('#categoryGrid');
  if (catGrid) {
    catGrid.innerHTML = categories.map((c, i) => `
      <button class="category-card" data-category="${i}" aria-label="Browse ${c.title}">
        <h3>${c.title}</h3>
        <p>${c.sub}</p>
        ${icon('arrow')}
        ${art(c.art, 'category-art')}
      </button>
    `).join('');
  }

  function renderProducts() {
    let list = products.filter(p =>
      (filter === 'All' || p.group === filter) &&
      (!onlySaved || saved.has(p.id)) &&
      `${p.name} ${p.group} ${p.category} ${p.sub}`.toLowerCase().includes(query)
    );

    const sortEl = $('#sortProducts');
    const sort = sortEl ? sortEl.value : 'featured';
    if (sort !== 'featured') {
      list.sort((a, b) => sort === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    }

    const resCountEl = $('#resultCount');
    if (resCountEl) {
      resCountEl.textContent = `${list.length} ${onlySaved ? 'saved ' : ''}body kit item${list.length === 1 ? '' : 's'} available to enquire`;
    }
    const clearBtn = $('#clearFilters');
    if (clearBtn) {
      clearBtn.hidden = filter === 'All' && !query && !onlySaved;
    }

    $$('.filter').forEach(b => {
      const active = b.dataset.filter === filter;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    syncCounts();

    const gridEl = $('#productGrid');
    if (!gridEl) return;
    gridEl.innerHTML = list.length ? list.map(p => `
      <article class="product-card">
        <div class="product-visual">
          <span class="product-tag">${p.tag}</span>
          <button class="save-product ${saved.has(p.id) ? 'saved' : ''}" data-save="${p.id}" aria-label="Save ${p.name}" aria-pressed="${saved.has(p.id)}">${icon('heart')}</button>
          <button class="product-art-button" data-quick="${p.id}" aria-label="View ${p.name}">
            ${art(p.art)}
            <span class="quick-label">View details & fitment ↗</span>
          </button>
        </div>
        <p class="product-meta">${p.category}</p>
        <h3>${p.name}</h3>
        <p class="product-subtitle">${p.sub}</p>
        <div class="product-bottom">
          <span class="quote-price">Enquire availability <span>↗</span></span>
          <button class="add-product" data-add="${p.id}" aria-label="Add ${p.name} to enquiry bag">${icon('bag')}</button>
        </div>
      </article>
    `).join('') : `
      <div class="empty-results">
        <h3>${onlySaved ? 'Your saved body kits will appear here.' : 'No matching body kits found.'}</h3>
        <p>Looking for a specific scooter or bike model? Send us your vehicle details on WhatsApp.</p>
        <button class="button dark" data-reset>Explore all body kits ${icon('arrow')}</button>
      </div>
    `;
  }

  function clearFilters() {
    filter = 'All';
    query = '';
    onlySaved = false;
    const searchInput = $('#productSearch');
    if (searchInput) searchInput.value = '';
    renderProducts();
  }

  function addToCart(id) {
    if (!getProduct(id)) return;
    if ((cart[id] || 0) >= 99) return toast('Maximum 99 per item. Ask us about bulk workshop supply.');
    cart[id] = (cart[id] || 0) + 1;
    persist();
    toast('Added to your enquiry bag.');
    if ($('#cartDialog') && $('#cartDialog').open) renderCart();
  }

  function openDialog(dialog) {
    if (!dialog || dialog.open) return;
    const current = $('dialog[open]');
    if (current) current.close();
    dialog.showModal();
    document.body.classList.add('modal-open');
  }

  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => {
      if (!$('dialog[open]')) document.body.classList.remove('modal-open');
    });
    dialog.addEventListener('click', e => {
      if (e.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        dialog.close();
      }
    });
  });

  function renderCart() {
    const ids = Object.keys(cart);
    const orderForm = $('#orderForm');
    if (orderForm) orderForm.hidden = !ids.length;
    const cartItems = $('#cartItems');
    if (!cartItems) return;

    cartItems.innerHTML = ids.length ? ids.map(id => {
      const p = getProduct(id);
      return `
        <article class="cart-row">
          <div class="cart-art">${art(p.art, '')}</div>
          <div>
            <h3>${p.name}</h3>
            <p>Fitment & colour confirmed on WhatsApp</p>
            <div class="cart-quantity">
              <button type="button" data-qty="${id}" data-step="-1" aria-label="Reduce quantity of ${p.name}">−</button>
              <span aria-label="Quantity">${cart[id]}</span>
              <button type="button" data-qty="${id}" data-step="1" aria-label="Increase quantity of ${p.name}" ${cart[id] >= 99 ? 'disabled' : ''}>+</button>
            </div>
          </div>
          <button class="remove-item" data-remove="${id}" aria-label="Remove ${p.name}">${icon('close')}</button>
        </article>
      `;
    }).join('') : `
      <div class="empty-bag">
        ${icon('bag')}
        <h3>Your body kit enquiry bag is empty.</h3>
        <p>Select your vehicle model and required panels to build a quote.</p>
        <button class="button dark" data-close-shop>Browse Body Kits ${icon('arrow')}</button>
      </div>
    `;
  }

  function quickView(id) {
    const p = getProduct(id);
    if (!p) return;
    const qc = $('#quickContent');
    if (qc) {
      qc.innerHTML = `
        <div class="quick-layout">
          <div class="quick-art">${art(p.art, '')}</div>
          <div class="quick-details">
            <p class="eyebrow">${p.category}</p>
            <h2 id="quickTitle">${p.name}</h2>
            <p>${p.description}</p>
            <ul>${p.details.map(d => `<li>${d}</li>`).join('')}</ul>
            <div class="quote-note" style="margin: 15px 0;">
              ${icon('shield')}
              <p>Panels are confirmed for your exact year, variant, and factory colour shade. Please send a photo of your vehicle on WhatsApp for guaranteed fitment.</p>
            </div>
            <button class="button lime full" data-add="${p.id}">${icon('bag')} Add to enquiry bag ${icon('arrow')}</button>
            <button class="plain-link" data-direct="${p.id}">Ask about this on WhatsApp ↗</button>
          </div>
        </div>
      `;
    }
    openDialog($('#productDialog'));
  }

  document.addEventListener('click', e => {
    const button = e.target.closest('button');
    if (!button) return;

    if (button.matches('.close-dialog')) {
      const dlg = button.closest('dialog');
      if (dlg) dlg.close();
      return;
    }
    if (button.hasAttribute('data-add')) addToCart(button.dataset.add);
    if (button.hasAttribute('data-quick')) quickView(button.dataset.quick);
    if (button.hasAttribute('data-save')) {
      const id = button.dataset.save;
      saved.has(id) ? saved.delete(id) : saved.add(id);
      persist();
      if (onlySaved) {
        renderProducts();
        const wt = $('#wishlistToggle');
        if (wt) wt.focus();
      } else {
        button.classList.toggle('saved', saved.has(id));
        button.setAttribute('aria-pressed', String(saved.has(id)));
      }
      toast(saved.has(id) ? 'Saved to your list.' : 'Removed from saved items.');
    }
    if (button.hasAttribute('data-filter')) {
      filter = button.dataset.filter;
      renderProducts();
    }
    if (button.hasAttribute('data-category')) {
      const c = categories[Number(button.dataset.category)];
      if (c) {
        filter = c.filter;
        query = c.query.toLowerCase();
        onlySaved = false;
        const ps = $('#productSearch');
        if (ps) ps.value = c.query;
        renderProducts();
        const shopEl = $('#shop');
        if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (button.hasAttribute('data-reset')) clearFilters();
    if (button.hasAttribute('data-remove')) {
      delete cart[button.dataset.remove];
      persist();
      renderCart();
      const closeBtn = $('#cartDialog .close-dialog');
      if (closeBtn) closeBtn.focus();
    }
    if (button.hasAttribute('data-qty')) {
      const id = button.dataset.qty;
      if (!getProduct(id) || !cart[id]) return;
      cart[id] = Math.min(99, cart[id] + Number(button.dataset.step));
      if (cart[id] <= 0) delete cart[id];
      persist();
      renderCart();
      const replacement = $(`[data-qty="${id}"][data-step="${button.dataset.step}"]`);
      if (replacement) replacement.focus();
    }
    if (button.hasAttribute('data-close-shop')) {
      const cd = $('#cartDialog');
      if (cd) cd.close();
      const shopEl = $('#shop');
      if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
    }
    if (button.hasAttribute('data-request-quote') || button.hasAttribute('data-book')) {
      openDialog($('#bookingDialog'));
    }
    if (button.hasAttribute('data-direct')) {
      const p = getProduct(button.dataset.direct);
      if (p) {
        sendWhatsApp(`Hi Anaya Bike Point! I am interested in: ${p.name}.\n\nPlease confirm availability, colour options and pricing for my vehicle:\nVehicle Make & Model: \nYear / Generation (Old or New Model): \nColour required: \nPanels needed (Full Kit or Specific Panels): \n\nI will also send a photo of my vehicle for fitment verification.`);
      }
    }
  });

  const searchInput = $('#productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      query = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  const sortSelect = $('#sortProducts');
  if (sortSelect) sortSelect.addEventListener('change', renderProducts);

  const clearBtn = $('#clearFilters');
  if (clearBtn) clearBtn.addEventListener('click', clearFilters);

  const searchToggle = $('#searchToggle');
  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      const shopEl = $('#shop');
      if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
      const ps = $('#productSearch');
      if (ps) ps.focus({ preventScroll: true });
    });
  }

  const wishToggle = $('#wishlistToggle');
  if (wishToggle) {
    wishToggle.addEventListener('click', () => {
      onlySaved = !onlySaved;
      query = '';
      filter = 'All';
      const ps = $('#productSearch');
      if (ps) ps.value = '';
      renderProducts();
      const shopEl = $('#shop');
      if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const cartToggle = $('#cartToggle');
  if (cartToggle) {
    cartToggle.addEventListener('click', () => {
      renderCart();
      openDialog($('#cartDialog'));
    });
  }

  // Enquiry Bag WhatsApp checkout with vehicle model, variant, colour, panels needed
  const orderForm = $('#orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', e => {
      e.preventDefault();
      const ids = Object.keys(cart);
      if (!ids.length) return;
      const list = ids.map((id, i) => `${i + 1}. ${getProduct(id).name} — Qty: ${cart[id]}`).join('\n');
      const bike = ($('#orderBike') ? $('#orderBike').value.trim() : '');
      const colour = ($('#orderColour') ? $('#orderColour').value.trim() : '');
      const panels = ($('#orderPanels') ? $('#orderPanels').value.trim() : '');
      const notes = ($('#orderNotes') ? $('#orderNotes').value.trim() : '');

      const msg = `Hi Anaya Bike Point! I would like a quote for the following body kits/panels:\n\n` +
        `${list}\n\n` +
        `--- Vehicle Details ---\n` +
        `Vehicle Make & Model: ${bike || 'Not specified'}\n` +
        `Colour required: ${colour || 'Please share available colours'}\n` +
        `Requirement: ${panels || 'Full kit / panels as listed above'}\n` +
        (notes ? `Additional Notes: ${notes}\n` : '') +
        `\nPlease confirm current availability, pricing, panel contents and collection/delivery.\n` +
        `I am ready to send photos of my vehicle to confirm exact fitment.\n` +
        `Enquiry via https://anayabikapoint.in/`;

      sendWhatsApp(msg);
    });
  }

  // Kit Finder form on the main page
  const fitForm = $('#fitForm');
  if (fitForm) {
    fitForm.addEventListener('submit', e => {
      e.preventDefault();
      const brand = $('#bikeBrand') ? $('#bikeBrand').value : '';
      const model = $('#bikeModel') ? $('#bikeModel').value.trim() : '';
      const part = $('#bikePart') ? $('#bikePart').value : 'Complete Body Kit';
      const colour = $('#bikeColour') ? $('#bikeColour').value.trim() : '';

      const msg = `Hi Anaya Bike Point! Please check body kit / panel availability for my vehicle:\n\n` +
        `Brand: ${brand}\n` +
        `Model & Generation (Old/New Model): ${model}\n` +
        `Panels Needed: ${part}\n` +
        (colour ? `Colour: ${colour}\n` : '') +
        `\nPlease let me know if this kit/panel is in stock and the price estimate. I can share photos on WhatsApp.`;

      sendWhatsApp(msg);
    });
  }

  // Quote Request Dialog Form (formerly service booking)
  const bookingForm = $('#bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const type = $('#quoteType') ? $('#quoteType').value : 'Complete Body Kit';
      const bike = $('#serviceBike') ? $('#serviceBike').value.trim() : '';
      const colour = $('#quoteColour') ? $('#quoteColour').value.trim() : '';
      const notes = $('#serviceNotes') ? $('#serviceNotes').value.trim() : '';

      const msg = `Hi Anaya Bike Point! I'd like to request a body kit / panel quote:\n\n` +
        `Required Parts: ${type}\n` +
        `Vehicle Make, Model & Generation: ${bike}\n` +
        `Vehicle Colour: ${colour || 'Please advise available shades'}\n` +
        (notes ? `Specific Requirements: ${notes}\n` : '') +
        `\nPlease confirm stock, pricing and whether you have old-model or new-model panels for my vehicle.`;

      sendWhatsApp(msg);
    });
  }

  // Mobile Menu
  function menu(open) {
    const nav = $('#navigation');
    const mt = $('#menuToggle');
    if (nav) nav.classList.toggle('open', open);
    if (mt) {
      mt.setAttribute('aria-expanded', String(open));
      mt.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }

  const menuToggle = $('#menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
  }
  $$('#navigation a').forEach(a => a.addEventListener('click', () => menu(false)));
  document.addEventListener('click', e => {
    const header = $('#header');
    if (header && !header.contains(e.target)) menu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const nav = $('#navigation');
      if (nav && nav.classList.contains('open')) {
        menu(false);
        const mt = $('#menuToggle');
        if (mt) mt.focus();
      }
    }
  });
  window.matchMedia('(min-width:651px)').addEventListener('change', e => {
    if (e.matches) menu(false);
  });

  // Store Live Opening Hours (Mon-Sun 10 AM to 9 PM, Friday Closed)
  function updateStatus() {
    try {
      const p = Object.fromEntries(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).formatToParts(new Date()).map(part => [part.type, part.value])
      );
      const minutes = Number(p.hour) * 60 + Number(p.minute);
      const open = p.weekday !== 'Fri' && minutes >= 600 && minutes < 1260;
      let text = 'Open now · Until 9:00 PM';
      if (!open) {
        text = p.weekday === 'Fri'
          ? 'Friday weekly off · Opens Saturday at 10 AM'
          : minutes < 600
          ? 'Closed now · Opens today at 10 AM'
          : p.weekday === 'Thu'
          ? 'Closed now · Opens Saturday at 10 AM'
          : 'Closed now · Opens tomorrow at 10 AM';
      }
      const statusEl = $('#storeStatus');
      if (statusEl) statusEl.textContent = text;
      const statusContainer = $('.store-status');
      if (statusContainer) statusContainer.classList.toggle('closed', !open);
    } catch (_) {}
  }
  updateStatus();
  setInterval(() => { if (!document.hidden) updateStatus(); }, 60000);

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll reveals
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reveal-enabled');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    $$('.reveal').forEach(el => observer.observe(el));
  }

  renderProducts();
})();
