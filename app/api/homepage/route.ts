import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export const maxDuration = 60;

export async function GET() {
  try {
    const sections = await prisma.homepageContent.findMany({
      orderBy: { section: "asc" },
    });

    const data: Record<string, any> = {};
    for (const section of sections) {
      try {
        data[section.section] = JSON.parse(section.data);
      } catch {
        data[section.section] = {};
      }
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({});
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    for (const [section, sectionData] of Object.entries(body)) {
      await prisma.homepageContent.upsert({
        where: { section },
        update: { data: JSON.stringify(sectionData) },
        create: { section, data: JSON.stringify(sectionData) },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update homepage";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}