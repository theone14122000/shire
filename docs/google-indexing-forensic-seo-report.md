# Forensic Google-Indexing + CMS SEO Report

**Site:** https://www.thehimalayanshire.com/ · **Date:** 2026-09-11
**Question answered:** why does `site:` show near-identical titles/snippets despite finished SEO work?

## 1. Problem

Reported `site:` display: homepage with old pet-first title; Activities/FAQ/Blog/Sustainability/Contact/Pet Policy sharing a generic "Offbeat Luxury Homestay in Fagu, Near Kufri & Shimla"-style title.

## 2. Root Cause

**Stale Google index + snippet rewriting — not a live implementation defect.** Forensic proof:

- Live production serves **12/12 unique titles, unique descriptions, correct canonicals, `index, follow`, page-specific H1s** (table in §5, fetched live this session).
- No page emits the reported strings: repo-wide grep finds "Offbeat Luxury Homestay" only in (a) two stale root reports (`SEO-OPTIMIZATION-REPORT.md`, `SEO-BEFORE-AFTER.md`) documenting the *old* homepage-title era, (b) this report's own quotation, and (c) `prisma/seed.ts` inert setting rows (see §4).
- The `seo_title`/`seo_description` setting rows are **never read** by any page, layout, metadata generator, or schema (grep over `app/` + `lib/` shows the sole reference is the admin settings form). They cannot reach `<head>`.
- Only 2 layouts exist (`app`, `admin`); no `template:`/default-title mechanism; no middleware; no redirects table; no legacy/alternate routes in code; naked→www 308 at host.
- Therefore Google is displaying (i) its retained pre-fix crawl and (ii) rewritten titles assembled from shared property-context copy — both normal search-engine behaviors, neither fixable by further code edits.

## 3. Evidence

- Live `<head>` audit, 12 URLs (`/`, activities, faq, blog, sustainability, contact, pet-policy, pet-friendly-stay, 2 rooms, 2 posts): all HTTP 200, all unique title/description/canonical/H1 (full table §5).
- Production homepage `<head>` read in full: boutique title, correct canonical/OG/Twitter/icons, 3 valid JSON-LD blocks, corrected `sameAs`, sr-only H1.
- `npx next start` render checks: FAQPage/BreadcrumbList/HotelRoom/BlogPosting blocks parse as valid JSON.
- `/robots.txt`, `/sitemap.xml` (20 URLs), `/llm.txt`, `/llms.txt`: HTTP 200 with correct content, fetched live.

## 4. CMS Investigation

- Flow verified: CMS/DB → server components (`force-dynamic`) → visible HTML + `generateMetadata` + JSON-LD + dynamic sitemap. Room overrides merge by slug; photos merge by replacement; blogs merge DB-over-legacy; homepage sections merge DB-over-`CMS_DEFAULTS`.
- FAQ content is code-managed (not CMS) with side-by-side schema mirrors, verified in sync (12 Q&As).
- **Found:** `prisma/seed.ts` `seo_title`/`seo_description` rows stored the exact old strings from the report. Impact today: **zero** (unread anywhere). Fixed anyway (updated to current boutique copy) to remove the landmine; seed is insert-if-missing only (`seed.ts:54-63`), so production data is untouched.
- Local `.env.local` DB ≠ production DB (established previously): local CMS reads prove logic, production HTML proves production state. No credentials printed or changed.

## 5. Production HTML Investigation (12-URL table)

