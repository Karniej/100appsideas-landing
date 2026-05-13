import type { Idea } from "@/lib/ideas-data";
import { getPlatformRecommendation } from "@/lib/platform-recommendation";
import {
  POLICY_GUIDE_BY_TAG,
  getPolicyProfile,
  type PolicyProfile,
} from "@/lib/policy-data";

const BUILD_TIME_COPY: Record<Idea["buildTime"], string> = {
  weekend: "small weekend MVP",
  week: "focused 3-7 day MVP",
  complex: "larger 1-2 week MVP",
  ai: "AI-assisted build with provider boundaries",
};

const STATUS_COPY: Record<Idea["status"], string> = {
  SHIPPED: "Already shipped internally; use this as a polish or iteration brief.",
  WEAK: "Weak opportunity signal; only build with a narrow ASO wedge or extra distribution.",
  MODERATE: "Moderate opportunity signal; ship a focused product with clear keyword alignment.",
  STRONG: "Strong opportunity signal; prioritize exact search intent and fast launch quality.",
  DEAD: "Low search volume; treat this as a cautious experiment unless there is another distribution channel.",
};

function asBullets(items: string[]) {
  if (items.length === 0) return "- None";
  return items.map((item) => `- ${item}`).join("\n");
}

function formatCompetitors(idea: Idea) {
  if (idea.competitors.length === 0) {
    return "- No direct competitors listed; validate demand before overbuilding.";
  }

  return idea.competitors
    .map((competitor) => {
      const rating =
        competitor.rating === "-"
          ? "rating unavailable"
          : `${competitor.rating} rating`;
      return `- ${competitor.name}: ${competitor.reviews} reviews, ${rating}`;
    })
    .join("\n");
}

function uniquePolicyAdjustments(policyProfile: PolicyProfile) {
  const adjustments = policyProfile.tags.flatMap((tag) =>
    POLICY_GUIDE_BY_TAG[tag].adjustments.map(
      (adjustment) => `${POLICY_GUIDE_BY_TAG[tag].shortLabel}: ${adjustment}`
    )
  );

  return Array.from(new Set([...policyProfile.notes, ...adjustments])).slice(0, 10);
}

