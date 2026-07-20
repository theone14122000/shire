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
  ArrowRight,
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
 * RoomCard — the admin-ready "room/offer" card.
 *
 * Designed to receive a single typed `Room` object so the same
 * component can render any room the client adds through the admin
 * panel. All copy, price, offer badge, and rating come from props.
 */

// --- amenity + comfort → icon mapping (keyword match, case-insensitive) ---
// Order matters: more specific keywords should come first so they win
// over broader matches (e.g. "air conditioning" before generic "air").
const AMENITY_ICON_MAP: { keywords: string[]; icon: typeof Wifi }[] = [
  // connectivity
  { keywords: ["wifi", "wi-fi", "internet"], icon: Wifi },
  { keywords: ["tv", "television", "netflix", "smart screen"], icon: Tv },

  // climate / comfort
  { keywords: ["air condition", "ac", "cooling"], icon: Wind },
  { keywords: ["heater", "heating", "fireplace", "bukhari"], icon: Flame },
  { keywords: ["temperature", "climate"], icon: Thermometer },
  { keywords: ["sunny", "sunrise", "sun-facing"], icon: Sun },
  { keywords: ["night", "blackout", "moon"], icon: Moon },
  { keywords: ["quiet", "soundproof", "silent"], icon: Volume2 },
  { keywords: ["cold", "chill", "snow"], icon: Snowflake },

  // food & drink
  { keywords: ["breakfast", "coffee", "tea"], icon: Coffee },
  { keywords: ["dining", "restaurant", "meal"], icon: UtensilsCrossed },
  { keywords: ["minibar", "bar", "wine"], icon: Wine },
  { keywords: ["fridge", "refrigerat"], icon: Refrigerator },

  // sleep & seating
  { keywords: ["bed", "king", "queen", "mattress"], icon: BedDouble },
  { keywords: ["sofa", "lounge", "sitting area"], icon: Sofa },
  { keywords: ["balcony", "chair", "seating"], icon: Armchair },

  // bath
  { keywords: ["bath", "shower", "tub"], icon: Bath },

  // property / views
  { keywords: ["view", "terrace", "mountain", "valley"], icon: Mountain },
  { keywords: ["pool", "spa", "jacuzzi"], icon: Waves },
  { keywords: ["parking", "valet", "car"], icon: Car },
  { keywords: ["gym", "fitness"], icon: Dumbbell },
  { keywords: ["safe", "security", "secure", "cctv"], icon: ShieldCheck },

  // policies / occupancy
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
const amenityContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const amenityItem: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function RoomCard({ room }: { room: Room }) {
  const [saved, setSaved] = useState(false);
  const discount = discountPercent(room.pricePerNight, room.originalPrice);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -6 }}
      className="card-luxe group relative flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(6,95,70,0.35)]"
    >
      {/* Image */}
      <div className="relative zoom-on-hover overflow-hidden">
        <ImagePlaceholder
          kind="product"
          aspect="4/3"
          label="Room Image Placeholder"
          caption={room.imageLabel}
          className="rounded-b-none border-2 border-transparent group-hover:border-emerald-500/20"
          showBadge={false}
        />

        {/* Bottom fade for depth / premium finish */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-900/40 to-transparent" />

        {/* Top-left: offer / featured badge with shimmer sweep */}
        {room.offerBadge ? (
          <span className="absolute top-3 left-3 z-10 overflow-hidden rounded-full bg-ink-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-beige-100 shadow-[var(--shadow-soft)]">
            <span className="relative z-10">{room.offerBadge}</span>
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent"
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "easeInOut",
              }}
            />
          </span>
        ) : null}

        {room.featured && !room.offerBadge ? (
          <span className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-beige-100 shadow-[0_4px_18px_-4px_rgba(16,185,129,0.6)]">
            <Sparkles size={11} strokeWidth={2.5} aria-hidden />
            Featured
          </span>
        ) : null}

        {/* Top-right: wishlist */}
        <motion.button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => setSaved((s) => !s)}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-beige-100/95 text-ink-900 shadow-[var(--shadow-soft)] backdrop-blur transition-colors duration-300 hover:bg-beige-50"
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

      {/* Body */}
      <div className="flex grow flex-col gap-4 p-5 sm:p-6">
        {/* Rating row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <Stars rating={room.rating} />
            <span className="text-xs font-bold text-ink-900">
              {room.rating.toFixed(1)}
            </span>
            <span className="text-xs font-medium text-ink-500">
              ({room.reviewCount})
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
            {room.category}
          </span>
        </div>

        {/* Name + capacity */}
        <div className="flex flex-col gap-1">
          <h3 className="h-card transition-colors duration-300 group-hover:text-emerald-800">
            {room.name}
          </h3>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
            <Users size={12} strokeWidth={2.2} className="text-emerald-600" />
            {room.capacity} · {room.beds}
          </p>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm font-medium leading-relaxed text-ink-700">
          {room.shortNote}
        </p>

        {/* Amenity / comfort chips — icon-led, staggered in on scroll */}
        <motion.div
          variants={amenityContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {room.amenities.slice(0, 4).map((a) => {
            const Icon = getAmenityIcon(a);
            return (
              <motion.span
                key={a}
                variants={amenityItem}
                whileHover={{ scale: 1.06, y: -1 }}
                className="group/chip flex items-center gap-1.5 rounded-full border border-emerald-900/10 bg-emerald-50/70 py-1 pl-1.5 pr-2.5 transition-colors duration-300 hover:border-emerald-500/30 hover:bg-emerald-50"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 transition-colors duration-300 group-hover/chip:bg-emerald-600 group-hover/chip:text-white">
                  <Icon size={11} strokeWidth={2.4} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-700">
                  {a}
                </span>
              </motion.span>
            );
          })}
          {room.amenities.length > 4 ? (
            <motion.span
              variants={amenityItem}
              className="flex items-center px-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700"
            >
              +{room.amenities.length - 4} more
            </motion.span>
          ) : null}
        </motion.div>

        {/* Spacer to push footer down */}
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

          <motion.a
            href="#book"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group/cta inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink-900 px-4 py-2.5 text-xs font-bold text-beige-100 shadow-[var(--shadow-soft)] transition-colors duration-300 hover:bg-gradient-to-r hover:from-emerald-700 hover:to-emerald-600"
          >
            Book
            <ArrowRight
              size={13}
              strokeWidth={2.4}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            />
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
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Star
              size={12}
              strokeWidth={1.4}
              className={filled ? "fill-emerald-600 text-emerald-600" : "text-ink-300"}
            />
          </motion.span>
        );
      })}
    </div>
  );
}