"use client";

import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Home,
  Gamepad2,
  Tv2,
  Flower2,
  TreePine,
  MapPin,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Compass,
  Mountain,
  Eye,
  Clock,
  Star,
  Navigation,
  Leaf,
  Sunrise,
  Wind,
} from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

const BLOG_URL =
  "https://traveltalesfromindia.in/a-small-hike-with-the-himalayan-shire/#google_vignette";

const ACTIVITIES = [
  {
    icon: "home" as const,
    title: "Space to Breathe",
    body: "Beyond your room, discover cozy common areas and quiet corners with panoramic views. Read in the carpeted attic, unwind on the balcony swing, or stroll the lawn.",
  },
  {
    icon: "games" as const,
    title: "Indoor Fun",
    body: "Table Tennis, Carrom, board games, and playing cards. For quieter afternoons, explore our mini-library of books.",
  },
  {
    icon: "tv" as const,
    title: "The TV Lounge",
    body: "Sink into lounge sofas on the top floor and enjoy movies on our 65-inch LED Smart TV.",
  },
  {
    icon: "yoga" as const,
    title: "The Lawn",
    body: "A sprawling lawn with Himalayan views — ideal for morning yoga or meditation. A small slide keeps the little ones entertained.",
  },
  {
    icon: "trail" as const,
    title: "Nature Trails & Orchard Walks",
    body: "Step into apple orchards and deodar forests right outside. Stroll through orchards, meet locals, or explore jungle trails steps from the property. Bonfire and barbeque available on request.",
  },
] as const;

const ICONS: Record<(typeof ACTIVITIES)[number]["icon"], typeof Home> = {
  home: Home,
  games: Gamepad2,
  tv: Tv2,
  yoga: Flower2,
  trail: TreePine,
};

const SIGHTSEEING = [
  { name: "Tungesh Peak Hike", distance: "6 km", note: "Cheog, Shimla", image: "/images/sightseeing/tungesh-peak.jpg", travelTime: "20 min drive", highlight: "Panoramic ridgeline trek through pine forests", bestTime: "Year-round" },
  { name: "Deshu Peak / Fagu Top", distance: "3 km", note: null, image: "/images/sightseeing/deshu-peak.jpg", travelTime: "10 min drive", highlight: "Sunrise views over the Kinnaur range", bestTime: "Oct — Mar" },
  { name: "Kufri Adventure Park", distance: "5.6 km", note: null, image: "/images/sightseeing/kufri-park.jpg", travelTime: "15 min drive", highlight: "Horse riding, zip-lining, and mountain tubing", bestTime: "Apr — Jun" },
  { name: "Mahasu Peak, Kufri", distance: "6 km", note: null, image: "/images/sightseeing/mahasu-peak.jpg", travelTime: "18 min drive", highlight: "Highest point in Kufri with 360° valley views", bestTime: "Oct — Feb" },
  { name: "Rashtrapati Niwas, Mashobra", distance: "12 km", note: null, image: "/images/sightseeing/rashtrapati-niwas.jpg", travelTime: "30 min drive", highlight: "Colonial-era retreat surrounded by ancient cedars", bestTime: "Year-round" },
  { name: "Jakhu Temple", distance: "20 km", note: "Shimla", image: "/images/sightseeing/jakhu-temple.jpg", travelTime: "50 min drive", highlight: "Hilltop Hanuman temple with sweeping Shimla views", bestTime: "Year-round" },
  { name: "Shimla Mall Road", distance: "20 km", note: null, image: "/images/sightseeing/mall-road.jpg", travelTime: "50 min drive", highlight: "Heritage promenade with colonial architecture", bestTime: "Mar — Dec" },
  { name: "Narkanda — Hatu Peak", distance: "45 km", note: null, image: "/images/sightseeing/hatu-peak.jpg", travelTime: "1.5 hr drive", highlight: "Alpine meadows and snow-dusted forest trails", bestTime: "Oct — May" },
  { name: "Tata Pani", distance: "62 km", note: null, image: "/images/sightseeing/tata-pani.jpg", travelTime: "2 hr drive", highlight: "Natural hot springs along the Sutlej river", bestTime: "Oct — May" },
];

const FEATURED_SIGHTSEEING = SIGHTSEEING.slice(0, 4);
const COMPACT_SIGHTSEEING = SIGHTSEEING.slice(4);

const GALLERY_IMAGES = Array.from({ length: 10 }, (_, i) => `/images/activity/activity-${i + 1}.jpg`);

