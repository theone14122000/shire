"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BedDouble, Camera, ExternalLink } from "lucide-react";
import { rooms } from "@/lib/rooms";

interface RoomImageRow {
  id: string;
  src: string;
  order: number;
}

export default function AdminRoomsPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const router = useRouter();

  const fetchCounts = useCallback(async () => {
    try {
      const results: Record<string, number> = {};
      for (const room of rooms) {
        const res = await fetch(`/api/rooms/${room.slug}/images`);
        if (res.status === 401) {
          setAuthenticated(false);
          return;
        }
        const data = (await res.json()) as { images: RoomImageRow[]; defaultCount: number };
        results[room.slug] = data.images.length > 0 ? data.images.length : data.defaultCount;
      }
      setCounts(results);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-emerald-900">
          Rooms
        </h1>
        <p className="mt-0.5 text-sm text-emerald-800/50">
          Manage pictures and gallery images for each room page
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.slug}
            className="overflow-hidden rounded-2xl border border-emerald-200/50 bg-white shadow-sm"
          >
            <Link
              href={`/admin/rooms/${room.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden bg-emerald-50"
            >
              <Image
                src={room.images[0]}
                alt={room.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-emerald-950/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream-50 backdrop-blur">
                {room.category}
              </span>
            </Link>
            <div className="p-4">
              <h3 className="text-sm font-bold text-emerald-900">{room.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800/50">
                <Camera size={12} strokeWidth={1.8} />
                {loading ? "…" : counts[room.slug] ?? "…"} photos
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/admin/rooms/${room.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  Manage Images
                </Link>
                <Link
                  href={`/rooms/${room.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  <ExternalLink size={12} strokeWidth={1.8} />
                  View Room
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-3 rounded-2xl border border-emerald-200/50 bg-white p-5 shadow-sm">
        <BedDouble size={18} strokeWidth={1.8} className="shrink-0 text-emerald-700" />
        <p className="text-sm text-emerald-800/70">
          The first image in the list is used as the room&apos;s hero cover. Until you add
          images, each room shows its default photo set.
        </p>
      </div>
    </div>
  );
}