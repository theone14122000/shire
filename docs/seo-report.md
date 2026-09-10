# SEO Report — The Himalayan Shire

## Audit date

2026-09-10

---

## Technical SEO

| Check | Status | Notes |
|-------|--------|-------|
| robots.txt | ✅ | `Allow: /`, only `/admin` & `/api` disallowed; Googlebot explicitly allowed |
| sitemap.xml | ✅ | Valid XML, contains canonical indexable URLs; includes `/pet-friendly-stay` |
| canonical URLs | ✅ | Every page has a `<link rel="canonical">`; homepage → `https://www.thehimalayanshire.com` |
| noindex directives | ✅ | None found on public pages |
| crawler blocking | ✅ | No middleware blocking; static `public/` assets served directly |
| HTTP status codes | ✅ | All public pages return `200` |
| redirects | ✅ | Naked domain `thehimalayanshire.com` → `www` (308 Permanent Redirect) |
| 404/500 errors | ✅ | None observed |
| server-rendered content | ✅ | Next.js SSR — HTML is server-rendered and visible to crawlers |
| mobile rendering | ✅ | Responsive design confirmed |
| sitemap includes | ✅ | Home, activities, sustainability, gallery, blog, contact, FAQ, pet-policy, pet-friendly-stay, rooms (dynamic) |

---

## On-page SEO

### Homepage

- **Title**: `The Himalayan Shire | Pet-Friendly Stay in Fagu, Near Shimla`
- **Description**: Pet-friendly homestay in Fagu, near Shimla and Kufri. Seven warm rooms, apple orchards, pine views — welcoming for travelers with dogs.
- **Keywords**: `pet friendly stay in Fagu`, `pet friendly stay near Shimla`, `pet friendly homestay Shimla`, `dog friendly stay Shimla`, `pet friendly accommodation Himachal Pradesh`, plus property/location terms.
- **H1**: Hero section with property identity.
- **OG/Twitter**: Updated to reflect pet-friendly positioning.

### Pet-Friendly Stay page (`/pet-friendly-stay`)

- **Title**: `Pet-Friendly Stay in Fagu, Near Shimla | The Himalayan Shire`
- **Description**: Travel with your dog to a pet-friendly homestay in Fagu, near Shimla.
- **Keywords**: pet-friendly stay, dog-friendly, Fagu, Shimla, Himachal Pradesh.
- **H1**: `Bring your pet to the Himalayas.`
- **FAQPage JSON-LD**: 5 Q&As about pet policy.

### Blog (`/blog/[slug]`)

- **Title**: Per-post SEO title or `{title} | The Himalayan Shire Blog`.
- **OG type**: `article`.
- **BlogPosting JSON-LD**: Headline, description, image, dates, author (Organization), publisher.

---

## Local SEO

**NAP consistency** (used everywhere):
- **Name**: The Himalayan Shire
- **Address**: Dehna Road, near Talayi Village, Fagu, Himachal Pradesh 171209
- **Phone**: +91 85804 11998 / +91 81686 98066
- **Location**: Fagu, near Kufri, Shimla ridge

References present on: homepage, contact page, FAQ, footer, JSON-LD Organization schema.

---

## Structured data

- **LodgingBusiness** (homepage `layout.tsx`): name, address, telephone, geo, amenityFeatures (Pet-friendly), sameAs, containsPlace.
- **WebSite** (homepage): name, url, publisher, inLanguage.
- **BlogPosting** (blog detail pages): headline, description, image, dates, author (Organization), publisher.
- **BreadcrumbList** (pet-friendly-stay page): Home → Pet-Friendly Stay.
- **FAQPage** (pet-friendly-stay page): 5 pet-policy Q&As.

---

## Favicon / site icon

See the Logo section of this report (separate). Favicon assets are deployed and verified on the production domain.

---

## Google Search Console — recommended actions

**Client action required** (external access needed):

1. **Verify** `https://www.thehimalayanshire.com/` in Google Search Console.
2. **Submit** the sitemap URL: `https://www.thehimalayanshire.com/sitemap.xml`
3. **URL Inspection** → request indexing for:
   - `https://www.thehimalayanshire.com/`
   - `https://www.thehimalayanshire.com/pet-friendly-stay`
   - `https://www.thehimalayanshire.com/faq`
   - `https://www.thehimalayanshire.com/contact`
4. **Check** structured data report for errors.
5. **Check** Coverage report for indexing status.
6. **Check** the favicon report (Google Search Console → Experience → Favicon).

---

## Google Business Profile — recommended actions

**Client action required** (external access needed):

1. Verify the GBP listing exists for **The Himalayan Shire** at **Fagu, Himachal Pradesh**.
2. Ensure the listing has:
   - Correct category (e.g., "Homestay" or "Guest house")
   - Website URL pointing to `https://www.thehimalayanshire.com/`
   - Phone number
   - High-quality property photos
   - Pet-friendly information (if supported by GBP)
3. Encourage genuine guests to leave reviews mentioning their experience with pets.

---

## Completed ✅

- Homepage metadata optimized for pet-friendly + location
- Pet-Friendly Stay page created with SEO metadata + FAQPage schema
- BreadcrumbList + BlogPosting structured data
- Sitemap includes `/pet-friendly-stay`
- robots.txt allows Googlebot
- Favicon assets deployed and verified
- JSON-LD WebSite + LodgingBusiness on homepage

## Recommended

- Submit sitemap to Google Search Console
- Request indexing for key URLs
- Set up Google Business Profile pet-friendly attributes
- Add FAQPage schema to the FAQ page (currently none — only pet-friendly-stay has it)

## Client action required

- Google Search Console verification & indexing requests
- Google Business Profile setup/update
- Confirm the GBP pet-friendly attribute if supported

---

## Important

SEO cannot guarantee rankings. The objective is to make Google clearly understand that The Himalayan Shire is a legitimate, relevant, indexable pet-friendly accommodation in Fagu near Shimla. Google controls when it recrawls and updates results.
