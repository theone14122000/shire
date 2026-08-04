"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CMS_SECTIONS, CMS_DEFAULTS } from "@/lib/cms-sections";

interface SectionStatus {
  state: "idle" | "saving" | "saved" | "error";
  message?: string;
  savedAt?: string;
}

export default function AdminHomepagePage() {
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});
  const [statuses, setStatuses] = useState<Record<string, SectionStatus>>({});
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [globalSaving, setGlobalSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const videoInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/homepage");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();

      const merged: Record<string, Record<string, string>> = {};
      for (const section of CMS_SECTIONS) {
        const defaults = CMS_DEFAULTS[section.key] ?? {};
        const saved = data?.[section.key] ?? {};
        merged[section.key] = { ...defaults, ...saved };
      }
      setContent(merged);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    return () => {
      for (const timer of Object.values(saveTimers.current)) {
        clearTimeout(timer);
      }
    };
  }, []);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  async function saveSection(sectionKey: string) {
    const sectionData = content[sectionKey];
    if (!sectionData) return;

    setStatuses((prev) => ({ ...prev, [sectionKey]: { state: "saving" } }));

    try {
      const res = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [sectionKey]: sectionData }),
      });

      if (res.ok) {
        setStatuses((prev) => ({
          ...prev,
          [sectionKey]: {
            state: "saved",
            savedAt: new Date().toLocaleTimeString(),
          },
        }));
      } else {
        setStatuses((prev) => ({
          ...prev,
          [sectionKey]: { state: "error", message: "Failed to save" },
        }));
      }
    } catch {
      setStatuses((prev) => ({
        ...prev,
        [sectionKey]: { state: "error", message: "Connection failed" },
      }));
    }
  }

  function scheduleSave(sectionKey: string) {
    if (saveTimers.current[sectionKey]) {
      clearTimeout(saveTimers.current[sectionKey]);
    }
    saveTimers.current[sectionKey] = setTimeout(() => {
      saveSection(sectionKey);
    }, 1200);
  }

  function updateField(section: string, field: string, value: string) {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setStatuses((prev) => ({ ...prev, [section]: { state: "idle" } }));
    scheduleSave(section);
  }

  async function handleSaveAll() {
    setGlobalSaving(true);
    try {
      const res = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        const time = new Date().toLocaleTimeString();
        const allSaved: Record<string, SectionStatus> = {};
        for (const section of CMS_SECTIONS) {
          allSaved[section.key] = { state: "saved", savedAt: time };
        }
        setStatuses(allSaved);
      }
    } catch {
      // ignore
    } finally {
      setGlobalSaving(false);
    }
  }

  async function handleUploadVideo(file: File) {
    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload/video", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        updateField("hero", "videoUrl", data.url);
        if (videoInputRef.current) videoInputRef.current.value = "";
      } else {
        const data = await res.json().catch(() => ({}));
        setUploadError(data.error || "Upload failed");
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function StatusBadge({
    sectionKey,
    status,
  }: {
    sectionKey: string;
    status?: SectionStatus;
  }) {
    if (!status || status.state === "idle") {
      return (
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
          Edit to update
        </span>
      );
    }
    if (status.state === "saving") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
          <svg className="animate-spin" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M21 12a9 9 0 1 1-6.2-8.56" />
          </svg>
          Saving
        </span>
      );
    }
    if (status.state === "saved") {
      return (
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
          Saved {status.savedAt}
        </span>
      );
    }
    return (
      <button
        onClick={() => saveSection(sectionKey)}
        className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 hover:bg-red-100"
      >
        {status.message ?? "Error"} — Retry
      </button>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight text-black">
            Homepage Content
          </h1>
          <p className="mt-0.5 text-sm text-emerald-800/50">
            Changes auto-save to the database and appear on the homepage
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="rounded-xl border border-emerald-300 px-5 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            View Homepage
          </Link>
          <button
            onClick={handleSaveAll}
            disabled={globalSaving || loading}
            className="rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
          >
            {globalSaving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">
          Loading...
        </div>
      ) : (
        <div className="space-y-6">
          {CMS_SECTIONS.map((section) => {
            const values = content[section.key] ?? {};
            const status = statuses[section.key];
            return (
              <div
                key={section.key}
                className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-black">
                    {section.label}
                  </h2>
                  <StatusBadge sectionKey={section.key} status={status} />
                </div>

                {section.key === "hero" && (
                  <div className="mb-5 rounded-xl border border-emerald-200 bg-cream-50 p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Current Video
                    </p>
                    <video
                      src={values.videoUrl}
                      muted
                      playsInline
                      controls
                      className="mb-4 w-full rounded-lg bg-black"
                    />
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Upload New Video (MP4 / WebM, max 50MB)
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/quicktime"
                        disabled={uploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadVideo(file);
                        }}
                        className="flex-1 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm text-black file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-700 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white"
                      />
                      {uploading && (
                        <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700">
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M21 12a9 9 0 1 1-6.2-8.56" />
                          </svg>
                          Uploading...
                        </span>
                      )}
                    </div>
                    {uploadError && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {uploadError}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-emerald-800/50">
                      Tip: on Vercel the upload limit is small — for large videos,
                      host the file elsewhere and paste its URL in the Video URL field below.
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {section.fields.map((field) => {
                    const value = values[field.key] ?? "";
                    if (field.textarea) {
                      return (
                        <div key={field.key} className="sm:col-span-2">
                          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                            {field.label}
                          </label>
                          <textarea
                            value={value}
                            onChange={(e) =>
                              updateField(section.key, field.key, e.target.value)
                            }
                            rows={field.key === "body" ? 8 : 3}
                            placeholder={field.placeholder ?? ""}
                            className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-black focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={field.key}>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            updateField(section.key, field.key, e.target.value)
                          }
                          placeholder={field.placeholder ?? ""}
                          className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-black focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="flex justify-end">
            <button
              onClick={handleSaveAll}
              disabled={globalSaving}
              className="rounded-xl bg-emerald-700 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
            >
              {globalSaving ? "Saving..." : "Save All"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
