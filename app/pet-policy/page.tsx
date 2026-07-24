import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

const policies = [
  "Pre-Approval is required from the property management before guests can bring the pets along. The management reserves the right to refuse to allow pet on property if they deem necessary.",
  "Pets must not be left unattended, and must be leashed at all time in common spaces, especially with other guests around.",
  "Guests are responsible for cleaning up after their pet on hotel property and in the neighbourhood.",
  "Any disturbances such as barking must be curtailed to ensure other guests or staff are not inconvenienced.",
  "Guests are responsible for all property damages and/or personal injuries resulting from their pet.",
  "In case of pet droppings in the hotel premises (including lawn), urination inside the premises, soiling of any bed linens or carpets, etc, or any other damage including but not limited to scratch marks, tearing etc, whether permanent or temporary in nature, appropriate charges/fines shall be paid by the guests.",
  "Guests agree to indemnify and hold harmless the hotel, its owners and its operator from all liability and damage suffered as a result of the guest's pet.",
  "We charge a ₹500 per day pet fee.",
];

export default function PetPolicyPage() {
  return (
    <main className="min-h-screen bg-pine-50 font-sans text-pine-950 selection:bg-gold-200/30">
      <SiteNav />

      <section className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/30 blur-[140px]" />
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <Link
            href="/#why"
            className="group mb-10 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition-colors hover:text-black"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1">
              <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Amenities
          </Link>

          <div className="border-l-4 border-gold-400 pl-6">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-emerald-600">
              Guest Agreement
            </span>
            <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl">
              Policy for Pets
            </h1>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-emerald-800/60">
            Please read the following terms carefully before bringing your pet
            to The Himalayan Shire. We love having four-legged guests — these
            guidelines ensure a safe and harmonious stay for everyone.
          </p>
        </div>
      </section>

      <section className="relative bg-cream-50 py-16 sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-gold-200/20 blur-[120px]" />
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="mb-10 flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
            </span>
            <div>
              <h2 className="font-display text-xl font-black text-emerald-950 sm:text-2xl">
                House Rules
              </h2>
              <p className="text-xs text-emerald-600/60">8 key terms for a safe &amp; harmonious stay</p>
            </div>
          </div>

          <div className="space-y-4">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="group flex gap-5 rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300/50 hover:shadow-md sm:p-7 sm:gap-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-50 text-sm font-black text-emerald-800 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-50 group-hover:text-gold-700 sm:h-10 sm:w-10">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-1.5 text-sm leading-[1.8] text-emerald-800/70 sm:text-base">
                  {policy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-gold-300/40 bg-gradient-to-br from-gold-50 via-cream-50 to-white p-8 shadow-lg sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-100/40 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-gold-400 bg-gold-100 text-gold-800 shadow-sm">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-700">
                    Pet Fee
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gold-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-700">
                    Important
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-black text-emerald-950 sm:text-3xl">
                  ₹500{" "}
                  <span className="text-base font-bold text-emerald-700/60">
                    per day, per pet
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-800/60">
                  This fee covers bedding, meals, and additional cleaning for the
                  comfort of all our guests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-emerald-950 py-16 sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-800/50 blur-[120px]" />
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-base font-medium text-cream-200/60">
            Ready to plan a pet-friendly escape to the mountains?
          </p>
          <Link
            href="/#book"
            className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-emerald-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-xl"
          >
            Book Your Stay
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
