"use client";

import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
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
  { name: "Tungesh Peak Hike", distance: "6 km", note: "Cheog, Shimla" },
  { name: "Deshu Peak / Fagu Top", distance: "3 km", note: null },
  { name: "Kufri Adventure Park", distance: "5.6 km", note: null },
  { name: "Mahasu Peak, Kufri", distance: "6 km", note: null },
  { name: "Rashtrapati Niwas, Mashobra", distance: "12 km", note: null },
  { name: "Jakhu Temple", distance: "20 km", note: "Shimla" },
  { name: "Shimla Mall Road", distance: "20 km", note: null },
  { name: "Narkanda — Hatu Peak", distance: "45 km", note: null },
  { name: "Tata Pani", distance: "62 km", note: null },
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
      <section className="relative overflow-hidden border-b border-white/[0.06] py-16 sm:py-20 lg:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-400/80">
              <span className="h-px w-5 bg-amber-400/40" />
              The Himalayan Shire
              <span className="h-px w-5 bg-amber-400/40" />
            </span>
            <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Things to Do
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-emerald-100/60 sm:text-lg">
              On the property, and in the hills around you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ ON-PROPERTY ACTIVITIES ════════════════ */}
      <section className="py-14 sm:py-18 lg:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
              At the Property
            </h2>
            <p className="mt-2 text-sm text-emerald-100/50 sm:text-base">
              Everything you need without stepping out.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
          >
            {ACTIVITIES.map((activity) => {
              const Icon = ICONS[activity.icon];
              return (
                <motion.div
                  key={activity.title}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.07] sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-amber-400/80 transition-colors duration-300 group-hover:bg-white/[0.1] group-hover:text-amber-300">
                      <Icon size={17} strokeWidth={1.8} aria-hidden />
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
      </section>

      {/* ════════════════ SIGHTSEEING ════════════════ */}
      <section className="border-t border-white/[0.06] py-14 sm:py-18 lg:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SIGHTSEEING.map((place) => (
              <motion.div
                key={place.name}
                variants={fadeUp}
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MapPin
                    size={14}
                    strokeWidth={2}
                    className="shrink-0 text-amber-400/60"
                  />
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">
                      {place.name}
                    </span>
                    {place.note && (
                      <span className="block text-[11px] text-emerald-100/40">
                        {place.note}
                      </span>
                    )}
                  </div>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-bold text-emerald-100/60">
                  {place.distance}
                </span>
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

          <GalleryGrid images={GALLERY_IMAGES} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

/* ================================================================== */
/*  Gallery Grid + Lightbox                                             */
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
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
            >
              <Image
                src={src}
                alt={`${label} at The Himalayan Shire`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md">
                  <Expand size={15} strokeWidth={2.2} />
                </span>
              </div>
              <span className="absolute bottom-2 left-2.5 text-[10px] font-bold uppercase tracking-wider text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur-md sm:left-6 sm:top-6">
              {lightboxIndex + 1} / {images.length}
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
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
