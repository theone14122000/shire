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

const BLOG_URL =
  "https://traveltalesfromindia.in/a-small-hike-with-the-himalayan-shire/#google_vignette";

const ACTIVITY_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/images/activity/activity-${i + 1}.jpg`
);

const ACTIVITY_LABELS = [
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

type Block = {
  icon: "home" | "games" | "tv" | "yoga" | "trail";
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
        Beyond your room, you&apos;ll discover plenty of cozy common areas and
        quiet corners, each offering incredible panoramic views. Whether you want
        to read a book in our cozy carpeted attic, unwind on the balcony swing,
        or stroll across the lawn, there is always a perfect spot for some
        personal space.
      </>
    ),
  },
  {
    icon: "games",
    title: "Indoor Fun",
    body: (
      <>
        Keep everyone entertained with{" "}
        <span className="font-bold text-amber-300">
          Table Tennis, Carrom, board games, and playing cards.
        </span>{" "}
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
        Himalayan range, to do some early morning Yoga or simply meditate.
        It&apos;s a space for the whole family, complete with a small slide to
        keep the little ones happily entertained.
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
        <span className="font-bold text-amber-300">
          bonfire and live barbeque services
        </span>{" "}
        for an extra charge.
      </>
    ),
  },
];

const BLOCK_ICONS: Record<Block["icon"], typeof Home> = {
  home: Home,
  games: Gamepad2,
  tv: Tv2,
  yoga: Flower2,
  trail: TreePine,
};

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

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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
        @keyframes kenBurns {
          0%   { transform: scale(1) translate(0, 0); }
          50%  { transform: scale(1.08) translate(-1%, -1%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .sun-drift     { animation: sunDrift 11s ease-in-out infinite; }
        .sun-drift-rev { animation: sunDrift 15s ease-in-out infinite reverse; }
        .sun-spin      { transform-origin: center; animation: sunSpin 38s linear infinite; }
        .sun-pulse     { transform-origin: center; animation: sunPulse 3.6s ease-in-out infinite; }
        .sun-glow      { transform-origin: center; animation: sunGlow 4.5s ease-in-out infinite; }
        .ken-burns     { animation: kenBurns 14s ease-in-out infinite; }
        .marquee-track { animation: marquee 35s linear infinite; }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 85% 5%, rgba(251,191,36,0.14) 0%, transparent 55%), radial-gradient(55% 45% at 10% 20%, rgba(16,185,129,0.22) 0%, transparent 60%), radial-gradient(90% 70% at 50% 110%, rgba(4,120,87,0.28) 0%, transparent 65%)",
        }}
      />

      <MotionConfig reducedMotion="user">
        <SiteNav />

        <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-black/20">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
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

          <div
            aria-hidden
            className="sun-drift pointer-events-none absolute right-6 top-24 z-0 h-28 w-28 sm:right-12 sm:top-28 sm:h-40 sm:w-40 lg:right-[9%] lg:top-28 lg:h-52 lg:w-52"
          >
            <SunMark />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-12 text-center sm:mb-16"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                <span className="h-px w-6 bg-amber-400/70" />
                Activities
                <span className="h-px w-6 bg-amber-400/70" />
              </span>
              <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Activities In &amp; Around{" "}
                <span className="text-amber-400">The Property</span>
              </h1>
            </motion.div>

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

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              {BLOCKS.map((block, i) => {
                const Icon = BLOCK_ICONS[block.icon];
                const isLast = i === BLOCKS.length - 1;
                return (
                  <motion.div
                    key={block.title}
                    variants={fadeUp}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                    className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-sm shadow-emerald-950/30 backdrop-blur-sm transition-colors duration-300 hover:border-amber-300/40 hover:bg-white/[0.07] ${
                      isLast ? "sm:col-span-2" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-7xl font-black leading-none text-white/[0.05]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute left-0 top-0 h-full w-1 bg-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-emerald-800/40 text-amber-300">
                        <Icon size={18} strokeWidth={2} aria-hidden />
                      </span>
                      <h3 className="font-display text-lg font-black text-white sm:text-xl">
                        {block.title}
                      </h3>
                    </div>
                    <p className="relative text-sm leading-relaxed text-emerald-100/75 sm:text-base">
                      {block.body}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

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
                Love hiking &amp; <span className="text-amber-400">exploring nature?</span>
              </h2>
              <p className="max-w-md text-sm text-emerald-100/70 sm:text-base">
                Read this blog about hiking and exploring nature around The Himalayan Shire.
              </p>
              <BlogCta />
            </motion.div>
          </div>
        </section>

        {/* ── Single Row Marquee Gallery ── */}
        <section className="relative overflow-hidden border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#04241c]/60" />

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
              className="mb-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left"
            >
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                  <span className="h-px w-6 bg-amber-400/70" />
                  Gallery
                </span>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Moments From The <span className="text-amber-400">Shire</span>
                </h2>
              </div>
              <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-emerald-100/60 sm:flex">
                <Camera size={13} strokeWidth={2.2} className="text-amber-300" />
                Click any photo to expand
              </span>
            </motion.div>
          </div>

          <MarqueeGallery images={ACTIVITY_IMAGES} />
        </section>
      </MotionConfig>

      <SiteFooter />
    </main>
  );
}

function BlogCta() {
  return (
    <a
      href={BLOG_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-amber-400 px-7 py-3 text-sm font-bold tracking-wide text-ink-900 shadow-[0_10px_30px_rgba(251,191,36,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">Read the Blog</span>
      <ArrowUpRight size={15} strokeWidth={2.4} className="relative" />
    </a>
  );
}

/* ================================================================== */
/*  Single Row Infinite Marquee Gallery                                 */
/* ================================================================== */
function MarqueeGallery({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <>
      <div className="marquee-track relative overflow-hidden py-4">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#04241c] to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#04241c] to-transparent sm:w-20" />

        <div className="marquee-track flex gap-4 sm:gap-6">
          {[...images, ...images].map((src, i) => {
            const index = i % images.length;
            return (
              <MarqueeCard
                key={i}
                src={src}
                index={index}
                onClick={() => setLightboxIndex(index)}
              />
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031a14]/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-emerald-950/60 text-white/80 backdrop-blur-md transition-colors hover:border-amber-300/50 hover:text-amber-200 sm:right-6 sm:top-6"
            >
              <X size={18} strokeWidth={2.2} />
            </button>

            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md sm:left-6 sm:top-6">
              {lightboxIndex + 1} / {images.length}
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-emerald-950/60 text-white/80 backdrop-blur-md transition-colors hover:border-amber-300/50 hover:text-amber-200 sm:left-6"
            >
              <ChevronLeft size={20} strokeWidth={2.2} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-emerald-950/60 text-white/80 backdrop-blur-md transition-colors hover:border-amber-300/50 hover:text-amber-200 sm:right-6"
            >
              <ChevronRight size={20} strokeWidth={2.2} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 h-[70vh] w-full max-w-4xl sm:h-[78vh]"
            >
              <Image
                src={images[lightboxIndex]}
                alt={`Activity at The Himalayan Shire — ${ACTIVITY_LABELS[lightboxIndex % ACTIVITY_LABELS.length]}`}
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
/*  MarqueeCard — Clean, no badge/label                                 */
/* ================================================================== */
function MarqueeCard({
  src,
  index,
  onClick,
}: {
  src: string;
  index: number;
  onClick: () => void;
}) {
  const label = ACTIVITY_LABELS[index % ACTIVITY_LABELS.length];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Expand photo: ${label}`}
      className="group relative h-64 w-80 flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-emerald-900/40 shadow-xl shadow-emerald-950/50 transition-all duration-500 hover:scale-105 hover:border-amber-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
    >
      <Image
        src={src}
        alt={`Activity at The Himalayan Shire — ${label}`}
        fill
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Strong scrim for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Expand icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white shadow-xl backdrop-blur-md ring-1 ring-white/30">
          <Expand size={18} strokeWidth={2.2} />
        </span>
      </div>
    </button>
  );
}

/* ================================================================== */
/*  SunMark                                                             */
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