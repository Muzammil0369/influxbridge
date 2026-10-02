"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CheckCheck,
  Home,
  Menu,
  MessageSquare,
  Paperclip,
  Search,
  Send,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

type Conversation = {
  id: string;
  name: string;
  role: string;
  initials: string;
  campaign: string;
  lastMessage: string;
  time: string;
  unread: number;
};

const conversations: Conversation[] = [
  {
    id: "nova",
    name: "Sarah Khan",
    role: "Campaign Manager · InfluxBridge",
    initials: "SK",
    campaign: "NovaPay Market Launch",
    lastMessage:
      "The revised Reel brief is ready. Please review it before uploading.",
    time: "10:42 AM",
    unread: 2,
  },
  {
    id: "ali",
    name: "Ali Raza",
    role: "Campaign Manager · InfluxBridge",
    initials: "AR",
    campaign: "VaultX Awareness",
    lastMessage:
      "Thanks, Ahmed. The content has moved into client review.",
    time: "Yesterday",
    unread: 1,
  },
  {
    id: "support",
    name: "InfluxBridge Support",
    role: "Platform Support",
    initials: "IB",
    campaign: "Account",
    lastMessage:
      "Your creator profile is currently visible to the internal team.",
    time: "Sep 29",
    unread: 0,
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "Sarah Khan",
    mine: false,
    text: "Hey Ahmed, the NovaPay campaign is moving into the next deliverable.",
    time: "10:21 AM",
  },
  {
    id: 2,
    sender: "You",
    mine: true,
    text: "Perfect. I have the draft ready. Should I follow the previous CTA?",
    time: "10:27 AM",
  },
  {
    id: 3,
    sender: "Sarah Khan",
    mine: false,
    text: "Yes. Keep the CTA exactly as written in the campaign brief.",
    time: "10:31 AM",
  },
  {
    id: 4,
    sender: "Sarah Khan",
    mine: false,
    text: "The revised Reel brief is ready. Please review it before uploading.",
    time: "10:42 AM",
  },
];

export default function InfluencerMessagesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(conversations[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  function sendMessage() {
    const value = draft.trim();

    if (!value) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "You",
        mine: true,
        text: value,
        time: "Now",
      },
    ]);

    setDraft("");
  }

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#080b13]/95 backdrop-blur-xl transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <Link href="/">
              <img
                src="/a-logo.png"
                alt="InfluxBridge"
                className="h-9 w-auto"
              />
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-300">
                AM
              </div>

              <div>
                <p className="text-sm font-semibold">Ahmed Malik</p>
                <p className="text-xs text-white/35">
                  Creator account
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            <SidebarLink
              href="/dashboard/influencer"
              icon={<Home size={18} />}
              label="Overview"
            />

            <SidebarLink
              href="/dashboard/influencer/campaigns"
              icon={<BriefcaseBusiness size={18} />}
              label="Campaigns"
            />

            <SidebarLink
              href="/dashboard/influencer/messages"
              icon={<MessageSquare size={18} />}
              label="Messages"
              active
            />

            <SidebarLink
              href="/dashboard/influencer/profile"
              icon={<Users size={18} />}
              label="My Profile"
            />
          </nav>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to website
            </Link>
          </div>
        </div>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/85 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-xl border border-white/10 p-2 lg:hidden"
              >
                <Menu size={19} />
              </button>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
                  Creator Portal
                </p>
                <h1 className="mt-1 text-xl font-semibold">
                  Messages
                </h1>
              </div>
            </div>

            <button className="relative rounded-xl border border-white/10 p-2.5 text-white/60 hover:bg-white/5">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </button>
          </div>
        </header>

        <div className="h-[calc(100vh-5rem)] min-h-[650px] p-4 sm:p-6 lg:p-8">
          <div className="flex h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
            {/* Conversations */}
            <section className="flex w-full flex-col border-r border-white/10 md:w-[340px] lg:w-[380px]">
              <div className="border-b border-white/10 p-5">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    placeholder="Search conversations..."
                    className="h-10 w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 text-sm outline-none placeholder:text-white/25 focus:border-cyan-400/30"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelected(conversation)}
                    className={`w-full border-b border-white/5 p-5 text-left transition ${
                      selected.id === conversation.id
                        ? "bg-cyan-400/[0.06]"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-violet-500/15 text-xs font-semibold text-cyan-300">
                        {conversation.initials}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">
                            {conversation.name}
                          </p>

                          <span className="shrink-0 text-[10px] text-white/25">
                            {conversation.time}
                          </span>
                        </div>

                        <p className="mt-1 text-[11px] text-cyan-300/50">
                          {conversation.campaign}
                        </p>

                        <div className="mt-1 flex items-center justify-between gap-2">
                          <p className="truncate text-xs text-white/35">
                            {conversation.lastMessage}
                          </p>

                          {conversation.unread > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1.5 text-[9px] font-bold text-black">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Chat */}
            <section className="hidden min-w-0 flex-1 flex-col md:flex">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-xs font-semibold text-cyan-300">
                    {selected.initials}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {selected.name}
                    </p>

                    <p className="mt-0.5 text-xs text-white/35">
                      {selected.role}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard/influencer/campaigns/novapay-market-launch"
                  className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/50 hover:bg-white/5 hover:text-white lg:flex"
                >
                  <BriefcaseBusiness size={14} />
                  Open campaign
                </Link>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto p-6">
                <div className="text-center">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-white/30">
                    Today
                  </span>
                </div>

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.mine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.mine
                          ? "rounded-br-md bg-cyan-400 text-black"
                          : "rounded-bl-md border border-white/10 bg-white/5 text-white"
                      }`}
                    >
                      <p className="text-sm leading-6">
                        {message.text}
                      </p>

                      <div
                        className={`mt-1 flex items-center justify-end gap-1 text-[9px] ${
                          message.mine
                            ? "text-black/50"
                            : "text-white/25"
                        }`}
                      >
                        <span>{message.time}</span>

                        {message.mine && (
                          <CheckCheck size={12} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 p-4">
                <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/20 p-2">
                  <button className="rounded-xl p-2 text-white/30 hover:bg-white/5 hover:text-white">
                    <Paperclip size={18} />
                  </button>

                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    rows={1}
                    placeholder="Write a message..."
                    className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-white/25"
                  />

                  <button
                    onClick={sendMessage}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-black transition hover:bg-cyan-300"
                  >
                    <Send size={16} />
                  </button>
                </div>

                <p className="mt-2 text-[10px] text-white/20">
                  Messages are part of the prototype. Production
                  messaging will be handled through the InfluxBridge
                  platform.
                </p>
              </div>
            </section>

            {/* Mobile placeholder */}
            <div className="flex flex-1 items-center justify-center p-6 text-center md:hidden">
              <div>
                <MessageSquare
                  size={32}
                  className="mx-auto text-cyan-300/50"
                />

                <p className="mt-4 text-sm font-medium">
                  Select a conversation
                </p>

                <p className="mt-2 text-xs text-white/35">
                  Open this page on a larger screen to use the full
                  messaging workspace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
        active
          ? "bg-cyan-400/10 text-cyan-300"
          : "text-white/45 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}