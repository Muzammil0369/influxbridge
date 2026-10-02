"use client";

import { useEffect, useMemo, useState } from "react";
import { getLeads } from "@/lib/platform";
import { Filter, MoreHorizontal, Search } from "lucide-react";

type Row = Record<string, string>;

const [rows,setRows] = useState<Row[]>([]);
  useEffect(() => { const load = () => setRows(getLeads().map((x) => ({ company:x.company, request:x.request, budget:`${x.budget.toLocaleString()}`, status:x.status, received:x.received }))); load(); const h=()=>load(); window.addEventListener("influxbridge:store",h); return ()=>window.removeEventListener("influxbridge:store",h); }, []);
const filters = ["All","New","Qualified","Proposal Sent"];
const title = { eyebrow: "Business Development", heading: "Leads", sub: "Review inbound opportunities, qualify prospects, and track proposal progress." };

export default function AdminSectionPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => rows.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase()) &&
    (filter === "All" || row.status === filter)
  ), [query, filter]);

  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">{title.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title.heading}</h2>
          <p className="mt-2 text-xs text-white/30">{title.sub}</p>
        </div>
        <div className="text-[10px] text-white/20">{filtered.length} visible records</div>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 text-white/20" size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search records..." className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-white/20 focus:border-cyan-400/25 focus:bg-white/[0.04]" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((x) => (
            <button key={x} onClick={() => setFilter(x)} className={`whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-[10px] transition ${filter === x ? "border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300" : "border-white/[0.07] bg-white/[0.02] text-white/30 hover:text-white/60"}`}>
              <Filter size={12} className="mr-1.5 inline" />{x}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead className="border-b border-white/[0.07] bg-white/[0.015] text-[9px] uppercase tracking-[0.16em] text-white/20">
              <tr>{Object.keys(rows[0]).map((key) => <th key={key} className="px-5 py-3.5 font-medium">{key}</th>)}<th className="px-5 py-3.5 font-medium">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-white/[0.055]">
              {filtered.map((row, i) => (
                <tr key={i} className="group transition hover:bg-white/[0.025]">
                  {Object.entries(row).map(([key, value]) => (
                    <td key={key} className="px-5 py-4 text-xs text-white/45">
                      {key === "status" ? <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-2.5 py-1 text-[9px] text-cyan-300/80">{value}</span> : value}
                    </td>
                  ))}
                  <td className="px-5 py-4"><button className="rounded-lg p-2 text-white/20 transition hover:bg-white/[0.05] hover:text-white" aria-label="More actions"><MoreHorizontal size={16}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
