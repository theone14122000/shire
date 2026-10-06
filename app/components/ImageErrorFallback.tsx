"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide graceful handling of failed image loads (404s from removed,
 * renamed, or mistyped files). Hides the broken element so the container's
 * own background shows instead of a browser broken-image icon — layout and
 * design are untouched, because every image on the site sits in a styled,
 * sized frame. Mounted once in the root layout; the `error` event does not
 * bubble, so it is listened for in the capture phase. Admin routes are left
 * alone so editors still see missing files clearly during their work.
 */
export function ImageErrorFallback() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const onError = (event: Event) => {
      const el = event.target;
      if (!(el instanceof HTMLImageElement)) return;
      el.style.opacity = "0";
      if (process.env.NODE_ENV !== "production") {
        console.warn("[image] failed to load:", el.currentSrc || el.src);
      }
    };

    document.addEventListener("error", onError, true);
    return () => document.removeEventListener("error", onError, true);
  }, [pathname]);

  return null;
}
