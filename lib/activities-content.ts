// lib/activities-content.ts
export const ACTIVITIES_PAGE_KEY = "activities";

export const ACTIVITIES_BLOG_URL =
  "https://traveltalesfromindia.in/a-small-hike-with-the-himalayan-shire/#google_vignette";

export type ActivityCard = {
  title: string;
  body: string;
  image: string;
};

export type Destination = {
  name: string;
  distance: string;
  note: string | null;
  image: string;
  travelTime: string;
  highlight: string;
};

export type ActivitiesContent = {
  hero: {
    kicker: string;
    heading: string;
    description: string;
    bgImage: string;
    bgAlt: string;
  };
  atProperty: {
    kicker: string;
    heading: string;
    description: string;
  };
  propertyCards: ActivityCard[];
  nearby: {
    kicker: string;
    heading: string;
    description: string;
  };
  destinations: Destination[];
  trails: {
    kicker: string;
    heading: string;
    description: string;
    blogUrl: string;
    image: string;
    imageAlt: string;
  };
  finale: {
    heading: string;
  };
};

export const ACTIVITIES_DEFAULTS: ActivitiesContent = {
  hero: {
    kicker: "Experiences",
    heading: "Every moment, curated.",
    description:
      "From quiet corners on the property to peaks in the Himalayas - there is always something waiting for you.",
    bgImage: "/images/activity/activity-2.jpg",
    bgAlt: "The Himalayan Shire property surrounded by pine forests",
  },
  atProperty: {
    kicker: "At the Property",
    heading: "Life at The Shire is not about filling every hour.",
    description:
      "It is about choosing how you spend your time - whether that means a morning yoga session on the lawn, an afternoon trail through apple orchards, or simply watching the clouds drift over the Kinnaur range from the balcony swing.",
  },
  propertyCards: [
    {
      title: "Space to Breathe",
      body: "Beyond your room, discover cozy common areas and quiet corners with panoramic views. Read in the carpeted attic, unwind on the balcony swing, or stroll the lawn.",
      image: "/gallery/common-balcony-with-swing.jpg",
    },
    {
      title: "Indoor Fun",
      body: "Table Tennis, Carrom, board games, and playing cards. For quieter afternoons, explore our mini-library of books.",
      image: "/gallery/indoor-games.jpeg",
    },
    {
      title: "The TV Lounge",
      body: "Sink into lounge sofas on the top floor and enjoy movies on our 65-inch LED Smart TV.",
      image: "/gallery/tv-lounge.jpg",
    },
    {
      title: "The Lawn",
      body: "A sprawling lawn with Himalayan views - ideal for morning yoga or meditation. A small slide keeps the little ones entertained.",
      image: "/gallery/lawn-with-outdoor-seating-1.jpg",
    },
    {
      title: "Nature Trails & Orchard Walks",
      body: "Step into apple orchards and deodar forests right outside. Stroll through orchards, meet locals, or explore jungle trails steps from the property. Bonfire and barbeque available on request.",
      image: "/images/activity/activity-10.jpg",
    },
  ],
  nearby: {
    kicker: "Nearby",
    heading: "Destinations.",
    description:
      "Curated recommendations from our concierge - each destination chosen for its character, beauty, and ease of access from the property.",
  },
  destinations: [
    { name: "Tungesh Peak Hike", distance: "6 km", note: "Cheog, Shimla", image: "/images/sightseeing/tungesh-peak.jpg", travelTime: "20 min drive", highlight: "Panoramic ridgeline trek through pine forests" },
    { name: "Deshu Peak / Fagu Top", distance: "3 km", note: null, image: "/images/sightseeing/deshu-peak.jpg", travelTime: "10 min drive", highlight: "Sunrise views over the Kinnaur range" },
    { name: "Kufri Adventure Park", distance: "5.6 km", note: null, image: "/images/sightseeing/kufri-park.jpg", travelTime: "15 min drive", highlight: "Horse riding, zip-lining, and mountain tubing" },
    { name: "Mahasu Peak, Kufri", distance: "6 km", note: null, image: "/images/sightseeing/mahasu-peak.jpg", travelTime: "18 min drive", highlight: "Highest point in Kufri with 360 degree valley views" },
    { name: "Rashtrapati Niwas, Mashobra", distance: "12 km", note: null, image: "/images/sightseeing/rashtrapati-niwas.jpg", travelTime: "30 min drive", highlight: "Colonial-era retreat surrounded by ancient cedars" },
    { name: "Jakhu Temple", distance: "20 km", note: "Shimla", image: "/images/sightseeing/jakhu-temple.jpg", travelTime: "50 min drive", highlight: "Hilltop Hanuman temple with sweeping Shimla views" },
    { name: "Shimla Mall Road", distance: "20 km", note: null, image: "/images/sightseeing/mall-road.jpg", travelTime: "50 min drive", highlight: "Heritage promenade with colonial architecture" },
    { name: "Narkanda - Hatu Peak", distance: "45 km", note: null, image: "/images/sightseeing/hatu-peak.jpg", travelTime: "1.5 hr drive", highlight: "Alpine meadows and snow-dusted forest trails" },
    { name: "Tata Pani", distance: "62 km", note: null, image: "/images/sightseeing/tata-pani.jpg", travelTime: "2 hr drive", highlight: "Natural hot springs along the Sutlej river" },
  ],
  trails: {
    kicker: "Trails",
    heading: "Love hiking & exploring the outdoors?",
    description: "Read about trails and nature around The Himalayan Shire.",
    blogUrl: ACTIVITIES_BLOG_URL,
    image: "/images/activity/activity-10.jpg",
    imageAlt: "Hiking trails near The Himalayan Shire",
  },
  finale: {
    heading: "Your mountain escape awaits.",
  },
};

