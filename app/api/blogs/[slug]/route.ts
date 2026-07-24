import { NextRequest, NextResponse } from "next/server";
import { getBlogBySlug, updateBlog, deleteBlog } from "@/lib/blogs";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import type { BlogPostInput } from "@/lib/blog-types";

/* ------------------------------------------------------------------ */
/*  GET /api/blogs/[slug] — get a single blog post                     */
/* ------------------------------------------------------------------ */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

/* ------------------------------------------------------------------ */
/*  PUT /api/blogs/[slug] — update a blog post (admin only)            */
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

  try {
    const input: Partial<BlogPostInput> = await req.json();
    const updated = await updateBlog(slug, input);

    if (!updated) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update blog";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/* ------------------------------------------------------------------ */
/*  DELETE /api/blogs/[slug] — delete a blog post (admin only)         */
/* ------------------------------------------------------------------ */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const deleted = await deleteBlog(slug);

  if (!deleted) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
