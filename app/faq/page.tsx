import type { Metadata } from "next";
import { faqMetadata } from "../metadata";
import FaqPageContent from "./FaqPageContent";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return faqMetadata();
}

const BASE = "https://www.thehimalayanshire.com";

// Plain-text mirrors of the visible FAQs (answers contain links in the UI,
// which cannot be serialized into JSON-LD). Text matches the page content.
const FAQ_ENTITIES = [
  {
    question: "How many rooms do you have and can we book just 1 room?",
    answer:
      "We have a total of seven bedrooms — all with attached washrooms. You can book any number of rooms, from just one room to all seven rooms. All the information about the seven rooms is mentioned in the rooms section of the website (https://www.thehimalayanshire.com/#rooms).",
  },
  {
    question: "Is it a drive-in property with private parking?",
    answer:
      "Yes, all cars, big and small, and even tempo travellers can easily reach the property. The road is metalled. We can park up to 10 SUVs. Access may temporarily be disturbed in case of heavy snowfall — so if you are planning to travel during Jan-Feb, do ask us about the current situation.",
  },
  {
    question: "Where is Fagu?",
    answer:
      "Fagu is located 19 kms ahead of Shimla, 5 kms ahead of Kufri, on the main highway going towards Theog / Narkanda. Our property is 2 kms on the link road from Fagu.",
  },
  {
    question: "What is the fooding situation at the property?",
    answer:
      "We serve an a la carte menu from 9am to 9pm. We have a variety of dishes and an experienced chef to prepare them for you. We do require food orders well in advance (preferably 2 hours' preparation time) as we make everything fresh.",
  },
  {
    question: "Can the guests access the kitchen?",
    answer:
      "As a general rule, guests cannot access the kitchen. In limited cases — for example, where mothers need to prepare food for infants — we do allow kitchen access. We provide a kettle, microwave, and a hot plate outside of the kitchen in case guests need to reheat food or prepare coffee/tea.",
  },
  {
    question: "What is there to do around the property / what activities?",
    answer:
      "Please read our activities page about activities in and around The Himalayan Shire (https://www.thehimalayanshire.com/activities).",
  },
  {
    question: "Do you have an outdoor sitting area?",
    answer:
      "Yes, we have a big lawn with outdoor sofa seating. We can light bonfires and barbecue on request. We also have a terrace balcony on the 2nd floor with a 2-seater swing and additional seating for 5-6 people. This balcony is common for all the guests and has an amazing view on all sides.",
  },
  {
    question: "Do you have housekeeping service?",
    answer:
      "Yes. Rooms are cleaned every day between 11am and 5pm. We change the bedsheet every alternate day. In case guests request a bedsheet change earlier, we charge a cleaning fee of Rs. 500.",
  },
  {
    question: "Is it a pet-friendly property?",
    answer:
      "In certain cases we do allow pets. Pets weighing up to 6 kgs are mostly welcomed, unless they are untrained or might be a hazard to other guests or staff. Larger breeds are also allowed if you are booking the entire villa, or you come on a day with fewer guests around. Please ask us for our complete pet policy before booking — guests have to sign the pet policy before check-in. We charge a Rs. 500 per day pet fee. Read more about our pet-friendly stay in Fagu (https://www.thehimalayanshire.com/pet-friendly-stay).",
  },
  {
    question: "Does Fagu receive snowfall?",
    answer:
      "Yes. Fagu typically receives snowfall during the winter months of December to February, although timing and intensity vary from year to year. If you are travelling in peak winter, do ask us about the current road and snow situation before you start.",
  },
  {
    question: "What rooms are available at the property?",
    answer:
      "We have seven bedrooms across Premium, Deluxe, and Standard categories — including Deodar, Buransh, Chir Pine, Blue Pine, Walnut, Mohru, and Tosh. See all seven in the rooms section (https://www.thehimalayanshire.com/#rooms), or read about our private villa option (https://www.thehimalayanshire.com/private-villa) if you are travelling as a group.",
  },
  {
    question: "How can we enquire or book a stay?",
    answer:
      "Send us your dates and group size through our enquiry form (https://www.thehimalayanshire.com/contact), message us on WhatsApp, or check availability on our online booking page. We reply with availability and a simple plan for your stay.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE}/faq#faq`,
  mainEntity: FAQ_ENTITIES.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <FaqPageContent />
    </>
  );
}
