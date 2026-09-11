import type { Metadata } from "next";
import { getMergedRoom, type Room } from "@/lib/room-content";
import { getPublicRoomImages } from "@/lib/room-images";
import { notFound } from "next/navigation";

// Room photos and details are admin-managed, so render fresh on every request.
export const dynamic = "force-dynamic";

import { SiteNav } from "../../components/SiteNav";
import { RoomPageContent } from "../../components/rooms/RoomPageContent";
import { SiteFooter } from "../../components/SiteFooter";

export async function generateStaticParams() {
  const { rooms } = await import("@/lib/rooms");
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
  const [room, managedImages] = await Promise.all([
    getMergedRoom(slug),
    getPublicRoomImages(slug),
  ]);
  if (!room) return {};

  // OG/Twitter must reflect the CMS-managed photos (which replace the
  // static defaults when configured), not the stale base set.

  const title = `${room.name} Room — Luxury Offbeat Homestay in Fagu, Near Kufri & Shimla`;
  const ogImage =
    managedImages.length > 0
      ? getImageUrl(managedImages[0].src)
      : room.images.length > 0
        ? getImageUrl(room.images[0])
        : undefined;  const viewText =
    room.viewLabel === "Location"
      ? `located on the ${room.view.toLowerCase()}`
      : room.viewLabel === "Bedding"
        ? `offering ${room.view.toLowerCase()}`
        : `and ${room.view.toLowerCase()}`;
  const description = `${room.name}: a ${room.category.toLowerCase()} with ${room.size.toLowerCase()} of space ${viewText}, set in The Himalayan Shire — a family-run offbeat homestay in Fagu, near Kufri, a short drive from Shimla. Part of one of the most loved luxury stays around Himachal.`;

  return {
    title,
    description,
    keywords: [
      "Fagu homestay",
      "homestay near Kufri",
      "premium rooms in Fagu",
      "premium rooms near Shimla",
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
      url: `https://www.thehimalayanshire.com/rooms/${room.slug}`,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function getImageUrl(src: string): string {
  if (src.startsWith("http")) return src;
  return `https://www.thehimalayanshire.com${src.startsWith("/") ? src : `/${src}`}`;
}

function getRoomSchema(room: { name: string; description: string; size: string; slug: string; facilities: string[] }, images: { src: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "@id": `https://www.thehimalayanshire.com/rooms/${room.slug}#room`,
    name: `${room.name} Room — The Himalayan Shire`,
    description: room.description,
    image: images.length > 0 ? getImageUrl(images[0].src) : undefined,
    url: `https://www.thehimalayanshire.com/rooms/${room.slug}`,
    floorSize: {
      "@type": "QuantitativeValue",
      value: parseInt(room.size) || undefined,
      unitCode: "FTK",
    },
    occupancy: {
      "@type": "QuantitativeValue",
      value: 2,
      unitCode: "ADO",
    },
    amenityFeature: (room.facilities || []).map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
    containedInPlace: {
      "@id": "https://www.thehimalayanshire.com/#business",
    },
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Independent queries for the same room — fetch in parallel.
  const [room, images] = await Promise.all([
    getMergedRoom(slug),
    getPublicRoomImages(slug),
  ]);

  if (!room) {
    notFound();
  }

  const roomSchema = getRoomSchema(room, images);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.thehimalayanshire.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rooms",
        item: "https://www.thehimalayanshire.com/#rooms",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${room.name} Room`,
        item: `https://www.thehimalayanshire.com/rooms/${room.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen flex flex-col font-sans selection:bg-gold-200/30">
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="flex-1">
        <RoomPageContent room={room} images={images} />
      </div>
      <SiteFooter />
    </main>
  );
}
