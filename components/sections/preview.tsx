"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Lock,
  TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react";

type PreviewIdea = {
  rank: number;
  name: string;
  pop: number;
  diff: number;
  competitor: string;
  competitorReviews: string;
  competitorRating: string;
  category: string;
  status: string;
  blurred?: boolean;
};

const previewIdeas: PreviewIdea[] = [
  {
    rank: 1,
    name: "Chess Clock",
    pop: 48,
    diff: 21,
    competitor: "Chess Clock by Chess.com",
    competitorReviews: "334",
    competitorRating: "4.6",
    category: "Board",
    status: "STRONG",
  },
  {
    rank: 2,
    name: "Mini Golf Scorecard",
    pop: 48,
    diff: 39,
    competitor: "Mini-Golf Score Card",
    competitorReviews: "3,225",
    competitorRating: "4.8",
    category: "Sports",
    status: "MODERATE",
  },
  {
    rank: 3,
    name: "Conduit Bend Calculator",
    pop: 56,
    diff: 21,
    competitor: "QuickBend: Conduit Bending",
    competitorReviews: "3,706",
    competitorRating: "4.8",
    category: "Utilities",
    status: "MODERATE",
  },
  {
    rank: 4,
    name: "Social Security Calculator",
    pop: 54,
    diff: 34,
    competitor: "Social Security Optimizer:Boss",
    competitorReviews: "1,442",
    competitorRating: "4.2",
    category: "Finance",
    status: "MODERATE",
  },
  {
    rank: 5,
    name: "Amino Acid Quiz Trainer",
    pop: 50,
    diff: 15,
    competitor: "Amino Acid Quiz",
    competitorReviews: "920",
    competitorRating: "4.9",
    category: "Education",
    status: "STRONG",
  },
  {
    rank: 6,
    name: "**************",
    pop: 0,
    diff: 0,
    competitor: "***********",
    competitorReviews: "**",
    competitorRating: "***",
    category: "Board",
    status: "MODERATE",
    blurred: true,
  },
  {
    rank: 7,
    name: "**************",
    pop: 0,
    diff: 0,
    competitor: "***********",
    competitorReviews: "***",
    competitorRating: "***",
    category: "Education",
    status: "MODERATE",
    blurred: true,
  },
  {
    rank: 8,
    name: "**************",
    pop: 0,
    diff: 0,
    competitor: "***********",
    competitorReviews: "**",
    competitorRating: "***",
    category: "Sports",
    status: "MODERATE",
    blurred: true,
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "SHIPPED":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "WEAK":
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    case "MODERATE":
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    case "STRONG":
      return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    case "DEAD":
      return "text-red-400 bg-red-500/10 border-red-500/20";
    default:
      return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
  }
}

const PreviewSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="preview" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-6">
            Sneak Peek
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Preview the{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
              top ranked ideas
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            These are the top 5 by stricter opportunity score. All 76 validated ideas have write-ups,
            real Astro keyword data, competitor analysis, and pricing.
          </p>
        </motion.div>

        {/* Ranked table preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-zinc-800 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-zinc-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    App Idea
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Volume
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Diff
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:table-cell">
                    Top Competitor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider hidden sm:table-cell">
                    Reviews
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {previewIdeas.map((idea) => (
                  <tr
                    key={idea.rank}
                    className={`${
                      idea.blurred ? "select-none" : ""
                    } hover:bg-zinc-900/30 transition-colors`}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-zinc-300">
                      {idea.rank}
                    </td>
                    <td className="px-4 py-4">
                      {idea.blurred ? (
                        <span className="text-sm text-zinc-600 blur-sm">
                          Hidden App Idea Name
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-white">
                          {idea.name}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {idea.blurred ? (
                        <span className="text-sm text-zinc-600 blur-sm">
                          00
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-sm text-zinc-300">
                            {idea.pop}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {idea.blurred ? (
                        <span className="text-sm text-zinc-600 blur-sm">
                          00
                        </span>
                      ) : (
                        <span className="text-sm text-zinc-300">
                          {idea.diff}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      {idea.blurred ? (
                        <span className="text-sm text-zinc-600 blur-sm">
                          Hidden Competitor
                        </span>
                      ) : (
                        <span className="text-sm text-zinc-400">
                          {idea.competitor}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      {idea.blurred ? (
                        <span className="text-sm text-zinc-600 blur-sm">
                          000
                        </span>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-zinc-300">
                            {idea.competitorReviews}
                          </span>
                          {idea.competitorRating !== "-" && (
                            <span className="flex items-center gap-0.5 text-xs text-zinc-500">
                              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                              {idea.competitorRating}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {idea.blurred ? (
                        <span className="text-sm text-zinc-600 blur-sm">
                          HIDDEN
                        </span>
                      ) : (
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(
                            idea.status
                          )}`}
                        >
                          {idea.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Locked overlay */}
          <div className="relative py-12 bg-gradient-to-t from-black via-black/95 to-transparent">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 rounded-full bg-zinc-800 border border-zinc-700">
                <Lock className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="text-zinc-400 text-sm">
                71 more validated ideas with full details in the complete document
              </p>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 transition-all"
              >
                Unlock All 76 Ideas
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Sample idea card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 md:p-8 rounded-xl bg-zinc-900/50 border border-zinc-800"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              #1 Ranked &mdash; Score 61
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              EXACT APP INTENT
            </span>
          </div>
          <h3 className="font-heading text-2xl font-bold mb-2">
            Chess Clock
          </h3>
          <p className="text-zinc-400 mb-6">
            Minimalist chess and board-game timer with Fischer, Bronstein, and
            increment controls. Fast one-handed handling, haptics, presets, and
            a clean tournament mode for club nights.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 rounded-lg bg-zinc-800/50">
              <div className="text-xs text-zinc-500 mb-1">Volume</div>
              <div className="text-lg font-semibold">48</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-800/50">
              <div className="text-xs text-zinc-500 mb-1">Difficulty</div>
              <div className="text-lg font-semibold text-emerald-400">21</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-800/50">
              <div className="text-xs text-zinc-500 mb-1">
                Top Competitor Reviews
              </div>
              <div className="text-lg font-semibold text-amber-400">334</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-800/50">
              <div className="text-xs text-zinc-500 mb-1">Build Time</div>
              <div className="text-lg font-semibold">3-7 days</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "chess clock",
              "chess timer",
              "game timer",
              "board game timer",
              "blitz timer",
              "tournament clock",
            ].map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-full text-xs bg-zinc-800 text-zinc-400 border border-zinc-700"
              >
                {kw}
              </span>
            ))}
          </div>

          <p className="text-sm text-zinc-500 italic">
            That&apos;s what every idea looks like &mdash; real Astro-verified keywords,
            actual competitors, build notes, and pricing. All 76 validated ideas.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PreviewSection;
