import ScrollWorldLoader from "@/components/three/ScrollWorldLoader";
import { PageShell } from "@/components/layout/PageShell";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TextReveal } from "@/components/ui/TextReveal";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  LineChart,
  Network,
  Play,
  TrendingUp,
  Users,
} from "lucide-react";

const creators = [
  { name: "CryptoWithAli", niche: "Crypto / Trading", followers: "245K", engagement: "4.8%", avatar: "https://i.pravatar.cc/150?img=12", color: "from-blue-500 to-cyan-500" },
  { name: "Web3 Queen", niche: "Web3 / DeFi", followers: "182K", engagement: "5.4%", avatar: "https://i.pravatar.cc/150?img=45", color: "from-purple-500 to-pink-500" },
  { name: "TechWithHamza", niche: "Blockchain / Tech", followers: "420K", engagement: "6.1%", avatar: "https://i.pravatar.cc/150?img=33", color: "from-orange-500 to-red-500" },
  { name: "NFT Explorer", niche: "NFTs / Gaming", followers: "310K", engagement: "5.2%", avatar: "https://i.pravatar.cc/150?img=68", color: "from-emerald-500 to-teal-500" },
];

const caseStudies = [
  { title: "ChainVerse", stat: "+280%", metric: "Community Growth", gradient: "from-purple-900/60 to-indigo-950/60" },
  { title: "MetaLedger", stat: "+540%", metric: "Engagement", gradient: "from-blue-900/60 to-cyan-950/60" },
  { title: "NovaSwap", stat: "+320%", metric: "Brand Awareness", gradient: "from-fuchsia-900/60 to-purple-950/60" },
  { title: "OrbitChain", stat: "+210%", metric: "User Signups", gradient: "from-cyan-900/60 to-blue-950/60" },
];

