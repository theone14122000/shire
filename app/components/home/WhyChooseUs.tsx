"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "../ui/Container";
import { fadeUp, stagger } from "../ui/Motion";

interface FeatureItem {
  icon: string;
  title: string;
  blink?: boolean;
  href?: string;
  note?: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: "paw",
    title: "Pet-Friendly",
    blink: true,
    href: "/pet-policy",
    note: "charges apply",
  },
  {
    icon: "thermometer",
    title: "Electric Heaters",
  },
  {
    icon: "droplets",
    title: "24/7 Hot Water",
  },
  {
    icon: "utensils",
    title: "In-House Kitchen",
    note: "9am — 9pm",
  },
  {
    icon: "flame",
    title: "BBQ & Bonfire",
    note: "on order",
  },
  {
    icon: "tree",
    title: "Outdoor Lawn Seating",
  },
  {
    icon: "gamepad",
    title: "Recreation Floor",
  },
  {
    icon: "dices",
    title: "TT, Carrom & Board Games",
  },
  {
    icon: "tv",
    title: "TV Viewing Lounge",
  },
  {
    icon: "wifi",
    title: "Hi-Speed WiFi",
  },
  {
    icon: "parking",
    title: "Free Private Parking",
  },
  {
    icon: "bed",
    title: "Driver Accommodation",
    note: "₹500/night",
  },
];

function FeatureSvg({ icon }: { icon: string }) {
  const cls = "w-6 h-6";
  switch (icon) {
    case "paw":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="7" r="2.5"/><circle cx="12" cy="4" r="2.5"/><path d="M4.5 16c0-3 2.5-5 7.5-5s7.5 2 7.5 5-2.5 6-7.5 6-7.5-3-7.5-6z"/></svg>);
    case "thermometer":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/><circle cx="11.5" cy="18.5" r="2.5"/></svg>);
    case "droplets":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2s7 8.5 7 13a7 7 0 11-14 0c0-4.5 7-13 7-13z"/></svg>);
    case "utensils":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>);
    case "flame":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>);
    case "tree":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8"/><path d="M5 12h14"/><path d="M12 2L4 12h16L12 2z"/></svg>);
    case "gamepad":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="14" r="1" fill="currentColor" stroke="none"/></svg>);
    case "dices":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="9" height="9" rx="1.5"/><circle cx="5" cy="5" r="0.8" fill="currentColor" stroke="none"/><circle cx="8" cy="8" r="0.8" fill="currentColor" stroke="none"/><rect x="13" y="13" width="9" height="9" rx="1.5"/><circle cx="16" cy="16" r="0.8" fill="currentColor" stroke="none"/><circle cx="19" cy="19" r="0.8" fill="currentColor" stroke="none"/></svg>);
    case "tv":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="13" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>);
    case "wifi":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114 0"/><path d="M8.5 16.05a6 6 0 017 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></svg>);
    case "parking":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 8h3a2.5 2.5 0 010 5H9V8zm0 5v4"/></svg>);
    case "bed":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 012 2v10"/><path d="M2 17h20"/><path d="M6 8V6a2 2 0 012-2h3a2 2 0 012 2v2"/></svg>);
    default:
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>);
  }
}

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-frost-50 py-20 sm:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-pine-200/30 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-gold-200/15 blur-[120px]" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow inline-flex items-center gap-3 text-pine-500">
            <span className="h-px w-8 bg-pine-400" />
            Why The Shire
          </span>
          <h2 className="mt-3 h-section text-pine-950">
            Everything included in your stay
          </h2>
          <p className="mt-4 body-lg">
            Every comfort, thoughtfully arranged — so your time in the
            mountains is restful, warm, and easy.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {FEATURES.map((feature) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-pine-200 bg-white text-pine-700 shadow-sm transition-all duration-300 group-hover:border-gold-400/50 group-hover:bg-gold-50 group-hover:text-gold-700 group-hover:shadow-md sm:h-14 sm:w-14">
                  <FeatureSvg icon={feature.icon} />
                </span>
                <div className="mt-3 min-w-0">
                  <h3 className="font-display text-sm font-bold text-pine-950 leading-snug sm:text-base">
                    {feature.title}
                  </h3>
                  {feature.note && (
                    <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-pine-500 sm:text-[11px]">
                      {feature.note}
                    </span>
                  )}
                </div>
              </>
            );

            const cardClasses =
              "group relative flex flex-col items-center rounded-2xl border-2 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:p-6";

            if (feature.blink && feature.href) {
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className={`${cardClasses} col-span-full sm:col-span-1 lg:col-span-1 animate-blink-border cursor-pointer bg-gold-50/50 hover:bg-gold-100/60`}
                >
                  <Link href={feature.href} className="flex flex-col items-center w-full">
                    {inner}
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white sm:text-[10px]">
                      Learn More
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 1l6 6-6 6"/></svg>
                    </span>
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className={`${cardClasses} border-pine-200/50 bg-white hover:border-gold-300/50`}
              >
                {inner}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
