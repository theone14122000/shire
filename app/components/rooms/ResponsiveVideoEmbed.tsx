"use client";

function extractVideoId(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : trimmed;
}

export function ResponsiveVideoEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const id = extractVideoId(videoId);

  return (
    <div
      className="relative w-full overflow-hidden border border-emerald-900/10 bg-emerald-950 shadow-[0_24px_70px_rgba(3,45,32,0.16)]"
      style={{ aspectRatio: "9 / 16", maxWidth: 480 }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
