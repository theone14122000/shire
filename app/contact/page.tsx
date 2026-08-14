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

type InquiryForm = {
  name: string;
  phone: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  adults: string;
  children: string;
};

const initialForm: InquiryForm = {
  name: "",
  phone: "",
  email: "",
  checkInDate: "",
  checkOutDate: "",
  adults: "",
  children: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Email address is invalid.";
    }
    if (!form.checkInDate) next.checkInDate = "Check-in date is required.";
    if (!form.checkOutDate) next.checkOutDate = "Check-out date is required.";
    if (!form.adults) next.adults = "Number of adults is required.";
    if (!form.children) next.children = "Number of children is required.";
    if (form.checkInDate && form.checkOutDate && form.checkOutDate <= form.checkInDate) {
      next.checkOutDate = "Check-out date must be after check-in date.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleInput(field: keyof InquiryForm) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      setStatus("idle");
      setStatusMessage("");
    };
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          adults: Number(form.adults),
          children: Number(form.children),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(data.error || "Inquiry could not be sent. Please call or WhatsApp us.");
        return;
      }

      setStatus("sent");
      setStatusMessage(`Inquiry sent to ${brand.email}.`);
      setForm(initialForm);
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage("Inquiry could not be sent. Please call or WhatsApp us.");
    }
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
              Call, mail, or message the property - we usually reply within a few hours, every day of the week.
            </p>

            <div className="mt-10 flex flex-col">
              <ContactBlock icon={MapPin} label="Location" title={brand.address} href={brand.mapsUrl} external />
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
                      className="block font-sans text-xl font-semibold text-emerald-950 transition-colors hover:text-gold-700 sm:text-2xl"
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
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 text-cream-50 transition-colors group-hover:bg-gold-500 group-hover:text-emerald-950">
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
            <span className="luxe-kicker text-gold-700">Inquiry Form</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] text-emerald-950 sm:text-4xl">
              Plan your stay.
            </h2>
            <p className="mt-4 text-sm leading-[1.8] text-emerald-950/60 sm:text-base">
              All fields are required except email.
            </p>

            <form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" value={form.name} onChange={handleInput("name")} error={errors.name} autoComplete="name" />
              <Field id="phone" label="Phone Number" value={form.phone} onChange={handleInput("phone")} error={errors.phone} autoComplete="tel" inputMode="tel" />
              <Field id="email" label="Email (Optional)" value={form.email} onChange={handleInput("email")} error={errors.email} autoComplete="email" type="email" required={false} />
              <Field id="check-in" label="Check In Date" value={form.checkInDate} onChange={handleInput("checkInDate")} error={errors.checkInDate} type="date" />
              <Field id="check-out" label="Check Out Date" value={form.checkOutDate} onChange={handleInput("checkOutDate")} error={errors.checkOutDate} type="date" />
              <Field id="adults" label="Number of Adults (8yrs and above)" value={form.adults} onChange={handleInput("adults")} error={errors.adults} type="number" min={1} />
              <Field id="children" label="Number of Children (7yrs and below)" value={form.children} onChange={handleInput("children")} error={errors.children} type="number" min={0} />

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-bold text-cream-50 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <Send size={15} strokeWidth={1.8} />
                  {status === "sending" ? "Sending..." : "Send Inquiry"}
                </button>

                {statusMessage && (
                  <p className={`mt-4 text-sm font-medium ${status === "sent" ? "text-emerald-700" : "text-red-600"}`}>
                    {statusMessage}
                  </p>
                )}
              </div>
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
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = true,
  autoComplete,
  inputMode,
  min,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  min?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={FIELD_CLASS}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
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
