export type MessageSender = "company" | "influxbridge" | "influencer";

export type Message = {
  id: string;
  conversationId: string;
  sender: MessageSender;
  senderName: string;
  body: string;
  timestamp: string;
  read: boolean;
};

export type Conversation = {
  id: string;
  campaignId: string;
  title: string;
  participants: string[];
  unread: number;
  lastMessage: string;
  updatedAt: string;
};

export const conversations: Conversation[] = [
  {
    id: "conv-novapay-launch",
    campaignId: "novapay-market-launch",
    title: "NovaPay · Pakistan Market Launch",
    participants: ["NovaPay", "InfluxBridge Campaign Team"],
    unread: 2,
    lastMessage: "The revised creator brief is ready for review.",
    updatedAt: "10 min ago",
  },
  {
    id: "conv-vaultx-awareness",
    campaignId: "vaultx-awareness",
    title: "VaultX · Digital Asset Awareness",
    participants: ["VaultX", "InfluxBridge Campaign Team"],
    unread: 0,
    lastMessage: "Five creator submissions are now in review.",
    updatedAt: "Yesterday",
  },
];

export const messages: Message[] = [
  {
    id: "msg-001",
    conversationId: "conv-novapay-launch",
    sender: "influxbridge",
    senderName: "InfluxBridge",
    body: "The revised creator brief is ready for review.",
    timestamp: "10:14",
    read: true,
  },
  {
    id: "msg-002",
    conversationId: "conv-novapay-launch",
    sender: "company",
    senderName: "NovaPay",
    body: "Thanks. We will review the updated direction today.",
    timestamp: "10:21",
    read: false,
  },
];
