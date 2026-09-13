"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Globe2,
  ImagePlus,
  Link as LinkIcon,
  MapPin,
  Sparkles,
  UserRound,
  Users,
  X,
  Share2,
  Video,
  DollarSign,
  FileCheck,
} from "lucide-react";

const niches = [
  "Crypto",
  "Forex",
  "Fintech",
  "Web3",
  "Trading",
  "Finance",
  "Technology",
  "Lifestyle",
  "Other",
];

const languages = [
  "English",
  "Urdu",
  "Pashto",
  "Hindi",
  "Arabic",
  "Other",
];

const countries = [
  "Pakistan",
  "United Arab Emirates",
  "Saudi Arabia",
  "United Kingdom",
  "United States",
  "Other",
];

const steps = [
  { number: "01", label: "Profile" },
  { number: "02", label: "Socials" },
  { number: "03", label: "Audience" },
  { number: "04", label: "Portfolio" },
  { number: "05", label: "Review" },
];

export default function InfluencerProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const [formData, setFormData] = useState({
    creatorName: "",
    bio: "",
    country: "",
    city: "",
    niche: "",
    languages: [] as string[],

    twitter: "",
    youtube: "",
    instagram: "",
    tiktok: "",

    followersCount: "",
    rateUsdt: "",
    primaryAudienceCountry: "",

    portfolioUrl: "",
    sampleVideoUrl: "",
  });

  const updateField = (
    field: keyof typeof formData,
    value: string | string[]
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const removeImage = () => {
    if (profileImage) {
      URL.revokeObjectURL(profileImage);
    }

    setProfileImage(null);
  };

  const toggleLanguage = (language: string) => {
    setFormData((current) => {
      const exists = current.languages.includes(language);

      return {
        ...current,
        languages: exists
          ? current.languages.filter((item) => item !== language)
          : [...current.languages, language],
      };
    });
  };

  const step1Valid = Boolean(
    formData.creatorName.trim() &&
      formData.bio.trim() &&
      formData.country &&
      formData.city.trim() &&
      formData.niche &&
      formData.languages.length > 0
  );

  const hasSocial =
    Boolean(formData.twitter.trim()) ||
    Boolean(formData.youtube.trim()) ||
    Boolean(formData.instagram.trim()) ||
    Boolean(formData.tiktok.trim());

  const step3Valid = Boolean(
    formData.followersCount.trim() &&
      formData.rateUsdt.trim() &&
      formData.primaryAudienceCountry.trim()
  );

  const step4Valid = Boolean(
    formData.portfolioUrl.trim() || formData.sampleVideoUrl.trim()
  );

  const currentStepValid = useMemo(() => {
    if (currentStep === 1) return step1Valid;
    if (currentStep === 2) return hasSocial;
    if (currentStep === 3) return step3Valid;
    if (currentStep === 4) return step4Valid;
    return true;
  }, [currentStep, step1Valid, hasSocial, step3Valid, step4Valid]);

  const handleNextStep = () => {
    setAttempted(true);

    if (!currentStepValid) return;

    if (currentStep < 5) {
      setAttempted(false);
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setAttempted(false);
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);

    if (!step1Valid || !hasSocial || !step3Valid || !step4Valid) {
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060a] text-white">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-[-15%] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[145px]" />
        <div className="absolute right-[-10%] top-[15%] h-[580px] w-[580px] rounded-full bg-violet-600/10 blur-[155px]" />
        <div className="absolute bottom-[-18%] left-[32%] h-[470px] w-[470px] rounded-full bg-blue-600/10 blur-[145px]" />
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
            className="group flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Exit
          </Link>
        </div>
      </header>

      <section className="relative z-10 px-6 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-5xl">
          {/* Page heading */}
          <div className="mb-10">
            <div className="mb-5 flex items-end justify-between gap-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                  Creator onboarding
                </p>

                <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Build your creator profile
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                  Give the InfluxBridge team the information needed to
                  understand your content, audience and campaign fit.
                </p>
              </div>

              <div className="hidden text-right sm:block">
                <div className="text-xs text-white/30">Progress</div>
                <div className="mt-1 text-sm font-semibold">
                  <span className="text-cyan-300">
                    {String(currentStep).padStart(2, "0")}
                  </span>
                  <span className="text-white/20"> / 05</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3 backdrop-blur-xl sm:p-4">
              <div className="flex items-center gap-1 overflow-x-auto">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const active = currentStep === stepNumber;
                  const completed = currentStep > stepNumber;

                  return (
                    <div
                      key={step.number}
                      className="flex min-w-0 flex-1 items-center"
                    >
                      <ProgressStep
                        number={step.number}
                        label={step.label}
                        active={active}
                        completed={completed}
                      />

                      {index < steps.length - 1 && (
                        <ProgressLine completed={currentStep > stepNumber} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {!submitted ? (
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              {/* Information panel */}
              <div className="hidden lg:block">
                <div className="sticky top-8">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                      <UserRound size={21} className="text-cyan-300" />
                    </div>

                    <h2 className="mt-6 text-xl font-semibold">
                      Build a profile brands can trust.
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-white/45">
                      Your profile gives our team a structured view of who you
                      are, what you create and where your audience is.
                    </p>

                    <div className="mt-7 space-y-5">
                      <InfoItem
                        icon={<Sparkles size={16} />}
                        title="Professional identity"
                        text="Create a clear creator profile with your niche, location and languages."
                      />

                      <InfoItem
                        icon={<Share2 size={16} />}
                        title="Social presence"
                        text="Share the channels where your content and audience live."
                      />

                      <InfoItem
                        icon={<Globe2 size={16} />}
                        title="Audience fit"
                        text="Help us understand your reach and primary market."
                      />

                      <InfoItem
                        icon={<FileCheck size={16} />}
                        title="Review before activation"
                        text="Submitting your profile does not automatically make it public or verified."
                      />
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                      Privacy
                    </p>

                    <p className="mt-2 text-xs leading-5 text-white/35">
                      Only profile-appropriate information is intended for
                      public display. Private verification information should
                      be handled separately by the InfluxBridge team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
                  <form onSubmit={handleSubmit}>
                    {/* STEP 1 */}
                    {currentStep === 1 && (
                      <div className="space-y-7">
                        <StepHeading
                          number="01"
                          title="Basic profile"
                          description="Tell us who you are and what kind of creator you are."
                        />

                        {/* Photo */}
                        <div>
                          <label className="mb-3 block text-xs font-medium text-white/65">
                            Profile Photo
                          </label>

                          <div className="flex items-center gap-5">
                            <div className="relative">
                              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
                                {profileImage ? (
                                  <img
                                    src={profileImage}
                                    alt="Profile preview"
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <UserRound
                                    size={32}
                                    className="text-white/20"
                                  />
                                )}
                              </div>

                              {profileImage && (
                                <button
                                  type="button"
                                  onClick={removeImage}
                                  className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black text-white/70 transition hover:text-white"
                                  aria-label="Remove profile photo"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>

                            <div>
                              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium transition hover:bg-white/[0.08]">
                                <ImagePlus size={16} />
                                {profileImage ? "Change Photo" : "Upload Photo"}

                                <input
                                  type="file"
                                  accept="image/png,image/jpeg,image/webp"
                                  onChange={handleImageChange}
                                  className="hidden"
                                />
                              </label>

                              <p className="mt-2 text-[11px] text-white/30">
                                JPG, PNG or WebP · Max 5MB
                              </p>
                            </div>
                          </div>
                        </div>

                        <TextInput
                          label="Creator / Display Name"
                          placeholder="e.g. Ahmed Khan"
                          value={formData.creatorName}
                          icon={<Sparkles size={17} />}
                          onChange={(value) =>
                            updateField("creatorName", value)
                          }
                          error={
                            attempted && !formData.creatorName.trim()
                              ? "Display name is required."
                              : undefined
                          }
                        />

                        {/* Bio */}
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <label className="text-xs font-medium text-white/65">
                              Short Bio
                            </label>

                            <span
                              className={`text-[11px] ${
                                formData.bio.length > 200
                                  ? "text-amber-400"
                                  : "text-white/25"
                              }`}
                            >
                              {formData.bio.length}/220
                            </span>
                          </div>

                          <textarea
                            value={formData.bio}
                            maxLength={220}
                            onChange={(e) =>
                              updateField("bio", e.target.value)
                            }
                            placeholder="Tell us what you create, who you speak to, and what makes your content different..."
                            rows={4}
                            className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/25 transition focus:border-cyan-400/40 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-400/20"
                          />

                          {attempted && !formData.bio.trim() && (
                            <p className="mt-2 text-xs text-red-400">
                              A short bio is required.
                            </p>
                          )}
                        </div>

                        {/* Location */}
                        <div>
                          <label className="mb-3 block text-xs font-medium text-white/65">
                            Location
                          </label>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <SelectField
                              label="Country"
                              value={formData.country}
                              placeholder="Select country"
                              options={countries}
                              icon={<Globe2 size={17} />}
                              onChange={(value) =>
                                updateField("country", value)
                              }
                            />

                            <TextInput
                              label="City"
                              placeholder="e.g. Peshawar"
                              value={formData.city}
                              icon={<MapPin size={17} />}
                              onChange={(value) =>
                                updateField("city", value)
                              }
                            />
                          </div>

                          {attempted &&
                            (!formData.country || !formData.city.trim()) && (
                              <p className="mt-2 text-xs text-red-400">
                                Country and city are required.
                              </p>
                            )}
                        </div>

                        {/* Niche */}
                        <div>
                          <label className="mb-3 block text-xs font-medium text-white/65">
                            Primary Niche
                          </label>

                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {niches.map((item) => {
                              const selected = formData.niche === item;

                              return (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() =>
                                    updateField("niche", item)
                                  }
                                  className={`rounded-xl border px-3 py-3 text-left text-xs font-medium transition ${
                                    selected
                                      ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                                      : "border-white/10 bg-white/[0.025] text-white/45 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                                  }`}
                                >
                                  <span className="flex items-center justify-between gap-2">
                                    {item}
                                    {selected && <Check size={14} />}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {attempted && !formData.niche && (
                            <p className="mt-2 text-xs text-red-400">
                              Select your primary niche.
                            </p>
                          )}
                        </div>

                        {/* Languages */}
                        <div>
                          <label className="mb-2 block text-xs font-medium text-white/65">
                            Content Languages
                          </label>

                          <p className="mb-3 text-[11px] text-white/30">
                            Select every language you regularly create content
                            in.
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {languages.map((language) => {
                              const selected =
                                formData.languages.includes(language);

                              return (
                                <button
                                  key={language}
                                  type="button"
                                  onClick={() => toggleLanguage(language)}
                                  className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                                    selected
                                      ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                                      : "border-white/10 bg-white/[0.025] text-white/45 hover:border-white/20 hover:text-white"
                                  }`}
                                >
                                  {language}
                                </button>
                              );
                            })}
                          </div>

                          {attempted &&
                            formData.languages.length === 0 && (
                              <p className="mt-2 text-xs text-red-400">
                                Select at least one content language.
                              </p>
                            )}
                        </div>

                        <NavigationButtons
                          onBack={() => window.history.back()}
                          onNext={handleNextStep}
                          nextLabel="Continue to Social Profiles"
                          showBack={false}
                        />
                      </div>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <StepHeading
                          number="02"
                          title="Social channels"
                          description="Add the channels you actively use for creator work."
                        />

                        <SocialInput
                          label="X / Twitter"
                          placeholder="@username"
                          value={formData.twitter}
                          icon={<Share2 size={17} />}
                          onChange={(value) =>
                            updateField("twitter", value)
                          }
                        />

                        <SocialInput
                          label="YouTube"
                          placeholder="https://youtube.com/@channel"
                          value={formData.youtube}
                          icon={<Video size={17} />}
                          onChange={(value) =>
                            updateField("youtube", value)
                          }
                        />

                        <SocialInput
                          label="Instagram"
                          placeholder="@username or profile URL"
                          value={formData.instagram}
                          icon={<Share2 size={17} />}
                          onChange={(value) =>
                            updateField("instagram", value)
                          }
                        />

                        <SocialInput
                          label="TikTok"
                          placeholder="@username or profile URL"
                          value={formData.tiktok}
                          icon={<Video size={17} />}
                          onChange={(value) =>
                            updateField("tiktok", value)
                          }
                        />

                        <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                          <div className="flex gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                              <Share2 size={15} />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-white/70">
                                Social verification comes later
                              </p>

                              <p className="mt-1 text-xs leading-5 text-white/35">
                                These fields collect your public handles for
                                the prototype. Real social verification will be
                                connected through the platform later.
                              </p>
                            </div>
                          </div>
                        </div>

                        {!hasSocial && attempted && (
                          <p className="text-xs text-red-400">
                            Add at least one active social channel.
                          </p>
                        )}

                        <NavigationButtons
                          onBack={handlePrevStep}
                          onNext={handleNextStep}
                          nextLabel="Continue to Audience"
                        />
                      </div>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <StepHeading
                          number="03"
                          title="Audience & rates"
                          description="Give us a simple snapshot of your reach and commercial expectations."
                        />

                        <TextInput
                          label="Estimated Total Followers / Audience"
                          placeholder="e.g. 50,000"
                          value={formData.followersCount}
                          icon={<Users size={17} />}
                          onChange={(value) =>
                            updateField("followersCount", value)
                          }
                        />

                        <div>
                          <label className="mb-2 block text-xs font-medium text-white/65">
                            Starting Rate per Deliverable
                          </label>

                          <div className="relative">
                            <DollarSign
                              size={17}
                              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                            />

                            <input
                              type="number"
                              min="0"
                              value={formData.rateUsdt}
                              onChange={(e) =>
                                updateField("rateUsdt", e.target.value)
                              }
                              placeholder="e.g. 500"
                              className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-20 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-cyan-400/40 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-400/20"
                            />

                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-white/30">
                              USDT
                            </span>
                          </div>
                        </div>

                        <TextInput
                          label="Primary Audience Region"
                          placeholder="e.g. Pakistan / South Asia"
                          value={formData.primaryAudienceCountry}
                          icon={<Globe2 size={17} />}
                          onChange={(value) =>
                            updateField("primaryAudienceCountry", value)
                          }
                        />

                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                          <p className="text-xs font-medium text-white/60">
                            Important
                          </p>

                          <p className="mt-1 text-xs leading-5 text-white/35">
                            Rates and audience figures are used as starting
                            information for campaign matching. Final campaign
                            pricing is agreed through InfluxBridge.
                          </p>
                        </div>

                        {attempted && !step3Valid && (
                          <p className="text-xs text-red-400">
                            Complete your audience size, starting rate and
                            primary audience region.
                          </p>
                        )}

                        <NavigationButtons
                          onBack={handlePrevStep}
                          onNext={handleNextStep}
                          nextLabel="Continue to Portfolio"
                        />
                      </div>
                    )}

                    {/* STEP 4 */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <StepHeading
                          number="04"
                          title="Portfolio & work samples"
                          description="Show the team where they can review your previous work."
                        />

                        <UrlInput
                          label="Portfolio / Media Kit Link"
                          placeholder="https://..."
                          value={formData.portfolioUrl}
                          onChange={(value) =>
                            updateField("portfolioUrl", value)
                          }
                        />

                        <UrlInput
                          label="Sample Content Link"
                          placeholder="https://..."
                          value={formData.sampleVideoUrl}
                          onChange={(value) =>
                            updateField("sampleVideoUrl", value)
                          }
                        />

                        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
                              <LinkIcon size={16} />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-white/65">
                                What makes a strong submission?
                              </p>

                              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-white/35">
                                <li>• Recent content samples</li>
                                <li>• Sponsored work where available</li>
                                <li>• Media kit or creator portfolio</li>
                                <li>• Links that are publicly accessible</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {attempted && !step4Valid && (
                          <p className="text-xs text-red-400">
                            Add at least one portfolio or sample content link.
                          </p>
                        )}

                        <NavigationButtons
                          onBack={handlePrevStep}
                          onNext={handleNextStep}
                          nextLabel="Review Profile"
                        />
                      </div>
                    )}

                    {/* STEP 5 */}
                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <StepHeading
                          number="05"
                          title="Review your profile"
                          description="Check your information before submitting it to the InfluxBridge creator network."
                        />

                        {/* Profile preview */}
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                          <div className="flex items-center gap-4 border-b border-white/10 p-5">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
                              {profileImage ? (
                                <img
                                  src={profileImage}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <UserRound
                                  size={24}
                                  className="text-white/20"
                                />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-base font-semibold">
                                {formData.creatorName || "Creator Name"}
                              </p>

                              <p className="mt-1 text-xs text-cyan-300">
                                {formData.niche || "Creator"}
                              </p>

                              <p className="mt-1 truncate text-xs text-white/35">
                                {formData.city && formData.country
                                  ? `${formData.city}, ${formData.country}`
                                  : "Location not set"}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4 p-5">
                            <SummaryRow
                              label="Bio"
                              value={formData.bio || "Not set"}
                              stacked
                            />

                            <SummaryRow
                              label="Languages"
                              value={
                                formData.languages.join(", ") || "Not set"
                              }
                            />

                            <SummaryRow
                              label="Audience"
                              value={
                                formData.followersCount
                                  ? `${formData.followersCount} estimated followers`
                                  : "Not set"
                              }
                            />

                            <SummaryRow
                              label="Starting Rate"
                              value={
                                formData.rateUsdt
                                  ? `${formData.rateUsdt} USDT`
                                  : "Not set"
                              }
                            />

                            <SummaryRow
                              label="Primary Market"
                              value={
                                formData.primaryAudienceCountry || "Not set"
                              }
                            />
                          </div>
                        </div>

                        {/* Social summary */}
                        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                          <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                            Social Channels
                          </p>

                          <div className="mt-4 grid gap-2 sm:grid-cols-2">
                            <SocialSummary
                              label="X / Twitter"
                              value={formData.twitter}
                            />
                            <SocialSummary
                              label="YouTube"
                              value={formData.youtube}
                            />
                            <SocialSummary
                              label="Instagram"
                              value={formData.instagram}
                            />
                            <SocialSummary
                              label="TikTok"
                              value={formData.tiktok}
                            />
                          </div>
                        </div>

                        {/* Submission note */}
                        <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-5">
                          <div className="flex gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                              <FileCheck size={17} />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-white/75">
                                Ready for submission
                              </p>

                              <p className="mt-1 text-xs leading-5 text-white/35">
                                Your profile will enter the InfluxBridge review
                                process. Verification and any required KYC
                                checks can be handled separately after
                                submission.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 border-t border-white/10 pt-6">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold transition hover:bg-white/[0.08]"
                          >
                            Back
                          </button>

                          <button
                            type="submit"
                            className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
                          >
                            Submit Profile
                            <ArrowRight
                              size={17}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          ) : (
            /* SUCCESS */
            <div className="mx-auto max-w-2xl">
              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                  <Check size={28} className="text-emerald-400" />
                </div>

                <p className="mt-7 text-xs uppercase tracking-[0.2em] text-cyan-300">
                  Profile Submitted
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Your creator profile is under review.
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/45">
                  Your profile information has been submitted in this
                  prototype. In the production platform, the InfluxBridge team
                  will review your profile and handle verification before it
                  becomes active.
                </p>

                <div className="mt-8 space-y-3 text-left">
                  <StatusCard
                    icon={<Check size={16} />}
                    title="Profile submitted"
                    text="Your creator information is ready for internal review."
                    complete
                  />

                  <StatusCard
                    icon={<Share2 size={16} />}
                    title="Social verification"
                    text="Will be handled when real social integrations are connected."
                  />

                  <StatusCard
                    icon={<FileCheck size={16} />}
                    title="Verification / KYC"
                    text="Handled separately through the appropriate private review flow."
                  />
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/influencers"
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold transition hover:bg-white/[0.08]"
                  >
                    View Creator Network
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Step heading                                                                */
/* -------------------------------------------------------------------------- */

function StepHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/70">
        Step {number}
      </p>

      <h2 className="mt-2 text-2xl font-semibold">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-white/45">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Progress                                                                    */
/* -------------------------------------------------------------------------- */

function ProgressStep({
  number,
  label,
  active,
  completed,
}: {
  number: string;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-semibold transition ${
          completed
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
            : active
              ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
              : "border-white/10 bg-white/[0.025] text-white/25"
        }`}
      >
        {completed ? <Check size={12} /> : number}
      </div>

      <span
        className={`hidden text-[10px] font-medium uppercase tracking-[0.12em] xl:block ${
          active
            ? "text-white/65"
            : completed
              ? "text-emerald-400/80"
              : "text-white/25"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function ProgressLine({ completed }: { completed: boolean }) {
  return (
    <div
      className={`mx-2 h-px min-w-3 flex-1 transition ${
        completed ? "bg-emerald-400/30" : "bg-white/10"
      }`}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Inputs                                                                      */
/* -------------------------------------------------------------------------- */

function TextInput({
  label,
  placeholder,
  value,
  icon,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-medium text-white/65">{label}</label>

        {error && <span className="text-[10px] text-red-400">{error}</span>}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25">
          {icon}
        </div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-cyan-400/40 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-400/20"
        />
      </div>
    </div>
  );
}

function SocialInput({
  label,
  placeholder,
  value,
  icon,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}) {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={value}
      icon={icon}
      onChange={onChange}
    />
  );
}

function UrlInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={value}
      icon={<LinkIcon size={17} />}
      onChange={onChange}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Select                                                                      */
/* -------------------------------------------------------------------------- */

function SelectField({
  label,
  value,
  placeholder,
  options,
  icon,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  icon: React.ReactNode;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] text-white/40">{label}</label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25">
          {icon}
        </div>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-black/20 pl-11 pr-10 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:bg-white/[0.04]"
        >
          <option value="" disabled className="bg-[#080a10]">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#080a10]"
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/25"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

function NavigationButtons({
  onBack,
  onNext,
  nextLabel,
  showBack = true,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  showBack?: boolean;
}) {
  return (
    <div className="flex gap-3 border-t border-white/10 pt-6">
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold transition hover:bg-white/[0.08]"
        >
          Back
        </button>
      )}

      <button
        type="button"
        onClick={onNext}
        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
      >
        {nextLabel}

        <ArrowRight
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Information                                                                 */
/* -------------------------------------------------------------------------- */

function InfoItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-cyan-300">
        {icon}
      </div>

      <div>
        <p className="text-xs font-medium text-white/70">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/35">{text}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Review                                                                      */
/* -------------------------------------------------------------------------- */

function SummaryRow({
  label,
  value,
  stacked = false,
}: {
  label: string;
  value: string;
  stacked?: boolean;
}) {
  return (
    <div
      className={
        stacked
          ? "space-y-1"
          : "flex items-center justify-between gap-4 text-xs"
      }
    >
      <span className="shrink-0 text-white/40">{label}</span>

      <span
        className={
          stacked
            ? "block text-xs leading-5 text-white/65"
            : "text-right font-medium text-white/75"
        }
      >
        {value}
      </span>
    </div>
  );
}

function SocialSummary({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5">
      <span className="text-xs text-white/40">{label}</span>

      <span className="max-w-[55%] truncate text-xs font-medium text-white/65">
        {value || "Not connected"}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Success                                                                     */
/* -------------------------------------------------------------------------- */

function StatusCard({
  icon,
  title,
  text,
  complete = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  complete?: boolean;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          complete
            ? "bg-emerald-400/10 text-emerald-400"
            : "bg-cyan-400/10 text-cyan-300"
        }`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-white/75">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/35">{text}</p>
      </div>
    </div>
  );
}