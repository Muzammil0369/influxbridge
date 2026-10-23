"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Filter, Search, UserRound, ExternalLink, X, CheckCircle2, XCircle, LoaderCircle } from "lucide-react";

type Influencer = {
  id: string;
  display_name: string;
  location: string | null;
  niche: string | null;
  verification_status: "PENDING" | "APPROVED" | "REJECTED";
  profile_status: string;
};

const title = { eyebrow: "Creator Operations", heading: "Influencers", sub: "Review creator applications and manage verification using live profile records." };
const filters = ["All", "PENDING", "APPROVED", "REJECTED"];

export default function AdminInfluencersPage() {
  const [rows, setRows] = useState<Influencer[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");\n  const [selected, setSelected] = useState<Influencer | null>(null);\n  const [socials, setSocials] = useState<Social[]>([]);\n  const [account, setAccount] = useState<Account | null>(null);\n  const [detailLoading, setDetailLoading] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  const load = useCallback(async () => {
    const { data, error: requestError } = await supabase.from("influencer_profiles")
      .select("id, display_name, location, niche, bio, languages, followers_count, rate_usdt, primary_audience_country, portfolio_url, sample_video_url, verification_status, profile_status, created_at, updated_at")
      .order("created_at", { ascending: false });
    if (requestError) { setError(requestError.message); setLoading(false); return; }
    setRows((data ?? []) as Influencer[]);
    setError("");
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
    const channel = supabase.channel("admin-influencers-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "influencer_profiles" }, () => void load())
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [load, supabase]);

  const filtered = rows.filter(row =>
    `${row.display_name} ${row.location ?? ""} ${row.niche ?? ""} ${row.verification_status}`.toLowerCase().includes(query.toLowerCase()) &&
    (filter === "All" || row.verification_status === filter)
  );

  async function openDetails(row: Influencer) {
    setSelected(row); setSocials([]); setAccount(null); setDetailLoading(true);
    const [s, p] = await Promise.all([
      supabase.from("social_accounts").select("id,platform,username,profile_url").eq("influencer_id", row.id),
      supabase.from("profiles").select("full_name,avatar_url").eq("id", row.id).maybeSingle(),
    ]);
    if (s.error || p.error) setError([s.error?.message,p.error?.message].filter(Boolean).join(" · "));
    setSocials((s.data ?? []) as Social[]); setAccount((p.data ?? null) as Account | null); setDetailLoading(false);
  }

  async function review(id: string, verification_status: Influencer["verification_status"]) {
    setBusyId(id);
    const profile_status = verification_status === "APPROVED"
      ? "ACTIVE"
      : verification_status === "REJECTED"
        ? "REJECTED"
        : "SUBMITTED";
    const { data: updated, error: updateError } = await supabase.from("influencer_profiles")
      .update({ verification_status, profile_status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("id")
      .maybeSingle();
    if (updateError) setError(updateError.message);
    else if (!updated) setError("Supabase did not update this creator. Check that your admin account has permission to review influencer profiles.");
    else { setError(""); await load(); setSelected(current => current?.id === id ? { ...current, verification_status, profile_status } : current); }
    setBusyId("");
  }

  return <>
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-[9px] uppercase tracking-[0.2em] text-white/30">{title.eyebrow}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{title.heading}</h2><p className="mt-2 text-xs text-white/40">{title.sub}</p></div><div className="text-[10px] text-white/30">{filtered.length} live records</div></div>
    <div className="mt-6 flex flex-col gap-3 lg:flex-row"><div className="relative flex-1"><Search className="absolute left-3.5 top-3 text-white/30" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search creators, niche, or location..." className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-white/25 focus:border-cyan-400/25"/></div><div className="flex gap-2 overflow-x-auto">{filters.map(x=><button key={x} onClick={()=>setFilter(x)} className={`whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-[10px] ${filter===x?"border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300":"border-white/[0.07] bg-white/[0.02] text-white/40"}`}><Filter size={12} className="mr-1.5 inline"/>{x==="All"?"All":x==="PENDING"?"Pending review":x.charAt(0)+x.slice(1).toLowerCase()}</button>)}</div></div>
    {error && <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-3 text-xs text-red-200">Supabase: {error}</p>}
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"><div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left"><thead className="border-b border-white/[0.07] bg-white/[0.015] text-[9px] uppercase tracking-[0.16em] text-white/30"><tr>{["Creator","Niche","Location","Profile","Verification",""].map(x=><th key={x} className="px-5 py-3.5 font-medium">{x}</th>)}</tr></thead><tbody className="divide-y divide-white/[0.055]">
      {loading?<tr><td colSpan={6} className="px-5 py-8 text-center text-xs text-white/40">Loading creators from Supabase…</td></tr>:filtered.length===0?<tr><td colSpan={6} className="px-5 py-8 text-center text-xs text-white/40">No creator profiles found.</td></tr>:filtered.map(row=><tr key={row.id} className="transition hover:bg-white/[0.025]"><td className="px-5 py-4 text-xs text-white/80">{row.display_name}</td><td className="px-5 py-4 text-xs text-white/50">{row.niche||"—"}</td><td className="px-5 py-4 text-xs text-white/50">{row.location||"—"}</td><td className="px-5 py-4 text-xs text-white/50">{row.profile_status.replaceAll("_"," ")}</td><td className="px-5 py-4"><select aria-label={`Verification for ${row.display_name}`} disabled={busyId===row.id} value={row.verification_status} onChange={e=>void review(row.id,e.target.value as Influencer["verification_status"])} className="rounded-lg border border-white/10 bg-[#10151d] px-2.5 py-2 text-[10px] text-cyan-200 outline-none"><option value="PENDING">Pending</option><option value="APPROVED">Approved</option><option value="REJECTED">Rejected</option></select></td><td className="px-5 py-4"><button onClick={() => void openDetails(row)} className="rounded-lg border border-cyan-300/15 bg-cyan-300/[.06] px-3 py-2 text-[10px] font-semibold text-cyan-200 hover:bg-cyan-300/[.12]">Full profile <ExternalLink size={12} className="ml-1 inline"/></button></td></tr>)}
    </tbody></table></div></div>
    {selected && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label="Creator profile details">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#090d19] shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#090d19]/95 px-5 py-4"><div><p className="text-[9px] uppercase tracking-[.2em] text-cyan-300">Creator review</p><h3 className="mt-1 text-lg font-bold">{selected.display_name || account?.full_name || "Creator profile"}</h3></div><button onClick={() => setSelected(null)} aria-label="Close profile details" className="rounded-xl border border-white/10 p-2 text-white/60"><X size={17}/></button></div>
        <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[.7fr_1.3fr]">
          <div className="space-y-4"><div className="flex items-center gap-4 rounded-2xl border border-white/10 p-4"><div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white/5">{account?.avatar_url ? <img src={account.avatar_url} alt="" className="h-full w-full object-cover"/> : <UserRound size={25} className="text-cyan-200"/>}</div><div><p className="text-sm font-semibold">{selected.display_name || account?.full_name || "Unnamed creator"}</p><p className="mt-1 text-xs text-white/40">{selected.niche || "Niche not provided"}</p><p className="mt-2 text-[10px] text-white/35">{selected.profile_status} · {selected.verification_status}</p></div></div>
          <div className="rounded-2xl border border-white/10 p-4"><p className="text-[10px] uppercase tracking-wider text-white/35">Audience & rate</p><p className="mt-3 text-xl font-bold">{Number(selected.followers_count || 0).toLocaleString()} <span className="text-xs font-normal text-white/40">reported followers</span></p><p className="mt-2 text-sm text-white/60">Rate: {selected.rate_usdt ? Number(selected.rate_usdt).toLocaleString()+" USDT" : "Not provided"}</p><p className="mt-2 text-xs text-white/50">Primary audience: {selected.primary_audience_country || "Not provided"}</p></div>
          <div className="rounded-2xl border border-white/10 p-4"><p className="text-[10px] uppercase tracking-wider text-white/35">Profile details</p><p className="mt-3 text-xs text-white/60">Location: {selected.location || "Not provided"}</p><p className="mt-2 text-xs text-white/60">Languages: {selected.languages?.length ? selected.languages.join(", ") : "Not provided"}</p><p className="mt-2 text-xs text-white/60">Applied: {selected.created_at ? new Date(selected.created_at).toLocaleDateString() : "Not available"}</p></div></div>
          <div className="space-y-4"><section className="rounded-2xl border border-white/10 p-4 sm:p-5"><h4 className="text-sm font-semibold">Biography</h4><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/60">{selected.bio || "The creator has not added a biography."}</p></section>
          <section className="rounded-2xl border border-white/10 p-4 sm:p-5"><h4 className="text-sm font-semibold">Social accounts</h4>{detailLoading ? <p className="mt-3 flex items-center gap-2 text-xs text-white/40"><LoaderCircle size={14} className="animate-spin"/>Loading social links…</p> : socials.length ? <div className="mt-3 space-y-2">{socials.map((s,i)=><a key={String(s.id || s.platform || i)} href={s.profile_url || undefined} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3 py-3"><div><p className="text-xs font-semibold">{s.platform || "Social account"}</p><p className="mt-1 break-all text-xs text-white/40">{s.username || s.profile_url || "Link not provided"}</p></div><ExternalLink size={13} className="text-cyan-200"/></a>)}</div> : <p className="mt-3 text-xs text-white/40">No social links were saved.</p>}</section>
          <section className="rounded-2xl border border-white/10 p-4 sm:p-5"><h4 className="text-sm font-semibold">Portfolio & sample</h4><div className="mt-3 flex flex-wrap gap-2">{selected.portfolio_url && <a href={selected.portfolio_url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 px-3 py-2 text-xs text-cyan-200">Open portfolio <ExternalLink size={12} className="ml-1 inline"/></a>}{selected.sample_video_url && <a href={selected.sample_video_url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 px-3 py-2 text-xs text-cyan-200">Open sample video <ExternalLink size={12} className="ml-1 inline"/></a>}{!selected.portfolio_url && !selected.sample_video_url && <p className="text-xs text-white/40">No portfolio links supplied.</p>}</div></section></div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:justify-end"><button disabled={busyId===selected.id} onClick={() => void review(selected.id,"REJECTED")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-300/20 px-4 py-3 text-xs font-semibold text-rose-200 disabled:opacity-50"><XCircle size={14}/> Reject</button><button disabled={busyId===selected.id} onClick={() => void review(selected.id,"APPROVED")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-4 py-3 text-xs font-bold text-[#050712] disabled:opacity-50">{busyId===selected.id ? <LoaderCircle size={14} className="animate-spin"/> : <CheckCircle2 size={14}/>} Approve creator</button></div>
      </div>
    </div>}

  </>;
}
