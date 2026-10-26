"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  CheckCircle2, Clock3, DollarSign, MessageSquare, Users, UserRoundCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Lead = { id: string; company_name: string; contact_name: string | null; notes: string | null; budget: number | null; currency: string; status: string; created_at: string };
type Campaign = { id: string; name: string; status: string; phase: string; budget: number | null; currency: string; deadline: string | null; company: { name: string } | null };
type Creator = { id: string; display_name: string; niche: string | null; location: string | null; verification_status: string; created_at: string };
type Counts = { leads: number; campaigns: number; creators: number; messages: number; pending: number; activeCampaigns: number; pipeline: number };

const money = (amount: number, currency = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD", maximumFractionDigits: 0 }).format(amount);
const dateLabel = (value: string) => new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });

export default function AdminOverview() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [counts, setCounts] = useState<Counts>({ leads: 0, campaigns: 0, creators: 0, messages: 0, pending: 0, activeCampaigns: 0, pipeline: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const supabase = useMemo(() => createClient(), []);

  const load = useCallback(async () => {
    const [leadResult, campaignResult, creatorResult, messageCount] = await Promise.all([
      supabase.from("leads").select("id, company_name, contact_name, notes, budget, currency, status, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("campaigns").select("id, name, status, phase, budget, currency, deadline, company:companies(name)").order("created_at", { ascending: false }).limit(6),
      supabase.from("influencer_profiles").select("id, display_name, niche, location, verification_status, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("messages").select("id", { count: "exact", head: true }),
    ]);
    const failure = leadResult.error || campaignResult.error || creatorResult.error || messageCount.error;
    if (failure) setError(failure.message);
    else setError("");
    const leadRows = (leadResult.data ?? []) as Lead[];
    const campaignRows = (campaignResult.data ?? []) as unknown as Campaign[];
    const creatorRows = (creatorResult.data ?? []) as Creator[];
    setLeads(leadRows);
    setCampaigns(campaignRows);
    setCreators(creatorRows);
    setCounts({
      leads: leadRows.length,
      campaigns: campaignRows.length,
      creators: creatorRows.length,
      messages: messageCount.count ?? 0,
      pending: creatorRows.filter(x => x.verification_status === "PENDING").length,
      activeCampaigns: campaignRows.filter(x => x.status === "ACTIVE").length,
      pipeline: leadRows.reduce((sum, lead) => sum + Number(lead.budget ?? 0), 0),
    });
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
    const channel = supabase.channel("admin-overview-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => void load())
      .on("postgres_changes", { event: "*", schema: "public", table: "campaigns" }, () => void load())
      .on("postgres_changes", { event: "*", schema: "public", table: "influencer_profiles" }, () => void load())
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => void load())
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [load, supabase]);

  const metrics = [
    { label: "Lead records", value: String(counts.leads), note: "Latest 5 loaded", icon: BriefcaseBusiness, tone: "cyan" },
    { label: "Active campaigns", value: String(counts.activeCampaigns), note: "Among latest 6", icon: Activity, tone: "violet" },
    { label: "Creator reviews", value: String(counts.pending), note: "Pending in latest 5", icon: UserRoundCheck, tone: "amber" },
    { label: "Messages", value: String(counts.messages), note: "Visible to your admin account", icon: MessageSquare, tone: "blue" },
  ];

  return <div className="space-y-6">
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a101b]">
      <div className="pointer-events-none absolute -right-12 -top-24 h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[90px]"/><div className="pointer-events-none absolute bottom-[-100px] right-[30%] h-56 w-56 rounded-full bg-violet-500/[0.06] blur-[80px]"/>
      <div className="relative grid gap-8 p-6 sm:p-8 xl:grid-cols-[1fr_280px] xl:items-end">
        <div><div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-emerald-200/80"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/>{loading ? "Syncing workspace" : "Connected to Supabase"}</div><p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-cyan-200/65">InfluxBridge · Admin workspace</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Your agency, in one clear view.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-white/45">Track new business, creator onboarding, campaign delivery, and conversations from a single operations overview.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/admin/leads" className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-xs font-semibold text-[#061018] transition hover:bg-cyan-200">Open lead pipeline <ArrowRight size={14}/></Link><Link href="/admin/campaigns" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/70 transition hover:bg-white/[0.07]">Review campaigns <ArrowUpRight size={14}/></Link></div></div>
        <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4"><div className="flex items-center justify-between"><span className="text-[10px] text-white/45">Workspace health</span><Activity size={15} className="text-cyan-200/70"/></div><p className="mt-4 text-2xl font-semibold">{error ? "Needs attention" : loading ? "Connecting…" : "Database linked"}</p><p className="mt-2 text-[10px] leading-5 text-white/40">{error ? "One or more live data queries failed. Review the error below." : "Overview data is requested directly from your Supabase project."}</p><div className="mt-4 h-px bg-white/[0.08]"/><div className="mt-3 flex items-center justify-between text-[10px]"><span className="text-white/35">Last refreshed</span><span className="text-white/60">{loading ? "In progress" : "Just now"}</span></div></div>
      </div>
    </section>

    {error && <div role="alert" className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs text-red-200">Could not fully load overview data: {error}. Check your admin session and Supabase table permissions.</div>}

    <section className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">{metrics.map(metric => { const Icon = metric.icon; return <div key={metric.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-white/[0.13]"><div className="flex items-start justify-between"><p className="text-xs text-white/45">{metric.label}</p><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-cyan-200/80"><Icon size={16}/></span></div><p className="mt-5 text-3xl font-semibold tracking-tight">{loading ? "—" : metric.value}</p><p className="mt-2 text-[10px] text-white/35">{metric.note}</p></div>; })}</section>

    <section className="grid gap-6 2xl:grid-cols-[1.15fr_.85fr]">
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"><div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-6"><div><h3 className="text-sm font-semibold">Recent leads</h3><p className="mt-1 text-[10px] text-white/35">Newest company enquiries from the database</p></div><Link href="/admin/leads" className="inline-flex shrink-0 items-center gap-1 text-[10px] text-cyan-200 hover:text-cyan-100">All leads <ArrowRight size={12}/></Link></div>
        <div className="divide-y divide-white/[0.055]">{loading ? <div className="p-6 text-xs text-white/40">Loading leads…</div> : leads.length === 0 ? <div className="p-8 text-center"><BriefcaseBusiness size={20} className="mx-auto text-white/25"/><p className="mt-3 text-xs text-white/50">No leads have arrived yet.</p><p className="mt-1 text-[10px] text-white/30">New enquiries will appear here when saved to Supabase.</p></div> : leads.map(lead => <div key={lead.id} className="flex items-center gap-3 px-5 py-4 sm:px-6"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-[10px] font-semibold text-cyan-100">{lead.company_name.slice(0,2).toUpperCase()}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-white/85">{lead.company_name}</p><p className="mt-1 truncate text-[10px] text-white/40">{lead.contact_name || "Contact not provided"} · {dateLabel(lead.created_at)}</p></div><div className="text-right"><p className="text-[10px] text-white/70">{lead.budget == null ? "Budget n/a" : money(Number(lead.budget), lead.currency)}</p><span className="mt-1 inline-block rounded-full border border-cyan-300/10 bg-cyan-300/[0.05] px-2 py-0.5 text-[8px] text-cyan-100/75">{lead.status.replaceAll("_"," ")}</span></div></div>)}</div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"><div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-6"><div><h3 className="text-sm font-semibold">Creator review queue</h3><p className="mt-1 text-[10px] text-white/35">Latest profiles and verification status</p></div><Link href="/admin/influencers" className="inline-flex shrink-0 items-center gap-1 text-[10px] text-cyan-200 hover:text-cyan-100">Review creators <ArrowRight size={12}/></Link></div>
        <div className="divide-y divide-white/[0.055]">{loading ? <div className="p-6 text-xs text-white/40">Loading creators…</div> : creators.length === 0 ? <div className="p-8 text-center"><Users size={20} className="mx-auto text-white/25"/><p className="mt-3 text-xs text-white/50">No creator profiles found.</p></div> : creators.map(creator => <div key={creator.id} className="flex items-center gap-3 px-5 py-4 sm:px-6"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300/15 to-violet-400/15 text-[10px] font-semibold text-cyan-100">{creator.display_name.split(/\s+/).map(part=>part[0]).join("").slice(0,2).toUpperCase()}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-white/85">{creator.display_name}</p><p className="mt-1 truncate text-[10px] text-white/40">{creator.niche || "Niche not set"} · {creator.location || "Location not set"}</p></div><span className={`rounded-full border px-2 py-1 text-[8px] ${creator.verification_status === "APPROVED" ? "border-emerald-300/15 bg-emerald-300/[0.05] text-emerald-200" : creator.verification_status === "REJECTED" ? "border-red-300/15 bg-red-300/[0.05] text-red-200" : "border-amber-300/15 bg-amber-300/[0.05] text-amber-100"}`}>{creator.verification_status.replaceAll("_"," ")}</span></div>)}</div>
      </div>
    </section>

    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"><div className="flex flex-col gap-2 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><h3 className="text-sm font-semibold">Campaign delivery</h3><p className="mt-1 text-[10px] text-white/35">Recent campaigns and their current operating stage</p></div><Link href="/admin/campaigns" className="inline-flex items-center gap-1 text-[10px] text-cyan-200 hover:text-cyan-100">All campaigns <ArrowRight size={12}/></Link></div>
      {loading ? <div className="p-6 text-xs text-white/40">Loading campaigns…</div> : campaigns.length === 0 ? <div className="p-8 text-center"><Activity size={20} className="mx-auto text-white/25"/><p className="mt-3 text-xs text-white/50">No campaigns found yet.</p></div> : <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">{campaigns.map(campaign => <div key={campaign.id} className="rounded-xl border border-white/[0.07] bg-black/10 p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-xs font-semibold text-white/85">{campaign.name}</p><p className="mt-1 truncate text-[10px] text-white/40">{campaign.company?.name || "Company not assigned"}</p></div><span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[8px] text-cyan-100/80">{campaign.status.replaceAll("_"," ")}</span></div><div className="mt-5 flex items-center justify-between gap-2"><div><p className="text-[9px] text-white/35">Budget</p><p className="mt-1 text-xs font-medium text-white/70">{campaign.budget == null ? "Not set" : money(Number(campaign.budget), campaign.currency)}</p></div><div className="text-right"><p className="text-[9px] text-white/35">Current phase</p><p className="mt-1 text-[10px] text-white/65">{campaign.phase.replaceAll("_"," ")}</p></div></div><div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.06] pt-3 text-[9px] text-white/35"><Clock3 size={12}/>{campaign.deadline ? `Due ${dateLabel(campaign.deadline)}` : "No deadline set"}</div></div>)}</div>}
    </section>

    <section className="grid gap-3 sm:grid-cols-3"><QuickAction href="/admin/leads" icon={<BriefcaseBusiness size={17}/>} title="Qualify opportunities" text="Review incoming company enquiries."/><QuickAction href="/admin/influencers" icon={<CheckCircle2 size={17}/>} title="Verify creators" text="Keep the creator network trustworthy."/><QuickAction href="/admin/messages" icon={<MessageSquare size={17}/>} title="Review conversations" text="Stay close to company and creator activity."/></section>
    <p className="px-1 text-[9px] leading-5 text-white/30">Numbers on this page reflect the latest records fetched and the rows visible under your current admin permissions. This overview does not estimate campaign progress where the database has no progress field.</p>
  </div>;
}

function QuickAction({ href, icon, title, text }: { href: string; icon: React.ReactNode; title: string; text: string }) {
  return <Link href={href} className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-cyan-300/15 hover:bg-white/[0.035]"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-cyan-200/80">{icon}</div><div><p className="text-xs font-semibold text-white/80 group-hover:text-cyan-100">{title}</p><p className="mt-1 text-[10px] text-white/40">{text}</p></div><ArrowDownRight size={14} className="ml-auto text-white/25 transition group-hover:text-cyan-200"/></div></Link>;
}