const GALLERY_LABELS = [
  "Morning Lawn", "Orchard Trail", "Bonfire Nights", "Mountain View", "Quiet Corners",
  "Common Room", "Sunset Hour", "Garden Walk", "Forest Path", "Golden Hour",
];

const WHY_EXPLORE = [
  {
    icon: Compass,
    title: "Unmatched Location",
    body: "At 7,500 ft in the Kinnaur highlands, The Himalayan Shire sits between apple orchards and ancient forests — close enough to Shimla for day trips, remote enough for true stillness.",
  },
  {
    icon: Eye,
    title: "Curated Experiences",
    body: "From guided orchard walks to bonfire evenings under the stars, every moment is designed to connect you with the landscape, the culture, and the quiet rhythm of mountain life.",
  },
  {
    icon: Star,
    title: "Award-Winning Hospitality",
    body: "Rated 4.7 across Google, Tripadvisor, and Booking.com — our guests return for the warmth, the food, and the feeling that The Himalayan Shire is a home away from home.",
  },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};

export default function ActivitiesPage() {
  return (
    <main className="relative min-h-screen bg-frost-50 font-sans text-pine-950 selection:bg-gold-200/30">
      <div aria-hidden className="pointer-events-none fixed inset-0" style={{
        background: "radial-gradient(50% 40% at 20% 10%, rgba(16,185,129,0.06) 0%, transparent 55%), radial-gradient(45% 35% at 85% 20%, rgba(251,191,36,0.05) 0%, transparent 50%)",
      }} />

      <SiteNav />

      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/activity/activity-2.jpg"
            alt="The Himalayan Shire property surrounded by pine forests"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-emerald-900/30 to-emerald-900/5" />

        <div className="absolute inset-x-0 bottom-0 z-10 pb-20 sm:pb-28 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/70"
              >
                <span className="h-px w-10 bg-white/30" />
                Experiences
              </motion.span>
              <h1 className="mt-8 font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Every Moment,
                <br />
                <span className="text-gold-400/90">Curated</span>
              </h1>
              <p className="mt-8 max-w-lg text-base font-medium leading-[1.8] text-white/60 sm:text-lg lg:text-xl">
                From quiet corners on the property to peaks in the Himalayas — there is always something waiting for you.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-11 w-7 rounded-full border-[1.5px] border-white/15 p-1.5"
          >
            <motion.div className="mx-auto h-2.5 w-[3px] rounded-full bg-white/30" />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden py-28 sm:py-36 lg:py-44">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/30 blur-[140px]" />
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <motion.div variants={fadeUp} className="mx-auto mb-10 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-emerald-300" />
              <Leaf size={16} strokeWidth={1.5} className="text-emerald-600/40" />
              <span className="h-px w-12 bg-emerald-300" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-black leading-snug tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Life at The Shire is not about
              <br className="hidden sm:block" />
              <span className="text-gold-600/80"> filling every hour.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-2xl text-base font-medium leading-[1.9] text-emerald-800/60 sm:text-lg lg:text-xl"
            >
              It is about choosing how you spend your time — whether that means a morning
              yoga session on the lawn, an afternoon trail through apple orchards, or simply
              watching the clouds drift over the Kinnaur range from the balcony swing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-28 sm:pb-36 lg:pb-44">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-16 lg:mb-20"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-600">
              At the Property
            </span>
            <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl">
              Everything you need,
              <br />
              <span className="text-gold-600/80">without stepping out.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {ACTIVITIES.map((activity, i) => {
              const Icon = ICONS[activity.icon];
              return (
                <motion.div
                  key={activity.title}
                  variants={fadeUp}
                  className="group relative rounded-3xl border border-emerald-200/50 bg-cream-50 p-8 sm:p-10 transition-all duration-500 hover:border-gold-300/40 hover:bg-gold-50/30"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-700 transition-all duration-500 group-hover:border-gold-300/40 group-hover:text-gold-600">
                    <Icon size={22} strokeWidth={1.4} aria-hidden />
                  </span>
                  <h3 className="mt-7 font-display text-xl font-bold tracking-tight text-emerald-950 sm:text-2xl">
                    {activity.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.85] text-emerald-800/60 sm:text-base">
                    {activity.body}
                  </p>
                  <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-[3rem] bg-gold-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 grid grid-cols-3 gap-6 border-t border-emerald-200/50 pt-10 sm:mt-20"
          >
            {[
              { value: "5", label: "Activities" },
              { value: '65"', label: "Smart TV" },
              { value: "∞", label: "Mountain Views" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="block font-display text-3xl font-black text-gold-600 sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700/40 sm:text-[11px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-emerald-200/50 py-28 sm:py-36 lg:py-44">
        <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-emerald-100/30 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-20 max-w-2xl lg:mb-24"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-600">
              Nearby
            </span>
            <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl">
              Destinations
            </h2>
            <p className="mt-5 text-base leading-[1.9] text-emerald-800/60 sm:text-lg">
              Curated recommendations from our concierge — each destination
              chosen for its character, beauty, and ease of access from the property.
            </p>
          </motion.div>

          <div className="space-y-8 lg:space-y-0">
            {FEATURED_SIGHTSEEING.map((place, i) => {
              const isReversed = i % 2 !== 0;
              return (
                <div
                  key={place.name}
                  className={`grid grid-cols-1 items-stretch gap-0 overflow-hidden rounded-[2rem] border border-emerald-200/50 bg-cream-50 lg:grid-cols-2 lg:gap-0 ${i > 0 ? "lg:mt-10" : ""}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[440px] ${isReversed ? "lg:order-2" : ""}`}
                  >
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent lg:${isReversed ? "bg-gradient-to-r from-emerald-950/40 via-transparent to-transparent" : "bg-gradient-to-l from-emerald-950/40 via-transparent to-transparent"}`} />
                    <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-emerald-950/60 px-4 py-1.5 text-[11px] font-bold tracking-wide text-white/80 backdrop-blur-md">
                      {place.distance}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex flex-col justify-center p-8 sm:p-10 lg:p-14 ${isReversed ? "lg:order-1" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                        <Navigation size={13} strokeWidth={2.2} className="text-emerald-700" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700/50">
                        {place.travelTime}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-black tracking-tight text-emerald-950 sm:text-3xl lg:text-4xl">
                      {place.name}
                    </h3>
                    {place.note && (
                      <span className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700/50">
                        <MapPin size={11} strokeWidth={2.5} />
                        {place.note}
                      </span>
                    )}
                    <p className="mt-5 max-w-md text-sm leading-[1.85] text-emerald-800/60 sm:text-base">
                      {place.highlight}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/50 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-700/60">
                        <Sunrise size={11} strokeWidth={2} className="text-gold-600/60" />
                        Best: {place.bestTime}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/50 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-700/60">
                        <Mountain size={11} strokeWidth={2} className="text-gold-600/60" />
                        {place.distance}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
            {COMPACT_SIGHTSEEING.map((place, i) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-emerald-200/50 bg-cream-50 transition-all duration-500 hover:border-gold-300/40 hover:bg-gold-50/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-emerald-950/50 px-3 py-1 text-[10px] font-bold tracking-wide text-white/70 backdrop-blur-md">
                    {place.distance}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                      <Navigation size={10} strokeWidth={2.5} className="text-emerald-700" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700/40">
                      {place.travelTime}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-emerald-950 sm:text-xl">
                    {place.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.7] text-emerald-800/55">
                    {place.highlight}
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-700/50">
                      <Sunrise size={9} strokeWidth={2} className="text-gold-600/50" />
                      {place.bestTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-emerald-200/50 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center lg:mb-20"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-600">
              Why The Shire
            </span>
            <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl">
              Why explore with us
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12"
          >
            {WHY_EXPLORE.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-cream-50">
                  <item.icon size={24} strokeWidth={1.3} className="text-gold-600" />
                </div>
                <h3 className="mt-7 font-display text-xl font-bold tracking-tight text-emerald-950 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-[1.85] text-emerald-800/60 sm:text-base">
                  {item.body}
                </p>
                {i < WHY_EXPLORE.length - 1 && (
                  <div className="mt-8 h-px w-16 bg-emerald-200/50 mx-auto lg:hidden" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200/50">
            <div className="relative aspect-[21/9] sm:aspect-[3/1]">
              <Image
                src="/images/activity/activity-10.jpg"
                alt="Hiking trails near The Himalayan Shire"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 py-10 sm:px-12 lg:px-16">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="max-w-md font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    Love hiking &amp; exploring the outdoors?
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-200/60 sm:text-base">
                    Read about trails and nature around The Himalayan Shire.
                  </p>
                  <a
                    href={BLOG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-emerald-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
                  >
                    Read the Blog
                    <ArrowUpRight size={15} strokeWidth={2.4} />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-emerald-200/50 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-600">
              Gallery
            </span>
            <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">
              Moments from the Shire
            </h2>
          </motion.div>

          <AutoGallery images={GALLERY_IMAGES} />
        </div>
      </section>

      <section className="relative border-t border-emerald-200/50 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-600">
              Begin Your Stay
            </span>
            <h2 className="mt-6 font-display text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl xl:text-6xl">
              Your mountain escape
              <br />
              <span className="text-gold-600/80">awaits.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-[1.9] text-emerald-800/60 sm:text-lg">
              Whether it is a weekend of stillness or a week of exploration —
              The Himalayan Shire is ready to welcome you.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <a
                href="/#book"
                className="inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-emerald-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
              >
                Book Your Stay
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 px-7 py-4 text-sm font-bold text-emerald-700 transition-all duration-300 hover:border-gold-400 hover:text-gold-600"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function AutoGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visibleCount = useVisibleCount();
  const total = images.length;

  useEffect(() => {
    if (paused || lightboxIndex !== null) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = prev + direction;
        if (next >= total - 1) { setDirection(-1); return total - 1; }
        if (next <= 0) { setDirection(1); return 0; }
        return next;
      });
    }, 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, direction, total, lightboxIndex]);

  const closeLB = useCallback(() => setLightboxIndex(null), []);
  const prevLB = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length]);
  const nextLB = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)), [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowLeft") prevLB();
      if (e.key === "ArrowRight") nextLB();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightboxIndex, closeLB, prevLB, nextLB]);

  const gap = 12;

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            className="flex"
            style={{ gap }}
            animate={{ x: `-${active * (100 / visibleCount)}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {images.map((src, i) => {
              const label = GALLERY_LABELS[i % GALLERY_LABELS.length];
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View ${label}`}
                  className="group relative flex-shrink-0 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/50"
                  style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * gap / visibleCount}px)` }}
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={src}
                      alt={`${label} at The Himalayan Shire`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-xl backdrop-blur-md">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 10v4a1 1 0 001 1h4M15 10v4a1 1 0 01-1 1h-4M10 1h4a1 1 0 011 1v4M6 1H2a1 1 0 00-1 1v4" /></svg>
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {label}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setActive(i); setDirection(i > active ? 1 : -1); }}
                aria-label={`Go to image ${i + 1}`}
                className={`rounded-full transition-all duration-500 ${i === active ? "h-2 w-6 bg-gold-500" : "h-2 w-2 bg-emerald-200 hover:bg-emerald-300"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-cream-50 text-emerald-700 transition-all duration-300 hover:border-gold-400 hover:text-gold-600"
          >
            {paused ? <Play size={13} strokeWidth={2.5} /> : <Pause size={13} strokeWidth={2.5} />}
          </button>
        </div>

        <div className="mt-4 h-[1px] w-full overflow-hidden rounded-full bg-emerald-200/50">
          <motion.div
            className="h-full bg-gold-500/50"
            initial={{ width: "0%" }}
            animate={{ width: paused ? undefined : "100%" }}
            transition={{ duration: 4.5, ease: "linear", repeat: paused ? 0 : Infinity }}
            key={`${active}-${paused}`}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-5 gap-2 sm:grid-cols-10">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setActive(i); setDirection(i > active ? 1 : -1); }}
            className={`group relative aspect-[4/3] overflow-hidden rounded-lg transition-all duration-500 ${i === active ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-white" : "opacity-40 hover:opacity-70"}`}
          >
            <Image src={src} alt={GALLERY_LABELS[i % GALLERY_LABELS.length]} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeLB}
          >
            <button type="button" onClick={closeLB} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6">
              <X size={18} strokeWidth={2} />
            </button>
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white/70 backdrop-blur-md sm:left-6 sm:top-6">
              {lightboxIndex + 1} / {images.length}
            </div>
            <button type="button" onClick={(e) => { e.stopPropagation(); prevLB(); }} className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-6">
              <ChevronLeft size={22} strokeWidth={2} />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); nextLB(); }} className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6">
              <ChevronRight size={22} strokeWidth={2} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 h-[70vh] w-full max-w-5xl sm:h-[80vh]"
            >
              <Image src={images[lightboxIndex]} alt={`${GALLERY_LABELS[lightboxIndex % GALLERY_LABELS.length]} at The Himalayan Shire`} fill priority sizes="100vw" className="rounded-2xl object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) setCount(3);
      else if (w >= 640) setCount(2);
      else setCount(1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}
