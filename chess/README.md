# Chess Ladder

A daily chess coach that runs in the browser. Five short steps a day: see the board, solve puzzles, learn an opening, practice an endgame, then play a built-in computer at your level. It tracks your puzzle rating and moves you up five levels.

**Live app:** https://justtylerss.github.io/skill-ladder/chess/ (part of [Skill Tree](https://justtylerss.github.io/skill-ladder/))

## Today's session

Each day starts with a quick **check-in** (10, 20, or 40+ minutes, and whether you're tired, normal, or sharp), then a plan in a coach's format:

- **Today's focus:** your weakest puzzle theme, too many blunders in recent games, the opening you're learning, or the endgame you haven't mastered, in that order
- **Since last time:** your rating change and how your last game went
- **Session:** the steps that fit your time; 10 minutes skips the endgame and the game, and a tired day skips the game ("a tired brain blunders")
- **Next milestone** and a **weekly goal** of 4–5 practice days

## The daily ladder

| Step | What you do | What the app checks |
|------|-------------|---------------------|
| 1 · See the board | Tap ten named squares; from Level 3, the board flips and knight-route questions mix in | Right answers and seconds per round |
| 2 · Tactics | Five puzzles near your rating (three on short or tired days) | First-try solves change your rating; a hint counts as half |
| 3 · Opening | Step through a line with the idea behind every move, then play your side from memory | Clean runs on 3 different days mark it learned |
| 4 · Endgame | Checkmate or promote against the computer's best defense | Win within the move limit, without stalemate |
| 5 · Play | A full game against the computer at your level; take-backs while you learn | An engine review flags blunders and mistakes, with the better move |

## Puzzles

581 puzzles, found in engine self-play and checked again with a deeper search: the first move is the only winning one, and so is every later move you make. They include mates in one, two, and three, forks, free pieces, promotions, and winning material, rated from about 700 to 1450. Your puzzle rating moves like a chess rating after each first try.

## Openings and endgames

Openings: Italian Game, stopping the Scholar's Mate, and the London System (Level 1); Queen's Gambit Declined, Caro-Kann, and Ruy Lopez (Level 2); Sicilian Najdorf, French, and King's Indian (Level 3); Slav and English (Level 4).

Endgames: the two-rook ladder mate and queen mate (Level 1), the rook mate and king and pawn with the king in front (Level 2), key squares and the opposition (Level 3), and the Lucena position (Level 4).

## The computer

Five strengths, from a beginner that often plays random moves to a full-strength search. It plays at your level by default; Your board can set it one level easier or harder. Games resume after a reload.

## Chess library

How the pieces move (including castling, en passant, and promotion), five checkmate patterns to deliver on the board, a notation quiz, a three-minute puzzle rush, opening principles, and the blunder check (Level 2+).

## Levels

A 5-minute **level check** (eight puzzles of rising difficulty, one try each) sets your level and starting rating. You move up when your puzzle rating reaches the next level (900, 1100, 1300, 1500), you've beaten the computer at your level, and, for Levels 3–5, after 14, 30, and 60 practice days.

## Progress and roadmap

Charts for puzzle rating, first-try accuracy, board-vision speed, notation, puzzle rush, and blunders per game, with an improving / holding steady / dipping verdict. Accuracy by puzzle theme, openings and endgames with mastery dots, recent games, and a 4-week calendar. The roadmap runs by practice days from Day 1 to Year 1.

## Claude coach

Connect a Claude API key once per device; a key connected in another ladder on the same device is picked up automatically. Claude reviews your last game from its moves, explains puzzles you missed, and answers questions, with presets for what to work on, your current opening, missed tactics, and a simple repertoire. Without a key, **Copy coach prompt for Claude** fills the same prompt with your data.

## Saving and sync

Everything is saved in the browser's local storage. To share it across devices, connect a GitHub token with only `gist` scope. The log lives in a private gist (`chess-ladder-log.json`), merged by day. A token already connected in Voice Ladder on the same device is reused.

## Files

`index.html` is the entire app: HTML, CSS, and JavaScript in one file, with no build step. The chess rules, the computer player, and the puzzles are all in it.
