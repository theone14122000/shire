"use client";

import {
  motion,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { brand } from "@/lib/content";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#052e23] font-sans text-white selection:bg-amber-300/30 selection:text-amber-100">
      {/* Ambient depth layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        background:
          "radial-gradient(70% 50% at 85% 5%, rgba(251,191,36,0.10) 0%, transparent 55%), radial-gradient(55% 45% at 10% 20%, rgba(16,185,129,0.18) 0%, transparent 60%)",
      }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      <SiteNav />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  HERO — editorial heading                                     */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-amber-400/60">
              <span className="h-px w-8 bg-amber-400/30" />
              Connect
            </span>
            <h1 className="mt-6 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Get in{" "}
              <span className="text-amber-400">Touch</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-emerald-100/50 sm:text-lg">
              Planning your Himalayan escape? We are here to help you craft
              a stay that feels exactly like home in the mountains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  CONTACT CARDS + MAP                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.05] pb-24 sm:pb-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Contact Information Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Location */}
            <motion.div variants={fadeUp} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 transition-all duration-500 hover:border-amber-400/15 hover:bg-white/[0.04]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-amber-400/60 transition-all duration-300 group-hover:text-amber-400/80">
                <MapPin size={18} strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400/60">
                Location
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-100/60">
                Dehna Road, near Talayi Village, Fagu, Himachal Pradesh 171209
              </p>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 transition-all duration-500 hover:border-amber-400/15 hover:bg-white/[0.04]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-amber-400/60 transition-all duration-300 group-hover:text-amber-400/80">
                <Mail size={18} strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400/60">
                Email
              </h3>
              <a
                href={`mailto:${brand.email}`}
                className="mt-2 block text-sm font-medium text-emerald-100/60 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-amber-200"
              >
                {brand.email}
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeUp} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 transition-all duration-500 hover:border-amber-400/15 hover:bg-white/[0.04]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-amber-400/60 transition-all duration-300 group-hover:text-amber-400/80">
                <Phone size={18} strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400/60">
                Phone
              </h3>
              <div className="mt-2 space-y-1">
                {brand.phoneHref.map((href, i) => (
                  <a
                    key={i}
                    href={href}
                    className="block text-sm font-medium text-emerald-100/60 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-amber-200"
                  >
                    {brand.phoneDisplay[i]}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Map CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10"
          >
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:border-amber-400/15 hover:bg-white/[0.04] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400/70">
                  <MapPin size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white/90">
                    Find Us on Google Maps
                  </h3>
                  <p className="mt-0.5 text-xs text-emerald-100/40">
                    Dehna Road, near Talayi Village, Fagu, Himachal Pradesh
                  </p>
                </div>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-amber-400/30 group-hover:bg-amber-400/10">
                <ExternalLink size={14} strokeWidth={2} className="text-amber-400/60" />
              </span>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {brand.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-amber-400/15 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  {social.label === "Instagram" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400/50">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  )}
                  {social.label === "Facebook" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400/50">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  )}
                  {social.label === "YouTube" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400/50">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                    </svg>
                  )}
                  <span className="text-sm font-medium text-emerald-100/50 transition-colors group-hover:text-white/80">
                    {social.label}
                  </span>
                </div>
                <ArrowUpRight size={13} strokeWidth={2} className="text-emerald-100/30 transition-colors group-hover:text-amber-400/60" />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  ENQUIRY CTA                                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.05] pb-28 sm:pb-36 lg:pb-44">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-amber-400/60">
              Reach Out
            </span>
            <h2 className="mt-5 font-display text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Not sure which room fits your plans?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-emerald-100/40">
              Write to us or give us a call — we are happy to help you
              choose the perfect space for your Himalayan getaway.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`mailto:${brand.email}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-amber-400 px-8 py-4 text-sm font-bold text-[#052e23] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Send an Email
                <ArrowUpRight size={15} strokeWidth={2.4} />
              </a>
              <a
                href={brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
