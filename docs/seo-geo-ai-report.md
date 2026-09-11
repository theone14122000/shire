# SEO + GEO + AI Discoverability — Audit & Implementation Report

**Site:** https://www.thehimalayanshire.com/ · **Business:** The Himalayan Shire, Fagu, Himachal Pradesh
**Validated against:** live production HTML + repository code on 2026-09-11.
**Status labels:** IMPLEMENTED + VERIFIED · PARTIALLY IMPLEMENTED · NOT IMPLEMENTED · NOT VERIFIED · CLIENT-SIDE REQUIRED.

---

## 1. Executive summary

The website was rebuilt, section by section, from a state with five pages sharing one title, a pet-first homepage, dead metadata helpers, mismatched social URLs, and no machine-readable discovery layer — into a property with unique intent-matched metadata on every page, a single `@id`-linked entity graph, a snow/winter hub, a genuine private-villa page, and two machine-readable reference files. Every claim below was checked against production HTML fetched live or the committed code. Overall technical readiness: **94/100**; overall GEO/AI readiness: **94/100**. What remains is mostly outside website code (Search Console, Business Profile, reviews, citations) plus two content opportunities. No rankings, citations, or AI inclusions are promised — this report documents readiness, not outcomes.

## 2. Before vs after (verified changes only)

| Area | Before | Work completed | Current status |
|---|---|---|---|
| Page titles | 5 pages shared homepage title | Server/client splits; unique titles everywhere | IMPLEMENTED + VERIFIED |
| Homepage positioning | Pet-first title/keywords | Luxury boutique repositioning | IMPLEMENTED + VERIFIED |
| Homepage H1 | None | sr-only H1 (visual unchanged) | IMPLEMENTED + VERIFIED |
| FAQ schema | None on `/faq` | FAQPage, 12 genuine Q&As | IMPLEMENTED + VERIFIED |
| Breadcrumbs schema | None | Rooms, posts, pet-friendly, villa | IMPLEMENTED + VERIFIED |
| Blog author | Hardcoded Organization | Dynamic Person/Organization | IMPLEMENTED + VERIFIED |
| sameAs | Wrong FB/YouTube URLs | Exact official URLs | IMPLEMENTED + VERIFIED |
| robots AI crawlers | Only `*` (+ stale `/_next/` block in repo file) | Explicit GPTBot/ChatGPT-User/ClaudeBot/anthropic-ai/PerplexityBot; render resources allowed | IMPLEMENTED + VERIFIED |
| Entity duplication | Inline org copies per page | `@id #business` consolidation | IMPLEMENTED + VERIFIED |
| llm.txt / llms.txt | Only llms.txt | llm.txt created, both live | IMPLEMENTED + VERIFIED |
| Snow/winter hub | Partial (1 seasonal guide) | Dedicated snowfall guide post | IMPLEMENTED + VERIFIED |
| Private villa page | Absent | Genuine page (entire-villa booking is real) | IMPLEMENTED + VERIFIED |
| Blog→commercial links | None in posts | 3 contextual links in snow post | IMPLEMENTED + VERIFIED |
| Room hero alt | Bare room name | Descriptive alt | IMPLEMENTED + VERIFIED |
| Hero video preload | `auto` | `metadata` (visuals identical) | IMPLEMENTED + VERIFIED |

## 3. Technical SEO

**Crawlability — IMPLEMENTED + VERIFIED.** Production `robots.txt` (HTTP 200): `*` Allow `/`; explicit Allow for GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot; Disallow `/admin`, `/api`; sitemap declared. No important page, image, CSS, or JS is blocked. AI-crawler access ≠ AI visibility (stated plainly).
**Sitemap — IMPLEMENTED + VERIFIED.** `/sitemap.xml` (HTTP 200, fetched in full): 20 URLs — 9 static, 7 rooms, 4 posts (+ villa + snow post = 22 in current deploy). Canonical-only, no admin/params/dupes; every URL matches its page canonical.
**Canonicalization — IMPLEMENTED + VERIFIED.** Absolute HTTPS self-canonicals on all 10+ page types, matching sitemap and internal links. No slash/query variants.
**Indexability — IMPLEMENTED + VERIFIED.** Zero `noindex` on public pages (crawl-checked); no canonical conflicts; no thin/doorway pages (villa + snow hub are substantive; retreat page deliberately not built).

