"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Filter, MoreHorizontal, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

type Row = Record<string, string>;
const rows: Row[] = [{"campaign":"Pakistan Market Launch","company":"NovaPay","status":"Active","progress":"68%","creators":"8"},{"campaign":"Digital Asset Awareness","company":"VaultX","status":"In Review","progress":"91%","creators":"5"},{"campaign":"Creator Launch Series","company":"Finora","status":"Completed","progress":"100%","creators":"6"}];
const filters = ["All","Active","In Review","Completed"];

export default function AdminPage() {
  const [query,setQuery]=useState("");
  const [filter,setFilter]=useState("All");
  const filtered=useMemo(() => rows.filter(row =>
    Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase()) &&
    (filter === "All" || row.status === filter)
  ), [query,filter]);

  return <main className="min-h-screen bg-[#04060c] text-white">
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#04060c]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="rounded-xl border border-white/10 p-2 text-white/50 hover:text-white"><ArrowLeft size={18}/></Link>
          <div><p className="text-[10px] uppercase tracking-[.2em] text-cyan-300/60">InfluxBridge Admin</p><h1 className="text-xl font-semibold">Campaigns</h1></div>
        </div>
        <div className="hidden items-center gap-2 text-xs text-white/30 sm:flex"><ShieldCheck size={15} className="text-cyan-300"/> Internal operations</div>
      </div>
    </header>
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">
      <p className="max-w-2xl text-sm leading-6 text-white/35">Monitor active projects, creator assignments, progress, and campaign states.</p>
      <div className="mt-7 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1"><Search className="absolute left-3 top-3 text-white/25" size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search..." className="w-full rounded-xl border border-white/10 bg-white/[.03] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-cyan-400/30"/></div>
        <div className="flex gap-2 overflow-x-auto">{filters.map(x=><button key={x} onClick={()=>setFilter(x)} className={`whitespace-nowrap rounded-xl border px-4 py-2.5 text-xs ${filter===x?"border-cyan-400/30 bg-cyan-400/10 text-cyan-300":"border-white/10 bg-white/[.03] text-white/40"}`}><Filter size={13} className="mr-2 inline"/>{x}</button>)}</div>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/[.025]">
        <table className="w-full min-w-[850px] text-left"><thead className="border-b border-white/10 text-[9px] uppercase tracking-[.16em] text-white/20"><tr>
          {Object.keys(rows[0]).map(key=><th key={key} className="px-5 py-4 font-medium">{key}</th>)}<th className="px-5 py-4">Action</th>
        </tr></thead>
        <tbody className="divide-y divide-white/[.06]">{filtered.map((row,i)=><tr key={i} className="hover:bg-white/[.02]">
          {Object.entries(row).map(([key,value])=><td key={key} className="px-5 py-4 text-xs text-white/50">{key==="status"?<span className="rounded-full border border-cyan-400/15 bg-cyan-400/[.06] px-2.5 py-1 text-cyan-300">{value}</span>:value}</td>)}
          <td className="px-5 py-4"><button className="rounded-lg p-2 text-white/30 hover:bg-white/5 hover:text-white" aria-label="More actions"><MoreHorizontal size={17}/></button></td>
        </tr>)}</tbody></table>
      </div>
      <div className="mt-5 flex items-center justify-between text-xs text-white/25"><span>{filtered.length} record(s)</span><Link href="/admin" className="flex items-center gap-1.5 text-cyan-300">Admin overview <ArrowRight size={13}/></Link></div>
    </div>
  </main>;
}