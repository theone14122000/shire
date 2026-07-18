"use client";

import { motion } from "framer-motion";
import type { ImagePlaceholderProps } from "@/lib/types";

/**
 * ImagePlaceholder — dashed-frame block that stands in for a future image.
 * Drop a real <Image /> or <picture> in here once assets land.
 *
 * Visually quiet so it doesn't fight the surrounding typography, but
 * visually distinct enough that a designer can scan the page and know
 * exactly which slots still need to be filled.
 */
export function ImagePlaceholder({
  kind,
  label,
  caption,
  aspect = "4/5",
  className = "",
  showBadge = true,
}: ImagePlaceholderProps) {
  const labelText = label ?? defaultLabelFor(kind);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className={`placeholder-frame ${ASPECT_CLASS[aspect]} ${className}`}
      role="img"
      aria-label={labelText}
    >
      {/* faint inner wash so the dashed border has something to sit on */}
      <div className="absolute inset-0 bg-gradient-to-br from-beige-50 via-beige-100/40 to-beige-200/40" />

      {/* corner crosses — visual hint that this is a design slot */}
      <CornerMark className="top-3 left-3" />
      <CornerMark className="top-3 right-3 rotate-90" />
      <CornerMark className="bottom-3 left-3 -rotate-90" />
      <CornerMark className="bottom-3 right-3 rotate-180" />

      {/* center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="eyebrow text-ink-500/80">{labelText}</span>
        {caption ? (
          <span className="text-xs text-ink-500/70 max-w-[20ch] leading-snug">
            {caption}
          </span>
        ) : null}
      </div>

      {/* corner badge */}
      {showBadge ? (
        <span className="absolute top-3 right-3 rounded-full border border-ink-900/15 bg-beige-50/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-500">
          Image Slot
        </span>
      ) : null}
    </motion.div>
  );
}

function CornerMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-3 w-3 border-ink-900/40 ${className}`}
      style={{
        borderTopWidth: "1px",
        borderLeftWidth: "1px",
        borderRightWidth: className.includes("rotate-90") ? "0" : "0",
        borderBottomWidth: "0",
      }}
    />
  );
}

/**
 * Explicit class lookup so Tailwind v4's JIT scanner sees every
 * aspect-ratio class as a literal string in the source.
 */
const ASPECT_CLASS: Record<NonNullable<ImagePlaceholderProps["aspect"]>, string> = {
  "1/1": "aspect-square",
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "5/4": "aspect-[5/4]",
  "2/3": "aspect-[2/3]",
  "21/9": "aspect-[21/9]",
  "3/2": "aspect-[3/2]",
};

function defaultLabelFor(kind: ImagePlaceholderProps["kind"]): string {
  switch (kind) {
    case "hero":
      return "Hero Image Placeholder";
    case "lifestyle":
      return "Lifestyle Image Placeholder";
    case "product":
      return "Product Image Placeholder";
    case "gallery":
      return "Gallery Image Placeholder";
    case "editorial":
      return "Editorial Image Placeholder";
    case "feature":
      return "Feature Image Placeholder";
    case "ambience":
      return "Ambience Image Placeholder";
    default:
      return "Image Placeholder";
  }
}
