import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { FloatingActions } from "./components/FloatingActions";
import { Hero } from "./components/home/Hero";
import { HomeEditorial } from "./components/home/HomeEditorial";
import { getHomepageSections } from "@/lib/homepage-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getHomepageSections();

  return (
    <>
      <SiteNav />
      <main id="main" className="relative">
        <Hero content={content} />
        <HomeEditorial content={content} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
