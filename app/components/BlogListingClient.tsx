"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import type { BlogListItem } from "@/lib/blog-types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

export default function BlogListingClient({ blogs }: { blogs: BlogListItem[] }) {
  const featured = blogs.find((post) => post.featured) ?? blogs[0];
  const rest = blogs.filter((post) => post.slug !== featured?.slug);

  return (
    <main className="editorial-surface min-h-screen font-sans selection:bg-gold-200/30">
      <SiteNav />

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20"
        >
          <div>
            <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
              Blog
            </motion.span>
            <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-emerald-950 sm:text-6xl lg:text-7xl">
              Stories From The Shire
            </motion.h1>
          </div>
          <motion.p variants={fadeUp} className="max-w-2xl text-base leading-[1.9] text-emerald-950/66 sm:text-lg">
            Travel guides, behind-the-scenes stories, and practical tips for your Himalayan getaway near Shimla.
          </motion.p>
        </motion.div>
      </section>

      {featured && (
        <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-14 lg:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[1400px]"
          >
            <Link href={`/blog/${featured.slug}`} className="group grid border-y border-emerald-900/15 py-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:py-10">
              <div className="relative min-h-[360px] overflow-hidden lg:min-h-[580px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center py-8 lg:px-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-700">
                  {featured.tag} / {featured.readTime}
                </span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-emerald-950 sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-[58ch] text-base leading-[1.85] text-emerald-950/66">
                  {featured.excerpt}
                </p>
                <span className="luxe-link mt-8">
                  Read Article
                  <ArrowUpRight size={15} strokeWidth={1.8} />
                </span>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((post) => (
            <motion.article key={post.slug} variants={fadeUp} className="border-t border-emerald-900/15 pt-6">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                  />
                </div>
                <span className="mt-6 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                  {post.tag} / {post.readTime}
                </span>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-[1.18] text-emerald-950">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-[1.8] text-emerald-950/64">
                  {post.excerpt}
                </p>
                <span className="luxe-link mt-6">
                  Read Article
                  <ArrowUpRight size={15} strokeWidth={1.8} />
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}
