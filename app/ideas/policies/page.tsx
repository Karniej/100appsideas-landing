import Link from "next/link";
import { ArrowLeft, ShieldAlert, ShieldCheck } from "lucide-react";
import { ideas } from "@/lib/ideas-data";
import {
  POLICY_GUIDES,
  getHighestRiskIdeas,
  getPolicyCounts,
  getPolicyProfile,
} from "@/lib/policy-data";

export const metadata = {
  title: "App Policy Master Guide",
  description:
    "Reusable App Store and Google Play policy guidance mapped across the 100 app ideas dataset.",
};

const counts = getPolicyCounts(ideas);
const highestRiskIdeas = getHighestRiskIdeas(ideas);

const launchChecklist = [
  "Keep metadata, screenshots, and the live build perfectly aligned.",
  "Map every permission, SDK, and data flow into App Privacy and Data Safety before submission.",
  "Use platform billing for digital unlocks and keep Restore Purchases visible.",
  "Treat AI, health, finance, ID, and safety claims as review-heavy categories by default.",
  "Add age gating, moderation, or parental controls before marketing those features publicly.",
  "Run a manual compliance pass on any idea tagged High policy risk.",
];

export default function PolicyGuidePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 md:py-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to ideas
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Master policy guide
          </div>
        </div>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-6 md:p-8">
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">
            Policy coverage for the full app list.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
            This guide turns the app store research into a reusable launch layer for all 100 ideas. Each idea is scored into a low, review, or high policy bucket and tagged with the policy families most likely to matter.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
              <div className="text-sm text-red-300">High policy risk</div>
              <div className="mt-2 text-4xl font-heading font-bold text-red-200">{counts.high}</div>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
              <div className="text-sm text-amber-300">Needs review</div>
              <div className="mt-2 text-4xl font-heading font-bold text-amber-200">{counts.review}</div>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <div className="text-sm text-emerald-300">Standard path</div>
              <div className="mt-2 text-4xl font-heading font-bold text-emerald-200">{counts.low}</div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/40 p-6">
            <h2 className="font-heading text-2xl font-semibold text-white">Master adjustments</h2>
            <div className="mt-5 space-y-3">
              {launchChecklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <p className="text-sm leading-relaxed text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/40 p-6">
            <h2 className="font-heading text-2xl font-semibold text-white">Highest-risk ideas</h2>
            <div className="mt-5 space-y-3">
              {highestRiskIdeas.slice(0, 12).map((idea) => {
                const profile = getPolicyProfile(idea);
                return (
                  <div key={idea.slug} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">#{idea.rank} {idea.name}</div>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-400">{profile.summary}</p>
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-300">
                        <ShieldAlert className="h-3 w-3" />
                        High
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">Reusable policy tags</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
              These tags are the reusable framework behind the whole list. They map the store-policy docs to concrete product and listing adjustments.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {POLICY_GUIDES.map((guide) => (
              <article key={guide.tag} className="rounded-3xl border border-zinc-800 bg-zinc-950/40 p-6">
                <div className="inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                  {guide.shortLabel}
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-white">{guide.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{guide.summary}</p>

                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Relevant docs</div>
                  <div className="mt-2 space-y-2">
                    {guide.docs.map((doc) => (
                      <div key={doc} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-300">
                        {doc}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Add to the master doc</div>
                  <div className="mt-2 space-y-2">
                    {guide.adjustments.map((adjustment) => (
                      <div key={adjustment} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-300">
                        {adjustment}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
