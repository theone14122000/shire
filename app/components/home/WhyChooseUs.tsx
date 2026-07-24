"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { rooms } from "@/lib/rooms";

const ALL_AMENITIES = rooms
  .flatMap((r) => r.facilities)
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort();

const SECTION = {
  eyebrow: "Amenities",
  heading: "Comforts & conveniences, already sorted.",
  intro: "From pet-friendly rooms to bonfire nights on the lawn — everything included during your stay.",
};

const HIGHLIGHT_ITEMS = [
  { label: "Pet-Friendly", href: "/pet-policy", cta: "View Policy" },
  { label: "In-House Kitchen", href: "/kitchen", cta: "Learn More" },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const g1 = useTransform(scrollYProgress, [0, 1], ["-12%", "14%"]);
  const g2 = useTransform(scrollYProgress, [0, 1], ["14%", "-12%"]);

  return (
    <section
      id="amenities"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden bg-white py-24 sm:py-32 lg:py-40"
    >
      <motion.div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-emerald-200/30 blur-[110px]" style={{ y: g1 }} />
      <motion.div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gold-200/20 blur-[120px]" style={{ y: g2 }} />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="h-px w-8 bg-emerald-300" />
              {SECTION.eyebrow}
            </span>
            <h2 className="mt-3 h-section">{SECTION.heading}</h2>
            <p className="mt-4 body-lg">{SECTION.intro}</p>
          </div>
          <div className="flex shrink-0 items-center gap-4 self-start rounded-xl border border-emerald-200/50 bg-emerald-50/60 px-5 py-4 backdrop-blur sm:self-auto">
            <span className="font-display text-4xl font-black leading-none text-emerald-800 tabular-nums sm:text-5xl">
              {ALL_AMENITIES.length}
            </span>
            <span className="flex flex-col text-[10px] font-bold uppercase leading-tight tracking-wider text-emerald-600">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
                comforts
              </span>
              all included
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
          {[0, 1].map((col) => {
            const mid = Math.ceil(ALL_AMENITIES.length / 2);
            const items = col === 0 ? ALL_AMENITIES.slice(0, mid) : ALL_AMENITIES.slice(mid);
            const startIdx = col === 0 ? 0 : mid;
            return (
              <motion.ul
                key={col}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                className={`divide-y divide-emerald-200/40 ${col > 0 ? "border-t border-emerald-200/40 lg:border-t-0" : ""}`}
              >
                {items.map((item, i) => {
                  const hl = HIGHLIGHT_ITEMS.find((h) => item.toLowerCase().includes(h.label.toLowerCase()));
                  return (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative flex items-start gap-4 py-4"
                    >
                      <span
                        aria-hidden
                        className="relative z-10 w-6 shrink-0 pt-1 text-right font-display text-xs font-bold tabular-nums text-emerald-300"
                      >
                        {String(startIdx + i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                        <AmenityDot />
                      </span>
                      <div className="relative z-10 min-w-0 flex-1 pt-1">
                        <p className="text-[13px] font-bold uppercase leading-snug tracking-wide text-emerald-900 sm:text-sm">
                          {item}
                        </p>
                        {hl && (
                          <Link
                            href={hl.href}
                            className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-600 hover:text-gold-800 transition-colors"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                            {hl.cta}
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                              <path d="M1 7h12M8 2l5 5-5 5" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function AmenityDot() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
