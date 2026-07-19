"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { rooms } from "@/lib/rooms";

type Room = (typeof rooms)[number];

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

export function RoomPageContent({ room }: { room: Room }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax for depth
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

  const bgImage = `/images/${room.slug}.jpg`;

  const specs = [
    { label: "Size", value: room.size, icon: "ruler" as const },
    { label: "View", value: room.view, icon: "mountain" as const },
    { label: "Floor", value: room.floor, icon: "layers" as const },
  ];

  const titleWords = room.name.split(" ");

  return (
    <>
      {/* ======================== */}
      {/* HERO — dynamic layered cinematic background            */}
      {/* ======================== */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative flex h-[90vh] min-h-[600px] w-full items-end overflow-hidden bg-ink-900"
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
            background:
              "linear-gradient(120deg, rgba(6,78,59,0.55) 0%, transparent 45%, rgba(251,191,36,0.28) 100%)",
          }}
        />

        <motion.div
          style={{ x: springX, y: springY }}
          className="pointer-events-none absolute right-1/4 top-1/4 h-[24rem] w-[24rem] rounded-full bg-emerald-400/20 blur-[120px] mix-blend-screen"
          aria-hidden
        />
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="pointer-events-none absolute bottom-1/4 left-1/4 h-[22rem] w-[22rem] rounded-full bg-amber-300/20 blur-[110px] mix-blend-screen"
          aria-hidden
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)",
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
            background:
              "linear-gradient(to top, rgba(4,22,18,0.94) 0%, rgba(4,22,18,0.5) 42%, rgba(4,22,18,0.12) 66%, rgba(4,22,18,0.4) 100%)",
          }}
          aria-hidden
        />

        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute left-1/2 top-6 z-20 -translate-x-1/2 sm:left-6 sm:translate-x-0"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-emerald-950/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
            <motion.span
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]"
            />
            4 guests viewing <span className="text-amber-300">{room.name}</span> right now
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute right-6 top-6 z-20 sm:left-6 sm:right-auto"
        >
          <Link
            href="/#rooms"
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-950/40 px-4 py-2 text-xs font-bold text-white/80 backdrop-blur-md transition-colors hover:border-amber-300/50 hover:bg-emerald-900/60 hover:text-amber-200"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1">
              <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Back to All Rooms</span>
          </Link>
        </motion.div>

        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
          >
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-gradient-to-r from-emerald-500/20 to-amber-400/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {room.category}
              </span>
            </motion.div>

            <motion.h1
              variants={stagger}
              className="font-display text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl [transform-style:preserve-3d] [transform-perspective:1000px]"
            >
              {titleWords.map((word, i) => {
                const isLast = i === titleWords.length - 1 && titleWords.length > 1;
                return (
                  <motion.span
                    key={`${word}-${i}`}
                    variants={wordUp}
                    className={`mr-[0.25em] inline-block ${
                      isLast
                        ? "bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400 bg-clip-text text-transparent"
                        : ""
                    }`}
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

            <motion.div variants={fadeUp} className="mt-2 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-ink-900 shadow-[0_10px_30px_rgba(251,191,36,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Book This Room</span>
                <svg className="relative" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-300/40 bg-emerald-950/20 px-7 py-3.5 text-sm font-bold text-white/85 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/60 hover:bg-emerald-900/40 hover:text-amber-100"
              >
                View Gallery
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-20 h-[3px]"
          style={{
            background: "linear-gradient(90deg, #10b981, #fbbf24, #10b981)",
            backgroundSize: "200% auto",
          }}
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </section>

      {/* ======================== */}
      {/* SPECS STRIP — Premium Emerald Band */}
      {/* ======================== */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 py-14 sm:py-18 lg:py-22">
        {/* Subtle luxury texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0"
          >
            {specs.map((spec, idx) => (
              <motion.div
                key={spec.label}
                variants={fadeUp}
                className={`group relative flex flex-col items-center gap-3 py-8 text-center transition-all duration-500 hover:bg-white/5 sm:px-6 ${
                  idx !== 0 ? "sm:border-l sm:border-white/10" : ""
                }`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-200 transition-all duration-300 group-hover:scale-110 group-hover:border-amber-300 group-hover:bg-amber-400/20">
                  <SpecIcon name={spec.icon} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200/70 sm:text-[11px]">
                  {spec.label}
                </span>
                <span className="font-display text-xl font-black text-white sm:text-2xl">
                  {spec.value}
                </span>
                
                {/* Animated bottom accent */}
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500 group-hover:w-16" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======================================= */}
      {/* FACILITIES — premium cards                           */}
      {/* ======================================= */}
      <section className="relative overflow-hidden bg-emerald-50/60 py-16 sm:py-20 lg:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 top-6 select-none font-display text-[16vw] font-black uppercase leading-none tracking-tighter text-emerald-900/[0.04]"
        >
          Comfort
        </span>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col gap-3 border-l-4 border-amber-400 pl-5 sm:mb-14"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              Room Highlights
            </span>
            <h2 className="font-display text-3xl font-black tracking-tight text-black sm:text-4xl">
              Amenities &amp;{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
                Comforts
              </span>
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
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-emerald-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-900/5"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-amber-100 text-emerald-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-sm font-bold text-neutral-900">{facility}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================== */}
      {/* GALLERY                                              */}
      {/* ================================== */}
      <section id="gallery" className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-10 top-10 select-none font-display text-[16vw] font-black uppercase leading-none tracking-tighter text-emerald-900/[0.04]"
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
            <div className="border-l-4 border-amber-400 pl-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
                {room.images.length} Photos
              </span>
              <h2 className="mt-1 font-display text-3xl font-black tracking-tight text-black sm:text-4xl">
                Visual Tour{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
                  Gallery
                </span>
              </h2>
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 auto-rows-[220px] md:auto-rows-[250px]"
          >
            {room.images.map((img, i) => {
              const isHero = i === 0;
              const isWide = i === 1;
              const label = GALLERY_LABELS[i] ?? `Detail ${i + 1}`;

              return (
                <motion.div
                  key={img}
                  variants={fadeUp}
                  className={`group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-2.5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-2xl hover:shadow-emerald-900/10 ${
                    isHero ? "col-span-2 row-span-2" : isWide ? "col-span-2" : "col-span-1"
                  }`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-emerald-100">
                    <Image
                      src={img}
                      alt={`${room.name} — ${label}`}
                      fill
                      priority={isHero}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-3.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-block truncate rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-900 shadow-sm">
                        {label}
                      </span>
                    </div>
                    <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-emerald-950/60 px-2.5 py-1 text-[10px] font-bold text-amber-200 backdrop-blur-md">
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
            className="relative mt-10 overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-5 shadow-sm"
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, #fbbf24, #10b981, #fbbf24)",
                backgroundSize: "200% auto",
              }}
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-gradient-to-br from-emerald-50 to-amber-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-700">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-black">Want the full experience?</p>
                  <p className="mt-0.5 text-xs text-neutral-600">
                    Download our detailed room brochure with floor plans &amp; specs
                  </p>
                </div>
              </div>
              <a
                href="#brochure"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-50 to-amber-50 px-6 py-3 text-xs font-bold text-emerald-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:from-emerald-100 hover:to-amber-100"
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
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Spec icons                                                         */
/* ------------------------------------------------------------------ */
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