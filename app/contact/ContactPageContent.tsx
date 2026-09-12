"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Check, Mail, MapPin, MessageCircle, Phone, Send, X } from "lucide-react";
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

export default function ContactPageContent() {
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  function closeSuccess() {
    setShowSuccess(false);
  }

  useEffect(() => {
    if (!showSuccess) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowSuccess(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [showSuccess]);

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

      const isSubmitting = status === "sending";

      // The submit button (and its "Submit Inquiry" click text tracked in
      // GTM) only exists once every field is filled, filtering out empty
      // bot/fake submissions at the source.
      const isFormComplete =
        form.name.trim() !== "" &&
        form.phone.trim() !== "" &&
        form.email.trim() !== "" &&
        form.checkInDate !== "" &&
        form.checkOutDate !== "" &&
        form.adults !== "" &&
        form.children !== "";

      async function submit(event: FormEvent) {
        event.preventDefault();
        if (!validate() || isSubmitting) return;

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
      setShowSuccess(true);
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
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl font-semibold text-emerald-950 sm:text-3xl mb-6">
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
          </div>

          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl font-semibold text-emerald-950 sm:text-3xl mb-6">
              Send Us an Inquiry
            </h2>
            <p className="mb-6 text-base leading-[1.85] text-emerald-950/65">
              Fill in the form below and we'll get back to you within a few hours.
            </p>
            <form onSubmit={submit} className="space-y-4">
              <Field
                id="name"
                label="Full Name"
                value={form.name}
                onChange={handleInput("name")}
                required
              />
              <Field
                id="phone"
                label="Phone Number"
                value={form.phone}
                onChange={handleInput("phone")}
                required
              />
              <Field
                id="email"
                label="Email Address"
                value={form.email}
                onChange={handleInput("email")}
                required
              />
              <Field
                id="checkInDate"
                label="Check-in Date"
                type="date"
                value={form.checkInDate}
                onChange={handleInput("checkInDate")}
                required
              />
              <Field
                id="checkOutDate"
                label="Check-out Date"
                type="date"
                value={form.checkOutDate}
                onChange={handleInput("checkOutDate")}
                required
              />
              <Field
                id="adults"
                label="Number of Adults"
                value={form.adults}
                onChange={handleInput("adults")}
                required
              />
              <Field
                id="children"
                label="Number of Children"
                value={form.children}
                onChange={handleInput("children")}
                required
              />
              <button
                type="submit"
                className="luxe-button w-full disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isFormComplete || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </button>
              {status === "sent" && (
                <p className="mt-4 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800">
                  Your enquiry has been submitted successfully. We’ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-800">
                  We couldn’t submit your enquiry right now. Please try again or contact us directly.
                </p>
              )}
              {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
              {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
              {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
              {errors.checkInDate && <p className="text-red-600 text-xs">{errors.checkInDate}</p>}
              {errors.checkOutDate && <p className="text-red-600 text-xs">{errors.checkOutDate}</p>}
              {errors.adults && <p className="text-red-600 text-xs">{errors.adults}</p>}
              {errors.children && <p className="text-red-600 text-xs">{errors.children}</p>}
            </form>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
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

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeSuccess}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/60 p-5 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="inquiry-success-title"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-sm rounded-[1.75rem] border border-emerald-900/10 bg-[#fffdf7] px-8 py-10 text-center shadow-[0_32px_80px_rgba(3,45,32,0.28)]"
            >
              <button
                type="button"
                onClick={closeSuccess}
                autoFocus
                aria-label="Close confirmation"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-emerald-900/50 transition-colors hover:bg-emerald-900/5 hover:text-emerald-950"
              >
                <X size={17} strokeWidth={2} />
              </button>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-800">
                <Check size={30} strokeWidth={2.2} className="text-cream-50" />
              </span>
              <h2 id="inquiry-success-title" className="mt-6 font-display text-2xl font-semibold leading-snug text-emerald-950">
                Thank you for reaching out, we will get back to you soon! 🙂
              </h2>
              <p className="mx-auto mt-4 max-w-[32ch] text-sm leading-[1.8] text-emerald-950/60">
                Your inquiry has been received by The Himalayan Shire.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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