"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "./ui/Container";
import { brand } from "@/lib/content";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

const FOOTER_COLUMNS = [
  {
    title: "Contact",
    links: [
      { label: brand.email, href: `mailto:${brand.email}` },
      { label: brand.phoneDisplay[0], href: brand.phoneHref[0] },
      { label: brand.phoneDisplay[1], href: brand.phoneHref[1] },
    ],
  },
  {
    title: "Stay",
    links: [
      { label: "Rooms", href: "/#rooms" },
      { label: "Kitchen", href: "/kitchen" },
      { label: "Pet Policy", href: "/pet-policy" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Activities", href: "/activities" },
      { label: "Gallery", href: "/gallery" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-900/15 bg-emerald-950 pb-10 pt-20 text-cream-200 sm:pb-12 sm:pt-28">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[16vw] font-semibold leading-none text-cream-50/[0.035] sm:-bottom-10 sm:text-[11rem]"
      >
        {brand.name}
      </span>

      <Container className="relative">
        <motion.a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group mb-14 flex flex-col gap-3 border-b border-emerald-800/60 pb-10 sm:mb-20 sm:flex-row sm:items-center sm:gap-4 sm:pb-14"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <motion.span
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inline-flex h-full w-full rounded-full bg-gold-400"
            />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-gold-400" />
          </span>
          <span className="font-display text-[7vw] font-semibold leading-[1.05] text-cream-50 transition-opacity group-hover:opacity-70 sm:text-3xl md:text-4xl lg:text-5xl">
            Fagu, Shimla, Himachal Pradesh
          </span>
          <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cream-200/40 transition-colors group-hover:text-gold-400 sm:ml-2 sm:mt-0 sm:text-sm">
            View on map
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.a>

        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mb-20 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5 lg:col-span-5"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 text-emerald-950">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 19h18M5 19l1-7h12l1 7M9 12V8a3 3 0 0 1 6 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold text-cream-50">{brand.name}</span>
            </div>
            <p className="max-w-[42ch] text-sm font-medium leading-relaxed text-cream-200/60">
              {brand.tagline}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-200/30">
              {brand.parent}
            </p>
          </motion.div>

          {FOOTER_COLUMNS.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 * (idx + 1) }}
              className="flex flex-col gap-4 lg:col-span-2"
            >
              <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-200/40">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} className="group/link relative inline-flex flex-col text-sm font-semibold text-cream-50">
                      {link.label}
                      <span className="mt-0.5 h-[1.5px] w-0 rounded-full bg-gold-400 transition-all duration-300 group-hover/link:w-full" />
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4 lg:col-span-3"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-200/40">
              Reservations
            </h3>
            <p className="text-sm font-medium leading-relaxed text-cream-200/60">
              Write to us or call directly for room availability, directions, and stay planning.
            </p>
            <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="luxe-button w-fit">
              WhatsApp Us
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-emerald-800/60 pt-8 text-xs font-medium text-cream-200/40 sm:flex-row sm:items-center">
          <p>Copyright 2026 The Himalayan Shire. A PageyBySaj property. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {brand.socials.map((social) => (
              <a key={social.label} href={social.href} className="transition-colors hover:text-gold-400">
                {social.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="hidden items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cream-200/40 transition-colors hover:text-gold-400 sm:inline-flex"
          >
            Back to top
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M9 7.5L6 4.5L3 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/") && !href.includes("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
