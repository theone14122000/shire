"use client";

/* ------------------------------------------------------------------ */
/*  Shared client-side upload helpers for the admin CMS.               */
/*  Max image size is 4.2MB — Vercel caps request bodies at 4.5MB,     */
/*  so anything larger is rejected by the platform before the app      */
/*  ever sees it (verified empirically).                               */
/* ------------------------------------------------------------------ */

export const MAX_UPLOAD_BYTES = 4.2 * 1024 * 1024;
export const MAX_UPLOAD_MB = "4.2MB";
export const IMAGE_SIZE_HINT = "JPEG, PNG, WebP or GIF · up to 4.2MB each";
export const VIDEO_MAX_BYTES = 50 * 1024 * 1024;
export const VIDEO_SIZE_HINT = "MP4 / WebM · up to 50MB each";

export type UploadResult = {
  ok: boolean;
  url?: string;
  error?: string;
};

/** Returns a human-readable rejection reason for an oversized file, or null if fine. */
export function getFileSizeError(file: File, maxBytes: number = MAX_UPLOAD_BYTES): string | null {
  if (file.size > maxBytes) {
    const mb = (maxBytes / (1024 * 1024)).toFixed(1).replace(/\.0$/, "");
    return `${file.name} (larger than ${mb}MB)`;
  }
  return null;
}

/**
 * Upload a single file with progress reporting.
 * Uses XHR so the browser reports upload progress (fetch does not).
 */
export function uploadWithProgress(
  file: File,
  endpoint: string,
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText) as { url?: string };
          if (typeof data?.url === "string") {
            resolve({ ok: true, url: data.url });
          } else {
            resolve({ ok: false, error: "Unexpected upload response" });
          }
        } catch {
          resolve({ ok: false, error: "Unexpected server response" });
        }
      } else {
        let error = "Upload failed";
        try {
          error = (JSON.parse(xhr.responseText) as { error?: string }).error || error;
        } catch {
          const text = xhr.responseText?.trim();
          if (text && text.length < 120) error = text;
        }
        resolve({ ok: false, error });
      }
    };
    xhr.onerror = () => resolve({ ok: false, error: "Network error" });
    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  });
}

/** Compact progress bar + percentage, same style as the room page CMS. */
export function UploadProgress({
  progress,
  status,
}: {
  progress: number;
  status: "uploading" | "error";
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-emerald-100">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            status === "error" ? "bg-red-500" : "bg-emerald-600"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-[10px] font-bold tabular-nums text-emerald-800/60">
        {status === "error" ? "Failed" : `${progress}%`}
      </span>
    </div>
  );
}
