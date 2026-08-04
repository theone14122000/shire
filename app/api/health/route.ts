import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const maxDuration = 60;

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, db: "connected" });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        db: "error",
        message: err instanceof Error ? err.message : "unknown error",
      },
      { status: 503 }
    );
  }
}
