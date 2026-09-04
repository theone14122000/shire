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
      url: "https://shire-nu.vercel.app/contact",
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
      url: "https://shire-nu.vercel.app/faq",
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
  return {
    title: "Experiences | The Himalayan Shire",
    description:
      "From quiet corners on the property to peaks in the Himalayas - there is always something waiting for you.",
    keywords: [
      "Himalayan Shire",
      "activities",
      "things to do in Shimla",
      "premium experiences Shimla",
      "mountain activities Himachal Pradesh",
    ],
    openGraph: {
      title: "Experiences | The Himalayan Shire",
      description:
        "From quiet corners on the property to peaks in the Himalayas - there is always something waiting for you.",
      type: "website",
      url: "https://shire-nu.vercel.app/activities",
      images: ["/images/hero-1.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Experiences | The Himalayan Shire",
      description:
        "From quiet corners on the property to peaks in the Himalayas - there is always something waiting for you.",
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
      url: "https://shire-nu.vercel.app/sustainability",
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