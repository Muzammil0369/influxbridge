export type Company = {
  id: string;
  name: string;
  industry: string;
  country: string;
  accountStatus: "Active" | "Prospect" | "Onboarding";
  contactName: string;
  email: string;
};

export const companies: Company[] = [
  {
    id: "novapay",
    name: "NovaPay",
    industry: "Fintech",
    country: "International",
    accountStatus: "Active",
    contactName: "NovaPay Partnerships",
    email: "partnerships@novapay.example",
  },
  {
    id: "vaultx",
    name: "VaultX",
    industry: "Web3",
    country: "International",
    accountStatus: "Active",
    contactName: "VaultX Growth",
    email: "growth@vaultx.example",
  },
  {
    id: "finora",
    name: "Finora",
    industry: "Fintech",
    country: "International",
    accountStatus: "Active",
    contactName: "Finora Marketing",
    email: "marketing@finora.example",
  },
];
