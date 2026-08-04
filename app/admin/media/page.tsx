"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const router = useRouter();

  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/media");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setMedia(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    if (!file) {
      setUploading(false);
      return;
    }

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadRes.ok) {
        const data = await uploadRes.json();
        setMedia((prev) => [
          { url: data.url, alt: data.filename, createdAt: new Date().toISOString() },
          ...prev,
        ]);
      }
    } catch {
      // ignore
    } finally {
      setUploading(false);
      e.currentTarget.reset();
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-parchment">
          Media Library
        </h1>
        <p className="mt-0.5 text-sm text-emerald-800/50">
          Upload and manage images
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-bold text-parchment">
          Upload Image
        </h2>
        <form onSubmit={handleUpload} className="flex items-center gap-4">
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment"
          />
          <button
            type="submit"
            disabled={uploading}
            className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">
          Loading...
        </div>
      ) : media.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-white py-20 text-center">
          <p className="text-sm text-emerald-800/50">No media uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-2xl border border-emerald-200/50 bg-white">
              <Image
                src={item.url}
                alt={item.alt ?? ""}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}