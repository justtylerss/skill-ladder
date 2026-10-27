# Skill Tree: notes for Claude Code

The site is called Skill Tree; the repo and URL stay `skill-ladder`. GitHub Pages serves `main` (root) at `justtylerss.github.io/skill-ladder/`. No build step anywhere.

## Layout
- `tree.js`: the Skill Tree layer shared by every page. It derives XP, player level, and badges from the apps' saved data (never stored: 10 per step, 1 per practice minute in Voice and Piano, 30 per cook, 5 per first-try chess puzzle, 20 per chess game, 100 per level gained in an app; player level = floor(sqrt(XP / 40)) + 1), and owns the toasts and confetti. Each app loads it with `<script src="../tree.js" data-app="…" defer>` to get the Skill Tree bar and live "+XP" and level-up celebrations. Its own key is `skill-tree-seen` (`{ level, xp, badges }`, what has been celebrated). It also defines the RPG layer: `ATTRS` (each app powers one attribute, Willpower comes from practice days and the best streak; score = 8 + floor(sqrt(XP / 20))) and the class from the top two attributes. On app pages it also adds the game theme (`html.st-rpg`: gold seals and a "Quest complete" stamp on finished rungs, a pulse on the next rung, XP-style progress bars); it only adds classes and a stamp element, never touches app logic. Animations stop under `prefers-reduced-motion`. Keep the apps' order in `APPS` stable; the home tree and attributes follow it.
- `index.html`: the home page: the skill tree (four branches of five level nodes), badges, one card per app, and the Save menu. It only writes app keys from the Save menu: cloud save writes one GitHub token into every app's `*-ladder-gh` key (keeping the gist id when the token is unchanged), the Claude coach writes `voice-ladder-ai`, and loading a save file replaces the four progress keys after downloading a backup. Save files never include tokens or keys. Its CSS tokens and themes are copied from the apps; keep them in sync.
- `voice/`: Voice Ladder (`index.html`, [README.md](voice/README.md); it has no CLAUDE.md of its own).
- `piano/`: Piano Ladder ([README.md](piano/README.md), [CLAUDE.md](piano/CLAUDE.md)).
- `kitchen/`: Kitchen Ladder ([README.md](kitchen/README.md), [CLAUDE.md](kitchen/CLAUDE.md)).
- `chess/`: Chess Ladder ([README.md](chess/README.md), [CLAUDE.md](chess/CLAUDE.md)).
- `senses/`: Sense Quest ([README.md](senses/README.md), [CLAUDE.md](senses/CLAUDE.md)). Every exercise must carry checked evidence; see its CLAUDE.md.
- `stats/`: the character sheet (`index.html` only). Read-only: everything comes from `tree.js`.

Read the app's own CLAUDE.md and README before changing it. The apps share RPG wording: the daily routine is the "Quest log", its button "Complete quest" / "Quest complete ✓", the coach "Your mentor" with "Today's quest", the library "Training grounds", progress "Hero's journal", the roadmap "Quest map". Keep new text in that voice. Links between apps are relative (`../voice/`, `../`), so they work locally and on Pages.

The old repos (`Voice-Ladder`, `piano-ladder`, `kitchen-ladder`) only hold redirect pages to these folders. Make app changes here, not there.

## Don't break saved progress
All five apps share one origin, so they share `localStorage`. Never rename these keys or gist files:
- Keys: `voice-ladder-v1`, `piano-ladder-v1`, `kitchen-ladder-v1`, `chess-ladder-v1`, `senses-ladder-v1`, `voice-ladder-ai`, `voice-ladder-gh`, `piano-ladder-gh`, `kitchen-ladder-gh`, `chess-ladder-gh`, `senses-ladder-gh`, `voice-ladder-hp`, `piano-ladder-hp`.
- Gist files: `voice-ladder-log.json`, `piano-ladder-log.json`, `kitchen-ladder-log.json`, `chess-ladder-log.json`, `senses-ladder-log.json`.

The home page depends on these shapes:
- Voice and Piano: `{ days: { 'YYYY-MM-DD': { steps: {...}, mins } }, profile: { level } }`. A day counts toward the streak with 3+ steps.
- Kitchen: `{ days: { 'YYYY-MM-DD': { cooks: [...], steps } }, profile: { level, dishes: { id: { cooks, ratings } } } }`. A dish is mastered at 3+ cooks with the last two ratings 4+. Weeks start Monday.
- Chess: `{ days: { 'YYYY-MM-DD': { steps: {...}, pz: { res: {...} } } }, profile: { level, rating } }`. Same 3-step streak as Voice and Piano; a day with an answered puzzle counts as practiced.
- Senses: `{ days: { 'YYYY-MM-DD': { steps: {...} } }, profile: { level, tried: { sense: n } } }`. Same 3-step streak.

## Testing
Playwright: load every page at 390 px and desktop, light and dark, with zero console errors. Seed the app keys and check the home cards, XP, lit nodes, badges, the Skill Tree bar in each app, the Save menu (mock api.github.com and api.anthropic.com), and save-file download and load (use `reducedMotion: 'reduce'` so numbers are final at once), and that a changed `skill-tree-seen` triggers the level-up banner. Bump the "App version" line in an app's footer with each release.
