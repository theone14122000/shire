# Structured Data — The Himalayan Shire

## Overview

The website uses JSON-LD structured data to help Google understand the property, its location, and its content. All data is factual and matches the website content.

## Schemas implemented

### 1. WebSite (homepage — `app/layout.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The Himalayan Shire",
  "url": "https://www.thehimalayanshire.com/",
  "description": "...",
  "publisher": { "@type": "Organization", ... },
  "inLanguage": "en-IN"
}
```

**Purpose:** Helps Google understand the site identity and publisher.

### 2. LodgingBusiness (homepage — `app/layout.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "The Himalayan Shire",
  "address": { "@type": "PostalAddress", ... },
  "geo": { "@type": "GeoCoordinates", ... },
  "telephone": "+918580411998",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Pet-friendly", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Wi-Fi", "value": true }
  ],
  "sameAs": [Instagram, Facebook, YouTube],
  "author": { "@type": "Organization", ... },
  "containsPlace": { "@type": "TouristAttraction", "name": "Kufri" }
}
```

**Purpose:** Helps Google understand this is an accommodation property with amenities including pet-friendly.

### 3. BlogPosting (blog detail pages — `app/blog/[slug]/page.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post title",
  "description": "Post excerpt",
  "image": "post image URL",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Organization", "name": "The Himalayan Shire" },
  "publisher": { "@type": "Organization", ... }
}
```

**Purpose:** Helps Google understand blog articles. Author is the property (Organization), not a fake person.

### 4. BreadcrumbList (pet-friendly-stay page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
    { "@type": "ListItem", "position": 2, "name": "Pet-Friendly Stay", "item": "/pet-friendly-stay" }
  ]
}
```

**Purpose:** Helps Google show breadcrumb navigation in search results.

### 5. FAQPage (pet-friendly-stay page)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is The Himalayan Shire pet-friendly?",
      "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}
```

**Purpose:** Helps Google show FAQ rich results for pet-policy questions.

## Author implementation (updated 2026-09-11)

**Rule:** author is dynamic, never invented. When the CMS credits a real named individual (e.g. "Rishabh Goel"), schema uses `"@type": "Person"` with that exact name. When the property itself is credited, it uses `"@type": "Organization"` "The Himalayan Shire".

```json
"author": { "@type": "Person", "name": "Rishabh Goel" }
```

## Rules followed

- No fake reviews, ratings, offers, prices, or awards.
- All property details are accurate (address, phone, location).
- Pet-friendly appears only on pet-specific pages (pet-friendly-stay, pet-policy, FAQ pet answer).
- Author is Person (genuine CMS-credited name) or Organization — never invented.
- All JSON-LD is server-side rendered and indexable.

## Implemented 2026-09-11

- `FAQPage` on `/faq` (9 genuine visible Q&As, plain-text mirrors of page content).
- `BreadcrumbList` on `/rooms/[slug]` (Home → Rooms → Room) and `/blog/[slug]` (Home → Blog → Post).
- Dynamic Person/Organization blog author.
- `ImageObject` for homepage hero + blog post images (absolute URLs).
- `HotelRoom` per room (dynamic from CMS: name, description, image, floorSize, occupancy, facilities, containedInPlace).
