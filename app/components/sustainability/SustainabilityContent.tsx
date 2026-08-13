"use client";

import { motion, type Variants } from "framer-motion";
import { CloudRain, Droplets, GlassWater, Leaf, Recycle, Sprout } from "lucide-react";
import type { SustainabilityContent } from "@/lib/sustainability-content";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const PILLAR_ICONS = [Recycle, Sprout, Droplets] as const;

export function SustainabilityContent({ content }: { content: SustainabilityContent }) {
  return (
    <>
      <section className="relative isolate overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <div className="absolute inset-0">
          <img
            src="/images/bg-sustan.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#f7f1e6] opacity-90" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mx-auto inline-flex h-16 w-16 items-center justify-center border border-gold-400/40 bg-emerald-950/5 text-gold-700">
              <Leaf size={28} strokeWidth={1.4} />
            </span>
            <span className="mt-8 block luxe-kicker text-gold-700">{content.hero.kicker}</span>
            <h1 className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.06] text-emerald-950 sm:text-5xl lg:text-6xl">
              {content.hero.heading}
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-[1.85] text-emerald-950/65 sm:text-lg">
              {content.hero.intro}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-0"
          >
            {content.pillars.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length];
              return (
                <motion.article
                  key={`${pillar.title}-${index}`}
                  variants={fadeUp}
                  className="grid gap-8 border-t border-emerald-900/15 py-12 sm:px-4 lg:grid-cols-[0.45fr_0.55fr] lg:gap-16 lg:py-16"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-gold-400/40 bg-emerald-950/5 text-gold-700">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      <span className="font-display text-sm font-semibold text-gold-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] text-emerald-950 sm:text-4xl">
                      {pillar.title}
                    </h2>
                  </div>
                  <p className="text-base leading-[1.9] text-emerald-950/68 sm:text-lg">
                    {pillar.body}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-5 text-gold-400"
          >
            <GlassWater size={20} strokeWidth={1.5} />
            <Sprout size={22} strokeWidth={1.5} />
            <CloudRain size={20} strokeWidth={1.5} />
          </motion.div>
          <p className="mt-8 font-display text-2xl font-semibold leading-[1.38] text-cream-50 sm:text-3xl lg:text-4xl">
            {content.closing}
          </p>
        </div>
      </section>
    </>
  );
}