"use client";

import Link from "next/link";
import {
  ArrowLeft,
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
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { getCampaigns } from "@/lib/platform";

type CampaignStatus = "Active" | "In Review" | "Completed";

type Campaign = {
  id: string;
  title: string;
  category: string;
  status: CampaignStatus;
  creators: number;
  budget: string;
  reach: string;
  deadline: string;
  progress: number;
  description: string;
};

const campaigns: Campaign[] = getCampaigns().map((x) => ({ id:x.id, title:x.name, category:x.category, status:x.status, creators:x.creators, budget:`$${x.budget.toLocaleString()}`, reach:x.reach, deadline:new Date(x.deadline).toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"}), progress:x.progress, description:x.description }));

const statusStyles: Record<CampaignStatus, string> = {
  Active: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  "In Review": "border-amber-400/20 bg-amber-400/10 text-amber-300",
  Completed:
    "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
};

export default function CompanyCampaignsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | CampaignStatus>("All");
  const [search, setSearch] = useState("");

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesFilter =
      filter === "All" || campaign.status === filter;

    const query = search.toLowerCase();

    const matchesSearch =
      campaign.title.toLowerCase().includes(query) ||
      campaign.category.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#080b13]/95 backdrop-blur-xl transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <Link href="/">
              <img
                src="/a-logo.png"
                alt="InfluxBridge"
                className="h-9 w-auto"
              />
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <div className="border-b border-white/10 px-6 py-5">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/60">
              Company Portal
            </p>

            <p className="mt-2 text-sm font-semibold">
              NovaPay
            </p>

            <p className="mt-1 text-xs text-white/30">
              Pakistan market account
            </p>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            <SidebarLink
              href="/dashboard/company"
              icon={<Home size={18} />}
              label="Overview"
            />

            <SidebarLink
              href="/dashboard/company/campaigns"
              icon={<BriefcaseBusiness size={18} />}
              label="Campaigns"
              active
            />

            <SidebarLink
              href="/dashboard/company/influencers"
              icon={<Users size={18} />}
              label="Creator Network"
            />

            <SidebarLink
              href="/dashboard/company/messages"
              icon={<MessageSquare size={18} />}
              label="Messages"
              badge="2"
            />
          </nav>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/contact"
              className="flex items-center justify-between rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
            >
              Request Campaign
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/"
              className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/40 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to website
            </Link>
          </div>
        </div>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/85 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-xl border border-white/10 p-2 lg:hidden"
              >
                <Menu size={19} />
              </button>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
                  Company Portal
                </p>

                <h1 className="mt-1 text-xl font-semibold">
                  Campaigns
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative rounded-xl border border-white/10 p-2.5 text-white/60 hover:bg-white/5">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </button>

              <div className="hidden h-10 items-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-white/50 sm:flex">
                NP
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm text-cyan-300">
                <Sparkles size={15} />
                Campaign operations
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Your campaigns
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                Track campaign progress, creator activity, deliverables,
                reach, and project status from one workspace.
              </p>
            </div>

            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-300"
            >
              <Plus size={17} />
              Request campaign
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<BriefcaseBusiness size={18} />}
              label="Total campaigns"
              value="8"
              detail="Across your account"
            />

            <StatCard
              icon={<TrendingUp size={18} />}
              label="Active campaigns"
              value="2"
              detail="Currently running"
            />

            <StatCard
              icon={<Users size={18} />}
              label="Creators engaged"
              value="31"
              detail="Across all campaigns"
            />

            <StatCard
              icon={<DollarSign size={18} />}
              label="Campaign budget"
              value="$42.8K"
              detail="Prototype figure"
            />
          </div>

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
                          : "border-white/10 text-white/45 hover:bg-white/5 hover:text-white"
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
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search campaigns..."
                    className="h-10 w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 text-sm outline-none placeholder:text-white/20 focus:border-cyan-400/30"
                  />
                </div>

                <button className="flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm text-white/45 hover:bg-white/5 hover:text-white">
                  <Filter size={16} />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/dashboard/company/campaigns/${campaign.id}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-cyan-400/20 hover:bg-white/[0.04]"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                  <div className="flex min-w-0 flex-1 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <BriefcaseBusiness size={20} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold group-hover:text-cyan-300">
                          {campaign.title}
                        </h3>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] ${statusStyles[campaign.status]}`}
                        >
                          {campaign.status}
                        </span>
                      </div>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                        {campaign.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/30">
                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          {campaign.creators} creators
                        </span>

                        <span className="flex items-center gap-1.5">
                          <DollarSign size={14} />
                          {campaign.budget}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <TrendingUp size={14} />
                          {campaign.reach} estimated reach
                        </span>

                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {campaign.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-64">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-white/30">
                        Progress
                      </span>

                      <span className="text-white/65">
                        {campaign.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                        style={{
                          width: `${campaign.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <ChevronRight
                    size={20}
                    className="shrink-0 text-white/20 transition group-hover:translate-x-1 group-hover:text-cyan-300"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5">
            <Clock3
              size={18}
              className="mt-0.5 shrink-0 text-cyan-300"
            />

            <div>
              <p className="text-sm font-medium">
                Prototype campaign workspace
              </p>

              <p className="mt-1 text-xs leading-5 text-white/35">
                Campaign budgets, reach, statuses, and performance values
                are mock data for the current website prototype.
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
          ? "bg-cyan-400/10 text-cyan-300"
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
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
        {icon}
      </div>

      <p className="mt-5 text-xs text-white/35">{label}</p>

      <p className="mt-1 text-2xl font-semibold">{value}</p>

      <p className="mt-1 text-[10px] text-white/20">{detail}</p>
    </div>
  );
}