"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Two-shade emerald system — identical to RoomPageContent            */
/*  DEEP  = #052e23  (grounding / background)                          */
/*  BRIGHT = #34d399 (accent / icons / CTAs / highlights)              */
/* ------------------------------------------------------------------ */
const DEEP = "#052e23";
const BRIGHT = "#34d399";

/* ------------------------------------------------------------------ */
/*  Sun rays — 12 rays, alternating long / short (same math as         */
/*  TraditionalRemedies' SunMark)                                      */
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
/*  Data — images referenced from /public/gallery/*.jpg                */
/*  Rename your files to match the `src` values below, or edit the     */
/*  `src` field per item to match whatever you actually save.          */
/* ------------------------------------------------------------------ */
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
  { id: "sunrise-view", title: "Sunrise View", category: "Views", src: "/gallery/sunrise-view.jpg" },
  { id: "common-balcony-swing", title: "Common Balcony with Swing", category: "Common Spaces", src: "/gallery/common-balcony-with-swing.jpg" },
  { id: "lawn-seating-1", title: "Lawn with Outdoor Seating", category: "Outdoor", src: "/gallery/lawn-with-outdoor-seating-1.jpg" },
  { id: "lawn-seating-2", title: "Lawn with Outdoor Seating", category: "Outdoor", src: "/gallery/lawn-with-outdoor-seating-2.jpg" },
  { id: "himachali-seating", title: "Low Height Himachali Style Seating (Ground Floor)", category: "Interiors", src: "/gallery/himachali-style-seating.jpg" },
  { id: "recreational-hall", title: "Recreational Hall", category: "Common Spaces", src: "/gallery/recreational-hall.jpg" },
  { id: "tv-lounge", title: "TV Lounge", category: "Interiors", src: "/gallery/tv-lounge.jpg" },
  { id: "decor", title: "Decor", category: "Interiors", src: "/gallery/decor.jpg" },
  { id: "reception-area", title: "Reception Area", category: "Common Spaces", src: "/gallery/reception-area.jpg" },
  { id: "indoor-games", title: "Indoor Games", category: "Common Spaces", src: "/gallery/indoor-games.jpg" },
  { id: "winters", title: "Winters", category: "Views", src: "/gallery/winters.jpg" },
];

const CATEGORIES: CategoryFilter[] = ["All", "Views", "Common Spaces", "Outdoor", "Interiors"];

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.25, ease: "easeIn" } },
};

const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalImage: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

/* ------------------------------------------------------------------ */
/*  Bento span pattern — hero tile, occasional wide tiles, rest square */
/* ------------------------------------------------------------------ */
function getSpanClass(index: number): string {
  if (index === 0) return "col-span-2 row-span-2";
  if (index % 6 === 4) return "col-span-2";
  return "col-span-1";
}