| URL | Title (live) | H1 (live) | Canonical | Robots |
|---|---|---|---|---|
| `/` | Luxury Boutique Homestay… | Luxury Boutique Homestay… (sr-only) | self | index,follow |
| `/activities` | Experiences & Things to Do in Fagu… | Life at the Shire (CMS hero) | self | index,follow |
| `/faq` | FAQs \| … | Frequently asked questions. | self | index,follow |
| `/blog` | Fagu Travel Guides & Stories \| … | Stories From The Shire | self | index,follow |
| `/sustainability` | Sustainability \| … | Sustainability at… | self | index,follow |
| `/contact` | Contact \| … | Get in touch. | self | index,follow |
| `/pet-policy` | Pet Policy \| … | Policy for Pets. | self | index,follow |
| `/pet-friendly-stay` | Pet-Friendly Stay… | Bring your pet… | self | index,follow |
| `/rooms/deodar`, `/rooms/walnut` | Unique per-room titles | Room names | self | index,follow |
| 2 blog posts | Unique per-post titles | Post titles | self | index,follow |

All descriptions unique (verified in fetch; truncated in logs only).

## 6. Metadata Investigation

No override path exists: root layout title serves only `/`; admin layout serves disallowed `/admin/*`; page-level `generateMetadata`/metadata wins everywhere; previously dead helpers are wired. No `template:`, no shared SEO object, no fallback description pool.

## 7. Content Investigation

First meaningful content is page-purposed on all 10 types (story, room descriptions, activity CMS hero, practice-led sustainability, rules-first policy, enquiry NAP+form, guide excerpts). Property context appears but never as the dominant duplicate. Pet-policy gained a `/contact` link; snow post carries contextual links to activities/rooms/contact.

## 8. Canonical Investigation

Absolute HTTPS self-canonicals everywhere, equal to sitemap and internal-link URLs. No homepage canonicalization, no param variants.

## 9. Structured Data Investigation

Page-matched only: LodgingBusiness/Organization/WebSite/ImageObject (global), HotelRoom+BreadcrumbList (rooms), BlogPosting+BreadcrumbList+Person-or-Org author (posts), FAQPage (`/faq` 12, pet-friendly, villa). Parsed-valid; single `#business` entity; no fake markup; nothing sitewide-irrelevant.

## 10. Sitemap Investigation

22 URLs (9 static + 7 rooms + 6 incl. published posts/villa/snow hub at current deploy): canonical-only, published-only, drafts 404, no admin/API/params/dupes.

## 11. Old URL Investigation

No middleware file; no redirect table; no WordPress-style/alternate-slug/duplicate routes in code or sitemap; blog slugs stable across legacy+DB; room slugs stable. **No legacy URLs → no 301s needed.** Nothing to delete.

## 12. Fixes Implemented (this pass)

1. `prisma/seed.ts`: stale `seo_title`/`seo_description` → current boutique copy (inert-data hygiene; zero prod effect by insert-only logic).
2. Prior pass (already live): blog-listing intent title; pet-policy→contact link.
3. Deliberately NOT changed: titles (already correct — repeated edits would only confuse recrawl), design, CMS, copy.

## 13. Production Validation

Build green (`npm run build`). Live 12-URL head audit post-change state: all correct. `/llm.txt`, `/robots.txt`, `/sitemap.xml` re-fetched live with correct content. No private CMS data exposed (admin/API disallowed + auth-guarded; drafts 404).

## 14. Search Console Requirements — CLIENT ACCESS REQUIRED

No Search Console access exists in this environment; nothing below is fabricated: inspect the 7 changed URLs; request indexing (recrawl request, not instant refresh); confirm Google-selected canonical equals declared; check FAQ enhancements + CWV; monitor queries 2–4 weeks; do not mass-request.

## 15. Google Reindexing Expectations

Technical fix (done, proven) ≠ snippet refresh (Google's timeline). Titles may still be rewritten from on-page signals after refresh — acceptable and normal.

## 16. Remaining Issues

Lab CWV unmeasured; GBP/reviews/citations client-side; author-name genuineness to be confirmed; llm.txt needs manual sync on content changes (validator `scripts/validate-llm.mjs` enforces URL integrity).

## 17. Maintenance Instructions

One topic per page; unique title/desc/canonical/H1 per new page; CMS flows automatically; FAQ mirrors live in code; keep llm.txt synced and validator green; never reintroduce shared titles; never wire the inert `seo_*` settings into `<head>` without per-page scoping.
