# App Policy Master Guide

This document turns the March 2026 App Store / Google Play policy research into a reusable launch layer for the 100 app ideas dataset.

## Risk Buckets

- `low`: normal store-listing, privacy, and billing checks
- `review`: needs a policy pass before submission
- `high`: worth a manual compliance review before launch

## Reusable Policy Tags

### AI / Synthetic
- Name the AI provider in-app and in the privacy policy.
- Ask for explicit consent before sending photos, text, audio, or video to AI services.
- Label AI-generated results and avoid certainty claims in metadata.
- Add abuse controls for cloning, impersonation, or deceptive media output.

### Health / Medical
- Use informational language instead of diagnostic language.
- Add clear "not medical advice" and "not for emergencies" copy where relevant.
- Cite official or clinical sources for formulas, ranges, and recommendations.
- Escalate to a clinician or emergency services when the outcome could affect safety.

### Kids / Age
- Declare the intended audience and set age ratings from the harshest content path.
- Use parental gates for external links or account-style features in kid-directed apps.
- Add hard age-gating for mature, dating, or drinking-adjacent modes.
- Disable non-essential tracking and ads for child-directed experiences.

### UGC / Sharing
- Add reporting, blocking, filtering, and moderation contact paths before launch.
- Publish terms of service and community rules if users can share publicly.
- Answer age-rating questionnaires using the most extreme content users can create or encounter.
- Avoid advertising social features in store copy unless moderation tooling exists.

### Sensitive Data
- List sensitive inputs up front and request permissions only when the feature is used.
- Prefer on-device processing and state it clearly when true.
- Map store privacy declarations before adding SDKs or analytics.
- Document retention, deletion, and export options for stored user data.

### Payments
- Use platform billing for digital unlocks unless a documented exception applies.
- Show price, billing period, renewal cadence, trial length, and cancellation language on the paywall.
- Keep Restore Purchases easy to find.
- Treat US external billing rules as a special case, not the default path.

### Regulated
- Position the app as recordkeeping or reference unless you hold the required licenses.
- Avoid unsupported legal, identity, or financial advice claims.
- Add extra handling rules for stored IDs, financial records, or controlled substance logs.
- Route these ideas through manual compliance review before launch.

### IP / Licensing
- Confirm rights for media, datasets, sheet music, audio loops, and training data.
- Avoid competitor or trademark terms in keyword fields unless authorized.
- Document the license source for public-domain or purchased assets.
- Do not imply affiliation with brands, catalogs, or rights holders without proof.

### Safety / Accuracy
- Avoid absolute claims like "safe", "exact", or "legal to keep" without clear limits.
- Explain data freshness and coverage limits for rules, weather, GPS, and safety outputs.
- Tell users to verify with local authorities or professionals when the consequence is real-world harm.
- Keep screenshots and descriptions consistent with what the app can truly guarantee.

## Global Launch Adjustments

- Keep metadata, screenshots, and the live build aligned.
- Map every permission, SDK, and data flow into App Privacy and Data Safety before submission.
- Use platform billing for digital unlocks and keep Restore Purchases visible.
- Treat AI, health, finance, ID, and safety claims as review-heavy categories by default.
- Add age gating, moderation, or parental controls before marketing those features publicly.
- Run a manual compliance pass on any idea tagged `high`.

## Source Docs

- `APPLE_APP_STORE_POLICIES_2026.md`
- `GOOGLE_PLAY_POLICIES_2026.md`
- `APP_STORE_PUBLISHING_BEST_PRACTICES.md`
- `APP_STORE_POLICY_COMPARISON_2026.md`
- `APP-STORE-POLICY-FUTURE-TRENDS-2026.md`
