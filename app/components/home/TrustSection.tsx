"use client";

import { motion, type Variants } from "framer-motion";
import Script from "next/script";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { trustSection } from "@/lib/content";
import { fadeUp, stagger } from "../ui/Motion";

const statHover: Variants = {
  rest: { y: 0, borderColor: "rgba(5,150,105,0.15)" },
  hover: { y: -4, borderColor: "rgba(212,160,23,0.4)", transition: { duration: 0.25, ease: "easeOut" } },
};

export function TrustSection() {
  return (
    <section id="trust" className="relative bg-pine-100/50 py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-emerald-200/15 blur-[130px]" />

      <Container>
        <div className="text-center mx-auto max-w-3xl mb-14 lg:mb-20">
          <SectionHeading
            eyebrow={trustSection.eyebrow}
            heading={trustSection.heading}
            intro={trustSection.intro}
            align="center"
          />
        </div>

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
              whileHover={{ y: -4, borderColor: "rgba(212,160,23,0.4)", transition: { duration: 0.25, ease: "easeOut" } }}
              className="rounded-xl border border-emerald-200/40 bg-cream-50 p-8 sm:p-10 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow duration-300"
            >
              <dt className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-bold order-2">
                {stat.label}
              </dt>
              <dd className="font-display text-5xl sm:text-6xl lg:text-7xl text-emerald-950 leading-none tracking-[-0.03em] order-1 font-black">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14 lg:mb-20"
        >
          {trustSection.reviews.map((review) => (
            <motion.figure
              key={review.author}
              variants={fadeUp}
              whileHover={{ y: -3, borderColor: "rgba(212,160,23,0.3)", transition: { duration: 0.25, ease: "easeOut" } }}
              className="relative rounded-2xl border border-emerald-200/40 bg-cream-50 p-8 sm:p-10 hover:shadow-lg transition-shadow duration-300"
            >
              <Stars />
              <blockquote className="mt-4 font-display text-xl sm:text-2xl leading-snug text-emerald-950 font-bold">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between text-sm">
                <span className="font-bold text-emerald-800">— {review.author}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold">{review.source}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-2xl border border-emerald-200/40 bg-cream-50 p-4 sm:p-6">
            <div className="elfsight-app-b9e7c232-8950-4e65-9497-1821a28950e6" data-elfsight-app-lazy />
          </div>
        </motion.div>
      </Container>

      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </section>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="Five out of five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden className="text-gold-500">
          <path d="M7 1l1.85 3.75 4.15.6-3 2.92.7 4.13L7 10.5l-3.7 1.9.7-4.13-3-2.92 4.15-.6L7 1z" />
        </svg>
      ))}
    </div>
  );
}
