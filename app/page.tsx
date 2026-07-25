import { TopBar } from "./components/TopBar";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { FloatingActions } from "./components/FloatingActions";
import { Hero } from "./components/home/Hero";
import { HomeEditorial } from "./components/home/HomeEditorial";

/**
 * Home page composition.
 *
 * Flow: Attention → Story → Product → Incentive → Value → Quality →
 *       Emotion → Proof → Content → Action
 *
 * Each section reads from `lib/content.ts`. When the MySQL backend
 * lands, swap the data source without changing the section components.
 */
export default function Home() {
  return (
    <>
      <TopBar />
      <SiteNav />
      <main id="main" className="relative">
        <Hero />
        <HomeEditorial />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