export function generateCodexBuildPrompt(
  idea: Idea,
  policyProfile: PolicyProfile = getPolicyProfile(idea)
) {
  const platform = getPlatformRecommendation(idea);
  const policyTags = policyProfile.tags
    .map((tag) => POLICY_GUIDE_BY_TAG[tag].shortLabel)
    .join(", ");
  const policyAdjustments = uniquePolicyAdjustments(policyProfile);

  return `You are Codex acting as a senior product engineer. Build a shippable MVP for "${idea.name}".

Work style:
- If you are inside an existing repo, first inspect AGENTS.md, package/project files, the app structure, and existing UI patterns. Reuse the current stack and conventions.
- If there is no existing app, choose the best current production stack for the product:
  - Default to React Native + Expo with TypeScript and Expo Router for cross-platform consumer apps.
  - Use native SwiftUI when the product is clearly Apple-first, depends on Apple-only APIs, or benefits from deep platform integration.
  - For cross-platform ideas, prefer the user's Expo boilerplate if one exists instead of scaffolding an old starter.
  - Use the newest stable version of the chosen stack and its modern app-router pattern, not an outdated starter template.
- Implement the product, not a mockup. Stub only external paid services or credentials, and make those seams explicit.
- Keep the first build focused. Do not add accounts, a backend, or social/community infrastructure unless they are required for the MVP below.
- After implementation, run the relevant build/typecheck/test command and report any remaining gaps.

Product:
- Name: ${idea.name}
- Category: ${idea.category}
- Group: ${idea.group}
- Primary keyword: ${idea.primaryKeyword}
- Recommended platform: ${platform.label}
- Platform reason: ${platform.reason}
- Build size: ${BUILD_TIME_COPY[idea.buildTime]}
- Pricing tier: ${idea.pricingTier}
- Opportunity size tier: ${idea.opportunitySizeTier ?? "unknown"}
- Opportunity size score: ${idea.opportunitySizeScore ?? "unknown"}

Concept:
${idea.concept}

Opportunity signal:
- Dataset rank: #${idea.rank}
- Ranking keyword: ${idea.rankingKeyword}
- Fox keyword: ${idea.foxKeyword ?? "not matched"}
- Search volume: ${idea.vol ?? idea.pop}
- Chance score: ${typeof idea.chance === "number" ? `${idea.chance}/100` : "not matched"}
- Keyword difficulty: ${idea.diff}
- Search results: ${idea.results ?? idea.appsCount}
- Qualified tracked keywords: ${idea.qualifiedKeywordCount}
- Search intent score: ${idea.intentScore}/100
- Fox score: ${idea.foxScore ?? idea.kwScore}
- Total opportunity score: ${idea.totalScore}
- Competitive read: ${STATUS_COPY[idea.status]}
- Why this is worth building: ${idea.whyBuild}

Build target:
- Build the smallest version that still solves the core user problem end to end.
- If the opportunity size is large, preserve room for history, export, or premium depth.
- If the opportunity size is medium or small, keep the MVP brutally focused and avoid optional subflows.
- Treat the ranking data as a prioritization signal, not a product spec.
- Treat the platform recommendation as the default stack choice unless the repo already proves a different one.
- If the platform recommendation is Expo/RN, build the phone-first cross-platform MVP and defer Apple Watch, iMessage, widget, or other Apple-only bonus features unless they are core to the workflow.
- If the platform recommendation is SwiftUI, lean into native Apple APIs and a first-class iPhone experience.

Target keywords:
${asBullets(idea.targetKeywords)}

Competitors to beat:
${formatCompetitors(idea)}

MVP scope:
${asBullets(idea.features)}

Implementation direction:
${asBullets(platform.stack)}

User experience requirements:
- The first screen should be the real product workflow, not a marketing page.
- Make the primary action obvious within one screen.
- Use the core keyword and competitor positioning to choose the opening screen and the default state.
- Always include a proper onboarding flow with lightweight animations that explains the value quickly, then transitions naturally into the paywall.
- If the product monetizes with subscriptions, wire the paywall through RevenueCat rather than a hand-rolled billing layer.
- The paywall should show price, billing period, trial length if any, renewal language, and a restore-purchases action.
- Include polished empty states, loading states, error states, and at least a small amount of sample or seed data where useful.
- Prefer local-first behavior for the first version. Add sync, cloud storage, or accounts only if the MVP cannot function without them.
- Use a restrained, modern interface appropriate for "${idea.category}" rather than a generic template.
- Include accessibility basics: readable contrast, Dynamic Type-friendly layout, VoiceOver labels for controls, and useful permission copy.

Monetization:
- Model: ${idea.monetization}
- Weekly: ${idea.pricing.weekly}
- Monthly: ${idea.pricing.monthly}
- Annual: ${idea.pricing.annual}
- Trial: ${idea.pricing.trial}
- Implement a clear premium boundary.
- Use RevenueCat for subscription handling and paywall state whenever the product has subscriptions or trials.
- If the billing layer cannot be fully wired in this environment, create a clean RevenueCat-ready abstraction and a production-style paywall that can be connected later.

Policy and launch constraints:
- Risk level: ${policyProfile.risk}
- Policy tags: ${policyTags || "standard privacy and billing"}
- Summary: ${policyProfile.summary}
${asBullets(policyAdjustments)}

Build deliverables:
- Working app screens for the full MVP flow.
- A short implementation plan before code if the build is non-trivial.
- Local persistence for user-created data where the concept needs history, favorites, notes, scores, or saved records.
- A small domain model that matches the product, not just generic strings.
- Reusable components for repeated UI.
- Tests for non-trivial domain logic such as scoring, calculations, timers, parsing, search, or data transforms.
- A short README or launch notes section describing what was built, how to run it, and which paid services or credentials still need production setup.

Acceptance criteria:
- A user can complete the core "${idea.name}" workflow end to end.
- The app reflects the keyword and competitor positioning above.
- Premium features are visible but do not block basic evaluation.
- The implementation compiles and avoids dead placeholder screens for the main flow.
- Privacy, permission, and policy-sensitive copy is aligned with the risk notes above.`;
}
