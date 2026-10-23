"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Search } from "lucide-react";

type MessageRow = {
  id: string;
  conversation_id: string;
  body: string;
  created_at: string;
  sender: { full_name: string | null } | null;
};

const title = { eyebrow: "Communications", heading: "Messages", sub: "Review recent messages across company, creator, and campaign conversations." };

export default function AdminMessagesPage() {
  const [rows, setRows] = useState<MessageRow[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const supabase = useMemo(() => createClient(), []);

  const load = useCallback(async () => {
    const { data, error: requestError } = await supabase.from("messages")
      .select("id, conversation_id, body, created_at, sender:profiles!messages_sender_id_fkey(full_name)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (requestError) { setError(requestError.message); setLoading(false); return; }
    setRows((data ?? []) as unknown as MessageRow[]);
    setError("");
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
    const channel = supabase.channel("admin-messages-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => void load())
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [load, supabase]);

  const filtered = rows.filter(row => {
    const haystack = `${row.sender?.full_name ?? "Unknown sender"} ${row.body} ${row.conversation_id}`.toLowerCase();
    const age = Date.now() - new Date(row.created_at).getTime();
    const withinFilter = filter === "All" || (filter === "24 hours" && age <= 86400000) || (filter === "7 days" && age <= 604800000);
    return haystack.includes(query.toLowerCase()) && withinFilter;
  });

  return <>
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-[9px] uppercase tracking-[0.2em] text-white/30">{title.eyebrow}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{title.heading}</h2><p className="mt-2 text-xs text-white/40">{title.sub}</p></div><div className="text-[10px] text-white/30">{filtered.length} visible messages · latest 200 loaded</div></div>
    <div className="mt-6 flex flex-col gap-3 lg:flex-row"><div className="relative flex-1"><Search className="absolute left-3.5 top-3 text-white/30" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search sender, message, or conversation ID..." className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-white/25 focus:border-cyan-400/25"/></div><div className="flex gap-2">{["All","24 hours","7 days"].map(x=><button key={x} onClick={()=>setFilter(x)} className={`rounded-xl border px-3.5 py-2.5 text-[10px] ${filter===x?"border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300":"border-white/[0.07] bg-white/[0.02] text-white/40"}`}>{x}</button>)}</div></div>
    {error && <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-3 text-xs text-red-200">Supabase: {error}</p>}
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"><div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left"><thead className="border-b border-white/[0.07] bg-white/[0.015] text-[9px] uppercase tracking-[0.16em] text-white/30"><tr>{["Sender","Message","Conversation","Sent"].map(x=><th key={x} className="px-5 py-3.5 font-medium">{x}</th>)}</tr></thead><tbody className="divide-y divide-white/[0.055]">
      {loading?<tr><td colSpan={4} className="px-5 py-8 text-center text-xs text-white/40">Loading messages from Supabase…</td></tr>:filtered.length===0?<tr><td colSpan={4} className="px-5 py-8 text-center text-xs text-white/40">No messages found.</td></tr>:filtered.map(row=><tr key={row.id} className="transition hover:bg-white/[0.025]"><td className="px-5 py-4 text-xs text-white/80">{row.sender?.full_name||"Unknown sender"}</td><td className="max-w-[420px] px-5 py-4 text-xs text-white/50"><p className="line-clamp-2">{row.body}</p></td><td className="px-5 py-4 font-mono text-[10px] text-white/35">{row.conversation_id.slice(0,8)}…</td><td className="px-5 py-4 text-xs text-white/45">{new Date(row.created_at).toLocaleString()}</td></tr>)}
    </tbody></table></div></div>
  </>;
}
