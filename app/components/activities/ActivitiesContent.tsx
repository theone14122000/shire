"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Flower2,
  Gamepad2,
  Home,
  MapPin,
  Navigation,
  TreePine,
  Tv2,
} from "lucide-react";
import type { ActivitiesContent } from "@/lib/activities-content";

const CARD_ICONS = [Home, Gamepad2, Tv2, Flower2, TreePine] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function ActivitiesContent({ content }: { content: ActivitiesContent }) {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src={content.hero.bgImage}
          alt={content.hero.bgAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/86 via-emerald-950/32 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-14 sm:px-8 sm:pb-20 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[1400px]"
          >
            <span className="luxe-kicker text-gold-300">{content.hero.kicker}</span>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-cream-50 sm:text-6xl lg:text-7xl">
              {content.hero.heading}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.85] text-cream-100/70 sm:text-lg">
              {content.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <span className="luxe-kicker text-gold-700">{content.atProperty.kicker}</span>
              <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-parchment sm:text-5xl">
                {content.atProperty.heading}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-[1.9] text-parchment/66 sm:text-lg lg:justify-self-end">
              {content.atProperty.description}
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-6"
          >
            {content.propertyCards.map((activity, index) => {
              const Icon = CARD_ICONS[index % CARD_ICONS.length];
              return (
                <motion.article
                  key={`${activity.title}-${index}`}
                  variants={fadeUp}
                  className={`group relative min-h-[430px] overflow-hidden ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
                >
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/42 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span className="flex h-12 w-12 items-center justify-center border border-gold-400/40 bg-emerald-950/55 text-gold-300 backdrop-blur">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-cream-50 sm:text-3xl">
                      {activity.title}
                    </h3>
                    <p className="mt-4 max-w-[42ch] text-sm leading-[1.8] text-cream-100/68 sm:text-base">
                      {activity.body}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <span className="luxe-kicker text-gold-700">{content.nearby.kicker}</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
                {content.nearby.heading}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-[1.9] text-emerald-950/66 sm:text-lg lg:justify-self-end">
              {content.nearby.description}
            </p>
          </div>

          <div className="mt-14 space-y-7 lg:mt-20">
            {content.destinations.slice(0, 4).map((place, index) => (
              <motion.article
                key={`${place.name}-${index}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="grid overflow-hidden border-y border-emerald-900/12 py-7 lg:grid-cols-2 lg:gap-10"
              >
                <div className={`relative min-h-[320px] overflow-hidden lg:min-h-[470px] ${index % 2 ? "lg:order-2" : ""}`}>
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute right-5 top-5 bg-emerald-950/72 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cream-50 backdrop-blur">
                    {place.distance}
                  </div>
                </div>
                <div className="flex flex-col justify-center py-8 lg:px-8">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-700">
                    <Navigation size={13} strokeWidth={2} />
                    {place.travelTime}
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-semibold text-emerald-950 sm:text-4xl">
                    {place.name}
                  </h3>
                  {place.note && (
                    <span className="mt-3 flex items-center gap-2 text-sm text-emerald-950/55">
                      <MapPin size={14} strokeWidth={1.8} />
                      {place.note}
                    </span>
                  )}
                  <p className="mt-6 max-w-[50ch] text-base leading-[1.85] text-emerald-950/66">
                    {place.highlight}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-950/55">
                    <span className="border border-emerald-900/15 px-3 py-2">Best: {place.bestTime}</span>
                    <span className="border border-emerald-900/15 px-3 py-2">{place.distance}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {content.destinations.slice(4).map((place) => (
              <article key={place.name} className="group border-t border-emerald-900/15 pt-5">
                <div className="relative mb-4 aspect-[16/10] overflow-hidden">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-emerald-950">
                  {place.name}
                </h3>
                <p className="mt-2 text-sm leading-[1.7] text-emerald-950/62">
                  {place.highlight}
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700">
                  {place.travelTime} / {place.distance}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-20 text-cream-50 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]">
            <Image
              src={content.trails.image}
              alt={content.trails.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="luxe-kicker text-gold-400">{content.trails.kicker}</span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl">
              {content.trails.heading}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-[1.85] text-cream-100/62 sm:text-lg">
              {content.trails.description}
            </p>
            <a href={content.trails.blogUrl} target="_blank" rel="noreferrer" className="luxe-button mt-9">
              Read the Blog
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 text-center sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <Compass className="mx-auto text-gold-700" size={28} strokeWidth={1.4} />
          <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.08] text-parchment sm:text-5xl">
            {content.finale.heading}
          </h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="https://letsbook.me/booking/thehimalayanshire?checkin=2026-08-04&checkout=2026-08-05&adults=2&children=0" className="luxe-button">
              Book Your Stay
            </Link>
            <Link href="/gallery" className="luxe-button luxe-button-ghost">
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}