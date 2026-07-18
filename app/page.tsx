import { TopBar } from "./components/TopBar";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { FloatingActions } from "./components/FloatingActions";
import { Hero } from "./components/home/Hero";
import { BrandIntro } from "./components/home/BrandIntro";
import { FeaturedCollection } from "./components/home/FeaturedCollection";
import { SpecialOffers } from "./components/home/SpecialOffers";
import { WhyChooseUs } from "./components/home/WhyChooseUs";
import { WellnessEssentials } from "./components/home/WellnessEssentials";
import { TraditionalRemedies } from "./components/home/TraditionalRemedies";
import { QualitySection } from "./components/home/QualitySection";
import { TrustSection } from "./components/home/TrustSection";
import { ProductShowcase } from "./components/home/ProductShowcase";
import { FinalCTA } from "./components/home/FinalCTA";

/**
 * Home page composition.
 * TopBar (emerald contact strip) → SiteNav → Hero (full-bleed) → sections.
 * Each section is a self-contained client component that reads from
 * `lib/content.ts`. When the MySQL backend lands, swap the data
 * source without changing the section components.
 */
export default function Home() {
  return (
    <>
      <TopBar />
      <SiteNav />
      <main id="main" className="relative">
        <Hero />
        <BrandIntro />
        <FeaturedCollection />
        <SpecialOffers />
        <WhyChooseUs />
        <WellnessEssentials />
        <TraditionalRemedies />
        <QualitySection />
        <TrustSection />
        <ProductShowcase />
        <FinalCTA />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
