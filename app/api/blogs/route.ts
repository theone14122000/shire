import { NextRequest, NextResponse } from "next/server";
import { getAllBlogs, createBlog } from "@/lib/blogs";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import type { BlogPostInput } from "@/lib/blog-types";

/* ------------------------------------------------------------------ */
/*  GET /api/blogs — list all blog posts                               */
/* ------------------------------------------------------------------ */
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const includeDrafts = token ? await verifyToken(token) : false;

  const blogs = await getAllBlogs(includeDrafts);
  return NextResponse.json(blogs);
}

/* ------------------------------------------------------------------ */
/*  POST /api/blogs — create a new blog post (admin only)              */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const input: BlogPostInput = await req.json();

    if (!input.title || !input.author) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      );
    }

    const post = await createBlog(input);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create blog";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
