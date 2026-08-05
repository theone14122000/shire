"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ELFSIGHT_INSTAGRAM_ID } from "@/lib/content";

const ITEM_WIDTH = 240;
const GAP = 14;

const FEED_CSS = `
  .eapps-instagram-feed-container,
  .eapps-instagram-feed-posts {
    height: auto !important;
    max-height: none !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    scrollbar-width: none !important;
  }
  .eapps-instagram-feed-container::-webkit-scrollbar,
  .eapps-instagram-feed-posts::-webkit-scrollbar {
    display: none !important;
  }
  .eapps-instagram-feed-posts-grid {
    display: flex !important;
    flex-wrap: nowrap !important;
    gap: ${GAP}px !important;
    overflow: visible !important;
    scroll-snap-type: x mandatory !important;
  }
  .eapps-instagram-feed-posts-item {
    flex: 0 0 ${ITEM_WIDTH}px !important;
    width: ${ITEM_WIDTH}px !important;
    aspect-ratio: 1 / 1 !important;
    scroll-snap-align: start !important;
  }
  @media (max-width: 640px) {
    .eapps-instagram-feed-posts-item {
      flex-basis: 74vw !important;
      width: 74vw !important;
    }
  }
`;

function findShadowRoot(root: HTMLElement): ShadowRoot | null {
  if (root.shadowRoot) return root.shadowRoot;
  for (const child of Array.from(root.querySelectorAll("*"))) {
    if ((child as HTMLElement).shadowRoot) return (child as HTMLElement).shadowRoot;
  }
  return null;
}

export function InstagramFeed() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const inject = () => {
      const shadow = findShadowRoot(host);
      if (shadow) {
        const style = document.createElement("style");
        style.textContent = FEED_CSS;
        shadow.appendChild(style);
        return true;
      }
      return false;
    };

    if (inject()) return;

    const timer = setInterval(() => {
      if (inject()) clearInterval(timer);
    }, 700);
    return () => clearInterval(timer);
  }, []);

  const scrollFeed = (dir: 1 | -1) => {
    const host = hostRef.current;
    if (!host) return;
    const scroller = host.querySelector<HTMLElement>(
      ".eapps-instagram-feed-posts, .eapps-instagram-feed-container, .eapps-instagram-feed-items"
    );
    scroller?.scrollBy({ left: dir * (ITEM_WIDTH + GAP), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={hostRef} className={`elfsight-app-${ELFSIGHT_INSTAGRAM_ID}`} data-elfsight-app-lazy />

      <button
        type="button"
        onClick={() => scrollFeed(-1)}
        aria-label="Previous Instagram posts"
        className="absolute -left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/15 bg-cream-50/90 text-emerald-950 shadow-[var(--shadow-soft)] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-gold-400 lg:flex"
      >
        <ChevronLeft size={18} strokeWidth={2.2} />
      </button>
      <button
        type="button"
        onClick={() => scrollFeed(1)}
        aria-label="Next Instagram posts"
        className="absolute -right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/15 bg-cream-50/90 text-emerald-950 shadow-[var(--shadow-soft)] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-gold-400 lg:flex"
      >
        <ChevronRight size={18} strokeWidth={2.2} />
      </button>
    </div>
  );
}
