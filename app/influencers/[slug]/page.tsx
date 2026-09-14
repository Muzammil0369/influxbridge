"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  ExternalLink,
  Globe2,
  Languages,
  MapPin,
  Play,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";

type Influencer = {
  slug: string;
  name: string;
  handle: string;
  image: string;
  niche: string;
  location: string;
  languages: string[];
  followers: string;
  engagement: string;
  platforms: string[];
  bio: string;
  audienceRegion: string;
  audienceAge: {
    label: string;
    value: number;
  }[];
  audienceGender: {
    label: string;
    value: number;
  }[];
  portfolio: {
    title: string;
    category: string;
    image: string;
    type: "image" | "video";
  }[];
  featured: boolean;
};

const influencers: Influencer[] = [
  {
    slug: "ahmed-khan",
    name: "Ahmed Khan",
    handle: "@ahmedkhan",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=900&q=85",
    niche: "Crypto & Finance",
    location: "Islamabad, Pakistan",
    languages: ["English", "Urdu"],
    followers: "248K",
    engagement: "6.8%",
    platforms: ["X", "YouTube", "Instagram"],
    bio: "Finance and Web3 creator focused on making complex market topics easier to understand. His content combines educational explainers, market commentary and practical insights for a growing digital audience.",
    audienceRegion: "Pakistan & GCC",
    audienceAge: [
      { label: "18–24", value: 24 },
      { label: "25–34", value: 42 },
      { label: "35–44", value: 22 },
      { label: "45+", value: 12 },
    ],
    audienceGender: [
      { label: "Male", value: 72 },
      { label: "Female", value: 28 },
    ],
    portfolio: [
      {
        title: "Market Education Series",
        category: "Finance",
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=85",
        type: "image",
      },
      {
        title: "Web3 Explained",
        category: "Web3",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1000&q=85",
        type: "video",
      },
      {
        title: "Trading Breakdown",
        category: "Education",
        image:
          "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1000&q=85",
        type: "video",
      },
    ],
    featured: true,
  },
  {
    slug: "sara-malik",
    name: "Sara Malik",
    handle: "@saramalik",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
    niche: "Fintech & Lifestyle",
    location: "Lahore, Pakistan",
    languages: ["English", "Urdu"],
    followers: "186K",
    engagement: "5.9%",
    platforms: ["Instagram", "TikTok"],
    bio: "Lifestyle and fintech storyteller creating accessible content around digital payments, modern finance and everyday technology.",
    audienceRegion: "Pakistan",
    audienceAge: [
      { label: "18–24", value: 38 },
      { label: "25–34", value: 41 },
      { label: "35–44", value: 14 },
      { label: "45+", value: 7 },
    ],
    audienceGender: [
      { label: "Male", value: 44 },
      { label: "Female", value: 56 },
    ],
    portfolio: [
      {
        title: "Digital Payments",
        category: "Fintech",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85",
        type: "video",
      },
      {
        title: "Finance Simplified",
        category: "Education",
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
        type: "image",
      },
      {
        title: "Tech Lifestyle",
        category: "Lifestyle",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
        type: "image",
      },
    ],
    featured: true,
  },
  {
    slug: "crypto-ali",
    name: "Crypto Ali",
    handle: "@cryptoali",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    niche: "Crypto & Web3",
    location: "Karachi, Pakistan",
    languages: ["English", "Urdu"],
    followers: "321K",
    engagement: "7.2%",
    platforms: ["X", "YouTube"],
    bio: "Crypto-focused creator covering Web3 products, market education and blockchain trends for a highly engaged digital audience.",
    audienceRegion: "Pakistan & International",
    audienceAge: [
      { label: "18–24", value: 31 },
      { label: "25–34", value: 47 },
      { label: "35–44", value: 16 },
      { label: "45+", value: 6 },
    ],
    audienceGender: [
      { label: "Male", value: 81 },
      { label: "Female", value: 19 },
    ],
    portfolio: [
      {
        title: "Blockchain Basics",
        category: "Web3",
        image:
          "https://images.unsplash.com/photo-1634704784915-aacf363b021f?auto=format&fit=crop&w=1000&q=85",
        type: "video",
      },
      {
        title: "Crypto Market Review",
        category: "Crypto",
        image:
          "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=85",
        type: "video",
      },
      {
        title: "Web3 Community",
        category: "Community",
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85",
        type: "image",
      },
    ],
    featured: false,
  },
];

function getInfluencer(slug: string) {
  return influencers.find((creator) => creator.slug === slug) ?? influencers[0];
}

