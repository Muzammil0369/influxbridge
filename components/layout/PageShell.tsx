"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Search, X, Menu } from "lucide-react";
import ScrollWorldLoader from "@/components/three/ScrollWorldLoader";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/influencers", label: "Influencers" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const filtered = navLinks.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()));
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#060b18]/95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-4 w-4 text-white/40" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
          <button onClick={onClose} className="rounded p-1 text-white/30 hover:bg-white/5 hover:text-white">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              <span>{link.label}</span>
              <ArrowRight className="h-3.5 w-3.5 text-white/30" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`
          fixed left-0 right-0 top-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? "border-b border-white/[0.05] bg-[#01050c]/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              : "bg-transparent"
          }
        `}
      >
        <div className="mx-auto flex h-[80px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* LEFT — Logo */}
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

          {/* DESKTOP CENTER — Nav links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative
                    py-5
                    text-sm
                    font-medium
                    transition-colors
                    ${active ? "text-[#27b8ff]" : "text-white/60 hover:text-white"}
                  `}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-[11px] left-0 right-0 mx-auto h-[2px] rounded-full bg-[#00aaff] shadow-[0_0_12px_#00aaff]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT — Search + Login + CTA + Mobile Menu Toggle */}
          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Search"
            >
              <Search size={16} strokeWidth={1.8} />
            </button>

            <Link
              href="/login"
              className="hidden rounded-full border border-blue-400/70 px-5 py-2 text-xs transition-all hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(0,140,255,0.3)] sm:block"
            >
              Login
            </Link>

            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-[#079cf4] to-[#9a3df4] px-6 py-2.5 text-xs font-semibold shadow-[0_0_22px_rgba(75,90,255,.35)] transition-all hover:scale-105 hover:brightness-110"
            >
              Start a Campaign
              <ArrowRight size={13} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DROPDOWN */}
        {mobileMenuOpen && (
          <div className="absolute top-[80px] left-0 right-0 border-b border-white/10 bg-[#01050c]/95 backdrop-blur-2xl p-6 lg:hidden shadow-2xl">
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium py-2 transition-colors ${
                      active ? "text-[#27b8ff]" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-blue-400/70 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#079cf4] to-[#9a3df4] px-6 py-3 text-sm font-semibold shadow-[0_0_22px_rgba(75,90,255,.35)]"
                >
                  Start a Campaign
                  <ArrowRight size={14} />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#000104]/95 backdrop-blur-md shadow-[inset_0_40px_60px_rgba(0,0,0,0.95)]">
      <div className="mx-auto flex flex-col md:flex-row h-auto md:h-[120px] max-w-[1600px] items-center justify-between px-6 py-8 lg:px-12 gap-6 text-center md:text-left">
        <Link href="/" className="flex items-center gap-3">
          <img src="/a-logo.png" alt="InfluxBridge" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold">
            Influx<span className="text-cyan-400">Bridge</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6 sm:gap-9 flex-wrap justify-center">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="text-xs text-white/40">
          © 2026 InfluxBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden text-white"
      style={{ backgroundColor: "#01050c" }}
    >
      {/* Solid dark backdrop — sits behind the canvas */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -1,
          backgroundColor: "#01050c",
        }}
      />

      {/* 3D world — must be above the backdrop but below content */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0, background: "transparent" }}
      >
        <ScrollWorldLoader />
      </div>

      <Navbar />
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
      <Footer />
    </main>
  );
}