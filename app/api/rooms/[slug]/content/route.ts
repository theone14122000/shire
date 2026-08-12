import { NextRequest, NextResponse } from "next/server";
import {
  getRoomContentRow,
  saveRoomContent,
  type RoomContentInput,
} from "@/lib/room-content";
import { isRoomSlug } from "@/lib/room-images";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

/* ------------------------------------------------------------------ */
/*  GET /api/rooms/[slug]/content — saved room details (admin editor)  */
/* ------------------------------------------------------------------ */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!isRoomSlug(slug)) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }
  const content = await getRoomContentRow(slug);
  return NextResponse.json({ slug, content });
}

/* ------------------------------------------------------------------ */
/*  PUT /api/rooms/[slug]/content — save room details (admin only)     */
/* ------------------------------------------------------------------ */
export async function PUT(
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
    const input = (await req.json()) as RoomContentInput;
    if (input.facilities !== undefined && !Array.isArray(input.facilities)) {
      return NextResponse.json(
        { error: "facilities must be a list of strings" },
        { status: 400 }
      );
    }
    const saved = await saveRoomContent(slug, input);
    return NextResponse.json({ success: true, content: saved });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save room details";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
