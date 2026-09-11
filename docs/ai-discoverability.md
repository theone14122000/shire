# AI Discoverability (GEO) — The Himalayan Shire

Goal: make the site **clear → crawlable → structured → authoritative → context-rich → locally relevant → semantically connected → genuinely useful** for Google Search, AI Overviews, Bing, ChatGPT, Perplexity, Gemini, Claude, and other LLM-assisted systems.

No inclusion in any AI system is claimed or guaranteed. This builds eligibility through legitimate technical + semantic foundations.

Last updated: 2026-09-11.

---

## 1. Entity definition (single source of truth)

- **Entity:** The Himalayan Shire (exact name everywhere; no Hotel/Resort variants exist on site).
- **Category:** Premium boutique homestay / private villa experience.
- **Location:** Dehna Road, near Talayi Village, Fagu, Himachal Pradesh 171209, IN. Geo 31.066671, 77.309332.
- **Relations:** Fagu — 19 km ahead of Shimla, 5 km ahead of Kufri, 2 km off-highway link road (all per visible FAQ).
- **Offering:** 7 rooms (Deodar, Buransh, Chir Pine, Blue Pine, Walnut, Mohru, Tosh), entire-villa booking, in-house kitchen 9am–9pm, parking for 10 SUVs.
- **Consistency verified:** name, NAP, 7 rooms, 7,500 ft, Rs. 500/day pet fee identical across homepage, FAQ, policies, schema, llms.txt, llm.txt.

## 2. Machine-readable layers

| Layer | Location | Purpose |
|---|---|---|
| `llm.txt` | `/llm.txt` | Deep navigation: rooms + URLs, verified location facts, real activities, sustainability, real guides, booking paths, official profiles |
| `llms.txt` | `/llms.txt` | Short orientation summary |
| robots.txt | `/robots.txt` | Allows `*` + explicit AI crawlers (GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot); disallows `/admin`, `/api`; references sitemap |
| sitemap.xml | `/sitemap.xml` | Canonical URLs only: static pages + 7 rooms + published posts |
| JSON-LD | every page | Entity graph (below) |

## 3. Entity graph (@id-linked)

- `https://www.thehimalayanshire.com/#business` — LodgingBusiness (single canonical org entity).
- `https://www.thehimalayanshire.com/#website` — WebSite, publisher → `#business`.
- `/rooms/[slug]#room` — HotelRoom, containedInPlace → `#business`.
- `/blog/[slug]#article` — BlogPosting, publisher → `#business`.
- Blog author: `Person` (exact CMS-credited name, e.g. Rishabh Goel) or `#business` Organization fallback. No author URLs/images/sameAs exist in CMS — omitted rather than invented.
- BreadcrumbList on rooms, posts, pet-friendly page. FAQPage on FAQ + pet-friendly page. ImageObject on hero + post images (absolute URLs).
- sameAs uses exact official profile URLs (matching footer): Instagram `?hl=en` URL, Facebook `p/...` URL, YouTube channel URL.
- No reviews/ratings/prices/awards markup (none legitimate).

## 4. Search-intent coverage (only genuinely supported rows)

| User question | Page | Optimization |
|---|---|---|
| homestay in Fagu / best place to stay in Fagu | `/` | Entity + LodgingBusiness + H1 + llm.txt About |
| rooms in Fagu near Shimla | `/rooms/[slug]` | HotelRoom + per-room titles + BreadcrumbList |
| stay near Shimla / peaceful stay near Shimla | `/` + `/blog/why-choose-fagu-for-your-next-holiday` | Geographic context + guide |
| stay near Kufri / between Shimla and Kufri | `/` + Fagu guide post | 5km/19km verified facts in FAQ + guides |
| snow stay near Shimla / snow in Fagu / snow time | `/blog/best-time-to-visit-fagu` | Seasonal guide (Dec–Feb per site content) |
| weather in Fagu / best time to visit Fagu | `/blog/best-time-to-visit-fagu` | Informational guide |
| things to do in Fagu | `/activities` | Destination-intent metadata + CMS activities |
| pet friendly stay in Fagu / near Shimla | `/pet-friendly-stay` + `/pet-policy` | Dedicated pet cluster only |
| private villa in Fagu | `/` (entire-villa booking) + llm.txt | No dedicated page yet — documented gap (build with genuine content) |
| standard rooms / budget-friendly stay | `/rooms/mohru`, `/rooms/tosh`, `/blog/discover-our-standard-rooms` | Category-specific terms, never "cheap hotel" |
| contact / book / availability | `/contact` + booking URL | Transactional intent, NAP |

## 5. Semantic topic cluster

```
The Himalayan Shire (#business)
├── Accommodation → /#rooms → 7 HotelRoom pages → /contact (Enquire)
├── Location → Fagu → Kufri → Shimla → Himachal (FAQ distances, footer, schema geo)
├── Experiences → /activities → lawn/bonfire/games/hikes (+ guides)
├── Sustainability → /sustainability (verified practices only)
└── Travel info → /blog (4 real guides) → rooms/booking CTAs
```

Links use natural varied anchors; breadcrumbs mirror the hierarchy in schema.

## 6. Crawler/rendering notes

- All key content (name, location, rooms, FAQs, contact, schema) is server-rendered HTML — verified in raw-HTML fetches (no login, no interaction needed).
- AI crawlers explicitly allowed in robots.txt (previously covered by `*`; now documented).
- No SEO content differs between mobile/desktop; responsive CSS only.
- Performance untouched: no new JS, no new third-party calls; llm.txt/llms.txt are static text.

## 7. Remaining opportunities

- Google Business Profile + legitimate citations (client-side).
- Dedicated Private Villa + Retreat/Group pages with genuine content.
- First-party reviews system (only then consider review markup).
- Author profile pages if the publication grows multiple writers (enables Person URLs/sameAs).
- Ongoing guides: snowfall guide, homestay-vs-hotel, corporate retreat planning.
