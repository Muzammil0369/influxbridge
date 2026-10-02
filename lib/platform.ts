"use client";

import { leads as seedLeads, type Lead, type LeadStatus } from "./mock-data/leads";
import { influencers as seedInfluencers, type Influencer, type InfluencerStatus } from "./mock-data/influencers";
import { campaigns as seedCampaigns, type Campaign, type CampaignPhase } from "./mock-data/campaigns";
import { conversations as seedConversations, messages as seedMessages, type Conversation, type Message } from "./mock-data/messages";
import { canTransition, leadTransitions, nextCampaignPhase } from "./workflow";
import { readStore, storeKeys, writeStore } from "./mock-store";

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getLeads(): Lead[] {
  return readStore(storeKeys.leads, seedLeads);
}

export function saveLeads(value: Lead[]) {
  writeStore(storeKeys.leads, value);
}

export function transitionLead(id: string, status: LeadStatus) {
  const current = getLeads();
  const index = current.findIndex((lead) => lead.id === id);
  if (index < 0) throw new Error("Lead not found");

  const from = current[index].status;
  if (!canTransition(leadTransitions, from, status)) {
    throw new Error(`Invalid lead transition: ${from} → ${status}`);
  }

  const updated = [...current];
  updated[index] = { ...updated[index], status };
  saveLeads(updated);
  return updated[index];
}

export function getInfluencers(): Influencer[] {
  return readStore(storeKeys.influencers, seedInfluencers);
}

export function saveInfluencers(value: Influencer[]) {
  writeStore(storeKeys.influencers, value);
}

export function reviewInfluencer(id: string, status: Exclude<InfluencerStatus, "Pending Review">) {
  const current = getInfluencers();
  const index = current.findIndex((creator) => creator.id === id);
  if (index < 0) throw new Error("Influencer not found");

  const updated = [...current];
  updated[index] = { ...updated[index], status };
  saveInfluencers(updated);
  return updated[index];
}

export function getCampaigns(): Campaign[] {
  return readStore(storeKeys.campaigns, seedCampaigns);
}

export function saveCampaigns(value: Campaign[]) {
  writeStore(storeKeys.campaigns, value);
}

export function advanceCampaign(id: string) {
  const current = getCampaigns();
  const index = current.findIndex((campaign) => campaign.id === id);
  if (index < 0) throw new Error("Campaign not found");

  const updated = [...current];
  const phase = nextCampaignPhase(updated[index].phase);
  updated[index] = {
    ...updated[index],
    phase,
    progress: Math.min(100, Math.max(updated[index].progress, Math.round(
      (["BRIEF", "CREATOR_ASSIGNMENT", "DELIVERABLES", "REVIEW", "PUBLICATION", "PERFORMANCE", "PAYMENT", "COMPLETED"].indexOf(phase) + 1) * 12.5
    ))),
    status: phase === "COMPLETED" ? "Completed" : phase === "REVIEW" ? "In Review" : "Active",
  };
  saveCampaigns(updated);
  return updated[index];
}

export function getConversations(): Conversation[] {
  return seedConversations;
}

export function getMessages(): Message[] {
  return readStore(storeKeys.messages, seedMessages);
}

export function saveMessages(value: Message[]) {
  writeStore(storeKeys.messages, value);
}

export function sendMessage(
  conversationId: string,
  sender: Message["sender"],
  senderName: string,
  body: string
) {
  const trimmed = body.trim();
  if (!trimmed) throw new Error("Message cannot be empty");

  const message: Message = {
    id: uid("msg"),
    conversationId,
    sender,
    senderName,
    body: trimmed,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    read: true,
  };

  const next = [...getMessages(), message];
  saveMessages(next);
  return message;
}
