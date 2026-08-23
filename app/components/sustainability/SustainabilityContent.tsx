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
        <ApproachSection approach={content.approach} image={content.featured[0]} />
        <VisualStorySection image={content.featured[1]} />
        <InitiativesSection initiatives={content.initiatives} />
        <ClosingSection closing={content.closing} />
      </MotionConfig>
    </div>
  );
}

/* ── 01 · Hero ── */

function HeroSection({ hero }: { hero: SustainabilityHero }) {
  const { ref, y } = useParallax(["-6%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden px-5 pt-24 sm:px-8 sm:pt-32 lg:px-14 lg:pt-40" style={{ backgroundImage: "radial-gradient at 70% -20%, #00A800 0%, transparent 50%, radial-gradient at -10% 80%, #007A12 20%, transparent 50%, linear-gradient(180deg, #005A22, #003B2B)" }}>
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-gold-500/[0.07] blur-[120px]"
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
            className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-emerald-100 sm:text-6xl lg:text-7xl"
          >
            {hero.heading}
          </motion.h1>
        </div>
        <motion.div variants={fadeUp}>
          <span className="block h-px w-16 bg-gold-600/70" />
          <p className="mt-6 max-w-xl text-base leading-[1.9] text-emerald-100/80 sm:text-lg">
            {hero.intro}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── 02 · Philosophy — asymmetric: content left, image bleeding right ── */

function ApproachSection({
  approach,
  image,
}: {
  approach: SustainabilityApproach;
  image: SustainabilityFeaturedImage;
}) {
  const { ref, y } = useParallax(["6%", "-6%"]);
  const paragraphs = approach.body.split("\n\n").filter(Boolean);

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-center lg:col-span-5"
        >
          <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
            {approach.kicker}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 max-w-md font-display text-4xl font-semibold leading-[1.06] text-emerald-100 sm:text-5xl"
          >
            {approach.heading}
          </motion.h2>
          <motion.span variants={fadeUp} className="mt-8 block h-px w-16 bg-gold-600/60" />
          <motion.div variants={fadeUp} className="mt-8 max-w-[62ch] space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-[1.9] text-emerald-100/80 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-7"
        >
          <div className="relative bg-emerald-900/80 p-3 pb-4 transition-colors duration-500 hover:bg-emerald-900/90 shadow-[0_18px_50px_-18px_rgba(6,40,25,0.4)] lg:-mr-10">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-emerald-950 sm:aspect-[4/4.6]">
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
            <div className="px-2 pb-1.5 pt-5 text-left">
              <span className="mb-3 block h-px w-10 bg-gold-600/60" />
              <p className="font-display text-xl font-semibold leading-snug text-emerald-100 sm:text-[1.35rem]">
                {image.title}
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-700">
                {image.caption}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 03 · Visual story — full-width feature with layered content ── */

function VisualStorySection({ image }: { image: SustainabilityFeaturedImage }) {
  const { ref, y } = useParallax(["-8%", "8%"]);

  return (
    <section ref={ref} className="bg-emerald-950 px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36" style={{ backgroundImage: "radial-gradient at 70% -20%, #00A800 0%, transparent 50%, radial-gradient at -10% 80%, #007A12 20%, transparent 50%, linear-gradient(180deg, #005A22, #003B2B)" }}>
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-emerald-950/95 p-3 pb-4 transition-shadow duration-500 hover:shadow-[0_32px_70px_-20px_rgba(0,90,34,0.55)] sm:p-4"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-emerald-950 sm:aspect-[16/8] lg:aspect-[21/9]">
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="relative z-10 mx-auto mt-6 w-full max-w-md bg-emerald-950 px-6 py-6 text-center text-emerald-100 shadow-[0_18px_50px_-18px_rgba(0,90,34,0.55)] sm:-mt-14 sm:px-10 sm:py-8 lg:-mt-20"
          >
            <span className="mx-auto mb-4 block h-px w-10 bg-gold-500/60" />
            <p className="font-display text-xl font-semibold leading-snug sm:text-2xl">
              {image.title}
            </p>
            <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-400">
              {image.caption}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 04 · Initiatives — editorial numbered rows with micro-interactions ── */

function InitiativesSection({ initiatives }: { initiatives: SustainabilityPillar[] }) {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40" style={{ backgroundImage: "radial-gradient at 70% -20%, #00A800 0%, transparent 50%, radial-gradient at -10% 80%, #007A12 20%, transparent 50%, linear-gradient(180deg, #005A22, #003B2B)" }}>
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
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative">
                <span className="font-display text-lg font-semibold leading-snug text-emerald-950 transition-colors duration-300 group-hover:text-emerald-800 sm:text-xl lg:text-2xl">
                  {initiative.title}
                </span>
                <span className="absolute -bottom-1.5 left-0 block h-px w-0 bg-emerald-600/70 transition-all duration-500 group-hover:w-full" />
              </span>
            </h3>
            <p className="max-w-[72ch] text-base leading-[1.8] text-emerald-100/90 sm:text-[1.0625rem]">
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
      className="relative overflow-hidden bg-emerald-950 px-5 py-24 text-center text-cream-50 sm:px-8 sm:py-32 lg:px-14"
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
        <motion.span variants={fadeUp} className="luxe-kicker justify-center text-gold-300">
          {closing.kicker}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="mt-7 font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl"
        >
          {closing.heading}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl text-base leading-[1.85] text-cream-100/70 sm:text-lg"
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