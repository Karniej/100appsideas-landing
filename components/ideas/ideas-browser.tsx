"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  X,
  Star,
  Timer,
  DollarSign,
  Code,
  Target,
  Tag,
  Users,
  Zap,
  Flame,
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Idea, IdeaStatus, BuildTime } from "@/lib/ideas-data";
import {
  POLICY_GUIDE_BY_TAG,
  getPolicyCounts,
  getPolicyProfile,
  type PolicyRisk,
} from "@/lib/policy-data";

type SortOption = "rank" | "popularity" | "difficulty" | "score" | "competition";

const STATUS_COLORS: Record<IdeaStatus, { border: string; bg: string; text: string; dot: string }> = {
  SHIPPED: { border: "border-l-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  WEAK: { border: "border-l-amber-500", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  MODERATE: { border: "border-l-blue-500", bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  STRONG: { border: "border-l-orange-500", bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  DEAD: { border: "border-l-red-500", bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
};

const BUILD_LABELS: Record<BuildTime, string> = { weekend: "< 2 days", week: "3-7 days", complex: "1-2 weeks", ai: "2+ weeks (AI)" };
const BUILD_COLORS: Record<BuildTime, string> = { weekend: "text-emerald-400", week: "text-amber-400", complex: "text-orange-400", ai: "text-violet-400" };
const STATUS_LABELS: Record<IdeaStatus, string> = { SHIPPED: "Already shipped", WEAK: "Easy to beat", MODERATE: "Beatable", STRONG: "Strong competition", DEAD: "No search volume" };
const PRICING_LABELS: Record<string, string> = { entry: "Entry", standard: "Standard", premium: "Premium" };
const POLICY_RISK_LABELS: Record<PolicyRisk, string> = { low: "Low policy risk", review: "Needs review", high: "High policy risk" };
const POLICY_RISK_STYLES: Record<PolicyRisk, string> = {
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  high: "bg-red-500/10 text-red-400 border-red-500/20",
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "rank", label: "Best opportunity first" },
  { value: "score", label: "Highest score first" },
  { value: "popularity", label: "Most searched first" },
  { value: "difficulty", label: "Easiest to rank first" },
  { value: "competition", label: "Fewest competitors first" },
];

interface IdeasBrowserProps {
  ideas: Idea[];
}

// Animated counter
function AnimatedNumber({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-heading font-bold text-white">{display}</div>
      <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
    </div>
  );
}

