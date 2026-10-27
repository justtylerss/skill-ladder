# Voice Ladder

A daily singing coach that runs in the browser. It gives you a 15–45 minute session plan, live mic feedback on every exercise, and a coach that adapts to how you actually sing.

**Live app:** https://justtylerss.github.io/skill-ladder/voice/ (part of [Skill Tree](https://justtylerss.github.io/skill-ladder/))

## Today's session

Each day starts with a quick **check-in** (how your voice feels, your energy level), then a session plan in a coach's format:

- **Today's focus:** the weakest area, in priority order: vocal health > pitch accuracy > breath support > register blending > range > style
- **Since last time:** the biggest real improvement and any real regression, with numbers (for example, "your average miss on E3 went from 38¢ to 22¢")
- **Session:** warm-up, technique aimed at today's focus, application (a song), and cool-down, each with notes, minutes, and what to listen for
- **Song of the day** with its range in your key, flagged if it goes above your comfortable top
- **Next milestone:** a specific, measurable target

A tired voice or low energy gets a lighter 15-minute session. Hoarseness or pain means no singing that day: mic exercises lock, and the plan switches to ear training, silent breath work, and active listening. Lasting hoarseness, pain, or a sudden range drop brings up advice to rest and see an ENT or laryngologist.

**Practice time:** recommended 30 minutes and a 45-minute daily max to start. The max grows 5 minutes for every 10 practice days in a row with no tired or hoarse check-ins, up to 60. Mic exercises pause once you reach the max.

## Claude coach

Connect a Claude API key once per device (Max plans include monthly API credits: claim them on claude.ai under Settings → Billing → API credits, then create a key in the Claude Console). Claude then:

- **Writes today's plan** from your coach prompt and live data, in the same format
- **Explains any result:** every exercise gets an "Ask Claude about this" button that sends the note-by-note numbers (cents off, scoops, wobble, timing) and returns what happened plus one fix
- **Answers questions** in an "Ask your coach" chat, with presets for songs that fit your range, why you miss notes, starting a mixed voice, and checking your practice time
- **Gives a weekly review:** trends, plateaus, and next week's plan

The key stays in the browser's local storage and goes only to Claude's API. The app's pitch detection runs on your device, and Claude sees numbers, never audio. Without a key, **Copy coach prompt for Claude** fills the same prompt with your data so you can paste it into Claude yourself.

## The daily core

| Step | What you do | What the mic shows |
|------|-------------|--------------------|
| do · Breathe | A 4-count inhale, then a steady "sss" | Hiss loudness bar with a steady zone, auto-timing, and a steadiness score |
| re · Warm up | Lip trills, straw, or hums sliding up and down | Follow-the-dot graph of your pitch against the slide |
| mi · Match the note | Hear a note, sing it back, hold it | Tuner bar; hold in the green to match |
| fa · Scales & arpeggios | 1-2-3-2-1 up to the 9-note scale as you level up | One note at a time, checked off ✓ / ~ / ✗ |
| sol · Cool down | Quiet hums sliding down | Follow-the-dot graph plus a softness check |

## Exercise library

**Sing along** (in Song phrase): the guide melody plays while the mic scores each note. With "Fade the guide" on, the guide drops to 55%, then 25%, then silent each time you pass a round, until you're singing from memory. Needs headphones.

Posture & release, clean onsets (staccato), hum into a vowel, interval echo, interval quiz (no singing), vowel tuning, top-note check, Hold & swell (*messa di voce*), bridge the break, agility runs, and song phrases. Songs include Twinkle Twinkle, Frère Jacques, La Cucaracha, Ode to Joy, Happy Birthday, and Amazing Grace, all transposed to your range. The session plan picks from the library every day based on your weak spots.

**Range rule:** your top note moves up a half step only after you hit it within ±20¢, steady, and without strain on 3 different days.

## Levels

A 2-minute **level check** places you at Level 1–5. It measures note matching, a pattern sung back from memory, how steady a held note is, and (if you qualify) a quick run. Your level then moves up after 3 strong sessions on different days, or down if sing-backs keep falling short. The pitch target tightens from ±40¢ at Level 1 to ±15¢ at Level 5. A recheck is suggested every 4 weeks.

## Voice type test

Sing your lowest clear note, your highest comfortable note, then (optionally) one slow slide so the app can find where your voice flips (your register break). The app estimates bass, baritone, tenor, alto, mezzo-soprano, or soprano, then fits every exercise to your range.

## Progress and roadmap

Per-skill charts with trend lines and an improving / holding steady / dipping verdict. The roadmap chart plots your level against the typical pace from Day 1 to Year 1. Its goals need both the practice days and a passing level check.

## Pitch tracking

Pitch detection uses the YIN algorithm and runs entirely in your browser. No audio leaves your device. Headphones give the best results; without them, the mic pauses while the app's own tones play.

## Saving and sync

Everything is saved in the browser's local storage, including your name and goals for the coach. To share it across your phone and computer, connect each device under **Sync your phone and computer** with a GitHub token that has only `gist` scope. The log lives in a private gist (`voice-ladder-log.json`), merged by day. The token stays in each device's local storage, and you can revoke it anytime at github.com/settings/tokens.

## Files

`index.html` is the entire app: HTML, CSS, and JavaScript in one file, with no build step.
