"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

/**
 * TopBar — Premium single-line contact bar. Numbers stay tightly aligned,
 * yellow on deep emerald, single continuous row.
 */
export function TopBar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 w-full border-b border-amber-400/10 bg-[#052923] text-sm font-medium"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="container-luxe flex w-full items-center justify-center gap-6 overflow-hidden px-4 py-2.5 sm:justify-end sm:gap-8 sm:px-6">
        
        {/* Numbers grouped in one line with clean comma spacing */}
        <a
          href={brand.phoneHref[0]}
          aria-label="Call first number"
          className="group flex shrink-0 items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-colors group-hover:bg-amber-400/10 group-hover:text-amber-400">
            <Phone size={14} strokeWidth={2.5} />
          </span>
          <span className="font-sans text-[13px] font-semibold tabular-nums tracking-normal">
            {brand.phoneDisplay[0]}
            {brand.phoneDisplay[1] && (
              <span className="mx-1.5 text-amber-400/60">,</span>
            )}
            {brand.phoneDisplay[1]}
          </span>
        </a>

        {/* Separator */}
        <span className="hidden h-3.5 w-px shrink-0 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent sm:block" />

        {/* Email */}
        <a
          href={`mailto:${brand.email}`}
          aria-label={`Email ${brand.email}`}
          className="group flex shrink-0 items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-colors group-hover:bg-amber-400/10 group-hover:text-amber-400">
            <Mail size={14} strokeWidth={2.5} />
          </span>
          <span className="font-sans text-[13px] font-semibold tabular-nums tracking-normal">
            {brand.email}
          </span>
        </a>
      </div>
    </motion.div>
  );
}