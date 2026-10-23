"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Search, Users, RefreshCw, LoaderCircle, MapPin, UserRound, ShieldCheck } from "lucide-react";

type Row = Record<string, any>;
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const compact = (value: unknown) => { const n = Number(value || 0); return n >= 1_000_000 ? (n/1_000_000).toFixed(n%1_000_000 ? 1 : 0)+"M" : n >= 1000 ? (n/1000).toFixed(n%1000 ? 1 : 0)+"K" : String(n); };

export default function InfluencersPage() {
  const supabase = createClient();
  const [creators, setCreators] = useState<Row[]>([]);
  const [accounts, setAccounts] = useState<Row[]>([]);
  const [avatars, setAvatars] = useState<Record<string,string>>({});
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (quiet = false) => {
    if (quiet) setRefreshing(true); else setLoading(true);
    setError("");
    const { data: auth } = await supabase.auth.getUser();
    setSignedIn(Boolean(auth.user));
    if (!auth.user) {
      setCreators([]); setAccounts([]); setAvatars({});
      setLoading(false); setRefreshing(false); return;
    }
    const { data, error: queryError } = await supabase.from("influencer_profiles").select("*").eq("profile_status", "ACTIVE").order("display_name", { ascending: true });
    if (queryError) {
      setError(queryError.message); setCreators([]); setAccounts([]);
      setLoading(false); setRefreshing(false); return;
    }
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

  return <main className="min-h-screen bg-[#050712] text-white">
    <div className="pointer-events-none fixed inset-0 -z-10"><div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/[.08] blur-[120px]"/><div className="absolute -right-32 top-1/3 h-[32rem] w-[32rem] rounded-full bg-violet-600/[.08] blur-[150px]"/></div>
    <section className="px-5 pb-16 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-9 sm:flex-row sm:items-end sm:justify-between">
          <div><div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-200"><Users size={13}/> InfluxBridge Creator Network</div><h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Meet the creators moving markets.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">Browse creator profiles approved by the InfluxBridge team. Audience details and social links come from creator-submitted platform data.</p></div>
          <button onClick={() => void load(true)} disabled={refreshing} className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-xs font-semibold text-white/65 hover:text-white sm:self-auto"><RefreshCw size={14} className={refreshing ? "animate-spin" : ""}/> Refresh profiles</button>
        </div>

        {!signedIn && !loading && <div className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/[.05] p-6 sm:p-8"><div className="flex gap-4"><ShieldCheck className="mt-1 shrink-0 text-cyan-300" size={24}/><div><h2 className="text-lg font-semibold">Sign in to browse approved creators</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">Creator profiles are available to authenticated workspace users. Sign in with your company account to view the live network.</p><Link href="/login" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#050712]">Sign in to continue <ArrowRight size={14}/></Link></div></div></div>}

        {signedIn && <><div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]"><label className="relative block"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search creators, niches, platforms…" className="h-12 w-full rounded-xl border border-white/10 bg-white/[.035] pl-11 pr-4 text-sm outline-none placeholder:text-white/25 focus:border-cyan-300/40"/></label><select value={niche} onChange={(e) => setNiche(e.target.value)} className="h-12 rounded-xl border border-white/10 bg-[#0a0e1a] px-4 text-sm text-white/75 outline-none">{categories.map((item) => <option key={item} value={item}>{item === "All" ? "All niches" : item}</option>)}</select></div>
          <div className="mt-5 flex items-center justify-between text-xs text-white/35"><span>{filtered.length} approved creator{filtered.length === 1 ? "" : "s"}</span><span>Live Supabase data</span></div>
        </>}

        {loading && <div className="grid min-h-64 place-items-center"><div className="flex items-center gap-3 text-sm text-white/50"><LoaderCircle className="animate-spin text-cyan-300" size={20}/> Loading approved creator profiles…</div></div>}
        {error && <div role="alert" className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/[.05] p-4 text-sm text-rose-100/80">Could not load the creator network: {error}</div>}
        {signedIn && !loading && !error && filtered.length === 0 && <div className="mt-8 rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[.04]"><Users className="text-white/45"/></div><h2 className="mt-5 text-xl font-semibold">{creators.length ? "No creators match your search" : "No approved creators yet"}</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/40">{creators.length ? "Try a different name or niche filter." : "Once the InfluxBridge team approves creator applications, those real profiles will appear here automatically."}</p></div>}
        {signedIn && !loading && filtered.length > 0 && <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((creator) => {
          const social = accounts.filter((a) => a.influencer_id === creator.id);
          const first = social[0];
          const name = String(creator.display_name || "Creator");
          const slug = slugify(name) || creator.id;
          const followers = creator.followers_count ?? social.reduce((sum, a) => sum + Number(a.followers_count || 0), 0);
          return <article key={creator.id} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[.025] transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[.04]"><div className="relative h-36 overflow-hidden border-b border-white/10 bg-gradient-to-br from-cyan-400/[.12] via-blue-500/[.06] to-violet-500/[.12]"><div className="absolute -right-5 -top-16 h-40 w-40 rounded-full border border-white/10"/><div className="absolute right-8 top-7 h-24 w-24 rounded-full border border-cyan-200/15"/><div className="absolute bottom-4 left-5 flex items-end gap-3"><div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-[#0a1020] shadow-xl">{avatars[creator.id] ? <img src={avatars[creator.id]} alt={name} className="h-full w-full object-cover"/> : <UserRound size={24} className="text-cyan-200"/>}</div><div className="pb-1"><span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-300/[.08] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-200">Approved</span><h2 className="mt-2 text-lg font-semibold">{name}</h2></div></div></div><div className="p-5"><div className="flex flex-wrap items-center gap-2 text-[11px] text-white/40"><span className="rounded-lg border border-white/10 px-2 py-1">{creator.niche || "Creator"}</span>{creator.location && <span className="inline-flex items-center gap-1"><MapPin size={12}/>{creator.location}</span>}</div><p className="mt-4 line-clamp-3 min-h-[60px] text-sm leading-5 text-white/50">{creator.bio || "This creator has not added a public bio yet."}</p><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/10 bg-black/10 p-3"><p className="text-[10px] text-white/35">Reported audience</p><p className="mt-1 text-lg font-bold">{compact(followers)}</p></div><div className="rounded-xl border border-white/10 bg-black/10 p-3"><p className="text-[10px] text-white/35">Social platforms</p><p className="mt-1 text-lg font-bold">{social.length}</p></div></div><div className="mt-4 flex flex-wrap gap-2">{social.slice(0,3).map((a,i)=><span key={String(a.id || a.platform || i)} className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] text-white/55">{String(a.platform || "Social").replaceAll("_"," ")}</span>)}</div><Link href={"/influencers/" + slug} className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 text-xs font-semibold text-white/70 transition group-hover:border-cyan-300/20 group-hover:text-white">View creator profile <ArrowRight size={14}/></Link></div></article>;
        })}</div>}
      </div>
    </section>
  </main>;
}