export default function Home() {
  return (
    <PageShell>
      {/* 3D BACKGROUND CONTAINER - Locked behind the content */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <ScrollWorldLoader />
      </div>

      {/* CONTENT CONTAINER - Sits on top of the 3D world */}
      <div className="relative z-10">
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative flex min-h-screen items-center pt-20">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block"
            style={{
              width: "55%",
              background:
                "linear-gradient(to right, rgba(2,5,15,0.97) 0%, rgba(2,5,15,0.9) 50%, rgba(2,5,15,0.4) 80%, rgba(2,5,15,0) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom, rgba(2,5,15,0.95) 0%, rgba(2,5,15,0.85) 55%, rgba(2,5,15,0.4) 100%)",
            }}
          />

          <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-12">
            {/* LEFT — copy */}
            <div className="flex flex-col justify-center lg:col-span-7">
              <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/[0.06] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                Web3 Growth Infrastructure
              </div>

              {/* FIX: Removed the inline text-shadow from the h1 container to stop the dark box glitch */}
              <h1 className="text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.92] tracking-[-0.04em]">
                <TextReveal>Connect</TextReveal>
                <TextReveal delay={100}>
                  {/* FIX: Added leading-[1.1] pb-4 pr-6 to give the cursive letters room so they don't cut off */}
                  <span className="block leading-[1.1] pb-4 pr-6 font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
                    brands
                  </span>
                </TextReveal>
                <TextReveal delay={200}>with influence.</TextReveal>
              </h1>

              <TextReveal delay={400}>
                <p className="mt-10 max-w-xl text-base leading-relaxed text-white/65 shadow-black text-shadow-sm">
                  InfluxBridge is the bridge between Web3 companies and
                  top-tier creators. We build high-performance influencer
                  campaigns that drive real engagement, community growth and
                  long-term value.
                </p>
              </TextReveal>

              <TextReveal delay={550}>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold shadow-[0_8px_30px_rgba(34,211,238,0.35)] transition hover:brightness-110 hover:shadow-[0_8px_40px_rgba(34,211,238,0.5)]"
                  >
                    Start a Campaign
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/influencers"
                    className="rounded-full border border-white/15 bg-[#02050f]/60 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.08]"
                  >
                    Explore Influencers
                  </Link>
                </div>
              </TextReveal>

              <TextReveal delay={700}>
                <div className="mt-12 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[
                      "https://i.pravatar.cc/80?img=1",
                      "https://i.pravatar.cc/80?img=5",
                      "https://i.pravatar.cc/80?img=9",
                      "https://i.pravatar.cc/80?img=15",
                      "https://i.pravatar.cc/80?img=32",
                    ].map((src, i) => (
                      <div
                        key={i}
                        className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#02050f] bg-[#0a1226]"
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-medium text-white/50">
                    Trusted by <span className="text-white">50+</span> Web3 brands
                  </div>
                </div>
              </TextReveal>
            </div>

            {/* RIGHT — metric ticker */}
            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="flex h-screen items-center border-l border-white/[0.06] pl-12">
                <div className="flex w-full flex-col gap-4">
                  {[
                    { value: 10000, suffix: "+", label: "Community Reach" },
                    { value: 500, suffix: "+", label: "Verified Creators" },
                    { value: 50, suffix: "+", label: "Campaigns" },
                    { value: 24, suffix: "/7", label: "Global Support" },
                  ].map((m, i) => (
                    <TextReveal key={i} delay={i * 150 + 400}>
                      <div className="group cursor-default rounded-2xl border border-white/[0.06] bg-[#02050f]/60 p-5 text-right backdrop-blur-md transition-colors hover:border-cyan-400/20 hover:bg-[#060b18]/80">
                        <div
                          className="text-5xl font-light tracking-tight text-white transition-colors group-hover:text-cyan-300"
                          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.85)" }}
                        >
                          <AnimatedCounter value={m.value} suffix={m.suffix} />
                        </div>
                        <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                          {m.label}
                        </div>
                      </div>
                    </TextReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SERVICES ═══════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-32 lg:px-12">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl">
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
            <TextReveal delay={200}>
              <Link
                href="/services"
                className="group flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
              >
                Explore all services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            <GradientBorder className="md:col-span-4 md:row-span-2" from="from-cyan-500/20" to="to-transparent">
              <div className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden bg-[#060b18]/50 p-8 transition-colors hover:bg-[#060b18]/80">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl transition duration-500 group-hover:scale-110 group-hover:bg-cyan-500/20" />
                <div className="relative">
                  <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 transition-transform group-hover:scale-110">
                    <Globe2 className="h-6 w-6 text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-semibold">Market Entry</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50 transition-colors group-hover:text-white/70">
                    Launch in new markets with local creators, community support, and a strategy built for the Pakistani Web3 landscape.
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-2 text-sm font-medium text-cyan-300">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </GradientBorder>

            <GradientBorder className="md:col-span-2" from="from-purple-500/15" to="to-transparent">
              <div className="group flex h-full flex-col bg-[#060b18]/50 p-6 transition-colors hover:bg-[#060b18]/80">
                <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 transition-transform group-hover:scale-110">
                  <Users className="h-5 w-5 text-purple-300" />
                </div>
                <h3 className="text-lg font-semibold">Influencer Network</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/45 transition-colors group-hover:text-white/60">
                  Verified creators across crypto, Web3, trading and tech.
                </p>
              </div>
            </GradientBorder>

            <GradientBorder className="md:col-span-2" from="from-blue-500/15" to="to-transparent">
              <div className="group flex h-full flex-col bg-[#060b18]/50 p-6 transition-colors hover:bg-[#060b18]/80">
                <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 transition-transform group-hover:scale-110">
                  <BarChart3 className="h-5 w-5 text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold">Campaign Management</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/45 transition-colors group-hover:text-white/60">
                  From creator selection to reporting and optimization.
                </p>
              </div>
            </GradientBorder>

            <GradientBorder className="md:col-span-6" from="from-white/[0.10]" to="to-transparent">
              <div className="flex flex-col items-start gap-6 bg-[#060b18]/50 p-8 transition-colors hover:bg-[#060b18]/80 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Network className="h-5 w-5 text-white/80" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Growth Infrastructure</h3>
                    <p className="mt-1 text-sm text-white/45">
                      Data-driven strategies, performance tracking and real results.
                    </p>
                  </div>
                </div>
                <Link
                  href="/services"
                  className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </GradientBorder>
          </div>
        </section>

        {/* ═══════════ CREATORS ═══════════ */}
        <section className="relative z-10 border-t border-white/[0.06] bg-[#02050f]/30 py-32 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
            <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-xl">
                <TextReveal>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    Featured Creators
                  </p>
                </TextReveal>
                <TextReveal delay={100}>
                  <h2 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl">
                    Top talent.
                    <span className="text-white/40"> Real influence.</span>
                  </h2>
                </TextReveal>
              </div>
              <TextReveal delay={200}>
                <Link
                  href="/influencers"
                  className="group flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
                >
                  View all creators
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </TextReveal>
            </div>
          </div>

          <div className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:px-12">
            {creators.map((c, i) => (
              <div key={c.name} className="w-[320px] shrink-0 snap-start">
                <TextReveal delay={i * 100}>
                  <div className="group rounded-2xl border border-white/[0.08] bg-[#060b18]/80 p-6 backdrop-blur-md transition-all hover:border-cyan-400/30 hover:bg-[#0a1226] hover:shadow-[0_8px_30px_rgba(34,211,238,0.1)]">
                    <div className="mb-5 flex items-center gap-4">
                      <div
                        className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${c.color} p-[2px] transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]`}
                      >
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="h-full w-full rounded-2xl object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="truncate text-sm font-semibold transition-colors group-hover:text-cyan-300">{c.name}</h4>
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                        </div>
                        <p className="truncate text-[11px] text-white/40">{c.niche}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/[0.07] pt-5">
                      <div>
                        <div className="text-lg font-semibold">{c.followers}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-wider text-white/30">
                          Followers
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-lg font-semibold">
                          <LineChart className="h-3.5 w-3.5 text-cyan-400" />
                          {c.engagement}
                        </div>
                        <div className="mt-1 text-[10px] uppercase tracking-wider text-white/30">
                          Engagement
                        </div>
                      </div>
                    </div>
                  </div>
                </TextReveal>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        <section className="relative z-10 border-t border-white/[0.06] py-32">
          <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
            <div className="mb-16 max-w-2xl">
              <TextReveal>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  How It Works
                </p>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl">
                  Simple steps.
                  <span className="text-white/40"> Powerful results.</span>
                </h2>
              </TextReveal>
            </div>

            <div className="relative grid gap-8 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-[18px] hidden h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent md:block" />

              {[
                { n: "01", t: "Submit Request", d: "Tell us your goals, budget and target audience." },
                { n: "02", t: "We Select Creators", d: "We match you with the best verified influencers." },
                { n: "03", t: "Campaign Execution", d: "Creators produce and share content." },
                { n: "04", t: "Track & Grow", d: "Get real-time updates and detailed reports." },
              ].map((s, i) => (
                <TextReveal key={s.n} delay={i * 150}>
                  <div className="group relative cursor-default">
                    <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-[#02050f] text-[11px] font-bold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-shadow group-hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]">
                      {s.n}
                    </div>
                    <h4 className="text-base font-semibold transition-colors group-hover:text-cyan-300">{s.t}</h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                      {s.d}
                    </p>
                  </div>
                </TextReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CASE STUDIES ═══════════ */}
        <section className="relative z-10 border-t border-white/[0.06] bg-[#02050f]/30 py-32 backdrop-blur-sm">
          <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
            <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-xl">
                <TextReveal>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    Case Studies
                  </p>
                </TextReveal>
                <TextReveal delay={100}>
                  <h2 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl">
                    Real campaigns.
                    <span className="text-white/40"> Measurable growth.</span>
                  </h2>
                </TextReveal>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {caseStudies.map((cs, i) => (
                <TextReveal
                  key={cs.title}
                  delay={i * 100}
                  className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
                >
                  <GradientBorder
                    from="from-white/[0.15]"
                    to="to-white/[0.02]"
                    className="h-full"
                  >
                    <div
                      className={`group relative h-full w-full overflow-hidden rounded-2xl bg-[#060b18] ${
                        i === 0 ? "min-h-[400px]" : "min-h-[190px]"
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${cs.gradient} transition-transform duration-700 group-hover:scale-110`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                      <div className="relative flex h-full flex-col justify-between p-6">
                        <div className="flex justify-end">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-colors group-hover:bg-cyan-500">
                            <Play className="h-4 w-4 fill-white text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="text-3xl font-light tracking-tight text-cyan-300 drop-shadow-[0_2px_10px_rgba(34,211,238,0.4)]">
                            {cs.stat}
                          </div>
                          <h4 className="mt-2 text-base font-semibold text-white">{cs.title}</h4>
                          <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">{cs.metric}</p>
                        </div>
                      </div>
                    </div>
                  </GradientBorder>
                </TextReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section className="relative z-10 px-6 pb-32 lg:px-12">
          <TextReveal>
            <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-gradient-to-br from-blue-500/[0.10] via-white/[0.02] to-purple-500/[0.08] px-8 py-20 text-center backdrop-blur-md sm:px-16">
              <div className="animate-pulse-glow absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
              <div className="relative">
                <TrendingUp className="mx-auto h-8 w-8 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
                <h2 className="mx-auto mt-8 max-w-2xl text-4xl font-light leading-tight tracking-tight sm:text-5xl">
                  Let's build something
                  {/* FIX: Removed the drop-shadow filter from this specific style block, and added padding right (pr-2) */}
                  <span
                    className="italic font-serif pr-2"
                    style={{
                      background:
                        "linear-gradient(to right, #a5f3fc 0%, #7dd3fc 50%, #c084fc 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {" "}
                    great{" "}
                  </span>
                  together.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-sm text-white/50">
                  Get in touch with our team and start your Web3 influencer campaign today.
                </p>
                <Link
                  href="/contact"
                  className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-8 py-3.5 text-sm font-semibold shadow-[0_4px_24px_rgba(34,211,238,0.2)] transition hover:brightness-110 hover:shadow-[0_8px_32px_rgba(34,211,238,0.4)]"
                >
                  Contact Us
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