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
    <main className="relative min-h-screen bg-[#f7f1e6] font-sans text-emerald-950 selection:bg-gold-200/30">
      <div className="absolute inset-0">
        <img
          src="/images/bg-sustan.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cream-50 opacity-50" />
      </div>
      <div className="relative">
        <SiteNav />
        <SustainabilityView content={content} />
        <SiteFooter />
      </div>
    </main>
  );
}