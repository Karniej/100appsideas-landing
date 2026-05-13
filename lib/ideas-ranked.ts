import foxKeywords from "./foxdata-keywords.json";
import { ideas as rawIdeas, type Idea } from "./ideas-data";
import { getPolicyProfile } from "./policy-data";

type FoxKeywordMetric = {
  keyword: string;
  vol: number;
  vol_change: number;
  results: number;
  chance: number;
  diff: number;
};

export type RankedIdea = Idea;

const foxMap = new Map<string, FoxKeywordMetric>(
  (foxKeywords as FoxKeywordMetric[]).map((row) => [row.keyword.toLowerCase().trim(), row])
);

const STATUS_BUCKET: Record<Idea["status"], number> = {
  STRONG: 0,
  MODERATE: 0,
  WEAK: 0,
  SHIPPED: 1,
  DEAD: 2,
};

function normalizeKeyword(keyword: string) {
  return keyword.toLowerCase().trim();
}

function scoreFox(metric: FoxKeywordMetric) {
  return metric.vol * 0.55 + metric.chance * 0.35 + (100 - metric.diff) * 0.1 - metric.results / 18;
}

function scoreIntent(intentScore: number) {
  return intentScore >= 80 ? (intentScore - 80) * 0.25 : -(80 - intentScore) * 0.45;
}

function scoreBuildTime(buildTime: Idea["buildTime"]) {
  switch (buildTime) {
    case "weekend":
      return 1.5;
    case "week":
      return 1;
    case "complex":
      return 0;
    case "ai":
      return -1;
  }
}

function scorePolicy(profile: ReturnType<typeof getPolicyProfile>) {
  if (profile.risk === "high") return 16;
  if (profile.risk === "review") return 12;
  return 0;
}

function findBestFoxKeyword(idea: Idea) {
  const candidates = [idea.primaryKeyword, ...idea.targetKeywords];
  let best: { keyword: string; metric: FoxKeywordMetric; score: number } | null = null;

  for (const candidate of candidates) {
    const metric = foxMap.get(normalizeKeyword(candidate));
    if (!metric) continue;

    const score = scoreFox(metric);
    if (!best || score > best.score) {
      best = { keyword: candidate, metric, score };
    }
  }

  return best;
}

function mergeIdea(idea: Idea): RankedIdea {
  const policyProfile = getPolicyProfile(idea);
  const fox = findBestFoxKeyword(idea);
  const intentDelta = scoreIntent(idea.intentScore);
  const policyDelta = scorePolicy(policyProfile);
  const buildDelta = scoreBuildTime(idea.buildTime);
  const clusterBonus = Math.max(0, idea.qualifiedKeywordCount - 1) * 1.5;

  const totalScore = fox
    ? Math.round(fox.score + intentDelta + clusterBonus + buildDelta - policyDelta)
    : Math.round(idea.totalScore + intentDelta - policyDelta);

  const merged: RankedIdea = {
    ...idea,
    vol: fox?.metric.vol ?? idea.pop,
    chance: fox?.metric.chance,
    results: fox?.metric.results ?? idea.appsCount,
    foxScore: fox ? Math.round(fox.score) : idea.kwScore,
    foxKeyword: fox?.keyword,
    pop: fox?.metric.vol ?? idea.pop,
    diff: fox?.metric.diff ?? idea.diff,
    kwScore: fox ? Math.round(fox.score) : idea.kwScore,
    totalScore,
    rankingKeyword: fox?.keyword ?? idea.rankingKeyword,
    whyBuild: fox
      ? `FOXDATA MERGE 2026-05-13: ranking keyword '${fox.keyword}' has vol ${fox.metric.vol} / chance ${fox.metric.chance} / diff ${fox.metric.diff} / results ${fox.metric.results}. ${idea.whyBuild}`
      : idea.whyBuild,
  };

  return merged;
}

export const ideas = rawIdeas
  .map(mergeIdea)
  .sort((a, b) => {
    const bucketDiff = STATUS_BUCKET[a.status] - STATUS_BUCKET[b.status];
    if (bucketDiff !== 0) return bucketDiff;
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    if ((b.vol ?? 0) !== (a.vol ?? 0)) return (b.vol ?? 0) - (a.vol ?? 0);
    if (a.diff !== b.diff) return a.diff - b.diff;
    return a.rank - b.rank;
  })
  .map((idea, index) => ({
    ...idea,
    rank: index + 1,
  }));
