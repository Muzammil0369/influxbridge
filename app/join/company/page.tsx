"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, ImagePlus, LoaderCircle, Mail, Globe2, LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function CompanyJoinPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");

  function handleLogo(file?: File) {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp", "image/avif"].includes(file.type)) {
      setErrorMessage("Choose a PNG, JPG, WebP or AVIF image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Your logo must be 5MB or smaller.");
      return;
    }
    setErrorMessage("");
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage("");
    setNotice("");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          role: "COMPANY",
          full_name: fullName.trim(),
          company_name: companyName.trim(),
          website_url: website.trim(),
          description: description.trim(),
        },
      },
    });

    if (error || !data.user) {
      setLoading(false);
      setErrorMessage(error?.message ?? "We couldn't create your account. Please try again.");
      return;
    }

    if (!data.session) {
      setLoading(false);
      setNotice("We sent a verification link to " + email.trim() + ". Confirm your email before signing in. Your company workspace is ready; you can upload its logo after verification.");
      return;
    }

    if (logo) {
      const extension = logo.name.split(".").pop()?.toLowerCase() || "png";
      const path = `${data.user.id}/logo-${Date.now()}.${extension}`;
      const { error: uploadError } = await supabase.storage.from("company-logos").upload(path, logo, { upsert: true, contentType: logo.type });
      if (uploadError) {
        setLoading(false);
        setErrorMessage(`Account created, but logo upload failed: ${uploadError.message}. You can sign in and upload it again.`);
        return;
      }
      const logoUrl = supabase.storage.from("company-logos").getPublicUrl(path).data.publicUrl;
      const { error: saveLogoError } = await supabase.rpc("set_company_logo", { p_logo_url: logoUrl });
      if (saveLogoError) {
        setLoading(false);
        setErrorMessage(`Account created, but saving the logo failed: ${saveLogoError.message}`);
        return;
      }
    }

    setLoading(false);
    router.replace("/dashboard/company");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060a] px-5 py-8 text-white sm:px-8 sm:py-12">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-[-15%] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[-5%] h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[150px]" />
      </div>
      <header className="relative mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"><img src="/a-logo.png" alt="InfluxBridge" className="h-full w-full object-contain" /></span>
          <span><span className="block font-semibold">InfluxBridge</span><span className="block text-[10px] uppercase tracking-[.22em] text-white/35">Company onboarding</span></span>
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"><ArrowLeft size={16}/> Home</Link>
      </header>

      <section className="relative mx-auto grid max-w-6xl gap-10 py-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[.06] px-4 py-2 text-xs uppercase tracking-[.18em] text-cyan-300"><Building2 size={14}/> For companies</div>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Build your next campaign with <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">InfluxBridge.</span></h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/50">Create your company workspace to discover creators, coordinate campaigns and keep communication in one place.</p>
          <div className="mt-8 space-y-4 text-sm text-white/55">
            <p className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[.04] text-cyan-300"><Building2 size={16}/></span> A dedicated workspace for your company</p>
            <p className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[.04] text-cyan-300"><Globe2 size={16}/></span> Creator discovery and campaign management</p>
            <p className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[.04] text-cyan-300"><ImagePlus size={16}/></span> Add your company logo to your workspace</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">
          <div className="mb-7"><h2 className="text-2xl font-semibold">Create company account</h2><p className="mt-2 text-sm text-white/45">Your workspace is created securely with your account.</p></div>
          {notice ? <div role="status" className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[.09] to-violet-500/[.07] p-6 text-sm leading-6 text-white/75"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200"><Mail size={25}/></div><p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-300">One last step</p><h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Check your inbox</h3><p className="mt-3">{notice}</p><p className="mt-3 text-xs text-white/40">If you don’t see it, check your spam or junk folder.</p><Link href="/login" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3 font-semibold text-black transition hover:brightness-110">Continue to login <ArrowRight size={16}/></Link></div> : <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your full name" value={fullName} onChange={setFullName} placeholder="Full name" required/>
              <Field label="Company name" value={companyName} onChange={setCompanyName} placeholder="Company name" required/>
            </div>
            <Field label="Work email" value={email} onChange={setEmail} placeholder="you@company.com" type="email" required/>
            <Field label="Company website (optional)" value={website} onChange={setWebsite} placeholder="https://example.com" type="url"/>
            <div><label className="mb-2 block text-xs font-medium text-white/65">Company overview (optional)</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} maxLength={1200} placeholder="Tell us a little about your company..." className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-400/40"/></div>
            <div><label className="mb-3 block text-xs font-medium text-white/65">Company logo (optional)</label><div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/20">{logoPreview ? <img src={logoPreview} alt="Company logo preview" className="h-full w-full object-contain"/> : <Building2 size={24} className="text-white/25"/>}</div><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm hover:bg-white/[.08]"><ImagePlus size={16}/> {logo ? "Change logo" : "Upload logo"}<input type="file" accept="image/png,image/jpeg,image/webp,image/avif" className="hidden" onChange={(e) => handleLogo(e.target.files?.[0])}/></label></div><p className="mt-2 text-[11px] text-white/30">PNG, JPG, WebP or AVIF · Maximum 5MB</p></div>
            <div><label className="mb-2 block text-xs font-medium text-white/65">Password</label><div className="relative"><LockKeyhole size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"/><input type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-400/40"/></div></div>
            {errorMessage && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{errorMessage}</p>}
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60">{loading ? <><LoaderCircle size={17} className="animate-spin"/> Creating workspace…</> : <>Create company workspace <ArrowRight size={17}/></>}</button>
            <p className="text-center text-sm text-white/40">Already registered? <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">Log in</Link></p>
          </form>}
        </div>
      </section>
    </main>
  );
}

function Field({label,value,onChange,placeholder,type="text",required=false}:{label:string;value:string;onChange:(value:string)=>void;placeholder:string;type?:string;required?:boolean}) {
  return <div><label className="mb-2 block text-xs font-medium text-white/65">{label}</label><input type={type} required={required} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-400/40"/></div>;
}
