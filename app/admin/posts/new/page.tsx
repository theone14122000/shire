"use client";

import { PostForm } from "../components/PostForm";

export default function AdminNewPostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-parchment">
          New Post
        </h1>
        <p className="mt-0.5 text-sm text-emerald-800/50">
          Create a new blog post
        </p>
      </div>
      <PostForm />
    </div>
  );
}
