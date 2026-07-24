"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useId, useState } from "react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

const linkClass =
  "font-bold text-emerald-800 underline decoration-emerald-400/50 underline-offset-2 transition-colors hover:text-gold-600";

type Faq = {
  question: string;
  answer: React.ReactNode;
};

const FAQS: Faq[] = [
  {
    question: "How many rooms do you have and can we book just 1 room?",
    answer: (
      <>
        We have a total of seven bedrooms — all with attached washrooms. You
        can book any number of rooms, from just one room to all seven rooms.
        All the information about the seven rooms is mentioned in the{" "}
        <Link href="/#rooms" className={linkClass}>rooms section</Link> of the website.
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
        </a>.
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
        <a href="https://www.thehimalayanshire.com/activities/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          this blog
        </a> about activities in and around The Himalayan Shire.
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

export default function FaqPage() {
  return (
    <main className="relative min-h-screen bg-white font-sans text-emerald-950 selection:bg-gold-200/30">
      <div aria-hidden className="pointer-events-none fixed inset-0" style={{
        background: "radial-gradient(55% 40% at 15% 0%, rgba(16,185,129,0.06) 0%, transparent 55%), radial-gradient(50% 35% at 80% 10%, rgba(251,191,36,0.05) 0%, transparent 50%)",
      }} />

      <SiteNav />

      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/30 blur-[140px]" />
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-600">
              <span className="h-px w-8 bg-gold-400" />
              FAQs
            </span>
            <h1 className="mt-6 font-display text-5xl font-black tracking-tight text-emerald-950 sm:text-6xl lg:text-7xl">
              Frequently Asked{" "}
              <span className="text-gold-600">Questions</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-emerald-800/60 sm:text-lg">
              Everything guests usually ask before booking a stay at The
              Himalayan Shire, Fagu.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32 lg:pb-40">
        <div aria-hidden className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-gold-200/15 blur-[130px]" />
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, idx) => (
              <FaqItem key={faq.question} index={idx} faq={faq} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-14 text-center"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200/50 bg-cream-50 p-8 sm:p-10">
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <h2 className="mt-5 font-display text-xl font-black text-emerald-950 sm:text-2xl">
                Still have a <span className="text-gold-600">question?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-emerald-800/50">
                Reach out and we will get back to you with everything you need
                to plan your stay.
              </p>
              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-emerald-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
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

function FaqItem({ index, faq }: { index: number; faq: Faq }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open
          ? "border-gold-300/50 bg-gold-50/30"
          : "border-emerald-200/50 bg-cream-50 hover:bg-cream-100/50"
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
                ? "bg-gold-500 text-white"
                : "border border-emerald-200 bg-white text-emerald-700"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-base font-bold leading-snug text-emerald-950 sm:text-lg">
            {faq.question}
          </span>
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 text-emerald-600"
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
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
            <div className="border-t border-emerald-200/30 px-5 pb-5 pt-4 text-sm leading-[1.8] text-emerald-800/70 sm:px-6 sm:pb-6 sm:pt-5 sm:text-base">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
