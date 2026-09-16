"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Settings,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

const campaigns = [
  {
    name: "Fintech Launch Campaign",
    company: "NovaPay",
    status: "Active",
    progress: 68,
    deadline: "Sep 28, 2026",
    deliverables: "3 / 4",
  },
  {
    name: "Web3 Education Series",
    company: "Orbit Labs",
    status: "Pending Review",
    progress: 90,
    deadline: "Oct 04, 2026",
    deliverables: "3 / 3",
  },
  {
    name: "Trading Platform Awareness",
    company: "Vertex Markets",
    status: "Completed",
    progress: 100,
    deadline: "Sep 10, 2026",
    deliverables: "5 / 5",
  },
];

const activities = [
  {
    icon: FileText,
    title: "Content submitted",
    description: "Fintech Launch Campaign",
    time: "2 hours ago",
  },
  {
    icon: MessageCircle,
    title: "New campaign message",
    description: "InfluxBridge campaign manager",
    time: "Yesterday",
  },
  {
    icon: Check,
    title: "Deliverable approved",
    description: "Web3 Education Series",
    time: "2 days ago",
  },
  {
    icon: Wallet,
    title: "Payment marked processing",
    description: "Vertex Markets campaign",
    time: "4 days ago",
  },
];

export default function InfluencerDashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#050712] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
        <div className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-violet-600/[0.07] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#070a15]/80 lg:block">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <aside className="relative h-full w-72 border-r border-white/10 bg-[#070a15]">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50"
              >
                <X className="h-4 w-4" />
              </button>

              <Sidebar />
            </aside>
          </div>
        )}

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050712]/80 backdrop-blur-2xl">
            <div className="flex h-20 items-center justify-between px-5 sm:px-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Creator Dashboard
                  </p>
                  <h1 className="mt-1 text-lg font-bold sm:text-xl">
                    Welcome back, Ahmed.
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition hover:text-white">
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </button>

                <div className="hidden h-10 w-px bg-white/10 sm:block" />

                <div className="hidden items-center gap-3 sm:flex">
                  <div className="h-9 w-9 overflow-hidden rounded-xl border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                      alt="Ahmed"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">Ahmed Khan</p>
                    <p className="text-[10px] text-white/35">@ahmedkhan</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
            {/* Profile review banner */}
            <section className="relative overflow-hidden rounded-[28px] border border-amber-400/15 bg-amber-400/[0.045] p-6 sm:p-7">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-400/10 blur-[80px]" />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
                    <Clock3 className="h-5 w-5 text-amber-300" />
                  </div>

                  <div>
                    <p className="font-semibold">Profile under review</p>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-white/45">
                      Your creator profile has been submitted. InfluxBridge
                      will review your profile and verification information
                      before it becomes eligible for campaigns.
                    </p>
                  </div>
                </div>

                <Link
                  href="/join/influencer/profile"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                >
                  Review Profile
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>

            {/* Stats */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <DashboardStat
                icon={<BriefcaseBusiness className="h-5 w-5" />}
                label="Active Campaigns"
                value="2"
                note="+1 this month"
              />

              <DashboardStat
                icon={<TrendingUp className="h-5 w-5" />}
                label="Profile Views"
                value="1,284"
                note="+18% this month"
              />

              <DashboardStat
                icon={<CircleDollarSign className="h-5 w-5" />}
                label="Pending Earnings"
                value="$2,450"
                note="2 payments"
              />

              <DashboardStat
                icon={<Users className="h-5 w-5" />}
                label="Audience Reach"
                value="248K"
                note="Profile estimate"
              />
            </section>

            {/* Main grid */}
            <section className="mt-8 grid gap-8 xl:grid-cols-[1fr_360px]">
              {/* Campaigns */}
              <div className="min-w-0">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                      Campaign Workspace
                    </p>
                    <h2 className="mt-2 text-2xl font-black">
                      Your campaigns
                    </h2>
                  </div>

                  <button className="hidden items-center gap-1.5 text-xs font-semibold text-white/40 transition hover:text-white sm:flex">
                    View all
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {campaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.name}
                      campaign={campaign}
                    />
                  ))}
                </div>
              </div>

              {/* Profile completion */}
              <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                      Creator Profile
                    </p>
                    <h2 className="mt-2 text-xl font-bold">
                      Profile strength
                    </h2>
                  </div>

                  <span className="text-2xl font-black text-cyan-300">
                    82%
                  </span>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                </div>

                <p className="mt-3 text-xs leading-5 text-white/35">
                  Complete a few more sections to make your profile more useful
                  for campaign matching.
                </p>

                <div className="mt-6 space-y-3">
                  <ProfileCheck label="Basic profile" done />
                  <ProfileCheck label="Social platforms" done />
                  <ProfileCheck label="Audience information" done />
                  <ProfileCheck label="Portfolio" done />
                  <ProfileCheck label="Verification" />
                </div>

                <Link
                  href="/join/influencer/profile"
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-white/60 transition hover:bg-white/[0.07] hover:text-white"
                >
                  Complete Profile
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>

            {/* Bottom grid */}
            <section className="mt-8 grid gap-8 lg:grid-cols-2">
              {/* Earnings */}
              <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                      Earnings
                    </p>
                    <h2 className="mt-2 text-xl font-bold">
                      Payment overview
                    </h2>
                  </div>

                  <Wallet className="h-5 w-5 text-white/25" />
                </div>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <EarningBox
                    label="Pending"
                    value="$2,450"
                    description="Awaiting completion"
                  />

                  <EarningBox
                    label="Paid"
                    value="$6,850"
                    description="Completed campaigns"
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">
                      Current month
                    </span>
                    <span className="text-xs font-semibold text-cyan-300">
                      +$1,850
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[72%] rounded-full bg-cyan-400/70" />
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                      Activity
                    </p>
                    <h2 className="mt-2 text-xl font-bold">
                      Recent updates
                    </h2>
                  </div>

                  <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/30 transition hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 space-y-5">
                  {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                      <div
                        key={activity.title}
                        className="flex items-start gap-3"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                          <Icon className="h-4 w-4 text-cyan-300" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-white/75">
                            {activity.title}
                          </p>
                          <p className="mt-1 truncate text-[11px] text-white/35">
                            {activity.description}
                          </p>
                        </div>

                        <span className="shrink-0 text-[10px] text-white/25">
                          {activity.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="relative mt-8 overflow-hidden rounded-[30px] border border-cyan-400/15 bg-gradient-to-r from-cyan-400/[0.07] via-white/[0.025] to-violet-500/[0.07] p-7 sm:p-9">
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-400/10 blur-[90px]" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      Creator Network
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-black">
                    Keep your profile campaign-ready.
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                    Keep your audience information, portfolio and social
                    profiles up to date so the InfluxBridge team can evaluate
                    campaign fit.
                  </p>
                </div>

                <Link
                  href="/influencers/ahmed-khan"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#050712] transition hover:bg-cyan-50"
                >
                  View Public Profile
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

function Sidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
            <img
              src="/a-logo.png"
              alt="InfluxBridge"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em]">
              INFLUXBRIDGE
            </p>
            <p className="text-[8px] uppercase tracking-[0.2em] text-white/25">
              Creator Portal
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
          Workspace
        </p>

        <div className="mt-3 space-y-1">
          <SidebarLink
            href="/dashboard/influencer"
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Overview"
            active
          />

          <SidebarLink
            href="/join/influencer/profile"
            icon={<UserRound className="h-4 w-4" />}
            label="My Profile"
          />

          <SidebarLink
            href="/dashboard/influencer"
            icon={<BriefcaseBusiness className="h-4 w-4" />}
            label="Campaigns"
            badge="2"
          />

          <SidebarLink
            href="/dashboard/influencer"
            icon={<FileText className="h-4 w-4" />}
            label="Deliverables"
          />

          <SidebarLink
            href="/dashboard/influencer"
            icon={<MessageCircle className="h-4 w-4" />}
            label="Messages"
            badge="1"
          />

          <SidebarLink
            href="/dashboard/influencer"
            icon={<Wallet className="h-4 w-4" />}
            label="Payments"
          />
        </div>

        <p className="mt-8 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
          Account
        </p>

        <div className="mt-3 space-y-1">
          <SidebarLink
            href="/dashboard/influencer"
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
          />
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/influencers/ahmed-khan"
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3 transition hover:bg-white/[0.05]"
        >
          <div className="h-9 w-9 overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
              alt="Ahmed"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">Ahmed Khan</p>
            <p className="truncate text-[10px] text-white/30">
              View public profile
            </p>
          </div>

          <ChevronRight className="h-4 w-4 text-white/20" />
        </Link>

        <Link
          href="/"
          className="mt-3 flex items-center gap-2 px-3 py-2 text-[11px] text-white/30 transition hover:text-white"
        >
          <Home className="h-3.5 w-3.5" />
          Back to website
        </Link>
      </div>
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
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-medium transition ${
        active
          ? "border border-cyan-400/15 bg-cyan-400/[0.08] text-cyan-300"
          : "text-white/40 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      {icon}
      <span className="flex-1">{label}</span>

      {badge && (
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] text-white/40">
          {badge}
        </span>
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard Components                                                       */
/* -------------------------------------------------------------------------- */

function DashboardStat({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-300">
          {icon}
        </div>

        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/25">
          Overview
        </span>
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
        {label}
      </p>

      <div className="mt-1 flex items-end justify-between gap-3">
        <p className="text-2xl font-black">{value}</p>
        <p className="pb-1 text-[10px] text-cyan-300/70">{note}</p>
      </div>
    </div>
  );
}

function CampaignCard({
  campaign,
}: {
  campaign: (typeof campaigns)[number];
}) {
  const statusClass =
    campaign.status === "Active"
      ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
      : campaign.status === "Completed"
        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
        : "border-amber-400/20 bg-amber-400/10 text-amber-300";

  return (
    <div className="group rounded-[26px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/15 hover:bg-white/[0.045] sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-400/10">
          <BriefcaseBusiness className="h-5 w-5 text-cyan-300" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold">{campaign.name}</h3>

            <span
              className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${statusClass}`}
            >
              {campaign.status}
            </span>
          </div>

          <p className="mt-1 text-xs text-white/35">
            {campaign.company} · Deadline {campaign.deadline}
          </p>
        </div>

        <button className="flex items-center gap-1.5 self-start rounded-xl border border-white/10 px-3 py-2 text-[10px] font-semibold text-white/40 transition hover:text-white sm:self-center">
          Open
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-[10px]">
          <span className="text-white/30">Campaign progress</span>
          <span className="font-semibold text-white/60">
            {campaign.progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
            style={{ width: `${campaign.progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-white/25">
            Deliverables {campaign.deliverables}
          </span>

          {campaign.status === "Active" && (
            <span className="text-[10px] font-semibold text-cyan-300/70">
              In progress
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileCheck({
  label,
  done = false,
}: {
  label: string;
  done?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border ${
          done
            ? "border-cyan-400/20 bg-cyan-400/10"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        {done && <Check className="h-3 w-3 text-cyan-300" />}
      </div>

      <span
        className={`text-xs ${
          done ? "text-white/60" : "text-white/30"
        }`}
      >
        {label}
      </span>

      {!done && (
        <span className="ml-auto text-[9px] uppercase tracking-wider text-white/20">
          Pending
        </span>
      )}
    </div>
  );
}

function EarningBox({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black">{value}</p>

      <p className="mt-1 text-[10px] text-white/30">{description}</p>
    </div>
  );
}