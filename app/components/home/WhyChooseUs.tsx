"use client";

import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  animate,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";

/* ------------------------------------------------------------------ */
/*  Section chrome                                                     */
/* ------------------------------------------------------------------ */
const SECTION = {
  id: "amenities",
  eyebrow: "Amenities",
  heading: "Comforts & conveniences, already sorted.",
  intro:
    "From pet‑friendly rooms to bonfire nights on the lawn — a quick look at everything included during your stay at the shire.",
} as const;

/* ------------------------------------------------------------------ */
/*  Amenity data (unchanged)                                           */
/* ------------------------------------------------------------------ */
type IconName =
  | "pet"
  | "heater"
  | "hotwater"
  | "kitchen"
  | "bonfire"
  | "lawn"
  | "recreation"
  | "games"
  | "tv"
  | "wifi"
  | "parking"
  | "driver";

type Amenity = {
  id: string;
  title: string;
  icon: IconName;
  href?: string;
  highlight?: boolean;
  cta?: string;
};

const AMENITIES: Amenity[] = [
  { id: "pet", title: "PET-FRIENDLY (CHARGES APPLY)", icon: "pet", href: "/pet-policy", highlight: true, cta: "View Policy" },
  { id: "heater", title: "ELECTRIC HEATERS", icon: "heater" },
  { id: "hotwater", title: "24/7 HOT WATER", icon: "hotwater" },
  { id: "kitchen", title: "IN-HOUSE KITCHEN SERVING FROM 9AM-9PM", icon: "kitchen" },
  { id: "bonfire", title: "BARBEQUE AND BON FIRE AVAILABLE ON ORDER", icon: "bonfire" },
  { id: "lawn", title: "OUTDOOR SEATING AREA WITH LAWN", icon: "lawn" },
  { id: "recreation", title: "AN ENTIRE FLOOR DEDICATED TO RECREATIONAL ACTIVITIES AND CHILLING", icon: "recreation" },
  { id: "games", title: "TT TABLE, CARROM, BOARD GAMES", icon: "games" },
  { id: "tv", title: "TV VIEWING LOUNGE", icon: "tv" },
  { id: "wifi", title: "HI SPEED WIFI", icon: "wifi" },
  { id: "parking", title: "FREE PRIVATE PARKING", icon: "parking" },
  { id: "driver", title: "DRIVER ACCOMMODATION- RS. 500 PER NIGHT PER PERSON", icon: "driver" },
];

