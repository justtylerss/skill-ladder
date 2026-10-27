# Skill Ladder: notes for Claude Code

GitHub Pages serves `main` (root) at `justtylerss.github.io/skill-ladder/`. No build step anywhere.

## Layout
- `index.html`: the home page. One card per app, read-only from `localStorage`. Its CSS tokens and themes are copied from the apps; keep them in sync.
- `voice/`: Voice Ladder (`index.html`, [README.md](voice/README.md); it has no CLAUDE.md of its own).
- `piano/`: Piano Ladder ([README.md](piano/README.md), [CLAUDE.md](piano/CLAUDE.md)).
- `kitchen/`: Kitchen Ladder ([README.md](kitchen/README.md), [CLAUDE.md](kitchen/CLAUDE.md)).

Read the app's own CLAUDE.md and README before changing it. Links between apps are relative (`../voice/`, `../`), so they work locally and on Pages.

The old repos (`Voice-Ladder`, `piano-ladder`, `kitchen-ladder`) only hold redirect pages to these folders. Make app changes here, not there.

## Don't break saved progress
All three apps share one origin, so they share `localStorage`. Never rename these keys or gist files:
- Keys: `voice-ladder-v1`, `piano-ladder-v1`, `kitchen-ladder-v1`, `voice-ladder-ai`, `voice-ladder-gh`, `piano-ladder-gh`, `kitchen-ladder-gh`, `voice-ladder-hp`, `piano-ladder-hp`.
- Gist files: `voice-ladder-log.json`, `piano-ladder-log.json`, `kitchen-ladder-log.json`.

The home page depends on these shapes:
- Voice and Piano: `{ days: { 'YYYY-MM-DD': { steps: {...}, mins } }, profile: { level } }`. A day counts toward the streak with 3+ steps.
- Kitchen: `{ days: { 'YYYY-MM-DD': { cooks: [...], steps } }, profile: { level, dishes: { id: { cooks, ratings } } } }`. A dish is mastered at 3+ cooks with the last two ratings 4+. Weeks start Monday.
## Testing
Playwright: load every page at 390 px and desktop, light and dark, with zero console errors. Seed all three keys and check the home cards. Bump the "App version" line in an app's footer with each release.
