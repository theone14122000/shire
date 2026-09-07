// lib/page-content.ts
import { prisma } from "./prisma";
import { normalizeMediaUrlsInData } from "./media-store";

const ALLOWED_KEYS = ["activities", "sustainability"];

export function isPageKey(key: string): boolean {
  return ALLOWED_KEYS.includes(key);
}

export async function getPageContent(
  key: string
): Promise<Record<string, unknown> | null> {
  const row = await prisma.pageContent.findUnique({
    where: { pageKey: key },
  });
  if (!row) return null;
  try {
    const parsed = JSON.parse(row.data);
    return parsed && typeof parsed === "object"
      ? normalizeMediaUrlsInData(parsed)
      : null;
  } catch {
    return null;
  }
}

export async function savePageContent(
  key: string,
  data: Record<string, unknown>
): Promise<void> {
  const normalized = normalizeMediaUrlsInData(data);
  await prisma.pageContent.upsert({
    where: { pageKey: key },
    update: { data: JSON.stringify(normalized) },
    create: { pageKey: key, data: JSON.stringify(normalized) },
  });
}
