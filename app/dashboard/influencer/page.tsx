"use client";

import Link from "next/link";
import { LayoutDashboard, ArrowLeft } from "lucide-react";

export default function InfluencerDashboardPage() {
  return (
    <main className="relative min-h-screen bg-[#05060a] p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-cyan-400" />
            <h1 className="text-2xl font-semibold">Influencer Dashboard</h1>
          </div>
          <p className="mt-2 text-sm text-white/50">
            Welcome to your portal. Campaign assignments and deliverables will show up here.
          </p>
        </div>
      </div>
    </main>
  );
}