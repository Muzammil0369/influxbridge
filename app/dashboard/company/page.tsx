"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type CampaignStatus = "Active" | "In Review" | "Completed";

type Campaign = {
  name: string;
  creator: string;
  category: string;
  status: CampaignStatus;
  progress: number;
  budget: string;
  deadline: string;
};

const campaigns: Campaign[] = [
  {
    name: "Pakistan Market Launch",
    creator: "InfluxBridge Creator Network",
    category: "Fintech",
    status: "Active",
    progress: 72,
    budget: "$8,500",
    deadline: "Sep 28, 2026",
  },
  {
    name: "Crypto Education Series",
    creator: "Curated Creator Team",
    category: "Web3",
    status: "In Review",
    progress: 45,
    budget: "$5,200",
    deadline: "Oct 06, 2026",
  },
  {
    name: "Community Awareness",
    creator: "InfluxBridge Network",
    category: "Community",
    status: "Completed",
    progress: 100,
    budget: "$3,800",
    deadline: "Sep 12, 2026",
  },
];

const activities = [
  {
    icon: FileText,
    title: "Campaign brief updated",
    description: "Pakistan Market Launch",
    time: "18 min ago",
  },
  {
    icon: CheckCircle2,
    title: "Deliverable approved",
    description: "Crypto Education Series",
    time: "2 hours ago",
  },
  {
    icon: MessageSquare,
    title: "New message from InfluxBridge",
    description: "Campaign manager sent an update",
    time: "5 hours ago",
  },
  {
    icon: WalletCards,
    title: "Payment milestone recorded",
    description: "Community Awareness",
    time: "Yesterday",
  },
];

const recommendations = [
  {
    initials: "AK",
    name: "Ahmed Khan",
    niche: "Crypto & Fintech",
    followers: "420K",
    engagement: "5.8%",
  },
  {
    initials: "SA",
    name: "Sara Ahmed",
    niche: "Finance & Lifestyle",
    followers: "285K",
    engagement: "6.2%",
  },
  {
    initials: "HM",
    name: "Hamza Malik",
    niche: "Trading & Web3",
    followers: "610K",
    engagement: "4.9%",
  },
];

