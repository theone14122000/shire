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

const GALLERY_FILES = [
  "attic-area-common.jpg",
  "bonfire.jpg",
  "common-balcony.jpg",
  "common-balcony-with-swing.jpg",
  "common-seating-first-floor.jpg",
  "decor.png",
  "dining-area.jpg",
  "enchanting-winter-views.jpg",
  "ground-floor-lobby.jpg",
  "himachali-style-seating.jpg",
  "indoor-games.jpeg",
  "lawn-with-outdoor-seating-1.jpg",
  "mesmerizing-views.jpg",
  "reception-area.png",
  "recreational-hall.jpg",
  "snow-view.jpg",
  "sunrise-view.png",
  "surrounded-by-greenery.jpg",
  "tv-lounge.jpg",
  "winters.jpg",
] as const;

function titleFromFile(file: string): string {
  const name = file.replace(/\.[^.]+$/, "").replace(/-\d+$/, "");
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function categoryFromFile(file: string): GalleryCategory {
  const lower = file.toLowerCase();
  if (/(view|snow|winter|sunrise|mesmerizing|greenery|enchant)/.test(lower)) return "Views";
  if (/(bonfire|lawn|outdoor)/.test(lower)) return "Outdoor";
  if (/(dining|decor|tv|lounge|himachali|games|kitchen)/.test(lower)) return "Interiors";
  return "Common Spaces";
}

const GALLERY_ITEMS: GalleryItem[] = GALLERY_FILES.map((file) => ({
  id: file,
  title: titleFromFile(file),
  category: categoryFromFile(file),
  src: `/gallery/${file}`,
}));

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

const POLAROID_ROTATIONS = [-2.5, 2, -1.8, 2.8, -2, 1.5];

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
    <section className="overflow-hidden bg-[#f7f1e6]">
      <div className="relative min-h-[70vh] overflow-hidden sm:min-h-[72vh]">
        <Image
          src="/gallery/enchanting-winter-views.jpg"
          alt="The Enchanting Winter Views"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-emerald-950/10" />
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
              <p className="mt-5 max-w-lg text-base leading-[1.85] text-emerald-950/65">
                {GALLERY_ITEMS.length} photographs across four spaces - the views, common areas, outdoor corners, and interiors.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {CATEGORIES.map((category) => {
                const active = activeCategory === category;
                const Icon = category === "All" ? Sparkles : CATEGORY_ICONS[category];
                const count =
                  category === "All"
                    ? GALLERY_ITEMS.length
                    : GALLERY_ITEMS.filter((item) => item.category === category).length;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                      active
                        ? "border-emerald-900 bg-emerald-950 text-cream-50 shadow-[var(--shadow-soft)]"
                        : "border-emerald-900/15 bg-white/50 text-emerald-950/60 hover:border-gold-600 hover:text-gold-700"
                    }`}
                  >
                    <Icon size={13} strokeWidth={1.8} />
                    {category}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                        active ? "bg-cream-50/15" : "bg-emerald-900/8"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3"
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
              className="relative flex h-[72vh] w-full max-w-6xl flex-col sm:h-[80vh]"
            >
              <div className="relative min-h-0 grow">
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  sizes="92vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-full bg-emerald-950/80 px-5 py-3 backdrop-blur">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300">
                    {activeItem.category}
                  </span>
                  <span className="truncate font-display text-base font-semibold text-cream-50 sm:text-lg">
                    {activeItem.title}
                  </span>
                </div>
                <span className="shrink-0 text-xs font-bold tabular-nums text-cream-100/60">
                  {String(lightboxIndex! + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
                </span>
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
      style={{ rotate: POLAROID_ROTATIONS[index % POLAROID_ROTATIONS.length] }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
      className="mb-7 break-inside-avoid"
    >
      <button
        type="button"
        onClick={onClick}
        className="group block w-full bg-cream-50 p-3 pb-4 text-left shadow-[0_18px_50px_-18px_rgba(6,40,25,0.4)] transition-shadow duration-500 hover:shadow-[0_32px_70px_-20px_rgba(6,40,25,0.5)]"
      >
        <div className={`relative ${aspectFor(index)} w-full overflow-hidden bg-emerald-950`}>
          <Image
            src={item.src}
            alt={item.title}
            fill
            priority={index < 4}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
        </div>
        <div className="px-2 pb-1.5 pt-5 text-center">
          <span className="mx-auto mb-3 block h-px w-10 bg-gold-600/60" />
          <p className="font-display text-xl font-semibold leading-snug text-emerald-950 sm:text-[1.35rem]">
            {item.title}
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-700">
            {item.category}
          </p>
        </div>
      </button>
    </motion.div>
  );
}

function aspectFor(index: number) {
  const aspects = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[5/4]", "aspect-[4/3]"];
  return aspects[index % aspects.length];
}
