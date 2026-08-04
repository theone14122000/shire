import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { FloatingActions } from "./components/FloatingActions";
import { Hero } from "./components/home/Hero";
import { HomeEditorial } from "./components/home/HomeEditorial";

async function getHomepageContent() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/homepage`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function Home() {
  const content = await getHomepageContent();

  return (
    <>
      <SiteNav />
      <main id="main" className="relative">
        <Hero content={content} />
        <HomeEditorial />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}