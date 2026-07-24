"use client";

import { motion, useScroll, type Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { rooms } from "@/lib/rooms";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/#rooms", hasMenu: true },
  { label: "Activities", href: "/activities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const navVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.includes("#")) {
    return <a href={href} className={className} onClick={onClick}>{children}</a>;
  }
  return <Link href={href} className={className} onClick={onClick}>{children}</Link>;
}

export function SiteNav() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 60));
  }, [scrollY]);

  function isActive(href: string) {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname?.startsWith(href);
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 bg-cream-50/95 backdrop-blur-lg ${
        scrolled
          ? "border-b border-emerald-200/40 shadow-sm h-16 sm:h-20"
          : "border-b border-transparent h-20 sm:h-24"
      }`}
    >
      <div className="mx-auto w-full max-w-[1400px] flex items-center justify-between h-full px-5 sm:px-8 lg:px-14">
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

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <motion.nav
            aria-label="Primary"
            className="flex items-center gap-1"
            variants={navVariants}
            initial="hidden"
            animate="show"
            onMouseLeave={() => setHoveredLabel(null)}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const highlighted = hoveredLabel === item.label || (!hoveredLabel && active);

              return item.hasMenu ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => { setDesktopDropdown(true); setHoveredLabel(item.label); }}
                  onMouseLeave={() => setDesktopDropdown(false)}
                >
                  <motion.button
                    variants={itemVariants}
                    onFocus={() => setHoveredLabel(item.label)}
                    className="relative z-10 text-[13px] font-bold tracking-wide text-emerald-900 transition-colors duration-300 inline-flex items-center gap-1 px-3 py-2 rounded-full"
                  >
                    {highlighted && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-emerald-100"
                      />
                    )}
                    {item.label}
                    <motion.svg
                      width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden
                      animate={{ rotate: desktopDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {desktopDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full right-0 pt-3 w-64"
                      >
                        <div className="bg-white border border-emerald-200/50 rounded-xl shadow-lg overflow-hidden py-2">
                          {rooms.map((room) => (
                            <Link
                              key={room.id}
                              href={`/rooms/${room.slug}`}
                              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition-colors group"
                            >
                              <span className="h-2 w-2 rounded-full bg-emerald-200 group-hover:bg-gold-400 transition-colors" />
                              <div>
                                <span>{room.name}</span>
                                <span className="block text-[10px] uppercase tracking-widest text-emerald-600 font-bold">{room.category}</span>
                              </div>
                            </Link>
                          ))}
                          <div className="border-t border-emerald-100 mt-2 pt-2 px-4 pb-1">
                            <Link href="/#rooms" className="text-xs font-bold text-emerald-700 hover:text-gold-600 transition-colors tracking-wide">
                              View All Rooms →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div key={item.label} variants={itemVariants} className="relative">
                  <NavLink
                    href={item.href}
                    className="relative z-10 text-[13px] font-bold tracking-wide text-emerald-900 transition-colors duration-300 inline-flex items-center gap-1 px-3 py-2 rounded-full"
                  >
                    <span
                      onMouseEnter={() => setHoveredLabel(item.label)}
                      onFocus={() => setHoveredLabel(item.label)}
                      className="relative"
                    >
                      {highlighted && (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 -z-10 -mx-3 -my-2 rounded-full bg-emerald-100"
                        />
                      )}
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active-dot"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-600"
                        />
                      )}
                    </span>
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.nav>

          <motion.a
            href="#book"
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-800 px-6 py-2.5 text-xs sm:text-sm font-bold text-cream-50 transition-all duration-300 hover:bg-emerald-700 hover:-translate-y-0.5 shadow-md whitespace-nowrap"
          >
            Book Now
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#book"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-800 px-4 py-2 text-xs font-bold text-cream-50 transition-all duration-300 hover:bg-emerald-700 shadow-md whitespace-nowrap"
          >
            Book
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-200 text-emerald-800 transition-all hover:bg-emerald-100"
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-emerald-200/40 bg-cream-50/95 backdrop-blur-xl overflow-hidden"
          >
            <nav aria-label="Mobile" className="mx-auto w-full max-w-[1400px] py-4 px-5 sm:px-8 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return item.hasMenu ? (
                  <div key="rooms-mobile">
                    <button
                      onClick={() => setMobileRoomsOpen(!mobileRoomsOpen)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-bold text-emerald-900 hover:bg-emerald-100 transition-colors"
                    >
                      <span>{item.label}</span>
                      <motion.svg
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
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
                          className="overflow-hidden bg-emerald-50 rounded-lg my-1"
                        >
                          {rooms.map((room) => (
                            <Link
                              key={room.id}
                              href={`/rooms/${room.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-emerald-900 border-b border-emerald-100 last:border-0"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                              {room.name} <span className="text-emerald-500 text-xs">({room.category})</span>
                            </Link>
                          ))}
                          <Link
                            href="/#rooms"
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-3 text-xs font-bold text-emerald-700 tracking-wide"
                          >
                            View All Rooms →
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <NavLink
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-bold transition-colors ${
                        active ? "bg-emerald-100 text-emerald-900" : "text-emerald-900 hover:bg-emerald-100"
                      }`}
                    >
                      {item.label}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />}
                    </NavLink>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
