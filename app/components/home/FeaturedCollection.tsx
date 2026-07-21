// components/sections/FeaturedCollection.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Maximize2, Mountain, ArrowUpRight, Sparkles, Crown, Star } from "lucide-react";
import { Container } from "../ui/Container";
import { rooms } from "@/lib/rooms";
import { stagger, fadeUp } from "../ui/Motion";

type Room = (typeof rooms)[number];
type RoomTier = "premium" | "deluxe" | "standard" | "other";

function getRoomTier(category: string): RoomTier {
  const value = category.toLowerCase();
  if (value.includes("premium")) return "premium";
  if (value.includes("deluxe")) return "deluxe";
  if (value.includes("standard")) return "standard";
  return "other";
}

const grouped = rooms.reduce<Record<RoomTier, Room[]>>(
  (acc, room) => {
    acc[getRoomTier(room.category)].push(room);
    return acc;
  },
  { premium: [], deluxe: [], standard: [], other: [] }
);

const orderedGroups = (["premium", "deluxe", "standard", "other"] as RoomTier[])
  .map((tier) => ({ tier, rooms: grouped[tier] }))
  .filter((group) => group.rooms.length > 0);

const tierMeta: Record<
  RoomTier,
  {
    title: string;
    jumpLabel: string;
    sectionClass: string;
    sectionGlow: string;
    navClass: string;
    badgeClass: string;
    dotClass: string;
    ringClass: string;
    topLineClass: string;
    panelClass: string;
    cardClass: string;
    arrowClass: string;
    iconClass: string;
    icon: typeof Crown;
  }
> = {
  premium: {
    title: "Premium Rooms",
    jumpLabel: "Premium",
    sectionClass: "border-amber-200/30 bg-white/80 shadow-[0_20px_60px_-20px_rgba(245,158,11,0.15)]",
    sectionGlow: "bg-gradient-to-r from-amber-100/60 via-transparent to-emerald-100/30",
    navClass: "border-amber-200/40 bg-amber-50/80 text-amber-900 hover:border-amber-300/60 hover:bg-amber-50",
    badgeClass: "border-amber-200/30 bg-black/60 text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)]",
    dotClass: "bg-amber-400 shadow-[0_0_8px_1px_rgba(251,191,36,0.6)]",
    ringClass: "ring-amber-200/30",
    topLineClass: "via-amber-300/80",
    panelClass: "border-white/10 bg-black/60 backdrop-blur-xl",
    cardClass: "border-white/20 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.2)] hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.3)]",
    arrowClass: "bg-amber-400/20 text-amber-100 group-hover:bg-amber-400 group-hover:text-black",
    iconClass: "border-amber-200/30 bg-black/40 text-amber-200",
    icon: Crown,
  },
  deluxe: {
    title: "Deluxe Rooms",
    jumpLabel: "Deluxe",
    sectionClass: "border-emerald-200/25 bg-white/70 shadow-[0_20px_60px_-20px_rgba(6,95,70,0.1)]",
    sectionGlow: "bg-gradient-to-r from-emerald-100/50 via-transparent to-transparent",
    navClass: "border-emerald-200/40 bg-white/80 text-emerald-900 hover:border-emerald-300/60 hover:bg-white",
    badgeClass: "border-white/15 bg-black/60 text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)]",
    dotClass: "bg-emerald-300 shadow-[0_0_8px_1px_rgba(110,231,183,0.4)]",
    ringClass: "ring-emerald-200/20",
    topLineClass: "via-emerald-300/60",
    panelClass: "border-white/10 bg-black/60 backdrop-blur-xl",
    cardClass: "border-white/15 shadow-[0_10px_30px_-10px_rgba(6,95,70,0.15)] hover:shadow-[0_20px_40px_-10px_rgba(6,95,70,0.25)]",
    arrowClass: "bg-emerald-300/20 text-emerald-100 group-hover:bg-emerald-300 group-hover:text-black",
    iconClass: "border-white/15 bg-black/40 text-emerald-200",
    icon: Star,
  },
  standard: {
    title: "Standard Rooms",
    jumpLabel: "Standard",
    sectionClass: "border-ink-900/5 bg-white/60 shadow-[var(--shadow-soft)]",
    sectionGlow: "bg-gradient-to-r from-white/40 via-transparent to-transparent",
    navClass: "border-black/10 bg-white/80 text-ink-700 hover:border-ink-900/15 hover:bg-white",
    badgeClass: "border-white/15 bg-black/60 text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)]",
    dotClass: "bg-stone-300",
    ringClass: "ring-white/10",
    topLineClass: "via-white/40",
    panelClass: "border-white/10 bg-black/60 backdrop-blur-xl",
    cardClass: "border-black/5 shadow-[var(--shadow-soft)] hover:shadow-[0_15px_30px_-10px_rgba(15,23,42,0.15)]",
    arrowClass: "bg-white/20 text-white group-hover:bg-white group-hover:text-black",
    iconClass: "border-white/10 bg-black/40 text-stone-200",
    icon: Star,
  },
  other: {
    title: "More Rooms",
    jumpLabel: "More",
    sectionClass: "border-ink-900/5 bg-white/60 shadow-[var(--shadow-soft)]",
    sectionGlow: "bg-gradient-to-r from-white/40 via-transparent to-transparent",
    navClass: "border-black/10 bg-white/80 text-ink-700 hover:border-ink-900/15 hover:bg-white",
    badgeClass: "border-white/15 bg-black/60 text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)]",
    dotClass: "bg-stone-300",
    ringClass: "ring-white/10",
    topLineClass: "via-white/40",
    panelClass: "border-white/10 bg-black/60 backdrop-blur-xl",
    cardClass: "border-black/5 shadow-[var(--shadow-soft)] hover:shadow-[0_15px_30px_-10px_rgba(15,23,42,0.15)]",
    arrowClass: "bg-white/20 text-white group-hover:bg-white group-hover:text-black",
    iconClass: "border-white/10 bg-black/40 text-stone-200",
    icon: Star,
  },
};

