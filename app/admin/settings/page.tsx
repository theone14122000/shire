"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setSettings(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage("Settings saved successfully.");
      } else {
        setMessage("Failed to save settings.");
      }
    } catch {
      setMessage("Connection failed.");
    } finally {
      setSaving(false);
    }
  }

  function handleChange(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  const groups = [
    { name: "General", keys: ["site_name", "site_logo", "site_favicon"] },
    { name: "Contact", keys: ["site_email", "site_phone", "site_phone2", "site_address"] },
    { name: "Social", keys: ["instagram_url", "facebook_url", "youtube_url", "whatsapp_url"] },
    { name: "SEO", keys: ["seo_title", "seo_description", "google_analytics_id", "meta_pixel_id"] },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-emerald-900">
          Settings
        </h1>
        <p className="mt-0.5 text-sm text-emerald-800/50">
          Manage site configuration
        </p>
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
          {groups.map((group) => (
            <div key={group.name} className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-display text-lg font-bold text-emerald-900">
                {group.name}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {group.keys.map((key) => (
                  <div key={key}>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                      {key.replace(/_/g, " ")}
                    </label>
                    <input
                      type="text"
                      value={settings[key] ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}