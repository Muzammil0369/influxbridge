"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Play,
  Building2,
  Users,
  BarChart3,
  Layers3,
  Globe2,
  MessageCircle,
} from "lucide-react";
import ScrollWorldLoader from "@/components/three/ScrollWorldLoader";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { TextReveal } from "@/components/ui/TextReveal";

const Twitter = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M18.9 3.7h2.8l-6.1 7 7.2 9.6h-5.6l-4.4-5.9-5 5.9H2.8l6.5-7.4-6.8-9.2h5.8l4 5.4 4.6-5.4Z" />
  </svg>
);

const Linkedin = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M6.94 8.5A1.56 1.56 0 1 1 6.92 5.38 1.56 1.56 0 0 1 6.94 8.5Z" />
    <path d="M5.4 10.2h2.95v8.4H5.4z" />
    <path d="M10.7 10.2h2.83v1.14h.04c.39-.75 1.36-1.54 2.8-1.54 2.99 0 3.54 1.97 3.54 4.53v4.27h-2.95v-3.78c0-1.13-.02-2.58-1.57-2.58-1.58 0-1.82 1.23-1.82 2.5v3.86H10.7z" />
  </svg>
);

const Youtube = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.6 7.6a2.8 2.8 0 0 0-1.96-1.98C17.8 5.2 12 5.2 12 5.2s-5.8 0-7.64.42A2.8 2.8 0 0 0 2.4 7.6 29.2 29.2 0 0 0 2 12a29.2 29.2 0 0 0 .4 4.4 2.8 2.8 0 0 0 1.96 1.98C6.2 18.8 12 18.8 12 18.8s5.8 0 7.64-.42A2.8 2.8 0 0 0 21.6 16.4 29.2 29.2 0 0 0 22 12a29.2 29.2 0 0 0-.4-4.4ZM10 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
);

const Instagram = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="4.2" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Influencers", href: "/influencers" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const creators = [
  {
    name: "CryptoWithAli",
    category: "Crypto / Trading",
    followers: "245K",
    engagement: "4.8%",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Web3 Queen",
    category: "Web3 / DeFi",
    followers: "182K",
    engagement: "5.4%",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "TechWithHamza",
    category: "Blockchain / Tech",
    followers: "420K",
    engagement: "6.1%",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "NFT Explorer",
    category: "NFTs / Gaming",
    followers: "310K",
    engagement: "5.2%",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "SatoshiTrader",
    category: "Crypto / Futures",
    followers: "512K",
    engagement: "7.0%",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "DeFiSophia",
    category: "Yield Farming / Web3",
    followers: "195K",
    engagement: "4.9%",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "MetaverseMaven",
    category: "Virtual Worlds / NFT",
    followers: "280K",
    engagement: "5.8%",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "AlphaZayn",
    category: "Altcoins / Analysis",
    followers: "340K",
    engagement: "6.3%",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
];

const services = [
  {
    icon: Globe2,
    title: "Market Entry",
    text: "Launch in new markets with local creators and community support.",
  },
  {
    icon: Users,
    title: "Influencer Network",
    text: "Access verified creators across crypto, Web3, trading and tech.",
  },
  {
    icon: BarChart3,
    title: "Campaign Management",
    text: "We handle everything from selection to reporting and optimization.",
  },
  {
    icon: Layers3,
    title: "Growth Infrastructure",
    text: "Data-driven strategies, performance tracking and real results.",
  },
];

