"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  FileCheck2,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: BriefcaseBusiness, badge: "6" },
  { href: "/admin/campaigns", label: "Campaigns", icon: Activity, badge: "3" },
  { href: "/admin/influencers", label: "Influencers", icon: Users, badge: "12" },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, badge: "4" },
];

const pendingInfluencers = [
  {
    name: "Ayesha Khan",
    handle: "@ayeshaknows",
    niche: "Fintech & Education",
    location: "Pakistan",
    submitted: "18 min ago",
  },
  {
    name: "Hamza Rauf",
    handle: "@hamzarauf",
    niche: "Trading & Web3",
    location: "Lahore",
    submitted: "1 hr ago",
  },
  {
    name: "Mariam Shah",
    handle: "@mariamshah",
    niche: "Lifestyle & Tech",
    location: "Islamabad",
    submitted: "3 hrs ago",
  },
];

const recentLeads = [
  {
    company: "AtlasPay",
    request: "Pakistan market entry campaign",
    budget: "$20K–$30K",
    status: "New",
    time: "24 min ago",
  },
  {
    company: "Vertex Markets",
    request: "Trading creator campaign",
    budget: "$10K–$15K",
    status: "Qualified",
    time: "2 hrs ago",
  },
  {
    company: "NovaChain",
    request: "Web3 education campaign",
    budget: "$8K–$12K",
    status: "Proposal Sent",
    time: "Yesterday",
  },
];

const campaigns = [
  {
    name: "Pakistan Market Launch",
    company: "NovaPay",
    status: "Active",
    progress: 68,
    creators: 8,
  },
  {
    name: "Digital Asset Awareness",
    company: "VaultX",
    status: "In Review",
    progress: 91,
    creators: 5,
  },
  {
    name: "Creator Launch Series",
    company: "Finora",
    status: "Completed",
    progress: 100,
    creators: 6,
  },
];

