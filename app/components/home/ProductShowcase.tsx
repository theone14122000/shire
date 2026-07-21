"use client";

import { motion, MotionConfig, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { productShowcase } from "@/lib/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

/* ------------------------------------------------------------------ */
/*  Card data — kitchen card now uses its own dedicated hero image     */
/* ------------------------------------------------------------------ */
const CARDS = [
  {
    image: "/images/blog-best-time-fagu.jpg",
    alt: "Sunlit apple orchard walking trail near Fagu",
    href: "/blog/best-time-to-visit-fagu",
  },
  {
    image: "/images/kitchen-hero.jpg",
    alt: "The shire's in-house kitchen preparing a meal",
    href: "/kitchen",
  },
  {
    image: "/images/blog-why-fagu.jpg",
    alt: "Snow-covered Himalayan landscape near Shimla",
    href: "/blog/why-choose-fagu-for-your-next-holiday",
  },
];

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */
const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ================================================================== */
export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "14%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["10%", "-16%"]);

  const blocks = productShowcase.blocks;

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#eff9f1] py-14 text-black sm:py-18 lg:py-24"
    >
      {/* Scroll progress bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[2px] bg-emerald-950/5">
        <motion.span
          className="block h-full origin-left bg-gradient-to-r from-amber-400 via-emerald-500 to-emerald-700"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* Parallax glows — two now, drifting opposite directions */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-1/4 h-80 w-80 rounded-full bg-emerald-300/30 blur-[120px]"
        style={{ y: glowY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-amber-300/20 blur-[110px]"
        style={{ y: glowY2 }}
      />

      <MotionConfig reducedMotion="user">
        <Container>
          <div className="relative z-10">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-10 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-3xl">
                <SectionHeading
                  eyebrow={productShowcase.eyebrow}
                  heading={productShowcase.heading}
                />
                <motion.div
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                  className="mt-4 h-[3px] w-28 origin-left rounded-full bg-gradient-to-r from-amber-400 to-emerald-600"
                />
              </div>

              <Link
                href="/blog"
                className="group hidden shrink-0 items-center gap-2 self-start rounded-full border border-emerald-300 bg-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur transition-all hover:border-emerald-600 hover:bg-emerald-700 hover:text-white sm:inline-flex sm:self-auto"
              >
                View All Posts
                <ArrowUpRight
                  size={14}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            {/* Card Grid — asymmetric bento on large screens, first card featured */}
            <motion.div
              variants={grid}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[22rem] lg:gap-8"
            >
              {blocks.map((block, idx) => {
                const card = CARDS[idx] ?? { image: `/images/journal-${idx + 1}.jpg`, alt: block.title, href: "/blog" };
                const isFeatured = idx === 0;

                return (
                  <motion.div
                    key={block.title}
                    variants={cardVariant}
                    className={isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
                  >
                    <ShowcaseCard
                      href={card.href}
                      image={card.image}
                      alt={card.alt}
                      tag={block.tag}
                      title={block.title}
                      body={block.body}
                      cta={block.cta}
                      index={idx}
                      featured={isFeatured}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Mobile "View All" link */}
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-sm transition-all hover:border-emerald-600 hover:bg-emerald-700 hover:text-white"
              >
                View All Posts
                <ArrowUpRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </Container>
      </MotionConfig>
    </section>
  );
}

/* ================================================================== */
/*  Individual showcase card — tilt-on-hover, always-legible badges    */
/* ================================================================== */
function ShowcaseCard({
  href,
  image,
  alt,
  tag,
  title,
  body,
  cta,
  index,
  featured,
}: {
  href: string;
  image: string;
  alt: string;
  tag: string;
  title: string;
  body: string;
  cta: string;
  index: number;
  featured: boolean;
}) {
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-200/70 bg-white shadow-sm transition-shadow duration-500 group-hover:border-emerald-400 group-hover:shadow-xl group-hover:shadow-emerald-900/15"
      >
        {/* animated gradient ring on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            padding: 1,
            background: "linear-gradient(135deg, #fbbf24, #10b981, transparent 60%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[16/10] lg:h-full lg:aspect-auto" : "aspect-[16/10]"
          }`}
        >
          <CardImage src={image} alt={alt} label={title} priority={index === 0} />

          {/* Always-on base scrim for legibility — not just on hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Tag badge — solid dark pill, always legible regardless of image */}
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-900/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-beige-100 shadow-[0_4px_16px_rgba(0,0,0,0.25)] backdrop-blur-md">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_6px_1px_rgba(251,191,36,0.6)]" />
              {tag}
            </span>
          </div>

          {/* Index badge — permanently visible, higher contrast */}
          <div className="absolute bottom-3 right-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-ink-900/75 text-[11px] font-bold tabular-nums text-beige-100 shadow-[0_4px_16px_rgba(0,0,0,0.25)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Featured-only: title overlaid directly on the image for the big card */}
          {featured ? (
            <div className="absolute inset-x-0 bottom-0 hidden p-6 lg:block">
              <h3 className="font-display text-2xl font-black leading-snug text-beige-50 drop-shadow-md xl:text-3xl">
                {title}
              </h3>
            </div>
          ) : null}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          {/* On the featured card at lg+, title already shown on image, so hide it here to avoid duplication */}
          <h3
            className={`font-display text-lg font-black leading-snug text-black transition-colors duration-300 group-hover:text-emerald-800 sm:text-xl ${
              featured ? "lg:hidden" : ""
            }`}
          >
            {title}
          </h3>

          <p
            className={`flex-1 text-sm leading-relaxed text-neutral-600 ${
              featured ? "line-clamp-2 lg:line-clamp-3" : "line-clamp-3"
            }`}
          >
            {body}
          </p>

          {/* CTA row */}
          <div className="flex items-center justify-between pt-2">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition-colors group-hover:text-emerald-900">
              {cta}
              <ArrowUpRight
                size={15}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>

          {/* Animated accent bar */}
          <div className="mt-auto h-1 w-8 rounded-full bg-emerald-500 transition-all duration-500 group-hover:w-full" />
        </div>
      </motion.div>
    </Link>
  );
}

/* ================================================================== */
/*  Card image with graceful fallback                                  */
/* ================================================================== */
function CardImage({
  src,
  alt,
  label,
  priority = false,
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-200 via-green-100 to-emerald-300">
        <span className="max-w-[20ch] px-4 text-center text-xs font-bold text-emerald-900/70">
          {label}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setErrored(true)}
      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
    />
  );
}