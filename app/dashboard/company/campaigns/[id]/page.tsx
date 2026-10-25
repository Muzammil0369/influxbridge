"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  LoaderCircle,
  MapPin,
  RefreshCw,
  Target,
  Users,
  Video,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Campaign = {
  id: string;
  company_id: string;
  name: string;
  description: string | null;
  budget: number | null;
  currency: string;
  status: string;
  phase: string | null;
  start_date: string | null;
  end_date: string | null;
  deadline: string | null;
  target_niche: string[] | string | null;
  target_country: string | null;
  target_city: string | null;
  target_audience: string | null;
  platforms: string[];
  content_formats: string[];
  is_in_person_event: boolean | null;
  created_at: string | null;
};

type CampaignRow = Record<string, unknown>;

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function asList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

function mapCampaign(row: CampaignRow): Campaign {
  return {
    id: String(row.id ?? ""),
    company_id: String(row.company_id ?? ""),
    name: String(row.name ?? "Untitled campaign"),
    description: asText(row.description),
    budget:
      typeof row.budget === "number"
        ? row.budget
        : typeof row.budget === "string" && row.budget.trim()
          ? Number(row.budget)
          : null,
    currency: asText(row.currency) ?? "USD",
    status: asText(row.status) ?? "DRAFT",
    phase: asText(row.phase),
    start_date: asText(row.start_date),
    end_date: asText(row.end_date),
    deadline: asText(row.deadline),
    target_niche:
      Array.isArray(row.target_niche) || typeof row.target_niche === "string"
        ? (row.target_niche as string[] | string)
        : null,
    target_country: asText(row.target_country),
    target_city: asText(row.target_city),
    target_audience: asText(row.target_audience),
    platforms: asList(row.platforms),
    content_formats: asList(row.content_formats),
    is_in_person_event:
      typeof row.is_in_person_event === "boolean"
        ? row.is_in_person_event
        : null,
    created_at: asText(row.created_at),
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (error && typeof error === "object") {
    const value = error as Record<string, unknown>;

    const message =
      value.message ??
      value.details ??
      value.hint ??
      value.error_description;

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    try {
      return JSON.stringify(error, Object.getOwnPropertyNames(error));
    } catch {
      return "An unexpected error occurred.";
    }
  }

  return typeof error === "string"
    ? error
    : "An unexpected error occurred.";
}

function formatDate(value: string | null): string {
  if (!value) return "Not specified";

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}

function humanize(value: string | null): string {
  return (value ?? "UNKNOWN")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function CompanyCampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const campaignId = params.id;

  // Keep one client instance across renders.
  const supabase = useMemo(() => createClient(), []);

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCampaign = useCallback(
    async (background = false) => {
      if (!campaignId) {
        setError("Campaign ID is missing from the URL.");
        setLoading(false);
        return;
      }

      if (background) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
          router.replace("/login");
          return;
        }

        const { data: membership, error: membershipError } = await supabase
          .from("company_members")
          .select("company_id")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle();

        if (membershipError) throw membershipError;

        if (!membership?.company_id) {
          setCampaign(null);
          setError(
            "No company membership was found for this account. Verify that this user is linked to a company.",
          );
          return;
        }

        // Restrict the query to this user's company.
        const { data, error: campaignError } = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", campaignId)
          .eq("company_id", membership.company_id)
          .maybeSingle();

        if (campaignError) throw campaignError;

        if (!data) {
          setCampaign(null);
          setError(
            "Campaign not found, or your account does not have permission to view it.",
          );
          return;
        }

        setCampaign(mapCampaign(data as CampaignRow));
      } catch (err: unknown) {
        const message = getErrorMessage(err);

        console.error("Failed to load company campaign:", message, err);
        setError(message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [campaignId, router, supabase],
  );

  useEffect(() => {
    let active = true;

    void loadCampaign();

    const channel = supabase
      .channel(`company-campaign-${campaignId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "campaigns",
          filter: `id=eq.${campaignId}`,
        },
        () => {
          if (active) void loadCampaign(true);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "campaign_creators",
          filter: `campaign_id=eq.${campaignId}`,
        },
        () => {
          if (active) void loadCampaign(true);
        },
      )
      .subscribe((status, subscribeError) => {
        if (subscribeError) {
          console.error("Campaign realtime subscription error:", subscribeError);
        }

        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.warn("Campaign realtime status:", status);
        }
      });

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [campaignId, loadCampaign, supabase]);

  async function signOut() {
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(`Sign out failed: ${signOutError.message}`);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b12] text-white">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading campaign...
        </div>
      </main>
    );
  }

  if (error || !campaign) {
    return (
      <main className="min-h-screen bg-[#080b12] px-5 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/dashboard/company"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <AlertCircle className="mb-4 h-8 w-8 text-amber-400" />
            <h1 className="text-xl font-semibold">
              Unable to open campaign
            </h1>

            <p className="mt-3 break-words text-sm leading-6 text-slate-400">
              {error ?? "This campaign could not be found."}
            </p>

            <button
              onClick={() => void loadCampaign()}
              className="mt-6 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-slate-200"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  const niches = asList(campaign.target_niche);

  const briefItems = [
    {
      label: "Target niche",
      value: niches.join(", ") || "Not specified",
    },
    {
      label: "Target location",
      value:
        [campaign.target_city, campaign.target_country]
          .filter(Boolean)
          .join(", ") || "Not specified",
    },
    {
      label: "Target audience",
      value: campaign.target_audience || "Not specified",
    },
    {
      label: "Event format",
      value:
        campaign.is_in_person_event === null
          ? "Not specified"
          : campaign.is_in_person_event
            ? "In-person event"
            : "Remote campaign",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080b12] text-white">
      <header className="border-b border-white/[0.08] bg-[#0b0f18]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <Link
            href="/dashboard/company"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Company dashboard
          </Link>

          <button
            onClick={() => void signOut()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                Campaign details
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                {humanize(campaign.status)}
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {campaign.name}
            </h1>

            <p className="mt-4 max-w-2xl whitespace-pre-wrap text-sm leading-7 text-slate-400">
              {campaign.description ||
                "No campaign description has been provided yet."}
            </p>
          </div>

          <button
            onClick={() => void loadCampaign(true)}
            disabled={refreshing}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<DollarSign size={19} />}
            label="Campaign budget"
            value={
              campaign.budget === null || !Number.isFinite(campaign.budget)
                ? "Not specified"
                : `${campaign.currency} ${campaign.budget.toLocaleString()}`
            }
          />

          <MetricCard
            icon={<CalendarDays size={19} />}
            label="Start date"
            value={formatDate(campaign.start_date)}
          />

          <MetricCard
            icon={<Clock size={19} />}
            label="Campaign deadline"
            value={formatDate(campaign.deadline)}
          />

          <MetricCard
            icon={<CheckCircle2 size={19} />}
            label="End date"
            value={formatDate(campaign.end_date)}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-cyan-400/10 p-2.5 text-cyan-300">
                <Target size={20} />
              </div>
              <div>
                <h2 className="font-semibold">Campaign brief</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Audience, niche and campaign requirements
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {briefItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.06] bg-black/20 p-4"
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                    {item.label}
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-400/10 p-2.5 text-violet-300">
                <Video size={20} />
              </div>
              <div>
                <h2 className="font-semibold">Content requirements</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Platforms and content formats
                </p>
              </div>
            </div>

            <TagGroup title="Platforms" values={campaign.platforms} />

            <div className="my-5 border-t border-white/[0.08]" />

            <TagGroup
              title="Content formats"
              values={campaign.content_formats}
            />
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-400/10 p-2.5 text-emerald-300">
              <Users size={20} />
            </div>
            <div>
              <h2 className="font-semibold">Creator collaboration</h2>
              <p className="mt-1 text-sm text-slate-400">
                Creator assignments will appear as the campaign progresses.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex items-center gap-2 text-xs text-slate-600">
          <MapPin size={13} />
          Campaign information is loaded from your company&apos;s Supabase
          record.
        </div>
      </div>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">{label}</p>
        <span className="text-slate-500">{icon}</span>
      </div>
      <p className="break-words text-xl font-semibold tracking-tight">
        {value}
      </p>
    </div>
  );
}

function TagGroup({
  title,
  values,
}: {
  title: string;
  values: string[];
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
        {title}
      </p>

      {values.length ? (
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <span
              key={value}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-300"
            >
              {value}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">Not specified</p>
      )}
    </div>
  );
}