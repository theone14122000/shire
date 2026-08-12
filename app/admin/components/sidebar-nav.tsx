"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Home,
  Settings,
  ImageIcon,
  Images,
  UserCircle,
  LogOut,
  BedDouble,
  Compass,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Blogs", href: "/admin/posts", icon: FileText },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Rooms", href: "/admin/rooms", icon: BedDouble },
  { label: "Activities", href: "/admin/activities", icon: Compass },
  { label: "Homepage", href: "/admin/homepage", icon: Home },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Profile", href: "/admin/profile", icon: UserCircle },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-emerald-100 text-emerald-900"
                : "text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Icon size={18} strokeWidth={1.8} />
            {item.label}
          </Link>
        );
      })}

      <div className="mt-6 border-t border-emerald-200 pt-4">
        <Link
          href="/api/auth"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} strokeWidth={1.8} />
          Sign Out
        </Link>
      </div>
    </div>
  );
}