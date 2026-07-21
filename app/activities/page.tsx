import type { Metadata } from "next";
import { TopBar } from "../components/TopBar";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { FloatingActions } from "../components/FloatingActions";
import { GalleryPageContent } from "../components/gallery/GalleryPageContent";

export const metadata: Metadata = {
  title: "Gallery | The Himalayan Shire",
  description:
    "Take a look inside The Himalayan Shire — winter views, common spaces, bonfire nights, and mountain sunrises.",
};

export default function GalleryPage() {
  return (
    <>
      <TopBar />
      <SiteNav />
      <main id="main" className="relative">
        <GalleryPageContent />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}