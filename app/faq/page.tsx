"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useId, useState } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

const linkClass =
  "font-bold text-emerald-800 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:text-gold-700";

type Faq = {
  question: string;
  answer: React.ReactNode;
};

const FAQS: Faq[] = [
  {
    question: "How many rooms do you have and can we book just 1 room?",
    answer: (
      <>
        We have a total of seven bedrooms - all with attached washrooms. You can book any number of rooms, from just one room to all seven rooms. All the information about the seven rooms is mentioned in the <Link href="/#rooms" className={linkClass}>rooms section</Link> of the website.
      </>
    ),
  },
  {
    question: "Is it a drive-in property with private parking?",
    answer: "Yes, all cars, big and small, and even tempo travellers can easily reach the property. The road is metalled. We can park up to 10 SUVs. Access may temporarily be disturbed in case of heavy snowfall - so if you are planning to travel during Jan-Feb, do ask us about the current situation.",
  },
  {
    question: "Where is Fagu?",
    answer: (
      <>
        Fagu is located 19 kms ahead of Shimla, 5 kms ahead of Kufri, on the main highway going towards Theog / Narkanda. Our property is 2 kms on the link road from Fagu. <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>See the exact location on Google Maps</a>.
      </>
    ),
  },
  {
    question: "What is the fooding situation at the property?",
    answer: "We serve an a la carte menu from 9am to 9pm. We have a variety of dishes and an experienced chef to prepare them for you. We do require food orders well in advance (preferably 2 hours' preparation time) as we make everything fresh.",
  },
  {
    question: "Can the guests access the kitchen?",
    answer: "As a general rule, guests cannot access the kitchen. In limited cases - for example, where mothers need to prepare food for infants - we do allow kitchen access. We provide a kettle, microwave, and a hot plate outside of the kitchen in case guests need to reheat food or prepare coffee/tea.",
  },
  {
    question: "What is there to do around the property / what activities?",
    answer: (
      <>
        Please read <Link href="/activities" className={linkClass}>this blog</Link> about activities in and around The Himalayan Shire.
      </>
    ),
  },
  {
    question: "Do you have an outdoor sitting area?",
    answer: "Yes, we have a big lawn with outdoor sofa seating. We can light bonfires and barbeque on request. We also have a terrace balcony on the 2nd floor with a 2-seater swing and additional seating for 5-6 people. This balcony is common for all the guests and has an amazing view on all sides.",
  },
  {
    question: "Do you have housekeeping service?",
    answer: "Yes. Rooms are cleaned every day between 11am and 5pm. We change the bedsheet every alternate day. In case guests request a bedsheet change earlier, we charge a cleaning fee of Rs. 500.",
  },
  {
    question: "Is it a pet-friendly property?",
    answer: "In certain cases we do allow pets. Pets weighing up to 6 kgs are mostly welcomed, unless they are untrained or might be a hazard to other guests or staff. Larger breeds are also allowed if you are booking the entire villa, or you come on a day with fewer guests around. Please ask us for our complete pet policy before booking - guests have to sign the pet policy before check-in. We charge a Rs. 500 per day pet fee.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

export const dynamic = "force-dynamic";

export default function FaqPage() {
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
          {FAQS.map((faq, index) => (
            <FaqItem key={faq.question} index={index} faq={faq} />
          ))}
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
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