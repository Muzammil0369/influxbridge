"use client";

import { PageShell } from "@/components/layout/PageShell";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { TextReveal } from "@/components/ui/TextReveal";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageShell>
      {/* ATMOSPHERIC BACKGROUND GLOWS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute left-1/4 top-2/3 h-[600px] w-[600px] rounded-full bg-purple-600/[0.04] blur-[140px]" />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-6 pb-16 pt-36 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <TextReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#031529]/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,170,255,0.2)]">
                <MessageSquare className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
                Start a Conversation
              </div>
            </TextReveal>

            <h1
              className="text-[clamp(3rem,7vw,6rem)] font-light leading-[0.95] tracking-[-0.045em]"
              style={{
                textShadow:
                  "0 4px 40px rgba(2,5,15,0.95), 0 2px 12px rgba(2,5,15,0.7)",
              }}
            >
              <TextReveal>Let's build your</TextReveal>
              <TextReveal delay={150}>
                <span className="mt-2 block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#16b5ff] via-[#168dff] to-[#a044ff] drop-shadow-[0_0_30px_rgba(0,150,255,0.4)] pr-4">
                  next campaign.
                </span>
              </TextReveal>
            </h1>

            <TextReveal delay={350}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-blue-100/80">
                Tell us about your company, your goals, and what you want to achieve in Pakistan. Our team will review your requirements and get back to you.
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="relative z-10 px-6 pb-28 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[1fr_0.45fr]">
          {/* FORM */}
          <GradientBorder from="from-cyan-500/30" to="to-transparent">
            <div className="bg-gradient-to-b from-[#06172c]/90 to-[#020b17]/95 p-8 backdrop-blur-xl sm:p-12 shadow-[0_0_40px_rgba(0,100,200,0.1)]">
              {!submitted ? (
                <>
                  <div className="mb-10">
                    <span className="inline-flex rounded-full border border-cyan-500/60 bg-[#031529]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md">
                      Campaign Brief
                    </span>
                    <h2 className="mt-4 text-3xl font-light text-white">
                      Tell us about your project
                    </h2>
                    <p className="mt-2 text-sm text-white/50">
                      Fill out the form below to initiate your strategic roadmap session.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        label="Company Name"
                        placeholder="Your company"
                        icon={Building2}
                      />
                      <FormField
                        label="Work Email"
                        placeholder="you@company.com"
                        type="email"
                        icon={Mail}
                      />
                    </div>

                    <FormField
                      label="Company Website"
                      placeholder="https://yourcompany.com"
                    />

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-white/80">
                        What do you need?
                      </label>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          "Market Entry",
                          "Influencer Campaign",
                          "Community Growth",
                          "Partnerships",
                          "Events",
                          "Other",
                        ].map((item) => (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-3 rounded-xl border border-blue-500/30 bg-[#031326]/60 p-4 text-sm text-white/70 transition hover:border-cyan-400 hover:bg-cyan-500/10"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-blue-500/50 bg-[#010711] accent-cyan-400"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        label="Estimated Budget"
                        placeholder="$5,000 - $10,000"
                        icon={Target}
                      />
                      <FormField
                        label="Campaign Duration"
                        placeholder="30 days"
                        icon={Clock3}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-white/80">
                        Project Overview & Goals
                      </label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Tell us about your product, target audience, goals, and anything else we should know..."
                        className="w-full resize-none rounded-xl border border-blue-500/30 bg-[#031326]/60 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-cyan-400 focus:bg-[#031326]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#08a9f8] to-[#9840f1] px-6 py-4 text-base font-bold shadow-[0_0_30px_rgba(0,140,255,0.4)] transition-all hover:scale-[1.01] hover:brightness-110"
                    >
                      Submit Campaign Brief
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex min-h-[650px] flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,200,255,0.3)]">
                    <CheckCircle2 className="h-10 w-10 text-cyan-300" />
                  </div>
                  <h2 className="mt-8 text-3xl font-light text-white">Brief received successfully.</h2>
                  <p className="mt-4 max-w-md leading-relaxed text-white/70">
                    Thank you for sharing your project details. Our strategy team will review your submission and connect with you shortly.
                  </p>
                  <Link
                    href="/"
                    className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#08a9f8] to-[#9840f1] px-8 py-4 text-sm font-bold shadow-[0_0_30px_rgba(0,140,255,0.4)] transition-all hover:scale-105"
                  >
                    Back to Home
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          </GradientBorder>

          {/* SIDE PANEL */}
          <aside className="space-y-6">
            <GradientBorder from="from-cyan-500/30" to="to-transparent">
              <div className="bg-gradient-to-b from-[#06172c]/90 to-[#020b17]/95 p-8 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,.2)]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Why partner with us?</h3>
                <div className="mt-7 space-y-6">
                  <InfoItem
                    title="Localized Strategy"
                    text="Build campaigns engineered around the Pakistani market and audience dynamics."
                  />
                  <InfoItem
                    title="Creator Network"
                    text="Direct access to verified top-tier creators across crypto, finance, forex, and Web3."
                  />
                  <InfoItem
                    title="Centralized Execution"
                    text="One elite partner seamlessly coordinating creators, communities, and campaign operations."
                  />
                </div>
              </div>
            </GradientBorder>

            <GradientBorder from="from-blue-500/30" to="to-transparent">
              <div className="bg-gradient-to-b from-[#06172c]/90 to-[#020b17]/95 p-8 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,.2)]">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Prefer direct email?</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Reach out directly to our partnerships desk for immediate inquiries.
                </p>
                <div className="mt-6 rounded-xl border border-cyan-400/40 bg-[#03182e] px-4 py-3.5 text-sm font-semibold text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,0.2)] text-center">
                  hello@influxbridge.com
                </div>
              </div>
            </GradientBorder>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
  icon: Icon,
}: {
  label: string;
  placeholder: string;
  type?: string;
  icon?: typeof Building2;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white/80">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400/70" />
        )}
        <input
          required
          type={type}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border border-blue-500/30 bg-[#031326]/60 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-cyan-400 focus:bg-[#031326] ${
            Icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

function InfoItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
      <h4 className="text-base font-bold text-white">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p>
    </div>
  );
}