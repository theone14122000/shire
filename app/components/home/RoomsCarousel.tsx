"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
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
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.slug}`}
              className="group relative block w-[84%] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-emerald-950 sm:w-[46%] lg:w-[31.4%]"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 46vw, 31.4vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
                <span className="absolute left-5 top-5 bg-emerald-950/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-cream-100 backdrop-blur">
                  {room.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-cream-50 sm:text-3xl">
                    {room.name}
                  </h3>
                  <span className="mt-3 inline-flex translate-y-1 items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Explore room
                    <ArrowUpRight size={13} strokeWidth={2.2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
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
