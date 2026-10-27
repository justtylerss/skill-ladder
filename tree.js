// Skill Tree: the layer the home page and every app share. It works out XP, player level, and badges
// from what the apps have saved, and celebrates new ones. It never writes app data; its own key is
// skill-tree-seen ({ level, xp, badges }: what has been celebrated).
// On an app page (<script src="../tree.js" data-app="piano" defer>) it adds a Skill Tree bar under the
// header and watches the saved data, so finishing a step pops "+XP" and a level-up throws confetti.
(() => {
  'use strict';
  const APPS = [
    { id: 'voice', key: 'voice-ladder-v1', name: 'Voice Ladder', short: 'Voice', skill: 'singing', levels: ['Foundations', 'Pitch control', 'Range & registers', 'Agility', 'Polish'] },
    { id: 'piano', key: 'piano-ladder-v1', name: 'Piano Ladder', short: 'Piano', skill: 'piano', levels: ['First keys', 'Both hands', 'Chord changes', 'Groove', 'Expression'] },
    { id: 'kitchen', key: 'kitchen-ladder-v1', name: 'Kitchen Ladder', short: 'Kitchen', skill: 'cooking', levels: ['Kitchen basics', 'Heat control', 'Flavor balance', 'No recipe needed', 'Your own dishes'] },
    { id: 'chess', key: 'chess-ladder-v1', name: 'Chess Ladder', short: 'Chess', skill: 'chess', levels: ['First moves', 'Safe pieces', 'Tactics', 'Plans', 'Club player'] },
  ];
  // XP: 10 per step, 1 per practice minute (Voice, Piano), 30 per cook, 5 per first-try puzzle,
  // 20 per chess game, 100 per level gained in an app. Player level = floor(sqrt(XP / 40)) + 1.
  const XP = { step: 10, minute: 1, cook: 30, solve: 5, game: 20, level: 100 };
  const TITLES = ['Seedling', 'Sprout', 'Sapling', 'Young tree', 'Branching out', 'Leafy', 'In bloom', 'Sturdy oak', 'Old growth', 'Ancient tree', 'World tree'];
  const lvlOf = xp => Math.floor(Math.sqrt(xp / 40)) + 1;
  const xpAt = L => 40 * (L - 1) * (L - 1);
  const titleOf = L => TITLES[Math.min(L, TITLES.length) - 1];

  const pad = n => String(n).padStart(2, '0');
  const dkey = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const back = n => { const t = new Date(); return dkey(new Date(t.getFullYear(), t.getMonth(), t.getDate() - n)); };
  const obj = v => (v && typeof v === 'object' ? v : {});
  const plural = (n, one, many) => (n === 1 ? one : many);
  const dayNum = k => { const [y, m, d] = k.split('-').map(Number); return Math.round(new Date(y, m - 1, d).getTime() / 86400000); };
  const count = (d, f) => (Array.isArray(obj(d)[f]) ? d[f].length : 0);
  const stepsOn = d => { const s = obj(obj(d).steps); return Object.keys(s).filter(k => s[k]).length; };
  const levelOf = o => Math.max(1, Math.min(5, Number(obj(o.profile).level) || 1));
  function load(key) {
    try {
      const o = JSON.parse(localStorage.getItem(key) || 'null');
      return o && typeof o === 'object' ? o : null;
    } catch (e) { return null; }
  }

  // ----- today's numbers for the home cards -----
  // Voice, Piano, Chess: a day counts toward the streak with 3+ steps; like the apps, an unfinished
  // today doesn't break it. Kitchen: cooks since Monday, and dishes with 3+ cooks, last two rated 4+.
  function streakOf(days) {
    const counts = k => stepsOn(days[k]) >= 3;
    let i = counts(back(0)) ? 0 : 1, streak = 0;
    while (counts(back(i))) { streak++; i++; }
    return streak;
  }
  function cardStats(id, o) {
    const days = obj(o.days), d = obj(days[back(0)]);
    if (id === 'kitchen') {
      const ws = back((new Date().getDay() + 6) % 7);
      const week = Object.keys(days).filter(k => k >= ws).reduce((n, k) => n + count(days[k], 'cooks'), 0);
      const mastered = Object.values(obj(obj(o.profile).dishes)).filter(ds => ds && ds.cooks >= 3
        && Array.isArray(ds.ratings) && ds.ratings.length >= 2 && ds.ratings.slice(-2).every(r => r >= 4)).length;
      return { week, cooks: plural(week, 'cook', 'cooks'), mastered, dishes: plural(mastered, 'dish', 'dishes'), today: count(d, 'cooks') > 0 || stepsOn(d) > 0 };
    }
    const streak = streakOf(days), steps = stepsOn(d);
    if (id === 'chess') {
      return { streak, days: plural(streak, 'day', 'days'), steps, rating: Math.round(Number(obj(o.profile).rating) || 800), today: steps >= 1 || Object.keys(obj(obj(d.pz).res)).length > 0 };
    }
    const mins = Math.round(Number(d.mins) || 0);
    return { streak, days: plural(streak, 'day', 'days'), mins, steps, today: steps >= 1 || mins >= 3 };
  }

  // ----- XP and badges -----
  const practicedOn = {
    voice: d => stepsOn(d) >= 1 || (Number(d.mins) || 0) >= 3,
    piano: d => stepsOn(d) >= 1 || (Number(d.mins) || 0) >= 3,
    kitchen: d => count(d, 'cooks') > 0 || stepsOn(d) > 0,
    chess: d => stepsOn(d) >= 1 || Object.keys(obj(obj(d.pz).res)).length > 0,
  };
  function summarize(id, o) {
    const days = obj(o.days), keys = Object.keys(days).sort();
    const sum = f => keys.reduce((n, k) => n + f(obj(days[k])), 0);
    const steps = sum(stepsOn);
    const mins = id === 'voice' || id === 'piano' ? sum(d => Math.round(Number(d.mins) || 0)) : 0;
    const cooks = id === 'kitchen' ? sum(d => count(d, 'cooks')) : 0;
    const solves = id === 'chess' ? sum(d => Object.values(obj(obj(d.pz).res)).filter(v => v === 1).length) : 0;
    const games = id === 'chess' ? sum(d => count(d, 'games')) : 0;
    // longest run of days with 3+ steps (Kitchen counts cooks per week instead, so it has no streak)
    let best = 0, run = 0, prev = null;
    if (id !== 'kitchen') keys.forEach(k => {
      if (stepsOn(days[k]) < 3) { run = 0; prev = null; return; }
      run = prev != null && dayNum(k) - prev === 1 ? run + 1 : 1;
      prev = dayNum(k);
      best = Math.max(best, run);
    });
    const lv = levelOf(o);
    return {
      lv, steps, best,
      xp: steps * XP.step + mins * XP.minute + cooks * XP.cook + solves * XP.solve + games * XP.game + (lv - 1) * XP.level,
      dates: keys.filter(k => practicedOn[id](obj(days[k]))),
    };
  }
  function compute() {
    const apps = {};
    APPS.forEach(a => { const o = load(a.key); if (o) apps[a.id] = { sum: summarize(a.id, o), card: cardStats(a.id, o) }; });
    const S = Object.values(apps).map(x => x.sum);
    const xp = S.reduce((n, s) => n + s.xp, 0);
    const L = lvlOf(xp);
    const perDay = {};
    S.forEach(s => s.dates.forEach(k => { perDay[k] = (perDay[k] || 0) + 1; }));
    const T = {
      steps: S.reduce((n, s) => n + s.steps, 0),
      best: Math.max(0, ...S.map(s => s.best)),
      maxDay: Math.max(0, ...Object.values(perDay)),
      maxLevel: Math.max(0, ...S.map(s => s.lv)),
      started: S.length,
      round: S.filter(s => s.lv >= 2).length,
      mastered: apps.kitchen ? apps.kitchen.card.mastered : 0,
      rating: apps.chess ? apps.chess.card.rating : 0,
    };
    const badges = [
      ['first', '🌱', 'First leaf', 'Finish a step in any app', T.steps, 1],
      ['roll', '🔥', 'On a roll', 'A 3-day streak', T.best, 3],
      ['week', '⚡', 'Week warrior', 'A 7-day streak', T.best, 7],
      ['month', '🏆', 'Unstoppable', 'A 30-day streak', T.best, 30],
      ['combo', '🎯', 'Combo', 'Two skills in one day', T.maxDay, 2],
      ['all', '🎨', 'Renaissance', 'All four skills in one day', T.maxDay, 4],
      ['branch', '🌿', 'Branching out', 'Start all four apps', T.started, 4],
      ['lv2', '⭐', 'Level up', 'Level 2 in any app', T.maxLevel, 2],
      ['lv3', '🌟', 'Halfway up', 'Level 3 in any app', T.maxLevel, 3],
      ['lv5', '👑', 'Top of the branch', 'Level 5 in any app', T.maxLevel, 5],
      ['round', '🌳', 'Well-rounded', 'Level 2 in all four apps', T.round, 4],
      ['dish', '🍳', 'Signature dish', 'Master a dish in Kitchen', T.mastered, 1],
      ['sharp', '♟️', 'Sharp eye', 'Chess puzzle rating 1000', T.rating, 1000],
      ['century', '💯', 'Century', '100 steps in all', T.steps, 100],
    ].map(([id, icon, name, how, have, need]) => ({ id, icon, name, how, have, need, got: have >= need }));
    return { apps, xp, L, title: titleOf(L), into: xp - xpAt(L), span: xpAt(L + 1) - xpAt(L), badges, earned: badges.filter(b => b.got).map(b => b.id) };
  }

  function seenGet() { try { return JSON.parse(localStorage.getItem('skill-tree-seen') || 'null'); } catch (e) { return null; } }
  function seenSet(s) { try { localStorage.setItem('skill-tree-seen', JSON.stringify(s)); } catch (e) {} }

  // ----- celebrations -----
  const motion = () => !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) && typeof Element.prototype.animate === 'function';
  const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  function confetti(n) {
    if (!motion()) return;
    const host = document.createElement('div');
    host.className = 'st-confetti';
    host.setAttribute('aria-hidden', 'true');
    document.body.appendChild(host);
    const colors = ['--accent', '--heat-2', '--warn', '--good', '--bad', '--accent-soft'].map(css);
    for (let i = 0; i < n; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length] || '#3445c9';
      host.appendChild(p);
      const dx = (Math.random() - 0.5) * 220, rot = (Math.random() - 0.5) * 900;
      p.animate([{ transform: 'translate(0, 0) rotate(0deg)', opacity: 1 }, { transform: 'translate(' + dx + 'px, ' + (innerHeight + 40) + 'px) rotate(' + rot + 'deg)', opacity: 0.85 }],
        { duration: 1900 + Math.random() * 1500, delay: Math.random() * 500, easing: 'cubic-bezier(.25,.6,.45,1)', fill: 'forwards' });
    }
    setTimeout(() => host.remove(), 4200);
  }
  // kind: 'xp' (small pill), 'big' (level up), 'badge'
  function toast(text, kind) {
    let host = document.querySelector('.st-toasts');
    if (!host) { host = document.createElement('div'); host.className = 'st-toasts'; host.setAttribute('role', 'status'); document.body.appendChild(host); }
    const t = document.createElement('div');
    t.className = 'st-toast ' + (kind || 'xp');
    t.textContent = text;
    host.appendChild(t);
    const life = kind === 'xp' ? 1800 : 4200;
    if (motion()) t.animate([{ opacity: 0, transform: 'translateY(-14px) scale(.85)' }, { opacity: 1, transform: 'translateY(0) scale(1.06)', offset: 0.6 }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'ease-out' });
    setTimeout(() => {
      if (!motion()) { t.remove(); return; }
      t.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-10px)' }], { duration: 320, easing: 'ease-in', fill: 'forwards' }).onfinish = () => t.remove();
    }, life);
  }

  const STYLE = `
.st-toasts { position: fixed; top: max(12px, env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); z-index: 60; display: grid; justify-items: center; gap: 6px; pointer-events: none; width: min(92vw, 420px); }
.st-toast { padding: 8px 16px; border-radius: 99px; font: 700 15px/1.3 var(--font-display, system-ui); background: var(--accent); color: var(--accent-ink); box-shadow: 0 6px 24px rgba(20, 26, 46, .25); text-align: center; }
.st-toast.xp { font-family: var(--font-mono, monospace); font-size: 14px; }
.st-toast.big { font-size: 18px; padding: 12px 20px; border-radius: 16px; }
.st-toast.badge { background: var(--card); color: var(--ink); border: 2px solid var(--accent); }
.st-confetti { position: fixed; inset: 0; pointer-events: none; z-index: 55; overflow: hidden; }
.st-confetti i { position: absolute; top: -16px; width: 8px; height: 13px; border-radius: 2px; }
a.st-bar { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 12px; align-items: center; padding: 12px 14px; border-radius: var(--r, 14px); border: 1px solid var(--line); background: var(--card); color: var(--ink); text-decoration: none; -webkit-tap-highlight-color: transparent; transition: border-color .15s, transform .1s; }
a.st-bar:hover { border-color: var(--accent); }
a.st-bar:active { transform: scale(.99); }
a.st-bar:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
.st-lv { width: 50px; height: 50px; border-radius: 50%; display: grid; place-content: center; text-align: center; background: var(--accent); color: var(--accent-ink); box-shadow: 0 0 0 5px var(--accent-soft); }
.st-lv small { font: 600 9px/1 var(--font-mono, monospace); letter-spacing: .08em; text-transform: uppercase; }
.st-lv b { font: 780 22px/1 var(--font-display, system-ui); }
.st-main { display: grid; gap: 5px; min-width: 0; }
.st-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.st-title { font: 700 15px/1.2 var(--font-display, system-ui); }
.st-xp { font: 600 12px/1 var(--font-mono, monospace); color: var(--accent-text); font-variant-numeric: tabular-nums; }
.st-track { height: 8px; border-radius: 99px; background: var(--hair); overflow: hidden; }
.st-track span { display: block; height: 100%; width: 0; border-radius: 99px; background: linear-gradient(90deg, var(--accent), var(--heat-2)); transition: width .8s cubic-bezier(.2,.8,.2,1); }
.st-branch { display: flex; align-items: center; gap: 0; font: 600 11px/1 var(--font-mono, monospace); color: var(--muted); }
.st-branch .nm { margin-right: 8px; font-family: var(--font-display, system-ui); font-size: 12px; font-weight: 700; color: var(--ink-2); }
.st-branch i { font-style: normal; width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; border: 2px solid var(--line); background: var(--card); position: relative; flex: none; }
.st-branch i + i { margin-left: 12px; }
.st-branch i + i::before { content: ""; position: absolute; right: 100%; top: 50%; width: 14px; height: 3px; margin-right: 0; transform: translateY(-50%); background: var(--line); }
.st-branch i.on { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.st-branch i.on::before { background: var(--accent); }
.st-branch i.cur { box-shadow: 0 0 0 0 var(--accent-soft); animation: st-pulse 2.2s ease-in-out infinite; }
@keyframes st-pulse { 0%, 100% { box-shadow: 0 0 0 0 var(--accent-soft); } 50% { box-shadow: 0 0 0 7px var(--accent-soft); } }
@media (prefers-reduced-motion: reduce) { .st-branch i.cur, .st-track span { animation: none !important; transition: none !important; } }
`;
  function addStyle() {
    if (document.getElementById('st-style')) return;
    const s = document.createElement('style');
    s.id = 'st-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  // ----- the Skill Tree bar on app pages -----
  function mountBar(appId) {
    const app = APPS.find(a => a.id === appId);
    const header = document.querySelector('header.top');
    if (!app || !header) return;
    addStyle();
    const bar = document.createElement('a');
    bar.className = 'st-bar';
    bar.href = '../';
    header.after(bar);
    let shown = null;
    function render(R, popLevel) {
      const s = R.apps[appId] ? R.apps[appId].sum : null, lv = s ? s.lv : 0;
      bar.innerHTML = '';
      const lvEl = document.createElement('span');
      lvEl.className = 'st-lv';
      lvEl.setAttribute('aria-hidden', 'true');
      lvEl.innerHTML = '<small>Lv</small><b></b>';
      lvEl.querySelector('b').textContent = R.L;
      const main = document.createElement('span');
      main.className = 'st-main';
      const top = document.createElement('span');
      top.className = 'st-top';
      top.innerHTML = '<span class="st-title"></span><span class="st-xp"></span>';
      top.firstChild.textContent = 'Skill Tree · ' + R.title;
      top.lastChild.textContent = R.xp.toLocaleString() + ' XP';
      const track = document.createElement('span');
      track.className = 'st-track';
      const fill = document.createElement('span');
      track.appendChild(fill);
      const br = document.createElement('span');
      br.className = 'st-branch';
      br.innerHTML = '<span class="nm"></span>';
      br.firstChild.textContent = app.short;
      for (let n = 1; n <= 5; n++) {
        const i = document.createElement('i');
        i.className = (n <= lv ? 'on' : '') + (n === lv ? ' cur' : '');
        i.textContent = n < lv ? '✓' : n === lv ? '★' : n;
        br.appendChild(i);
        if (popLevel && n === lv && motion()) i.animate([{ transform: 'scale(0)' }, { transform: 'scale(1.5)', offset: 0.6 }, { transform: 'scale(1)' }], { duration: 600, easing: 'ease-out' });
      }
      main.append(top, track, br);
      bar.append(lvEl, main);
      bar.setAttribute('aria-label', 'Skill Tree: Level ' + R.L + ', ' + R.title + ', ' + R.xp.toLocaleString() + ' XP. ' + app.name + (s ? ' Level ' + lv + ' of 5' : ' not started') + '. Open the Skill Tree.');
      const pct = (100 * R.into) / R.span + '%';
      if (!shown && motion()) requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = pct; }));
      else { fill.style.transition = shown ? '' : 'none'; fill.style.width = pct; }
      shown = R;
    }
    render(compute(), false);
    // Watch the saved data. The apps save on every change, so a new step shows up within a second.
    const raw = () => APPS.map(a => localStorage.getItem(a.key) || '').join('\u0001');
    let last = raw();
    setInterval(() => {
      let r;
      try { r = raw(); } catch (e) { return; }
      if (r === last) return;
      last = r;
      const prev = shown, R = compute();
      const pl = prev.apps[appId] ? prev.apps[appId].sum.lv : 0, nl = R.apps[appId] ? R.apps[appId].sum.lv : 0;
      render(R, nl > pl);
      const gained = R.xp - prev.xp;
      const fresh = R.badges.filter(b => b.got && !prev.earned.includes(b.id));
      let party = 0;
      if (gained > 0) toast('+' + gained + ' XP', 'xp');
      if (nl > pl && pl) { toast(app.name + ': Level ' + nl + ', ' + app.levels[nl - 1] + '!', 'big'); party = 80; }
      if (R.L > prev.L) { toast('Level up! Level ' + R.L + ', ' + R.title, 'big'); party = 110; }
      fresh.forEach(b => toast(b.icon + ' Badge: ' + b.name, 'badge'));
      if (fresh.length) party = Math.max(party, 45);
      if (party) confetti(party);
      if (R.L > prev.L || fresh.length) {
        // Celebrated here, so the home page doesn't throw the same party again.
        const seen = seenGet() || { level: prev.L, badges: prev.earned };
        seenSet({ level: Math.max(Number(seen.level) || 1, R.L), xp: R.xp, badges: Array.from(new Set((seen.badges || []).concat(fresh.map(b => b.id)))) });
      }
    }, 1000);
  }

  window.SkillTree = { APPS, XP, TITLES, lvlOf, xpAt, titleOf, compute, seenGet, seenSet, confetti, toast, motion, addStyle };
  const me = document.currentScript;
  const appId = me && me.dataset.app;
  if (appId) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountBar(appId));
    else mountBar(appId);
  }
})();