/* ================================================================== */
export function GalleryPageContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const blob3X = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

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
    <>
      <section
        ref={sectionRef}
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: DEEP }}
      >
        {/* ---- Background layers: radial glow, noise, animated grid ---- */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background: `radial-gradient(60% 45% at 15% 0%, ${BRIGHT}33 0%, transparent 60%), radial-gradient(55% 45% at 95% 15%, ${BRIGHT}1f 0%, transparent 55%), radial-gradient(80% 60% at 50% 100%, ${DEEP} 0%, transparent 65%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ---- Scroll-linked parallax blobs (same logic as TraditionalRemedies) ---- */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full blur-[120px]"
          style={{ y: blob1Y, backgroundColor: `${BRIGHT}26` }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-[120px]"
          style={{ y: blob2Y, backgroundColor: `${BRIGHT}1a` }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-[100px]"
          style={{ x: blob3X, backgroundColor: "rgba(255,255,255,0.08)" }}
        />

        {/* ---- Rotating dashed ring (same as TraditionalRemedies) ---- */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[15%] left-[5%] hidden lg:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="h-24 w-24 rounded-full border border-dashed opacity-25"
            style={{ borderColor: "rgba(245,200,66,0.5)" }}
          />
        </motion.div>

        {/* ---- Top glowing traveling line ---- */}
        <motion.div
          aria-hidden
          className="relative z-10 h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${BRIGHT}aa, transparent)`,
            backgroundSize: "200% auto",
          }}
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          {/* ============================ */}
          {/* HEADER                       */}
          {/* ============================ */}
          <div className="mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-40">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center gap-5 text-center"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span
                  className="block h-px w-8"
                  style={{ backgroundColor: `${BRIGHT}99` }}
                  aria-hidden
                />
                <span
                  className="text-[11px] font-extrabold uppercase tracking-[0.3em]"
                  style={{ color: BRIGHT }}
                >
                  Take A Look Inside
                </span>
                <span
                  className="block h-px w-8"
                  style={{ backgroundColor: `${BRIGHT}99` }}
                  aria-hidden
                />
              </motion.div>

              <motion.div variants={fadeUp} className="relative">
                <SunMark
                  ariaHidden
                  className="pointer-events-none absolute -right-4 -top-14 h-24 w-24 sm:-right-8 sm:-top-16 sm:h-32 sm:w-32 lg:-right-12 lg:-top-20 lg:h-40 lg:w-40"
                />
                <h1 className="relative font-display text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Gallery
                </h1>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base"
              >
                A visual journey through our sanctuary — from misty winter mornings to
                warm evenings around the bonfire.
              </motion.p>

              <motion.div variants={fadeUp}>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{ borderColor: `${BRIGHT}33`, backgroundColor: `${BRIGHT}14`, color: BRIGHT }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  {GALLERY_ITEMS.length} Photographs
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ============================ */}
          {/* CATEGORY FILTER              */}
          {/* ============================ */}
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
            <div className="scrollbar-none -mx-4 flex gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className="relative shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition-colors duration-300 sm:text-sm"
                    style={{ color: active ? DEEP : "rgba(255,255,255,0.75)" }}
                  >
                    {active && (
                      <motion.span
                        layoutId="gallery-filter-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{ backgroundColor: BRIGHT }}
                      />
                    )}
                    {!active && (
                      <span
                        className="absolute inset-0 -z-10 rounded-full border"
                        style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.04)" }}
                      />
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <CategoryIcon category={cat} />
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================ */}
          {/* GRID                         */}
          {/* ============================ */}
          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
            <motion.div
              layout
              className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-3 lg:auto-rows-[230px] lg:grid-cols-4 lg:gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <GalleryTile
                    key={item.id}
                    item={item}
                    index={index}
                    spanClass={getSpanClass(index)}
                    onClick={() => openLightbox(index)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-20 text-center">
                <p className="text-sm font-semibold text-white/50">
                  No photographs in this category yet.
                </p>
              </div>
            )}
          </div>

          {/* ============================ */}
          {/* FOOTER CTA                   */}
          {/* ============================ */}
          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center shadow-lg backdrop-blur-md sm:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                style={{ backgroundColor: BRIGHT }}
              />
              <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
                Ready to see it for yourself?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
                Every view, every corner — waiting for you in person.
              </p>
              <a
                href="/#book"
                className="group mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: BRIGHT, color: DEEP, boxShadow: `0 10px 30px ${BRIGHT}66` }}
              >
                Book Your Stay
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================ */}
      {/* LIGHTBOX                     */}
      {/* ============================ */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:left-6"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:right-6"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <motion.div
              key={activeLightboxItem.id}
              variants={modalImage}
              initial="hidden"
              animate="show"
              exit="exit"
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
              <div
                className="absolute -bottom-12 left-1/2 max-w-[90vw] -translate-x-1/2 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-bold backdrop-blur-md sm:-bottom-10"
                style={{ borderColor: `${BRIGHT}33`, backgroundColor: `${DEEP}b3`, color: BRIGHT }}
              >
                {(lightboxIndex ?? 0) + 1} / {filteredItems.length} — {activeLightboxItem.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================== */
/*  GalleryTile — fade-in-on-load image tile                          */
/* ================================================================== */
function GalleryTile({
  item,
  index,
  spanClass,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  spanClass: string;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      layout
      variants={tileVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-left shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:rounded-3xl sm:p-2.5 ${spanClass}`}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${BRIGHT}66`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[1rem] sm:rounded-[1.25rem]"
        style={{ backgroundColor: `${DEEP}99` }}
      >
        <Image
          src={item.src}
          alt={item.title}
          fill
          priority={index < 4}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onLoadingComplete={() => setLoaded(true)}
          className={`object-cover transition-all duration-700 group-hover:scale-110 ${
            loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md"
          }`}
        />

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(to top, ${DEEP}e6, transparent 60%)` }}
        />

        {/* Zoom hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md sm:h-10 sm:w-10"
            style={{ backgroundColor: `${BRIGHT}e6`, color: DEEP }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </span>
        </div>

        {/* Category chip */}
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur-md sm:text-[10px]"
            style={{ backgroundColor: `${DEEP}99`, color: BRIGHT }}
          >
            {item.category}
          </span>
        </div>

        {/* Title label */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-2.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-3.5">
          <span
            className="inline-block max-w-full truncate rounded-full px-3 py-1 text-[9px] font-bold shadow-sm sm:px-3.5 sm:py-1.5 sm:text-[11px]"
            style={{ backgroundColor: BRIGHT, color: DEEP }}
          >
            {item.title}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* ================================================================== */
/*  CategoryIcon — small icon per filter pill                          */
/* ================================================================== */
function CategoryIcon({ category }: { category: CategoryFilter }) {
  const common = {
    width: 13,
    height: 13,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (category) {
    case "Views":
      return (
        <svg {...common}>
          <path d="M3 20l6-10 4 6 3-4 5 8H3z" />
        </svg>
      );
    case "Common Spaces":
      return (
        <svg {...common}>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "Outdoor":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      );
    case "Interiors":
      return (
        <svg {...common}>
          <path d="M4 18v-6a4 4 0 014-4h8a4 4 0 014 4v6" />
          <path d="M2 18h20v2H2z" />
          <path d="M4 12V8a2 2 0 012-2h1" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
  }
}

/* ================================================================== */
/*  SunMark — identical to TraditionalRemedies (unchanged, kept gold   */
/*  so the "sun" reads as a sun against the dark emerald backdrop)     */
/* ================================================================== */
function SunMark({
  className = "",
  ariaHidden = true,
}: {
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <div className={className} aria-hidden={ariaHidden}>
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,224,138,0.65) 0%, rgba(245,200,66,0.40) 45%, rgba(245,200,66,0) 72%)",
          }}
        />

        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
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
        </motion.svg>

        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <radialGradient id="sunCoreGradGallery" cx="42%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#FFF1B8" />
              <stop offset="45%" stopColor="#F5C842" />
              <stop offset="100%" stopColor="#E8A317" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="50" fill="url(#sunCoreGradGallery)" />
          <circle cx="86" cy="84" r="16" fill="rgba(255,255,255,0.45)" />
        </motion.svg>
      </div>
    </div>
  );
}