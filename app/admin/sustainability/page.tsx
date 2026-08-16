"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, CloudUpload, Loader2, Plus, Save, Trash2 } from "lucide-react";
import {
  mergeSustainability,
  type SustainabilityContent,
  type SustainabilityPillar,
} from "@/lib/sustainability-content";
import {
  getFileSizeError,
  IMAGE_SIZE_HINT,
  UploadProgress,
  uploadWithProgress,
} from "@/app/admin/components/upload";

const ALLOWED_ROLES = ["MASTER_ADMIN", "ADMIN", "EDITOR"];

const INPUT_CLASS =
  "w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";

const LABEL_CLASS =
  "mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60";

function emptyPillar(): SustainabilityPillar {
  return { title: "", body: "" };
}

export default function AdminSustainabilityPage() {
  const router = useRouter();
  const [content, setContent] = useState<SustainabilityContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState<Record<string, { percent: number }>>({});

  const fetchContent = useCallback(async () => {
    try {
      const auth = await fetch("/api/auth");
      if (auth.status === 401) {
        setAuthenticated(false);
        return;
      }
      const authData = (await auth.json()) as {
        authenticated: boolean;
        user?: { role: string };
      };
      if (!authData.authenticated || !authData.user || !ALLOWED_ROLES.includes(authData.user.role)) {
        setAuthenticated(false);
        return;
      }
      const res = await fetch("/api/pages/sustainability");
      const data = (await res.json()) as { data?: Record<string, unknown> | null };
      setContent(mergeSustainability(data.data));
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (!authenticated) {
    router.push("/admin/login");
    return null;
  }

  async function save() {
    if (!content || saving) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/pages/sustainability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage("Sustainability page saved — live now.");
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to save");
      }
    } catch {
      setMessage("Connection failed");
    } finally {
      setSaving(false);
    }
  }

  function setHeroField(field: "kicker" | "heading" | "intro", value: string) {
    setContent((prev) => (prev ? { ...prev, hero: { ...prev.hero, [field]: value } } : prev));
  }

  function setApproachField(field: "kicker" | "heading" | "body", value: string) {
    setContent((prev) =>
      prev ? { ...prev, approach: { ...prev.approach, [field]: value } } : prev
    );
  }

  function setFeaturedField(
    index: 0 | 1,
    field: "src" | "title" | "caption",
    value: string
  ) {
    setContent((prev) => {
      if (!prev) return prev;
      const featured = [...prev.featured] as SustainabilityContent["featured"];
      featured[index] = { ...featured[index], [field]: value };
      return { ...prev, featured };
    });
  }

  function setClosingField(field: "kicker" | "heading" | "body" | "ctaLabel", value: string) {
    setContent((prev) => (prev ? { ...prev, closing: { ...prev.closing, [field]: value } } : prev));
  }

  function uploadFeaturedImage(index: 0 | 1, file: File) {
    const sizeError = getFileSizeError(file);
    if (sizeError) {
      setMessage(sizeError);
      return;
    }
    const key = `featured-${index}`;
    uploadWithProgress(file, "/api/upload/sustainability", (percent) =>
      setUploadProgress((prev) => ({ ...prev, [key]: { percent } }))
    ).then((result) => {
      setUploadProgress((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      if (result.ok && result.url) {
        setFeaturedField(index, "src", result.url);
        setMessage("");
      } else {
        setMessage(result.error || "Upload failed");
      }
    });
  }

  function updateInitiative(index: number, field: keyof SustainabilityPillar, value: string) {
    setContent((prev) =>
      prev
        ? {
            ...prev,
            initiatives: prev.initiatives.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
          }
        : prev
    );
  }

  function moveInitiative(index: number, dir: -1 | 1) {
    setContent((prev) => {
      if (!prev) return prev;
      const target = index + dir;
      if (target < 0 || target >= prev.initiatives.length) return prev;
      const initiatives = [...prev.initiatives];
      [initiatives[index], initiatives[target]] = [initiatives[target], initiatives[index]];
      return { ...prev, initiatives };
    });
  }

  function deleteInitiative(index: number) {
    setContent((prev) =>
      prev ? { ...prev, initiatives: prev.initiatives.filter((_, i) => i !== index) } : prev
    );
  }

  function addInitiative() {
    setContent((prev) =>
      prev ? { ...prev, initiatives: [...prev.initiatives, emptyPillar()] } : prev
    );
  }

  if (loading || !content) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-emerald-900">
          Sustainability
        </h1>
        <p className="mt-0.5 text-sm text-emerald-800/50">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight text-emerald-900">
            Sustainability Page
          </h1>
          <p className="mt-0.5 text-sm text-emerald-800/50">
            Content of the public sustainability page — saved changes go live instantly.
          </p>
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={save}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Save size={15} strokeWidth={1.8} />
          )}
          Save Changes
        </button>
      </div>

      {message && (
        <div className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      <Section title="Hero">
        <Field label="Kicker" value={content.hero.kicker} onChange={(v) => setHeroField("kicker", v)} />
        <Field label="Main heading" value={content.hero.heading} onChange={(v) => setHeroField("heading", v)} />
        <AreaField label="Intro text" value={content.hero.intro} onChange={(v) => setHeroField("intro", v)} rows={3} />
      </Section>

      <Section title="Our Sustainability Approach">
        <Field label="Kicker" value={content.approach.kicker} onChange={(v) => setApproachField("kicker", v)} />
        <Field label="Section heading" value={content.approach.heading} onChange={(v) => setApproachField("heading", v)} />
        <AreaField
          label="Body text (separate paragraphs with a blank line)"
          value={content.approach.body}
          onChange={(v) => setApproachField("body", v)}
          rows={6}
        />
      </Section>

      <Section title="Featured Images">
        <div className="grid gap-5 rounded-xl border border-emerald-200/70 bg-cream-50/60 p-4 sm:grid-cols-2">
          <FeaturedImageEditor
            label="Image 1"
            image={content.featured[0]}
            progress={uploadProgress["featured-0"] ?? null}
            onField={(field, value) => setFeaturedField(0, field, value)}
            onUpload={(file) => uploadFeaturedImage(0, file)}
          />
          <FeaturedImageEditor
            label="Image 2"
            image={content.featured[1]}
            progress={uploadProgress["featured-1"] ?? null}
            onField={(field, value) => setFeaturedField(1, field, value)}
            onUpload={(file) => uploadFeaturedImage(1, file)}
          />
        </div>
      </Section>

      <Section
        title="Sustainability Initiatives"
        action={
          <button
            type="button"
            onClick={addInitiative}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-800"
          >
            <Plus size={13} strokeWidth={1.8} />
            Add Initiative
          </button>
        }
      >
        {content.initiatives.map((initiative, index) => (
          <div key={`${initiative.title}-${index}`} className="rounded-xl border border-emerald-200/70 bg-cream-50/60 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-display text-sm font-black tracking-tight text-emerald-900">
                Initiative {String(index + 1).padStart(2, "0")}
              </span>
              <ListButtons
                onUp={() => moveInitiative(index, -1)}
                onDown={() => moveInitiative(index, 1)}
                onDelete={() => deleteInitiative(index)}
                disableUp={index === 0}
                disableDown={index === content.initiatives.length - 1}
              />
            </div>
            <div className="space-y-4">
              <Field label="Initiative heading" value={initiative.title} onChange={(v) => updateInitiative(index, "title", v)} />
              <AreaField label="Content" value={initiative.body} onChange={(v) => updateInitiative(index, "body", v)} rows={5} />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Closing Statement">
        <GridCols>
          <Field label="Kicker" value={content.closing.kicker} onChange={(v) => setClosingField("kicker", v)} />
          <Field label="Button label" value={content.closing.ctaLabel} onChange={(v) => setClosingField("ctaLabel", v)} />
        </GridCols>
        <AreaField label="Closing heading" value={content.closing.heading} onChange={(v) => setClosingField("heading", v)} rows={3} />
        <AreaField label="Closing body" value={content.closing.body} onChange={(v) => setClosingField("body", v)} rows={3} />
      </Section>
    </div>
  );
}

function FeaturedImageEditor({
  label,
  image,
  progress,
  onField,
  onUpload,
}: {
  label: string;
  image: { src: string; title: string; caption: string };
  progress: { percent: number } | null;
  onField: (field: "src" | "title" | "caption", value: string) => void;
  onUpload: (file: File) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-sm font-black tracking-tight text-emerald-900">{label}</h3>
      <ImageField
        label="Image"
        value={image.src}
        onChange={(v) => onField("src", v)}
        onUpload={onUpload}
        progress={progress}
        placeholder="/sust/Sustainability1.jpeg"
      />
      <Field label="Title" value={image.title} onChange={(v) => onField("title", v)} />
      <Field label="Caption" value={image.caption} onChange={(v) => onField("caption", v)} />
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-6 rounded-2xl border border-emerald-200/60 bg-white p-6 shadow-sm sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-black tracking-tight text-emerald-900">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {action}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-xs font-bold uppercase tracking-wider text-emerald-800/40 transition-colors hover:text-emerald-700"
          >
            {open ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      {open && <div className="space-y-4">{children}</div>}
    </div>
  );
}

function GridCols({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className={LABEL_CLASS}>{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASS}
      />
    </label>
  );
}

function AreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className={LABEL_CLASS}>{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASS + " resize-y"}
      />
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
  progress,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload?: (file: File) => void;
  progress?: { percent: number } | null;
  placeholder?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <label className="block">
      <span className={LABEL_CLASS}>{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={INPUT_CLASS}
          placeholder={placeholder}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && onUpload) onUpload(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald-300 px-3.5 py-2 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-50"
          title="Upload a new image"
        >
          <CloudUpload size={13} strokeWidth={1.8} />
          Upload
        </button>
      </div>
      {progress && (
        <div className="mt-1.5">
          <UploadProgress progress={progress.percent} status="uploading" />
        </div>
      )}
      <p className="mt-1 text-[11px] font-medium text-emerald-800/40">
        {IMAGE_SIZE_HINT}
      </p>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-2 h-20 w-32 rounded-lg border border-emerald-200 object-cover"
        />
      )}
    </label>
  );
}

function ListButtons({
  onUp,
  onDown,
  onDelete,
  disableUp,
  disableDown,
}: {
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  disableUp: boolean;
  disableDown: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onUp}
        disabled={disableUp}
        className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
        aria-label="Move up"
      >
        <ArrowUp size={13} strokeWidth={1.8} />
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={disableDown}
        className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
        aria-label="Move down"
      >
        <ArrowDown size={13} strokeWidth={1.8} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="rounded-lg border border-red-200 p-1.5 text-red-600 transition-colors hover:bg-red-50"
        aria-label="Remove"
      >
        <Trash2 size={13} strokeWidth={1.8} />
      </button>
    </div>
  );
}