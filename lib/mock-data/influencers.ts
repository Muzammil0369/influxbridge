export type InfluencerStatus = "Pending Review" | "Approved" | "Rejected";
export type Influencer = {
  id: string;
  slug: string;
  name: string;
  handle: string;
  niche: string;
  location: string;
  followers: string;
  engagement: string;
  platforms: string[];
  status: InfluencerStatus;
  bio: string;
  matchScore: number;
};

export const influencers: Influencer[] = [
  {
    id: "ahmed-khan",
    slug: "ahmed-khan",
    name: "Ahmed Khan",
    handle: "@ahmedkhan",
    niche: "Fintech & Crypto",
    location: "Islamabad, Pakistan",
    followers: "420K",
    engagement: "5.8%",
    platforms: ["X", "YouTube", "Instagram"],
    status: "Approved",
    bio: "Finance and technology creator covering fintech, markets and digital products.",
    matchScore: 96,
  },
  {
    id: "sara-malik",
    slug: "sara-malik",
    name: "Sara Malik",
    handle: "@saramalik",
    niche: "Business & Finance",
    location: "Lahore, Pakistan",
    followers: "285K",
    engagement: "6.2%",
    platforms: ["Instagram", "TikTok"],
    status: "Approved",
    bio: "Business and finance educator creating accessible market and startup content.",
    matchScore: 91,
  },
  {
    id: "usman-raza",
    slug: "usman-raza",
    name: "Usman Raza",
    handle: "@usmantrades",
    niche: "Trading & Web3",
    location: "Karachi, Pakistan",
    followers: "190K",
    engagement: "7.1%",
    platforms: ["X", "YouTube"],
    status: "Pending Review",
    bio: "Trading and Web3 creator with a focus on educational market content.",
    matchScore: 88,
  },
  {
    id: "aisha-noor",
    slug: "aisha-noor",
    name: "Aisha Noor",
    handle: "@aishanoor",
    niche: "Tech & Startups",
    location: "Islamabad, Pakistan",
    followers: "155K",
    engagement: "4.9%",
    platforms: ["Instagram", "YouTube"],
    status: "Pending Review",
    bio: "Technology and startup creator focused on emerging products and founders.",
    matchScore: 84,
  },
];
