import { rooms } from "@/lib/rooms";
import { getPublicRoomImages } from "@/lib/room-images";
import { notFound } from "next/navigation";

// Room photos are admin-managed, so render fresh on every request.
export const dynamic = "force-dynamic";

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

  const images = await getPublicRoomImages(slug);

  return (
    <main className="min-h-screen flex flex-col font-sans selection:bg-gold-200/30">
      <SiteNav />
      <div className="flex-1">
        <RoomPageContent room={room} images={images} />
      </div>
      <SiteFooter />
    </main>
  );
}
