// lib/room-images.ts
import { prisma } from "./prisma";
import { rooms } from "./rooms";

export interface RoomImageRecord {
  id: string;
  roomSlug: string;
  src: string;
  alt: string | null;
  caption: string | null;
  order: number;
  createdAt: string;
}

export function isRoomSlug(slug: string): boolean {
  return rooms.some((r) => r.slug === slug);
}

/** Get the admin-managed images for a room, ordered for display. */
export async function getRoomImageRows(slug: string): Promise<RoomImageRecord[]> {
  const rows = await prisma.roomImage.findMany({
    where: { roomSlug: slug },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  return rows.map((r) => ({
    id: r.id,
    roomSlug: r.roomSlug,
    src: r.src,
    alt: r.alt,
    caption: r.caption,
    order: r.order,
    createdAt: r.createdAt.toISOString(),
  }));
}

export interface PublicRoomImage {
  src: string;
  caption: string | null;
}

/**
 * Resolve the image list shown on the public room page.
 * Admin-managed images replace the defaults entirely; when none are
 * configured, the hardcoded set from lib/rooms.ts is used as a fallback.
 */
export async function getPublicRoomImages(slug: string): Promise<PublicRoomImage[]> {
  const rows = await getRoomImageRows(slug);
  if (rows.length > 0) {
    return rows.map((r) => ({ src: r.src, caption: r.caption }));
  }
  const room = rooms.find((r) => r.slug === slug);
  return (room?.images ?? []).map((src) => ({ src, caption: null }));
}

/** Get the number of default (hardcoded) images for a room. */
export function getDefaultRoomImageCount(slug: string): number {
  return rooms.find((r) => r.slug === slug)?.images.length ?? 0;
}

/** Append a new image to a room's managed set. */
export async function createRoomImage(
  slug: string,
  input: { src: string; alt?: string; caption?: string }
): Promise<RoomImageRecord> {
  if (!isRoomSlug(slug)) {
    throw new Error("Unknown room");
  }
  const max = await prisma.roomImage.aggregate({
    where: { roomSlug: slug },
    _max: { order: true },
  });
  const row = await prisma.roomImage.create({
    data: {
      roomSlug: slug,
      src: input.src,
      alt: input.alt ?? null,
      caption: input.caption ?? null,
      order: (max._max.order ?? -1) + 1,
    },
  });
  return {
    id: row.id,
    roomSlug: row.roomSlug,
    src: row.src,
    alt: row.alt,
    caption: row.caption,
    order: row.order,
    createdAt: row.createdAt.toISOString(),
  };
}

/** Update an existing room image. */
export async function updateRoomImage(
  id: string,
  input: { src?: string; alt?: string; caption?: string }
): Promise<RoomImageRecord | null> {
  const existing = await prisma.roomImage.findUnique({ where: { id } });
  if (!existing) return null;

  const row = await prisma.roomImage.update({
    where: { id },
    data: {
      src: input.src,
      alt: input.alt === undefined ? undefined : input.alt || null,
      caption: input.caption === undefined ? undefined : input.caption || null,
      updatedAt: new Date(),
    },
  });
  return {
    id: row.id,
    roomSlug: row.roomSlug,
    src: row.src,
    alt: row.alt,
    caption: row.caption,
    order: row.order,
    createdAt: row.createdAt.toISOString(),
  };
}

/** Delete a room image. */
export async function deleteRoomImage(id: string): Promise<boolean> {
  const existing = await prisma.roomImage.findUnique({ where: { id } });
  if (!existing) return false;
  await prisma.roomImage.delete({ where: { id } });
  return true;
}

/** Swap the display order of two images within the same room. */
export async function swapRoomImagesOrder(
  idA: string,
  idB: string
): Promise<boolean> {
  const [a, b] = await Promise.all([
    prisma.roomImage.findUnique({ where: { id: idA } }),
    prisma.roomImage.findUnique({ where: { id: idB } }),
  ]);
  if (!a || !b || a.roomSlug !== b.roomSlug) return false;

  await prisma.$transaction([
    prisma.roomImage.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.roomImage.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);
  return true;
}
