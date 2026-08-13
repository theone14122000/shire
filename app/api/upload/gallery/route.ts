import { NextRequest, NextResponse } from "next/server";
import { saveMedia } from "@/lib/media-store";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

/* ------------------------------------------------------------------ */
/*  POST /api/upload/gallery — upload a gallery image (admin only)     */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 5MB" },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const stored = await saveMedia({
      buffer: bytes,
      mimeType: file.type,
      size: file.size,
      alt: file.name,
      category: "gallery",
      origin: new URL(req.url).origin,
    });

    return NextResponse.json({ url: stored.url, filename: stored.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}