export default function InfluencerProfilePage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const creator = useMemo(() => getInfluencer(slug), [slug]);

  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  const filteredPortfolio =
    portfolioFilter === "All"
      ? creator.portfolio
      : creator.portfolio.filter((item) => item.category === portfolioFilter);

  const portfolioCategories = [
    "All",
    ...Array.from(new Set(creator.portfolio.map((item) => item.category))),
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050712] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-15%] top-[5%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute right-[-10%] top-[25%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[160px]" />
        <div className="absolute bottom-[-15%] left-[35%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050712]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
              <img
                src="/a-logo.png"
                alt="InfluxBridge"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <div className="text-sm font-bold tracking-[0.22em] text-white">
                INFLUXBRIDGE
              </div>
              <div className="text-[9px] uppercase tracking-[0.28em] text-white/35">
                Creator Network
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/influencers"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-cyan-400/30 hover:bg-white/[0.06] hover:text-white sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              All Creators
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/15"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <div className="flex items-center gap-2 text-xs text-white/35">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/influencers" className="transition hover:text-white">
            Influencers
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">{creator.name}</span>
        </div>
      </div>

      {/* Profile Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main profile card */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

            <div className="relative flex flex-col gap-7 sm:flex-row">
              {/* Creator image */}
              <div className="relative shrink-0">
                <div className="h-36 w-36 overflow-hidden rounded-[28px] border border-white/15 bg-white/5 shadow-2xl shadow-cyan-500/10 sm:h-44 sm:w-44">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {creator.featured && (
                  <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-cyan-300/20 bg-[#08111d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300 shadow-xl">
                    <Sparkles className="h-3 w-3" />
                    Featured Creator
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                    {creator.niche}
                  </span>

                  {creator.featured && (
                    <span className="flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold text-cyan-300">
                      <Check className="h-3 w-3" />
                      Network Creator
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                  {creator.name}
                </h1>

                <p className="mt-2 text-sm text-white/40">{creator.handle}</p>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  {creator.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/55">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    {creator.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-violet-300" />
                    {creator.languages.join(" · ")}
                  </span>

                  <span className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4 text-blue-300" />
                    {creator.audienceRegion}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
              <Stat
                icon={<Users className="h-4 w-4" />}
                value={creator.followers}
                label="Followers"
              />
              <Stat
                icon={<Sparkles className="h-4 w-4" />}
                value={creator.engagement}
                label="Engagement"
              />
              <Stat
                icon={<Globe2 className="h-4 w-4" />}
                value={creator.platforms.length.toString()}
                label="Platforms"
              />
              <Stat
                icon={<Star className="h-4 w-4" />}
                value="Featured"
                label="Network Status"
              />
            </div>
          </div>

          {/* Campaign CTA */}
          <div className="relative overflow-hidden rounded-[32px] border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.08] via-white/[0.035] to-violet-500/[0.08] p-7 backdrop-blur-xl">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-400/10 blur-[80px]" />

            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                <Sparkles className="h-5 w-5 text-cyan-300" />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                Work With {creator.name.split(" ")[0]}
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-tight">
                Build a campaign around the right audience.
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/50">
                Tell InfluxBridge what you want to achieve. Our team handles
                creator coordination, campaign execution and delivery.
              </p>

              <button
                onClick={() => setShowCampaignModal(true)}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-[#050712] transition hover:-translate-y-0.5 hover:bg-cyan-50"
              >
                Request a Campaign
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-white/30">
                InfluxBridge manages the campaign relationship between
                companies and creators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <SectionLabel>Platforms</SectionLabel>

        <div className="mt-5 flex flex-wrap gap-3">
          {creator.platforms.map((platform) => (
            <PlatformBadge key={platform} platform={platform} />
          ))}
        </div>
      </section>

      {/* Audience */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mb-10">
            <SectionLabel>Audience Snapshot</SectionLabel>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Understand the audience.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
              Illustrative audience information for this prototype. Production
              analytics will be based on verified platform data.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Age */}
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Audience Age</h3>
                  <p className="mt-1 text-xs text-white/35">
                    Illustrative distribution
                  </p>
                </div>

                <Users className="h-5 w-5 text-cyan-300" />
              </div>

              <div className="mt-8 space-y-5">
                {creator.audienceAge.map((item) => (
                  <ProgressBar
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Audience Gender</h3>
                  <p className="mt-1 text-xs text-white/35">
                    Illustrative distribution
                  </p>
                </div>

                <Globe2 className="h-5 w-5 text-violet-300" />
              </div>

              <div className="mt-8 space-y-5">
                {creator.audienceGender.map((item) => (
                  <ProgressBar
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Portfolio & content.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
              A preview of the creator&apos;s content style and campaign-ready
              work.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setPortfolioFilter(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  portfolioFilter === category
                    ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
                    : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredPortfolio.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {item.type === "video" && (
                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
                    <Play className="ml-0.5 h-4 w-4 fill-white" />
                  </div>
                )}

                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                    {item.category}
                  </span>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                </div>
              </div>

              <div className="flex items-center justify-between p-5">
                <span className="text-xs text-white/35">
                  Selected portfolio work
                </span>

                <button className="flex items-center gap-1.5 text-xs font-semibold text-white/60 transition hover:text-cyan-300">
                  View
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How campaign works */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="max-w-2xl">
            <SectionLabel>Campaign Process</SectionLabel>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              From idea to campaign.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/40">
              InfluxBridge keeps the campaign organized from creator selection
              through delivery.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <ProcessStep
              number="01"
              title="Request"
              description="Tell us your goals, audience, budget and timeline."
            />
            <ProcessStep
              number="02"
              title="Match"
              description="Our team evaluates the right creator and campaign fit."
            />
            <ProcessStep
              number="03"
              title="Execute"
              description="Creator coordination, briefs, content and revisions."
            />
            <ProcessStep
              number="04"
              title="Report"
              description="Campaign delivery and performance reporting."
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-cyan-400/[0.08] via-white/[0.035] to-violet-500/[0.08] p-8 text-center sm:p-14">
          <div className="absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <Sparkles className="h-6 w-6 text-cyan-300" />
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
              Ready to build something with {creator.name.split(" ")[0]}?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/45">
              Share your campaign requirements and let InfluxBridge coordinate
              the right creator partnership.
            </p>

            <button
              onClick={() => setShowCampaignModal(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-[#050712] transition hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              Request a Campaign
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-white/30 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>© 2026 InfluxBridge. Creator network prototype.</p>

          <div className="flex gap-5">
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      {/* Campaign Modal */}
      {showCampaignModal && (
        <CampaignModal
          creator={creator}
          onClose={() => setShowCampaignModal(false)}
        />
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-[#070a16] p-5">
      <div className="flex items-center gap-2 text-cyan-300">{icon}</div>
      <div className="mt-3 text-xl font-black">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/30">
        {label}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
      {children}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const icon =
    platform === "Instagram"
      ? "◎"
      : platform === "YouTube"
        ? "▶"
        : "𝕏";

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white/70">
      <span className="flex h-5 w-5 items-center justify-center text-cyan-300">
        {icon}
      </span>
      {platform}
    </div>
  );
}

function ProgressBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-white/55">{label}</span>
        <span className="font-semibold text-white/70">{value}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6">
      <div className="text-xs font-bold tracking-[0.2em] text-cyan-300">
        {number}
      </div>

      <h3 className="mt-5 text-lg font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-white/40">{description}</p>
    </div>
  );
}

function CampaignModal({
  creator,
  onClose,
}: {
  creator: Influencer;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-xl">
        <div className="w-full max-w-lg rounded-[30px] border border-white/10 bg-[#090d1c] p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Check className="h-7 w-7 text-cyan-300" />
          </div>

          <h2 className="mt-6 text-2xl font-black">Request received</h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/45">
            Your campaign request for {creator.name} has been prepared for
            InfluxBridge review. This prototype does not send or store the
            request yet.
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
      <div className="relative w-full max-w-xl rounded-[30px] border border-white/10 bg-[#090d1c] p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-10">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
            Campaign Request
          </div>

          <h2 className="mt-3 text-2xl font-black">
            Work with {creator.name}
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/45">
            Share the basics and our team can shape the campaign around your
            goals.
          </p>
        </div>

        <div className="mt-7 space-y-4">
          <ModalField label="Company Name" placeholder="Your company" />
          <ModalField label="Work Email" placeholder="you@company.com" />

          <div className="grid gap-4 sm:grid-cols-2">
            <ModalField label="Campaign Goal" placeholder="e.g. Awareness" />
            <ModalField label="Estimated Budget" placeholder="e.g. $5,000" />
          </div>

          <ModalField
            label="Campaign Brief"
            placeholder="Tell us what you want to achieve..."
            textarea
          />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-xs leading-5 text-white/35">
          This prototype only demonstrates the campaign-request experience.
          No request is actually transmitted or stored.
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-[#050712] transition hover:bg-cyan-50"
        >
          Submit Campaign Request
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ModalField({
  label,
  placeholder,
  textarea = false,
}: {
  label: string;
  placeholder: string;
  textarea?: boolean;
}) {
  const className =
    "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-cyan-400/40 focus:bg-white/[0.05]";

  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
        {label}
      </span>

      {textarea ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          className={`${className} resize-none`}
        />
      ) : (
        <input placeholder={placeholder} className={className} />
      )}
    </label>
  );
}