"use client";

import { useEffect, useMemo, useState } from "react";
import {
  platforms,
  businessModels,
  CATEGORY_LABELS,
  MODEL_LABELS,
  type Platform,
  type PlatformCategory,
  type BusinessModel,
  type CapitalLevel,
} from "@/data/platforms";
import { checklist, starterStacks } from "@/data/checklist";
import { applyGuides, type ApplyGuide } from "@/data/guides";

type SortKey = "name" | "capital" | "difficulty";

const capitalRank: Record<CapitalLevel, number> = { low: 0, medium: 1, high: 2 };
const difficultyRank = { beginner: 0, intermediate: 1, advanced: 2 };

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "ok";
}) {
  const tones = {
    neutral: "bg-[var(--chip)] text-[var(--ink-soft)] border-[var(--line)]",
    accent: "bg-[var(--accent-soft)] text-[var(--accent-ink)] border-[var(--accent)]/25",
    ok: "bg-[var(--ok-soft)] text-[var(--ok-ink)] border-[var(--ok)]/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function PlatformCard({
  platform,
  selected,
  onToggle,
}: {
  platform: Platform;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={`group relative flex flex-col gap-3 rounded-2xl border p-5 transition duration-300 ${
        selected
          ? "border-[var(--accent)] bg-[var(--panel-strong)] shadow-[0_12px_40px_rgba(196,92,38,0.12)]"
          : "border-[var(--line)] bg-[var(--panel)] hover:border-[var(--accent)]/40 hover:bg-[var(--panel-strong)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {CATEGORY_LABELS[platform.category]}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
            {platform.name}
          </h3>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selected}
          className={`shrink-0 rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
            selected
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[var(--line)] bg-white/60 text-[var(--ink-soft)] hover:border-[var(--accent)]"
          }`}
        >
          {selected ? "Comparing" : "Compare"}
        </button>
      </div>

      <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{platform.tagline}</p>

      <div className="flex flex-wrap gap-1.5">
        {platform.beginnerPick && <Badge tone="ok">Beginner pick</Badge>}
        <Badge>{platform.capital} capital</Badge>
        <Badge>{platform.difficulty}</Badge>
        {platform.localNote && <Badge tone="accent">Lawrenceville / Gwinnett</Badge>}
      </div>

      <dl className="grid gap-2 text-sm">
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Best for</dt>
          <dd className="text-[var(--ink)]">{platform.bestFor}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Payout</dt>
          <dd className="text-[var(--ink)]">{platform.payout}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Startup cost</dt>
          <dd className="text-[var(--ink)]">{platform.startupCost}</dd>
        </div>
      </dl>

      {platform.localNote && (
        <p className="rounded-xl bg-[var(--accent-soft)]/60 px-3 py-2 text-xs leading-relaxed text-[var(--accent-ink)]">
          {platform.localNote}
        </p>
      )}

      <div className="grid gap-3 border-t border-[var(--line)] pt-3 text-sm">
        <div>
          <p className="mb-1 text-[11px] uppercase tracking-wider text-[var(--sky)]">How to apply</p>
          <ol className="space-y-1.5 text-[var(--ink-soft)]">
            {platform.applySteps.slice(0, 4).map((step, i) => (
              <li key={step} className="flex gap-2">
                <span className="font-semibold text-[var(--accent)]">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-auto grid gap-3 border-t border-[var(--line)] pt-3 text-sm sm:grid-cols-2">
        <div>
          <p className="mb-1 text-[11px] uppercase tracking-wider text-[var(--ok-ink)]">Pros</p>
          <ul className="space-y-1 text-[var(--ink-soft)]">
            {platform.pros.slice(0, 3).map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ok)]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1 text-[11px] uppercase tracking-wider text-[var(--warn-ink)]">Watch-outs</p>
          <ul className="space-y-1 text-[var(--ink-soft)]">
            {platform.cons.slice(0, 3).map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--warn)]" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href={platform.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-ink)] underline-offset-4 transition group-hover:underline"
      >
        Apply / official site
        <span aria-hidden>→</span>
      </a>
    </article>
  );
}

function GuidePanel({ guide }: { guide: ApplyGuide }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="space-y-4">
        <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Who it&apos;s for</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{guide.whoFor}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Timeline</p>
            <p className="mt-2 text-sm text-[var(--ink)]">{guide.timeline}</p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Capital</p>
            <p className="mt-2 text-sm text-[var(--ink)]">{guide.capital}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">NAICS codes</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
            {guide.naics.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="text-[var(--accent)]">▸</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Documents packet</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
            {guide.docs.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sky)]" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="space-y-4">
        {guide.steps.map((step, i) => (
          <article
            key={step.title}
            className="rounded-2xl border border-[var(--line)] bg-white/90 p-5 transition hover:border-[var(--accent)]/35"
          >
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] font-[family-name:var(--font-display)] text-sm text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--ink)]">
                  {step.title.replace(/^\d+\.\s*/, "")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{step.detail}</p>
                {step.links && step.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-[var(--line)] bg-[var(--accent-soft)]/50 px-3 py-1.5 text-xs font-semibold text-[var(--accent-ink)] hover:border-[var(--accent)]/40"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--ok)]/25 bg-[var(--ok-soft)]/50 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--ok-ink)]">
              Lawrenceville angles
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
              {guide.localAngles.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="text-[var(--ok)]">+</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--warn)]/25 bg-[#fff7ed] p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--warn-ink)]">Pitfalls</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
              {guide.pitfalls.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-[var(--warn)]">!</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PlatformCategory | "all">("all");
  const [model, setModel] = useState<BusinessModel | "all">("all");
  const [capital, setCapital] = useState<CapitalLevel | "all">("all");
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("name");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem("ridestack-checklist");
      return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });
  const [pathModel, setPathModel] = useState<BusinessModel>("rideshare-driver");
  const [guideId, setGuideId] = useState(applyGuides[0].id);

  useEffect(() => {
    localStorage.setItem("ridestack-checklist", JSON.stringify(done));
  }, [done]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = platforms.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (model !== "all" && !p.models.includes(model)) return false;
      if (capital !== "all" && p.capital !== capital) return false;
      if (beginnerOnly && !p.beginnerPick) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.bestFor.toLowerCase().includes(q) ||
        p.regions.some((r) => r.toLowerCase().includes(q)) ||
        p.applySteps.some((s) => s.toLowerCase().includes(q))
      );
    });

    list = [...list].sort((a, b) => {
      if (sort === "capital") return capitalRank[a.capital] - capitalRank[b.capital] || a.name.localeCompare(b.name);
      if (sort === "difficulty")
        return difficultyRank[a.difficulty] - difficultyRank[b.difficulty] || a.name.localeCompare(b.name);
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [query, category, model, capital, beginnerOnly, sort]);

  const compareList = platforms.filter((p) => compareIds.includes(p.id));
  const selectedModel = businessModels.find((m) => m.id === pathModel)!;
  const pathPlatforms = selectedModel.bestStarter
    .map((id) => platforms.find((p) => p.id === id))
    .filter(Boolean) as Platform[];
  const activeGuide = applyGuides.find((g) => g.id === guideId) ?? applyGuides[0];

  const progress = Math.round((Object.values(done).filter(Boolean).length / checklist.length) * 100);

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }

  const categories = Object.keys(CATEGORY_LABELS) as PlatformCategory[];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-glow absolute -left-24 top-0 h-[520px] w-[520px] rounded-full opacity-70" />
        <div className="hero-glow-2 absolute right-0 top-40 h-[420px] w-[420px] rounded-full opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.55),_transparent_55%)]" />
        <div className="grain absolute inset-0 opacity-[0.35]" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--ink)]">
          Ride<span className="text-[var(--accent)]">Stack</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-[var(--ink-soft)] lg:flex">
          <a href="#models" className="hover:text-[var(--ink)]">
            Paths
          </a>
          <a href="#platforms" className="hover:text-[var(--ink)]">
            Platforms
          </a>
          <a href="#apply-guides" className="hover:text-[var(--ink)]">
            Apply guides
          </a>
          <a href="#stacks" className="hover:text-[var(--ink)]">
            Stacks
          </a>
          <a href="#checklist" className="hover:text-[var(--ink)]">
            Checklist
          </a>
        </nav>
        <a
          href="#apply-guides"
          className="rounded-xl bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-ink)]"
        >
          How to apply
        </a>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pt-14">
          <div className="animate-rise">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Lawrenceville · Gwinnett County · Georgia
            </p>
            <p className="mb-4 font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-[var(--ink)] sm:text-6xl md:text-7xl">
              RideStack
            </p>
            <h1 className="max-w-xl text-2xl font-medium leading-snug text-[var(--ink)] sm:text-3xl">
              Your launch board for rideshare, medical courier, and government transport contracts.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--ink-soft)]">
              Compare Uber, Lyft, delivery apps, NEMT via Verida, and public-sector portals — then follow thorough apply
              guides built for where you live in Lawrenceville, GA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#platforms"
                className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(196,92,38,0.28)] transition hover:translate-y-[-1px] hover:bg-[var(--accent-ink)]"
              >
                Browse {platforms.length} platforms
              </a>
              <a
                href="#apply-guides"
                className="rounded-xl border border-[var(--line-strong)] bg-white/50 px-5 py-3 text-sm font-semibold text-[var(--ink)] backdrop-blur transition hover:bg-white"
              >
                Medical & gov apply guides
              </a>
            </div>
          </div>

          <div className="animate-rise-delay relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--ink)] p-6 text-white shadow-[0_30px_80px_rgba(21,32,51,0.28)] sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--accent)]/35 blur-2xl" />
            <div className="road-stripe absolute bottom-0 left-0 right-0 h-1.5 opacity-80" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Quick path from Lawrenceville</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight">
              Cash first. Contracts next.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/85">
              <li className="flex gap-3">
                <span className="text-[var(--accent-bright)]">01</span> This week → Uber / Lyft / DoorDash
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--accent-bright)]">02</span> Next → Medical courier LLC + HIPAA packet
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--accent-bright)]">03</span> Then → SAM.gov + Gwinnett Purchasing + Verida
              </li>
            </ul>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl">{platforms.length}</p>
                <p className="text-[11px] text-white/55">platforms</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl">{applyGuides.length}</p>
                <p className="text-[11px] text-white/55">deep guides</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl">{checklist.length}</p>
                <p className="text-[11px] text-white/55">checklist steps</p>
              </div>
            </div>
          </div>
        </section>

        <section id="models" className="border-y border-[var(--line)] bg-[var(--panel)]/70 py-16 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mb-8 max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Income paths</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
                Pick one path. Stack the right platforms.
              </h2>
              <p className="mt-3 text-[var(--ink-soft)]">
                Each path needs different capital, insurance, and daily work. Select a lane to see a recommended starter
                stack for Metro Atlanta / Gwinnett.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {businessModels.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPathModel(m.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    pathModel === m.id
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--line)] bg-white/70 text-[var(--ink-soft)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                  {selectedModel.name}
                </h3>
                <p className="mt-3 text-[var(--ink-soft)]">{selectedModel.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge>{selectedModel.capital} capital</Badge>
                  <Badge tone="accent">{selectedModel.effort}</Badge>
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Recommended stack</p>
                <ul className="mt-4 space-y-3">
                  {pathPlatforms.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-[var(--ink)]">{p.name}</p>
                        <p className="text-sm text-[var(--ink-soft)]">{CATEGORY_LABELS[p.category]}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setModel(pathModel);
                          setCategory("all");
                          document.getElementById("platforms")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-sm font-semibold text-[var(--accent-ink)]"
                      >
                        Filter →
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="platforms" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Platform directory</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
                Apps, brokers, and portals to apply through
              </h2>
            </div>
            <p className="text-sm text-[var(--ink-soft)]">
              {filtered.length} shown · compare up to 4
            </p>
          </div>

          <div className="sticky top-0 z-20 -mx-5 mb-8 border-y border-[var(--line)] bg-[var(--paper)]/90 px-5 py-4 backdrop-blur-md sm:-mx-0 sm:rounded-2xl sm:border sm:px-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Uber, Verida, SAM.gov, Lawrenceville…"
                className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm outline-none ring-[var(--accent)]/30 placeholder:text-[var(--muted)] focus:ring-2 lg:max-w-xs"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PlatformCategory | "all")}
                className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm"
              >
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value as BusinessModel | "all")}
                className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm"
              >
                <option value="all">All paths</option>
                {(Object.keys(MODEL_LABELS) as BusinessModel[]).map((m) => (
                  <option key={m} value={m}>
                    {MODEL_LABELS[m]}
                  </option>
                ))}
              </select>
              <select
                value={capital}
                onChange={(e) => setCapital(e.target.value as CapitalLevel | "all")}
                className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm"
              >
                <option value="all">Any capital</option>
                <option value="low">Low capital</option>
                <option value="medium">Medium capital</option>
                <option value="high">High capital</option>
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm"
              >
                <option value="name">Sort: name</option>
                <option value="capital">Sort: capital</option>
                <option value="difficulty">Sort: difficulty</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-[var(--ink-soft)]">
                <input
                  type="checkbox"
                  checked={beginnerOnly}
                  onChange={(e) => setBeginnerOnly(e.target.checked)}
                  className="accent-[var(--accent)]"
                />
                Beginner picks
              </label>
            </div>
          </div>

          {compareList.length > 0 && (
            <div className="mb-8 overflow-x-auto rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/50 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--accent-ink)]">
                  Comparing {compareList.length} platforms
                </p>
                <button
                  type="button"
                  onClick={() => setCompareIds([])}
                  className="text-xs font-semibold text-[var(--accent-ink)] underline"
                >
                  Clear
                </button>
              </div>
              <div className="grid min-w-[640px] grid-cols-4 gap-3 text-sm">
                {compareList.map((p) => (
                  <div key={p.id} className="rounded-xl border border-[var(--line)] bg-white/90 p-3">
                    <p className="font-semibold text-[var(--ink)]">{p.name}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{CATEGORY_LABELS[p.category]}</p>
                    <p className="mt-2 text-xs text-[var(--ink-soft)]">{p.payout}</p>
                    <p className="mt-1 text-xs text-[var(--ink-soft)]">{p.startupCost}</p>
                    <p className="mt-1 text-xs capitalize text-[var(--ink-soft)]">
                      {p.capital} capital · {p.difficulty}
                    </p>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 4 - compareList.length) }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-dashed border-[var(--line)] bg-white/40 p-3 text-xs text-[var(--muted)]"
                  >
                    Add another platform
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <PlatformCard
                key={p.id}
                platform={p}
                selected={compareIds.includes(p.id)}
                onToggle={() => toggleCompare(p.id)}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="rounded-2xl border border-dashed border-[var(--line)] p-10 text-center text-[var(--ink-soft)]">
              No platforms match those filters. Clear a filter and try again.
            </p>
          )}
        </section>

        <section id="apply-guides" className="border-y border-[var(--line)] bg-[var(--panel)]/80 py-16 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Deep apply guides</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
                How to apply — medical courier, government contracts & NEMT
              </h2>
              <p className="mt-3 text-[var(--ink-soft)]">
                Step-by-step registrations, document packets, Lawrenceville-specific angles, and pitfalls. Links go to
                official portals (SAM.gov, Verida, DOAS, Gwinnett Purchasing).
              </p>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {applyGuides.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGuideId(g.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    guideId === g.id
                      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                      : "border-[var(--line)] bg-white/80 text-[var(--ink-soft)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  {g.id === "medical-courier"
                    ? "Medical courier"
                    : g.id === "government-contracts"
                      ? "Government contracts"
                      : "NEMT / Verida"}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] sm:text-3xl">
                {activeGuide.title}
              </h3>
              <p className="mt-2 max-w-3xl text-[var(--ink-soft)]">{activeGuide.subtitle}</p>
            </div>

            <GuidePanel guide={activeGuide} />
          </div>
        </section>

        <section id="stacks" className="border-b border-[var(--line)] bg-[var(--ink)] py-16 text-white">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Ready-made paths</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
              Starter stacks by budget
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {starterStacks.map((stack) => (
                <article
                  key={stack.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-2xl">{stack.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{stack.budget}</p>
                  <ol className="mt-4 space-y-2 text-sm">
                    {stack.path.map((step, idx) => (
                      <li key={step} className="flex gap-3">
                        <span className="text-[var(--accent-bright)]">{String(idx + 1).padStart(2, "0")}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/75">{stack.why}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="checklist" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Launch checklist</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
                From first ride to first contract
              </h2>
            </div>
            <div className="min-w-[180px]">
              <div className="mb-1 flex justify-between text-xs text-[var(--ink-soft)]">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--chip)]">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {(["setup", "launch", "grow"] as const).map((phase) => (
            <div key={phase} className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-ink)]">
                {phase}
              </h3>
              <ul className="space-y-2">
                {checklist
                  .filter((item) => item.phase === phase)
                  .map((item) => {
                    const checked = !!done[item.id];
                    return (
                      <li key={item.id}>
                        <label
                          className={`flex cursor-pointer gap-4 rounded-2xl border p-4 transition ${
                            checked
                              ? "border-[var(--ok)]/40 bg-[var(--ok-soft)]/60"
                              : "border-[var(--line)] bg-[var(--panel)] hover:border-[var(--accent)]/30"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setDone((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                            className="mt-1 accent-[var(--accent)]"
                          />
                          <span>
                            <span
                              className={`block font-semibold ${
                                checked
                                  ? "text-[var(--ok-ink)] line-through decoration-[var(--ok)]/50"
                                  : "text-[var(--ink)]"
                              }`}
                            >
                              {item.title}
                            </span>
                            <span className="mt-1 block text-sm text-[var(--ink-soft)]">{item.detail}</span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <div className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-gradient-to-br from-white via-[var(--panel-strong)] to-[var(--accent-soft)] p-8 sm:p-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
              Suggested first 30 days in Lawrenceville
            </h2>
            <ol className="mt-6 grid gap-4 text-sm text-[var(--ink-soft)] md:grid-cols-3">
              <li className="rounded-2xl bg-white/70 p-4">
                <p className="font-semibold text-[var(--ink)]">Week 1</p>
                <p className="mt-2">
                  Onboard Uber + one delivery app. Run peak windows on Sugarloaf / Scenic Hwy. Log true net hourly.
                </p>
              </li>
              <li className="rounded-2xl bg-white/70 p-4">
                <p className="font-semibold text-[var(--ink)]">Weeks 2–3</p>
                <p className="mt-2">
                  If going medical: file LLC, get commercial quotes, finish HIPAA, draft capability sheet, pitch two
                  clinics.
                </p>
              </li>
              <li className="rounded-2xl bg-white/70 p-4">
                <p className="font-semibold text-[var(--ink)]">Week 4</p>
                <p className="mt-2">
                  Register SAM.gov + Team Georgia + Gwinnett Purchasing. Skim two GPR solicitations. Decide on Verida
                  RFQ only if fleet-ready.
                </p>
              </li>
            </ol>
            <p className="mt-6 text-xs text-[var(--muted)]">
              Requirements and broker assignments change — always verify current rules on Uber/Lyft, Verida, SAM.gov,
              Georgia DOAS, and Gwinnett Purchasing before you spend money or submit a bid. This dashboard is a planning
              map, not legal or insurance advice.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] py-8 text-center text-sm text-[var(--muted)]">
        RideStack · Lawrenceville, GA mobility launch map for rideshare, medical courier, NEMT & government contracts
      </footer>
    </div>
  );
}
