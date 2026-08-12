"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Loader2, Plus, Save, Trash2 } from "lucide-react";
import {
  mergeSustainability,
  type SustainabilityContent,
  type SustainabilityPillar,
} from "@/lib/sustainability-content";

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

  function updatePillar(index: number, field: keyof SustainabilityPillar, value: string) {
    setContent((prev) =>
      prev
        ? {
            ...prev,
            pillars: prev.pillars.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
          }
        : prev
    );
  }

  function movePillar(index: number, dir: -1 | 1) {
    setContent((prev) => {
      if (!prev) return prev;
      const target = index + dir;
      if (target < 0 || target >= prev.pillars.length) return prev;
      const pillars = [...prev.pillars];
      [pillars[index], pillars[target]] = [pillars[target], pillars[index]];
      return { ...prev, pillars };
    });
  }

  function deletePillar(index: number) {
    setContent((prev) =>
      prev ? { ...prev, pillars: prev.pillars.filter((_, i) => i !== index) } : prev
    );
  }

  function addPillar() {
    setContent((prev) =>
      prev ? { ...prev, pillars: [...prev.pillars, emptyPillar()] } : prev
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

      <Section title="Page Settings">
        <Field label="Kicker" value={content.hero.kicker} onChange={(v) => setHeroField("kicker", v)} />
        <Field label="Main heading" value={content.hero.heading} onChange={(v) => setHeroField("heading", v)} />
        <AreaField label="Intro text" value={content.hero.intro} onChange={(v) => setHeroField("intro", v)} rows={3} />
      </Section>

      <Section
        title="Content Sections"
        action={
          <button
            type="button"
            onClick={addPillar}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-800"
          >
            <Plus size={13} strokeWidth={1.8} />
            Add Section
          </button>
        }
      >
        {content.pillars.map((pillar, index) => (
          <div key={`${pillar.title}-${index}`} className="rounded-xl border border-emerald-200/70 bg-cream-50/60 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-display text-sm font-black tracking-tight text-emerald-900">
                Section {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => movePillar(index, -1)}
                  disabled={index === 0}
                  className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                  aria-label="Move section up"
                >
                  <ArrowUp size={13} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={() => movePillar(index, 1)}
                  disabled={index === content.pillars.length - 1}
                  className="rounded-lg border border-emerald-200 p-1.5 text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-30"
                  aria-label="Move section down"
                >
                  <ArrowDown size={13} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={() => deletePillar(index)}
                  className="rounded-lg border border-red-200 p-1.5 text-red-600 transition-colors hover:bg-red-50"
                  aria-label="Remove section"
                >
                  <Trash2 size={13} strokeWidth={1.8} />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <Field label="Section heading" value={pillar.title} onChange={(v) => updatePillar(index, "title", v)} />
              <AreaField label="Content" value={pillar.body} onChange={(v) => updatePillar(index, "body", v)} rows={5} />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Closing Statement">
        <AreaField label="Closing text" value={content.closing} onChange={(v) => setContent((prev) => (prev ? { ...prev, closing: v } : prev))} rows={4} />
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