"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { productShowcase } from "@/lib/content";
import { fadeUp, stagger } from "../ui/Motion";

export function ProductShowcase() {
  return (
    <section
      id="stories"
      className="relative bg-emerald-50/50 py-24 sm:py-32 lg:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-gold-200/25 blur-[140px]" />

      <Container>
        <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
          <SectionHeading
            eyebrow={productShowcase.eyebrow}
            heading={productShowcase.heading}
            align="center"
          />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
        >
          {productShowcase.blocks.map((block) => (
            <motion.article
              key={block.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-emerald-200/50 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-300/50 hover:shadow-lg md:p-10"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-gold-600">
                {block.tag}
              </span>

              <h3 className="mt-4 font-display text-xl font-bold leading-snug text-emerald-950 sm:text-2xl">
                {block.title}
              </h3>

              <p className="mt-3 text-sm leading-[1.8] text-emerald-800/65 font-medium">
                {block.body}
              </p>

              <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-900 transition-all duration-300 group-hover:text-gold-600 group-hover:gap-3">
                {block.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 1l6 6-6 6" />
                </svg>
              </span>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
