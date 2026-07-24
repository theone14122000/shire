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
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {children}
    </div>
  );
}
