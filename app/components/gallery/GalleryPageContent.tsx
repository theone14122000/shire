"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Home, Mountain, Sofa, Sparkles, Trees, X } from "lucide-react";

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
  { id: "ground-floor-lobby", title: "Ground Floor Lobby - Double Height Ceiling", category: "Common Spaces", src: "/gallery/ground-floor-lobby.jpg" },
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

const CATEGORY_ICONS: Record<GalleryCategory, typeof Mountain> = {
  Views: Mountain,
  "Common Spaces": Sofa,
  Outdoor: Trees,
  Interiors: Home,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

export function GalleryPageContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;
  const close = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filteredItems.length));
  const prev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filteredItems.length) % filteredItems.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section className="editorial-surface overflow-hidden">
      <div className="relative min-h-[76vh] overflow-hidden">
        <Image
          src="/gallery/enchanting-winter-views.jpg"
          alt="The Enchanting Winter Views"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/86 via-emerald-950/38 to-emerald-950/8" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-14 sm:px-8 sm:pb-20 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[1400px] text-center"
          >
            <span className="luxe-kicker justify-center text-gold-300">Explore The Property</span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] text-cream-50 sm:text-6xl lg:text-7xl">
              Gallery
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-[1.85] text-cream-100/70 sm:text-lg">
              Every season, every corner - a visual tour through The Himalayan Shire, from misty mornings to warm evenings by the fire.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <span className="luxe-kicker text-gold-700">Browse By Space</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
                Every corner, captured.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {CATEGORIES.map((category) => {
                const active = activeCategory === category;
                const Icon = category === "All" ? Sparkles : CATEGORY_ICONS[category];
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                      active
                        ? "border-emerald-900 bg-emerald-950 text-cream-50"
                        : "border-emerald-900/15 bg-transparent text-emerald-950/62 hover:border-gold-600 hover:text-gold-700"
                    }`}
                  >
                    <Icon size={13} strokeWidth={1.8} />
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <GalleryTile
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => setLightboxIndex(index)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-8"
          >
            <button onClick={close} aria-label="Close image viewer" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/18 sm:right-6 sm:top-6">
              <X size={18} strokeWidth={2} />
            </button>
            <button onClick={(event) => { event.stopPropagation(); prev(); }} aria-label="Previous image" className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/18 sm:left-6">
              <ChevronLeft size={22} strokeWidth={2} />
            </button>
            <button onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next image" className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/18 sm:right-6">
              <ChevronRight size={22} strokeWidth={2} />
            </button>

            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[68vh] w-full max-w-6xl sm:h-[80vh]"
            >
              <Image
                src={activeItem.src}
                alt={activeItem.title}
                fill
                sizes="92vw"
                className="object-contain"
              />
              <div className="absolute -bottom-12 left-1/2 max-w-[88vw] -translate-x-1/2 bg-emerald-950/78 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cream-50 backdrop-blur">
                {activeItem.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryTile({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.96 }}
      className="mb-4 break-inside-avoid"
    >
      <button
        type="button"
        onClick={onClick}
        className="group relative block w-full overflow-hidden text-left"
      >
        <div className={`relative ${aspectFor(index)} overflow-hidden`}>
          <Image
            src={item.src}
            alt={item.title}
            fill
            priority={index < 4}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1.1s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/78 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300">
              {item.category}
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold text-cream-50">
              {item.title}
            </h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function aspectFor(index: number) {
  const aspects = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[5/4]", "aspect-[4/3]"];
  return aspects[index % aspects.length];
}
