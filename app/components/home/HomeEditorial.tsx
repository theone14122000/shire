"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowUpRight,
  ChefHat,
  Flame,
  Gamepad2,
  MapPin,
  Mountain,
  PawPrint,
  Trees,
  Tv,
  Wifi,
} from "lucide-react";
import { brand, brandIntro } from "@/lib/content";
import { RoomsCarousel } from "./RoomsCarousel";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const AMENITIES = [
  {
    title: "Pet-Friendly",
    note: "charges apply",
    href: "/pet-policy",
    icon: PawPrint,
    image: "/gallery/lawn-with-outdoor-seating-1.jpg",
  },
  {
    title: "In-House Kitchen",
    note: "9am - 9pm",
    href: "/kitchen",
    icon: ChefHat,
    image: "/gallery/dining-area.jpg",
  },
  {
    title: "BBQ & Bonfire",
    note: "on order",
    href: "/activities",
    icon: Flame,
    image: "/gallery/bonfire.jpg",
  },
  {
    title: "Recreation Floor",
    note: "TT, Carrom & Board Games",
    href: "/activities",
    icon: Gamepad2,
    image: "/gallery/recreational-hall.jpg",
  },
  {
    title: "TV Viewing Lounge",
    note: "65-inch LED Smart TV",
    href: "/activities",
    icon: Tv,
    image: "/gallery/tv-lounge.jpg",
  },
  {
    title: "Free Private Parking",
    note: "drive-in property",
    href: "/faq",
    icon: MapPin,
    image: "/gallery/ground-floor-lobby.jpg",
  },
  {
    title: "Hi-Speed WiFi",
    note: "",
    href: "/faq",
    icon: Wifi,
    image: "/gallery/common-seating-first-floor.jpg",
  },
  {
    title: "Outdoor Lawn Seating",
    note: "",
    href: "/activities",
    icon: Trees,
    image: "/gallery/surrounded-by-greenery.jpg",
  },
] as const;

const GALLERY_FRAMES = [
  { title: "Common Balcony with Swing", src: "/gallery/common-balcony-with-swing.jpg" },
  { title: "The Enchanting Winter Views", src: "/gallery/enchanting-winter-views.jpg" },
  { title: "Dining Area", src: "/gallery/dining-area.jpg" },
  { title: "Mesmerizing Views", src: "/gallery/mesmerizing-views.jpg" },
] as const;

