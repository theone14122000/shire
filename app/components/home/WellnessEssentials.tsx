"use client";

import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Script from "next/script";
import { useRef } from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

/* ------------------------------------------------------------------ */
/*  Data — "In-Room Tea & Coffee" removed as requested                 */
/* ------------------------------------------------------------------ */
type EssentialItem = {
  id: string;
  title: string;
  caption: string;
  icon: string;
};

const ESSENTIALS: EssentialItem[] = [
  {
    id: "heaters",
    title: "Electric Heaters & Hot Water",
    caption: "Winter-ready rooms with reliable heating and 24-hour hot water.",
    icon: "heater",
  },
  {
    id: "wifi",
    title: "High-Speed Wi-Fi",
    caption: "Stay connected when you want to, disconnect when you don't.",
    icon: "wifi",
  },
  {
    id: "sound",
    title: "Sound System & TV",
    caption: "Bluetooth speakers, cable TV, and a curated list of mountain films.",
    icon: "tv",
  },
  {
    id: "parking",
    title: "Free Private Parking",
    caption: "Secure on-site parking for cars and small vehicles.",
    icon: "parking",
  },
  {
    id: "lounge",
    title: "Lounge & Library",
    caption: "A quiet television lounge with books, maps, and conversation.",
    icon: "lounge",
  },
];

const SECTION = {
  eyebrow: "Daily Essentials",
  heading: "Everything you need, already in the room.",
  intro:
    "A short list of the small things that make a stay feel effortless — from electric heaters in winter to fast Wi-Fi for when you need to stay connected.",
} as const;

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ================================================================== */
export function WellnessEssentials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glow1Y = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-8%"]);

  return (
    <>
      {/* ============================================================ */}
      {/* Daily Essentials — compact, icon-driven cards                 */}
      {/* ============================================================ */}
      <section
        id="essentials"
        ref={sectionRef}
        className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100/40 py-14 text-black sm:py-16 lg:py-20"
      >
        {/* Parallax glows */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-200/25 blur-[100px]"
          style={{ y: glow1Y }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-green-200/30 blur-[100px]"
          style={{ y: glow2Y }}
        />

        <Container>
          <div className="relative z-10">
            {/* Heading row */}
            <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow={SECTION.eyebrow}
                  heading={SECTION.heading}
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="self-end text-sm font-medium leading-7 text-neutral-700 sm:text-base lg:col-span-5"
              >
                {SECTION.intro}
              </motion.p>
            </div>

            {/* Card grid — 5 items, 2+3 / 3+2 / 5 across */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
            >
              {ESSENTIALS.map((item, idx) => (
                <motion.article
                  key={item.id}
                  variants={card}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 360, damping: 18 }}
                  className="group relative flex gap-4 overflow-hidden rounded-2xl border border-emerald-200/80 bg-white p-4 shadow-sm transition-colors duration-400 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-900/8 sm:p-5"
                >
                  {/* Icon */}
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600"
                  >
                    <EssentialIcon type={item.icon} />
                  </span>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold leading-snug text-black sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-neutral-600 sm:text-sm">
                      {item.caption}
                    </p>
                  </div>

                  {/* Counter badge */}
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 text-[10px] font-bold tabular-nums text-emerald-900/15 transition-colors duration-300 group-hover:text-emerald-500"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* Google Reviews                                                */}
      {/* ============================================================ */}
      <section
        id="reviews"
        className="relative overflow-hidden border-y border-emerald-200 bg-green-100/70 py-14 text-black sm:py-16 lg:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl"
        />

        <Container>
          <div className="relative">
            {/* Reviews heading */}
            <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
              >
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-800">
                  Guest Reviews
                </p>
                <h2 className="font-display text-2xl font-black leading-tight tracking-tight text-black sm:text-3xl lg:text-4xl">
                  What our guests remember most.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-neutral-700">
                  Read genuine experiences from guests who have stayed at The Himalayan Shire.
                </p>
              </motion.div>
            </div>

            {/* Elfsight Google Reviews widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-emerald-200 bg-white p-3 shadow-lg shadow-emerald-950/8 sm:p-5 lg:p-6"
            >
              <div
                className="elfsight-app-b9e7c232-8950-4e65-9497-1821a28950e6"
                data-elfsight-app-lazy
              />
            </motion.div>
          </div>
        </Container>
      </section>

      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </>
  );
}

/* ================================================================== */
/*  Icons — contextual, thin line-art matching each essential          */
/* ================================================================== */
function EssentialIcon({ type }: { type: string }) {
  const p = {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "heater":
      return (
        <svg {...p}>
          <rect x="5" y="5" width="14" height="11" rx="1.5" />
          <path d="M9 5v11M12 5v11M15 5v11" />
          <path d="M8 16v3M16 16v3" />
          <path d="M10 2c-.5.8.5 1.4 0 2.2M14 2c-.5.8.5 1.4 0 2.2" />
        </svg>
      );
    case "wifi":
      return (
        <svg {...p}>
          <path d="M2 9.5a11 11 0 0 1 20 0" />
          <path d="M5 12.5a7 7 0 0 1 14 0" />
          <path d="M8.5 15.5a3 3 0 0 1 7 0" />
          <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tv":
      return (
        <svg {...p}>
          <rect x="2" y="5" width="20" height="13" rx="2" />
          <path d="M8 18v2M16 18v2M6 20h12" />
          <path d="M15 11l-4 2.5V8.5l4 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "parking":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9" strokeWidth="2" />
        </svg>
      );
    case "lounge":
      return (
        <svg {...p}>
          <path d="M4 15v3M20 15v3" />
          <path d="M4 14a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
          <path d="M6 12V9.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V12" />
          <path d="M3 18h18" />
          <path d="M8 7V5M16 7V5" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 3" />
        </svg>
      );
  }
}  