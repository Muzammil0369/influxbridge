"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Search, Users, RefreshCw, LoaderCircle, MapPin, UserRound, ShieldCheck, ExternalLink, Globe2, Instagram, Youtube, CheckCircle2 } from "lucide-react";

type Row = Record<string, any>;
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const compact = (value: unknown) => { const n = Number(value || 0); return n >= 1_000_000 ? (n/1_000_000).toFixed(n%1_000_000 ? 1 : 0)+"M" : n >= 1000 ? (n/1000).toFixed(n%1000 ? 1 : 0)+"K" : String(n); };
const urlFor = (value: string) => /^https?:\/\//i.test(value) ? value : "https://" + value;

export default function InfluencersPage() {
  const supabase = createClient();
  const [creators, setCreators] = useState<Row[]>([]);
  const [accounts, setAccounts] = useState<Row[]>([]);
  const [avatars, setAvatars] = useState<Record<string,string>>({});
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (quiet = false) => {
    if (quiet) setRefreshing(true); else setLoading(true);
    setError("");
    const { data: auth } = await supabase.auth.getUser();
    setSignedIn(Boolean(auth.user));
    if (!auth.user) { setCreators([]); setAccounts([]); setAvatars({}); setLoading(false); setRefreshing(false); return; }
    const { data, error: queryError } = await supabase.from("influencer_profiles").select("*").eq("profile_status", "ACTIVE").order("display_name", { ascending: true });
    if (queryError) { setError(queryError.message); setCreators([]); setAccounts([]); setLoading(false); setRefreshing(false); return; }
    const rows = data || [];
    setCreators(rows);
    if (rows.length) {
      const ids = rows.map((row: Row) => row.id).filter(Boolean);
      const [socialResult, profileResult] = await Promise.all([
        supabase.from("social_accounts").select("*").in("influencer_id", ids),
        supabase.from("profiles").select("id,avatar_url,full_name").in("id", ids),
      ]);
      setAccounts(socialResult.data || []);
      const imageMap: Record<string,string> = {};
      for (const p of profileResult.data || []) if (p.avatar_url) imageMap[p.id] = p.avatar_url;
      setAvatars(imageMap);
      if (socialResult.error) setError(socialResult.error.message);
    } else { setAccounts([]); setAvatars({}); }
    setLoading(false); setRefreshing(false);
  }, [supabase]);

  useEffect(() => {
    void load();
    const channel = supabase.channel("creator-network-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "influencer_profiles" }, () => void load(true))
      .on("postgres_changes", { event: "*", schema: "public", table: "social_accounts" }, () => void load(true))
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [load, supabase]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(creators.map((c) => String(c.niche || "Other")))).sort()], [creators]);
  const filtered = useMemo(() => creators.filter((c) => {
    const query = search.trim().toLowerCase();
    const social = accounts.filter((a) => a.influencer_id === c.id);
    const matchNiche = niche === "All" || String(c.niche || "Other") === niche;
    const haystack = [c.display_name,c.niche,c.location,c.bio,...social.map((a) => a.platform),...social.map((a) => a.username)].join(" ").toLowerCase();
    return matchNiche && (!query || haystack.includes(query));
  }), [creators, accounts, search, niche]);

  useEffect(() => {
    if (filtered.length && !filtered.some((creator) => creator.id === selectedId)) setSelectedId(filtered[0].id);
  }, [filtered, selectedId]);

  const selected = filtered.find((creator) => creator.id === selectedId) || null;
  const selectedSocials = selected ? accounts.filter((a) => a.influencer_id === selected.id) : [];
  const selectedName = String(selected?.display_name || "Creator");
  const followers = selected ? selected.followers_count ?? selectedSocials.reduce((sum, a) => sum + Number(a.followers_count || 0), 0) : 0;
  const languages = Array.isArray(selected?.languages) ? selected.languages.filter(Boolean) : [];

  return <PageShell>
    <main className="relative z-10 min-h-screen px-4 pb-20 pt-32 text-white sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <section className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/[.06] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-200"><Users size={13}/> InfluxBridge Creator Network</div>
            <h1 className="max-w-4xl text-[clamp(2.6rem,5vw,5rem)] font-light leading-[.98] tracking-[-.045em]">Find the right voices.<br/><span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text font-semibold text-transparent">Build real momentum.</span></h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">Explore approved creator profiles, compare audience and niche fit, and review their portfolio before discussing a campaign with our team.</p>
          </div>
          <button onClick={() => void load(true)} disabled={refreshing} className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/15 bg-white/[.04] px-5 py-3 text-xs font-semibold text-white/70 backdrop-blur-md transition hover:border-cyan-300/25 hover:text-white lg:self-auto"><RefreshCw size={14} className={refreshing ? "animate-spin" : ""}/> Refresh network</button>
        </section>

        {!signedIn && !loading && <div className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/[.05] p-7 sm:p-10"><div className="flex gap-4"><ShieldCheck className="mt-1 shrink-0 text-cyan-300" size={26}/><div><h2 className="text-xl font-semibold">Sign in to browse approved creators</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">Creator profiles are available to authenticated workspace users. Sign in with your company account to view the live network.</p><Link href="/login" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-xs font-bold shadow-[0_8px_30px_rgba(34,211,238,.18)]">Sign in to continue <ArrowRight size={14}/></Link></div></div></div>}

        {signedIn && <>
          <div className="mt-7 grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="relative block"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search creator, niche, platform or location..." className="h-12 w-full rounded-xl border border-white/10 bg-[#050b18]/75 pl-11 pr-4 text-sm outline-none backdrop-blur-md placeholder:text-white/25 focus:border-cyan-300/40"/></label>
            <select value={niche} onChange={(e) => setNiche(e.target.value)} className="h-12 rounded-xl border border-white/10 bg-[#080d19] px-4 text-sm text-white/75 outline-none focus:border-cyan-300/40">{categories.map((item) => <option key={item} value={item}>{item === "All" ? "All niches" : item}</option>)}</select>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-white/35"><span>{filtered.length} approved creator{filtered.length === 1 ? "" : "s"}</span><span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/> Live Supabase profiles</span></div>
        </>}

        {loading && <div className="grid min-h-64 place-items-center"><div className="flex items-center gap-3 text-sm text-white/50"><LoaderCircle className="animate-spin text-cyan-300" size={20}/> Loading approved creator profiles…</div></div>}
        {error && <div role="alert" className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/[.05] p-4 text-sm text-rose-100/80">Could not load the creator network: {error}</div>}
        {signedIn && !loading && !error && filtered.length === 0 && <div className="mt-8 rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center"><Users className="mx-auto text-white/45" size={28}/><h2 className="mt-5 text-xl font-semibold">{creators.length ? "No creators match your search" : "No approved creators yet"}</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/40">{creators.length ? "Try a different name or niche filter." : "Once the InfluxBridge team approves creator applications, their real profiles will appear here automatically."}</p></div>}

        {signedIn && !loading && filtered.length > 0 && <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(320px,.82fr)_minmax(0,1.55fr)]">
          <aside className="overflow-hidden rounded-3xl border border-white/10 bg-[#060b17]/85 backdrop-blur-xl lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div><p className="text-sm font-semibold">Creator shortlist</p><p className="mt-1 text-[10px] text-white/35">Select a tile to inspect the profile</p></div><span className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-cyan-200">{filtered.length}</span></div>
            <div className="max-h-[68vh] space-y-2 overflow-y-auto p-3">
              {filtered.map((creator) => {
                const social = accounts.filter((a) => a.influencer_id === creator.id);
                const name = String(creator.display_name || "Creator");
                const count = creator.followers_count ?? social.reduce((sum, a) => sum + Number(a.followers_count || 0), 0);
                const active = creator.id === selectedId;
                return <button key={creator.id} onClick={() => setSelectedId(creator.id)} className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${active ? "border-cyan-300/35 bg-cyan-300/[.08] shadow-[inset_0_0_24px_rgba(34,211,238,.035)]" : "border-white/[.06] bg-white/[.015] hover:border-white/15 hover:bg-white/[.04]"}`}>
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-cyan-400/15 to-violet-500/15">{avatars[creator.id] ? <img src={avatars[creator.id]} alt={name} className="h-full w-full object-cover"/> : <div className="grid h-full w-full place-items-center"><UserRound size={21} className="text-cyan-200"/></div>}</div>
                  <div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><p className={`truncate text-sm font-semibold ${active ? "text-cyan-100" : "text-white/85"}`}>{name}</p>{active && <CheckCircle2 size={13} className="shrink-0 text-cyan-300"/>}</div><p className="mt-1 truncate text-[11px] text-white/40">{creator.niche || "Niche not specified"}{creator.location ? " · " + creator.location : ""}</p><p className="mt-1 text-[10px] text-white/35">{compact(count)} reported followers · {social.length} platform{social.length===1?"":"s"}</p></div><ArrowRight size={15} className={active ? "text-cyan-200" : "text-white/20 group-hover:text-white/60"}/>
                </button>;
              })}
            </div>
            <div className="border-t border-white/10 px-5 py-3 text-[10px] leading-5 text-white/30">Only active, approved creator profiles are shown. Audience figures are creator-submitted unless independently verified.</div>
          </aside>

          {selected && <section className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#060b17]/85 backdrop-blur-xl">
            <div className="relative min-h-48 overflow-hidden border-b border-white/10 bg-gradient-to-br from-cyan-400/[.13] via-blue-500/[.07] to-violet-500/[.16] p-6 sm:p-8"><div className="pointer-events-none absolute -right-8 -top-24 h-72 w-72 rounded-full border border-white/[.07]"/><div className="pointer-events-none absolute right-12 top-8 h-40 w-40 rounded-full border border-cyan-200/[.12]"/><div className="relative flex flex-col gap-5 sm:flex-row sm:items-end"><div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/20 bg-[#0a1020] shadow-2xl">{avatars[selected.id] ? <img src={avatars[selected.id]} alt={selectedName} className="h-full w-full object-cover"/> : <UserRound size={32} className="text-cyan-200"/>}</div><div className="min-w-0 flex-1"><span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-300/[.08] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-200"><ShieldCheck size={11}/> Approved creator</span><h2 className="mt-3 break-words text-3xl font-semibold tracking-tight sm:text-4xl">{selectedName}</h2><p className="mt-2 text-sm text-white/50">{selected.niche || "Creator"}{selected.location ? " · " + selected.location : ""}</p></div><Link href={"/influencers/" + (slugify(selectedName) || selected.id)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-[#050712]/55 px-4 py-2.5 text-xs font-semibold text-white/75 transition hover:border-cyan-300/30 hover:text-white">Full profile <ArrowRight size={13}/></Link></div></div>
            <div className="p-5 sm:p-8">
              <div className="grid gap-3 sm:grid-cols-3"><Metric label="Reported audience" value={compact(followers)} note="Followers across connected platforms"/><Metric label="Social platforms" value={String(selectedSocials.length)} note="Creator-linked accounts"/><Metric label="Primary audience" value={String(selected.primary_audience_country || "Not provided")} note="Creator-submitted audience data"/></div>
              <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[.02] p-5"><h3 className="text-sm font-semibold">Creator overview</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/55">{selected.bio || "This creator has not added a public biography yet."}</p>{selected.languages?.length > 0 && <p className="mt-4 inline-flex items-center gap-2 text-xs text-white/40"><Globe2 size={13}/>{languages.join(", ")}</p>}</div>
                <div className="rounded-2xl border border-white/10 bg-white/[.02] p-5"><h3 className="text-sm font-semibold">Commercial details</h3><div className="mt-4 flex items-center justify-between gap-4 border-b border-white/[.07] pb-3"><span className="text-xs text-white/40">Starting rate</span><span className="text-sm font-semibold text-white/80">{selected.rate_usdt ? Number(selected.rate_usdt).toLocaleString() + " USDT" : "Not provided"}</span></div><div className="mt-3 flex items-center justify-between gap-4"><span className="text-xs text-white/40">Location</span><span className="text-right text-xs text-white/70">{selected.location || "Not provided"}</span></div><p className="mt-4 text-[10px] leading-5 text-white/30">Rates and audience figures should be confirmed by the InfluxBridge team before a campaign is proposed.</p></div>
              </div>
              <div className="mt-6"><div className="flex items-end justify-between gap-3"><div><h3 className="text-sm font-semibold">Social profiles & audience</h3><p className="mt-1 text-xs text-white/35">Links and figures supplied by this creator.</p></div><span className="text-[10px] text-white/35">{selectedSocials.length} connected</span></div>
                {selectedSocials.length ? <div className="mt-4 grid gap-3 sm:grid-cols-2">{selectedSocials.map((social,i)=><a key={String(social.id || social.platform || i)} href={urlFor(String(social.profile_url || social.username || ""))} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.02] p-4 transition hover:border-cyan-300/25 hover:bg-cyan-300/[.03]"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.03]">{String(social.platform || "").toLowerCase().includes("youtube") ? <Youtube size={17} className="text-rose-200"/> : <Instagram size={17} className="text-cyan-200"/>}</div><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-white/80">{String(social.platform || "Social platform").replaceAll("_"," ")}</p><p className="mt-1 truncate text-[10px] text-white/35">{social.username || social.profile_url || "Profile link not provided"}</p><p className="mt-1 text-[10px] text-white/45">{Number(social.followers_count || 0).toLocaleString()} followers</p></div><ExternalLink size={13} className="shrink-0 text-white/35"/></a>)}</div> : <div className="mt-4 rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-white/35">No social profiles have been added yet.</div>}
              </div>
              <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/[.035] p-5 sm:flex-row sm:items-center"><div><p className="text-sm font-semibold">Have a campaign in mind?</p><p className="mt-1 text-xs leading-5 text-white/40">Tell us your audience, goal and timeline. Our team will shortlist suitable creators.</p></div><Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-xs font-bold shadow-[0_8px_30px_rgba(34,211,238,.15)]">Discuss a campaign <ArrowRight size={14}/></Link></div>
            </div>
          </section>}
        </div>}
      </div>
    </main>
  </PageShell>;
}

function Metric({label,value,note}:{label:string;value:string;note:string}) { return <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="text-xs text-white/40">{label}</p><p className="mt-2 break-words text-xl font-bold">{value}</p><p className="mt-2 text-[10px] leading-4 text-white/30">{note}</p></div>; }
