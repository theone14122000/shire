"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRef } from "react";
import {
  ArrowUpRight,
  BedDouble,
  ChefHat,
  Droplets,
  Flame,
  Gamepad2,
  Heater,
  Mountain,
  PawPrint,
  Sparkles,
  SquareParking,
  Trees,
  Tv,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { brand, brandIntro, ELFSIGHT_GOOGLE_REVIEWS_ID } from "@/lib/content";
import { InstagramFeed } from "./InstagramFeed";
import { RoomsCarousel } from "./RoomsCarousel";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

type AmenityItem = {
  title: string;
  note: string;
  href?: string;
  icon: LucideIcon;
};

const AMENITY_ITEMS: AmenityItem[] = [
  {
    title: "Pet-Friendly",
    note: "charges apply",
    href: "/pet-policy",
    icon: PawPrint,
  },
  {
    title: "Electric Heaters",
    note: "",
    icon: Heater,
  },
  {
    title: "24/7 Hot Water",
    note: "",
    icon: Droplets,
  },
  {
    title: "In-House Kitchen",
    note: "serving from 9am - 9pm",
    href: "/kitchen",
    icon: ChefHat,
  },
  {
    title: "Barbeque & Bonfire",
    note: "available on order",
    href: "/activities",
    icon: Flame,
  },
  {
    title: "Outdoor Seating with Lawn",
    note: "",
    href: "/activities",
    icon: Trees,
  },
  {
    title: "Recreation Floor",
    note: "entire floor for activities & chilling",
    href: "/activities",
    icon: Sparkles,
  },
  {
    title: "TT, Carrom & Board Games",
    note: "",
    href: "/activities",
    icon: Gamepad2,
  },
  {
    title: "TV Viewing Lounge",
    note: "",
    href: "/activities",
    icon: Tv,
  },
  {
    title: "Hi-Speed WiFi",
    note: "",
    href: "/faq",
    icon: Wifi,
  },
  {
    title: "Free Private Parking",
    note: "",
    href: "/faq",
    icon: SquareParking,
  },
  {
    title: "Driver Accommodation",
    note: "Rs. 500 per night per person",
    icon: BedDouble,
  },
];

const GALLERY_FRAMES = [
  { title: "Common Balcony with Swing", src: "/gallery/common-balcony-with-swing.jpg" },
  { title: "The Enchanting Winter Views", src: "/gallery/enchanting-winter-views.jpg" },
  { title: "Dining Area", src: "/gallery/dining-area.jpg" },
  { title: "Mesmerizing Views", src: "/gallery/mesmerizing-views.jpg" },
] as const;

const POLAROID_ROTATIONS = [-3.5, 2.5, -2, 3.5];

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
              <Link href="/faq" className="luxe-link">
                Know more about the property
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
              <p className="text-sm leading-[1.7] text-emerald-950/70">
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

      <section id="instagram" className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
              Instagram
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
              Moments from the shire.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-[1.9] text-emerald-950/65 sm:text-lg">
              Follow @thehimalayanshire for quiet corners, snowy mornings, and the view that never gets old.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 max-w-[1100px] rounded-[1.75rem] border border-emerald-900/10 bg-white/60 p-3 sm:p-5"
          >
            <InstagramFeed />
          </motion.div>
        </div>
      </section>

      <section id="amenities" className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75 }}
              className="lg:sticky lg:top-28"
            >
              <span className="luxe-kicker text-gold-700">{t("amenities", "kicker", "Amenities")}</span>
              <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
                {t("amenities", "heading", "Comforts arranged as part of the stay.")}
              </h2>
              <p className="mt-7 max-w-[54ch] text-base leading-[1.9] text-emerald-950/65 sm:text-lg">
                {t("amenities", "description", "The property is built for slow days: warmth, food, quiet corners, common spaces, and practical comforts that make mountain travel feel easy.")}
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="grid gap-x-8 gap-y-3 sm:grid-cols-2"
            >
              {AMENITY_ITEMS.map((item) => {
                const content = (
                  <div className="group flex items-center gap-4 border-b border-emerald-900/10 py-5 transition-colors duration-300">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold-600/30 bg-white/80 text-gold-700 transition-colors duration-300 group-hover:border-gold-600/60 group-hover:text-gold-700">
                      <item.icon size={19} strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xl font-semibold leading-tight text-emerald-950">
                        {item.title}
                      </span>
                      {item.note && (
                        <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-950/50">
                          {item.note}
                        </span>
                      )}
                    </span>
                  </div>
                );
                return (
                  <motion.div key={item.title} variants={fadeUp}>
                    {item.href ? (
                      <Link href={item.href} className="block">
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </motion.div>
                );
              })}
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

          <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 lg:mt-20 lg:grid-cols-4 lg:gap-10">
            {GALLERY_FRAMES.map((frame, index) => (
              <motion.div
                key={frame.src}
                initial={{ opacity: 0, y: 34, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: POLAROID_ROTATIONS[index % POLAROID_ROTATIONS.length] }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                className={index % 2 === 1 ? "lg:mt-12" : "lg:mt-0"}
              >
                <Link
                  href="/gallery"
                  className="group block bg-cream-50 p-2 pb-2 shadow-[0_18px_50px_-18px_rgba(6,40,25,0.4)] transition-shadow duration-500 hover:shadow-[0_32px_70px_-20px_rgba(6,40,25,0.5)] sm:p-3 sm:pb-4"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-emerald-950">
                    <Image
                      src={frame.src}
                      alt={frame.title}
                      fill
                      sizes="(max-width: 640px) 31vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="px-1.5 pb-0.5 pt-3 text-center sm:px-2 sm:pb-1.5 sm:pt-5">
                    <span className="mx-auto mb-2 block h-px w-6 bg-gold-600/60 sm:mb-3 sm:w-10" />
                    <p className="font-display text-[13px] font-semibold leading-tight text-emerald-950 sm:text-xl sm:leading-snug lg:text-[1.35rem]">
                      {frame.title}
                    </p>
                    <p className="mt-1.5 text-[7px] font-bold uppercase tracking-[0.18em] text-gold-700 sm:mt-2 sm:text-[10px] sm:tracking-[0.28em]">
                      Himalayan Shire &middot; Fagu
                    </p>
                  </div>
                </Link>
              </motion.div>
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

      <section id="reviews" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
              Guest Reviews
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
              What our guests remember most.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-[1.9] text-emerald-950/65 sm:text-lg">
              Genuine experiences from people who have stayed at The Himalayan Shire.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 max-w-[1100px] rounded-[1.75rem] border border-emerald-900/10 bg-white/60 p-3 sm:p-5"
          >
            <div className={`elfsight-app-${ELFSIGHT_GOOGLE_REVIEWS_ID}`} data-elfsight-app-lazy />
          </motion.div>
        </div>
      </section>

      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </div>
  );
}
