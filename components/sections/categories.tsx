"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Camera,
  Heart,
  Gamepad2,
  Trophy,
  Wrench,
  MessageSquare,
  Compass,
  Palette,
  Scissors,
  GraduationCap,
  Music,
  Trees,
  HardHat,
  Star,
  ListChecks,
  Snowflake,
  Sparkles,
} from "lucide-react";

const categories = [
  { icon: Camera, name: "AI Identifier Apps", count: 10 },
  { icon: Heart, name: "Health & Wellness", count: 9 },
  { icon: Gamepad2, name: "Party & Social Games", count: 6 },
  { icon: Trophy, name: "Sports Scorekeepers", count: 5 },
  { icon: Wrench, name: "Utility & Measurement", count: 14 },
  { icon: MessageSquare, name: "AI Text & Content", count: 3 },
  { icon: Compass, name: "Lifestyle & Philosophy", count: 1 },
  { icon: Palette, name: "Niche Interest", count: 7 },
  { icon: Scissors, name: "Tattoo & Body Art", count: 2 },
  { icon: GraduationCap, name: "Education & Study", count: 4 },
  { icon: Music, name: "Audio & Voice", count: 3 },
  { icon: Trees, name: "Outdoor & Nature", count: 5 },
  { icon: HardHat, name: "Trade & Professional", count: 4 },
  { icon: Star, name: "Collectibles & Gamified", count: 2 },
  { icon: ListChecks, name: "Productivity", count: 4 },
  { icon: Snowflake, name: "Seasonal & Holiday", count: 1 },
  { icon: Sparkles, name: "Wellness & Spiritual", count: 5 },
];

const CategoriesSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 px-4 bg-background border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Across{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
              18 categories.
            </span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Camera AI apps, party games, trade tools, scorekeepers &mdash;
            there&apos;s stuff in here for any kind of builder.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-sm"
            >
              <cat.icon className="h-4 w-4 text-amber-500" />
              <span className="text-zinc-300">{cat.name}</span>
              <span className="text-xs text-zinc-600 font-medium">
                {cat.count}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
