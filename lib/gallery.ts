import { prisma } from "./prisma";
import type { GalleryItem, GalleryItemInput } from "./gallery-types";

/* ------------------------------------------------------------------ */
/*  CRUD operations                                                    */
/* ------------------------------------------------------------------ */

/** Get all gallery items (summary order ascending) */
export async function getAllGalleryItems(
  includeHidden = false
): Promise<GalleryItem[]> {
  const items = await prisma.galleryItem.findMany({
    where: includeHidden ? undefined : { status: "published" },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return items.map((i) => ({
    id: i.id,
    title: i.title,
    caption: i.caption ?? undefined,
    category: i.category,
    alt: i.alt ?? undefined,
    src: i.src,
    order: i.order,
    status: (i.status as "published" | "hidden") ?? "published",
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }));
}

/** Get a single gallery item by id */
export async function getGalleryItemById(
  id: string
): Promise<GalleryItem | null> {
  const item = await prisma.galleryItem.findUnique({
    where: { id },
  });

  if (!item) return null;

  return {
    id: item.id,
    title: item.title,
    caption: item.caption ?? undefined,
    category: item.category,
    alt: item.alt ?? undefined,
    src: item.src,
    order: item.order,
    status: (item.status as "published" | "hidden") ?? "published",
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

/** Get the next display order value for new items */
async function nextOrder(): Promise<number> {
  const max = await prisma.galleryItem.aggregate({
    _max: { order: true },
  });
  return (max._max.order ?? -1) + 1;
}

/** Create a new gallery item */
export async function createGalleryItem(
  input: GalleryItemInput
): Promise<GalleryItem> {
  if (!input.title || !input.src) {
    throw new Error("Title and image are required");
  }

  const existing = await prisma.galleryItem.findUnique({
    where: { src: input.src },
  });
  if (existing) {
    throw new Error(`A gallery item with this image already exists`);
  }

  const item = await prisma.galleryItem.create({
    data: {
      title: input.title,
      caption: input.caption ?? null,
      category: input.category || "Common Spaces",
      alt: input.alt ?? null,
      src: input.src,
      order:
        typeof input.order === "number" ? input.order : await nextOrder(),
      status: (input.status || "published") as string,
    },
  });

  return {
    id: item.id,
    title: item.title,
    caption: item.caption ?? undefined,
    category: item.category,
    alt: item.alt ?? undefined,
    src: item.src,
    order: item.order,
    status: (item.status as "published" | "hidden") ?? "published",
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

/** Update an existing gallery item */
export async function updateGalleryItem(
  id: string,
  input: Partial<GalleryItemInput>
): Promise<GalleryItem | null> {
  const existing = await prisma.galleryItem.findUnique({
    where: { id },
  });
  if (!existing) return null;

  if (input.src && input.src !== existing.src) {
    const srcExists = await prisma.galleryItem.findUnique({
      where: { src: input.src },
    });
    if (srcExists) {
      throw new Error(`A gallery item with this image already exists`);
    }
  }

  const updated = await prisma.galleryItem.update({
    where: { id },
    data: {
      title: input.title,
      caption: input.caption === undefined ? undefined : input.caption ?? null,
      category: input.category,
      alt: input.alt === undefined ? undefined : input.alt ?? null,
      src: input.src,
      order: input.order,
      status: input.status as string | undefined,
      updatedAt: new Date(),
    },
  });

  return {
    id: updated.id,
    title: updated.title,
    caption: updated.caption ?? undefined,
    category: updated.category,
    alt: updated.alt ?? undefined,
    src: updated.src,
    order: updated.order,
    status: (updated.status as "published" | "hidden") ?? "published",
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}

/** Delete a gallery item */
export async function deleteGalleryItem(id: string): Promise<boolean> {
  const item = await prisma.galleryItem.findUnique({
    where: { id },
  });
  if (!item) return false;

  await prisma.galleryItem.delete({ where: { id } });
  return true;
}

/** Swap the display order of two gallery items */
export async function swapGalleryOrder(
  idA: string,
  idB: string
): Promise<boolean> {
  const [a, b] = await Promise.all([
    prisma.galleryItem.findUnique({ where: { id: idA } }),
    prisma.galleryItem.findUnique({ where: { id: idB } }),
  ]);
  if (!a || !b) return false;

  await prisma.$transaction([
    prisma.galleryItem.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.galleryItem.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);
  return true;
}

/** Get published gallery items for the public pages */
export async function getPublishedGalleryItems(): Promise<GalleryItem[]> {
  return getAllGalleryItems(false);
}

/* ------------------------------------------------------------------ */
/*  Helpers (shared with the public gallery page fallback + seeding)   */
/* ------------------------------------------------------------------ */

export function titleFromFile(file: string): string {
  const name = file.replace(/\.[^.]+$/, "").replace(/-\d+$/, "");
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function categoryFromFile(file: string): string {
  const lower = file.toLowerCase();
  if (/(view|snow|winter|sunrise|mesmerizing|greenery|enchant)/.test(lower)) return "Views";
  if (/(bonfire|lawn|outdoor)/.test(lower)) return "Outdoor";
  if (/(dining|decor|tv|lounge|himachali|games|kitchen)/.test(lower)) return "Interiors";
  return "Common Spaces";
}
