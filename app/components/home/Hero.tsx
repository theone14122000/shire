"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { Container } from "../ui/Container";
import { hero } from "@/lib/content";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax + fade as user scrolls past the hero
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Subtle cursor-reactive parallax for the floating glow orb
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 40);
    mouseY.set(yPos * 40);
  }

  // Build stats: Location first (blinking, links to Google Maps), Capacity forced to "7 Rooms"
  const metaItems = [
    {
      label: "Location",
      value: "View on Map",
      href: MAPS_URL,
      live: true,
    },
    ...hero.meta.map((m) =>
      /capacit|room/i.test(m.label) ? { ...m, value: "7 Rooms" } : m
    ),
  ];

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={handleMouseMove}
      className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-ink-900"
    >
      {/* Looping cinematic video background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-1.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* Floating ambient glow orb — reacts to cursor */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-beige-100/10 blur-[120px] mix-blend-screen"
        aria-hidden
      />

      {/* Film-grain / texture overlay for cinematic depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Cinematic dark overlay */}
      <div className="absolute inset-0 hero-overlay pointer-events-none" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(8,18,18,0.65) 100%)",
        }}
        aria-hidden
      />

      {/* Bottom gradient to lift meta strip */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(8,18,18,0.95), transparent)",
        }}
        aria-hidden
      />

      {/* Award badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 z-10"
      >
        <div className="flex items-center gap-2 rounded-full border border-beige-100/25 bg-ink-900/40 px-4 py-1.5 backdrop-blur-md shadow-lg">
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-beige-100"
          >
            ★
          </motion.span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-beige-100/90">
            Award-Winning Himalayan Retreat
          </span>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute bottom-28 sm:bottom-32 lg:bottom-36 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-beige-100/70 font-bold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-gradient-to-b from-beige-100/80 to-transparent"
        />
      </motion.div>

      {/* Meta / stats strip */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-beige-100/15 bg-ink-900/40 backdrop-blur-md"
      >
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-beige-100/10">
            {metaItems.map((m, i) => {
              const content = (
                <>
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-beige-100/60 font-bold">
                    {"live" in m && m.live && (
                      <motion.span
                        animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.7)]"
                      />
                    )}
                    {m.label}
                  </span>
                  <span className="text-sm sm:text-base text-beige-100 font-bold">
                    {m.value}
                  </span>
                </>
              );

              const baseClass =
                "bg-ink-900/60 px-4 py-3 sm:py-4 flex flex-col gap-0.5";

              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {"href" in m && m.href ? (
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClass} group transition-colors hover:bg-ink-800/70 cursor-pointer`}
                    >
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-beige-100/60 font-bold">
                        {content.props.children[0]}
                      </span>
                      <span className="text-sm sm:text-base text-beige-100 font-bold group-hover:underline underline-offset-4 decoration-beige-100/60">
                        {m.value}
                      </span>
                    </a>
                  ) : (
                    <div className={baseClass}>{content}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}