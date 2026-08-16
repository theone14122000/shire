"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sprout } from "lucide-react";
import type {
  SustainabilityContent,
  SustainabilityFeaturedImage,
} from "@/lib/sustainability-content";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const ROTATIONS = [-2.2, 2.4];

export function SustainabilityContent({ content }: { content: SustainabilityContent }) {
  const paragraphs = content.approach.body.split("\n\n").filter(Boolean);

  return (
    <>
      {/* ── Hero ── */}
      <section className="px-5 pt-24 sm:px-8 sm:pt-32 lg:px-14 lg:pt-40">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20"
        >
          <div>
            <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
              {content.hero.kicker}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-emerald-950 sm:text-6xl lg:text-7xl"
            >
              {content.hero.heading}
            </motion.h1>
          </div>
          <motion.div variants={fadeUp}>
            <span className="block h-px w-16 bg-gold-600/70" />
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-emerald-950/70 sm:text-lg">
              {content.hero.intro}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Our Sustainability Approach ── */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"
        >
          <motion.div variants={fadeUp}>
            <span className="luxe-kicker text-gold-700">{content.approach.kicker}</span>
            <h2 className="mt-5 max-w-md font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
              {content.approach.heading}
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="max-w-[68ch] space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-[1.9] text-emerald-950/70 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Sustainability Images (gallery-style cards) ── */}
      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:gap-10 lg:gap-16"
        >
          {content.featured.map((image, index) => (
            <motion.div
              key={image.src}
              variants={fadeUp}
              className={index === 1 ? "md:mt-16" : ""}
            >
              <FeaturedCard image={image} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Sustainability Initiatives ── */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          className="mx-auto max-w-[1400px]"
        >
          {content.initiatives.map((initiative, index) => (
            <motion.div
              key={`${initiative.title}-${index}`}
              variants={fadeUp}
              className="group grid gap-6 border-t border-emerald-900/15 py-10 last:border-b lg:grid-cols-[0.45fr_0.55fr] lg:gap-16"
            >
              <h3 className="flex items-baseline gap-5">
                <span className="font-display text-sm font-semibold text-gold-700 transition-colors duration-300 group-hover:text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-semibold leading-snug text-emerald-950 transition-colors duration-300 group-hover:text-emerald-800 sm:text-xl lg:text-2xl">
                  {initiative.title}
                </span>
              </h3>
              <p className="max-w-[72ch] text-base font-bold leading-[1.8] text-emerald-950/70 sm:text-[1.0625rem]">
                {initiative.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Closing Statement / CTA ── */}
      <section className="bg-emerald-950 px-5 py-24 text-center text-cream-50 sm:px-8 sm:py-32 lg:px-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl"
        >
          <motion.span variants={fadeUp} className="luxe-kicker justify-center text-gold-300">
            {content.closing.kicker}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-7 font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl"
          >
            {content.closing.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-xl text-base leading-[1.85] text-cream-100/70 sm:text-lg"
          >
            {content.closing.body}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="luxe-button mt-10">
              {content.closing.ctaLabel}
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

function FeaturedCard({ image, index }: { image: SustainabilityFeaturedImage; index: number }) {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
      style={{ rotate: ROTATIONS[index % ROTATIONS.length] }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="bg-cream-50 p-3 pb-4 shadow-[0_18px_50px_-18px_rgba(6,40,25,0.4)] transition-shadow duration-500 hover:shadow-[0_32px_70px_-20px_rgba(6,40,25,0.5)]">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-emerald-950">
          <Image
            src={image.src}
            alt={image.title}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
        </div>
        <div className="px-2 pb-1.5 pt-5 text-center">
          <span className="mx-auto mb-3 block h-px w-10 bg-gold-600/60" />
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