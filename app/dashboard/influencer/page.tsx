"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Bell, BriefcaseBusiness, Clock3, DollarSign, FileText, LayoutDashboard, LoaderCircle, LogOut, MessageCircle, RefreshCw, Settings, UserRound, Users } from "lucide-react";

type Row = Record<string, any>;
const money = (value: unknown) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));
const dateLabel = (value: unknown) => value ? new Date(String(value)).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "No deadline";

export default function InfluencerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<Row | null>(null);
  const [profile, setProfile] = useState<Row | null>(null);
  const [creator, setCreator] = useState<Row | null>(null);
  const [socials, setSocials] = useState<Row[]>([]);
  const [campaigns, setCampaigns] = useState<Row[]>([]);
  const [deliverables, setDeliverables] = useState<Row[]>([]);
  const [payments, setPayments] = useState<Row[]>([]);
  const [notifications, setNotifications] = useState<Row[]>([]);
  const supabase = createClient();

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true); else setRefreshing(true);
    setError("");
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError || !auth.user) {
      setError("Please sign in to view your creator workspace.");
      setLoading(false); setRefreshing(false); return;
    }
    setUser(auth.user);
    const uid = auth.user.id;
    const [p, cp, so, cc, d, pay, n] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
      supabase.from("influencer_profiles").select("*").eq("id", uid).maybeSingle(),
      supabase.from("social_accounts").select("*").eq("influencer_id", uid),
      supabase.from("campaign_creators").select("*, campaigns(*)").eq("influencer_id", uid),
      supabase.from("deliverables").select("*").eq("influencer_id", uid).order("created_at", { ascending: false }).limit(5),
      supabase.from("payment_records").select("*").eq("influencer_id", uid).order("created_at", { ascending: false }),
      supabase.from("notifications").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(5),
    ]);
    setProfile(p.data || null);
    setCreator(cp.data || null);
    setSocials(so.data || []);
    setCampaigns(cc.data || []);
    setDeliverables(d.data || []);
    setPayments(pay.data || []);
    setNotifications(n.data || []);
    const firstError = [p, cp, so, cc, d, pay, n].find((result) => result.error)?.error;
    if (firstError) setError(firstError.message);
    setLoading(false); setRefreshing(false);
  }, [supabase]);

  useEffect(() => {
    void load();
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (!active || !data.user) return;
      const uid = data.user.id;
      channel = supabase.channel("creator-dashboard-" + uid)
        .on("postgres_changes", { event: "*", schema: "public", table: "influencer_profiles", filter: "id=eq." + uid }, () => void load(true))
        .on("postgres_changes", { event: "*", schema: "public", table: "social_accounts", filter: "influencer_id=eq." + uid }, () => void load(true))
        .on("postgres_changes", { event: "*", schema: "public", table: "campaign_creators", filter: "influencer_id=eq." + uid }, () => void load(true))
        .on("postgres_changes", { event: "*", schema: "public", table: "deliverables", filter: "influencer_id=eq." + uid }, () => void load(true))
        .on("postgres_changes", { event: "*", schema: "public", table: "payment_records", filter: "influencer_id=eq." + uid }, () => void load(true))
        .subscribe();
    });
    return () => { active = false; if (channel) void supabase.removeChannel(channel); };
  }, [load, supabase]);

  const fullName = creator?.display_name || profile?.full_name || user?.email?.split("@")[0] || "Creator";
  const avatar = profile?.avatar_url as string | undefined;
  const status = String(creator?.profile_status || "INCOMPLETE").toUpperCase();
  const activeCampaigns = campaigns.filter((row) => {
    const c = row.campaigns || row.campaign || row;
    return !["COMPLETED", "CANCELLED", "REJECTED", "ARCHIVED"].includes(String(c.status || row.status || "").toUpperCase());
  });
  const pendingPayments = payments.filter((p) => !["PAID", "COMPLETED", "SETTLED"].includes(String(p.status || "").toUpperCase()));
  const paidPayments = payments.filter((p) => ["PAID", "COMPLETED", "SETTLED"].includes(String(p.status || "").toUpperCase()));
  const sum = (rows: Row[]) => rows.reduce((total, p) => total + Number(p.amount_usdt ?? p.amount ?? p.amount_usd ?? 0), 0);
  const profileChecks = [Boolean(creator?.display_name && creator?.bio), socials.length > 0, Boolean(creator?.followers_count), Boolean(creator?.portfolio_url || creator?.sample_video_url)];
  const completion = Math.round(profileChecks.filter(Boolean).length / profileChecks.length * 100);

  async function signOut() { await supabase.auth.signOut(); window.location.href = "/login"; }

  if (loading) return <main className="grid min-h-screen place-items-center bg-[#050712] text-white"><div className="flex items-center gap-3 text-sm text-white/60"><LoaderCircle className="h-5 w-5 animate-spin text-cyan-300" /> Loading your live creator workspace…</div></main>;
  if (error && !user) return <main className="grid min-h-screen place-items-center bg-[#050712] px-6 text-white"><div className="max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center"><h1 className="text-xl font-bold">Sign in required</h1><p className="mt-3 text-sm text-white/55">{error}</p><Link href="/login" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-black">Go to login</Link></div></main>;

  return <main className="min-h-screen bg-[#050712] text-white">
    <div className="pointer-events-none fixed inset-0 -z-10"><div className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-[120px]"/><div className="absolute -right-32 top-1/3 h-[32rem] w-[32rem] rounded-full bg-violet-600/[0.08] blur-[150px]"/></div>
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#070a15]/80 p-5 lg:flex lg:flex-col">
        <Link href="/" className="flex items-center gap-3 border-b border-white/10 px-2 pb-6"><img src="/a-logo.png" alt="InfluxBridge" className="h-10 w-10 object-contain"/><span className="text-xs font-bold tracking-[.16em]">INFLUXBRIDGE<span className="mt-1 block text-[9px] font-normal tracking-[.2em] text-white/35">CREATOR PORTAL</span></span></Link>
        <p className="mb-3 mt-7 px-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/30">Workspace</p>
        <nav className="space-y-1">
          <SideLink href="/dashboard/influencer" icon={<LayoutDashboard size={16}/>} label="Overview" active/>
          <SideLink href="/join/influencer/profile" icon={<UserRound size={16}/>} label="My profile"/>
          <SideLink href="#campaigns" icon={<BriefcaseBusiness size={16}/>} label="Campaigns" />
          <SideLink href="#deliverables" icon={<FileText size={16}/>} label="Deliverables"/>
          <SideLink href="#activity" icon={<Bell size={16}/>} label="Notifications"/>
          <SideLink href="#payments" icon={<DollarSign size={16}/>} label="Payments"/>
        </nav>
        <div className="mt-auto space-y-2 border-t border-white/10 pt-4"><button onClick={() => void signOut()} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 hover:bg-white/5 hover:text-white"><LogOut size={16}/> Sign out</button></div>
      </aside>
      <section className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-4 border-b border-white/10 bg-[#050712]/80 px-5 backdrop-blur-2xl sm:px-8">
          <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300">Creator workspace</p><h1 className="mt-1 text-lg font-bold sm:text-xl">Welcome back, {fullName}</h1></div>
          <div className="flex items-center gap-3"><button onClick={() => void load(true)} disabled={refreshing} className="flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-xs text-white/60 hover:text-white"><RefreshCw size={14} className={refreshing ? "animate-spin" : ""}/><span className="hidden sm:inline">Refresh live data</span></button><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/5">{avatar ? <img src={avatar} alt={fullName} className="h-full w-full object-cover"/> : <UserRound size={18} className="text-cyan-200"/>}</div><div className="hidden sm:block"><p className="text-xs font-semibold">{fullName}</p><p className="max-w-40 truncate text-[10px] text-white/35">{user?.email}</p></div></div></div>
        </header>
        <div className="mx-auto max-w-[1450px] space-y-7 px-5 py-8 sm:px-8 lg:px-10">
          {error && <div role="status" className="rounded-2xl border border-amber-300/20 bg-amber-300/[.06] p-4 text-sm text-amber-100/80">Some live sections could not load: {error}. Values below only show records successfully returned by Supabase.</div>}
          <section className={"rounded-3xl border p-6 sm:p-7 " + (status === "ACTIVE" ? "border-emerald-400/20 bg-emerald-400/[.05]" : status === "REJECTED" ? "border-rose-400/20 bg-rose-400/[.05]" : "border-amber-300/20 bg-amber-300/[.045]")}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5"><Clock3 size={21}/></div><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold">{status === "ACTIVE" ? "Your creator profile is approved" : status === "REJECTED" ? "Your profile needs attention" : status === "SUBMITTED" || status === "PENDING" ? "Profile under review" : "Finish your creator profile"}</h2><span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/60">{status.replaceAll("_", " ")}</span></div><p className="mt-1 max-w-2xl text-sm leading-6 text-white/45">{status === "ACTIVE" ? "Your profile is active. Keep your information current and check this workspace for campaign updates." : status === "REJECTED" ? "Please review your profile information or contact the InfluxBridge team for next steps." : "Your profile status is loaded from Supabase. Campaign eligibility begins after the InfluxBridge team approves your application."}</p></div></div><Link href="/join/influencer/profile" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.05] px-4 py-3 text-xs font-semibold hover:bg-white/10">{creator ? "Edit profile" : "Build profile"}<ArrowRight size={14}/></Link></div>
          </section>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Campaigns" value={String(activeCampaigns.length)} detail="Assigned to your account" icon={<BriefcaseBusiness size={18}/>} />
            <Stat label="Social accounts" value={String(socials.length)} detail="Connected profile links" icon={<Users size={18}/>} />
            <Stat label="Pending payments" value={money(sum(pendingPayments))} detail={pendingPayments.length + " payment records"} icon={<DollarSign size={18}/>} />
            <Stat label="Paid to date" value={money(sum(paidPayments))} detail={paidPayments.length + " completed payments"} icon={<DollarSign size={18}/>} />
          </section>
          <section className="grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
            <div id="campaigns" className="rounded-3xl border border-white/10 bg-white/[.025] p-5 sm:p-7"><div className="flex items-center justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300">Your work</p><h2 className="mt-2 text-xl font-bold">Campaigns</h2></div><span className="text-xs text-white/35">{activeCampaigns.length} assigned</span></div>
              {activeCampaigns.length ? <div className="mt-5 space-y-3">{activeCampaigns.map((row, i) => { const campaign = row.campaigns || row.campaign || row; const id = campaign.id || row.campaign_id || row.id; const title = campaign.name || campaign.title || campaign.campaign_name || "Campaign"; return <Link key={String(id || i)} href={"/dashboard/influencer/campaigns/" + id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/10 p-4 transition hover:border-cyan-300/25"><div className="min-w-0"><p className="truncate font-semibold">{title}</p><p className="mt-1 text-xs text-white/40">{campaign.company_name || campaign.client_name || campaign.status || row.status || "Assigned campaign"}</p></div><div className="text-right"><span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/60">{String(campaign.status || row.status || "Assigned").replaceAll("_", " ")}</span><p className="mt-2 text-[10px] text-white/30">{dateLabel(campaign.deadline || campaign.end_date)}</p></div><ArrowRight size={15} className="shrink-0 text-white/30"/></Link>; })}</div> : <Empty title="No campaigns assigned yet" body="When a company or the InfluxBridge team assigns you a campaign, it will appear here."/>}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[.025] p-5 sm:p-7"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-violet-300">Profile quality</p><div className="mt-2 flex items-end justify-between"><h2 className="text-xl font-bold">Profile completeness</h2><span className="text-2xl font-black text-cyan-300">{completion}%</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" style={{width: completion + "%"}}/></div><div className="mt-5 space-y-3">{["Basic profile","Social accounts","Audience size","Portfolio or sample"].map((label,i)=><div key={label} className="flex items-center justify-between text-sm"><span className="text-white/60">{label}</span><span className={profileChecks[i] ? "text-emerald-300" : "text-white/30"}>{profileChecks[i] ? "Complete" : "Missing"}</span></div>)}</div><Link href="/join/influencer/profile" className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold hover:bg-white/10">Update creator profile <ArrowRight size={14}/></Link></div>
          </section>
          <section className="grid gap-6 lg:grid-cols-2">
            <div id="deliverables" className="rounded-3xl border border-white/10 bg-white/[.025] p-5 sm:p-7"><div className="flex items-center gap-2"><FileText size={17} className="text-cyan-300"/><h2 className="font-bold">Recent deliverables</h2></div>{deliverables.length ? <div className="mt-5 space-y-3">{deliverables.map((d,i)=><div key={String(d.id || i)} className="rounded-xl border border-white/10 p-4"><div className="flex justify-between gap-3"><p className="text-sm font-semibold">{d.title || d.name || "Campaign deliverable"}</p><span className="text-[10px] text-white/45">{String(d.status || "Pending").replaceAll("_"," ")}</span></div><p className="mt-2 text-xs text-white/35">{d.due_date ? "Due " + dateLabel(d.due_date) : d.created_at ? "Created " + dateLabel(d.created_at) : "No due date set"}</p></div>)}</div> : <Empty title="No deliverables yet" body="Deliverables will appear when they are created for one of your assigned campaigns."/>}</div>
            <div id="payments" className="rounded-3xl border border-white/10 bg-white/[.025] p-5 sm:p-7"><div className="flex items-center gap-2"><DollarSign size={17} className="text-emerald-300"/><h2 className="font-bold">Payment history</h2></div>{payments.length ? <div className="mt-5 space-y-3">{payments.slice(0,5).map((p,i)=><div key={String(p.id || i)} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 p-4"><div><p className="text-sm font-semibold">{p.description || p.reference || "Campaign payment"}</p><p className="mt-1 text-xs text-white/35">{dateLabel(p.created_at)}</p></div><div className="text-right"><p className="font-semibold">{money(p.amount_usdt ?? p.amount ?? p.amount_usd)}</p><p className="mt-1 text-[10px] uppercase text-white/40">{String(p.status || "Pending").replaceAll("_"," ")}</p></div></div>)}</div> : <Empty title="No payment records yet" body="Payment amounts and statuses will show here once real records are created. No demo earnings are displayed."/>}</div>
          </section>
          <section id="activity" className="rounded-3xl border border-white/10 bg-white/[.025] p-5 sm:p-7"><div className="flex items-center gap-2"><Bell size={17} className="text-violet-300"/><h2 className="font-bold">Notifications</h2></div>{notifications.length ? <div className="mt-4 divide-y divide-white/10">{notifications.map((n,i)=><div key={String(n.id || i)} className="py-4"><p className="text-sm font-semibold">{n.title || n.subject || "Workspace update"}</p><p className="mt-1 text-sm text-white/45">{n.body || n.message || n.description || "You have a new update."}</p><p className="mt-2 text-[10px] text-white/30">{dateLabel(n.created_at)}</p></div>)}</div> : <Empty title="You're all caught up" body="Real notifications will appear here when the platform creates them."/>}</section>
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-5 text-xs text-white/30"><span>InfluxBridge Creator Workspace · Live account data</span><button onClick={() => void signOut()} className="inline-flex items-center gap-2 hover:text-white"><LogOut size={14}/> Sign out</button></footer>
        </div>
      </section>
    </div>
  </main>;
}

function SideLink({href,icon,label,active=false}:{href:string;icon:React.ReactNode;label:string;active?:boolean}) { return <Link href={href} className={"flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition " + (active ? "border border-cyan-400/15 bg-cyan-400/[.08] text-cyan-200" : "text-white/45 hover:bg-white/5 hover:text-white")}>{icon}{label}</Link>; }
function Stat({label,value,detail,icon}:{label:string;value:string;detail:string;icon:React.ReactNode}) { return <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="flex items-center justify-between"><span className="text-xs text-white/45">{label}</span><span className="text-cyan-300">{icon}</span></div><p className="mt-4 break-words text-2xl font-bold">{value}</p><p className="mt-2 text-[11px] text-white/35">{detail}</p></div>; }
function Empty({title,body}:{title:string;body:string}) { return <div className="mt-5 rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center"><p className="text-sm font-semibold text-white/70">{title}</p><p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/35">{body}</p></div>; }
