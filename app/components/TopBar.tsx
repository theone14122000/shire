"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

/**
 * TopBar — Premium single-line contact bar.
 */
export function TopBar() {
  return (
    <motion.div
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 border-b border-amber-400/10 bg-[#04251d]"
    >
      {/* Premium top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="container-luxe flex h-11 flex-nowrap items-center justify-center gap-6 overflow-x-auto whitespace-nowrap px-5 no-scrollbar sm:justify-end">
        {brand.phoneDisplay.map((phone, i) => (
          <motion.a
            key={phone}
            href={brand.phoneHref[i]}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
            className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-all duration-300 group-hover:bg-amber-400/10 group-hover:text-amber-400">
              <Phone size={13} strokeWidth={2.5} />
            </span>

            <span
              className="whitespace-nowrap font-sans text-[13px] font-semibold leading-none tracking-normal text-amber-400 transition-colors duration-300 group-hover:text-amber-300"
              style={{
                fontVariantNumeric: "tabular-nums",
                fontFeatureSettings: '"tnum"',
              }}
            >
              {phone.replace(/ /g, "\u00A0")}
            </span>
          </motion.a>
        ))}

        <span className="hidden h-4 w-px shrink-0 bg-white/10 sm:block" />

        <motion.a
          href={`mailto:${brand.email}`}
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
          className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-all duration-300 group-hover:bg-amber-400/10 group-hover:text-amber-400">
            <Mail size={13} strokeWidth={2.5} />
          </span>

          <span className="whitespace-nowrap font-sans text-[13px] font-semibold leading-none tracking-normal text-amber-400 transition-colors duration-300 group-hover:text-amber-300">
            {brand.email}
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}