import type { Metadata } from "next";
import { faqMetadata } from "../metadata";
import FaqPageContent from "./FaqPageContent";
import { getFaqJsonLd } from "@/lib/faq";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return faqMetadata();
}

// FAQPage JSON-LD is generated from the same FAQS array the visible page
// renders (lib/faq.tsx) — schema and content cannot drift apart.
const FAQ_JSONLD = getFaqJsonLd();

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.thehimalayanshire.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FAQ",
      item: "https://www.thehimalayanshire.com/faq",
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <FaqPageContent />
    </>
  );
}
