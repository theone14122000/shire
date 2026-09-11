import type { MetadataRoute } from "next";
import { rooms } from "@/lib/rooms";
import { getPublishedBlogs } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.thehimalayanshire.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: "2026-09-11", changeFrequency: "weekly", priority: 1 },
    { url: `${base}/activities`, lastModified: "2026-09-11", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sustainability`, lastModified: "2026-09-11", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, lastModified: "2026-09-11", changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: "2026-09-11", changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: "2026-09-11", changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: "2026-09-11", changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/pet-policy`, lastModified: "2026-09-11", changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/pet-friendly-stay`, lastModified: "2026-09-11", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/private-villa`, lastModified: "2026-09-11", changeFrequency: "monthly", priority: 0.8 },
  ];

  const roomRoutes: MetadataRoute.Sitemap = rooms.map((room) => ({
    url: `${base}/rooms/${room.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedBlogs();
    blogRoutes = posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // blog listing is optional for the sitemap
  }

  return [...staticRoutes, ...roomRoutes, ...blogRoutes];
}
