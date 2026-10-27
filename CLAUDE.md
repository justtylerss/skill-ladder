# Skill Tree: notes for Claude Code

The site is called Skill Tree; the repo and URL stay `skill-ladder`. GitHub Pages serves `main` (root) at `justtylerss.github.io/skill-ladder/`. No build step anywhere.

## Layout
- `index.html`: the home page: the skill tree (player level and XP, four branches of five level nodes, 14 badges) and one card per app. It reads the apps' `localStorage` and never writes it; its only key is `skill-tree-seen` (`{ level, xp, badges }`, what it last celebrated). XP is derived, never stored: 10 per step, 1 per practice minute (Voice, Piano), 30 per cook, 5 per first-try chess puzzle, 20 per chess game, 100 per level gained in an app; player level = floor(sqrt(XP / 40)) + 1. Animations use the Web Animations API and CSS, and stop under `prefers-reduced-motion`. Its CSS tokens and themes are copied from the apps; keep them in sync.
- `voice/`: Voice Ladder (`index.html`, [README.md](voice/README.md); it has no CLAUDE.md of its own).
- `piano/`: Piano Ladder ([README.md](piano/README.md), [CLAUDE.md](piano/CLAUDE.md)).
- `kitchen/`: Kitchen Ladder ([README.md](kitchen/README.md), [CLAUDE.md](kitchen/CLAUDE.md)).
- `chess/`: Chess Ladder ([README.md](chess/README.md), [CLAUDE.md](chess/CLAUDE.md)).

Read the app's own CLAUDE.md and README before changing it. Links between apps are relative (`../voice/`, `../`), so they work locally and on Pages.

The old repos (`Voice-Ladder`, `piano-ladder`, `kitchen-ladder`) only hold redirect pages to these folders. Make app changes here, not there.

## Don't break saved progress
All four apps share one origin, so they share `localStorage`. Never rename these keys or gist files:
- Keys: `voice-ladder-v1`, `piano-ladder-v1`, `kitchen-ladder-v1`, `chess-ladder-v1`, `voice-ladder-ai`, `voice-ladder-gh`, `piano-ladder-gh`, `kitchen-ladder-gh`, `chess-ladder-gh`, `voice-ladder-hp`, `piano-ladder-hp`.
- Gist files: `voice-ladder-log.json`, `piano-ladder-log.json`, `kitchen-ladder-log.json`, `chess-ladder-log.json`.

The home page depends on these shapes:
- Voice and Piano: `{ days: { 'YYYY-MM-DD': { steps: {...}, mins } }, profile: { level } }`. A day counts toward the streak with 3+ steps.
- Kitchen: `{ days: { 'YYYY-MM-DD': { cooks: [...], steps } }, profile: { level, dishes: { id: { cooks, ratings } } } }`. A dish is mastered at 3+ cooks with the last two ratings 4+. Weeks start Monday.
- Chess: `{ days: { 'YYYY-MM-DD': { steps: {...}, pz: { res: {...} } } }, profile: { level, rating } }`. Same 3-step streak as Voice and Piano; a day with an answered puzzle counts as practiced.

## Testing
Playwright: load every page at 390 px and desktop, light and dark, with zero console errors. Seed all four keys and check the home cards, XP, lit nodes, and badges (use `reducedMotion: 'reduce'` so numbers are final at once), and that a changed `skill-tree-seen` triggers the level-up banner. Bump the "App version" line in an app's footer with each release.
