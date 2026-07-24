"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { qualitySection } from "@/lib/content";
import { fadeUp, stagger } from "../ui/Motion";

export function QualitySection() {
  return (
    <section id="quality" className="relative bg-emerald-50/50 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="max-w-3xl mb-14 lg:mb-20">
          <SectionHeading
            eyebrow={qualitySection.eyebrow}
            heading={qualitySection.heading}
            intro={qualitySection.intro}
          />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {qualitySection.pillars.map((pillar, idx) => (
            <motion.article
              key={pillar.title}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-emerald-200/40 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-300/50 hover:shadow-lg"
            >
              <span className="font-display text-[11px] tracking-[0.18em] text-emerald-300 font-bold">
                0{idx + 1}
              </span>
              <h3 className="mt-6 font-display text-xl sm:text-2xl leading-snug text-emerald-950 font-bold">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-[1.8] text-emerald-800/65 font-medium">
                {pillar.description}
              </p>
              <div className="mt-6 h-1 w-8 rounded-full bg-emerald-200 transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
