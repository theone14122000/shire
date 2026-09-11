import { Metadata } from "next";

/**
 * Generates metadata for the Contact page.
 */
export function contactMetadata(): Metadata {
  return {
    title: "Contact | The Himalayan Shire",
    description:
      "Get in touch with The Himalayan Shire - book a stay, ask about availability, or reach us for directions and travel planning. Fagu, Shimla, Himachal Pradesh.",
    keywords: [
      "Himalayan Shire",
      "contact",
      "hotel contact Shimla",
      "Fagu Shimla contact",
      "booking inquiries Himachal Pradesh",
    ],
    openGraph: {
      title: "Contact The Himalayan Shire",
      description:
        "Get in touch with The Himalayan Shire - book a stay, ask about availability, or reach us for directions and travel planning.",
      type: "website",
      url: "https://www.thehimalayanshire.com/contact",
      images: ["/images/hero-1.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact The Himalayan Shire",
      description:
        "Get in touch with The Himalayan Shire - book a stay, ask about availability, or reach us for directions and travel planning.",
      images: ["/images/hero-1.jpg"],
    },
    alternates: { canonical: "/contact" },
  };
}

/**
 * Generates metadata for the FAQ page.
 */
export function faqMetadata(): Metadata {
  return {
    title: "FAQs | The Himalayan Shire",
    description:
      "Frequently asked questions about staying at The Himalayan Shire - room bookings, pet policy, amenities, location, and more. Fagu, Shimla, Himachal Pradesh.",
    keywords: [
      "Himalayan Shire",
      "FAQs",
      "frequently asked questions",
      "hotel FAQs Shimla",
      "Fagu accommodation questions",
      "Himachal Pradesh stay information",
    ],
    openGraph: {
      title: "FAQs | The Himalayan Shire",
      description:
        "Frequently asked questions about staying at The Himalayan Shire - room bookings, pet policy, amenities, location, and more.",
      type: "website",
      url: "https://www.thehimalayanshire.com/faq",
      images: ["/images/hero-1.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: "FAQs | The Himalayan Shire",
      description:
        "Frequently asked questions about staying at The Himalayan Shire - room bookings, pet policy, amenities, location, and more.",
      images: ["/images/hero-1.jpg"],
    },
    alternates: { canonical: "/faq" },
  };
}

/**
 * Generates metadata for the Activities page.
 */
export function activitiesMetadata(): Metadata {
  const description =
    "Things to do in Fagu, near Kufri and Shimla — mountain walks, apple orchards, snow experiences in season, bonfire evenings, and local Himalayan experiences around The Himalayan Shire.";
  return {
    title: "Experiences & Things to Do in Fagu | The Himalayan Shire",
    description,
    keywords: [
      "Himalayan Shire",
      "things to do in Fagu",
      "things to do near Kufri",
      "things to do near Shimla",
      "Fagu experiences",
      "mountain activities Himachal Pradesh",
      "apple orchards Fagu",
      "Himalayan experiences",
    ],
    openGraph: {
      title: "Experiences & Things to Do in Fagu | The Himalayan Shire",
      description,
      type: "website",
      url: "https://www.thehimalayanshire.com/activities",
      images: ["/images/hero-1.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Experiences & Things to Do in Fagu | The Himalayan Shire",
      description,
      images: ["/images/hero-1.jpg"],
    },
    alternates: { canonical: "/activities" },
  };
}

/**
 * Generates metadata for the Sustainability page.
 */
export function sustainabilityMetadata(): Metadata {
  return {
    title: "Sustainability | The Himalayan Shire",
    description:
      "We care for the mountains we call home. Here's how we tread lightly: waste segregation, recycling, and eco-friendly hospitality.",
    keywords: [
      "Himalayan Shire",
      "sustainability",
      "eco-friendly",
      "green hotel Shimla",
      "sustainable stay Himachal Pradesh",
      "environmental responsibility Fagu",
    ],
    openGraph: {
      title: "Sustainability | The Himalayan Shire",
      description:
        "We care for the mountains we call home. Here's how we tread lightly: waste segregation, recycling, and eco-friendly hospitality.",
      type: "website",
      url: "https://www.thehimalayanshire.com/sustainability",
      images: ["/sust/Sustainability1.jpeg"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sustainability | The Himalayan Shire",
      description:
        "We care for the mountains we call home. Here's how we tread lightly: waste segregation, recycling, and eco-friendly hospitality.",
      images: ["/sust/Sustainability1.jpeg"],
    },
    alternates: { canonical: "/sustainability" },
  };
}