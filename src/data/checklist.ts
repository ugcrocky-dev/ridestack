export interface ChecklistItem {
  id: string;
  title: string;
  detail: string;
  phase: "setup" | "launch" | "grow";
}

export const checklist: ChecklistItem[] = [
  {
    id: "pick-lane",
    title: "Choose your primary lane",
    detail:
      "Rideshare, delivery gig, medical courier LLC, NEMT, or government contracting. Master one cash path before stacking complex credentialing.",
    phase: "setup",
  },
  {
    id: "vehicle-fit",
    title: "Confirm vehicle + insurance fit",
    detail:
      "Check Uber/Lyft year rules, or buy commercial auto if doing paid courier/NEMT. Personal policies often exclude business use.",
    phase: "setup",
  },
  {
    id: "legal-base",
    title: "Stand up Georgia legal basics",
    detail:
      "LLC (if building a company), EIN, business bank account, City of Lawrenceville / Gwinnett occupation tax as required.",
    phase: "setup",
  },
  {
    id: "apps-onboard",
    title: "Onboard 1–2 gig apps",
    detail:
      "Start Uber + Lyft or DoorDash + Uber Eats. Finish background checks and a clean vehicle photo set.",
    phase: "setup",
  },
  {
    id: "local-zones",
    title: "Map your Lawrenceville hot zones",
    detail:
      "Sugarloaf, Scenic Hwy, Downtown Lawrenceville, Mall of Georgia / Buford, ATL airport blocks — know when each pays.",
    phase: "launch",
  },
  {
    id: "track-earnings",
    title: "Track real hourly after expenses",
    detail:
      "Log miles, gas, tolls, maintenance, and platform fees for 7 days. Kill dead hours; double down on peaks.",
    phase: "launch",
  },
  {
    id: "hipaa-packet",
    title: "If medical: finish HIPAA packet",
    detail:
      "Training certificates, cooler kit, chain-of-custody SOP, and COIs ready before pitching clinics.",
    phase: "launch",
  },
  {
    id: "first-clinic",
    title: "Land first clinic or pharmacy pilot",
    detail:
      "Two-week SLA pilot on one route. Get a written rate and proof-of-delivery habit.",
    phase: "launch",
  },
  {
    id: "sam-tgm",
    title: "Register SAM.gov + Team Georgia + Gwinnett",
    detail:
      "UEI, TGM bidder profile with NIGP codes, and Gwinnett supplier registration. Free official portals only.",
    phase: "grow",
  },
  {
    id: "gpr-habit",
    title: "Build a weekly bid habit",
    detail:
      "Scan Georgia Procurement Registry + Gwinnett solicitations every week. Read two full RFPs even if you don’t bid yet.",
    phase: "grow",
  },
  {
    id: "verida-rfq",
    title: "If NEMT: submit Verida RFQ",
    detail:
      "RFQ + realistic driver/vehicle lists for Gwinnett/Atlanta counties. Only proceed when insurance and vans are ready.",
    phase: "grow",
  },
  {
    id: "past-performance",
    title: "Capture past performance",
    detail:
      "Save POs, on-time stats, and client emails. You’ll need them for county proposals and GSA later.",
    phase: "grow",
  },
];

export const starterStacks = [
  {
    id: "gig-cash",
    name: "Fast Cash — Multi-App Gig",
    budget: "$0–$300",
    path: [
      "Uber + Lyft onboarding",
      "DoorDash or Uber Eats for dead passenger hours",
      "Track net hourly for 7 days around Lawrenceville peaks",
    ],
    why: "Fastest path to cash while you decide whether to build a courier company.",
  },
  {
    id: "med-courier",
    name: "Medical Courier LLC",
    budget: "$2,000–$15,000",
    path: [
      "GA LLC + local occupation tax + commercial insurance",
      "HIPAA + cold-chain SOP kit",
      "Pilot 1–2 Gwinnett clinics/pharmacies, then SAM + Gwinnett vendor reg",
    ],
    why: "Higher B2B rates and a clean bridge into government courier bids.",
  },
  {
    id: "nemt-fleet",
    name: "NEMT via Verida",
    budget: "$16,000–$50,000+ per vehicle (typical range)",
    path: [
      "Commercial van + $1M-class insurance package",
      "Driver credentialing (MVR, background, drug screen, training)",
      "Verida RFQ → documents → inspection → orientation",
    ],
    why: "Recurring Medicaid trip volume if Verida needs capacity in your counties.",
  },
  {
    id: "gov-path",
    name: "Government Contracting Path",
    budget: "Mostly time + insurance readiness",
    path: [
      "SAM.gov UEI (free) + NAICS 492110 / 492210",
      "Team Georgia Marketplace + Gwinnett Purchasing supplier profile",
      "Weekly GPR search; bid smaller local messenger/courier scopes first",
    ],
    why: "Builds durable public-sector revenue from your Lawrenceville base.",
  },
];
