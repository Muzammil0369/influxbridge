"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Edit3,
  Globe2,
  Home,
  Menu,
  MessageSquare,
  MapPin,
  Plus,
  Save,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";

export default function InfluencerProfilePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [bio, setBio] = useState(
    "Fintech and technology creator focused on making complex digital products easier to understand for young audiences in Pakistan."
  );

  const [rate, setRate] = useState("$400");

  function saveProfile() {
    setSaved(true);
    setEditing(false);

    setTimeout(() => setSaved(false), 2500);
  }

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
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-300">
                AM
              </div>

              <div>
                <p className="text-sm font-semibold">Ahmed Malik</p>
                <p className="text-xs text-white/35">
                  Creator account
                </p>
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
              active
            />
          </nav>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 hover:bg-white/5 hover:text-white"
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
                  Creator Portal
                </p>
                <h1 className="mt-1 text-xl font-semibold">
                  My Profile
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative rounded-xl border border-white/10 p-2.5 text-white/60 hover:bg-white/5">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </button>

              <button
                onClick={() => setEditing(!editing)}
                className="hidden items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm text-cyan-300 hover:bg-cyan-400/15 sm:flex"
              >
                <Edit3 size={15} />
                {editing ? "Cancel editing" : "Edit profile"}
              </button>
            </div>
          </div>
        </header>

        <div className="relative mx-auto max-w-[1250px] px-5 py-8 sm:px-8 lg:px-10">
          {/* Profile hero */}
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
            <div className="relative h-40 overflow-hidden bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-transparent">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(139,92,246,0.12),transparent_30%)]" />
            </div>

            <div className="relative px-6 pb-7 sm:px-8">
              <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-[#080b13] bg-gradient-to-br from-cyan-400/30 to-violet-500/30 text-2xl font-bold text-cyan-200 shadow-2xl">
                    AM
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-semibold">
                        Ahmed Malik
                      </h2>

                      <span className="flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] text-cyan-300">
                        <Check size={11} />
                        Network Creator
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-white/40">
                      @ahmedfintech · Fintech Creator
                    </p>
                  </div>
                </div>

                <Link
                  href="/influencers/ahmed-malik"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/55 hover:bg-white/5 hover:text-white"
                >
                  Public profile
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                <ProfileStat
                  label="Followers"
                  value="182K"
                  icon={<Users size={16} />}
                />

                <ProfileStat
                  label="Engagement"
                  value="5.8%"
                  icon={<TrendingIcon />}
                />

                <ProfileStat
                  label="Primary market"
                  value="Pakistan"
                  icon={<Globe2 size={16} />}
                />
              </div>
            </div>
          </section>

          {saved && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-300">
              <Check size={18} />
              Profile changes saved to this prototype.
            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            {/* Main */}
            <div className="space-y-6">
              <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/60">
                      About
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">
                      Creator profile
                    </h3>
                  </div>

                  <Sparkles size={18} className="text-cyan-300/50" />
                </div>

                <div className="mt-5">
                  {editing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={5}
                      maxLength={220}
                      className="w-full resize-none rounded-xl border border-cyan-400/20 bg-black/20 p-4 text-sm leading-6 text-white outline-none"
                    />
                  ) : (
                    <p className="text-sm leading-7 text-white/50">
                      {bio}
                    </p>
                  )}
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/60">
                      Social presence
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">
                      Connected channels
                    </h3>
                  </div>

                  {editing && (
                    <button className="rounded-xl border border-white/10 p-2 text-white/40 hover:bg-white/5 hover:text-white">
                      <Plus size={17} />
                    </button>
                  )}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  

                  <SocialCard
                    icon={<Video size={18} />}
                    platform="YouTube"
                    handle="Ahmed Fintech"
                    audience="61K subscribers"
                  />

                  <SocialCard
                    icon={<Share2 size={18} />}
                    platform="X / Twitter"
                    handle="@ahmedfintech"
                    audience="29K followers"
                  />

                  <SocialCard
                    icon={<Video size={18} />}
                    platform="TikTok"
                    handle="@ahmedfintech"
                    audience="—"
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/60">
                    Portfolio
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    Featured work
                  </h3>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <PortfolioCard
                    title="Fintech explainer"
                    category="Short-form video"
                  />

                  <PortfolioCard
                    title="Trading platform review"
                    category="Product campaign"
                  />

                  <PortfolioCard
                    title="Digital payments guide"
                    category="Educational content"
                  />

                  <button className="flex min-h-[130px] items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-white/30 transition hover:border-cyan-400/20 hover:text-cyan-300">
                    <Plus size={16} className="mr-2" />
                    Add portfolio item
                  </button>
                </div>
              </section>
            </div>

            {/* Side */}
            <aside className="space-y-6">
              <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <DollarIcon />
                  </div>

                  <div>
                    <p className="text-xs text-white/35">
                      Starting rate
                    </p>

                    <p className="mt-1 font-semibold">
                      {editing ? (
                        <input
                          value={rate}
                          onChange={(e) => setRate(e.target.value)}
                          className="w-24 rounded-lg border border-white/10 bg-black/20 px-2 py-1 outline-none"
                        />
                      ) : (
                        rate
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <DetailRow label="Deliverable" value="Per post / video" />
                  <DetailRow label="Languages" value="English, Urdu" />
                  <DetailRow label="Location" value="Pakistan" />
                  <DetailRow label="Niche" value="Fintech · Web3" />
                </div>
              </section>

              <section className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.035] p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    size={20}
                    className="text-emerald-300"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Verification status
                    </p>

                    <p className="mt-1 text-xs text-emerald-300/60">
                      Network profile
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <VerificationRow
                    label="Email"
                    complete
                  />

                  <VerificationRow
                    label="Social accounts"
                    complete
                  />

                  <VerificationRow
                    label="Identity review"
                    complete={false}
                  />
                </div>

                <p className="mt-5 text-[10px] leading-5 text-white/25">
                  Verification labels in this prototype are illustrative.
                  Production verification will be handled by the
                  InfluxBridge review workflow.
                </p>
              </section>

              {editing && (
                <button
                  onClick={saveProfile}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-cyan-300"
                >
                  <Save size={16} />
                  Save changes
                </button>
              )}
            </aside>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/25">
            <span>InfluxBridge Creator Portal</span>

            <span>Profile data is currently mock data</span>
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

function ProfileStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-4">
      <div className="flex items-center gap-2 text-white/30">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <p className="mt-3 text-lg font-semibold">{value}</p>
    </div>
  );
}

