"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";

export default function InfluencerJoinPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const passwordChecks = useMemo(
    () => ({
      length: formData.password.length >= 8,
      upper: /[A-Z]/.test(formData.password),
      number: /\d/.test(formData.password),
      special: /[^A-Za-z0-9]/.test(formData.password),
    }),
    [formData.password]
  );

  const passwordScore = Object.values(passwordChecks).filter(Boolean).length;

  const passwordLabel =
    passwordScore <= 1
      ? "Weak"
      : passwordScore === 2
        ? "Fair"
        : passwordScore === 3
          ? "Good"
          : "Strong";

  const passwordColor =
    passwordScore <= 1
      ? "bg-red-400"
      : passwordScore === 2
        ? "bg-amber-400"
        : passwordScore === 3
          ? "bg-blue-400"
          : "bg-emerald-400";

  const passwordsMatch =
    formData.password.length > 0 &&
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const emailValid =
    formData.email.length === 0 ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);

    const valid =
      formData.fullName.trim() &&
      formData.displayName.trim() &&
      emailValid &&
      formData.password.length >= 8 &&
      passwordsMatch &&
      formData.terms;

    if (!valid) return;

    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060a] text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-20%] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-[-18%] left-[-10%] h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[145px]" />
        <div className="absolute right-[-12%] top-[30%] h-[480px] w-[480px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
              <img
                src="/a-logo.png"
                alt="InfluxBridge"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <div className="text-lg font-semibold tracking-tight">
                InfluxBridge
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                Creator Network
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Desktop information */}
          <div className="hidden lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
              <Sparkles size={14} />
              Join the Network
            </div>

            <h1 className="max-w-xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] xl:text-6xl">
              Turn your audience into{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                opportunities.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/55">
              Build a professional creator profile and introduce your work to
              brands through the InfluxBridge network.
            </p>

            <div className="mt-10 space-y-6">
              <Benefit
                icon={<Users size={18} />}
                title="Work with serious brands"
                description="Get considered for campaigns that match your niche, audience and content style."
              />

              <Benefit
                icon={<Sparkles size={18} />}
                title="Showcase your creator profile"
                description="Present your content, audience and experience through a professional network profile."
              />

              <Benefit
                icon={<ShieldCheck size={18} />}
                title="Agency-managed campaigns"
                description="InfluxBridge coordinates campaign briefs, communication, delivery and review."
              />
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                How it works
              </p>

              <div className="mt-4 flex items-center gap-3 text-xs text-white/45">
                <span className="text-cyan-300">01</span>
                Create account
                <span className="text-white/15">→</span>
                <span className="text-cyan-300">02</span>
                Build profile
                <span className="text-white/15">→</span>
                <span className="text-cyan-300">03</span>
                Review
              </div>
            </div>
          </div>

          {/* Registration */}
          <div className="mx-auto w-full max-w-xl">
            {/* Mobile heading */}
            <div className="mb-8 lg:hidden">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
                <Sparkles size={14} />
                Join the Network
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em]">
                Join the InfluxBridge{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  Creator Network
                </span>
              </h1>

              <p className="mt-4 text-sm leading-6 text-white/50">
                Create your creator account and introduce your work to brands
                through InfluxBridge.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
              {!submitted ? (
                <>
                  {/* Card header */}
                  <div className="mb-8">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                      <User size={20} className="text-cyan-300" />
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Create your creator account
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-white/45">
                          Start with the basics. Your creator profile comes
                          next.
                        </p>
                      </div>

                      <div className="hidden text-right sm:block">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                          Step
                        </p>
                        <p className="mt-1 text-sm font-semibold text-cyan-300">
                          01 / 02
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <InputField
                      label="Full Name"
                      type="text"
                      placeholder="Your full name"
                      icon={<User size={17} />}
                      value={formData.fullName}
                      onChange={(value) =>
                        handleChange("fullName", value)
                      }
                      error={
                        attempted && !formData.fullName.trim()
                          ? "Please enter your full name."
                          : undefined
                      }
                    />

                    <InputField
                      label="Creator / Display Name"
                      type="text"
                      placeholder="e.g. Ahmed Khan"
                      icon={<Sparkles size={17} />}
                      value={formData.displayName}
                      onChange={(value) =>
                        handleChange("displayName", value)
                      }
                      error={
                        attempted && !formData.displayName.trim()
                          ? "Please enter your creator name."
                          : undefined
                      }
                    />

                    <InputField
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      icon={<Mail size={17} />}
                      value={formData.email}
                      onChange={(value) => handleChange("email", value)}
                      error={
                        attempted && !formData.email
                          ? "Please enter your email address."
                          : !emailValid
                            ? "Please enter a valid email address."
                            : undefined
                      }
                    />

                    <PasswordField
                      label="Password"
                      placeholder="Create a password"
                      value={formData.password}
                      visible={showPassword}
                      onToggle={() => setShowPassword((value) => !value)}
                      onChange={(value) =>
                        handleChange("password", value)
                      }
                    />

                    {formData.password && (
                      <div className="-mt-2 rounded-xl border border-white/10 bg-black/20 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-white/40">
                            Password strength
                          </span>
                          <span className="text-[11px] font-medium text-white/65">
                            {passwordLabel}
                          </span>
                        </div>

                        <div className="mt-2 grid grid-cols-4 gap-1">
                          {[0, 1, 2, 3].map((item) => (
                            <div
                              key={item}
                              className={`h-1 rounded-full ${
                                item < passwordScore
                                  ? passwordColor
                                  : "bg-white/10"
                              }`}
                            />
                          ))}
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                          <PasswordRequirement
                            ok={passwordChecks.length}
                            text="8+ characters"
                          />
                          <PasswordRequirement
                            ok={passwordChecks.upper}
                            text="Uppercase letter"
                          />
                          <PasswordRequirement
                            ok={passwordChecks.number}
                            text="Number"
                          />
                          <PasswordRequirement
                            ok={passwordChecks.special}
                            text="Special character"
                          />
                        </div>
                      </div>
                    )}

                    <PasswordField
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      visible={showConfirmPassword}
                      onToggle={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      onChange={(value) =>
                        handleChange("confirmPassword", value)
                      }
                    />

                    {formData.confirmPassword && !passwordsMatch && (
                      <p className="-mt-2 text-xs text-red-400">
                        Passwords do not match.
                      </p>
                    )}

                    {attempted && formData.password.length < 8 && (
                      <p className="-mt-2 text-xs text-red-400">
                        Password must contain at least 8 characters.
                      </p>
                    )}

                    {/* Terms */}
                    <label className="flex cursor-pointer items-start gap-3 pt-1">
                      <input
                        type="checkbox"
                        checked={formData.terms}
                        onChange={(event) =>
                          handleChange("terms", event.target.checked)
                        }
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-white/20 bg-white/5 accent-cyan-400"
                      />

                      <span className="text-xs leading-5 text-white/45">
                        I agree to the InfluxBridge{" "}
                        <Link
                          href="#"
                          className="text-cyan-400 transition hover:text-cyan-300"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and understand that my creator profile will be
                        reviewed before becoming active.
                      </span>
                    </label>

                    {attempted && !formData.terms && (
                      <p className="-mt-2 text-xs text-red-400">
                        Please accept the terms to continue.
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 active:scale-[0.99]"
                    >
                      Create Creator Account
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </form>

                  <div className="mt-7 border-t border-white/10 pt-6 text-center">
                    <p className="text-sm text-white/40">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                    <Check size={28} className="text-emerald-400" />
                  </div>

                  <p className="mt-7 text-xs uppercase tracking-[0.2em] text-cyan-300">
                    Account Created
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                    Your creator journey starts here.
                  </h2>

                  <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/45">
                    Your account setup is complete in this prototype. Continue
                    to build your creator profile with your niche, social
                    channels, audience and portfolio.
                  </p>

                  <div className="mt-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5 text-left">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-300">
                        <Sparkles size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Next: Build your creator profile
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/35">
                          Add your profile, social channels, audience,
                          portfolio and campaign preferences.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/join/influencer/profile"
                    className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
                  >
                    Continue to Creator Profile
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/login"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition hover:text-white"
                  >
                    Go to Login
                  </Link>
                </div>
              )}
            </div>

            {!submitted && (
              <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-white/30">
                <ShieldCheck size={13} className="text-cyan-300/60" />
                Creating an account does not automatically verify or publish
                your profile.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Input                                                                       */
/* -------------------------------------------------------------------------- */

function InputField({
  label,
  type,
  placeholder,
  icon,
  value,
  onChange,
  error,
}: {
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-medium text-white/65">
          {label}
        </label>
        {error && (
          <span className="text-[10px] text-red-400">{error}</span>
        )}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
          {icon}
        </div>

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border bg-black/20 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:bg-white/[0.04] focus:ring-1 ${
            error
              ? "border-red-400/30 focus:border-red-400/40 focus:ring-red-400/10"
              : "border-white/10 focus:border-cyan-400/40 focus:ring-cyan-400/20"
          }`}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Password                                                                    */
/* -------------------------------------------------------------------------- */

function PasswordField({
  label,
  placeholder,
  value,
  visible,
  onToggle,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-white/65">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
          <LockKeyhole size={17} />
        </div>

        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-12 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-cyan-400/40 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-400/20"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/30 transition hover:bg-white/5 hover:text-white/70"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Password requirement                                                        */
/* -------------------------------------------------------------------------- */

function PasswordRequirement({
  ok,
  text,
}: {
  ok: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          ok
            ? "bg-emerald-400/10 text-emerald-400"
            : "bg-white/5 text-white/20"
        }`}
      >
        <Check size={9} />
      </div>

      <span className={ok ? "text-white/55" : "text-white/25"}>
        {text}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Benefit                                                                     */
/* -------------------------------------------------------------------------- */

function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-300">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 max-w-md text-sm leading-6 text-white/40">
          {description}
        </p>
      </div>
    </div>
  );
}