"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

/**
 * TopBar — Premium single-line contact bar with darker emerald background,
 * clean tabular numbers, bright yellow contact text, and luxury micro-interactions.
 */
export function TopBar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 border-b border-amber-400/10 bg-[#052923] text-sm font-medium"
    >
      {/* Subtle top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="container-luxe no-scrollbar flex flex-nowrap items-center justify-center gap-x-6 overflow-x-auto px-6 py-2.5 sm:justify-end sm:gap-x-8">
        
        {/* Phone Numbers */}
        {brand.phoneDisplay.map((phone, i) => (
          <motion.a
            key={phone}
            href={brand.phoneHref[i]}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-amber-400 transition-colors hover:text-amber-300"
            aria-label={`Call ${phone}`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-all duration-300 group-hover:bg-amber-400/10 group-hover:text-amber-400">
              <Phone size={14} strokeWidth={2.5} />
            </span>
            <span className="font-sans text-[13px] font-semibold tabular-nums tracking-normal">
              {phone}
            </span>
          </motion.a>
        ))}

        {/* Elegant separator */}
        <span className="hidden h-3.5 w-px shrink-0 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent sm:block" />

        {/* Email */}
        <motion.a
          href={`mailto:${brand.email}`}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-amber-400 transition-colors hover:text-amber-300"
          aria-label={`Email us at ${brand.email}`}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-all duration-300 group-hover:bg-amber-400/10 group-hover:text-amber-400">
            <Mail size={14} strokeWidth={2.5} />
          </span>
          <span className="font-sans text-[13px] font-semibold tracking-normal">
            {brand.email}
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}