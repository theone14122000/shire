"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

/**
 * TopBar — Premium single-line contact bar with darker emerald background,
 * bright yellow contact text, smooth lift animations, and luxury micro-interactions.
 */
export function TopBar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 bg-[#052923] text-sm font-medium border-b border-amber-400/10"
    >
      {/* Subtle top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="container-luxe flex items-center justify-center sm:justify-end gap-x-8 gap-y-2 py-3 px-6 text-xs sm:text-sm overflow-x-auto no-scrollbar">
        
        {/* Phone Numbers */}
        {brand.phoneDisplay.map((phone, i) => (
          <motion.a
            key={phone}
            href={brand.phoneHref[i]}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group inline-flex items-center gap-2.5 whitespace-nowrap text-amber-400 hover:text-amber-300 transition-colors"
            aria-label={`Call ${phone}`}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 group-hover:bg-amber-400/10 group-hover:text-amber-400 transition-all duration-300">
              <Phone size={15} strokeWidth={2.75} />
            </div>
            <span className="font-semibold tracking-wide drop-shadow-sm">
              {phone}
            </span>
          </motion.a>
        ))}

        {/* Elegant separator */}
        <div className="hidden h-3.5 w-px bg-gradient-to-b from-transparent via-amber-400/30 to-transparent sm:block" />

        {/* Email */}
        <motion.a
          href={`mailto:${brand.email}`}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="group inline-flex items-center gap-2.5 whitespace-nowrap text-amber-400 hover:text-amber-300 transition-colors"
          aria-label={`Email us at ${brand.email}`}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 group-hover:bg-amber-400/10 group-hover:text-amber-400 transition-all duration-300">
            <Mail size={15} strokeWidth={2.75} />
          </div>
          <span className="font-semibold tracking-wide drop-shadow-sm">
            {brand.email}
          </span>
        </motion.a>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
}