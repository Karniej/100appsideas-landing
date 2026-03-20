"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, ArrowRight } from "lucide-react";

const CtaSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 px-4 bg-background border-t border-zinc-800/50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Pick an idea.{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
              Ship it.
            </span>
          </h2>
          <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto">
            100 ideas, real numbers, no filler. The research is done &mdash; you
            just have to build.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25"
          >
            <Zap className="h-5 w-5" />
            Get All 100 Ideas &mdash; $29
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
