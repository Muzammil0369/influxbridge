"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  BriefcaseBusiness,
  LayoutDashboard,
  Menu,
  MessageSquare,
  ShieldCheck,
  Users,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: BriefcaseBusiness, badge: "6" },
  { href: "/admin/campaigns", label: "Campaigns", icon: Activity, badge: "3" },
  { href: "/admin/influencers", label: "Influencers", icon: Users, badge: "12" },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, badge: "4" },
];

const pageMeta: Record<string, { eyebrow: string; title: string; description: string }> = {
  "/admin": {
    eyebrow: "Operations / Command",
    title: "Operations command center",
    description: "A single workspace for leads, creators, campaigns and conversations.",
  },
  "/admin/leads": {
    eyebrow: "Pipeline / Leads",
    title: "Company leads",
    description: "Review incoming opportunities and move qualified companies through the pipeline.",
  },
  "/admin/campaigns": {
    eyebrow: "Delivery / Campaigns",
    title: "Campaign operations",
    description: "Monitor live projects, creator assignments and delivery progress.",
  },
  "/admin/influencers": {
    eyebrow: "Network / Creators",
    title: "Creator network",
    description: "Review applications and manage the creators entering the InfluxBridge network.",
  },
  "/admin/messages": {
    eyebrow: "Communication / Inbox",
    title: "Operations inbox",
    description: "Keep company, creator and internal conversations in one operational view.",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const meta = pageMeta[pathname] ?? pageMeta["/admin"];

  return (
    <main className="min-h-screen bg-[#04060c] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.035] blur-[120px]" />
        <div className="absolute right-0 top-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.025] blur-[140px]" />
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[276px] border-r border-white/[0.08] bg-[#070a12]/90 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[82px] items-center justify-between border-b border-white/[0.08] px-6">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <img src="/a-logo.png" alt="InfluxBridge" className="h-9 w-9 object-contain" />
              <div>
                <p className="text-sm font-bold tracking-tight">
                  Influx<span className="text-cyan-400">Bridge</span>
                </p>
                <p className="text-[8px] uppercase tracking-[0.24em] text-white/25">Operations OS</p>
              </div>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-white/35 hover:bg-white/5 hover:text-white lg:hidden">
              <X size={18} />
            </button>
          </div>

          <div className="mx-4 mt-5 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.07] via-white/[0.02] to-violet-500/[0.05] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10">
                <ShieldCheck size={17} className="text-cyan-300" />
              </div>
              <div>
                <p className="text-xs font-semibold">Operations</p>
                <p className="mt-0.5 text-[9px] text-white/30">Private workspace</p>
              </div>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.65)]" />
            </div>
          </div>

          <div className="px-5 pb-2 pt-7 text-[9px] font-medium uppercase tracking-[0.2em] text-white/20">Workspace</div>
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group relative flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-all ${active ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]" : "text-white/40 hover:bg-white/[0.035] hover:text-white/75"}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${active ? "bg-cyan-400/10 text-cyan-300" : "text-white/30 group-hover:text-white/60"}`}>
                      <Icon size={16} />
                    </span>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-[9px] ${active ? "bg-cyan-400/10 text-cyan-300/80" : "bg-white/[0.04] text-white/25"}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">System</span>
                <span className="text-[9px] text-emerald-300/70">ONLINE</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-cyan-400/70 to-violet-400/60" />
              </div>
              <p className="mt-2 text-[9px] text-white/20">Prototype systems operational</p>
            </div>
            <Link href="/" className="mt-3 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[10px] text-white/25 transition hover:bg-white/[0.03] hover:text-white/60">
              Public website <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </aside>

      <section className="relative lg:pl-[276px]">
        <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#04060c]/75 backdrop-blur-2xl">
          <div className="flex min-h-[82px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
            <div className="flex min-w-0 items-center gap-4">
              <button onClick={() => setMobileOpen(true)} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white/55 lg:hidden" aria-label="Open admin navigation">
                <Menu size={18} />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-cyan-300/55">
                  <span>InfluxBridge</span><span className="text-white/15">/</span><span>{meta.eyebrow.split(" / ")[1] ?? "Admin"}</span>
                </div>
                <h1 className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-xl">{meta.title}</h1>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[9px] text-white/25 md:block">
                <span className="mr-1.5 text-white/15">WORKSPACE</span> OPS-01
              </div>
              <button className="relative rounded-xl border border-white/[0.08] bg-white/[0.025] p-2.5 text-white/45 hover:text-white">
                <Bell size={17} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </button>
              <div className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-2.5 py-2 sm:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-[9px] font-bold">IB</div>
                <div>
                  <p className="text-[9px] font-semibold">Admin</p>
                  <p className="text-[8px] text-white/25">Operations</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1550px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="mb-7 border-b border-white/[0.06] pb-6">
            <p className="max-w-2xl text-xs leading-5 text-white/30 sm:text-sm">{meta.description}</p>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
