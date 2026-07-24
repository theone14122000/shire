"use client";

import { motion } from "framer-motion";
import { brand } from "@/lib/content";

export function FloatingActions() {
  return (
    <div className="fixed inset-x-0 bottom-6 z-40 pointer-events-none">
      <div className="container-luxe flex items-end justify-between pointer-events-none">
        <motion.a
          href={brand.phoneHref[0]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="pointer-events-auto inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-800 text-cream-50 shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:scale-110"
          aria-label="Call the shire"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" fill="currentColor" />
          </svg>
        </motion.a>

        <motion.a
          href={brand.whatsapp}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="pointer-events-auto inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1-.8.9-.9 1.1-.3.2-.6.1c-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1.1 1.1-1.1 2.7 1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.4 4.7.8.3 1.3.5 1.8.6.8.2 1.4.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
