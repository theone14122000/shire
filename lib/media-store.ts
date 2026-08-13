// lib/media-store.ts
import { prisma } from "./prisma";

export interface StoredMedia {
  id: string;
  url: string;
}

/**
 * Persist an uploaded file's bytes in the database (durable on every
 * platform, including Vercel where the filesystem is read-only).
 * The returned URL is an absolute, publicly streamable URL.
 */
export async function saveMedia(input: {
  buffer: Buffer;
  mimeType: string;
  size: number;
  alt?: string;
  category?: string;
  origin: string;
}): Promise<StoredMedia> {
  const id = crypto.randomUUID();
  const url = `${input.origin}/api/media/${id}`;
  await prisma.media.create({
    data: {
      id,
      url,
      alt: input.alt ?? null,
      category: input.category ?? null,
      size: input.size,
      mimeType: input.mimeType,
      blobData: new Uint8Array(input.buffer),
    },
  });
  return { id, url };
}