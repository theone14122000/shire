import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // The image optimizer SSRF-blocks loopback hosts, so newly uploaded
    // DB-backed media can't be optimized on localhost. Dev only.
    unoptimized: process.env.NODE_ENV !== "production",
    // Serve modern formats first: AVIF/WebP are 20-30% smaller than JPEG
    // at the same visual quality. Same pixels, fewer bytes.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.thehimalayanshire.com" },
      { protocol: "https", hostname: "thehimalayanshire.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
