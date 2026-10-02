export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Negotiation"
  | "Converted"
  | "Rejected";

export type Lead = {
  id: string;
  company: string;
  contact: string;
  email: string;
  request: string;
  budget: number;
  timeline: string;
  status: LeadStatus;
  source: "Website" | "Referral" | "Partner";
  received: string;
};

export const leads: Lead[] = [
  {
    id: "lead-novapay-001",
    company: "NovaPay",
    contact: "NovaPay Partnerships",
    email: "partnerships@novapay.example",
    request: "Pakistan market launch",
    budget: 18500,
    timeline: "Q4 2026",
    status: "Qualified",
    source: "Website",
    received: "Today",
  },
  {
    id: "lead-vaultx-002",
    company: "VaultX",
    contact: "Growth Team",
    email: "growth@vaultx.example",
    request: "Creator awareness campaign",
    budget: 12000,
    timeline: "October 2026",
    status: "Proposal Sent",
    source: "Referral",
    received: "Yesterday",
  },
  {
    id: "lead-finora-003",
    company: "Finora",
    contact: "Marketing Team",
    email: "marketing@finora.example",
    request: "Fintech creator series",
    budget: 9800,
    timeline: "September 2026",
    status: "Converted",
    source: "Partner",
    received: "Sep 05",
  },
];
