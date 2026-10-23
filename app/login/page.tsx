"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Mail,
  Sparkles,
  Users,
} from "lucide-react";

type Role = "company" | "influencer";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("company");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setNotice("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error || !data.user) {
      setErrorMessage(error?.message ?? "Unable to sign in. Please try again.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      setErrorMessage(
        "Your account is authenticated, but its InfluxBridge profile is not set up yet. Please contact a founder to finish account setup.",
      );
      setLoading(false);
      return;
    }

    if (profile.role === "ADMIN") {
      router.replace("/admin");
    } else if (profile.role === "COMPANY" && role === "company") {
      router.replace("/dashboard/company");
    } else if (profile.role === "INFLUENCER" && role === "influencer") {
      const { data: creatorProfile } = await supabase
        .from("influencer_profiles")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();
      router.replace(creatorProfile ? "/dashboard/influencer" : "/join/influencer/profile");
    } else {
      await supabase.auth.signOut();
      setErrorMessage("This account does not match the selected workspace.");
      setLoading(false);
      return;
    }

    router.refresh();
  }

  async function handlePasswordReset() {
    setErrorMessage("");
    setNotice("");
    if (!email.trim()) {
      setErrorMessage("Enter your email address first, then choose Forgot password.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setNotice("If an account exists for that email, a password-reset link will be sent.");
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#01050c] text-white">
      {/* Background Atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,140,255,0.14),transparent_40%),radial-gradient(circle_at_80%_75%,rgba(140,0,255,0.12),transparent_40%)]" />
        <div className="absolute left-[-200px] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute right-[-200px] bottom-[5%] h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/[0.06] bg-[#01050c]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
            
            <div>
              <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <img
              src="/a-logo.png"
              alt="InfluxBridge"
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain drop-shadow-[0_0_10px_rgba(0,180,255,0.8)]"
            />
            <span className="text-base sm:text-lg font-bold tracking-[-0.04em]">
              Influx<span className="text-[#16a8ff]">Bridge</span>
            </span>
          </Link>
              <div className="text-[9px] uppercase tracking-[0.28em] text-white/40">
                Market Intelligence
              </div>
            </div>
          <Link
            href="/"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Back to website
          </Link>
        </div>
      </nav>

      {/* Main Container */}
      <section className="relative z-10 flex items-center px-6 py-10 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_480px]">

          {/* ═══════════════════════════════════════════
              LEFT SIDE — Copy + Floating Earth (Visible on all sizes, optimized for mobile)
          ═══════════════════════════════════════════ */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#031529]/90 px-4 py-1.5 text-xs text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,170,255,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              The bridge to Pakistan&apos;s digital market
            </div>

            <h1 className="max-w-2xl text-3xl sm:text-5xl font-light leading-[1.05] tracking-[-0.04em] xl:text-6xl text-white mx-auto lg:mx-0">
              Where global brands meet{" "}
              <span className="bg-gradient-to-r from-[#16b5ff] via-[#168dff] to-[#a044ff] bg-clip-text font-semibold text-transparent drop-shadow-[0_0_30px_rgba(0,150,255,0.4)]">
                local influence.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-blue-100/80 mx-auto lg:mx-0">
              Access your InfluxBridge workspace and manage campaigns,
              partnerships, creators and market growth from one place.
            </p>

            {/* ── Floating Earth with orbital badges ── */}
            <div className="relative mx-auto mt-6 flex h-[360px] sm:h-[560px] w-full max-w-[600px] items-center justify-center">
              {/* Ambient glow layers behind the Earth */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] rounded-full bg-[#0080ff]/30 blur-[130px]" />
                <div className="absolute h-[200px] w-[200px] sm:h-[280px] sm:w-[280px] rounded-full bg-[#00d0ff]/20 blur-[90px]" />
              </div>

              {/* The Earth image */}
              <img
                src="/login-earth.png"
                alt="InfluxBridge Network"
                className="relative z-10 h-[320px] w-[320px] sm:h-[520px] sm:w-[520px] select-none object-contain drop-shadow-[0_0_80px_rgba(0,140,255,0.7)]"
                draggable={false}
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              RIGHT SIDE — Login Card
          ═══════════════════════════════════════════ */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 blur-2xl" />

            <div className="relative rounded-[28px] border border-blue-500/40 bg-gradient-to-b from-[#06172c]/90 to-[#020b17]/95 p-6 shadow-[0_0_50px_rgba(0,100,200,0.25)] backdrop-blur-2xl sm:p-8">
              {/* Card heading */}
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#062343] text-cyan-300 shadow-[0_0_15px_rgba(0,160,255,.2)]">
                  <Globe2 className="h-5 w-5 text-cyan-400" />
                </div>

                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  Sign in to continue to your InfluxBridge workspace.
                </p>
              </div>

              {/* Role selector */}
              <div className="mb-7">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  CONTINUE AS
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-blue-500/30 bg-[#020914] p-1.5">
                  <button
                    type="button"
                    onClick={() => setRole("company")}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      role === "company"
                        ? "bg-white text-black shadow-lg"
                        : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    Company
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("influencer")}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      role === "influencer"
                        ? "bg-white text-black shadow-lg"
                        : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    Influencer
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400/70" />
                    <input
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={role === "company" ? "you@company.com" : "you@example.com"}
                      className="h-12 w-full rounded-xl border border-blue-500/30 bg-[#031326]/60 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-cyan-400 focus:bg-[#031326]"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-white/80">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handlePasswordReset}
                      disabled={loading}
                      className="text-xs text-cyan-400 transition hover:text-cyan-300 disabled:opacity-50"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400/70" />
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-blue-500/30 bg-[#031326]/60 pl-11 pr-12 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-cyan-400 focus:bg-[#031326]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {errorMessage}
                  </p>
                )}
                {notice && (
                  <p role="status" className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                    {notice}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-black transition hover:bg-cyan-50 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : <>Sign in as {role === "company" ? "Company" : "Influencer"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                </button>
              </form>

              {/* Divider & Footer links */}
              {(
                <>
                  <div className="my-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs text-white/30">OR</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <div className="text-center">
                    <span className="text-sm text-white/60">
                      Don&apos;t have an account?
                    </span>{" "}
                    <Link
                      href={role === "company" ? "/join/company" : "/join/influencer"}
                      className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                    >
                      {role === "company" ? "Create a Company Account" : "Join the Network"}
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00aaff]" />
              Secure workspace access
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}