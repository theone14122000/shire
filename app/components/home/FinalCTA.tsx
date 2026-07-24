"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Container } from "../ui/Container";
import { finalCta } from "@/lib/content";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      id="book"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden bg-emerald-950 py-28 sm:py-36 lg:py-48"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 -top-1/4 h-[40rem] w-[40rem] rounded-full bg-emerald-800/50 blur-[140px]"
        style={{ y: bgY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[35rem] w-[35rem] rounded-full bg-gold-500/10 blur-[140px]"
        style={{ y: overlayY }}
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-cream-200/50">
            <span aria-hidden className="h-px w-8 bg-cream-200/30" />
            {finalCta.eyebrow}
            <span aria-hidden className="h-px w-8 bg-cream-200/30" />
          </span>

          <h2 className="mt-8 font-display text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {finalCta.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream-200/60 sm:text-lg">
            {finalCta.body}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href={finalCta.primary.href}
              className="group inline-flex items-center gap-3 rounded-full bg-gold-500 px-10 py-4 text-sm font-bold text-emerald-950 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-2xl"
            >
              {finalCta.primary.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href={finalCta.secondary.href}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 px-8 py-4 text-sm font-bold text-cream-100 transition-all duration-300 hover:border-gold-500/60 hover:text-gold-400"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {finalCta.secondary.label}
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-cream-200/30">
            <span>No booking fee</span>
            <span aria-hidden className="h-3 w-px bg-cream-200/20" />
            <span>Free cancellation</span>
            <span aria-hidden className="h-3 w-px bg-cream-200/20" />
            <span>Instant confirmation</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
