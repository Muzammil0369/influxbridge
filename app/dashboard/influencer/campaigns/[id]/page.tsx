"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, ArrowUpRight, FileText, LoaderCircle, RefreshCw, UserRound } from "lucide-react";

type Row = Record<string, any>;
const dateLabel = (v: unknown) => v ? new Date(String(v)).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"}) : "Not set";

export default function CampaignWorkspacePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const supabase = createClient();
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [user,setUser] = useState<Row|null>(null);
  const [profile,setProfile] = useState<Row|null>(null);
  const [assignment,setAssignment] = useState<Row|null>(null);
  const [deliverables,setDeliverables] = useState<Row[]>([]);
  const [refreshing,setRefreshing] = useState(false);

  const load = useCallback(async (quiet=false) => {
    if (quiet) setRefreshing(true); else setLoading(true);
    setError("");
    const {data: auth,error: authError} = await supabase.auth.getUser();
    if (authError || !auth.user) { setError("Please sign in to view this campaign."); setLoading(false); setRefreshing(false); return; }
    setUser(auth.user);
    const [p,a,d] = await Promise.all([
      supabase.from("profiles").select("full_name,avatar_url").eq("id",auth.user.id).maybeSingle(),
      supabase.from("campaign_creators").select("*, campaigns(*)").eq("influencer_id",auth.user.id).eq("campaign_id",id).maybeSingle(),
      supabase.from("deliverables").select("*").eq("influencer_id",auth.user.id).eq("campaign_id",id).order("created_at",{ascending:true}),
    ]);
    setProfile(p.data || null);
    setAssignment(a.data || null);
    setDeliverables(d.data || []);
    const problem = [a,d].find(x=>x.error)?.error;
    if (problem) setError(problem.message);
    setLoading(false); setRefreshing(false);
  },[id,supabase]);

  useEffect(() => {
    void load();
    let channel: ReturnType<typeof supabase.channel>|null = null;
    let active=true;
    void supabase.auth.getUser().then(({data}) => {
      if (!active || !data.user) return;
      channel=supabase.channel("creator-campaign-"+id+"-"+data.user.id)
        .on("postgres_changes",{event:"*",schema:"public",table:"campaign_creators",filter:"influencer_id=eq."+data.user.id},()=>void load(true))
        .on("postgres_changes",{event:"*",schema:"public",table:"deliverables",filter:"influencer_id=eq."+data.user.id},()=>void load(true))
        .subscribe();
    });
    return () => { active=false; if(channel) void supabase.removeChannel(channel); };
  },[load,supabase,id]);

  if (loading) return <main className="grid min-h-screen place-items-center bg-[#050712] text-white"><div className="flex items-center gap-3 text-sm text-white/50"><LoaderCircle size={20} className="animate-spin text-cyan-300"/> Loading campaign from Supabase…</div></main>;
  if (!user) return <main className="grid min-h-screen place-items-center bg-[#050712] px-6 text-white"><div className="max-w-md rounded-3xl border border-white/10 p-8 text-center"><h1 className="text-xl font-bold">Sign in required</h1><p className="mt-3 text-sm text-white/45">{error}</p><Link href="/login" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-black">Sign in</Link></div></main>;
  const campaign=assignment?.campaigns || assignment?.campaign || assignment;
  const title=campaign?.name || campaign?.title || campaign?.campaign_name || "Campaign";
  if (!assignment || !campaign?.id && !assignment.campaign_id) return <main className="min-h-screen bg-[#050712] px-5 py-20 text-white"><div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[.03] p-8"><Link href="/dashboard/influencer" className="inline-flex items-center gap-2 text-xs text-white/45 hover:text-white"><ArrowLeft size={14}/> Creator workspace</Link><h1 className="mt-6 text-2xl font-bold">Campaign not assigned</h1><p className="mt-3 text-sm leading-6 text-white/45">This campaign is not assigned to the currently signed-in creator, or you don't have permission to view it. We won't show sample campaign content here.</p>{error && <p className="mt-4 text-xs text-amber-200/70">{error}</p>}<Link href="/dashboard/influencer" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-xs font-bold text-black">Back to dashboard</Link></div></main>;

  return <main className="min-h-screen bg-[#050712] text-white"><div className="pointer-events-none fixed inset-0 -z-10"><div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-cyan-500/[.08] blur-[120px]"/><div className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-violet-500/[.08] blur-[120px]"/></div>
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/10 bg-[#050712]/85 px-5 backdrop-blur-xl sm:px-8"><Link href="/dashboard/influencer" className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white"><ArrowLeft size={15}/> Creator workspace</Link><button onClick={()=>void load(true)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/55 hover:text-white"><RefreshCw size={13} className={refreshing?"animate-spin":""}/> Refresh</button></header>
    <div className="mx-auto max-w-5xl space-y-6 px-5 py-8 sm:px-8">
      {error && <div role="status" className="rounded-xl border border-amber-300/20 bg-amber-300/[.05] p-4 text-xs text-amber-100/80">Some campaign data could not load: {error}</div>}
      <section className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-9"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300">Campaign workspace</p><h1 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">{campaign.description || campaign.brief || "Campaign details will appear here when the company or InfluxBridge team adds them."}</p><div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/60">{String(campaign.status || assignment.status || "Assigned").replaceAll("_"," ")}</span><span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/60">Deadline: {dateLabel(campaign.deadline || campaign.end_date)}</span></div><div className="mt-7 grid gap-3 sm:grid-cols-3"><Metric label="Company" value={String(campaign.company_name || campaign.client_name || "Not provided")}/><Metric label="Campaign budget" value={campaign.budget_usdt != null ? Number(campaign.budget_usdt).toLocaleString()+" USDT" : campaign.budget != null ? String(campaign.budget) : "Not provided"}/><Metric label="Deliverables" value={String(deliverables.length)}/></div></section>
      <section className="rounded-3xl border border-white/10 bg-white/[.025] p-6 sm:p-8"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.04]"><FileText size={18} className="text-cyan-200"/></div><div><h2 className="font-bold">Your deliverables</h2><p className="mt-1 text-xs text-white/35">Live records associated with this campaign and your creator account.</p></div></div>
        {deliverables.length ? <div className="mt-6 space-y-3">{deliverables.map((d,i)=><div key={String(d.id||i)} className="rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold">{d.title || d.name || "Deliverable"}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/45">{d.description || d.instructions || "No additional instructions have been added."}</p></div><span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/60">{String(d.status||"Pending").replaceAll("_"," ")}</span></div><div className="mt-4 flex flex-wrap gap-4 text-[10px] text-white/35"><span>Due: {dateLabel(d.due_date || d.deadline)}</span>{d.submission_url && <a href={String(d.submission_url)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-200">Open submission <ArrowUpRight size={12}/></a>}</div></div>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center"><p className="text-sm font-semibold text-white/70">No deliverables created yet</p><p className="mt-2 text-xs text-white/35">When deliverables are added to this campaign, they will appear here. No sample tasks are displayed.</p></div>}
      </section>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.02] p-4"><div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5"><UserRound size={16}/></div><div><p className="text-xs font-semibold">{profile?.full_name || user.email}</p><p className="mt-1 text-[10px] text-white/35">Signed in creator account</p></div></div>
    </div>
  </main>;
}
function Metric({label,value}:{label:string;value:string}){return <div className="rounded-xl border border-white/10 bg-black/10 p-4"><p className="text-[10px] text-white/35">{label}</p><p className="mt-2 break-words text-sm font-semibold">{value}</p></div>}
