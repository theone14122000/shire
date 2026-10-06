/**
 * Single source of truth for the site-wide FAQ.
 *
 * Consumed by:
 *   - app/faq/FaqPageContent.tsx  (visible accordion — uses `answer` JSX when
 *     present, otherwise `answerText`)
 *   - app/faq/page.tsx            (FAQPage JSON-LD — uses `answerText`)
 *   - app/api/ai/property         (machine-readable FAQ export)
 *
 * Every answer must be factually supported by the property's own published
 * content (rooms, policies, FAQ answers given by the owners). Never invent
 * prices, distances, travel times or availability.
 *
 * NOTE: page-specific FAQs on /pet-friendly-stay and /private-villa are
 * separate, self-contained Q&As for those pages and stay where they are.
 */

import type { ReactNode } from "react";
import Link from "next/link";

export const MAPS_URL =
  "https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394";

export const linkClass =
  "font-bold text-emerald-800 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:text-gold-700";

export type SiteFaq = {
  question: string;
  /** Plain-text answer (canonical URLs inline) — used by JSON-LD + AI API. */
  answerText: string;
  /** Optional rich version for the visible page (internal links). */
  answer?: ReactNode;
};

export const FAQS: SiteFaq[] = [
  {
    question: "How many rooms do you have and can we book just 1 room?",
    answerText:
      "We have a total of seven bedrooms — all with attached washrooms. You can book any number of rooms, from just one room to all seven rooms. All the information about the seven rooms is mentioned in the rooms section of the website (https://www.thehimalayanshire.com/#rooms).",
    answer: (
      <>
        We have a total of seven bedrooms - all with attached washrooms. You can book any number of rooms, from just one room to all seven rooms. All the information about the seven rooms is mentioned in the <Link href="/#rooms" className={linkClass}>rooms section</Link> of the website.
      </>
    ),
  },
  {
    question: "Is it a drive-in property with private parking?",
    answerText:
      "Yes, all cars, big and small, and even tempo travellers can easily reach the property. The road is metalled. We can park up to 10 SUVs. Access may temporarily be disturbed in case of heavy snowfall - so if you are planning to travel during Jan-Feb, do ask us about the current situation.",
  },
  {
    question: "Where is Fagu?",
    answerText:
      "Fagu is located 19 kms ahead of Shimla, 5 kms ahead of Kufri, on the main highway going towards Theog / Narkanda. Our property is 2 kms on the link road from Fagu. See the exact location on Google Maps (https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394).",
    answer: (
      <>
        Fagu is located 19 kms ahead of Shimla, 5 kms ahead of Kufri, on the main highway going towards Theog / Narkanda. Our property is 2 kms on the link road from Fagu. <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>See the exact location on Google Maps</a>.
      </>
    ),
  },
  {
    question: "Where is The Himalayan Shire located?",
    answerText:
      "The Himalayan Shire is located in Fagu, Himachal Pradesh — at Dehna Road, near Talayi Village, 171209, India. Fagu sits on the main highway towards Theog / Narkanda, 19 kms ahead of Shimla and 5 kms ahead of Kufri, and the property is 2 kms on the link road from Fagu. See the exact location on Google Maps (https://www.google.com/maps?ll=31.066671,77.309332&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=4674173627328913394).",
    answer: (
      <>
        The Himalayan Shire is located in Fagu, Himachal Pradesh — at Dehna Road, near Talayi Village, 171209, India. Fagu sits on the main highway towards Theog / Narkanda, 19 kms ahead of Shimla and 5 kms ahead of Kufri, and the property is 2 kms on the link road from Fagu. <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>See the exact location on Google Maps</a>.
      </>
    ),
  },
  {
    question: "How far is The Himalayan Shire from Shimla and Kufri?",
    answerText:
      "The property is in Fagu — 19 kms ahead of Shimla and 5 kms ahead of Kufri — and 2 kms on the link road from Fagu. Actual travel time depends on mountain road and weather conditions; if you are travelling in winter (Jan-Feb), please ask us about the current road situation before you start.",
  },
  {
    question: "Does The Himalayan Shire have Himalayan views?",
    answerText:
      "Yes. The property sits at 7,500 ft in Fagu amid apple orchards and pines, with views of the snow-capped mountains, including the Kinnaur Kailash range. Room views differ by room (mountain, valley, garden or forest) and each room page lists its own view (https://www.thehimalayanshire.com/#rooms); the common terrace balcony on the 2nd floor has an open view in all directions.",
    answer: (
      <>
        Yes. The property sits at 7,500 ft in Fagu amid apple orchards and pines, with views of the snow-capped mountains, including the Kinnaur Kailash range. Room views differ by room (mountain, valley, garden or forest) and each room page lists its own view in the <Link href="/#rooms" className={linkClass}>rooms section</Link>; the common terrace balcony on the 2nd floor has an open view in all directions.
      </>
    ),
  },
  {
    question: "What is the fooding situation at the property?",
    answerText:
      "We serve an a la carte menu from 9am to 9pm. We have a variety of dishes and an experienced chef to prepare them for you. We do require food orders well in advance (preferably 2 hours' preparation time) as we make everything fresh.",
  },
  {
    question: "Can the guests access the kitchen?",
    answerText:
      "As a general rule, guests cannot access the kitchen. In limited cases - for example, where mothers need to prepare food for infants - we do allow kitchen access. We provide a kettle, microwave, and a hot plate outside of the kitchen in case guests need to reheat food or prepare coffee/tea.",
  },
  {
    question: "What is there to do around the property / what activities?",
    answerText:
      "Please read our activities page about activities in and around The Himalayan Shire (https://www.thehimalayanshire.com/activities).",
    answer: (
      <>
        Please read <Link href="/activities" className={linkClass}>this blog</Link> about activities in and around The Himalayan Shire.
      </>
    ),
  },
  {
    question: "Do you have an outdoor sitting area?",
    answerText:
      "Yes, we have a big lawn with outdoor sofa seating. We can light bonfires and barbecue on request. We also have a terrace balcony on the 2nd floor with a 2-seater swing and additional seating for 5-6 people. This balcony is common for all the guests and has an amazing view on all sides.",
  },
  {
    question: "Do you have housekeeping service?",
    answerText:
      "Yes. Rooms are cleaned every day between 11am and 5pm. We change the bedsheet every alternate day. In case guests request a bedsheet change earlier, we charge a cleaning fee of Rs. 500.",
  },
  {
    question: "Is it a pet-friendly property?",
    answerText:
      "In certain cases we do allow pets. Pets weighing up to 6 kgs are mostly welcomed, unless they are untrained or might be a hazard to other guests or staff. Larger breeds are also allowed if you are booking the entire villa, or you come on a day with fewer guests around. Please ask us for our complete pet policy before booking - guests have to sign the pet policy before check-in. We charge a Rs. 500 per day pet fee. Read more about our pet-friendly stay in Fagu (https://www.thehimalayanshire.com/pet-friendly-stay).",
    answer: (
      <>
        In certain cases we do allow pets. Pets weighing up to 6 kgs are mostly welcomed, unless they are untrained or might be a hazard to other guests or staff. Larger breeds are also allowed if you are booking the entire villa, or you come on a day with fewer guests around. Please ask us for our complete pet policy before booking - guests have to sign the pet policy before check-in. We charge a Rs. 500 per day pet fee. Read more about our <Link href="/pet-friendly-stay" className={linkClass}>pet-friendly stay in Fagu</Link>.
      </>
    ),
  },
  {
    question: "Does Fagu receive snowfall?",
    answerText:
      "Yes. Fagu typically receives snowfall during the winter months of December to February, although timing and intensity vary from year to year. If you are travelling in peak winter, do ask us about the current road and snow situation before you start.",
  },
  {
    question: "What rooms are available at the property?",
    answerText:
      "We have seven bedrooms across Premium, Deluxe, and Standard categories — including Deodar, Buransh, Chir Pine, Blue Pine, Walnut, Mohru, and Tosh. See all seven in the rooms section (https://www.thehimalayanshire.com/#rooms), or read about our private villa option (https://www.thehimalayanshire.com/private-villa) if you are travelling as a group.",
    answer: (
      <>
        We have seven bedrooms across Premium, Deluxe, and Standard categories — including Deodar, Buransh, Chir Pine, Blue Pine, Walnut, Mohru, and Tosh. See all seven in the <Link href="/#rooms" className={linkClass}>rooms section</Link>, or read about our <Link href="/private-villa" className={linkClass}>private villa option</Link> if you are travelling as a group.
      </>
    ),
  },
  {
    question: "Is The Himalayan Shire suitable for families and groups?",
    answerText:
      "Yes. The Himalayan Shire is a boutique homestay that suits couples and families who want the privacy and comfort of a home, and the entire property (all seven bedrooms) can be booked as a private villa if you are travelling as a group. More about the private villa option (https://www.thehimalayanshire.com/private-villa).",
    answer: (
      <>
        Yes. The Himalayan Shire is a boutique homestay that suits couples and families who want the privacy and comfort of a home, and the entire property (all seven bedrooms) can be booked as a <Link href="/private-villa" className={linkClass}>private villa</Link> if you are travelling as a group.
      </>
    ),
  },
  {
    question: "How can we enquire or book a stay?",
    answerText:
      "Send us your dates and group size through our enquiry form (https://www.thehimalayanshire.com/contact), message us on WhatsApp, or check availability on our online booking page (https://letsbook.me/booking/thehimalayanshire). We reply with availability and a simple plan for your stay.",
    answer: (
      <>
        Send us your dates and group size through our <Link href="/contact" className={linkClass}>enquiry form</Link>, message us on WhatsApp, or check availability on our online booking page. We reply with availability and a simple plan for your stay.
      </>
    ),
  },
];

const BASE = "https://www.thehimalayanshire.com";

/** FAQPage JSON-LD generated from the same array the page renders. */
export function getFaqJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE}/faq#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answerText },
    })),
  };
}
