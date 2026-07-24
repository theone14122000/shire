/* ------------------------------------------------------------------ */
/*  Blog post types — shared between API, admin, and frontend          */
/* ------------------------------------------------------------------ */

export interface BlogSection {
  id: string;
  type: "paragraph" | "heading" | "image" | "youtube";
  text?: string;
  level?: 2 | 3;
  src?: string;
  alt?: string;
  videoId?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  tag: string;
  featured: boolean;
  content: BlogSection[];
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export type BlogPostInput = Omit<
  BlogPost,
  "slug" | "createdAt" | "updatedAt"
> & {
  slug?: string;
};

export interface BlogListItem {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  tag: string;
  featured: boolean;
  status: "draft" | "published";
  updatedAt: string;
}
