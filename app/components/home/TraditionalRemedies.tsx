"use client";

import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Light text palette (tuned for dark emerald background)             */
/* ------------------------------------------------------------------ */
const TEXT = {
  heading: "#FFFFFF",
  body: "#E4F3DC",
  muted: "#BEE3B4",
  onChip: "#0a1f08",
  onButton: "#0a1f08",
} as const;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const SETTING_DATA = {
  eyebrow: "The Setting",
  heading: "A Serene Sanctuary Near Shimla",
  body: [
    "A serene, peaceful countryside location, surrounded by apple orchards on all sides, with an exceptionally beautiful view of the Himalayan range. You will hear nothing but the chirpings of the birds all day and can easily spot some rare and beautiful bird species hanging around our gardens and balcony.",
    "The sunrise view from our property is to die for. Sit outside in our lawn and enjoy some deliciously cooked meals prepared by our chef. Have the time of your life in our recreational space with TT table, carrom and plenty of board games or pick a book from our book shelf and enjoy quiet reading time on our double seater swing placed in our balcony. We also organise guided hiking tours for the more adventurous among you.",
  ],
  cta: { label: "View Our Gallery", href: "/gallery" },
  image: {
    src: "/images/setting-view.jpg",
    alt: "Sunrise view over apple orchards near Shimla",
  },
};

/* ------------------------------------------------------------------ */
/*  Sun rays — 12 rays, alternating long / short for a classic sun     */
/* ------------------------------------------------------------------ */
const SUN_RAYS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  const inner = 60;
  const outer = i % 2 === 0 ? 92 : 76;
  return {
    x1: 100 + inner * Math.cos(angle),
    y1: 100 + inner * Math.sin(angle),
    x2: 100 + outer * Math.cos(angle),
    y2: 100 + outer * Math.sin(angle),
  };
});

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* ================================================================== */
export function TraditionalRemedies() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked parallax for the background glows
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["15%", "-10%"]);
  const blob3X = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="setting"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-32 bg-accent-emerald"
    >
      {/* ---- Animated decorative blobs with scroll-linked parallax ---- */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full blur-[120px]"
        style={{ y: blob1Y, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-[120px]"
        style={{ y: blob2Y, backgroundColor: "rgba(164, 206, 139, 0.18)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-[100px]"
        style={{ x: blob3X, backgroundColor: "rgba(255, 255, 255, 0.12)" }}
      />

      {/* Faint warm ring, bottom-left (cohesive with the sun palette) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[20%] left-[5%] hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="h-24 w-24 rounded-full border border-dashed opacity-30"
          style={{ borderColor: "rgba(245, 200, 66, 0.55)" }}
        />
      </motion.div>

      <Container>
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* ======================== */}
          {/* Image Side               */}
          {/* ======================== */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="order-2 lg:order-1 lg:col-span-6"
          >
            <div
              className="group relative overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:shadow-[0_32px_64px_rgba(0,0,0,0.35)]"
              style={{
                border: "6px solid rgba(255, 255, 255, 0.15)",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-square lg:aspect-[4/5]">
                {SETTING_DATA.image.src ? (
                  <Image
                    src={SETTING_DATA.image.src}
                    alt={SETTING_DATA.image.alt}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.10)" }}
                  >
                    <span className="italic" style={{ color: TEXT.muted }}>
                      Landscape View
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                <div className="absolute left-5 top-5">
                  <span
                    className="rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md"
                    style={{
                      color: TEXT.onChip,
                      backgroundColor: "rgba(255, 255, 255, 0.92)",
                      border: "1px solid rgba(255, 255, 255, 0.30)",
                    }}
                  >
                    Near Shimla, Himachal Pradesh
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ======================== */}
          {/* Content Side             */}
          {/* ======================== */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-6"
          >
            {/* Eyebrow — animated line expands */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <motion.span
                aria-hidden
                className="block h-px w-10 origin-left"
                style={{ backgroundColor: TEXT.heading }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
              <span
                className="text-[11px] font-extrabold uppercase tracking-[0.3em]"
                style={{ color: TEXT.muted }}
              >
                {SETTING_DATA.eyebrow}
              </span>
            </motion.div>

            {/* Heading — with animated SUN behind it */}
            <motion.div variants={fadeUp} className="relative">
              <SunMark
                ariaHidden
                className="pointer-events-none absolute -right-1 -top-12 h-28 w-28 sm:-right-4 sm:-top-14 sm:h-40 sm:w-40 lg:-right-6 lg:h-48 lg:w-48"
              />
              <h2
                className="relative font-display text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: TEXT.heading }}
              >
                {SETTING_DATA.heading}
              </h2>
            </motion.div>

            {/* Body */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-5 text-base font-semibold leading-relaxed sm:text-lg"
              style={{ color: TEXT.body }}
            >
              {SETTING_DATA.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Feature tags — glassy hover float effect */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5 pt-2">
              {["Bird Watching", "Sunrise Views", "Board Games", "Guided Hikes"].map(
                (tag) => (
                  <motion.span
                    key={tag}
                    className="cursor-default rounded-lg px-4 py-1.5 text-xs font-bold backdrop-blur-sm"
                    style={{
                      color: TEXT.heading,
                      backgroundColor: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                    whileHover={{
                      y: -4,
                      backgroundColor: "rgba(255,255,255,0.18)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {tag}
                  </motion.span>
                )
              )}
            </motion.div>

            {/* Gallery CTA */}
            <motion.div variants={fadeUp} className="pt-6">
              <Link
                href={SETTING_DATA.cta.href}
                className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold tracking-wide shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{ backgroundColor: "#F5C842", color: TEXT.onButton }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0bb2a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F5C842")
                }
              >
                {SETTING_DATA.cta.label}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  SunMark — glowing core (pulsing) + radiating rays (rotating)       */
/*  Sits behind the heading; purely decorative.                        */
/* ================================================================== */
function SunMark({
  className = "",
  ariaHidden = true,
}: {
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <div className={className} aria-hidden={ariaHidden}>
      <div className="relative h-full w-full">
        {/* Soft radial halo */}
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,224,138,0.65) 0%, rgba(245,200,66,0.40) 45%, rgba(245,200,66,0) 72%)",
          }}
        />

        {/* Rotating rays */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        >
          {SUN_RAYS.map((r, i) => (
            <line
              key={i}
              x1={r.x1}
              y1={r.y1}
              x2={r.x2}
              y2={r.y2}
              stroke="#E8A317"
              strokeWidth={6}
              strokeLinecap="round"
              opacity={0.85}
            />
          ))}
        </motion.svg>

        {/* Pulsing core */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <defs>
            <radialGradient id="sunCoreGrad" cx="42%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#FFF1B8" />
              <stop offset="45%" stopColor="#F5C842" />
              <stop offset="100%" stopColor="#E8A317" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="50" fill="url(#sunCoreGrad)" />
          {/* glossy highlight */}
          <circle cx="86" cy="84" r="16" fill="rgba(255,255,255,0.45)" />
        </motion.svg>
      </div>
    </div>
  );
}