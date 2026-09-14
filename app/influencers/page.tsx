"use client";

import { PageShell } from "@/components/layout/PageShell";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

type Influencer = {
  name: string;
  slug: string;
  category: string;
  platform: string;
  followers: string;
  followersNum: number;
  engagement: string;
  location: string;
  description: string;
  initials: string;
  featured?: boolean;
  gradient: string;
  image: string;  
};

const influencers: Influencer[] = [
  { name: "Ahmed Khan", slug: "ahmed-khan", category: "Crypto", platform: "YouTube", followers: "125K", followersNum: 125000, engagement: "4.8%", location: "Pakistan", description: "Crypto educator and market commentator focused on digital assets and Web3.", initials: "AK", featured: true, gradient: "from-blue-500 to-cyan-500", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
  { name: "Hamza Malik", slug: "hamza-malik", category: "Forex", platform: "Instagram", followers: "82K", followersNum: 82000, engagement: "6.2%", location: "Pakistan", description: "Forex and trading creator producing educational market content.", initials: "HM", featured: true, gradient: "from-purple-500 to-pink-500", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
  { name: "Usman Tariq", slug: "usman-tariq", category: "Finance", platform: "YouTube", followers: "210K", followersNum: 210000, engagement: "3.9%", location: "Pakistan", description: "Personal finance and investment creator with a broad business audience.", initials: "UT", gradient: "from-emerald-500 to-teal-500", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&q=80" },
  { name: "Bilal Ahmed", slug: "bilal-ahmed", category: "Trading", platform: "X", followers: "64K", followersNum: 64000, engagement: "7.1%", location: "Pakistan", description: "Trading-focused creator covering markets, technical analysis, and strategy.", initials: "BA", gradient: "from-orange-500 to-red-500", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
  { name: "Saad Raza", slug: "saad-raza", category: "Crypto", platform: "X", followers: "156K", followersNum: 156000, engagement: "5.4%", location: "Pakistan", description: "Crypto market analyst and community creator covering Web3 trends.", initials: "SR", gradient: "from-cyan-500 to-blue-500", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
  { name: "Ali Hassan", slug: "ali-hassan", category: "Finance", platform: "Instagram", followers: "91K", followersNum: 91000, engagement: "5.8%", location: "Pakistan", description: "Finance creator focused on financial education and digital products.", initials: "AH", gradient: "from-indigo-500 to-purple-500", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
  { name: "Fahad Shah", slug: "fahad-shah", category: "Web3", platform: "YouTube", followers: "73K", followersNum: 73000, engagement: "6.6%", location: "Pakistan", description: "Web3 creator explaining blockchain technology and emerging ecosystems.", initials: "FS", gradient: "from-violet-500 to-fuchsia-500", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
  { name: "Owais Khan", slug: "owais-khan", category: "Trading", platform: "Instagram", followers: "118K", followersNum: 118000, engagement: "4.5%", location: "Pakistan", description: "Trading and financial markets creator with an active retail audience.", initials: "OK", gradient: "from-amber-500 to-orange-500", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
  { name: "Zain Malik", slug: "zain-malik", category: "Crypto", platform: "TikTok", followers: "245K", followersNum: 245000, engagement: "8.2%", location: "Pakistan", description: "Short-form crypto creator reaching a highly engaged younger audience.", initials: "ZM", gradient: "from-rose-500 to-pink-500", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
];

const categories = ["All", "Crypto", "Forex", "Finance", "Trading", "Web3"];

export default function InfluencersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Influencer>(influencers[0]);

  const filtered = useMemo(() => {
    return influencers.filter((i) => {
      const matchCat = category === "All" || i.category === category;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.platform.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <PageShell>
      {/* 3D BACKGROUND CONTAINER */}
      <div className="pointer-events-none fixed inset-0 -z-10">
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10">
        {/* ═══════════ HERO HEADER ═══════════ */}
        <section className="relative z-10 px-6 pb-10 pt-32 lg:px-12">
          <div className="mx-auto max-w-[1600px]">
            <TextReveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/[0.06] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-sm">
                <Users className="h-3 w-3 animate-pulse text-cyan-400" />
                Creator Network
              </div>
            </TextReveal>

            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <h1
                className="text-5xl font-light leading-[1.05] tracking-[-0.03em] sm:text-7xl"
                style={{ textShadow: "0 4px 30px rgba(2,5,15,0.9)" }}
              >
                <TextReveal delay={100}>Discover the</TextReveal>
                <TextReveal delay={200}>
  <span className="block pb-2 pr-4 font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
    right creators.
  </span>
</TextReveal>
              </h1>

              <TextReveal delay={350}>
                <div className="flex flex-wrap gap-8">
                  {[
                    { value: 500, suffix: "+", l: "Creators" },
                    { value: 25, suffix: "M+", l: "Combined Reach" },
                    { value: 4.9, suffix: "%", l: "Avg. Engagement" },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="text-3xl font-light tracking-tight text-white drop-shadow-md">
                        <AnimatedCounter value={s.value} suffix={s.suffix} duration={2000} />
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </TextReveal>
            </div>
          </div>
        </section>

        {/* ═══════════ TWO-PANEL BROWSER ═══════════ */}
        <section className="relative z-10 px-6 pb-32 lg:px-12">
          <TextReveal delay={450}>
            <div className="mx-auto max-w-[1600px]">
              <div className="grid gap-4 lg:grid-cols-[400px_1fr]">
                {/* LEFT PANEL */}
                <GradientBorder from="from-white/[0.08]" to="to-white/[0.01]">
                  <div className="flex h-[calc(100vh-220px)] flex-col overflow-hidden bg-[#060b18]/70 backdrop-blur-xl">
                    <div className="border-b border-white/[0.06] p-5">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search creators..."
                          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-3 text-sm outline-none placeholder:text-white/25 transition focus:border-cyan-400/40 focus:bg-white/[0.05]"
                        />
                      </div>

                      <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto">
  {categories.map((c) => {
    const active = category === c;
    return (
      <button
        key={c}
        onClick={() => setCategory(c)}
        className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-medium transition ${
          active
            ? "bg-cyan-500/20"
            : "bg-white/[0.02] hover:bg-white/[0.06]"
        }`}
        style={{
          borderColor: active
            ? "rgba(34, 211, 238, 0.6)"
            : "rgba(255, 255, 255, 0.1)",
          color: active ? "#67e8f9" : "rgba(255, 255, 255, 0.5)",
          boxShadow: active
            ? "0 0 0 1px rgba(34, 211, 238, 0.4), 0 0 12px rgba(34, 211, 238, 0.15)"
            : "none",
        }}
      >
        {c}
      </button>
    );
  })}
</div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      {filtered.length === 0 ? (
                        <div className="p-8 text-center">
                          <X className="mx-auto h-6 w-6 text-white/20" />
                          <p className="mt-3 text-sm text-white/40">
                            No creators found
                          </p>
                        </div>
                      ) : (
                        filtered.map((i) => {
                          const active = selected.slug === i.slug;
                          return (
                            <button
                              key={i.slug}
                              onClick={() => setSelected(i)}
                              className={`flex w-full items-center gap-3 border-b border-white/[0.04] px-5 py-4 text-left transition ${
                                active
                                  ? "border-l-[3px] border-l-cyan-400 bg-cyan-500/[0.08]"
                                  : "border-l-[3px] border-l-transparent hover:bg-white/[0.03]"
                              }`}
                            >
                              <div
  className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${i.gradient} shadow-lg`}
>
  {/* Fallback: initials behind the image */}
  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
    {i.initials}
  </span>
  {/* Real image on top */}
  <img
    src={i.image}
    alt={i.name}
    className="relative h-full w-full object-cover"
    loading="lazy"
    onError={(e) => {
      e.currentTarget.style.display = "none";
    }}
  />
</div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className={`truncate text-sm font-medium ${active ? 'text-white' : 'text-white/80'}`}>
                                    {i.name}
                                  </span>
                                  {i.featured && (
                                    <Sparkles className="h-3 w-3 shrink-0 text-cyan-400" />
                                  )}
                                </div>
                                <div className="mt-1 flex items-center gap-2 text-[11px] text-white/40">
                                  <span>{i.category}</span>
                                  <span className="text-white/20">·</span>
                                  <span>{i.followers}</span>
                                </div>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                </GradientBorder>

                {/* RIGHT PANEL */}
                <GradientBorder from="from-cyan-500/[0.08]" to="to-purple-500/[0.02]">
                  <div className="relative flex h-[calc(100vh-220px)] flex-col overflow-y-auto bg-[#02050f]/80 p-8 backdrop-blur-xl lg:p-12">
                    <div
                      className={`animate-pulse-glow pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br ${selected.gradient} opacity-[0.12] blur-[100px] transition-all duration-700`}
                    />

                    <div className="relative">
                      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                        <div
  className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-[2rem] bg-gradient-to-br ${selected.gradient} shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500`}
>
  {/* Fallback initials */}
  <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
    {selected.initials}
  </span>
  {/* Image */}
  <img
    src={selected.image}
    alt={selected.name}
    className="relative h-full w-full object-cover"
    onError={(e) => {
      e.currentTarget.style.display = "none";
    }}
  />
</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h2 className="text-4xl font-light tracking-tight">
                              {selected.name}
                            </h2>
                            <CheckCircle2 className="h-6 w-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/50">
                            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 font-medium text-cyan-300">
                              {selected.category}
                            </span>
                            <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {selected.location}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                              {selected.platform}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/60">
                        {selected.description}
                      </p>

                      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {[
                          { l: "Followers", v: selected.followers },
                          { l: "Engagement", v: selected.engagement },
                          { l: "Platform", v: selected.platform },
                          { l: "Category", v: selected.category },
                        ].map((s) => (
                          <div
                            key={s.l}
                            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition hover:bg-white/[0.04]"
                          >
                            <div className="text-2xl font-light">{s.v}</div>
                            <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                              {s.l}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12">
                        <div className="mb-6 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-cyan-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                            Audience Insights
                          </span>
                        </div>
                        <div className="space-y-5 rounded-2xl border border-white/[0.04] bg-[#060b18]/50 p-6 backdrop-blur-md">
                          {[
                            { label: "18-24 years", pct: 42 },
                            { label: "25-34 years", pct: 31 },
                            { label: "35-44 years", pct: 18 },
                            { label: "45+ years", pct: 9 },
                          ].map((row) => (
                            <div key={row.label}>
                              <div className="mb-2 flex justify-between text-[11px] font-medium uppercase tracking-wide text-white/50">
                                <span>{row.label}</span>
                                <span className="text-cyan-300">{row.pct}%</span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all duration-1000 ease-out"
                                  style={{ width: `${row.pct}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-12 flex flex-wrap gap-4">
                        <Link
                          href="/contact"
                          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold shadow-[0_4px_24px_rgba(34,211,238,0.2)] transition hover:brightness-110 hover:shadow-[0_8px_32px_rgba(34,211,238,0.4)]"
                        >
                          Start Campaign with {selected.name.split(" ")[0]}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                          href={`/influencers/${selected.slug}`}
                          className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/[0.08]"
                        >
                          View Full Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </GradientBorder>
              </div>
            </div>
          </TextReveal>
        </section>
      </div>
    </PageShell>
  );
}