import { NextRequest, NextResponse } from "next/server";
import { getAllGalleryItems, createGalleryItem } from "@/lib/gallery";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import type { GalleryItemInput } from "@/lib/gallery-types";

/* ------------------------------------------------------------------ */
/*  GET /api/gallery — list gallery items                              */
/* ------------------------------------------------------------------ */
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const includeHidden = token ? await verifyToken(token) : false;

  const items = await getAllGalleryItems(includeHidden);
  return NextResponse.json(items);
}

/* ------------------------------------------------------------------ */
/*  POST /api/gallery — create a gallery item (admin only)             */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const input: GalleryItemInput = await req.json();

    if (!input.title || !input.src) {
      return NextResponse.json(
        { error: "Title and image are required" },
        { status: 400 }
      );
    }

    const item = await createGalleryItem(input);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create gallery item";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
