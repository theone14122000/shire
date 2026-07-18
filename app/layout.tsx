import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway", // This injects the CSS variable --font-raleway
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The Himalayan Shire — A Quiet Heritage Retreat in the Himalayas",
  description:
    "A serene countryside escape in Pagey, near Kalpa. Surrounded by apple orchards, pine forests, and the Kinnaur Kailash range — a place to rest, breathe, and remember.",
  keywords: [
    "The Himalayan Shire",
    "Himalayan retreat",
    "Kinnaur Kailash",
    "Kalpa stay",
    "Pagey homestay",
    "heritage hospitality",
  ],
  authors: [{ name: "The Himalayan Shire" }],
  openGraph: {
    title: "The Himalayan Shire",
    description:
      "A quiet Himalayan retreat in Pagey, near Kalpa. Heritage rooms, warm hospitality, and a view that stays with you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.variable}>
      {/* 
        ambient: applies the subtle green background glows
        min-h-screen: ensures the page fills the viewport
        font-sans: applies the Raleway font via our Tailwind theme
        antialiased: smooths font rendering
      */}
      <body className="ambient min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}