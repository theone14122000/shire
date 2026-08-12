import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "activities");

/* ------------------------------------------------------------------ */
/*  POST /api/upload/activity — upload an activities image (admin only)*/
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

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 5MB" },
        { status: 400 }
      );
    }

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    const url = `/uploads/activities/${filename}`;

    try {
      await prisma.media.create({
        data: {
          url,
          alt: file.name,
          category: "activities",
          size: file.size,
          mimeType: file.type,
        },
      });
    } catch {
      // Media row is a convenience — never fail the upload over it
    }

    return NextResponse.json({ url, filename }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}