export default function AdminDashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#04060c] text-white">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#070a12]/95 backdrop-blur-2xl transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/a-logo.png"
                alt="InfluxBridge"
                className="h-9 w-9 object-contain"
              />
              <div>
                <p className="text-sm font-bold">
                  Influx<span className="text-cyan-400">Bridge</span>
                </p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Admin Console
                </p>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Close menu"
            >
              <X size={19} />
            </button>
          </div>

          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <ShieldCheck size={18} className="text-cyan-300" />
              </div>
              <div>
                <p className="text-sm font-semibold">Operations</p>
                <p className="mt-0.5 text-[10px] text-white/25">
                  Internal workspace
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                    item.href === "/admin"
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "text-white/45 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                System status
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.7)]" />
                <span className="text-xs text-white/55">
                  Prototype systems online
                </span>
              </div>
            </div>

            <Link
              href="/"
              className="mt-3 flex items-center justify-center rounded-xl px-3 py-3 text-xs text-white/35 hover:bg-white/5 hover:text-white"
            >
              Back to website
            </Link>
          </div>
        </div>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#04060c]/85 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white/60 lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={19} />
              </button>

              <div>
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cyan-300/65">
                  <Sparkles size={13} />
                  InfluxBridge Operations
                </p>
                <h1 className="mt-1 text-xl font-semibold">
                  Admin overview
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white/55 hover:bg-white/5 hover:text-white">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </button>

              <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-[10px] font-bold">
                  IB
                </div>
                <div>
                  <p className="text-[10px] font-semibold">Admin</p>
                  <p className="text-[9px] text-white/25">Operations</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1550px] px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm text-white/30">
                Tuesday, October 2, 2026
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Operations command center
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                Manage company leads, creator approvals, campaigns, deliverables,
                and internal activity from one place.
              </p>
            </div>

            <Link
              href="/admin/leads"
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
            >
              <Plus size={17} />
              Review new lead
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={<BriefcaseBusiness size={18} />}
              label="New leads"
              value="6"
              detail="Needs attention"
              tone="cyan"
            />
            <MetricCard
              icon={<UserCheck size={18} />}
              label="Creator reviews"
              value="12"
              detail="Awaiting approval"
              tone="violet"
            />
            <MetricCard
              icon={<Activity size={18} />}
              label="Active campaigns"
              value="3"
              detail="Currently running"
              tone="emerald"
            />
            <MetricCard
              icon={<DollarSign size={18} />}
              label="Pipeline value"
              value="$86.4K"
              detail="Prototype figure"
              tone="amber"
            />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
            <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <SectionHeader
                title="Recent company leads"
                subtitle="Incoming requests that need operations review."
                href="/admin/leads"
                linkLabel="View all leads"
              />

              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[680px]">
                  <div className="grid grid-cols-[1.1fr_1.5fr_.8fr_.8fr_.6fr] gap-4 border-b border-white/10 px-3 pb-3 text-[9px] uppercase tracking-[0.16em] text-white/20">
                    <span>Company</span>
                    <span>Request</span>
                    <span>Budget</span>
                    <span>Status</span>
                    <span>Received</span>
                  </div>

                  <div className="divide-y divide-white/[0.06]">
                    {recentLeads.map((lead) => (
                      <div
                        key={lead.company}
                        className="grid grid-cols-[1.1fr_1.5fr_.8fr_.8fr_.6fr] items-center gap-4 px-3 py-4"
                      >
                        <p className="text-sm font-semibold">{lead.company}</p>
                        <p className="text-xs text-white/40">{lead.request}</p>
                        <p className="text-xs text-white/50">{lead.budget}</p>
                        <span className={`w-fit rounded-full border px-2.5 py-1 text-[9px] ${
                          lead.status === "New"
                            ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                            : lead.status === "Qualified"
                              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                              : "border-violet-400/20 bg-violet-400/10 text-violet-300"
                        }`}>
                          {lead.status}
                        </span>
                        <p className="text-[10px] text-white/25">{lead.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <SectionHeader
                title="Creator reviews"
                subtitle="Profiles waiting for operations review."
                href="/admin/influencers"
                linkLabel="View creators"
              />

              <div className="mt-5 space-y-3">
                {pendingInfluencers.map((creator) => (
                  <div
                    key={creator.handle}
                    className="rounded-xl border border-white/10 bg-black/10 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-violet-500/15 text-xs font-bold text-cyan-300">
                        {creator.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {creator.name}
                        </p>
                        <p className="truncate text-[10px] text-white/30">
                          {creator.handle} · {creator.location}
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-white/20" />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] text-white/35">
                        {creator.niche}
                      </span>
                      <span className="text-[10px] text-white/20">
                        {creator.submitted}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <SectionHeader
              title="Campaign operations"
              subtitle="Current campaigns across the InfluxBridge network."
              href="/admin/campaigns"
              linkLabel="Open campaigns"
            />

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.name}
                  className="rounded-2xl border border-white/10 bg-black/10 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{campaign.name}</p>
                      <p className="mt-1 text-[10px] text-white/25">
                        {campaign.company}
                      </p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[9px] ${
                      campaign.status === "Active"
                        ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                        : campaign.status === "In Review"
                          ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                          : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                    }`}>
                      {campaign.status}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-[10px]">
                      <span className="text-white/25">Progress</span>
                      <span className="text-white/55">
                        {campaign.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[10px] text-white/30">
                    <Users size={13} />
                    {campaign.creators} assigned creators
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <QuickAction
              icon={<UserCheck size={18} />}
              title="Review influencers"
              description="Approve or reject pending creator profiles."
              href="/admin/influencers"
            />
            <QuickAction
              icon={<BriefcaseBusiness size={18} />}
              title="Process leads"
              description="Move incoming companies through the sales pipeline."
              href="/admin/leads"
            />
            <QuickAction
              icon={<FileCheck2 size={18} />}
              title="Review campaign work"
              description="Check active campaigns and deliverable activity."
              href="/admin/campaigns"
            />
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5">
            <Clock3 size={18} className="mt-0.5 shrink-0 text-cyan-300" />
            <div>
              <p className="text-sm font-medium">Admin prototype foundation</p>
              <p className="mt-1 text-xs leading-5 text-white/35">
                The figures and records on this screen are mock data. The next
                stage will connect these views through shared data models and
                then replace the prototype state with real authentication and
                database-backed operations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: "cyan" | "violet" | "emerald" | "amber";
}) {
  const styles = {
    cyan: "border-cyan-400/15 bg-cyan-400/[0.04] text-cyan-300",
    violet: "border-violet-400/15 bg-violet-400/[0.04] text-violet-300",
    emerald: "border-emerald-400/15 bg-emerald-400/[0.04] text-emerald-300",
    amber: "border-amber-400/15 bg-amber-400/[0.04] text-amber-300",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl border ${styles[tone]}`}
      >
        {icon}
      </div>
      <p className="mt-5 text-xs text-white/35">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-[10px] text-white/20">{detail}</p>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel,
}: {
  title: string;
  subtitle: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-xs text-white/30">{subtitle}</p>
      </div>
      <Link
        href={href}
        className="flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200"
      >
        {linkLabel}
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/20 hover:bg-white/[0.04]"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold group-hover:text-cyan-300">
            {title}
          </p>
          <p className="mt-1 text-xs leading-5 text-white/30">
            {description}
          </p>
        </div>
        <ChevronRight
          size={17}
          className="mt-1 text-white/20 transition group-hover:translate-x-1 group-hover:text-cyan-300"
        />
      </div>
    </Link>
  );
}
