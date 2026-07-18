# The Himalayan Shire — Premium Homepage Redesign

A complete reimagining of the homepage built from scratch on
**Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and
**Framer Motion**. Beige-and-black luxury palette, Raleway typography,
generous whitespace, and image placeholders ready to drop real assets into.

> Content is sourced entirely from the supplied screenshot. No new
> information has been invented — everything has been reorganised and
> reframed into a modern information architecture.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run typecheck
```

## Project structure

```
app/
├── layout.tsx                       # Root layout, Raleway font, metadata
├── page.tsx                         # Home page composition
├── globals.css                      # Tailwind v4 theme + design tokens
└── components/
    ├── SiteNav.tsx                  # Sticky top nav (scroll-aware)
    ├── SiteFooter.tsx               # Editorial footer + newsletter
    ├── home/
    │   ├── Hero.tsx                 # Asymmetric hero, headline + image
    │   ├── BrandIntro.tsx           # Story, two-column editorial
    │   ├── FeaturedCollection.tsx   # 6 premium room cards
    │   ├── WhyChooseUs.tsx          # 4 feature cards, simple icon marks
    │   ├── WellnessEssentials.tsx   # 6 horizontal amenity cards
    │   ├── TraditionalRemedies.tsx  # Editorial split, dark accent section
    │   ├── QualitySection.tsx       # 4 monochrome quality pillars
    │   ├── TrustSection.tsx         # Stats + guest quotes
    │   ├── ProductShowcase.tsx      # 3 alternating editorial blocks
    │   └── FinalCTA.tsx             # Centered conversion closer
    └── ui/
        ├── ImagePlaceholder.tsx     # Dashed-frame image slot
        ├── SectionHeading.tsx       # Eyebrow + heading + intro
        ├── Button.tsx               # <button | link | a>, 3 variants
        ├── Container.tsx            # Max-width shell
        └── Motion.tsx               # Shared Framer Motion presets

lib/
├── content.ts                       # All copy, single source of truth
└── types.ts                         # Shared TypeScript types
```

## Design system

| Token            | Value           | Use                                |
| ---------------- | --------------- | ---------------------------------- |
| `bg-beige-100`   | `#F5EFE6`       | Default page background            |
| `bg-beige-50`    | `#FBF8F3`       | Card / placeholder inner surface   |
| `text-ink-900`   | `#111111`       | Default text color                 |
| `text-ink-500`   | `#2C2C2C`       | Supporting text                    |
| `accent-gold`    | `#B08A4A`       | Reserved, used only in ambient FX  |
| `font-sans`      | Raleway         | All type                           |
| `radius-soft`    | `1.25rem`       | Image placeholders, large cards    |
| `radius-card`    | `0.75rem`       | Default card radius                |
| `shadow-lift`    | custom          | Hover elevation on cards           |

All tokens live in `app/globals.css` under the Tailwind v4 `@theme`
block — change them there and the whole site updates.

## Replacing image placeholders

Every image slot is a `<ImagePlaceholder />` from
`app/components/ui/ImagePlaceholder.tsx`. To replace a placeholder with
a real image, swap its children for a Next `<Image />`:

```tsx
import Image from "next/image";
import heroImg from "@/public/hero.jpg";

<ImagePlaceholder kind="hero" label="Hero" aspect="3/4">
  <Image src={heroImg} alt="The shire at dawn" fill className="object-cover" />
</ImagePlaceholder>
```

Available `kind` values: `hero`, `lifestyle`, `product`, `gallery`,
`editorial`, `feature`, `ambience`. Available `aspect` values: `1/1`,
`16/9`, `4/5`, `3/4`, `5/4`, `2/3`, `21/9`, `3/2`.

## Backend integration (future)

All page copy lives in `lib/content.ts` as plain TypeScript objects.
When the MySQL backend is ready, swap that file for an API client — every
section reads from it via a typed contract, so no UI changes are
required.

## Animation system

- **Scroll fade-up** via `whileInView` (Framer Motion) — 700–900ms,
  custom ease `[0.22, 1, 0.36, 1]`.
- **Stagger** between siblings for editorial sections.
- **Hover lift** on cards via Tailwind `transition-transform` +
  `hover:-translate-y-1` and the soft shadow token.
- **No heavy gradients, no glassmorphism** — type, whitespace, and
  layout do the work.

## Accessibility

- Semantic HTML throughout (`<header>`, `<main>`, `<section>`, `<article>`,
  `<figure>`, `<nav>`, `<footer>`).
- Visible focus states inherit from the design system.
- Decorative SVGs are `aria-hidden`; meaningful SVGs use `role="img"`.
- All interactive elements are real `<a>` or `<button>` — no
  click-handler divs.

## Notes

- Uses Turbopack (Next 16 default). First build takes ~20s, subsequent
  builds are near-instant.
- Tested with `npm run typecheck` and `npm run build` — both pass clean.
- The ambient background (`.ambient` on `<body>`) is a very subtle
  radial wash in gold and ink. Remove it from `app/layout.tsx` if you
  want a perfectly flat beige canvas.
