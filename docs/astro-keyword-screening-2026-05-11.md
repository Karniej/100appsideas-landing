# Astro Keyword Screening - 2026-05-11

Source: Astro MCP temporary app `Best Keywords All 68 Apps` (`appId` 110), the local opportunity cache in `data/keywords.db`, App Store search results, and the ASC app list.

Filter used:

- Popularity >= 20
- Difficulty <= 45
- Standalone app intent required

Screening result:

- 5,247 tracked keywords in the Astro temporary app
- 161 keywords matched the pop/diff filter
- 68 ideas are now listed on the landing site
- 10 ideas were added in this pass
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

Removed/replaced:

- `watch me grow` - metrics improved, but the App Store intent is mixed between a daycare camera brand, generic baby-growth wording, and novelty baby-generator apps. It is not clean enough for this list.

Rejected high-metric keyword patterns:

- Brand or official-client intent: `hudl`, `nanit`, `oura`, `gopro`, `metlife`, `expo go`, `withings scale`, `f45 training`, `pulsetto`, `progyny`.
- School, campus, or portal logins: `jcampus`, `skyward qmlativ`, `teachhub`, `parentvue`, `planning center`, `campus groups`, `plus portals`.
- Hardware companion apps that require proprietary devices: `bebird ear cleaning app`, `widex allure`, `dymo label`, `orbit b-hyve`, `freestyle libre`.
- Government or official-service lookups: `australian eta`, `caixa tem`, `ssa`, state wildlife agency names.
- Vague fragments or typo noise: `tea all`, `tea born`, `timer:`, `counter:`, `time:`, `wiget:`, bracketed keywords.
- IP-heavy entertainment brands: `haikyu!! fly high`, `ghostbusters`, `spiritfarer`, `baby shark`, `funko pop` unless the idea already has a clear non-infringing collector-tool angle.

Selection rule:

Good metrics were not enough. The keyword needed a clear job-to-be-done, a plausible independent app, and an ASO angle that does not depend on impersonating a brand or building an unofficial client for someone else's platform.

Ranking rule:

- Active unbuilt ideas rank first.
- Already shipped ideas rank after active opportunities.
- Dead ideas rank last.
- Within each bucket, ideas sort by `totalScore`, then higher popularity, then lower difficulty.
