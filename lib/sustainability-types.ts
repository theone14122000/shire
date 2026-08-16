// lib/sustainability-types.ts
export type SustainabilityPillar = {
  title: string;
  body: string;
};

export type SustainabilityHero = {
  kicker: string;
  heading: string;
  intro: string;
};

export type SustainabilityApproach = {
  kicker: string;
  heading: string;
  body: string;
};

export type SustainabilityFeaturedImage = {
  src: string;
  title: string;
  caption: string;
};

export type SustainabilityClosing = {
  kicker: string;
  heading: string;
  body: string;
  ctaLabel: string;
};

export type SustainabilityContent = {
  hero: SustainabilityHero;
  approach: SustainabilityApproach;
  featured: [SustainabilityFeaturedImage, SustainabilityFeaturedImage];
  initiatives: SustainabilityPillar[];
  closing: SustainabilityClosing;
};