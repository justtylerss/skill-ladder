# Sense Quest: notes for Claude Code

The whole app is `index.html` (HTML, CSS, and one JavaScript IIFE, no build step), served by GitHub Pages from `main`. `README.md` lists every feature from the user's side. The CSS above `sense quest additions` is the shared Ladder stylesheet copied from Kitchen Ladder; storage, gist sync, trend charts, and the Claude coach are the same code as Chess Ladder.

## The evidence rule
Every exercise must have an entry in `EVIDENCE` (tag a/b/c, the headline numbers, a caveat, and citations with PubMed or DOI links), shown through a `data-ev` slot next to the exercise. Only add an exercise whose evidence you have checked against the paper's abstract or full text; give its limits in the caveat; never round numbers up or drop a population restriction (for example "65+" or "in patients"). Methods that don't work go in `MYTHS`. `selfTest()` fails if a slot has no evidence or a citation has no https link.

## Don't break saved progress
- Data lives in `localStorage['senses-ladder-v1']` (`{ days, profile, settingsUpdated }`) and syncs to a private gist file `senses-ladder-log.json`. Keep these names, and keep old fields readable (`normProfile` fills defaults).
- A day holds `steps` (sight, hearing, smell, balance, bonus), `checkin`, `jars` (rounds today), and best-of-day measures named in `METRIC_DEFS`.
- The profile keeps `first` (each measure's baseline) and `best` (`{ v, date }`), `tried` (sessions per sense), and progression state (`stanceStage`, `scentPairs`, `apNotes`, `taste`). Levels compare `best` with `first`; don't reset `first`.
- Shared with the other ladders: the Claude key (`voice-ladder-ai`) and the GitHub token (read from `voice-ladder-gh`, stored for this app in `senses-ladder-gh`). The home page's Save menu writes the token; the in-app form is kept but hidden. `../tree.js` adds the Skill Tree bar and only reads.

## Map of the script (search for the comment headers)
- `levels`, `SENSES`, `METRIC_DEFS` (unit, direction, sense), `evidence` (`EVIDENCE`, `MYTHS`), `state`, `storage`, `device sync`.
- `tools`: `makeStair` (2-down-1-up staircase on a ratio scale, threshold from the last 6 reversals), `makeStage` (canvas), `holdFor` (frame-accurate timing), `audio` (one AudioContext and a moderate master gain).
- `sight` (Speed Sight, Contrast Hunt with dithered Gabors), `hearing` (tones with fades, Pitch Duel, Sound Compass with an HRTF PannerNode, Perfect Pitch), `balance, touch, reaction`, `smell and taste`.
- `records, levels, coach`: `record()` is the one place an exercise logs its measure, keeps baseline and best, counts the sense, and marks the rung. Then `dayPlan`, rendering, roadmap, evidence chips, `coachPrompt`; `Claude coach`; `boot`.

## Testing
Open with `?debug=1` for `window.__sq` (`selfTest()`, the exercise states, `record`). Shorten runs by setting `__sq.SS.run.max` and so on after starting; use Playwright's clock for the timed exercises (jars, balance set, Quick Step, Quick Tap). Load at 390 px and desktop, light and dark, with zero console errors and no sideways scroll. Bump the "App version" line in the footer with each release.
