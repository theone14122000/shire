"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { brand } from "@/lib/content";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-white font-sans text-emerald-950 selection:bg-gold-200/30">
      <div aria-hidden className="pointer-events-none fixed inset-0" style={{
        background: "radial-gradient(60% 40% at 85% 5%, rgba(251,191,36,0.06) 0%, transparent 55%), radial-gradient(50% 40% at 10% 15%, rgba(16,185,129,0.08) 0%, transparent 60%)",
      }} />

      <SiteNav />

      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/30 blur-[140px]" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-600">
              <span className="h-px w-8 bg-gold-400" />
              Connect
            </span>
            <h1 className="mt-6 font-display text-5xl font-black tracking-tight text-emerald-950 sm:text-6xl lg:text-7xl">
              Get in{" "}
              <span className="text-gold-600">Touch</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-emerald-800/60 sm:text-lg">
              Planning your Himalayan escape? We are here to help you craft
              a stay that feels exactly like home in the mountains.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-emerald-200/50 bg-cream-50 p-6 sm:p-8 transition-all duration-500 hover:border-gold-300/40 hover:bg-gold-50/50">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-700 transition-all duration-300 group-hover:text-gold-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <h3 className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-600">
                Location
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-800/60">
                Dehna Road, near Talayi Village, Fagu, Himachal Pradesh 171209
              </p>
            </div>

            <div className="group rounded-2xl border border-emerald-200/50 bg-cream-50 p-6 sm:p-8 transition-all duration-500 hover:border-gold-300/40 hover:bg-gold-50/50">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-700 transition-all duration-300 group-hover:text-gold-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <h3 className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-600">
                Email
              </h3>
              <a
                href={`mailto:${brand.email}`}
                className="mt-2 block text-sm font-medium text-emerald-800/60 underline decoration-emerald-400/40 underline-offset-2 transition-colors hover:text-gold-600"
              >
                {brand.email}
              </a>
            </div>

            <div className="group rounded-2xl border border-emerald-200/50 bg-cream-50 p-6 sm:p-8 transition-all duration-500 hover:border-gold-300/40 hover:bg-gold-50/50">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-700 transition-all duration-300 group-hover:text-gold-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <h3 className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-600">
                Phone
              </h3>
              <div className="mt-2 space-y-1">
                {brand.phoneHref.map((href, i) => (
                  <a
                    key={i}
                    href={href}
                    className="block text-sm font-medium text-emerald-800/60 underline decoration-emerald-400/40 underline-offset-2 transition-colors hover:text-gold-600"
                  >
                    {brand.phoneDisplay[i]}
                  </a>
                ))}
              </div>
            </div>
          </div>

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
              className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-emerald-200/50 bg-cream-50 p-6 transition-all duration-500 hover:border-gold-300/40 hover:bg-gold-50/50 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-emerald-900">
                    Find Us on Google Maps
                  </h3>
                  <p className="mt-0.5 text-xs text-emerald-800/50">
                    Dehna Road, near Talayi Village, Fagu, Himachal Pradesh
                  </p>
                </div>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-200 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-700 group-hover:text-gold-600">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </span>
            </a>
          </motion.div>

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
                className="group flex items-center justify-between rounded-xl border border-emerald-200/50 bg-cream-50 px-5 py-4 transition-all duration-300 hover:border-gold-300/40 hover:bg-gold-50/50"
              >
                <div className="flex items-center gap-3">
                  {social.label === "Instagram" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-600 group-hover:text-gold-600">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  )}
                  {social.label === "Facebook" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-600 group-hover:text-gold-600">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  )}
                  {social.label === "YouTube" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-600 group-hover:text-gold-600">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                    </svg>
                  )}
                  <span className="text-sm font-medium text-emerald-800/60 transition-colors group-hover:text-emerald-900">
                    {social.label}
                  </span>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600/40 transition-colors group-hover:text-gold-600">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-emerald-950 py-24 sm:py-32 lg:py-40">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-800/50 blur-[120px]" />
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-500/60">
              Reach Out
            </span>
            <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Not sure which room fits your plans?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-cream-200/50">
              Write to us or give us a call — we are happy to help you
              choose the perfect space for your Himalayan getaway.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`mailto:${brand.email}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-emerald-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
              >
                Send an Email
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
              <a
                href={brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream-200/20 px-7 py-4 text-sm font-bold text-cream-200/70 transition-all duration-300 hover:border-gold-500/40 hover:text-gold-400"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
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
