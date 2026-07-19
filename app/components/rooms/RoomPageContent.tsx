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
  // Second orb drifts the opposite way for parallax richness
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
        {/* Layer 1 — the room photo, dual parallax (translate + scale) */}
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

        {/* Layer 2 — animated emerald→amber duotone wash */}
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

        {/* Layer 3 — drifting emerald glow */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="pointer-events-none absolute right-1/4 top-1/4 h-[24rem] w-[24rem] rounded-full bg-emerald-400/20 blur-[120px] mix-blend-screen"
          aria-hidden
        />
        {/* Layer 4 — counter-drifting amber glow */}
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="pointer-events-none absolute bottom-1/4 left-1/4 h-[22rem] w-[22rem] rounded-full bg-amber-300/20 blur-[110px] mix-blend-screen"
          aria-hidden
        />

        {/* Layer 5 — animated fine grid texture */}
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

        {/* Overlapping GHOST title — huge, behind headline, parallax drift */}
        <motion.span
          aria-hidden
          style={{ y: ghostTitleY, x: ghostTitleX }}
          className="pointer-events-none absolute -bottom-4 left-0 z-[5] select-none whitespace-nowrap font-display text-[26vw] font-black uppercase leading-none tracking-tighter text-white/[0.06] sm:text-[22vw] lg:text-[18vw]"
        >
          {room.category}
        </motion.span>

        {/* Vignette + gradient for text legibility (emerald-tinted) — blends INTO the emerald canvas below */}
        <div
          className="absolute inset-0 z-[6] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #052e23 0%, rgba(5,46,35,0.55) 42%, rgba(4,22,18,0.12) 66%, rgba(4,22,18,0.4) 100%)",
          }}
          aria-hidden
        />

        {/* Urgency pill — floating glass badge, top */}
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

        {/* Back link */}
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

        {/* Centerpiece content */}
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
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-gradient-to-r from-emerald-500/20 to-amber-400/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {room.category}
              </span>
            </motion.div>

            {/* Kinetic word-by-word title with gradient-highlighted last word */}
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
                {/* shine sweep */}
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
      </section>

      {/* ================================================================= */}
      {/* PREMIUM EMERALD CANVAS — wraps everything below the hero image     */}
      {/* ================================================================= */}
      <div className="relative isolate overflow-hidden bg-[#052e23] text-white">
        {/* Ambient radial glows that give the emerald depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 45% at 15% 0%, rgba(16,185,129,0.22) 0%, transparent 60%), radial-gradient(55% 45% at 95% 20%, rgba(251,191,36,0.12) 0%, transparent 55%), radial-gradient(80% 60% at 50% 100%, rgba(4,120,87,0.25) 0%, transparent 65%)",
          }}
        />
        {/* Fine noise/grain for a tactile premium finish */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Hairline gold divider bridging hero → canvas */}
        <motion.div
          aria-hidden
          className="relative z-10 h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, #fbbf24aa, #10b981aa, transparent)",
            backgroundSize: "200% auto",
          }}
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          {/* ======================== */}
          {/* SPECS STRIP — glass stat cards on emerald               */}
          {/* ======================== */}
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
                    className="group relative flex flex-col items-center gap-1.5 px-2 py-7 text-center transition-colors duration-300 hover:bg-white/5 sm:gap-2 sm:py-9"
                  >
                    {/* hover accent bar */}
                    <span className="absolute inset-x-0 bottom-0 mx-auto h-[3px] w-0 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-500 group-hover:w-2/3" />
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-emerald-800/40 text-amber-300 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-11 sm:w-11">
                      <SpecIcon name={spec.icon} />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200/70 sm:text-[11px]">
                      {spec.label}
                    </span>
                    <span className="font-display text-sm font-black text-white sm:text-base">
                      {spec.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ======================================= */}
          {/* FACILITIES — premium glass cards                     */}
          {/* ======================================= */}
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
                className="mb-10 flex flex-col gap-3 border-l-4 border-amber-400 pl-5 sm:mb-14"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">
                  Room Highlights
                </span>
                <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Amenities &amp;{" "}
                  <span className="bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent">
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
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-emerald-950/40"
                  >
                    <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-emerald-800/40 text-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-sm font-bold text-white/90">{facility}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ================================== */}
          {/* GALLERY                                              */}
          {/* ================================== */}
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
                <div className="border-l-4 border-amber-400 pl-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">
                    {room.images.length} Photos
                  </span>
                  <h2 className="mt-1 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Visual Tour{" "}
                    <span className="bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent">
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
                      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-2.5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-300/40 hover:shadow-2xl hover:shadow-emerald-950/50 ${
                        isHero ? "col-span-2 row-span-2" : isWide ? "col-span-2" : "col-span-1"
                      }`}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-emerald-900/40">
                        <Image
                          src={img}
                          alt={`${room.name} — ${label}`}
                          fill
                          priority={isHero}
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

              {/* Gallery Footer CTA — premium dark glass card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-emerald-950/40 backdrop-blur-md"
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-emerald-800/40">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-300">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Want the full experience?</p>
                      <p className="mt-0.5 text-xs text-emerald-100/70">
                        Download our detailed room brochure with floor plans &amp; specs
                      </p>
                    </div>
                  </div>
                  <a
                    href="#brochure"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-xs font-bold text-ink-900 shadow-[0_8px_24px_rgba(251,191,36,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
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