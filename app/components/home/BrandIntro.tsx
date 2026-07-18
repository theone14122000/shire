"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { brandIntro } from "@/lib/content";
import { fadeUp, fadeUpSlow, stagger } from "../ui/Motion";

// Image paths pointing to your public folder
const BRAND_IMAGES = {
  lifestyle: "/images/brand-lifestyle.jpg",
  detail: "/images/brand-detail.jpg",
};

/**
 * BrandIntro — two-column editorial with a small stack of layered
 * images on the right. Cards here have their own shadows so the 
 * section feels visually substantial.
 */
export function BrandIntro() {
  return (
    <section
      id="story"
      // Added section-accent to make this section pure white, contrasting the sage body
      className="section-accent relative py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* Copy column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <SectionHeading
                eyebrow={brandIntro.eyebrow}
                heading={brandIntro.heading}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="space-y-4 text-ink-700 body-base mt-2"
            >
              {brandIntro.body.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUpSlow}
              className="mt-6 pt-6 border-t-2 border-ink-500/20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
            >
              <span className="font-display italic text-ink-900 text-lg font-bold">
                {brandIntro.signature}
              </span>
              <Button as="link" href="#rooms" variant="secondary">
                See the rooms
              </Button>
            </motion.div>

            {/* Mini stat strip — adds visual density and rhythm */}
            <motion.div
              variants={fadeUp}
              className="mt-4 grid grid-cols-3 gap-px bg-accent-leaf/15 border-2 border-accent-leaf/30 rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)]"
            >
              <Stat label="Rooms" value="6" />
              <Stat label="Years hosting" value="10+" />
              <Stat label="Family-run" value="✓" />
            </motion.div>
          </motion.div>

          {/* Image column — layered images with shadows */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-6 grid grid-cols-5 gap-4 lg:gap-6"
          >
            <div className="col-span-3">
              <div className="card-luxe">
                <div className="relative aspect-[3/4] w-full rounded-[var(--radius-card)] border-2 border-transparent shadow-none overflow-hidden">
                  <Image
                    src={BRAND_IMAGES.lifestyle}
                    alt="Lifestyle editorial frame of the property"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 60vw, 40vw"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-4 lg:gap-6 pt-12 lg:pt-20">
              <div className="card-luxe">
                <div className="relative aspect-[4/5] w-full rounded-[var(--radius-card)] border-2 border-transparent shadow-none overflow-hidden">
                  <Image
                    src={BRAND_IMAGES.detail}
                    alt="Detail shot of the property interior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 25vw"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-[var(--radius-card)] border-2 border-ink-900 bg-ink-900 p-5 flex flex-col gap-2 shadow-[var(--shadow-card)]"
              >
                <span className="eyebrow text-accent-leaf">A note</span>
                <p className="text-sm text-beige-50 leading-relaxed font-semibold">
                  The shire was built slowly, with the people of Pagey.
                  Every carpenter, every cook, every wool blanket is from
                  the village.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-beige-50 px-4 py-4 flex flex-col gap-1">
      <span className="font-display text-2xl sm:text-3xl font-bold text-ink-900 leading-none">
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-ink-500 font-bold">
        {label}
      </span>
    </div>
  );
}