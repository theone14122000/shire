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
import { useRef, useId, useState, useEffect, useCallback } from "react";
import {
  Home,
  Gamepad2,
  Tv2,
  Flower2,
  TreePine,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Expand,
  Camera,
} from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

/* ------------------------------------------------------------------ */
/*  Content — clean plain strings, no inline JSX                        */
/* ------------------------------------------------------------------ */
const BLOG_URL =
  "https://traveltalesfromindia.in/a-small-hike-with-the-himalayan-shire/#google_vignette";

const ACTIVITIES = [
  {
    icon: "home" as const,
    title: "Space to Breathe",
    body: "Beyond your room, discover cozy common areas and quiet corners with panoramic views. Read in the carpeted attic, unwind on the balcony swing, or stroll the lawn.",
  },
  {
    icon: "games" as const,
    title: "Indoor Fun",
    body: "Table Tennis, Carrom, board games, and playing cards. For quieter afternoons, explore our mini-library of books.",
  },
  {
    icon: "tv" as const,
    title: "The TV Lounge",
    body: "Sink into lounge sofas on the top floor and enjoy movies on our 65-inch LED Smart TV.",
  },
  {
    icon: "yoga" as const,
    title: "The Lawn",
    body: "A sprawling lawn with Himalayan views — ideal for morning yoga or meditation. A small slide keeps the little ones entertained.",
  },
  {
    icon: "trail" as const,
    title: "Nature Trails & Orchard Walks",
    body: "Step into apple orchards and deodar forests right outside. Stroll through orchards, meet locals, or explore jungle trails steps from the property. Bonfire and barbeque available on request.",
  },
] as const;

const ICONS: Record<(typeof ACTIVITIES)[number]["icon"], typeof Home> = {
  home: Home,
  games: Gamepad2,
  tv: Tv2,
  yoga: Flower2,
  trail: TreePine,
};

