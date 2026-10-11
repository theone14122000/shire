"use client";

import { useState } from "react";

function extractVideoId(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : trimmed;
}

/**
 * JS lazy-loading layer for YouTube embeds: renders the video's own
 * thumbnail until the visitor taps play, so the heavy youtube-nocookie
 * iframe/JS never downloads on page load (mobile page-weight win). Once
 * activated it mounts the exact iframe the static markup used — same
 * container, same aspect ratio, no layout/theme change. The thumbnail is
 * itself loading="lazy", so it only fetches near the viewport.
 */
export function LazyYouTube({
  videoId,
  title,
  query = "rel=0",
}: {
  videoId: string;
  title: string;
  query?: string;
}) {
  const id = extractVideoId(videoId);
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?${query}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
      className="absolute inset-0 h-full w-full cursor-pointer border-0 bg-transparent p-0"
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hq720.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-6 w-6 fill-white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
