"use client";

import ScrollWorldLoader from "@/components/three/ScrollWorldLoader";
import { PageShell } from "@/components/layout/PageShell";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { TextReveal } from "@/components/ui/TextReveal";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Globe2,
  Handshake,
  Megaphone,
  Network,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const services = [
  { number: "01", icon: Globe2, title: "Market Entry", description: "Build a strong entry strategy for the Pakistani market with local insights, positioning, partnerships, and launch planning.", features: ["Pakistan market research", "Local positioning strategy", "Market opportunity analysis", "Launch planning"] },
  { number: "02", icon: Users, title: "Influencer Marketing", description: "Connect your brand with relevant creators across crypto, finance, forex, trading, and Web3 communities.", features: ["Influencer discovery", "Creator selection", "Campaign coordination", "Performance tracking"] },
  { number: "03", icon: Network, title: "Community Growth", description: "Reach and build communities around your product through strategic campaigns, creators, and local partnerships.", features: ["Community activation", "Audience growth", "Community partnerships", "Engagement strategy"] },
  { number: "04", icon: Handshake, title: "Partnerships", description: "Create meaningful local partnerships that help international companies establish relationships inside the market.", features: ["Local partner discovery", "Business introductions", "Strategic partnerships", "Relationship management"] },
  { number: "05", icon: Megaphone, title: "Campaign Management", description: "From planning to execution, we coordinate campaigns through one centralized agency workflow.", features: ["Campaign planning", "Creator coordination", "Content management", "Campaign reporting"] },
  { number: "06", icon: BarChart3, title: "Analytics & Reporting", description: "Turn campaign activity into useful insights with structured performance tracking and reporting.", features: ["Campaign metrics", "Creator performance", "Reach & engagement", "Performance reports"] },
];

const process = [
  { number: "01", title: "Understand", description: "We learn about your product, objectives, audience, budget, and market goals." },
  { number: "02", title: "Strategize", description: "We create a localized strategy designed around your campaign and target audience." },
  { number: "03", title: "Connect", description: "We identify relevant creators, communities, partners, and opportunities." },
  { number: "04", title: "Execute", description: "Our team coordinates the campaign from planning through delivery." },
  { number: "05", title: "Measure", description: "Campaign activity and performance are organized into clear reports and insights." },
];

