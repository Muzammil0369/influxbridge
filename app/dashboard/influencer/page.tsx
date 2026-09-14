"use client";

import Link from "next/link";
import { ArrowLeft, LayoutDashboard, CheckCircle2, Clock, DollarSign, Video } from "lucide-react";

export default function InfluencerDashboardPage() {
  return (
    <main className="relative min-h-screen bg-[#05060a] p-6 text-white lg:p-12">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute right-[-5%] top-[25%] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            Influencer Portal
          </span>
        </div>

        {/* Dashboard Header */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <LayoutDashboard className="h-6 w-6 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Creator Dashboard</h1>
              <p className="mt-1 text-xs text-white/45">
                Track active campaign offers, content submission milestones, and payment statuses.
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MetricCard
              icon={<Video className="h-5 w-5 text-cyan-300" />}
              label="Assigned Campaigns"
              value="0 Active"
            />
            <MetricCard
              icon={<Clock className="h-5 w-5 text-amber-300" />}
              label="Deliverables Pending"
              value="0 Videos"
            />
            <MetricCard
              icon={<DollarSign className="h-5 w-5 text-emerald-300" />}
              label="Earned Balance"
              value="0.00 USDT"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-xs text-white/40">{label}</span>
      </div>
      <p className="mt-3 text-xl font-semibold">{value}</p>
    </div>
  );
}