# Piano Ladder: notes for Claude Code

The whole app is `index.html` (HTML, CSS, and one JavaScript IIFE, no build step), served by GitHub Pages from `main`. `README.md` lists every feature from the user's side.

## Don't break saved progress
- Practice data lives in `localStorage['piano-ladder-v1']` (`{ days, profile, settingsUpdated }`) and syncs to a private gist file `piano-ladder-log.json`. Keep these names and keep old fields readable (`normProfile` fills defaults).
- Shared with Voice Ladder on the same site: the Claude key (`voice-ladder-ai`), the GitHub token (read from `voice-ladder-gh`, stored for this app in `piano-ladder-gh`), and the voice range (read-only from `voice-ladder-v1`). The Save menu on the home page writes the token into this key for every app; the in-app token form is kept but hidden, so `ghConnect` still works.
- `../tree.js` (loaded at the end of `<body>` with `data-app`) adds the Skill Tree bar under the header and watches this app's saved data for XP toasts and level-up confetti. It only reads app data, and the app works without it.
- Never hardcode the user's name, goals, or range. They're entered in the app.

## Map of the script (search for the comment headers)
- `helpers` / `music theory` / `levels` / `state` / `storage` / `device sync`: data, spelling (`spell`, `noteName`), chords (`parseChord`, `voicing`), `LEVELS`.
- `audio out`: `pianoNote` synth, `Metro` (look-ahead metronome; beat b sounds at `Metro.beatTime(b)`), `audioBusyUntil` (mic ignores the app's own piano unless headphones).
- `listening`: mic pipeline. Onsets come from a jump in the last ~10 ms of energy (lowpassed at 1.7 kHz so the 5.6–7 kHz metronome clicks don't trigger it), pitch from YIN, and chords from a chroma vector (8192-point FFT) matched against harmonic templates (`chordMatch`). MIDI and on-screen keys emit the same event: `{ t, midi, pcs, chroma, src }`. Latency per source is in `P().lat` and set by the Timing check.
- `on-screen keyboard` (`makeKeyboard`) and `sheet music` (`renderScore`, SVG; glyph outlines in `GLYPH` come from Noto Music, OFL).
- `technique patterns`, `progressions`, `songs` (public-domain melodies as `"E4/1 D4/1 | C4/2"` strings).
- `the practice runner` (`makeRunner`): wait mode or timed mode against `Metro`; every drill uses it.
- Daily steps (`do`…`sol`), then the `practice library`, then `teacher` (check-in, practice time, levels and gates, level check, session plan, progress charts, roadmap, `coachPrompt`), `Claude teacher`, `wiring`, `boot`.

## Testing
Playwright with Chromium's fake mic. Two ways to feed it piano sound:
1. Override `AnalyserNode.prototype.getFloatTimeDomainData` and `getFloatFrequencyData` with synthesized notes (decaying harmonics).
2. A real WAV via `--use-file-for-fake-audio-capture=file.wav` to exercise the actual filters and FFT.

Open the page with `?debug=1` to expose `window.__pl` (`Metro`, `Hub`, `P`, `state`, `RUNNERS`, `ac()`), so a test bot can play each runner item at its beat time. Check phone (390 px) and desktop widths, light and dark.

After pushing, hard-refresh or add `?v=N` to the URL, since Pages caches for about 10 minutes. Bump the "App version" line in the footer with each release.
