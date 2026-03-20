"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Check,
  Zap,
  FileText,
  BarChart3,
  Users,
  DollarSign,
  Layers,
  ListOrdered,
  Clock,
  Target,
} from "lucide-react";

const features = [
  { icon: FileText, text: "100 app ideas with full write-ups" },
  { icon: BarChart3, text: "Keyword popularity + difficulty scores" },
  { icon: Users, text: "Competitor names, review counts, and ratings" },
  { icon: DollarSign, text: "What to charge (weekly/monthly/annual) per app" },
  { icon: Target, text: "10+ target keywords per app" },
  { icon: Layers, text: "Implementation groups — build one, clone the next" },
  { icon: Clock, text: "Build time: weekend / week / complex / AI-required" },
  { icon: ListOrdered, text: "All 100 ranked by opportunity score" },
  {
    icon: Check,
    text: "Competition rated: EMPTY / WEAK / MODERATE / BORDERLINE",
  },
  { icon: Check, text: "Quick-win matrix — know what to build first" },
];

const PricingSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pricing" className="py-24 px-4 bg-background border-t border-zinc-800/50">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-6">
            One-Time Purchase
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get the complete{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
              research document
            </span>
          </h2>
          <p className="text-zinc-400 text-lg">
            One purchase. Instant access. No subscription.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl bg-zinc-900/50 border-2 border-amber-500/30 p-8 md:p-10 relative overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-[80px]"></div>

          <div className="relative">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl md:text-6xl font-heading font-bold">
                $29
              </span>
              <span className="text-zinc-500 text-lg">one-time</span>
            </div>
            <p className="text-zinc-400 mb-8">
              That&apos;s less than $0.29 per idea
            </p>

            <div className="space-y-3 mb-8">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-amber-500/10 shrink-0">
                    <feature.icon className="h-3.5 w-3.5 text-amber-500" />
                  </div>
                  <span className="text-sm text-zinc-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <a
              href="https://buy.stripe.com/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-8 py-4 rounded-full text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25"
            >
              <Zap className="h-5 w-5" />
              Get All 100 Ideas Now
            </a>

            <p className="text-center text-xs text-zinc-500 mt-4">
              Instant PDF delivery. Secure checkout via Stripe.
            </p>

            <p className="text-center text-xs text-zinc-400 mt-3">
              Plus access to the{" "}
              <a
                href="/ideas"
                className="text-amber-500 hover:text-amber-400 underline underline-offset-2 transition-colors"
              >
                interactive ideas browser
              </a>{" "}
              with filters, search, and full breakdowns.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-zinc-500">
            Built by{" "}
            <a
              href="https://silpho.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              Silpho
            </a>{" "}
            &mdash; indie iOS studio, 8+ apps on the App Store.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
