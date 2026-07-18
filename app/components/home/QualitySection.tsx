"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { qualitySection } from "@/lib/content";
import { fadeUp, stagger } from "../ui/Motion";

/**
 * QualitySection — 4 monochrome quality pillars. Each card sits
 * inside the `card-luxe` shadow so the section feels substantial.
 */
export function QualitySection() {
  return (
    <section id="quality" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mb-12 lg:mb-16">
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
              className="card-luxe p-7 sm:p-8 flex flex-col gap-5 min-h-[300px] hover:bg-beige-50"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm tracking-[0.18em] text-ink-500/80 font-bold">
                  0{idx + 1}
                </span>
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-ink-900"
                />
              </div>
              <h3 className="font-display text-xl sm:text-2xl leading-snug text-ink-900 font-bold">
                {pillar.title}
              </h3>
              <p className="body-base text-sm text-ink-700 font-medium">
                {pillar.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
