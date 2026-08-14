"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { brand } from "@/lib/content";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const FIELD_CLASS =
  "w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-800/35 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    if (!email.trim()) {
      next.email = "We need an email to reply to you.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "That email address does not look right.";
    }
    if (!message.trim()) next.message = "Please write a short message.";
    else if (message.trim().length < 10) next.message = "A little more detail helps us reply well.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleInput(setter: (value: string) => void) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
      setSent(false);
    };
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    const text = `Hello ${brand.name}! I'm ${name.trim()} (${email.trim()}). ${message.trim()}`;
    window.open(`${brand.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  }

  return (
    <main className="min-h-screen bg-[#fffdf7] font-sans text-emerald-950 selection:bg-gold-200/30">
      <SiteNav />

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl"
        >
          <span className="luxe-kicker text-gold-700">Connect</span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
            Get in touch.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.9] text-emerald-950/65 sm:text-lg">
            Planning your Himalayan escape? We are here to help you craft a stay that feels exactly like home in the mountains.
          </p>
        </motion.div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-14 lg:pb-36">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col"
          >
            <h2 className="font-display text-2xl font-semibold text-emerald-950 sm:text-3xl">
              Reach us directly.
            </h2>
            <p className="mt-4 text-base leading-[1.85] text-emerald-950/65">
              Call, mail, or message the property — we usually reply within a few hours, every day of the week.
            </p>

            <div className="mt-10 flex flex-col">
              <ContactBlock
                icon={MapPin}
                label="Location"
                title={brand.address}
                href={brand.mapsUrl}
                external
              />
              <ContactBlock icon={Mail} label="Email" title={brand.email} href={`mailto:${brand.email}`} />
              <div className="group border-y border-emerald-900/15 py-8">
                <Phone className="text-gold-700" size={22} strokeWidth={1.5} />
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-900/45">
                  Phone
                </p>
                <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
                  {brand.phoneDisplay.map((display, index) => (
                    <a
                      key={display}
                      href={brand.phoneHref[index]}
                      className="block font-display text-xl font-semibold text-emerald-950 transition-colors hover:text-gold-700 sm:text-2xl"
                    >
                      {display}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={brand.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 grid gap-6 border-y border-emerald-900/15 py-8 transition-colors hover:border-gold-700/50 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-700">
                  Find Us on Google Maps
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-[1.25] text-emerald-950 transition-colors group-hover:text-gold-700 sm:text-3xl">
                  {brand.address}
                </h3>
              </div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 text-cream-50 transition-colors group-hover:bg-gold-500 group-hover:text-parchment">
                <Send size={17} strokeWidth={1.8} />
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="rounded-3xl border border-emerald-900/10 bg-white/70 p-6 shadow-[0_18px_50px_rgba(3,45,32,0.08)] sm:p-10"
          >
            <span className="luxe-kicker text-gold-700">Write to us</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] text-emerald-950 sm:text-4xl">
              Send a message.
            </h2>
            <p className="mt-4 text-sm leading-[1.8] text-emerald-950/60 sm:text-base">
              Fill in the form and it opens in WhatsApp with your message ready — nothing is stored anywhere.
            </p>

            <form onSubmit={submit} noValidate className="mt-8 space-y-5">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={handleInput(setName)}
                  placeholder="e.g. Aanya Sharma"
                  className={FIELD_CLASS}
                />
                {errors.name && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={handleInput(setEmail)}
                  placeholder="you@example.com"
                  className={FIELD_CLASS}
                />
                {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  value={message}
                  onChange={handleInput(setMessage)}
                  placeholder="Dates you are thinking of, number of guests, anything we should know…"
                  className={FIELD_CLASS + " resize-y"}
                />
                {errors.message && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-bold text-cream-50 transition-all duration-300 hover:bg-emerald-700 hover:-translate-y-0.5 shadow-md sm:w-auto"
              >
                <Send size={15} strokeWidth={1.8} />
                Send via WhatsApp
              </button>

              {sent && (
                <p className="text-sm font-medium text-emerald-700">
                  WhatsApp should have opened with your message. You can also email us directly at {brand.email}.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl"
        >
          <MessageCircle className="mx-auto text-gold-400" size={28} strokeWidth={1.4} />
          <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl">
            Not sure which room fits your plans?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-cream-100/62 sm:text-lg">
            Write to us or give us a call — we are happy to help you choose the perfect space for your Himalayan getaway.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={`mailto:${brand.email}`} className="luxe-button">
              Send an Email
            </a>
            <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="luxe-button luxe-button-dark">
              WhatsApp Us
            </a>
          </div>
        </motion.div>
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
  external = false,
}: {
  icon: typeof Mail;
  label: string;
  title: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group border-y border-emerald-900/15 py-8"
    >
      <Icon className="text-gold-700" size={22} strokeWidth={1.5} />
      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-900/45">
        {label}
      </p>
      <h3 className="mt-4 flex items-center gap-2 font-display text-xl font-semibold leading-[1.35] text-emerald-950 transition-colors group-hover:text-gold-700 sm:text-2xl">
        {title}
        {external && (
          <ArrowUpRight
            size={17}
            strokeWidth={1.8}
            className="shrink-0 text-emerald-900/30 transition-colors group-hover:text-gold-700"
          />
        )}
      </h3>
    </a>
  );
}