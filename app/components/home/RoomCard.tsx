"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Wifi,
  Wind,
  Coffee,
  Car,
  Waves,
  Tv,
  BedDouble,
  Bath,
  Mountain,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  Snowflake,
  Refrigerator,
  Heart,
  ArrowUpRight,
  Star,
  Thermometer,
  Users,
  Sun,
  Moon,
  Volume2,
  Sofa,
  Cigarette,
  PawPrint,
  Baby,
  Wine,
  Flame,
  Armchair,
} from "lucide-react";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { formatINR, discountPercent } from "@/lib/format";
import type { Room } from "@/lib/content";

/**
 * RoomCard — editorial, gallery-forward presentation for a single
 * `Room`. Image reads as the hero; a glass panel overlaps its base
 * carrying rating + category, and the body below carries name,
 * icon-led amenities, and price/CTA. Built to feel like a five-star
 * hospitality brand's booking page, not a generic listing grid.
 */

// --- amenity + comfort → icon mapping (keyword match, most specific first) ---
const AMENITY_ICON_MAP: { keywords: string[]; icon: typeof Wifi }[] = [
  { keywords: ["wifi", "wi-fi", "internet"], icon: Wifi },
  { keywords: ["tv", "television", "netflix", "smart screen"], icon: Tv },
  { keywords: ["air condition", "ac", "cooling"], icon: Wind },
  { keywords: ["heater", "heating", "fireplace", "bukhari"], icon: Flame },
  { keywords: ["temperature", "climate"], icon: Thermometer },
  { keywords: ["sunny", "sunrise", "sun-facing"], icon: Sun },
  { keywords: ["night", "blackout", "moon"], icon: Moon },
  { keywords: ["quiet", "soundproof", "silent"], icon: Volume2 },
  { keywords: ["cold", "chill", "snow"], icon: Snowflake },
  { keywords: ["breakfast", "coffee", "tea"], icon: Coffee },
  { keywords: ["dining", "restaurant", "meal"], icon: UtensilsCrossed },
  { keywords: ["minibar", "bar", "wine"], icon: Wine },
  { keywords: ["fridge", "refrigerat"], icon: Refrigerator },
  { keywords: ["bed", "king", "queen", "mattress"], icon: BedDouble },
  { keywords: ["sofa", "lounge", "sitting area"], icon: Sofa },
  { keywords: ["balcony", "chair", "seating"], icon: Armchair },
  { keywords: ["bath", "shower", "tub"], icon: Bath },
  { keywords: ["view", "terrace", "mountain", "valley"], icon: Mountain },
  { keywords: ["pool", "spa", "jacuzzi"], icon: Waves },
  { keywords: ["parking", "valet", "car"], icon: Car },
  { keywords: ["gym", "fitness"], icon: Dumbbell },
  { keywords: ["safe", "security", "secure", "cctv"], icon: ShieldCheck },
  { keywords: ["guest", "capacity", "occupancy", "people"], icon: Users },
  { keywords: ["smoking"], icon: Cigarette },
  { keywords: ["pet"], icon: PawPrint },
  { keywords: ["child", "kid", "crib", "family"], icon: Baby },
];

function getAmenityIcon(amenity: string) {
  const lower = amenity.toLowerCase();
  const match = AMENITY_ICON_MAP.find((entry) =>
    entry.keywords.some((k) => lower.includes(k))
  );
  return match?.icon ?? Sparkles;
}

