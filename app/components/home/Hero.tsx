"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Container } from "../ui/Container";
import { hero } from "@/lib/content";
import type { ReactNode } from "react";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

export function Hero({ content }: { content?: any }) {
  const ref = useRef<HTMLElement>(null);
  const data = { ...hero, ...(content?.hero ?? {}) };
  const videoUrl = typeof data.videoUrl === "string" && data.videoUrl.trim()
    ? data.videoUrl
    : hero.videoUrl;
  const poster = typeof data.poster === "string" && data.poster.trim()
    ? data.poster
    : hero.poster;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

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

  const restMeta = (Array.isArray(data.meta) ? data.meta : [])
    .filter((m: any) => !/location/i.test(m.label) && !/kalpa/i.test(m.value))
    .map((m: any) =>
      /capacit|room/i.test(m.label) ? { ...m, value: "7 Rooms" } : m
    );

  const metaItems = [
    {
      label: "Location",
      value: "Fagu (Himachal Pradesh)",
      href: MAPS_URL,
      icon: "pin" as const,
    },
    ...restMeta.map((m: any) => ({ ...m, icon: iconFor(m.label) })),
  ];

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={handleMouseMove}
      className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-ink-900 sm:h-[80vh] sm:min-h-[560px] lg:h-[92vh]"
    >
      {/*
        Full-bleed cinematic video frame — edge to edge on every screen
        size, no frame, no rounding, no border.
      */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute inset-0 overflow-hidden"
        >
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
              poster={poster}
              className="absolute inset-0 h-full w-full object-cover object-center"
              aria-hidden="true"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </motion.div>

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
        </motion.div>
      </div>

      {/* Floating ambient glow orb — reacts to cursor */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[100px] mix-blend-screen sm:h-[28rem] sm:w-[28rem] lg:h-[32rem] lg:w-[32rem] lg:blur-[120px]"
        aria-hidden
      />

      {/* Bottom gradient to lift meta strip — sits above the frame margin */}
      <div
        className="absolute inset-x-0 bottom-0 z-[5] h-40 pointer-events-none sm:h-48 lg:h-56"
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
          <div className="grid grid-cols-4 gap-px bg-white/10">
            {metaItems.map((m, i) => {
              const baseClass =
                "group relative overflow-hidden bg-ink-900/60 px-1.5 py-2 sm:px-4 sm:py-4 flex flex-col justify-center gap-0.5 sm:gap-1 transition-all duration-300 hover:bg-ink-800/70";

              const inner = (
                <>
                  {/* hover glow sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative flex items-center gap-1 text-[8px] sm:gap-1.5 sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.22em] text-amber-300/70 font-bold">
                    <StatIcon name={m.icon} />
                    <span className="truncate">{m.label}</span>
                  </span>
                  <span
                    title={m.value}
                    className="relative truncate text-[11px] sm:text-lg text-amber-300 font-black tracking-tight group-hover:text-amber-200 transition-colors"
                  >
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
function iconFor(label: string): "bed" | "calendar" | "mountain" | "leaf" {
  if (/room|capacit|bed/i.test(label)) return "bed";
  if (/check|date|night/i.test(label)) return "calendar";
  if (/altitude|elevat|sea|height/i.test(label)) return "mountain";
  return "leaf";
}

function StatIcon({ name }: { name: "pin" | "bed" | "calendar" | "mountain" | "leaf" }) {
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
    case "mountain":
      return (
        <svg {...common} className="shrink-0">
          <path d="M3 20h18L14.5 6l-4 8-2-3L3 20z" />
          <path d="M13 20l-2.5-4.5" />
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
