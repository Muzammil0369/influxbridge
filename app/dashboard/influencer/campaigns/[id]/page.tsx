"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Send,
  Settings,
  Sparkles,
  Upload,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

const deliverables = [
  {
    number: "01",
    title: "Campaign announcement",
    description: "One short-form announcement introducing the campaign.",
    status: "Approved",
    date: "Sep 18",
  },
  {
    number: "02",
    title: "Educational video",
    description: "Educational video explaining the campaign product.",
    status: "Revision Requested",
    date: "Sep 22",
  },
  {
    number: "03",
    title: "Social post",
    description: "One supporting social post with campaign messaging.",
    status: "Not Started",
    date: "Sep 25",
  },
  {
    number: "04",
    title: "Final campaign content",
    description: "Final approved campaign asset for publication.",
    status: "Not Started",
    date: "Sep 28",
  },
];

const activity = [
  {
    title: "Draft submitted",
    description: "Educational video draft uploaded",
    time: "2 hours ago",
  },
  {
    title: "Revision requested",
    description: "Campaign manager requested a small messaging change",
    time: "4 hours ago",
  },
  {
    title: "Deliverable approved",
    description: "Campaign announcement approved",
    time: "Yesterday",
  },
  {
    title: "Campaign brief received",
    description: "You received the campaign requirements",
    time: "Sep 17",
  },
];

