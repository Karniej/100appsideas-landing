"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FileText,
  BarChart3,
  Users,
  DollarSign,
  Layers,
  Rocket,
  Clock,
  ListOrdered,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    icon: FileText,
    title: "Detailed Write-Ups",
    description:
      "Every idea includes concept description, target keywords, implementation notes, and monetization strategy.",
  },
  {
    icon: BarChart3,
    title: "Verified Keyword Data",
    description:
      "Real popularity and difficulty scores verified via live Astro MCP API — not estimates or guesses.",
  },
  {
    icon: Users,
    title: "Competitor Analysis",
    description:
      "Top 5 App Store search results per keyword — actual names, review counts, and star ratings.",
  },
  {
    icon: DollarSign,
    title: "Per-App Pricing Tables",
    description:
      "Every app assigned to Premium, Standard, or Entry tier with exact weekly/monthly/annual prices and trial strategy.",
  },
  {
    icon: Layers,
    title: "Template Groups",
    description:
      "Apps grouped by shared codebase: Scorer, AI Camera, Calculator, Content, Interactive Fun, Timer, and Utility templates.",
  },
  {
    icon: Rocket,
    title: "Build Time Estimates",
    description:
      "Every app categorized: weekend builds (5 apps), week builds (28 apps), complex builds (7 apps).",
  },
  {
    icon: Clock,
    title: "Competition Assessment",
    description:
      "Each idea classified as WEAK (14), MODERATE (25), or STRONG (1) based on real competitor data.",
  },
  {
    icon: ListOrdered,
    title: "Ranked by Pop/Diff Ratio",
    description:
      "Sorted by opportunity — highest pop/diff ratio first. Matcha Finder leads at 7.00 (pop 63, diff 9).",
  },
  {
    icon: ShieldCheck,
    title: "Dead Ideas Flagged",
    description:
      "26 ideas with pop <= 5 were removed entirely. You only see the 40 that survived real-data validation.",
  },
];

const WhatsIncludedSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="whats-included" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-6">
            Everything You Get
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            More than a{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
              list of ideas.
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            You get the keyword numbers, the competitor names, the pricing
            math, the policy pass, and the build plan. Open it up and start
            shipping.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="inline-flex p-2.5 rounded-lg bg-zinc-800 mb-4">
                <item.icon className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsIncludedSection;
