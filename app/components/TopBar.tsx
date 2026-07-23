"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

export function TopBar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 w-full border-b border-amber-400/10 bg-[#052923]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      {/* Single non-wrapping row, scrolls horizontally on very narrow screens rather than stacking */}
      <div className="topbar-scroll container-luxe flex h-10 items-center justify-center gap-3 overflow-x-auto px-3 sm:justify-end sm:gap-5 sm:px-6">
        {/* Phone group */}
        <div className="flex shrink-0 items-center gap-2 whitespace-nowrap sm:gap-3">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300">
            <Phone size={12} strokeWidth={2.5} />
          </span>

          {brand.phoneDisplay.map((phone, i) => (
            <span key={phone} className="flex items-center gap-2 sm:gap-3">
              
                href={brand.phoneHref[i]}
                className="font-mono text-[11px] font-semibold tabular-nums tracking-wide text-amber-400 transition-colors hover:text-amber-300 sm:text-[13px]"
              >
                {phone}
              </a>
              {i < brand.phoneDisplay.length - 1 && (
                <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-amber-400/40" />
              )}
            </span>
          ))}
        </div>

        {/* Separator */}
        <span className="h-4 w-px shrink-0 bg-white/15" />

        {/* Email */}
        
          href={`mailto:${brand.email}`}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap transition-colors hover:text-amber-300 sm:gap-3"
        >
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300">
            <Mail size={12} strokeWidth={2.5} />
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-wide text-amber-400 sm:text-[13px]">
            {brand.email}
          </span>
        </a>
      </div>

      <style jsx>{`
        .topbar-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .topbar-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}