# LLMs.txt — The Himalayan Shire

## What is LLMs.txt?

`llms.txt` is a machine-readable file that helps AI tools (like ChatGPT, Perplexity, Claude, etc.) understand your website. It provides a concise summary of your business, key pages, and contact information.

## Where is it?

Live at: `https://www.thehimalayanshire.com/llms.txt`

## What does it contain?

- Business name and tagline
- Location (Fagu, Himachal Pradesh)
- What the property is (family-run homestay, 7 rooms)
- Pet-friendly nature
- Key pages and their URLs
- Contact information (public only)

## What does it NOT do?

- It does NOT guarantee AI rankings
- It does NOT replace robots.txt, sitemap.xml, structured data, or Google Search Console
- It does NOT contain private information
- It is NOT a requirement — it's an additional resource

## How does it fit into SEO?

```
llms.txt (AI readability)
    ↓
robots.txt (crawler directives)
    ↓
sitemap.xml (page discovery)
    ↓
Structured Data (rich results)
    ↓
Search Console (monitoring)
    ↓
Normal SEO (content, links, etc.)
```

## Does it need updates?

Only if the property information changes significantly (new rooms, new location details, new contact info). It is not updated automatically when CMS content changes.

## Can I edit it?

Yes. The file is at `public/llms.txt` in the project. Edit it with any text editor. Keep it factual and concise — no keyword stuffing, no marketing claims.

## Companion file: llm.txt (2026-09-11)

A second file exists at `public/llm.txt`, live at `https://www.thehimalayanshire.com/llm.txt`.
It is NOT duplication: each file has a distinct, justified role.

| File | Role |
|---|---|
| `llms.txt` | Short property summary: identity, location, pet policy, key pages, contact. Quick orientation for any machine reader. |
| `llm.txt` | Deep navigation layer: per-room facts with canonical URLs, verified location relationships, activities actually offered, sustainability facts, real blog guides with canonical URLs, booking/contact paths, official profiles. Built for question-answering and citation (GEO). |

Both are static text files — zero performance cost, no CMS dependency. Update both when rooms, policies, contact details, or guides change. See `docs/ai-discoverability.md` for the full strategy.
