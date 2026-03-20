import type { Idea } from "@/lib/ideas-data";

export type PolicyTag =
  | "AI_SYNTHETIC"
  | "HEALTH_MEDICAL"
  | "KIDS_AGE"
  | "UGC_SOCIAL"
  | "SENSITIVE_DATA"
  | "PAYMENTS_SUBS"
  | "REGULATED_FIN_ID"
  | "IP_LICENSING"
  | "SAFETY_LOCATION_ACCURACY";

export type PolicyRisk = "low" | "review" | "high";

export type PolicyGuide = {
  tag: PolicyTag;
  label: string;
  shortLabel: string;
  summary: string;
  docs: string[];
  adjustments: string[];
};

export type PolicyProfile = {
  tags: PolicyTag[];
  risk: PolicyRisk;
  summary: string;
  notes: string[];
};

type PolicyOverride = {
  tags?: PolicyTag[];
  risk?: PolicyRisk;
  summary?: string;
  notes?: string[];
};

const POLICY_ORDER: PolicyTag[] = [
  "HEALTH_MEDICAL",
  "REGULATED_FIN_ID",
  "SAFETY_LOCATION_ACCURACY",
  "AI_SYNTHETIC",
  "KIDS_AGE",
  "SENSITIVE_DATA",
  "UGC_SOCIAL",
  "IP_LICENSING",
  "PAYMENTS_SUBS",
];

