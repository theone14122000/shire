"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { rooms } from "@/lib/rooms";

const GAP = 16;

function cardWidth(track: HTMLElement | null) {
  const card = track?.firstElementChild as HTMLElement | null;
  if (!track || !card) return 320;
  return card.offsetWidth + GAP;
}

export function RoomsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = cardWidth(track);
    const index = Math.round(track.scrollLeft / step);
    setActive(Math.min(rooms.length - 1, Math.max(0, index)));
  };

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * cardWidth(trackRef.current), behavior: "smooth" });
  };

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * cardWidth(track), behavior: "smooth" });
    setActive(index);
  };

  return (
    <div className="mt-14 lg:mt-20">
      {/* TRACK */}
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
        >
          {rooms.map((room) => {
            const isPremium = /premium/i.test(room.category);
            const isDeluxe = /deluxe/i.test(room.category);
            const shimmer = isPremium
              ? { duration: 1.6, repeatDelay: 1.2 }
              : isDeluxe
                ? { duration: 4.2, repeatDelay: 4.5 }
                : null;
            return (
            <div
              key={room.id}
              className="group relative block w-[84%] shrink-0 snap-start overflow-hidden bg-cream-50 shadow-[0_18px_50px_-18px_rgba(6,40,25,0.35)] transition-shadow duration-500 hover:shadow-[0_32px_70px_-20px_rgba(6,40,25,0.45)] sm:w-[46%] lg:w-[31.4%]"
            >
              <Link
                href={`/rooms/${room.slug}`}
                aria-label={room.name}
                className="relative block aspect-[4/5] w-full overflow-hidden bg-emerald-950"
              >
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 46vw, 31.4vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                {shimmer ? (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-160%" }}
                      animate={{ x: "420%" }}
                      transition={{
                        duration: shimmer.duration,
                        repeat: Infinity,
                        repeatDelay: shimmer.repeatDelay,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.span>
                ) : null}
                <span className="absolute left-4 top-4 bg-emerald-950/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cream-100 backdrop-blur">
                  {room.category}
                </span>
              </Link>

              <div className="px-5 pb-6 pt-5 text-center">
                <span className="mx-auto mb-3 block h-px w-10 bg-gold-600/60" />
                <Link
                  href={`/rooms/${room.slug}`}
                  className="block font-display text-xl font-semibold leading-snug text-emerald-950 transition-colors duration-300 group-hover:text-gold-700 sm:text-2xl"
                >
                  {room.name}
                </Link>
                <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-emerald-950/55">
                  {room.category}
                </p>
              </div>
            </div>
            );
          })}
        </div>

        {/* arrows */}
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous rooms"
          className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/15 bg-cream-50/90 text-emerald-950 shadow-[var(--shadow-soft)] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-gold-400 lg:flex"
        >
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next rooms"
          className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/15 bg-cream-50/90 text-emerald-950 shadow-[var(--shadow-soft)] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-gold-400 lg:flex"
        >
          <ChevronRight size={20} strokeWidth={2.2} />
        </button>
      </div>

      {/* dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {rooms.map((room, index) => (
          <motion.button
            key={room.id}
            type="button"
            onClick={() => scrollToCard(index)}
            aria-label={`Go to ${room.name}`}
            animate={{ width: index === active ? 28 : 8, opacity: index === active ? 1 : 0.35 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-2 rounded-full bg-emerald-950"
          />
        ))}
      </div>
    </div>
  );
}
