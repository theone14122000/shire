"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { brand } from "@/lib/content";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

export default function ContactPage() {
  return (
    <main className="editorial-surface min-h-screen font-sans selection:bg-gold-200/30">
      <SiteNav />

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-20"
        >
          <div>
            <motion.span variants={fadeUp} className="luxe-kicker text-gold-700">
              Connect
            </motion.span>
            <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-emerald-950 sm:text-6xl lg:text-7xl">
              Get in touch.
            </motion.h1>
          </div>
          <motion.p variants={fadeUp} className="max-w-2xl text-base leading-[1.9] text-emerald-950/66 sm:text-lg">
            Planning your Himalayan escape? We are here to help you craft a stay that feels exactly like home in the mountains.
          </motion.p>
        </motion.div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-14 lg:pb-36">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-3">
          <ContactBlock
            icon={MapPin}
            label="Location"
            title="Dehna Road, near Talayi Village, Fagu, Himachal Pradesh 171209"
            href={MAPS_URL}
          />
          <ContactBlock
            icon={Mail}
            label="Email"
            title={brand.email}
            href={`mailto:${brand.email}`}
          />
          <div className="border-y border-emerald-900/15 py-8">
            <Phone className="text-gold-700" size={22} strokeWidth={1.5} />
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-950/45">
              Phone
            </p>
            <div className="mt-4 space-y-3">
              {brand.phoneHref.map((href, index) => (
                <a key={href} href={href} className="block font-display text-2xl font-semibold text-emerald-950 transition-colors hover:text-gold-700">
                  {brand.phoneDisplay[index]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1400px]">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-6 border-y border-emerald-900/15 py-8 transition-colors hover:border-gold-700/50 sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-700">
                Find Us on Google Maps
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-emerald-950">
                Dehna Road, near Talayi Village, Fagu, Himachal Pradesh
              </h2>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 text-cream-50 transition-colors group-hover:bg-gold-500 group-hover:text-emerald-950">
              <Send size={17} strokeWidth={1.8} />
            </span>
          </a>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl">
            Not sure which room fits your plans?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.85] text-cream-100/62 sm:text-lg">
            Write to us or give us a call - we are happy to help you choose the perfect space for your Himalayan getaway.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={`mailto:${brand.email}`} className="luxe-button">
              Send an Email
            </a>
            <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="luxe-button luxe-button-dark">
              WhatsApp Us
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-5 text-sm text-cream-100/52">
            {brand.socials.map((social) => (
              <a key={social.label} href={social.href} className="transition-colors hover:text-gold-300">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ContactBlock({
  icon: Icon,
  label,
  title,
  href,
}: {
  icon: typeof Mail;
  label: string;
  title: string;
  href: string;
}) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group border-y border-emerald-900/15 py-8">
      <Icon className="text-gold-700" size={22} strokeWidth={1.5} />
      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-950/45">
        {label}
      </p>
      <h2 className="mt-4 font-display text-2xl font-semibold leading-[1.25] text-emerald-950 transition-colors group-hover:text-gold-700">
        {title}
      </h2>
    </a>
  );
}
