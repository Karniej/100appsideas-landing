# Astro Keyword Screening - 2026-05-11

Source: Astro MCP temporary app `Best Keywords All 68 Apps` (`appId` 110), Astro MCP temporary app `WORTHLESS` (`appId` 31), Astro MCP temporary app `MAKESENSE?` (`appId` 111), the local opportunity cache in `data/keywords.db`, App Store search results, and the ASC app list.

Filter used:

- Popularity > 20 for `MAKESENSE?`; popularity >= 20 for the earlier passes
- Difficulty < 45 for `MAKESENSE?`; difficulty <= 45 for the earlier passes
- Standalone app intent required

Screening result:

- 5,247 tracked keywords in `Best Keywords All 68 Apps`
- 161 keywords matched the pop/diff filter in `Best Keywords All 68 Apps`
- 7,857 tracked keywords in `WORTHLESS`
- 55 keywords matched the pop/diff filter in `WORTHLESS`
- 108 tracked keywords in `MAKESENSE?`
- 49 keywords matched the strict pop/diff filter in `MAKESENSE?`
- 265 total qualified Astro keywords screened
- 76 ideas are now listed on the landing site
- 47 ideas remain active after the consolidated keyword audit
- 28 ideas are dead / monitor-only after stale data was demoted
- 18 ideas were added in these passes
- 1 vague/brand-intent idea was replaced

Added ideas:

- Armocromia Color Analysis - `armocromia`, pop 42 / diff 23
- Amino Acid Quiz Trainer - `amino acid quiz`, pop 54 / diff 15
- Bartender Practice Game - `bartender game`, pop 26 / diff 23
- Cat Pain Score - `feline grimace scale`, pop 30 / diff 15
- Game Aim Converter - `game aim converter`, pop 41 / diff 23
- Rain Gauge Tracker - `raindrop virtual rain gauge`, pop 34 / diff 23
- Conduit Bend Calculator - `conduit bending`, pop 31 / diff 15
- Pickleball Drills Coach - `pickleball drills`, pop 26 / diff 23
- Tournament Bracket Maker - `bracket maker`, pop 49 / diff 41
- Line Memorizer - `line learner`, pop 28 / diff 37
- Feng Shui Room Planner - `feng shui`, pop 22 / diff 17
- Seating Chart Planner - `seating chart`, pop 23 / diff 15
- Jump Rope Counter - `jump rope`, pop 29 / diff 21
- Bunco Scorekeeper - `bunco`, pop 23 / diff 33
- Concrete Calculator - `concrete calculator`, pop 36 / diff 40
- Knot Tying Guide - `knot tying`, pop 26 / diff 42
- Square Footage Calculator - `square footage calculator`, pop 24 / diff 42
- Headache Tracker - `headache tracker`, pop 30 / diff 39

Removed/replaced:

- `watch me grow` - metrics improved, but the App Store intent is mixed between a daycare camera brand, generic baby-growth wording, and novelty baby-generator apps. It is not clean enough for this list.
- `WORTHLESS` temporary app - retained long enough to extract `feng shui`, then removed from Astro after screening.

Rejected high-metric keyword patterns:

- Brand or official-client intent: `hudl`, `nanit`, `oura`, `gopro`, `metlife`, `expo go`, `withings scale`, `f45 training`, `pulsetto`, `progyny`.
- School, campus, or portal logins: `jcampus`, `skyward qmlativ`, `teachhub`, `parentvue`, `planning center`, `campus groups`, `plus portals`.
- Hardware companion apps that require proprietary devices: `bebird ear cleaning app`, `widex allure`, `dymo label`, `orbit b-hyve`, `freestyle libre`.
- Government or official-service lookups: `australian eta`, `caixa tem`, `ssa`, state wildlife agency names.
- Vague fragments or typo noise: `tea all`, `tea born`, `timer:`, `counter:`, `time:`, `wiget:`, bracketed keywords.
- IP-heavy entertainment brands: `haikyu!! fly high`, `ghostbusters`, `spiritfarer`, `baby shark`, `funko pop` unless the idea already has a clear non-infringing collector-tool angle.
- MAKESENSE? rejects after competitor checks: `scale for grams` / `digital scale` because iPhone "scale" intent is misleading, `sobrief` and `fish verify` because they are brand searches, `skyjo` because it is IP-heavy, `height predictor` because the market is crowded with dubious growth claims, and duplicate ideas already represented by stronger entries.

Selection rule:

Good metrics were not enough. The keyword needed a clear job-to-be-done, a plausible independent app, and an ASO angle that does not depend on impersonating a brand or building an unofficial client for someone else's platform.

Ranking rule:

- Active unbuilt ideas rank first.
- Already shipped ideas rank after active opportunities.
- Dead ideas rank last.
- Within each bucket, ideas sort by `totalScore`, then higher popularity, then lower difficulty.
