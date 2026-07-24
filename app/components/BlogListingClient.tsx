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
import { useRef, useId } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { trustSection } from "@/lib/content";
import type { BlogListItem } from "@/lib/blog-types";

/* ------------------------------------------------------------------ */
/*  Sun rays — 12 alternating long / short                             */
/* ------------------------------------------------------------------ */
const SUN_RAYS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  const inner = 60;
  const outer = i % 2 === 0 ? 92 : 76;
  return {
    x1: 100 + inner * Math.cos(angle),
    y1: 100 + inner * Math.sin(angle),
    x2: 100 + outer * Math.cos(angle),
    y2: 100 + outer * Math.sin(angle),
  };
});

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ================================================================== */
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
      {/* Premium Noise Texture Overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ============================================================ */}
      {/*  SUN ANIMATION — pure CSS keyframes                           */}
      {/* ============================================================ */}
      <style>{`
        @keyframes sunDrift {
          0%   { transform: translate3d(0,0,0); }
          20%  { transform: translate3d(24px,-28px,0); }
          45%  { transform: translate3d(-20px,-10px,0); }
          70%  { transform: translate3d(16px,22px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @keyframes sunSpin  { to { transform: rotate(360deg); } }
        @keyframes sunPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes sunGlow  { 0%,100% { opacity:.8; transform:scale(1); } 50% { opacity:1; transform:scale(1.12); } }
        .sun-drift     { animation: sunDrift 11s ease-in-out infinite; will-change: transform; }
        .sun-drift-rev { animation: sunDrift 15s ease-in-out infinite reverse; will-change: transform; }
        .sun-spin      { transform-origin: center; animation: sunSpin 38s linear infinite; }
        .sun-pulse     { transform-origin: center; animation: sunPulse 3.6s ease-in-out infinite; }
        .sun-glow      { transform-origin: center; animation: sunGlow 4.5s ease-in-out infinite; }
      `}</style>

      <MotionConfig reducedMotion="user">
        <SiteNav />

        {/* Scroll-progress hairline */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-black/20">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-amber-400 via-emerald-500 to-emerald-700"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* ===================== Hero & Blog Grid ===================== */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          {/* Parallax glows */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-amber-400/15 blur-[120px]"
            style={reduce ? undefined : { y: glowLeftY }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px]"
            style={reduce ? undefined : { y: glowRightY }}
          />

          {/* ---- SUN (top-right) — CSS drift wrapper ---- */}
          <div
            aria-hidden
            className="sun-drift pointer-events-none absolute right-6 top-24 z-0 h-28 w-28 sm:right-12 sm:top-28 sm:h-40 sm:w-40 lg:right-[9%] lg:top-28 lg:h-52 lg:w-52"
          >
            <SunMark />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-12 text-center"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-400">
                <span className="h-px w-6 bg-amber-500" aria-hidden />
                Blog
                <span className="h-px w-6 bg-amber-500" aria-hidden />
              </span>
              <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Stories From The Shire
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-emerald-200/80 sm:text-lg">
                Travel guides, behind-the-scenes stories, and practical tips for
                your Himalayan getaway near Shimla.
              </p>
            </motion.div>

            {/* Featured Post */}
            {featured && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="mb-16"
              >
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.07] lg:grid-cols-2">
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
                      <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-950 shadow-sm">
                        Featured
                      </span>
                    </div>

                    <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-emerald-300">
                        <span className="rounded-full bg-emerald-800/40 px-3 py-1 text-amber-300">{featured.tag}</span>
                        <span>{featured.date}</span>
                        <span>·</span>
                        <span>{featured.readTime}</span>
                      </div>
                      <h2 className="font-display text-2xl font-black leading-tight text-white transition-colors group-hover:text-amber-50 sm:text-3xl lg:text-4xl">
                        {featured.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-emerald-200/80 sm:text-base">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-2 pt-2 text-sm font-bold text-amber-400">
                        <span>{featured.author}</span>
                      </div>
                      <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-amber-400 transition-colors group-hover:text-amber-300">
                        Read Article
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                          <path d="M1 7h12M8 2l5 5-5 5" />
                        </svg>
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
                      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          <span className="rounded-full bg-emerald-800/40 px-2.5 py-0.5">{post.tag}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-display text-lg font-black leading-snug text-white transition-colors group-hover:text-amber-50 sm:text-xl">
                          {post.title}
                        </h3>
                        <p className="flex-1 text-sm leading-relaxed text-emerald-200/80">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-2 text-xs text-emerald-300">
                          <span className="font-bold text-amber-400">{post.author}</span>
                          <span>{post.date}</span>
                        </div>
                        <span className="mt-3 h-1 w-8 rounded-full bg-amber-400 transition-all duration-500 group-hover:w-full" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===================== Trust Section ===================== */}
        <section className="relative overflow-hidden border-t border-white/10 bg-transparent py-20 sm:py-24 lg:py-32">
          {/* ---- SUN (left side) — CSS drift wrapper, reversed path ---- */}
          <div
            aria-hidden
            className="sun-drift-rev pointer-events-none absolute left-4 top-12 z-0 h-32 w-32 opacity-60 sm:left-10 sm:top-16 sm:h-44 sm:w-44 lg:left-[6%] lg:top-20 lg:h-56 lg:w-56"
          >
            <SunMark />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  <motion.span variants={fadeUp} className="mb-4 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-400">
                    <span className="h-px w-6 bg-amber-500" aria-hidden />
                    {trustData.eyebrow}
                  </motion.span>
                  <motion.h2 variants={fadeUp} className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                    {trustData.heading}
                  </motion.h2>
                  <motion.p variants={fadeUp} className="mt-4 text-base font-medium leading-relaxed text-emerald-200/80">
                    {trustData.intro}
                  </motion.p>
                </div>

                <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                  {trustData.stats.map((stat, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                      <div className="font-display text-3xl font-black text-amber-400">{stat.value}</div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200/70">
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

        {/* ===================== Footer ===================== */}
        <SiteFooter />

        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      </MotionConfig>
    </main>
  );
}

/* ================================================================== */
/*  SunMark — halo + spinning rays + pulsing core, ALL via CSS classes */
/* ================================================================== */
function SunMark() {
  const gid = useId().replace(/:/g, "");

  return (
    <div className="relative h-full w-full">
      <div
        className="sun-glow absolute inset-0 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,224,138,0.75) 0%, rgba(245,200,66,0.45) 45%, rgba(245,200,66,0) 72%)",
        }}
      />

      <svg
        className="sun-spin absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        {SUN_RAYS.map((r, i) => (
          <line
            key={i}
            x1={r.x1}
            y1={r.y1}
            x2={r.x2}
            y2={r.y2}
            stroke="#E8A317"
            strokeWidth={6}
            strokeLinecap="round"
            opacity={0.85}
          />
        ))}
      </svg>

      <svg
        className="sun-pulse absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <defs>
          <radialGradient id={gid} cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="45%" stopColor="#F5C842" />
            <stop offset="100%" stopColor="#E8A317" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="50" fill={`url(#${gid})`} />
        <circle cx="86" cy="84" r="16" fill="rgba(255,255,255,0.45)" />
      </svg>
    </div>
  );
}
