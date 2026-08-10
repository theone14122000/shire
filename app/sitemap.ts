import type { MetadataRoute } from "next";
import { rooms } from "@/lib/rooms";
import { getPublishedBlogs } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://shire-nu.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/activities`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gallery`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/faq`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/pet-policy`, changeFrequency: "yearly", priority: 0.5 },
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
