# Chess Ladder: notes for Claude Code

The whole app is `index.html` (HTML, CSS, and one JavaScript IIFE, no build step), served by GitHub Pages from `main`. `README.md` lists every feature from the user's side. The CSS above `chess additions` is the shared Ladder stylesheet copied from Kitchen Ladder.

## Don't break saved progress
- Data lives in `localStorage['chess-ladder-v1']` (`{ days, profile, settingsUpdated }`) and syncs to a private gist file `chess-ladder-log.json`. Keep these names, and keep old fields readable (`normProfile` fills defaults).
- A day holds `steps` (see, tactics, opening, endgame, play), `pz` (`ids` assigned today, `res` first-try scores 1 / 0.5 / 0, `fin`), `games` (finished games with SAN and the review's blunder count), `active` (the game in progress as UCI moves, so a reload resumes it), `checkin`, `ex` (library drills), and best-of-day metrics (`rating`, `pzAcc`, `vision`, `notation`, `rush`, `blunders`).
- The profile keeps `rating`, per-puzzle results in `puzzles` keyed by puzzle id, `themes`, `openings` (clean-run days), `endgames` (wins), and `wins` by computer level.
- Puzzle ids are a hash of the FEN. Never edit the FEN of an existing puzzle; add new ones instead.
- Shared with the other ladders on the same site: the Claude key (`voice-ladder-ai`) and the GitHub token (read from `voice-ladder-gh`, stored for this app in `chess-ladder-gh`). The Save menu on the home page writes the token into this key for every app; the in-app token form is kept but hidden, so `ghConnect` still works.
- `../tree.js` (loaded at the end of `<body>` with `data-app`) adds the Skill Tree bar under the header and watches this app's saved data for XP toasts and level-up confetti. It only reads app data, and the app works without it.

## Map of the script (search for the comment headers)
- `helpers`, then the chess core between `chess rules` and `end of chess core`: a 0x88 board, moves packed into one int, FEN, SAN, `legalMoves`, `gameStatus`, `perft`, then `computer player` (material plus piece-square tables and a mop-up term, alpha-beta with quiescence and check extensions, `think` and `scoreRoot`). The core has no DOM access, so it can be pulled out between its markers and run in Node.
- `puzzles` (`PUZZLES` as `fen|uci line|rating|themes` strings), `openings` (SAN plus one idea per move), `endgames`, `checkmate patterns`, `levels` (`LEVELS` gates: puzzle rating, a win against the computer at your level, practice days) and `STRENGTH` (computer levels 1–5).
- `state`, `storage`, `device sync` (same as the other ladders).
- `board` (`makeBoard`: one component for every board; tap a piece, then a square, or arrow keys and Enter), then the five rungs, the shared puzzle runner (`makeRunner`), and the `chess library`.
- `coach` (check-in, `dayPlan`, focus, levels, level check, progress charts, roadmap, `coachPrompt`), `Claude coach`, `wiring`, `boot`.

## Puzzles
The puzzles come from engine self-play: a position is kept when the side to move has exactly one winning move (best at least 2.5 pawns better than the next move, which isn't winning), or a forced mate, and the line goes on while each later move by the solver is also the only good one. Each was then re-checked with a depth-4 search. Ratings are estimates: the shallowest search depth that finds the first move, plus 150 per extra solver move and 150 for a quiet first move. The set tops out near 1450 because self-play tactics are shallow; if players outgrow it, add deeper puzzles (found only at depth 3+) rather than raising ratings. The generator isn't part of the repo; any new puzzle must pass `selfTest()`.

## Testing
Open the page with `?debug=1` to expose `window.__cl`. `window.__cl.selfTest()` must return `{ ok: true }`: it runs perft on five standard positions and replays every puzzle, opening, endgame, and checkmate pattern. Drive boards in Playwright by clicking squares (`button.sq[aria-label^="e4"]`). Load the page at 390 px and desktop, light and dark, with zero console errors. Bump the "App version" line in the footer with each release.
