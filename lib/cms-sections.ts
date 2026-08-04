export interface CmsField {
  key: string;
  label: string;
  textarea?: boolean;
  placeholder?: string;
}

export interface CmsSection {
  key: string;
  label: string;
  fields: CmsField[];
}

export const CMS_SECTIONS: CmsSection[] = [
  {
    key: "hero",
    label: "Hero",
    fields: [
      { key: "eyebrow", label: "Eyebrow" },
      { key: "headline", label: "Headline" },
      { key: "sub", label: "Description", textarea: true },
      { key: "primaryCtaLabel", label: "Primary CTA Label" },
      { key: "primaryCtaHref", label: "Primary CTA URL" },
      { key: "secondaryCtaLabel", label: "Secondary CTA Label" },
      { key: "secondaryCtaHref", label: "Secondary CTA URL" },
    ],
  },
  {
    key: "editorial",
    label: "Our Story",
    fields: [
      { key: "kicker", label: "Kicker" },
      { key: "heading", label: "Heading" },
      { key: "body", label: "Body", textarea: true },
      { key: "signature", label: "Signature" },
      { key: "shortPitch", label: "Short Pitch Card" },
    ],
  },
  {
    key: "rooms",
    label: "Rooms Intro",
    fields: [
      { key: "kicker", label: "Kicker" },
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", textarea: true },
    ],
  },
  {
    key: "amenities",
    label: "Amenities",
    fields: [
      { key: "kicker", label: "Kicker" },
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", textarea: true },
    ],
  },
  {
    key: "setting",
    label: "The Setting",
    fields: [
      { key: "kicker", label: "Kicker" },
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", textarea: true },
      { key: "ctaLabel", label: "Button 1 Label" },
      { key: "ctaHref", label: "Button 1 URL" },
      { key: "cta2Label", label: "Button 2 Label" },
      { key: "cta2Href", label: "Button 2 URL" },
    ],
  },
  {
    key: "gallery",
    label: "Gallery Intro",
    fields: [
      { key: "kicker", label: "Kicker" },
      { key: "heading", label: "Heading" },
    ],
  },
  {
    key: "bookCta",
    label: "Book CTA",
    fields: [
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", textarea: true },
      { key: "ctaLabel", label: "Button 1 Label" },
      { key: "ctaHref", label: "Button 1 URL" },
      { key: "cta2Label", label: "Button 2 Label" },
      { key: "cta2Href", label: "Button 2 URL" },
    ],
  },
];

export const BOOKING_URL =
  "https://letsbook.me/booking/thehimalayanshire?checkin=2026-08-04&checkout=2026-08-05&adults=2&children=0";

export const CMS_DEFAULTS: Record<string, Record<string, string>> = {
  hero: {
    eyebrow: "A boutique mountain stay in the Kinnaur Himalayas",
    headline: "The Himalayan Shire — a quiet place to rest, breathe, and stay.",
    sub: "A family-run retreat in Pagey, near Kalpa. Seven warm rooms, an in-house kitchen, and the Kailash range at the end of the orchard road.",
    primaryCtaLabel: "Book Your Stay",
    primaryCtaHref: BOOKING_URL,
    secondaryCtaLabel: "Take the Virtual Walkthrough",
    secondaryCtaHref: "#walkthrough",
  },
  editorial: {
    kicker: "Our Story",
    heading: "A place to slow down, breathe, and stay a little longer.",
    body: `Looking for a relaxing vacation — away from the crowds and the noise of everyday life — in the quiet of the Himalayas? The Himalayan Shire is located in Pagey, near Kalpa, in a part of Himachal that has kept its old, unhurried rhythm.

If you are looking for a quiet place far from the rush, surrounded by apple orchards and pine, this is a place for escapists and travellers who simply want to enjoy a vacation on their own terms. You can book the entire shire if you are travelling in a group, or choose a single room. Every detail — from the warm wood interiors to the small, considered amenities — has been built to make you feel at home.

We will make your stay a truly delightful one, and hope to send you back with memories to cherish and an eagerness to return.`,
    signature: "— The Shire family",
    shortPitch:
      "Heritage rooms, warm hospitality, and a view of the Kinnaur Kailash range that stays with you long after you've gone home.",
  },
  rooms: {
    kicker: "Accommodations",
    heading: "Rooms named after the trees around the property.",
    description:
      "We have lovingly prepared seven rooms, each with its own uniqueness - named after the tree species that surround our property.",
  },
  amenities: {
    kicker: "Amenities",
    heading: "Comforts arranged as part of the stay.",
    description:
      "The property is built for slow days: warmth, food, quiet corners, common spaces, and practical comforts that make mountain travel feel easy.",
  },
  setting: {
    kicker: "The Setting",
    heading: "A serene, beautiful countryside surrounded by apple orchards.",
    description:
      "A serene, beautiful countryside location - surrounded by apple orchards and tall pine trees, with an unparallelled view of the Kinnaur Kailash range.",
    ctaLabel: "Explore activities",
    ctaHref: "/activities",
    cta2Label: "Our kitchen",
    cta2Href: "/kitchen",
  },
  gallery: {
    kicker: "Gallery",
    heading: "A visual walk through the property.",
  },
  bookCta: {
    heading: "A quiet room, a warm meal, and a view worth the journey.",
    description:
      "Tell us when you are coming and how many of you there are. We will reply with availability and a simple plan for your stay.",
    ctaLabel: "Check availability",
    ctaHref: "https://wa.me/918169898066",
    cta2Label: "Contact the shire",
    cta2Href: "/contact",
  },
};
