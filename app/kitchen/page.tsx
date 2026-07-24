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
    body: "Traditional recipes passed down through the kitchen team — comfort food made the way it is made at home, not hotel-style plating.",
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
    <main className="min-h-screen bg-pine-50 font-sans text-pine-950 selection:bg-gold-200/30">
      <SiteNav />

      <section className="relative h-[65vh] min-h-[460px] overflow-hidden sm:h-[70vh] lg:h-[75vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/kitchen-hero.jpg"
            alt="The Himalayan Shire's in-house kitchen"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-emerald-900/40 to-emerald-900/10" />
        <div className="absolute inset-x-0 bottom-0 pb-14 sm:pb-20 lg:pb-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/70">
                <span className="h-px w-8 bg-white/30" />
                Dining at The Shire
              </span>
              <h1 className="mt-5 font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Our In-House Kitchen
              </h1>
              <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-emerald-50/60 sm:text-lg">
                Cooked from scratch, with local produce, and served the way
                food should be — fresh, honest, and made for sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
        <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-emerald-200/20 blur-[130px]" />
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-600">
              Chef&apos;s Philosophy
            </span>
            <div className="mt-2 h-[2px] w-12 rounded-full bg-gold-400" />
            <p className="mt-8 text-lg leading-[1.9] text-emerald-900/80 sm:text-xl lg:text-2xl">
              Every meal at The Himalayan Shire is cooked in-house, from scratch,
              by a small kitchen team who treat guests the way they would treat
              family visiting for the weekend.
            </p>
            <p className="mt-6 text-base leading-[1.8] text-emerald-800/60 sm:text-lg">
              Nothing is trucked in pre-made — what you are served is what was
              cooking in the kitchen an hour before it reached your table.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-cream-50 py-20 sm:py-28 lg:py-36">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/40 blur-[140px]" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-14 max-w-2xl lg:mb-20">
            <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.25em] text-gold-600">
              <span className="h-px w-6 bg-gold-400" />
              What Makes It Different
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl">
              The kitchen works on trust, not a clock.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-emerald-200/50 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-300/50 hover:shadow-lg sm:p-10"
              >
                <span className="font-display text-[11px] font-black tracking-[0.15em] text-emerald-300">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-emerald-950 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.8] text-emerald-800/65 sm:text-base">
                  {item.body}
                </p>
                <span className="mt-4 block h-[3px] w-0 rounded-full bg-emerald-600 transition-all duration-500 group-hover:w-12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
        <div aria-hidden className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-gold-200/20 blur-[130px]" />
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-emerald-200 lg:hidden" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-emerald-600">
                  The Setting
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-black tracking-tight text-emerald-950 sm:text-3xl">
                Food that fits
                <br />
                <span className="text-gold-600">a mountain stay.</span>
              </h3>
            </div>
            <div className="lg:col-span-3">
              <p className="text-base leading-[1.85] text-emerald-800/70 sm:text-lg">
                The kind of cooking that fits a quiet mountain stay rather than
                a hotel banquet hall. Meals are included as part of your stay
                — come hungry after a day on the trails around Fagu and Kufri.
              </p>
              <p className="mt-5 text-base leading-[1.85] text-emerald-800/50 sm:text-lg">
                Every dish tells the story of the region — from slow-cooked
                Himalayan curries to simple, nourishing dal that tastes like
                it has been simmering all day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-emerald-950 py-20 sm:py-24 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-800/50 blur-[120px]" />
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Taste it for yourself
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream-200/60 sm:text-lg">
            Meals are included as part of your stay — come hungry after a day
            on the trails around Fagu and Kufri.
          </p>
          <Link
            href="/#rooms"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-emerald-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-xl"
          >
            Check Rooms &amp; Book
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
