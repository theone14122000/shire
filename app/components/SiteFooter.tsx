"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { brand, footer } from "@/lib/content";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

/**
 * SiteFooter — light, editorial close with a bold location callout,
 * refined typography and quiet award-winning polish.
 */
export function SiteFooter() {
  return (
    <footer className="relative pt-20 sm:pt-28 pb-10 sm:pb-12 border-t-2 border-ink-900/10 bg-beige-50 text-ink-900 overflow-hidden">
      {/* Subtle decorative backdrop text */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 text-[16vw] sm:text-[11rem] font-display font-black leading-none tracking-tight text-ink-900/[0.03] whitespace-nowrap"
      >
        {brand.name}
      </span>

      <Container className="relative">
        {/* Location callout — the hero of the footer */}
        <motion.a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-14 sm:mb-20 pb-10 sm:pb-14 border-b-2 border-ink-900/10"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <motion.span
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald"
            />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-emerald" />
          </span>

          <span className="font-display text-[7vw] sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] group-hover:opacity-70 transition-opacity">
            Fagu, Shimla, Himachal Pradesh
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-ink-900/50 group-hover:text-accent-emerald transition-colors sm:ml-2 mt-1 sm:mt-0">
            View on map
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path
                d="M3 11L11 3M11 3H4M11 3V10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.a>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-14 lg:mb-20">
          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-beige-100"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 19h18M5 19l1-7h12l1 7M9 12V8a3 3 0 0 1 6 0v4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <span className="font-display text-lg tracking-[-0.01em] font-bold text-ink-900">
                {brand.name}
              </span>
            </div>
            <p className="body-base text-ink-900/70 max-w-[42ch] font-semibold">
              {footer.tagline}
            </p>
            <p className="eyebrow text-ink-900/50">{brand.parent}</p>
          </motion.div>

          {/* Link columns */}
          {footer.columns.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 * (idx + 1) }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              <h3 className="eyebrow text-ink-900/50">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="relative text-sm text-ink-900 font-semibold inline-block after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-ink-900 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            <h3 className="eyebrow text-ink-900/50">Letter From The Shire</h3>
            <p className="text-sm text-ink-900/70 leading-relaxed font-semibold">
              A short, occasional letter — season notes, the menu, and the
              small things happening at the shire.
            </p>
            <form
              className="flex items-center gap-2 border-b-2 border-ink-900/25 pb-2 focus-within:border-ink-900 transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@email.com"
                aria-label="Email address"
                className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-900/40 outline-none font-semibold"
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-[0.22em] text-ink-900 hover:opacity-60 transition-opacity font-bold"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t-2 border-ink-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ink-900/60 font-semibold">
          <p>{footer.legal}</p>
          <div className="flex items-center gap-5">
            {brand.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="hover:text-ink-900 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="hidden sm:inline-flex items-center gap-1.5 text-ink-900/60 hover:text-ink-900 transition-colors font-bold uppercase tracking-[0.2em] text-[11px]"
          >
            Back to top
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M9 7.5L6 4.5L3 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </Container>
    </footer>
  );
}