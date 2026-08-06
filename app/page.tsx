import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { FloatingActions } from "./components/FloatingActions";
import { Hero } from "./components/home/Hero";
import { HomeEditorial } from "./components/home/HomeEditorial";
import { getHomepageSections } from "@/lib/homepage-content";
import { getPublishedGalleryItems } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getHomepageSections();
  const galleryItems = await getPublishedGalleryItems();
  const galleryFrames = galleryItems.slice(0, 4).map((item) => ({
    title: item.title,
    src: item.src,
  }));

  return (
    <>
      <SiteNav />
      <main id="main" className="relative">
        <Hero content={content} />
        <HomeEditorial content={content} galleryFrames={galleryFrames} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
