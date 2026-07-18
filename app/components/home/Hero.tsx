"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Award } from "lucide-react";
import { Container } from "../ui/Container";
import { hero } from "@/lib/content";

/**
 * Drop your video into /public/videos/hero.mp4 and it will play here
 * automatically. The poster image shows while the video loads.
 */
const HERO_VIDEO = "/videos/hero.mp4";
const HERO_POSTER = "/images/hero-1.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[75vh] min-h-[480px] w-full overflow-hidden bg-ink-900"
    >
      {/* Full-bleed looping video with parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Ambient video of The Himalayan Shire and the Kinnaur valley"
        />
      </motion.div>

      {/* Cinematic dark overlay */}
      <div className="absolute inset-0 hero-overlay pointer-events-none" />

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(8,18,18,0.6) 100%)",
        }}
        aria-hidden
      />

      {/* Extra gradient at bottom specifically to make meta strip pop */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(8,18,18,0.95), transparent)",
        }}
        aria-hidden
      />

      {/* Award badge — floating laurel mark */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-5 sm:top-8 inset-x-0 z-10 flex justify-center pointer-events-none"
      >
        <div className="flex items-center gap-2 rounded-full border border-beige-100/25 bg-ink-900/50 backdrop-blur-md px-4 py-2">
          <Award className="h-4 w-4 text-beige-100" aria-hidden />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-beige-100 font-bold">
            Award-Winning Himalayan Stay
          </span>
        </div>
      </motion.div>

      {/* Meta strip pinned to the bottom edge with entry animation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-beige-100/15 bg-ink-900/40 backdrop-blur-md"
      >
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-beige-100/10">
            {hero.meta.map((m) =>
              "href" in m && m.href ? (
                <a
                  key={m.label}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink-900/60 px-4 py-3 sm:py-4 flex flex-col gap-0.5 animate-pulse hover:animate-none focus-visible:animate-none transition-colors hover:bg-ink-900/80"
                >
                  <span className="text-[10px] uppercase tracking-[0.22em] text-beige-100/60 font-bold flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden />
                    {m.label}
                  </span>
                  <span className="text-sm sm:text-base text-beige-100 font-bold underline decoration-beige-100/40 underline-offset-4">
                    {m.value}
                  </span>
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
              ) : (
                <div
                  key={m.label}
                  className="bg-ink-900/60 px-4 py-3 sm:py-4 flex flex-col gap-0.5"
                >
                  <span className="text-[10px] uppercase tracking-[0.22em] text-beige-100/60 font-bold">
                    {m.label}
                  </span>
                  <span className="text-sm sm:text-base text-beige-100 font-bold">
                    {m.value}
                  </span>
                </div>
              )
            )}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
