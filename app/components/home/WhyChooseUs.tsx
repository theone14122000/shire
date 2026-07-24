"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { whyChooseUs } from "@/lib/content";
import { fadeUp, stagger } from "../ui/Motion";

const ICONS = [
  "paw-print",
  "utensils",
  "fire",
  "concierge",
] as const;

function FeatureIcon({ icon }: { icon: typeof ICONS[number] }) {
  const cls = "w-7 h-7";
  switch (icon) {
    case "paw-print":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="7" r="2.5" />
          <circle cx="17" cy="7" r="2.5" />
          <circle cx="12" cy="4" r="2.5" />
          <path d="M4.5 16c0-3 2.5-5 7.5-5s7.5 2 7.5 5-2.5 6-7.5 6-7.5-3-7.5-6z" />
        </svg>
      );
    case "utensils":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      );
    case "fire":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
        </svg>
      );
    case "concierge":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 18v1c0 .6.4 1 1 1h18c.6 0 1-.4 1-1v-1" />
          <path d="M7 12h10l2 3H5l2-3z" />
          <path d="M12 3v9" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
  }
}

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-mist-50 py-24 sm:py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-pine-200/30 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-gold-200/15 blur-[120px]" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow inline-flex items-center gap-3">
            <span className="h-px w-8 bg-pine-400" />
            {whyChooseUs.eyebrow}
          </span>
          <h2 className="mt-3 h-section text-pine-950">{whyChooseUs.heading}</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
        >
          {whyChooseUs.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group relative rounded-2xl border border-pine-200/40 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-lg sm:p-8"
            >
              <div className="flex items-start gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-pine-200 bg-pine-50 text-pine-700 transition-all duration-300 group-hover:border-gold-400/50 group-hover:bg-gold-50 group-hover:text-gold-700">
                  <FeatureIcon icon={ICONS[i]} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold text-pine-950 sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.8] text-pine-900/70 sm:text-base">
                    {feature.body}
                  </p>
                  <div className="mt-4 h-1 w-0 rounded-full bg-pine-400 transition-all duration-500 group-hover:w-12" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: "7", label: "Rooms" },
            { value: "4.7", label: "Rating" },
            { value: "10+", label: "Years" },
            { value: "100%", label: "Family-Run" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-pine-200/30 bg-white/60 p-4 text-center backdrop-blur-sm"
            >
              <div className="font-display text-2xl font-black text-pine-800 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-pine-600">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
