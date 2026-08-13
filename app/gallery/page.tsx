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
    "Take a look inside The Himalayan Shire — winter views, common spaces, bonfire nights, and mountain sunrises.",
};

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();
  const content = await getHomepageSections();
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