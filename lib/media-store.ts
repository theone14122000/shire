// lib/media-store.ts
import { prisma } from "./prisma";

export interface StoredMedia {
  id: string;
  url: string;
}

/**
 * Convert any stored media URL to a relative path.
 * Absolute URLs bake in the deployment domain (e.g. a preview deployment
 * hostname),
 * which breaks the moment the domain changes. Relative paths work on
 * every domain and are treated as same-origin by the Next.js optimizer
 * (no remotePatterns entry needed, no 400s).
 */
export function normalizeMediaUrl(url: unknown): string {
  if (typeof url !== "string" || !url) return (url as string) ?? "";
  const m = url.match(/\/api\/media\/([A-Za-z0-9_-]+)/);
  if (m) return `/api/media/${m[1]}`;
  return url;
}

/**
 * Deep-walk any parsed JSON content and normalize every string value
 * that references /api/media/*. Safe to run on already-relative data.
 */
export function normalizeMediaUrlsInData<T>(data: T): T {
  if (typeof data === "string") {
    return normalizeMediaUrl(data) as T;
  }
  if (Array.isArray(data)) {
    return data.map((v) => normalizeMediaUrlsInData(v)) as T;
  }
  if (data && typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      out[k] = normalizeMediaUrlsInData(v);
    }
    return out as T;
  }
  return data;
}

/**
 * Persist an uploaded file's bytes in the database (durable on every
 * platform, including Vercel where the filesystem is read-only).
 * The returned URL is a relative path (/api/media/{id}) so it works
 * on every domain — localhost, previews, and production.
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
  const url = `/api/media/${id}`;
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