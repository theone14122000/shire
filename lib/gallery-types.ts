/* ------------------------------------------------------------------ */
/*  Gallery types — shared between API, admin, and frontend            */
/* ------------------------------------------------------------------ */

export const GALLERY_CATEGORIES = [
  "Views",
  "Common Spaces",
  "Outdoor",
  "Interiors",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  category: GalleryCategory | string;
  alt?: string;
  src: string;
  order: number;
  status: "published" | "hidden";
  createdAt: string;
  updatedAt: string;
}

export type GalleryItemInput = Omit<
  GalleryItem,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
  status?: "published" | "hidden";
};
