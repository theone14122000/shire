import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return {};

  const title = `${room.name} Room — Luxury Offbeat Homestay in Fagu, Near Kufri & Shimla`;
  const description = `${room.name}: a ${room.category.toLowerCase()} with ${room.size.toLowerCase()} of space and ${room.view.toLowerCase()}, set in The Himalayan Shire — a family-run offbeat homestay in Fagu, near Kufri, a short drive from Shimla. Part of one of the most loved luxury stays around Himachal.`;

  return {
    title,
    description,
    keywords: [
      "Fagu homestay",
      "homestay near Kufri",
      "offbeat homestay Shimla",
      "luxury stay Shimla",
      `${room.name} room Fagu`,
      `${room.name} room Shimla`,
      "private villa Shimla",
    ],
    alternates: { canonical: `/rooms/${room.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://shire-nu.vercel.app/rooms/${room.slug}`,
      images: room.images.length > 0 ? [room.images[0]] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: room.images.length > 0 ? [room.images[0]] : undefined,
    },
  };
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
