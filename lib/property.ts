/**
 * Canonical property entity — THE single source of truth for machine-readable
 * facts about The Himalayan Shire.
 *
 * Consumers:
 *   - app/layout.tsx            (site-wide JSON-LD)
 *   - app/api/ai/property       (public read-only AI/SEO endpoint)
 *   - app/faq, room/blog pages  (cross-checks / link targets)
 *
 * Rules:
 *   - Only facts that already appear on the public site or in the CMS.
 *   - Never invent prices, distances, availability, awards or reviews.
 *   - Contact/social/address values are imported from lib/content.ts `brand`
 *     so the visible site and the machine-readable layer cannot drift apart.
 */

import { BOOKING_URL, brand } from "./content";

export const SITE_URL = "https://www.thehimalayanshire.com";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Clean canonical booking URL (the CTA link in lib/content.ts carries
 *  session date params; the base URL is the citable one). */
export const BOOKING_BASE_URL = "https://letsbook.me/booking/thehimalayanshire";

/** Structured postal components behind brand.address (already published). */
export const address = {
  streetAddress: "Dehna Road, near Talayi Village",
  addressLocality: "Fagu",
  addressRegion: "Himachal Pradesh",
  postalCode: "171209",
  addressCountry: "IN",
} as const;

export const geo = {
  latitude: 31.066671,
  longitude: 77.309332,
} as const;

/** Distances exactly as published in the FAQ and llm.txt — Fagu-relative. */
export const nearbyPlaces = [
  {
    name: "Fagu",
    relation: "2 kms on the link road from Fagu (the property's own location)",
  },
  {
    name: "Kufri",
    relation: "5 kms ahead of Kufri on the main highway towards Theog / Narkanda",
  },
  {
    name: "Shimla",
    relation: "19 kms ahead of Shimla on the main highway towards Theog / Narkanda",
  },
  {
    name: "Theog / Narkanda",
    relation: "onward on the same main highway from Fagu",
  },
] as const;

/** Amenity features already shown site-wide (app/layout.tsx). */
export const amenityFeature = [
  { name: "Mountain view", value: true },
  { name: "Free parking", value: true },
  { name: "In-house kitchen", value: true },
  { name: "Electric fireplace", value: true },
  { name: "Lawn and orchard gardens", value: true },
  { name: "Wi-Fi", value: true },
  { name: "24/7 Hot water", value: true },
] as const;

/** Public pages — used by the AI endpoint and llm.txt cross-checks. */
export const officialPages = {
  home: `${SITE_URL}/`,
  rooms: `${SITE_URL}/#rooms`,
  privateVilla: `${SITE_URL}/private-villa`,
  activities: `${SITE_URL}/activities`,
  sustainability: `${SITE_URL}/sustainability`,
  gallery: `${SITE_URL}/gallery`,
  faq: `${SITE_URL}/faq`,
  blog: `${SITE_URL}/blog`,
  petPolicy: `${SITE_URL}/pet-policy`,
  petFriendlyStay: `${SITE_URL}/pet-friendly-stay`,
  contact: `${SITE_URL}/contact`,
  sitemap: `${SITE_URL}/sitemap.xml`,
} as const;

/** High-level factual identity — safe to expose on any public surface. */
export const property = {
  name: brand.name,
  alternateName: "Himalayan Shire Homestay Fagu",
  propertyType: "Boutique homestay (family-run accommodation; not a hotel chain or resort)",
  tagline: brand.tagline,
  description:
    "A premium boutique homestay in Fagu, near Kufri and Shimla, Himachal Pradesh. Seven spacious rooms with a private-villa calm amid apple orchards, at 7,500 ft with Himalayan views.",
  longDescription:
    "A premium boutique homestay in Fagu, near Kufri, a short drive from Shimla. Seven spacious rooms with a private-villa calm, apple orchards, and Himalayan views — a peaceful mountain retreat in Himachal Pradesh.",
  url: `${SITE_URL}/`,
  bookingUrl: BOOKING_BASE_URL,
  bookingCtaUrl: BOOKING_URL,
  email: brand.email,
  phones: brand.phoneHref.map((href) => href.replace("tel:", "+")),
  phoneDisplay: brand.phoneDisplay,
  whatsapp: brand.whatsapp,
  mapsUrl: brand.mapsUrl,
  address: brand.address,
  addressParts: address,
  geo,
  altitude: "7,500 ft",
  priceRange: "₹₹",
  roomCount: 7,
  petsAllowed: true,
  amenityFeature,
  nearbyPlaces,
  socials: brand.socials.map((s) => s.href),
  officialPages,
  images: {
    hero: `${SITE_URL}/images/hero-1.jpg`,
    logo: `${SITE_URL}/images/logo2.jpg`,
    heroPoster: `${SITE_URL}/images/hero-1.jpg`,
  },
  inLanguage: "en-IN",
} as const;

/* -------------------------------------------------------------------------- */
/*  JSON-LD builders                                                          */
/* -------------------------------------------------------------------------- */

type JsonLd = Record<string, unknown>;

/** Site-wide LodgingBusiness — the primary entity every other node references. */
export function getLodgingBusinessJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": BUSINESS_ID,
    name: property.name,
    alternateName: property.alternateName,
    description: property.longDescription,
    url: property.url,
    telephone: property.phones[0],
    email: property.email,
    priceRange: property.priceRange,
    image: property.images.hero,
    logo: property.images.logo,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...geo,
    },
    sameAs: property.socials,
    petsAllowed: property.petsAllowed,
    amenityFeature: amenityFeature.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.name,
      value: a.value,
    })),
    // Geographic entity chain: Fagu → Himachal Pradesh → India
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Fagu",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Himachal Pradesh",
        containedInPlace: {
          "@type": "Country",
          name: "India",
        },
      },
    },
    containsPlace: {
      "@type": "TouristAttraction",
      name: "Kufri",
      url: officialPages.activities,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "reservations",
      email: property.email,
      telephone: property.phones[0],
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    // Genuine booking channel already published on the site — no price or
    // availability is claimed here (none is machine-readable anywhere).
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        url: property.bookingUrl,
      },
    },
  };
}

/** WebSite node — publisher links back to the business via @id. */
export function getWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: property.name,
    url: property.url,
    description:
      "A premium boutique homestay in Fagu, near Kufri and Shimla, Himachal Pradesh — spacious rooms, private villa calm, and Himalayan views.",
    publisher: {
      "@type": "Organization",
      "@id": BUSINESS_ID,
      name: property.name,
      url: property.url,
      logo: {
        "@type": "ImageObject",
        url: property.images.logo,
      },
    },
    inLanguage: property.inLanguage,
  };
}

/** Hero image entity. */
export function getHeroImageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": property.images.hero,
    contentUrl: property.images.hero,
    name: "The Himalayan Shire — Mountain Homestay in Fagu, Near Shimla",
    description:
      "A family-run offbeat homestay in Fagu, near Kufri. Pine views, apple orchards, and seven heritage rooms at 7,500 ft.",
    caption: "The Himalayan Shire — Fagu, Himachal Pradesh",
    width: 1920,
    height: 1080,
    inLanguage: property.inLanguage,
  };
}
