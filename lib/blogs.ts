import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { BlogPost, BlogPostInput, BlogListItem } from "./blog-types";

const DATA_DIR = path.join(process.cwd(), "data");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");

/* ------------------------------------------------------------------ */
/*  Ensure data directory exists                                        */
/* ------------------------------------------------------------------ */
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

/* ------------------------------------------------------------------ */
/*  Read / Write                                                       */
/* ------------------------------------------------------------------ */
async function readBlogs(): Promise<BlogPost[]> {
  await ensureDataDir();
  try {
    const raw = await readFile(BLOGS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeBlogs(blogs: BlogPost[]): Promise<void> {
  await ensureDataDir();
  await writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), "utf-8");
}

/* ------------------------------------------------------------------ */
/*  CRUD operations                                                    */
/* ------------------------------------------------------------------ */

/** Get all blog list items (summary, no content) */
export async function getAllBlogs(
  includeDrafts = false
): Promise<BlogListItem[]> {
  const blogs = await readBlogs();
  return blogs
    .filter((b) => includeDrafts || b.status === "published")
    .map(({ content: _content, ...rest }) => rest)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

/** Get a single blog post by slug */
export async function getBlogBySlug(
  slug: string
): Promise<BlogPost | null> {
  const blogs = await readBlogs();
  return blogs.find((b) => b.slug === slug) || null;
}

/** Create a new blog post */
export async function createBlog(
  input: BlogPostInput
): Promise<BlogPost> {
  const blogs = await readBlogs();

  // Check slug uniqueness
  const slug = input.slug || generateSlug(input.title);
  if (blogs.some((b) => b.slug === slug)) {
    throw new Error(`A blog with slug "${slug}" already exists`);
  }

  const now = new Date().toISOString();
  const post: BlogPost = {
    ...input,
    slug,
    createdAt: now,
    updatedAt: now,
  };

  blogs.push(post);
  await writeBlogs(blogs);
  return post;
}

/** Update an existing blog post */
export async function updateBlog(
  slug: string,
  input: Partial<BlogPostInput>
): Promise<BlogPost | null> {
  const blogs = await readBlogs();
  const idx = blogs.findIndex((b) => b.slug === slug);
  if (idx === -1) return null;

  // If slug is changing, check uniqueness
  if (input.slug && input.slug !== slug) {
    if (blogs.some((b) => b.slug === input.slug)) {
      throw new Error(`A blog with slug "${input.slug}" already exists`);
    }
  }

  const updated: BlogPost = {
    ...blogs[idx],
    ...input,
    slug: input.slug || slug,
    updatedAt: new Date().toISOString(),
  };

  blogs[idx] = updated;
  await writeBlogs(blogs);
  return updated;
}

/** Delete a blog post */
export async function deleteBlog(slug: string): Promise<boolean> {
  const blogs = await readBlogs();
  const idx = blogs.findIndex((b) => b.slug === slug);
  if (idx === -1) return false;

  blogs.splice(idx, 1);
  await writeBlogs(blogs);
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
