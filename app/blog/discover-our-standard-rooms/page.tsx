"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiteNav } from "../../components/SiteNav";

export default function StandardRoomsPage() {
  return (
    <main className="min-h-screen bg-[#f4faf5] font-sans text-black">
      <SiteNav />

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <Link href="/blog" className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition-colors hover:text-black">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1"><path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">Rooms</span>
          <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
            Discover the Charm of Our Standard Rooms at The Himalayan Shire
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span className="font-bold text-emerald-800">Rishabh Goel</span>
            <span>·</span>
            <span>Jul 30, 2024</span>
            <span>·</span>
            <span>4 min read</span>
          </div>
        </motion.div>

        {/* Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-200 via-green-100 to-emerald-300 shadow-lg"
        >
          <div className="relative flex aspect-[16/9] items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              </span>
              <p className="text-sm font-bold text-emerald-900">Image Placeholder</p>
              <p className="text-xs text-emerald-800/60">Add your image to /public/images/</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 space-y-5 text-base leading-8 text-neutral-800 sm:text-lg">
          <p>When it comes to a peaceful retreat amidst the breathtaking beauty of the Himalayas, every detail at The Himalayan Shire has been thoughtfully crafted to provide an unforgettable stay. Our Standard Rooms – MOHRU and TOSH – offer the perfect blend of comfort and elegance, making them an ideal choice for travelers seeking simplicity without compromising on quality.</p>
        </motion.div>

        {/* MOHRU */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-12 border-l-4 border-emerald-500 pl-6"
        >
          <h2 className="font-display text-xl font-black text-black sm:text-2xl">MOHRU – Standard Room: A Cozy Haven</h2>
          <p className="mt-3 text-base leading-8 text-neutral-800 sm:text-lg">
            The MOHRU Standard Room is designed with a cozy ambiance that welcomes you with open arms. Featuring warm, earthy tones and comfortable furnishings, this room is your sanctuary after a day of exploring the picturesque Himalayan landscapes. The well-appointed amenities ensure that you have everything you need to relax and recharge, including a plush bed, modern bathroom, and stunning views of the surrounding mountains.
          </p>
        </motion.div>

        {/* TOSH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 border-l-4 border-emerald-500 pl-6"
        >
          <h2 className="font-display text-xl font-black text-black sm:text-2xl">TOSH – Standard Room: Simple Elegance</h2>
          <p className="mt-3 text-base leading-8 text-neutral-800 sm:text-lg">
            Similarly, the TOSH Standard Room combines simplicity with sophistication. Its minimalist design is accentuated by tasteful decor and natural light, creating a serene environment perfect for unwinding. The room's strategic positioning offers beautiful vistas and a sense of tranquility that only the Himalayas can provide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-base leading-8 text-neutral-800 sm:text-lg"
        >
          <p>Whether you choose MOHRU or TOSH, our Standard Rooms promise a comfortable and memorable stay. Book your escape to The Himalayan Shire and experience the serene beauty and cozy charm of our Standard Rooms.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <Link href="/#rooms" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl">
            View All Rooms
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" /></svg>
          </Link>
        </motion.div>
      </article>
    </main>
  );
}