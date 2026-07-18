"use client";

import { motion, MotionConfig, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { productShowcase } from "@/lib/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

/* ------------------------------------------------------------------ */
/*  Card data — kitchen card now uses its own dedicated hero image     */
/* ------------------------------------------------------------------ */
const CARDS = [
  {
    image: "/images/blog-best-time-fagu.jpg",
    alt: "Sunlit apple orchard walking trail near Fagu",
    href: "/blog/best-time-to-visit-fagu",
  },
  {
    image: "/images/kitchen-hero.jpg",
    alt: "The shire's in-house kitchen preparing a meal",
    href: "/kitchen",
  },
  {
    image: "/images/blog-why-fagu.jpg",
    alt: "Snow-covered Himalayan landscape near Shimla",
    href: "/blog/why-choose-fagu-for-your-next-holiday",
  },
];

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */
const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ================================================================== */
export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "14%"]);

  const blocks = productShowcase.blocks;

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#eff9f1] py-14 text-black sm:py-18 lg:py-24"
    >
      {/* Scroll progress bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[2px] bg-emerald-950/5">
        <motion.span
          className="block h-full origin-left bg-gradient-to-r from-amber-400 via-emerald-500 to-emerald-700"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* Parallax glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-1/4 h-80 w-80 rounded-full bg-emerald-300/30 blur-[120px]"
        style={{ y: glowY }}
      />

      <MotionConfig reducedMotion="user">
        <Container>
          <div className="relative z-10">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-10 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-3xl">
                <SectionHeading
                  eyebrow={productShowcase.eyebrow}
                  heading={productShowcase.heading}
                />
                <motion.div
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 h-[3px] w-28 origin-left rounded-full bg-gradient-to-r from-amber-400 to-emerald-600"
                />
              </div>

              <Link
                href="/blog"
                className="group hidden shrink-0 items-center gap-2 self-start rounded-full border border-emerald-300 bg-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur transition-all hover:border-emerald-600 hover:bg-emerald-700 hover:text-white sm:inline-flex sm:self-auto"
              >
                View All Posts
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </Link>
            </motion.div>

            {/* Card Grid */}
            <motion.div
              variants={grid}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {blocks.map((block, idx) => {
                const card = CARDS[idx] ?? { image: `/images/journal-${idx + 1}.jpg`, alt: block.title, href: "/blog" };
                return (
                  <motion.div key={block.title} variants={cardVariant}>
                    <Link href={card.href} className="group block h-full">
                      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-200/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-900/10">
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <CardImage src={card.image} alt={card.alt} label={block.title} priority={idx === 0} />

                          {/* Gradient overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                          {/* Tag chip */}
                          <div className="absolute left-4 top-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800 shadow-sm backdrop-blur">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                              {block.tag}
                            </span>
                          </div>

                          {/* Index badge */}
                          <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold tabular-nums text-white backdrop-blur">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                          <h3 className="font-display text-lg font-black leading-snug text-black transition-colors duration-300 group-hover:text-emerald-800 sm:text-xl">
                            {block.title}
                          </h3>

                          <p className="flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-3">
                            {block.body}
                          </p>

                          {/* CTA row */}
                          <div className="flex items-center justify-between pt-2">
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition-colors group-hover:text-emerald-900">
                              {block.cta}
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                                <path d="M1 7h12M8 2l5 5-5 5" />
                              </svg>
                            </span>
                          </div>

                          {/* Animated accent bar */}
                          <div className="mt-auto h-1 w-8 rounded-full bg-emerald-500 transition-all duration-500 group-hover:w-full" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Mobile "View All" link */}
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-sm transition-all hover:border-emerald-600 hover:bg-emerald-700 hover:text-white"
              >
                View All Posts
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </MotionConfig>
    </section>
  );
}

/* ================================================================== */
/*  Card image with graceful fallback                                  */
/* ================================================================== */
function CardImage({
  src,
  alt,
  label,
  priority = false,
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-200 via-green-100 to-emerald-300">
        <span className="max-w-[20ch] px-4 text-center text-xs font-bold text-emerald-900/70">
          {label}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setErrored(true)}
      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
    />
  );
}