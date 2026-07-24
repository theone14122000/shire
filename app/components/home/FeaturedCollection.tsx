"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Maximize2, Mountain, ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { rooms } from "@/lib/rooms";
import { stagger, fadeUp } from "../ui/Motion";

type Room = (typeof rooms)[number];

export function FeaturedCollection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <section
      id="rooms"
      ref={ref}
      className="relative overflow-hidden bg-cream-50 py-24 sm:py-32 lg:py-40"
    >
      <span aria-hidden className="pointer-events-none absolute -right-6 top-10 select-none font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-emerald-950/[0.03]">
        Rooms
      </span>
      <motion.div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-emerald-200/20 blur-[130px]" style={{ y: glowY }} />

      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="relative mb-16 lg:mb-20"
        >
          <motion.div variants={fadeUp}>
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="h-px w-8 bg-emerald-300" />
              Accommodations
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 h-section max-w-4xl">
            Rooms Named After Nature
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 body-lg max-w-[65ch]">
            We have lovingly prepared seven rooms, each with its own uniqueness — named after the tree species that surround our property.
          </motion.p>
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-[3px] w-28 origin-left rounded-full bg-gradient-to-r from-gold-400 to-emerald-600"
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {rooms.map((room, idx) => (
            <motion.div key={room.id} variants={fadeUp}>
              <Link
                href={`/rooms/${room.slug}`}
                className="group block h-full"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-emerald-200/40 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300/50 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      priority={idx < 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent" />
                    <div className="absolute inset-x-4 top-4 flex items-start justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-emerald-950/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cream-50 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                        {room.category}
                      </span>
                    </div>
                    <div className="absolute inset-x-3 bottom-3">
                      <div className="rounded-xl border border-white/10 bg-emerald-950/70 backdrop-blur-sm p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-lg font-bold leading-tight text-cream-50 sm:text-xl">
                            {room.name}
                          </h3>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-300 transition-all duration-300 group-hover:rotate-45 group-hover:bg-gold-400 group-hover:text-emerald-950">
                            <ArrowUpRight size={14} strokeWidth={2.6} />
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold text-cream-200/80">
                          {room.size && (
                            <span className="flex items-center gap-1.5">
                              <Maximize2 size={12} strokeWidth={2.2} className="text-gold-300" />
                              {room.size}
                            </span>
                          )}
                          {room.size && room.view && <span className="h-3 w-px bg-white/20" />}
                          {room.view && (
                            <span className="flex items-center gap-1.5">
                              <Mountain size={12} strokeWidth={2.2} className="text-gold-300" />
                              {room.view}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
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
