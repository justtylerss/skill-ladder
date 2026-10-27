# Skill Tree

Four daily practice coaches that run in the browser, plus a home page that shows your level and today's progress in each one.

**Live site:** https://justtylerss.github.io/skill-ladder/

| App | Address | Details |
|-----|---------|---------|
| Voice Ladder (singing) | [/voice/](https://justtylerss.github.io/skill-ladder/voice/) | [voice/README.md](voice/README.md) |
| Piano Ladder (piano) | [/piano/](https://justtylerss.github.io/skill-ladder/piano/) | [piano/README.md](piano/README.md) |
| Kitchen Ladder (cooking) | [/kitchen/](https://justtylerss.github.io/skill-ladder/kitchen/) | [kitchen/README.md](kitchen/README.md) |
| Chess Ladder (chess) | [/chess/](https://justtylerss.github.io/skill-ladder/chess/) | [chess/README.md](chess/README.md) |

The home page (`index.html`) is your skill tree. Each app is a branch, and its five levels are nodes that light up as you reach them; the branches grow in when the page opens, and the level you're on now pulses. Everything you've practiced earns XP toward a player level (Seedling, Sprout, Sapling, and on to World tree), and 14 badges reward streaks, levels, and practicing several skills in one day. A new level or badge since your last visit gets a banner and confetti. Animations turn off when your device asks for reduced motion.

Below the tree, a card per app shows today's numbers: your current streak, minutes, and steps for Voice and Piano; cooks this week and dishes mastered for Kitchen; and your streak, steps, and puzzle rating for Chess. The home page only reads the apps' data; each app saves and syncs its own log.

Each app is one self-contained `index.html` with no build step, served by GitHub Pages from `main` (root). Notes for Claude Code are in [CLAUDE.md](CLAUDE.md), [piano/CLAUDE.md](piano/CLAUDE.md), [kitchen/CLAUDE.md](kitchen/CLAUDE.md), and [chess/CLAUDE.md](chess/CLAUDE.md).
