import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ------------------------------------------------------------------ */
/*  GET /api/media/[id] — stream a DB-stored upload (public)           */
/* ------------------------------------------------------------------ */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let row: { mimeType: string | null; blobData: Uint8Array | null } | null = null;
  try {
    row = await prisma.media.findUnique({
      where: { id },
      select: { mimeType: true, blobData: true },
    });
  } catch {
    row = null;
  }

  if (!row || !row.blobData || row.blobData.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const buffer = Buffer.from(row.blobData);
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": row.mimeType ?? "application/octet-stream",
      "Content-Length": String(buffer.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}