export function HomeEditorial({ content }: { content?: Record<string, any> }) {
  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const t = (section: string, field: string, fallback: string) =>
    content?.[section]?.[field]?.toString().trim()
      ? content[section][field].toString()
      : fallback;

  return (
    <div className="relative overflow-hidden bg-[#f7f1e6] text-emerald-950">
      <section
        ref={storyRef}
        id="story"
        className="relative border-b border-emerald-900/10 px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
              {t("editorial", "kicker", "Our Story")}
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
              {t("editorial", "heading", brandIntro.heading)}
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-8 max-w-[68ch] space-y-5 text-base leading-[1.9] text-emerald-950/68 sm:text-lg">
              {t("editorial", "body", brandIntro.body).split("\n\n").map((paragraph: string) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 border-t border-emerald-900/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-xl font-semibold italic text-emerald-900">
                {t("editorial", "signature", brandIntro.signature)}
              </p>
              <Link href="/gallery" className="luxe-link">
                View the property
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative ml-auto aspect-[4/5] max-w-[620px] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/brand-lifestyle.jpg"
                alt="The Himalayan Shire property"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-7 left-0 max-w-[18rem] border border-emerald-900/10 bg-[#fffaf0]/92 p-5 shadow-[0_22px_70px_rgba(3,45,32,0.16)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">
                {brand.parent}
              </p>
              <p className="mt-3 text-sm leading-[1.7] text-emerald-950/70">
                {t("editorial", "shortPitch", brand.shortPitch)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="rooms" className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
          >
            <div>
              <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
                {t("rooms", "kicker", "Accommodations")}
              </motion.span>
              <motion.h2 variants={fadeUp} className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
                {t("rooms", "heading", "Rooms named after the trees around the property.")}
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="max-w-2xl text-base leading-[1.9] text-emerald-950/65 sm:text-lg lg:justify-self-end">
              {t("rooms", "description", "We have lovingly prepared seven rooms, each with its own uniqueness - named after the tree species that surround our property.")}
            </motion.p>
          </motion.div>

          <RoomsCarousel />
        </div>
      </section>

      <section id="amenities" className="bg-emerald-950 px-5 py-20 text-cream-50 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75 }}
              className="lg:sticky lg:top-28"
            >
              <span className="luxe-kicker text-gold-400">{t("amenities", "kicker", "Amenities")}</span>
              <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-cream-50 sm:text-5xl lg:text-6xl">
                {t("amenities", "heading", "Comforts arranged as part of the stay.")}
              </h2>
              <p className="mt-7 max-w-[54ch] text-base leading-[1.9] text-cream-100/62 sm:text-lg">
                {t("amenities", "description", "The property is built for slow days: warmth, food, quiet corners, common spaces, and practical comforts that make mountain travel feel easy.")}
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {AMENITIES.map((item, index) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <Link
                    href={item.href}
                    className={`group relative block min-h-[300px] overflow-hidden ${index === 1 || index === 6 ? "sm:translate-y-10" : ""}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 38vw"
                      className="object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/38 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="flex h-11 w-11 items-center justify-center border border-gold-400/35 bg-emerald-950/50 text-gold-300 backdrop-blur">
                        <item.icon size={19} strokeWidth={1.6} />
                      </span>
                      <h3 className="mt-5 font-display text-2xl font-semibold text-cream-50">
                        {item.title}
                      </h3>
                      {item.note && (
                        <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-cream-100/52">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="grid bg-[#fffaf0] lg:grid-cols-2">
        <div className="relative min-h-[430px] overflow-hidden lg:min-h-[720px]">
          <Image
            src="/images/setting-view.jpg"
            alt="Mountain view from The Himalayan Shire"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-2xl"
          >
            <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
              {t("setting", "kicker", "The Setting")}
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-emerald-950 sm:text-5xl">
              {t("setting", "heading", "A serene, beautiful countryside surrounded by apple orchards.")}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-7 text-base leading-[1.9] text-emerald-950/66 sm:text-lg">
              {t("setting", "description", "A serene, beautiful countryside location - surrounded by apple orchards and tall pine trees, with an unparallelled view of the Kinnaur Kailash range.")}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href={t("setting", "ctaHref", "/activities")} className="luxe-button">
                {t("setting", "ctaLabel", "Explore activities")}
              </Link>
              <Link href={t("setting", "cta2Href", "/kitchen")} className="luxe-button luxe-button-ghost">
                {t("setting", "cta2Label", "Our kitchen")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="luxe-kicker text-gold-700">{t("gallery", "kicker", "Gallery")}</span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
                {t("gallery", "heading", "A visual walk through the property.")}
              </h2>
            </div>
            <Link href="/gallery" className="luxe-link lg:justify-self-end">
              Open gallery
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </Link>
          </div>

          <div className="mt-12 grid auto-rows-[220px] gap-4 sm:auto-rows-[280px] lg:grid-cols-6 lg:auto-rows-[190px]">
            {GALLERY_FRAMES.map((frame, index) => (
              <Link
                key={frame.src}
                href="/gallery"
                className={`group relative overflow-hidden ${index === 0 ? "lg:col-span-3 lg:row-span-3" : index === 1 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-3 lg:row-span-1"}`}
              >
                <Image
                  src={frame.src}
                  alt={frame.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-5 left-5 max-w-[80%] font-display text-xl font-semibold text-cream-50">
                  {frame.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="relative bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-4xl">
          <Mountain className="mx-auto text-gold-400" size={26} strokeWidth={1.4} />
          <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl lg:text-6xl">
            {t("bookCta", "heading", "A quiet room, a warm meal, and a view worth the journey.")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.85] text-cream-100/62 sm:text-lg">
            {t("bookCta", "description", "Tell us when you are coming and how many of you there are. We will reply with availability and a simple plan for your stay.")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={t("bookCta", "ctaHref", brand.whatsapp)} target="_blank" rel="noreferrer" className="luxe-button">
              {t("bookCta", "ctaLabel", "Check availability")}
            </a>
            <Link href={t("bookCta", "cta2Href", "/contact")} className="luxe-button luxe-button-dark">
              {t("bookCta", "cta2Label", "Contact the shire")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
