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
  Expand,
  Pause,
  Play,
} from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

/* ------------------------------------------------------------------ */
/*  Content                                                             */
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
/*  Motion presets                                                      */
/* ------------------------------------------------------------------ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
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
  return (
    <main className="relative min-h-screen bg-[#052e23] font-sans text-white selection:bg-amber-300/30 selection:text-amber-100">
      <SiteNav />

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src="/images/activity/activity-3.jpg"
          alt="The Himalayan Shire property surrounded by pine forests"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#052e23] via-[#052e23]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052e23]/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-10 pb-12 sm:pb-16 lg:pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-400/80">
                <span className="h-px w-5 bg-amber-400/40" />
                The Himalayan Shire
                <span className="h-px w-5 bg-amber-400/40" />
              </span>
              <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Explore &amp;{" "}
                <span className="text-amber-400">Unwind</span>
              </h1>
              <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-emerald-100/65 sm:text-lg">
                From quiet corners on the property to peaks in the Himalayas — there is always something waiting for you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ AT THE PROPERTY ════════════════ */}
      <section className="py-14 sm:py-18 lg:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
              At the Property
            </h2>
            <p className="mt-2 text-sm text-emerald-100/50 sm:text-base">
              Everything you need without stepping out.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-8 grid grid-cols-3 gap-3"
          >
            {[
              { value: "5", label: "Activities" },
              { value: "65\"", label: "Smart TV" },
              { value: "∞", label: "Mountain Views" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 text-center"
              >
                <span className="block font-display text-2xl font-black text-amber-400 sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-emerald-100/40 sm:text-[11px]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Activity cards — horizontal scroll on mobile, grid on desktop */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 lg:gap-5"
            >
              {ACTIVITIES.map((activity, i) => {
                const Icon = ICONS[activity.icon];
                return (
                  <motion.div
                    key={activity.title}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                    className={`group flex-shrink-0 snap-start rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.07] sm:p-6 ${
                      i === 0 ? "col-span-2 sm:col-span-2 lg:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-amber-400/80 transition-colors duration-300 group-hover:bg-white/[0.1] group-hover:text-amber-300">
                        <Icon size={18} strokeWidth={1.8} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white sm:text-lg">
                          {activity.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-emerald-100/55">
                          {activity.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ SIGHTSEEING ════════════════ */}
      <section className="border-t border-white/[0.06] py-14 sm:py-18 lg:py-22">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
              Nearby <span className="text-amber-400">Sightseeing</span>
            </h2>
            <p className="mt-2 text-sm text-emerald-100/50 sm:text-base">
              Popular locations in the vicinity, all within easy driving distance.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SIGHTSEEING.map((place) => (
              <motion.div
                key={place.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.04]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                    {place.distance}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-sm font-bold text-white sm:text-base">
                      {place.name}
                    </h3>
                    {place.note && (
                      <span className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-200/60">
                        <MapPin size={10} strokeWidth={2.5} />
                        {place.note}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ BLOG CTA ════════════════ */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-8 text-center sm:px-10 sm:py-10"
          >
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Love hiking &amp; exploring the outdoors?
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-emerald-100/50 sm:text-base">
              Read about trails and nature around The Himalayan Shire.
            </p>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-[#052e23] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Read the Blog
              <ArrowUpRight size={14} strokeWidth={2.4} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ GALLERY ════════════════ */}
      <section className="border-t border-white/[0.06] py-14 sm:py-18 lg:py-22">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
              Gallery
            </h2>
            <p className="mt-2 text-sm text-emerald-100/50">
              Moments from the property.
            </p>
          </motion.div>

          <AutoGallery images={GALLERY_IMAGES} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

/* ================================================================== */
/*  AutoGallery — auto-cycling carousel (1→10→1 ping-pong)             */
/* ================================================================== */
function AutoGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visibleCount = useVisibleCount();

  const total = images.length;

  // Auto-advance with ping-pong
  useEffect(() => {
    if (paused || lightboxIndex !== null) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = prev + direction;
        if (next >= total - 1) {
          setDirection(-1);
          return total - 1;
        }
        if (next <= 0) {
          setDirection(1);
          return 0;
        }
        return next;
      });
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, direction, total, lightboxIndex]);

  const closeLB = useCallback(() => setLightboxIndex(null), []);
  const prevLB = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const nextLB = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowLeft") prevLB();
      if (e.key === "ArrowRight") nextLB();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLB, prevLB, nextLB]);

  return (
    <>
      {/* ── Main carousel ── */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Stage — show 1 on mobile, 2 on sm, 3 on lg */}
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            className="flex gap-3 sm:gap-4"
            animate={{ x: `-${active * (100 / visibleCount)}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {images.map((src, i) => {
              const label = GALLERY_LABELS[i % GALLERY_LABELS.length];
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View ${label}`}
                  className="group relative aspect-[4/3] flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
                  style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 12 / visibleCount}px)` }}
                >
                  <Image
                    src={src}
                    alt={`${label} at The Himalayan Shire`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md">
                      <Expand size={15} strokeWidth={2.2} />
                    </span>
                  </div>
                  <span className="absolute bottom-2.5 left-3 text-[10px] font-bold uppercase tracking-wider text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Controls — below carousel */}
        <div className="mt-5 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setActive(i);
                  setDirection(i > active ? 1 : -1);
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-amber-400"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Play/Pause */}
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-emerald-100/50 transition-colors hover:border-white/20 hover:text-white"
          >
            {paused ? <Play size={13} strokeWidth={2.5} /> : <Pause size={13} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full bg-amber-400/60"
            initial={{ width: "0%" }}
            animate={{
              width: paused ? undefined : "100%",
            }}
            transition={{
              duration: 4,
              ease: "linear",
              repeat: paused ? 0 : Infinity,
            }}
            key={`${active}-${paused}`}
          />
        </div>
      </div>

      {/* ── Thumbnails strip ── */}
      <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-10">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setActive(i);
              setDirection(i > active ? 1 : -1);
            }}
            className={`group relative aspect-[4/3] overflow-hidden rounded-lg transition-all duration-300 ${
              i === active
                ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-[#052e23]"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={src}
              alt={GALLERY_LABELS[i % GALLERY_LABELS.length]}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg"
            onClick={closeLB}
          >
            <button
              type="button"
              onClick={closeLB}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur-md sm:left-6 sm:top-6">
              {lightboxIndex + 1} / {images.length}
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prevLB(); }}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); nextLB(); }}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 h-[70vh] w-full max-w-4xl sm:h-[78vh]"
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${GALLERY_LABELS[lightboxIndex % GALLERY_LABELS.length]} at The Himalayan Shire`}
                fill
                priority
                sizes="100vw"
                className="rounded-xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  useVisibleCount — reactive visible slide count                      */
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
