import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PUBLIC_KEYS = ["site_logo", "site_favicon"];

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await prisma.setting.findMany({
      where: { key: { in: PUBLIC_KEYS } },
    });
    const data: Record<string, string> = {};
    for (const row of rows) {
      data[row.key] = row.value;
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({});
  }
}