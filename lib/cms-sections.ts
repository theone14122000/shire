export interface CmsField {
  key: string;
  label: string;
  textarea?: boolean;
  placeholder?: string;
  image?: boolean;
}

export interface CmsSection {
  key: string;
  label: string;
  fields: CmsField[];
}

export const CMS_SECTIONS: CmsSection[] = [
  {
    key: "hero",
    label: "Hero Video",
    fields: [
      { key: "videoUrl", label: "Video URL (mp4)" },
      { key: "poster", label: "Poster Image URL", image: true },
    ],
  },
  {
    key: "editorial",
    label: "Our Story",
    fields: [
      { key: "kicker", label: "Kicker" },
      { key: "heading", label: "Heading", textarea: true },
      { key: "body", label: "Body", textarea: true },
      { key: "signature", label: "Signature" },
      { key: "shortPitch", label: "Short Pitch Card" },
      { key: "image", label: "Image", image: true },
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
      { key: "image", label: "Image", image: true },
    ],
  },
  {
    key: "video",
    label: "Property Video",
    fields: [
      { key: "kicker", label: "Kicker" },
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", textarea: true },
      { key: "videoUrl", label: "YouTube Video URL" },
    ],
  },
  {
    key: "gallery",
    label: "Gallery Intro",
    fields: [
      { key: "kicker", label: "Kicker" },
      { key: "heading", label: "Heading" },
      { key: "heroImage", label: "Gallery Page Hero Image", image: true },
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
    videoUrl: "/hero/hero.mp4",
    poster: "/images/hero-1.jpg",
  },
  editorial: {
    kicker: "Our Story",
    heading: "Not a hotel.\nA home\nheld by the\nmountains.",
    body: `Looking for a relaxing vacation, away from the crowds and in the tranquility of the Himalayas? The Himalayan Shire located in Fagu near Kufri and Shimla is just the right place for you. It is a boutique homestay surrounded by apple orchards, perfect for couples or families who want to enjoy a vacation with the privacy and comfort of a home. You could either book the entire villa if you are travelling in a group, but we also rent on per room basis.

We pride ourselves not just with amazingly spacious rooms and washrooms that are unlike any other but more so with our loving and caring hospitality that will make your stay a truly delightful one. We aim and hope to send you back with lots of memories to cherish with an eagerness to visit us again soon.`,
    signature: "— The Shire family",
    shortPitch:
      "Heritage rooms, warm hospitality, and a view of the Kinnaur Kailash range that stays with you long after you've gone home.",
    image: "/images/brand-lifestyle.jpg",
  },
  rooms: {
    kicker: "Accommodations",
    heading: "Rooms, named after the trees around our property",
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
      "A serene, beautiful countryside location - surrounded by apple orchards and tall pine trees, with an unparalleled view of the Kinnaur Kailash range.",
    ctaLabel: "Explore activities",
    ctaHref: "/activities",
    image: "/images/setting-view.jpg",
  },
  video: {
    kicker: "The Shire on Film",
    heading: "Watch the property film.",
    description:
      "A slow walk through the shire — the rooms, the orchards, and the mountains that hold it all.",
    videoUrl: "https://youtu.be/uVUTB5HsBXU",
  },
  gallery: {
    kicker: "Gallery",
    heading: "A visual walk through the property.",
    heroImage: "/gallery/enchanting-winter-views.jpg",
  },
  bookCta: {
    heading: "A quiet room, a warm meal, and a view worth the journey.",
    description:
      "Tell us when you are coming and how many of you there are. We will reply with availability and a simple plan for your stay.",
    ctaLabel: "Check availability",
    ctaHref: "https://wa.me/918580411998",
    cta2Label: "Contact the shire",
    cta2Href: "/contact",
  },
};
