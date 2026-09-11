import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { FloatingActions } from "../components/FloatingActions";
import { GalleryPageContent } from "../components/gallery/GalleryPageContent";
import { getPublishedGalleryItems } from "@/lib/gallery";
import { getHomepageSections } from "@/lib/homepage-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | The Himalayan Shire",
  description:
    "Photos of The Himalayan Shire — premium rooms, apple orchards, mountain sunrises, bonfire nights, and common spaces at our Fagu homestay near Shimla.",
  keywords: [
    "Himalayan Shire gallery",
    "Fagu homestay photos",
    "Shimla homestay images",
    "homestay rooms photos Himachal",
  ],
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | The Himalayan Shire",
    description:
      "Take a look inside The Himalayan Shire — winter views, common spaces, bonfire nights, and mountain sunrises.",
    type: "website",
    url: "https://www.thehimalayanshire.com/gallery",
    images: ["/images/hero-1.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | The Himalayan Shire",
    description:
      "Take a look inside The Himalayan Shire — winter views, common spaces, bonfire nights, and mountain sunrises.",
    images: ["/images/hero-1.jpg"],
  },
};

export default async function GalleryPage() {
  // Independent queries — fetch in parallel. Same data, lower TTFB.
  const [items, content] = await Promise.all([
    getPublishedGalleryItems(),
    getHomepageSections(),
  ]);
  const heroImage =
    typeof content?.gallery?.heroImage === "string"
      ? content.gallery.heroImage
      : undefined;

  return (
    <>
      <SiteNav />
      <main id="main" className="relative">
        <GalleryPageContent items={items} heroImage={heroImage} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}