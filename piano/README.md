# Piano Ladder

A daily piano coach that runs in the browser and listens to your piano. It gives you a 15–40 minute session plan, checks every note and chord you play through the mic (or a MIDI keyboard), and adapts to how you actually play.

**Live app:** https://justtylerss.github.io/skill-ladder/piano/ (part of [Skill Tree](https://justtylerss.github.io/skill-ladder/))

Built for adult beginners who want to play songs they like (pop, R&B), accompany their own singing, read sheet music, and play by ear.

## How it hears you

- **Mic (any piano):** works with an acoustic piano or any keyboard's speakers. The app detects each note's attack, its pitch, and, for chords, which note names are sounding. Put the phone or laptop on the music stand.
- **MIDI keyboard:** a USB or Bluetooth MIDI keyboard gives exact notes and timing (Chrome or Edge on a computer or Android).
- **On-screen keys:** tap the keyboard in the app, or use your computer keyboard (A W S E D F T G Y H U J K = C to C).

All listening happens in your browser. No audio leaves your device.

A **timing check** measures how late the app hears you (mic and speaker delay) so rhythm scores are fair. The metronome clicks above 5 kHz, where the note detector doesn't listen, so it can click while you play. With headphones on, the mic also keeps listening while the app plays.

## Today's session

Each day starts with a quick **check-in** (how your hands feel, your energy), then a plan in a teacher's format:

- **Today's focus:** the weakest area, in priority order: hand health > right notes > steady pulse > reading > chords > ear > expression
- **Since last time:** the biggest real change, with numbers
- **Session:** the five steps below plus one bonus from the library, each with minutes and what to listen for
- **Song of the day** and **Next milestone**

Sore hands or low energy give you a lighter session. Pain, numbness, or tingling means no playing that day: practice locks, and the plan switches to the listening quiz, theory, and active listening. If soreness keeps coming back, the app tells you to get it checked.

**Practice time:** 25 minutes recommended and a 45-minute daily max to start, in line with the 20–30 focused minutes most days that adult beginners are usually advised. The max grows 5 minutes for every 10 practice days in a row without a sore or painful check-in, up to 60.

## The daily ladder

| Step | What you do | What the app checks |
|------|-------------|---------------------|
| do · Warm up | Posture checklist, then a five-finger pattern | Right notes and how even your fingers are (gap spread in ms) |
| re · Read the notes | 10 notes on the staff, played on the piano | Accuracy and notes per minute; the notes you miss come up more often |
| mi · Technique | Five-finger patterns, then scales with thumb-under, arpeggios, hands together | "Wait for me" mode, then "With the beat" against a metronome |
| fa · Chords & rhythm | Chord shapes, then progressions like C–G–Am–F in comping rhythms | Each chord's notes, and how close chord changes land to the beat |
| sol · Song | Sheet music with finger numbers, lyrics, and chord symbols | Every note, in wait mode or in time; right hand, left hand, or both |

Songs (public domain): Mary Had a Little Lamb, Ode to Joy, Jingle Bells, Frère Jacques, Twinkle Twinkle, Happy Birthday, Amazing Grace, and La Cucaracha (chords).

## Practice library

- **Play it back by ear:** the app plays a short tune; you find it on the keys
- **Listening quiz:** higher/lower, major/minor, intervals, chord types (no playing, fine on rest days)
- **Improvise:** backing loops (pop, minor, 12-bar blues, neo-soul) with the scale highlighted on the keys
- **Accompany your singing:** chords over the lyrics, in a key that fits your voice (it reads your range from Voice Ladder on the same device)
- **Rhythm & timing:** play rhythms from quarter notes to syncopation and sixteenths
- **Sight-reading** (Level 3+): a new melody every time, played once with the beat
- **Theory quiz:** note names, chord spelling, key signatures, chord functions
- **Hand care:** a 2-minute stretch routine

## Levels

A 3-minute **level check** listens to you find keys, read the staff, play five notes in time, make three chords, and play back a tune, then places you at Level 1–5:

1. **First keys:** treble notes C–G, C position, the C and G chords
2. **Both hands:** both clefs, hands together, C–F–G–Am, the pop progression
3. **Chord changes:** scales with thumb-under, inversions, keys of G and F
4. **Groove:** 7th chords, comping rhythms for pop and R&B, the 12-bar blues
5. **Expression:** extended R&B chords, two-octave scales, arpeggios, more keys

You move up after 3 strong days at your level, or down if sessions keep falling short. Levels 3, 4, and 5 also need 21, 50, and 100 practice days, so skills have time to settle into your hands. A recheck is suggested every 4 weeks.

## Progress and roadmap

Per-skill charts with trend lines and an improving / holding steady / dipping verdict. The roadmap chart plots your level against a typical adult-beginner pace, from first melodies in week 1 to hands together and a pop progression at month 1, a real song with melody and chords around month 3, and a small repertoire by year 1. Goals need both the practice days and a passing check.

## Claude teacher

Connect a Claude API key once per device (Max plans include monthly API credits: claim them on claude.ai under Settings → Billing → API credits). If you already connected a key in Voice Ladder on the same device, it's picked up automatically. Claude then:

- **Writes today's plan** from your live data
- **Explains any result:** every exercise gets an "Ask Claude about this" button with the note-by-note numbers
- **Answers questions:** chords for songs you like (progressions and voicings, never copyrighted lyrics), pop and R&B songs for your level, how to play by ear, accompanying your singing
- **Gives a weekly review**

The key stays in the browser's local storage and goes only to Claude's API. Without a key, **Copy teacher prompt for Claude** fills the same prompt with your data so you can paste it into Claude yourself.

## Saving and sync

Everything is saved in the browser's local storage. To share it across devices, turn on **Cloud save** once per device in the Save menu on the [Skill Tree home page](../#save), with a GitHub token that has only `gist` scope; it switches on every ladder at once. The log lives in a private gist (`piano-ladder-log.json`), merged by day.

A **Skill Tree bar** under the header shows your player level, XP, and this app's branch of levels. Finishing a step pops "+XP", and a new level or badge throws confetti.

## Files

`index.html` is the entire app: HTML, CSS, and JavaScript in one file, with no build step. Music symbols are drawn from Noto Music outlines (SIL Open Font License).
