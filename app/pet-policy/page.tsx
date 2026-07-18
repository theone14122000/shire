import Link from "next/link";
import { SiteNav } from "../components/SiteNav";

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
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100/60 font-sans text-black selection:bg-emerald-200 selection:text-emerald-900">
      <SiteNav />

      {/* Dynamic Animated Header Banner */}
      <div className="relative overflow-hidden bg-emerald-800 text-white px-4 py-3 text-center text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 shadow-sm">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-2 -left-4 w-20 h-20 bg-emerald-300 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-2 -right-4 w-24 h-24 bg-green-300 rounded-full blur-2xl animate-pulse" />
        </div>

        <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700/60 border border-emerald-400/30">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          >
            <path d="M12 18c2.2 0 4-1.3 4-3 0-1.1-.7-2-2-2-.6 0-1 .3-1.3.8-.3-.5-.7-.8-1.3-.8-1.3 0-2 .9-2 2 0 1.7 1.8 3 4 3z" />
            <circle cx="7.5" cy="10" r="1.5" />
            <circle cx="16.5" cy="10" r="1.5" />
            <circle cx="10" cy="7" r="1.3" />
            <circle cx="14" cy="7" r="1.3" />
          </svg>
        </span>

        <span className="relative z-10">
          Pet Policy — The Himalayan Shire
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Back Link */}
        <Link
          href="/#why"
          className="inline-flex items-center gap-2 text-emerald-800 hover:text-black transition-colors text-sm font-bold tracking-wide mb-10 group"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path
              d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Amenities
        </Link>

        {/* Title */}
        <div className="mb-10 sm:mb-12 border-l-4 border-emerald-700 pl-5">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-emerald-200">
            Guest Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-[1.1]">
            Policy for Pets
          </h1>
          <p className="text-neutral-700 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed">
            Please read the following terms carefully before bringing your pet to The Himalayan Shire.
          </p>
        </div>

        {/* Policy Card */}
        <div className="bg-white border border-emerald-200 rounded-3xl shadow-xl shadow-emerald-900/5 p-6 sm:p-8 lg:p-10 mb-10 relative overflow-hidden">
          {/* Subtle decorative gradient */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="15" y2="17" />
                </svg>
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-black leading-tight">
                  House Rules
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  8 key terms for a safe & harmonious stay
                </p>
              </div>
            </div>

            <ol className="space-y-5 sm:space-y-6">
              {policies.map((policy, index) => (
                <li key={index} className="group flex gap-4 items-start">
                  {/* Number badge */}
                  <span className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-sm font-black text-emerald-800 transition-all duration-300 group-hover:bg-emerald-700 group-hover:text-white group-hover:border-emerald-700 group-hover:scale-110">
                    {index + 1}
                  </span>
                  {/* Policy text */}
                  <p className="text-sm sm:text-base leading-relaxed text-neutral-800 pt-2 group-hover:text-black transition-colors duration-300">
                    {policy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Fee Highlight Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 mb-10 shadow-lg shadow-amber-900/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/40 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

          <div className="relative flex items-start gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-200 border-2 border-amber-300 flex items-center justify-center text-amber-800 shadow-sm">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-extrabold text-amber-700 uppercase tracking-widest">
                  Important
                </span>
                <span className="h-1 w-1 rounded-full bg-amber-400" />
                <span className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Pet Fee
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-black mt-1">
                ₹500{" "}
                <span className="text-sm sm:text-base font-bold text-neutral-700">
                  per day, per pet
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/80 mt-2 leading-relaxed">
                This fee covers bedding, meals, and additional cleaning for the
                comfort of all our guests.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-700 mb-4 font-medium">
            Ready to plan a pet-friendly escape to the mountains?
          </p>
          <Link
            href="/#book"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-emerald-800 hover:-translate-y-1 shadow-lg shadow-emerald-700/30 hover:shadow-emerald-700/50"
          >
            Book Your Stay
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
} 