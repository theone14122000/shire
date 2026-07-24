import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { ChefHat, Apple, Wheat, Coffee, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our In-House Kitchen | The Himalayan Shire",
  description:
    "Home-style Himachali and North Indian cooking, made fresh daily at The Himalayan Shire, Fagu — using local produce and traditional recipes.",
};

const HIGHLIGHTS = [
  {
    icon: Apple,
    title: "Local, Seasonal Produce",
    body: "Vegetables and herbs sourced from nearby Fagu farms whenever possible, so meals change gently with the season instead of running off a fixed menu.",
  },
  {
    icon: ChefHat,
    title: "Himachali & North Indian Cooking",
    body: "Traditional recipes passed down through the kitchen team — comfort food made the way it's made at home, not hotel-style plating.",
  },
  {
    icon: Coffee,
    title: "Meals Timed Around You",
    body: "Breakfast, lunch, and dinner are cooked fresh per service rather than held on a buffet line, so what reaches your table is hot and just-made.",
  },
  {
    icon: Wheat,
    title: "Dietary Care",
    body: "Vegetarian, Jain, and other dietary preferences are accommodated — just let the team know a little ahead so the kitchen can plan properly.",
  },
];

export default function KitchenPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100/60 font-sans text-black">
      <SiteNav />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  HERO — cinematic full-bleed                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4faf5] via-emerald-900/30 to-emerald-900/10" />

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

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  EDITORIAL INTRO                                              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-emerald-300" />
              <ChefHat size={18} strokeWidth={1.4} className="text-emerald-600/40" />
              <span className="h-px w-10 bg-emerald-300" />
            </div>
            <p className="mt-8 text-lg leading-[1.9] text-neutral-700 sm:text-xl lg:text-2xl">
              Every meal at The Himalayan Shire is cooked in-house, from scratch,
              by a small kitchen team who treat guests the way they'd treat
              family visiting for the weekend.
            </p>
            <p className="mt-6 text-base leading-[1.8] text-neutral-500 sm:text-lg">
              Nothing is trucked in pre-made — what you are served is what was
              cooking in the kitchen an hour before it reached your table.
            </p>
            <span className="mt-10 h-px w-20 bg-emerald-200" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  HIGHLIGHTS — editorial feature grid                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-y border-emerald-200/60 bg-emerald-100/30 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-14 max-w-2xl lg:mb-20">
            <h2 className="font-display text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
              What Makes It
              <br />
              <span className="text-emerald-700">Different</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-500 sm:text-lg">
              Set against the pine forests of Fagu, on the Shimla–Narkanda
              highway — the kitchen draws on both Himachali tradition and
              familiar North Indian comfort food.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {HIGHLIGHTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative rounded-[1.5rem] border border-emerald-200/70 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/80 hover:shadow-lg sm:p-10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 transition-colors duration-300 group-hover:bg-emerald-700 group-hover:text-white">
                    <Icon size={20} strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-black sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.8] text-neutral-600 sm:text-base">
                    {item.body}
                  </p>
                  <span className="absolute bottom-0 left-8 h-[3px] w-0 rounded-full bg-emerald-600 transition-all duration-500 group-hover:w-12" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  LOCATION NOTE — atmospheric break                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-emerald-200 lg:hidden" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-emerald-700">
                  The Setting
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-black tracking-tight text-black sm:text-3xl">
                Food that fits
                <br />
                <span className="text-emerald-700">a mountain stay.</span>
              </h3>
            </div>
            <div className="lg:col-span-3">
              <p className="text-base leading-[1.85] text-neutral-600 sm:text-lg">
                The kind of cooking that fits a quiet mountain stay rather than
                a hotel banquet hall. Meals are included as part of your stay
                — come hungry after a day on the trails around Fagu and Kufri.
              </p>
              <p className="mt-5 text-base leading-[1.85] text-neutral-500 sm:text-lg">
                Every dish tells the story of the region — from slow-cooked
                Himalayan curries to simple, nourishing dal that tastes like
                it has been simmering all day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  CTA                                                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-emerald-200/60 bg-emerald-100/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="font-display text-2xl font-black tracking-tight text-black sm:text-3xl lg:text-4xl">
            Taste it for yourself
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Meals are included as part of your stay — come hungry after a day
            on the trails around Fagu and Kufri.
          </p>
          <Link
            href="/#rooms"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl"
          >
            Check Rooms &amp; Book
            <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