function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function strOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function cards(value: unknown, fallback: ActivityCard[]): ActivityCard[] {
  if (!Array.isArray(value)) return fallback;
  const out: ActivityCard[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    out.push({
      title: str(o.title, ""),
      body: str(o.body, ""),
      image: str(o.image, ""),
    });
  }
  return out;
}

function destinations(value: unknown, fallback: Destination[]): Destination[] {
  if (!Array.isArray(value)) return fallback;
  const out: Destination[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    out.push({
      name: str(o.name, ""),
      distance: str(o.distance, ""),
      note: strOrNull(o.note),
      image: str(o.image, ""),
      travelTime: str(o.travelTime, ""),
      highlight: str(o.highlight, ""),
    });
  }
  return out.filter((d) => d.name.trim());
}

export function mergeActivities(
  db: Record<string, unknown> | null | undefined
): ActivitiesContent {
  if (!db) return ACTIVITIES_DEFAULTS;

  const hero = (db.hero && typeof db.hero === "object" ? db.hero : {}) as Record<string, unknown>;
  const atProperty = (db.atProperty && typeof db.atProperty === "object" ? db.atProperty : {}) as Record<string, unknown>;
  const nearby = (db.nearby && typeof db.nearby === "object" ? db.nearby : {}) as Record<string, unknown>;
  const trails = (db.trails && typeof db.trails === "object" ? db.trails : {}) as Record<string, unknown>;
  const finale = (db.finale && typeof db.finale === "object" ? db.finale : {}) as Record<string, unknown>;

  return {
    hero: {
      kicker: str(hero.kicker, ACTIVITIES_DEFAULTS.hero.kicker),
      heading: str(hero.heading, ACTIVITIES_DEFAULTS.hero.heading),
      description: str(hero.description, ACTIVITIES_DEFAULTS.hero.description),
      bgImage: str(hero.bgImage, ACTIVITIES_DEFAULTS.hero.bgImage),
      bgAlt: str(hero.bgAlt, ACTIVITIES_DEFAULTS.hero.bgAlt),
    },
    atProperty: {
      kicker: str(atProperty.kicker, ACTIVITIES_DEFAULTS.atProperty.kicker),
      heading: str(atProperty.heading, ACTIVITIES_DEFAULTS.atProperty.heading),
      description: str(atProperty.description, ACTIVITIES_DEFAULTS.atProperty.description),
    },
    propertyCards: cards(db.propertyCards, ACTIVITIES_DEFAULTS.propertyCards),
    nearby: {
      kicker: str(nearby.kicker, ACTIVITIES_DEFAULTS.nearby.kicker),
      heading: str(nearby.heading, ACTIVITIES_DEFAULTS.nearby.heading),
      description: str(nearby.description, ACTIVITIES_DEFAULTS.nearby.description),
    },
    destinations: destinations(db.destinations, ACTIVITIES_DEFAULTS.destinations),
    trails: {
      kicker: str(trails.kicker, ACTIVITIES_DEFAULTS.trails.kicker),
      heading: str(trails.heading, ACTIVITIES_DEFAULTS.trails.heading),
      description: str(trails.description, ACTIVITIES_DEFAULTS.trails.description),
      blogUrl: str(trails.blogUrl, ACTIVITIES_DEFAULTS.trails.blogUrl),
      image: str(trails.image, ACTIVITIES_DEFAULTS.trails.image),
      imageAlt: str(trails.imageAlt, ACTIVITIES_DEFAULTS.trails.imageAlt),
    },
    finale: {
      heading: str(finale.heading, ACTIVITIES_DEFAULTS.finale.heading),
    },
  };
}
