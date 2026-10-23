"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Filter, Search } from "lucide-react";

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
  const [busyId, setBusyId] = useState("");
  const supabase = useMemo(() => createClient(), []);

  const load = useCallback(async () => {
    const { data, error: requestError } = await supabase.from("influencer_profiles")
      .select("id, display_name, location, niche, verification_status, profile_status")
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

  async function review(id: string, verification_status: Influencer["verification_status"]) {
    setBusyId(id);
    const profile_status = verification_status === "APPROVED"
      ? "ACTIVE"
      : verification_status === "REJECTED"
        ? "REJECTED"
        : "SUBMITTED";
    const { error: updateError } = await supabase.from("influencer_profiles")
      .update({ verification_status, profile_status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (updateError) setError(updateError.message);
    else { setError(""); await load(); }
    setBusyId("");
  }

  return <>
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-[9px] uppercase tracking-[0.2em] text-white/30">{title.eyebrow}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{title.heading}</h2><p className="mt-2 text-xs text-white/40">{title.sub}</p></div><div className="text-[10px] text-white/30">{filtered.length} live records</div></div>
    <div className="mt-6 flex flex-col gap-3 lg:flex-row"><div className="relative flex-1"><Search className="absolute left-3.5 top-3 text-white/30" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search creators, niche, or location..." className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-white/25 focus:border-cyan-400/25"/></div><div className="flex gap-2 overflow-x-auto">{filters.map(x=><button key={x} onClick={()=>setFilter(x)} className={`whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-[10px] ${filter===x?"border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300":"border-white/[0.07] bg-white/[0.02] text-white/40"}`}><Filter size={12} className="mr-1.5 inline"/>{x==="All"?"All":x==="PENDING"?"Pending review":x.charAt(0)+x.slice(1).toLowerCase()}</button>)}</div></div>
    {error && <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-3 text-xs text-red-200">Supabase: {error}</p>}
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"><div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left"><thead className="border-b border-white/[0.07] bg-white/[0.015] text-[9px] uppercase tracking-[0.16em] text-white/30"><tr>{["Creator","Niche","Location","Profile","Verification"].map(x=><th key={x} className="px-5 py-3.5 font-medium">{x}</th>)}</tr></thead><tbody className="divide-y divide-white/[0.055]">
      {loading?<tr><td colSpan={5} className="px-5 py-8 text-center text-xs text-white/40">Loading creators from Supabase…</td></tr>:filtered.length===0?<tr><td colSpan={5} className="px-5 py-8 text-center text-xs text-white/40">No creator profiles found.</td></tr>:filtered.map(row=><tr key={row.id} className="transition hover:bg-white/[0.025]"><td className="px-5 py-4 text-xs text-white/80">{row.display_name}</td><td className="px-5 py-4 text-xs text-white/50">{row.niche||"—"}</td><td className="px-5 py-4 text-xs text-white/50">{row.location||"—"}</td><td className="px-5 py-4 text-xs text-white/50">{row.profile_status.replaceAll("_"," ")}</td><td className="px-5 py-4"><select aria-label={`Verification for ${row.display_name}`} disabled={busyId===row.id} value={row.verification_status} onChange={e=>void review(row.id,e.target.value as Influencer["verification_status"])} className="rounded-lg border border-white/10 bg-[#10151d] px-2.5 py-2 text-[10px] text-cyan-200 outline-none"><option value="PENDING">Pending</option><option value="APPROVED">Approved</option><option value="REJECTED">Rejected</option></select></td></tr>)}
    </tbody></table></div></div>
  </>;
}
