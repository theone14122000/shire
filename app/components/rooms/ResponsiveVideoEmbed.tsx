"use client";

import { LazyYouTube } from "../LazyYouTube";

export function ResponsiveVideoEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  return (
    <div
      className="relative overflow-hidden border border-emerald-900/10 bg-emerald-950 shadow-[0_24px_70px_rgba(3,45,32,0.16)]"
      style={{ aspectRatio: "9 / 16", width: "min(100%, 480px)" }}
    >
      <LazyYouTube videoId={videoId} title={title} query="rel=0&playsinline=1" />
    </div>
  );
}
