"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[hsl(240,6%,7%)]/80 backdrop-blur-lg border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span className="font-heading font-bold text-lg">
              100 App Ideas
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#whats-included"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              What&apos;s Included
            </a>
            <a
              href="#preview"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Preview
            </a>
            <a
              href="#faq"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div className="hidden md:block">
            <a
              href="https://shipreactnative.com/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 transition-all"
            >
              Get Access via Ship RN
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-3"
          >
            <a
              href="#whats-included"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              What&apos;s Included
            </a>
            <a
              href="#preview"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preview
            </a>
            <a
              href="#faq"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="https://shipreactnative.com/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Access via Ship RN
            </a>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
