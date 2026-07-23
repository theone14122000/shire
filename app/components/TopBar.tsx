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
      className="relative z-50 w-full bg-[#0a2c25] text-sm font-medium border-b border-white/10"
    >
      <div className="container-luxe flex h-11 items-center justify-center gap-6 px-5 sm:justify-end sm:gap-8 overflow-hidden whitespace-nowrap">
        
        {/* Phone Section */}
        <div className="flex items-center gap-2 text-white">
          <Phone size={15} strokeWidth={2.5} className="text-emerald-300" />
          <span className="text-[13px] font-medium">
            {brand.phoneDisplay.map((phone, i) => (
              <a
                key={phone}
                href={brand.phoneHref[i]}
                className="hover:text-amber-300 transition-colors"
              >
                {phone.replace(/ /g, "\u00A0")}
                {i < brand.phoneDisplay.length - 1 && ",\u00A0"}
              </a>
            ))}
          </span>
        </div>

        {/* Email Section */}
        <div className="flex items-center gap-2 text-white">
          <Mail size={15} strokeWidth={2.5} className="text-emerald-300" />
          <a
            href={`mailto:${brand.email}`}
            className="text-[13px] font-medium hover:text-amber-300 transition-colors"
          >
            {brand.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
}