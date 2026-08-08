"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUp, Eye, EyeOff, PencilLine, Search } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery-types";

const INPUT_CLASS =
  "w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setItems(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.caption ?? "").toLowerCase().includes(q)
      );
    });
  }, [items, search, categoryFilter, statusFilter]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch {
      // ignore
    }
  }

  async function handleToggleStatus(item: GalleryItem) {
    const next = item.status === "published" ? "hidden" : "published";
    try {
      const res = await fetch(`/api/gallery/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: next } : i))
        );
      }
    } catch {
      // ignore
    }
  }

  async function handleMove(item: GalleryItem, dir: -1 | 1) {
    const sorted = [...items].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((i) => i.id === item.id);
    const target = sorted[index + dir];
    if (!target) return;
    try {
      const res = await fetch(`/api/gallery/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ swapWithId: target.id }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => {
            if (i.id === item.id) return { ...i, order: target.order };
            if (i.id === target.id) return { ...i, order: item.order };
            return i;
          })
        );
      }
    } catch {
      // ignore
    }
  }

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))).sort(),
    [items]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight text-emerald-900">
            Gallery
          </h1>
          <p className="mt-0.5 text-sm text-emerald-800/50">
            Manage gallery images, captions and ordering
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
        >
          + Upload Images
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_160px_160px]">
        <div className="relative">
          <Search
            size={15}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-800/40"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or caption…"
            className={`${INPUT_CLASS} pl-10`}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={INPUT_CLASS}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={INPUT_CLASS}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-white py-20 text-center">
          <p className="text-sm text-emerald-800/50">
            {items.length === 0
              ? "No gallery images yet — upload your first set."
              : "No images match your filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-emerald-200/50 bg-white shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt ?? item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute left-2 top-2 flex items-center gap-1.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      item.status === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-bold text-emerald-900">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800/50">
                  {item.category}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => handleMove(item, -1)}
                    disabled={index === 0}
                    className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ArrowUp size={13} strokeWidth={1.8} />
                  </button>
                  <button
                    onClick={() => handleMove(item, 1)}
                    disabled={index === filtered.length - 1}
                    className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ArrowDown size={13} strokeWidth={1.8} />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(item)}
                    className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50"
                    aria-label={item.status === "published" ? "Hide image" : "Publish image"}
                  >
                    {item.status === "published" ? (
                      <EyeOff size={13} strokeWidth={1.8} />
                    ) : (
                      <Eye size={13} strokeWidth={1.8} />
                    )}
                  </button>
                  <Link
                    href={`/admin/gallery/${item.id}/edit`}
                    className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50"
                    aria-label="Edit image"
                  >
                    <PencilLine size={13} strokeWidth={1.8} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg border border-red-200 p-1.5 text-red-600 transition-colors hover:bg-red-50"
                    aria-label="Delete image"
                  >
                    <span className="text-xs font-bold">×</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
