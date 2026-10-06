import type { MetadataRoute } from "next";

// NOTE: public/robots.txt takes precedence when present and is the live
// file. Keep both in sync; this route is the fallback.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
];

// Public, read-only facts endpoint — allowed for every crawler.
// Everything else under /api/ (plus admin/auth/dashboard) stays blocked;
// the longest matching rule wins, so /api/ai/ is reachable while
// /api/admin, /api/upload etc. are not.
const PUBLIC_API = "/api/ai/";
const BLOCKED = ["/admin/", "/api/", "/auth/", "/dashboard"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", PUBLIC_API],
        disallow: BLOCKED,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ["/", PUBLIC_API],
        disallow: BLOCKED,
      })),
    ],
    sitemap: "https://www.thehimalayanshire.com/sitemap.xml",
  };
}
