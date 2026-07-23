"use client";

import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

/* ------------------------------------------------------------------ */
/*  Google Maps Redirect                                               */
/* ------------------------------------------------------------------ */
const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

/* ------------------------------------------------------------------ */
/*  Sun rays — 12 alternating long / short (PRESERVED EXACTLY)         */
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
/*  Motion variants                                                      */
/* ------------------------------------------------------------------ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ================================================================== */
export default function ContactPage() {
  const pageRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const glowLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const glowRightY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen isolate overflow-hidden bg-[#052e23] font-sans text-white selection:bg-amber-300/30 selection:text-amber-100"
    >
      {/* ============================================================ */}
      {/*  SUN ANIMATION — PRESERVED EXACTLY (pure CSS keyframes)       */}
      {/* ============================================================ */}
      <style>{`
        @keyframes sunDrift {
          0%   { transform: translate3d(0,0,0); }
          20%  { transform: translate3d(24px,-28px,0); }
          45%  { transform: translate3d(-20px,-10px,0); }
          70%  { transform: translate3d(16px,22px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @keyframes sunSpin  { to { transform: rotate(360deg); } }
        @keyframes sunPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes sunGlow  { 0%,100% { opacity:.8; transform:scale(1); } 50% { opacity:1; transform:scale(1.12); } }
        .sun-drift     { animation: sunDrift 11s ease-in-out infinite; will-change: transform; }
        .sun-drift-rev { animation: sunDrift 15s ease-in-out infinite reverse; will-change: transform; }
        .sun-spin      { transform-origin: center; animation: sunSpin 38s linear infinite; }
        .sun-pulse     { transform-origin: center; animation: sunPulse 3.6s ease-in-out infinite; }
        .sun-glow      { transform-origin: center; animation: sunGlow 4.5s ease-in-out infinite; }
      `}</style>

      {/* Premium emerald depth — radial light pools */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 85% 5%, rgba(251,191,36,0.14) 0%, transparent 55%), radial-gradient(55% 45% at 10% 20%, rgba(16,185,129,0.22) 0%, transparent 60%), radial-gradient(90% 70% at 50% 110%, rgba(4,120,87,0.28) 0%, transparent 65%)",
        }}
      />
      {/* Fine grain for tactile premium finish */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <MotionConfig reducedMotion="user">
        <SiteNav />

        {/* Scroll-progress hairline */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-black/20">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* ===================== Contact Content ===================== */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          {/* Parallax glows */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-amber-300/20 blur-[120px]"
            style={reduce ? undefined : { y: glowLeftY }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-400/25 blur-[130px]"
            style={reduce ? undefined : { y: glowRightY }}
          />

          {/* ---- SUN (top-right) — CSS drift wrapper (PRESERVED) ---- */}
          <div
            aria-hidden
            className="sun-drift pointer-events-none absolute right-6 top-24 z-0 h-28 w-28 sm:right-12 sm:top-28 sm:h-40 sm:w-40 lg:right-[9%] lg:top-28 lg:h-52 lg:w-52"
          >
            <SunMark />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-12 text-center sm:mb-16"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                <span className="h-px w-6 bg-amber-400/70" aria-hidden />
                Connect
                <span className="h-px w-6 bg-amber-400/70" aria-hidden />
              </span>
              <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Get in{" "}
                <span className="text-amber-400">Touch</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-emerald-100/70 sm:text-lg">
                Planning your Himalayan escape? We're here to help you craft 
                a stay that feels exactly like home in the mountains.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <ContactCard
                icon="location"
                label="Location"
                value="Dehna Road, near Talayi Village, Fagu, Himachal Pradesh 171209"
                delay={0}
              />
              <ContactCard
                icon="mail"
                label="Gmail"
                value="himalayanshire@gmail.com"
                delay={0.1}
                isEmail
              />
              <ContactCard
                icon="phone"
                label="Phone Number"
                value="+91 81698 98066, +91 95184 18833"
                delay={0.2}
                isPhone
              />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-12 flex justify-center"
            >
              <Link
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-amber-400 px-8 py-4 text-sm font-bold tracking-wide text-ink-900 shadow-[0_12px_35px_rgba(251,191,36,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 sm:px-10 sm:py-5 sm:text-base"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="relative">Click to Reach Us</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </MotionConfig>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}

/* ================================================================== */
/*  Contact Card Component                                             */
/* ================================================================== */
function ContactCard({
  icon,
  label,
  value,
  delay,
  isEmail = false,
  isPhone = false,
}: {
  icon: "location" | "mail" | "phone";
  label: string;
  value: string;
  delay: number;
  isEmail?: boolean;
  isPhone?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center shadow-sm shadow-emerald-950/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.07]"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-emerald-800/40 text-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        {icon === "location" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        )}
        {icon === "mail" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        )}
        {icon === "phone" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        )}
      </div>
      <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">{label}</h3>
      {isEmail ? (
        <a
          href={`mailto:${value}`}
          className="text-sm font-medium text-emerald-100/90 underline decoration-emerald-500/50 underline-offset-2 transition-colors hover:text-amber-200"
        >
          {value}
        </a>
      ) : isPhone ? (
        <a
          href={`tel:${value.replace(/\s/g, "")}`}
          className="text-sm font-medium text-emerald-100/90 underline decoration-emerald-500/50 underline-offset-2 transition-colors hover:text-amber-200"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm font-medium text-emerald-100/90">{value}</p>
      )}
      {/* Hover accent bar */}
      <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-amber-400 transition-all duration-500 group-hover:w-1/2" />
    </motion.div>
  );
}

/* ================================================================== */
/*  SunMark — PRESERVED (halo + spinning rays + pulsing core)          */
/* ================================================================== */
function SunMark() {
  return (
    <div className="relative h-full w-full">
      <div
        className="sun-glow absolute inset-0 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,224,138,0.75) 0%, rgba(245,200,66,0.45) 45%, rgba(245,200,66,0) 72%)",
        }}
      />

      <svg
        className="sun-spin absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
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
      </svg>

      <svg
        className="sun-pulse absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <defs>
          <radialGradient id="sunGradContact" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="45%" stopColor="#F5C842" />
            <stop offset="100%" stopColor="#E8A317" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="50" fill="url(#sunGradContact)" />
        <circle cx="86" cy="84" r="16" fill="rgba(255,255,255,0.45)" />
      </svg>
    </div>
  );
}