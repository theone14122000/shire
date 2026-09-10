# Instagram Integration — The Himalayan Shire

## Current implementation

The website already has an Instagram widget using the **ElfSight** platform — a third-party service that provides an official Instagram feed embed. It is NOT web scraping.

- **Component**: `app/components/home/InstagramFeed.tsx`
- **Widget ID**: `ELFSIGHT_INSTAGRAM_ID` from `lib/content.ts`
- **Platform**: ElfSight (elfsight.com) — loads Instagram feed via their embed
- **Library**: ElfSight loads `https://elfsightcdn.com/platform.js` (lazy-loaded)

## How it works

1. The `<div data-elfsight-app-lazy />` host element is rendered.
2. ElfSight's platform.js hydrates the widget with the Instagram feed.
3. The widget renders a grid of Instagram posts inside a shadow DOM.
4. The component injects CSS into the shadow root for responsive styling.
5. A "View more" / "Show less" button toggles the visible post count.
6. Left/right arrow buttons allow horizontal scrolling.

## Responsive behavior

- Desktop: 3 compact posts, expandable to full feed.
- Mobile (≤640px): Single-column horizontal scroll with snap.
- Pagination/navigation buttons hide on mobile.
- Widget gracefully handles loading state with a polling retry (capped at 75 attempts).

## Performance

- The platform script loads with `strategy="lazyOnload"` — does not block initial render.
- The widget host renders before JavaScript hydrates.
- CSS is injected into the shadow DOM only.
- Scroll behavior is `smooth` and does not trigger layout shifts.

## Configuration

### Environment variable

```env
# ElfSight Instagram widget ID (from elfsight.com dashboard)
ELFSIGHT_INSTAGRAM_ID="9ef91159-a379-4f0d-a025-404b95790fae"
```

### Where it's used

- `app/components/home/InstagramFeed.tsx` — widget component
- `lib/content.ts` — stores `ELFSIGHT_INSTAGRAM_ID`
- `app/components/home/HomeEditorial.tsx` — renders `<InstagramFeed />`

## Fallback behavior

If the Instagram feed fails to load (blocked API, network error, or widget timeout):

- The host `<div>` renders as an empty container.
- The polling stops after 75 attempts (~60 seconds).
- The "View more" button still renders and is functional.
- The page layout is not broken — the widget occupies its section space.

## Important rules

- **Do not scrape Instagram directly** — it violates platform rules. The ElfSight embed is the approved integration method.
- **Do not expose API credentials** in client-side code or GitHub.
- The ElfSight service handles authentication server-side.

## Client action required

1. Verify the ElfSight Instagram feed appears on the live site.
2. If the feed is empty, check the ElfSight dashboard — the Instagram account may need to be connected.
3. Ensure `ELFSIGHT_INSTAGRAM_ID` is set in the Vercel environment variables.
