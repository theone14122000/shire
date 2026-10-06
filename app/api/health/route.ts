import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const maxDuration = 60;

// Public health check. Deliberately returns only booleans and timings —
// DB host/port/name and raw error messages must never be exposed publicly.
export async function GET() {
  const checks: Record<string, { ok: boolean; ms?: number; items?: number }> = {};

  // Test A: raw SQL
  try {
    const t0 = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    checks.select1 = { ok: true, ms: Date.now() - t0 };
  } catch {
    checks.select1 = { ok: false };
  }

  // Test B: count
  try {
    const t0 = Date.now();
    await prisma.galleryItem.count();
    checks.galleryCount = { ok: true, ms: Date.now() - t0 };
  } catch {
    checks.galleryCount = { ok: false };
  }

  // Test C: findMany
  try {
    const t0 = Date.now();
    const items = await prisma.galleryItem.findMany({ take: 1 });
    checks.galleryFindMany = { ok: true, ms: Date.now() - t0, items: items.length };
  } catch {
    checks.galleryFindMany = { ok: false };
  }

  const allOk = Object.values(checks).every((check) => check.ok);

  return NextResponse.json(
    { ok: allOk, status: allOk ? "up" : "degraded", checks },
    { status: allOk ? 200 : 503 }
  );
}
