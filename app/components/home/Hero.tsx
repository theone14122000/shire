"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { hero } from "@/lib/content";

const HERO_IMAGES = [
  "/images/hero-1.jpg",
  "/images/hero-2.png",
  "/images/hero-3.jpeg",
  "/images/hero-4.jpg",
  "/images/hero-5.jpg",
];

const AUTOPLAY_DELAY = 5000; // 5 seconds per image

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Resettable auto-toggle logic
  // Using setTimeout + useEffect dependency ensures the 5s timer 
  // resets whenever the user manually clicks a dot.
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === HERO_IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, AUTOPLAY_DELAY);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[75vh] min-h-[480px] w-full overflow-hidden bg-ink-900"
    >
      {/* Full-bleed image area with parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* AnimatePresence without mode="wait" creates a seamless crossfade */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Separate wrapper for Ken Burns zoom so it doesn't conflict with the crossfade */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: AUTOPLAY_DELAY / 1000 + 1.2, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_IMAGES[currentIndex]}
                alt={`Hero image ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cinematic dark overlay */}
      <div className="absolute inset-0 hero-overlay pointer-events-none" />
      
      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: "radial-gradient(circle at center, transparent 40%, rgba(8,18,18,0.6) 100%)"
        }} 
        aria-hidden 
      />

      {/* Extra gradient at bottom specifically to make meta strip pop */}
      <div 
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none" 
        style={{ background: "linear-gradient(to top, rgba(8,18,18,0.95), transparent)" }}
        aria-hidden 
      />

      {/* Slide Indicators with Progress Bars */}
      <div className="absolute bottom-20 sm:bottom-24 lg:bottom-28 right-0 left-0 z-10 pointer-events-none">
        <Container className="flex justify-end">
          <div className="flex items-center gap-2">
            {HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="pointer-events-auto h-[2px] rounded-full transition-all duration-500 ease-out bg-beige-100/30 overflow-hidden relative"
                style={{
                  width: index === currentIndex ? "2.5rem" : "0.75rem",
                }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-beige-100"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Meta strip pinned to the bottom edge with entry animation */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-beige-100/15 bg-ink-900/40 backdrop-blur-md"
      >
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-beige-100/10">
            {hero.meta.map((m) => (
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
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}