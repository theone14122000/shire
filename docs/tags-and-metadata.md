# Tags & Metadata — The Himalayan Shire

## Recommended tag structure (every important page)

```html
<!-- Language & viewport -->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#1E3E2B">

  <!-- Primary SEO -->
  <title>Page title | The Himalayan Shire</title>
  <meta name="description" content="Concise page description (150–160 chars)">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.thehimalayanshire.com/page">

  <!-- Open Graph -->
  <meta property="og:title" content="Page title">
  <meta property="og:description" content="Page description">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.thehimalayanshire.com/page">
  <meta property="og:image" content="https://www.thehimalayanshire.com/images/hero-1.jpg">
  <meta property="og:site_name" content="The Himalayan Shire">
  <meta property="og:locale" content="en_IN">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page title">
  <meta name="twitter:description" content="Page description">
  <meta name="twitter:image" content="https://www.thehimalayanshire.com/images/hero-1.jpg">
</head>
```

## What each tag does

| Tag | Purpose |
|-----|---------|
| `<title>` | Browser tab text + Google search title. Max ~60 chars for display. |
| `<meta name="description">` | Search result snippet. Max ~160 chars. |
| `<link rel="canonical">` | Prevents duplicate-content issues; tells Google the preferred URL. |
| `<meta name="robots">` | Controls indexing/following. `index, follow` for public pages. |
| `<meta name="viewport">` | Responsive mobile rendering. |
| `og:*` | Open Graph — how the page looks when shared on Facebook/Messenger. |
| `twitter:*` | Twitter/X card — how the page looks when shared on X. |

## Where tags are configured

**Next.js App Router** uses two mechanisms:

1. **`app/layout.tsx`** — root `metadata` object (applies to all pages). Contains title, description, OG, Twitter, canonical, icons, JSON-LD.
2. **`app/metadata.ts`** — per-page metadata helper functions (`contactMetadata()`, `faqMetadata()`, `activitiesMetadata()`, `sustainabilityMetadata()`). Each page calls its helper.
3. **Per-page `export const metadata`** — inline metadata (e.g., `app/pet-friendly-stay/page.tsx`).

**Important pages and their metadata:**

| Page | File | Title focus |
|------|------|-------------|
| Home | `app/layout.tsx` | Pet-Friendly Stay in Fagu, Near Shimla |
| Pet-Friendly Stay | `app/pet-friendly-stay/page.tsx` | Pet-Friendly Stay in Fagu, Near Shimla |
| Contact | `app/contact/page.tsx` (via metadata.ts) | Contact |
| FAQ | `app/faq/page.tsx` (via metadata.ts) | FAQs |
| Activities | `app/activities/page.tsx` (via metadata.ts) | Experiences |
| Sustainability | `app/sustainability/page.tsx` (via metadata.ts) | Sustainability |
| Blog detail | `app/blog/[slug]/page.tsx` | Per-post SEO title |

## Tracking scripts

- **Google Tag Manager** — loaded via `<Script>` in `app/layout.tsx` if `NEXT_PUBLIC_GTM_ID` is set.
- **Google Analytics** — loaded via `<Script>` in `app/layout.tsx` if `NEXT_PUBLIC_GA4_ID` is set.
- **ElfSight** (Google Reviews + Instagram) — loaded via `<Script>` in `HomeEditorial` / `InstagramFeed`.
- **Book click tracker** — `BookClickTracker` component.

**No duplicate tracking scripts.** Each script loads once, guarded by env var checks.
