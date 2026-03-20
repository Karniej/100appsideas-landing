"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";

const proofPoints = [
  "I have 8+ apps on the App Store — this is the research I do before building",
  "All keyword data pulled from Astro, a professional ASO tool",
  "Every competitor checked by hand against live App Store search results",
  "Started with 125 ideas, killed 24 that didn't hold up (12 for iOS limits, 12 for crowded keywords)",
  "12 borderline apps left in but flagged — you'll know exactly what the risks are",
  "Pricing tables for every app: which tier, what to charge, and why",
  "Implementation groups so you can build one app and quickly ship the next 5",
];

const SocialProofSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 px-4 bg-background border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-6">
              Why Trust This Research
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How I{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                found these
              </span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              I didn&apos;t brainstorm these in a Google Doc. I ran 65K+
              keywords through ASO tools, checked every competitor on the App
              Store, and killed anything that didn&apos;t have a real gap.
            </p>
            <div className="space-y-4">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-500/10">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                  <span className="text-zinc-300 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-4xl font-heading font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text mb-2">
                65,000+
              </div>
              <div className="text-zinc-400 text-sm">
                App Store keywords run through Astro across 260+ categories
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-2xl font-heading font-bold text-emerald-400 mb-1">
                  260+
                </div>
                <div className="text-zinc-400 text-xs">
                  Categories searched
                </div>
              </div>
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-2xl font-heading font-bold text-emerald-400 mb-1">
                  21
                </div>
                <div className="text-zinc-400 text-xs">
                  Zero-competition markets
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-2xl font-heading font-bold text-amber-400 mb-1">
                  13
                </div>
                <div className="text-zinc-400 text-xs">Weekend builds</div>
              </div>
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-2xl font-heading font-bold text-amber-400 mb-1">
                  $29
                </div>
                <div className="text-zinc-400 text-xs">
                  One-time purchase
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
