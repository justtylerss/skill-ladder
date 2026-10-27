# Sense Quest

Train sight, hearing, smell, taste, touch, and balance with methods that have research behind them. Every exercise carries a small evidence chip; tap it to see why the method works, the numbers, its caveats, and links to the papers.

**Live app:** https://justtylerss.github.io/skill-ladder/senses/ (part of [Skill Tree](https://justtylerss.github.io/skill-ladder/))

## Evidence chips

- 🟢 **Strong:** a meta-analysis or a large trial in a fitting group
- 🔵 **Good, with a caveat:** for example, proven in adults 65+ or in patients, less so in healthy younger adults
- 🟡 **Promising:** small or early studies

The methods and numbers come from a review of the research (PubMed abstracts and full texts). Methods with weak or no evidence are left out, and the library lists the popular ones that don't work.

## Today's quest

A daily quest across five rungs, with a quick check-in (10 or 20+ minutes, partner or solo):

| Rung | Exercises | Evidence |
|------|-----------|----------|
| 👁️ Sight | **Speed Sight**: a shape and a peripheral star flash, then a mask; the flash shortens as you improve. **Contrast Hunt**: faint striped patches (Gabor patches), three stripe widths, dithered below the screen's 8-bit step. | Speed: large RCT in adults 65+ (ACTIVE: 87% improved; 43% fewer at-fault crashes). Contrast: small studies (acuity 20/19.3 → 20/16.7). |
| 👂 Hearing | **Pitch Duel**: which of two tones is higher, in cents, with roving pitch and loudness. **Sound Compass**: 3D headphone bursts from 8 directions. | Lab studies (non-musicians matched musicians after 4–8 h); small RCT for localization. |
| 👃 Smell | **Scent Memory**: a memory game played by smell with household scents, scored by turns to clear. **Quick jars**: rose, lemon, eucalyptus, clove, 10 s each, twice a day. | RCT in healthy adults (discrimination 12.3 → 13.9 of 16); meta-analysis in patients for jars. |
| 🦶 Balance | **Steady Stance**: 4 stances × 2 sets × 30 s, three times a week, stepping up as you improve. **Quick Step**: step where the app calls. **Eyes-closed test** with published norms by age. | Meta-analysis of 25 RCTs (ES 0.73); falls −24% in 60+; step training halved falls in 60+. |
| ✋ Touch & taste | **Touch Lab** (with a partner): paper-clip tips along or across the fingertip, gap narrowing as you get it right. **Taste Ladder**: a halving dilution series with three cups. **Quick Tap**: reaction time against your own baseline. | Small lab studies; one small RCT for taste thresholds; reaction time is a measure only. |

Each quest is +10 XP on your Skill Tree, and your Perception attribute grows with it.

## Library

Perfect Pitch Project (name the note, from 3 notes up to 12), eye care habits (20-20-20, daylight), hearing care (WHO safe-listening limits), and myths: the Bates method, blue-light glasses, brain-training transfer, sound apps for tinnitus, coffee beans resetting your nose, the tongue map, the classic two-point test, and kinesiology tape.

## Levels

Dormant → Awakened → Attuned → Sharpened → Apex. You move up with training days (5, 15, 30, 60), by testing every sense, and by beating your own baseline by 10% or more on 2, 4, then 6 measures. Your first score on each measure is your baseline, since screens, headphones, and rooms differ.

## Safety

Quiet-conversation volume (there's a reference sound), balance work next to a counter, essential oils only in jars, and tastes you sip and spit. A sudden change in any sense is a reason to see a professional, not to train.

## Saving and sync

Everything is saved in the browser's local storage (`senses-ladder-v1`). Turn on **Cloud save** once per device in the Save menu on the [Skill Tree home page](../#save); the log syncs to a private gist (`senses-ladder-log.json`), merged by day.

## Files

`index.html` is the entire app: HTML, CSS, and JavaScript in one file, with no build step. `../tree.js` adds the Skill Tree bar.
