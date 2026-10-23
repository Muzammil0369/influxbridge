"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Filter, MoreHorizontal, Search } from "lucide-react";

type Lead = {
  id: string;
  company_name: string;
  contact_name: string | null;
  contact_email: string | null;
  website_url: string | null;
  budget: number | null;
  currency: string;
  notes: string | null;
  status: string;
  created_at: string;
};

const filters = ["All", "NEW", "QUALIFIED", "PROPOSAL_SENT"];
const title = { eyebrow: "Business Development", heading: "Leads", sub: "Review inbound opportunities, qualify prospects, and track proposal progress." };
const pretty = (value: string) => value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function AdminSectionPage() {
  const [rows, setRows] = useState<Lead[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let alive = true;

    const load = async () => {
      const { data, error: fetchError } = await supabase
        .from("leads")
        .select("id, company_name, contact_name, contact_email, website_url, budget, currency, notes, status, created_at")
        .order("created_at", { ascending: false });

      if (!alive) return;
      if (fetchError) setError(fetchError.message);
      else {
        setError("");
        setRows((data ?? []) as Lead[]);
      }
      setLoading(false);
    };

    void load();
    const channel = supabase
      .channel("admin-leads-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => void load())
      .subscribe();

    return () => {
      alive = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  const filtered = useMemo(() => rows.filter((row) => {
    const haystack = [row.company_name, row.contact_name, row.contact_email, row.website_url, row.notes, row.status].filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(query.toLowerCase()) && (filter === "All" || row.status.toUpperCase() === filter);
  }), [rows, query, filter]);

  async function updateStatus(id: string, status: string) {
    setSavingId(id);
    setError("");
    const supabase = createClient();
    const { error: updateError } = await supabase.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (updateError) setError(updateError.message);
    else setRows((current) => current.map((lead) => lead.id === id ? { ...lead, status } : lead));
    setSavingId(null);
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">{title.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title.heading}</h2>
          <p className="mt-2 text-xs text-white/30">{title.sub}</p>
        </div>
        <div className="text-[10px] text-white/30">{filtered.length} visible records · Live from Supabase</div>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 text-white/20" size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search companies, contacts, notes..." className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-white/20 focus:border-cyan-400/25 focus:bg-white/[0.04]" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((value) => (
            <button key={value} onClick={() => setFilter(value)} className={`whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-[10px] transition ${filter === value ? "border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300" : "border-white/[0.07] bg-white/[0.02] text-white/30 hover:text-white/60"}`}>
              <Filter size={12} className="mr-1.5 inline" />{value === "All" ? value : pretty(value)}
            </button>
          ))}
        </div>
      </div>

      {error && <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs text-red-200">Could not load/save leads: {error}</p>}

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="border-b border-white/[0.07] bg-white/[0.015] text-[9px] uppercase tracking-[0.16em] text-white/20">
              <tr>{["Company / Contact", "Project notes", "Budget", "Status", "Received", "Action"].map((heading) => <th key={heading} className="px-5 py-3.5 font-medium">{heading}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-white/[0.055]">
              {!loading && filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-xs text-white/35">{error ? "Records could not be loaded." : query || filter !== "All" ? "No leads match this search or filter." : "No leads yet. New contact-form submissions will appear here."}</td></tr>}
              {loading && <tr><td colSpan={6} className="px-5 py-12 text-center text-xs text-white/35">Loading leads from Supabase…</td></tr>}
              {filtered.map((lead) => (
                <tr key={lead.id} className="group transition hover:bg-white/[0.025]">
                  <td className="px-5 py-4"><p className="text-xs font-medium text-white/75">{lead.company_name}</p><p className="mt-1 text-[10px] text-white/35">{lead.contact_name || "Contact not provided"}{lead.contact_email ? ` · ${lead.contact_email}` : ""}</p></td>
                  <td className="max-w-[280px] px-5 py-4 text-xs text-white/45">{lead.notes || lead.website_url || "—"}</td>
                  <td className="px-5 py-4 text-xs text-white/45">{lead.budget == null ? "Not specified" : `${lead.currency} ${Number(lead.budget).toLocaleString()}`}</td>
                  <td className="px-5 py-4"><span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-2.5 py-1 text-[9px] text-cyan-300/80">{pretty(lead.status)}</span></td>
                  <td className="px-5 py-4 text-xs text-white/40">{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4"><select aria-label={`Update status for ${lead.company_name}`} disabled={savingId === lead.id} value={lead.status} onChange={(event) => void updateStatus(lead.id, event.target.value)} className="max-w-[160px] rounded-lg border border-white/10 bg-[#071426] px-2 py-2 text-[10px] text-white/70 outline-none focus:border-cyan-400/40"><option value={lead.status}>{savingId === lead.id ? "Saving…" : pretty(lead.status)}</option>{["NEW", "QUALIFIED", "PROPOSAL_SENT", "WON", "LOST"].filter((status) => status !== lead.status).map((status) => <option key={status} value={status}>{pretty(status)}</option>)}</select><MoreHorizontal className="ml-2 inline text-white/20" size={14}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
