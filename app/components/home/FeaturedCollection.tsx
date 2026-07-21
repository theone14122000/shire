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
          className="relative mb-14 flex flex-col items-center text-center lg:mb-16"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-leaf/30 bg-accent-leaf/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.32em] text-ink-700">
              <Sparkles size={12} strokeWidth={2.4} className="text-emerald-600" aria-hidden />
              Accommodations
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.04] tracking-[-0.025em] text-ink-900 sm:text-5xl md:text-6xl lg:text-[3.6rem]"
          >
            Rooms Named After Nature
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="body-lg mt-6 max-w-[65ch] leading-relaxed text-ink-500"
          >
            We have lovingly and thoughtfully prepared our seven rooms, each with
            its own uniqueness. In spirit of our vision to bring people closer to
            nature, we have chosen to name our rooms after the tree species that
            surround our property and shape the forest cover of Himachal.
          </motion.p>

          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-[3px] w-28 origin-center rounded-full bg-gradient-to-r from-amber-400 to-emerald-600"
          />
        </motion.div>

        {/* Bento grid — first room featured, spans 2 cols/rows on large screens */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:auto-rows-[20rem] lg:grid-cols-4 lg:gap-7"
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
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "aspect-[4/3] h-full lg:aspect-auto" : "aspect-[4/3] lg:h-full lg:aspect-auto"
        }`}
      >
        <div className="absolute inset-0 scale-[1.02] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.1]">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        {/* Base scrim for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/15 to-transparent" />
        {/* Hover scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top row — category + featured badge */}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-900/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-beige-100 backdrop-blur-md">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_6px_1px_rgba(251,191,36,0.6)]" />
            {room.category}
          </span>

          {featured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-beige-100 shadow-[0_6px_20px_-4px_rgba(16,185,129,0.65)]">
              <Sparkles size={11} strokeWidth={2.5} aria-hidden />
              Featured
            </span>
          ) : null}
        </div>

        {/* Name + stats, grouped together at the base */}
        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3">
          <h3
            className={`font-display font-bold leading-tight text-beige-50 ${
              featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            {room.name}
          </h3>

          <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl">
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
      </div>
    </Link>
  );
}