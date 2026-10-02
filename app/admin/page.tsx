"use client";

import Link from "next/link";
import { getCampaigns, getInfluencers, getLeads } from "@/lib/platform";
import {
  Activity,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileCheck2,
  UserCheck,
  Users,
} from "lucide-react";

export default function AdminOverview() {
  const [leads,setLeads] = useState<any[]>([]);
  const [campaigns,setCampaigns] = useState<any[]>([]);
  const [creators,setCreators] = useState<any[]>([]);
  useEffect(() => { const load=()=>{ setLeads(getLeads().slice(0,3).map(x=>[x.company,x.request,`${x.budget.toLocaleString()}`,x.status])); setCampaigns(getCampaigns().map(x=>[x.name,x.client,x.status,`${x.progress}%`,`${x.creators} creators`])); setCreators(getInfluencers().filter(x=>x.status==="Pending Review").slice(0,3).map(x=>[x.name,x.handle,x.niche,"Pending review"])); }; load(); const h=()=>load(); window.addEventListener("influxbridge:store",h); return ()=>window.removeEventListener("influxbridge:store",h); }, []);
  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.045] via-white/[0.02] to-cyan-400/[0.035] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[80px]" />
          <div className="relative">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-cyan-300/65">
              <Activity size={13} /> Live operations snapshot
            </div>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep the whole agency moving.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/35">
              Leads become campaigns, campaigns become creator work, and creator work becomes measurable delivery — all from one operating layer.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/admin/leads" className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-black hover:bg-cyan-300">
                Review pipeline <ArrowRight size={14} />
              </Link>
              <Link href="/admin/campaigns" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-2.5 text-xs text-white/55 hover:bg-white/[0.05] hover:text-white">
                Open campaigns
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Metric icon={<BriefcaseBusiness size={16}/>} label="New leads" value="6" note="Needs attention" />
          <Metric icon={<UserCheck size={16}/>} label="Creator reviews" value="12" note="Awaiting approval" />
          <Metric icon={<Activity size={16}/>} label="Active campaigns" value="3" note="Currently running" />
          <Metric icon={<DollarSign size={16}/>} label="Pipeline" value="$86.4K" note="Prototype figure" />
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <Panel title="Lead pipeline" subtitle="The latest companies entering the sales workflow." action="/admin/leads" actionLabel="View pipeline">
          <div className="space-y-1">
            {leads.map(([company, request, budget, status]) => (
              <div key={company} className="grid gap-3 rounded-xl px-3 py-4 transition hover:bg-white/[0.025] sm:grid-cols-[1fr_1.35fr_.65fr_auto] sm:items-center">
                <div><p className="text-sm font-medium">{company}</p><p className="mt-1 text-[10px] text-white/25">Company lead</p></div>
                <p className="text-xs text-white/35">{request}</p>
                <p className="text-xs text-white/45">{budget}</p>
                <span className="w-fit rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-2.5 py-1 text-[9px] text-cyan-300/80">{status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Creator review queue" subtitle="Profiles awaiting operations review." action="/admin/influencers" actionLabel="Open queue">
          <div className="space-y-2">
            {creators.map(([name, handle, niche, time]) => (
              <div key={handle} className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-black/10 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-violet-500/15 text-[10px] font-bold text-cyan-300">
                  {name.split(" ").map((x) => x[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold">{name}</p>
                  <p className="truncate text-[9px] text-white/25">{handle} · {niche}</p>
                </div>
                <span className="text-[9px] text-white/20">{time}</span>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div><p className="text-[9px] uppercase tracking-[0.2em] text-white/20">Delivery</p><h3 className="mt-2 text-lg font-semibold">Campaign pulse</h3><p className="mt-1 text-xs text-white/30">A compact view of current project health.</p></div>
          <Link href="/admin/campaigns" className="text-xs text-cyan-300 hover:text-cyan-200">All campaigns <ArrowRight size={13} className="ml-1 inline"/></Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {campaigns.map(([name, company, status, progress, creatorsCount]) => (
            <div key={name} className="rounded-2xl border border-white/[0.06] bg-black/10 p-4">
              <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold">{name}</p><p className="mt-1 text-[9px] text-white/25">{company}</p></div><span className="text-[9px] text-cyan-300/70">{status}</span></div>
              <div className="mt-5 flex items-center justify-between text-[9px] text-white/25"><span>Progress</span><span>{progress}</span></div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{width:progress}}/></div>
              <div className="mt-4 flex items-center gap-1.5 text-[9px] text-white/25"><Users size={12}/>{creatorsCount}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <Action href="/admin/leads" icon={<BriefcaseBusiness size={17}/>} title="Process leads" text="Qualify incoming company requests." />
        <Action href="/admin/influencers" icon={<UserCheck size={17}/>} title="Review creators" text="Approve profiles entering the network." />
        <Action href="/admin/campaigns" icon={<FileCheck2 size={17}/>} title="Check delivery" text="Monitor project and creator progress." />
      </section>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-4">
        <Clock3 size={16} className="mt-0.5 shrink-0 text-cyan-300/70" />
        <p className="text-[10px] leading-5 text-white/25">Prototype figures are illustrative. This admin layer is currently UI/mock-data based and will later connect to authentication, permissions and the database.</p>
      </div>
    </>
  );
}

function Metric({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-cyan-300">{icon}</div>
    <p className="mt-4 text-[10px] text-white/30">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p><p className="mt-1 text-[9px] text-white/20">{note}</p>
  </div>;
}

function Panel({ title, subtitle, action, actionLabel, children }: { title: string; subtitle: string; action: string; actionLabel: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
    <div className="flex items-end justify-between gap-4"><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-1 text-xs text-white/30">{subtitle}</p></div><Link href={action} className="shrink-0 text-xs text-cyan-300 hover:text-cyan-200">{actionLabel} <ArrowRight size={13} className="ml-1 inline"/></Link></div>
    <div className="mt-5">{children}</div>
  </section>;
}

function Action({ href, icon, title, text }: { href: string; icon: React.ReactNode; title: string; text: string }) {
  return <Link href={href} className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:-translate-y-0.5 hover:border-cyan-400/15 hover:bg-white/[0.035]">
    <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-cyan-300">{icon}</div><div><p className="text-xs font-semibold group-hover:text-cyan-300">{title}</p><p className="mt-1 text-[9px] text-white/25">{text}</p></div></div>
  </Link>;
}
