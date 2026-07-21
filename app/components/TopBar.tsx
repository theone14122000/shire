"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

export function TopBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 overflow-hidden bg-[#021a13] border-b border-emerald-900/40"
    >
      {/* Top gold accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      {/* Subtle shimmer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.4) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "topbar-shimmer 6s linear infinite",
        }}
      />

      <div className="container-luxe flex items-center justify-center gap-5 py-2 sm:justify-end sm:gap-7 sm:py-2.5">
        {/* Phone numbers */}
        {brand.phoneDisplay.map((phone, i) => (
          <motion.a
            key={phone}
            href={brand.phoneHref[i]}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.35 }}
            whileHover={{ y: -1 }}
            className="group inline-flex items-center gap-2 whitespace-nowrap transition-colors"
            aria-label={`Call ${phone}`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-400 transition-all duration-300 group-hover:bg-amber-400/15 group-hover:text-amber-400">
              <Phone
                size={10}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110"
              />
            </span>
            <span className="text-[11px] font-bold tracking-wide text-amber-400 transition-colors duration-200 group-hover:text-amber-300 sm:text-xs">
              {phone}
            </span>
          </motion.a>
        ))}

        {/* Divider */}
        <span className="hidden h-3 w-px bg-emerald-700/50 sm:block" aria-hidden />

        {/* Email */}
        <motion.a
          href={`mailto:${brand.email}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          whileHover={{ y: -1 }}
          className="group inline-flex items-center gap-2 whitespace-nowrap transition-colors"
          aria-label={`Email ${brand.email}`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-400 transition-all duration-300 group-hover:bg-amber-400/15 group-hover:text-amber-400">
            <Mail
              size={10}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
          <span className="text-[11px] font-bold tracking-wide text-amber-400 transition-colors duration-200 group-hover:text-amber-300 sm:text-xs">
            {brand.email}
          </span>
        </motion.a>
      </div>

      <style jsx>{`
        @keyframes topbar-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}