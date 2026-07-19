"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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

  // Parallax for the video layer only
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

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
            <source src="/hero/hero.mp2" type="video/mp4" />
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
