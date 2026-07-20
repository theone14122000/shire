import type { Metadata } from "next";
import { GalleryPageContent } from "@/app/components/gallery/GalleryPageContent";

export const metadata: Metadata = {
  title: "Gallery | The Himalayan Shire",
  description:
    "Take a look inside The Himalayan Shire — winter views, common spaces, bonfire nights, and mountain sunrises.",
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}