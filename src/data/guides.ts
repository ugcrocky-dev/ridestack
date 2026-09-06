export interface GuideStep {
  title: string;
  detail: string;
  links?: { label: string; href: string }[];
}

export interface ApplyGuide {
  id: string;
  title: string;
  subtitle: string;
  whoFor: string;
  timeline: string;
  capital: string;
  naics: string[];
  docs: string[];
  steps: GuideStep[];
  localAngles: string[];
  pitfalls: string[];
}

export const applyGuides: ApplyGuide[] = [
  {
    id: "medical-courier",
    title: "Medical Courier — How to Apply & Launch from Lawrenceville",
    subtitle:
      "Build a HIPAA-ready same-day courier for labs, pharmacies, and clinics across Gwinnett — then layer government bids.",
    whoFor:
      "Drivers or small business owners who want higher-value B2B routes than food delivery, serving Northside Gwinnett, Piedmont Eastside, draw stations, dialysis, and specialty pharmacies.",
    timeline: "2–8 weeks to legal/insurance readiness; 1–3 months to first recurring clinic accounts",
    capital: "Typically $2k–$15k to start lean (LLC, insurance deposit, coolers, branding, bonding)",
    naics: ["492110 Couriers and Express Delivery Services", "492210 Local Messengers and Local Delivery"],
    docs: [
      "Georgia LLC Articles + EIN letter",
      "Gwinnett and/or City of Lawrenceville occupation tax certificate",
      "Commercial auto declarations + General Liability COI",
      "HIPAA training certificates for every driver",
      "Written SOPs: chain-of-custody, temperature control, incident/breach",
      "Driver MVR, background check, and drug screen results",
      "W-9 and voided check / ACH form for client AP",
      "Capability one-pager (service area map: Lawrenceville → Gwinnett → Metro Atlanta)",
    ],
    steps: [
      {
        title: "1. Decide your service niche",
        detail:
          "Pick one primary lane first: (A) lab specimen STAT/same-day, (B) pharmacy & compounded meds, (C) medical equipment/supplies, or (D) multi-stop clinic routes. Specimens need stricter chain-of-custody and often validated coolers; pharmacy may need temperature logging and signature protocols. Don’t market “we do everything” on day one.",
      },
      {
        title: "2. Form the company in Georgia",
        detail:
          "File an LLC at the Georgia Secretary of State eCorp portal (~$100). Get a free EIN from IRS. Open a dedicated business bank account. Register for state tax accounts with the Georgia Department of Revenue if you’ll have employees or taxable services. This packet is what clinics and counties expect.",
        links: [
          { label: "GA eCorp", href: "https://ecorp.sos.ga.gov/" },
          { label: "IRS EIN", href: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" },
        ],
      },
      {
        title: "3. Get local permission to operate",
        detail:
          "Apply for the City of Lawrenceville and/or Gwinnett County occupation tax certificate based on your business address. Keep the certificate PDF in your vendor folder — hospital credentialing and county purchasing both ask for it.",
        links: [
          { label: "City of Lawrenceville", href: "https://www.lawrencevillega.org/" },
          { label: "Gwinnett County", href: "https://www.gwinnettcounty.com/" },
        ],
      },
      {
        title: "4. Buy the right insurance (before pitching)",
        detail:
          "Personal auto policies usually exclude business courier use. Get commercial auto (often targeting $1M CSL) and general liability (often $1M/$2M). Ask about cargo, professional liability, and cyber/HIPAA considerations. Request blank Certificate of Insurance forms so you can name clinics as additional insured quickly.",
      },
      {
        title: "5. Complete HIPAA + build SOPs",
        detail:
          "Complete HIPAA Awareness training for business associates. Write one-page SOPs covering: sealed bag transfers, barcode/manifest matching, temperature ranges, late/missed pickup escalation, and PHI incident reporting. Buy cooler bags, ice packs, and at least one data-logging thermometer if you touch cold chain.",
        links: [
          { label: "HHS HIPAA for professionals", href: "https://www.hhs.gov/hipaa/for-professionals/index.html" },
        ],
      },
      {
        title: "6. Optional: run under a network first",
        detail:
          "Apply as a 1099 medical courier for existing Atlanta/Gwinnett networks (search Indeed/LinkedIn for “medical courier”, “STAT courier”, “lab courier”). You’ll learn hospital docks, lab cutoffs, and rejection reasons before you sell your own accounts.",
      },
      {
        title: "7. Build a one-page capability sheet",
        detail:
          "Include: legal name, UEI (if you have SAM), NAICS 492110/492210, service hours (include STAT), coverage map (Lawrenceville HQ, Gwinnett + Metro Atlanta), insurance limits, HIPAA statement, and two references once you have them. This is what office managers actually forward to procurement.",
      },
      {
        title: "8. Sell locally (this is the real application)",
        detail:
          "Target: independent labs, compounding pharmacies, urgent cares, dental oral-surgery offices, specialty practices, and veterinary specialty hospitals. Ask for the practice manager / lab director. Offer a 2-week pilot on 1–2 lanes with clear SLAs (pickup window, POD photo/signature, temp log). Price per stop + wait time, or monthly route retainers.",
      },
      {
        title: "9. Register for public-sector upside",
        detail:
          "Once private clinics pay the bills, register SAM.gov (UEI), Team Georgia Marketplace, Gwinnett Purchasing, and watch GPR for courier/messenger bids. Hospital systems and counties often require the same compliance packet you already built.",
        links: [
          { label: "SAM.gov", href: "https://sam.gov/" },
          { label: "Gwinnett Purchasing", href: "https://www.gwinnettcounty.com/departments/financialservices/purchasing" },
        ],
      },
    ],
    localAngles: [
      "Base near Lawrenceville to cover I-85, GA-316, and Sugarloaf without burning empty miles.",
      "Northside Hospital Gwinnett and surrounding medical offices create recurring specimen loops.",
      "Pair weekday clinic routes with after-hours pharmacy runs.",
      "Use rideshare evenings only as filler cash — don’t mix passenger rideshare branding with medical client trust.",
    ],
    pitfalls: [
      "Using a personal Progressive/Geico policy for paid courier work (claim denial risk).",
      "No chain-of-custody forms — clinics will fire you after one lost specimen.",
      "Promising statewide coverage with one car (looks unserious to Verida and hospitals).",
      "Paying scam “SAM registration” websites — official SAM.gov registration is free.",
    ],
  },
  {
    id: "government-contracts",
    title: "Government Contracts — How to Apply (Federal · Georgia · Gwinnett)",
    subtitle:
      "A practical registration-to-first-bid path for courier, messenger, and medical transport companies based in Lawrenceville, GA.",
    whoFor:
      "LLC owners offering courier, local delivery, patient transport support, or logistics who want recurring public-sector revenue — including Gwinnett County work headquartered in Lawrenceville.",
    timeline: "1–3 weeks for registrations; 30–90+ days to first competitive award (longer for GSA)",
    capital: "Mostly time + insurance + proposal effort; bonding may be required on larger bids",
    naics: [
      "492110 Couriers and Express Delivery Services",
      "492210 Local Messengers and Local Delivery",
      "485991 Special Needs Transportation (if NEMT)",
      "485999 All Other Transit and Ground Passenger Transportation",
    ],
    docs: [
      "Active SAM.gov registration + Unique Entity ID (UEI)",
      "Georgia SOS entity good standing",
      "W-9 and banking/ACH forms",
      "Commercial insurance certificates at required limits",
      "Capability statement (NAICS, NAICS size, service area, past performance)",
      "Team Georgia Marketplace / bidder profile with NIGP codes",
      "Gwinnett County supplier registration",
      "Any SBA certifications (optional but powerful)",
    ],
    steps: [
      {
        title: "1. Get your Unique Entity ID on SAM.gov (federal gate)",
        detail:
          "Create a Login.gov account, then register your entity at sam.gov. Match your legal name and TIN exactly to IRS records. Select courier/transport NAICS codes. Complete all reps & certs. There is no fee on the official site. Save your 12-character UEI — Gwinnett RFPs that use federal funds often require proof of active SAM status with the proposal.",
        links: [{ label: "SAM.gov", href: "https://sam.gov/" }],
      },
      {
        title: "2. Register in Team Georgia Marketplace (state gate)",
        detail:
          "State agencies buy through Team Georgia Marketplace (TGM). If you’ve never sold to the State of Georgia, register as a sourcing bidder. Add NIGP commodity codes for courier, messenger, transportation, and related services so you receive email bid notices.",
        links: [
          {
            label: "DOAS supplier registration",
            href: "https://doas.ga.gov/state-purchasing/supplier-registration-bid-notices",
          },
          {
            label: "Getting started as a supplier",
            href: "https://doas.ga.gov/state-purchasing/getting-started-supplier",
          },
        ],
      },
      {
        title: "3. Register with Gwinnett County Purchasing (local gate)",
        detail:
          "Create / update your supplier profile with Gwinnett County Financial Services — Purchasing Division (GJAC, 2nd Floor, 75 Langley Drive, Lawrenceville, GA 30046). Keep emails current — most notices go out electronically. Review the County’s Business Opportunities Manual for how bids are advertised (website, GPR, Gwinnett Daily Post for larger solicitations, Solicitation Center).",
        links: [
          {
            label: "Gwinnett Purchasing",
            href: "https://www.gwinnettcounty.com/departments/financialservices/purchasing",
          },
        ],
      },
      {
        title: "4. Watch the Georgia Procurement Registry every week",
        detail:
          "Don’t rely only on emails. Search GPR for courier, transportation, NEMT, messenger, logistics, and human-services transport. Read entire solicitations: mandatory forms, insurance exhibits, UEI requirements, and whether consumer rideshare is prohibited for passenger work.",
        links: [
          {
            label: "Georgia Procurement Registry",
            href: "https://ssl.doas.state.ga.us/PRSapp/PR_index.jsp",
          },
        ],
      },
      {
        title: "5. Optional: SBA certifications for set-asides",
        detail:
          "If you qualify, pursue WOSB, SDVOSB, HUBZone, or 8(a) through SBA. Set-asides reduce competition. Even without them, keep a sharp capability statement and past-performance blurbs.",
        links: [
          {
            label: "SBA contracting assistance",
            href: "https://www.sba.gov/federal-contracting/contracting-assistance-programs",
          },
        ],
      },
      {
        title: "6. Optional later: GSA Multiple Award Schedule",
        detail:
          "GSA MAS is a multi-year catalog contract. Agencies can order without a brand-new full competition. Worth it after you have past performance — heavy for a brand-new one-car LLC. Start with county/state awards first.",
        links: [
          {
            label: "GSA Multiple Award Schedule",
            href: "https://www.gsa.gov/buy-through-us/purchasing-programs/multiple-award-schedule",
          },
        ],
      },
      {
        title: "7. Bid like a pro (submission discipline)",
        detail:
          "Follow page limits, sealed-envelope rules, original + copy counts, and separate cost proposal envelopes when required. Include UEI/SAM proof when asked. Late = non-responsive. After award, return signed contracts and COIs fast so Purchasing can issue a PO.",
      },
      {
        title: "8. Parallel path: Georgia Medicaid NEMT via Verida",
        detail:
          "Passenger medical transport for Medicaid is brokered statewide by Verida (all five DCH regions as of April 1, 2026). That is a separate “apply” track from county courier RFPs: RFQ + driver/vehicle lists → documents → inspections/training → owner orientation → contract. Network need in your counties controls whether they advance you.",
        links: [
          { label: "Verida Georgia providers", href: "https://verida.com/georgia-providers/" },
          { label: "Verida interested providers", href: "https://verida.com/interested-providers/" },
          {
            label: "Georgia Medicaid NEMT overview",
            href: "https://medicaid.georgia.gov/programs/all-programs/non-emergency-medical-transportation",
          },
        ],
      },
    ],
    localAngles: [
      "You live where Gwinnett Purchasing is located — attend pre-bid conferences in person when offered.",
      "Start with smaller city/county messenger or courier scopes to build past performance.",
      "Pair private medical courier revenue with public bids so cash flow isn’t bid-dependent.",
      "For passenger contracts, plan a dedicated NEMT fleet — consumer Uber/Lyft is often explicitly disallowed.",
    ],
    pitfalls: [
      "Missing SAM UEI on a federally funded county proposal → non-responsive.",
      "Wrong or empty NIGP codes → you never see the email notices.",
      "Stale supplier email after you change phones → zero bid alerts.",
      "Paying “expedite SAM” scams — use sam.gov only.",
      "Submitting rideshare-driver resumes for wheelchair NEMT scopes without WAV equipment or training.",
    ],
  },
  {
    id: "nemt-verida",
    title: "NEMT Provider — Verida Credentialing Checklist (Georgia)",
    subtitle:
      "Step-by-step apply path for Non-Emergency Medical Transportation under Georgia’s statewide broker.",
    whoFor:
      "Fleet owners (ambulatory and/or wheelchair) who can insure, inspect, and staff vehicles for Medicaid member trips in the Atlanta / Gwinnett area.",
    timeline: "Often 30–60 days after Verida confirms network need — longer if documents bounce",
    capital: "Commonly mid–five figures per vehicle when counting van, insurance, and downtime",
    naics: ["485991 Special Needs Transportation", "485999 Other Ground Passenger Transportation"],
    docs: [
      "Current business license / occupation tax certificate",
      "Liability insurance (confirm exact limits with Atlanta Provider Relations)",
      "Driver credentials / licenses",
      "Criminal background checks for all drivers",
      "Current drug screens for owners and drivers",
      "Current MVR for all drivers",
      "Driver list + vehicle list matched to a realistic service area",
    ],
    steps: [
      {
        title: "1. Confirm you want brokered Medicaid work",
        detail:
          "NEMT pays per completed trip under broker rules — not Uber-style surge. Expect credentialing, GPS/tablets, on-time standards, and denial risk if paperwork slips. If you only want flexible gig cash, stay on rideshare/delivery.",
      },
      {
        title: "2. Stand up the business & insurance first",
        detail:
          "LLC, EIN, local licenses, commercial auto + GL. Verida’s published overview commonly references strong carrier ratings, correct named insured, vehicle lists on the auto policy, GL around $1M/$2M, and auto liability covering owned/hired/non-owned — confirm current numbers with your Provider Relations Manager before buying the wrong policy.",
      },
      {
        title: "3. Submit RFQ + driver list + vehicle list",
        detail:
          "Complete Verida’s Request for Qualifications and attach realistic driver and vehicle lists focused on counties you can actually cover (e.g., Gwinnett, adjacent Atlanta-region counties). Overclaiming “statewide” with two cars is a common reject signal.",
        links: [
          { label: "Georgia providers page", href: "https://verida.com/georgia-providers/" },
          { label: "Interested providers process", href: "https://verida.com/interested-providers/" },
        ],
      },
      {
        title: "4. Wait for network-need screening",
        detail:
          "Verida reviews whether it needs capacity where you operate. If yes, they contact you for an interview and Step 2 documents. If not, the file may sit — geography and timing matter more than perfect PDFs at this stage.",
      },
      {
        title: "5. Pass documents, inspections, and training",
        detail:
          "Provide license, insurance, backgrounds, drug screens, MVRs. Every proposed vehicle must pass Verida’s safety inspection. Drivers complete required Verida training modules. Keep an audit-ready binder.",
      },
      {
        title: "6. Owner orientation & contract",
        detail:
          "After vehicles and drivers clear, the owner attends NEMT provider orientation covering operational rules. The provider contract is typically signed at the end of orientation. Then you receive trips through the broker systems.",
      },
    ],
    localAngles: [
      "Lawrenceville is inside the Atlanta DCH region — name Gwinnett and adjacent counties you can staff daily.",
      "Wheelchair-accessible capacity is often scarcer than ambulatory — WAV gear can improve need fit.",
      "Atlanta Provider Relations Manager is listed on Verida’s Georgia providers page (verify current name/contact there).",
    ],
    pitfalls: [
      "Applying before insurance and vehicle readiness — you stall in Step 2.",
      "Drivers with recent DUI / dirty MVR.",
      "Mixing Uber passenger work and NEMT branding on the same unmarked personal car without broker approval.",
      "Ignoring that Modivcare’s prior regional role ended for remaining regions on April 1, 2026 — apply through Verida for Georgia Medicaid NEMT.",
    ],
  },
];
