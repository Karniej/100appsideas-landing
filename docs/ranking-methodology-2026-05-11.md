# Ranking Methodology - 2026-05-11

Source: Astro MCP temporary app `100AppIdeas All 76 Keyword Audit` (`appId` 115).

The old ranking over-weighted pop/diff ratio. That made broad head terms look better than they are. `matcha` was the clearest failure case: pop 63 / diff 9 looked excellent, but the term has 232 App Store apps, only one qualifying tracked keyword in the idea cluster, and fuzzy search intent.

Current scoring:

- Active unbuilt ideas rank first.
- Shipped ideas rank after active ideas.
- Dead / monitor-only ideas rank last.
- Active ideas sort by stricter `totalScore`, then ranking-keyword popularity, then lower difficulty.

`totalScore` components:

- Ranking keyword score: normalized popularity, difficulty, Astro `appsCount`, and search-intent quality.
- Cluster depth: bonus for multiple qualifying tracked keywords attached to the same idea.
- Competition score: lower captured competitor review counts score better.
- Build friction: smaller builds get a small bonus.
- Risk penalty: regulated, official-portal, medical, and broad-head-term ideas lose points.

Intent scoring:

- `100`: exact app intent, such as `amino acid quiz`, `chess clock`, `check writer`, `id scanner`, `seating chart`, or `concrete calculator`.
- `70-89`: adjacent app intent, such as `gamesheet`, `elf alert`, or `never have i ever`.
- Below `70`: broad or fuzzy head terms, such as `matcha`, `harmonica`, `haiku`, `latin`, `forager`, or `pickleball`.

Top reranked active ideas:

1. Amino Acid Quiz Trainer - score 60, `amino acid quiz`, pop 54 / diff 15, apps 200, intent 100.
2. PSAT Score Calculator - score 60, `psat score`, pop 52 / diff 38, apps 154, intent 100.
3. Chess Clock - score 57, `chess clock`, pop 48 / diff 17, apps 221, intent 100.
4. Check Writer - score 53, `check writer`, pop 34 / diff 9, apps 214, intent 100.
5. ID Scanner Pro - score 52, `id scanner`, pop 53 / diff 15, apps 224, intent 100.

Matcha Finder is now #16 with score 44. It survives because exact competitors are weak, but it is no longer treated as the best opportunity.
