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
import { ArrowUpRight } from "lucide-react";
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

function useParallax<T extends HTMLElement>(range: [string, string]) {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const value = useTransform(scrollYProgress, [0, 1], range);
  const prefersReduced = useReducedMotion();
  return { ref, y: prefersReduced ? useMotionValue(0) : value };
}

/* ── Image card (shared design for both rows) ── */

function ImageCard({
  image,
  priority,
}: {
  image: SustainabilityFeaturedImage;
  priority?: boolean;
}) {
  const { ref, y } = useParallax(["-6%", "6%"]);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="relative bg-white/70 p-3 pb-4 shadow-[0_18px_50px_-18px_rgba(6,40,25,0.2)] transition-colors duration-500 hover:bg-white/80">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#dce9dc] sm:aspect-[4/4.6]">
          <motion.div style={{ y, scale: 1.12 }} className="absolute inset-0">
            <Image
              src={image.src}
              alt={image.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 480px"
              className="object-cover"
            />
          </motion.div>
        </div>
        <div className="px-2 pb-1.5 pt-5 text-left">
          <span className="mb-3 block h-px w-10 bg-gold-600/60" />
          <p className="font-display text-xl font-semibold leading-snug text-emerald-950 sm:text-[1.35rem]">
            {image.title}
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-700">
            {image.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Text block for initiative content ── */

function TextBlock({ initiative }: { initiative: SustainabilityPillar }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center"
    >
      <span className="luxe-kicker text-gold-700">{initiative.title}</span>
      <p className="mt-5 max-w-[48ch] text-base leading-[1.9] text-emerald-900/80 sm:text-lg">
        {initiative.body}
      </p>
    </motion.div>
  );
}

/* ── Main component ── */

export function SustainabilityContent({ content }: { content: SustainabilityContent }) {
  const kitchenInitiative = content.initiatives.find(
    (item) => item.title?.includes("Kitchen")
  );
  const rainInitiative = content.initiatives.find(
    (item) => item.title?.includes("Himalayan Rain")
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#dce9dc] text-emerald-950">
      <MotionConfig reducedMotion="user">
        <HeroSection hero={content.hero} />

        {/* Our Conscious Choices + From Kitchen to Garden: combined text LEFT + image RIGHT */}
        {kitchenInitiative && (
          <section className="bg-[#fffdf7] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-24">
            <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-center space-y-10"
              >
                <div>
                  <span className="luxe-kicker text-gold-700">{content.approach.kicker}</span>
                  <p className="mt-5 max-w-[48ch] text-base leading-[1.9] text-emerald-900/80 sm:text-lg">
                    {content.approach.body}
                  </p>
                </div>
                <div>
                  <span className="luxe-kicker text-gold-700">{kitchenInitiative.title}</span>
                  <p className="mt-5 max-w-[48ch] text-base leading-[1.9] text-emerald-900/80 sm:text-lg">
                    {kitchenInitiative.body}
                  </p>
                </div>
              </motion.div>
              <ImageCard image={content.featured[0]} priority />
            </div>
          </section>
        )}

        {/* Row 2: Rain text LEFT + Image RIGHT */}
        {rainInitiative && (
          <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-24">
            <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <TextBlock initiative={rainInitiative} />
              <ImageCard image={content.featured[1]} />
            </div>
          </section>
        )}

        <ClosingSection closing={content.closing} />
      </MotionConfig>
    </div>
  );
}

/* ── Hero ── */

function HeroSection({ hero }: { hero: SustainabilityHero }) {
  const { ref, y } = useParallax(["-6%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#fffdf7] px-5 pt-24 sm:px-8 sm:pt-32 lg:px-14 lg:pt-40 pb-16 sm:pb-20 lg:pb-28"
    >
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

/* ── Closing ── */

function ClosingSection({ closing }: { closing: SustainabilityClosing }) {
  const { ref, y } = useParallax(["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#1E3E2B] px-5 py-24 text-center text-cream-50 sm:px-8 sm:py-32 lg:px-14"
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
          className="mt-7 font-display text-2xl font-semibold leading-[1.08] text-cream-50 sm:text-3xl"
        >
          {closing.heading}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl text-[10px] leading-[1.6] text-cream-100/70 sm:text-xs"
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
