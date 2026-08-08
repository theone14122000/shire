"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Home,
  Settings,
  ImageIcon,
  UserCircle,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";
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

  const published = blogs.filter((b) => b.status === "published").length;
  const drafts = blogs.filter((b) => b.status === "draft").length;
  const featured = blogs.filter((b) => b.featured).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black tracking-tight text-emerald-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-emerald-800/50">
          Welcome back to The Himalayan Shire admin panel.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Published Posts"
          value={published}
          icon={CheckCircle}
          color="emerald"
        />
        <StatCard
          label="Drafts"
          value={drafts}
          icon={Clock}
          color="gold"
        />
        <StatCard
          label="Featured"
          value={featured}
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          label="Total Posts"
          value={blogs.length}
          icon={FileText}
          color="emerald"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickLink
          href="/admin/posts"
          label="Manage Blogs"
          description="Create, edit, and publish blog posts"
          icon={FileText}
        />
        <QuickLink
          href="/admin/homepage"
          label="Homepage Content"
          description="Edit hero, sections, and CTA content"
          icon={Home}
        />
        <QuickLink
          href="/admin/settings"
          label="Settings"
          description="Site name, email, SEO, and social links"
          icon={Settings}
        />
        <QuickLink
          href="/admin/users"
          label="Users"
          description="Manage admin users and roles"
          icon={Users}
        />
        <QuickLink
          href="/admin/media"
          label="Media Library"
          description="Upload and manage images"
          icon={ImageIcon}
        />
        <QuickLink
          href="/admin/profile"
          label="Profile"
          description="Update your account settings"
          icon={UserCircle}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${color}-100 text-${color}-700`}
        >
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-xs font-medium text-emerald-800/50">{label}</p>
          <p className="text-2xl font-black text-emerald-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  label,
  description,
  icon: Icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: any;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-emerald-200/50 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <Icon
          size={20}
          strokeWidth={1.8}
          className="text-emerald-700"
        />
        <h3 className="font-display text-lg font-bold text-emerald-900">
          {label}
        </h3>
      </div>
      <p className="mt-2 text-sm text-emerald-800/50">{description}</p>
    </Link>
  );
}