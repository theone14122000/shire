"use client";

import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useRef, useId, useState, useEffect } from "react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

const BLOG_URL =
  "https://traveltalesfromindia.in/a-small-hike-with-the-himalayan-shire/#google_vignette";

/* ------------------------------------------------------------------ */
/*  Activity gallery images (10 total, from /public/images/activity)   */
/* ------------------------------------------------------------------ */
const ACTIVITY_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/images/activity/activity-${i + 1}.jpg`
);

/* ------------------------------------------------------------------ */
/*  Content blocks                                                     */
/* ------------------------------------------------------------------ */
type Block = {
  icon: "leaf" | "home" | "tv" | "yoga" | "trail";
  title: string;
  body: React.ReactNode;
};

const BLOCKS: Block[] = [
  {
    icon: "home",
    title: "Space to Breathe",
    body: (
      <>
        At The Himalayan Shire, we believe in giving you space to breathe.
        Beyond your room, you'll discover plenty of cozy common areas and quiet
        corners, each offering incredible panoramic views. Whether you want to
        read a book in our cozy carpeted attic, unwind on the balcony swing, or
        stroll across the lawn, there is always a perfect spot for some personal
        space.
      </>
    ),
  },
  {
    icon: "leaf",
    title: "Indoor Fun",
    body: (
      <>
        Keep everyone entertained with{" "}
        <span className="font-bold text-amber-300">Table Tennis, Carrom,
        board games, and playing cards.</span>{" "}
        If you prefer a quieter afternoon, dive into a good story from our
        collection of books — our own mini-library.
      </>
    ),
  },
  {
    icon: "tv",
    title: "The TV Lounge",
    body: (
      <>
        Head to the top floor to sink into super-comfy lounge sofas and enjoy a
        late-night movie marathon on our{" "}
        <span className="font-bold text-amber-300">65-inch LED Smart TV.</span>
      </>
    ),
  },
  {
    icon: "yoga",
    title: "The Lawn",
    body: (
      <>
        Make use of our sprawling lawn area, with an amazing view of the
        Himalayan range, to do some early morning Yoga or simply meditate. It's
        a space for the whole family, complete with a small slide to keep the
        little ones happily entertained.
      </>
    ),
  },
  {
    icon: "trail",
    title: "Nature Trails & Orchard Walks",
    body: (
      <>
        Nestled amidst lush apple orchards and dense deodar forests, the
        property offers a deeply quiet and peaceful escape, completely free from
        traffic and city noise. Step right outside to soak in the authentic
        Himalayan countryside — stroll through the orchards, share a warm
        conversation with friendly locals, or explore the beautiful, untouched
        jungle trails just steps away from the property. We also offer{" "}
        <span className="font-bold text-amber-300">bonfire and live barbeque
        services</span>{" "}
        for an extra charge.
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Sun rays — 12 alternating long / short (PRESERVED)                 */
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
/*  Motion                                                             */
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
export default function ActivitiesPage() {
  const pageRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const glowLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const glowRightY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen isolate overflow-hidden bg-[#052e23] font-sans text-white selection:bg-amber-300/30 selection:text-amber-100"
    >
      {/* ============================================================ */}
      {/*  SUN ANIMATION — PRESERVED exactly (pure CSS keyframes).      */}
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

      {/* Premium emerald depth — radial light pools */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 85% 5%, rgba(251,191,36,0.14) 0%, transparent 55%), radial-gradient(55% 45% at 10% 20%, rgba(16,185,129,0.22) 0%, transparent 60%), radial-gradient(90% 70% at 50% 110%, rgba(4,120,87,0.28) 0%, transparent 65%)",
        }}
      />
      {/* Fine grain for tactile premium finish */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <MotionConfig reducedMotion="user">
        <SiteNav />

        {/* Scroll-progress hairline */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-black/20">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* ===================== Hero + Content ===================== */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          {/* Parallax glows */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-amber-300/20 blur-[120px]"
            style={reduce ? undefined : { y: glowLeftY }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-400/25 blur-[130px]"
            style={reduce ? undefined : { y: glowRightY }}
          />

          {/* ---- SUN (top-right) — CSS drift wrapper (PRESERVED) ---- */}
          <div
            aria-hidden
            className="sun-drift pointer-events-none absolute right-6 top-24 z-0 h-28 w-28 sm:right-12 sm:top-28 sm:h-40 sm:w-40 lg:right-[9%] lg:top-28 lg:h-52 lg:w-52"
          >
            <SunMark />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-12 text-center sm:mb-16"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                <span className="h-px w-6 bg-amber-400/70" aria-hidden />
                Activities
                <span className="h-px w-6 bg-amber-400/70" aria-hidden />
              </span>
              <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Activities In &amp; Around{" "}
                <span className="text-amber-400">The Property</span>
              </h1>
            </motion.div>

            {/* Intro paragraph */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-14 space-y-5 text-base leading-relaxed text-emerald-100/80 sm:text-lg"
            >
              <p>
                We often get asked — what's there to do around the property? And
                we like to say, while there are various things to do here, the
                best thing to do at the Shire is to just{" "}
                <span className="font-bold text-amber-300">sit back and enjoy
                the breathtaking views</span>{" "}
                from the property, take a moment from a hyperactive lifestyle,
                relax and hear the birds chirping all day, or watch the
                colourful butterflies as they hover around the garden going from
                flower to flower. Bask in the sun in our beautiful lawn, feel
                the cool fresh mountain breeze and fill your lungs with
                pollution-free air.
              </p>
            </motion.div>

            {/* Entertainment & Leisure heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-8 border-l-4 border-amber-400 pl-5 font-display text-2xl font-black text-white sm:text-3xl"
            >
              Entertainment, Leisure &amp;{" "}
              <span className="text-amber-400">Wellness</span>
            </motion.h2>

            {/* Content blocks — glass cards */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              {BLOCKS.map((block, i) => (
                <motion.div
                  key={block.title}
                  variants={fadeUp}
                  className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-sm shadow-emerald-950/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-emerald-950/50 ${
                    i === BLOCKS.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="absolute left-0 top-0 h-full w-1 bg-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-emerald-800/40 text-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <BlockIcon name={block.icon} />
                    </span>
                    <h3 className="font-display text-lg font-black text-white sm:text-xl">
                      {block.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-emerald-100/75 sm:text-base">
                    {block.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Blog CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative mt-12 flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-lg shadow-emerald-950/40 backdrop-blur-md"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              />
              <h2 className="font-display text-xl font-black text-white sm:text-2xl">
                Love hiking &amp;{" "}
                <span className="text-amber-400">exploring nature?</span>
              </h2>
              <p className="max-w-md text-sm text-emerald-100/70 sm:text-base">
                Read this blog about hiking and exploring nature around The
                Himalayan Shire.
              </p>
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-amber-400 px-7 py-3 text-sm font-bold tracking-wide text-ink-900 shadow-[0_10px_30px_rgba(251,191,36,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Read the Blog</span>
                <svg className="relative" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ===================== Auto-toggling image row ===================== */}
        <section className="relative overflow-hidden border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#04241c]/60" />

          {/* SUN (left side) — reversed drift (PRESERVED) */}
          <div
            aria-hidden
            className="sun-drift-rev pointer-events-none absolute left-4 top-12 z-0 h-28 w-28 opacity-70 sm:left-10 sm:top-16 sm:h-40 sm:w-40 lg:left-[6%] lg:top-16 lg:h-52 lg:w-52"
          >
            <SunMark />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-10 text-center"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                <span className="h-px w-6 bg-amber-400/70" aria-hidden />
                Gallery
                <span className="h-px w-6 bg-amber-400/70" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                Moments From The <span className="text-amber-400">Shire</span>
              </h2>
            </motion.div>

            <ActivityGallery images={ACTIVITY_IMAGES} />
          </div>
        </section>
      </MotionConfig>

      {/* ===================== Footer ===================== */}
      <SiteFooter />
    </main>
  );
}

/* ================================================================== */
/*  ActivityGallery — shows 5 images, auto-toggles through all 10      */
/* ================================================================== */
function ActivityGallery({ images }: { images: string[] }) {
  const reduce = useReducedMotion();
  const VISIBLE = 5;
  const half = Math.ceil(images.length / VISIBLE); // 2 pages of 5
  const [page, setPage] = useState(0);

  // Auto-toggle every 4s between the two sets of 5
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setPage((p) => (p + 1) % half), 4000);
    return () => clearInterval(t);
  }, [half, reduce]);

  const start = page * VISIBLE;
  const current = images.slice(start, start + VISIBLE);

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {current.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-emerald-900/40 shadow-lg shadow-emerald-950/40 ${
                i === 0 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <Image
                src={src}
                alt={`Activity at The Himalayan Shire ${start + i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute right-2.5 top-2.5 rounded-full bg-emerald-950/60 px-2.5 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-md">
                {String(start + i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Page dots */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: half }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            aria-label={`Show image set ${i + 1}`}
            className="h-2 overflow-hidden rounded-full bg-white/20 transition-all duration-500"
            style={{ width: i === page ? "2rem" : "0.75rem" }}
          >
            {i === page && (
              <motion.span
                key={page}
                className="block h-full w-full bg-amber-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: reduce ? 1 : [0, 1] }}
                transition={{ duration: reduce ? 0 : 4, ease: "linear" }}
                style={{ transformOrigin: "left" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Block icons                                                        */
/* ================================================================== */
function BlockIcon({ name }: { name: Block["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case "tv":
      return (
        <svg {...common}>
          <rect x="2" y="5" width="20" height="13" rx="2" />
          <path d="M8 21h8M12 18v3" />
        </svg>
      );
    case "yoga":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v6M12 13l-6 4M12 13l6 4M5 11l7 2 7-2" />
        </svg>
      );
    case "trail":
      return (
        <svg {...common}>
          <path d="M3 20l6-10 4 6 3-4 5 8H3z" />
          <circle cx="7" cy="6" r="2" />
        </svg>
      );
    default: // leaf
      return (
        <svg {...common}>
          <path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 16-9 17z" />
          <path d="M4 20c4-4 6-6 12-8" />
        </svg>
      );
  }
}

/* ================================================================== */
/*  SunMark — PRESERVED (halo + spinning rays + pulsing core)          */
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