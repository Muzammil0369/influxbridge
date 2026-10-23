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
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ContactAudience = "company" | "influencer";

const fieldClass =
  "h-12 w-full rounded-xl border border-blue-500/30 bg-[#031326]/60 px-4 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-cyan-400 focus:bg-[#031326]";
const textAreaClass =
  "w-full resize-y rounded-xl border border-blue-500/30 bg-[#031326]/60 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-cyan-400 focus:bg-[#031326]";

export default function ContactPage() {
  const [audience, setAudience] = useState<ContactAudience>("company");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleCompanySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitError("");
    const values = new FormData(event.currentTarget);
    const supabase = createClient();

    const { error } = await supabase.rpc("submit_public_lead", {
      p_company_name: String(values.get("company_name") ?? ""),
      p_contact_email: String(values.get("contact_email") ?? ""),
      p_website_url: String(values.get("website_url") ?? ""),
      p_services: values.getAll("services").map(String).join(", "),
      p_budget: String(values.get("budget") ?? ""),
      p_duration: String(values.get("duration") ?? ""),
      p_project_overview: String(values.get("project_overview") ?? ""),
    });

    setSubmitting(false);
    if (error) {
      setSubmitError(
        error.message.includes("submit_public_lead")
          ? "The enquiry service is not available right now. Please email hello@influxbridge.com and our team can help."
          : error.message,
      );
      return;
    }
    setSubmitted(true);
  }

  async function handleInfluencerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const { error } = await createClient().rpc("submit_public_influencer_inquiry", {
      p_name: String(values.get("creator_name") ?? "").trim(),
      p_email: String(values.get("creator_email") ?? "").trim(),
      p_niche: String(values.get("creator_niche") ?? "").trim(),
      p_profile: String(values.get("creator_profile") ?? "").trim(),
      p_message: String(values.get("creator_message") ?? "").trim(),
    });
    setSubmitting(false);
    if (error) {
      setSubmitError(error.message.includes("submit_public_influencer_inquiry")
        ? "The creator enquiry service is not available yet. Please try again shortly."
        : error.message);
      return;
    }
    form.reset();
    window.alert("Thanks! Your influencer inquiry has been sent to the InfluxBridge team.");
  }

  return (
    <PageShell>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute left-1/4 top-2/3 h-[600px] w-[600px] rounded-full bg-purple-600/[0.04] blur-[140px]" />
      </div>

      <section className="relative z-10 px-6 pb-14 pt-36 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-4xl">
            <TextReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#031529]/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300 shadow-[0_0_20px_rgba(0,170,255,0.2)] backdrop-blur-md">
                <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                Start a Conversation
              </div>
            </TextReveal>
            <h1 className="text-[clamp(3rem,7vw,6rem)] font-light leading-[0.95] tracking-[-0.045em]" style={{ textShadow: "0 4px 40px rgba(2,5,15,0.95), 0 2px 12px rgba(2,5,15,0.7)" }}>
              <TextReveal>Let’s find your</TextReveal>
              <TextReveal delay={150}>
                <span className="mt-2 block bg-gradient-to-r from-[#16b5ff] via-[#168dff] to-[#a044ff] bg-clip-text pr-4 font-serif italic text-transparent drop-shadow-[0_0_30px_rgba(0,150,255,0.4)]">
                  right connection.
                </span>
              </TextReveal>
            </h1>
            <TextReveal delay={300}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-blue-100/80">
                Whether you’re a company planning a campaign or a creator looking to work with us, choose the path that fits you. Our team will take it from there.
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-28 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[1fr_0.45fr]">
          <div>
            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => { setAudience("company"); setSubmitError(""); }} aria-pressed={audience === "company"} className={`rounded-2xl border p-5 text-left transition ${audience === "company" ? "border-cyan-400/50 bg-cyan-400/[0.08] shadow-[0_0_24px_rgba(0,180,255,0.08)]" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`}>
                <Building2 className={`mb-4 h-6 w-6 ${audience === "company" ? "text-cyan-300" : "text-white/45"}`} />
                <span className="block text-base font-semibold text-white">I’m a company</span>
                <span className="mt-1 block text-sm leading-5 text-white/50">Tell us your goals. We’ll recommend suitable creators.</span>
              </button>
              <button type="button" onClick={() => { setAudience("influencer"); setSubmitError(""); }} aria-pressed={audience === "influencer"} className={`rounded-2xl border p-5 text-left transition ${audience === "influencer" ? "border-purple-400/50 bg-purple-400/[0.08] shadow-[0_0_24px_rgba(150,80,255,0.08)]" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`}>
                <UserRound className={`mb-4 h-6 w-6 ${audience === "influencer" ? "text-purple-300" : "text-white/45"}`} />
                <span className="block text-base font-semibold text-white">I’m an influencer</span>
                <span className="mt-1 block text-sm leading-5 text-white/50">Ask about partnerships, creator onboarding or support.</span>
              </button>
            </div>

            <GradientBorder from={audience === "company" ? "from-cyan-500/30" : "from-purple-500/30"} to="to-transparent">
              <div className="bg-gradient-to-b from-[#06172c]/90 to-[#020b17]/95 p-6 shadow-[0_0_40px_rgba(0,100,200,0.1)] backdrop-blur-xl sm:p-10">
                {submitted ? (
                  <div className="flex min-h-[480px] flex-col items-center justify-center px-4 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,200,255,0.3)]">
                      <CheckCircle2 className="h-10 w-10 text-cyan-300" />
                    </div>
                    <h2 className="mt-8 text-3xl font-light text-white">Your brief is with our team.</h2>
                    <p className="mt-4 max-w-md leading-relaxed text-white/70">
                      Thanks for sharing your requirements. InfluxBridge will review your goals and follow up about the next steps and suitable creator recommendations.
                    </p>
                    <button type="button" onClick={() => { setSubmitted(false); setAudience("company"); }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#08a9f8] to-[#9840f1] px-7 py-3.5 text-sm font-bold">
                      Send another inquiry <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : audience === "company" ? (
                  <>
                    <div className="mb-8">
                      <span className="inline-flex rounded-full border border-cyan-500/50 bg-[#031529]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300">Company campaign brief</span>
                      <h2 className="mt-4 text-3xl font-light text-white">Tell us what you want to achieve</h2>
                      <p className="mt-2 text-sm leading-6 text-white/50">Your inquiry goes to our admin team. We’ll assess your requirements and recommend creators based on campaign fit—not just follower count.</p>
                    </div>
                    <form onSubmit={handleCompanySubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField name="company_name" label="Company name" placeholder="Your company" icon="building" required />
                        <FormField name="contact_email" label="Work email" placeholder="you@company.com" type="email" icon="mail" required />
                      </div>
                      <FormField name="website_url" label="Company website (optional)" placeholder="https://yourcompany.com" icon="none" />
                      <fieldset>
                        <legend className="mb-3 block text-sm font-semibold text-white/80">What support do you need?</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {["Market Entry", "Influencer Campaign", "Community Growth", "Partnerships", "Events", "Other"].map((item) => (
                            <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl border border-blue-500/30 bg-[#031326]/60 p-4 text-sm text-white/70 transition hover:border-cyan-400 hover:bg-cyan-500/10">
                              <input type="checkbox" name="services" value={item} className="h-4 w-4 accent-cyan-400" />
                              {item}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField name="budget" label="Estimated budget" placeholder="e.g. $5,000–$10,000" icon="target" />
                        <FormField name="duration" label="Campaign timeline" placeholder="e.g. 30 days" icon="clock" />
                      </div>
                      <div>
                        <label htmlFor="project_overview" className="mb-2 block text-sm font-semibold text-white/80">Project overview and goals</label>
                        <textarea id="project_overview" name="project_overview" required minLength={10} maxLength={5000} rows={6} placeholder="Describe your product, target audience, desired platforms, campaign goals and deliverables…" className={textAreaClass} />
                      </div>
                      {submitError && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{submitError}</p>}
                      <button type="submit" disabled={submitting} className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#08a9f8] to-[#9840f1] px-6 py-4 text-base font-bold shadow-[0_0_30px_rgba(0,140,255,0.4)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60">
                        {submitting ? "Submitting your brief…" : "Send campaign brief"}
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      <p className="text-center text-xs text-white/35">This is an inquiry, not an automatically approved campaign.</p>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="mb-8">
                      <span className="inline-flex rounded-full border border-purple-400/40 bg-purple-500/[0.08] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-purple-200">Creator contact</span>
                      <h2 className="mt-4 text-3xl font-light text-white">Let’s talk about working together</h2>
                      <p className="mt-2 text-sm leading-6 text-white/50">Questions about joining our network, your profile or creator opportunities? Fill this out and your email app will prepare a message to our team.</p>
                    </div>
                    <form onSubmit={handleInfluencerSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div><label htmlFor="creator_name" className="mb-2 block text-sm font-semibold text-white/80">Your name</label><input id="creator_name" name="creator_name" required maxLength={160} className={fieldClass} placeholder="Full name" /></div>
                        <div><label htmlFor="creator_email" className="mb-2 block text-sm font-semibold text-white/80">Email address</label><input id="creator_email" name="creator_email" type="email" required maxLength={254} className={fieldClass} placeholder="you@example.com" /></div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div><label htmlFor="creator_niche" className="mb-2 block text-sm font-semibold text-white/80">Creator niche (optional)</label><input id="creator_niche" name="creator_niche" maxLength={120} className={fieldClass} placeholder="e.g. finance, gaming, lifestyle" /></div>
                        <div><label htmlFor="creator_profile" className="mb-2 block text-sm font-semibold text-white/80">Social profile (optional)</label><input id="creator_profile" name="creator_profile" type="url" maxLength={500} className={fieldClass} placeholder="https://instagram.com/yourname" /></div>
                      </div>
                      <div><label htmlFor="creator_message" className="mb-2 block text-sm font-semibold text-white/80">How can we help?</label><textarea id="creator_message" name="creator_message" required minLength={5} maxLength={3000} rows={5} className={textAreaClass} placeholder="Tell us about your inquiry…" /></div>
                      <button type="submit" {submitError && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{submitError}</p>}
                      disabled={submitting} className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#8548ef] to-[#168dff] px-6 py-4 text-base font-bold shadow-[0_0_30px_rgba(120,80,255,0.25)] transition hover:brightness-110">
                        {submitting ? "Sending inquiry…" : "Send influencer inquiry"} <Mail className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      <p className="text-center text-xs leading-5 text-white/35">This opens your device’s email app. If it doesn’t open, email <a className="text-cyan-300 underline underline-offset-4" href="mailto:hello@influxbridge.com">hello@influxbridge.com</a> directly.</p>
                    </form>
                  </>
                )}
              </div>
            </GradientBorder>
          </div>

          <aside className="space-y-6">
            <GradientBorder from="from-cyan-500/30" to="to-transparent">
              <div className="bg-gradient-to-b from-[#06172c]/90 to-[#020b17]/95 p-8 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,.2)]"><Sparkles className="h-6 w-6" /></div>
                <h3 className="mt-6 text-xl font-bold text-white">A team behind every campaign</h3>
                <div className="mt-7 space-y-6">
                  <InfoItem title="Strategy first" text="We start with your market, audience and business goals before suggesting creators." />
                  <InfoItem title="Creator fit" text="Recommendations consider niche, audience relevance, engagement and campaign needs." />
                  <InfoItem title="Managed execution" text="Our team coordinates creator selection, assignments and delivery after the proposal is approved." />
                </div>
              </div>
            </GradientBorder>
            <GradientBorder from="from-blue-500/30" to="to-transparent">
              <div className="bg-gradient-to-b from-[#06172c]/90 to-[#020b17]/95 p-8 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300"><Mail className="h-6 w-6" /></div>
                <h3 className="mt-6 text-xl font-bold text-white">Prefer direct email?</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">Companies and creators can reach our team directly.</p>
                <a href="mailto:hello@influxbridge.com" className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-[#03182e] px-4 py-3.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10">
                  hello@influxbridge.com <ArrowRight className="h-4 w-4" />
                </a>
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p className="text-xs leading-5 text-white/45">Company inquiries are saved to the admin Leads workspace. Creator contact uses email, so no account is required to reach us.</p>
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
  name,
  placeholder,
  type = "text",
  icon = "none",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  icon?: "building" | "mail" | "target" | "clock" | "none";
  required?: boolean;
}) {
  const Icon = icon === "building" ? Building2 : icon === "mail" ? Mail : icon === "target" ? Target : icon === "clock" ? Clock3 : null;
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-white/80">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400/70" />}
        <input id={name} name={name} required={required} type={type} placeholder={placeholder} maxLength={name === "company_name" ? 160 : name === "contact_email" ? 254 : 500} className={`${fieldClass} ${Icon ? "pl-11" : ""}`} />
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
