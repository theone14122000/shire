// lib/sustainability-content.ts
import type {
  SustainabilityApproach,
  SustainabilityClosing,
  SustainabilityContent,
  SustainabilityFeaturedImage,
  SustainabilityHero,
  SustainabilityPillar,
} from "./sustainability-types";

export type {
  SustainabilityApproach,
  SustainabilityClosing,
  SustainabilityContent,
  SustainabilityFeaturedImage,
  SustainabilityHero,
  SustainabilityPillar,
};

export const SUSTAINABILITY_PAGE_KEY = "sustainability";

export const SUSTAINABILITY_DEFAULTS: SustainabilityContent = {
  hero: {
    kicker: "The Himalayan Shire",
    heading: "Sustainability at The Himalayan Shire",
    intro: "We care for the mountains we call home. Here's how we tread lightly:",
  },
  approach: {
    kicker: "Our Conscious Choices",
    heading: "Our Conscious Choices",
    body: "At The Himalayan Shire, sustainability begins with mindful details. We practice waste segregation - plastic, cardboard, paper, glass, and metals are sent for recycling. Plastic bottles are replaced with glass, and bathroom toiletries come in thoughtful dispensers instead of disposable plastics. Even the simple act of brushing is greener here, with bamboo toothbrushes in place of synthetic ones.",
  },
  featured: [
    {
      src: "/sust/Sustainability1.png",
      title: "From Kitchen to Garden",
      caption: "From Kitchen to Garden",
    },
    {
      src: "/sust/Sustainability1.png",
      title: "Harvesting the Himalayan Rain",
      caption: "Harvesting the Himalayan Rain",
    },
  ],
  initiatives: [
    {
      title: "From Kitchen to Garden",
      body: "What nourishes you also nourishes the land. All biodegradable waste, including kitchen scraps, is composted on-site and returned to the soil as rich manure. The result: a thriving lawn and garden that grow in harmony with the rhythms of nature.",
    },
    {
      title: "Harvesting the Himalayan Rain",
      body: "Blessed by Fagu's abundant rainfall, we capture and store rainwater to meet much of our property's needs. This practice allows us to cherish every drop while reducing dependence on external sources – keeping us aligned with the natural abundance around us.",
    },
  ],
  closing: {
    kicker: "",
    heading:
      "While we do not claim to be a 100% eco-paradise, we do believe in doing our bit – one glass bottle, compost pile, and rain shower at a time.",
    body: "",
    ctaLabel: "Plan Your Stay",
  },
};

function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function section(
  value: unknown,
  fallback: SustainabilityHero | SustainabilityApproach | SustainabilityClosing
): SustainabilityHero | SustainabilityApproach | SustainabilityClosing {
  if (!value || typeof value !== "object") return fallback;
  const o = value as Record<string, unknown>;
  const out = { ...fallback };
  (Object.keys(out) as (keyof typeof out)[]).forEach((key) => {
    out[key] = str(o[key], fallback[key]) as never;
  });
  return out;
}

function pillars(value: unknown, fallback: SustainabilityPillar[]): SustainabilityPillar[] {
  if (!Array.isArray(value)) return fallback;
  const out: SustainabilityPillar[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const title = str(o.title, "");
    if (!title) continue;
    out.push({ title, body: str(o.body, "") });
  }
  return out.length ? out : fallback;
}

function featured(
  value: unknown,
  fallback: [SustainabilityFeaturedImage, SustainabilityFeaturedImage]
): [SustainabilityFeaturedImage, SustainabilityFeaturedImage] {
  if (!Array.isArray(value) || value.length < 2) return fallback;
  const mapOne = (item: unknown, fb: SustainabilityFeaturedImage): SustainabilityFeaturedImage => {
    if (!item || typeof item !== "object") return fb;
    const o = item as Record<string, unknown>;
    return {
      src: str(o.src, fb.src),
      title: str(o.title, fb.title),
      caption: str(o.caption, fb.caption),
    };
  };
  return [mapOne(value[0], fallback[0]), mapOne(value[1], fallback[1])];
}

export function mergeSustainability(
  db: Record<string, unknown> | null | undefined
): SustainabilityContent {
  if (!db) return SUSTAINABILITY_DEFAULTS;

  const oldClosing = typeof db.closing === "string" && db.closing.trim()
    ? db.closing
    : SUSTAINABILITY_DEFAULTS.closing.heading;

  return {
    hero: section(db.hero, SUSTAINABILITY_DEFAULTS.hero) as SustainabilityHero,
    approach: section(db.approach, SUSTAINABILITY_DEFAULTS.approach) as SustainabilityApproach,
    featured: featured(db.featured, SUSTAINABILITY_DEFAULTS.featured),
    initiatives: pillars(db.initiatives ?? db.pillars, SUSTAINABILITY_DEFAULTS.initiatives),
    closing: {
      ...(section(db.closing, SUSTAINABILITY_DEFAULTS.closing) as SustainabilityClosing),
      heading: str(
        (db.closing && typeof db.closing === "object"
          ? (db.closing as Record<string, unknown>).heading
          : null) ?? oldClosing,
        SUSTAINABILITY_DEFAULTS.closing.heading
      ),
    },
  };
}