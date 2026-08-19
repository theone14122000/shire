"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  MapPin,
  Navigation,
} from "lucide-react";
import type { ActivitiesContent } from "@/lib/activities-content";

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
              <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
                {content.atProperty.heading}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-[1.9] text-emerald-950/66 sm:text-lg lg:justify-self-end">
              {content.atProperty.description}
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 grid gap-x-12 gap-y-7 border-t border-emerald-900/10 pt-10 lg:mt-16 lg:grid-cols-2"
          >
            {content.propertyCards.map((activity, index) => (
              <motion.div
                key={`${activity.title}-${index}`}
                variants={fadeUp}
                className="flex gap-5"
              >
                <span className="font-display text-2xl font-semibold text-gold-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="border-b border-emerald-900/10 pb-6">
                  <h3 className="font-display text-xl font-semibold text-emerald-950">
                    {activity.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.8] text-emerald-950/66 sm:text-base">
                    {activity.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-5"
          >
            {content.propertyCards.map((activity, index) => {
              return (
                <motion.article
                  key={`${activity.title}-${index}`}
                  variants={fadeUp}
                  className="group flex h-full flex-col overflow-hidden border border-emerald-900/10 bg-white shadow-[0_14px_40px_rgba(3,45,32,0.07)]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="font-display text-base font-semibold leading-snug text-emerald-950 sm:text-lg">
                      {activity.title}
                    </h3>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#003E33] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <span className="luxe-kicker text-gold-400">{content.nearby.kicker}</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-cream-50 sm:text-5xl">
                {content.nearby.heading}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-[1.9] text-cream-100/62 sm:text-lg lg:justify-self-end">
              {content.nearby.description}
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          >
            {content.destinations.map((place, index) => (
              <motion.article
                key={`${place.name}-${index}`}
                variants={fadeUp}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-[0_14px_40px_rgba(3,45,32,0.07)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute right-4 top-4 bg-emerald-950/72 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cream-50 backdrop-blur">
                    {place.distance}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                    <Navigation size={13} strokeWidth={2} />
                    {place.travelTime}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-emerald-950">
                    {place.name}
                  </h3>
                  {place.note && (
                    <span className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-950/55">
                      <MapPin size={13} strokeWidth={1.8} />
                      {place.note}
                    </span>
                  )}
                  <p className="mt-3 flex-1 text-sm leading-[1.8] text-emerald-950/66">
                    {place.highlight}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
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
          <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.08] text-emerald-950 sm:text-5xl">
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
