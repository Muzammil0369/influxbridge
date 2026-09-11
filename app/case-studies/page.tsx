"use client";

import { PageShell } from "@/components/layout/PageShell";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { TextReveal } from "@/components/ui/TextReveal";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  TrendingUp,
  Users,
} from "lucide-react";

const campaigns = [
  {
    title: "Pakistan Market Launch",
    client: "Global Crypto Platform",
    category: "Market Entry",
    duration: "30 Days",
    influencers: "24",
    reach: "2.4M",
    engagement: "6.8%",
    content: "87",
    description:
      "A localized creator campaign designed to introduce a global digital-asset platform to Pakistan's growing trading audience.",
    tags: ["Crypto", "Influencers", "Market Entry"],
  },
  {
    title: "Trading Community Growth",
    client: "Global Trading Platform",
    category: "Community Growth",
    duration: "45 Days",
    influencers: "31",
    reach: "3.7M",
    engagement: "7.2%",
    content: "112",
    description:
      "A creator-led growth campaign combining educational content, community activation, and targeted trading audiences.",
    tags: ["Forex", "Community", "Trading"],
  },
  {
    title: "Web3 Awareness Campaign",
    client: "Web3 Technology Brand",
    category: "Influencer Marketing",
    duration: "21 Days",
    influencers: "18",
    reach: "1.8M",
    engagement: "8.1%",
    content: "64",
    description:
      "A multi-platform awareness campaign connecting a Web3 brand with technology-focused creators and communities.",
    tags: ["Web3", "Creators", "Awareness"],
  },
];

