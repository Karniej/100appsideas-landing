import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-heading font-semibold">100 App Ideas</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a
              href="https://silpho.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              Built by Silpho
            </a>
            <a
              href="mailto:contact@silpho.com"
              className="hover:text-zinc-300 transition-colors"
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} 100 App Ideas. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
