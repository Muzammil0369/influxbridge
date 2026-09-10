"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Command, Network, Search, X } from "lucide-react";
import ScrollWorldLoader from "@/components/three/ScrollWorldLoader";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/influencers", label: "Influencers" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
];

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = navLinks.filter((l) =>
    l.label.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
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
          <button
            onClick={onClose}
            className="rounded p-1 text-white/30 hover:bg-white/5 hover:text-white"
          >
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
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-white/30">
              No results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

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
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[#02050f]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-[#02050f]/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:px-12">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
              <Network className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-semibold tracking-tight">
              Influx<span className="text-cyan-400">Bridge</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition ${
                    active ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/40 transition hover:border-white/20 hover:text-white/70 md:flex"
            >
              <Search className="h-3 w-3" />
              <span>Search</span>
              <kbd className="ml-3 flex items-center gap-0.5 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>

            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
            >
              Start Campaign
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </nav>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#02040a]/80 px-6 py-10 backdrop-blur-xl lg:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <Network className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-semibold">
            Influx<span className="text-cyan-400">Bridge</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/40">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </div>

        <div className="text-[11px] text-white/25">© 2026 InfluxBridge</div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      {/* Solid atmosphere — sits BEHIND the 3D canvas */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#02050f]">
        <div className="absolute left-1/2 top-[-400px] h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[140px]" />
        <div className="absolute bottom-[-300px] right-[-200px] h-[600px] w-[600px] rounded-full bg-purple-600/[0.06] blur-[140px]" />
      </div>

      {/* 🌍 THE WORLD — renders on every page using PageShell */}
      <ScrollWorldLoader />

      <Navbar />
      <div className="relative z-10">{children}</div>
      <Footer />
    </main>
  );
}