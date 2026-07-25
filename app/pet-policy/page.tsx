"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

const POLICIES = [
  "Pre-Approval is required from the property management before guests can bring the pets along. The management reserves the right to refuse to allow pet on property if they deem necessary.",
  "Pets must not be left unattended, and must be leashed at all time in common spaces, especially with other guests around.",
  "Guests are responsible for cleaning up after their pet on hotel property and in the neighbourhood.",
  "Any disturbances such as barking must be curtailed to ensure other guests or staff are not inconvenienced.",
  "Guests are responsible for all property damages and/or personal injuries resulting from their pet.",
  "In case of pet droppings in the hotel premises (including lawn), urination inside the premises, soiling of any bed linens or carpets, etc, or any other damage including but not limited to scratch marks, tearing etc, whether permanent or temporary in nature, appropriate charges/fines shall be paid by the guests.",
  "Guests agree to indemnify and hold harmless the hotel, its owners and its operator from all liability and damage suffered as a result of the guest's pet.",
  "We charge a Rs. 500 per day pet fee.",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export default function PetPolicyPage() {
  return (
    <main className="editorial-surface min-h-screen font-sans selection:bg-gold-200/30">
      <SiteNav />

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <Link href="/#amenities" className="luxe-link mb-12">
            <ArrowLeft size={15} strokeWidth={1.8} />
            Back to Amenities
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="luxe-kicker text-gold-700">Guest Agreement</span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] text-emerald-950 sm:text-6xl lg:text-7xl">
              Policy for Pets.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[1.9] text-emerald-950/66 sm:text-lg">
              Please read the following terms carefully before bringing your pet to The Himalayan Shire. We love having four-legged guests - these guidelines ensure a safe and harmonious stay for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <FileText className="text-gold-700" size={28} strokeWidth={1.4} />
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
              House Rules
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-emerald-950/60">
              8 key terms for a safe and harmonious stay.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-0"
          >
            {POLICIES.map((policy, index) => (
              <motion.div key={policy} variants={fadeUp} className="grid gap-5 border-t border-emerald-900/15 py-6 sm:grid-cols-[5rem_1fr]">
                <span className="font-display text-sm font-semibold text-gold-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.85] text-emerald-950/68">
                  {policy}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-400">
            Pet Fee
          </p>
          <h2 className="mt-5 font-display text-5xl font-semibold text-cream-50 sm:text-6xl">
            Rs. 500
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-[1.85] text-cream-100/62 sm:text-lg">
            per day, per pet.
          </p>
          <Link href="/#book" className="luxe-button mt-9">
            Book Your Stay
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
