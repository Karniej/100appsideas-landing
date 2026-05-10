import type { Idea } from "@/lib/ideas-data";
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
  WEAK: "Weak competition; move quickly and prioritize App Store positioning.",
  MODERATE: "Beatable competition; ship a focused product with a clear wedge.",
  STRONG: "Strong competition; the MVP needs a sharper differentiator and higher execution quality.",
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
  const policyTags = policyProfile.tags
    .map((tag) => POLICY_GUIDE_BY_TAG[tag].shortLabel)
    .join(", ");
  const policyAdjustments = uniquePolicyAdjustments(policyProfile);

  return `You are Codex acting as a senior product engineer. Build a shippable MVP for "${idea.name}".

Work style:
- If you are inside an existing repo, first inspect AGENTS.md, package/project files, the app structure, and existing UI patterns. Reuse the current stack and conventions.
- If there is no existing app, create a native iOS SwiftUI app unless the user has explicitly provided another platform.
- Implement the product, not a mockup. Stub only external paid services or credentials, and make those seams explicit.
- Keep the first build focused. Do not add accounts, a backend, or social/community infrastructure unless they are required for the MVP below.
- After implementation, run the relevant build/typecheck/test command and report any remaining gaps.

Product:
- Name: ${idea.name}
- Category: ${idea.category}
- Group: ${idea.group}
- Primary keyword: ${idea.primaryKeyword}
- Build size: ${BUILD_TIME_COPY[idea.buildTime]}
- Pricing tier: ${idea.pricingTier}

Concept:
${idea.concept}

Opportunity signal:
- Dataset rank: #${idea.rank}
- Popularity score: ${idea.pop}
- Keyword difficulty: ${idea.diff}
- Keyword score: ${idea.kwScore}
- Competition review count: ${idea.compReviews.toLocaleString()}
- Competition score: ${idea.compScore}
- Total opportunity score: ${idea.totalScore}
- Competitive read: ${STATUS_COPY[idea.status]}
- Why this is worth building: ${idea.whyBuild}

Target keywords:
${asBullets(idea.targetKeywords)}

Competitors to beat:
${formatCompetitors(idea)}

MVP scope:
${asBullets(idea.features)}

Implementation direction:
${asBullets(idea.implementation)}

User experience requirements:
- The first screen should be the real product workflow, not a marketing page.
- Make the primary action obvious within one screen.
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
- Implement a clear premium boundary. If StoreKit cannot be fully wired in this environment, create a clean paywall and subscription abstraction that can be connected later.

Policy and launch constraints:
- Risk level: ${policyProfile.risk}
- Policy tags: ${policyTags || "standard privacy and billing"}
- Summary: ${policyProfile.summary}
${asBullets(policyAdjustments)}

Build deliverables:
- Working app screens for the full MVP flow.
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
