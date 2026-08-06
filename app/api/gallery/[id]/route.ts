import { NextRequest, NextResponse } from "next/server";
import {
  getGalleryItemById,
  updateGalleryItem,
  deleteGalleryItem,
  swapGalleryOrder,
} from "@/lib/gallery";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import type { GalleryItemInput } from "@/lib/gallery-types";

/* ------------------------------------------------------------------ */
/*  GET /api/gallery/[id] — single gallery item                        */
/* ------------------------------------------------------------------ */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getGalleryItemById(id);
  if (!item) return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
  return NextResponse.json(item);
}

/* ------------------------------------------------------------------ */
/*  PUT /api/gallery/[id] — update a gallery item (admin only)         */
/* ------------------------------------------------------------------ */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const input: Partial<GalleryItemInput> & { swapWithId?: string } =
      await req.json();

    if (input.swapWithId) {
      const swapped = await swapGalleryOrder(id, input.swapWithId);
      if (!swapped) {
        return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
      }
      const item = await getGalleryItemById(id);
      return NextResponse.json(item);
    }

    const updated = await updateGalleryItem(id, input);
    if (!updated) return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update gallery item";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/* ------------------------------------------------------------------ */
/*  DELETE /api/gallery/[id] — delete a gallery item (admin only)      */
/* ------------------------------------------------------------------ */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteGalleryItem(id);
  if (!deleted) return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
