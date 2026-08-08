import { NextRequest, NextResponse } from "next/server";
import {
  getRoomImageRows,
  createRoomImage,
  isRoomSlug,
  getDefaultRoomImageCount,
} from "@/lib/room-images";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

/* ------------------------------------------------------------------ */
/*  GET /api/rooms/[slug]/images — managed images for a room (admin)   */
/* ------------------------------------------------------------------ */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!isRoomSlug(slug)) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }
  const images = await getRoomImageRows(slug);
  return NextResponse.json({ slug, images, defaultCount: getDefaultRoomImageCount(slug) });
}

/* ------------------------------------------------------------------ */
/*  POST /api/rooms/[slug]/images — add a room image (admin only)      */
/* ------------------------------------------------------------------ */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  if (!isRoomSlug(slug)) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  try {
    const input: { src?: string; alt?: string; caption?: string } = await req.json();
    const { src, alt, caption } = input;
    if (!src) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }
    const row = await createRoomImage(slug, { src, alt, caption });
    return NextResponse.json(row, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to add image";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
