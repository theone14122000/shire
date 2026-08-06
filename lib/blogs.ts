import { prisma } from "./prisma";
import type { BlogPost, BlogPostInput, BlogListItem } from "./blog-types";

/* ------------------------------------------------------------------ */
/*  CRUD operations                                                    */
/* ------------------------------------------------------------------ */

/** Get all blog list items (summary, no content) */
export async function getAllBlogs(
  includeDrafts = false
): Promise<BlogListItem[]> {
  const blogs = await prisma.blog.findMany({
    where: includeDrafts ? undefined : { status: "PUBLISHED" },
    select: {
      id: true,
      slug: true,
      title: true,
      author: true,
      date: true,
      readTime: true,
      excerpt: true,
      image: true,
      tag: true,
      featured: true,
      status: true,
      description: true,
      category: true,
      tags: true,
      seoTitle: true,
      seoDescription: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return blogs.map((b) => ({
    ...b,
    status: b.status as "draft" | "published",
    date: b.date ?? "",
    readTime: b.readTime ?? "",
    excerpt: b.excerpt ?? "",
    image: b.image ?? "",
    tag: b.tag ?? "",
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    description: b.description ?? undefined,
    category: b.category ?? undefined,
    tags: b.tags ?? undefined,
    seoTitle: b.seoTitle ?? undefined,
    seoDescription: b.seoDescription ?? undefined,
    publishedAt: b.publishedAt?.toISOString(),
  }));
}

/** Get a single blog post by slug */
export async function getBlogBySlug(
  slug: string
): Promise<BlogPost | null> {
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) return null;

  return {
    ...blog,
    content: JSON.parse(blog.content ?? "[]"),
    status: blog.status as "draft" | "published",
    date: blog.date ?? "",
    readTime: blog.readTime ?? "",
    excerpt: blog.excerpt ?? "",
    image: blog.image ?? "",
    tag: blog.tag ?? "",
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
    description: blog.description ?? undefined,
    category: blog.category ?? undefined,
    tags: blog.tags ?? undefined,
    seoTitle: blog.seoTitle ?? undefined,
    seoDescription: blog.seoDescription ?? undefined,
    publishedAt: blog.publishedAt?.toISOString(),
  };
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
      status: (input.status || "DRAFT") as any,
      createdAt: now,
      updatedAt: now,
    },
  });

  return {
    ...post,
    content: JSON.parse(post.content ?? "[]"),
    status: post.status as "draft" | "published",
    date: post.date ?? "",
    readTime: post.readTime ?? "",
    excerpt: post.excerpt ?? "",
    image: post.image ?? "",
    tag: post.tag ?? "",
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    description: post.description ?? undefined,
    category: post.category ?? undefined,
    tags: post.tags ?? undefined,
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
    publishedAt: post.publishedAt?.toISOString(),
  };
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
      status: input.status ? (input.status as any) : undefined,
      updatedAt: new Date().toISOString(),
    },
  });

  return {
    ...updated,
    content: JSON.parse(updated.content ?? "[]"),
    status: updated.status as "draft" | "published",
    date: updated.date ?? "",
    readTime: updated.readTime ?? "",
    excerpt: updated.excerpt ?? "",
    image: updated.image ?? "",
    tag: updated.tag ?? "",
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
    description: updated.description ?? undefined,
    category: updated.category ?? undefined,
    tags: updated.tags ?? undefined,
    seoTitle: updated.seoTitle ?? undefined,
    seoDescription: updated.seoDescription ?? undefined,
    publishedAt: updated.publishedAt?.toISOString(),
  };
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