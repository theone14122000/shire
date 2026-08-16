import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { SustainabilityContent as SustainabilityView } from "../components/sustainability/SustainabilityContent";
import { getPageContent } from "@/lib/page-content";
import { SUSTAINABILITY_PAGE_KEY, mergeSustainability } from "@/lib/sustainability-content";

export const dynamic = "force-dynamic";

export default async function SustainabilityPage() {
  const db = await getPageContent(SUSTAINABILITY_PAGE_KEY);
  const content = mergeSustainability(db as Record<string, unknown> | null | undefined);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fffdf7] font-sans text-emerald-950 selection:bg-gold-200/30">
      <SiteNav />
      <SustainabilityView content={content} />
      <SiteFooter />
    </main>
  );
}
