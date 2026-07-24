"use client";

import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Home,
  Gamepad2,
  Tv2,
  Flower2,
  TreePine,
  MapPin,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

/* ------------------------------------------------------------------ */
/*  Content — preserved exactly                                         */
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

const SIGHTSEEING = [
  { name: "Tungesh Peak Hike", distance: "6 km", note: "Cheog, Shimla", image: "/images/sightseeing/tungesh-peak.jpg" },
  { name: "Deshu Peak / Fagu Top", distance: "3 km", note: null, image: "/images/sightseeing/deshu-peak.jpg" },
  { name: "Kufri Adventure Park", distance: "5.6 km", note: null, image: "/images/sightseeing/kufri-park.jpg" },
  { name: "Mahasu Peak, Kufri", distance: "6 km", note: null, image: "/images/sightseeing/mahasu-peak.jpg" },
  { name: "Rashtrapati Niwas, Mashobra", distance: "12 km", note: null, image: "/images/sightseeing/rashtrapati-niwas.jpg" },
  { name: "Jakhu Temple", distance: "20 km", note: "Shimla", image: "/images/sightseeing/jakhu-temple.jpg" },
  { name: "Shimla Mall Road", distance: "20 km", note: null, image: "/images/sightseeing/mall-road.jpg" },
  { name: "Narkanda — Hatu Peak", distance: "45 km", note: null, image: "/images/sightseeing/hatu-peak.jpg" },
  { name: "Tata Pani", distance: "62 km", note: null, image: "/images/sightseeing/tata-pani.jpg" },
];

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
/*  Motion                                                              */
/* ------------------------------------------------------------------ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */
export default function ActivitiesPage() {
  return (
    <main className="relative min-h-screen bg-[#052e23] font-sans text-white selection:bg-amber-300/30 selection:text-amber-100">
      <SiteNav />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  HERO — full-bleed cinematic                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/activity/activity-2.jpg"
            alt="The Himalayan Shire property surrounded by pine forests"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#052e23] via-[#052e23]/30 to-[#052e23]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052e23]/50 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-10 pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.25em] text-amber-400/70">
                <span className="h-px w-8 bg-amber-400/30" />
                The Himalayan Shire
              </span>
              <h1 className="mt-6 font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Explore
                <br />
                <span className="text-amber-400">&amp; Unwind</span>
              </h1>
              <p className="mt-6 max-w-md text-base font-medium leading-[1.75] text-emerald-100/60 sm:text-lg">
                From quiet corners on the property to peaks in the Himalayas — there is always something waiting for you.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border-2 border-white/20 p-1"
          >
            <motion.div className="mx-auto h-2 w-1 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  AT THE PROPERTY — editorial split                             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left — image mosaic */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative"
            >
              <motion.div variants={fadeUp} className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="/images/activity/activity-1.jpg"
                  alt="Cozy corner at The Himalayan Shire"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              {/* Floating accent image */}
              <motion.div
                variants={fadeUp}
                className="absolute -bottom-6 -right-4 sm:-right-8 aspect-[3/4] w-32 overflow-hidden rounded-2xl border-4 border-[#052e23] sm:w-40 lg:w-44"
              >
                <Image
                  src="/images/activity/activity-4.jpg"
                  alt="Mountain view from the lawn"
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Right — content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:pl-8"
            >
              <motion.span variants={fadeUp} className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-amber-400/70">
                At the Property
              </motion.span>
              <motion.h2 variants={fadeUp} className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Everything you need
                <br />
                <span className="text-amber-400">without stepping out.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-[1.8] text-emerald-100/55 sm:text-lg">
                Five ways to spend your day — from morning stillness on the lawn to evening bonfires under the stars.
              </motion.p>

              {/* Stats */}
              <motion.div variants={fadeUp} className="mt-10 grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-8">
                {[
                  { value: "5", label: "Activities" },
                  { value: '65"', label: "Smart TV" },
                  { value: "∞", label: "Mountain Views" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="block font-display text-3xl font-black text-amber-400 sm:text-4xl">{stat.value}</span>
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-100/35 sm:text-[11px]">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  EXPERIENCES — alternating editorial rows                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="pb-24 sm:pb-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-amber-400/70">
              Experiences
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
              Ways to spend your day
            </h2>
          </motion.div>

          {ACTIVITIES.map((activity, i) => {
            const Icon = ICONS[activity.icon];
            const isReversed = i % 2 !== 0;
            const images = [
              "/images/activity/activity-5.jpg",
              "/images/activity/activity-6.jpg",
              "/images/activity/activity-7.jpg",
              "/images/activity/activity-8.jpg",
              "/images/activity/activity-9.jpg",
            ];
            return (
              <div
                key={activity.title}
                className={`grid grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 ${
                  i > 0 ? "border-t border-white/[0.05]" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${isReversed ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={images[i]}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={isReversed ? "lg:order-1 lg:text-right" : ""}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-amber-400/70">
                    <Icon size={20} strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {activity.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-[1.8] text-emerald-100/50 sm:text-lg">
                    {activity.body}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SIGHTSEEING — editorial mosaic grid                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-2xl"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-amber-400/70">
              Nearby
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Sightseeing
            </h2>
            <p className="mt-4 text-base leading-[1.8] text-emerald-100/50 sm:text-lg">
              Popular locations in the vicinity, all within easy driving distance.
            </p>
          </motion.div>

          {/* Asymmetric mosaic — large card + 2 small on first row, then 3-col grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-4"
          >
            {/* Row 1 — large + 2 stacked */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4">
              <motion.div variants={fadeUp} className="lg:col-span-2">
                <SightseeingCard place={SIGHTSEEING[0]} large />
              </motion.div>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                <motion.div variants={fadeUp}>
                  <SightseeingCard place={SIGHTSEEING[1]} />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <SightseeingCard place={SIGHTSEEING[2]} />
                </motion.div>
              </div>
            </div>

            {/* Row 2 — 3 equal */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SIGHTSEEING.slice(3, 6).map((place) => (
                <motion.div key={place.name} variants={fadeUp}>
                  <SightseeingCard place={place} />
                </motion.div>
              ))}
            </div>

            {/* Row 3 — 2 stacked left + large right */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                <motion.div variants={fadeUp}>
                  <SightseeingCard place={SIGHTSEEING[6]} />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <SightseeingCard place={SIGHTSEEING[7]} />
                </motion.div>
              </div>
              <motion.div variants={fadeUp} className="lg:col-span-2">
                <SightseeingCard place={SIGHTSEEING[8]} large />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  BLOG CTA — immersive full-width                              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06]">
            <div className="relative aspect-[21/9] sm:aspect-[3/1]">
              <Image
                src="/images/activity/activity-10.jpg"
                alt="Hiking trails near The Himalayan Shire"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#052e23]/90 via-[#052e23]/60 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 py-10 sm:px-12 lg:px-16">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="max-w-md font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    Love hiking &amp; exploring the outdoors?
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-emerald-100/50 sm:text-base">
                    Read about trails and nature around The Himalayan Shire.
                  </p>
                  <a
                    href={BLOG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-[#052e23] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                  >
                    Read the Blog
                    <ArrowUpRight size={15} strokeWidth={2.4} />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  GALLERY — auto-cycling carousel                              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-amber-400/70">
              Gallery
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
              Moments from the Shire
            </h2>
          </motion.div>

          <AutoGallery images={GALLERY_IMAGES} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

/* ================================================================== */
/*  SightseeingCard — premium image card                                */
/* ================================================================== */
function SightseeingCard({
  place,
  large,
}: {
  place: (typeof SIGHTSEEING)[number];
  large?: boolean;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl ${large ? "aspect-[16/9] lg:aspect-[2/1]" : "aspect-[4/3]"}`}>
      <Image
        src={place.image}
        alt={place.name}
        fill
        sizes={large ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wide text-white/80 backdrop-blur-md">
        {place.distance}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold text-white sm:text-xl">{place.name}</h3>
        {place.note && (
          <span className="mt-1 flex items-center gap-1.5 text-xs text-emerald-200/50">
            <MapPin size={11} strokeWidth={2.5} />
            {place.note}
          </span>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  AutoGallery — auto-cycling carousel (1→10→1 ping-pong)             */
/* ================================================================== */
function AutoGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visibleCount = useVisibleCount();
  const total = images.length;

  useEffect(() => {
    if (paused || lightboxIndex !== null) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = prev + direction;
        if (next >= total - 1) { setDirection(-1); return total - 1; }
        if (next <= 0) { setDirection(1); return 0; }
        return next;
      });
    }, 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, direction, total, lightboxIndex]);

  const closeLB = useCallback(() => setLightboxIndex(null), []);
  const prevLB = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length]);
  const nextLB = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)), [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowLeft") prevLB();
      if (e.key === "ArrowRight") nextLB();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightboxIndex, closeLB, prevLB, nextLB]);

  const gap = 12;

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            className="flex"
            style={{ gap }}
            animate={{ x: `-${active * (100 / visibleCount)}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {images.map((src, i) => {
              const label = GALLERY_LABELS[i % GALLERY_LABELS.length];
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View ${label}`}
                  className="group relative flex-shrink-0 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
                  style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * gap / visibleCount}px)` }}
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={src}
                      alt={`${label} at The Himalayan Shire`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-xl backdrop-blur-md">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 10v4a1 1 0 001 1h4M15 10v4a1 1 0 01-1 1h-4M10 1h4a1 1 0 011 1v4M6 1H2a1 1 0 00-1 1v4" /></svg>
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {label}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setActive(i); setDirection(i > active ? 1 : -1); }}
                aria-label={`Go to image ${i + 1}`}
                className={`rounded-full transition-all duration-500 ${
                  i === active ? "h-2 w-6 bg-amber-400" : "h-2 w-2 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-emerald-100/40 transition-all duration-300 hover:border-white/20 hover:text-white"
          >
            {paused ? <Play size={13} strokeWidth={2.5} /> : <Pause size={13} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Progress */}
        <div className="mt-4 h-[1px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full bg-amber-400/50"
            initial={{ width: "0%" }}
            animate={{ width: paused ? undefined : "100%" }}
            transition={{ duration: 4.5, ease: "linear", repeat: paused ? 0 : Infinity }}
            key={`${active}-${paused}`}
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-8 grid grid-cols-5 gap-2 sm:grid-cols-10">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setActive(i); setDirection(i > active ? 1 : -1); }}
            className={`group relative aspect-[4/3] overflow-hidden rounded-lg transition-all duration-500 ${
              i === active ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-[#052e23]" : "opacity-40 hover:opacity-70"
            }`}
          >
            <Image src={src} alt={GALLERY_LABELS[i % GALLERY_LABELS.length]} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeLB}
          >
            <button type="button" onClick={closeLB} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6">
              <X size={18} strokeWidth={2} />
            </button>
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white/70 backdrop-blur-md sm:left-6 sm:top-6">
              {lightboxIndex + 1} / {images.length}
            </div>
            <button type="button" onClick={(e) => { e.stopPropagation(); prevLB(); }} className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-6">
              <ChevronLeft size={22} strokeWidth={2} />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); nextLB(); }} className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6">
              <ChevronRight size={22} strokeWidth={2} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 h-[70vh] w-full max-w-5xl sm:h-[80vh]"
            >
              <Image src={images[lightboxIndex]} alt={`${GALLERY_LABELS[lightboxIndex % GALLERY_LABELS.length]} at The Himalayan Shire`} fill priority sizes="100vw" className="rounded-2xl object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  useVisibleCount                                                     */
/* ------------------------------------------------------------------ */
function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) setCount(3);
      else if (w >= 640) setCount(2);
      else setCount(1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}
