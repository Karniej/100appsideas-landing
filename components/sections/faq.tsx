"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I access the ideas?",
    answer:
      "After buying Ship React Native + Community, you'll get an access code in your welcome email. Enter it at 100appideas.com/ideas to browse all 100 ideas with filters, search, and full breakdowns — keyword data, competitor analysis, pricing, and implementation groups.",
  },
  {
    question: "How were the ideas validated?",
    answer:
      "I ran 65,000+ keywords through Astro (ASO tool) across 260+ App Store categories. Then I searched every idea on the actual App Store — checked the competitors, their review counts, their ratings. Anything with a dominant competitor (10K+ reviews) got cut. Two rounds of this. 24 ideas didn't make it.",
  },
  {
    question: "Are these ideas only for iOS?",
    answer:
      "The keyword data is iOS App Store specific. But the ideas themselves? Most work just as well on Android. The concepts, pricing models, and competition gaps don't care what platform you're on.",
  },
  {
    question: "Will someone else build these if I get access?",
    answer:
      "Honestly? Probably. But the App Store is huge and most people who read research docs never ship anything. There are 100 ideas here — even if 10 people pick from this list, they'd each choose different ones. And execution matters way more than the idea.",
  },
  {
    question: "How current is the data?",
    answer:
      "Research was done in March 2026. Keyword data and competitor counts shift over time, but low-competition niches don't suddenly get crowded overnight. These gaps usually stay open for months. The pricing strategies and build plans don't expire.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "Nope. There are SwiftUI implementation notes, but this is mostly a market research doc. Hire someone, use no-code, or build it yourself — the hard part is picking the right thing to build, and that's what this solves.",
  },
  {
    question: "What if I'm not satisfied?",
    answer:
      "Access to this research is bundled with Ship React Native + Community. Refund policy is governed by Ship React Native — see their terms at shipreactnative.com. Scroll up for the preview so you can see the level of detail before purchasing.",
  },
  {
    question: "Can I share this with my team?",
    answer:
      "Your access code is tied to your Ship React Native purchase and intended for personal use. For team licenses, email contact@shipreactnative.com.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="py-24 px-4 bg-background border-t border-zinc-800/50">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
              questions
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium text-zinc-200 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
