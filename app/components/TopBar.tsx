"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { brand } from "@/lib/content";

/**
 * TopBar — Enhanced dynamic emerald strip with smooth entrance,
 * interactive icons, and theme-matched hover states.
 * Hidden on small screens.
 */
export function TopBar() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-accent-emerald text-beige-100 text-xs sm:text-sm font-semibold relative overflow-hidden"
    >
      {/* Subtle animated gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          backgroundSize: "200% 100%",
          animation: "shimmer 8s linear infinite",
        }}
      />

      <div className="container-luxe flex items-center justify-center sm:justify-end gap-4 sm:gap-6 py-2 sm:py-2.5 overflow-x-auto no-scrollbar relative z-10">
        {brand.phoneDisplay.map((p, i) => (
          <motion.a
            key={p}
            href={brand.phoneHref[i]}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05, x: 2 }}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap group"
            aria-label={`Call ${p}`}
          >
            <motion.span
              whileHover={{ rotate: 12, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="flex items-center justify-center"
            >
              <Phone size={12} strokeWidth={2.5} className="opacity-90 group-hover:opacity-100" />
            </motion.span>
            <span className="relative">
              {p}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-beige-100/50 group-hover:w-full transition-all duration-300" />
            </span>
          </motion.a>
        ))}

        {/* Separator Dot */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden sm:block w-1 h-1 rounded-full bg-beige-100/40"
        />

        <motion.a
          href={`mailto:${brand.email}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.05, x: 2 }}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap group"
          aria-label={`Email ${brand.email}`}
        >
          <motion.span
            whileHover={{ rotate: -12, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="flex items-center justify-center"
          >
            <Mail size={13} strokeWidth={2.5} className="opacity-90 group-hover:opacity-100" />
          </motion.span>
          <span className="relative">
            {brand.email}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-beige-100/50 group-hover:w-full transition-all duration-300" />
          </span>
        </motion.a>
      </div>

      {/* Inline style for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}