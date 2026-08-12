// lib/sustainability-types.ts
export type SustainabilityPillar = {
  title: string;
  body: string;
};

export type SustainabilityContent = {
  hero: {
    kicker: string;
    heading: string;
    intro: string;
  };
  pillars: SustainabilityPillar[];
  closing: string;
};