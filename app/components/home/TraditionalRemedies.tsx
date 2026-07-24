"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { useRef } from "react";

const SETTING_DATA = {
  eyebrow: "The Setting",
  heading: "A Serene Sanctuary Near Shimla",
  body: [
    "A serene, peaceful countryside location, surrounded by apple orchards on all sides, with an exceptionally beautiful view of the Himalayan range. You will hear nothing but the chirpings of the birds all day and can easily spot some rare and beautiful bird species hanging around our gardens and balcony.",
    "The sunrise view from our property is to die for. Sit outside in our lawn and enjoy some deliciously cooked meals prepared by our chef. Have the time of your life in our recreational space with TT table, carrom and plenty of board games or pick a book from our book shelf and enjoy quiet reading time on our double seater swing placed in our balcony.",
  ],
  cta: { label: "View Our Gallery", href: "/gallery" },
  image: { src: "/images/setting-view.jpg", alt: "Sunrise view over apple orchards near Shimla" },
};

export function TraditionalRemedies() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["15%", "-10%"]);

  return (
    <section
      id="setting"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40 bg-emerald-900"
    >
      <motion.div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full blur-[120px] bg-white/[0.06]" style={{ y: y1 }} />
      <motion.div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-[120px] bg-gold-500/10" style={{ y: y2 }} />

      <Container>
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 lg:col-span-6"
          >
            <div className="group relative overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:shadow-[0_32px_64px_rgba(0,0,0,0.35)] border-[6px] border-white/[0.12]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={SETTING_DATA.image.src}
                  alt={SETTING_DATA.image.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-transparent" />
                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900 shadow-sm">
                    Near Shimla, Himachal Pradesh
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="order-1 lg:order-2 lg:col-span-6 flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <motion.span
                aria-hidden
                className="block h-px w-10 origin-left bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-cream-200/60">
                {SETTING_DATA.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {SETTING_DATA.heading}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-5 text-base font-normal leading-relaxed text-cream-200/70 sm:text-lg"
            >
              {SETTING_DATA.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2.5 pt-2"
            >
              {["Bird Watching", "Sunrise Views", "Board Games", "Guided Hikes"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/[0.2] bg-white/[0.08] px-4 py-1.5 text-xs font-bold text-cream-50 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6"
            >
              <Link
                href={SETTING_DATA.cta.href}
                className="group inline-flex items-center gap-3 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-emerald-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gold-400 hover:shadow-2xl"
              >
                {SETTING_DATA.cta.label}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
