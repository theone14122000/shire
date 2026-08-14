import type { Metadata } from "next";
import Script from "next/script";
import { Raleway } from "next/font/google";
import { prisma } from "@/lib/prisma";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway", // This injects the CSS variable --font-raleway
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shire-nu.vercel.app"),
  title: "The Himalayan Shire | Offbeat Luxury Homestay in Fagu, Near Kufri & Shimla",
  description:
    "A family-run offbeat homestay in Fagu, near Kufri, a short drive from Shimla. Seven warm rooms, a private-villa calm, apple orchards, and pine views — one of the most loved luxury stays around Himachal.",
  keywords: [
    "The Himalayan Shire",
    "homestay in Fagu",
    "Fagu homestay",
    "homestay near Kufri",
    "Kufri homestay",
    "offbeat homestay Shimla",
    "offbeat homestay near Shimla",
    "private villa Shimla",
    "luxury stays in Shimla",
    "luxury homestay Shimla",
    "homestay in Shimla",
    "Shimla cottage stay",
    "Fagu Shimla stay",
    "heritage homestay Himachal",
    "heritage hospitality",
  ],
  authors: [{ name: "The Himalayan Shire" }],
  openGraph: {
    title: "The Himalayan Shire — Offbeat Luxury Homestay in Fagu, Near Kufri & Shimla",
    description:
      "A family-run offbeat homestay in Fagu, near Kufri and Shimla. Heritage rooms, warm hospitality, and a view that stays with you.",
    type: "website",
    url: "https://shire-nu.vercel.app/",
    images: ["/images/hero-1.jpg"],
    siteName: "The Himalayan Shire",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Himalayan Shire — Offbeat Luxury Homestay in Fagu, Near Kufri & Shimla",
    description:
      "A family-run offbeat homestay in Fagu, near Kufri and Shimla. Heritage rooms, warm hospitality, and a view that stays with you.",
    images: ["/images/hero-1.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://shire-nu.vercel.app/#business",
  name: "The Himalayan Shire",
  alternateName: "Himalayan Shire Homestay Fagu",
  description:
    "A family-run offbeat homestay in Fagu, near Kufri, a short drive from Shimla. Seven warm rooms with a private-villa calm — one of the most loved luxury stays around Shimla.",
  url: "https://shire-nu.vercel.app/",
  telephone: "+918580411998",
  email: "himalayanashire@gmail.com",
  priceRange: "₹₹",
  image: "https://shire-nu.vercel.app/images/hero-1.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fagu",
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
  containsPlace: {
    "@type": "TouristAttraction",
    name: "Kufri",
    url: "https://shire-nu.vercel.app/activities",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Mountain view", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "In-house kitchen", value: true },
    { "@type": "LocationFeatureSpecification", name: "Electric fireplace", value: true },
    { "@type": "LocationFeatureSpecification", name: "Lawn and orchard gardens", value: true },
  ],
};

async function getGtmId(): Promise<string | null> {
  try {
    const row = await prisma.setting.findUnique({ where: { key: "google_tag_manager_id" } });
    return row?.value?.trim() || process.env.NEXT_PUBLIC_GTM_ID?.trim() || null;
  } catch {
    return process.env.NEXT_PUBLIC_GTM_ID?.trim() || null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = await getGtmId();

  return (
    <html lang="en" className={raleway.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
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
        {children}
      </body>
    </html>
  );
}
