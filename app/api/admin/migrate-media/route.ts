import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CANONICAL = "https://www.thehimalayanshire.com";

/**
 * GET /api/admin/migrate-media
 *
 * One-time migration: rewrites all media.url values to use the canonical
 * production domain. Also reports records with NULL blobData.
 *
 * Call once after deploying the domain fix. Safe to run multiple times.
 */
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const total = await prisma.media.count();

  // Update all URLs that don't already point to the canonical domain
  const updated = await prisma.$executeRaw`
    UPDATE media
    SET url = CONCAT(${CANONICAL}, '/api/media/', id)
    WHERE url NOT LIKE CONCAT(${CANONICAL}, '%')
  `;

  // Find records with NULL or empty blobData
  const orphaned = await prisma.$queryRaw`
    SELECT id, url FROM media WHERE blobData IS NULL OR LENGTH(blobData) = 0
  ` as { id: string; url: string }[];

  return NextResponse.json({
    total,
    updated,
    orphanedCount: orphaned.length,
    orphaned: orphaned.map((r) => ({ id: r.id, url: r.url })),
    message: `Updated ${updated} URLs. ${orphaned.length} records have no image data (need re-upload).`,
  });
}