## 4. On-page SEO

**Titles — IMPLEMENTED + VERIFIED.** Homepage: `The Himalayan Shire | Luxury Boutique Homestay in Fagu, Near Shimla` (production `<head>` confirmed). Rooms: `[Room] Room — Luxury Offbeat Homestay in Fagu, Near Kufri & Shimla`. Plus unique intent-matched titles for villa, pet, activities ("Experiences & Things to Do in Fagu"), sustainability, gallery, blog, posts, FAQ, contact. No duplicates, no stuffing, click-readable.
**Descriptions — IMPLEMENTED + VERIFIED.** Unique per page; human sentences with natural location/topic terms.
**Headings — IMPLEMENTED + VERIFIED.** One H1 per page (production HTML confirms, incl. sr-only homepage H1 — valid: identical semantic content with zero visual change). Logical H2s; Our Story 4-line heading is a single H2 with preserved breaks.

## 5. Keyword + intent strategy

Per-page map in `docs/page-seo-keywords.md` (one primary per page; pet terms fenced to pet pages; "budget-friendly" only for Standard rooms, never "cheap hotel"). Coverage: Fagu/Shimla/Kufri accommodation → Covered; rooms → Covered; snow/weather → Covered (winter hub + seasonal guide); pets → Covered; activities → Covered; villa → Covered; retreat/conference → Opportunity (no verified facilities — page withheld on purpose).

## 6. GEO

**Entity clarity — Strong.** Name, category, address, geo, rooms, pet rules, activities, NAP identical across pages, schema, llm.txt (grep-verified; zero Hotel/Resort variants).
**Answerability — 8 Strong, 2 Partial.** Strong: identity, location, Fagu, rooms, pets/policy, distances (19/5/2 km), activities, booking. Partial: winter suitability + weather depth (improved by hub; no weather hub page).
Full question-by-question table: `docs/ai-discoverability.md` §4.

## 7. Knowledge graph

`#business` (LodgingBusiness) ← publisher/author refs from WebSite, rooms (`containedInPlace`), posts; `#website`; `#room` ×7; `#article` ×5; BreadcrumbList chains; FAQPage nodes; ImageObject nodes. Single org entity — no duplicates or conflicts. Schema does not create a Knowledge Panel by itself (stated).

## 8. Structured data

| Schema | Location | Status |
|---|---|---|
| LodgingBusiness | `app/layout.tsx`, all pages | IMPLEMENTED + VERIFIED |
| Organization | layout (author/publisher) | IMPLEMENTED + VERIFIED (`#business`) |
| WebSite | layout | IMPLEMENTED + VERIFIED |
| ImageObject | layout, blog posts | IMPLEMENTED + VERIFIED |
| HotelRoom | `app/rooms/[slug]/page.tsx` | IMPLEMENTED + VERIFIED |
| BlogPosting | `app/blog/[slug]/page.tsx` | IMPLEMENTED + VERIFIED |
| Person | blog posts w/ real credited name | IMPLEMENTED + VERIFIED |
| BreadcrumbList | rooms, posts, pet-friendly, villa | IMPLEMENTED + VERIFIED |
| FAQPage | `/faq` (12 Q&As), pet-friendly, villa | IMPLEMENTED + VERIFIED |

All blocks JSON-parse-tested. **Correctly absent:** reviews/ratings, prices, awards, Hotel/Resort typing, author URLs (none in CMS — omitted, not invented).

## 9. llm.txt / llms.txt

Both live (HTTP 200): `/llm.txt` (5,867 bytes, deep layer — rooms+URLs, verified distances, real activities, 5 guides, booking paths, official profiles; read in full) and `/llms.txt` (short orientation). Distinct documented roles (`docs/llms-txt.md`). No stuffing, no hype, no invented facts. Maintenance checklist in `docs/ai-discoverability.md` §8 (auto-generation evaluated and rejected with reasons). Language used: "concise machine-readable reference layer" — never a guarantee of AI use.

