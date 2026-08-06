"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { GALLERY_CATEGORIES } from "@/lib/gallery-types";
import type { GalleryItem } from "@/lib/gallery-types";

const INPUT_CLASS =
  "w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";

export default function AdminGalleryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    params.then(({ id: i }) => setId(i));
  }, [params]);

  const fetchItem = useCallback(async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/gallery/${id}`);
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (res.status === 404) {
        router.push("/admin/gallery");
        return;
      }
      const data = await res.json();
      setItem(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload/gallery", { method: "POST", body: formData });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Upload failed");
    }
    const data = await res.json();
    return data.url as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`/api/gallery/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.title,
          caption: item.caption,
          category: item.category,
          alt: item.alt,
          src: item.src,
          status: item.status,
        }),
      });

      if (res.ok) {
        setMessage("Saved successfully!");
        setTimeout(() => router.push("/admin/gallery"), 1000);
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to save");
      }
    } catch {
      setMessage("Connection failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="py-20 text-center text-sm text-emerald-800/40">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-white py-20 text-center">
          <p className="text-sm text-emerald-800/50">Image not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-parchment">
          Edit Image
        </h1>
        <p className="mt-0.5 text-sm text-emerald-800/50">
          Update image details, caption and visibility
        </p>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${
            message.includes("success")
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-display text-lg font-bold text-parchment">
            Image
          </h2>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-emerald-200/50 bg-emerald-950">
            <Image
              src={item.src}
              alt={item.alt ?? item.title}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-contain"
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <input
              type="text"
              value={item.src}
              onChange={(e) => setItem({ ...item, src: e.target.value })}
              className={INPUT_CLASS}
              placeholder="Image URL"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={async () => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = async () => {
                  const file = input.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  try {
                    const url = await uploadImage(file);
                    setItem((prev) => (prev ? { ...prev, src: url } : prev));
                  } catch (err) {
                    alert(err instanceof Error ? err.message : "Upload failed");
                  } finally {
                    setUploading(false);
                  }
                };
                input.click();
              }}
              className="shrink-0 rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-50"
            >
              <UploadCloud size={14} strokeWidth={1.8} className="mr-1.5 inline" />
              {uploading ? "Uploading..." : "Replace Image"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-display text-lg font-bold text-parchment">
            Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                Title
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => setItem({ ...item, title: e.target.value })}
                required
                className={INPUT_CLASS}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Category
                </label>
                <select
                  value={item.category}
                  onChange={(e) => setItem({ ...item, category: e.target.value })}
                  className={INPUT_CLASS}
                >
                  {GALLERY_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Status
                </label>
                <select
                  value={item.status}
                  onChange={(e) =>
                    setItem({ ...item, status: e.target.value as "published" | "hidden" })
                  }
                  className={INPUT_CLASS}
                >
                  <option value="published">Published</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                Caption
              </label>
              <input
                type="text"
                value={item.caption ?? ""}
                onChange={(e) => setItem({ ...item, caption: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Optional short caption"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                Alt Text
              </label>
              <input
                type="text"
                value={item.alt ?? ""}
                onChange={(e) => setItem({ ...item, alt: e.target.value })}
                className={INPUT_CLASS}
                placeholder="Accessibility description of the image"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/gallery")}
            className="rounded-xl border border-emerald-200 px-6 py-3 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
