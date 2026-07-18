// app/kitchen/page.tsx
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

export const metadata = {
  title: "Our In-House Kitchen | The Himalayan Shire",
  description:
    "Home-style Himachali and North Indian cooking, made fresh daily at The Himalayan Shire, Fagu — using local produce and traditional recipes.",
};

const HIGHLIGHTS = [
  {
    title: "Local, Seasonal Produce",
    body: "Vegetables and herbs sourced from nearby Fagu farms whenever possible, so meals change gently with the season instead of running off a fixed menu.",
  },
  {
    title: "Himachali & North Indian Cooking",
    body: "Traditional recipes passed down through the kitchen team — comfort food made the way it's made at home, not hotel-style plating.",
  },
  {
    title: "Meals Timed Around You",
    body: "Breakfast, lunch, and dinner are cooked fresh per service rather than held on a buffet line, so what reaches your table is hot and just-made.",
  },
  {
    title: "Dietary Care",
    body: "Vegetarian, Jain, and other dietary preferences are accommodated — just let the team know a little ahead so the kitchen can plan properly.",
  },
];

export default function KitchenPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100/60 font-sans text-black">
      <SiteNav />

      {/* ===================== Hero Image ===================== */}
      <section className="relative">
        <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden sm:h-[56vh] lg:h-[64vh]">
          <Image
            src="/images/kitchen-hero.jpg"
            alt="The Himalayan Shire's in-house kitchen preparing a meal"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

          <div className="absolute inset-0 flex flex-col items-start justify-end px-4 pb-10 sm:px-8 sm:pb-14 lg:px-16 lg:pb-20">
            <div className="mx-auto w-full max-w-7xl">
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-emerald-200">
                <span className="h-px w-6 bg-emerald-300" aria-hidden />
                Dining at The Shire
              </span>
              <h1 className="mt-3 max-w-2xl font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Our In-House Kitchen
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Intro ===================== */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-neutral-800 sm:text-xl">
            Every meal at The Himalayan Shire is cooked in-house, from scratch,
            by a small kitchen team who treat guests the way they'd treat
            family visiting for the weekend. Nothing is trucked in
            pre-made — what you're served is what was cooking in the kitchen
            an hour before it reached your table.
          </p>
          <p className="mt-5 text-base leading-relaxed text-neutral-700 sm:text-lg">
            Set against the pine forests of Fagu, on the Shimla–Narkanda
            highway, the kitchen draws on both Himachali tradition and
            familiar North Indian comfort food — the kind of cooking that
            fits a quiet mountain stay rather than a hotel banquet hall.
          </p>
        </div>
      </section>

      {/* ===================== Highlights Grid ===================== */}
      <section className="border-y border-emerald-200/70 bg-emerald-100/40 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 border-l-4 border-emerald-700 pl-5">
            <h2 className="font-display text-3xl font-black tracking-tight text-black sm:text-4xl">
              What Makes It Different
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-md sm:p-8"
              >
                <h3 className="font-display text-xl font-black text-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-black tracking-tight text-black sm:text-3xl">
            Taste it for yourself
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
            Meals are included as part of your stay — come hungry after a day
            on the trails around Fagu and Kufri.
          </p>
          <Link
            href="/#rooms"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-700/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800"
          >
            Check Rooms & Book
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}