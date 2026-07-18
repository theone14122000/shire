"use client";

import { brand } from "@/lib/content";

/**
 * TopBar — the slim emerald strip from the original site (phone +
 * email), sitting above the main nav. Hidden on small screens.
 */
export function TopBar() {
  return (
    <div className="bg-accent-emerald text-beige-100 text-xs sm:text-sm font-semibold">
      <div className="container-luxe flex items-center justify-center sm:justify-end gap-4 sm:gap-6 py-2 sm:py-2.5 overflow-x-auto no-scrollbar">
        {brand.phoneDisplay.map((p, i) => (
          <a
            key={p}
            href={brand.phoneHref[i]}
            className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              className="opacity-90"
            >
              <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </svg>
            {p}
          </a>
        ))}
        <a
          href={`mailto:${brand.email}`}
          className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="opacity-90"
          >
            <path
              d="M3 5h18v14H3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M3 5l9 7 9-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          {brand.email}
        </a>
      </div>
    </div>
  );
}
