"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { rooms } from "@/lib/rooms";

type Room = (typeof rooms)[number];

const GALLERY_LABELS = [
  "Living Space",
  "Bedroom View",
  "Bathroom",
  "Balcony",
  "Details",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

function useLightbox(length: number) {
  const [index, setIndex] = useState<number | null>(null);
  const open = (i: number) => setIndex(i);
  const close = () => setIndex(null);
  const next = () => setIndex((p) => (p === null ? null : (p + 1) % length));
  const prev = () => setIndex((p) => (p === null ? null : (p - 1 + length) % length));
  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [index]);
  return { index, open, close, next, prev };
}

export function RoomPageContent({ room }: { room: Room }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const { index, open, close, next, prev } = useLightbox(room.images.length);

  const ctaOpacity = useTransform(scrollY, [300, 600], [0, 1]);
  const ctaY = useTransform(scrollY, [300, 600], [16, 0]);
  const ctaPointer = useTransform(ctaOpacity, (v) => (v > 0.05 ? "auto" : "none"));

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex h-[90vh] min-h-[580px] w-full items-end overflow-hidden bg-emerald-950 sm:min-h-[640px]"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0">
            <Image
              src={room.images[0]}
              alt={room.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-950/20" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />

        <span aria-hidden className="pointer-events-none absolute bottom-4 right-6 select-none font-display text-[28vw] font-black uppercase leading-none tracking-tighter text-white/[0.04] sm:text-[22vw] lg:text-[16vw]">
          {room.slug}
        </span>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6"
        >
          <Link
            href="/#rooms"
            aria-label="Back to rooms"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-emerald-950/60 px-3 py-2 text-xs font-bold text-white/80 backdrop-blur-md transition-colors hover:border-gold-500/50 hover:text-gold-400"
          >
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-block rounded-full border border-emerald-500/50 bg-emerald-950/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400 backdrop-blur-sm">
                {room.category}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/50">
                {room.floor}
              </span>
            </div>

            <h1 className="font-display text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
              {room.name}
            </h1>

            <div className="h-[3px] w-16 rounded-full bg-gold-500" />

            <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              {room.size} &middot; {room.view}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px rounded-full bg-emerald-500/40"
          />
        </motion.div>
      </section>

      <div className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(55% 40% at 20% 10%, rgba(16,185,129,0.12) 0%, transparent 50%), radial-gradient(50% 40% at 80% 25%, rgba(251,191,36,0.08) 0%, transparent 50%)",
        }} />

        <div aria-hidden className="relative h-px w-full bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent" />

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="lg:col-span-3"
              >
                <motion.span
                  variants={fadeUp}
                  className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400"
                >
                  <span className="h-px w-6 bg-current" />
                  The Space
                </motion.span>
                <motion.p
                  variants={fadeUp}
                  className="text-base leading-[1.8] text-white/75 sm:text-lg"
                >
                  <span className="float-left mr-2 mt-1 font-display text-5xl font-black leading-none text-white">
                    {room.description.charAt(0)}
                  </span>
                  {room.description.slice(1)}
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-sm">
                  <span aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-500/20 blur-2xl" />
                  <h3 className="mb-5 font-display text-lg font-black text-white">
                    At a Glance
                  </h3>
                  <div className="flex flex-col gap-4">
                    <SpecRow icon="ruler" label="Size" value={room.size} />
                    <div className="h-px w-full bg-white/10" />
                    <SpecRow icon="mountain" label="View" value={room.view} />
                    <div className="h-px w-full bg-white/10" />
                    <SpecRow icon="layers" label="Floor" value={room.floor} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <span aria-hidden className="pointer-events-none absolute -right-6 top-4 select-none font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-white/[0.03]">
            Comfort
          </span>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="mb-10 flex flex-col gap-3"
            >
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 019 6c3 0 6 2 8 6 1.5 3 1 6-1 8-2 2-5 2-5 0z" />
                </svg>
                Appointments
              </span>
              <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                What&rsquo;s Inside
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              {room.facilities.map((facility) => (
                <motion.span
                  key={facility}
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5 text-sm font-medium text-white/85 backdrop-blur-sm transition-all duration-300"
                  whileHover={{ borderColor: "rgba(251,191,36,0.5)", backgroundColor: "rgba(251,191,36,0.1)", y: -2 }}
                >
                  <span className="shrink-0 text-emerald-400">
                    <FacilityIcon label={facility} />
                  </span>
                  {facility}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <span aria-hidden className="pointer-events-none absolute -left-8 top-6 select-none font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-white/[0.03]">
            Frames
          </span>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  Impressions
                </span>
                <h2 className="mt-1 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Visual <span className="text-emerald-400">Journey</span>
                </h2>
              </div>
              <span className="text-sm font-medium text-white/40">
                {room.images.length} photos
              </span>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="grid gap-4 sm:grid-cols-2 sm:gap-6"
            >
              {room.images.map((img, i) => {
                const isFirst = i === 0;
                const label = GALLERY_LABELS[i] ?? `Detail ${i + 1}`;
                return (
                  <motion.div
                    key={img}
                    variants={fadeUp}
                    onClick={() => open(i)}
                    className={`group relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                      isFirst ? "sm:col-span-2 sm:row-span-2" : "sm:col-span-1"
                    }`}
                    style={{ aspectRatio: isFirst ? "16/9" : "4/3" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#05966966")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  >
                    <Image
                      src={img}
                      alt={`${room.name} — ${label}`}
                      fill
                      priority={i < 2}
                      sizes={isFirst ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                      <span className="inline-block truncate rounded-full bg-emerald-500 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                        {label}
                      </span>
                    </div>
                    <div className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-emerald-950/60 px-2 py-1 text-[9px] font-bold text-emerald-400 backdrop-blur-md sm:right-3 sm:top-3">
                      {i + 1} / {room.images.length}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="relative border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto mb-6 h-px w-12 bg-emerald-500" />
              <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to <span className="text-emerald-400">Unwind</span>?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                Reserve your stay at The Himalayan Shire and experience the
                warmth of handpicked comfort amidst the mountains.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#book"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-emerald-950 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Book This Room</span>
                  <svg className="relative" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-500/30 bg-emerald-950/20 px-8 py-4 text-sm font-bold text-white/85 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:text-gold-400"
                >
                  Enquire
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <motion.div
        style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
        className="fixed inset-x-4 bottom-4 z-50 lg:hidden"
      >
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-emerald-950/95 p-2.5 pl-4 shadow-2xl backdrop-blur-xl">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white">{room.name}</p>
            <p className="text-[10px] font-semibold text-emerald-400">{room.category}</p>
          </div>
          <a
            href="#book"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gold-500 px-5 py-2.5 text-xs font-bold text-emerald-950"
          >
            Book Now
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Room image viewer"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              onClick={close}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:right-6 sm:top-6"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:left-6"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:right-6"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[60vh] w-full max-w-5xl sm:h-[75vh]"
            >
              <Image
                src={room.images[index]}
                alt={`${room.name} — ${GALLERY_LABELS[index] ?? "Detail"}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-emerald-500/20 bg-emerald-950/70 px-4 py-1.5 text-xs font-bold text-emerald-400 backdrop-blur-md">
                {index + 1} / {room.images.length} &mdash; {GALLERY_LABELS[index] ?? "Detail"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SpecRow({ icon, label, value }: { icon: "ruler" | "mountain" | "layers"; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
        <SpecIcon name={icon} />
      </span>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
          {label}
        </span>
        <span className="font-display text-sm font-black text-white">{value}</span>
      </div>
    </div>
  );
}

function SpecIcon({ name }: { name: "ruler" | "mountain" | "layers" }) {
  const common = {
    width: 14, height: 14, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 2,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "ruler":
      return (<svg {...common}><path d="M21.3 8.7L15.3 2.7a1 1 0 00-1.4 0L2.7 13.9a1 1 0 000 1.4l6 6a1 1 0 001.4 0L21.3 10.1a1 1 0 000-1.4z" /><path d="M7.5 10.5l2 2M11 7l2 2M14.5 3.5l2 2" /></svg>);
    case "mountain":
      return (<svg {...common}><path d="M3 20l6-10 4 6 3-4 5 8H3z" /></svg>);
    default:
      return (<svg {...common}><path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5M3 17l9 5 9-5" /></svg>);
  }
}

type FacilityIconType =
  "wifi" | "tv" | "snow" | "heat" | "water" | "bath" | "balcony"
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
  if (/fridge|refrigerator/.test(l)) return "fridge";
  if (/room service|service/.test(l)) return "bell";
  if (/bonfire|fireplace/.test(l)) return "fire";
  if (/\bbed\b|king|queen/.test(l)) return "bed";
  if (/desk|study|workspace/.test(l)) return "desk";
  if (/housekeeping/.test(l)) return "sparkle";
  if (/power|backup/.test(l)) return "bolt";
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
    width: 14, height: 14, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 2,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (type) {
    case "wifi": return (<svg {...common}><path d="M5 12.55a11 11 0 0114 0" /><path d="M8.5 16.05a6 6 0 017 0" /><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" /></svg>);
    case "tv": return (<svg {...common}><rect x="2" y="7" width="20" height="13" rx="2" /><polyline points="17 2 12 7 7 2" /></svg>);
    case "snow": return (<svg {...common}><line x1="12" y1="2" x2="12" y2="22" /><line x1="4" y1="7" x2="20" y2="17" /><line x1="20" y1="7" x2="4" y2="17" /></svg>);
    case "heat": return (<svg {...common}><rect x="4" y="4" width="16" height="16" rx="2" /><line x1="8" y1="4" x2="8" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /><line x1="16" y1="4" x2="16" y2="20" /></svg>);
    case "water": return (<svg {...common}><path d="M12 2s7 8.5 7 13a7 7 0 11-14 0c0-4.5 7-13 7-13z" /></svg>);
    case "bath": return (<svg {...common}><path d="M4 12h16" /><path d="M6 12V6a6 6 0 0112 0v6" /><line x1="8" y1="16" x2="8" y2="16.01" /><line x1="12" y1="18" x2="12" y2="18.01" /><line x1="16" y1="16" x2="16" y2="16.01" /></svg>);
    case "balcony": return (<svg {...common}><rect x="4" y="3" width="16" height="18" rx="1" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="4" y1="12" x2="20" y2="12" /></svg>);
    case "mountain": return (<svg {...common}><path d="M3 20l6-10 4 6 3-4 5 8H3z" /></svg>);
    case "coffee": return (<svg {...common}><path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>);
    case "parking": return (<svg {...common}><circle cx="12" cy="12" r="10" /><path d="M9 8h3a2.5 2.5 0 010 5H9V8zm0 5v4" /></svg>);
    case "wardrobe": return (<svg {...common}><rect x="4" y="2" width="16" height="20" rx="1" /><line x1="12" y1="2" x2="12" y2="22" /><circle cx="9" cy="12" r="0.6" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="0.6" fill="currentColor" stroke="none" /></svg>);
    case "safe": return (<svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="9" x2="12" y2="7" /></svg>);
    case "fridge": return (<svg {...common}><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="5" y1="10" x2="19" y2="10" /><line x1="9" y1="5" x2="9" y2="7" /><line x1="9" y1="13" x2="9" y2="15" /></svg>);
    case "bell": return (<svg {...common}><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>);
    case "fire": return (<svg {...common} fill="currentColor" stroke="none"><path d="M12 2s6 6.5 6 11.5A6 6 0 0112 20a6 6 0 01-6-6.5C6 8.5 12 2 12 2z" /></svg>);
    case "bed": return (<svg {...common}><path d="M2 4v16" /><path d="M2 8h18a2 2 0 012 2v10" /><path d="M2 17h20" /><path d="M6 8V6a2 2 0 012-2h3a2 2 0 012 2v2" /></svg>);
    case "desk": return (<svg {...common}><rect x="3" y="11" width="18" height="2" /><line x1="6" y1="13" x2="6" y2="20" /><line x1="18" y1="13" x2="18" y2="20" /><line x1="6" y1="6" x2="18" y2="6" /></svg>);
    case "sparkle": return (<svg {...common} fill="currentColor" stroke="none"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M19 15l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6.6-1.9z" /></svg>);
    case "bolt": return (<svg {...common} fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>);
    case "paw": return (<svg {...common} fill="currentColor" stroke="none"><circle cx="7" cy="7" r="1.6" /><circle cx="12" cy="5" r="1.6" /><circle cx="17" cy="7" r="1.6" /><path d="M6 14c0-2.5 2.5-4 6-4s6 1.5 6 4-2 5-6 5-6-2.5-6-5z" /></svg>);
    case "ban": return (<svg {...common}><circle cx="12" cy="12" r="10" /><line x1="4.9" y1="4.9" x2="19.1" y2="19.1" /></svg>);
    case "game": return (<svg {...common}><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="8" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="8" cy="16" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" /></svg>);
    case "book": return (<svg {...common}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>);
    case "leaf": return (<svg {...common}><path d="M11 20A7 7 0 019 6c3 0 6 2 8 6 1.5 3 1 6-1 8-2 2-5 2-5 0z" /><path d="M9 6c0 6 2 10 6 14" /></svg>);
    default: return (<svg {...common}><path d="M20 6L9 17l-5-5" /></svg>);
  }
}
