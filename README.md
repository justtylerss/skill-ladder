# Skill Tree

An RPG for getting better at things: five practice apps that run in the browser, a home page that grows a skill tree from your progress, and a character sheet with your attributes, class, and records.

**Live site:** https://justtylerss.github.io/skill-ladder/

| App | Address | Details |
|-----|---------|---------|
| Voice Ladder (singing) | [/voice/](https://justtylerss.github.io/skill-ladder/voice/) | [voice/README.md](voice/README.md) |
| Piano Ladder (piano) | [/piano/](https://justtylerss.github.io/skill-ladder/piano/) | [piano/README.md](piano/README.md) |
| Kitchen Ladder (cooking) | [/kitchen/](https://justtylerss.github.io/skill-ladder/kitchen/) | [kitchen/README.md](kitchen/README.md) |
| Chess Ladder (chess) | [/chess/](https://justtylerss.github.io/skill-ladder/chess/) | [chess/README.md](chess/README.md) |
| Sense Quest (sight, hearing, smell, taste, touch, balance) | [/senses/](https://justtylerss.github.io/skill-ladder/senses/) | [senses/README.md](senses/README.md) |
| Character sheet | [/stats/](https://justtylerss.github.io/skill-ladder/stats/) | attributes, class, lifetime totals, XP chart, heatmap, records, achievements |

The home page (`index.html`) is your skill tree. Each app is a branch, and its five levels are nodes that light up as you reach them; the branches grow in when the page opens, and the level you're on now pulses. Everything you've practiced earns XP toward a player level (Seedling, Sprout, Sapling, and on to World tree), and 15 achievements reward streaks, levels, and practicing several skills in one day. Each app powers an attribute (Voice → Charisma, Piano → Dexterity, Kitchen → Constitution, Chess → Intellect, Senses → Perception, plus Willpower from consistency), and your two highest attributes set your class, like Bard of Keys. A new level or achievement since your last visit gets a banner and confetti. Animations turn off when your device asks for reduced motion.

Every app has a Skill Tree bar under its header with your player level, XP, and that app's branch, so finishing a step pops "+XP" and a level-up throws confetti right where you are.

The **Save menu** on the home page holds your keys and saves: turn on cloud save once per device with one GitHub token and every ladder syncs to its own private gist; connect one Claude API key for the coach in every ladder; or download all your progress as a save file and load it back (keys are never in the file).

Below the tree, a card per app shows today's numbers: your current streak, minutes, and steps for Voice and Piano; cooks this week and dishes mastered for Kitchen; your streak, steps, and puzzle rating for Chess; and your streak, steps, and training days for Sense Quest. Outside the Save menu, the home page only reads the apps' data; each app saves and syncs its own log.

Each app is one `index.html` with no build step, served by GitHub Pages from `main` (root). They share `tree.js` for the Skill Tree bar and celebrations, and still work without it. Notes for Claude Code are in [CLAUDE.md](CLAUDE.md), [piano/CLAUDE.md](piano/CLAUDE.md), [kitchen/CLAUDE.md](kitchen/CLAUDE.md), [chess/CLAUDE.md](chess/CLAUDE.md), and [senses/CLAUDE.md](senses/CLAUDE.md).
