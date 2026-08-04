"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(true);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/profile");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setUser(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        setMessage("Profile updated successfully.");
      } else {
        setMessage("Failed to update profile.");
      }
    } catch {
      setMessage("Connection failed.");
    } finally {
      setSaving(false);
    }
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-parchment">
          Profile
        </h1>
      </div>

      {message && (
        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
            Name
          </label>
          <input
            type="text"
            value={user.name ?? ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
            Email
          </label>
          <input
            type="email"
            value={user.email ?? ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
            Role
          </label>
          <input
            type="text"
            value={user.role ?? ""}
            disabled
            className="w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment/50"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}