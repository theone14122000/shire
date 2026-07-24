"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Container } from "../ui/Container";
import { brandIntro } from "@/lib/content";
import { fadeUp, stagger } from "../ui/Motion";

export function BrandIntro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow inline-flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-300" />
                {brandIntro.eyebrow}
              </span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="h-section">
              {brandIntro.heading}
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 text-base leading-[1.8] text-emerald-900/65">
              {brandIntro.body.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pt-6 border-t border-emerald-200">
              <span className="font-display italic text-emerald-800 text-lg font-bold">
                {brandIntro.signature}
              </span>
              <a
                href="/#rooms"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-800/30 px-6 py-3 text-sm font-bold text-emerald-800 transition-all duration-300 hover:border-gold-500 hover:bg-gold-50 hover:text-gold-700"
              >
                See the rooms
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: "Rooms", value: "7" },
                { label: "Years hosting", value: "10+" },
                { label: "Family-run", value: "✓" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-emerald-50/60 border border-emerald-200/40 px-4 py-4 text-center">
                  <span className="block font-display text-2xl sm:text-3xl font-bold text-emerald-900 leading-none">{s.value}</span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-bold mt-1">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <motion.div style={{ y: imgY }} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/brand-lifestyle.jpg"
                alt="The Himalayan Shire property"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-transparent" />
            </motion.div>
            <div className="absolute -bottom-6 -left-6 w-48 sm:w-64 rounded-xl border border-emerald-200/50 bg-white/95 backdrop-blur-sm p-5 shadow-lg">
              <p className="text-xs leading-relaxed text-emerald-900/70">
                &ldquo;Built slowly, with the people of Pagey — every carpenter, every cook, every wool blanket is from the village.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
