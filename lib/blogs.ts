import { prisma } from "./prisma";
import { readFile } from "fs/promises";
import path from "path";
import type { BlogPost, BlogPostInput, BlogListItem } from "./blog-types";

const LEGACY_BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

function normalizeStatus(status: unknown): "draft" | "published" {
  return String(status).toLowerCase() === "published" ? "published" : "draft";
}

function toPrismaStatus(status: unknown): "DRAFT" | "PUBLISHED" {
  return normalizeStatus(status) === "published" ? "PUBLISHED" : "DRAFT";
}

function normalizePost(post: any): BlogPost {
  return {
    ...post,
    content: Array.isArray(post.content)
      ? post.content
      : JSON.parse(post.content ?? "[]"),
    status: normalizeStatus(post.status),
    date: post.date ?? "",
    readTime: post.readTime ?? "",
    excerpt: post.excerpt ?? "",
    image: post.image ?? "",
    tag: post.tag ?? "",
    createdAt:
      post.createdAt instanceof Date ? post.createdAt.toISOString() : post.createdAt ?? "",
    updatedAt:
      post.updatedAt instanceof Date ? post.updatedAt.toISOString() : post.updatedAt ?? "",
    description: post.description ?? undefined,
    category: post.category ?? undefined,
    tags: post.tags ?? undefined,
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
    publishedAt:
      post.publishedAt instanceof Date
        ? post.publishedAt.toISOString()
        : post.publishedAt ?? undefined,
  };
}

function toListItem(post: BlogPost): BlogListItem {
  const { content: _content, ...rest } = post;
  return rest;
}

async function getLegacyBlogs(): Promise<BlogPost[]> {
  try {
    const raw = await readFile(LEGACY_BLOGS_FILE, "utf-8");
    const posts = JSON.parse(raw);
    if (!Array.isArray(posts)) return [];
    return posts.map(normalizePost);
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  CRUD operations                                                    */
/* ------------------------------------------------------------------ */

/** Get all blog list items (summary, no content) */
export async function getAllBlogs(
  includeDrafts = false
): Promise<BlogListItem[]> {
  const legacy = await getLegacyBlogs();
  let dbPosts: BlogPost[] = [];

  try {
    const blogs = await prisma.blog.findMany({
      where: includeDrafts ? undefined : { status: "PUBLISHED" },
      orderBy: { updatedAt: "desc" },
    });
    dbPosts = blogs.map(normalizePost);
  } catch {
    dbPosts = [];
  }

  const merged = new Map<string, BlogPost>();
  for (const post of legacy) merged.set(post.slug, post);
  for (const post of dbPosts) merged.set(post.slug, post);

  return Array.from(merged.values())
    .filter((post) => includeDrafts || post.status === "published")
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
    )
    .map(toListItem);
}

/** Get a single blog post by slug */
export async function getBlogBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const blog = await prisma.blog.findUnique({ where: { slug } });
    if (blog) return normalizePost(blog);
  } catch {
    // Fall back to the legacy JSON content below.
  }

  const legacy = await getLegacyBlogs();
  return legacy.find((post) => post.slug === slug) ?? null;
}

/** Create a new blog post */
export async function createBlog(
  input: BlogPostInput
): Promise<BlogPost> {
  const slug = input.slug || generateSlug(input.title);

  const existing = await prisma.blog.findUnique({
    where: { slug },
  });
  if (existing) {
    throw new Error(`A blog with slug "${slug}" already exists`);
  }

  const now = new Date().toISOString();
  const post = await prisma.blog.create({
    data: {
      ...input,
      slug,
      content: JSON.stringify(input.content || []),
      status: toPrismaStatus(input.status),
      createdAt: now,
      updatedAt: now,
    },
  });

  return normalizePost(post);
}

/** Update an existing blog post */
export async function updateBlog(
  slug: string,
  input: Partial<BlogPostInput>
): Promise<BlogPost | null> {
  const existing = await prisma.blog.findUnique({
    where: { slug },
  });
  if (!existing) return null;

  if (input.slug && input.slug !== slug) {
    const slugExists = await prisma.blog.findUnique({
      where: { slug: input.slug },
    });
    if (slugExists) {
      throw new Error(`A blog with slug "${input.slug}" already exists`);
    }
  }

  const updated = await prisma.blog.update({
    where: { slug },
    data: {
      ...input,
      slug: input.slug || slug,
      content: input.content
        ? JSON.stringify(input.content)
        : undefined,
      status: input.status ? toPrismaStatus(input.status) : undefined,
      updatedAt: new Date().toISOString(),
    },
  });

  return normalizePost(updated);
}

/** Delete a blog post */
export async function deleteBlog(slug: string): Promise<boolean> {
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });
  if (!blog) return false;

  await prisma.blog.delete({ where: { slug } });
  return true;
}

/** Get published blogs for the public listing */
export async function getPublishedBlogs(): Promise<BlogListItem[]> {
  return getAllBlogs(false);
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