export default function CompanyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCampaignFilter, setActiveCampaignFilter] = useState("All");

  const filteredCampaigns =
    activeCampaignFilter === "All"
      ? campaigns
      : campaigns.filter((campaign) => campaign.status === activeCampaignFilter);

  return (
    <main className="min-h-screen bg-[#050711] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-600/5 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative flex min-h-screen">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-white/10 bg-[#070914]/95 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <img
                  src="/a-logo.png"
                  alt="InfluxBridge"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="text-sm font-bold tracking-wide">
                  Influx<span className="text-cyan-400">Bridge</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Company Portal
                </div>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          {/* Company */}
          <div className="border-b border-white/10 px-5 py-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-sm font-bold text-cyan-300">
                  NP
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    NovaPay
                  </div>
                  <div className="truncate text-xs text-white/40">
                    fintech company
                  </div>
                </div>

                <ChevronDown size={15} className="ml-auto text-white/30" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-5">
            <SidebarLink
              href="/dashboard/company"
              icon={<LayoutDashboard size={18} />}
              label="Overview"
              active
            />

            <SidebarLink
              href="#campaigns"
              icon={<BriefcaseBusiness size={18} />}
              label="Campaigns"
              badge="3"
            />

            <SidebarLink
              href="#creators"
              icon={<Users size={18} />}
              label="Creator Network"
            />

            <SidebarLink
              href="#messages"
              icon={<MessageSquare size={18} />}
              label="Messages"
              badge="2"
            />

            <SidebarLink
              href="#deliverables"
              icon={<FileText size={18} />}
              label="Deliverables"
            />

            <SidebarLink
              href="#payments"
              icon={<WalletCards size={18} />}
              label="Payments"
            />

            <div className="my-5 h-px bg-white/10" />

            <SidebarLink
              href="#settings"
              icon={<Settings size={18} />}
              label="Company Settings"
            />
          </nav>

          {/* Support */}
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles size={15} className="text-cyan-300" />
                <span className="text-xs font-semibold text-cyan-200">
                  Need campaign support?
                </span>
              </div>

              <p className="text-xs leading-5 text-white/40">
                Your InfluxBridge campaign manager is available to help.
              </p>

              <button className="mt-3 flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200">
                Contact team
                <ArrowRight size={13} />
              </button>
            </div>

            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 transition hover:bg-white/5 hover:text-white"
            >
              <LogOut size={17} />
              Back to website
            </Link>
          </div>
        </aside>

        {/* Main */}
        <section className="min-w-0 flex-1">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#050711]/75 px-5 backdrop-blur-2xl sm:px-8 lg:px-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70 lg:hidden"
              >
                <Menu size={19} />
              </button>

              <div>
                <div className="text-xs text-white/35">Company Portal</div>
                <h1 className="text-lg font-semibold">Good morning, NovaPay</h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button className="hidden rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-white/45 transition hover:border-white/20 hover:text-white sm:flex sm:items-center sm:gap-2">
                <Search size={16} />
                <span className="text-xs">Search</span>
              </button>

              <button className="relative rounded-xl border border-white/10 bg-white/[0.035] p-2.5 text-white/55 transition hover:border-white/20 hover:text-white">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </button>

              <div className="hidden h-8 w-px bg-white/10 sm:block" />

              <div className="hidden items-center gap-3 sm:flex">
                <div className="text-right">
                  <div className="text-xs font-semibold">NovaPay</div>
                  <div className="text-[10px] text-white/35">
                    Company account
                  </div>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-xs font-bold text-cyan-300">
                  NP
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Hero */}
            <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  <Zap size={12} />
                  Market Campaigns
                </div>

                <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Turn your Pakistan market strategy into{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text text-transparent">
                    measurable campaigns.
                  </span>
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45 sm:text-base">
                  Manage your InfluxBridge campaigns, review curated creators,
                  track deliverables and stay connected with your campaign
                  team from one workspace.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:scale-[1.02]"
              >
                <Plus size={17} />
                Request a Campaign
              </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<BriefcaseBusiness size={19} />}
                label="Active campaigns"
                value="2"
                detail="1 campaign awaiting review"
              />

              <StatCard
                icon={<TrendingUp size={19} />}
                label="Campaign reach"
                value="1.31M"
                detail="Across current campaigns"
              />

              <StatCard
                icon={<FileText size={19} />}
                label="Deliverables"
                value="14"
                detail="11 approved · 3 pending"
              />

              <StatCard
                icon={<DollarSign size={19} />}
                label="Committed budget"
                value="$17.5K"
                detail="Across active projects"
              />
            </div>

            {/* Main grid */}
            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              {/* Left */}
              <div className="min-w-0 space-y-6">
                {/* Campaigns */}
                <section
                  id="campaigns"
                  className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
                >
                  <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Your campaigns</h3>
                      <p className="mt-1 text-xs text-white/35">
                        Campaigns managed through InfluxBridge.
                      </p>
                    </div>

                    <div className="flex w-fit items-center rounded-xl border border-white/10 bg-black/20 p-1">
                      {["All", "Active", "In Review", "Completed"].map(
                        (filter) => (
                          <button
                            key={filter}
                            onClick={() => setActiveCampaignFilter(filter)}
                            className={`rounded-lg px-3 py-2 text-[11px] font-semibold transition ${
                              activeCampaignFilter === filter
                                ? "bg-white/10 text-white"
                                : "text-white/35 hover:text-white/70"
                            }`}
                          >
                            {filter}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredCampaigns.map((campaign) => (
                      <CampaignRow
                        key={campaign.name}
                        campaign={campaign}
                      />
                    ))}
                  </div>
                </section>

                {/* Performance */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Campaign performance
                      </h3>
                      <p className="mt-1 text-xs text-white/35">
                        Illustrative dashboard metrics for the prototype.
                      </p>
                    </div>

                    <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/50 hover:text-white">
                      Last 30 days
                      <ChevronDown
                        size={13}
                        className="ml-1 inline-block"
                      />
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <PerformanceCard
                      label="Estimated impressions"
                      value="842K"
                      change="+18.4%"
                    />
                    <PerformanceCard
                      label="Engagements"
                      value="51.8K"
                      change="+12.7%"
                    />
                    <PerformanceCard
                      label="Engagement rate"
                      value="6.15%"
                      change="+0.8%"
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-white/35">
                        Weekly campaign activity
                      </span>

                      <span className="text-xs font-semibold text-cyan-300">
                        +24%
                      </span>
                    </div>

                    <div className="flex h-32 items-end gap-2 sm:gap-3">
                      {[34, 47, 42, 68, 54, 79, 64, 91, 73, 100, 84, 94].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="group flex h-full flex-1 items-end"
                          >
                            <div
                              className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/20 to-cyan-300/70 transition group-hover:from-cyan-400/30 group-hover:to-cyan-200"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-3 flex justify-between text-[10px] text-white/20">
                      <span>Week 1</span>
                      <span>Week 2</span>
                      <span>Week 3</span>
                      <span>Week 4</span>
                    </div>
                  </div>
                </section>

                {/* Recommended creators */}
                <section
                  id="creators"
                  className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
                >
                  <div className="mb-5 flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Curated creators
                      </h3>
                      <p className="mt-1 text-xs text-white/35">
                        Suggested by InfluxBridge based on your campaign goals.
                      </p>
                    </div>

                    <Link
                      href="/influencers"
                      className="hidden items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200 sm:flex"
                    >
                      Explore network
                      <ArrowRight size={13} />
                    </Link>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {recommendations.map((creator) => (
                      <CreatorCard key={creator.name} creator={creator} />
                    ))}
                  </div>

                  <Link
                    href="/influencers"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-white/60 transition hover:border-cyan-400/20 hover:text-white sm:hidden"
                  >
                    Explore creator network
                    <ArrowRight size={13} />
                  </Link>
                </section>
              </div>

              {/* Right */}
              <div className="space-y-6">
                {/* Campaign manager */}
                <section className="rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.08] to-violet-500/[0.06] p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                        Your campaign manager
                      </div>
                      <h3 className="mt-1 text-lg font-semibold">
                        InfluxBridge Team
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Sparkles size={19} className="text-cyan-300" />
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-white/45">
                    Your dedicated team coordinates creator selection,
                    campaign execution, content review and reporting.
                  </p>

                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-white transition hover:bg-white/10">
                    <MessageSquare size={15} />
                    Message InfluxBridge
                  </button>
                </section>

                {/* Current request */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Current request</h3>
                      <p className="mt-1 text-xs text-white/35">
                        Pakistan market campaign
                      </p>
                    </div>

                    <span className="rounded-full border border-amber-400/15 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold text-amber-300">
                      In review
                    </span>
                  </div>

                  <div className="space-y-4">
                    <InfoRow
                      icon={<BriefcaseBusiness size={15} />}
                      label="Campaign type"
                      value="Market Launch"
                    />

                    <InfoRow
                      icon={<Users size={15} />}
                      label="Creator requirement"
                      value="5–8 creators"
                    />

                    <InfoRow
                      icon={<DollarSign size={15} />}
                      label="Estimated budget"
                      value="$8K–$12K"
                    />

                    <InfoRow
                      icon={<CalendarDays size={15} />}
                      label="Target launch"
                      value="October 2026"
                    />
                  </div>

                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-xs font-semibold text-white transition hover:bg-white/15">
                    View request
                    <ArrowRight size={14} />
                  </button>
                </section>

                {/* Recent activity */}
                <section
                  id="messages"
                  className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Recent activity</h3>
                      <p className="mt-1 text-xs text-white/35">
                        Latest workspace updates
                      </p>
                    </div>

                    <button className="rounded-lg p-2 text-white/30 hover:bg-white/5 hover:text-white">
                      <MoreHorizontal size={17} />
                    </button>
                  </div>

                  <div className="space-y-5">
                    {activities.map((activity, index) => {
                      const Icon = activity.icon;

                      return (
                        <div
                          key={`${activity.title}-${index}`}
                          className="flex gap-3"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                            <Icon size={15} />
                          </div>

                          <div className="min-w-0">
                            <div className="text-xs font-semibold">
                              {activity.title}
                            </div>
                            <div className="mt-1 text-[11px] text-white/35">
                              {activity.description}
                            </div>
                            <div className="mt-1 text-[10px] text-white/20">
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Upcoming */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Clock3 size={16} className="text-violet-300" />
                    <h3 className="font-semibold">Upcoming</h3>
                  </div>

                  <div className="space-y-3">
                    <UpcomingItem
                      date="SEP 22"
                      title="Creator shortlist review"
                      campaign="Pakistan Market Launch"
                    />

                    <UpcomingItem
                      date="SEP 25"
                      title="Content review"
                      campaign="Crypto Education Series"
                    />

                    <UpcomingItem
                      date="SEP 28"
                      title="Campaign milestone"
                      campaign="Pakistan Market Launch"
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 border-t border-white/10 pt-6 text-center text-[11px] text-white/20">
              InfluxBridge Company Portal · Prototype dashboard using mock data
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

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
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
        active
          ? "border border-cyan-400/10 bg-cyan-400/[0.08] text-cyan-200"
          : "text-white/45 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className={active ? "text-cyan-300" : "text-white/35"}>
        {icon}
      </span>

      <span className="flex-1">{label}</span>

      {badge && (
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/45">
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
    <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-white/15">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
          {icon}
        </div>

        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400/70" />
      </div>

      <div className="text-2xl font-bold tracking-tight">{value}</div>

      <div className="mt-1 text-xs font-medium text-white/50">{label}</div>

      <div className="mt-2 text-[10px] text-white/25">{detail}</div>
    </div>
  );
}

function CampaignRow({ campaign }: { campaign: Campaign }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-black/15 p-4 transition hover:border-white/15 hover:bg-white/[0.035]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-500/10">
            <BriefcaseBusiness size={18} className="text-cyan-300" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="truncate text-sm font-semibold">
                {campaign.name}
              </h4>

              <StatusBadge status={campaign.status} />
            </div>

            <div className="mt-1 text-[11px] text-white/30">
              {campaign.category} · {campaign.creator}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 sm:flex sm:items-center lg:w-[390px]">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/20">
              Progress
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>

              <span className="text-[10px] text-white/40">
                {campaign.progress}%
              </span>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/20">
              Budget
            </div>
            <div className="mt-2 text-xs font-semibold text-white/70">
              {campaign.budget}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/20">
              Deadline
            </div>
            <div className="mt-2 text-xs text-white/50">
              {campaign.deadline}
            </div>
          </div>
        </div>

        <button className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/55 transition hover:bg-white/10 hover:text-white">
          View
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  const styles = {
    Active: "border-cyan-400/15 bg-cyan-400/10 text-cyan-300",
    "In Review": "border-amber-400/15 bg-amber-400/10 text-amber-300",
    Completed: "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
  };

  return (
    <span
      className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PerformanceCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
      <div className="text-[10px] text-white/30">{label}</div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="text-xl font-bold">{value}</div>

        <span className="text-[10px] font-semibold text-emerald-300">
          {change}
        </span>
      </div>
    </div>
  );
}

function CreatorCard({
  creator,
}: {
  creator: {
    initials: string;
    name: string;
    niche: string;
    followers: string;
    engagement: string;
  };
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-4 transition hover:border-cyan-400/15 hover:bg-white/[0.035]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-xs font-bold text-cyan-300">
          {creator.initials}
        </div>

        <div className="min-w-0">
          <div className="truncate text-xs font-semibold">{creator.name}</div>
          <div className="mt-1 truncate text-[10px] text-white/30">
            {creator.niche}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <MiniMetric label="Followers" value={creator.followers} />
        <MiniMetric label="Engagement" value={creator.engagement} />
      </div>

      <button className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-[10px] font-semibold text-white/50 transition hover:bg-white/10 hover:text-white">
        Request creator shortlist
      </button>
    </div>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.025] p-2.5">
      <div className="text-[9px] text-white/20">{label}</div>
      <div className="mt-1 text-xs font-semibold text-white/65">{value}</div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/40">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[10px] text-white/25">{label}</div>
        <div className="mt-0.5 truncate text-xs font-medium text-white/65">
          {value}
        </div>
      </div>
    </div>
  );
}

function UpcomingItem({
  date,
  title,
  campaign,
}: {
  date: string;
  title: string;
  campaign: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex h-10 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-white/5">
        <div className="text-[8px] font-bold text-cyan-300">{date.split(" ")[0]}</div>
        <div className="text-[10px] font-bold text-white/60">
          {date.split(" ")[1]}
        </div>
      </div>

      <div className="min-w-0">
        <div className="truncate text-xs font-semibold">{title}</div>
        <div className="mt-1 truncate text-[10px] text-white/30">
          {campaign}
        </div>
      </div>
    </div>
  );
}