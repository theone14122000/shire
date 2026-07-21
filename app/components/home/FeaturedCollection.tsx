// components/sections/FeaturedCollection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Maximize2, Mountain, ArrowUpRight, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { rooms } from "@/lib/rooms";
import { stagger, fadeUp } from "../ui/Motion";

export function FeaturedCollection() {
  return (
    // Removed section-accent to keep the default page background
    <section id="rooms" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Ghost watermark, consistent with other sections on the site */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-10 select-none font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-ink-900/[0.025]"
      >
        Rooms
      </span>

      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-emerald-300/15 blur-[130px]"
      />

      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="relative w-full mb-12 lg:mb-16"
        >
          {/* Top Badge - Aligned Left */}
          <motion.div variants={fadeUp} className="flex justify-start mb-6">
            <span className="inline-flex items-center gap-2 bg-accent-leaf/15 text-ink-700 text-[11px] uppercase tracking-[0.32em] font-bold px-4 py-2 rounded-full border border-accent-leaf/30">
              <Sparkles size={12} strokeWidth={2.4} className="text-emerald-600" aria-hidden />
              Accommodations
            </span>
          </motion.div>

          {/* Heading - Aligned Center */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.6rem] leading-[1.04] tracking-[-0.025em] text-ink-900 font-bold text-center max-w-4xl mx-auto"
          >
            Rooms Named After Nature
          </motion.h2>

          {/* Subtext - Aligned Center */}
          <motion.p
            variants={fadeUp}
            className="body-lg text-ink-500 max-w-[70ch] mx-auto mt-6 text-center leading-relaxed"
          >
            We have lovingly and thoughtfully prepared our seven rooms, each with
            its own uniqueness. In spirit of our vision to bring people closer to
            nature, make them more appreciative of its pure magnificence we have
            chosen to name our rooms after the different tree species that surround
            our property and also contribute to most of the forest cover in the
            state of Himachal.
          </motion.p>

          {/* Animated divider, matches other sections' accent bar */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 h-[3px] w-28 origin-center rounded-full bg-gradient-to-r from-amber-400 to-emerald-600"
          />
        </motion.div>

        {/* Bento grid — first room featured, spans 2 cols/rows on large screens */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[20rem] lg:gap-8"
        >
          {rooms.map((room, i) => {
            const isFeatured = i === 0;
            return (
              <motion.div
                key={room.id}
                variants={fadeUp}
                className={isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
              >
                <RoomTile room={room} featured={isFeatured} index={i} />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  RoomTile — editorial card with glass stat panel and magnetic CTA   */
/* ================================================================== */
function RoomTile({
  room,
  featured,
  index,
}: {
  room: (typeof rooms)[number];
  featured: boolean;
  index: number;
}) {
  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-18px_rgba(6,95,70,0.4)]"
    >
      {/* Image */}
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "h-full aspect-[4/3] lg:aspect-auto" : "aspect-[4/3] lg:h-full lg:aspect-auto"
        }`}
      >
        <div className="absolute inset-0 scale-[1.02] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        {/* Always-on base scrim for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent" />
        {/* Hover scrim, slightly warmer */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-900/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-beige-100 shadow-[0_4px_16px_rgba(0,0,0,0.25)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_6px_1px_rgba(251,191,36,0.6)]" />
            {room.category}
          </span>
        </div>

        {featured ? (
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-beige-100 shadow-[0_6px_20px_-4px_rgba(16,185,129,0.65)]">
              <Sparkles size={11} strokeWidth={2.5} aria-hidden />
              Featured
            </span>
          </div>
        ) : null}

        {/* Name set into the image */}
        <div className="absolute inset-x-0 bottom-16 px-5">
          <h3
            className={`font-display font-bold leading-tight text-beige-50 drop-shadow-sm ${
              featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            {room.name}
          </h3>
        </div>

        {/* Floating glass stat panel — overlaps the bottom edge */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3 text-xs font-semibold text-beige-100/90">
            <span className="flex items-center gap-1.5">
              <Maximize2 size={13} strokeWidth={2.2} className="text-emerald-300" />
              {room.size}
            </span>
            <span className="h-3 w-px bg-white/20" aria-hidden />
            <span className="flex items-center gap-1.5">
              <Mountain size={13} strokeWidth={2.2} className="text-emerald-300" />
              {room.view}
            </span>
          </div>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-beige-100/15 text-beige-50 transition-all duration-300 group-hover:rotate-45 group-hover:bg-amber-400 group-hover:text-ink-900">
            <ArrowUpRight size={14} strokeWidth={2.6} />
          </span>
        </div>
      </div>
    </Link>
  );
}