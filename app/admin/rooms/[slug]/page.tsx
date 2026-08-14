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
  Plus,
  Save,
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

interface RoomDetails {
  name: string;
  category: string;
  size: string;
  view: string;
  floor: string;
  description: string;
  facilities: string[];
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

  // Room details editor
  const [details, setDetails] = useState<RoomDetails | null>(null);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const [savingDetails, setSavingDetails] = useState(false);
  const [detailsMessage, setDetailsMessage] = useState("");

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

  const fetchDetails = useCallback(async () => {
    if (!slug) return;
    try {
      const res = await fetch(`/api/rooms/${slug}/content`);
      if (!res.ok) return;
      const data = (await res.json()) as {
        content?: Partial<RoomDetails> | null;
      };
      const saved = data.content ?? {};
      setDetails({
        name: saved.name ?? room?.name ?? "",
        category: saved.category ?? room?.category ?? "",
        size: saved.size ?? room?.size ?? "",
        view: saved.view ?? room?.view ?? "",
        floor: saved.floor ?? room?.floor ?? "",
        description: saved.description ?? room?.description ?? "",
        facilities: saved.facilities ?? room?.facilities ?? [],
      });
    } catch {
      // ignore
    } finally {
      setDetailsLoaded(true);
    }
  }, [slug, room]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  async function saveDetails() {
    if (!details || savingDetails) return;
    setSavingDetails(true);
    setDetailsMessage("");
    try {
      const res = await fetch(`/api/rooms/${currentRoom.slug}/content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      if (res.ok) {
        setDetailsMessage("Room details saved — live on the room page now.");
      } else {
        const data = await res.json();
        setDetailsMessage(data.error || "Failed to save room details");
      }
    } catch {
      setDetailsMessage("Connection failed");
    } finally {
      setSavingDetails(false);
    }
  }

  function updateDetail(field: keyof RoomDetails, value: string | string[]) {
    setDetails((prev) => (prev ? { ...prev, [field]: value as never } : prev));
  }

  function updateFacility(index: number, value: string) {
    setDetails((prev) =>
      prev
        ? { ...prev, facilities: prev.facilities.map((f, i) => (i === index ? value : f)) }
        : prev
    );
  }

  function addFacility() {
    setDetails((prev) =>
      prev ? { ...prev, facilities: [...prev.facilities, ""] } : prev
    );
  }

  function removeFacility(index: number) {
    setDetails((prev) =>
      prev
        ? { ...prev, facilities: prev.facilities.filter((_, i) => i !== index) }
        : prev
    );
  }

  function moveFacility(index: number, dir: -1 | 1) {
    setDetails((prev) => {
      if (!prev) return prev;
      const target = index + dir;
      if (target < 0 || target >= prev.facilities.length) return prev;
      const facilities = [...prev.facilities];
      [facilities[index], facilities[target]] = [facilities[target], facilities[index]];
      return { ...prev, facilities };
    });
  }

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
        try {
          const data = JSON.parse(xhr.responseText);
          if (typeof data?.url === "string") {
            updateRow(index, { progress: 100, status: "saved", src: data.url });
          } else {
            updateRow(index, { status: "error", error: "Unexpected upload response" });
          }
        } catch {
          updateRow(index, { status: "error", error: "Unexpected server response" });
        }
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
    const list = Array.from(files);
    const accepted: File[] = [];
    const rejected: string[] = [];
    for (const file of list) {
      if (file.type && !file.type.startsWith("image/")) {
        rejected.push(`${file.name} (not an image)`);
        continue;
      }
      if (file.size > 4 * 1024 * 1024) {
        rejected.push(`${file.name} (larger than 4MB)`);
        continue;
      }
      accepted.push(file);
    }
    if (rejected.length > 0) {
      setMessage(`Skipped: ${rejected.join(", ")}`);
    } else {
      setMessage("");
    }
    if (accepted.length === 0) return;
    const startIndex = uploadRows.length;
    setUploadRows((prev) => [
      ...prev,
      ...accepted.map((file) => ({
        file,
        progress: 0,
        status: "uploading" as const,
      })),
    ]);
    accepted.forEach((file, offset) => uploadOne(file, startIndex + offset));
  }

  async function addImage(src: string): Promise<boolean> {
    if (!src.trim() || busy) return false;
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
        return true;
      }
      const data = await res.json();
      setMessage(data.error || "Failed to add image");
      return false;
    } catch {
      setMessage("Connection failed");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function addSavedUploads() {
    const ready = uploadRows.filter((r) => r.status === "saved" && r.src);
    let added = 0;
    let failed = 0;
    for (const row of ready) {
      if (await addImage(row.src!)) {
        added++;
      } else {
        failed++;
      }
    }
    setUploadRows((prev) => prev.filter((r) => r.status !== "saved"));
    setMessage(
      failed === 0
        ? `Added ${added} image${added === 1 ? "" : "s"} to ${currentRoom.name}.`
        : `Added ${added} image${added === 1 ? "" : "s"}, ${failed} failed — see messages above.`
    );
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
            {room.name} — Edit Room
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

      {detailsLoaded && details && (
        <div className="mb-10 rounded-2xl border border-emerald-200/60 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-black tracking-tight text-emerald-900">
                Room Details
              </h2>
              <p className="mt-0.5 text-sm text-emerald-800/50">
                What guests see on the room page — description, facilities, size, view &amp; floor.
              </p>
            </div>
            <button
              type="button"
              disabled={savingDetails}
              onClick={saveDetails}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
            >
              {savingDetails ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Save size={15} strokeWidth={1.8} />
              )}
              Save Details
            </button>
          </div>

          {detailsMessage && (
            <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {detailsMessage}
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
                Room Name
              </span>
              <input
                type="text"
                value={details.name}
                onChange={(e) => updateDetail("name", e.target.value)}
                className={INPUT_CLASS}
                placeholder="e.g. Deodar"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
                Category
              </span>
              <input
                type="text"
                value={details.category}
                onChange={(e) => updateDetail("category", e.target.value)}
                className={INPUT_CLASS}
                placeholder="e.g. Premium Room"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
                Size
              </span>
              <input
                type="text"
                value={details.size}
                onChange={(e) => updateDetail("size", e.target.value)}
                className={INPUT_CLASS}
                placeholder="e.g. 484 sq ft."
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
                View
              </span>
              <input
                type="text"
                value={details.view}
                onChange={(e) => updateDetail("view", e.target.value)}
                className={INPUT_CLASS}
                placeholder="e.g. Mountain View"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
                Floor
              </span>
              <input
                type="text"
                value={details.floor}
                onChange={(e) => updateDetail("floor", e.target.value)}
                className={INPUT_CLASS}
                placeholder="e.g. Ground Floor"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
              Description
            </span>
            <textarea
              rows={5}
              value={details.description}
              onChange={(e) => updateDetail("description", e.target.value)}
              className={INPUT_CLASS + " resize-y"}
              placeholder="A short description of the room shown under 'The Space'."
            />
          </label>

          <div className="mt-6">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60">
              What is inside
            </span>
            <div className="space-y-2">
              {details.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex shrink-0 flex-col">
                    <button
                      type="button"
                      onClick={() => moveFacility(index, -1)}
                      disabled={index === 0}
                      className="rounded-l-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <ArrowUp size={12} strokeWidth={1.8} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFacility(index, 1)}
                      disabled={index === details.facilities.length - 1}
                      className="rounded-r-lg border border-t-0 border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <ArrowDown size={12} strokeWidth={1.8} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={facility}
                    onChange={(e) => updateFacility(index, e.target.value)}
                    className={INPUT_CLASS}
                    placeholder="e.g. Electric fireplace"
                  />
                  <button
                    type="button"
                    onClick={() => removeFacility(index)}
                    className="rounded-lg border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                    aria-label="Remove facility"
                  >
                    <Trash2 size={14} strokeWidth={1.8} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFacility}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 px-3.5 py-2 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              <Plus size={13} strokeWidth={2} />
              Add Facility
            </button>
          </div>
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
              JPEG, PNG, WebP or GIF · up to 4MB each
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
                  <div className="p-3">
                    <CaptionField
                      row={row}
                      slug={currentRoom.slug}
                      onSaved={(savedRow, caption) =>
                        setImages((prev) =>
                          prev.map((i) =>
                            i.id === savedRow.id ? { ...i, caption } : i
                          )
                        )
                      }
                    />
                    <div className="flex items-center justify-between gap-1">
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
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CaptionField({
  row,
  slug,
  onSaved,
}: {
  row: RoomImageRow;
  slug: string;
  onSaved: (row: RoomImageRow, caption: string) => void;
}) {
  const [value, setValue] = useState(row.caption ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/rooms/${slug}/images/${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption: value }),
      });
      if (res.ok) onSaved(row, value);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={save}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
      }}
      disabled={saving}
      placeholder="Name below photo"
      className="mb-3 w-full rounded-lg border border-emerald-200 bg-cream-50 px-2.5 py-1.5 text-xs text-emerald-900 placeholder:text-emerald-800/40 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
    />
  );
}