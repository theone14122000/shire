"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getFileSizeError,
  IMAGE_SIZE_HINT,
  uploadWithProgress,
} from "@/app/admin/components/upload";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);
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
    setUploadError("");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    if (!file) return;

    const sizeError = getFileSizeError(file);
    if (sizeError) {
      setUploadError(`Skipped: ${sizeError}`);
      e.currentTarget.reset();
      return;
    }

    setUploading(true);
    setUploadPercent(0);

    const result = await uploadWithProgress(file, "/api/upload", (percent) => {
      setUploadPercent(percent);
    });

    setUploading(false);

    if (result.ok && result.url) {
      setMedia((prev) => [
        { url: result.url!, alt: file.name, createdAt: new Date().toISOString() },
        ...prev,
      ]);
    } else {
      setUploadError(result.error || "Upload failed");
    }
    e.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-emerald-900">
          Media Library
        </h1>
        <p className="mt-0.5 text-sm text-emerald-800/50">
          Upload and manage images
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-bold text-emerald-900">
          Upload Image
        </h2>
        <form onSubmit={handleUpload} className="flex flex-wrap items-center gap-4">
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-emerald-900"
          />
          <button
            type="submit"
            disabled={uploading}
            className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
          >
            {uploading ? `Uploading ${uploadPercent}%` : "Upload"}
          </button>
        </form>
        <p className="mt-2 text-[11px] font-medium text-emerald-800/40">
          {IMAGE_SIZE_HINT}
        </p>
        {uploading && (
          <div className="mt-2 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${uploadPercent}%` }}
            />
          </div>
        )}
        {uploadError && (
          <p className="mt-2 text-sm font-medium text-red-600">{uploadError}</p>
        )}
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