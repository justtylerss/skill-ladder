# Kitchen Ladder: notes for Claude Code

The whole app is `index.html` (HTML, CSS, and one JavaScript IIFE, no build step), served by GitHub Pages from `main`. `README.md` lists every feature from the user's side.

## Don't break saved progress
- Data lives in `localStorage['kitchen-ladder-v1']` (`{ days, profile, settingsUpdated }`) and syncs to a private gist file `kitchen-ladder-log.json`. Keep these names, and keep old fields readable (`normProfile` fills defaults).
- A day holds `cooks` (one entry per saved cook), `steps`, `checkin`, `active` (the cook in progress, so a reload resumes it), `ex` (library drills done), and best-of-day metrics.
- Shared with the other ladders on the same site: the Claude key (`voice-ladder-ai`) and the GitHub token (read from `voice-ladder-gh`, stored for this app in `kitchen-ladder-gh`). The Save menu on the home page writes the token into this key for every app; the in-app token form is kept but hidden, so `ghConnect` still works.
- `../tree.js` (loaded at the end of `<body>` with `data-app`) adds the Skill Tree bar under the header and watches this app's saved data for XP toasts and level-up confetti. It only reads app data, and the app works without it.
- Never hardcode the user's name, goals, or equipment. They're set in the app.

## Map of the script (search for the comment headers)
- `helpers`, `levels` (`LEVELS` with cook-count gates), `state`, `storage`, `device sync`.
- `skills` and `recipes`: `SKILLS`, then `RECIPES`. Ingredient fields: `q` (amount for `serves`), `u` (unit), `i` (item), `es` (Spanish), `h` (only shown at this heat level or above), `opt`. Step fields: `t`, `s` (timer seconds), `temp`, `cue`. Equipment tokens: `'stove'`, `'oven'`, `'airfryer'`, `'ricecooker'`, `'blender'`; `'a|b'` means either works.
- `timers, alarm, screen wake`, then `today's cook`: the five rungs (plan, prep, cook, taste, log). `logSave` updates dish mastery (3 cooks, last two rated 4+), skills, and metrics, then calls `checkLevelUp`.
- `kitchen library`: knife, eggs, taste quiz, ratios, heat, food safety, fridge improv, Spanish words, timers.
- `chef`: check-in, `recommend()`, `dayPlan()`, levels, kitchen check, progress charts, roadmap, `chefPrompt`.
- `Claude chef`, then `wiring` and `boot`. `?debug=1` exposes `window.__kl`.

## Food safety
Keep temperatures in line with USDA guidance: poultry 165°F (74°C); ground beef and pork 160°F (71°C); steaks, chops, and roasts 145°F (63°C) with a 3-minute rest; fish 145°F; leftovers reheated to 165°F. New recipes need exact amounts, a heat level for every step, times, and a "done" cue.

## Testing
Playwright: load the page at 390 px and desktop, light and dark, with zero console errors. Walk a full cook: plan, prep timer, every cook step, taste, then save. Check `P().dishes`, the day's `cooks`, and that the level moves up after two mastered dishes and enough cooks. Bump the "App version" line in the footer with each release.
