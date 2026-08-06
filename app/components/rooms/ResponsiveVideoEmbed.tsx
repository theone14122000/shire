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
  fullscreen = false,
}: {
  videoId: string;
  title: string;
  fullscreen?: boolean;
}) {
  const id = extractVideoId(videoId);

  const style = fullscreen
    ? {
        aspectRatio: "9 / 16",
        width: "min(100%, calc(82vh * 0.5625))",
      }
    : {
        aspectRatio: "9 / 16",
        maxWidth: 480,
        marginInline: "auto",
      };

  const frameClass = fullscreen
    ? "rounded-2xl border border-cream-50/10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
    : "border border-emerald-900/10 shadow-[0_24px_70px_rgba(3,45,32,0.16)]";

  return (
    <div
      className={`relative w-full overflow-hidden bg-emerald-950 ${frameClass}`}
      style={style}
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
