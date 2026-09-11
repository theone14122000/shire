import { getPublishedBlogs } from "@/lib/blogs";
import BlogListingClient from "../components/BlogListingClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fagu Travel Guides & Stories | The Himalayan Shire",
  description:
    "Travel guides and honest notes from The Himalayan Shire - a family-run offbeat homestay in Fagu, near Kufri & Shimla. Weather by month, driving directions, and local experiences in Himachal Pradesh.",
  keywords: [
    "Himalayan Shire blog",
    "Shimla travel guide",
    "Fagu homestay blog",
    "Kufri travel tips",
    "Himachal travel",
    "offbeat homestay Shimla",
    "weather in Shimla",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Fagu Travel Guides & Stories | The Himalayan Shire",
    description:
      "Travel guides and honest notes from The Himalayan Shire - a family-run offbeat homestay in Fagu, near Kufri & Shimla.",
    type: "website",
    url: "https://www.thehimalayanshire.com/blog",
    images: ["/images/hero-1.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fagu Travel Guides & Stories | The Himalayan Shire",
    description:
      "Travel guides and honest notes from The Himalayan Shire - a family-run offbeat homestay in Fagu, near Kufri & Shimla.",
    images: ["/images/hero-1.jpg"],
  },
};

export default async function BlogListingPage() {
  const blogs = await getPublishedBlogs();
  return <BlogListingClient blogs={blogs} />;
}
