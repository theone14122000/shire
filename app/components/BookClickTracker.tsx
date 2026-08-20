"use client";

import { useEffect } from "react";

export function BookClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href*="letsbook.me"]');
      if (!anchor) return;
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.("event", "begin_checkout", {
        event_category: "booking",
        event_label: "Book Now",
        value: anchor.getAttribute("href") ?? "",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}