const GALLERY_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/images/activity/activity-${i + 1}.jpg`
);

const GALLERY_LABELS = [
  "Morning Lawn",
  "Orchard Trail",
  "Bonfire Nights",
  "Mountain View",
  "Quiet Corners",
  "Common Room",
  "Sunset Hour",
  "Garden Walk",
  "Forest Path",
  "Golden Hour",
];

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
/*  Motion presets                                                      */
/* ------------------------------------------------------------------ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ================================================================== */
/*  Page                                                               */
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
      <style>{`
        @keyframes sunDrift {
          0% { transform: translate3d(0,0,0); }
          20% { transform: translate3d(24px,-28px,0); }
          45% { transform: translate3d(-20px,-10px,0); }
          70% { transform: translate3d(16px,22px,0); }
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

      {/* Ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 85% 5%, rgba(251,191,36,0.12) 0%, transparent 55%), radial-gradient(55% 45% at 10% 20%, rgba(16,185,129,0.18) 0%, transparent 60%), radial-gradient(90% 70% at 50% 110%, rgba(4,120,87,0.22) 0%, transparent 65%)",
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

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
          {/* Parallax glows */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-amber-300/15 blur-[120px]"
            style={reduce ? undefined : { y: glowLeftY }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-[130px]"
            style={reduce ? undefined : { y: glowRightY }}
          />

          {/* Sun */}
          <div
            aria-hidden
            className="sun-drift pointer-events-none absolute right-6 top-24 z-0 h-28 w-28 sm:right-12 sm:top-28 sm:h-40 sm:w-40 lg:right-[9%] lg:top-28 lg:h-52 lg:w-52"
          >
            <SunMark />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                <span className="h-px w-6 bg-amber-400/60" />
                Activities
                <span className="h-px w-6 bg-amber-400/60" />
              </span>
              <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                In &amp; Around{" "}
                <span className="text-amber-400">The Property</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-emerald-100/70 sm:text-lg">
                Entertainment, leisure, and quiet moments — everything you need without leaving the property.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ ACTIVITIES ════════════════ */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
            >
              {ACTIVITIES.map((activity, i) => {
                const Icon = ICONS[activity.icon];
                const isLast = i === ACTIVITIES.length - 1;
                return (
                  <motion.div
                    key={activity.title}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-300/30 hover:bg-white/[0.08] sm:p-7 ${
                      isLast ? "sm:col-span-2" : ""
                    }`}
                  >
                    {/* Subtle left accent on hover */}
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-emerald-800/40 text-amber-300 transition-colors duration-300 group-hover:border-amber-300/30 group-hover:bg-emerald-800/60">
                        <Icon size={18} strokeWidth={2} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                          {activity.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-emerald-100/65 sm:text-[15px]">
                          {activity.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ════════════════ BLOG CTA ════════════════ */}
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-md sm:p-10"
            >
              {/* Top accent line */}
              <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                Love hiking &amp;{" "}
                <span className="text-amber-400">exploring nature?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-emerald-100/60 sm:text-base">
                Read about hiking and exploring nature around The Himalayan Shire.
              </p>
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-ink-900 shadow-[0_8px_24px_rgba(251,191,36,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Read the Blog
                <ArrowUpRight size={15} strokeWidth={2.4} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ GALLERY ════════════════ */}
        <section className="relative border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <div
            aria-hidden
            className="sun-drift-rev pointer-events-none absolute left-4 top-12 z-0 h-28 w-28 opacity-60 sm:left-10 sm:top-16 sm:h-40 sm:w-40 lg:left-[6%] lg:top-16 lg:h-52 lg:w-52"
          >
            <SunMark />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left"
            >
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                  <span className="h-px w-6 bg-amber-400/60" />
                  Gallery
                </span>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Moments From The{" "}
                  <span className="text-amber-400">Shire</span>
                </h2>
              </div>
              <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-emerald-100/50 sm:flex">
                <Camera size={13} strokeWidth={2.2} className="text-amber-300" />
                Click any photo to expand
              </span>
            </motion.div>

            <GalleryGrid images={GALLERY_IMAGES} />
          </div>
        </section>
      </MotionConfig>

      <SiteFooter />
    </main>
  );
}

/* ================================================================== */
/*  Gallery Grid — responsive grid with lightbox                        */
/* ================================================================== */
function GalleryGrid({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => {
          const label = GALLERY_LABELS[i % GALLERY_LABELS.length];
          return (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`Expand photo: ${label}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-emerald-900/40 shadow-lg shadow-emerald-950/50 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/30 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
            >
              <Image
                src={src}
                alt={`${label} at The Himalayan Shire`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Scrim */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Expand icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white shadow-lg backdrop-blur-md ring-1 ring-white/25">
                  <Expand size={16} strokeWidth={2.2} />
                </span>
              </div>
              {/* Label */}
              <span className="absolute bottom-2.5 left-3 text-[10px] font-bold uppercase tracking-wider text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031a14]/95 backdrop-blur-md"
            onClick={close}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-emerald-950/60 text-white/80 backdrop-blur-md transition-colors hover:border-amber-300/50 hover:text-amber-200 sm:right-6 sm:top-6"
            >
              <X size={18} strokeWidth={2.2} />
            </button>

            {/* Counter */}
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md sm:left-6 sm:top-6">
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-emerald-950/60 text-white/80 backdrop-blur-md transition-colors hover:border-amber-300/50 hover:text-amber-200 sm:left-6"
            >
              <ChevronLeft size={20} strokeWidth={2.2} />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-emerald-950/60 text-white/80 backdrop-blur-md transition-colors hover:border-amber-300/50 hover:text-amber-200 sm:right-6"
            >
              <ChevronRight size={20} strokeWidth={2.2} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 h-[70vh] w-full max-w-4xl sm:h-[78vh]"
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${GALLERY_LABELS[lightboxIndex % GALLERY_LABELS.length]} at The Himalayan Shire`}
                fill
                priority
                sizes="100vw"
                className="rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================== */
/*  SunMark — halo + spinning rays + pulsing core                       */
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
        {SUN_RAYS.map((ray, i) => (
          <line
            key={i}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
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