const IdeasBrowser = ({ ideas }: IdeasBrowserProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedBuildTime, setSelectedBuildTime] = useState("ALL");
  const [selectedPolicyRisk, setSelectedPolicyRisk] = useState<PolicyRisk | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const [expandedRank, setExpandedRank] = useState<number | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [blurMode, setBlurMode] = useState(false);
  const expandedRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    return ["ALL", ...Array.from(new Set(ideas.map((i) => i.category))).sort()];
  }, [ideas]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: ideas.length };
    ideas.forEach((i) => { counts[i.status] = (counts[i.status] || 0) + 1; });
    return counts;
  }, [ideas]);

  const policyCounts = useMemo(() => getPolicyCounts(ideas), [ideas]);

  const filtered = useMemo(() => {
    let result = [...ideas];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (idea) =>
          idea.name.toLowerCase().includes(q) ||
          idea.concept.toLowerCase().includes(q) ||
          idea.primaryKeyword.toLowerCase().includes(q) ||
          idea.category.toLowerCase().includes(q) ||
          idea.targetKeywords.some((kw) => kw.toLowerCase().includes(q))
      );
    }
    if (selectedCategory !== "ALL") result = result.filter((i) => i.category === selectedCategory);
    if (selectedStatus !== "ALL") result = result.filter((i) => i.status === selectedStatus);
    if (selectedBuildTime !== "ALL") result = result.filter((i) => i.buildTime === selectedBuildTime);
    if (selectedPolicyRisk !== "ALL") result = result.filter((i) => getPolicyProfile(i).risk === selectedPolicyRisk);

    switch (sortBy) {
      case "rank": result.sort((a, b) => a.rank - b.rank); break;
      case "popularity": result.sort((a, b) => b.pop - a.pop); break;
      case "difficulty": result.sort((a, b) => a.diff - b.diff); break;
      case "score": result.sort((a, b) => b.totalScore - a.totalScore); break;
      case "competition": result.sort((a, b) => a.compReviews - b.compReviews); break;
    }
    return result;
  }, [ideas, searchQuery, selectedCategory, selectedStatus, selectedBuildTime, selectedPolicyRisk, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedStatus("ALL");
    setSelectedBuildTime("ALL");
    setSelectedPolicyRisk("ALL");
    setSortBy("rank");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "ALL" || selectedStatus !== "ALL" || selectedBuildTime !== "ALL" || selectedPolicyRisk !== "ALL" || sortBy !== "rank";

  // Scroll expanded item into view
  useEffect(() => {
    if (expandedRank !== null && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [expandedRank]);

  return (
    <div className="space-y-8">
      {/* Stats dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-3"
      >
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <AnimatedNumber value={ideas.length} label="Total Ideas" />
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-emerald-500/20">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-heading font-bold text-emerald-400">
              {statusCounts["WEAK"] || 0}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">Weak Competition</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-amber-500/20">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-heading font-bold text-amber-400">
              {statusCounts["MODERATE"] || 0}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">Moderate</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-orange-500/20">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-heading font-bold text-orange-400">
              {statusCounts["STRONG"] || 0}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">Strong</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-700 col-span-2 md:col-span-1">
          <AnimatedNumber value={ideas.filter((i) => i.buildTime === "weekend").length} label="Weekend Builds" />
        </div>
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-300">
              <ShieldCheck className="h-4 w-4" />
              Policy coverage for all 40 ideas
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              Each idea now gets reusable policy tags, a submission risk level, and launch-note guidance.
            </p>
          </div>
          <Link
            href="/ideas/policies"
            className="inline-flex items-center justify-center rounded-full border border-amber-500/20 bg-zinc-950 px-4 py-2 text-sm font-medium text-amber-300 transition-colors hover:border-amber-400/30 hover:text-amber-200"
          >
            Open policy master guide
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, keyword, concept..."
            className="w-full pl-12 pr-10 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/40 transition-colors text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Blur toggle for screenshots */}
        <div className="flex justify-end">
          <button
            onClick={() => setBlurMode(!blurMode)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
              blurMode
                ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300"
            )}
          >
            <span className={cn("w-7 h-4 rounded-full relative transition-colors", blurMode ? "bg-amber-500" : "bg-zinc-700")}>
              <span className={cn("absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform", blurMode ? "translate-x-3.5" : "translate-x-0.5")} />
            </span>
            {blurMode ? "Screenshot mode ON" : "Screenshot mode"}
          </button>
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Competition level pills */}
          {([
            { key: "ALL", label: "All", desc: null },
            { key: "WEAK", label: "Weak", desc: "Top app has < 500 reviews or < 4.0 rating" },
            { key: "MODERATE", label: "Moderate", desc: "Established but beatable" },
            { key: "STRONG", label: "Strong", desc: "Well-served niche, needs strong differentiator" },
          ] as const).map((s) => (
            <button
              key={s.key}
              onClick={() => setSelectedStatus(s.key)}
              title={s.desc || undefined}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                selectedStatus === s.key
                  ? s.key === "ALL"
                    ? "bg-white/10 text-white border-white/20"
                    : `${STATUS_COLORS[s.key as IdeaStatus].bg} ${STATUS_COLORS[s.key as IdeaStatus].text} border-current/20`
                  : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700"
              )}
            >
              {s.label}
              <span className="ml-1.5 opacity-60">{statusCounts[s.key] || 0}</span>
            </button>
          ))}

          <div className="w-px h-5 bg-zinc-800 mx-1 hidden sm:block" />

          {/* Build effort pills */}
          {([
            { key: "ALL" as const, label: "Any effort" },
            { key: "weekend" as const, label: "< 2 days" },
            { key: "week" as const, label: "3-7 days" },
            { key: "complex" as const, label: "1-2 weeks" },
            { key: "ai" as const, label: "2+ weeks (needs AI)" },
          ]).map((bt) => (
            <button
              key={bt.key}
              onClick={() => setSelectedBuildTime(bt.key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                selectedBuildTime === bt.key
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700"
              )}
            >
              {bt.label}
            </button>
          ))}

          <div className="w-px h-5 bg-zinc-800 mx-1 hidden sm:block" />

          {([
            { key: "ALL" as const, label: "Any policy" },
            { key: "low" as const, label: `Low (${policyCounts.low})` },
            { key: "review" as const, label: `Review (${policyCounts.review})` },
            { key: "high" as const, label: `High (${policyCounts.high})` },
          ]).map((risk) => (
            <button
              key={risk.key}
              onClick={() => setSelectedPolicyRisk(risk.key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                selectedPolicyRisk === risk.key
                  ? risk.key === "ALL"
                    ? "bg-white/10 text-white border-white/20"
                    : POLICY_RISK_STYLES[risk.key]
                  : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700"
              )}
            >
              {risk.label}
            </button>
          ))}

          <div className="w-px h-5 bg-zinc-800 mx-1 hidden sm:block" />

          {/* Category dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowSortDropdown(false); }}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                selectedCategory !== "ALL"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300"
              )}
            >
              {selectedCategory === "ALL" ? "Category" : selectedCategory}
              <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {showCategoryDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowCategoryDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 z-20 w-56 max-h-64 overflow-y-auto rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setShowCategoryDropdown(false); }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl",
                          selectedCategory === cat ? "bg-amber-500/10 text-amber-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        )}
                      >
                        {cat === "ALL" ? "All Categories" : cat}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Sort dropdown */}
          <div className="relative ml-auto">
            <button
              onClick={() => { setShowSortDropdown(!showSortDropdown); setShowCategoryDropdown(false); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300 transition-colors"
            >
              <ArrowUpDown className="h-3 w-3" />
              {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
            </button>
            <AnimatePresence>
              {showSortDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 z-20 w-48 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl",
                          sortBy === opt.value ? "bg-amber-500/10 text-amber-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing <span className="text-white font-medium">{filtered.length}</span> of {ideas.length} ideas
          </p>
          <div className="flex items-center gap-4">
            <p className="hidden text-xs text-zinc-500 md:block">
              {policyCounts.high} high-risk, {policyCounts.review} review, {policyCounts.low} standard
            </p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-xs text-amber-500 hover:text-amber-400 transition-colors underline underline-offset-2">
                Clear filters
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Ideas list */}
      <div className="space-y-2">
        {filtered.map((idea, i) => {
          const isExpanded = expandedRank === idea.rank;
          const policyProfile = getPolicyProfile(idea);
          return (
            <motion.div
              key={idea.rank}
              ref={isExpanded ? expandedRef : undefined}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.6) }}
              className={cn(
                "rounded-xl bg-zinc-900/40 border border-zinc-800/80 border-l-[3px] transition-all duration-300 overflow-hidden scroll-mt-4",
                isExpanded ? "border-amber-500/30 bg-zinc-900/70 shadow-lg shadow-amber-500/5" : "hover:bg-zinc-800/50 hover:border-zinc-700/80 hover:shadow-lg hover:shadow-black/20",
                STATUS_COLORS[idea.status].border
              )}
            >
              {/* Row header — always visible */}
              <button
                onClick={() => setExpandedRank(isExpanded ? null : idea.rank)}
                className="w-full text-left p-4 md:p-5 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className={cn(
                    "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-heading font-bold text-sm transition-colors",
                    isExpanded ? "bg-amber-500/10 text-amber-400" : "bg-zinc-800/80 text-zinc-300 group-hover:bg-amber-500/10 group-hover:text-amber-400"
                  )}>
                    {idea.rank}
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={cn("font-heading font-semibold text-white text-sm md:text-base truncate", blurMode && "blur-sm select-none")}>
                        {idea.name}
                      </h3>
                      <span className={cn("shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border", STATUS_COLORS[idea.status].bg, STATUS_COLORS[idea.status].text, "border-current/20")}>
                        <span className={cn("w-1 h-1 rounded-full", STATUS_COLORS[idea.status].dot)} />
                        {STATUS_LABELS[idea.status]}
                      </span>
                      <span className={cn("hidden shrink-0 items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border lg:inline-flex", POLICY_RISK_STYLES[policyProfile.risk])}>
                        <ShieldCheck className="h-3 w-3" />
                        {policyProfile.risk === "high" ? "High policy" : policyProfile.risk === "review" ? "Policy review" : "Standard policy"}
                      </span>
                    </div>
                    <p className={cn("text-xs text-zinc-500 line-clamp-1", blurMode && "blur-sm select-none")}>{idea.concept}</p>
                  </div>

                  {/* Desktop stats */}
                  <div className="hidden md:flex items-center gap-6 shrink-0">
                    <div className="text-center w-12">
                      <div className="text-xs text-zinc-600 mb-0.5">Pop</div>
                      <div className="text-sm font-semibold text-zinc-300">{idea.pop}</div>
                    </div>
                    <div className="text-center w-12">
                      <div className="text-xs text-zinc-600 mb-0.5">Diff</div>
                      <div className="text-sm font-semibold text-zinc-300">{idea.diff}</div>
                    </div>
                    <div className="text-center w-12">
                      <div className="text-xs text-zinc-600 mb-0.5">Score</div>
                      <div className="text-sm font-bold text-amber-400">+{idea.totalScore}</div>
                    </div>
                    <div className="text-center w-16">
                      <div className="text-xs text-zinc-600 mb-0.5">Build</div>
                      <div className={cn("text-xs font-medium", BUILD_COLORS[idea.buildTime])}>{BUILD_LABELS[idea.buildTime]}</div>
                    </div>
                    <div className="text-center w-12">
                      <div className="text-xs text-zinc-600 mb-0.5">Reviews</div>
                      <div className="text-sm font-semibold text-zinc-300">{idea.compReviews.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Mobile stats */}
                  <div className="flex md:hidden items-center gap-2 shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-400">+{idea.totalScore}</div>
                      <div className={cn("text-[10px] font-medium", BUILD_COLORS[idea.buildTime])}>{BUILD_LABELS[idea.buildTime]}</div>
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronDown className={cn(
                    "h-4 w-4 text-zinc-600 shrink-0 transition-transform duration-300",
                    isExpanded && "rotate-180 text-amber-500"
                  )} />
                </div>
              </button>

              {/* Accordion detail — expands below */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-2 border-t border-zinc-800/60 space-y-6">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border", STATUS_COLORS[idea.status].bg, STATUS_COLORS[idea.status].text, "border-current/20")}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", STATUS_COLORS[idea.status].dot)} />
                          {STATUS_LABELS[idea.status]}
                        </span>
                        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700", BUILD_COLORS[idea.buildTime])}>
                          <Timer className="h-3 w-3" />
                          {BUILD_LABELS[idea.buildTime]} build
                        </span>
                        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-300", blurMode && "blur-sm select-none")}>
                          <Tag className="h-3 w-3" />
                          {idea.primaryKeyword}
                        </span>
                        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border", POLICY_RISK_STYLES[policyProfile.risk])}>
                          <ShieldCheck className="h-3 w-3" />
                          {POLICY_RISK_LABELS[policyProfile.risk]}
                        </span>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                        <SectionHeader icon={ShieldCheck} label="Policy Fit" />
                        <p className="text-sm text-zinc-300 leading-relaxed">{policyProfile.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {policyProfile.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-300">
                              {POLICY_GUIDE_BY_TAG[tag].shortLabel}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 space-y-1.5">
                          {policyProfile.notes.map((note) => (
                            <p key={note} className="text-xs leading-relaxed text-zinc-400">
                              {note}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Score cards */}
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { label: "Pop", value: idea.pop, color: "text-white" },
                          { label: "Diff", value: idea.diff, color: idea.diff <= 20 ? "text-emerald-400" : idea.diff <= 30 ? "text-amber-400" : "text-red-400" },
                          { label: "KW Score", value: idea.kwScore, color: "text-white" },
                          { label: "Comp Score", value: idea.compScore, color: "text-white" },
                          { label: "Total", value: idea.totalScore, color: "text-amber-400" },
                        ].map((stat) => (
                          <div key={stat.label} className="text-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
                            <div className={cn("text-lg font-bold font-heading", stat.color)}>
                              {stat.value > 0 ? `+${stat.value}` : stat.value}
                            </div>
                            <div className="text-[10px] text-zinc-500 mt-0.5">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Content sections in 2-column layout on desktop */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left column */}
                        <div className={cn("space-y-6", blurMode && "blur-md select-none pointer-events-none")}>
                          <div>
                            <SectionHeader icon={Zap} label="Concept" />
                            <p className="text-sm text-zinc-300 leading-relaxed">{idea.concept}</p>
                          </div>
                          {idea.features && idea.features.length > 0 && (
                            <div>
                              <SectionHeader icon={Sparkles} label="Core Features" />
                              <ul className="space-y-1.5">
                                {idea.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div>
                            <SectionHeader icon={Flame} label="Why Build This" />
                            <p className="text-sm text-zinc-300 leading-relaxed">{idea.whyBuild}</p>
                          </div>
                          <div>
                            <SectionHeader icon={Target} label="Target Keywords" />
                            <div className="flex flex-wrap gap-1.5">
                              {idea.targetKeywords.map((kw) => (
                                <span key={kw} className="px-2.5 py-1 rounded-full text-xs bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">{kw}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right column */}
                        <div className={cn("space-y-6", blurMode && "blur-md select-none pointer-events-none")}>
                          <div>
                            <SectionHeader icon={Users} label="Competitors" />
                            {idea.competitors.length === 0 ? (
                              <p className="text-sm text-emerald-400 font-medium">No competitors found -- wide open market.</p>
                            ) : (
                              <div className="space-y-2">
                                {idea.competitors.map((comp) => (
                                  <div key={comp.name} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
                                    <span className="text-sm text-zinc-200 font-medium">{comp.name}</span>
                                    <div className="flex items-center gap-3 text-xs">
                                      <span className="text-zinc-400">{comp.reviews} reviews</span>
                                      {comp.rating !== "-" && (
                                        <span className="flex items-center gap-1 text-amber-400">
                                          <Star className="h-3 w-3 fill-current" />
                                          {comp.rating}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div>
                            <SectionHeader icon={Code} label="Implementation" />
                            <ul className="space-y-1.5">
                              {idea.implementation.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                                  <span className="text-amber-500/60 mt-1 shrink-0 text-xs">&#9656;</span>
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <SectionHeader icon={DollarSign} label="Monetization" />
                            <p className="text-sm text-zinc-300 leading-relaxed">{idea.monetization}</p>
                          </div>
                        </div>
                      </div>

                      {/* Pricing + Scoring row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-800">
                          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                            Pricing &middot; {PRICING_LABELS[idea.pricingTier]}
                          </div>
                          <div className="space-y-2.5">
                            {[
                              { label: "Weekly", value: idea.pricing.weekly },
                              { label: "Monthly", value: idea.pricing.monthly },
                              { label: "Annual", value: idea.pricing.annual },
                              { label: "Trial", value: idea.pricing.trial },
                            ].map((row) => (
                              <div key={row.label} className="flex justify-between text-sm">
                                <span className="text-zinc-500">{row.label}</span>
                                <span className="text-white font-medium">{row.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-800">
                          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Scoring</div>
                          <div className="space-y-2.5">
                            {[
                              { label: "Group", value: idea.group },
                              { label: "KW Score", value: `+${idea.kwScore}` },
                              { label: "Comp Score", value: `+${idea.compScore}` },
                              { label: "Comp Reviews", value: idea.compReviews.toLocaleString() },
                            ].map((row) => (
                              <div key={row.label} className="flex justify-between text-sm">
                                <span className="text-zinc-500">{row.label}</span>
                                <span className="text-white font-medium">{row.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Build Prompt */}
                      {idea.buildPrompt && !blurMode && (
                        <BuildPromptSection prompt={idea.buildPrompt} name={idea.name} />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500">No ideas match your filters.</p>
            <button onClick={clearFilters} className="mt-3 text-sm text-amber-500 hover:text-amber-400 transition-colors underline underline-offset-2">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


function SectionHeader({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <h4 className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
      <Icon className="h-3.5 w-3.5 text-amber-500/60" />
      {label}
    </h4>
  );
}

function BuildPromptSection({ prompt, name }: { prompt: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-emerald-950/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-400">Build Prompt</span>
          <span className="text-xs text-emerald-600">Ready to copy → paste into Claude Code</span>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-emerald-500 transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="px-4 pb-4">
          <div className="relative">
            <pre className="text-xs text-zinc-300 bg-zinc-900/80 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap font-mono leading-relaxed border border-zinc-800">
              {prompt}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy Prompt
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default IdeasBrowser;
