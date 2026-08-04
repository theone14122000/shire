"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function AdminHomepagePage() {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/homepage");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setContent(data);
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

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setMessage("Homepage content saved successfully.");
      } else {
        setMessage("Failed to save.");
      }
    } catch {
      setMessage("Connection failed.");
    } finally {
      setSaving(false);
    }
  }

  function updateSection(section: string, field: string, value: any) {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }

  const hero = content.hero ?? {};

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight text-parchment">
            Homepage Content
          </h1>
          <p className="mt-0.5 text-sm text-emerald-800/50">
            Edit hero, sections, and CTA content
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">
          Loading...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-display text-lg font-bold text-parchment">
              Hero Section
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Eyebrow
                </label>
                <input
                  type="text"
                  value={hero.eyebrow ?? ""}
                  onChange={(e) => updateSection("hero", "eyebrow", e.target.value)}
                  className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Headline
                </label>
                <input
                  type="text"
                  value={hero.headline ?? ""}
                  onChange={(e) => updateSection("hero", "headline", e.target.value)}
                  className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Description
                </label>
                <textarea
                  value={hero.sub ?? ""}
                  onChange={(e) => updateSection("hero", "sub", e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={hero.primaryCtaLabel ?? ""}
                  onChange={(e) => updateSection("hero", "primaryCtaLabel", e.target.value)}
                  className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Primary CTA URL
                </label>
                <input
                  type="text"
                  value={hero.primaryCtaHref ?? ""}
                  onChange={(e) => updateSection("hero", "primaryCtaHref", e.target.value)}
                  className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  value={hero.secondaryCtaLabel ?? ""}
                  onChange={(e) => updateSection("hero", "secondaryCtaLabel", e.target.value)}
                  className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Secondary CTA URL
                </label>
                <input
                  type="text"
                  value={hero.secondaryCtaHref ?? ""}
                  onChange={(e) => updateSection("hero", "secondaryCtaHref", e.target.value)}
                  className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}