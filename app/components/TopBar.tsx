"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

/**
 * TopBar — the slim premium emerald strip sitting above the main nav.
 * Features elegant hover states, micro-animations, and gold-accented contact text.
 */
export function TopBar() {
  return (
    <div className="relative z-50 border-b border-white/5 bg-[#031d16] py-2 text-xs font-medium tracking-wide text-beige-100/90 sm:py-2.5">
      {/* Decorative top ambient line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="container-luxe no-scrollbar flex items-center justify-center overflow-x-auto gap-4 sm:justify-end sm:gap-6">
        
        {/* Phone Links */}
        {brand.phoneDisplay.map((phone, i) => (
          <motion.a
            key={phone}
            href={brand.phoneHref[i]}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -0.5, scale: 1.015 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group inline-flex items-center gap-2 whitespace-nowrap outline-none transition-colors"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-950/50 text-emerald-400 transition-colors group-hover:bg-amber-400/10 group-hover:text-amber-400">
              <Phone size={11} strokeWidth={2.4} className="transition-transform duration-300 group-hover:rotate-12" />
            </span>
            <span className="text-[11px] uppercase tracking-wider text-emerald-100/70">
              Call:
            </span>
            <span className="font-bold text-amber-400 transition-colors duration-200 group-hover:text-amber-300 drop-shadow-[0_1px_4px_rgba(251,191,36,0.15)]">
              {phone}
            </span>
          </motion.a>
        ))}

        {/* Separator line on desktop */}
        <span className="hidden h-3.5 w-px bg-white/10 sm:inline-block" aria-hidden />

        {/* Email Link */}
        <motion.a
          href={`mailto:${brand.email}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -0.5, scale: 1.015 }}
          transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
          className="group inline-flex items-center gap-2 whitespace-nowrap outline-none transition-colors"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-950/50 text-emerald-400 transition-colors group-hover:bg-amber-400/10 group-hover:text-amber-400">
            <Mail size={11} strokeWidth={2.4} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <span className="text-[11px] uppercase tracking-wider text-emerald-100/70">
            Email:
          </span>
          <span className="font-bold text-amber-400 transition-colors duration-200 group-hover:text-amber-300 drop-shadow-[0_1px_4px_rgba(251,191,36,0.15)]">
            {brand.email}
          </span>
        </motion.a>
      </div>
    </div>
  );
}