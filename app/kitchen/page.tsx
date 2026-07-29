"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChefHat } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

const HIGHLIGHTS = [
  {
    title: "Local, Seasonal Produce",
    body: "Vegetables and herbs sourced from nearby Fagu farms whenever possible, so meals change gently with the season instead of running off a fixed menu.",
  },
  {
    title: "Himachali & North Indian Cooking",
    body: "Traditional recipes passed down through the kitchen team - comfort food made the way it is made at home, not hotel-style plating.",
  },
  {
    title: "Meals Timed Around You",
    body: "Breakfast, lunch, and dinner are cooked fresh per service rather than held on a buffet line, so what reaches your table is hot and just-made.",
  },
  {
    title: "Dietary Care",
    body: "Vegetarian, Jain, and other dietary preferences are accommodated - just let the team know a little ahead so the kitchen can plan properly.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export default function KitchenPage() {
  return (
    <main className="editorial-surface min-h-screen font-sans selection:bg-gold-200/30">
      <SiteNav />

      <section className="relative min-h-[76vh] overflow-hidden">
        <Image
          src="/images/kitchen-hero.jpg"
          alt="The Himalayan Shire's in-house kitchen"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/84 via-emerald-950/36 to-emerald-950/8" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-14 sm:px-8 sm:pb-20 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[1400px]"
          >
            <span className="luxe-kicker text-gold-300">Dining at The Shire</span>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-cream-50 sm:text-6xl lg:text-7xl">
              Our In-House Kitchen
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.85] text-cream-100/70 sm:text-lg">
              Cooked from scratch, with local produce, and served the way food should be - fresh, honest, and made for sharing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <span className="luxe-kicker text-gold-700">Chef&apos;s Philosophy</span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-parchment sm:text-5xl">
              Every meal at The Himalayan Shire is cooked in-house, from scratch.
            </h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
            className="space-y-8"
          >
            <motion.p variants={fadeUp} className="font-display text-2xl font-semibold leading-[1.45] text-parchment sm:text-3xl">
              Every meal at The Himalayan Shire is cooked in-house, from scratch, by a small kitchen team who treat guests the way they would treat family visiting for the weekend.
            </motion.p>
            <motion.p variants={fadeUp} className="max-w-[70ch] text-base leading-[1.9] text-parchment/66 sm:text-lg">
              Nothing is trucked in pre-made - what you are served is what was cooking in the kitchen an hour before it reached your table.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="luxe-kicker text-gold-700">What Makes It Different</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-parchment sm:text-5xl">
                The kitchen works on trust, not a clock.
              </h2>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              className="grid gap-x-9 gap-y-8 sm:grid-cols-2"
            >
              {HIGHLIGHTS.map((item, index) => (
                <motion.article key={item.title} variants={fadeUp} className="border-t border-emerald-900/15 pt-6">
                  <span className="font-display text-sm font-semibold text-gold-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-parchment">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.8] text-parchment/66">
                    {item.body}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="grid bg-emerald-950 text-cream-50 lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[720px]">
          <Image
            src="/gallery/dining-area.jpg"
            alt="Dining Area"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
          <div className="max-w-2xl">
            <ChefHat className="text-gold-400" size={28} strokeWidth={1.4} />
            <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl">
              Food that fits a mountain stay.
            </h2>
            <p className="mt-6 text-base leading-[1.85] text-cream-100/66 sm:text-lg">
              The kind of cooking that fits a quiet mountain stay rather than a hotel banquet hall. Meals are included as part of your stay - come hungry after a day on the trails around Fagu and Kufri.
            </p>
            <Link href="/#rooms" className="luxe-button mt-9">
              Check Rooms & Book
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
