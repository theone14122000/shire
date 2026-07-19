import { rooms } from "@/lib/rooms";
import { notFound } from "next/navigation";

// 🔍 RELATIVE IMPORTS (adjust `../../` if your components live elsewhere)
import { SiteNav } from "../../components/SiteNav";
import { RoomPageContent } from "../../components/rooms/RoomPageContent";
import { SiteFooter } from "../../components/SiteFooter";

export async function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100/60 font-sans text-black selection:bg-emerald-200 selection:text-emerald-900">
      <SiteNav />
      <div className="flex-1">
        <RoomPageContent room={room} />
      </div>
      <SiteFooter />
    </main>
  );
}