import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { BOOKING_URL, brand } from "@/lib/content";

const BASE = "https://www.thehimalayanshire.com";

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Private Villa",
      item: `${BASE}/private-villa`,
    },
  ],
};

const FAQS = [
  {
    q: "Can we book the entire property?",
    a: "Yes. You can book any number of rooms, from just one room to all seven bedrooms — booking the whole property gives your group the entire shire to itself.",
  },
  {
    q: "Is the villa suitable for groups and families?",
    a: "Yes. The property has seven bedrooms, all with attached washrooms, plus shared spaces your group can use together — a big lawn with outdoor seating, a terrace balcony with a swing, a recreation floor with TT, carrom and board games, and a TV viewing lounge.",
  },
  {
    q: "Can we bring large dogs if we book the villa?",
    a: "Yes. Larger breeds are allowed when you book the entire villa. Pre-approval from the property management is still required, pets must be leashed and supervised, and a pet fee of Rs. 500 per day applies. Please read our full pet policy before booking.",
  },
  {
    q: "How do we book the villa?",
    a: "Tell us your dates and group size through our enquiry form or WhatsApp, and we will reply with availability and a simple plan for your stay. You can also check availability through our online booking page.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export const metadata = {
  title: "Private Villa in Fagu, Near Shimla | The Himalayan Shire",
  description:
    "Book the entire Himalayan Shire as a private villa in Fagu, near Shimla — seven bedrooms, lawns, terrace views, and shared spaces for groups and families.",
  keywords: [
    "private villa near Shimla",
    "private villa in Fagu",
    "private villa near Kufri",
    "entire villa Shimla",
    "entire homestay Fagu",
    "group stay near Shimla",
    "family villa near Shimla",
    "private stay in Fagu",
  ],
  alternates: { canonical: `${BASE}/private-villa` },
  openGraph: {
    title: "Private Villa in Fagu, Near Shimla | The Himalayan Shire",
    description:
      "The entire shire, all to yourselves — seven bedrooms, lawns, and mountain views for groups and families.",
    type: "website",
    url: `${BASE}/private-villa`,
    images: ["/images/hero-1.jpg"],
    siteName: "The Himalayan Shire",
  },
};

export default function PrivateVillaPage() {
  return (
    <main className="min-h-screen bg-[#f7f1e6] font-sans text-emerald-950 selection:bg-gold-200/30">
      <SiteNav />

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="luxe-link mb-12">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <span className="luxe-kicker text-gold-700">Private Villa</span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] text-emerald-950 sm:text-6xl lg:text-7xl">
            The entire shire, all to yourselves.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.9] text-emerald-950/65 sm:text-lg">
            Book the whole Himalayan Shire as a private villa in Fagu, near Kufri and Shimla — seven bedrooms with attached washrooms, surrounded by apple orchards and Himalayan views. Made for families, friends travelling together, and small groups who want the comfort of a home with the privacy of their own villa.
          </p>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="luxe-kicker text-gold-700">Why book the villa</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
                One property, your people, no strangers.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-[1.9] text-emerald-950/68 sm:text-lg">
              <p>
                When you take the entire villa, the shire runs around your group alone — your own pace for meals, bonfire evenings on the lawn, and nights that end whenever you want them to.
              </p>
              <p>
                Shared spaces stay exclusive to you: a big lawn with outdoor sofa seating, a terrace balcony with a two-seater swing and sweeping mountain views, a recreation floor with TT, carrom and board games, and a TV viewing lounge for slow evenings together.
              </p>
              <p>
                Practical things are handled — an in-house kitchen serving from 9am to 9pm, private parking for up to ten SUVs, and daily housekeeping — so a group stay here feels effortless rather than managed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="luxe-kicker text-gold-700">Good to know</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
                Flexible, the way groups need.
              </h2>
            </div>
            <div className="space-y-0">
              {[
                "Book any number of rooms, from just one room to all seven bedrooms — the whole property is yours when you take them all.",
                "Tell us your dates and group size, and we will reply with availability and a simple plan for your stay.",
                "Travelling with large dogs? Larger breeds are welcome when you book the entire villa, with pre-approval and our standard pet policy.",
                "Fagu sits between Kufri and Shimla — close enough for day trips, far enough that the villa stays quiet.",
              ].map((point, i) => (
                <div key={point} className="grid gap-5 border-t border-emerald-900/15 py-6 sm:grid-cols-[5rem_1fr]">
                  <span className="font-display text-sm font-semibold text-gold-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-[1.85] text-emerald-950/68">{point}</p>
                </div>
              ))}
              <p className="border-t border-emerald-900/15 pt-6 text-base leading-[1.85] text-emerald-950/68">
                Start with our{" "}
                <Link href="/contact" className="font-bold text-emerald-800 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:text-gold-700">
                  enquiry form
                </Link>{" "}
                or browse the{" "}
                <Link href="/#rooms" className="font-bold text-emerald-800 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:text-gold-700">
                  seven rooms
                </Link>{" "}
                to picture your group here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <span className="luxe-kicker text-gold-700">Plan your stay</span>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
            Explore the shire before you arrive.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/#rooms" className="card-luxe group">
              <span className="font-display text-xl font-semibold text-emerald-950">Explore our rooms</span>
              <span className="mt-2 block text-sm text-emerald-950/60">Seven bedrooms for your group.</span>
            </Link>
            <Link href="/gallery" className="card-luxe group">
              <span className="font-display text-xl font-semibold text-emerald-950">View the gallery</span>
              <span className="mt-2 block text-sm text-emerald-950/60">Rooms, orchards, and the view.</span>
            </Link>
            <Link href="/activities" className="card-luxe group">
              <span className="font-display text-xl font-semibold text-emerald-950">Things to do in Fagu</span>
              <span className="mt-2 block text-sm text-emerald-950/60">Walks, orchards, and the Shimla ridge.</span>
            </Link>
            <Link href="/contact" className="card-luxe group">
              <span className="font-display text-xl font-semibold text-emerald-950">Contact the shire</span>
              <span className="mt-2 block text-sm text-emerald-950/60">Ask about villa availability.</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <span className="luxe-kicker text-gold-700">Questions</span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
            Private villa, answered.
          </h2>
          <div className="mt-10 max-w-3xl space-y-0">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-t border-emerald-900/15 py-6 last:border-b">
                <h3 className="font-display text-lg font-semibold leading-snug text-emerald-950 sm:text-xl">
                  {faq.q}
                </h3>
                <p className="mt-3 text-base leading-[1.85] text-emerald-950/68">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-20 text-center text-cream-50 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] text-cream-50 sm:text-5xl">
            Planning a group getaway?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-cream-100/62 sm:text-lg">
            Tell us your dates and group size, and we will reply with availability and a simple plan for your villa stay.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={BOOKING_URL} className="luxe-button">
              Book Your Stay
            </a>
            <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="luxe-button luxe-button-dark">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
    </main>
  );
}