function SocialCard({
  icon,
  platform,
  handle,
  audience,
}: {
  icon: React.ReactNode;
  platform: string;
  handle: string;
  audience: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/60">
          {icon}
        </div>

        <div>
          <p className="text-xs font-medium">{platform}</p>
          <p className="mt-0.5 text-[11px] text-white/30">
            {handle}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-cyan-300/60">{audience}</p>
    </div>
  );
}

function PortfolioCard({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  return (
    <div className="min-h-[130px] rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/[0.06] to-violet-500/[0.04] p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-cyan-300">
        <Video size={17} />
      </div>

      <p className="mt-5 text-sm font-medium">{title}</p>
      <p className="mt-1 text-[11px] text-white/30">{category}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3 text-xs last:border-0 last:pb-0">
      <span className="text-white/30">{label}</span>
      <span className="text-right text-white/65">{value}</span>
    </div>
  );
}

function VerificationRow({
  label,
  complete,
}: {
  label: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/45">{label}</span>

      {complete ? (
        <span className="flex items-center gap-1.5 text-[10px] text-emerald-300">
          <Check size={12} />
          Complete
        </span>
      ) : (
        <span className="text-[10px] text-amber-300/70">
          Pending
        </span>
      )}
    </div>
  );
}

function DollarIcon() {
  return (
    <span className="text-sm font-semibold">$</span>
  );
}

function TrendingIcon() {
  return (
    <span className="text-sm font-semibold">↗</span>
  );
}