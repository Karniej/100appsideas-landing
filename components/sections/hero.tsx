"use client";

import { motion } from "framer-motion";
import {
  Search,
  BarChart3,
  Target,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react";
import { MediaVideo } from "@/components/ui/media";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background px-4 pt-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <MediaVideo
          src="/assets/videos/animation.mp4"
          autoPlay
          loop
          muted
          controls={false}
          objectFit="cover"
          playbackRate={0.8}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      <div className="absolute inset-0 grid-pattern opacity-20 z-[1]"></div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] z-[1]"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] z-[1]"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Search className="h-3 w-3" />
              118 ideas researched, 78 dropped &mdash; 40 verified with real Astro data
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            48 Validated App Ideas With
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
              Real App Store Data
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Every keyword verified via live{" "}
            <a href="https://tryastro.app" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">Astro</a>
            {" "}MCP API. 250+ keywords checked, 26 dead ideas removed, 5 already shipped.
            Real pop/diff scores, real competitors, real review counts &mdash; not vibes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://shipreactnative.com/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25"
            >
              <Zap className="h-4 w-4" />
              Get Access via Ship RN
            </a>
            <a
              href="#preview"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-medium border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all"
            >
              See Preview
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-500" />
              <span className="text-zinc-300">Ranked by opportunity</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-500" />
              <span className="text-zinc-300">Real competitor data</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-amber-500" />
              <span className="text-zinc-300">Astro MCP verified</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
            <div className="inline-flex p-3 rounded-lg bg-amber-500/10 mb-4">
              <Search className="h-6 w-6 text-amber-500" />
            </div>
            <div className="text-3xl font-heading font-bold mb-1">250+</div>
            <p className="text-sm text-zinc-400">
              Keywords verified via live Astro MCP API
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
            <div className="inline-flex p-3 rounded-lg bg-amber-500/10 mb-4">
              <Target className="h-6 w-6 text-amber-500" />
            </div>
            <div className="text-3xl font-heading font-bold mb-1">5</div>
            <p className="text-sm text-zinc-400">
              Ideas already shipped to the App Store
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
            <div className="inline-flex p-3 rounded-lg bg-amber-500/10 mb-4">
              <BarChart3 className="h-6 w-6 text-amber-500" />
            </div>
            <div className="text-3xl font-heading font-bold mb-1">26</div>
            <p className="text-sm text-zinc-400">
              Dead ideas removed (pop &le; 5, no search volume)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
