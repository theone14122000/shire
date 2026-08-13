import { NextRequest, NextResponse } from "next/server";
import { saveMedia } from "@/lib/media-store";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const ALLOWED_TYPES: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogv",
  "video/quicktime": "mov",
};

/* ------------------------------------------------------------------ */
/*  POST /api/upload/video — upload a hero video (admin only)          */
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

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: MP4, WebM, OGG, MOV" },
        { status: 400 }
      );
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 50MB" },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const stored = await saveMedia({
      buffer: bytes,
      mimeType: file.type,
      size: file.size,
      alt: file.name,
      category: "videos",
      origin: new URL(req.url).origin,
    });

    return NextResponse.json({ url: stored.url, filename: stored.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload video" },
      { status: 500 }
    );
  }
}