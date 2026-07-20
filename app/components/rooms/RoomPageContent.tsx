"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { rooms } from "@/lib/rooms";

type Room = (typeof rooms)[number];

/* ------------------------------------------------------------------ */
/*  Two-shade emerald system — used everywhere, at varying opacity     */
/*  DEEP  = #052e23  (grounding / background)                          */
/*  BRIGHT = #34d399 (accent / icons / CTAs / highlights)              */
/* ------------------------------------------------------------------ */
const DEEP = "#052e23";
const BRIGHT = "#34d399";

const GALLERY_LABELS = [
  "Living Space",
  "Bedroom View",
  "Bathroom",
  "Balcony",
  "Details",
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const wordUp: Variants = {
  hidden: { opacity: 0, y: "0.5em", rotateX: -40 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
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

export function RoomPageContent({ room }: { room: Room }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const ghostTitleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const ghostTitleX = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const orbX = useSpring(useMotionValue(0), { stiffness: 30, damping: 22 });
  const orbY = useSpring(useMotionValue(0), { stiffness: 30, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 30);
    mouseY.set(y * 30);
    orbX.set(x * -50);
    orbY.set(y * -50);
  }

  /* ---------------- Sticky mobile "Book Now" bar ---------------- */
  const { scrollY } = useScroll();
  const floatingCtaOpacity = useTransform(scrollY, [300, 600], [0, 1]);
  const floatingCtaY = useTransform(scrollY, [300, 600], [24, 0]);
  const floatingCtaPointerEvents = useTransform(floatingCtaOpacity, (v) =>
    v > 0.05 ? "auto" : "none"
  );

  /* ---------------- Lightbox ---------------- */
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % room.images.length
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + room.images.length) % room.images.length
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
  }, [lightboxIndex]);

  const bgImage = `/images/${room.slug}.jpg`;

  const specs = [
    { label: "Size", value: room.size, icon: "ruler" as const },
    { label: "View", value: room.view, icon: "mountain" as const },
    { label: "Floor", value: room.floor, icon: "layers" as const },
  ];

  const titleWords = room.name.split(" ");

  return (
    <>
      {/* HERO — dynamic layered cinematic background */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative flex h-[85vh] min-h-[560px] w-full items-end overflow-hidden bg-ink-900 sm:h-[90vh] sm:min-h-[600px]"
      >
        <motion.div style={{ y: heroImageY, scale: heroImageScale }} className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            transition={{
              opacity: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={bgImage}
              alt={`${room.name} — ${room.category}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `linear-gradient(120deg, ${DEEP}cc 0%, transparent 45%, ${BRIGHT}40 100%)`,
          }}
        />

        <motion.div
          style={{ x: springX, y: springY, backgroundColor: `${BRIGHT}33` }}
          className="pointer-events-none absolute right-1/4 top-1/4 h-[24rem] w-[24rem] rounded-full blur-[120px] mix-blend-screen"
          aria-hidden
        />
        <motion.div
          style={{ x: orbX, y: orbY, backgroundColor: `${BRIGHT}1f` }}
          className="pointer-events-none absolute bottom-1/4 left-1/4 h-[22rem] w-[22rem] rounded-full blur-[110px] mix-blend-screen"
          aria-hidden
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `linear-gradient(${BRIGHT}59 1px, transparent 1px), linear-gradient(90deg, ${BRIGHT}59 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <motion.span
          aria-hidden
          style={{ y: ghostTitleY, x: ghostTitleX }}
          className="pointer-events-none absolute -bottom-4 left-0 z-[5] select-none whitespace-nowrap font-display text-[26vw] font-black uppercase leading-none tracking-tighter text-white/[0.06] sm:text-[22vw] lg:text-[18vw]"
        >
          {room.category}
        </motion.span>

        <div
          className="absolute inset-0 z-[6] pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${DEEP} 0%, ${DEEP}8c 42%, ${DEEP}1f 66%, ${DEEP}66 100%)`,
          }}
          aria-hidden
        />

        {/* Top bar — back button (left) + live badge (right), stacked cleanly on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute inset-x-0 top-4 z-20 flex items-center justify-between gap-2 px-4 sm:top-6 sm:px-6"
        >
          <Link
            href="/#rooms"
            aria-label="Back to all rooms"
            className="group inline-flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-xs font-bold backdrop-blur-md transition-colors sm:px-4"
            style={{
              borderColor: `${BRIGHT}33`,
              backgroundColor: `${DEEP}80`,
              color: "rgba(255,255,255,0.85)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${BRIGHT}99`;
              e.currentTarget.style.color = BRIGHT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${BRIGHT}33`;
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1">
              <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Back to All Rooms</span>
          </Link>

          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-md sm:px-4 sm:text-[11px] sm:tracking-[0.16em]"
            style={{
              borderColor: `${BRIGHT}33`,
              backgroundColor: `${DEEP}66`,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: BRIGHT, boxShadow: `0 0 8px 2px ${BRIGHT}99` }}
            />
            <span className="hidden sm:inline">4 guests viewing</span>
            <span className="sm:hidden">4 viewing</span>
            <span style={{ color: BRIGHT }} className="hidden sm:inline">{room.name}</span>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
          >
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2.5">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm"
                style={{ borderColor: `${BRIGHT}66`, backgroundColor: `${DEEP}4d`, color: BRIGHT }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: BRIGHT }} />
                {room.category}
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] backdrop-blur-sm"
                style={{ borderColor: `${BRIGHT}33`, backgroundColor: `${DEEP}33`, color: "rgba(255,255,255,0.85)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill={BRIGHT} stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Guest Favourite
              </span>
            </motion.div>

            <motion.h1
              variants={stagger}
              className="font-display text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl [transform-style:preserve-3d] [transform-perspective:1000px]"
            >
              {titleWords.map((word, i) => {
                const isLast = i === titleWords.length - 1 && titleWords.length > 1;
                return (
                  <motion.span
                    key={`${word}-${i}`}
                    variants={wordUp}
                    className="mr-[0.25em] inline-block"
                    style={isLast ? { color: BRIGHT } : undefined}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg"
            >
              {room.description}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#book"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: BRIGHT,
                  color: DEEP,
                  boxShadow: `0 10px 30px ${BRIGHT}66`,
                }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Book This Room</span>
                <svg className="relative" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-full border-2 px-7 py-3.5 text-sm font-bold backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: `${BRIGHT}4d`, backgroundColor: `${DEEP}33`, color: "rgba(255,255,255,0.85)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${BRIGHT}99`;
                  e.currentTarget.style.color = BRIGHT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${BRIGHT}4d`;
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                }}
              >
                View Gallery
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* PREMIUM EMERALD CANVAS */}
      <div className="relative isolate overflow-hidden text-white" style={{ backgroundColor: DEEP }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background: `radial-gradient(60% 45% at 15% 0%, ${BRIGHT}33 0%, transparent 60%), radial-gradient(55% 45% at 95% 20%, ${BRIGHT}1f 0%, transparent 55%), radial-gradient(80% 60% at 50% 100%, ${DEEP} 0%, transparent 65%)`,
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
          {/* SPECS STRIP */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="grid grid-cols-3 divide-x divide-white/10"
              >
                {specs.map((spec) => (
                  <motion.div
                    key={spec.label}
                    variants={fadeUp}
                    className="group relative flex flex-col items-center gap-1.5 px-2 py-6 text-center transition-colors duration-300 hover:bg-white/5 sm:gap-2 sm:py-9"
                  >
                    <span
                      className="absolute inset-x-0 bottom-0 mx-auto h-[3px] w-0 rounded-full transition-all duration-500 group-hover:w-2/3"
                      style={{ backgroundColor: BRIGHT }}
                    />
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full border shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-11 sm:w-11"
                      style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: `${BRIGHT}14`, color: BRIGHT }}
                    >
                      <SpecIcon name={spec.icon} />
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/60 sm:text-[11px] sm:tracking-[0.18em]">
                      {spec.label}
                    </span>
                    <span className="font-display text-xs font-black text-white sm:text-base">
                      {spec.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* FACILITIES */}
          <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 top-6 select-none font-display text-[16vw] font-black uppercase leading-none tracking-tighter text-white/[0.03]"
            >
              Comfort
            </span>
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="mb-10 flex flex-col gap-3 border-l-4 pl-5 sm:mb-14"
                style={{ borderColor: BRIGHT }}
              >
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: BRIGHT }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 019 6c3 0 6 2 8 6 1.5 3 1 6-1 8-2 2-5 2-5 0z" />
                  </svg>
                  Room Highlights
                </span>
                <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Amenities &amp; <span style={{ color: BRIGHT }}>Comforts</span>
                </h2>
              </motion.div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {room.facilities.map((facility) => (
                  <motion.div
                    key={facility}
                    variants={fadeUp}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-lg"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${BRIGHT}66`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  >
                    <span
                      className="absolute left-0 top-0 h-full w-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ backgroundColor: BRIGHT }}
                    />
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: `${BRIGHT}14`, color: BRIGHT }}
                    >
                      <FacilityIcon label={facility} />
                    </span>
                    <span className="text-sm font-bold text-white/90">{facility}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* GALLERY */}
          <section id="gallery" className="relative scroll-mt-24 overflow-hidden pb-16 sm:pb-20 lg:pb-24">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-10 top-0 select-none font-display text-[16vw] font-black uppercase leading-none tracking-tighter text-white/[0.03]"
            >
              Gallery
            </span>
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
              >
                <div className="border-l-4 pl-5" style={{ borderColor: BRIGHT }}>
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: BRIGHT }}>
                    {room.images.length} Photos
                  </span>
                  <h2 className="mt-1 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Visual Tour <span style={{ color: BRIGHT }}>Gallery</span>
                  </h2>
                </div>
              </motion.div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 md:auto-rows-[250px] md:grid-cols-4 md:gap-6"
              >
                {room.images.map((img, i) => {
                  const isHero = i === 0;
                  const isWide = i === 1;
                  const label = GALLERY_LABELS[i] ?? `Detail ${i + 1}`;

                  return (
                    <motion.div
                      key={img}
                      variants={fadeUp}
                      onClick={() => openLightbox(i)}
                      className={`group relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:rounded-3xl sm:p-2.5 ${
                        isHero ? "col-span-2 row-span-2" : isWide ? "col-span-2" : "col-span-1"
                      }`}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${BRIGHT}66`)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[1rem] sm:rounded-[1.25rem]" style={{ backgroundColor: `${DEEP}99` }}>
                        <Image
                          src={img}
                          alt={`${room.name} — ${label}`}
                          fill
                          priority={isHero}
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{ background: `linear-gradient(to top, ${DEEP}cc, transparent)` }}
                        />

                        {/* Zoom hint icon */}
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

                        <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-2.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-3.5">
                          <span
                            className="inline-block truncate rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider shadow-sm sm:px-3.5 sm:py-1.5 sm:text-[10px]"
                            style={{ backgroundColor: BRIGHT, color: DEEP }}
                          >
                            {label}
                          </span>
                        </div>
                        <div
                          className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-bold backdrop-blur-md sm:right-3 sm:top-3 sm:px-2.5 sm:text-[10px]"
                          style={{ backgroundColor: `${DEEP}99`, color: BRIGHT }}
                        >
                          {i + 1} / {room.images.length}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Gallery Footer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-lg backdrop-blur-md sm:p-6"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                  style={{ backgroundColor: BRIGHT }}
                />
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border sm:h-12 sm:w-12"
                      style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: `${BRIGHT}14` }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRIGHT} strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Want the full experience?</p>
                      <p className="mt-0.5 text-xs text-white/60">
                        Download our detailed room brochure with floor plans &amp; specs
                      </p>
                    </div>
                  </div>
                  <a
                    href="#brochure"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold shadow-xl transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
                    style={{ backgroundColor: BRIGHT, color: DEEP, boxShadow: `0 8px 24px ${BRIGHT}59` }}
                  >
                    Download Brochure
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* STICKY MOBILE BOOK BAR */}
      <motion.div
        style={{ opacity: floatingCtaOpacity, y: floatingCtaY, pointerEvents: floatingCtaPointerEvents }}
        className="fixed inset-x-4 bottom-4 z-50 lg:hidden"
      >
        <div
          className="flex items-center justify-between gap-3 rounded-2xl border p-2.5 pl-4 shadow-2xl backdrop-blur-xl"
          style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: `${DEEP}f2` }}
        >
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white">{room.name}</p>
            <p className="text-[10px] font-semibold" style={{ color: BRIGHT }}>{room.category}</p>
          </div>
          <a
            href="#book"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold"
            style={{ backgroundColor: BRIGHT, color: DEEP }}
          >
            Book Now
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Room image viewer"
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
              key={lightboxIndex}
              variants={modalImage}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative h-[60vh] w-full max-w-5xl sm:h-[75vh]"
            >
              <Image
                src={room.images[lightboxIndex]}
                alt={`${room.name} — ${GALLERY_LABELS[lightboxIndex] ?? "Detail"}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full border px-4 py-1.5 text-xs font-bold backdrop-blur-md"
                style={{ borderColor: `${BRIGHT}33`, backgroundColor: `${DEEP}b3`, color: BRIGHT }}
              >
                {lightboxIndex + 1} / {room.images.length} — {GALLERY_LABELS[lightboxIndex] ?? "Detail"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================== */
/*  SpecIcon — Size / View / Floor                                     */
/* ================================================================== */
function SpecIcon({ name }: { name: "ruler" | "mountain" | "layers" }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "ruler":
      return (
        <svg {...common}>
          <path d="M21.3 8.7L15.3 2.7a1 1 0 00-1.4 0L2.7 13.9a1 1 0 000 1.4l6 6a1 1 0 001.4 0L21.3 10.1a1 1 0 000-1.4z" />
          <path d="M7.5 10.5l2 2M11 7l2 2M14.5 3.5l2 2" />
        </svg>
      );
    case "mountain":
      return (
        <svg {...common}>
          <path d="M3 20l6-10 4 6 3-4 5 8H3z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 2l9 5-9 5-9-5 9-5z" />
          <path d="M3 12l9 5 9-5M3 17l9 5 9-5" />
        </svg>
      );
  }
}

/* ================================================================== */
/*  FacilityIcon — content-aware icon matched from the facility label  */
/* ================================================================== */
type FacilityIconType =
  | "wifi" | "tv" | "snow" | "heat" | "water" | "bath" | "balcony"
  | "mountain" | "coffee" | "parking" | "wardrobe" | "safe" | "fridge"
  | "bell" | "fire" | "bed" | "desk" | "sparkle" | "bolt" | "paw"
  | "ban" | "game" | "book" | "leaf" | "check";

function getFacilityIconType(label: string): FacilityIconType {
  const l = label.toLowerCase();
  if (/wifi|wi-fi|internet/.test(l)) return "wifi";
  if (/\btv\b|television/.test(l)) return "tv";
  if (/\bac\b|air.?condition/.test(l)) return "snow";
  if (/heater|heating/.test(l)) return "heat";
  if (/hot water|geyser/.test(l)) return "water";
  if (/bath|shower|washroom/.test(l)) return "bath";
  if (/balcony|terrace/.test(l)) return "balcony";
  if (/view|mountain|valley|orchard/.test(l)) return "mountain";
  if (/breakfast|meal|dining|kitchen/.test(l)) return "coffee";
  if (/parking|car/.test(l)) return "parking";
  if (/wardrobe|closet|almirah/.test(l)) return "wardrobe";
  if (/safe|locker/.test(l)) return "safe";
  if (/fridge|refrigerator|mini.?bar/.test(l)) return "fridge";
  if (/room service|service/.test(l)) return "bell";
  if (/bonfire|fireplace/.test(l)) return "fire";
  if (/\bbed\b|king|queen/.test(l)) return "bed";
  if (/desk|study|workspace/.test(l)) return "desk";
  if (/housekeeping|clean/.test(l)) return "sparkle";
  if (/power|backup|electric/.test(l)) return "bolt";
  if (/pet/.test(l)) return "paw";
  if (/non.?smoking/.test(l)) return "ban";
  if (/game|board|carrom|tt table/.test(l)) return "game";
  if (/book|library|reading/.test(l)) return "book";
  if (/garden|lawn|nature/.test(l)) return "leaf";
  return "check";
}

function FacilityIcon({ label }: { label: string }) {
  const type = getFacilityIconType(label);
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (type) {
    case "wifi":
      return (
        <svg {...common}>
          <path d="M5 12.55a11 11 0 0114 0" />
          <path d="M8.5 16.05a6 6 0 017 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tv":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="20" height="13" rx="2" />
          <polyline points="17 2 12 7 7 2" />
        </svg>
      );
    case "snow":
      return (
        <svg {...common}>
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="4" y1="7" x2="20" y2="17" />
          <line x1="20" y1="7" x2="4" y2="17" />
        </svg>
      );
    case "heat":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="8" y1="4" x2="8" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="16" y1="4" x2="16" y2="20" />
        </svg>
      );
    case "water":
      return (
        <svg {...common}>
          <path d="M12 2s7 8.5 7 13a7 7 0 11-14 0c0-4.5 7-13 7-13z" />
        </svg>
      );
    case "bath":
      return (
        <svg {...common}>
          <path d="M4 12h16" />
          <path d="M6 12V6a6 6 0 0112 0v6" />
          <line x1="8" y1="16" x2="8" y2="16.01" />
          <line x1="12" y1="18" x2="12" y2="18.01" />
          <line x1="16" y1="16" x2="16" y2="16.01" />
        </svg>
      );
    case "balcony":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      );
    case "mountain":
      return (
        <svg {...common}>
          <path d="M3 20l6-10 4 6 3-4 5 8H3z" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...common}>
          <path d="M18 8h1a4 4 0 010 8h-1" />
          <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case "parking":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9 8h3a2.5 2.5 0 010 5H9V8zm0 5v4" />
        </svg>
      );
    case "wardrobe":
      return (
        <svg {...common}>
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <circle cx="9" cy="12" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="15" cy="12" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "safe":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="9" x2="12" y2="7" />
        </svg>
      );
    case "fridge":
      return (
        <svg {...common}>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="5" y1="10" x2="19" y2="10" />
          <line x1="9" y1="5" x2="9" y2="7" />
          <line x1="9" y1="13" x2="9" y2="15" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      );
    case "fire":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2s6 6.5 6 11.5A6 6 0 0112 20a6 6 0 01-6-6.5C6 8.5 12 2 12 2z" />
        </svg>
      );
    case "bed":
      return (
        <svg {...common}>
          <path d="M2 4v16" />
          <path d="M2 8h18a2 2 0 012 2v10" />
          <path d="M2 17h20" />
          <path d="M6 8V6a2 2 0 012-2h3a2 2 0 012 2v2" />
        </svg>
      );
    case "desk":
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="2" />
          <line x1="6" y1="13" x2="6" y2="20" />
          <line x1="18" y1="13" x2="18" y2="20" />
          <line x1="6" y1="6" x2="18" y2="6" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          <path d="M19 15l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6.6-1.9z" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "paw":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <circle cx="7" cy="7" r="1.6" />
          <circle cx="12" cy="5" r="1.6" />
          <circle cx="17" cy="7" r="1.6" />
          <path d="M6 14c0-2.5 2.5-4 6-4s6 1.5 6 4-2 5-6 5-6-2.5-6-5z" />
        </svg>
      );
    case "ban":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" />
        </svg>
      );
    case "game":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="8" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="8" cy="16" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M11 20A7 7 0 019 6c3 0 6 2 8 6 1.5 3 1 6-1 8-2 2-5 2-5 0z" />
          <path d="M9 6c0 6 2 10 6 14" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
  }
}