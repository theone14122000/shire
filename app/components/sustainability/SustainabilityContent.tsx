"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Sprout } from "lucide-react";
import type { SustainabilityContent } from "@/lib/sustainability-content";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

export function SustainabilityContent({ content }: { content: SustainabilityContent }) {
  return (
    <>
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl"
        >
          <span className="luxe-kicker text-gold-700">{content.hero.kicker}</span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
            {content.hero.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.9] text-emerald-950/65 sm:text-lg">
            {content.hero.intro}
          </p>
        </motion.div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-14 lg:pb-36">
        <div className="mx-auto max-w-4xl">
          {content.pillars.map((pillar, index) => (
            <div
              key={`${pillar.title}-${index}`}
              className="grid gap-6 border-t border-emerald-900/15 py-10 last:border-b lg:grid-cols-[0.45fr_0.55fr] lg:gap-16"
            >
              <h2 className="flex items-baseline gap-4">
                <span className="font-display text-sm font-semibold text-gold-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-semibold leading-snug text-emerald-950 sm:text-xl lg:text-2xl">
                  {pillar.title}
                </span>
              </h2>
              <p className="max-w-[72ch] text-base font-bold leading-[1.8] text-emerald-950 sm:text-[1.0625rem]">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl"
        >
          <Sprout className="mx-auto text-gold-400" size={28} strokeWidth={1.4} />
          <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl">
            {content.closing}
          </h2>
          <Link href="/contact" className="luxe-button mt-9">
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </>
  );
}
