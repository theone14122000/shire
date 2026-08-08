import { NextRequest, NextResponse } from "next/server";
import {
  updateRoomImage,
  deleteRoomImage,
  swapRoomImagesOrder,
} from "@/lib/room-images";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

/* ------------------------------------------------------------------ */
/*  PUT /api/rooms/[slug]/images/[id] — update or reorder (admin only) */
/* ------------------------------------------------------------------ */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const input: { src?: string; alt?: string; caption?: string; swapWithId?: string } =
      await req.json();

    if (input.swapWithId) {
      const swapped = await swapRoomImagesOrder(id, input.swapWithId);
      if (!swapped) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    }

    const updated = await updateRoomImage(id, input);
    if (!updated) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update image";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/* ------------------------------------------------------------------ */
/*  DELETE /api/rooms/[slug]/images/[id] — remove an image (admin only)*/
/* ------------------------------------------------------------------ */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteRoomImage(id);
  if (!deleted) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