const caseStudies = [
  {
    title: "ChainVerse",
    result: "+280% Community Growth",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "MetaLedger",
    result: "+540% Engagement",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "NovaSwap",
    result: "+320% Brand Awareness",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "OrbitChain",
    result: "+210% User Signups",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#01050c] text-white">
      {/* 3D BACKGROUND WORLD */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ScrollWorldLoader />
      </div>

      {/* NAVBAR */}
      <header
        className={`
          fixed left-0 right-0 top-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? "border-b border-white/[0.05] bg-[#01050c]/90 backdrop-blur-xl"
              : "bg-transparent"
          }
        `}
      >
        <div className="mx-auto flex h-[80px] max-w-[1600px] items-center px-6 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/a-logo.png"
              alt="InfluxBridge"
              className="h-9 w-9 object-contain"
            />
            <span className="text-lg font-bold tracking-[-0.04em]">
              Influx<span className="text-[#16a8ff]">Bridge</span>
            </span>
          </Link>

          <nav className="ml-16 hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveNav(item.label)}
                className={`
                  relative
                  py-5
                  text-sm
                  font-medium
                  transition-colors
                  ${
                    activeNav === item.label
                      ? "text-[#27b8ff]"
                      : "text-white/60 hover:text-white"
                  }
                `}
              >
                {item.label}
                {activeNav === item.label && (
                  <span className="absolute bottom-[11px] left-0 right-0 mx-auto h-[2px] rounded-full bg-[#00aaff] shadow-[0_0_10px_#00aaff]" />
                )}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Search
              size={18}
              strokeWidth={1.5}
              className="mr-2 text-white/70"
            />
            <Link
              href="/login"
              className="hidden rounded-full border border-blue-400/70 px-6 py-2.5 text-xs transition hover:bg-white/[0.08] sm:block"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#079cf4] to-[#9a3df4] px-7 py-3 text-xs font-semibold shadow-[0_0_22px_rgba(75,90,255,.3)] transition hover:brightness-110"
            >
              Start a Campaign
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 flex min-h-[95vh] items-center px-6 pt-36 pb-16 lg:px-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block"
          style={{
            width: "55%",
            background:
              "linear-gradient(to right, rgba(1,5,12,0.98) 0%, rgba(1,5,12,0.85) 60%, rgba(1,5,12,0.3) 85%, rgba(1,5,12,0) 100%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="relative z-20 lg:col-span-7">
              <TextReveal>
                <div className="mb-6 inline-flex rounded-full border border-[#00aaff]/40 bg-[#031426]/80 px-4 py-1.5 backdrop-blur-md">
                  <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#20c4ff]">
                    Web3 Growth Infrastructure
                  </span>
                </div>
              </TextReveal>

              <h1 className="text-[clamp(3rem,6.5vw,6rem)] font-light leading-[0.95] tracking-[-0.045em]">
                <TextReveal>Connect Brands</TextReveal>
                <TextReveal delay={100}>With</TextReveal>
                <TextReveal delay={200}>
                  <span className="bg-gradient-to-r from-[#16b5ff] via-[#168dff] to-[#a044ff] bg-clip-text font-semibold text-transparent">
                    Influence.
                  </span>
                </TextReveal>
              </h1>

              <TextReveal delay={350}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-blue-100/80">
                  InfluxBridge is the bridge between Web3 companies and top-tier creators. We build high-performance influencer campaigns that drive real engagement, community growth and long-term value.
                </p>
              </TextReveal>

              <TextReveal delay={500}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#079ef5] to-[#9d3df4] px-8 py-4 text-sm font-bold shadow-[0_0_30px_rgba(0,139,255,.35)] transition hover:brightness-110"
                  >
                    Start a Campaign
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/influencers"
                    className="flex items-center gap-2 rounded-full border border-[#009cff]/60 bg-[#031122]/80 px-8 py-4 text-sm font-semibold backdrop-blur-md transition hover:bg-white/[0.08]"
                  >
                    Explore Influencers
                  </Link>
                </div>
              </TextReveal>

              <TextReveal delay={600}>
                <div className="mt-14 flex items-center gap-4">
                  <div className="flex">
                    {creators.slice(0, 5).map((c, i) => (
                      <div
                        key={i}
                        className="-ml-3 first:ml-0 h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#071321] bg-slate-800 shadow-lg"
                      >
                        <img src={c.image} alt="" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-white/80 font-medium tracking-wide">
                    Trusted by 50+ Web3 brands
                  </span>
                </div>
              </TextReveal>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00aaff] to-transparent shadow-[0_0_16px_#008cff]" />
      </section>

      {/* STATS */}
      <section className="relative z-10 border-y border-blue-500/15 bg-[#020914]/95 backdrop-blur-md py-4">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 lg:px-12">
          <Stat number="10K+" label="Community Reach" />
          <StatDivider />
          <Stat number="500+" label="Verified Creators" />
          <StatDivider />
          <Stat number="50+" label="Successful Campaigns" />
          <StatDivider />
          <Stat number="24/7" label="Global Support" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 border-b border-white/[0.04] bg-[#010711]/80 py-28 backdrop-blur-sm">
        <SectionGlow />
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <TextReveal>
                <SmallBadge>OUR SERVICES</SmallBadge>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  End-to-End Influencer Marketing for Web3 & Beyond.
                </h2>
              </TextReveal>
              <TextReveal delay={200}>
                <p className="mt-5 text-base leading-relaxed text-white/60">
                  From market entry to campaign execution, we provide the tools, creators and expertise to help your brand grow securely and rapidly.
                </p>
              </TextReveal>
              <TextReveal delay={300}>
                <Link
                  href="/services"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/60 px-7 py-3.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
                >
                  Explore All Services
                  <ArrowRight size={14} />
                </Link>
              </TextReveal>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {services.map((service, index) => (
                <TextReveal key={service.title} delay={index * 100}>
                  <ServiceCard {...service} />
                </TextReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CREATORS (Continuous Smooth Horizontal Infinite Scroll) */}
      <section id="influencers" className="relative z-10 border-b border-white/[0.04] bg-[#01060e]/80 py-28 backdrop-blur-sm overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 mb-12">
          <TextReveal>
            <SmallBadge>FEATURED CREATORS</SmallBadge>
          </TextReveal>
          <TextReveal delay={100}>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Top Talent. Real Influence.
            </h2>
          </TextReveal>
          <TextReveal delay={200}>
            <p className="mt-3 max-w-xl text-base text-white/60">
              Work with creators who understand Web3 and have the power to move communities authentically. Explore our expansive vetted roster below.
            </p>
          </TextReveal>
        </div>

        <div className="relative w-full overflow-hidden py-4">
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#01060e] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#01060e] to-transparent z-20 pointer-events-none" />
          
          <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
            {[...creators, ...creators].map((creator, idx) => (
              <div key={`${creator.name}-${idx}`} className="w-[300px] shrink-0">
                <CreatorCard {...creator} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="about" className="relative z-10 border-b border-white/[0.04] bg-[#01060d]/80 py-28 backdrop-blur-sm">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <div className="relative flex h-[350px] lg:col-span-5 items-center justify-center">
              <div className="absolute h-[240px] w-[400px] rotate-[8deg] rounded-[50%] border border-blue-400/50 shadow-[0_0_25px_rgba(0,130,255,.2)]" />
              <div className="absolute h-[180px] w-[440px] -rotate-[8deg] rounded-[50%] border border-purple-500/50" />
              <div className="absolute h-[220px] w-[220px] rounded-full bg-blue-600/15 blur-[40px]" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-cyan-400/60 bg-[#031329] shadow-[0_0_45px_rgba(0,139,255,.45)]">
                <img src="/a-logo.png" alt="" className="h-16 w-16 object-contain" />
              </div>
              <div className="absolute left-[5%] top-[20%] rounded-full border border-blue-400/50 bg-[#06182c] px-4 py-2 text-sm">
                <Building2 size={18} className="inline text-cyan-400 mr-2" />
                Company
              </div>
              <div className="absolute right-[5%] top-[20%] rounded-full border border-blue-400/50 bg-[#06182c] px-4 py-2 text-sm">
                <Users size={18} className="inline text-cyan-400 mr-2" />
                Influencers
              </div>
            </div>

            <div className="lg:col-span-7">
              <TextReveal>
                <SmallBadge>HOW IT WORKS</SmallBadge>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Simple Steps. Powerful Results.
                </h2>
              </TextReveal>
              <TextReveal delay={200}>
                <p className="mt-4 text-base text-white/60 max-w-xl">
                  Our streamlined process makes it easy to launch, manage and scale your influencer campaigns across global networks.
                </p>
              </TextReveal>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {[
                  ["1", "Submit Request", "Tell us your goals, budget and target audience."],
                  ["2", "We Select Creators", "We match you with the best verified influencers."],
                  ["3", "Campaign Execution", "Creators produce and share authentic content."],
                  ["4", "Track & Grow", "Get real-time updates and detailed performance reports."],
                ].map(([number, title, text], index) => (
                  <TextReveal key={number} delay={index * 100}>
                    <GradientBorder from="from-cyan-500/20" to="to-transparent">
                      <div className="bg-[#02050f]/60 p-7 backdrop-blur-md h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400 text-sm font-bold text-cyan-300 shadow-[0_0_12px_rgba(0,170,255,.3)]">
                            {number}
                          </div>
                          {index < 3 && <ArrowRight size={18} className="text-cyan-400/50" />}
                        </div>
                        <h3 className="text-lg font-bold text-white">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p>
                      </div>
                    </GradientBorder>
                  </TextReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="case-studies" className="relative z-10 border-b border-white/[0.04] bg-[#01060d]/80 py-28 backdrop-blur-sm">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <TextReveal>
                <SmallBadge>CASE STUDIES</SmallBadge>
              </TextReveal>
              <TextReveal delay={100}>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Real Campaigns. Measurable Growth.
                </h2>
              </TextReveal>
              <TextReveal delay={200}>
                <p className="mt-3 max-w-xl text-base text-white/60">
                  See how we've helped Web3 brands grow through strategic influencer campaigns.
                </p>
              </TextReveal>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/60 px-7 py-3.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
              >
                View Case Studies
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((item, idx) => (
              <TextReveal key={item.title} delay={idx * 100}>
                <CaseCard {...item} />
              </TextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 px-6 py-24 lg:px-12">
        <TextReveal>
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] border border-blue-500/60 bg-[#02101e] px-10 py-20 shadow-[0_0_50px_rgba(0,128,255,.25)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_120%,rgba(0,128,255,.42),transparent_50%)]" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <SmallBadge>YOUR GROWTH PARTNER</SmallBadge>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Let's Build Something Great Together.
                </h2>
                <p className="mt-3 text-base text-white/70 max-w-xl">
                  Get in touch with our team and start your Web3 influencer campaign today.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#08a9f8] to-[#9840f1] px-9 py-4 text-base font-bold shadow-[0_0_30px_rgba(0,130,255,.4)] transition hover:brightness-110 shrink-0"
              >
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </TextReveal>
      </section>

      {/* FOOTER (With rich deep background and shadow depth) */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#000206] shadow-[inset_0_30px_50px_rgba(0,0,0,0.9)]">
        <div className="mx-auto flex flex-col md:flex-row h-auto md:h-[120px] max-w-[1600px] items-center justify-between px-6 py-8 lg:px-12 gap-6">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/a-logo.png"
              alt="InfluxBridge"
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-bold">
              Influx<span className="text-cyan-400">Bridge</span>
            </span>
          </Link>

          <nav className="flex items-center gap-9">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Twitter size={18} className="text-white/70 hover:text-white transition cursor-pointer" />
            <Youtube size={18} className="text-white/70 hover:text-white transition cursor-pointer" />
            <MessageCircle size={18} className="text-white/70 hover:text-white transition cursor-pointer" />
            <Linkedin size={18} className="text-white/70 hover:text-white transition cursor-pointer" />
            <span className="ml-4 text-xs text-white/40">
              © 2026 InfluxBridge. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ============================================================
   SERVICE CARD
============================================================ */

function ServiceCard({
  icon: Icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-b from-[#06172c]/80 to-[#020b17]/90 p-8 shadow-[0_0_20px_rgba(0,95,190,.08)] transition hover:border-cyan-400">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,.2)] transition-transform group-hover:scale-110">
        <Icon size={26} strokeWidth={1.5} />
      </div>

      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>

      <div className="mt-8 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/10 text-cyan-300 transition group-hover:border-cyan-400 group-hover:bg-cyan-500/20">
        <ArrowRight size={15} />
      </div>
    </div>
  );
}

/* ============================================================
   CREATOR CARD
============================================================ */

function CreatorCard({
  name,
  category,
  followers,
  engagement,
  image,
}: {
  name: string;
  category: string;
  followers: string;
  engagement: string;
  image: string;
}) {
  return (
    <div className="rounded-2xl border border-blue-500/30 bg-[#031326]/90 p-5 shadow-[0_0_20px_rgba(0,90,190,.08)] backdrop-blur-md transition hover:border-cyan-400/50">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-blue-400/40 bg-gradient-to-br from-slate-500 to-blue-900">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div className="min-w-0">
          <div className="truncate text-base font-bold text-white">{name}</div>
          <div className="truncate text-xs text-white/50 mt-0.5">{category}</div>
          <div className="mt-2 flex gap-2">
            <Youtube size={14} className="text-red-400" />
            <Instagram size={14} className="text-pink-400" />
            <Twitter size={14} className="text-blue-300" />
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white/75">
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-cyan-400" />
          {followers} Followers
        </div>
        <div className="flex items-center gap-1.5">
          <BarChart3 size={14} className="text-purple-400" />
          {engagement} Eng.
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CASE CARD
============================================================ */

function CaseCard({
  title,
  result,
  image,
}: {
  title: string;
  result: string;
  image: string;
}) {
  return (
    <div className="relative h-[250px] overflow-hidden rounded-2xl border border-blue-500/30 bg-[#031326] transition hover:border-cyan-400/60">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 hover:scale-105"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020915] via-[#020915]/40 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <div>
          <div className="text-lg font-bold text-white">{title}</div>
          <div className="mt-1 text-sm font-semibold text-cyan-300">{result}</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400 bg-[#02152a]/90 text-cyan-300 shadow-[0_0_15px_rgba(0,180,255,.4)]">
          <Play size={14} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function SmallBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-cyan-500/60 bg-[#031529]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md">
      {children}
    </span>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center py-2 text-center">
      <div className="text-3xl sm:text-4xl font-extrabold leading-none text-[#08aaff] drop-shadow-[0_0_12px_rgba(0,160,255,.4)]">
        {number}
      </div>
      <div className="mt-2 text-xs sm:text-sm text-white/70 font-medium">{label}</div>
    </div>
  );
}

function StatDivider() {
  return <div className="h-12 w-px bg-gradient-to-b from-transparent via-blue-500/40 to-transparent" />;
}

function SectionGlow() {
  return (
    <div className="pointer-events-none absolute left-[25%] top-1/2 h-[200px] w-[700px] -translate-y-1/2 rounded-full bg-blue-500/[0.05] blur-[90px]" />
  );
}