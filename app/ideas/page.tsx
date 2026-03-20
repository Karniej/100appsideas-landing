import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PasswordGate from "@/components/ideas/password-gate";
import IdeasBrowser from "@/components/ideas/ideas-browser";
import { ideas } from "@/lib/ideas-data";

export const metadata = {
  title: "100 App Ideas Browser",
  description: "Browse all 100 app ideas with filters, search, and detailed breakdowns.",
};

export default function IdeasPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="font-heading text-lg font-bold">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
              100 App Ideas
            </span>
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <PasswordGate>
          <IdeasBrowser ideas={ideas} />
        </PasswordGate>
      </div>
    </main>
  );
}