export default function CaseStudiesPage() {
  return (
    <PageShell>
      {/* ATMOSPHERIC BACKGROUND GLOWS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute right-1/4 top-2/3 h-[600px] w-[600px] rounded-full bg-purple-600/[0.04] blur-[140px]" />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-6 pb-20 pt-36 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-4xl">
            <TextReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#031529]/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,170,255,0.2)]">
                <BarChart3 className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
                Campaign Intelligence
              </div>
            </TextReveal>

            <h1
              className="text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.045em]"
              style={{
                textShadow:
                  "0 4px 40px rgba(2,5,15,0.95), 0 2px 12px rgba(2,5,15,0.7)",
              }}
            >
              <TextReveal>Strategy is good.</TextReveal>
              <TextReveal delay={150}>
                <span className="mt-2 block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#16b5ff] via-[#168dff] to-[#a044ff] drop-shadow-[0_0_30px_rgba(0,150,255,0.4)] pr-4">
                  Results are better.
                </span>
              </TextReveal>
            </h1>

            <TextReveal delay={350}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-blue-100/80">
                Explore example campaign structures showing how InfluxBridge can combine creators, communities, partnerships, and localized strategy into one coordinated campaign.
              </p>
            </TextReveal>

            <TextReveal delay={450}>
              <div className="mt-8 max-w-2xl rounded-2xl border border-yellow-400/30 bg-yellow-400/[0.06] px-6 py-4 text-xs leading-relaxed text-yellow-200/80 backdrop-blur-md shadow-[0_0_25px_rgba(234,179,8,0.1)]">
                <strong className="font-bold text-yellow-300">Demo data:</strong>{" "}
                The campaign figures on this page are sample figures for the website prototype and are not presented as actual client results.
              </div>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section className="relative z-10 px-6 pb-24 pt-12 lg:px-12">
        <div className="mx-auto max-w-[1600px] space-y-10">
          {campaigns.map((campaign, index) => (
            <TextReveal key={campaign.title} delay={index * 100}>
              <article className="group overflow-hidden rounded-[2.5rem] border border-blue-500/30 bg-gradient-to-b from-[#06172c]/80 to-[#020b17]/90 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400 shadow-[0_0_30px_rgba(0,90,190,0.1)]">
                <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                  {/* Visual */}
                  <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500/[0.12] via-transparent to-purple-500/[0.12]">
                    <div className="absolute h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />

                    <div className="relative h-56 w-56 rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 shadow-[0_0_40px_rgba(0,180,255,0.2)]">
                      <div className="absolute inset-8 rounded-full border border-white/10" />

                      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,0.3)] backdrop-blur-xl">
                        <TrendingUp className="h-7 w-7" />
                      </div>

                      <div className="absolute left-[-20px] top-8 rounded-xl border border-blue-400/40 bg-[#031326]/90 px-4 py-2.5 backdrop-blur-xl shadow-lg">
                        <p className="text-[9px] uppercase tracking-widest text-white/50 font-semibold">
                          Reach
                        </p>
                        <p className="mt-1 text-sm font-bold text-cyan-300">
                          {campaign.reach}
                        </p>
                      </div>

                      <div className="absolute bottom-6 right-[-25px] rounded-xl border border-blue-400/40 bg-[#031326]/90 px-4 py-2.5 backdrop-blur-xl shadow-lg">
                        <p className="text-[9px] uppercase tracking-widest text-white/50 font-semibold">
                          Engagement
                        </p>
                        <p className="mt-1 text-sm font-bold text-purple-300">
                          {campaign.engagement}
                        </p>
                      </div>
                    </div>

                    <div className="absolute left-7 top-7 text-xs font-bold text-white/30">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 sm:p-10 lg:p-12">
                    <div className="flex flex-wrap gap-2">
                      {campaign.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cyan-400/40 bg-[#031529]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-6 text-xs uppercase tracking-[0.2em] text-cyan-300 font-bold">
                      {campaign.client}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-white">
                      {campaign.title}
                    </h2>

                    <p className="mt-5 max-w-2xl leading-relaxed text-white/70">
                      {campaign.description}
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <Metric label="Duration" value={campaign.duration} />
                      <Metric label="Influencers" value={campaign.influencers} />
                      <Metric label="Reach" value={campaign.reach} />
                      <Metric label="Content" value={campaign.content} />
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-sm font-bold text-cyan-300 transition group-hover:gap-3">
                      View Campaign Structure
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </article>
            </TextReveal>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section className="relative z-10 border-y border-white/[0.06] bg-[#01060d]/70 px-6 py-28 backdrop-blur-sm lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-2xl">
            <TextReveal>
              <span className="inline-flex rounded-full border border-cyan-500/60 bg-[#031529]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md">
                Campaign Approach
              </span>
            </TextReveal>
            <TextReveal delay={100}>
              <h2 className="mt-4 text-4xl font-light leading-tight tracking-tight sm:text-5xl text-white">
                Built around the
                <span className="text-white/40"> full picture.</span>
              </h2>
            </TextReveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <ApproachCard
              icon={Globe2}
              title="Local Understanding"
              description="Campaigns start with the audience, market, and local context rather than a generic global strategy."
            />
            <ApproachCard
              icon={Users}
              title="Creator Network"
              description="Creators are selected around audience relevance, content fit, and campaign objectives."
            />
            <ApproachCard
              icon={BarChart3}
              title="Performance"
              description="Campaign activity is organized into measurable metrics and structured reporting."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24 lg:px-12">
        <TextReveal>
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] border border-blue-500/60 bg-gradient-to-b from-[#06172c]/90 to-[#020b17]/95 px-8 py-20 text-center backdrop-blur-xl sm:px-16 shadow-[0_0_60px_rgba(0,140,255,0.3)]">
            <div className="absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="relative z-10">
              <span className="inline-flex rounded-full border border-cyan-500/60 bg-[#031529]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md mb-4">
                Let's Partner
              </span>
              <h2 className="mx-auto max-w-2xl text-4xl font-light leading-tight tracking-tight sm:text-5xl text-white">
                Build your next campaign with us.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
                Tell us what you're trying to achieve and we'll help design the right market and creator strategy.
              </p>
              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#08a9f8] to-[#9840f1] px-9 py-4 text-base font-bold shadow-[0_0_35px_rgba(0,140,255,0.5)] transition-all hover:scale-105 hover:brightness-110"
              >
                Start a Campaign
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </TextReveal>
      </section>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-blue-500/30 bg-[#031326]/60 p-4 backdrop-blur-sm">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">
        {label}
      </p>
    </div>
  );
}

function ApproachCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Globe2;
  title: string;
  description: string;
}) {
  return (
    <GradientBorder from="from-cyan-500/30" to="to-transparent">
      <div className="flex h-full flex-col bg-gradient-to-b from-[#06172c]/80 to-[#020b17]/90 p-8 backdrop-blur-md">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,.2)]">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p>
      </div>
    </GradientBorder>
  );
}