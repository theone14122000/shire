"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { finalCta } from "@/lib/content";

/**
 * FinalCTA — strong conversion-focused closer.
 */
export function FinalCTA() {
  return (
    <section
      id="book"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(700px 380px at 50% 0%, rgba(176,138,74,0.14), transparent 60%)",
        }}
        aria-hidden
      />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="mx-auto max-w-4xl text-center flex flex-col items-center gap-6 sm:gap-8"
        >
          <motion.span
            variants={itemV}
            className="eyebrow inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-ink-900/40" aria-hidden />
            {finalCta.eyebrow}
            <span className="h-px w-8 bg-ink-900/40" aria-hidden />
          </motion.span>

          <motion.h2
            variants={itemV}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.025em] text-ink-900 max-w-[20ch] font-bold"
          >
            {finalCta.heading}
          </motion.h2>

          <motion.p
            variants={itemV}
            className="body-lg max-w-[60ch] text-ink-700 font-semibold"
          >
            {finalCta.body}
          </motion.p>

          <motion.div
            variants={itemV}
            className="mt-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-5"
          >
            <Button as="link" href={finalCta.primary.href} variant="primary">
              {finalCta.primary.label}
              <Arrow />
            </Button>
            <Button
              as="link"
              href={finalCta.secondary.href}
              variant="secondary"
            >
              {finalCta.secondary.label}
            </Button>
          </motion.div>

          <motion.div
            variants={itemV}
            className="mt-10 pt-8 border-t-2 border-ink-900/15 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-ink-700 font-semibold"
          >
            <a
              href="mailto:reservations@thehimalayanshire.com"
              className="hover:text-ink-900 transition-colors"
            >
              reservations@thehimalayanshire.com
            </a>
            <span className="hidden sm:inline text-ink-500/40">·</span>
            <a
              href="tel:+918169898066"
              className="hover:text-ink-900 transition-colors"
            >
              +91 81698 98066
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

const itemV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
