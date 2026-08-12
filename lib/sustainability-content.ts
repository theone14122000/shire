// lib/sustainability-content.ts
import type { SustainabilityContent, SustainabilityPillar } from "./sustainability-types";

export type { SustainabilityContent, SustainabilityPillar };

export const SUSTAINABILITY_PAGE_KEY = "sustainability";

export const SUSTAINABILITY_DEFAULTS: SustainabilityContent = {
  hero: {
    kicker: "The Himalayan Shire",
    heading: "Sustainability at The Himalayan Shire",
    intro: "We care for the mountains we call home. Here's how we tread lightly:",
  },
  pillars: [
    {
      title: "Our Conscious Choices",
      body: "At The Himalayan Shire, sustainability begins with mindful details. We practice waste segregation - plastic, cardboard, paper, glass, and metals are sent for recycling. Plastic bottles are replaced with glass, and bathroom toiletries come in thoughtful dispensers instead of disposable plastics. Even the simple act of brushing is greener here, with bamboo toothbrushes in place of synthetic ones.",
    },
    {
      title: "From Kitchen to Garden",
      body: "What nourishes you also nourishes the land. All biodegradable waste, including kitchen scraps, is composted on - site and returned to the soil as rich manure. The result: a thriving lawn and garden that grow in harmony with the rhythms of nature.",
    },
    {
      title: "Harvesting the Himalayan Rain",
      body: "Blessed by Fagu's abundant rainfall, we capture and store rainwater to meet much of our property's needs. This practice allows us to cherish every drop while reducing dependence on external sources - keeping us aligned with the natural abundance around us.",
    },
  ],
  closing:
    "While we do not claim to be a 100% eco- paradise, we do believe in doing our bit – one glass bottle, compost pile, and rain shower at a time.",
};

function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
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

export function mergeSustainability(
  db: Record<string, unknown> | null | undefined
): SustainabilityContent {
  if (!db) return SUSTAINABILITY_DEFAULTS;

  const hero = (db.hero && typeof db.hero === "object" ? db.hero : {}) as Record<string, unknown>;

  return {
    hero: {
      kicker: str(hero.kicker, SUSTAINABILITY_DEFAULTS.hero.kicker),
      heading: str(hero.heading, SUSTAINABILITY_DEFAULTS.hero.heading),
      intro: str(hero.intro, SUSTAINABILITY_DEFAULTS.hero.intro),
    },
    pillars: pillars(db.pillars, SUSTAINABILITY_DEFAULTS.pillars),
    closing: str(db.closing, SUSTAINABILITY_DEFAULTS.closing),
  };
}