export default function ServicesPage() {
  return (
    <PageShell>
      {/* 3D BACKGROUND CONTAINER - Locked behind the content */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <ScrollWorldLoader />
      </div>

      {/* CONTENT CONTAINER - Sits on top of the 3D world */}
      <div className="relative z-10">
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative flex min-h-[85vh] items-center px-6 pt-32 lg:px-12">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block"
            style={{
              width: "60%",
              background:
                "linear-gradient(to right, rgba(2,5,15,0.95) 0%, rgba(2,5,15,0.8) 50%, rgba(2,5,15,0.2) 80%, rgba(2,5,15,0) 100%)",
            }}
          />
          
          <div className="relative mx-auto w-full max-w-[1600px]">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/[0.06] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-sm">
                  <Zap className="h-3 w-3 animate-pulse text-cyan-400" />
                  What We Do
                </div>

                <h1
                  className="text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.92] tracking-[-0.04em]"
                  style={{
                    textShadow:
                      "0 4px 40px rgba(2,5,15,0.95), 0 2px 12px rgba(2,5,15,0.7)",
                  }}
                >
                  <TextReveal>Turn market</TextReveal>
                  <TextReveal delay={100}>opportunities into</TextReveal>
                  <TextReveal delay={200}>
  <span className="inline-block pb-2 pr-4 font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
    real growth.
  </span>
</TextReveal>
                </h1>

                <TextReveal delay={350}>
                  <p className="mt-10 max-w-2xl text-base leading-relaxed text-white/65 shadow-black text-shadow-sm">
                    InfluxBridge helps international fintech, crypto, forex, and
                    Web3 companies connect with the Pakistani market through
                    creators, communities, partnerships, and strategic campaigns.
                  </p>
                </TextReveal>

                <TextReveal delay={500}>
                  <div className="mt-12 flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold shadow-[0_8px_30px_rgba(34,211,238,0.3)] transition hover:brightness-110 hover:shadow-[0_8px_40px_rgba(34,211,238,0.5)]"
                    >
                      Start a Campaign
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/influencers"
                      className="rounded-full border border-white/15 bg-[#02050f]/60 px-7 py-3.5 text-sm font-semibold backdrop-blur-md transition hover:bg-white/[0.08]"
                    >
                      Explore Influencers
                    </Link>
                  </div>
                </TextReveal>
              </div>

              <div className="relative hidden lg:col-span-5 lg:block">
                <div className="space-y-4">
                  <TextReveal delay={300}>
                    <GradientBorder from="from-cyan-500/20" to="to-transparent">
                      <div className="group flex cursor-default items-center gap-4 bg-[#02050f]/40 p-5 backdrop-blur-md transition-colors hover:bg-cyan-900/10">
                        <div className="rounded-xl bg-cyan-500/10 p-3 transition-transform group-hover:scale-110">
                          <Globe2 className="h-5 w-5 text-cyan-300" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-white/30">
                            Market
                          </p>
                          <p className="text-sm font-medium">Pakistan</p>
                        </div>
                      </div>
                    </GradientBorder>
                  </TextReveal>

                  <TextReveal delay={450}>
                    <GradientBorder from="from-purple-500/20" to="to-transparent" className="ml-8">
                      <div className="group flex cursor-default items-center gap-4 bg-[#02050f]/40 p-5 backdrop-blur-md transition-colors hover:bg-purple-900/10">
                        <div className="rounded-xl bg-purple-500/10 p-3 transition-transform group-hover:scale-110">
                          <Network className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-white/30">
                            Network
                          </p>
                          <p className="text-sm font-medium">
                            Creators + Communities
                          </p>
                        </div>
                      </div>
                    </GradientBorder>
                  </TextReveal>

                  <TextReveal delay={600}>
                    <GradientBorder from="from-blue-500/20" to="to-transparent" className="ml-16">
                      <div className="group flex cursor-default items-center gap-4 bg-[#02050f]/40 p-5 backdrop-blur-md transition-colors hover:bg-blue-900/10">
                        <div className="rounded-xl bg-blue-500/10 p-3 transition-transform group-hover:scale-110">
                          <TrendingUp className="h-5 w-5 text-blue-300" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-white/30">
                            Focus
                          </p>
                          <p className="text-sm font-medium">Measurable Growth</p>
                        </div>
                      </div>
                    </GradientBorder>
                  </TextReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SERVICES ═══════════ */}
        <section className="relative z-10 border-t border-white/[0.06] px-6 py-32 lg:px-12 bg-[#02050f]/30 backdrop-blur-sm">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-20 max-w-2xl">
              <TextReveal>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Our Services
                </p>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl">
                  Everything you need to
                  <span className="text-white/40"> enter and grow.</span>
                </h2>
              </TextReveal>
            </div>

            <div className="space-y-4">
              {services.map((service, idx) => {
                const Icon = service.icon;
                const isEven = idx % 2 === 0;
                return (
                  <TextReveal key={service.number} delay={idx * 100}>
                    <GradientBorder
                      from={isEven ? "from-cyan-500/[0.14]" : "from-purple-500/[0.14]"}
                      to="to-transparent"
                    >
                      <div className="group grid gap-8 bg-[#02050f]/60 p-8 backdrop-blur-md transition-colors hover:bg-[#060b18]/80 md:grid-cols-12 md:items-center md:p-10">
                        <div className="flex items-center gap-6 md:col-span-4">
                          <div className="text-[10px] font-semibold tracking-widest text-white/20">
                            {service.number}
                          </div>
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors ${
                              isEven
                                ? "border-cyan-400/20 bg-cyan-500/[0.08] group-hover:bg-cyan-500/20"
                                : "border-purple-400/20 bg-purple-500/[0.08] group-hover:bg-purple-500/20"
                            }`}
                          >
                            <Icon
                              className={`h-6 w-6 transition-transform group-hover:scale-110 ${
                                isEven ? "text-cyan-300" : "text-purple-300"
                              }`}
                            />
                          </div>
                          <h3 className="text-xl font-semibold">
                            {service.title}
                          </h3>
                        </div>

                        <p className="text-sm leading-relaxed text-white/50 transition-colors group-hover:text-white/70 md:col-span-5">
                          {service.description}
                        </p>

                        <div className="flex items-center justify-between gap-6 md:col-span-3">
                          <div className="hidden md:block">
                            <div className="space-y-1.5">
                              {service.features.slice(0, 2).map((f) => (
                                <div
                                  key={f}
                                  className="flex items-center gap-2 text-[11px] text-white/40"
                                >
                                  <Check className="h-3 w-3 shrink-0 text-cyan-400" />
                                  {f}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10">
                            <ArrowRight className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                          </div>
                        </div>
                      </div>
                    </GradientBorder>
                  </TextReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ WHY INFLUXBRIDGE ═══════════ */}
        <section className="relative z-10 border-y border-white/[0.06] bg-[#02050f]/40 px-6 py-32 backdrop-blur-sm lg:px-12">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-end">
              <div>
                <TextReveal>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    Why InfluxBridge
                  </p>
                </TextReveal>
                <TextReveal delay={100}>
                  <h2 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl">
                    One partner.
                    <span className="block text-white/40">
                      One connected growth strategy.
                    </span>
                  </h2>
                </TextReveal>
              </div>
              <TextReveal delay={200}>
                <p className="max-w-lg leading-relaxed text-white/50 lg:pb-2">
                  Instead of managing creators, communities, partnerships, and
                  campaign execution separately, companies can work with one
                  centralized partner focused on the local market.
                </p>
              </TextReveal>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Target, title: "Local Strategy", desc: "Strategies designed around local audiences, communities, and market conditions.", color: "cyan" },
                { icon: Users, title: "Creator Network", desc: "Discover relevant creators across finance, crypto, forex, and Web3.", color: "purple" },
                { icon: TrendingUp, title: "Growth Focus", desc: "Campaigns built around measurable objectives instead of vanity metrics.", color: "blue" },
                { icon: ShieldCheck, title: "Centralized Management", desc: "One agency coordinates the moving parts of your campaign from start to finish.", color: "emerald" },
              ].map((f, i) => {
                const Icon = f.icon;
                const colorMap: Record<string, string> = {
                  cyan: "border-cyan-400/20 bg-cyan-500/[0.08] text-cyan-300",
                  purple: "border-purple-400/20 bg-purple-500/[0.08] text-purple-300",
                  blue: "border-blue-400/20 bg-blue-500/[0.08] text-blue-300",
                  emerald: "border-emerald-400/20 bg-emerald-500/[0.08] text-emerald-300",
                };
                return (
                  <TextReveal key={f.title} delay={i * 100}>
                    <GradientBorder from={`from-${f.color}-500/20`} to="to-transparent">
                      <div className="group flex h-full flex-col bg-[#02050f]/60 p-7 backdrop-blur-md transition hover:bg-[#060b18]">
                        <div
                          className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform group-hover:scale-110 ${colorMap[f.color]}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold">{f.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/45">
                          {f.desc}
                        </p>
                      </div>
                    </GradientBorder>
                  </TextReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ PROCESS ═══════════ */}
        <section className="relative z-10 px-6 py-32 lg:px-12 bg-[#02050f]/30 backdrop-blur-sm">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-20 max-w-2xl">
              <TextReveal>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Our Process
                </p>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl">
                  From strategy
                  <span className="text-white/40"> to execution.</span>
                </h2>
              </TextReveal>
            </div>

            <div className="relative">
              <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/10 to-transparent md:bottom-auto md:left-0 md:right-0 md:top-[18px] md:h-px md:w-full md:bg-gradient-to-r" />

              <div className="grid gap-10 md:grid-cols-5 md:gap-6">
                {process.map((p, i) => (
                  <TextReveal key={p.number} delay={i * 150}>
                    <div className="group relative pl-12 md:pl-0">
                      <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-[#02050f] text-[11px] font-bold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-shadow group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] md:relative md:mb-6">
                        {p.number}
                      </div>
                      <h3 className="text-lg font-semibold group-hover:text-cyan-300 transition-colors">{p.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                        {p.description}
                      </p>
                    </div>
                  </TextReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="relative z-10 px-6 pb-32 lg:px-12 bg-[#02050f]/30 backdrop-blur-sm">
          <TextReveal>
            <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-gradient-to-br from-blue-500/[0.10] via-white/[0.02] to-purple-500/[0.08] px-8 py-20 text-center backdrop-blur-md sm:px-16">
              <div className="animate-pulse-glow absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-4xl font-light leading-tight tracking-tight sm:text-5xl">
                  Ready to enter the market?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-sm text-white/50">
                  Tell us what you're building and what you want to achieve. We'll
                  help you design the right campaign strategy.
                </p>
                <Link
                  href="/contact"
                  className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-8 py-3.5 text-sm font-semibold shadow-[0_4px_24px_rgba(34,211,238,0.2)] transition hover:brightness-110 hover:shadow-[0_8px_32px_rgba(34,211,238,0.4)]"
                >
                  Start a Campaign
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </TextReveal>
        </section>
      </div>
    </PageShell>
  );
}