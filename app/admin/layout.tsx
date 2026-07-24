import type { Metadata } from "next";

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
    <div className="min-h-screen bg-cream-50 font-sans text-emerald-950">
      {children}
    </div>
  );
}
