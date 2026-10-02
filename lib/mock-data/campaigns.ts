export type CampaignStatus = "Active" | "In Review" | "Completed";
export type CampaignPhase =
  | "BRIEF"
  | "CREATOR_ASSIGNMENT"
  | "DELIVERABLES"
  | "REVIEW"
  | "PUBLICATION"
  | "PERFORMANCE"
  | "PAYMENT"
  | "COMPLETED";

export type Campaign = {
  id: string;
  name: string;
  client: string;
  category: string;
  status: CampaignStatus;
  phase: CampaignPhase;
  progress: number;
  budget: number;
  reach: string;
  creators: number;
  deadline: string;
  description: string;
  manager: string;
};

export const campaigns: Campaign[] = [
  {
    id: "novapay-market-launch",
    name: "Pakistan Market Launch",
    client: "NovaPay",
    category: "Fintech",
    status: "Active",
    phase: "DELIVERABLES",
    progress: 68,
    budget: 12500,
    reach: "4.8M",
    creators: 8,
    deadline: "2026-10-18",
    description: "Creator-led awareness campaign supporting NovaPay's Pakistan market entry.",
    manager: "InfluxBridge Campaign Team",
  },
  {
    id: "vaultx-awareness",
    name: "Digital Asset Awareness",
    client: "VaultX",
    category: "Web3",
    status: "In Review",
    phase: "REVIEW",
    progress: 91,
    budget: 7800,
    reach: "2.1M",
    creators: 5,
    deadline: "2026-10-09",
    description: "Educational creator campaign focused on responsible digital asset awareness.",
    manager: "InfluxBridge Campaign Team",
  },
  {
    id: "finora-creator-series",
    name: "Creator Launch Series",
    client: "Finora",
    category: "Fintech",
    status: "Completed",
    phase: "COMPLETED",
    progress: 100,
    budget: 9200,
    reach: "3.4M",
    creators: 6,
    deadline: "2026-09-21",
    description: "Multi-creator launch series introducing Finora to a Pakistani audience.",
    manager: "InfluxBridge Campaign Team",
  },
];
