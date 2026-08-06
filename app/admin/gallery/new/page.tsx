"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, CloudUpload, ImagePlus, XCircle } from "lucide-react";
import { categoryFromFile, titleFromFile } from "@/lib/gallery";
import { GALLERY_CATEGORIES } from "@/lib/gallery-types";

interface UploadRow {
  file: File;
  progress: number;
  status: "uploading" | "saved" | "error";
  error?: string;
  src?: string;
  title?: string;
  category?: string;
}

export default function AdminGalleryNewPage() {
  const [rows, setRows] = useState<UploadRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const updateRow = (index: number, patch: Partial<UploadRow>) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  function addFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const startIndex = rows.length;
    setRows((prev) => [
      ...prev,
      ...list.map((file) => ({
        file,
        progress: 0,
        status: "uploading" as const,
        title: titleFromFile(file.name),
        category: categoryFromFile(file.name),
      })),
    ]);
    list.forEach((file, offset) => {
      uploadOne(file, startIndex + offset);
    });
  }

  function uploadOne(file: File, index: number) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload/gallery");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setRows((prev) => prev.map((row, i) => (i === index ? { ...row, progress: pct } : row)));
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
    xhr.onerror = () => updateRow(index, { status: "error", error: "Network error" });
    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  }

  async function handleSaveAll() {
    const ready = rows.filter((row) => row.status === "saved" && row.src);
    if (ready.length === 0) {
      setMessage("No uploaded images to save.");
      return;
    }
    setSaving(true);
    setMessage("");

    const created: string[] = [];
    for (const row of ready) {
      try {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: row.title,
            category: row.category,
            src: row.src,
            status: "published",
          }),
        });
        if (res.ok) {
          const item = await res.json();
          created.push(item.title);
        }
      } catch {
        // ignore
      }
    }
    setSaving(false);
    setMessage(`${created.length} image${created.length === 1 ? "" : "s"} added to the gallery.`);
    setTimeout(() => router.push("/admin/gallery"), 1200);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-parchment">
          Upload Gallery Images
        </h1>
        <p className="mt-0.5 text-sm text-emerald-800/50">
          Drag and drop multiple images — titles and categories are suggested automatically
        </p>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${
            message.includes("added") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="mb-6 cursor-pointer rounded-2xl border-2 border-dashed border-emerald-300 bg-white px-6 py-14 text-center transition-colors hover:border-emerald-500"
      >
        <CloudUpload size={36} strokeWidth={1.4} className="mx-auto text-emerald-800/40" />
        <p className="mt-4 text-sm font-bold text-parchment">
          Drop images here, or click to browse
        </p>
        <p className="mt-1 text-xs text-emerald-800/50">
          JPEG, PNG, WebP or GIF · up to 5MB each
        </p>
        <input
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
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>('input[type="file"]');
            input?.click();
          }}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
        >
          <ImagePlus size={15} strokeWidth={1.8} />
          Choose Files
        </button>
      </div>

      {rows.length > 0 && (
        <div className="space-y-3">
          {rows.map((row, index) => (
            <div
              key={`${row.file.name}-${index}`}
              className="rounded-2xl border border-emerald-200/50 bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-parchment">{row.file.name}</p>
                  <p className="mt-0.5 text-xs text-emerald-800/50">
                    {(row.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {row.status === "saved" && (
                  <CheckCircle2 size={18} strokeWidth={1.8} className="shrink-0 text-emerald-600" />
                )}
                {row.status === "error" && (
                  <XCircle size={18} strokeWidth={1.8} className="shrink-0 text-red-600" />
                )}
                {row.status === "uploading" && (
                  <span className="shrink-0 text-xs font-bold tabular-nums text-emerald-700">
                    {row.progress}%
                  </span>
                )}
              </div>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    row.status === "error" ? "bg-red-500" : "bg-emerald-600"
                  }`}
                  style={{ width: `${row.progress}%` }}
                />
              </div>

              {row.status === "saved" && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={row.title ?? ""}
                      onChange={(e) => updateRow(index, { title: e.target.value })}
                      className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Category
                    </label>
                    <select
                      value={row.category}
                      onChange={(e) => updateRow(index, { category: e.target.value })}
                      className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                    >
                      {GALLERY_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {row.error && <p className="mt-2 text-xs font-medium text-red-600">{row.error}</p>}
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/gallery")}
              className="rounded-xl border border-emerald-200 px-6 py-3 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving || rows.every((r) => r.status !== "saved")}
              onClick={handleSaveAll}
              className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : `Save ${rows.filter((r) => r.status === "saved").length} Image${rows.filter((r) => r.status === "saved").length === 1 ? "" : "s"}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
