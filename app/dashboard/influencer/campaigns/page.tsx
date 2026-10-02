"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  Filter,
  Home,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

type CampaignStatus = "Active" | "In Review" | "Completed";

type Campaign = {
  id: string;
  client: string;
  title: string;
  status: CampaignStatus;
  category: string;
  deadline: string;
  budget: string;
  deliverables: string;
  progress: number;
  manager: string;
  managerInitials: string;
};

const campaigns: Campaign[] = [
  {
    id: "novapay-market-launch",
    client: "NovaPay",
    title: "Pakistan Market Launch",
    status: "Active",
    category: "Fintech",
    deadline: "Oct 18, 2026",
    budget: "$1,200",
    deliverables: "3 / 5",
    progress: 60,
    manager: "Sarah Khan",
    managerInitials: "SK",
  },
  {
    id: "vaultx-awareness",
    client: "VaultX",
    title: "Digital Asset Awareness",
    status: "In Review",
    category: "Web3",
    deadline: "Oct 09, 2026",
    budget: "$850",
    deliverables: "4 / 4",
    progress: 92,
    manager: "Ali Raza",
    managerInitials: "AR",
  },
  {
    id: "finora-launch",
    client: "Finora",
    title: "Creator Launch Series",
    status: "Completed",
    category: "Fintech",
    deadline: "Sep 21, 2026",
    budget: "$1,050",
    deliverables: "6 / 6",
    progress: 100,
    manager: "Sarah Khan",
    managerInitials: "SK",
  },
];

const statusStyles: Record<CampaignStatus, string> = {
  Active:
    "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  "In Review":
    "border-amber-400/20 bg-amber-400/10 text-amber-300",
  Completed:
    "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
};

export default function InfluencerCampaignsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | CampaignStatus>("All");
  const [search, setSearch] = useState("");

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesFilter =
      filter === "All" || campaign.status === filter;

    const query = search.toLowerCase();

    const matchesSearch =
      campaign.title.toLowerCase().includes(query) ||
      campaign.client.toLowerCase().includes(query) ||
      campaign.category.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[140px]" />
        <div className="absolute right-0 top-[30%] h-[450px] w-[450px] rounded-full bg-violet-500/5 blur-[140px]" />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#080b13]/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <Link href="/" className="flex items-center">
              <img
                src="/a-logo.png"
                alt="InfluxBridge"
                className="h-9 w-auto"
              />
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-sm font-bold text-cyan-300">
                AM
              </div>

              <div>
                <p className="text-sm font-semibold">Ahmed Malik</p>
                <p className="text-xs text-white/40">Creator account</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            <SidebarLink
              href="/dashboard/influencer"
              icon={<Home size={18} />}
              label="Overview"
            />

            <SidebarLink
              href="/dashboard/influencer/campaigns"
              icon={<BriefcaseBusiness size={18} />}
              label="Campaigns"
              active
            />

            <SidebarLink
              href="/dashboard/influencer/messages"
              icon={<MessageSquare size={18} />}
              label="Messages"
              badge="3"
            />

            <SidebarLink
              href="/dashboard/influencer/profile"
              icon={<Users size={18} />}
              label="My Profile"
            />
          </nav>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowRight size={18} className="rotate-180" />
              Back to website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/80 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-xl border border-white/10 p-2.5 text-white/70 hover:bg-white/5 lg:hidden"
              >
                <Menu size={20} />
              </button>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
                  Creator Portal
                </p>
                <h1 className="mt-1 text-xl font-semibold">
                  Campaigns
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative rounded-xl border border-white/10 p-2.5 text-white/60 hover:bg-white/5 hover:text-white">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </button>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold sm:flex">
                AM
              </div>
            </div>
          </div>
        </header>

        <div className="relative mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
          {/* Heading */}
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm text-cyan-300">
                <Sparkles size={15} />
                Your opportunities
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Campaign workspace
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                Manage active collaborations, review deliverables,
                track deadlines, and stay connected with the
                InfluxBridge campaign team.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<BriefcaseBusiness size={18} />}
              label="Total campaigns"
              value="12"
              detail="+2 this month"
            />

            <StatCard
              icon={<TrendingUp size={18} />}
              label="Active campaigns"
              value="2"
              detail="Currently running"
            />

            <StatCard
              icon={<DollarSign size={18} />}
              label="Campaign earnings"
              value="$8,420"
              detail="Mock account data"
            />

            <StatCard
              icon={<CheckCircle2 size={18} />}
              label="Completed"
              value="9"
              detail="Successful deliverables"
            />
          </div>

          {/* Filters */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap gap-2">
                {(["All", "Active", "In Review", "Completed"] as const).map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`rounded-xl border px-4 py-2 text-sm transition ${
                        filter === item
                          ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                          : "border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1 xl:w-72">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search campaigns..."
                    className="h-10 w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-400/30"
                  />
                </div>

                <button className="flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm text-white/50 hover:bg-white/5 hover:text-white">
                  <Filter size={16} />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Campaign list */}
          <div className="mt-6 space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/dashboard/influencer/campaigns/${campaign.id}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/20 hover:bg-white/[0.04]"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300">
                      <BriefcaseBusiness size={20} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold group-hover:text-cyan-300">
                          {campaign.title}
                        </h3>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] ${statusStyles[campaign.status]}`}
                        >
                          {campaign.status}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-white/45">
                        {campaign.client} · {campaign.category}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/35">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {campaign.deadline}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <DollarSign size={14} />
                          {campaign.budget}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 size={14} />
                          {campaign.deliverables} deliverables
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-64">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-white/35">Campaign progress</span>
                      <span className="text-white/70">
                        {campaign.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 xl:w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold">
                        {campaign.managerInitials}
                      </div>

                      <div>
                        <p className="text-[11px] text-white/30">
                          Campaign manager
                        </p>
                        <p className="text-xs text-white/70">
                          {campaign.manager}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={19}
                      className="text-white/25 transition group-hover:translate-x-1 group-hover:text-cyan-300"
                    />
                  </div>
                </div>
              </Link>
            ))}

            {filteredCampaigns.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
                <Search
                  size={28}
                  className="mx-auto text-white/20"
                />
                <p className="mt-4 text-sm text-white/50">
                  No campaigns match your search.
                </p>
              </div>
            )}
          </div>

          {/* Bottom note */}
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5">
            <Clock3
              size={18}
              className="mt-0.5 shrink-0 text-cyan-300"
            />

            <div>
              <p className="text-sm font-medium">
                Campaign data is currently a prototype
              </p>

              <p className="mt-1 text-xs leading-5 text-white/40">
                Statuses, earnings, deadlines, and campaign activity
                shown here use mock data. Production values will come
                from the InfluxBridge campaign system.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active = false,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
        active
          ? "border border-cyan-400/10 bg-cyan-400/10 text-cyan-300"
          : "text-white/45 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>

      {badge && (
        <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-300">
          {badge}
        </span>
      )}
    </Link>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
          {icon}
        </div>

        <MoreHorizontal size={17} className="text-white/20" />
      </div>

      <p className="mt-5 text-xs text-white/35">{label}</p>

      <div className="mt-1 flex items-end gap-2">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="pb-1 text-[10px] text-white/25">
          {detail}
        </span>
      </div>
    </div>
  );
}