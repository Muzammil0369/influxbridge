"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, Bell, BriefcaseBusiness, LayoutDashboard,
  LogOut, Menu, MessageSquare, ShieldCheck, Users, X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: BriefcaseBusiness, countKey: "leads" },
  { href: "/admin/campaigns", label: "Campaigns", icon: Activity, countKey: "campaigns" },
  { href: "/admin/influencers", label: "Influencers", icon: Users, countKey: "influencers" },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, countKey: "messages" },
];

const pageMeta: Record<string, { eyebrow: string; title: string; description: string }> = {
  "/admin": { eyebrow: "Workspace / Overview", title: "Operations overview", description: "Your agency at a glance — incoming opportunities, creator reviews, campaign delivery, and conversations." },
  "/admin/leads": { eyebrow: "Business development / Leads", title: "Lead pipeline", description: "Track real company enquiries and move opportunities through the sales pipeline." },
  "/admin/campaigns": { eyebrow: "Delivery / Campaigns", title: "Campaign operations", description: "Monitor campaign budgets, client accounts, deadlines, and delivery stages." },
  "/admin/influencers": { eyebrow: "Creator network / Influencers", title: "Creator network", description: "Review creator profiles and manage verification across the InfluxBridge network." },
  "/admin/messages": { eyebrow: "Communications / Messages", title: "Message activity", description: "Review recent communication across company, creator, and campaign conversations." },
};

