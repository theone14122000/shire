# CMS → SEO/GEO Integration Fix Report

**Site:** https://www.thehimalayanshire.com/ · **Date:** 2026-09-11
**Rule followed throughout:** no redesign, no visual change, no CMS data touched, CMS remains source of truth.

## Executive Summary

Diagnosed how CMS/database content flows into the SEO layer and found **two real integration gaps**: (1) room social-share images used the static base photo set even after an admin replaces photos via CMS; (2) the CMS image `alt` field existed in the database and API but had no admin input and never reached the frontend. Both are fixed with zero visual change. Everything else audited — metadata flow, schema sources, sitemap logic, SSR, canonicals, old URLs, llm.txt sync — was verified working and left alone.

## Root Cause Found

Not a systemic CMS failure. The architecture is sound (server components read CMS per request; `generateMetadata` uses merged records). The gaps were two dropped fields at integration points: managed images bypassed in `generateMetadata`, and `alt` dropped by `getPublicRoomImages` with no admin UI to set it.

## CMS SEO Architecture (as found, preserved)

CMS content → server components (`force-dynamic`) → visible HTML + `generateMetadata` + JSON-LD + sitemap. Room overrides merge by slug (`getMergedRoom`); room photos merge by replacement (`getPublicRoomImages`); blogs merge DB over legacy JSON (`getBlogBySlug`/`getPublishedBlogs`); homepage/sustainability/activities merge DB over `CMS_DEFAULTS`. FAQ content is code-managed (not CMS) with side-by-side schema mirrors.

## Changes Implemented

1. **`app/rooms/[slug]/page.tsx`** — `generateMetadata` now fetches `getPublicRoomImages(slug)` and uses the CMS-managed cover photo (absolute URL) for OG/Twitter; static base is fallback only.
2. **`lib/room-images.ts`** — `PublicRoomImage` now carries `alt: string | null` (was dropped).
3. **`app/components/rooms/RoomPageContent.tsx`** — alt priority CMS-alt → caption → label; hero alt neutralized to "`[Room]` room at The Himalayan Shire, Fagu" (old text claimed Himalayan views for valley/garden/forest rooms). No visual change.
4. **`app/admin/rooms/[slug]/page.tsx`** — new `AltField` input under each photo (same save pattern as caption; existing `{alt}` PUT route already supported it). Placeholder: "Alt text for SEO (blank = auto)".
5. **`scripts/validate-llm.mjs`** (new) — validates every `/rooms/*` URL in `llm.txt` against `lib/rooms.ts`, every `/blog/*` against `data/blogs.json`, every static URL against the route list; prints top repeated bigrams for stuffing review. Result: **PASS** (top bigrams are URL fragments, not stuffing).

## Metadata / Structured-Data / GEO Integration

No changes needed — verified: room titles/descriptions/canonicals read merged CMS records; blog meta + BlogPosting read the CMS record (seoTitle/seoDescription/author/image/dates); author is dynamic Person/Organization; HotelRoom reads merged room + managed images; FAQPage mirrors visible FAQs; LodgingBusiness uses verified property constants. Single source of truth holds everywhere.

## Sitemap / Canonical Integration

Verified: sitemap includes published CMS blogs dynamically (22 URLs incl. villa + snow hub), only published rooms/posts, no admin/API/params/dupes; canonicals absolute and matching. Draft/unpublished posts 404 via `notFound()` (verified in code); no stale records possible (all reads are per-request, no SEO cache tables).

## Blog / Room / FAQ / Image Integration

- Blog publishing flow: create → instant metadata/canonical/schema/sitemap (all dynamic). No action needed.
- Rooms: 7 fixed slugs; CMS overrides names/facts/photos without touching code. Fixed OG-image + alt gaps above.
- FAQ: code-managed (documented limitation); schema mirrors updated in the same edits (12 Q&As verified in sync).
- Images: CMS alt now settable and rendered; gallery/blog alts accurate; no stuffed alts found.

## Internal Linking / Crawlability

Unchanged and verified: deliberate link clusters intact; robots allows crawlers + explicit AI crawlers, blocks only admin/api; render resources crawlable; all key content server-rendered (production raw-HTML evidence on file).

## Old URL / Duplicate URL Findings

Audited: no custom middleware, no redirect table in `next.config`, no WordPress-style or alternate-slug routes in code, blog slugs stable across legacy+DB, naked domain 308-redirects to www at host level (verified earlier). **No legacy URLs found → no redirects needed.** Nothing to delete.

## Production Validation

Build green. Local prod-server checks: `/rooms/deodar` OG image absolute CMS-aware URL, neutral hero alt, homepage 200. Production spot-checks from prior sessions confirm deploy pipeline (new pages live within minutes). `node scripts/validate-llm.mjs` → PASS.

## Before vs After

| Item | Before | After |
|---|---|---|
| Room OG image | Static base photo always | CMS-managed cover photo, base fallback |
| Room image alt | CMS `alt` column unsettable, unused | Admin input + frontend priority chain |
| llm.txt sync proof | Manual only | `scripts/validate-llm.mjs` PASS in repo |
| Everything else audited | Working | Untouched |

## Remaining Limitations

- FAQ content is code-managed, not CMS-managed (schema kept in sync manually).
- Local `.env.local` database ≠ production database — CMS reads/writes here affect only the local DB; production CMS edits happen via `/admin` on the live site.
- Lab Core Web Vitals unmeasured; Search Console/Business Profile are client-side.

## Maintenance Instructions

- Room photos: replace via admin; OG + gallery + schema follow automatically. Set alt text per photo; blank falls back safely.
- New blog post (admin): metadata, schema, sitemap, canonical appear automatically. Keep author as the genuine writer's name.
- New/changed rooms, policies, guides, contact details: update `public/llm.txt` + `public/llms.txt`, then run `node scripts/validate-llm.mjs` (must PASS) and rebuild.
- Never add review/rating/award markup without legitimate verifiable data.
- `site:` fluctuations are normal; verify via live HTML + Search Console, not `site:` counts.
