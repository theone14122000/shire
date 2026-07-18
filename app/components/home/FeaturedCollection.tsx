// components/sections/FeaturedCollection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../ui/Container";
import { rooms } from "@/lib/rooms";
import { stagger, fadeUp } from "../ui/Motion";

export function FeaturedCollection() {
  return (
    // Removed section-accent to keep the default page background
    <section id="rooms" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full mb-12 lg:mb-16"
        >
          {/* Top Badge - Aligned Left */}
          <motion.div variants={fadeUp} className="flex justify-start mb-6">
            <span className="inline-flex items-center bg-accent-leaf/15 text-ink-700 text-[11px] uppercase tracking-[0.32em] font-bold px-4 py-2 rounded-full border border-accent-leaf/30">
              Accommodations
            </span>
          </motion.div>

          {/* Heading - Aligned Center */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.6rem] leading-[1.04] tracking-[-0.025em] text-ink-900 font-bold text-center max-w-4xl mx-auto"
          >
            Rooms Named After Nature
          </motion.h2>

          {/* Subtext - Aligned Center */}
          <motion.p
            variants={fadeUp}
            className="body-lg text-ink-500 max-w-[70ch] mx-auto mt-6 text-center leading-relaxed"
          >
            We have lovingly and thoughtfully prepared our seven rooms, each with
            its own uniqueness. In spirit of our vision to bring people closer to
            nature, make them more appreciative of its pure magnificence we have
            chosen to name our rooms after the different tree species that surround
            our property and also contribute to most of the forest cover in the
            state of Himachal.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {rooms.map((room) => (
            <motion.div key={room.id} variants={fadeUp}>
              <Link
                href={`/rooms/${room.slug}`}
                className="card-luxe group block h-full"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[var(--radius-card)] bg-ink-50">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-ink-900/80 backdrop-blur-sm text-beige-50 text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full">
                    {room.category}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="h-card text-ink-900">{room.name}</h3>
                    <p className="text-sm text-ink-500 mt-1">
                      {room.size} &middot; {room.view}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-accent-leaf font-bold text-sm group-hover:gap-3 transition-all duration-300">
                    Explore Room
                    <svg
                      width="14"
                      height="14"
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
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}