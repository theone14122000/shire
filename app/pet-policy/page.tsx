import Link from "next/link";
import Image from "next/image";
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
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100/60 font-sans text-black">
      <SiteNav />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  HERO — elegant policy header                                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <Link
            href="/#why"
            className="group mb-10 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition-colors hover:text-black"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Amenities
          </Link>

          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 18c2 0 4-1.3 4-3 0-1.1-.7-2-2-2-.6 0-1 .3-1.3.8-.3-.5-.7-.8-1.3-.8-1.3 0-2 .9-2 2 0 1.7 1.8 3 4 3z" />
                <circle cx="6" cy="10" r="1.5" />
                <circle cx="18" cy="10" r="1.5" />
                <circle cx="9" cy="7" r="1.3" />
                <circle cx="15" cy="7" r="1.3" />
              </svg>
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-emerald-700">
                Guest Agreement
              </span>
              <h1 className="mt-1 font-display text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
                Policy for Pets
              </h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600">
            Please read the following terms carefully before bringing your pet
            to The Himalayan Shire. We love having four-legged guests — these
            guidelines ensure a safe and harmonious stay for everyone.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  POLICIES — numbered article cards                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-emerald-200/60 bg-emerald-100/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12 flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
            </span>
            <div>
              <h2 className="font-display text-xl font-black text-black sm:text-2xl">
                House Rules
              </h2>
              <p className="text-xs text-neutral-500">8 key terms for a safe &amp; harmonious stay</p>
            </div>
          </div>

          <div className="space-y-5">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="group flex gap-5 rounded-2xl border border-emerald-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/60 hover:shadow-md sm:p-7 sm:gap-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-50 text-sm font-black text-emerald-800 transition-all duration-300 group-hover:border-emerald-700 group-hover:bg-emerald-700 group-hover:text-white sm:h-10 sm:w-10">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-1.5 text-sm leading-[1.8] text-neutral-700 sm:text-base">
                  {policy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  FEE HIGHLIGHT                                                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 via-amber-50/50 to-white p-8 shadow-lg sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-100/40 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-amber-300 bg-amber-100 text-amber-800 shadow-sm">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-700">
                    Pet Fee
                  </span>
                  <span className="h-1 w-1 rounded-full bg-amber-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-700">
                    Important
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-black text-black sm:text-3xl">
                  ₹500{" "}
                  <span className="text-base font-bold text-neutral-600">
                    per day, per pet
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-amber-900/70">
                  This fee covers bedding, meals, and additional cleaning for the
                  comfort of all our guests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  CTA                                                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-emerald-200/60 bg-emerald-100/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-base font-medium text-neutral-700">
            Ready to plan a pet-friendly escape to the mountains?
          </p>
          <Link
            href="/#book"
            className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl"
          >
            Book Your Stay
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