export default function CampaignWorkspacePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showUpload, setShowUpload] = useState(false);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const tabs = ["Overview", "Deliverables", "Messages"];

  function sendMessage() {
    if (!message.trim()) return;

    setSentMessages((current) => [...current, message.trim()]);
    setMessage("");
  }

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
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#070a15]/80 lg:block">
          <Sidebar />
        </aside>

        {/* Mobile sidebar */}
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

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
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
                  <Link
                    href="/dashboard/influencer"
                    className="flex items-center gap-1.5 text-[10px] font-semibold text-white/30 transition hover:text-cyan-300"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Creator Dashboard
                  </Link>

                  <h1 className="mt-1 text-lg font-bold sm:text-xl">
                    Campaign Workspace
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50">
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
                    <p className="text-[10px] text-white/30">@ahmedkhan</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
            {/* Breadcrumb */}
            <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px] text-white/30">
              <Link
                href="/dashboard/influencer"
                className="transition hover:text-white"
              >
                Dashboard
              </Link>

              <span>/</span>

              <span className="text-white/60">
                Fintech Launch Campaign
              </span>
            </div>

            {/* Campaign header */}
            <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[120px]" />

              <div className="relative flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                    <BriefcaseBusiness className="h-6 w-6 text-cyan-300" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-cyan-300">
                        Active Campaign
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[9px] font-semibold text-white/40">
                        IB-CMP-2026-024
                      </span>
                    </div>

                    <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                      Fintech Launch Campaign
                    </h2>

                    <p className="mt-2 text-sm text-white/40">
                      NovaPay · Managed by InfluxBridge
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <MiniStat label="Progress" value="68%" />
                  <MiniStat label="Deliverables" value="3 / 4" />
                  <MiniStat label="Deadline" value="Sep 28" />
                </div>
              </div>
            </section>

            {/* Tabs */}
            <div className="mt-6 flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.025] p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-semibold transition ${
                    activeTab === tab
                      ? "bg-white/[0.08] text-white"
                      : "text-white/35 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview */}
            {activeTab === "Overview" && (
              <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_360px]">
                <div className="space-y-8">
                  {/* Campaign brief */}
                  <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                    <SectionTitle
                      eyebrow="Campaign Brief"
                      title="What this campaign is about"
                    />

                    <p className="mt-5 text-sm leading-7 text-white/50">
                      NovaPay is preparing a market awareness campaign focused
                      on introducing its digital finance product to a new
                      audience. The campaign should communicate the product in
                      a clear, educational and trustworthy way.
                    </p>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      <InfoCard
                        label="Campaign Objective"
                        value="Brand Awareness"
                      />
                      <InfoCard
                        label="Target Market"
                        value="Pakistan"
                      />
                      <InfoCard
                        label="Content Style"
                        value="Educational"
                      />
                      <InfoCard
                        label="Primary Platform"
                        value="YouTube + X"
                      />
                    </div>
                  </section>

                  {/* Requirements */}
                  <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                    <SectionTitle
                      eyebrow="Requirements"
                      title="Campaign guidelines"
                    />

                    <div className="mt-6 space-y-3">
                      <Requirement text="Use the approved campaign messaging." />
                      <Requirement text="Clearly explain the product's core value." />
                      <Requirement text="Keep financial claims factual and supportable." />
                      <Requirement text="Include the provided campaign call-to-action." />
                      <Requirement text="Submit drafts through the InfluxBridge workspace before publication." />
                    </div>
                  </section>

                  {/* Timeline */}
                  <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                    <SectionTitle
                      eyebrow="Timeline"
                      title="Campaign schedule"
                    />

                    <div className="mt-7">
                      <TimelineItem
                        date="Sep 17"
                        title="Campaign brief"
                        description="Campaign requirements received"
                        completed
                      />

                      <TimelineItem
                        date="Sep 18"
                        title="First content"
                        description="Campaign announcement approved"
                        completed
                      />

                      <TimelineItem
                        date="Sep 22"
                        title="Educational video"
                        description="Revision requested"
                        current
                      />

                      <TimelineItem
                        date="Sep 25"
                        title="Social post"
                        description="Scheduled deliverable"
                      />

                      <TimelineItem
                        date="Sep 28"
                        title="Campaign completion"
                        description="Final campaign delivery"
                      />
                    </div>
                  </section>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  {/* Payment */}
                  <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                    <SectionTitle
                      eyebrow="Payment"
                      title="Campaign earnings"
                    />

                    <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                        Total campaign value
                      </p>

                      <p className="mt-2 text-3xl font-black">$1,850</p>

                      <div className="mt-4 flex items-center gap-2 text-xs text-amber-300">
                        <Clock3 className="h-3.5 w-3.5" />
                        Payment processing
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <PaymentRow
                        label="Campaign fee"
                        value="$1,850"
                      />
                      <PaymentRow
                        label="Current status"
                        value="Processing"
                      />
                    </div>
                  </section>

                  {/* Campaign manager */}
                  <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                    <SectionTitle
                      eyebrow="Campaign Manager"
                      title="Your InfluxBridge contact"
                    />

                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-violet-400/10">
                        <UserRound className="h-5 w-5 text-violet-300" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Campaign Manager
                        </p>
                        <p className="text-[10px] text-white/30">
                          InfluxBridge Team
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("Messages")}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-white/60 transition hover:bg-white/[0.07] hover:text-white"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Open Messages
                    </button>
                  </section>

                  {/* Quick actions */}
                  <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                    <SectionTitle eyebrow="Quick Actions" title="Workspace" />

                    <div className="mt-5 space-y-2">
                      <button
                        onClick={() => setShowUpload(true)}
                        className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-semibold text-white/50 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <Upload className="h-4 w-4 text-cyan-300" />
                        Upload Deliverable
                      </button>

                      <button
                        onClick={() => setActiveTab("Deliverables")}
                        className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-semibold text-white/50 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <FileText className="h-4 w-4 text-violet-300" />
                        View Deliverables
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* Deliverables */}
            {activeTab === "Deliverables" && (
              <div className="mt-8">
                <div className="mb-6">
                  <SectionTitle
                    eyebrow="Content Workflow"
                    title="Campaign deliverables"
                  />

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                    Submit campaign content here. In production, the
                    InfluxBridge team will review each submission and either
                    approve it or request revisions.
                  </p>
                </div>

                <div className="space-y-4">
                  {deliverables.map((item) => (
                    <DeliverableCard
                      key={item.number}
                      item={item}
                      onUpload={() => setShowUpload(true)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {activeTab === "Messages" && (
              <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_320px]">
                <section className="flex min-h-[620px] flex-col rounded-[28px] border border-white/10 bg-white/[0.035]">
                  <div className="border-b border-white/10 p-6">
                    <SectionTitle
                      eyebrow="Campaign Communication"
                      title="Messages"
                    />

                    <p className="mt-2 text-xs text-white/30">
                      Conversation with your InfluxBridge campaign manager.
                    </p>
                  </div>

                  <div className="flex-1 space-y-5 overflow-y-auto p-6">
                    <ChatMessage
                      sender="InfluxBridge"
                      message="Welcome to the campaign workspace. We've reviewed your initial content and added the campaign requirements here."
                      time="Sep 17 · 10:24 AM"
                      incoming
                    />

                    <ChatMessage
                      sender="You"
                      message="Thanks. I'll submit the educational video draft here."
                      time="Sep 21 · 4:12 PM"
                    />

                    <ChatMessage
                      sender="InfluxBridge"
                      message="Great. Please make sure the product explanation follows the approved campaign messaging."
                      time="Sep 22 · 9:05 AM"
                      incoming
                    />

                    <ChatMessage
                      sender="InfluxBridge"
                      message="We've requested one small revision to the latest draft."
                      time="Today · 10:31 AM"
                      incoming
                    />

                    {sentMessages.map((text, index) => (
                      <ChatMessage
                        key={`${text}-${index}`}
                        sender="You"
                        message={text}
                        time="Just now"
                      />
                    ))}
                  </div>

                  <div className="border-t border-white/10 p-4">
                    <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/10 p-2">
                      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white/25 transition hover:text-white">
                        <Paperclip className="h-4 w-4" />
                      </button>

                      <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Write a message..."
                        rows={2}
                        className="min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-xs text-white outline-none placeholder:text-white/20"
                      />

                      <button
                        onClick={sendMessage}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#050712] transition hover:bg-cyan-50"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </section>

                <section className="h-fit rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                  <SectionTitle
                    eyebrow="Campaign Contact"
                    title="InfluxBridge"
                  />

                  <div className="mt-6 space-y-4">
                    <ContactInfo
                      label="Campaign"
                      value="Fintech Launch"
                    />

                    <ContactInfo
                      label="Status"
                      value="Active"
                    />

                    <ContactInfo
                      label="Deadline"
                      value="Sep 28, 2026"
                    />

                    <ContactInfo
                      label="Support"
                      value="Campaign Manager"
                    />
                  </div>
                </section>
              </div>
            )}

            {/* Recent activity */}
            {activeTab === "Overview" && (
              <section className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <SectionTitle
                    eyebrow="Activity"
                    title="Recent campaign updates"
                  />

                  <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/30 transition hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {activity.map((item) => (
                    <ActivityCard key={item.title} {...item} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Upload modal */}
      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} />
      )}
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
            active
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

        <div className="mt-3">
          <SidebarLink
            href="/dashboard/influencer"
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
          />
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-[11px] text-white/30 transition hover:text-white"
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
/* UI Components                                                              */
/* -------------------------------------------------------------------------- */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
      <p className="text-[9px] uppercase tracking-[0.15em] text-white/25">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-xl font-bold">{title}</h2>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/25">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-white/70">{value}</p>
    </div>
  );
}

function Requirement({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/10">
        <Check className="h-3 w-3 text-cyan-300" />
      </div>

      <p className="text-xs leading-5 text-white/50">{text}</p>
    </div>
  );
}

function TimelineItem({
  date,
  title,
  description,
  completed = false,
  current = false,
}: {
  date: string;
  title: string;
  description: string;
  completed?: boolean;
  current?: boolean;
}) {
  return (
    <div className="relative flex gap-4 pb-7 last:pb-0">
      <div className="flex flex-col items-center">
        <div
          className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border ${
            completed
              ? "border-cyan-400/20 bg-cyan-400/10"
              : current
                ? "border-amber-400/20 bg-amber-400/10"
                : "border-white/10 bg-white/[0.03]"
          }`}
        >
          {completed ? (
            <Check className="h-3.5 w-3.5 text-cyan-300" />
          ) : current ? (
            <Clock3 className="h-3.5 w-3.5 text-amber-300" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-white/20" />
          )}
        </div>

        <div className="mt-1 w-px flex-1 bg-white/10" />
      </div>

      <div className="flex-1 pb-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{title}</h3>
          <span className="text-[10px] text-white/25">{date}</span>
        </div>

        <p className="mt-1 text-xs text-white/35">{description}</p>
      </div>
    </div>
  );
}

function PaymentRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-white/35">{label}</span>
      <span className="text-xs font-semibold text-white/60">{value}</span>
    </div>
  );
}

function DeliverableCard({
  item,
  onUpload,
}: {
  item: (typeof deliverables)[number];
  onUpload: () => void;
}) {
  const statusClass =
    item.status === "Approved"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : item.status === "Revision Requested"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
        : "border-white/10 bg-white/[0.03] text-white/35";

  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xs font-black text-cyan-300">
          {item.number}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold">{item.title}</h3>

            <span
              className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${statusClass}`}
            >
              {item.status}
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-white/35">
            {item.description}
          </p>

          <p className="mt-2 text-[10px] text-white/20">
            Due {item.date}, 2026
          </p>
        </div>

        <button
          onClick={onUpload}
          disabled={item.status === "Approved"}
          className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            item.status === "Approved"
              ? "cursor-not-allowed border border-white/5 bg-white/[0.02] text-white/20"
              : "border border-white/10 bg-white/[0.05] text-white/60 hover:bg-white/[0.08] hover:text-white"
          }`}
        >
          <Upload className="h-3.5 w-3.5" />
          {item.status === "Revision Requested"
            ? "Upload Revision"
            : "Upload"}
        </button>
      </div>
    </div>
  );
}

function ActivityCard({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05]">
        <Sparkles className="h-4 w-4 text-cyan-300" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap justify-between gap-2">
          <p className="text-xs font-semibold text-white/70">{title}</p>
          <span className="text-[9px] text-white/20">{time}</span>
        </div>

        <p className="mt-1 text-[11px] leading-5 text-white/30">
          {description}
        </p>
      </div>
    </div>
  );
}

function ChatMessage({
  sender,
  message,
  time,
  incoming = false,
}: {
  sender: string;
  message: string;
  time: string;
  incoming?: boolean;
}) {
  return (
    <div className={`flex ${incoming ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl border p-4 ${
          incoming
            ? "border-white/10 bg-white/[0.035]"
            : "border-cyan-400/10 bg-cyan-400/[0.05]"
        }`}
      >
        <div className="flex items-center justify-between gap-5">
          <span
            className={`text-[10px] font-bold ${
              incoming ? "text-violet-300" : "text-cyan-300"
            }`}
          >
            {sender}
          </span>

          <span className="text-[9px] text-white/20">{time}</span>
        </div>

        <p className="mt-2 text-xs leading-6 text-white/50">{message}</p>
      </div>
    </div>
  );
}

function ContactInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <p className="text-[9px] uppercase tracking-[0.15em] text-white/25">
        {label}
      </p>
      <p className="mt-1 text-xs font-semibold text-white/60">{value}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Upload Modal                                                               */
/* -------------------------------------------------------------------------- */

function UploadModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-xl">
        <div className="w-full max-w-md rounded-[30px] border border-white/10 bg-[#090d1c] p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Check className="h-7 w-7 text-cyan-300" />
          </div>

          <h2 className="mt-6 text-2xl font-black">
            Deliverable submitted
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/40">
            This prototype demonstrates the submission flow. The file has not
            actually been uploaded or stored.
          </p>

          <button
            onClick={onClose}
            className="mt-7 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[#050712]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-5 backdrop-blur-xl">
      <div className="relative w-full max-w-lg rounded-[30px] border border-white/10 bg-[#090d1c] p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
            Deliverable Upload
          </p>

          <h2 className="mt-3 text-2xl font-black">
            Submit campaign content
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/40">
            Upload your draft or revision for the InfluxBridge campaign team to
            review.
          </p>
        </div>

        <button
          onClick={() => setSelected(true)}
          className={`mt-7 flex w-full flex-col items-center justify-center rounded-2xl border border-dashed p-8 transition ${
            selected
              ? "border-cyan-400/30 bg-cyan-400/[0.05]"
              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
          }`}
        >
          <Upload className="h-6 w-6 text-cyan-300" />

          <p className="mt-4 text-sm font-semibold">
            {selected ? "demo-content.mp4 selected" : "Choose a file"}
          </p>

          <p className="mt-1 text-[10px] text-white/25">
            Video, image or document
          </p>
        </button>

        <div className="mt-5">
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
            Submission note
          </label>

          <textarea
            rows={4}
            placeholder="Add a note for the campaign manager..."
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs text-white outline-none placeholder:text-white/20 focus:border-cyan-400/30"
          />
        </div>

        <button
          onClick={() => setSubmitted(true)}
          disabled={!selected}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold transition ${
            selected
              ? "bg-white text-[#050712] hover:bg-cyan-50"
              : "cursor-not-allowed bg-white/10 text-white/20"
          }`}
        >
          Submit for Review
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}