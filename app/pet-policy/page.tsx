import type { Metadata } from "next";
import PetPolicyContent from "./PetPolicyContent";

export const dynamic = "force-dynamic";

const TITLE = "Pet Policy | The Himalayan Shire";
const DESCRIPTION =
  "Pet policy of The Himalayan Shire, Fagu — pre-approval, leash and supervision rules, cleaning responsibilities, and the Rs. 500 per day pet fee for stays near Shimla.";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
      "Himalayan Shire pet policy",
      "pet policy homestay Shimla",
      "pet rules Fagu homestay",
      "dog policy Himachal homestay",
      "pet fee Shimla homestay",
      "travelling with pets Himachal Pradesh",
    ],
    alternates: { canonical: "/pet-policy" },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      type: "website",
      url: "https://www.thehimalayanshire.com/pet-policy",
      images: ["/images/hero-1.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: ["/images/hero-1.jpg"],
    },
  };
}

export default function PetPolicyPage() {
  return <PetPolicyContent />;
}
