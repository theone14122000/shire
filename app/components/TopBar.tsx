"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

export function TopBar() {
  return (
    <motion.div
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 border-b border-amber-400/10 bg-[#04251d]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="container-luxe flex h-11 items-center justify-center gap-6 overflow-x-auto whitespace-nowrap px-5 no-scrollbar sm:justify-end">
        {/* All phone numbers in one block, comma-separated */}
        <div className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-all duration-300 group-hover:bg-amber-400/10 group-hover:text-amber-400">
            <Phone size={13} strokeWidth={2.5} />
          </span>

          <span className="whitespace-nowrap font-sans text-[13px] font-semibold leading-none text-amber-400">
            {brand.phoneDisplay.map((phone, i) => (
              <a
                key={phone}
                href={brand.phoneHref[i]}
                className="transition-colors duration-300 hover:text-amber-300"
              >
                {phone.replace(/ /g, "\u00A0")}
                {i < brand.phoneDisplay.length - 1 && ",\u00A0"}
              </a>
            ))}
          </span>
        </div>

        <span className="hidden h-4 w-px shrink-0 bg-white/10 sm:block" />

        {/* Email */}
        <a
          href={`mailto:${brand.email}`}
          className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition-all duration-300 group-hover:bg-amber-400/10 group-hover:text-amber-400">
            <Mail size={13} strokeWidth={2.5} />
          </span>

          <span className="whitespace-nowrap font-sans text-[13px] font-semibold leading-none text-amber-400 transition-colors duration-300 group-hover:text-amber-300">
            {brand.email}
          </span>
        </a>
      </div>
    </motion.div>
  );
}