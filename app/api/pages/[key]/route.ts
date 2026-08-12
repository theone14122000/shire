import { NextRequest, NextResponse } from "next/server";
import {
  isPageKey,
  getPageContent,
  savePageContent,
} from "@/lib/page-content";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

/* ------------------------------------------------------------------ */
/*  GET /api/pages/[key] — saved page content (public for page build)  */
/* ------------------------------------------------------------------ */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  if (!isPageKey(key)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  }
  const data = await getPageContent(key);
  return NextResponse.json({ key, data });
}

/* ------------------------------------------------------------------ */
/*  PUT /api/pages/[key] — save page content (admin only)              */
/* ------------------------------------------------------------------ */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key } = await params;
  if (!isPageKey(key)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }
    await savePageContent(key, body);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save page content";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
