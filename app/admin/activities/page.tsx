"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  CloudUpload,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import {
  mergeActivities,
  type ActivitiesContent,
  type ActivityCard,
  type Destination,
} from "@/lib/activities-content";
import {
  getFileSizeError,
  IMAGE_SIZE_HINT,
  UploadProgress,
  uploadWithProgress,
} from "@/app/admin/components/upload";

const INPUT_CLASS =
  "w-full rounded-xl border border-emerald-200 bg-cream-50 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";

const LABEL_CLASS =
  "mb-1.5 block text-xs font-bold uppercase tracking-wider text-emerald-900/60";

function emptyCard(): ActivityCard {
  return { title: "", body: "", image: "" };
}

function emptyDestination(): Destination {
  return {
    name: "",
    distance: "",
    note: null,
    image: "",
    travelTime: "",
    highlight: "",
  };
}

export default function AdminActivitiesPage() {
  const router = useRouter();
  const [content, setContent] = useState<ActivitiesContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState<
    Record<string, { percent: number }>
  >({});

  function uploadKey(target: string, index: number | null) {
    return `${target}${index ?? ""}`;
  }

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/pages/activities");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = (await res.json()) as { data?: Record<string, unknown> | null };
      setContent(mergeActivities(data.data));
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
      const res = await fetch("/api/pages/activities", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage("Activities page saved — live now.");
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

  function setSection<K extends keyof ActivitiesContent>(
    section: K,
    value: ActivitiesContent[K]
  ) {
    setContent((prev) => (prev ? { ...prev, [section]: value } : prev));
  }

  function setSectionField(
    section: "hero" | "atProperty" | "nearby" | "trails" | "finale",
    field: string,
    value: string
  ) {
    setContent((prev) =>
      prev ? { ...prev, [section]: { ...prev[section], [field]: value } } : prev
    );
  }

  function moveCard(index: number, dir: -1 | 1) {
    setContent((prev) => {
      if (!prev) return prev;
      const target = index + dir;
      if (target < 0 || target >= prev.propertyCards.length) return prev;
      const cards = [...prev.propertyCards];
      [cards[index], cards[target]] = [cards[target], cards[index]];
      return { ...prev, propertyCards: cards };
    });
  }

  function moveDestination(index: number, dir: -1 | 1) {
    setContent((prev) => {
      if (!prev) return prev;
      const target = index + dir;
      if (target < 0 || target >= prev.destinations.length) return prev;
      const destinations = [...prev.destinations];
      [destinations[index], destinations[target]] = [destinations[target], destinations[index]];
      return { ...prev, destinations };
    });
  }

  function uploadImage(
    target: "hero" | "card" | "destination" | "trails",
    index: number | null,
    file: File
  ) {
    const sizeError = getFileSizeError(file);
    if (sizeError) {
      setMessage(`Skipped: ${sizeError}`);
      return;
    }
    setUploadProgress((prev) => ({ ...prev, [uploadKey(target, index)]: { percent: 0 } }));
    uploadWithProgress(file, "/api/upload/activity", (percent) => {
      setUploadProgress((prev) => ({
        ...prev,
        [uploadKey(target, index)]: { percent },
      }));
    }).then((result) => {
      setUploadProgress((prev) => {
        const next = { ...prev };
        delete next[uploadKey(target, index)];
        return next;
      });
      if (!result.ok) {
        setMessage(result.error || "Upload failed");
        return;
      }
      setContent((prev) => {
        if (!prev) return prev;
        if (target === "hero") {
          return { ...prev, hero: { ...prev.hero, bgImage: result.url! } };
        }
        if (target === "trails") {
          return { ...prev, trails: { ...prev.trails, image: result.url! } };
        }
        if (target === "card") {
          return {
            ...prev,
            propertyCards: prev.propertyCards.map((c, i) =>
              i === index ? { ...c, image: result.url! } : c
            ),
          };
        }
        return {
          ...prev,
          destinations: prev.destinations.map((d, i) =>
            i === index ? { ...d, image: result.url! } : d
          ),
        };
      });
    });
  }

  if (loading || !content) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-emerald-900">
          Activities
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
            Activities Page
          </h1>
          <p className="mt-0.5 text-sm text-emerald-800/50">
            Content of the public activities page — saved changes go live instantly.
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

      {/* HERO */}
      <Section title="Hero">
        <GridCols>
          <Field label="Kicker" value={content.hero.kicker} onChange={(v) => setSectionField("hero", "kicker", v)} />
          <Field label="Heading" value={content.hero.heading} onChange={(v) => setSectionField("hero", "heading", v)} />
        </GridCols>
        <AreaField label="Description" value={content.hero.description} onChange={(v) => setSectionField("hero", "description", v)} />
        <GridCols>
          <ImageField
            label="Background image"
            value={content.hero.bgImage}
            onChange={(v) => setSectionField("hero", "bgImage", v)}
            onUpload={(file) => uploadImage("hero", null, file)}
            progress={uploadProgress["heronull"]}
          />
          <Field label="Background alt text" value={content.hero.bgAlt} onChange={(v) => setSectionField("hero", "bgAlt", v)} />
        </GridCols>
      </Section>

      {/* AT THE PROPERTY */}
      <Section title="At the Property">
        <GridCols>
          <Field label="Kicker" value={content.atProperty.kicker} onChange={(v) => setSectionField("atProperty", "kicker", v)} />
          <Field label="Heading" value={content.atProperty.heading} onChange={(v) => setSectionField("atProperty", "heading", v)} />
        </GridCols>
        <AreaField label="Description" value={content.atProperty.description} onChange={(v) => setSectionField("atProperty", "description", v)} />
      </Section>

      {/* PROPERTY CARDS */}
      <Section
        title="Cards (At the Property)"
        action={
          <button
            type="button"
            onClick={() =>
              setSection("propertyCards", [...content.propertyCards, emptyCard()])
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 px-3.5 py-2 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            <Plus size={13} strokeWidth={2} />
            Add Card
          </button>
        }
      >
        <div className="space-y-5">
          {content.propertyCards.map((card, index) => (
            <div key={index} className="rounded-2xl border border-emerald-200/60 bg-cream-50/60 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/50">
                  Card {index + 1}
                </span>
                <ListButtons
                  onUp={() => moveCard(index, -1)}
                  onDown={() => moveCard(index, 1)}
                  disableUp={index === 0}
                  disableDown={index === content.propertyCards.length - 1}
                  onDelete={() =>
                    setSection(
                      "propertyCards",
                      content.propertyCards.filter((_, i) => i !== index)
                    )
                  }
                />
              </div>
              <GridCols>
                <Field
                  label="Title"
                  value={card.title}
                  onChange={(v) =>
                    setSection(
                      "propertyCards",
                      content.propertyCards.map((c, i) => (i === index ? { ...c, title: v } : c))
                    )
                  }
                />
                <ImageField
                  label="Image"
                  value={card.image}
                  onChange={(v) =>
                    setSection(
                      "propertyCards",
                      content.propertyCards.map((c, i) => (i === index ? { ...c, image: v } : c))
                    )
                  }
                  onUpload={(file) => uploadImage("card", index, file)}
                  progress={uploadProgress[`card${index}`]}
                />
              </GridCols>
              <AreaField
                label="Body"
                value={card.body}
                rows={3}
                onChange={(v) =>
                  setSection(
                    "propertyCards",
                    content.propertyCards.map((c, i) => (i === index ? { ...c, body: v } : c))
                  )
                }
              />
            </div>
          ))}
        </div>
      </Section>

      {/* NEARBY */}
      <Section title="Nearby / Destinations (intro)">
        <GridCols>
          <Field label="Kicker" value={content.nearby.kicker} onChange={(v) => setSectionField("nearby", "kicker", v)} />
          <Field label="Heading" value={content.nearby.heading} onChange={(v) => setSectionField("nearby", "heading", v)} />
        </GridCols>
        <AreaField label="Description" value={content.nearby.description} onChange={(v) => setSectionField("nearby", "description", v)} />
      </Section>

      {/* DESTINATIONS */}
      <Section
        title="Destination List"
        action={
          <button
            type="button"
            onClick={() =>
              setSection("destinations", [...content.destinations, emptyDestination()])
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 px-3.5 py-2 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            <Plus size={13} strokeWidth={2} />
            Add Destination
          </button>
        }
      >
        <div className="space-y-5">
          {content.destinations.map((place, index) => (
            <div key={index} className="rounded-2xl border border-emerald-200/60 bg-cream-50/60 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/50">
                  Destination {index + 1}
                </span>
                <ListButtons
                  onUp={() => moveDestination(index, -1)}
                  onDown={() => moveDestination(index, 1)}
                  disableUp={index === 0}
                  disableDown={index === content.destinations.length - 1}
                  onDelete={() =>
                    setSection(
                      "destinations",
                      content.destinations.filter((_, i) => i !== index)
                    )
                  }
                />
              </div>
              <GridCols>
                <Field
                  label="Name"
                  value={place.name}
                  onChange={(v) =>
                    setSection(
                      "destinations",
                      content.destinations.map((d, i) => (i === index ? { ...d, name: v } : d))
                    )
                  }
                />
                <Field
                  label="Distance"
                  value={place.distance}
                  onChange={(v) =>
                    setSection(
                      "destinations",
                      content.destinations.map((d, i) => (i === index ? { ...d, distance: v } : d))
                    )
                  }
                />
              </GridCols>
              <GridCols>
                <Field
                  label="Note (optional)"
                  value={place.note ?? ""}
                  onChange={(v) =>
                    setSection(
                      "destinations",
                      content.destinations.map((d, i) =>
                        i === index ? { ...d, note: v.trim() ? v : null } : d
                      )
                    )
                  }
                />
                <Field
                  label="Travel time"
                  value={place.travelTime}
                  onChange={(v) =>
                    setSection(
                      "destinations",
                      content.destinations.map((d, i) => (i === index ? { ...d, travelTime: v } : d))
                    )
                  }
                />
              </GridCols>
              <GridCols>
                <AreaField
                  label="Highlight"
                  rows={2}
                  value={place.highlight}
                  onChange={(v) =>
                    setSection(
                      "destinations",
                      content.destinations.map((d, i) => (i === index ? { ...d, highlight: v } : d))
                    )
                  }
                />
              </GridCols>
              <ImageField
                label="Image"
                value={place.image}
                onChange={(v) =>
                  setSection(
                    "destinations",
                    content.destinations.map((d, i) => (i === index ? { ...d, image: v } : d))
                  )
                }
                onUpload={(file) => uploadImage("destination", index, file)}
                progress={uploadProgress[`destination${index}`]}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* TRAILS */}
      <Section title="Trails / Blog CTA">
        <GridCols>
          <Field label="Kicker" value={content.trails.kicker} onChange={(v) => setSectionField("trails", "kicker", v)} />
          <Field label="Heading" value={content.trails.heading} onChange={(v) => setSectionField("trails", "heading", v)} />
        </GridCols>
        <AreaField label="Description" value={content.trails.description} onChange={(v) => setSectionField("trails", "description", v)} />
        <Field label="Blog URL" value={content.trails.blogUrl} onChange={(v) => setSectionField("trails", "blogUrl", v)} />
        <GridCols>
          <ImageField
            label="Image"
            value={content.trails.image}
            onChange={(v) => setSectionField("trails", "image", v)}
            onUpload={(file) => uploadImage("trails", null, file)}
            progress={uploadProgress["trailsnull"]}
          />
          <Field label="Image alt text" value={content.trails.imageAlt} onChange={(v) => setSectionField("trails", "imageAlt", v)} />
        </GridCols>
      </Section>

      {/* FINALE */}
      <Section title="Final Call-to-action">
        <Field label="Heading" value={content.finale.heading} onChange={(v) => setSectionField("finale", "heading", v)} />
      </Section>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload?: (file: File) => void;
  progress?: { percent: number } | null;
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
          placeholder="/uploads/activities/..." 
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