const MID = Math.ceil(AMENITIES.length / 2);
const COLUMN_A = AMENITIES.slice(0, MID);
const COLUMN_B = AMENITIES.slice(MID);

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ================================================================== */
export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked parallax for the background glows
  const glow1Y = useTransform(scrollYProgress, [0, 1], ["-12%", "14%"]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], ["14%", "-12%"]);
  const glow3X = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id={SECTION.id}
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#e9f7ee] py-16 sm:py-20 lg:py-28"
    >
      {/* Scroll progress hairline pinned to the top of the section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-emerald-900/5">
        <motion.span
          className="block h-full origin-left bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* Faint dotted texture for craft */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(6,78,59,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Parallax glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-amber-200/30 blur-[110px]"
        style={{ y: glow1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-300/25 blur-[120px]"
        style={{ y: glow2Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-white/40 blur-[100px]"
        style={{ x: glow3X }}
      />

      <MotionConfig reducedMotion="user">
        <Container>
          <div className="relative z-10">
            {/* ---------------- Heading ---------------- */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-600">
                  <span className="h-px w-6 bg-amber-400" aria-hidden />
                  {SECTION.eyebrow}
                </span>

                <h2 className="relative mt-3 inline-block text-3xl font-black leading-[1.08] tracking-tight text-emerald-950 [text-wrap:balance] sm:text-4xl lg:text-5xl">
                  {SECTION.heading}
                  {/* kinetic underline draws in on view */}
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-amber-400 to-emerald-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                </h2>

                <p className="mt-5 text-sm leading-relaxed text-emerald-900/70 sm:text-base">
                  {SECTION.intro}
                </p>
              </div>

              {/* Animated count-up stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="flex shrink-0 items-center gap-4 self-start rounded-2xl border border-emerald-200/70 bg-white/70 px-5 py-4 shadow-sm backdrop-blur sm:self-auto"
              >
                <span className="font-display text-4xl font-black leading-none text-emerald-800 tabular-nums sm:text-5xl">
                  <CountUp to={AMENITIES.length} />
                </span>
                <span className="flex flex-col text-[11px] font-bold uppercase leading-tight tracking-wider text-emerald-700/80">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    comforts
                  </span>
                  all included
                </span>
              </motion.div>
            </motion.div>

            {/* ---------------- Two‑column ruled list ---------------- */}
            <div className="grid grid-cols-1 gap-x-14 lg:grid-cols-2">
              <AmenityList items={COLUMN_A} startIndex={0} />
              <AmenityList
                items={COLUMN_B}
                startIndex={MID}
                className="border-t border-emerald-900/10 lg:border-t-0"
              />
            </div>
          </div>
        </Container>
      </MotionConfig>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: .25; } }
        .animate-blink { animation: blink 1.5s ease-in-out infinite; }
        @keyframes shimmer {
          0%   { transform: translateX(-130%) skewX(-18deg); }
          60%,100% { transform: translateX(260%) skewX(-18deg); }
        }
        .shimmer::after {
          content: "";
          position: absolute;
          top: 0; left: 0; height: 100%; width: 45%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent);
          animation: shimmer 3.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-blink, .shimmer::after { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ================================================================== */
/*  One list column — editorial ruled rows                             */
/* ================================================================== */
function AmenityList({
  items,
  startIndex,
  className = "",
}: {
  items: Amenity[];
  startIndex: number;
  className?: string;
}) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className={`divide-y divide-emerald-900/10 ${className}`}
    >
      {items.map((a, i) => {
        const hl = !!a.highlight;
        return (
          <motion.li
            key={a.id}
            variants={item}
            className="group relative -mx-3 flex items-start gap-4 overflow-hidden rounded-xl px-3 py-4 transition-colors duration-300 sm:-mx-4 sm:px-4"
          >
            {/* Hover sweep tint */}
            <span
              aria-hidden
              className={
                "pointer-events-none absolute inset-0 origin-left scale-x-0 rounded-xl transition-transform duration-500 ease-out group-hover:scale-x-100 " +
                (hl ? "bg-amber-100/50" : "bg-emerald-900/[0.035]")
              }
            />

            {/* Shimmer only on the highlighted (pet) row */}
            {hl && <span aria-hidden className="shimmer pointer-events-none absolute inset-0 overflow-hidden rounded-xl" />}

            {/* Editorial index */}
            <span
              aria-hidden
              className="relative z-10 w-6 shrink-0 pt-2 text-right font-display text-xs font-bold tabular-nums text-emerald-900/25 transition-colors duration-300 group-hover:text-amber-500"
            >
              {String(startIndex + i + 1).padStart(2, "0")}
            </span>

            {/* Icon marker — magnetic on hover, live ping ring on highlight */}
            <motion.span
              aria-hidden
              whileHover={{ scale: 1.14, rotate: 8 }}
              transition={{ type: "spring", stiffness: 380, damping: 14 }}
              className={
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 transition-colors duration-300 " +
                (hl
                  ? "bg-amber-100 text-amber-600 ring-amber-300"
                  : "bg-[#f1e9d2] text-[#d4a017] ring-[#e8d9a8] group-hover:bg-[#e8d9a8]")
              }
            >
              {hl && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full ring-2 ring-amber-400"
                  animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <AmenityIcon type={a.icon} />
            </motion.span>

            {/* Title + optional CTA */}
            <div className="relative z-10 min-w-0 flex-1 pt-1.5">
              <p
                className={
                  "text-[13px] font-bold uppercase leading-snug tracking-wide transition-colors duration-300 sm:text-sm " +
                  (hl ? "text-amber-700" : "text-emerald-900 group-hover:text-emerald-700")
                }
              >
                {a.title}
              </p>

              {hl && a.href && (
                <Link
                  href={a.href}
                  className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-600 transition-colors hover:text-amber-800"
                >
                  {/* the blinking element now lives here as a tasteful live dot */}
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-amber-500" />
                  {a.cta}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  >
                    <path d="M1 7h12M8 2l5 5-5 5" />
                  </svg>
                </Link>
              )}
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

/* ================================================================== */
/*  Count-up number (reduced-motion safe)                              */
/* ================================================================== */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useMotionValueEvent(mv, "change", (v) => setVal(Math.round(v)));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(mv, to, { duration: 1.1, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduce, to, mv]);

  return <span ref={ref}>{val}</span>;
}

/* ================================================================== */
/*  Icons — unchanged, matched line-art                                */
/* ================================================================== */
function AmenityIcon({ type }: { type: IconName }) {
  const p = {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "pet":
      return (
        <svg {...p}>
          <path d="M12 18c2.2 0 4-1.3 4-3 0-1.1-.7-2-2-2-.6 0-1 .3-1.3.8-.3-.5-.7-.8-1.3-.8-1.3 0-2 .9-2 2 0 1.7 1.8 3 4 3z" />
          <circle cx="7.5" cy="10" r="1.4" />
          <circle cx="16.5" cy="10" r="1.4" />
          <circle cx="10" cy="7" r="1.2" />
          <circle cx="14" cy="7" r="1.2" />
        </svg>
      );
    case "heater":
      return (
        <svg {...p}>
          <rect x="5" y="5" width="14" height="11" rx="1.5" />
          <path d="M9 5v11M12 5v11M15 5v11" />
          <path d="M8 16v3M16 16v3" />
        </svg>
      );
    case "hotwater":
      return (
        <svg {...p}>
          <path d="M15 4a2 2 0 0 1 2 2v8a2 2 0 1 1-4 0V6a2 2 0 0 1 2-2z" />
          <path d="M15 10v4" />
          <path d="M7 6c-1 1 1 2 0 3M7 11c-1 1 1 2 0 3" />
        </svg>
      );
    case "kitchen":
      return (
        <svg {...p}>
          <path d="M5 11h14M7 11v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5" />
          <path d="M10 7v2M14 7v2" />
        </svg>
      );
    case "bonfire":
      return (
        <svg {...p}>
          <path d="M12 4c1.5 2.5-1 3.5 0 5.5 1 1.5 3 1 3 3.5a3 3 0 1 1-6 0c0-1.5 1-1.8 1.5-3" />
          <path d="M8 19h8" />
        </svg>
      );
    case "lawn":
      return (
        <svg {...p}>
          <path d="M5 12h14" />
          <path d="M6 12v4M18 12v4" />
          <path d="M6 12V9.5A1.5 1.5 0 0 1 7.5 8h9A1.5 1.5 0 0 1 18 9.5V12" />
          <path d="M4 16h16" />
        </svg>
      );
    case "recreation":
      return (
        <svg {...p}>
          <path d="M4 12v5M20 12v5" />
          <path d="M4 13a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
          <path d="M6 11V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
          <path d="M3 17h18" />
        </svg>
      );
    case "games":
      return (
        <svg {...p}>
          <rect x="5" y="5" width="14" height="14" rx="3" />
          <circle cx="9.5" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="9.5" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tv":
      return (
        <svg {...p}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M8 18v2M16 18v2" />
        </svg>
      );
    case "wifi":
      return (
        <svg {...p}>
          <path d="M5 12a7 7 0 0 1 14 0M8 15a4 4 0 0 1 8 0M11 18h2" />
        </svg>
      );
    case "parking":
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9" />
        </svg>
      );
    case "driver":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
        </svg>
      );
  }
}