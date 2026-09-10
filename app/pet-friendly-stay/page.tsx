import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { brand } from "@/lib/content";

const BASE = "https://www.thehimalayanshire.com";

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pet-Friendly Stay",
      item: `${BASE}/pet-friendly-stay`,
    },
  ],
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is The Himalayan Shire pet-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The Himalayan Shire in Fagu, near Shimla, welcomes well-behaved pets. Small pets (up to about 6 kg) are generally welcomed, and larger breeds can be accommodated when you book the entire villa or on quieter days. Pre-approval from the property management is required before you bring your pet.",
      },
    },
    {
      "@type": "Question",
      name: "Are dogs welcome at The Himalayan Shire?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes, dogs are welcome. Pets must be leashed in common areas, never left unattended, and kept quiet so other guests are not disturbed. Please read the full pet policy before booking.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a pet fee at The Himalayan Shire?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes, there is a pet fee of Rs. 500 per day, per pet. Guests are also responsible for any damage or soiling caused by their pet.",
      },
    },
    {
      "@type": "Question",
      name: "What should I bring for my pet?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Bring your pet's food, any medications, a leash, and familiar bedding or a toy. Keeping your pet's routine and comfort items with you makes the stay smoother for everyone.",
      },
    },
    {
      "@type": "Question",
      name: "Is the area around Fagu suitable for walking pets?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Fagu sits at 7,500 ft surrounded by apple orchards, pine forests, and open lawns, with quiet lanes ideal for walking your pet. The surrounding Shimla ridge offers scenic, pet-friendly walks.",
      },
    },
  ],
};

const FAQS = [
  {
    q: "Is The Himalayan Shire pet-friendly?",
    a: "Yes. The Himalayan Shire in Fagu, near Shimla, welcomes well-behaved pets. Small pets (up to about 6 kg) are generally welcomed, and larger breeds can be accommodated when you book the entire villa or on quieter days. Pre-approval from the property management is required before you bring your pet.",
  },
  {
    q: "Are dogs welcome at The Himalayan Shire?",
    a: "Yes, dogs are welcome. Pets must be leashed in common areas, never left unattended, and kept quiet so other guests are not disturbed. Please read the full pet policy before booking.",
  },
  {
    q: "Is there a pet fee at The Himalayan Shire?",
    a: "Yes, there is a pet fee of Rs. 500 per day, per pet. Guests are also responsible for any damage or soiling caused by their pet.",
  },
  {
    q: "What should I bring for my pet?",
    a: "Bring your pet's food, any medications, a leash, and familiar bedding or a toy. Keeping your pet's routine and comfort items with you makes the stay smoother for everyone.",
  },
  {
    q: "Is the area around Fagu suitable for walking pets?",
    a: "Yes. Fagu sits at 7,500 ft surrounded by apple orchards, pine forests, and open lawns, with quiet lanes ideal for walking your pet. The surrounding Shimla ridge offers scenic, pet-friendly walks.",
  },
];

export const metadata = {
  title: "Pet-Friendly Stay in Fagu, Near Shimla | The Himalayan Shire",
  description:
    "A pet-friendly stay in Fagu, near Shimla. Travel with your dog to The Himalayan Shire — seven warm rooms, apple orchards, and pine views at 7,500 ft, with a clear pet policy.",
  keywords: [
    "pet friendly stay in Fagu",
    "pet friendly stay near Shimla",
    "pet friendly homestay in Fagu",
    "dog friendly stay in Shimla",
    "pet friendly accommodation near Shimla",
    "pet friendly property in Himachal Pradesh",
    "pet friendly hotel in Fagu",
    "travel with pets Himachal Pradesh",
  ],
  alternates: { canonical: `${BASE}/pet-friendly-stay` },
  openGraph: {
    title: "Pet-Friendly Stay in Fagu, Near Shimla | The Himalayan Shire",
    description:
      "Travel with your dog to The Himalayan Shire — a pet-friendly homestay in Fagu, near Shimla, with warm rooms, orchards, and pine views.",
    type: "website",
    url: `${BASE}/pet-friendly-stay`,
    images: ["/images/hero-1.jpg"],
    siteName: "The Himalayan Shire",
  },
};

export default function PetFriendlyStayPage() {
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
          <span className="luxe-kicker text-gold-700">Pet-Friendly Stay</span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] text-emerald-950 sm:text-6xl lg:text-7xl">
            Bring your pet to the Himalayas.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.9] text-emerald-950/65 sm:text-lg">
            The Himalayan Shire is a pet-friendly stay in Fagu, near Shimla and Kufri. Travel with your dog to a family-run homestay surrounded by apple orchards and pine, at 7,500 ft in the Himalayas — a quiet, welcoming base for you and your four-legged companion.
          </p>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="luxe-kicker text-gold-700">Why stay with us</span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
                A home for you and your pet.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-[1.9] text-emerald-950/68 sm:text-lg">
              <p>
                We love having four-legged guests. Our property is a genuine pet-friendly stay in Fagu — a calm, family-run homestay where your dog can travel, rest, and explore the mountains alongside you.
              </p>
              <p>
                Set in the countryside near Shimla, the shire is surrounded by apple orchards, tall pine trees, and open lawns. There is plenty of quiet space to walk your pet, and the surrounding Shimla ridge offers scenic, pet-friendly walks.
              </p>
              <p>
                Every room is warm and thoughtfully kept, so both you and your pet can settle in comfortably. Whether you are planning a short escape or a longer Himalayan trip, we are happy to welcome your pet as part of the family.
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
                Pet-friendly, with a few simple rules.
              </h2>
            </div>
            <div className="space-y-0">
              {[
                "Pre-approval is required from the property management before you bring your pet.",
                "Pets must be leashed in common areas and never left unattended.",
                "Please keep your pet quiet so other guests and staff are not disturbed.",
                "You are responsible for cleaning up after your pet on the property and in the neighbourhood.",
                "You are responsible for any damage or soiling caused by your pet.",
                "A pet fee of Rs. 500 per day, per pet applies.",
              ].map((rule, i) => (
                <div key={rule} className="grid gap-5 border-t border-emerald-900/15 py-6 sm:grid-cols-[5rem_1fr]">
                  <span className="font-display text-sm font-semibold text-gold-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-[1.85] text-emerald-950/68">{rule}</p>
                </div>
              ))}
              <p className="border-t border-emerald-900/15 pt-6 text-base leading-[1.85] text-emerald-950/68">
                Before you book, please read our full{" "}
                <Link href="/pet-policy" className="font-bold text-emerald-800 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:text-gold-700">
                  pet policy
                </Link>{" "}
                — guests sign it before check-in.
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
              <span className="mt-2 block text-sm text-emerald-950/60">Seven warm, wood-finished rooms.</span>
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
              <span className="mt-2 block text-sm text-emerald-950/60">Ask about availability and pets.</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <span className="luxe-kicker text-gold-700">Questions</span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-emerald-950 sm:text-5xl">
            Pet-friendly stay, answered.
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
            Ready to travel with your pet?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-cream-100/62 sm:text-lg">
            Tell us your dates and how many of you there are — including your pet — and we will reply with availability and a simple plan for your stay.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://letsbook.me/booking/thehimalayanshire?checkin=2026-08-04&checkout=2026-08-05&adults=2&children=0"
              className="luxe-button"
            >
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
