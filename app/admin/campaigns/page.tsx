"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Filter, Search, Users, X, UserRound, LoaderCircle, UserPlus, UserMinus, RefreshCw } from "lucide-react";

type Campaign = {
  id: string;
  name: string;
  status: "ACTIVE" | "IN_REVIEW" | "COMPLETED";
  phase: string;
  budget: number | null;
  currency: string;
  deadline: string | null;
  company: { name: string } | null;
};
type Creator = {
  id: string;
  display_name: string;
  location: string | null;
  niche: string | null;
  verification_status: string;
  profile_status: string;
  followers_count?: number | null;
  rate_usdt?: number | null;
};
type Assignment = { id: string; influencer_id: string; status: string; assigned_at: string };
type Profile = { id: string; full_name: string | null; avatar_url: string | null };

const title = { eyebrow: "Campaign Operations", heading: "Campaigns", sub: "Monitor campaign delivery and assign verified creators from your live database." };
const filters = ["All", "ACTIVE", "IN_REVIEW", "COMPLETED"];

export default function AdminCampaignsPage() {
  const [rows, setRows] = useState<Campaign[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busyId, setBusyId] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [creatorQuery, setCreatorQuery] = useState("");
  const [creatorLoading, setCreatorLoading] = useState(false);
  const [assignmentBusyId, setAssignmentBusyId] = useState("");
  const supabase = useMemo(() => createClient(), []);

  const load = useCallback(async () => {
    const { data, error: requestError } = await supabase
      .from("campaigns")
      .select("id, name, status, phase, budget, currency, deadline, company:companies(name)")
      .order("created_at", { ascending: false });
    if (requestError) { setError(requestError.message); setLoading(false); return; }
    setRows((data ?? []) as unknown as Campaign[]);
    setError("");
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
    const channel = supabase.channel("admin-campaigns-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "campaigns" }, () => void load())
      .on("postgres_changes", { event: "*", schema: "public", table: "campaign_creators" }, () => {
        if (selectedCampaign) void loadAssignments(selectedCampaign.id);
      })
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [load, supabase, selectedCampaign]);

  const filtered = rows.filter((row) =>
    `${row.name} ${row.company?.name ?? ""} ${row.phase} ${row.status}`.toLowerCase().includes(query.toLowerCase()) &&
    (filter === "All" || row.status === filter)
  );

  async function updateStatus(id: string, status: Campaign["status"]) {
    setBusyId(id);
    setError(""); setNotice("");
    const { error: updateError } = await supabase.from("campaigns")
      .update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (updateError) setError(updateError.message);
    else { setNotice("Campaign status updated."); await load(); }
    setBusyId("");
  }

  async function loadAssignments(campaignId: string) {
    const { data, error: assignmentError } = await supabase.from("campaign_creators")
      .select("id, influencer_id, status, assigned_at")
      .eq("campaign_id", campaignId)
      .order("assigned_at", { ascending: false });
    if (assignmentError) { setError(assignmentError.message); return; }
    const next = (data ?? []) as Assignment[];
    setAssignments(next);
    const ids = [...new Set(next.map((item) => item.influencer_id))];
    if (ids.length) {
      const { data: creatorData, error: creatorError } = await supabase.from("influencer_profiles")
        .select("id, display_name, location, niche, verification_status, profile_status, followers_count, rate_usdt")
        .in("id", ids);
      if (creatorError) setError(creatorError.message);
      else setCreators((current) => {
        const byId = new Map(current.map((item) => [item.id, item]));
        for (const item of (creatorData ?? []) as Creator[]) byId.set(item.id, item);
        return [...byId.values()];
      });
    }
  }

  async function openCreatorManager(campaign: Campaign) {
    setSelectedCampaign(campaign);
    setCreatorQuery("");
    setNotice(""); setError("");
    setCreatorLoading(true);
    const [creatorResult, assignmentResult] = await Promise.all([
      supabase.from("influencer_profiles")
        .select("id, display_name, location, niche, verification_status, profile_status, followers_count, rate_usdt")
        .eq("verification_status", "APPROVED")
        .order("display_name", { ascending: true }),
      supabase.from("campaign_creators").select("id, influencer_id, status, assigned_at")
        .eq("campaign_id", campaign.id).order("assigned_at", { ascending: false }),
    ]);
    if (creatorResult.error || assignmentResult.error) {
      setError([creatorResult.error?.message, assignmentResult.error?.message].filter(Boolean).join(" · "));
    }
    const approved = (creatorResult.data ?? []) as Creator[];
    const currentAssignments = (assignmentResult.data ?? []) as Assignment[];
    setCreators(approved);
    setAssignments(currentAssignments);
    const allIds = [...new Set([...approved.map((item) => item.id), ...currentAssignments.map((item) => item.influencer_id)])];
    if (allIds.length) {
      const { data: profileData, error: profileError } = await supabase.from("profiles")
        .select("id, full_name, avatar_url").in("id", allIds);
      if (profileError) setError(profileError.message);
      const map: Record<string, Profile> = {};
      for (const profile of (profileData ?? []) as Profile[]) map[profile.id] = profile;
      setProfiles(map);
    } else setProfiles({});
    setCreatorLoading(false);
  }

  async function assignCreator(creator: Creator) {
    if (!selectedCampaign) return;
    setAssignmentBusyId(creator.id); setError(""); setNotice("");
    const existing = assignments.find((item) => item.influencer_id === creator.id);
    if (existing) {
      if (existing.status === "REMOVED" || existing.status === "DECLINED") {
        const { error: updateError } = await supabase.from("campaign_creators")
          .update({ status: "INVITED" }).eq("id", existing.id);
        if (updateError) setError(updateError.message);
        else { setNotice(`Invitation renewed for ${creator.display_name}.`); await loadAssignments(selectedCampaign.id); }
      }
    } else {
      const { error: insertError } = await supabase.from("campaign_creators")
        .insert({ campaign_id: selectedCampaign.id, influencer_id: creator.id, status: "INVITED" });
      if (insertError) setError(insertError.code === "23505" ? "This creator is already linked to this campaign. Refresh the assignments and try again." : insertError.message);
      else {
        setNotice(`Invitation created for ${creator.display_name}.`);
        await loadAssignments(selectedCampaign.id);
        setAssignments((current) => current.some((item) => item.influencer_id === creator.id) ? current : current);
      }
    }
    setAssignmentBusyId("");
  }

  async function removeCreator(assignment: Assignment) {
    if (!selectedCampaign) return;
    setAssignmentBusyId(assignment.influencer_id); setError(""); setNotice("");
    const { error: updateError } = await supabase.from("campaign_creators")
      .update({ status: "REMOVED" }).eq("id", assignment.id);
    if (updateError) setError(updateError.message);
    else { setNotice("Creator removed from active campaign assignments. Assignment history was preserved."); await loadAssignments(selectedCampaign.id); }
    setAssignmentBusyId("");
  }

  const visibleCreators = creators.filter((creator) => {
    const searchText = `${creator.display_name} ${creator.niche ?? ""} ${creator.location ?? ""} ${profiles[creator.id]?.full_name ?? ""}`.toLowerCase();
    return searchText.includes(creatorQuery.toLowerCase());
  });

  return <>
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div><p className="text-[9px] uppercase tracking-[0.2em] text-white/30">{title.eyebrow}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{title.heading}</h2><p className="mt-2 text-xs text-white/40">{title.sub}</p></div>
      <div className="text-[10px] text-white/30">{filtered.length} live records</div>
    </div>
    <div className="mt-6 flex flex-col gap-3 lg:flex-row">
      <div className="relative flex-1"><Search className="absolute left-3.5 top-3 text-white/30" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search campaigns or companies..." className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-white/25 focus:border-cyan-400/25"/></div>
      <div className="flex gap-2 overflow-x-auto">{filters.map(x=><button key={x} onClick={()=>setFilter(x)} className={`whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-[10px] ${filter===x?"border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300":"border-white/[0.07] bg-white/[0.02] text-white/40"}`}><Filter size={12} className="mr-1.5 inline"/>{x==="IN_REVIEW"?"In review":x==="ACTIVE"?"Active":x==="COMPLETED"?"Completed":x}</button>)}</div>
    </div>
    {error && <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-3 text-xs text-red-200">Supabase: {error}</p>}
    {notice && <p role="status" className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-3 text-xs text-emerald-200">{notice}</p>}
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"><div className="overflow-x-auto"><table className="w-full min-w-[920px] text-left">
      <thead className="border-b border-white/[0.07] bg-white/[0.015] text-[9px] uppercase tracking-[0.16em] text-white/30"><tr>{["Campaign","Company","Budget","Phase","Deadline","Status","Creator team"].map(x=><th key={x} className="px-5 py-3.5 font-medium">{x}</th>)}</tr></thead>
      <tbody className="divide-y divide-white/[0.055]">
        {loading ? <tr><td colSpan={7} className="px-5 py-8 text-center text-xs text-white/40">Loading campaigns from Supabase…</td></tr> : filtered.length===0 ? <tr><td colSpan={7} className="px-5 py-8 text-center text-xs text-white/40">No campaigns found.</td></tr> : filtered.map(row=><tr key={row.id} className="transition hover:bg-white/[0.025]">
          <td className="px-5 py-4 text-xs text-white/80">{row.name}</td><td className="px-5 py-4 text-xs text-white/50">{row.company?.name ?? "—"}</td><td className="px-5 py-4 text-xs text-white/50">{row.budget==null?"—":new Intl.NumberFormat("en-US",{style:"currency",currency:row.currency||"USD",maximumFractionDigits:0}).format(row.budget)}</td><td className="px-5 py-4 text-xs text-white/50">{row.phase.replaceAll("_"," ")}</td><td className="px-5 py-4 text-xs text-white/50">{row.deadline||"—"}</td>
          <td className="px-5 py-4"><select aria-label={`Status for ${row.name}`} disabled={busyId===row.id} value={row.status} onChange={e=>void updateStatus(row.id,e.target.value as Campaign["status"])} className="rounded-lg border border-white/10 bg-[#10151d] px-2.5 py-2 text-[10px] text-cyan-200 outline-none"><option value="ACTIVE">Active</option><option value="IN_REVIEW">In review</option><option value="COMPLETED">Completed</option></select></td>
          <td className="px-5 py-4"><button onClick={() => void openCreatorManager(row)} className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-cyan-300/20 bg-cyan-300/[.06] px-3 py-2.5 text-[10px] font-semibold text-cyan-200 hover:bg-cyan-300/[.12]"><Users size={13}/> Manage creators</button></td>
        </tr>)}
      </tbody>
    </table></div></div>
    {selectedCampaign && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label="Manage campaign creators">
      <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#090d19] shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7"><div><p className="text-[9px] uppercase tracking-[.2em] text-cyan-300">Campaign team</p><h3 className="mt-1 text-lg font-bold">{selectedCampaign.name}</h3><p className="mt-1 text-xs text-white/40">Invite approved creators and manage existing assignments.</p></div><button onClick={() => setSelectedCampaign(null)} aria-label="Close creator manager" className="rounded-xl border border-white/10 p-2 text-white/60 hover:text-white"><X size={17}/></button></div>
        <div className="grid min-h-0 flex-1 gap-0 overflow-y-auto lg:grid-cols-[1.05fr_.95fr]">
          <section className="border-b border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r"><div className="flex items-center justify-between gap-3"><div><h4 className="text-sm font-semibold">Approved creators</h4><p className="mt-1 text-xs text-white/40">Only verified creator profiles can be invited.</p></div><span className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] text-white/50">{visibleCreators.length} found</span></div>
            <div className="relative mt-4"><Search size={15} className="absolute left-3 top-3 text-white/30"/><input value={creatorQuery} onChange={e=>setCreatorQuery(e.target.value)} placeholder="Search name, niche, location..." className="w-full rounded-xl border border-white/10 bg-white/[.025] py-2.5 pl-9 pr-3 text-xs text-white outline-none placeholder:text-white/25 focus:border-cyan-300/30"/></div>
            {creatorLoading ? <div className="flex items-center justify-center gap-2 py-12 text-xs text-white/40"><LoaderCircle size={15} className="animate-spin"/>Loading verified creators…</div> : visibleCreators.length===0 ? <div className="py-12 text-center"><UserRound size={24} className="mx-auto text-white/20"/><p className="mt-3 text-xs text-white/50">No approved creators match this search.</p></div> : <div className="mt-3 space-y-2">{visibleCreators.map(creator => {
              const assignment = assignments.find(item => item.influencer_id === creator.id);
              const active = assignment && assignment.status !== "REMOVED" && assignment.status !== "DECLINED";
              return <div key={creator.id} className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.02] p-3"><div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-cyan-300/[.08]">{profiles[creator.id]?.avatar_url ? <img src={profiles[creator.id].avatar_url!} alt="" className="h-full w-full object-cover"/> : <UserRound size={17} className="text-cyan-200"/>}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-white/85">{creator.display_name || profiles[creator.id]?.full_name || "Unnamed creator"}</p><p className="mt-1 truncate text-[10px] text-white/40">{creator.niche || "Niche not specified"}{creator.location ? ` · ${creator.location}` : ""}</p><p className="mt-1 text-[10px] text-white/35">{Number(creator.followers_count || 0).toLocaleString()} followers{creator.rate_usdt ? ` · ${Number(creator.rate_usdt).toLocaleString()} USDT rate` : ""}</p></div><button disabled={assignmentBusyId===creator.id || Boolean(active)} onClick={() => void assignCreator(creator)} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-cyan-300/20 bg-cyan-300/[.07] px-3 py-2 text-[10px] font-semibold text-cyan-200 disabled:cursor-not-allowed disabled:opacity-40">{assignmentBusyId===creator.id ? <LoaderCircle size={12} className="animate-spin"/> : <UserPlus size={12}/>} {active ? assignment?.status==="INVITED"?"Invited":assignment?.status==="ACCEPTED"?"Accepted":assignment?.status==="ACTIVE"?"Active":"Assigned" : assignment ? "Re-invite" : "Invite"}</button></div>;
            })}</div>}
          </section>
          <section className="p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><div><h4 className="text-sm font-semibold">Current assignments</h4><p className="mt-1 text-xs text-white/40">Removing a creator preserves assignment history.</p></div><button onClick={() => void loadAssignments(selectedCampaign.id)} className="rounded-lg border border-white/10 p-2 text-white/50 hover:text-white" aria-label="Refresh assignments"><RefreshCw size={13}/></button></div>
            {assignments.length===0 ? <div className="py-12 text-center"><Users size={24} className="mx-auto text-white/20"/><p className="mt-3 text-xs text-white/50">No creators assigned yet.</p><p className="mt-1 text-[10px] text-white/30">Invite an approved creator to start building this team.</p></div> : <div className="mt-4 space-y-2">{assignments.map(assignment => {
              const creator = creators.find(item => item.id === assignment.influencer_id);
              const removed = assignment.status === "REMOVED" || assignment.status === "DECLINED";
              return <div key={assignment.id} className="flex items-center gap-3 rounded-2xl border border-white/[.07] p-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[.04]"><UserRound size={16} className="text-white/50"/></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-white/80">{creator?.display_name || profiles[assignment.influencer_id]?.full_name || "Creator"}</p><p className="mt-1 text-[10px] text-white/35">Added {new Date(assignment.assigned_at).toLocaleDateString()} · {assignment.status}</p></div><span className={`rounded-lg border px-2 py-1 text-[9px] ${removed?"border-white/10 text-white/35":assignment.status==="INVITED"?"border-amber-300/20 bg-amber-300/[.05] text-amber-200":"border-emerald-300/20 bg-emerald-300/[.05] text-emerald-200"}`}>{assignment.status}</span>{!removed && <button disabled={assignmentBusyId===assignment.influencer_id} onClick={() => void removeCreator(assignment)} title="Remove creator" aria-label="Remove creator from campaign" className="rounded-lg border border-rose-300/15 p-2 text-rose-200/70 hover:bg-rose-300/[.06] disabled:opacity-40">{assignmentBusyId===assignment.influencer_id?<LoaderCircle size={13} className="animate-spin"/>:<UserMinus size={13}/>}</button>}</div>;
            })}</div>}
          </section>
        </div>
        <div className="flex justify-end border-t border-white/10 px-5 py-4 sm:px-7"><button onClick={() => setSelectedCampaign(null)} className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-white/70 hover:text-white">Done</button></div>
      </div>
    </div>}
  </>;
}
