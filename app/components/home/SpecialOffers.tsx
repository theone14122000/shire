"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { specialOffers } from "@/lib/content";
import { stagger, fadeUp } from "../ui/Motion";
import { Tag, Clock, ArrowUpRight } from "lucide-react";

export function SpecialOffers() {
  return (
    <section id="offers" className="relative bg-emerald-50/50 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-gold-200/20 blur-[130px]" />

      <Container>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow={specialOffers.eyebrow}
              heading={specialOffers.heading}
              intro={specialOffers.intro}
            />
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {specialOffers.offers.map((offer, idx) => (
              <motion.div key={offer.id} variants={fadeUp}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-200/40 bg-white shadow-sm transition-all duration-500 hover:border-gold-300/50 hover:shadow-lg"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-gold-400 to-emerald-600" />

                  <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/50 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                        {offer.badge}
                      </span>
                      <span className="font-display text-sm font-bold tabular-nums text-emerald-300">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-[1.35rem] font-bold leading-snug text-emerald-950 tracking-tight">
                      {offer.title}
                    </h3>

                    <p className="text-sm font-medium leading-relaxed text-emerald-800/65 line-clamp-3">
                      {offer.description}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gold-700">
                        <Tag size={11} strokeWidth={2.4} className="text-gold-500" />
                        {offer.discountLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                        <Clock size={11} strokeWidth={2.2} />
                        {offer.validUntil}
                      </span>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

                    <a
                      href={offer.ctaHref}
                      className="group/cta inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition-colors duration-300 hover:text-gold-600"
                    >
                      {offer.cta}
                      <ArrowUpRight size={15} strokeWidth={2.4} className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.article>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
