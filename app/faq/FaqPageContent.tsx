"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useId, useState } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { FAQS, type SiteFaq } from "@/lib/faq";

type Faq = {
  question: string;
  answer: React.ReactNode;
};

// Questions and answers come from the shared source (lib/faq.tsx) so the
// visible accordion, the FAQPage JSON-LD and the AI endpoint stay in sync.
const VISIBLE_FAQS: Faq[] = FAQS.map((faq: SiteFaq) => ({
  question: faq.question,
  answer: faq.answer ?? faq.answerText,
}));

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

export default function FaqPageContent() {
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
          <span className="luxe-kicker text-gold-700">FAQs</span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
            Frequently asked questions.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.9] text-emerald-950/65 sm:text-lg">
            Everything guests usually ask before booking a stay at The Himalayan Shire, Fagu.
          </p>
        </motion.div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-14 lg:pb-36">
        <div className="mx-auto max-w-4xl">
          {VISIBLE_FAQS.map((faq, index) => (
            <FaqItem key={faq.question} index={index} faq={faq} />
          ))}
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
            Still have a question?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-cream-100/62 sm:text-lg">
            Reach out and we will get back to you with everything you need to plan your stay.
          </p>
          <Link href="/contact" className="luxe-button mt-9">
            Get in Touch
          </Link>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}

function FaqItem({ index, faq }: { index: number; faq: Faq }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = useId();

  return (
    <div className="border-t border-emerald-900/15 last:border-b">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-6 py-7 text-left"
      >
        <span className="flex gap-4 sm:gap-5">
          <span className="mt-1 font-display text-sm font-semibold text-gold-700">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-lg font-semibold leading-snug text-emerald-950 sm:text-xl lg:text-2xl">
            {faq.question}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 shrink-0 text-emerald-950/50"
        >
          <ChevronDown size={20} strokeWidth={1.8} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-[72ch] pb-7 pl-10 text-base font-bold leading-[1.8] text-emerald-950 sm:pl-14 sm:text-[1.0625rem]">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
