import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { ActivitiesContent as ActivitiesView } from "../components/activities/ActivitiesContent";
import { getPageContent } from "@/lib/page-content";
import { ACTIVITIES_PAGE_KEY, mergeActivities } from "@/lib/activities-content";

export const dynamic = "force-dynamic";

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