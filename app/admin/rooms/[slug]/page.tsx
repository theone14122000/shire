"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  CloudUpload,
  Copy,
  Crown,
  ExternalLink,
  ImagePlus,
  Loader2,
  Trash2,
  XCircle,
} from "lucide-react";
import { rooms } from "@/lib/rooms";

interface RoomImageRow {
  id: string;
  src: string;
  alt: string | null;
  caption: string | null;
  order: number;
  createdAt: string;
}

interface UploadRow {
  file: File;
  progress: number;
  status: "uploading" | "saved" | "error";
  error?: string;
  src?: string;
}

const INPUT_CLASS =
  "w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";

export default function AdminRoomImagesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);
  const [images, setImages] = useState<RoomImageRow[]>([]);
  const [defaultCount, setDefaultCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [uploadRows, setUploadRows] = useState<UploadRow[]>([]);
  const [importingDefaults, setImportingDefaults] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    params.then(({ slug: s }) => setSlug(s));
  }, [params]);

  const room = rooms.find((r) => r.slug === slug);

  const fetchImages = useCallback(async () => {
    if (!slug) return;
    try {
      const res = await fetch(`/api/rooms/${slug}/images`);
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (res.status === 404) {
        router.push("/admin/rooms");
        return;
      }
      const data = (await res.json()) as {
        images: RoomImageRow[];
        defaultCount: number;
      };
      setImages(data.images);
      setDefaultCount(data.defaultCount);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  if (!room) {
    return null;
  }

  const currentRoom = room;

  function updateRow(index: number, patch: Partial<UploadRow>) {
    setUploadRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row))
    );
  }

  function uploadOne(file: File, index: number) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload/room");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        updateRowProgress(index, pct);
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        updateRow(index, { progress: 100, status: "saved", src: data.url });
      } else {
        let error = "Upload failed";
        try {
          error = JSON.parse(xhr.responseText).error || error;
        } catch {
          // keep default
        }
        updateRow(index, { status: "error", error });
      }
    };
    xhr.onerror = () =>
      updateRow(index, { status: "error", error: "Network error" });
    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  }

  function updateRowProgress(index: number, pct: number) {
    setUploadRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, progress: pct } : row))
    );
  }

  function addFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const startIndex = uploadRows.length;
    setUploadRows((prev) => [
      ...prev,
      ...list.map((file) => ({
        file,
        progress: 0,
        status: "uploading" as const,
      })),
    ]);
    list.forEach((file, offset) => uploadOne(file, startIndex + offset));
  }

  async function addImage(src: string) {
    if (!src.trim() || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch(`/api/rooms/${currentRoom.slug}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: src.trim() }),
      });
      if (res.ok) {
        const row = (await res.json()) as RoomImageRow;
        setImages((prev) => [...prev, row]);
        setNewUrl("");
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to add image");
      }
    } catch {
      setMessage("Connection failed");
    } finally {
      setBusy(false);
    }
  }

  async function addSavedUploads() {
    const ready = uploadRows.filter((r) => r.status === "saved" && r.src);
    for (const row of ready) {
      await addImage(row.src!);
    }
    setUploadRows([]);
  }

  async function importDefaults() {
    if (importingDefaults || busy) return;
    setImportingDefaults(true);
    setMessage("");
    for (const src of currentRoom.images) {
      const res = await fetch(`/api/rooms/${currentRoom.slug}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src }),
      });
      if (res.ok) {
        const row = (await res.json()) as RoomImageRow;
        setImages((prev) => [...prev, row]);
      }
    }
    setImportingDefaults(false);
    setMessage("Default images imported — you can now delete or reorder them freely.");
  }

  async function handleMove(row: RoomImageRow, dir: -1 | 1) {
    const sorted = [...images].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((i) => i.id === row.id);
    const target = sorted[index + dir];
    if (!target || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/rooms/${currentRoom.slug}/images/${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ swapWithId: target.id }),
      });
      if (res.ok) {
        setImages((prev) =>
          prev.map((i) => {
            if (i.id === row.id) return { ...i, order: target.order };
            if (i.id === target.id) return { ...i, order: row.order };
            return i;
          })
        );
      }
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(row: RoomImageRow) {
    if (!confirm("Remove this image from the room?")) return;
    try {
      const res = await fetch(`/api/rooms/${currentRoom.slug}/images/${row.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setImages((prev) => prev.filter((i) => i.id !== row.id));
      }
    } catch {
      // ignore
    }
  }

  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {room.category}
          </p>
          <h1 className="mt-1 font-display text-2xl font-black tracking-tight text-emerald-900">
            {room.name} — Pictures &amp; Gallery
          </h1>
          <p className="mt-0.5 text-sm text-emerald-800/50">
            {loading
              ? "Loading..."
              : sorted.length > 0
                ? `${sorted.length} managed photo${sorted.length === 1 ? "" : "s"} (first one is the page cover)`
                : `Using ${defaultCount} default photo${defaultCount === 1 ? "" : "s"} — add your own below`}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/rooms"
            className="rounded-xl border border-emerald-200 px-5 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            All Rooms
          </Link>
          <Link
            href={`/rooms/${room.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
          >
            <ExternalLink size={14} strokeWidth={1.8} />
            View Room Page
          </Link>
        </div>
      </div>

      {message && (
        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">Loading...</div>
      ) : (
        <>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
            }}
            className="mb-8 rounded-2xl border-2 border-dashed border-emerald-300 bg-white px-6 py-12 text-center transition-colors hover:border-emerald-500"
          >
            <CloudUpload size={34} strokeWidth={1.4} className="mx-auto text-emerald-800/40" />
            <p className="mt-3 text-sm font-bold text-emerald-900">
              Drop photos here, or click to browse
            </p>
            <p className="mt-1 text-xs text-emerald-800/50">
              JPEG, PNG, WebP or GIF · up to 5MB each
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
            >
              <ImagePlus size={15} strokeWidth={1.8} />
              Choose Files
            </button>

            <div className="mx-auto mt-6 flex max-w-md items-center gap-3">
              <div className="h-px flex-1 bg-emerald-200" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800/40">
                or paste
              </span>
              <div className="h-px flex-1 bg-emerald-200" />
            </div>

            <div className="mx-auto mt-5 flex max-w-md gap-3">
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImage(newUrl);
                  }
                }}
                placeholder="Image URL, e.g. /images/rooms/deodar-extra.jpg"
                className={INPUT_CLASS}
              />
              <button
                type="button"
                disabled={busy || !newUrl.trim()}
                onClick={() => addImage(newUrl)}
                className="shrink-0 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>

          {uploadRows.length > 0 && (
            <div className="mb-8 space-y-3">
              {uploadRows.map((row, index) => (
                <div
                  key={`${row.file.name}-${index}`}
                  className="flex items-center gap-4 rounded-2xl border border-emerald-200/50 bg-white px-5 py-4 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-emerald-900">
                      {row.file.name}
                    </p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          row.status === "error" ? "bg-red-500" : "bg-emerald-600"
                        }`}
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                  </div>
                  {row.status === "saved" && row.error === undefined && (
                    <button
                      type="button"
                      onClick={() => addSavedUploads()}
                      className="shrink-0 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
                    >
                      Add to {room.name}
                    </button>
                  )}
                  {row.status === "error" && (
                    <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-red-600">
                      <XCircle size={14} strokeWidth={1.8} />
                      {row.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {sorted.length === 0 && (
            <div className="mb-8 rounded-2xl border border-dashed border-emerald-300 bg-white p-8 text-center">
              <p className="text-sm text-emerald-800/50">
                This room is showing its {defaultCount} default photos from the site build.
              </p>
              <button
                type="button"
                disabled={importingDefaults}
                onClick={importDefaults}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
              >
                <Copy size={14} strokeWidth={1.8} />
                {importingDefaults ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Importing...
                  </>
                ) : (
                  "Import Default Photos"
                )}
              </button>
              <p className="mt-3 text-xs text-emerald-800/50">
                Once imported you can reorder or remove individual photos.
              </p>
            </div>
          )}

          {sorted.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {sorted.map((row, index) => (
                <div
                  key={row.id}
                  className="overflow-hidden rounded-2xl border border-emerald-200/50 bg-white shadow-sm"
                >
                  <div className="relative aspect-square overflow-hidden bg-emerald-50">
                    <Image
                      src={row.src}
                      alt={row.alt ?? `${room.name} photo ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                    />
                    {index === 0 && (
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-gold-600/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-950">
                        <Crown size={10} strokeWidth={2} />
                        Cover
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 rounded-full bg-emerald-950/70 px-2 py-0.5 text-[10px] font-bold tabular-nums text-cream-50 backdrop-blur">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1 p-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMove(row, -1)}
                        disabled={index === 0 || busy}
                        className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                        aria-label="Move up"
                      >
                        <ArrowUp size={13} strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(row, 1)}
                        disabled={index === sorted.length - 1 || busy}
                        className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ArrowDown size={13} strokeWidth={1.8} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(row)}
                      className="rounded-lg border border-red-200 p-1.5 text-red-600 transition-colors hover:bg-red-50"
                      aria-label="Remove image"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}