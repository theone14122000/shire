"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Copy, Eye, PencilLine, Search } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";

const INPUT_CLASS =
  "w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-parchment focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setPosts(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    });
  }, [posts, search, statusFilter]);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch {
      // ignore
    }
  }

  async function handleToggleStatus(post: BlogPost) {
    const next = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/blogs/${post.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.slug === post.slug ? { ...p, status: next } : p))
        );
      }
    } catch {
      // ignore
    }
  }

  async function handleDuplicate(post: BlogPost) {
    try {
      const fullRes = await fetch(`/api/blogs/${post.slug}`);
      if (!fullRes.ok) return;
      const full = await fullRes.json();

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${full.title} (Copy)`,
          slug: `${full.slug}-copy`,
          author: full.author,
          excerpt: full.excerpt,
          content: full.content ?? [],
          image: full.image,
          tag: full.tag,
          category: full.category,
          readTime: full.readTime,
          seoTitle: full.seoTitle,
          seoDescription: full.seoDescription,
          status: "draft",
          featured: false,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setPosts((prev) => [created, ...prev]);
      }
    } catch {
      // ignore
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight text-parchment">
            Blogs
          </h1>
          <p className="mt-0.5 text-sm text-emerald-800/50">
            Manage blog posts
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
        >
          + New Post
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search
            size={15}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-800/40"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, or tag…"
            className={`${INPUT_CLASS} pl-10`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={INPUT_CLASS}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-white py-20 text-center">
          <p className="text-sm text-emerald-800/50">
            {posts.length === 0 ? "No posts yet." : "No posts match your filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <div
              key={post.slug}
              className="flex items-center justify-between rounded-2xl border border-emerald-200/50 bg-white px-5 py-4 shadow-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="truncate text-sm font-bold text-parchment">
                    {post.title}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      post.status === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {post.status}
                  </span>
                  {post.featured && (
                    <span className="shrink-0 rounded-full bg-gold-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-1 truncate text-xs text-emerald-800/50">
                  {post.author} · {post.date || "—"} · {post.readTime || "—"}
                </div>
              </div>

              <div className="ml-4 flex shrink-0 flex-wrap items-center justify-end gap-2">
                <button
                  onClick={() => handleToggleStatus(post)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                    post.status === "published"
                      ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  {post.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <Link
                  href={`/admin/posts/${post.slug}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  <PencilLine size={12} strokeWidth={1.8} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDuplicate(post)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  <Copy size={12} strokeWidth={1.8} />
                  Duplicate
                </button>
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  <Eye size={12} strokeWidth={1.8} />
                  View
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
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
