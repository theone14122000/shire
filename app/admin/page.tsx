"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogListItem } from "@/lib/blog-types";

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const router = useRouter();

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setBlogs(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      }
    } catch {
      // ignore
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const published = blogs.filter((b) => b.status === "published");
  const drafts = blogs.filter((b) => b.status === "draft");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <div>
              <h1 className="font-display text-2xl font-black tracking-tight text-emerald-950">
                Blog Manager
              </h1>
              <p className="mt-0.5 text-sm text-emerald-800/50">
                {published.length} published · {drafts.length} drafts
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
          >
            + New Post
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            Sign Out
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">
          Loading...
        </div>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-white py-20 text-center">
          <p className="text-sm text-emerald-800/50">No blog posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="flex items-center justify-between rounded-2xl border border-emerald-200/50 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="truncate text-sm font-bold text-emerald-950">
                    {blog.title}
                  </h3>
                  {blog.status === "draft" && (
                    <span className="shrink-0 rounded-full bg-gold-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                      Draft
                    </span>
                  )}
                  {blog.featured && (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-emerald-800/50">
                  <span>{blog.tag}</span>
                  <span>·</span>
                  <span>{blog.date}</span>
                  <span>·</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>

              <div className="ml-4 flex items-center gap-2">
                <Link
                  href={`/admin/posts/${blog.slug}`}
                  className="rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  Edit
                </Link>
                <a
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-50"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(blog.slug, blog.title)}
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