export const POLICY_GUIDES: PolicyGuide[] = [
  {
    tag: "AI_SYNTHETIC",
    label: "AI and Synthetic Media",
    shortLabel: "AI / Synthetic",
    summary:
      "Covers third-party AI providers, generated output labeling, voice cloning, and consent before user data leaves the device.",
    docs: [
      "APPLE_APP_STORE_POLICIES_2026.md - AI disclosures and consent",
      "GOOGLE_PLAY_POLICIES_2026.md - AI labeling and traceability",
      "APP-STORE-POLICY-FUTURE-TRENDS-2026.md - EU AI Act labeling",
    ],
    adjustments: [
      "Name the AI provider in-app and in the privacy policy.",
      "Ask for explicit consent before sending photos, text, audio, or video to AI services.",
      "Label AI-generated results and avoid certainty claims in metadata.",
      "Add abuse controls for cloning, impersonation, or deceptive media output.",
    ],
  },
  {
    tag: "HEALTH_MEDICAL",
    label: "Health and Medical Claims",
    shortLabel: "Health / Medical",
    summary:
      "Applies to diagnosis-like flows, emergency guidance, dosage math, symptom interpretation, and wellness claims that can be mistaken for medical advice.",
    docs: [
      "APP_STORE_POLICY_COMPARISON_2026.md - Health / Medical Apps",
      "APPLE_APP_STORE_POLICIES_2026.md - accuracy and safety claims",
      "APP_STORE_PUBLISHING_BEST_PRACTICES.md - medical claim rejection risks",
    ],
    adjustments: [
      "Use informational language instead of diagnostic language.",
      "Add clear 'not medical advice' and 'not for emergencies' copy where relevant.",
      "Cite official or clinical sources for formulas, ranges, and recommendations.",
      "Escalate to a clinician or emergency services when the outcome could affect safety.",
    ],
  },
  {
    tag: "KIDS_AGE",
    label: "Kids, Minors, and Age Gating",
    shortLabel: "Kids / Age",
    summary:
      "For child-directed products, mixed-audience experiences, mature content, drinking themes, and flows that need parental gating or age checks.",
    docs: [
      "APPLE_APP_STORE_POLICIES_2026.md - kids category and age ratings",
      "GOOGLE_PLAY_POLICIES_2026.md - families and age assurance",
      "APP_STORE_PUBLISHING_BEST_PRACTICES.md - COPPA and family app compliance",
    ],
    adjustments: [
      "Declare the intended audience and set age ratings from the harshest content path.",
      "Use parental gates for external links or account-style features in kid-directed apps.",
      "Add hard age-gating for mature, dating, or drinking-adjacent modes.",
      "Disable non-essential tracking and ads for child-directed experiences.",
    ],
  },
  {
    tag: "UGC_SOCIAL",
    label: "UGC and Sharing",
    shortLabel: "UGC / Sharing",
    summary:
      "Relevant when users can create, upload, share, or distribute content, even if the feature starts as a simple link share.",
    docs: [
      "APPLE_APP_STORE_POLICIES_2026.md - user-generated content moderation",
      "GOOGLE_PLAY_POLICIES_2026.md - harmful content and reporting expectations",
      "APP_STORE_PUBLISHING_BEST_PRACTICES.md - moderation controls before launch",
    ],
    adjustments: [
      "Add reporting, blocking, filtering, and moderation contact paths before launch.",
      "Publish terms of service and community rules if users can share publicly.",
      "Answer age-rating questionnaires using the most extreme content users can create or encounter.",
      "Avoid advertising social features in store copy unless moderation tooling exists.",
    ],
  },
  {
    tag: "SENSITIVE_DATA",
    label: "Sensitive Data and Permissions",
    shortLabel: "Sensitive Data",
    summary:
      "Covers camera, microphone, location, government IDs, journals, health records, and other high-sensitivity inputs.",
    docs: [
      "APPLE_APP_STORE_POLICIES_2026.md - privacy labels and required reason APIs",
      "GOOGLE_PLAY_POLICIES_2026.md - Data Safety and permission declarations",
      "APP_STORE_PUBLISHING_BEST_PRACTICES.md - contextual permissions and retention",
    ],
    adjustments: [
      "List sensitive inputs up front and request permissions only when the feature is used.",
      "Prefer on-device processing and state it clearly when true.",
      "Map store privacy declarations before adding SDKs or analytics.",
      "Document retention, deletion, and export options for stored user data.",
    ],
  },
  {
    tag: "PAYMENTS_SUBS",
    label: "Subscriptions and Billing",
    shortLabel: "Payments",
    summary:
      "For digital unlocks, free trials, recurring subscriptions, IAP rules, and the disclosure requirements around paywalls.",
    docs: [
      "APP_STORE_POLICY_COMPARISON_2026.md - payments and commission rules",
      "APPLE_APP_STORE_POLICIES_2026.md - StoreKit and paywall requirements",
      "APP_STORE_PUBLISHING_BEST_PRACTICES.md - paywall disclosure checklist",
    ],
    adjustments: [
      "Use platform billing for digital unlocks unless a documented exception applies.",
      "Show price, billing period, renewal cadence, trial length, and cancellation language on the paywall.",
      "Keep Restore Purchases easy to find.",
      "Treat US external billing rules as a special case, not the default path.",
    ],
  },
  {
    tag: "REGULATED_FIN_ID",
    label: "Finance, Identity, and Regulated Workflows",
    shortLabel: "Regulated",
    summary:
      "Flags ideas that touch trading, checks, government IDs, medication records, or controlled and regulated operations.",
    docs: [
      "APP_STORE_POLICY_COMPARISON_2026.md - Fintech / Crypto Apps",
      "GOOGLE_PLAY_POLICIES_2026.md - financial features declarations",
      "APPLE_APP_STORE_POLICIES_2026.md - legal, financial, and identity handling",
    ],
    adjustments: [
      "Position the app as recordkeeping or reference unless you hold the required licenses.",
      "Avoid unsupported legal, identity, or financial advice claims.",
      "Add extra handling rules for stored IDs, financial records, or controlled substance logs.",
      "Route these ideas through manual compliance review before launch.",
    ],
  },
  {
    tag: "IP_LICENSING",
    label: "Copyright, Trademarks, and Data Licensing",
    shortLabel: "IP / Licensing",
    summary:
      "For bundled media, public-domain libraries, catalog/value datasets, logo generation, fonts, and trademark-sensitive naming.",
    docs: [
      "APPLE_APP_STORE_POLICIES_2026.md - IP infringement rules",
      "GOOGLE_PLAY_POLICIES_2026.md - impersonation and copyright",
      "APP_STORE_PUBLISHING_BEST_PRACTICES.md - metadata and keyword restrictions",
    ],
    adjustments: [
      "Confirm rights for media, datasets, sheet music, audio loops, and training data.",
      "Avoid competitor or trademark terms in keyword fields unless authorized.",
      "Document the license source for public-domain or purchased assets.",
      "Do not imply affiliation with brands, catalogs, or rights holders without proof.",
    ],
  },
  {
    tag: "SAFETY_LOCATION_ACCURACY",
    label: "Safety, Legality, and Accuracy",
    shortLabel: "Safety / Accuracy",
    summary:
      "Relevant when the app implies exact safety, legal, emergency, or location-based compliance outcomes.",
    docs: [
      "APP_STORE_POLICY_COMPARISON_2026.md - safety-sensitive app types",
      "APPLE_APP_STORE_POLICIES_2026.md - misleading and unsafe claims",
      "GOOGLE_PLAY_POLICIES_2026.md - deceptive behavior and restricted content",
    ],
    adjustments: [
      "Avoid absolute claims like 'safe', 'exact', or 'legal to keep' without clear limits.",
      "Explain data freshness and coverage limits for rules, weather, GPS, and safety outputs.",
      "Tell users to verify with local authorities or professionals when the consequence is real-world harm.",
      "Keep screenshots and descriptions consistent with what the app can truly guarantee.",
    ],
  },
];

