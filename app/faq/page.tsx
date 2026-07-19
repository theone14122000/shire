"use client";

import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useRef, useId, useState } from "react";
import { SiteNav } from "../components/SiteNav";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

/* ------------------------------------------------------------------ */
/*  FAQ data                                                            */
/* ------------------------------------------------------------------ */
type Faq = {
  question: string;
  answer: React.ReactNode;
};

const FAQS: Faq[] = [
  {
    question: "How many rooms do you have and can we book just 1 room?",
    answer: (
      <>
        We have a total of seven bedrooms — all with attached washrooms. You
        can book any number of rooms, from just one room to all seven rooms.
        All the information about the seven rooms is mentioned in the{" "}
        <Link href="/#rooms" className="font-bold text-emerald-800 underline decoration-emerald-400 underline-offset-2 hover:text-emerald-900">
          rooms section
        </Link>{" "}
        of the website.
      </>
    ),
  },
  {
    question: "Is it a drive-in property with private parking?",
    answer: (
      <>
        Yes, all cars, big and small, and even tempo travellers can easily
        reach the property. The road is metalled. We can park up to 10 SUVs.
        Access may temporarily be disturbed in case of heavy snowfall — so if
        you are planning to travel during Jan–Feb, do ask us about the
        current situation.
      </>
    ),
  },
  {
    question: "Where is Fagu?",
    answer: (
      <>
        Fagu is located 19 kms ahead of Shimla, 5 kms ahead of Kufri, on the
        main highway going towards Theog / Narkanda. Our property is 2 kms
        on the link road from Fagu.{" "}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-emerald-800 underline decoration-emerald-400 underline-offset-2 hover:text-emerald-900"
        >
          See the exact location on Google Maps
        </a>
        .
      </>
    ),
  },
  {
    question: "What is the fooding situation at the property?",
    answer: (
      <>
        We serve an à la carte menu from 9am to 9pm. We have a variety of
        dishes and an experienced chef to prepare them for you. We do
        require food orders well in advance (preferably 2 hours' preparation
        time) as we make everything fresh.
      </>
    ),
  },
  {
    question: "Can the guests access the kitchen?",
    answer: (
      <>
        As a general rule, guests cannot access the kitchen. In limited
        cases — for example, where mothers need to prepare food for infants
        — we do allow kitchen access. We provide a kettle, microwave, and a
        hot plate outside of the kitchen in case guests need to reheat food
        or prepare coffee/tea.
      </>
    ),
  },
  {
    question: "What is there to do around the property / what activities?",
    answer: (
      <>
        Please read{" "}
        <a
          href="https://www.thehimalayanshire.com/activities/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-emerald-800 underline decoration-emerald-400 underline-offset-2 hover:text-emerald-900"
        >
          this blog
        </a>{" "}
        about activities in and around The Himalayan Shire.
      </>
    ),
  },
  {
    question: "Do you have an outdoor sitting area?",
    answer: (
      <>
        Yes, we have a big lawn with outdoor sofa seating. We can light
        bonfires and barbeque on request. We also have a terrace balcony on
        the 2nd floor with a 2-seater swing and additional seating for 5–6
        people. This balcony is common for all the guests and has an amazing
        view on all sides.
      </>
    ),
  },
  {
    question: "Do you provide housekeeping service?",
    answer: (
      <>
        Yes. Rooms are cleaned every day between 11am and 5pm. We change the
        bedsheet every alternate day. In case guests request a bedsheet
        change earlier, we charge a cleaning fee of Rs. 500.
      </>
    ),
  },
  {
    question: "Is it a pet-friendly property?",
    answer: (
      <>
        In certain cases we do allow pets. Pets weighing up to 6 kgs are
        mostly welcomed, unless they are untrained or might be a hazard to
        other guests or staff. Larger breeds are also allowed if you are
        booking the entire villa, or you come on a day with fewer guests
        around. Please ask us for our complete pet policy before booking —
        guests have to sign the pet policy before check-in. We charge a Rs.
        500 per day pet fee.
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Sun rays — 12 alternating long / short (same geometry as Blog)     */
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
/*  Motion                                                             */
/* ------------------------------------------------------------------ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ================================================================== */
export default function FaqPage() {
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
      className="min-h-screen bg-gradient-to-b from-[#c2e7c9] via-[#aedcb6] to-[#cdebd2] font-sans text-black"
    >
      {/* ============================================================ */}
      {/*  SUN ANIMATION — pure CSS keyframes, matches the blog page.   */}
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

      <MotionConfig reducedMotion="user">
        <SiteNav />

        {/* Scroll-progress hairline */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-emerald-950/10">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-amber-400 via-emerald-500 to-emerald-700"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* ===================== Hero + FAQ List ===================== */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          {/* Parallax glows */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-amber-200/40 blur-[120px]"
            style={reduce ? undefined : { y: glowLeftY }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-400/30 blur-[130px]"
            style={reduce ? undefined : { y: glowRightY }}
          />

          {/* ---- SUN (top-right) — CSS drift wrapper ---- */}
          <div
            aria-hidden
            className="sun-drift pointer-events-none absolute right-6 top-24 z-0 h-28 w-28 sm:right-12 sm:top-28 sm:h-40 sm:w-40 lg:right-[9%] lg:top-28 lg:h-52 lg:w-52"
          >
            <SunMark />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-12 text-center sm:mb-16"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-emerald-800">
                <span className="h-px w-6 bg-emerald-600" aria-hidden />
                FAQs
                <span className="h-px w-6 bg-emerald-600" aria-hidden />
              </span>
              <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-black sm:text-5xl lg:text-6xl">
                Frequently Asked Questions
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-emerald-950/75 sm:text-lg">
                Everything guests usually ask before booking a stay at The
                Himalayan Shire, Fagu.
              </p>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="flex flex-col gap-4"
            >
              {FAQS.map((faq, idx) => (
                <motion.div key={faq.question} variants={fadeUp}>
                  <FaqAccordionItem index={idx} faq={faq} />
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-emerald-300/60 bg-white/70 p-8 text-center shadow-sm backdrop-blur sm:mt-16"
            >
              <h2 className="font-display text-xl font-black text-black sm:text-2xl">
                Still have a question?
              </h2>
              <p className="max-w-md text-sm text-neutral-700 sm:text-base">
                Reach out and we'll get back to you with everything you need
                to plan your stay.
              </p>
              <Link
                href="/#top"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-7 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-700/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </MotionConfig>
    </main>
  );
}

/* ================================================================== */
/*  FAQ Accordion Item — smooth height/opacity reveal via AnimatePresence */
/* ================================================================== */
function FaqAccordionItem({ index, faq }: { index: number; faq: Faq }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-300/60 bg-white shadow-sm shadow-emerald-900/5 transition-colors duration-300 hover:border-emerald-400">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-base font-black leading-snug text-black sm:text-lg">
            {faq.question}
          </span>
        </span>

        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          width="16"
          height="16"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-emerald-700"
          aria-hidden
        >
          <path d="M3 5l4 4 4-4" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-16 text-sm leading-relaxed text-neutral-700 sm:px-6 sm:pb-6 sm:pl-[3.75rem] sm:text-base">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  SunMark — halo + spinning rays + pulsing core, ALL via CSS classes */
/* ================================================================== */
function SunMark() {
  const gid = useId().replace(/:/g, "");

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
          <radialGradient id={gid} cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="45%" stopColor="#F5C842" />
            <stop offset="100%" stopColor="#E8A317" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="50" fill={`url(#${gid})`} />
        <circle cx="86" cy="84" r="16" fill="rgba(255,255,255,0.45)" />
      </svg>
    </div>
  );
}
