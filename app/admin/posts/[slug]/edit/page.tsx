"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PostForm } from "../../components/PostForm";
import type { BlogPost } from "@/lib/blog-types";

export default function AdminEditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    params.then(({ slug: s }) => setSlug(s));
  }, [params]);

  const fetchPost = useCallback(async () => {
    if (!slug) return;
    try {
      const res = await fetch(`/api/blogs/${slug}`);
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (res.status === 404) {
        router.push("/admin/posts");
        return;
      }
      const data = await res.json();
      setPost(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-emerald-900">
          Edit Post
        </h1>
        <p className="mt-0.5 text-sm text-emerald-800/50">
          Update blog post content and publishing options
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-emerald-800/40">
          Loading...
        </div>
      ) : post ? (
        <PostForm post={post} />
      ) : (
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-white py-20 text-center">
          <p className="text-sm text-emerald-800/50">Post not found.</p>
        </div>
      )}
    </div>
  );
}
