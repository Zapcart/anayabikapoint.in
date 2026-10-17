# Anaya Bika Point — Ultra-Premium Single-Page Website

A dependency-free (no build step) landing page for **Anaya Bika Point**, the best bike shop in
Kurla West, Mumbai. Deep charcoal base, warm gold (`#D4AF37` / `#F59E0B`) and emerald
(`#10B981`) accents, glassmorphism panels, a parallax hero, floating CTAs and an auto-playing
cross-fade gallery.

- **Live domain:** https://anayabikapoint.in
- **Repository:** https://github.com/Zapcart/anayabikapoint.in

## Folder structure

```
arsal/
├── index.html              # All eight sections + floating CTAs + JSON-LD
├── site.webmanifest        # PWA manifest (name, icons, theme colour, shortcuts)
├── css/
│   └── styles.css          # Theme tokens, layout, glass UI, animations, responsive rules
├── js/
│   └── main.js             # Live hours status, carousel, menu, reveals, parallax, fallbacks
├── assets/
│   ├── README.md           # Image drop-in guide
│   ├── icon.svg            # App / favicon icon (gold A on charcoal)
│   ├── icon-maskable.svg   # Maskable PWA icon variant
│   └── (add photos here)
└── README.md
```

## Run it

Open `index.html` directly in a browser, or serve the folder locally:

```bash
cd arsal
python -m http.server 5173
# then visit http://localhost:5173
```

A local server is recommended so the Google Maps embed, the web manifest and SEO previews
behave exactly as they will in production.

## Page sections

1. **SEO & Meta** — verbatim keyword targets, OpenGraph/Twitter cards, geo meta, canonical
   `https://anayabikapoint.in/`, and `LocalBusiness + AutoPartsStore + MotorcycleRepair`
   JSON-LD with address, phone, geo coordinates, opening hours and `sameAs` profiles.
2. **Header** — glowing gold wordmark, live status badge ("Open Today (10 AM - 9 PM)" /
   "Closed on Fridays"), Instagram + Justdial quick icons, call button.
3. **Hero** — headline, dual feature cards (glassmorphic shop-front frame with `shopfront.png`
   plus a 5-image cross-fade carousel over `image1.png`–`image5.png`), pulsating WhatsApp CTA
   and gold Call CTA, parallax glow layers.
4. **Social & Trust Platforms** — Instagram gradient badge and Justdial orange verified badge.
5. **Trust grid** — four gold-icon cards (quality parts, hygienic expert work, top-rated local
   hub, instant WhatsApp/phone assistance).
6. **Store info & hours** — Mon–Sun 10:00 AM – 9:00 PM, bold **FRIDAY CLOSED** badge,
   +91 9324396437.
7. **Location** — full CST Road address, embedded map, "Get Directions" deep link.
8. **Floating widget** — fixed bottom-right WhatsApp, Call and Instagram buttons
   (plus a mobile bottom action bar on small screens).

## Adding the real photos (zero code changes)

Drop these files into `arsal/assets/` using the exact names:

| File | Where it appears | Recommended size |
| --- | --- | --- |
| `shopfront.png` | Hero showcase frame + OG/Twitter preview | 1200 × 900 (4:3) |
| `image1.png` | Gallery slide 1 — "Spare Parts" | 1200 × 750 (16:10) |
| `image2.png` | Gallery slide 2 — "Repair & Service" | 1200 × 750 |
| `image3.png` | Gallery slide 3 — "Showroom" | 1200 × 750 |
| `image4.png` | Gallery slide 4 — "In Service" | 1200 × 750 |
| `image5.png` | Gallery slide 5 — "Accessories" | 1200 × 750 |

Until a file exists (or if it fails to load), a premium gradient placeholder with a
"Photo coming soon" label is shown automatically by `js/main.js` + `.media-fallback` in the
stylesheet. No markup or code edits are needed when the photos arrive.

Keep each file under ~400 KB (compress to WebP or optimized PNG/JPG) for fast first paint.

## Store details wired into the page

- **Phone / Call:** `tel:9324396437`
- **WhatsApp:** `https://wa.me/919324396437` (pre-filled enquiry text)
- **Instagram:** `https://www.instagram.com/anaya.bike_point_kurla`
- **Justdial:** verified listing for Anaya Bika Point, Near Kismat Nagar Masjid, Rupa Nagar,
  Kurla West
- **Hours:** Monday – Sunday, 10:00 AM – 9:00 PM (IST), **Friday closed**
- **Address:** Shop No 05, Masjid Chawl, Near Kismat Nagar Masjid, CST Road, Rupa Nagar –
  Kurla West, Mumbai 400070, Maharashtra
- **Directions:** Google Maps deep link + embedded map

## Live open/closed badge

`js/main.js` resolves the current time in `Asia/Calcutta` and updates every
`[data-status-badge]` instance (`#statusText`, `#mobileStatusText`, `#heroStatusText`,
`#hoursStatusText`, `#hoursDetail`) every minute. Fridays always report as closed.
To change trading hours, edit `OPEN_MINUTES`, `CLOSE_MINUTES` and `CLOSED_WEEKDAY` at the
top of `js/main.js`.

## Hero parallax

Any element carrying `data-parallax="<factor>"` gets a CSS variable `--parallax-y` written by
`initParallax()` on scroll (inside `requestAnimationFrame`, clamped to ±160 px). The styling
lives in `css/styles.css`:

```css
.hero-parallax {
  transform: translate3d(0, var(--parallax-y, 0px), 0);
}
```

Nudge the factors (e.g. `0.12`, `-0.08`) in `index.html` to taste, or add the class to any
other decorative layer. Parallax is disabled below 780 px and for
`prefers-reduced-motion: reduce`.

## Accessibility & performance notes

- Skip link, visible focus rings, `aria-live` status badges, labelled carousel controls.
- Reveal and parallax animations respect `prefers-reduced-motion`; the carousel stops
  autoplaying for reduced-motion users and pauses on hover, focus, and when scrolled out of view.
- Touch devices keep the carousel arrows permanently visible (`@media (hover: none)`).
- Lazy-loaded map iframe, `fetchpriority="high"` on the hero photo, defensive image fallbacks.
- Tailwind Play CDN is only used for optional utility classes; all critical styling ships in
  `css/styles.css`, so the page still looks correct if the CDN is blocked.

## Customising the theme

All colours, radii, shadows and easing live as CSS custom properties at the top of
`css/styles.css`:

```css
:root {
  --ink: #0a0a0b;
  --gold: #d4af37;
  --gold-warm: #f59e0b;
  --emerald: #10b981;
}
```

## Deploying to anayabikapoint.in

The site is fully static, so any host works (GitHub Pages, Netlify, Vercel, cPanel).

```bash
git clone https://github.com/Zapcart/anayabikapoint.in
# copy the contents of arsal/ to the web root
```

- Point the `anayabikapoint.in` DNS `A`/`CNAME` records at your host.
- Enable HTTPS — the canonical URL and JSON-LD both reference `https://`.
- Submit `https://anayabikapoint.in/` in Google Search Console; the JSON-LD and meta keywords
  are already aligned with the target phrases.
