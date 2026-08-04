import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { getHomepageSections } from "@/lib/homepage-content";

export const maxDuration = 60;

export async function GET() {
  const data = await getHomepageSections();
  return NextResponse.json(data);
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