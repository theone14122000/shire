"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  FileImage,
  Heading2,
  Heading3,
  Play,
  Trash2,
  Type,
  UploadCloud,
} from "lucide-react";
import type { BlogSection } from "@/lib/blog-types";
import {
  getFileSizeError,
  IMAGE_SIZE_HINT,
  UploadProgress,
  uploadWithProgress,
} from "@/app/admin/components/upload";

const INPUT_CLASS =
  "w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";
const TOOL_CLASS =
  "rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50";

function makeId(): string {
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function uploadImage(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const sizeError = getFileSizeError(file);
  if (sizeError) {
    throw new Error(`Skipped: ${sizeError}`);
  }
  const result = await uploadWithProgress(file, "/api/upload", onProgress);
  if (!result.ok || !result.url) {
    throw new Error(result.error || "Upload failed");
  }
  return result.url;
}

export function BlockEditor({
  value,
  onChange,
}: {
  value: BlogSection[];
  onChange: (sections: BlogSection[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (index: number, patch: Partial<BlogSection>) => {
    onChange(value.map((section, i) => (i === index ? { ...section, ...patch } : section)));
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...value];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addParagraph = () => {
    onChange([...value, { id: makeId(), type: "paragraph", text: "" }]);
  };

  const addHeading = (level: 2 | 3) => {
    onChange([...value, { id: makeId(), type: "heading", level, text: "" }]);
  };

  const addYoutube = () => {
    onChange([...value, { id: makeId(), type: "youtube", videoId: "" }]);
  };

  const addImage = async (file: File) => {
    setUploading(true);
    setUploadPercent(0);
    try {
      const url = await uploadImage(file, (percent) => setUploadPercent(percent));
      onChange([...value, { id: makeId(), type: "image", src: url, alt: file.name }]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={addParagraph} className={TOOL_CLASS}>
          <Type size={13} strokeWidth={1.8} className="mr-1.5 inline" />
          Paragraph
        </button>
        <button type="button" onClick={() => addHeading(2)} className={TOOL_CLASS}>
          <Heading2 size={13} strokeWidth={1.8} className="mr-1.5 inline" />
          Heading
        </button>
        <button type="button" onClick={() => addHeading(3)} className={TOOL_CLASS}>
          <Heading3 size={13} strokeWidth={1.8} className="mr-1.5 inline" />
          Sub Heading
        </button>
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className={`${TOOL_CLASS} disabled:opacity-50`}
        >
          <FileImage size={13} strokeWidth={1.8} className="mr-1.5 inline" />
          {uploading ? `Uploading ${uploadPercent}%` : "Add Image"}
        </button>
        <span className="text-[11px] font-medium text-emerald-800/40">
          {IMAGE_SIZE_HINT}
        </span>
        {uploading && (
          <div className="w-40">
            <UploadProgress progress={uploadPercent} status="uploading" />
          </div>
        )}
        <button type="button" onClick={addYoutube} className={TOOL_CLASS}>
          <Play size={13} strokeWidth={1.8} className="mr-1.5 inline" />
          YouTube
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) addImage(file);
            e.target.value = "";
          }}
        />
      </div>

      {value.length === 0 && (
        <p className="rounded-xl border border-dashed border-emerald-300 bg-cream-50 px-4 py-8 text-center text-sm text-emerald-800/50">
          No content blocks yet — add a paragraph, heading, image, or YouTube video above.
        </p>
      )}

      {value.map((section, index) => (
        <div
          key={section.id}
          className="rounded-2xl border border-emerald-200/50 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              {section.type === "heading"
                ? `Heading ${section.level === 3 ? 3 : 2}`
                : section.type}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="rounded-lg p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                aria-label="Move block up"
              >
                <ArrowUp size={14} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === value.length - 1}
                className="rounded-lg p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                aria-label="Move block down"
              >
                <ArrowDown size={14} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50"
                aria-label="Delete block"
              >
                <Trash2 size={14} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {(section.type === "paragraph" || section.type === "heading") && (
            <textarea
              value={section.text ?? ""}
              onChange={(e) => update(index, { text: e.target.value })}
              rows={section.type === "paragraph" ? 4 : 2}
              className={INPUT_CLASS}
              placeholder={
                section.type === "paragraph"
                  ? "Paragraph text…"
                  : `Heading text… (rendered as H${section.level === 3 ? 3 : 2})`
              }
            />
          )}

          {section.type === "image" && (
            <div className="space-y-3">
              {section.src && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-emerald-200/50">
                  <Image src={section.src} alt={section.alt ?? ""} fill className="object-cover" sizes="720px" />
                </div>
              )}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Image URL
                </label>
                <input
                  type="text"
                  value={section.src ?? ""}
                  onChange={(e) => update(index, { src: e.target.value })}
                  className={INPUT_CLASS}
                  placeholder="/images/blogs/…"
                />
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Caption (alt text)
                </label>
                <input
                  type="text"
                  value={section.alt ?? ""}
                  onChange={(e) => update(index, { alt: e.target.value })}
                  className={INPUT_CLASS}
                  placeholder="Short caption shown below the image"
                />
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-emerald-700">
                <UploadCloud size={14} strokeWidth={1.8} />
                Upload replacement image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setUploading(true);
                      const url = await uploadImage(file);
                      update(index, { src: url, alt: section.alt || file.name });
                    } catch (err) {
                      alert(err instanceof Error ? err.message : "Upload failed");
                    } finally {
                      setUploading(false);
                      e.target.value = "";
                    }
                  }}
                />
              </label>
            </div>
          )}

          {section.type === "youtube" && (
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700">
                YouTube Video ID
              </label>
              <input
                type="text"
                value={section.videoId ?? ""}
                onChange={(e) => update(index, { videoId: e.target.value })}
                className={INPUT_CLASS}
                placeholder="e.g. dQw4w9WgXcQ (from watch?v=…)"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
