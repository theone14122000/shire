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
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-10 select-none font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-ink-900/[0.02]"
      >
        Rooms
      </div>

      <Container>
        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-14 max-w-3xl text-center lg:mb-20"
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-700"
          >
            <Sparkles size={12} strokeWidth={2.5} aria-hidden />
            Accommodations
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl"
          >
            Rooms Named After Nature
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg leading-relaxed text-ink-500 lg:text-xl"
          >
            Seven thoughtfully designed rooms, each named after the tree species
            that surround our property and define the forest cover of Himachal.
          </motion.p>

          <motion.div
            aria-hidden
            variants={fadeUp}
            className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-amber-400 to-emerald-500"
          />
        </motion.div>

        {/* Room Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[20rem] lg:gap-8"
        >
          {rooms.map((room, index) => {
            const isFeatured = index === 0;
            return (
              <motion.div
                key={room.id}
                variants={fadeUp}
                className={isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
              >
                <RoomTile room={room} featured={isFeatured} />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RoomTile                                                           */
/* ------------------------------------------------------------------ */
function RoomTile({
  room,
  featured,
}: {
  room: (typeof rooms)[number];
  featured: boolean;
}) {
  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink-900 shadow-lg transition-all duration-500 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden">
        {/* Aspect ratio varies by featured state */}
        <div
          className={`relative ${
            featured ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            priority={featured}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900/30 to-transparent" />
        </div>

        {/* Category Badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {room.category}
          </span>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
              <Sparkles size={11} strokeWidth={2.5} />
              Featured
            </span>
          </div>
        )}

        {/* Room Name */}
        <div className="absolute bottom-20 left-5 right-5">
          <h3
            className={`font-display font-bold leading-tight text-white ${
              featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
            }`}
          >
            {room.name}
          </h3>
        </div>

        {/* Stats Bar */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3 text-xs font-semibold text-white/80">
            <span className="flex items-center gap-1.5">
              <Maximize2 size={12} strokeWidth={2} className="text-emerald-300" />
              {room.size}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Mountain size={12} strokeWidth={2} className="text-emerald-300" />
              {room.view}
            </span>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-amber-400 group-hover:text-ink-900">
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}