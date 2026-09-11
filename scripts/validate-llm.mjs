// Validates public/llm.txt against canonical site data. Run: node scripts/validate-llm.mjs
// Exit 1 on broken room/blog URLs. Prints a stuffing-review hint (non-blocking).
import { readFileSync } from "fs";

const llm = readFileSync("public/llm.txt", "utf8");
const roomsSrc = readFileSync("lib/rooms.ts", "utf8");
const blogs = JSON.parse(readFileSync("data/blogs.json", "utf8"));

const roomSlugs = new Set([...roomsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
const blogSlugs = new Set(blogs.map((b) => b.slug));
const staticRoutes = new Set([
  "/", "/#rooms", "/activities", "/sustainability", "/gallery", "/blog",
  "/faq", "/contact", "/pet-policy", "/pet-friendly-stay", "/private-villa",
  "/sitemap.xml",
]);

let failures = 0;
for (const m of llm.matchAll(/https:\/\/www\.thehimalayanshire\.com(\/[A-Za-z0-9#\-/.]*)/g)) {
  const path = m[1].replace(/\/$/, "") || "/";
  if (path.startsWith("/rooms/")) {
    const slug = path.split("/")[2];
    if (!roomSlugs.has(slug)) { console.error(`BROKEN room URL: ${m[0]}`); failures++; }
  } else if (path.startsWith("/blog/")) {
    const slug = path.split("/")[2];
    if (slug && !blogSlugs.has(slug)) { console.error(`BROKEN blog URL: ${m[0]}`); failures++; }
  } else if (!staticRoutes.has(path) && !staticRoutes.has(path + "/")) {
    console.error(`UNKNOWN page URL: ${m[0]}`);
    failures++;
  }
}

// Stuffing heuristic: most-repeated significant bigram (review hint only).
const words = llm.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
const stop = new Set(["the", "and", "for", "with", "from", "https", "www", "com", "ire"]);
const counts = {};
for (let i = 0; i < words.length - 1; i++) {
  if (stop.has(words[i]) && stop.has(words[i + 1])) continue;
  const bg = words[i] + " " + words[i + 1];
  counts[bg] = (counts[bg] || 0) + 1;
}
const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
console.log("Top repeated bigrams (review for stuffing):", top.map(([w, c]) => `${w} x${c}`).join(" | "));

if (failures === 0) console.log("llm.txt validation: PASS");
else { console.log(`llm.txt validation: ${failures} FAILURE(S)`); process.exit(1); }
