"use client";

import { motion } from "framer-motion";
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
export function RoomCard({ room }: { room: Room }) {
  const discount = discountPercent(room.pricePerNight, room.originalPrice);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="card-luxe group flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative zoom-on-hover">
        <ImagePlaceholder
          kind="product"
          aspect="4/3"
          label="Room Image Placeholder"
          caption={room.imageLabel}
          className="rounded-b-none border-2 border-transparent group-hover:border-ink-900/10"
          showBadge={false}
        />

        {/* Top-left: offer / featured badge */}
        {room.offerBadge ? (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-ink-900 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-beige-100 font-bold shadow-[var(--shadow-soft)]">
            {room.offerBadge}
          </span>
        ) : null}

        {room.featured && !room.offerBadge ? (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-accent-emerald px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-beige-100 font-bold shadow-[var(--shadow-soft)]">
            Featured
          </span>
        ) : null}

        {/* Top-right: wishlist */}
        <button
          type="button"
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-beige-100/95 backdrop-blur text-ink-900 transition-all duration-300 hover:bg-beige-50 hover:scale-110 shadow-[var(--shadow-soft)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M8 14s-5-3.5-5-7.5C3 4 4.5 2.5 6.5 2.5c1 0 1.8.5 2.5 1.4.7-.9 1.5-1.4 2.5-1.4 2 0 3.5 1.5 3.5 4 0 4-5 7.5-5 7.5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5 sm:p-6 grow">
        {/* Rating row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <Stars rating={room.rating} />
            <span className="text-xs font-bold text-ink-900">
              {room.rating.toFixed(1)}
            </span>
            <span className="text-xs text-ink-500 font-medium">
              ({room.reviewCount})
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink-500 font-bold">
            {room.category}
          </span>
        </div>

        {/* Name + capacity */}
        <div className="flex flex-col gap-1">
          <h3 className="h-card">{room.name}</h3>
          <p className="text-xs text-ink-500 font-semibold">
            {room.capacity} · {room.beds}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-ink-700 leading-relaxed font-medium line-clamp-2">
          {room.shortNote}
        </p>

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="text-[10px] uppercase tracking-[0.16em] text-ink-700 font-bold px-2 py-1 rounded-full bg-beige-50 border border-ink-900/10"
            >
              {a}
            </span>
          ))}
          {room.amenities.length > 3 ? (
            <span className="text-[10px] uppercase tracking-[0.16em] text-ink-500 font-bold px-2 py-1">
              +{room.amenities.length - 3} more
            </span>
          ) : null}
        </div>

        {/* Spacer to push footer down */}
        <div className="grow" />

        {/* Price + CTA */}
        <div className="pt-4 border-t-2 border-ink-900/10 flex items-end justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-500 font-bold">
              From
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-ink-900 leading-none">
                {formatINR(room.pricePerNight)}
              </span>
              {room.originalPrice ? (
                <span className="text-sm text-ink-500 line-through font-medium">
                  {formatINR(room.originalPrice)}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] text-ink-500 font-semibold mt-0.5">
              per night · incl. breakfast
            </span>
            {discount ? (
              <span className="text-[10px] uppercase tracking-[0.18em] text-accent-emerald font-bold mt-1">
                You save {discount}%
              </span>
            ) : null}
          </div>

          <a
            href="#book"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2.5 text-xs font-bold text-beige-100 transition-all duration-300 hover:bg-ink-700 hover:-translate-y-0.5 shadow-[var(--shadow-soft)] whitespace-nowrap"
          >
            Book
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
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
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden
            className="text-ink-900"
          >
            <path d="M7 1l1.85 3.75 4.15.6-3 2.92.7 4.13L7 10.5l-3.7 1.9.7-4.13-3-2.92 4.15-.6L7 1z" />
          </svg>
        );
      })}
    </div>
  );
}
