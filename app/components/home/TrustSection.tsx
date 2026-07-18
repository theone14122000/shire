"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { trustSection } from "@/lib/content";
import { fadeUp, stagger } from "../ui/Motion";

/**
 * TrustSection — centered, elegant trust indicators.
 * Top: 4 large stats. Bottom: two short guest quotes in card form.
 */
export function TrustSection() {
  return (
    <section
      id="trust"
      className="relative py-20 sm:py-24 lg:py-32 bg-beige-200/40"
    >
      <Container>
        <div className="text-center mx-auto max-w-3xl mb-14 lg:mb-20">
          <SectionHeading
            eyebrow={trustSection.eyebrow}
            heading={trustSection.heading}
            intro={trustSection.intro}
            align="center"
          />
        </div>

        {/* Stat row — each cell is a card with a strong shadow */}
        <motion.dl
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-14 lg:mb-20"
        >
          {trustSection.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="card-luxe p-7 sm:p-10 flex flex-col items-center text-center gap-3 hover:bg-beige-50"
            >
              <dt className="eyebrow text-ink-500/80 order-2">
                {stat.label}
              </dt>
              <dd className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink-900 leading-none tracking-[-0.03em] order-1 font-bold">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* Quote row */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {trustSection.reviews.map((review) => (
            <motion.figure
              key={review.author}
              variants={fadeUp}
              className="card-luxe flex flex-col gap-6 p-8 sm:p-10 hover:bg-beige-50"
            >
              <Stars />
              <blockquote className="font-display text-xl sm:text-2xl leading-snug text-ink-900 font-bold">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center justify-between text-sm text-ink-500 font-semibold">
                <span className="font-bold text-ink-900">
                  — {review.author}
                </span>
                <span className="eyebrow text-ink-500/80">
                  {review.source}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="Five out of five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="currentColor"
          aria-hidden
          className="text-ink-900"
        >
          <path d="M7 1l1.85 3.75 4.15.6-3 2.92.7 4.13L7 10.5l-3.7 1.9.7-4.13-3-2.92 4.15-.6L7 1z" />
        </svg>
      ))}
    </div>
  );
}