export const POLICY_GUIDE_BY_TAG = Object.fromEntries(
  POLICY_GUIDES.map((guide) => [guide.tag, guide])
) as Record<PolicyTag, PolicyGuide>;

const HIGH_RISK_SLUGS = new Set([
  "skin-rash-identifier",
  "peptide-calculator",
  "pill-counter",
  "first-aid-guide",
  "cpr-trainer",
  "height-predictor",
  "ai-dubbing",
  "ai-detector",
  "humanize-ai",
  "id-passport-scanner",
  "fish-identifier",
  "fish-rules-id",
  "snake-identifier",
  "foraging-guide",
  "shot-timer",
]);

const REVIEW_RISK_SLUGS = new Set([
  "never-have-i-ever",
  "elf-alert-santa-camera",
  "potty-training-app",
  "trading-journal",
  "check-writer",
  "hymn-book",
  "font-identifier",
  "ai-jewelry-identifier",
  "stamp-quest",
  "schumann-resonance",
]);

const POLICY_OVERRIDES: Record<string, PolicyOverride> = {
  "skin-rash-identifier": {
    tags: ["HEALTH_MEDICAL", "AI_SYNTHETIC", "SENSITIVE_DATA", "SAFETY_LOCATION_ACCURACY", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: medical triage, AI-assisted interpretation, sensitive photos, and urgent-care language.",
    notes: [
      "Keep copy informational only and avoid diagnosis wording in metadata and screenshots.",
      "Explain AI limitations and collect explicit consent before any image leaves the device.",
      "Route severe outcomes to clinician or emergency guidance instead of implying certainty.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "peptide-calculator": {
    tags: ["HEALTH_MEDICAL", "REGULATED_FIN_ID", "SENSITIVE_DATA", "SAFETY_LOCATION_ACCURACY", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: dosage-style calculations, medication context, and regulated handling claims.",
    notes: [
      "Position this as reference math, not medical dosing advice.",
      "Substantiate formulas and remove language that suggests clinician-grade authority.",
      "Add warnings for user verification and clinician review before acting on results.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "pill-counter": {
    tags: ["HEALTH_MEDICAL", "REGULATED_FIN_ID", "AI_SYNTHETIC", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: medication workflows, controlled-substance logging, and AI camera counting.",
    notes: [
      "Frame it as counting assistance, not compliance-grade inventory automation.",
      "Treat pill images, drug names, and history as sensitive data with deletion controls.",
      "Avoid guarantees around DEA or pharmacy compliance unless you can support them.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "first-aid-guide": {
    tags: ["HEALTH_MEDICAL", "SAFETY_LOCATION_ACCURACY", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: emergency guidance, safety-critical instructions, and one-tap emergency flows.",
    notes: [
      "Base emergency content on recognized sources and show update provenance.",
      "Avoid implying the app replaces emergency responders or formal training.",
      "Be careful with GPS auto-share and any claim of real-time emergency accuracy.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "cpr-trainer": {
    tags: ["HEALTH_MEDICAL", "SAFETY_LOCATION_ACCURACY", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: CPR training crosses into emergency instruction and medical-safety claims.",
    notes: [
      "Keep the app positioned as training support, not certification or live emergency command.",
      "Tie compression-rate and AED guidance to named source material such as AHA guidance.",
      "Use caution with quick-dial and location language so the app does not overpromise emergency support.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "height-predictor": {
    tags: ["HEALTH_MEDICAL", "KIDS_AGE", "SENSITIVE_DATA", "SAFETY_LOCATION_ACCURACY", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: child health data, predictive growth claims, and medical charting language.",
    notes: [
      "Treat child height, weight, and age as sensitive data and minimize retention.",
      "Present outputs as estimate ranges only, not developmental assessment.",
      "Avoid language that suggests screening or anomaly detection without clinical review.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "ai-dubbing": {
    tags: ["AI_SYNTHETIC", "SENSITIVE_DATA", "UGC_SOCIAL", "IP_LICENSING", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: voice cloning, creator media uploads, and synthetic output with impersonation risk.",
    notes: [
      "Collect explicit consent before processing voice or video with third-party AI providers.",
      "Add rules and reporting for cloning or dubbing someone without rights or permission.",
      "Be careful with copyrighted imported media and any lip-sync authenticity claims.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "ai-detector": {
    tags: ["AI_SYNTHETIC", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: AI-detection claims are hard to substantiate and easy to market deceptively.",
    notes: [
      "Avoid certainty claims, false score precision, or school-cheating positioning in metadata.",
      "Name AI vendors and explain how uploaded text is handled and retained.",
      "Keep results framed as heuristic analysis rather than definitive proof.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "humanize-ai": {
    tags: ["AI_SYNTHETIC", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: bypass-style messaging creates elevated review risk around deceptive use cases.",
    notes: [
      "Remove 'passes GPTZero' or similar guaranteed-bypass claims from customer-facing copy.",
      "Position the app around rewriting, tone adjustment, and clarity instead of evasion.",
      "Disclose third-party AI processing and keyboard-extension data handling clearly.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "id-passport-scanner": {
    tags: ["REGULATED_FIN_ID", "SENSITIVE_DATA", "SAFETY_LOCATION_ACCURACY", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: government IDs, OCR extraction, and document storage are highly sensitive.",
    notes: [
      "Make on-device processing the default and state retention/deletion rules clearly.",
      "Do not imply identity verification, legal acceptance, or official government affiliation.",
      "Add strong export, delete, and local-security controls for stored ID data.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "fish-identifier": {
    tags: ["AI_SYNTHETIC", "SAFETY_LOCATION_ACCURACY", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: species ID plus legality and edibility guidance creates real-world safety risk.",
    notes: [
      "Avoid presenting identification, regulations, or edibility as guaranteed outcomes.",
      "Show jurisdiction freshness dates and push users to verify local rules.",
      "Treat GPS-tagged catches and uploaded photos as sensitive data.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "fish-rules-id": {
    tags: ["AI_SYNTHETIC", "SAFETY_LOCATION_ACCURACY", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: GPS-based legal-keep guidance is useful but risky if rules are stale or incomplete.",
    notes: [
      "Avoid hard 'legal / illegal' language unless regulation coverage is extremely reliable and current.",
      "Show data-source dates and route users to state or local authorities for confirmation.",
      "Be careful with location storage, especially when catch logs are retained over time.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "snake-identifier": {
    tags: ["AI_SYNTHETIC", "SAFETY_LOCATION_ACCURACY", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: wildlife ID can become life-safety guidance when venom and bite risk are involved.",
    notes: [
      "Do not imply users should rely on the app alone in the field.",
      "Use conservative emergency guidance whenever venomous lookalikes are possible.",
      "Keep image analysis framed as assistive and require verification from local experts or authorities.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "foraging-guide": {
    tags: ["AI_SYNTHETIC", "SAFETY_LOCATION_ACCURACY", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: edible-vs-toxic guidance and dangerous lookalikes create severe safety exposure.",
    notes: [
      "Avoid any implication that photo ID is enough to safely eat a plant or mushroom.",
      "Make dangerous-lookalike warnings more prominent than convenience copy.",
      "Treat GPS-tagged finds and photos as sensitive user data.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "shot-timer": {
    tags: ["SAFETY_LOCATION_ACCURACY", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "high",
    summary: "High review app: firearms-adjacent training tools face stricter review and safety scrutiny.",
    notes: [
      "Keep the app focused on timing and drills, not weapons sales or unsafe use content.",
      "Avoid metadata or imagery that looks promotional for firearms themselves.",
      "Use careful wording around live-fire training and microphone-based shot detection accuracy.",
      "Manual compliance review is worth doing before store submission.",
    ],
  },
  "trading-journal": {
    tags: ["REGULATED_FIN_ID", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "review",
    summary: "Needs a policy pass for financial recordkeeping, portfolio-style data, and trading-performance claims.",
    notes: [
      "Position the app as journaling and analytics, not investment advice.",
      "Treat trade logs, screenshots, and account-style data as sensitive.",
      "Avoid suggesting guaranteed performance improvement or outcome claims.",
    ],
  },
  "check-writer": {
    tags: ["REGULATED_FIN_ID", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "review",
    summary: "Needs a policy pass for banking-adjacent workflows and sensitive payment details.",
    notes: [
      "Avoid implying bank endorsement or guaranteed check acceptance.",
      "Treat routing numbers, account numbers, and payee details as sensitive records.",
      "Keep the product positioned as formatting and recordkeeping support.",
    ],
  },
  "potty-training-app": {
    tags: ["KIDS_AGE", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "review",
    summary: "Needs a policy pass for child-directed UX, parent-facing tracking, and toddler data handling.",
    notes: [
      "Keep marketing parent-focused unless you are ready for stricter kids-category treatment.",
      "Minimize child data collection and avoid unnecessary tracking or SDKs.",
      "Use parental gating before external links or account-like features.",
    ],
  },
  "never-have-i-ever": {
    tags: ["KIDS_AGE", "UGC_SOCIAL", "PAYMENTS_SUBS"],
    risk: "review",
    summary: "Needs a policy pass for 18+ content, drinking-game framing, and user-created decks.",
    notes: [
      "Hard-gate mature modes and be careful how 18+ content appears in screenshots.",
      "Treat user-created decks as moderated content if sharing becomes public.",
      "Keep family-safe and adult experiences clearly separated.",
    ],
  },
  "hymn-book": {
    tags: ["IP_LICENSING", "UGC_SOCIAL", "PAYMENTS_SUBS"],
    risk: "review",
    summary: "Needs a policy pass for hymn licensing, sheet music rights, and shared service materials.",
    notes: [
      "Verify every hymn, arrangement, and notation asset is public domain or licensed.",
      "Do not imply denomination or publisher affiliation without permission.",
      "Keep shared setlists within the rights granted by your content licenses.",
    ],
  },
  "font-identifier": {
    tags: ["AI_SYNTHETIC", "IP_LICENSING", "SENSITIVE_DATA", "PAYMENTS_SUBS"],
    risk: "review",
    summary: "Needs a policy pass for AI image analysis, trademark-sensitive brand assets, and font-purchase claims.",
    notes: [
      "Treat uploaded logos and branded materials as user-sensitive content.",
      "Be careful with trademarked wordmarks and claims of exact matches.",
      "Keep purchase-link data and licensing guidance accurate and non-misleading.",
    ],
  },
};

function includesOneOf(text: string, values: string[]) {
  return values.some((value) => text.includes(value));
}

function deriveTags(idea: Idea) {
  const text = [
    idea.name,
    idea.category,
    idea.primaryKeyword,
    idea.concept,
    idea.monetization,
    ...idea.targetKeywords,
    ...idea.features,
    ...idea.implementation,
  ]
    .join(" ")
    .toLowerCase();

  const tags = new Set<PolicyTag>();

  if (
    idea.buildTime === "ai" ||
    includesOneOf(text, [
      " ai ",
      "vision",
      "model",
      "machine learning",
      "voice cloning",
      "dub",
      "detector",
      "generator",
      "rewrite",
      "identify by photo",
      "point your camera",
      "claude",
      "gpt",
    ])
  ) {
    tags.add("AI_SYNTHETIC");
  }

  if (
    idea.category === "Health" ||
    idea.category === "Wellness" ||
    includesOneOf(text, [
      "medical",
      "health",
      "rash",
      "symptom",
      "first aid",
      "cpr",
      "aed",
      "blood",
      "pill",
      "medication",
      "dosage",
      "peptide",
      "child height",
      "growth percentile",
      "vet",
      "heat stress",
      "osha",
    ])
  ) {
    tags.add("HEALTH_MEDICAL");
  }

  if (
    includesOneOf(text, [
      "kids",
      "kid-friendly",
      "child",
      "children",
      "toddler",
      "baby",
      "family-friendly",
      "18+",
      "bachelorette",
      "drinking game",
      "potty training",
      "santa",
      "elf",
      "high school",
    ])
  ) {
    tags.add("KIDS_AGE");
  }

  if (
    includesOneOf(text, [
      "share link",
      "shareable",
      "share top moments",
      "social media",
      "instagram",
      "tiktok",
      "stories",
      "cofounders",
      "polls",
      "custom decks",
      "community",
      "friends",
      "worship team via link",
    ])
  ) {
    tags.add("UGC_SOCIAL");
  }

  if (
    includesOneOf(text, [
      "gps",
      "location",
      "camera",
      "microphone",
      "photo",
      "video",
      "voice",
      "id",
      "passport",
      "journal",
      "account",
      "health",
      "drug",
      "financial",
      "trade screenshots",
    ])
  ) {
    tags.add("SENSITIVE_DATA");
  }

  if (idea.pricing.weekly || idea.pricing.monthly || idea.pricing.annual) {
    tags.add("PAYMENTS_SUBS");
  }

  if (
    includesOneOf(text, [
      "stock",
      "crypto",
      "forex",
      "trade",
      "check writer",
      "check",
      "passport",
      "id scanner",
      "dea",
      "controlled substances",
      "medication",
      "financial",
      "inventory audits",
      "government",
    ])
  ) {
    tags.add("REGULATED_FIN_ID");
  }

  if (
    includesOneOf(text, [
      "public domain",
      "sheet music",
      "midi",
      "scott catalog",
      "trademark",
      "logo",
      "font",
      "purchase links",
      "audio loops",
      "gospel hymns",
      "thermal stencil printers",
    ])
  ) {
    tags.add("IP_LICENSING");
  }

  if (
    includesOneOf(text, [
      "safety",
      "danger",
      "warning",
      "emergency",
      "legal to keep",
      "safe to eat",
      "regulations",
      "size limits",
      "bag limits",
      "weather",
      "gps-based",
      "dangerous lookalikes",
      "venom",
      "osha",
    ])
  ) {
    tags.add("SAFETY_LOCATION_ACCURACY");
  }

  return POLICY_ORDER.filter((tag) => tags.has(tag));
}

function deriveRisk(idea: Idea, tags: PolicyTag[]): PolicyRisk {
  if (HIGH_RISK_SLUGS.has(idea.slug)) return "high";
  if (REVIEW_RISK_SLUGS.has(idea.slug)) return "review";

  const hasHealth = tags.includes("HEALTH_MEDICAL");
  const hasSafety = tags.includes("SAFETY_LOCATION_ACCURACY");
  const hasRegulated = tags.includes("REGULATED_FIN_ID");
  const hasAi = tags.includes("AI_SYNTHETIC");
  const hasKids = tags.includes("KIDS_AGE");
  const hasSensitive = tags.includes("SENSITIVE_DATA");

  if ((hasHealth && hasSafety) || (hasAi && hasSensitive && hasSafety) || (hasRegulated && hasSensitive)) {
    return "high";
  }

  if (hasHealth || hasAi || hasKids || hasRegulated || hasSafety || tags.length >= 3) {
    return "review";
  }

  return "low";
}

function summarizeProfile(tags: PolicyTag[], risk: PolicyRisk) {
  const labels = tags.slice(0, 3).map((tag) => POLICY_GUIDE_BY_TAG[tag].shortLabel.toLowerCase());
  if (risk === "high") {
    return labels.length > 0
      ? `High review app: ${labels.join(", ")}.`
      : "High review app before submission.";
  }
  if (risk === "review") {
    return labels.length > 0
      ? `Needs a policy pass for ${labels.join(", ")}.`
      : "Needs a policy pass before submission.";
  }
  return "Mostly standard store requirements with normal privacy and billing checks.";
}

function buildNotes(tags: PolicyTag[], risk: PolicyRisk) {
  const notes = tags
    .slice(0, 3)
    .flatMap((tag) => POLICY_GUIDE_BY_TAG[tag].adjustments.slice(0, 1));

  if (risk === "high") {
    notes.unshift("Manual compliance review is worth doing before store submission.");
  }

  return Array.from(new Set(notes)).slice(0, 4);
}

export function getPolicyProfile(idea: Idea): PolicyProfile {
  const override = POLICY_OVERRIDES[idea.slug];
  const tags = deriveTags(idea);
  const resolvedTags = override?.tags ?? tags;
  const risk = override?.risk ?? deriveRisk(idea, resolvedTags);

  return {
    tags: resolvedTags,
    risk,
    summary: override?.summary ?? summarizeProfile(resolvedTags, risk),
    notes: override?.notes ?? buildNotes(resolvedTags, risk),
  };
}

export function getPolicyCounts(ideas: Idea[]) {
  return ideas.reduce(
    (acc, idea) => {
      const profile = getPolicyProfile(idea);
      acc[profile.risk] += 1;
      return acc;
    },
    { low: 0, review: 0, high: 0 }
  );
}

export function getHighestRiskIdeas(ideas: Idea[]) {
  return ideas
    .filter((idea) => getPolicyProfile(idea).risk === "high")
    .sort((a, b) => a.rank - b.rank);
}
