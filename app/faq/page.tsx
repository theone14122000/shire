"use client";

import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useId, useState } from "react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { ChevronDown, MessageCircle } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

type Faq = {
  question: string;
  answer: React.ReactNode;
};

const linkClass =
  "font-bold text-amber-300 underline decoration-amber-400/50 underline-offset-2 transition-colors hover:text-amber-200";

const FAQS: Faq[] = [
  {
    question: "How many rooms do you have and can we book just 1 room?",
    answer: (
      <>
        We have a total of seven bedrooms — all with attached washrooms. You
        can book any number of rooms, from just one room to all seven rooms.
        All the information about the seven rooms is mentioned in the{" "}
        <Link href="/#rooms" className={linkClass}>
          rooms section
        </Link>{" "}
        of the website.
      </>
    ),
  },
  {
    question: "Is it a drive-in property with private parking?",
    answer: (
      <>
        Yes, all cars, big and small, and even tempo travellers can easily
        reach the property. The road is metalled. We can park up to 10 SUVs.
        Access may temporarily be disturbed in case of heavy snowfall — so if
        you are planning to travel during Jan–Feb, do ask us about the
        current situation.
      </>
    ),
  },
  {
    question: "Where is Fagu?",
    answer: (
      <>
        Fagu is located 19 kms ahead of Shimla, 5 kms ahead of Kufri, on the
        main highway going towards Theog / Narkanda. Our property is 2 kms
        on the link road from Fagu.{" "}
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
          See the exact location on Google Maps
        </a>
        .
      </>
    ),
  },
  {
    question: "What is the fooding situation at the property?",
    answer: (
      <>
        We serve an à la carte menu from 9am to 9pm. We have a variety of
        dishes and an experienced chef to prepare them for you. We do
        require food orders well in advance (preferably 2 hours&apos; preparation
        time) as we make everything fresh.
      </>
    ),
  },
  {
    question: "Can the guests access the kitchen?",
    answer: (
      <>
        As a general rule, guests cannot access the kitchen. In limited
        cases — for example, where mothers need to prepare food for infants
        — we do allow kitchen access. We provide a kettle, microwave, and a
        hot plate outside of the kitchen in case guests need to reheat food
        or prepare coffee/tea.
      </>
    ),
  },
  {
    question: "What is there to do around the property / what activities?",
    answer: (
      <>
        Please read{" "}
        <a
          href="https://www.thehimalayanshire.com/activities/"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          this blog
        </a>{" "}
        about activities in and around The Himalayan Shire.
      </>
    ),
  },
  {
    question: "Do you have an outdoor sitting area?",
    answer: (
      <>
        Yes, we have a big lawn with outdoor sofa seating. We can light
        bonfires and barbeque on request. We also have a terrace balcony on
        the 2nd floor with a 2-seater swing and additional seating for 5–6
        people. This balcony is common for all the guests and has an amazing
        view on all sides.
      </>
    ),
  },
  {
    question: "Do you provide housekeeping service?",
    answer: (
      <>
        Yes. Rooms are cleaned every day between 11am and 5pm. We change the
        bedsheet every alternate day. In case guests request a bedsheet
        change earlier, we charge a cleaning fee of Rs. 500.
      </>
    ),
  },
  {
    question: "Is it a pet-friendly property?",
    answer: (
      <>
        In certain cases we do allow pets. Pets weighing up to 6 kgs are
        mostly welcomed, unless they are untrained or might be a hazard to
        other guests or staff. Larger breeds are also allowed if you are
        booking the entire villa, or you come on a day with fewer guests
        around. Please ask us for our complete pet policy before booking —
        guests have to sign the pet policy before check-in. We charge a Rs.
        500 per day pet fee.
      </>
    ),
  },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function FaqPage() {
  return (
    <main className="relative min-h-screen bg-[#052e23] font-sans text-white selection:bg-amber-300/30 selection:text-amber-100">
      {/* Ambient depth */}
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
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-amber-400/60">
              <span className="h-px w-8 bg-amber-400/30" />
              FAQs
            </span>
            <h1 className="mt-6 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Frequently Asked{" "}
              <span className="text-amber-400">Questions</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-emerald-100/50 sm:text-lg">
              Everything guests usually ask before booking a stay at The
              Himalayan Shire, Fagu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  FAQ ACCORDION                                               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.05] pb-24 sm:pb-32 lg:pb-40">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="flex flex-col gap-3"
          >
            {FAQS.map((faq, idx) => (
              <motion.div key={faq.question} variants={fadeUp}>
                <FaqItem index={idx} faq={faq} />
              </motion.div>
            ))}
          </motion.div>

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-14 text-center"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
              />
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-amber-400/60">
                <MessageCircle size={20} strokeWidth={1.4} />
              </span>
              <h2 className="mt-5 font-display text-xl font-black text-white sm:text-2xl">
                Still have a{" "}
                <span className="text-amber-400">question?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-emerald-100/50">
                Reach out and we will get back to you with everything you need
                to plan your stay.
              </p>
              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-[#052e23] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

/* ================================================================== */
/*  FaqItem — accordion component                                       */
/* ================================================================== */
function FaqItem({ index, faq }: { index: number; faq: Faq }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open
          ? "border-amber-400/20 bg-white/[0.04]"
          : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="flex items-center gap-4">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black transition-all duration-300 ${
              open
                ? "bg-amber-400 text-[#052e23]"
                : "border border-white/10 bg-white/[0.03] text-amber-400/60"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-base font-bold leading-snug text-white/90 sm:text-lg">
            {faq.question}
          </span>
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 text-amber-400/60"
          aria-hidden
        >
          <ChevronDown size={16} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.04] px-5 pb-5 pt-4 text-sm leading-[1.8] text-emerald-100/60 sm:px-6 sm:pb-6 sm:pt-5 sm:text-base">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
