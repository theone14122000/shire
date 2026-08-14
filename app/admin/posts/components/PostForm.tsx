"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { BlockEditor } from "./BlockEditor";
import type { BlogPost, BlogSection } from "@/lib/blog-types";
import {
  getFileSizeError,
  IMAGE_SIZE_HINT,
  uploadWithProgress,
} from "@/app/admin/components/upload";

const INPUT_CLASS =
  "w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";

export function PostForm({ post }: { post?: BlogPost }) {
  const editing = Boolean(post);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [author, setAuthor] = useState(post?.author ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [sections, setSections] = useState<BlogSection[]>(post?.content ?? []);
  const [image, setImage] = useState(post?.image ?? "");
  const [tag, setTag] = useState(post?.tag ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [readTime, setReadTime] = useState(post?.readTime ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (post) {
      setTitle(post.title ?? "");
      setSlug(post.slug ?? "");
      setAuthor(post.author ?? "");
      setExcerpt(post.excerpt ?? "");
      setSections(post.content ?? []);
      setImage(post.image ?? "");
      setTag(post.tag ?? "");
      setCategory(post.category ?? "");
      setReadTime(post.readTime ?? "");
      setSeoTitle(post.seoTitle ?? "");
      setSeoDescription(post.seoDescription ?? "");
      setStatus(post.status ?? "draft");
      setFeatured(post.featured ?? false);
    }
  }, [post]);

  async function uploadFeatured(file: File) {
    const sizeError = getFileSizeError(file);
    if (sizeError) {
      throw new Error(`Skipped: ${sizeError}`);
    }
    const result = await uploadWithProgress(file, "/api/upload", (percent) => {
      setUploadPercent(percent);
    });
    if (!result.ok || !result.url) {
      throw new Error(result.error || "Upload failed");
    }
    return result.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const finalSlug = slug || generateSlug(title);
    const payload = {
      title,
      slug: finalSlug,
      author,
      excerpt,
      content: sections,
      image,
      tag,
      category,
      readTime,
      seoTitle,
      seoDescription,
      status,
      featured,
    };

    try {
      const res = await fetch(editing ? `/api/blogs/${post!.slug}` : "/api/blogs", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage(editing ? "Post saved successfully!" : "Post created successfully!");
        setTimeout(() => router.push("/admin/posts"), 1000);
      } else {
        const data = await res.json();
        setMessage(data.error || (editing ? "Failed to save post" : "Failed to create post"));
      }
    } catch {
      setMessage("Connection failed");
    } finally {
      setSaving(false);
    }
  }

  function generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${
            message.includes("success")
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-bold text-emerald-900">
          Post Details
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slug) setSlug(generateSlug(e.target.value));
              }}
              required
              className={INPUT_CLASS}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                Slug (auto-generated if empty)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                Read Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className={INPUT_CLASS}
                placeholder="e.g. 4 min read"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
              Excerpt (short description)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              required
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
              Featured Image
            </label>
            {image && (
              <div className="relative mb-3 aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-emerald-200/50">
                <Image src={image} alt="Featured" fill className="object-cover" sizes="384px" />
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className={INPUT_CLASS}
                placeholder="Image URL, or upload below"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="shrink-0 rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-50"
              >
                <UploadCloud size={14} strokeWidth={1.8} className="mr-1.5 inline" />
                {uploading ? `Uploading ${uploadPercent}%` : "Upload"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  setUploadPercent(0);
                  try {
                    setImage(await uploadFeatured(file));
                  } catch (err) {
                    alert(err instanceof Error ? err.message : "Upload failed");
                  } finally {
                    setUploading(false);
                    e.target.value = "";
                  }
                }}
              />
            </div>
            {uploading && (
              <div className="mt-2 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${uploadPercent}%` }}
                />
              </div>
            )}
            <p className="mt-1.5 text-[11px] font-medium text-emerald-800/40">
              {IMAGE_SIZE_HINT}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-bold text-emerald-900">
          Content
        </h2>
        <BlockEditor value={sections} onChange={setSections} />
      </div>

      <div className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-bold text-emerald-900">
          SEO
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
              SEO Title (defaults to post title)
            </label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
              SEO Description (defaults to excerpt)
            </label>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={3}
              className={INPUT_CLASS}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-bold text-emerald-900">
          Publishing Options
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "published")}
              className={INPUT_CLASS}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm font-medium text-emerald-800">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
              />
              Featured Post
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/posts")}
          className="rounded-xl border border-emerald-200 px-6 py-3 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
        >
          {saving
            ? editing
              ? "Saving..."
              : "Creating..."
            : editing
              ? "Save Changes"
              : "Create Post"}
        </button>
      </div>
    </form>
  );
}
