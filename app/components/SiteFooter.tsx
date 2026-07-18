"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { brand, footer } from "@/lib/content";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

/**
 * SiteFooter — deep emerald close with a bold location callout,
 * animated glow accents, and quiet award-winning polish.
 */
export function SiteFooter() {
  return (
    <footer className="relative pt-20 sm:pt-28 pb-10 sm:pb-12 border-t-2 border-emerald-100/10 bg-emerald-950 text-emerald-50 overflow-hidden">
      {/* Ambient glow blobs — dynamic backdrop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-500/20 blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-amber-400/10 blur-[150px]"
        animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle decorative backdrop text */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 text-[16vw] sm:text-[11rem] font-display font-black leading-none tracking-tight text-emerald-50/[0.04] whitespace-nowrap"
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
          className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-14 sm:mb-20 pb-10 sm:pb-14 border-b-2 border-emerald-100/10"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <motion.span
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inline-flex h-full w-full rounded-full bg-amber-400"
            />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400" />
          </span>

          <span className="font-display text-[7vw] sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-emerald-50 group-hover:opacity-70 transition-opacity">
            Fagu, Shimla, Himachal Pradesh
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-emerald-100/50 group-hover:text-amber-400 transition-colors sm:ml-2 mt-1 sm:mt-0">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-950"
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
              <span className="font-display text-lg tracking-[-0.01em] font-bold text-emerald-50">
                {brand.name}
              </span>
            </div>
            <p className="body-base text-emerald-100/70 max-w-[42ch] font-semibold">
              {footer.tagline}
            </p>
            <p className="eyebrow text-emerald-100/50">{brand.parent}</p>
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
              <h3 className="eyebrow text-emerald-100/50">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group/link relative inline-flex flex-col text-sm text-emerald-50 font-semibold"
                    >
                      {link.label}
                      <span className="mt-0.5 h-[1.5px] w-0 rounded-full bg-amber-400 transition-all duration-300 group-hover/link:w-full" />
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
            <h3 className="eyebrow text-emerald-100/50">Letter From The Shire</h3>
            <p className="text-sm text-emerald-100/70 leading-relaxed font-semibold">
              A short, occasional letter — season notes, the menu, and the
              small things happening at the shire.
            </p>
            <form
              className="flex items-center gap-2 border-b-2 border-emerald-100/25 pb-2 focus-within:border-amber-400 transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@email.com"
                aria-label="Email address"
                className="flex-1 bg-transparent text-sm text-emerald-50 placeholder:text-emerald-100/40 outline-none font-semibold"
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-[0.22em] text-emerald-50 hover:text-amber-400 transition-colors font-bold"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t-2 border-emerald-100/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-emerald-100/60 font-semibold">
          <p>{footer.legal}</p>
          <div className="flex items-center gap-5">
            {brand.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="hover:text-amber-400 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="hidden sm:inline-flex items-center gap-1.5 text-emerald-100/60 hover:text-amber-400 transition-colors font-bold uppercase tracking-[0.2em] text-[11px]"
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