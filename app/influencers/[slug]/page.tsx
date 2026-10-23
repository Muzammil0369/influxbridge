"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, ArrowRight, ExternalLink, LoaderCircle, MapPin, UserRound, Users, Globe2, ShieldCheck } from "lucide-react";

type Row = Record<string, any>;
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const compact = (value: unknown) => { const n = Number(value || 0); return n >= 1_000_000 ? (n/1_000_000).toFixed(n%1_000_000 ? 1 : 0)+"M" : n >= 1000 ? (n/1000).toFixed(n%1000 ? 1 : 0)+"K" : String(n); };
const urlFor = (value: string) => /^https?:\/\//i.test(value) ? value : "https://" + value;

export default function InfluencerProfilePage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const supabase = createClient();
  const [creator, setCreator] = useState<Row | null>(null);
  const [account, setAccount] = useState<Row | null>(null);
  const [socials, setSocials] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    const { data: auth } = await supabase.auth.getUser();
    setSignedIn(Boolean(auth.user));
    if (!auth.user) { setLoading(false); return; }
    const { data, error: queryError } = await supabase.from("influencer_profiles").select("*").eq("profile_status", "ACTIVE");
    if (queryError) { setError(queryError.message); setLoading(false); return; }
    const match = (data || []).find((row: Row) => row.id === slug || slugify(String(row.display_name || "")) === slug);
    if (!match) { setCreator(null); setLoading(false); return; }
    setCreator(match);
    const [p, s] = await Promise.all([
      supabase.from("profiles").select("id,avatar_url,full_name").eq("id", match.id).maybeSingle(),
      supabase.from("social_accounts").select("*").eq("influencer_id", match.id),
    ]);
    setAccount(p.data || null); setSocials(s.data || []);
    if (s.error) setError(s.error.message);
    setLoading(false);
  }, [slug, supabase]);

  useEffect(() => {
    void load();
    const channel = supabase.channel("creator-profile-" + slug)
      .on("postgres_changes", { event: "*", schema: "public", table: "influencer_profiles" }, () => void load())
      .on("postgres_changes", { event: "*", schema: "public", table: "social_accounts" }, () => void load())
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [load, supabase, slug]);

  const name = String(creator?.display_name || account?.full_name || "Creator");
  const languages = useMemo(() => Array.isArray(creator?.languages) ? creator.languages.filter(Boolean) : [], [creator]);
  const followers = creator?.followers_count ?? socials.reduce((sum, item) => sum + Number(item.followers_count || 0), 0);

  if (loading) return <main className="grid min-h-screen place-items-center bg-[#050712] text-white"><div className="flex items-center gap-3 text-sm text-white/50"><LoaderCircle className="animate-spin text-cyan-300" size={20}/> Loading creator profile…</div></main>;
  if (!signedIn) return <main className="grid min-h-screen place-items-center bg-[#050712] px-6 text-white"><div className="max-w-md rounded-3xl border border-white/10 bg-white/[.04] p-8 text-center"><ShieldCheck className="mx-auto text-cyan-300" size={30}/><h1 className="mt-4 text-xl font-bold">Sign in to view creator profiles</h1><p className="mt-2 text-sm leading-6 text-white/45">Approved creator information is available to authenticated InfluxBridge workspace users.</p><Link href="/login" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-black">Sign in</Link></div></main>;
  if (!creator) return <main className="grid min-h-screen place-items-center bg-[#050712] px-6 text-white"><div className="max-w-lg rounded-3xl border border-white/10 bg-white/[.04] p-8 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10"><Users className="text-white/50"/></div><h1 className="mt-5 text-2xl font-bold">Creator profile unavailable</h1><p className="mt-3 text-sm leading-6 text-white/45">This creator may not be approved yet, or the profile link may have changed. Only active creator profiles are shown here.</p><Link href="/influencers" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black"><ArrowLeft size={15}/> Back to network</Link></div></main>;

  const portfolio = String(creator.portfolio_url || "");
  const sample = String(creator.sample_video_url || "");
  return <main className="min-h-screen bg-[#050712] text-white">
    <div className="pointer-events-none fixed inset-0 -z-10"><div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/[.08] blur-[120px]"/><div className="absolute -right-32 top-1/3 h-[32rem] w-[32rem] rounded-full bg-violet-600/[.08] blur-[150px]"/></div>
    <section className="px-5 pb-16 pt-28 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl">
      <Link href="/influencers" className="inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-white"><ArrowLeft size={14}/> Back to Creator Network</Link>
      {error && <p role="status" className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/[.05] p-3 text-xs text-amber-100/70">Some profile details could not load: {error}</p>}
      <section className="relative mt-7 overflow-hidden rounded-[32px] border border-white/10 bg-white/[.025]">
        <div className="h-48 bg-gradient-to-br from-cyan-400/[.15] via-blue-500/[.08] to-violet-500/[.15] sm:h-60"><div className="h-full w-full bg-[radial-gradient(circle_at_75%_20%,rgba(103,232,249,.12),transparent_30%)]"/></div>
        <div className="px-6 pb-7 sm:px-9 sm:pb-9"><div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between"><div className="flex items-end gap-4"><div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-3xl border-4 border-[#080b16] bg-[#0a1020] sm:h-28 sm:w-28">{account?.avatar_url ? <img src={account.avatar_url} alt={name} className="h-full w-full object-cover"/> : <UserRound size={34} className="text-cyan-200"/>}</div><div className="pb-1"><span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-300/[.08] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-200"><ShieldCheck size={11}/> InfluxBridge approved</span><h1 className="mt-2 text-2xl font-bold sm:text-3xl">{name}</h1><p className="mt-1 text-sm text-white/45">{creator.niche || "Creator"}</p></div></div><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#050712] transition hover:bg-cyan-50">Discuss a collaboration <ArrowRight size={14}/></Link></div>
          <div className="mt-7 flex flex-wrap gap-4 text-xs text-white/45">{creator.location && <span className="inline-flex items-center gap-1.5"><MapPin size={14}/>{creator.location}</span>}{languages.length > 0 && <span className="inline-flex items-center gap-1.5"><Globe2 size={14}/>{languages.join(", ")}</span>}</div>
          <p className="mt-7 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-white/60">{creator.bio || "This creator has not added a biography yet."}</p>
        </div>
      </section>
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><Metric label="Reported audience" value={compact(followers)} note="Creator-submitted follower count"/><Metric label="Social platforms" value={String(socials.length)} note="Links supplied by the creator"/><Metric label="Primary audience" value={String(creator.primary_audience_country || "Not provided")} note="Creator-submitted information"/></section>
      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[.025] p-6 sm:p-7"><h2 className="text-lg font-bold">Social profiles</h2><p className="mt-1 text-xs text-white/35">External profile links supplied during onboarding.</p>{socials.length ? <div className="mt-5 space-y-3">{socials.map((social,i)=><a key={String(social.id || social.platform || i)} href={urlFor(String(social.profile_url || social.username || ""))} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-cyan-300/20"><div><p className="text-sm font-semibold">{String(social.platform || "Social").replaceAll("_"," ")}</p><p className="mt-1 break-all text-xs text-white/40">{social.username || social.profile_url}</p></div><ExternalLink size={15} className="shrink-0 text-cyan-200"/></a>)}</div> : <Empty text="No social profiles have been added."/>}</div>
        <div className="rounded-3xl border border-white/10 bg-white/[.025] p-6 sm:p-7"><h2 className="text-lg font-bold">Portfolio & samples</h2><p className="mt-1 text-xs text-white/35">Creator-provided work links. No sample work is invented.</p><div className="mt-5 space-y-3">{portfolio ? <ExternalLinkCard label="Portfolio" value={portfolio}/> : null}{sample ? <ExternalLinkCard label="Sample video" value={sample}/> : null}{!portfolio && !sample && <Empty text="This creator has not added portfolio links yet."/>}</div><div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-4"><p className="text-xs font-semibold text-white/70">Commercial information</p><p className="mt-2 text-xs leading-5 text-white/40">{creator.rate_usdt ? "Creator-reported starting rate: " + Number(creator.rate_usdt).toLocaleString() + " USDT" : "A rate has not been provided."} Final pricing and availability should be confirmed directly with InfluxBridge.</p></div></div>
      </section>
      <p className="mt-6 text-center text-[10px] text-white/25">Audience and rate information is creator-submitted and is not independently verified unless explicitly marked otherwise.</p>
    </div></section>
  </main>;
}

function Metric({label,value,note}:{label:string;value:string;note:string}) { return <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><p className="text-xs text-white/40">{label}</p><p className="mt-3 break-words text-2xl font-bold">{value}</p><p className="mt-2 text-[10px] text-white/30">{note}</p></div>; }
function Empty({text}:{text:string}) { return <div className="rounded-xl border border-dashed border-white/10 px-4 py-7 text-center text-xs text-white/35">{text}</div>; }
function ExternalLinkCard({label,value}:{label:string;value:string}) { return <a href={urlFor(value)} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/10 p-4 hover:border-cyan-300/20"><div><p className="text-sm font-semibold">{label}</p><p className="mt-1 break-all text-xs text-white/40">{value}</p></div><ExternalLink size={15} className="shrink-0 text-cyan-200"/></a>; }
