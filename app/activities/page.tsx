import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { ActivitiesContent as ActivitiesView } from "../components/activities/ActivitiesContent";
import { getPageContent } from "@/lib/page-content";
import { ACTIVITIES_PAGE_KEY, mergeActivities } from "@/lib/activities-content";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const db = await getPageContent(ACTIVITIES_PAGE_KEY);
  const content = mergeActivities(db as Record<string, unknown> | null | undefined);

  const kicker = content.hero?.kicker ?? "Experiences";
  const heading = content.hero?.heading ?? "Every moment, curated.";
  const description =
    content.hero?.description ??
    "From quiet corners on the property to peaks in the Himalayas - there is always something waiting for you.";

  return {
    title: `${kicker} | Himalayan Shire - Premium Stay in Shimla, Himachal Pradesh`,
    description,
    keywords: [
      "Himalayan Shire",
      "activities",
      "things to do in Shimla",
      "premium experiences Shimla",
      "mountain activities Himachal Pradesh",
    ],
    openGraph: {
      title: `Himalayan Shire - ${kicker}`,
      description,
      type: "website",
      url: "https://shire-nu.vercel.app/activities",
      images: ["/images/hero-1.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Himalayan Shire - ${kicker}`,
      description,
      images: ["/images/hero-1.jpg"],
    },
    alternates: { canonical: "/activities" },
  };
}

export default async function ActivitiesPage() {
  const db = await getPageContent(ACTIVITIES_PAGE_KEY);
  const content = mergeActivities(db as Record<string, unknown> | null | undefined);

  return (
    <main className="min-h-screen bg-[#fffdf7] font-sans text-emerald-950 selection:bg-gold-200/30">
      <SiteNav />
      <ActivitiesView content={content} />
      <SiteFooter />
    </main>
  );
}