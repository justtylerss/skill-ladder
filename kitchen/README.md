# Kitchen Ladder

A cooking coach for beginners that runs in the browser. Every cook is five steps (plan, prep, cook, taste, log), with built-in timers, taste-and-adjust fixes, and a log that decides what to cook next and when a dish counts as mastered.

**Live app:** https://justtylerss.github.io/skill-ladder/kitchen/ (part of [Skill Ladder](https://justtylerss.github.io/skill-ladder/))

## Today in the kitchen

Each day starts with a quick **check-in**: cooking today (about 15, 30, or 45+ minutes), leftovers, or eating out, plus your energy. The chef then shows:

- **Today's focus:** the skill to practice in today's dish, like using a meat thermometer or searing without moving the meat
- **Since last time:** your last cook's rating and your own "next time I'll…" note
- **Today's cook:** a recommended dish that fits your time, level, equipment, and goals. It favors dishes you're close to mastering.
- **Next milestone** and a **weekly cooking goal**: 3 home-cooked meals a week at Level 1, rising to 5

On leftovers or eating-out days, the plan switches to short drills: food safety, an onion-dice drill, Spanish words, or planning the week with Claude.

## The five steps of every cook

| Step | What you do |
|------|-------------|
| 1 · Plan | Pick a dish, set servings and heat (Mild, Medium, Hot, Fuego), tick what you have, and copy the shopping list |
| 2 · Prep | Mise en place, with a skill tip and a prep timer |
| 3 · Cook | One step at a time in big text, with one-tap timers, target temperatures, and what "done" looks like. The screen stays on where the browser allows it |
| 4 · Taste | Rate salt, brightness, heat, sweetness, and texture, and get the fix for anything that's off |
| 5 · Log | Star rating, how hard it felt, a note for next time, and how to store leftovers |

## Recipes

23 recipes across 5 levels. Each shows protein per serving, Spanish names for every ingredient, and spice that scales with your heat setting.

1. **Kitchen basics:** fluffy rice, soft scrambled eggs, jammy or hard-boiled eggs, upgraded spicy ramen, air-fryer chicken thighs, black bean quesadillas, spicy egg fried rice
2. **Heat control:** garlic-chili shrimp, chipotle chicken burrito bowl, beef and broccoli, turkey taco skillet, spicy sausage pasta, crispy roasted vegetables
3. **Flavor balance:** sheet-pan fajitas, gochujang chicken bowls, chicken tinga, pico de gallo and guacamole, pork chops with a pan sauce
4. **No recipe needed:** arroz con pollo, carne asada tacos, meal prep boxes, the fridge stir-fry formula
5. **Your own dishes:** chicken adobo, homemade flour tortillas, oven carnitas

Food safety temperatures follow USDA guidance: poultry 165°F, ground meat 160°F, and steaks, chops, and fish 145°F (meat with a 3-minute rest).

## Levels

A 2-minute **kitchen check** (a self-check) finds your starting level. You move up by **mastering dishes**: cook a dish 3 times with the last two rated 4 or higher. Each level needs 2 mastered dishes at that level plus a number of logged cooks (5, 15, 30, and 60 for Levels 2–5). Every dish stays open to you anytime; recommendations come from your level.

## Kitchen library

Knife skills with an onion-dice timer, an egg lab with timers, taste training with a quiz, ratios and formulas (rice, stir-fry sauce, marinades, pan sauce, quick pickles), a heat guide from mild to fuego, food safety with a quiz, fridge improv (Level 3+), Spanish kitchen words, and multiple kitchen timers that ring and vibrate.

## Progress and roadmap

Cooks per week, ratings, speed against the recipe, how often it tasted right without fixes, and onion-dice time, plus every dish's progress toward mastery and every skill. The roadmap follows number of cooks: first cook, Week 1, Week 2, Month 1, Month 3, Month 6, Year 1.

## Claude chef

Connect a Claude API key once per device. If you already connected one in Voice or Piano Ladder on the same device, it's picked up automatically. Claude then:

- Plans your week of cooking with one shopping list
- Turns what's in your fridge into a recipe
- Explains why a dish turned out the way it did, with an "Ask Claude about this cook" button after you log one
- Teaches skills, suggests cheap high-protein meals, and gives you Spanish words for today's dish

Without a key, **Copy chef prompt for Claude** fills the same prompt with your data.

## Saving and sync

Everything is saved in the browser's local storage. To share it across devices, connect a GitHub token with only `gist` scope. The log lives in a private gist (`kitchen-ladder-log.json`), merged by day. A token already connected in Voice Ladder on the same device is reused.

## Files

`index.html` is the entire app: HTML, CSS, and JavaScript in one file, with no build step.
