"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@/lib/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this user? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
    } catch {
      // ignore
    }
  }

  async function handleToggleActive(id: string, active: boolean) {
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, active } : u))
      );
    } catch {
      // ignore
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight text-emerald-900">
            Users
          </h1>
          <p className="mt-0.5 text-sm text-emerald-800/50">
            Manage admin users and roles
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
        >
          + New User
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">
          Loading...
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-white py-20 text-center">
          <p className="text-sm text-emerald-800/50">No users yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-2xl border border-emerald-200/50 bg-white px-5 py-4 shadow-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-emerald-900">
                    {user.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      user.role === "MASTER_ADMIN"
                        ? "bg-emerald-100 text-emerald-700"
                        : user.role === "ADMIN"
                        ? "bg-gold-100 text-gold-700"
                        : user.role === "EDITOR"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                  {!user.active && (
                    <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                      Suspended
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-emerald-800/50">
                  {user.email}
                </div>
              </div>

              <div className="ml-4 flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(user.id, !user.active)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                    user.active
                      ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      : "border-red-200 text-red-700 hover:bg-red-50"
                  }`}
                >
                  {user.active ? "Suspend" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}