type Counts = { leads: number; campaigns: number; influencers: number; messages: number };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState<Counts>({ leads: 0, campaigns: 0, influencers: 0, messages: 0 });
  const [userLabel, setUserLabel] = useState("Admin");
  const [userEmail, setUserEmail] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const supabase = useMemo(() => createClient(), []);
  const meta = pageMeta[pathname] ?? pageMeta["/admin"];

  const loadWorkspace = useCallback(async () => {
    const [leads, campaigns, influencers, messages, userResult] = await Promise.all([
      supabase.from("leads").select("id", { count: "exact", head: true }),
      supabase.from("campaigns").select("id", { count: "exact", head: true }),
      supabase.from("influencer_profiles").select("id", { count: "exact", head: true }),
      supabase.from("messages").select("id", { count: "exact", head: true }),
      supabase.auth.getUser(),
    ]);
    setCounts({
      leads: leads.count ?? 0,
      campaigns: campaigns.count ?? 0,
      influencers: influencers.count ?? 0,
      messages: messages.count ?? 0,
    });
    if (userResult.data.user) {
      setUserEmail(userResult.data.user.email ?? "");
      const { data } = await supabase.from("profiles").select("full_name").eq("id", userResult.data.user.id).maybeSingle();
      setUserLabel(data?.full_name || userResult.data.user.email?.split("@")[0] || "Admin");
    }
  }, [supabase]);

  useEffect(() => {
    void loadWorkspace();
    const channel = supabase.channel("admin-shell-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => void loadWorkspace())
      .on("postgres_changes", { event: "*", schema: "public", table: "campaigns" }, () => void loadWorkspace())
      .on("postgres_changes", { event: "*", schema: "public", table: "influencer_profiles" }, () => void loadWorkspace())
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => void loadWorkspace())
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [loadWorkspace, supabase]);

  async function signOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    window.location.assign("/login");
  }

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden"><div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.035] blur-[120px]"/><div className="absolute right-0 top-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.025] blur-[140px]"/></div>
      <aside className={`fixed inset-y-0 left-0 z-50 w-[270px] border-r border-white/[0.08] bg-[#080b13]/95 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3"><img src="/a-logo.png" alt="InfluxBridge" className="h-9 w-9 object-contain"/><div><p className="text-sm font-bold tracking-tight">Influx<span className="text-cyan-400">Bridge</span></p><p className="mt-0.5 text-[8px] uppercase tracking-[0.23em] text-white/30">Agency workspace</p></div></Link>
            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-white/40 hover:bg-white/5 lg:hidden" aria-label="Close navigation"><X size={17}/></button>
          </div>
          <div className="mx-4 mt-5 rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.08] via-white/[0.02] to-violet-500/[0.05] p-4">
            <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/10"><ShieldCheck size={17} className="text-cyan-200"/></div><div className="min-w-0"><p className="text-xs font-semibold">Admin workspace</p><p className="mt-1 truncate text-[9px] text-white/35">Secure operations console</p></div><span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400"/></div>
          </div>
          <p className="px-5 pb-2 pt-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">Manage</p>
          <nav className="space-y-1 px-3">{navItems.map(item => {
            const Icon = item.icon;
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const badge = item.countKey ? counts[item.countKey as keyof Counts] : null;
            return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] transition ${active ? "bg-cyan-300/[0.09] text-white shadow-[inset_0_0_0_1px_rgba(103,232,249,.12)]" : "text-white/50 hover:bg-white/[0.04] hover:text-white/85"}`}>
              <span className="flex items-center gap-3"><span className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${active ? "bg-cyan-300/10 text-cyan-200" : "text-white/40 group-hover:text-white/75"}`}><Icon size={16}/></span>{item.label}</span>
              {badge !== null && <span className={`min-w-6 rounded-md px-1.5 py-1 text-center text-[9px] tabular-nums ${active ? "bg-cyan-300/10 text-cyan-100" : "bg-white/[0.045] text-white/35"}`}>{badge}</span>}
            </Link>;
          })}</nav>
          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5"><div className="flex items-center justify-between"><span className="text-[9px] uppercase tracking-[0.18em] text-white/35">Data connection</span><span className="flex items-center gap-1.5 text-[9px] text-emerald-300/80"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>Supabase</span></div><p className="mt-2 text-[10px] leading-4 text-white/35">Counts reflect records available to your current admin session.</p></div>
            <Link href="/" className="mt-2 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[10px] text-white/35 transition hover:bg-white/[0.03] hover:text-white/70">Public website <ArrowUpRight size={12}/></Link>
          </div>
        </div>
      </aside>
      <section className="relative lg:pl-[270px]">
        <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#05070d]/85 backdrop-blur-2xl">
          <div className="flex min-h-[76px] items-center justify-between gap-4 px-5 sm:px-8 xl:px-10">
            <div className="flex min-w-0 items-center gap-3"><button onClick={() => setMobileOpen(true)} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white/55 lg:hidden" aria-label="Open admin navigation"><Menu size={17}/></button><div className="min-w-0"><div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.17em] text-white/35"><span>Workspace</span><span className="text-white/15">/</span><span className="truncate text-cyan-200/70">{meta.eyebrow.split(" / ").at(-1)}</span></div><h1 className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-xl">{meta.title}</h1></div></div>
            <div className="flex shrink-0 items-center gap-2"><div className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 md:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/><span className="text-[9px] text-white/45">Connected workspace</span></div><div className="hidden h-8 w-px bg-white/10 sm:block"/><div className="hidden min-w-0 max-w-[190px] items-center gap-2 sm:flex"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/15 to-violet-400/15 text-[10px] font-bold text-cyan-100">{userLabel.split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase()}</div><div className="min-w-0"><p className="truncate text-[10px] font-semibold text-white/85">{userLabel}</p><p className="truncate text-[9px] text-white/35">{userEmail || "Administrator"}</p></div></div><button onClick={() => void signOut()} disabled={signingOut} className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2.5 text-[10px] text-white/50 transition hover:border-red-300/20 hover:text-red-200 disabled:opacity-50" title="Sign out"><LogOut size={14}/><span className="hidden md:inline">{signingOut ? "Signing out…" : "Sign out"}</span></button></div>
          </div>
          <div className="border-t border-white/[0.04] px-5 py-2 sm:px-8 xl:px-10"><p className="text-[10px] text-white/35">{meta.description}</p></div>
        </header>
        <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8 xl:px-10">{children}</div>
      </section>
    </main>
  );
}
