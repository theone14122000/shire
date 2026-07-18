// components/sections/SpecialOffers.tsx (Now the Embedded Instagram Gallery)
"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { useState } from "react";
import Script from "next/script";

/**
 * InstagramGallery — Elfsight Embed feed.
 * Uses a CSS height toggle to show a preview of the feed (approx 5 posts)
 * and expands to show the full feed (approx 10 posts).
 */
export function SpecialOffers() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="offers" className="section-accent relative py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12 mb-12 lg:mb-16">
          <SectionHeading
            eyebrow="@thehimalayanshire"
            heading="Follow Our Journey On Instagram"
            className="max-w-[60ch]"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-secondary self-start lg:self-auto"
          >
            {isExpanded ? "Show Less" : "View Full Feed"}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
          </motion.button>
        </div>

        {/* Embed Container with Height Toggle */}
        <div className="relative">
          <motion.div
            initial={false}
            animate={{ 
              // Collapsed height shows roughly 1 row (~5 items on desktop). 
              // Adjust these values if your Elfsight widget has different padding/sizing.
              height: isExpanded ? "auto" : "320px" 
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden relative"
          >
            {/* 
              YOUR ELFSIGHT EMBED CODE 
              Note: Changed 'class' to 'className' for React compatibility
            */}
            <div className="elfsight-app-9ef91159-a379-4f0d-a025-404b95790fae" data-elfsight-app-lazy></div>
          </motion.div>
        </div>

      </Container>

      {/* Elfsight Script - Loaded lazily for best performance */}
      <Script 
        src="https://elfsightcdn.com/platform.js" 
        strategy="lazyOnload" 
      />
    </section>
  );
}