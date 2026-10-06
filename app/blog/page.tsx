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

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.thehimalayanshire.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://www.thehimalayanshire.com/blog",
    },
  ],
};

export default async function BlogListingPage() {
  const blogs = await getPublishedBlogs();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <BlogListingClient blogs={blogs} />
    </>
  );
}
