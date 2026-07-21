"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

export function TopBar() {
  // Join all phone numbers into one string with non-breaking spaces
  const phoneString = brand.phoneDisplay
    .map((p) => p.replace(/ /g, "\u00A0"))
    .join(",\u00A0");

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 w-full border-b border-amber-400/10 bg-[#052923]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      {/* One single non-wrapping line */}
      <div
        className="container-luxe flex h-10 items-center justify-center gap-6 px-4 sm:justify-end sm:gap-8 sm:px-6"
        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
      >
        {/* Phone */}
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300">
            <Phone size={13} strokeWidth={2.5} />
          </span>
          <span className="text-[13px] font-semibold text-amber-400" style={{ whiteSpace: "nowrap" }}>
            {brand.phoneDisplay.map((phone, i) => (
              <a key={i} href={brand.phoneHref[i]} className="hover:text-amber-300 transition-colors">
                {phone.replace(/ /g, "\u00A0")}
                {i < brand.phoneDisplay.length - 1 && ",\u00A0"}
              </a>
            ))}
          </span>
        </span>

        {/* Separator */}
        <span className="inline-block h-4 w-px bg-white/15" />

        {/* Email */}
        <a
          href={`mailto:${brand.email}`}
          className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors"
          style={{ whiteSpace: "nowrap" }}
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300">
            <Mail size={13} strokeWidth={2.5} />
          </span>
          <span className="text-[13px] font-semibold text-amber-400">
            {brand.email}
          </span>
        </a>
      </div>
    </motion.div>
  );
}