export function FeaturedCollection() {
  return (
    <section id="rooms" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Ghost watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-10 select-none font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-ink-900/[0.025]"
      >
        Rooms
      </span>

      {/* Ambient glow */}
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
          className="relative mb-12 flex flex-col items-center text-center lg:mb-14"
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

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {orderedGroups.map(({ tier, rooms }) => {
              const meta = tierMeta[tier];
              const Icon = meta.icon;
              return (
                <a
                  key={tier}
                  href={`#${tier}-rooms`}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${meta.navClass}`}
                >
                  <Icon size={14} strokeWidth={2} />
                  <span>{meta.jumpLabel}</span>
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px]">
                    {rooms.length}
                  </span>
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        <div className="space-y-10 sm:space-y-12 lg:space-y-14">
          {orderedGroups.map((group, groupIndex) => (
            <CategorySection
              key={group.tier}
              tier={group.tier}
              rooms={group.rooms}
              groupIndex={groupIndex}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategorySection({
  tier,
  rooms,
  groupIndex,
}: {
  tier: RoomTier;
  rooms: Room[];
  groupIndex: number;
}) {
  const meta = tierMeta[tier];
  const Icon = meta.icon;

  return (
    <motion.section
      id={`${tier}-rooms`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className={`scroll-mt-28 relative overflow-hidden rounded-[2rem] border p-5 sm:p-6 lg:p-8 ${meta.sectionClass}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-60 ${meta.sectionGlow}`}
      />

      <div className="relative mb-8 flex flex-col gap-4 border-b border-ink-900/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-600">
            <span
              className={`h-2 w-2 rounded-full ${
                tier === "premium"
                  ? "bg-amber-400"
                  : tier === "deluxe"
                  ? "bg-emerald-400"
                  : "bg-ink-400"
              }`}
            />
            {meta.title}
          </span>

          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            {meta.title}
          </h3>
        </div>

        <p className="text-sm font-medium text-ink-500">
          {rooms.length} {rooms.length === 1 ? "room" : "rooms"} available
        </p>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {rooms.map((room, index) => (
          <motion.div key={room.id} variants={fadeUp}>
            <RoomTile
              room={room}
              tier={tier}
              priority={groupIndex === 0 && index === 0}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

function RoomTile({
  room,
  tier,
  priority,
}: {
  room: Room;
  tier: RoomTier;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const meta = tierMeta[tier];
  const isPremium = tier === "premium";
  const isDeluxe = tier === "deluxe";

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className={`group relative block overflow-hidden rounded-[1.5rem] border transition-all duration-500 hover:-translate-y-1.5 ${meta.cardClass}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {/* Image with Zoom */}
        <div className="absolute inset-0 scale-[1.02] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Strong Overlays for Readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
        
        {/* Hover Darken */}
        <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Premium Shimmer Effect */}
        {isPremium && !reduceMotion && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
            <motion.div
              aria-hidden
              className="absolute top-0 h-full w-[40%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md"
              animate={{ left: ["-50%", "150%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "linear",
              }}
            />
          </div>
        )}

        {/* Deluxe Subtle Hover Sheen */}
        {isDeluxe && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-1/2 top-0 h-full w-[30%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 blur-md transition-all duration-1000 group-hover:translate-x-[300%] group-hover:opacity-100" />
          </div>
        )}

        {/* Ring & Top Line */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ${meta.ringClass}`}
        />
        <div
          className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent ${meta.topLineClass} to-transparent`}
        />

        {/* Top Badges */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3 z-20">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur-md ${meta.badgeClass}`}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dotClass}`} />
            {room.category}
          </span>

          {(isPremium || isDeluxe) && (
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md ${meta.iconClass}`}
            >
              <Sparkles size={12} strokeWidth={2.3} aria-hidden />
            </span>
          )}
        </div>

        {/* Bottom Content Panel - High Contrast */}
        <div className="absolute inset-x-3 bottom-3 z-20">
          <div
            className={`rounded-[1.25rem] border p-4 backdrop-blur-xl ${meta.panelClass}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold leading-tight text-white sm:text-xl drop-shadow-md">
                  {room.name}
                </h3>
              </div>

              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 ${meta.arrowClass}`}
              >
                <ArrowUpRight size={14} strokeWidth={2.6} />
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold text-white/90 sm:text-xs">
              {room.size ? (
                <span className="flex items-center gap-1.5">
                  <Maximize2 size={12} strokeWidth={2.2} className="text-emerald-300" />
                  {room.size}
                </span>
              ) : null}

              {room.size && room.view ? (
                <span className="h-3 w-px bg-white/30" aria-hidden />
              ) : null}

              {room.view ? (
                <span className="flex items-center gap-1.5">
                  <Mountain size={12} strokeWidth={2.2} className="text-emerald-300" />
                  {room.view}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}