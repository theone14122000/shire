"use client";

import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Bath, Layers, Maximize2, Mountain, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { rooms } from "@/lib/rooms";
import { ResponsiveVideoEmbed } from "./ResponsiveVideoEmbed";

type Room = (typeof rooms)[number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const GALLERY_LABELS = ["Living Space", "Bedroom View", "Bathroom", "Balcony", "Details"];

export function RoomPageContent({
  room,
  images: managedImages,
}: {
  room: Room;
  images: string[];
}) {
  const images = managedImages.length > 0 ? managedImages : room.images;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  const prev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));

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
  }, [lightboxIndex]);

  return (
    <>
      <section ref={heroRef} className="relative flex min-h-[82vh] items-end overflow-hidden bg-emerald-950">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src={images[0]}
            alt={room.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/50 to-emerald-950/10" />

        <Link
          href="/#rooms"
          className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 border border-cream-100/20 bg-emerald-950/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cream-50 backdrop-blur transition-colors hover:text-gold-300 sm:left-8 sm:top-8"
        >
          <ArrowLeft size={14} strokeWidth={1.8} />
          Rooms
        </Link>

        <div className="relative z-10 w-full px-5 pb-14 sm:px-8 sm:pb-20 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[1400px]"
          >
            <span className="luxe-kicker text-gold-300">{room.category}</span>
            <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.95] text-cream-50 sm:text-7xl lg:text-8xl">
              {room.name}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.85] text-cream-100/70 sm:text-lg">
              {room.size} / {room.view} / {room.floor}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="editorial-surface">
        <section className="bg-[#EAF1E1] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
            >
              <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
                The Space
              </motion.span>
              <motion.p variants={fadeUp} className="mt-7 max-w-[72ch] font-display text-2xl font-semibold leading-[1.42] text-emerald-950 sm:text-3xl">
                {room.description}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 grid grid-cols-1 overflow-hidden rounded-3xl border border-emerald-900/10 bg-white/70 shadow-[0_18px_50px_rgba(3,45,32,0.08)] sm:grid-cols-2 lg:grid-cols-4"
            >
              <StatCell icon={Maximize2} label="Size" value={room.size} />
              <StatCell icon={Layers} label="Floor" value={room.floor} />
              <StatCell icon={Mountain} label="View" value={room.view} />
              <div className="flex items-center justify-center px-6 py-8 lg:border-l lg:border-emerald-900/10">
                <Link
                  href="https://letsbook.me/booking/thehimalayanshire?checkin=2026-08-04&checkout=2026-08-05&adults=2&children=0"
                  className="luxe-button w-full whitespace-nowrap lg:w-auto"
                >
                  Book This Room
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div>
                <span className="luxe-kicker text-gold-700">Details</span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
                  What is inside.
                </h2>
              </div>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                className="grid gap-x-8 gap-y-5 sm:grid-cols-2"
              >
                {room.facilities.map((facility) => (
                  <motion.div key={facility} variants={fadeUp} className="flex gap-4 border-t border-emerald-900/15 pt-5">
                    <Bath className="mt-1 shrink-0 text-gold-700" size={17} strokeWidth={1.6} />
                    <p className="text-lg font-bold leading-[1.65] text-emerald-950/70">{facility}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#EAF1E1] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="luxe-kicker text-gold-700">Room Tour</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
                See it for yourself.
              </h2>
              <p className="mt-6 max-w-md text-base leading-[1.85] text-emerald-950/65">
                Take a slow walk through {room.name} in this short video tour shot at the property.
              </p>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="flex w-full justify-center lg:justify-end"
            >
              <motion.div variants={fadeUp} className="flex w-full justify-center lg:justify-end">
                <ResponsiveVideoEmbed
                  videoId={room.tourVideoId}
                  title={`${room.name} room tour`}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="luxe-kicker text-gold-700">Gallery</span>
                <h2 className="mt-5 font-display text-4xl font-semibold text-parchment sm:text-5xl">
                  Room impressions.
                </h2>
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-parchment/45">
                {images.length} photos
              </p>
            </div>

            <div className="grid auto-rows-[230px] gap-4 sm:auto-rows-[290px] lg:grid-cols-6 lg:auto-rows-[180px]">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative overflow-hidden text-left ${index === 0 ? "lg:col-span-4 lg:row-span-3" : index === 1 ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-2 lg:row-span-1"}`}
                >
                  <Image
                    src={image}
                    alt={`${room.name} - ${GALLERY_LABELS[index] ?? "Detail"}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/72 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-5 left-5 translate-y-3 bg-emerald-950/72 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cream-50 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {GALLERY_LABELS[index] ?? "Detail"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl">
              {room.name}, ready when you are.
            </h2>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="https://letsbook.me/booking/thehimalayanshire?checkin=2026-08-04&checkout=2026-08-05&adults=2&children=0" className="luxe-button">
                Book This Room
              </Link>
              <Link href="/contact" className="luxe-button luxe-button-dark">
                Enquire
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Room image viewer"
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
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[68vh] w-full max-w-6xl sm:h-[80vh]"
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${room.name} - ${GALLERY_LABELS[lightboxIndex] ?? "Detail"}`}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function StatCell({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Maximize2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-8 text-center">
      <Icon className="shrink-0 text-gold-600" size={18} strokeWidth={1.6} />
      <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-900/50">
        {label}
      </dt>
      <dd className="font-display text-xl font-semibold text-emerald-950">{value}</dd>
    </div>
  );
}
