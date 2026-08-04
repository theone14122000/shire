import type { Metadata } from "next";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Admin — The Himalayan Shire",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-frost-50 font-sans">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-emerald-200/50 bg-white lg:flex">
          <div className="flex h-16 items-center border-b border-emerald-200/50 px-6">
            <span className="font-display text-lg font-black tracking-tight text-emerald-900">
              Admin
            </span>
          </div>
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <SidebarNav />
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}