export type DeliverableStatus =
  | "NOT_STARTED"
  | "DRAFT_SUBMITTED"
  | "IN_REVIEW"
  | "REVISION_REQUESTED"
  | "APPROVED"
  | "PUBLISHED"
  | "COMPLETED";

export const deliverableTransitions: Record<DeliverableStatus, DeliverableStatus[]> = {
  NOT_STARTED: ["DRAFT_SUBMITTED"],
  DRAFT_SUBMITTED: ["IN_REVIEW"],
  IN_REVIEW: ["REVISION_REQUESTED", "APPROVED"],
  REVISION_REQUESTED: ["DRAFT_SUBMITTED"],
  APPROVED: ["PUBLISHED"],
  PUBLISHED: ["COMPLETED"],
  COMPLETED: [],
};

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Negotiation"
  | "Converted"
  | "Rejected";

export const leadTransitions: Record<LeadStatus, LeadStatus[]> = {
  New: ["Contacted", "Rejected"],
  Contacted: ["Qualified", "Rejected"],
  Qualified: ["Proposal Sent", "Rejected"],
  "Proposal Sent": ["Negotiation", "Converted", "Rejected"],
  Negotiation: ["Converted", "Rejected"],
  Converted: [],
  Rejected: [],
};

export type CampaignPhase =
  | "BRIEF"
  | "CREATOR_ASSIGNMENT"
  | "DELIVERABLES"
  | "REVIEW"
  | "PUBLICATION"
  | "PERFORMANCE"
  | "PAYMENT"
  | "COMPLETED";

export const campaignPhaseOrder: CampaignPhase[] = [
  "BRIEF",
  "CREATOR_ASSIGNMENT",
  "DELIVERABLES",
  "REVIEW",
  "PUBLICATION",
  "PERFORMANCE",
  "PAYMENT",
  "COMPLETED",
];

export function canTransition<T extends string>(
  transitions: Record<T, T[]>,
  from: T,
  to: T
) {
  return transitions[from]?.includes(to) ?? false;
}

export function nextCampaignPhase(phase: CampaignPhase): CampaignPhase {
  const index = campaignPhaseOrder.indexOf(phase);
  return campaignPhaseOrder[Math.min(index + 1, campaignPhaseOrder.length - 1)];
}
