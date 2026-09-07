import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeMediaUrl } from "@/lib/media-store";

/**
 * GET /api/admin/migrate-media?key=<ADMIN_PASSWORD>
 *
 * One-time cleanup: rewrites every stored media reference from absolute
 * URLs (which bake in a deployment domain like shire-nu.vercel.app and
 * break on domain changes) to relative /api/media/{id} paths, which work
 * on every domain. Also reports media rows with missing blob data.
 *
 * Safe to run multiple times — already-relative values are untouched.
 */
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report: Record<string, number> = {};

  // media.url
  {
    const rows = await prisma.media.findMany({ select: { id: true, url: true } });
    let updated = 0;
    for (const row of rows) {
      const rel = normalizeMediaUrl(row.url);
      if (rel !== row.url) {
        await prisma.media.update({ where: { id: row.id }, data: { url: rel } });
        updated++;
      }
    }
    report.media = updated;
  }

  // gallery_items.src
  {
    const rows = await prisma.galleryItem.findMany({ select: { id: true, src: true } });
    let updated = 0;
    for (const row of rows) {
      const rel = normalizeMediaUrl(row.src);
      if (rel !== row.src) {
        await prisma.galleryItem.update({ where: { id: row.id }, data: { src: rel } });
        updated++;
      }
    }
    report.galleryItems = updated;
  }

  // room_images.src
  {
    const rows = await prisma.roomImage.findMany({ select: { id: true, src: true } });
    let updated = 0;
    for (const row of rows) {
      const rel = normalizeMediaUrl(row.src);
      if (rel !== row.src) {
        await prisma.roomImage.update({ where: { id: row.id }, data: { src: rel } });
        updated++;
      }
    }
    report.roomImages = updated;
  }

  // blogs.image + blogs.content (JSON blocks with src)
  {
    const rows = await prisma.blog.findMany({
      select: { id: true, image: true, content: true },
    });
    let updated = 0;
    for (const row of rows) {
      const data: Record<string, unknown> = {};
      let dirty = false;
      if (typeof row.image === "string") {
        const rel = normalizeMediaUrl(row.image);
        if (rel !== row.image) {
          data.image = rel;
          dirty = true;
        }
      }
      if (typeof row.content === "string" && row.content.includes("/api/media/")) {
        const fixed = row.content.replace(
          /https?:\/\/[^'"\\\s]*\/api\/media\//g,
          "/api/media/"
        );
        if (fixed !== row.content) {
          data.content = fixed;
          dirty = true;
        }
      }
      if (dirty) {
        await prisma.blog.update({ where: { id: row.id }, data });
        updated++;
      }
    }
    report.blogs = updated;
  }

  // homepage_content.data + page_content.data (raw JSON strings)
  {
    const rows = await prisma.homepageContent.findMany({
      select: { id: true, data: true },
    });
    let updated = 0;
    for (const row of rows) {
      if (row.data.includes("/api/media/")) {
        const fixed = row.data.replace(
          /https?:\/\/[^'"\\\s]*\/api\/media\//g,
          "/api/media/"
        );
        if (fixed !== row.data) {
          await prisma.homepageContent.update({
            where: { id: row.id },
            data: { data: fixed },
          });
          updated++;
        }
      }
    }
    report.homepageContent = updated;
  }
  {
    const rows = await prisma.pageContent.findMany({
      select: { id: true, data: true },
    });
    let updated = 0;
    for (const row of rows) {
      if (row.data.includes("/api/media/")) {
        const fixed = row.data.replace(
          /https?:\/\/[^'"\\\s]*\/api\/media\//g,
          "/api/media/"
        );
        if (fixed !== row.data) {
          await prisma.pageContent.update({
            where: { id: row.id },
            data: { data: fixed },
          });
          updated++;
        }
      }
    }
    report.pageContent = updated;
  }

  // testimonials.image
  {
    const rows = await prisma.testimonial.findMany({
      select: { id: true, image: true },
    });
    let updated = 0;
    for (const row of rows) {
      if (typeof row.image === "string") {
        const rel = normalizeMediaUrl(row.image);
        if (rel !== row.image) {
          await prisma.testimonial.update({
            where: { id: row.id },
            data: { image: rel },
          });
          updated++;
        }
      }
    }
    report.testimonials = updated;
  }

  // Rows whose image bytes are gone — these need re-upload, no URL fix can save them
  const orphaned = (await prisma.$queryRaw`
    SELECT id, url FROM media WHERE blobData IS NULL OR LENGTH(blobData) = 0
  `) as { id: string; url: string }[];

  const totalRewritten = Object.values(report).reduce((a, b) => a + b, 0);

  return NextResponse.json({
    rewritten: report,
    totalRewritten,
    orphanedCount: orphaned.length,
    orphaned: orphaned.map((r) => ({ id: r.id, url: r.url })),
    message:
      totalRewritten === 0 && orphaned.length === 0
        ? "All media URLs are already relative. Nothing to fix."
        : `Rewrote ${totalRewritten} references to relative paths. ${orphaned.length} media rows have no image data and need re-upload.`,
  });
}
