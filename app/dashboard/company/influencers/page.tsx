"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Filter,
  Home,
  Menu,
  MessageSquare,
  Search,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

type Creator = {
  slug: string;
  name: string;
  initials: string;
  niche: string;
  followers: string;
  engagement: string;
  location: string;
  platforms: string;
  match: number;
  featured?: boolean;
};

const creators: Creator[] = [
  {
    slug: "ahmed-malik",
    name: "Ahmed Malik",
    initials: "AM",
    niche: "Fintech & Web3",
    followers: "182K",
    engagement: "5.8%",
    location: "Pakistan",
    platforms: "Instagram · YouTube · X",
    match: 96,
    featured: true,
  },
  {
    slug: "ayesha-khan",
    name: "Ayesha Khan",
    initials: "AK",
    niche: "Finance & Lifestyle",
    followers: "245K",
    engagement: "6.4%",
    location: "Pakistan",
    platforms: "Instagram · TikTok",
    match: 92,
    featured: true,
  },
  {
    slug: "hamza-trades",
    name: "Hamza Trades",
    initials: "HT",
    niche: "Trading & Markets",
    followers: "118K",
    engagement: "7.1%",
    location: "Pakistan",
    platforms: "YouTube · X",
    match: 89,
  },
  {
    slug: "sara-digital",
    name: "Sara Digital",
    initials: "SD",
    niche: "Technology",
    followers: "94K",
    engagement: "5.2%",
    location: "Pakistan",
    platforms: "Instagram · YouTube",
    match: 86,
  },
  {
    slug: "usman-web3",
    name: "Usman Web3",
    initials: "UW",
    niche: "Web3 & Crypto",
    followers: "76K",
    engagement: "8.2%",
    location: "Pakistan",
    platforms: "X · YouTube",
    match: 84,
  },
];

export default function CompanyInfluencersPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Creator | null>(null);

  const filtered = creators.filter((creator) => {
    const query = search.toLowerCase();

    return (
      creator.name.toLowerCase().includes(query) ||
      creator.niche.toLowerCase().includes(query) ||
      creator.location.toLowerCase().includes(query)
    );
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
            />

            <SidebarLink
              href="/dashboard/company/influencers"
              icon={<Users size={18} />}
              label="Creator Network"
              active
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
              className="flex items-center justify-between rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black hover:bg-cyan-300"
            >
              Request Campaign
              <ArrowRight size={16} />
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
                  Creator Network
                </h1>
              </div>
            </div>

            <button className="relative rounded-xl border border-white/10 p-2.5 text-white/60">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm text-cyan-300">
              <Sparkles size={15} />
              Curated creator network
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Discover creators
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
              Explore creator profiles available through the InfluxBridge
              network. Our team handles campaign matching, communication,
              deliverables, and coordination.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <NetworkStat
              value="500+"
              label="Network creators"
            />

            <NetworkStat
              value="25M+"
              label="Combined reach"
            />

            <NetworkStat
              value="12"
              label="Active campaigns"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search creators, niches, locations..."
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] pl-11 pr-4 text-sm outline-none placeholder:text-white/20 focus:border-cyan-400/30"
              />
            </div>

            <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm text-white/45 hover:bg-white/5 hover:text-white">
              <Filter size={16} />
              Filters
            </button>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {filtered.map((creator) => (
              <button
                key={creator.slug}
                onClick={() => setSelected(creator)}
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 font-semibold text-cyan-200">
                      {creator.initials}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold">
                          {creator.name}
                        </h3>

                        <Check
                          size={14}
                          className="text-cyan-300"
                        />
                      </div>

                      <p className="mt-1 text-xs text-white/35">
                        {creator.niche}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-2.5 py-1 text-[10px] text-cyan-300">
                    {creator.match}% match
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <MiniMetric
                    label="Followers"
                    value={creator.followers}
                  />

                  <MiniMetric
                    label="Engagement"
                    value={creator.engagement}
                  />
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-white/30">
                  <span>{creator.location}</span>
                  <span>·</span>
                  <span>{creator.platforms}</span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-xs text-cyan-300/70">
                    View profile
                  </span>

                  <ChevronRight
                    size={17}
                    className="text-white/20 group-hover:translate-x-1 group-hover:text-cyan-300"
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-violet-400/10 bg-violet-400/[0.025] p-5">
            <div className="flex items-start gap-3">
              <Star
                size={18}
                className="mt-0.5 text-violet-300"
              />

              <div>
                <p className="text-sm font-medium">
                  Creator matching is handled by InfluxBridge
                </p>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  These profiles are presented for campaign discovery.
                  Companies do not directly negotiate with creators
                  through this prototype. InfluxBridge manages the
                  campaign relationship and delivery process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#090c14] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 font-semibold text-cyan-300">
                  {selected.initials}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {selected.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/35">
                    {selected.niche}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-xl p-2 text-white/40 hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <MiniMetric
                label="Followers"
                value={selected.followers}
              />

              <MiniMetric
                label="Engagement"
                value={selected.engagement}
              />

              <MiniMetric
                label="Location"
                value={selected.location}
              />

              <MiniMetric
                label="Campaign match"
                value={`${selected.match}%`}
              />
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-white/25">
                Platform mix
              </p>

              <p className="mt-2 text-sm text-white/65">
                {selected.platforms}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/influencers/${selected.slug}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white"
              >
                Public profile
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/contact"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3 text-sm font-semibold text-black hover:bg-cyan-300"
              >
                Request campaign
              </Link>
            </div>
          </div>
        </div>
      )}
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

function NetworkStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-white/30">{label}</p>
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
    <div className="rounded-xl border border-white/10 bg-black/10 p-3">
      <p className="text-[10px] text-white/25">{label}</p>
      <p className="mt-1 text-sm font-medium text-white/75">
        {value}
      </p>
    </div>
  );
}