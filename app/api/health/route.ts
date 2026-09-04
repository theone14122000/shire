import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const maxDuration = 60;

export async function GET() {
  const url = process.env.DATABASE_URL;
  const parsed = url ? new URL(url) : null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const diagnostics: Record<string, any> = {
    host: parsed?.hostname,
    port: parsed?.port,
    database: parsed?.pathname?.slice(1),
    hasConnectionLimit: url?.includes("connection_limit") ?? false,
    clientVersion: "6.19.3",
  };

  // Test A: raw SQL
  try {
    const t0 = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    diagnostics.select1 = { ok: true, ms: Date.now() - t0 };
  } catch (err) {
    diagnostics.select1 = {
      ok: false,
      message: err instanceof Error ? err.message : "unknown",
    };
  }

  // Test B: count
  try {
    const t0 = Date.now();
    const count = await prisma.galleryItem.count();
    diagnostics.galleryCount = { ok: true, count, ms: Date.now() - t0 };
  } catch (err) {
    diagnostics.galleryCount = {
      ok: false,
      message: err instanceof Error ? err.message : "unknown",
    };
  }

  // Test C: findMany
  try {
    const t0 = Date.now();
    const items = await prisma.galleryItem.findMany({ take: 1 });
    diagnostics.galleryFindMany = {
      ok: true,
      count: items.length,
      ms: Date.now() - t0,
    };
  } catch (err) {
    diagnostics.galleryFindMany = {
      ok: false,
      message: err instanceof Error ? err.message : "unknown",
    };
  }

  const allOk =
    diagnostics.select1?.ok &&
    diagnostics.galleryCount?.ok &&
    diagnostics.galleryFindMany?.ok;

  return NextResponse.json(
    { ok: allOk, ...diagnostics },
    { status: allOk ? 200 : 503 }
  );
}
