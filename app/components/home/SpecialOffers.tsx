"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { specialOffers } from "@/lib/content";
import { stagger, fadeUp } from "../ui/Motion";
import {
  Calendar,
  Tag,
  ArrowUpRight,
  Clock,
} from "lucide-react";

/**
 * SpecialOffers — seasonal deals as premium editorial cards.
 * Each card has a badge, discount label, validity, and CTA.
 */
export function SpecialOffers() {
  return (
    <section
      id="offers"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-accent-leaf/10 blur-[130px]"
      />

      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative"
        >
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow={specialOffers.eyebrow}
              heading={specialOffers.heading}
              intro={specialOffers.intro}
            />
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {specialOffers.offers.map((offer, idx) => (
              <motion.div key={offer.id} variants={fadeUp}>
                <OfferCard offer={offer} index={idx} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  OfferCard — glass-surface card with badge + discount + CTA         */
/* ================================================================== */
function OfferCard({
  offer,
  index,
}: {
  offer: (typeof specialOffers.offers)[number];
  index: number;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink-900/8 bg-sage-50 shadow-[var(--shadow-card)] transition-all duration-500 hover:border-accent-leaf/40 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* Top gradient accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-accent-leaf via-accent-emerald to-accent-leaf" />

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        {/* Badge + Index */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-ink-900/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-leaf shadow-[0_0_6px_1px_rgba(132,199,127,0.5)]" />
            {offer.badge}
          </span>
          <span className="font-display text-sm font-bold tabular-nums text-ink-500/40">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-[1.35rem] font-bold leading-snug text-ink-900 tracking-tight">
          {offer.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-medium leading-relaxed text-ink-700 line-clamp-3">
          {offer.description}
        </p>

        {/* Meta row — discount + validity */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-leaf/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-700">
            <Tag size={11} strokeWidth={2.4} className="text-accent-emerald" />
            {offer.discountLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink-500">
            <Clock size={11} strokeWidth={2.2} className="text-ink-500/60" />
            {offer.validUntil}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-ink-900/10 to-transparent" />

        {/* CTA */}
        <a
          href={offer.ctaHref}
          className="group/cta inline-flex items-center gap-2 text-sm font-bold text-ink-900 transition-colors duration-300 hover:text-accent-emerald"
        >
          {offer.cta}
          <ArrowUpRight
            size={15}
            strokeWidth={2.4}
            className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.article>
  );
}
