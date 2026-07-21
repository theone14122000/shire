// components/sections/FeaturedCollection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Maximize2, Mountain, ArrowUpRight, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { rooms } from "@/lib/rooms";
import { stagger, fadeUp } from "../ui/Motion";

type Room = (typeof rooms)[number];
type RoomTier = "premium" | "deluxe" | "standard" | "other";

const tierOrder: Record<RoomTier, number> = {
  premium: 0,
  deluxe: 1,
  standard: 2,
  other: 3,
};

function getRoomTier(category: string): RoomTier {
  const value = category.toLowerCase();

  if (value.includes("premium")) return "premium";
  if (value.includes("deluxe")) return "deluxe";
  if (value.includes("standard")) return "standard";

  return "other";
}

const originalOrder = new Map(rooms.map((room, index) => [room.id, index]));

const sortedRooms = [...rooms].sort((a, b) => {
  const tierDiff =
    tierOrder[getRoomTier(a.category)] - tierOrder[getRoomTier(b.category)];

  if (tierDiff !== 0) return tierDiff;

  return (originalOrder.get(a.id) ?? 0) - (originalOrder.get(b.id) ?? 0);
});

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

        {/* Uniform grid — ordered Premium -> Deluxe -> Standard */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {sortedRooms.map((room, index) => (
            <motion.div key={room.id} variants={fadeUp}>
              <RoomTile room={room} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function RoomTile({
  room,
  index,
}: {
  room: Room;
  index: number;
}) {
  const tier = getRoomTier(room.category);
  const isPremium = tier === "premium";
  const isDeluxe = tier === "deluxe";
  const isStandard = tier === "standard";

  const cardClasses = isPremium
    ? "border-white/12 shadow-[0_24px_70px_-28px_rgba(245,158,11,0.38)] hover:shadow-[0_32px_90px_-28px_rgba(6,95,70,0.48)]"
    : isDeluxe
    ? "border-white/10 shadow-[0_20px_60px_-28px_rgba(6,95,70,0.32)] hover:shadow-[0_28px_75px_-28px_rgba(6,95,70,0.4)]"
    : "border-black/5 shadow-[var(--shadow-soft)] hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.24)]";

  const categoryBadgeClasses = isPremium
    ? "border-amber-200/30 bg-ink-900/72 text-amber-50"
    : isDeluxe
    ? "border-emerald-200/20 bg-ink-900/70 text-beige-100"
    : "border-white/12 bg-ink-900/65 text-beige-100/95";

  const dotClasses = isPremium
    ? "bg-amber-400 shadow-[0_0_10px_1px_rgba(251,191,36,0.65)]"
    : isDeluxe
    ? "bg-emerald-300 shadow-[0_0_8px_1px_rgba(110,231,183,0.45)]"
    : "bg-beige-200/80";

  const statPanelClasses = isPremium
    ? "border-white/20 bg-white/12"
    : isDeluxe
    ? "border-white/15 bg-white/10"
    : "border-white/12 bg-white/8";

  const arrowClasses = isPremium
    ? "bg-amber-400/15 text-amber-50 group-hover:bg-amber-400 group-hover:text-ink-900"
    : isDeluxe
    ? "bg-emerald-300/15 text-beige-50 group-hover:bg-emerald-300 group-hover:text-ink-900"
    : "bg-beige-100/15 text-beige-50 group-hover:bg-beige-100 group-hover:text-ink-900";

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className={`group relative block overflow-hidden rounded-[1.6rem] border transition-all duration-500 hover:-translate-y-1 ${cardClasses}`}
    >
      <div className="relative aspect-[4/3] min-h-[21rem] w-full overflow-hidden">
        <div className="absolute inset-0 scale-[1.02] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Base overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/88 via-ink-900/18 to-transparent" />
        <div
          className={`pointer-events-none absolute inset-0 ${
            isPremium
              ? "bg-gradient-to-br from-amber-300/12 via-transparent to-emerald-300/10"
              : isDeluxe
              ? "bg-gradient-to-br from-white/5 via-transparent to-emerald-300/8"
              : "bg-gradient-to-br from-white/0 via-transparent to-transparent"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Premium shimmer */}
        {isPremium && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute top-0 h-full w-[34%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
              animate={{ left: ["-40%", "115%"] }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                repeatDelay: 1.25,
                ease: "linear",
              }}
            />
          </div>
        )}

        {/* Deluxe hover shimmer */}
        {isDeluxe && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-1/2 top-0 h-full w-[30%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/16 to-transparent opacity-0 blur-xl transition-all duration-1000 group-hover:translate-x-[340%] group-hover:opacity-100" />
          </div>
        )}

        {/* Subtle ring + top accent */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ${
            isPremium
              ? "ring-amber-200/30"
              : isDeluxe
              ? "ring-emerald-200/18"
              : "ring-white/10"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${
            isPremium
              ? "via-amber-300/85"
              : isDeluxe
              ? "via-emerald-300/65"
              : "via-white/40"
          } to-transparent`}
        />

        {/* Top row */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md ${categoryBadgeClasses}`}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClasses}`} />
            {room.category}
          </span>

          {(isPremium || isDeluxe) && (
            <span
              className={`flex items-center justify-center rounded-full border backdrop-blur-md ${
                isPremium
                  ? "h-10 w-10 border-amber-200/30 bg-white/12 text-amber-200 shadow-[0_8px_24px_-8px_rgba(251,191,36,0.55)]"
                  : "h-9 w-9 border-white/14 bg-white/10 text-emerald-200/85"
              }`}
            >
              <Sparkles
                size={isPremium ? 14 : 13}
                strokeWidth={isPremium ? 2.4 : 2.2}
                aria-hidden
              />
            </span>
          )}
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3">
          <h3
            className={`font-display font-bold leading-tight text-beige-50 ${
              isPremium ? "text-2xl sm:text-[1.7rem]" : "text-xl sm:text-[1.35rem]"
            }`}
          >
            {room.name}
          </h3>

          <div
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl ${statPanelClasses}`}
          >
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-semibold text-beige-100/90 sm:text-xs">
              <span className="flex items-center gap-1.5">
                <Maximize2 size={13} strokeWidth={2.2} className="text-emerald-300" />
                {room.size}
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />

              <span className="flex items-center gap-1.5">
                <Mountain size={13} strokeWidth={2.2} className="text-emerald-300" />
                {room.view}
              </span>
            </div>

            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 ${arrowClasses}`}
            >
              <ArrowUpRight size={14} strokeWidth={2.6} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}