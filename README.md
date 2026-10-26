# Skill Ladder

Three daily practice coaches that run in the browser, plus a home page that shows your level and today's progress in each one.

**Live site:** https://justtylerss.github.io/skill-ladder/

| App | Address | Details |
|-----|---------|---------|
| Voice Ladder (singing) | [/voice/](https://justtylerss.github.io/skill-ladder/voice/) | [voice/README.md](voice/README.md) |
| Piano Ladder (piano) | [/piano/](https://justtylerss.github.io/skill-ladder/piano/) | [piano/README.md](piano/README.md) |
| Kitchen Ladder (cooking) | [/kitchen/](https://justtylerss.github.io/skill-ladder/kitchen/) | [kitchen/README.md](kitchen/README.md) |

The home page (`index.html`) reads each app's saved progress from the browser and shows your current streak, minutes, and steps for Voice and Piano, and cooks this week and dishes mastered for Kitchen. It only reads; each app saves and syncs its own log.

Each app is one self-contained `index.html` with no build step, served by GitHub Pages from `main` (root). Notes for Claude Code are in [CLAUDE.md](CLAUDE.md), [piano/CLAUDE.md](piano/CLAUDE.md), and [kitchen/CLAUDE.md](kitchen/CLAUDE.md).
