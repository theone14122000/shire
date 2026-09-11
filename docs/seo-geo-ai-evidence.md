# Evidence Appendix — SEO + GEO Implementation

Every claim in `seo-geo-ai-report.md` traces to one of these. Validated 2026-09-11 against live production + committed code.

## Production HTTP (all fetched live)

| Resource | URL | Status |
|---|---|---|
| Homepage | `https://www.thehimalayanshire.com/` | 200 (full `<head>` + body read) |
| robots.txt | `https://www.thehimalayanshire.com/robots.txt` | 200 (AI crawlers + sitemap, no bad rules) |
| sitemap.xml | `https://www.thehimalayanshire.com/sitemap.xml` | 200 (20 URLs counted) |
| llm.txt | `https://www.thehimalayanshire.com/llm.txt` | 200 (5,867 bytes, read in full) |
| llms.txt | `https://www.thehimalayanshire.com/llms.txt` | 200 |
| Villa page | `https://www.thehimalayanshire.com/private-villa` | 200 (title, H1, FAQs, CTAs read) |
| Snow guide | `https://www.thehimalayanshire.com/blog/fagu-snowfall-winter-guide` | 200 (all 7 sections read) |
| Room page | `https://www.thehimalayanshire.com/rooms/deodar` | 200 (title, H1, NAP, links read) |
| Blog | `https://www.thehimalayanshire.com/blog` | 200 (head, schema, 4 posts + slugs parsed) |
| FAQ | `https://www.thehimalayanshire.com/faq` | 200 (local render; content matches prod copy) |

## Titles / canonicals / H1 (10-page crawl, local prod build)

Home `The Himalayan Shire | Luxury Boutique Homestay in Fagu, Near Shimla` · Rooms `[Room] Room — Luxury Offbeat Homestay in Fagu, Near Kufri & Shimla` · Villa `Private Villa in Fagu, Near Shimla | …` · Pet-Friendly / Pet Policy / Experiences (& Things to Do in Fagu) / Sustainability / Gallery / Blog / FAQs / Contact — all unique, all absolute self-canonicals, zero `noindex`, one H1 each (home H1 sr-only).

## JSON-LD (programmatically JSON-parsed, counts per page)

`/` 3 blocks · `/faq` 4 · `/rooms/deodar` 5 · `/blog` 3 · `/pet-friendly-stay` 5.
Types seen: LodgingBusiness(`#business`), WebSite(`#website`), ImageObject, HotelRoom(`#room`), BlogPosting(`#article`), Person (CMS name), BreadcrumbList, FAQPage, Question, Answer, PostalAddress, GeoCoordinates, LocationFeatureSpecification, TouristAttraction.

## Code locations

- Global meta + LodgingBusiness/WebSite/ImageObject: `app/layout.tsx`
- Per-page meta: `app/metadata.ts` (contact/FAQ/activities/sustainability), inline on gallery/pet-policy/pet-friendly/villa/rooms/blog
- Server/client splits: `app/contact/ContactPageContent.tsx`, `app/faq/FaqPageContent.tsx` (+`FAQ_ENTITIES` mirrors in `app/faq/page.tsx`), `app/pet-policy/PetPolicyContent.tsx`
- Room schema: `app/rooms/[slug]/page.tsx` (`getRoomSchema`)
- Post schema: `app/blog/[slug]/page.tsx` (`authorSchema`)
- Sitemap/robots: `app/sitemap.ts`, `app/robots.ts` + `public/robots.txt` (static shadows route locally; route serves production)
- Machine files: `public/llm.txt`, `public/llms.txt`
- Data: `lib/rooms.ts` (7 rooms, Walnut last), `data/blogs.json` (5 posts incl. snow hub), `prisma/seed.ts`
- Keyword map: `docs/page-seo-keywords.md`; remediation log: `docs/seo-report.md`, `docs/ai-discoverability.md`

## Consistency spot-checks (grep + live reads)

- Zero `Shire Hotel|Resort` variants sitewide; NAP/geo/7-rooms/7500-ft/Rs.500 identical everywhere
- sameAs = exact footer profile URLs (production `<head>` confirmed)
- Blog authors production: "Rishabh Goel" ×4 → Person schema (genuineness to be confirmed by client)
- Internal links: nav dropdown, footer clusters, FAQ contextual links, snow-post links, villa cards (all read in code/HTML)
- Alts: room hero descriptive; gallery/blog alts = accurate titles; no stuffed alt found
- Landmarks/labels: header/nav/main/footer, labeled enquiry fields, accordion ARIA (production HTML confirmed)

## Honestly NOT measured / NOT done here

- Lab/field Core Web Vitals, PageSpeed/Lighthouse scores
- Search Console / Business Profile actions (no access; client-side)
- Review acquisition, citations, digital PR
- Retreat/conference page (withheld — no verified facilities)
- Author identity confirmation beyond CMS strings
