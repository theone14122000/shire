"use client";

import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Mountain,
  Home,
  TreePine,
  Sofa,
  Sparkles,
} from "lucide-react";

type GalleryCategory = "Views" | "Common Spaces" | "Outdoor" | "Interiors";
type CategoryFilter = "All" | GalleryCategory;

interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  src: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "winter-views", title: "The Enchanting Winter Views", category: "Views", src: "/gallery/enchanting-winter-views.jpg" },
  { id: "common-balcony", title: "Common Balcony", category: "Common Spaces", src: "/gallery/common-balcony.jpg" },
  { id: "attic-area", title: "Attic Area (Common)", category: "Common Spaces", src: "/gallery/attic-area-common.jpg" },
  { id: "snow-view", title: "Snow View", category: "Views", src: "/gallery/snow-view.jpg" },
  { id: "common-seating-first-floor", title: "Common Seating on First Floor", category: "Common Spaces", src: "/gallery/common-seating-first-floor.jpg" },
  { id: "mesmerizing-views", title: "Mesmerizing Views", category: "Views", src: "/gallery/mesmerizing-views.jpg" },
  { id: "bonfire", title: "Bonfire", category: "Outdoor", src: "/gallery/bonfire.jpg" },
  { id: "ground-floor-lobby", title: "Ground Floor Lobby — Double Height Ceiling", category: "Common Spaces", src: "/gallery/ground-floor-lobby.jpg" },
  { id: "dining-area", title: "Dining Area", category: "Interiors", src: "/gallery/dining-area.jpg" },
  { id: "surrounded-greenery", title: "Surrounded by Greenery", category: "Views", src: "/gallery/surrounded-by-greenery.jpg" },
  { id: "sunrise-view", title: "Sunrise View", category: "Views", src: "/gallery/sunrise-view.png" },
  { id: "common-balcony-swing", title: "Common Balcony with Swing", category: "Common Spaces", src: "/gallery/common-balcony-with-swing.jpg" },
  { id: "lawn-seating-1", title: "Lawn with Outdoor Seating", category: "Outdoor", src: "/gallery/lawn-with-outdoor-seating-1.jpg" },
  { id: "himachali-seating", title: "Low Height Himachali Style Seating (Ground Floor)", category: "Interiors", src: "/gallery/himachali-style-seating.jpg" },
  { id: "recreational-hall", title: "Recreational Hall", category: "Common Spaces", src: "/gallery/recreational-hall.jpg" },
  { id: "tv-lounge", title: "TV Lounge", category: "Interiors", src: "/gallery/tv-lounge.jpg" },
  { id: "decor", title: "Decor", category: "Interiors", src: "/gallery/decor.png" },
  { id: "reception-area", title: "Reception Area", category: "Common Spaces", src: "/gallery/reception-area.png" },
  { id: "indoor-games", title: "Indoor Games", category: "Common Spaces", src: "/gallery/indoor-games.jpeg" },
  { id: "winters", title: "Winters", category: "Views", src: "/gallery/winters.jpg" },
];

const CATEGORIES: CategoryFilter[] = ["All", "Views", "Common Spaces", "Outdoor", "Interiors"];

const HERO_SLIDE_IDS = ["winter-views", "mesmerizing-views", "bonfire", "sunrise-view", "ground-floor-lobby"];
const HERO_SLIDES = HERO_SLIDE_IDS
  .map((id) => GALLERY_ITEMS.find((item) => item.id === id))
  .filter((item): item is GalleryItem => Boolean(item));

