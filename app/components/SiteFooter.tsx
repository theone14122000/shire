"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { brand, footer } from "@/lib/content";

/**
 * SiteFooter — quiet, editorial close with a dark ink surface
 * for visual closure.
 */
export function SiteFooter() {
  return (
    <footer className="relative pt-20 sm:pt-28 pb-10 sm:pb-12 border-t-2 border-ink-900/10 bg-ink-900 text-beige-100">
      <Container>
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-beige-100 text-ink-900"
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
              <span className="font-display text-lg tracking-[-0.01em] font-bold">
                {brand.name}
              </span>
            </div>
            <p className="body-base text-beige-100/80 max-w-[42ch] font-semibold">
              {footer.tagline}
            </p>
            <p className="eyebrow text-beige-100/60">{brand.parent}</p>
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
              <h3 className="eyebrow text-beige-100/70">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-beige-100 hover:text-beige-50 transition-colors font-semibold"
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
            <h3 className="eyebrow text-beige-100/70">Letter From The Shire</h3>
            <p className="text-sm text-beige-100/80 leading-relaxed font-semibold">
              A short, occasional letter — season notes, the menu, and the
              small things happening at the shire.
            </p>
            <form
              className="flex items-center gap-2 border-b-2 border-beige-100/30 pb-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@email.com"
                aria-label="Email address"
                className="flex-1 bg-transparent text-sm text-beige-100 placeholder:text-beige-100/40 outline-none font-semibold"
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-[0.22em] text-beige-100 hover:opacity-70 transition-opacity font-bold"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t-2 border-beige-100/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-beige-100/70 font-semibold">
          <p>{footer.legal}</p>
          <div className="flex items-center gap-5">
            {brand.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="hover:text-beige-50 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
