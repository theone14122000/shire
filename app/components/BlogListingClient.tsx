"use client";

import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useRef } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { trustSection } from "@/lib/content";
import type { BlogListItem } from "@/lib/blog-types";
import { ArrowUpRight } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function BlogListingClient({
  blogs,
}: {
  blogs: BlogListItem[];
}) {
  const pageRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const glowLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const glowRightY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  const featured = blogs.find((p) => p.featured);
  const rest = blogs.filter((p) => !p.featured);

  const trustData = trustSection || {
    eyebrow: "Guest Notes",
    heading: "What our guests remember most.",
    intro:
      "The Himalayan Shire is rated 4.7 / 5 across Google, Tripadvisor, and Booking.com, with the highest marks for hospitality, location, and the view.",
    stats: [
      { value: "4.7", label: "Average guest rating" },
      { value: "180+", label: "Verified reviews" },
      { value: "92%", label: "Would return" },
      { value: "100%", label: "Locally staffed" },
    ],
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-emerald-900 via-[#022c22] to-emerald-950 font-sans text-white selection:bg-amber-500/30 selection:text-amber-100"
    >
      {/* Noise texture */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] opacity-[0.04] mix-blend-overlay" style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      <MotionConfig reducedMotion="user">
        <SiteNav />

        {/* Scroll-progress hairline */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-black/20">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-amber-400 via-emerald-500 to-emerald-700"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/*  HERO + BLOG GRID                                           */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          {/* Parallax glows */}
          <motion.div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-amber-400/15 blur-[120px]" style={reduce ? undefined : { y: glowLeftY }} />
          <motion.div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px]" style={reduce ? undefined : { y: glowRightY }} />

          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="mb-14 text-center lg:mb-16"
            >
              <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-amber-400/60">
                <span className="h-px w-8 bg-amber-500/40" />
                Blog
              </span>
              <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Stories From The Shire
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-emerald-200/60 sm:text-lg">
                Travel guides, behind-the-scenes stories, and practical tips
                for your Himalayan getaway near Shimla.
              </p>
            </motion.div>

            {/* Featured Post */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="mb-16"
              >
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.07] lg:grid-cols-2">
                    <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full bg-amber-400 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-950 shadow-sm">
                        Featured
                      </span>
                    </div>

                    <div className="flex flex-col justify-center gap-4 p-7 sm:p-9 lg:p-11">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-emerald-300">
                        <span className="rounded-full bg-emerald-800/40 px-3 py-1 text-amber-300/80">{featured.tag}</span>
                        <span>{featured.date}</span>
                        <span>·</span>
                        <span>{featured.readTime}</span>
                      </div>
                      <h2 className="font-display text-2xl font-black leading-tight text-white transition-colors group-hover:text-amber-50 sm:text-3xl lg:text-4xl">
                        {featured.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-emerald-200/70 sm:text-base">
                        {featured.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 transition-colors group-hover:text-amber-300">
                        Read Article
                        <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((post) => (
                <motion.article key={post.slug} variants={fadeUp}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/30 hover:bg-white/[0.07]">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-300/70">
                          <span className="rounded-full bg-emerald-800/40 px-2.5 py-0.5">{post.tag}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-display text-lg font-black leading-snug text-white transition-colors group-hover:text-amber-50 sm:text-xl">
                          {post.title}
                        </h3>
                        <p className="flex-1 text-sm leading-relaxed text-emerald-200/70">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-2 text-xs text-emerald-300/70">
                          <span className="font-bold text-amber-400">{post.author}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/*  TRUST SECTION                                               */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-t border-white/10 bg-transparent py-20 sm:py-24 lg:py-32">
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Content & Stats */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col gap-8 lg:col-span-5"
              >
                <div>
                  <motion.span variants={fadeUp} className="mb-4 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-400/60">
                    <span className="h-px w-6 bg-amber-500/40" />
                    {trustData.eyebrow}
                  </motion.span>
                  <motion.h2 variants={fadeUp} className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {trustData.heading}
                  </motion.h2>
                  <motion.p variants={fadeUp} className="mt-4 text-base font-medium leading-relaxed text-emerald-200/60">
                    {trustData.intro}
                  </motion.p>
                </div>

                <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                  {trustData.stats.map((stat, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                      <div className="font-display text-3xl font-black text-amber-400">{stat.value}</div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200/50">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Elfsight Reviews Widget */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-6 lg:col-span-7"
              >
                <div className="elfsight-app-b9e7c232-8950-4e65-9497-1821a28950e6" data-elfsight-app-lazy />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />

        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      </MotionConfig>
    </main>
  );
}
