/**
 * Site content — single source of truth, extracted from the source screenshot.
 * Components read from here so the data layer can be swapped for a MySQL/API
 * feed later without touching the UI.
 *
 * Each section's data is shaped to match what an admin panel would feed in:
 *   - rooms carry rating, price, original-price (for offers), offer badges
 *   - offers carry title, discount, validity, image
 *   - amenities, blogs, testimonials all follow the same pattern
 * 
 * 🎨 THEME METADATA:
 *   Each section now includes a `theme` object for dynamic UI styling.
 *   Components should consume: section.theme.bg, section.theme.text, section.theme.accent
 */

export const brand = {
  name: "The Himalayan Shire",
  parent: "A PageyBySaj Brand",
  tagline: "A quiet Himalayan retreat, designed for the kind of rest you remember.",
  shortPitch:
    "Heritage rooms, warm hospitality, and a view of the Kinnaur Kailash range that stays with you long after you've gone home.",
  email: "himalayanshire@gmail.com",
  phoneDisplay: ["+91 81698 98066", "+91 95184 18833"],
  phoneHref: ["tel:+918169898066", "tel:+919518418833"],
  whatsapp: "https://wa.me/918169898066",
  address: "Pagey, near Kalpa, Kinnaur, Himachal Pradesh, India",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */
export const hero = {
  eyebrow: "A boutique mountain stay in the Kinnaur Himalayas",
  headline: "The Himalayan Shire — a quiet place to rest, breathe, and stay.",
  sub:
    "A family-run retreat in Pagey, near Kalpa. Six warm rooms, an in-house kitchen, and the Kailash range at the end of the orchard road.",
  primaryCta: { label: "Book Your Stay", href: "#rooms" },
  secondaryCta: { label: "Take the Virtual Walkthrough", href: "#walkthrough" },
  meta: [
    { label: "Location", value: "Pagey, near Kalpa" },
    { label: "Capacity", value: "6 rooms · full shire" },
    { label: "Seasons", value: "Open year-round" },
    { label: "Rating", value: "5 / 5" },
  ],
  theme: { bg: "bg-emerald-50", text: "text-black" },
} as const;

/* -------------------------------------------------------------------------- */
/*  BRAND INTRO (the long story paragraph from the screenshot)                */
/* -------------------------------------------------------------------------- */
export const brandIntro = {
  eyebrow: "Our Story",
  heading: "A place to slow down, breathe, and stay a little longer.",
  body: `Looking for a relaxing vacation — away from the crowds and the noise of everyday life — in the quiet of the Himalayas? The Himalayan Shire is located in Pagey, near Kalpa, in a part of Himachal that has kept its old, unhurried rhythm.

If you are looking for a quiet place far from the rush, surrounded by apple orchards and pine, this is a place for escapists and travellers who simply want to enjoy a vacation on their own terms. You can book the entire shire if you are travelling in a group, or choose a single room. Every detail — from the warm wood interiors to the small, considered amenities — has been built to make you feel at home.

We will make your stay a truly delightful one, and hope to send you back with memories to cherish and an eagerness to return.`,
  signature: "— The Shire family",
  theme: { bg: "bg-green-50", text: "text-black" },
} as const;

/* -------------------------------------------------------------------------- */
/*  ROOM / FEATURED COLLECTION                                                */
/*  Admin-panel-ready: image, rating, price, original price, offer badge     */
/* -------------------------------------------------------------------------- */
export type Room = {
  id: string;
  name: string;
  category: "Deluxe" | "Standard";
  capacity: string;
  beds: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  offerBadge?: string;
  shortNote: string;
  amenities: string[];
  imageLabel: string; // placeholder label until real image lands
  featured?: boolean;
};

export const featuredCollection: {
  eyebrow: string;
  heading: string;
  intro: string;
  rooms: Room[];
  theme: { bg: string; text: string };
} = {
  eyebrow: "Stay With Us",
  heading: "Six rooms, each with its own view of the valley.",
  intro:
    "From premium deluxe rooms with mountain-facing windows to warm, wood-floored standard rooms — every space is made for slow mornings and quiet evenings.",
  rooms: [
    {
      id: "deluxe-premium-king",
      name: "Deluxe — Premium",
      category: "Deluxe",
      capacity: "Sleeps 2",
      beds: "1 King bed",
      rating: 4.9,
      reviewCount: 62,
      pricePerNight: 6200,
      originalPrice: 7500,
      offerBadge: "17% OFF",
      shortNote:
        "Our most spacious room with a sit-out overlooking the orchard and the Kailash range.",
      amenities: ["Mountain view", "Sit-out", "Heater", "Free Wi-Fi"],
      imageLabel: "Deluxe Premium King — bedroom",
      featured: true,
    },
    {
      id: "deluxe-premium-family",
      name: "Deluxe — Premium Family",
      category: "Deluxe",
      capacity: "Sleeps 4",
      beds: "2 Queen beds",
      rating: 4.8,
      reviewCount: 41,
      pricePerNight: 8800,
      offerBadge: "Best for Groups",
      shortNote:
        "Ideal for families or small groups travelling together. Warm wood interiors and a private balcony.",
      amenities: ["Balcony", "Heater", "Free Wi-Fi", "Hot water"],
      imageLabel: "Deluxe Premium Family — bedroom",
    },
    {
      id: "deluxe-premium-maple",
      name: "Deluxe — Maple",
      category: "Deluxe",
      capacity: "Sleeps 2",
      beds: "1 Queen bed",
      rating: 4.9,
      reviewCount: 28,
      pricePerNight: 5400,
      originalPrice: 6000,
      offerBadge: "10% OFF",
      shortNote:
        "The Maple — a quieter corner of the shire, with a deep window seat made for long books and slow chai.",
      amenities: ["Window seat", "Heater", "Free Wi-Fi", "Tea & coffee"],
      imageLabel: "Deluxe Maple — window seat",
    },
    {
      id: "walnut-standard",
      name: "Walnut — Standard",
      category: "Standard",
      capacity: "Sleeps 2",
      beds: "1 Queen bed",
      rating: 4.7,
      reviewCount: 35,
      pricePerNight: 3800,
      shortNote:
        "A clean, warm, well-considered standard room finished in walnut — value without compromise.",
      amenities: ["Heater", "Free Wi-Fi", "Hot water"],
      imageLabel: "Walnut Standard — bedroom",
    },
    {
      id: "moby-standard",
      name: "Moby — Standard",
      category: "Standard",
      capacity: "Sleeps 2",
      beds: "1 Queen bed",
      rating: 4.7,
      reviewCount: 19,
      pricePerNight: 3800,
      offerBadge: "New Listing",
      shortNote:
        "The Moby — our cosiest room, named for the morning light that comes through its east window.",
      amenities: ["East window", "Heater", "Free Wi-Fi"],
      imageLabel: "Moby Standard — morning light",
    },
    {
      id: "maple-standard",
      name: "Maple — Standard",
      category: "Standard",
      capacity: "Sleeps 2",
      beds: "1 Queen bed",
      rating: 4.8,
      reviewCount: 23,
      pricePerNight: 3600,
      originalPrice: 4000,
      offerBadge: "Save ₹400",
      shortNote:
        "Simple, soft, and quiet. A restful base for days spent walking in the orchard and the pine forest.",
      amenities: ["Heater", "Free Wi-Fi", "Hot water"],
      imageLabel: "Maple Standard — bedroom",
    },
  ],
  theme: { bg: "bg-emerald-100/40", text: "text-black" },
};

/* -------------------------------------------------------------------------- */
/*  SPECIAL OFFERS — dedicated cards the client can add via the admin panel   */
/* -------------------------------------------------------------------------- */
export type Offer = {
  id: string;
  title: string;
  description: string;
  badge: string;
  discountLabel: string;
  validUntil: string;
  imageLabel: string;
  cta: string;
  ctaHref: string;
};

export const specialOffers: {
  eyebrow: string;
  heading: string;
  intro: string;
  offers: Offer[];
  theme: { bg: string; text: string };
} = {
  eyebrow: "Current Offers",
  heading: "Seasonal deals, straight from the shire.",
  intro:
    "Limited-time packages put together for the kind of stay you have in mind — long weekends, anniversaries, or just a quiet reset.",
  offers: [
    {
      id: "winter-weekend",
      title: "Winter Weekend Escape",
      description:
        "Two nights, all meals, and a guided snow trek to the lower Kailash trail. Best on Friday-Sunday blocks.",
      badge: "Limited Time",
      discountLabel: "Save 20%",
      validUntil: "Valid until 28 Feb",
      imageLabel: "Winter Weekend — snow and bonfire",
      cta: "Book this offer",
      ctaHref: "#book",
    },
    {
      id: "anniversary",
      title: "Anniversary Stay",
      description:
        "Private bonfire, a candlelit dinner on the lawn, and a hand-kept room with a small gift from the kitchen.",
      badge: "Couples",
      discountLabel: "From ₹11,800",
      validUntil: "Year-round",
      imageLabel: "Anniversary — candlelit dinner on the lawn",
      cta: "Plan a stay",
      ctaHref: "#book",
    },
    {
      id: "shire-takes-all",
      title: "Take The Whole Shire",
      description:
        "Book all six rooms for a private gathering of up to fourteen guests. Includes a dedicated cook and concierge.",
      badge: "Group",
      discountLabel: "Best for 10+ guests",
      validUntil: "Subject to availability",
      imageLabel: "Whole Shire — exterior at dusk",
      cta: "Enquire",
      ctaHref: "#book",
    },
  ],
  theme: { bg: "bg-green-100/40", text: "text-black" },
};

/* -------------------------------------------------------------------------- */
/*  WHY CHOOSE US — 4 feature cards drawn from amenities & ethos              */
/* -------------------------------------------------------------------------- */
export const whyChooseUs: {
  eyebrow: string;
  heading: string;
  features: { title: string; body: string }[];
  theme: { bg: string; text: string };
} = {
  eyebrow: "Why The Shire",
  heading: "Considered, warm, and quietly run.",
  features: [
    {
      title: "Pet-Friendly Stays",
      body: "Bring your dogs and cats along. We treat them like the family they are, with small charges for their bedding and meals.",
    },
    {
      title: "In-House Kitchen",
      body: "Locally-sourced, home-cooked Kinnauri and Himachali food. Tell us what you don't eat, and we'll quietly work around it.",
    },
    {
      title: "Warm, Wood-Fired Evenings",
      body: "Barbecue and bonfire available on order. Outdoor seating on the lawn, looking out to the snow line.",
    },
    {
      title: "Concierge, On Request",
      body: "Doctor on call, airport transfers, and snow-trek arrangements. We plan the small things so you don't have to.",
    },
  ],
  theme: { bg: "bg-emerald-50/70", text: "text-black" },
};

/* -------------------------------------------------------------------------- */
/*  WELLNESS ESSENTIALS — daily living amenities                               */
/* -------------------------------------------------------------------------- */
export const wellnessEssentials: {
  eyebrow: string;
  heading: string;
  intro: string;
  items: { title: string; caption: string }[];
  theme: { bg: string; text: string };
} = {
  eyebrow: "Daily Essentials",
  heading: "Everything you might need, already in the room.",
  intro:
    "A short list of the small things that make a stay feel effortless — from electric heaters in winter to fast Wi-Fi for when you need to stay connected.",
  items: [
    {
      title: "Electric Heaters & Hot Water",
      caption: "Winter-ready rooms with reliable heating and 24-hour hot water.",
    },
    {
      title: "High-Speed Wi-Fi",
      caption: "Stay connected when you want to, disconnect when you don't.",
    },
    {
      title: "In-Room Tea & Coffee",
      caption: "Local chai, fresh-ground coffee, and a kettle in every room.",
    },
    {
      title: "Sound System & TV",
      caption: "Bluetooth speakers, cable TV, and a curated list of mountain films.",
    },
    {
      title: "Free Private Parking",
      caption: "Secure on-site parking for cars and small vehicles.",
    },
    {
      title: "Lounge & Library",
      caption: "A quiet television lounge with books, maps, and conversation.",
    },
  ],
  theme: { bg: "bg-green-50/70", text: "text-black" },
};

/* -------------------------------------------------------------------------- */
/*  TRADITIONAL REMEDIES — the "Setting" copy reframed for the section        */
/*  🌲 DARK GREEN THEME + IMAGE ADDED AS REQUESTED                            */
/* -------------------------------------------------------------------------- */
export const traditionalRemedies = {
  eyebrow: "The Setting",
  heading: "A serene, beautiful countryside surrounded by apple orchards.",
  body: `A serene, beautiful countryside location — surrounded by apple orchards and tall pine trees, with an unparallelled view of the Kinnaur Kailash range. The hills here are stunning in every season: white with snow in winter, blooming in spring, and golden in autumn.

You can choose to spend your days walking the orchard, sitting by the fire, or going on a snow trek with our local team. We will help you plan, and we will sit with you in the evening over a hot meal when you come back.`,
  cta: { label: "Read the full story", href: "#story" },
  image: {
    src: "/images/setting-orchard-view.jpg",
    alt: "Panoramic view of apple orchards, pine forests, and the Kinnaur Kailash range from The Himalayan Shire",
  },
  theme: { bg: "bg-emerald-900", text: "text-black" },
} as const;

/* -------------------------------------------------------------------------- */
/*  INGREDIENT PURITY / QUALITY                                               */
/* -------------------------------------------------------------------------- */
export const qualitySection: {
  eyebrow: string;
  heading: string;
  intro: string;
  pillars: { title: string; description: string }[];
  theme: { bg: string; text: string };
} = {
  eyebrow: "Our Standards",
  heading: "A small set of things we do, every single time.",
  intro:
    "We are a small, family-run property. Our standards are simple, and we hold ourselves to them without exception.",
  pillars: [
    {
      title: "Locally Sourced",
      description:
        "Vegetables, dairy, and grain from the village and the neighbouring farms. We name our suppliers.",
    },
    {
      title: "Cleanly Run",
      description:
        "Rooms cleaned daily, linens changed on request, and a zero-plastic kitchen policy in the shire.",
    },
    {
      title: "Honestly Priced",
      description:
        "No hidden fees, no surprise add-ons. The price you see is the price you pay.",
    },
    {
      title: "Respectfully Staffed",
      description:
        "Our team is paid fairly, trained in the shire, and lives in the village. We work with the people who built this place.",
    },
  ],
  theme: { bg: "bg-emerald-100/30", text: "text-black" },
};

/* -------------------------------------------------------------------------- */
/*  CUSTOMER TRUST — reviews & ratings from the screenshot                     */
/* -------------------------------------------------------------------------- */
export const trustSection = {
  eyebrow: "Guest Notes",
  heading: "What our guests remember most.",
  intro:
    "The Himalayan Shire is rated 4.7 / 5 across Google, Tripadvisor, and Booking.com, with the highest marks for hospitality, location, and the view.",
  stats: [
    { value: "4.7", label: "Average guest rating" },
    { value: "180+", label: "Verified reviews" },
    { value: "92%", label: "Would return" },
    { value: "100%", label: "Locally staffed" },
  ],
  reviews: [
    {
      quote:
        "The view from the shire is the kind of thing you don't believe until you see it. We will be back.",
      author: "Aanya & Kabir",
      source: "Google",
    },
    {
      quote:
        "Warm, thoughtful, and quiet. The food, the people, the rooms — everything felt personal.",
      author: "M. Iyer",
      source: "Tripadvisor",
    },
  ],
  theme: { bg: "bg-green-100/30", text: "text-black" },
} as const;

/* -------------------------------------------------------------------------- */
/*  PRODUCT SHOWCASE — editorial alternating blocks from the screenshot       */
/* -------------------------------------------------------------------------- */
export const productShowcase: {
  eyebrow: string;
  heading: string;
  blocks: {
    tag: string;
    title: string;
    body: string;
    cta: string;
  }[];
  theme: { bg: string; text: string };
} = {
  eyebrow: "Stories From The Shire",
  heading: "Letters, walks, and the occasional recipe.",
  blocks: [
    {
      tag: "Journal",
      title: "A guide to walking the orchard trail",
      body: "A two-hour loop through our apple and apricot orchards, with notes on the best picnic spots and where the morning light is best.",
      cta: "Read the guide",
    },
    {
      tag: "Behind The Scenes",
      title: "Why the kitchen is the heart of the shire",
      body: "A short piece on our cooks, our suppliers, and the slow-cooked meals that bring guests back to the table.",
      cta: "Read the story",
    },
    {
      tag: "Travel Notes",
      title: "Visiting Kinnaur in winter — a practical guide",
      body: "Roads, weather, what to pack, and how to make the most of a short winter visit. Written for first-time travellers.",
      cta: "Read the guide",
    },
  ],
  theme: { bg: "bg-emerald-50/50", text: "text-black" },
};

/* -------------------------------------------------------------------------- */
/*  FINAL CTA                                                                 */
/* -------------------------------------------------------------------------- */
export const finalCta = {
  eyebrow: "Plan Your Stay",
  heading: "A quiet room, a warm meal, and a view worth the journey.",
  body: "Tell us when you are coming and how many of you there are. We will reply within a few hours with availability and a simple plan for your stay.",
  primary: { label: "Check Availability & Tariff", href: "#book" },
  secondary: { label: "Take the Virtual Walkthrough", href: "#walkthrough" },
  theme: { bg: "bg-green-50/50", text: "text-black" },
} as const;

/* -------------------------------------------------------------------------- */
/*  FOOTER (compact summary)                                                  */
/* -------------------------------------------------------------------------- */
export const footer = {
  tagline:
    "A small, family-run retreat in the Himalayas — built for the kind of rest you remember.",
  columns: [
    {
      title: "Contact",
      links: [
        { label: "himalayanshire@gmail.com", href: "mailto:" + brand.email },
        { label: "+91 81698 98066", href: "tel:+918169898066" },
        {
          label: "Fagu, Shimla",
          href: "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394",
        },
      ],
    },
    {
      title: "Stay",
      links: [
        { label: "Rooms & Suites", href: "#rooms" },
        { label: "Offers", href: "#offers" },
        { label: "Amenities", href: "#amenities" },
        { label: "Tariff", href: "#tariff" },
        { label: "Book a Stay", href: "#book" },
      ],
    },
    {
      title: "Visit",
      links: [
        { label: "Virtual Walkthrough", href: "#walkthrough" },
        { label: "Journal", href: "#journal" },
        { label: "Getting Here", href: "#travel" },
        { label: "FAQs", href: "#faq" },
      ],
    },
  ],
  legal: "© 2026 The Himalayan Shire. A PageyBySaj property. All rights reserved.",
  theme: { bg: "bg-emerald-950", text: "text-emerald-100" },
} as const;