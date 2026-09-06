export type PlatformCategory =
  | "rideshare"
  | "delivery"
  | "medical-courier"
  | "nemt"
  | "government"
  | "ops-tools";

export type BusinessModel =
  | "rideshare-driver"
  | "delivery-gig"
  | "medical-courier"
  | "nemt-provider"
  | "gov-contractor";

export type CapitalLevel = "low" | "medium" | "high";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Platform {
  id: string;
  name: string;
  category: PlatformCategory;
  models: BusinessModel[];
  tagline: string;
  bestFor: string;
  capital: CapitalLevel;
  difficulty: Difficulty;
  payout: string;
  startupCost: string;
  applyUrl: string;
  website: string;
  regions: string[];
  pros: string[];
  cons: string[];
  applySteps: string[];
  beginnerPick?: boolean;
  localNote?: string;
}

export const CATEGORY_LABELS: Record<PlatformCategory, string> = {
  rideshare: "Rideshare",
  delivery: "Delivery & Logistics",
  "medical-courier": "Medical Courier",
  nemt: "NEMT / Patient Transport",
  government: "Government Contracts",
  "ops-tools": "Ops & Compliance Tools",
};

export const MODEL_LABELS: Record<BusinessModel, string> = {
  "rideshare-driver": "Rideshare Driver",
  "delivery-gig": "Delivery Gig",
  "medical-courier": "Medical Courier Business",
  "nemt-provider": "NEMT Provider",
  "gov-contractor": "Government Contractor",
};

export interface BusinessModelInfo {
  id: BusinessModel;
  name: string;
  summary: string;
  capital: CapitalLevel;
  effort: string;
  bestStarter: string[];
}

export const businessModels: BusinessModelInfo[] = [
  {
    id: "rideshare-driver",
    name: "Rideshare Driver",
    summary:
      "Drive passengers on Uber/Lyft across Gwinnett and Metro Atlanta. Lowest barrier — start this week with a qualifying car, insurance, and background check.",
    capital: "low",
    effort: "Flexible hours · app-based",
    bestStarter: ["uber", "lyft", "uber-comfort"],
  },
  {
    id: "delivery-gig",
    name: "Delivery Gig",
    summary:
      "Food, grocery, and package delivery. Strong around Lawrenceville retail corridors (Sugarloaf, Scenic Hwy, Mall of Georgia area) and Atlanta airport corridors.",
    capital: "low",
    effort: "Peak meal & evening hours",
    bestStarter: ["doordash", "uber-eats", "amazon-flex", "instacart"],
  },
  {
    id: "medical-courier",
    name: "Medical Courier Business",
    summary:
      "Same-day lab specimens, pharmacy, and cold-chain medical deliveries for clinics and labs in Gwinnett. Higher rates than food delivery; needs HIPAA training, chain-of-custody, and business insurance.",
    capital: "medium",
    effort: "Business setup · B2B sales",
    bestStarter: ["med-courier-own", "courier-networks", "hipaa-training"],
  },
  {
    id: "nemt-provider",
    name: "NEMT Provider",
    summary:
      "Non-emergency medical transportation for Georgia Medicaid members. Lawrenceville sits in the Atlanta region. Statewide broker is Verida (as of April 2026). Credentialing is capacity-gated — demand in your counties matters.",
    capital: "high",
    effort: "Licensing · inspections · training",
    bestStarter: ["verida-nemt", "ga-llc", "commercial-auto"],
  },
  {
    id: "gov-contractor",
    name: "Government Contractor",
    summary:
      "Bid on federal, State of Georgia, and Gwinnett County transport/courier work. Requires SAM.gov UEI, Team Georgia Marketplace, and local vendor registration — then respond to RFPs.",
    capital: "medium",
    effort: "Registrations · proposals · compliance",
    bestStarter: ["sam-gov", "team-georgia", "gwinnett-purchasing", "ga-procurement-registry"],
  },
];
