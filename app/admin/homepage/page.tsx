"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CMS_SECTIONS, CMS_DEFAULTS } from "@/lib/cms-sections";

export default function AdminHomepagePage() {
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"ok" | "error">("ok");
  const router = useRouter();

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

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setMessageType("ok");
        setMessage("All sections saved successfully.");
      } else {
        setMessageType("error");
        setMessage("Failed to save.");
      }
    } catch {
      setMessageType("error");
      setMessage("Connection failed.");
    } finally {
      setSaving(false);
    }
  }

  function updateField(section: string, field: string, value: string) {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight text-black">
            Homepage Content
          </h1>
          <p className="mt-0.5 text-sm text-emerald-800/50">
            Edit the text of every homepage section
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${
            messageType === "ok"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">
          Loading...
        </div>
      ) : (
        <div className="space-y-6">
          {CMS_SECTIONS.map((section) => {
            const values = content[section.key] ?? {};
            return (
              <div
                key={section.key}
                className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm"
              >
                <h2 className="mb-4 font-display text-lg font-bold text-black">
                  {section.label}
                </h2>
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
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-emerald-700 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save All"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
