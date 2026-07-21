// components/sections/FeaturedCollection.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Maximize2, Mountain, ArrowUpRight, Sparkles } from "lucide-react";
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

export function FeaturedCollection() {
  return (
    <section id="rooms" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-10 select-none font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-ink-900/[0.025]"
      >
        Rooms
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-emerald-300/15 blur-[130px]"
      />

      <Container>
        {/* Header */}
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
            className="mt-6 max-w-[65ch] text-base leading-relaxed text-ink-500 sm:text-lg"
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

          {/* Quick nav pills */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {orderedGroups.map(({ tier, rooms: groupRooms }) => (
              <a
                key={tier}
                href={`#${tier}-rooms`}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  tier === "premium"
                    ? "border-amber-200/40 bg-amber-50/70 text-amber-900 hover:border-amber-300/60 hover:bg-amber-50"
                    : tier === "deluxe"
                    ? "border-emerald-200/40 bg-white/75 text-emerald-900 hover:border-emerald-300/60 hover:bg-white"
                    : "border-black/10 bg-white/80 text-ink-700 hover:border-ink-900/15 hover:bg-white"
                }`}
              >
                <span className="capitalize">{tier}</span>
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px]">
                  {groupRooms.length}
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Category sections */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
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

      {/* Shimmer keyframes */}
      <style jsx global>{`
        @keyframes premium-shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(350%) skewX(-20deg); }
        }
        @keyframes premium-border-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

/* ================================================================== */
/*  CategorySection                                                     */
/* ================================================================== */
function CategorySection({
  tier,
  rooms: groupRooms,
  groupIndex,
}: {
  tier: RoomTier;
  rooms: Room[];
  groupIndex: number;
}) {
  const sectionBg =
    tier === "premium"
      ? "border-amber-200/35 bg-white/70 shadow-[0_28px_80px_-42px_rgba(245,158,11,0.32)]"
      : tier === "deluxe"
      ? "border-emerald-200/30 bg-white/60 shadow-[0_24px_70px_-40px_rgba(6,95,70,0.18)]"
      : "border-ink-900/8 bg-white/55 shadow-[var(--shadow-soft)]";

  const dotColor =
    tier === "premium" ? "bg-amber-400" : tier === "deluxe" ? "bg-emerald-400" : "bg-ink-400";

  return (
    <motion.section
      id={`${tier}-rooms`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className={`scroll-mt-28 relative overflow-hidden rounded-[2rem] border p-5 sm:p-6 lg:p-7 ${sectionBg}`}
    >
      {/* Section header */}
      <div className="relative mb-6 flex flex-col gap-4 border-b border-ink-900/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-600">
            <span className={`h-2 w-2 rounded-full ${dotColor}`} />
            {tier} Rooms
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            {tier.charAt(0).toUpperCase() + tier.slice(1)} Rooms
          </h3>
        </div>
        <p className="text-sm font-medium text-ink-500">
          {groupRooms.length} {groupRooms.length === 1 ? "room" : "rooms"}
        </p>
      </div>

      {/* Cards grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        {groupRooms.map((room, index) => (
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

/* ================================================================== */
/*  RoomTile — readable text, white badges, premium shimmer             */
/* ================================================================== */
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
  const isPremium = tier === "premium";
  const isDeluxe = tier === "deluxe";

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className={`group relative block overflow-hidden rounded-[1.5rem] border transition-all duration-500 hover:-translate-y-1 ${
        isPremium
          ? "border-amber-300/30 shadow-[0_24px_70px_-28px_rgba(245,158,11,0.35)] hover:shadow-[0_32px_90px_-28px_rgba(245,158,11,0.45)]"
          : isDeluxe
          ? "border-emerald-200/20 shadow-[0_20px_60px_-28px_rgba(6,95,70,0.25)] hover:shadow-[0_28px_75px_-28px_rgba(6,95,70,0.35)]"
          : "border-black/5 shadow-[var(--shadow-soft)] hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.2)]"
      }`}
    >
      {/* Premium animated border glow */}
      {isPremium && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[1.5px] z-20 rounded-[1.6rem]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(251,191,36,0.6) 20%, rgba(16,185,129,0.5) 40%, rgba(251,191,36,0.6) 60%, transparent 80%)",
            animation: "premium-border-glow 3s ease-in-out infinite",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1.5px",
          }}
        />
      )}

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {/* Image */}
        <div className="absolute inset-0 scale-[1.01] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Dark gradient — strong enough for white text readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Premium shimmer sweep */}
        {isPremium && !reduceMotion && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              aria-hidden
              className="absolute top-0 h-full w-[35%] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-md"
              style={{ animation: "premium-shimmer 3.5s ease-in-out infinite" }}
            />
          </div>
        )}

        {/* Deluxe hover sheen */}
        {isDeluxe && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-1/2 top-0 h-full w-[30%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 blur-lg transition-all duration-1000 group-hover:translate-x-[340%] group-hover:opacity-100" />
          </div>
        )}

        {/* Ring */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ${
            isPremium ? "ring-amber-200/30" : isDeluxe ? "ring-emerald-200/15" : "ring-white/10"
          }`}
        />

        {/* ── Top badges ── */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {/* Category badge — always white text on dark bg */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md ${
              isPremium
                ? "bg-amber-600/80 shadow-[0_4px_16px_-4px_rgba(245,158,11,0.5)]"
                : isDeluxe
                ? "bg-emerald-700/75"
                : "bg-black/60"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                isPremium
                  ? "bg-amber-300 shadow-[0_0_8px_1px_rgba(251,191,36,0.6)]"
                  : isDeluxe
                  ? "bg-emerald-300"
                  : "bg-white/70"
              }`}
            />
            {room.category}
          </span>

          {/* Sparkle icon for premium/deluxe */}
          {(isPremium || isDeluxe) && (
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md ${
                isPremium
                  ? "bg-amber-500/70 text-white shadow-[0_4px_16px_-4px_rgba(245,158,11,0.5)]"
                  : "bg-emerald-600/60 text-white"
              }`}
            >
              <Sparkles size={12} strokeWidth={2.4} aria-hidden />
            </span>
          )}
        </div>

        {/* ── Bottom content panel ── */}
        <div className="absolute inset-x-3 bottom-3">
          <div
            className={`rounded-xl border p-3.5 backdrop-blur-xl ${
              isPremium
                ? "border-amber-300/20 bg-black/65"
                : isDeluxe
                ? "border-white/10 bg-black/60"
                : "border-white/8 bg-black/55"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-bold leading-tight text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] sm:text-xl">
                {room.name}
              </h3>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 ${
                  isPremium
                    ? "bg-amber-400 text-black"
                    : isDeluxe
                    ? "bg-emerald-400/20 text-white group-hover:bg-emerald-400 group-hover:text-black"
                    : "bg-white/15 text-white group-hover:bg-white group-hover:text-black"
                }`}
              >
                <ArrowUpRight size={13} strokeWidth={2.6} />
              </span>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-semibold text-white/85 sm:text-xs">
              {room.size && (
                <span className="flex items-center gap-1.5">
                  <Maximize2 size={12} strokeWidth={2.2} className="text-emerald-300" />
                  <span className="text-white/90">{room.size}</span>
                </span>
              )}
              {room.size && room.view && (
                <span className="h-3 w-px bg-white/25" aria-hidden />
              )}
              {room.view && (
                <span className="flex items-center gap-1.5">
                  <Mountain size={12} strokeWidth={2.2} className="text-emerald-300" />
                  <span className="text-white/90">{room.view}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}