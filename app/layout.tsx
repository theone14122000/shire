import type { Metadata } from "next";
import Script from "next/script";
import { Raleway } from "next/font/google";
import { prisma } from "@/lib/prisma";
import { BookClickTracker } from "./components/BookClickTracker";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway", // This injects the CSS variable --font-raleway
  // Only weights actually used on the site (400/500/600/700/800/900).
  // 100/200/300 were never requested — dropping them shrinks the font payload.
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thehimalayanshire.com"),
  title: "The Himalayan Shire | Luxury Boutique Homestay in Fagu, Near Shimla",
  description:
    "A premium boutique homestay in Fagu, near Kufri and Shimla. Seven spacious rooms and a private villa experience amid apple orchards, with Himalayan views at 7,500 ft.",
  keywords: [
    "The Himalayan Shire",
    "luxury homestay in Fagu",
    "homestay in Fagu",
    "luxury homestay near Shimla",
    "homestay near Shimla",
    "boutique homestay in Fagu",
    "premium homestay in Fagu",
    "premium stay near Shimla",
    "luxury stay in Fagu",
    "private villa near Shimla",
    "homestay near Kufri",
    "Fagu homestay",
    "Fagu homestay with Himalayan views",
    "offbeat homestay Shimla",
    "mountain retreat near Shimla",
    "Shimla cottage stay",
    "heritage homestay Himachal",
  ],
  authors: [{ name: "The Himalayan Shire" }],
  openGraph: {
    title: "The Himalayan Shire — Luxury Boutique Homestay in Fagu, Near Shimla",
    description:
      "A premium boutique homestay in Fagu, near Kufri and Shimla. Seven spacious rooms, a private villa experience, apple orchards, and Himalayan views.",
    type: "website",
    url: "https://www.thehimalayanshire.com/",
    images: ["/images/hero-1.jpg"],
    siteName: "The Himalayan Shire",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Himalayan Shire — Luxury Boutique Homestay in Fagu, Near Shimla",
    description:
      "A premium boutique homestay in Fagu, near Kufri and Shimla. Spacious rooms, private villa calm, and Himalayan views.",
    images: ["/images/hero-1.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/fav.jpg", type: "image/jpeg" }],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://www.thehimalayanshire.com/#business",
  name: "The Himalayan Shire",
  alternateName: "Himalayan Shire Homestay Fagu",
  description:
    "A premium boutique homestay in Fagu, near Kufri, a short drive from Shimla. Seven spacious rooms with a private-villa calm, apple orchards, and Himalayan views — a peaceful mountain retreat in Himachal Pradesh.",
  url: "https://www.thehimalayanshire.com/",
  telephone: "+918580411998",
  email: "himalayanshire@gmail.com",
  priceRange: "₹₹",
  image: "https://www.thehimalayanshire.com/images/hero-1.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dehna Road, near Talayi Village",
    addressLocality: "Fagu",
    addressRegion: "Himachal Pradesh",
    postalCode: "171209",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.066671,
    longitude: 77.309332,
  },
  sameAs: [
    "https://www.instagram.com/thehimalayanshire/?hl=en",
    "https://www.facebook.com/p/The-Himalayan-Shire-100089353303601/",
    "https://www.youtube.com/channel/UCtwdXgLf4WsFtloqPWL23kw",
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Mountain view", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "In-house kitchen", value: true },
    { "@type": "LocationFeatureSpecification", name: "Electric fireplace", value: true },
    { "@type": "LocationFeatureSpecification", name: "Lawn and orchard gardens", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "24/7 Hot water", value: true },
  ],
  containsPlace: {
    "@type": "TouristAttraction",
    name: "Kufri",
    url: "https://www.thehimalayanshire.com/activities",
  },
  author: {
    "@type": "Organization",
    name: "The Himalayan Shire",
    url: "https://www.thehimalayanshire.com/",
    logo: "https://www.thehimalayanshire.com/images/logo2.jpg",
  },
};

const HERO_IMAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "https://www.thehimalayanshire.com/images/hero-1.jpg",
  contentUrl: "https://www.thehimalayanshire.com/images/hero-1.jpg",
  name: "The Himalayan Shire — Mountain Homestay in Fagu, Near Shimla",
  description:
    "A family-run offbeat homestay in Fagu, near Kufri. Pine views, apple orchards, and seven heritage rooms at 7,500 ft.",
  caption: "The Himalayan Shire — Fagu, Himachal Pradesh",
  width: 1920,
  height: 1080,
  inLanguage: "en-IN",
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.thehimalayanshire.com/#website",
  name: "The Himalayan Shire",
  url: "https://www.thehimalayanshire.com/",
  description:
    "A premium boutique homestay in Fagu, near Kufri and Shimla, Himachal Pradesh — spacious rooms, private villa calm, and Himalayan views.",
  publisher: {
    "@type": "Organization",
    "@id": "https://www.thehimalayanshire.com/#business",
    name: "The Himalayan Shire",
    url: "https://www.thehimalayanshire.com/",
    logo: {
      "@type": "ImageObject",
      url: "https://www.thehimalayanshire.com/images/logo2.jpg",
    },
  },
  inLanguage: "en-IN",
};

async function getGtmId(): Promise<string | null> {
  try {
    const row = await prisma.setting.findUnique({ where: { key: "google_tag_manager_id" } });
    return row?.value?.trim() || process.env.NEXT_PUBLIC_GTM_ID?.trim() || null;
  } catch {
    return process.env.NEXT_PUBLIC_GTM_ID?.trim() || null;
  }
}

async function getGaId(): Promise<string | null> {
  try {
    const row = await prisma.setting.findUnique({ where: { key: "google_analytics_id" } });
    return row?.value?.trim() || process.env.NEXT_PUBLIC_GA4_ID?.trim() || null;
  } catch {
    return process.env.NEXT_PUBLIC_GA4_ID?.trim() || null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The two ID lookups are independent — run them in parallel so the
  // layout never pays for two sequential DB round-trips on every page.
  const [gtmId, gaId] = await Promise.all([getGtmId(), getGaId()]);

  return (
    <html lang="en" className={raleway.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HERO_IMAGE_JSONLD) }}
        />
        {/* Early connection setup for the only third-party hosts used on
            public pages. No preloads — just cheaper handshakes when the
            deferred scripts/widgets request them. */}
        <link rel="preconnect" href="https://elfsightcdn.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-forest-900 text-parchment/90 min-h-screen font-sans antialiased">
        {gtmId && (
          <>
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
            <Script
              id="gtm"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
              }}
            />
          </>
        )}
        {gaId && (
          <>
            <Script
              id="ga4"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`,
              }}
            />
          </>
        )}
        <BookClickTracker />
        {children}
      </body>
    </html>
  );
}
