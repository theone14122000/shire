"use client";

import { motion, useScroll, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/lib/rooms";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "FAQ", href: "/#faq" },
  { label: "Rooms", href: "/#rooms", hasMenu: true },
  { label: "Activities", href: "/#amenities" },
  { label: "Gallery", href: "/#journal" },
  { label: "Blog", href: "/#journal" },
  { label: "Contact Us", href: "/#book" },
];

const navVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  },
};

export function SiteNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 60));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={`sticky top-0 z-50 transition-all duration-500 bg-white ${
        scrolled
          ? "border-b border-ink-900/10 shadow-[0_4px_20px_rgba(10,10,10,0.04)] h-16 sm:h-20"
          : "border-b border-transparent h-20 sm:h-24"
      }`}
    >
      {/* Replaced container-luxe with mx-auto max-w to remove horizontal padding */}
      <div className="mx-auto w-full max-w-[1400px] flex items-center justify-between h-full text-ink-900">
        
        {/* Left Side: Logo Only (Removed py-2 padding) */}
        <Link
          href="/"
          className="flex items-center group h-full"
          aria-label="Go to Home"
        >
          <Image
            src="/images/logo2.jpg" 
            alt="The Himalayan Shire Logo"
            width={408} 
            height={243}
            className={`w-auto object-contain transition-all duration-500 ${
              scrolled ? "h-9 sm:h-12" : "h-12 sm:h-16"
            }`}
            priority
          />
        </Link>

        {/* Right Side: Navigation + Book Now Button */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          
          {/* Desktop Nav Links */}
          <motion.nav
            aria-label="Primary"
            className="flex items-center gap-1"
            variants={navVariants}
            initial="hidden"
            animate="show"
          >
            {NAV_ITEMS.map((item) => 
              item.hasMenu ? (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDesktopDropdown(true)}
                  onMouseLeave={() => setDesktopDropdown(false)}
                >
                  <motion.button
                    variants={itemVariants}
                    className="relative text-[13px] font-bold tracking-wide text-ink-900 transition-colors duration-300 inline-flex items-center gap-1 group px-3 py-2 rounded-full hover:bg-ink-900/5"
                  >
                    {item.label}
                    <motion.svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                      animate={{ rotate: desktopDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </motion.button>

                  {/* Desktop Dropdown Menu */}
                  <AnimatePresence>
                    {desktopDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full right-0 pt-3 w-64"
                      >
                        <div className="bg-white border border-ink-900/10 rounded-xl shadow-[var(--shadow-lift)] overflow-hidden py-2">
                          {rooms.map((room) => (
                            <Link
                              key={room.id}
                              href={`/rooms/${room.slug}`}
                              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-ink-900 hover:bg-accent-mint transition-colors group"
                            >
                              <span className="h-2 w-2 rounded-full bg-ink-900/20 group-hover:bg-accent-leaf transition-colors" />
                              <div>
                                <span>{room.name}</span>
                                <span className="block text-[10px] uppercase tracking-widest text-ink-500 font-bold">{room.category}</span>
                              </div>
                            </Link>
                          ))}
                          <div className="border-t border-ink-900/10 mt-2 pt-2 px-4 pb-1">
                            <Link href="/#rooms" className="text-xs font-bold text-accent-emerald hover:text-ink-900 transition-colors tracking-wide">
                              View All Rooms →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={itemVariants} 
                  className="relative text-[13px] font-bold tracking-wide text-ink-900 transition-colors duration-300 inline-flex items-center gap-1 group px-3 py-2 rounded-full hover:bg-ink-900/5"
                >
                  {item.label}
                </motion.a>
              )
            )}
          </motion.nav>

          {/* Book Now CTA */}
          <motion.a
            href="#book"
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full bg-accent-emerald px-6 py-2.5 text-xs sm:text-sm font-bold text-beige-100 transition-all duration-300 hover:bg-ink-700 hover:-translate-y-0.5 shadow-[var(--shadow-soft)] whitespace-nowrap"
          >
            Book Now
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        {/* Mobile Menu Trigger (Right Side) */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#book"
            className="inline-flex items-center gap-2 rounded-full bg-accent-emerald px-4 py-2 text-xs font-bold text-beige-100 transition-all duration-300 hover:bg-ink-700 shadow-[var(--shadow-soft)] whitespace-nowrap sm:hidden"
          >
            Book
          </a>
          <a
            href="#book"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent-emerald px-5 py-2.5 text-sm font-bold text-beige-100 transition-all duration-300 hover:bg-ink-700 shadow-[var(--shadow-soft)] whitespace-nowrap"
          >
            Book Now
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-900/20 text-ink-900 transition-all hover:bg-ink-900/5"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {mobileOpen ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sheet Dropdown (Removed padding to match) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:hidden border-t border-ink-900/10 bg-white/95 backdrop-blur-xl overflow-hidden text-ink-900"
          >
            {/* Replaced container-luxe with mx-auto max-w to remove horizontal padding */}
            <nav aria-label="Mobile" className="mx-auto w-full max-w-[1400px] py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => 
                item.hasMenu ? (
                  <div key="rooms-mobile">
                    <button
                      onClick={() => setMobileRoomsOpen(!mobileRoomsOpen)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-bold text-ink-900 hover:bg-beige-200 transition-colors"
                    >
                      <span>{item.label}</span>
                      <motion.svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        animate={{ rotate: mobileRoomsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </button>
                    
                    <AnimatePresence>
                      {mobileRoomsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-ink-900/5 rounded-lg my-1"
                        >
                          {rooms.map((room) => (
                            <Link
                              key={room.id}
                              href={`/rooms/${room.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-ink-900 border-b border-ink-900/10 last:border-0"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-accent-leaf" />
                              {room.name} <span className="text-ink-500 text-xs">({room.category})</span>
                            </Link>
                          ))}
                          <Link
                            href="/#rooms"
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-3 text-xs font-bold text-accent-emerald tracking-wide"
                          >
                            View All Rooms →
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-3 rounded-lg text-sm font-bold text-ink-900 hover:bg-beige-200 transition-colors"
                  >
                    {item.label}
                  </motion.a>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}