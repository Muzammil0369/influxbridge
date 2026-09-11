"use client";

import { PageShell } from "@/components/layout/PageShell";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { TextReveal } from "@/components/ui/TextReveal";
import {
  ArrowRight,
  Globe2,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const principles = [
  {
    icon: Target,
    title: "Local Intelligence",
    description:
      "We focus on understanding the local market, audience, communities, and opportunities before building a campaign.",
  },
  {
    icon: Network,
    title: "Connected Network",
    description:
      "Creators, communities, businesses, and partnerships come together through one centralized agency.",
  },
  {
    icon: TrendingUp,
    title: "Growth Mindset",
    description:
      "We care about meaningful business outcomes rather than simply producing content.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Execution",
    description:
      "We aim to build structured, transparent workflows that can scale with our clients and partners.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      {/* ATMOSPHERIC BACKGROUND GLOWS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute right-1/4 top-2/3 h-[600px] w-[600px] rounded-full bg-purple-600/[0.04] blur-[140px]" />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-6 pb-24 pt-36 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-4xl">
            <TextReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#031529]/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,170,255,0.2)]">
                <Globe2 className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
                About InfluxBridge
              </div>
            </TextReveal>

            <h1
              className="text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.045em]"
              style={{
                textShadow:
                  "0 4px 40px rgba(2,5,15,0.95), 0 2px 12px rgba(2,5,15,0.7)",
              }}
            >
              <TextReveal>Building the bridge</TextReveal>
              <TextReveal delay={100}>between</TextReveal>
              <TextReveal delay={200}>
                <span className="mt-2 block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#16b5ff] via-[#168dff] to-[#a044ff] drop-shadow-[0_0_30px_rgba(0,150,255,0.4)] pr-4">
                  global brands and local growth.
                </span>
              </TextReveal>
            </h1>

            <TextReveal delay={400}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-blue-100/80">
                InfluxBridge is a technology-enabled marketing and market-entry agency designed to help international fintech, crypto, forex, and Web3 companies connect with audiences and opportunities in Pakistan.
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative z-10 border-y border-white/[0.06] bg-[#01060d]/70 px-6 py-28 backdrop-blur-sm lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <TextReveal>
              <span className="inline-flex rounded-full border border-cyan-500/60 bg-[#031529]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md">
                Our Mission
              </span>
            </TextReveal>
            <TextReveal delay={100}>
              <h2 className="mt-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl text-white">
                Make market entry
                <br />
                <span className="bg-gradient-to-r from-white/70 to-white/20 bg-clip-text text-transparent">
                  more connected.
                </span>
              </h2>
            </TextReveal>
          </div>

          <div className="space-y-6">
            <TextReveal delay={200}>
              <p className="text-base leading-relaxed text-white/70">
                International companies entering a new market often need more than advertising. They need local relationships, relevant creators, community access, strategic positioning, and a team capable of coordinating everything.
              </p>
            </TextReveal>
            <TextReveal delay={300}>
              <p className="text-base leading-relaxed text-white/70">
                InfluxBridge is built around that exact vision: bringing these capabilities together under one professional, elite partner.
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="relative z-10 px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-2xl">
            <TextReveal>
              <span className="inline-flex rounded-full border border-cyan-500/60 bg-[#031529]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md">
                How We Think
              </span>
            </TextReveal>
            <TextReveal delay={100}>
              <h2 className="mt-4 text-4xl font-light leading-tight tracking-tight sm:text-5xl text-white">
                Four principles.
                <span className="text-white/40"> One direction.</span>
              </h2>
            </TextReveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {principles.map((principle, i) => {
              const Icon = principle.icon;
              return (
                <TextReveal key={principle.title} delay={i * 100}>
                  <GradientBorder from="from-cyan-500/30" to="to-transparent">
                    <div className="group flex h-full flex-col bg-gradient-to-b from-[#06172c]/80 to-[#020b17]/90 p-8 backdrop-blur-md transition-all hover:border-cyan-400">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,.2)] transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-7 text-xl font-bold text-white">
                        {principle.title}
                      </h3>
                      <p className="mt-4 max-w-xl leading-relaxed text-white/60">
                        {principle.description}
                      </p>
                    </div>
                  </GradientBorder>
                </TextReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODEL */}
      <section className="relative z-10 border-y border-white/[0.06] bg-[#01060d]/70 px-6 py-28 backdrop-blur-sm lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="text-center">
            <TextReveal>
              <span className="inline-flex rounded-full border border-cyan-500/60 bg-[#031529]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md">
                The InfluxBridge Model
              </span>
            </TextReveal>
            <TextReveal delay={100}>
              <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light tracking-tight sm:text-5xl text-white">
                One agency connecting
                <span className="text-white/40"> multiple sides.</span>
              </h2>
            </TextReveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3 items-center">
            <ModelCard
              icon={Globe2}
              title="Global Companies"
              description="International fintech, crypto, forex, and Web3 companies looking to reach the Pakistani market."
            />

            <div className="relative flex items-center justify-center py-8 md:py-0">
              <div className="absolute hidden h-px w-full bg-gradient-to-r from-cyan-500/0 via-cyan-400/40 to-purple-500/0 md:block" />
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-cyan-400/80 bg-gradient-to-br from-[#041e3d] to-[#010b18] shadow-[0_0_50px_rgba(0,180,255,0.5)] backdrop-blur-xl">
                <div className="absolute inset-0 rounded-full border border-cyan-300/30 animate-ping opacity-20" />
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <img
                    src="/a-logo.png"
                    alt="InfluxBridge"
                    className="h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(0,180,255,0.8)]"
                  />
                  <p className="mt-2 text-xs font-bold tracking-wider text-cyan-300">
                    InfluxBridge
                  </p>
                </div>
              </div>
            </div>

            <ModelCard
              icon={Users}
              title="Local Network"
              description="Creators, communities, partners, and market relationships that help brands connect with relevant audiences."
            />
          </div>
        </div>
      </section>

      {/* FUTURE / CTA */}
      <section className="relative z-10 px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <TextReveal>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_20px_rgba(0,160,255,0.3)]">
              <Zap className="h-6 w-6" />
            </div>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="mt-6 text-4xl font-light tracking-tight sm:text-5xl text-white">
              Agency first.
              <br />
              <span className="text-white/40">Technology powered.</span>
            </h2>
          </TextReveal>
          <TextReveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
              Our long-term vision is to combine human relationships and strategic execution with technology that makes campaigns easier to manage, measure, and scale.
            </p>
          </TextReveal>
          <TextReveal delay={300}>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#08a9f8] to-[#9840f1] px-9 py-4 text-base font-bold shadow-[0_0_35px_rgba(0,140,255,0.5)] transition-all hover:scale-105 hover:brightness-110"
            >
              Work With InfluxBridge
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </TextReveal>
        </div>
      </section>
    </PageShell>
  );
}

function ModelCard({
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
      <div className="flex h-full flex-col bg-gradient-to-b from-[#06172c]/80 to-[#020b17]/90 p-8 text-center backdrop-blur-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,.2)]">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
        <p className="mt-4 leading-relaxed text-white/60">{description}</p>
      </div>
    </GradientBorder>
  );
}