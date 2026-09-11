# Google Site-Search Representation Fix — Report

**Site:** https://www.thehimalayanshire.com/ · **Date:** 2026-09-11
**Scope:** fix duplicated/generic Google `site:` representation. No redesign, no visual change (2 micro-copy/metadata edits only).

## Problem Observed

Google `site:` results showed the homepage with a stale pet-first title and several pages sharing a generic "Offbeat Luxury Homestay in Fagu, Near Kufri & Shimla"-style title — the room-title pattern without a room name.

## Root Cause

Two layered causes, verified against production HTML (not assumptions):

1. **Stale index (primary cause).** Current production output already carries unique titles/descriptions on every page (verified: 10-page crawl + live `<head>` reads). The reported snippets match pre-fix output: the old pet-first homepage title and the pre-split era when pages inherited shared titles. Google has not yet recrawled/reprocessed these URLs.
2. **Google snippet rewriting (secondary).** Google routinely rewrites displayed titles from H1s, body text, and anchors. The room-pattern fragment circulating without a room name is consistent with rewriting from shared property-context copy, not with any current metadata defect — no page currently emits that string.

No live defect found in: metadata exports, `generateMetadata`, CMS→head flow, layout inheritance, canonicals (absolute, matching sitemap), old/duplicate routes (none exist; naked→www 308 at host), or FAQ/code duplication.

## CMS Issue

None active. Page-specific CMS data flows to page-specific metadata (rooms merged by slug, posts by record, homepage sections by key). Dead helper code from an earlier pass was already wired up; nothing global feeds every page.

## Metadata Issues

None remaining. This pass strengthened one title for intent: blog listing `Blog | …` → `Fagu Travel Guides & Stories | …` (meta + OG + Twitter; H1 and design untouched).

## Content/Description Issues

Visible intros audited page by page: FAQ ("Everything guests usually ask…"), contact (enquiry NAP + form), activities (CMS destination hero), sustainability (practice-led body), pet-policy (rules-first), rooms (unique descriptions), posts (unique excerpts). All page-purposed; property context present but never dominant-duplicate. One reinforcement added: pet-policy closing now links `/contact` ("Contact us before booking"), completing the Pet Policy → Contact path with existing link styling.

## Canonical Audit

All indexable pages self-canonical absolute HTTPS, matching sitemap and internal links. No cross-page canonicals, no param variants.

## Structured Data Audit

Unchanged and page-specific: LodgingBusiness/WebSite/ImageObject (global), HotelRoom + BreadcrumbList (rooms), BlogPosting + BreadcrumbList (posts), FAQPage (`/faq` 12 Q&As, pet-friendly, villa). Validated by parsing; no sitewide FAQ spam; no fake entities.

## GEO/AI Impact

Machine distinguishability restored at the source: unique titles + H1s + intros + schemas per page under one `#business` entity. `llm.txt` already carries per-page canonical URLs.

## Changes Made (this pass only)

1. `app/blog/page.tsx` — listing title/OG/Twitter → Fagu Travel Guides & Stories.
2. `app/pet-policy/PetPolicyContent.tsx` — one-line Contact link in existing style.

## Before vs After

| Page | Before (Google cache) | Current production output |
|---|---|---|
| `/` | Pet-Friendly Stay… (stale) | Luxury Boutique Homestay… (live) |
| Activities/FAQ/Blog/Sustainability/Contact/Pet Policy | Shared generic pattern (stale) | 6 unique titles (live) |
| Blog listing | `Blog \| …` | `Fagu Travel Guides & Stories \| …` |
| Pet policy | No contact path | Contact link present |

## Production Validation

Build green. Local prod-server: blog title `Fagu Travel Guides & Stories | The Himalayan Shire`, pet-policy title + contact link present. Live-site evidence chain from this and prior sessions: unique titles, canonicals, H1s, JSON-LD on 10 page types; `/llm.txt`, `/sitemap.xml` (22 URLs), `/robots.txt` all 200 with correct content.

## "Private Villa" Verdict — KEEP

Verified genuine across independent sources: CMS editorial fallback + defaults ("book the entire villa… per room basis"), FAQ pet answer ("booking the entire villa"), FAQ rooms answer ("one room to all seven"), dedicated `/private-villa` page with booking paths. Removing it would misrepresent a real offering.

## Remaining Google Indexing Considerations

Fixing code ≠ instant snippet refresh. Google must recrawl each URL and may still rewrite displayed titles from on-page signals (normal behavior, not breakage).

## Google Search Console Actions (client)

1. URL-inspect `/`, `/activities`, `/faq`, `/blog`, `/sustainability`, `/contact`, `/pet-policy` → Request Indexing (changed titles).
2. Confirm Google-selected canonical = declared canonical per URL.
3. Check Enhancements (FAQ rich results) and Core Web Vitals.
4. Monitor queries for 2–4 weeks; do NOT mass-request every URL. **No Search Console access exists in this environment — results cannot be verified here and must not be fabricated.**

## Maintenance Instructions

- Keep one primary topic per page; never reintroduce shared titles.
- New pages: unique title/desc/canonical/H1 + matching visible intro + schema or no-schema decision.
- CMS edits flow automatically to meta/schema/sitemap; FAQ mirrors live in code (`FaqPageContent.tsx` + `app/faq/page.tsx`).
- Keep `llm.txt` synced; run `node scripts/validate-llm.mjs` (must PASS).
