"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

/**
 * TopBar — Premium single-line contact bar with darker emerald background,
 * clean tabular numbers, bright yellow contact text, and luxury micro-interactions.
 * STRICT SINGLE LINE — no wrapping allowed.
 */
export function TopBar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 w-full border-b border-amber-400/10 bg-[#052923] text-sm font-medium"
    >
      {/* Subtle top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      {/* Single line container — strict nowrap */}
      <div className="container-luxe flex w-full flex-nowrap items-center justify-center gap-x-6 overflow-hidden px-4 py-3 sm:justify-end sm:gap-x-8 sm:px-6">
        
        {/* Phone Numbers — grouped in one item, separated by commas */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="group flex shrink-0 flex-nowrap items-center gap-2 text-amber-400 transition-colors hover:text-amber-300"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-all duration-300 group-hover:bg-amber-400/10 group-hover:text-amber-400">
            <Phone size={14} strokeWidth={2.5} />
          </span>

          <span className="flex items-center whitespace-nowrap font-sans text-[13px] font-semibold tabular-nums tracking-normal">
            {brand.phoneDisplay.map((phone, i) => (
              <span key={phone} className="flex items-center">
                <a
                  href={brand.phoneHref[i]}
                  aria-label={`Call ${phone}`}
                  className="hover:text-amber-300 transition-colors"
                >
                  {phone}
                </a>
                {i < brand.phoneDisplay.length - 1 && (
                  <span className="mx-1.5 text-amber-400/70">,</span>
                )}
              </span>
            ))}
          </span>
        </motion.div>

        {/* Email */}
        <motion.a
          href={`mailto:${brand.email}`}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="group flex shrink-0 flex-nowrap items-center gap-2 text-amber-400 transition-colors hover:text-amber-300"
          aria-label={`Email us at ${brand.email}`}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-all duration-300 group-hover:bg-amber-400/10 group-hover:text-amber-400">
            <Mail size={14} strokeWidth={2.5} />
          </span>
          <span className="whitespace-nowrap font-sans text-[13px] font-semibold tracking-normal">
            {brand.email}
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}