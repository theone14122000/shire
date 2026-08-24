"use client";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Sprout } from "lucide-react";
import type {
  SustainabilityApproach,
  SustainabilityClosing,
  SustainabilityContent,
  SustainabilityFeaturedImage,
  SustainabilityHero,
  SustainabilityPillar,
} from "@/lib/sustainability-content";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/*  Scroll-driven helpers (same pattern as home sections)              */
/* ------------------------------------------------------------------ */

function useParallax<T extends HTMLElement>(range: [string, string]) {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const value = useTransform(scrollYProgress, [0, 1], range);
  const prefersReduced = useReducedMotion();
  return { ref, y: prefersReduced ? useMotionValue(0) : value };
}

export function SustainabilityContent({ content }: { content: SustainabilityContent }) {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "linear-gradient(135deg, #98FF98 0%, #00A86B 100%)", color: "#1A1A1A" }}>
      <MotionConfig reducedMotion="user">
        <HeroSection hero={content.hero} />
        <ApproachSection approach={content.approach} image={content.featured[0]} initiatives={content.initiatives} />
        <VisualStorySection image={content.featured[1]} initiatives={content.initiatives} />
        <InitiativesSection initiatives={filterInitiatives(content.initiatives)} />
        <ClosingSection closing={content.closing} />
      </MotionConfig>
    </div>
  );
}

function filterInitiatives(initiatives: SustainabilityPillar[]) {
  if (!Array.isArray(initiatives)) return [];
  return initiatives.filter((_, index) => index !== 3 && index !== 4);
}

/* ── 01 · Hero ── */

function HeroSection({ hero }: { hero: SustainabilityHero }) {
  const { ref, y } = useParallax(["-6%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden px-5 pt-24 sm:px-8 sm:pt-32 lg:px-14 lg:pt-40">
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-white/40 blur-[120px]"
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20"
      >
        <div>
          <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
            {hero.kicker}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-emerald-950 sm:text-6xl lg:text-7xl"
          >
            {hero.heading}
          </motion.h1>
        </div>
        <motion.div variants={fadeUp}>
          <span className="block h-px w-16 bg-gold-600/70" />
          <p className="mt-6 max-w-xl text-base leading-[1.9] text-emerald-900/80 sm:text-lg">
            {hero.intro}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── 02 · Philosophy — content above image card ── */

function ApproachSection({
  approach,
  image,
  initiatives,
}: {
  approach: SustainabilityApproach;
  image: SustainabilityFeaturedImage;
  initiatives: SustainabilityPillar[];
}) {
  const { ref, y } = useParallax(["6%", "-6%"]);
  const kitchenInitiative = initiatives.find(
    (item) => item.title && item.title.includes("Kitchen")
  );

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="flex flex-col items-center text-center mb-24 sm:mb-32 lg:mb-40"
        >
          <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
            {approach.kicker}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 max-w-md font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl"
          >
            {image.title ?? approach.heading}
          </motion.h2>
          <motion.span variants={fadeUp} className="mt-8 block h-px w-16 bg-gold-600/60" />
          {kitchenInitiative && (
            <motion.div
              variants={fadeUp}
              className="mt-8 max-w-[62ch] space-y-6 text-left"
            >
              <p key={0} className="text-base leading-[1.9] text-emerald-900/80 sm:text-lg">
                {kitchenInitiative.body}
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
        >
          <div className="relative bg-white/70 p-3 pb-4 transition-colors duration-500 hover:bg-white/80 shadow-[0_18px_50px_-18px_rgba(6,40,25,0.25)] lg:-mr-10 mx-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-emerald-100 sm:aspect-[4/4.6]">
              <motion.div style={{ y, scale: 1.12 }} className="absolute inset-0">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 03 · Visual story — full-width feature with layered content ── */

function VisualStorySection({
  image,
  initiatives,
}: {
  image: SustainabilityFeaturedImage;
  initiatives: SustainabilityPillar[];
}) {
  const { ref, y } = useParallax(["-8%", "8%"]);
  const rainInitiative = initiatives.find(
    (item) => item.title && item.title.includes("Himalayan Rain")
  );

  return (
    <section ref={ref} className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto mb-24 sm:mb-32 lg:mb-40"
        >
          {rainInitiative && (
            <div className="mx-auto text-center max-w-md">
              <motion.h2
                variants={fadeUp}
                className="mt-0 text-4xl font-semibold leading-[1.08] text-emerald-950 sm:text-5xl"
              >
                {rainInitiative.title}
              </motion.h2>
              <p
                key={0}
                className="mt-4 text-sm leading-[1.6] text-emerald-900/80 sm:text-base"
              >
                {rainInitiative.body}
              </p>
            </div>
          )}
        </motion.div>

        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-emerald-100 sm:aspect-[16/8] lg:aspect-[21/9]">
            <motion.div style={{ y, scale: 1.12 }} className="absolute inset-0">
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(max-width: 1024px) 100vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 04 · Initiatives — editorial numbered rows with micro-interactions ── */

function InitiativesSection({ initiatives }: { initiatives: SustainabilityPillar[] }) {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        className="mx-auto max-w-[1400px]"
      >
        {initiatives.map((initiative, index) => (
          <motion.div
            key={`${initiative.title}-${index}`}
            variants={fadeUp}
            className="group grid gap-6 border-t border-emerald-900/15 py-10 last:border-b lg:grid-cols-[0.45fr_0.55fr] lg:gap-16"
          >
            <h3 className="flex items-baseline gap-5 transition-transform duration-500 group-hover:translate-x-2">
              <span className="font-display text-sm font-semibold text-emerald-700 transition-colors duration-300 group-hover:text-emerald-600">
                <span className="relative">
                  <span className="font-display text-lg font-semibold leading-snug text-emerald-950 transition-colors duration-300 group-hover:text-emerald-800 sm:text-xl lg:text-2xl">
                    {initiative.title}
                  </span>
                  <span className="absolute -bottom-1.5 left-0 block h-px w-0 bg-emerald-600/70 transition-all duration-500 group-hover:w-full" />
                </span>
              </span>
            </h3>
            <p className="max-w-[72ch] text-base leading-[1.8] text-emerald-900/85 sm:text-[1.0625rem]">
              {initiative.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ── 05 · Commitment / CTA ── */

function ClosingSection({ closing }: { closing: SustainabilityClosing }) {
  const { ref, y } = useParallax(["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-5 py-24 text-center sm:px-8 sm:py-32 lg:px-14"
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute -left-32 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-gold-500/[0.06] blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute -right-32 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-emerald-500/[0.08] blur-[120px]"
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto max-w-3xl"
      >
        <motion.span variants={fadeUp} className="luxe-kicker justify-center text-gold-700">
          {closing.kicker}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="mt-7 font-display text-4xl font-semibold leading-[1.08] text-emerald-950 sm:text-5xl"
        >
          {closing.heading}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl text-sm leading-[1.6] text-emerald-900/75 sm:text-base"
        >
          {closing.body}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link href="/contact" className="luxe-button mt-10">
            {closing.ctaLabel}
            <ArrowUpRight size={15} strokeWidth={1.8} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}