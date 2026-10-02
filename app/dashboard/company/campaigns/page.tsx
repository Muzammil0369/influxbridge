"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getCampaigns } from "@/lib/platform";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  Filter,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

type CampaignStatus = "Active" | "In Review" | "Completed";

type Campaign = {
  id: string;
  name: string;
  client: string;
  status: CampaignStatus;
  progress: number;
  budget: string;
  reach: string;
  creators: number;
  deadline: string;
  description: string;
};

const campaigns: Campaign[] = getCampaigns().map((x) => ({ id:x.id, name:x.name, client:x.client, status:x.status, progress:x.progress, budget:`$${x.budget.toLocaleString()}`, reach:x.reach, creators:x.creators, deadline:new Date(x.deadline).toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"}), description:x.description }));

const filters = ["All", "Active", "In Review", "Completed"] as const;

export default function CompanyCampaignsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>(
    "All"
  );
  const [search, setSearch] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesFilter =
        activeFilter === "All" || campaign.status === activeFilter;

      const query = search.toLowerCase();

      const matchesSearch =
        campaign.name.toLowerCase().includes(query) ||
        campaign.client.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#070a12] lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <BriefcaseBusiness className="h-5 w-5 text-cyan-300" />
              </div>

              <div>
                <div className="font-semibold tracking-tight">
                  InfluxBridge
                </div>
                <div className="text-xs text-white/40">
                  Company Portal
                </div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            <SidebarLink
              href="/dashboard/company"
              icon={<LayoutDashboard className="h-4 w-4" />}
              label="Overview"
            />

            <SidebarLink
              href="/dashboard/company/campaigns"
              icon={<BarChart3 className="h-4 w-4" />}
              label="Campaigns"
              active
            />

            <SidebarLink
              href="/dashboard/company/influencers"
              icon={<Users className="h-4 w-4" />}
              label="Creator Network"
            />

            <SidebarLink
              href="/dashboard/company/messages"
              icon={<MessageSquare className="h-4 w-4" />}
              label="Messages"
            />
          </nav>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </Link>
          </div>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">
          {/* HEADER */}
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05070d]/90 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
                  Company Portal
                </div>
                <h1 className="mt-1 text-xl font-semibold sm:text-2xl">
                  Campaigns
                </h1>
              </div>

              <button
                onClick={() => setShowRequestModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-300"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Request Campaign</span>
                <span className="sm:hidden">Request</span>
              </button>
            </div>
          </header>

          <div className="px-5 py-8 sm:px-8">
            {/* INTRO */}
            <div className="mb-8 max-w-3xl">
              <p className="text-sm leading-7 text-white/50">
                Track campaigns managed by InfluxBridge, review project
                progress, monitor creator activity and access campaign
                workspaces.
              </p>
            </div>

            {/* STATS */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total Campaigns"
                value="3"
                icon={<BriefcaseBusiness className="h-5 w-5" />}
              />

              <StatCard
                label="Active Campaigns"
                value="1"
                icon={<Clock3 className="h-5 w-5" />}
              />

              <StatCard
                label="Campaign Reach"
                value="9.8M"
                icon={<Users className="h-5 w-5" />}
              />

              <StatCard
                label="Committed Budget"
                value="$40.3K"
                icon={<DollarSign className="h-5 w-5" />}
              />
            </div>

            {/* TOOLBAR */}
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                {/* FILTERS */}
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-lg px-4 py-2 text-sm transition ${
                        activeFilter === filter
                          ? "bg-cyan-400 text-black"
                          : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* SEARCH */}
                <div className="relative w-full xl:w-80">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search campaigns..."
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-400/40"
                  />
                </div>
              </div>
            </div>

            {/* CAMPAIGNS */}
            <div className="space-y-5">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                />
              ))}

              {filteredCampaigns.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
                  <Filter className="mx-auto mb-4 h-8 w-8 text-white/20" />

                  <h3 className="font-medium">
                    No campaigns found
                  </h3>

                  <p className="mt-2 text-sm text-white/40">
                    Try changing your filter or search query.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* REQUEST CAMPAIGN MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0a0e18] p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mb-2 inline-flex rounded-lg bg-cyan-400/10 p-2">
                  <Plus className="h-5 w-5 text-cyan-300" />
                </div>

                <h2 className="text-xl font-semibold">
                  Request a Campaign
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Share your campaign requirements with the InfluxBridge
                  team. The team will review your request and prepare the
                  appropriate campaign plan.
                </p>
              </div>

              <button
                onClick={() => setShowRequestModal(false)}
                className="rounded-lg p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-medium">
                  What happens next?
                </div>

                <div className="mt-3 space-y-3 text-sm text-white/50">
                  <div className="flex gap-3">
                    <span className="text-cyan-300">01</span>
                    Submit your campaign requirements.
                  </div>

                  <div className="flex gap-3">
                    <span className="text-cyan-300">02</span>
                    InfluxBridge reviews your brief.
                  </div>

                  <div className="flex gap-3">
                    <span className="text-cyan-300">03</span>
                    Your team receives a managed campaign proposal.
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                onClick={() => setShowRequestModal(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
              >
                Continue to Campaign Request
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
        active
          ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
          : "text-white/50 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-cyan-300">
          {icon}
        </div>
      </div>

      <div className="text-2xl font-semibold">{value}</div>

      <div className="mt-1 text-sm text-white/40">{label}</div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const statusStyles = {
    Active: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    "In Review": "bg-amber-400/10 text-amber-300 border-amber-400/20",
    Completed: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-white/15 sm:p-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                statusStyles[campaign.status]
              }`}
            >
              {campaign.status}
            </span>

            <span className="text-xs text-white/30">
              {campaign.client}
            </span>
          </div>

          <h2 className="text-xl font-semibold">
            {campaign.name}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
            {campaign.description}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-4">
            <Metric
              label="Budget"
              value={campaign.budget}
            />

            <Metric
              label="Estimated Reach"
              value={campaign.reach}
            />

            <Metric
              label="Creators"
              value={String(campaign.creators)}
            />

            <Metric
              label="Deadline"
              value={campaign.deadline}
            />
          </div>
        </div>

        <div className="w-full shrink-0 xl:w-72">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-white/40">Progress</span>
            <span className="font-medium">
              {campaign.progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-400"
              style={{ width: `${campaign.progress}%` }}
            />
          </div>

          <Link
            href={`/dashboard/company/campaigns/${campaign.id}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
          >
            Open Campaign
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-xs text-white/30">
        {label}
      </div>

      <div className="mt-1 text-sm font-medium text-white/80">
        {value}
      </div>
    </div>
  );
}