// --- motion variants ---
const revealUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const amenityContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const amenityItem: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function RoomCard({ room }: { room: Room }) {
  const [saved, setSaved] = useState(false);
  const discount = discountPercent(room.pricePerNight, room.originalPrice);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="group relative flex h-full flex-col"
    >
      {/* IMAGE — tall editorial frame */}
      <div className="relative overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-soft)] transition-shadow duration-500 group-hover:shadow-[0_28px_70px_-20px_rgba(6,95,70,0.4)]">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div className="absolute inset-0 scale-[1.02] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]">
            <ImagePlaceholder
              kind="product"
              aspect="4/5"
              label="Room Image Placeholder"
              caption={room.imageLabel}
              className="h-full w-full border-none"
              showBadge={false}
            />
          </div>

          {/* permanent base scrim for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent" />

          {/* hover scrim intensifies + warms slightly */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* top row: badge + wishlist */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {room.offerBadge ? (
            <span className="relative overflow-hidden rounded-full bg-beige-100/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-900 shadow-[var(--shadow-soft)] backdrop-blur">
              <span className="relative z-10">{room.offerBadge}</span>
              <motion.span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
              />
            </span>
          ) : room.featured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-beige-100 shadow-[0_6px_20px_-4px_rgba(16,185,129,0.65)]">
              <Sparkles size={11} strokeWidth={2.5} aria-hidden />
              Featured
            </span>
          ) : (
            <span />
          )}

          <motion.button
            type="button"
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            onClick={() => setSaved((s) => !s)}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-beige-100/95 text-ink-900 shadow-[var(--shadow-soft)] backdrop-blur transition-colors duration-300 hover:bg-beige-50"
          >
            <Heart
              size={16}
              strokeWidth={2}
              className={
                saved
                  ? "fill-emerald-600 text-emerald-600 transition-colors duration-300"
                  : "text-ink-900 transition-colors duration-300"
              }
            />
          </motion.button>
        </div>

        {/* category kicker + name, set into the image */}
        <div className="absolute inset-x-0 bottom-[4.75rem] px-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300">
            {room.category}
          </span>
          <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-beige-50 drop-shadow-sm sm:text-[1.7rem]">
            {room.name}
          </h3>
        </div>

        {/* FLOATING GLASS STAT PANEL — overlaps the image's bottom edge */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Stars rating={room.rating} />
            <span className="text-xs font-bold text-beige-50">{room.rating.toFixed(1)}</span>
            <span className="text-xs font-medium text-beige-100/60">({room.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-beige-100/85">
            <Users size={13} strokeWidth={2.2} className="text-emerald-300" />
            {room.capacity}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex grow flex-col gap-4 px-1 pt-5">
        {/* Description */}
        <p className="text-sm font-medium leading-relaxed text-ink-700 line-clamp-2">
          {room.shortNote}
        </p>

        {/* Beds line */}
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500">
          {room.beds}
        </p>

        {/* Amenity icon row — circular, label reveals on hover per-icon */}
        <motion.div
          variants={amenityContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-wrap items-center gap-2.5"
        >
          {room.amenities.slice(0, 5).map((a) => {
            const Icon = getAmenityIcon(a);
            return (
              <motion.div key={a} variants={amenityItem} className="group/icon relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/12 bg-emerald-50 text-emerald-700 transition-all duration-300 group-hover/icon:-translate-y-1 group-hover/icon:border-emerald-500/40 group-hover/icon:bg-emerald-600 group-hover/icon:text-white group-hover/icon:shadow-[0_10px_20px_-6px_rgba(6,95,70,0.5)]">
                  <Icon size={16} strokeWidth={2.2} />
                </div>
                {/* tooltip label */}
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink-900 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-beige-100 opacity-0 shadow-[var(--shadow-soft)] transition-all duration-200 group-hover/icon:translate-y-0 group-hover/icon:opacity-100"
                >
                  {a}
                </motion.span>
              </motion.div>
            );
          })}
          {room.amenities.length > 5 ? (
            <motion.div
              variants={amenityItem}
              className="flex h-10 items-center rounded-full bg-emerald-50 px-3 text-[11px] font-bold text-emerald-700"
            >
              +{room.amenities.length - 5}
            </motion.div>
          ) : null}
        </motion.div>

        {/* Spacer */}
        <div className="grow" />

        {/* Price + CTA */}
        <div className="flex items-end justify-between gap-3 border-t-2 border-ink-900/10 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500">
              From
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold leading-none text-ink-900 sm:text-3xl">
                {formatINR(room.pricePerNight)}
              </span>
              {room.originalPrice ? (
                <span className="text-sm font-medium text-ink-500 line-through">
                  {formatINR(room.originalPrice)}
                </span>
              ) : null}
            </div>
            <span className="mt-0.5 text-[10px] font-semibold text-ink-500">
              per night · incl. breakfast
            </span>
            {discount ? (
              <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-600/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                Save {discount}%
              </span>
            ) : null}
          </div>

          {/* magnetic-style CTA: ring expands + icon rotates on hover */}
          <motion.a
            href="#book"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group/cta relative inline-flex h-12 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-ink-900 pl-5 pr-4 text-xs font-bold text-beige-100 shadow-[var(--shadow-soft)] transition-colors duration-300 hover:bg-gradient-to-r hover:from-emerald-700 hover:to-emerald-600"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
            <span className="relative">Reserve</span>
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-beige-100/15 transition-transform duration-300 group-hover/cta:rotate-45">
              <ArrowUpRight size={13} strokeWidth={2.6} />
            </span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        return (
          <Star
            key={i}
            size={11}
            strokeWidth={1.4}
            className={filled ? "fill-amber-400 text-amber-400" : "text-beige-100/30"}
          />
        );
      })}
    </div>
  );
}