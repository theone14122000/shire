import type { NextConfig } from "next";

// Extension-suffixed paths get long-lived browser caching. Next ships
// /public files with `max-age=0`, so every visit revalidated the 8MB hero
// video, favicons, and every static image over the network. One day of
// freshness + a background-revalidation window keeps content current while
// removing repeat round-trips. (Replace-in-place updates propagate within
// a day; new filenames bust immediately.) Hashed /_next/static assets keep
// their immutable defaults, and HTML/API responses are unaffected.
const CACHEABLE_EXTENSIONS = ["mp4", "webm", "jpg", "jpeg", "png", "webp", "avif", "svg", "gif", "ico"];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve images as plain files (no /_next/image round-trip).
    // Vercel's image-optimization entitlement is exhausted on this project
    // (edge responds 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED for every
    // cache miss on /_next/image), so optimized srcsets were rendering as
    // broken/blank images while only still-cached variants displayed. Raw
    // files from /public and /api/media serve correctly with our long-lived
    // Cache-Control below. If the Vercel plan/image quota is restored,
    // switch this back to `process.env.NODE_ENV !== "production"` to
    // re-enable AVIF + responsive resizing (formats/minimumCacheTTL below
    // stay configured for that).
    unoptimized: true,
    // Serve modern formats first: AVIF/WebP are 20-30% smaller than JPEG
    // at the same visual quality. Same pixels, fewer bytes.
    formats: ["image/avif", "image/webp"],
    // Optimizer responses default to a short TTL; keep resized variants
    // (URL-keyed, so content changes always change the URL) for a day.
    minimumCacheTTL: 86400,
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
  async headers() {
    return CACHEABLE_EXTENSIONS.map((ext) => ({
      source: `/:path*.${ext}`,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=86400, stale-while-revalidate=604800",
        },
      ],
    }));
  },
};

export default nextConfig;
