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

const BOOKING_URL =
  "https://letsbook.me/booking/thehimalayanshire?checkin=2026-07-19&checkout=2026-07-20&adults=2&children=0";

const TITLE_LINE_1 = "The Himalayan";
const TITLE_LINE_2 = "Shire";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax + fade as user scrolls past the hero
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  // Subtle cursor-reactive parallax for the floating glow orb
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Cursor-reactive tilt for the headline (reduced intensity for smoother feel)
  const tiltX = useSpring(useMotionValue(0), { stiffness: 50, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 50, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 40);
    mouseY.set(yPos * 40);
    tiltY.set(x * 4); // Reduced from 8
    tiltX.set(-yPos * 4); // Reduced from 8
  }

  // Stats: Location first (live dot, redirects to Google Maps), then the
  // original meta items — duplicate "location / near Kalpa" entries are
  // filtered out, and capacity is forced to "7 Rooms".
  const restMeta = hero.meta
    .filter((m) => !/location/i.test(m.label) && !/kalpa/i.test(m.value))
    .map((m) =>
      /capacit|room/i.test(m.label) ? { ...m, value: "7 Rooms" } : m
    );

  const metaItems = [
    {
      label: "Location",
      value: "View on Map",
      href: MAPS_URL,
      live: true,
      icon: "pin" as const,
    },
    ...restMeta.map((m) => ({ ...m, icon: iconFor(m.label) })),
  ];

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={handleMouseMove}
      className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-ink-900"
    >
      {/* Cinematic video background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.08, opacity: 1 }}
          transition={{
            opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
            scale: {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
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
        className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[120px] mix-blend-screen"
        aria-hidden
      />

      {/* Cinematic dark overlay */}
      <div className="absolute inset-0 hero-overlay pointer-events-none" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 35%, rgba(8,18,18,0.7) 100%)",
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

      {/* Centerpiece: animated headline + CTA */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="flex flex-col items-center">
          {/* Eyebrow badge with live pulse */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]"
            />
            <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.28em] font-bold text-white/70">
              Fagu · Shimla · Himachal
            </span>
          </motion.div>

          {/* Cinematic headline — slow clip-path + blur reveal + subtle cursor tilt */}
          <motion.h1
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
            className="font-display font-black leading-[0.9] tracking-tight [transform-style:preserve-3d]"
          >
            <AnimatedLine text={TITLE_LINE_1} baseDelay={0.4} />
            <AnimatedLine text={TITLE_LINE_2} baseDelay={0.65} shimmer />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[42ch] text-xs sm:text-base text-white/55 font-medium leading-relaxed"
          >
            A private forest retreat of seven rooms, cradled in the deodar
            hills — where the mountains keep their quiet.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          >
            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-xs sm:px-7 sm:py-3.5 sm:text-sm font-bold text-ink-900 shadow-[0_8px_30px_rgba(251,191,36,0.35)] transition-colors duration-300 hover:bg-amber-300"
            >
              Book Your Stay
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a
              href="#rooms"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/5 px-6 py-3 text-xs sm:px-7 sm:py-3.5 sm:text-sm font-bold text-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
            >
              Explore Rooms
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Meta / stats strip — dynamic, per-stat icons, hover lift, fully responsive */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-ink-900/40 backdrop-blur-md"
      >
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10">
            {metaItems.map((m, i) => {
              const baseClass =
                "group relative overflow-hidden bg-ink-900/60 px-3 py-3 sm:px-4 sm:py-4 flex flex-col gap-1 transition-all duration-300 hover:bg-ink-800/70";

              const inner = (
                <>
                  {/* hover glow sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-amber-300/70 font-bold">
                    <StatIcon name={m.icon} />
                    <span className="truncate">{m.label}</span>
                    {"live" in m && m.live && (
                      <motion.span
                        animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="ml-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.7)]"
                      />
                    )}
                  </span>
                  <span className="relative text-sm sm:text-lg text-amber-300 font-black tracking-tight group-hover:text-amber-200 transition-colors">
                    {m.value}
                  </span>
                </>
              );

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
                      className={`${baseClass} cursor-pointer`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={baseClass}>{inner}</div>
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

/* ------------------------------------------------------------------ */
/*  Cinematic per-line animated headline (slow clip-path + blur reveal) */
/* ------------------------------------------------------------------ */
function AnimatedLine({
  text,
  baseDelay,
  shimmer = false,
}: {
  text: string;
  baseDelay: number;
  shimmer?: boolean;
}) {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(12px)", opacity: 0 }}
      animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)", opacity: 1 }}
      transition={{ 
        duration: 1.4, 
        delay: baseDelay, 
        ease: [0.33, 1, 0.68, 1],
        filter: { duration: 1.0 }
      }}
    >
      <span
        className={`block text-[15vw] sm:text-6xl md:text-7xl lg:text-[7.5rem] ${
          shimmer
            ? "bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_6s_linear_infinite]"
            : "text-white/90"
        }`}
      >
        {text}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small icon set for the stats strip                                 */
/* ------------------------------------------------------------------ */
function iconFor(label: string): "bed" | "calendar" | "leaf" {
  if (/room|capacit|bed/i.test(label)) return "bed";
  if (/check|date|night/i.test(label)) return "calendar";
  return "leaf";
}

function StatIcon({ name }: { name: "pin" | "bed" | "calendar" | "leaf" }) {
  const common = {
    width: 11,
    height: 11,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "pin":
      return (
        <svg {...common} className="shrink-0">
          <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "bed":
      return (
        <svg {...common} className="shrink-0">
          <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
          <path d="M3 18h18M5 10V7a2 2 0 0 1 2-2h3v5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common} className="shrink-0">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      );
    default:
      return (
        <svg {...common} className="shrink-0">
          <path d="M12 2C8 6 4 9 4 14a8 8 0 0 0 16 0c0-5-4-8-8-12z" />
        </svg>
      );
  }
}