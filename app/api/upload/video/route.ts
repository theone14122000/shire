import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "videos");

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

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    const url = `/videos/${filename}`;

    return NextResponse.json({ url, filename }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload video" },
      { status: 500 }
    );
  }
}