const STATS = [
  { label: "Photographs", value: `${GALLERY_ITEMS.length}+` },
  { label: "Spaces Captured", value: `${CATEGORIES.length - 1}` },
  { label: "Seasons Shown", value: "4" },
  { label: "Vantage Points", value: "360°" },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const CATEGORY_ICONS: Record<string, typeof Mountain> = {
  Views: Mountain,
  "Common Spaces": Sofa,
  Outdoor: TreePine,
  Interiors: Home,
};

export function GalleryPageContent() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (HERO_SLIDES.length < 2) return;
    const id = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const categoryPreviews = useMemo(
    () =>
      (CATEGORIES.filter((c) => c !== "All") as GalleryCategory[]).map((cat) => {
        const items = GALLERY_ITEMS.filter((item) => item.category === cat);
        return { category: cat, count: items.length, cover: items[0]?.src };
      }),
    []
  );

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, filteredItems.length]);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section className="relative isolate overflow-hidden bg-pine-50">
      <div aria-hidden className="pointer-events-none fixed inset-0" style={{
        background: "radial-gradient(55% 40% at 20% 0%, rgba(16,185,129,0.08) 0%, transparent 55%), radial-gradient(50% 35% at 85% 10%, rgba(251,191,36,0.06) 0%, transparent 50%)",
      }} />

      <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden sm:h-[82vh] sm:min-h-[640px]">
        {HERO_SLIDES.map((slide, i) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: heroIndex === i ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={heroIndex === i ? { scale: [1, 1.09] } : { scale: 1 }}
              transition={{ duration: 8, ease: "easeInOut" }}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-emerald-900/30 to-emerald-900/10" />

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto max-w-7xl px-6 pb-12 sm:pb-16 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/70">
                <span className="h-px w-8 bg-white/30" />
                Explore The Property
              </span>
              <h1 className="font-display text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Gallery
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                Every season, every corner — a visual tour through The Himalayan Shire,
                from misty mornings to warm evenings by the fire.
              </p>
            </motion.div>
          </div>

          {HERO_SLIDES.length > 1 && (
            <div className="flex items-center justify-center gap-2 pb-6 sm:pb-8">
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.title}`}
                  onClick={() => setHeroIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: heroIndex === i ? 28 : 8,
                    backgroundColor: heroIndex === i ? "#f59e0b" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="border-b border-emerald-200/50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 divide-x divide-y divide-emerald-200/50 sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center gap-1.5 px-2 py-6 text-center transition-colors duration-300 hover:bg-emerald-50/50 sm:gap-2 sm:py-9"
              >
                <span className="absolute inset-x-0 bottom-0 mx-auto h-[3px] w-0 rounded-full bg-emerald-500 transition-all duration-500 group-hover:w-2/3" />
                <span className="font-display text-lg font-black text-emerald-950 sm:text-2xl">
                  {stat.value}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-700/50 sm:text-[10px] sm:tracking-[0.16em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <span aria-hidden className="pointer-events-none absolute -right-10 top-6 select-none font-display text-[15vw] font-black uppercase leading-none tracking-tighter text-emerald-100">
          Spaces
        </span>
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col gap-3 border-l-4 border-emerald-500 pl-5 sm:mb-12"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-600">
              Browse By Space
            </span>
            <h2 className="font-display text-2xl font-black tracking-tight text-emerald-950 sm:text-4xl">
              Every Corner, <span className="text-emerald-600">Captured</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {categoryPreviews.map((preview) => {
              const IconComponent = CATEGORY_ICONS[preview.category] || Sparkles;
              return (
                <button
                  key={preview.category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(preview.category);
                    setTimeout(() => {
                      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-emerald-200/50 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:rounded-3xl"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#05966966")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(5,150,105,0.15)")}
                >
                  {preview.cover && (
                    <Image
                      src={preview.cover}
                      alt={preview.category}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent" />
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md sm:h-9 sm:w-9">
                    <IconComponent size={14} strokeWidth={1.8} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 p-3.5 text-left sm:p-4">
                    <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white sm:text-[10px]">
                      {preview.count} Photos
                    </span>
                    <span className="mt-1.5 font-display text-sm font-black text-white sm:text-base">
                      {preview.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="collection" className="relative scroll-mt-24 overflow-hidden pb-16 sm:pb-20 lg:pb-24">
        <span aria-hidden className="pointer-events-none absolute -left-10 top-0 select-none font-display text-[15vw] font-black uppercase leading-none tracking-tighter text-emerald-100">
          Collection
        </span>
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="border-l-4 border-emerald-500 pl-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-600">
                {filteredItems.length} Photos
              </span>
              <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-emerald-950 sm:text-4xl">
                The Full <span className="text-emerald-600">Collection</span>
              </h2>
            </div>
          </motion.div>

          <div className="scrollbar-none -mx-4 mb-8 flex gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:mb-10 sm:flex-wrap sm:overflow-visible sm:px-0">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className="relative shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition-colors duration-300 sm:text-sm"
                  style={{ color: active ? "white" : "rgba(5,150,105,0.8)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="gallery-filter-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-emerald-700"
                    />
                  )}
                  {!active && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-emerald-200/50 bg-cream-50" />
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    {cat === "All" ? (
                      <Sparkles size={13} strokeWidth={2} />
                    ) : (
                      <IconForCategory cat={cat} />
                    )}
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 lg:gap-5 xl:columns-5">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <GalleryTile
                  key={item.id}
                  item={item}
                  index={index}
                  isFeatured={activeCategory === "All" && index === 0}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-sm font-semibold text-emerald-700/50">
                No photographs in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-emerald-200/50 pb-20 sm:pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] border border-emerald-200/50 bg-cream-50 p-8 text-center shadow-lg sm:p-10"
          >
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-emerald-500" />
            <h2 className="font-display text-2xl font-black text-emerald-950 sm:text-3xl">
              Ready to see it for yourself?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-emerald-800/50">
              Every view, every corner — waiting for you in person.
            </p>
            <a
              href="/#book"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 text-sm font-bold text-emerald-950 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
            >
              Book Your Stay
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:right-6 sm:top-6"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:left-6"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:right-6"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>

            <motion.div
              key={activeLightboxItem.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[55vh] w-full max-w-5xl sm:h-[75vh]"
            >
              <Image
                src={activeLightboxItem.src}
                alt={activeLightboxItem.title}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <div className="absolute -bottom-12 left-1/2 max-w-[90vw] -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-500/20 bg-emerald-950/70 px-4 py-1.5 text-xs font-bold text-emerald-400 backdrop-blur-md sm:-bottom-10">
                {(lightboxIndex ?? 0) + 1} / {filteredItems.length} — {activeLightboxItem.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const ASPECTS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-[5/6]"];

function hashToIndex(id: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return h % mod;
}

function GalleryTile({
  item,
  index,
  isFeatured,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  isFeatured: boolean;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25, ease: "easeIn" } },
      }}
      initial="hidden"
      animate="show"
      exit="exit"
      className="mb-3 break-inside-avoid sm:mb-4"
    >
      <button
        type="button"
        onClick={onClick}
        className="group relative block w-full overflow-hidden rounded-2xl border border-emerald-200/50 bg-cream-50 p-2 text-left shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:rounded-3xl sm:p-2.5"
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#05966966")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(5,150,105,0.15)")}
      >
        <div
          className={`relative w-full overflow-hidden rounded-[1rem] sm:rounded-[1.25rem] ${ASPECTS[hashToIndex(item.id, ASPECTS.length)]}`}
          style={{ backgroundColor: "#022c2280" }}
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            priority={index < 4}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md"}`}
            onLoadingComplete={() => setLoaded(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/90 text-white backdrop-blur-md sm:h-10 sm:w-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </span>
          </div>

          <div className="absolute left-2 top-2 flex items-center gap-1.5 sm:left-3 sm:top-3">
            {isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md sm:text-[10px]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Featured
              </span>
            )}
            <span className="rounded-full bg-emerald-950/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-md sm:text-[10px]">
              {item.category}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-2.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-3.5">
            <span className="inline-block max-w-full truncate rounded-full bg-emerald-500 px-3 py-1 text-[9px] font-bold text-white shadow-sm sm:px-3.5 sm:py-1.5 sm:text-[11px]">
              {item.title}
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function IconForCategory({ cat }: { cat: string }) {
  const IconComponent = CATEGORY_ICONS[cat] || Sparkles;
  return <IconComponent size={13} strokeWidth={2} />;
}
