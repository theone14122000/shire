// lib/room-content.ts
import { prisma } from "./prisma";
import { rooms } from "./rooms";

export type Room = (typeof rooms)[number];

export type RoomContentInput = {
  name?: string;
  category?: string;
  size?: string;
  view?: string;
  floor?: string;
  description?: string;
  facilities?: string[];
};

export type RoomContentRow = RoomContentInput & {
  roomSlug: string;
};

function parseFacilities(raw: string | null | undefined): string[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const items = parsed.filter((i): i is string => typeof i === "string");
      return items.length > 0 ? items : null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getRoomContentRow(
  slug: string
): Promise<RoomContentRow | null> {
  const row = await prisma.roomContent.findUnique({
    where: { roomSlug: slug },
  });
  if (!row) return null;
  return {
    roomSlug: row.roomSlug,
    name: row.name ?? undefined,
    category: row.category ?? undefined,
    size: row.size ?? undefined,
    view: row.view ?? undefined,
    floor: row.floor ?? undefined,
    description: row.description ?? undefined,
    facilities: parseFacilities(row.facilities) ?? undefined,
  };
}

export async function getMergedRoom(slug: string): Promise<Room | null> {
  const base = rooms.find((r) => r.slug === slug);
  if (!base) return null;

  const row = await prisma.roomContent.findUnique({
    where: { roomSlug: slug },
  });
  if (!row) return base;

  const facilities = parseFacilities(row.facilities);

  return {
    ...base,
    name: row.name?.trim() ? row.name : base.name,
    category: row.category?.trim() ? row.category : base.category,
    size: row.size?.trim() ? row.size : base.size,
    view: row.view?.trim() ? row.view : base.view,
    floor: row.floor?.trim() ? row.floor : base.floor,
    description: row.description?.trim() ? row.description : base.description,
    facilities: facilities ?? base.facilities,
  };
}

export async function getMergedRooms(): Promise<Room[]> {
  const rows = await prisma.roomContent.findMany();
  const map = new Map(rows.map((r) => [r.roomSlug, r]));

  return rooms.map((base) => {
    const row = map.get(base.slug);
    if (!row) return base;
    const facilities = parseFacilities(row.facilities);
    return {
      ...base,
      name: row.name?.trim() ? row.name : base.name,
      category: row.category?.trim() ? row.category : base.category,
      size: row.size?.trim() ? row.size : base.size,
      view: row.view?.trim() ? row.view : base.view,
      floor: row.floor?.trim() ? row.floor : base.floor,
      description: row.description?.trim() ? row.description : base.description,
      facilities: facilities ?? base.facilities,
    };
  });
}

export async function saveRoomContent(
  slug: string,
  input: RoomContentInput
): Promise<RoomContentRow> {
  const data = {
    roomSlug: slug,
    name: input.name?.trim() ? input.name.trim() : null,
    category: input.category?.trim() ? input.category.trim() : null,
    size: input.size?.trim() ? input.size.trim() : null,
    view: input.view?.trim() ? input.view.trim() : null,
    floor: input.floor?.trim() ? input.floor.trim() : null,
    description: input.description?.trim() ? input.description.trim() : null,
    facilities:
      Array.isArray(input.facilities) && input.facilities.length > 0
        ? JSON.stringify(input.facilities.map((f) => f.trim()).filter(Boolean))
        : null,
  };

  await prisma.roomContent.upsert({
    where: { roomSlug: slug },
    update: data,
    create: data,
  });

  return {
    roomSlug: slug,
    name: data.name ?? undefined,
    category: data.category ?? undefined,
    size: data.size ?? undefined,
    view: data.view ?? undefined,
    floor: data.floor ?? undefined,
    description: data.description ?? undefined,
    facilities: data.facilities
      ? parseFacilities(data.facilities) ?? undefined
      : undefined,
  };
}
