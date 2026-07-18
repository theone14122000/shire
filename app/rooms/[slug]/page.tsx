// app/rooms/[slug]/page.tsx
import { rooms } from "@/lib/rooms";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "../../components/SiteNav";

export async function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  // Gallery label overlays for dynamic feel
  const galleryLabels = [
    "Living Space",
    "Bedroom View",
    "Bathroom",
    "Balcony",
    "Details",
  ];

  return (
    <main className="bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100/60 min-h-screen font-sans text-black selection:bg-emerald-200 selection:text-emerald-900">
      {/* Navbar */}
      <SiteNav />

      {/* ======================================= */}
      {/* LIVE DYNAMIC URGENCY BANNER             */}
      {/* ======================================= */}
      <div className="bg-emerald-800 text-emerald-50 px-4 py-2.5 text-center text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          ⚡ High Demand: 4 guests are viewing {room.name} right now. Book soon!
        </span>
      </div>

      {/* ======================== */}
      {/* 1. HERO CONTENT + VIDEO */}
      {/* ======================== */}
      <section className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/#rooms"
            className="inline-flex items-center gap-2 text-emerald-800 hover:text-black transition-colors text-sm font-bold tracking-wide mb-8 group"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path
                d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to All Rooms
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Title, Specs, Description, CTA */}
            <div className="lg:col-span-7">
              {/* Title & Category */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.02] tracking-tight font-black">
                  {room.name}
                </h1>
                <span className="inline-block bg-emerald-600/15 text-emerald-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-600/30 shrink-0">
                  {room.category}
                </span>
              </div>

              {/* Room Specs as Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { label: "Size", value: room.size },
                  { label: "View", value: room.view },
                  { label: "Floor", value: room.floor },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-white/90 border border-emerald-200/80 px-5 py-2.5 rounded-full text-sm font-bold text-neutral-900 shadow-sm flex items-center gap-2 hover:shadow-md hover:border-emerald-400 transition-all duration-300"
                  >
                    <span className="text-emerald-700">{spec.label}:</span>{" "}
                    {spec.value}
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl leading-relaxed text-neutral-800 font-normal mb-10">
                {room.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#book"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-emerald-800 hover:-translate-y-0.5 shadow-lg shadow-emerald-700/30"
                >
                  Book This Room
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Video Space */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square sm:aspect-video lg:aspect-square bg-white border-4 border-white rounded-[2rem] shadow-xl flex items-center justify-center overflow-hidden group cursor-pointer transition-all duration-500 hover:border-emerald-200 hover:shadow-2xl hover:-translate-y-1">
                {/* Video Background Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-green-100 to-emerald-200 opacity-90 rounded-[1.75rem]"></div>

                {/* Play Button Overlay */}
                <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-emerald-700 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-800 group-hover:scale-110 shadow-md">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-lg sm:text-xl font-black text-black tracking-wide">
                      Cinematic Room Tour
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-700 mt-1 font-medium">
                      Explore {room.name} in virtual 4K
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================= */}
      {/* 2. FACILITIES BADGES SECTION            */}
      {/* ======================================= */}
      <section className="pb-16 sm:pb-24 bg-emerald-100/50 border-y border-emerald-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="mb-8 border-l-4 border-emerald-700 pl-5">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-black tracking-tight">
              Room Highlights & Amenities
            </h2>
            <p className="text-neutral-700 mt-1 text-sm sm:text-base">
              Carefully curated amenities for your ultimate luxury and convenience
            </p>
          </div>

          {/* Full-width Facility Badges */}
          <div className="flex flex-wrap gap-3">
            {room.facilities.map((facility, i) => (
              <div
                key={i}
                className="group cursor-pointer bg-white border border-emerald-200 px-5 py-3.5 rounded-xl transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-50 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="text-sm font-bold text-neutral-900 group-hover:text-emerald-900 transition-colors flex items-center gap-2.5">
                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-emerald-600 group-hover:scale-150 transition-transform duration-300" />
                  {facility}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================== */}
      {/* 3. DYNAMIC IMAGE GALLERY SECTION   */}
      {/* ================================== */}
      <section className="pb-24 sm:pb-32 pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div className="border-l-4 border-emerald-700 pl-5">
              <h2 className="font-display text-3xl sm:text-4xl font-black text-black tracking-tight">
                Visual Tour Gallery
              </h2>
              <p className="text-neutral-700 mt-1 text-sm sm:text-base">
                {room.images.length} stunning shots of {room.name}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              {room.images.length} Photos
            </div>
          </div>

          {/* Dynamic Masonry-inspired Gallery (Card Based) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[250px]">
            {/* Hero image — spans 2 cols & 2 rows */}
            <div className="group col-span-2 row-span-2 bg-white p-2.5 sm:p-3 rounded-3xl shadow-sm border border-emerald-100 cursor-pointer hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden bg-emerald-100">
                <Image
                  src={room.images[0]}
                  alt={`${room.name} — ${galleryLabels[0]}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="inline-block bg-white/95 text-emerald-900 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                    {galleryLabels[0]}
                  </span>
                </div>
                {/* Photo count badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  1 / {room.images.length}
                </div>
              </div>
            </div>

            {/* Secondary image — spans 2 cols on mobile, 2 cols on desktop, 1 row */}
            {room.images[1] && (
              <div className="group col-span-2 bg-white p-2 sm:p-2.5 rounded-[1.75rem] shadow-sm border border-emerald-100 cursor-pointer hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-500 flex flex-col">
                <div className="relative w-full h-full rounded-[1.15rem] overflow-hidden bg-emerald-100">
                  <Image
                    src={room.images[1]}
                    alt={`${room.name} — ${galleryLabels[1]}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="inline-block bg-white/95 text-emerald-900 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                      {galleryLabels[1]}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    2 / {room.images.length}
                  </div>
                </div>
              </div>
            )}

            {/* Third image — spans 1 col, 1 row */}
            {room.images[2] && (
              <div className="group col-span-1 bg-white p-2 sm:p-2.5 rounded-3xl shadow-sm border border-emerald-100 cursor-pointer hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-500 flex flex-col">
                <div className="relative w-full h-full rounded-[1.15rem] overflow-hidden bg-emerald-100">
                  <Image
                    src={room.images[2]}
                    alt={`${room.name} — ${galleryLabels[2]}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-center">
                    <span className="inline-block bg-white/95 text-emerald-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm truncate max-w-[90%]">
                      {galleryLabels[2]}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    3 / {room.images.length}
                  </div>
                </div>
              </div>
            )}

            {/* Fourth image — spans 1 col, 1 row */}
            {room.images[3] && (
              <div className="group col-span-1 bg-white p-2 sm:p-2.5 rounded-3xl shadow-sm border border-emerald-100 cursor-pointer hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-500 flex flex-col">
                <div className="relative w-full h-full rounded-[1.15rem] overflow-hidden bg-emerald-100">
                  <Image
                    src={room.images[3]}
                    alt={`${room.name} — ${galleryLabels[3]}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-center">
                    <span className="inline-block bg-white/95 text-emerald-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm truncate max-w-[90%]">
                      {galleryLabels[3]}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    4 / {room.images.length}
                  </div>
                </div>
              </div>
            )}

            {/* Remaining images rendered dynamically */}
            {room.images.slice(4).map((img, i) => (
              <div
                key={i}
                className="group col-span-1 md:col-span-2 bg-white p-2 sm:p-2.5 rounded-[1.75rem] shadow-sm border border-emerald-100 cursor-pointer hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                <div className="relative w-full h-full rounded-[1.15rem] overflow-hidden bg-emerald-100">
                  <Image
                    src={img}
                    alt={`${room.name} — ${galleryLabels[4] || `Detail ${i + 5}`}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="inline-block bg-white/95 text-emerald-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                      Detail {i + 5}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {i + 5} / {room.images.length}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Footer CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between bg-white border border-emerald-100 rounded-[2rem] p-5 shadow-sm gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-emerald-700"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-black">
                  Want the full experience?
                </p>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Download our detailed room brochure with floor plans & specs
                </p>
              </div>
            </div>
            <a
              href="#brochure"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-6 py-3 text-xs font-bold text-emerald-900 hover:bg-emerald-100 transition-all duration-300 hover:-translate-y-0.5"
            >
              Download Brochure
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}