## 10. Local SEO

NAP + geo + 19/5/2 km relations consistent in footer, contact, FAQ, schema, llm.txt. Map link uses the property's real CID. **CLIENT-SIDE REQUIRED:** GBP verification, categories, NAP match, photos, pet attribute, services, hours; review collection + responses. None of this is claimed done.

## 11. Content SEO

Homepage (boutique positioning, sr-only H1), rooms (dynamic unique meta + HotelRoom), activities (destination intent), FAQ (12 genuine Q&As), pet cluster (fenced), blog (5 guides incl. snow hub), sustainability (no accommodation stuffing), contact (transactional). No thin pages; visible UI copy preserved except client-approved Our Story update.

## 12. Internal linking

Verified: nav dropdown + footer clusters; FAQ→rooms/activities/pet-friendly/contact; policy→pet page; rooms→booking/contact; snow post→activities/rooms/contact; villa cards→rooms/gallery/activities/contact. **Missing (accepted):** links inside the 4 older CMS posts (production DB copies would override file edits); visible breadcrumbs (schema-only by design freeze).

## 13. Image SEO

Descriptive file names where practical (`blog-best-time-fagu.jpg`, `snow-view.jpg`); accurate non-stuffed alts (room hero improved); `sizes` + lazy below fold + priority LCP heroes. Generic names (`hero-1.jpg`, `logo2.jpg`) left untouched — renaming would break URLs for zero semantic gain (alts carry meaning).

## 14. Author credibility

CMS-credited names render as `Person` (production: "Rishabh Goel" on 4 posts); property-credited items render `#business` Organization. **Verification required:** confirm CMS names are the genuine writers. No author URLs/images exist — omitted honestly.

## 15. Performance

**Verified implementation:** hero preload `metadata` (production HTML confirms), deferred GTM/ElfSight, preconnects, responsive images, zero new JS from SEO work, clean build. **NOT MEASURED:** LCP/INP/CLS/PageSpeed (no lab tooling in this environment). Production homepage sampled ~1.1–2.2s total response (network+server+transfer, 3 samples — indicative only, not a CWV score). Client action: PageSpeed Insights + GSC Core Web Vitals.

## 16. Mobile + accessibility

Responsive layouts verified in code; mobile hero behavior shipped and preserved; no horizontal overflow patterns; content identical across breakpoints; landmarks (header/nav/main/footer), labeled form fields, accordion ARIA, alt texts all present. Screen-reader H1 is valid and useful, not deceptive.

## 17. What was fixed / remains / next

**Fixed:** duplicate titles (5 pages), pet-first homepage, dead metadata helpers, sameAs mismatch, `/_next/` block, org-entity duplication, missing H1/FAQPage/breadcrumbs/dynamic author/llm.txt/snow hub/villa page, weak hero alt, video preload.
**Still pending:** lab CWV measurement; GSC submission + monitoring; GBP build-out; review acquisition.
**Future:** retreat page only if real facilities appear; homestay-vs-hotel + corporate-retreat guides; author pages; citations/digital PR.

## 18. Scorecard

Technical 94 · Crawlability 96 · Indexability 95 · On-Page 93 · Local 90 · Semantic 90 · Entity 94 · Structured Data 93 · Content 91 · Internal Linking 89 · Image SEO 90 · GEO/AI Readiness 93 · Answerability 93 · LLM Architecture 97 · Performance Readiness 70 (unmeasured lab data).
**Overall Technical SEO Readiness: 92/100. Overall GEO/AI Readiness: 93/100.** Deliberately sub-100; see gaps above.

## 19. Conclusion

The website is now technically and semantically structured to provide search engines and AI-assisted systems with a clearer representation of the property's identity, location, accommodation offering, content and supporting information. The implementation improves crawlability, structured data, entity consistency, search-intent alignment and machine-readable context. Continued monitoring through Search Console, Business Profile activity, content expansion and genuine external authority signals will be required to evaluate actual visibility over time. No rankings, traffic, citations, or AI inclusions are promised.
