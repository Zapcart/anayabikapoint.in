# Image assets

Place the real photographs in this folder using these exact filenames. The site is already
wired to them — no HTML, CSS or JS changes are required.

| Filename | Used by | Aspect / recommended size | Notes |
| --- | --- | --- | --- |
| `shopfront.png` | Hero showcase frame | 4:3 — 1200 × 900 | Also used as the Open Graph / Twitter preview image |
| `image1.png` | Carousel slide 1 | 16:10 — 1200 × 750 | Caption: "Spare Parts — Genuine two wheeler spares" |
| `image2.png` | Carousel slide 2 | 16:10 — 1200 × 750 | Caption: "Repair & Service — Expert technician work" |
| `image3.png` | Carousel slide 3 | 16:10 — 1200 × 750 | Caption: "Showroom — Bikes and scooters on display" |
| `image4.png` | Carousel slide 4 | 16:10 — 1200 × 750 | Caption: "In Service — Careful, hygienic handling" |
| `image5.png` | Carousel slide 5 | 16:10 — 1200 × 750 | Caption: "Accessories — Everything your ride needs" |

## Icons (already present)

| Filename | Purpose |
| --- | --- |
| `icon.svg` | Favicon / PWA icon — gold "A" monogram on charcoal |
| `icon-maskable.svg` | Maskable variant for Android adaptive icons |

Both are referenced from `site.webmanifest`; keep the names if you replace them.

## Behaviour while images are missing

`js/main.js` listens for image load errors (and checks already-failed images on boot). When a
file is absent it adds `is-missing` to the `<img>` and `is-placeholder` to its
`[data-media]` wrapper, revealing the styled gradient/pattern placeholder underneath.

## Tips

- Keep files under ~400 KB each; export optimized PNG or JPEG (WebP works too if you also
  update the `src` extensions).
- Shoot the shop front in landscape with the `Anaya Bika Point` signage readable — it is the
  first impression and doubles as the social preview card.
- Take at least one wide shot of the workshop bay for slide 2 so the "expert technician work"
  claim is visible.
- Keep the gallery images consistently lit so the cross-fade feels calm.
- Square or portrait crops still work; `object-fit: cover` handles the framing.
