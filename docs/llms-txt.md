# LLMs.txt — The Himalayan Shire

## Why it was upgraded (2026-09-11)

The original file was a 27-line summary: identity, one-line room/category note, pet line, page list, contact. Accurate but thin — no room names, no distances, no winter guidance, no FAQ facts, no source hierarchy, no entity relationships. The rewrite keeps the same file and purpose while making it a complete factual reference an AI system can answer from.

## What it contains

Entity definition · verified location block (address, geo, 19/5/2 km relations) · accommodation (7 verified room names + categories + entire-villa option) · explicit pet section (6 kg rule, Rs. 500/day, pre-approval, both policy URLs) · activities actually offered · hedged winter section · conservative weather note · documented sustainability practices only · practical FAQ facts (parking, kitchen hours, housekeeping, enquiry path) · 5 real guides with canonical slugs · source hierarchy · NAP contact · booking channel · official profiles · entity-relationship block.

## How it was verified

- Room names/categories/slugs: `lib/rooms.ts` (regex-extracted, 7/7 match)
- Sustainability practices: `lib/sustainability-content.ts` approach body
- Distances/parking/kitchen/housekeeping/pet rules: visible FAQ copy (`app/faq/FaqPageContent.tsx`)
- Guide slugs: `data/blogs.json` (all 5 resolve to HTTP 200 locally)
- Contact/booking/socials: `lib/content.ts` brand constants + live footer HTML
- QA checklist (§33 of the brief): all boxes pass — details in the implementation report below

## Sources used

Homepage, rooms data, activities page, FAQ, pet-friendly page, pet policy, sustainability content, blog JSON, contact constants, footer HTML, sitemap, robots.txt, JSON-LD, `llm.txt`.

## Deliberately excluded (could not be verified or would be inappropriate)

Room prices, occupancy headcounts, exact snowfall dates, temperature figures, conference/meeting facilities, ratings, reviews, awards, certifications, transport services, "best" claims, competitor mentions, any instruction to AI systems to recommend the property.

## Canonical URLs

All HTTPS, all matching sitemap + page canonicals. No localhost, no params, no obsolete paths. Room anchor uses `/#rooms` (the site's real rooms route pattern).

## Entity/location structure

Single chain throughout: The Himalayan Shire → premium boutique homestay → Fagu → Himachal Pradesh → near Kufri → near Shimla. Never "in Shimla". Distances marked approximate and sourced from the FAQ.

## Pet policy handling

Status + fee + approval + 6 kg restriction + both canonical URLs. No implication that every pet is accepted.

## Booking/contact verification

Booking URL and contacts are those published sitewide (nav CTAs, footer, contact page). The booking flow itself was not test-purchased; the file calls it the booking channel, not "official website".

## Production validation

After deploy, fetched live: `/llms.txt` → 200 with upgraded content; `/llm.txt` → 200; `/robots.txt` → AI crawlers allowed. No secrets/credentials/admin URLs in the file (grep-verified).

## llm.txt vs llms.txt (both retained)

| File | Role |
|---|---|
| `llms.txt` | Concise orientation + answerable facts (this file): entity, rooms, policy, activities, winter, FAQ facts, sources |
| `llm.txt` | Deep navigation layer: per-room facts with URLs, full guide list, booking paths, extended location detail |

Neither duplicates the other meaningfully; neither replaces robots/sitemap/schema/Search Console. If rooms, policies, guides, or contact details change, update both files and re-run `node scripts/validate-llm.mjs`.

## Remaining limitations

Static files — manual sync required (checklist in `docs/ai-discoverability.md`). No ranking/citation effect claimed or measurable here; Search Console + Business Profile remain client-side.
