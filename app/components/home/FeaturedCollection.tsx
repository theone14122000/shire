// components/sections/FeaturedCollection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Maximize2, Mountain, ArrowUpRight, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { rooms } from "@/lib/rooms";
import { stagger, fadeUp } from "../ui/Motion";

const categoryRank: Record<string, number> = {
  Premium: 3,
  Deluxe: 2,
  Standard: 1,
};

const orderedRooms = [...rooms].sort((a, b) => {
  const rankA = categoryRank[a.category] ?? 0;
  const rankB = categoryRank[b.category] ?? 0;
  return rankB - rankA;
});

export function FeaturedCollection() {
  return (
    <section id="rooms" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Ghost watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-10 select-none font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-ink-900/[0.02]"
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
          className="relative mb-14 flex flex-col items-center text-center lg:mb-20"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-leaf/30 bg-accent-leaf/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.32em] text-ink-700">
              <Sparkles
                size={12}
                strokeWidth={2.4}
                className="text-emerald-600"
                aria-hidden
              />
              Accommodations
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] text-ink-900 sm:text-5xl md:text-6xl lg:text-[3.6rem]"
          >
            Rooms Named After Nature
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[65ch] text-lg leading-relaxed text-ink-500 lg:text-xl"
          >
            Seven thoughtfully designed rooms, each named after the tree species
            that surround our property and shape the forest cover of Himachal.
          </motion.p>

          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 h-[3px] w-28 origin-center rounded-full bg-gradient-to-r from-amber-400 to-emerald-600"
          />
        </motion.div>

        {/* Uniform grid - same size for all rooms */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7"
        >
          {orderedRooms.map((room, i) => (
            <motion.div key={room.id} variants={fadeUp}>
              <RoomTile room={room} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Keyframes for subtle shimmer & shine effects */}
      <style jsx global>{`
        @keyframes border-shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes image-shine {
          0% {
            transform: translateX(-120%) skewX(-20deg);
            opacity: 0;
          }
          40% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(120%) skewX(-20deg);
            opacity: 0;
          }
        }

        @keyframes premium-glow {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.85;
          }
        }
      `}</style>
    </section>
  );
}

function RoomTile({
  room,
  index,
}: {
  room: (typeof rooms)[number];
  index: number;
}) {
  const tier = room.category;

  const isPremium = tier === "Premium";
  const isDeluxe = tier === "Deluxe";
  const isStandard = tier === "Standard";

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] outline-none"
    >
      {/* Premium: animated shimmer border */}
      {isPremium && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[1px] z-10 rounded-[1.8rem] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
        >
          <div
            className="absolute inset-0 rounded-[1.8rem]"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.55) 25%, rgba(251,191,36,0.65) 50%, rgba(16,185,129,0.55) 75%, rgba(16,185,129,0) 100%)",
              backgroundSize: "400% 400%",
              animation: "border-shimmer 3.2s ease infinite",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
        </div>
      )}

      {/* Deluxe: subtle static premium edge */}
      {isDeluxe && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[0.5px] z-10 rounded-[1.8rem] opacity-70 transition-opacity duration-500 group-hover:opacity-90"
          style={{
            background:
              "linear-gradient(120deg, rgba(16,185,129,0.25) 0%, rgba(251,191,36,0.2) 50%, rgba(16,185,129,0.25) 100%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "0.5px",
          }}
        />
      )}

      {/* Card surface */}
      <div className="relative z-0 flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink-900 shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:shadow-[0_30px_80px_-20px_rgba(6,95,70,0.45)]">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[4/3]">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            priority={index < 4}
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />

          {/* Subtle image shine on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent will-change-transform group-hover:animate-[image-shine_1.1s_ease-out]"
            style={{ skewX: "-20deg" }}
          />

          {/* Base scrim */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" />

          {/* Premium soft halo */}
          {isPremium && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-emerald-400/20 to-transparent blur-2xl"
              style={{ animation: "premium-glow 2.6s ease-in-out infinite" }}
            />
          )}

          {/* Top badges */}
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md transition-all duration-300 ${
                isPremium
                  ? "border-emerald-300/40 bg-emerald-600/80 text-white shadow-[0_6px_20px_-6px_rgba(16,185,129,0.7)]"
                  : "border-white/15 bg-ink-900/70 text-beige-100"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  isPremium
                    ? "bg-amber-300 shadow-[0_0_8px_2px_rgba(251,191,36,0.45)]"
                    : "bg-amber-400 shadow-[0_0_6px_1px_rgba(251,191,36,0.5)]"
                }`}
              />
              {room.category}
            </span>

            {isPremium && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_-6px_rgba(16,185,129,0.7)]">
                <Sparkles size={11} strokeWidth={2.5} aria-hidden />
                Most Premium
              </span>
            )}
          </div>

          {/* Content at base */}
          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3">
            <h3 className="font-display text-xl font-bold leading-tight text-beige-50 sm:text-2xl">
              {room.name}
            </h3>

            <div
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl transition-colors duration-500 ${
                isPremium
                  ? "border-white/20 bg-white/15"
                  : "border-white/15 bg-white/10"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-beige-100/90 sm:gap-3">
                <span className="flex items-center gap-1.5">
                  <Maximize2
                    size={12.5}
                    strokeWidth={2.2}
                    className="text-emerald-300"
                  />
                  {room.size}
                </span>
                <span className="h-3 w-px bg-white/20" aria-hidden />
                <span className="flex items-center gap-1.5">
                  <Mountain
                    size={12.5}
                    strokeWidth={2.2}
                    className="text-emerald-300"
                  />
                  {room.view}
                </span>
              </div>

              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-beige-50 transition-all duration-300 group-hover:rotate-45 ${
                  isPremium
                    ? "bg-amber-400/90 text-ink-900 group-hover:bg-amber-400"
                    : "bg-beige-100/15 group-hover:bg-amber-400 group-hover:text-ink-900"
                }`}
              >
                <ArrowUpRight size={14} strokeWidth={2.6} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}