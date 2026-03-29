/* ════════════════════════════════════════════════════
   Lese-Übung  –  app.js
   ════════════════════════════════════════════════════ */

// ── Konsonanten pro Level ─────────────────────────
// Level 1 & 2 nutzen je eine eigene (wachsende) Liste
const CONSONANTS_L1 = ['l', 's', 't', 'r', 'm', 'n'];
const CONSONANTS_L2 = ['l', 's', 't', 'r', 'm', 'n', 'f', 'k', 'p', 'b', 'd', 'g', 'h', 'w'];
const VOWELS        = ['a', 'e', 'i', 'o', 'u'];

// ── Hilfsfunktionen ───────────────────────────────
function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomCap(ch) { return Math.random() < 0.5 ? ch.toUpperCase() : ch.toLowerCase(); }

// ── Silben-Generator ─────────────────────────────
function makeSyllable(consonants) {
  const raw = Math.random() < 0.5
    ? rnd(consonants) + rnd(VOWELS)
    : rnd(VOWELS) + rnd(consonants);

  // Ersten Buchstaben zufällig groß, Rest klein — oder alles klein
  return Math.random() < 0.5
    ? raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
    : raw.toLowerCase();
}

// ── Wort-Generator für Map-basierte Level ─
function makeWordFromMap(map) {
  const keys   = Object.keys(map);
  const stem   = rnd(keys);
  const ending = rnd(map[stem]);
  return stem + ending;
}

// ── Wort-Generator für Array-basiertes Level ────
function makeWordFromArray(arr) {
  return rnd(arr);
}

// ── Dynamischer Wort-Loader ───────────────────────
// Alle Wortdaten werden beim ersten Bedarf gecacht.
const wordCache = {};

function getWordData(lvl) {
  // if (wordCache[lvl]) return Promise.resolve(wordCache[lvl]);

  const fileMap = {
    2: 'levels/level-2.js',
    3: 'levels/level-3.js',
    4: 'levels/level-4.js',
    5: 'levels/level-5.js',
  };

  return new Promise((resolve) => {
    // Prüfen ob bereits geladen (Script-Tag schon im DOM)
    const src = fileMap[lvl];
    if (document.querySelector(`script[src="${src}"]`)) {
      // Datei war bereits eingebunden, Variablen sollten verfügbar sein
      cacheAndResolve(lvl, resolve);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => cacheAndResolve(lvl, resolve);
    script.onerror = () => {
      console.warn(`Konnte ${src} nicht laden.`);
      wordCache[lvl] = null;
      resolve(null);
    };
    document.head.appendChild(script);
  });
}

function cacheAndResolve(lvl, resolve) {
  if (lvl === 2) wordCache[2] = typeof WORDS_L2 !== 'undefined' ? WORDS_L2 : null;
  if (lvl === 3) wordCache[3] = typeof WORDS_L3 !== 'undefined' ? WORDS_L3 : null;
  if (lvl === 4) wordCache[4] = typeof WORDS_L4 !== 'undefined' ? WORDS_L4 : null;
  if (lvl === 5) wordCache[5] = typeof WORDS_L5 !== 'undefined' ? WORDS_L5 : null;
  resolve(wordCache[lvl]);
}

// ── Item pro Level ────────────────────────────────
async function getItem(lvl) {
  if (lvl === 1) return makeSyllable(CONSONANTS_L1);

  const data = await getWordData(lvl);
  if (!data) return '???';

  if (lvl === 2) return makeWordFromArray(data);
  if (lvl === 3) return makeWordFromArray(data);
  if (lvl === 4) return makeWordFromArray(data);
  if (lvl === 5) return makeWordFromMap(data);
}

// ── State ─────────────────────────────────────────
let counter     = 0;
let level       = 1;
let darkMode    = prefersDark();
let isAnimating = false;
let currentItem = null;

// ── DOM ───────────────────────────────────────────
const stage            = document.getElementById('stage');
const slotA            = document.getElementById('syllable-a');
const counterNum       = document.getElementById('counter-num');
const themeBtn         = document.getElementById('theme-btn');
const levelBtn         = document.getElementById('level-btn');
const levelLabel       = document.getElementById('level-label');
const iconMoon         = document.getElementById('icon-moon');
const iconSun          = document.getElementById('icon-sun');
const canvas           = document.getElementById('fireworks-canvas');
const milestoneOverlay = document.getElementById('milestone-overlay');
const milestoneText    = document.getElementById('milestone-text');
const milestoneEmoji   = document.getElementById('milestone-emoji');
const milestoneCount   = document.getElementById('milestone-count');
const milestoneBgCount = document.getElementById('milestone-bg-count');
const ctx              = canvas.getContext('2d');

// ── Theme ─────────────────────────────────────────
function prefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function applyTheme() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  iconMoon.style.display = darkMode ? 'block' : 'none';
  iconSun.style.display  = darkMode ? 'none'  : 'block';
}
themeBtn.addEventListener('click', e => { e.stopPropagation(); darkMode = !darkMode; applyTheme(); });
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => { darkMode = e.matches; applyTheme(); });

// ── Level cycling (1 → 2 → 3 → 4 → 5 → 1 …) ─────
const MAX_LEVEL = 5;
levelBtn.addEventListener('click', e => {
  e.stopPropagation();
  level = (level % MAX_LEVEL) + 1;
  levelLabel.textContent = `Stufe ${level}`;
  showNext(true);
});

// ── Font-size: Stufe 1, 3, 4, 5 (eine Zeile) ─────
function calcFontSizeSingleLine(text) {
  const vw  = window.innerWidth;
  const vh  = window.innerHeight - 64;
  let fs    = Math.min(vw * 0.9, vh * 0.75);

  const probe = document.createElement('canvas');
  const pc    = probe.getContext('2d');

  while (fs > 12) {
    pc.font = `800 ${fs}px 'Andika', cursive`;
    if (pc.measureText(text).width <= vw * 0.92) break;
    fs -= 2;
  }
  return Math.round(fs);
}

// ── Font-size: Stufe 2 (zwei Silben, eine Zeile) ──
function calcFontSizeTwoInOneLine(s1, sep, s2) {
  const vw  = window.innerWidth;
  const vh  = window.innerHeight - 64;
  let fs    = Math.min(vw * 0.9, vh * 0.75);
  const PAD = vw * 0.04;

  const probe = document.createElement('canvas');
  const pc    = probe.getContext('2d');

  while (fs > 12) {
    pc.font    = `800 ${fs}px 'Baloo 2', cursive`;
    const wS1  = pc.measureText(s1).width;
    const wS2  = pc.measureText(s2).width;
    const wSep = pc.measureText(sep).width * 0.55;
    if (wS1 + wSep + wS2 + PAD * 2 <= vw) break;
    fs -= 2;
  }
  return Math.round(fs);
}

// ── Slot-Inhalt setzen ────────────────────────────
function setSlotContent(slot, item) {
  slot.innerHTML = '';
  slot.removeAttribute('style');

  const text = Array.isArray(item) ? item.join('') : item;
  slot.textContent   = text;
  slot.style.cssText = `font-size:${calcFontSizeSingleLine(text)}px;white-space:nowrap;`;
}

// ── Animation-Typ ─────────────────────────────────
function pickAnimation() {
  const t = counter % 10;
  if (t === 4 || t === 9) return 'zoom';
  if (t === 2 || t === 7) return 'flip';
  return 'slide';
}

// ── Nächste Silbe / Wort ──────────────────────────
async function showNext(immediate = false) {
  if (isAnimating && !immediate) return;

  const nextItem = await getItem(level);

  if (immediate) {
    setSlotContent(slotA, nextItem);
    slotA.className     = 'syllable-card active';
    slotA.style.opacity = '1';
    currentItem = nextItem;
    return;
  }

  isAnimating = true;
  const type       = pickAnimation();
  const exitClass  = type === 'zoom' ? 'anim-exit-zoom'  : type === 'flip' ? 'anim-exit-flip'  : 'anim-exit';
  const enterClass = type === 'zoom' ? 'anim-enter-zoom' : type === 'flip' ? 'anim-enter-flip' : 'anim-enter';

  slotA.classList.add(exitClass);

  setTimeout(() => {
    slotA.className = 'syllable-card';
    slotA.removeAttribute('style');
    setSlotContent(slotA, nextItem);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      slotA.classList.add('active', enterClass);
      setTimeout(() => {
        slotA.className     = 'syllable-card active';
        slotA.style.opacity = '1';
        isAnimating = false;
      }, 420);
    }));
  }, 340);

  currentItem = nextItem;
}

// ── Counter & Meilensteine ────────────────────────
const MILESTONES = [
  { at: 10,  emoji: '🎉', text: 'Super gemacht!' },
  { at: 20,  emoji: '🌟', text: 'Fantastisch!'   },
  { at: 50,  emoji: '🏆', text: 'Weltklasse!'    },
  { at: 100, emoji: '🚀', text: 'Unglaublich!'   },
];

function updateCounter() {
  counter++;
  counterNum.textContent = counter;
  counterNum.classList.remove('bump');
  void counterNum.offsetWidth;
  counterNum.classList.add('bump');
  const milestone = MILESTONES.find(m => counter % m.at === 0);
  if (milestone) triggerMilestone(milestone);
}

let milestoneActive = false;

function triggerMilestone({ emoji, text }) {
  milestoneActive = true;
  milestoneEmoji.textContent   = emoji;
  milestoneText.textContent    = text;
  milestoneCount.textContent   = counter;
  milestoneBgCount.textContent = counter;

  slotA.style.display = 'none';
  milestoneOverlay.classList.add('show');
  launchFireworks();
}

function closeMilestone() {
  if (!milestoneActive) return;
  milestoneActive = false;
  milestoneOverlay.classList.remove('show');
  stopFireworks();
  slotA.style.display = '';
  showNext();
}

milestoneOverlay.addEventListener('click', closeMilestone);

// ── Touch / Click ─────────────────────────────────
stage.addEventListener('click', onAdvance);
stage.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') onAdvance();
});

let touchStartX = 0;
stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
stage.addEventListener('touchend',   e => {
  if (Math.abs(e.changedTouches[0].clientX - touchStartX) > 30) onAdvance();
});

function onAdvance() {
  if (milestoneActive) { closeMilestone(); return; }
  updateCounter();
  showNext();
}

// ── Fireworks ─────────────────────────────────────
let particles = [];
let fwRaf     = null;
let fwActive  = false;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => { resizeCanvas(); showNext(true); });
resizeCanvas();

class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y;
    this.vx      = (Math.random() - 0.5) * 14;
    this.vy      = (Math.random() - 0.7) * 16;
    this.alpha   = 1;
    this.color   = color;
    this.radius  = Math.random() * 5 + 2;
    this.gravity = 0.42;
  }
  update() {
    this.x  += this.vx; this.y  += this.vy;
    this.vy += this.gravity; this.vx *= 0.98;
    this.alpha -= 0.018;
  }
  draw(c) {
    c.globalAlpha = Math.max(0, this.alpha);
    c.fillStyle   = this.color;
    c.beginPath(); c.arc(this.x, this.y, this.radius, 0, Math.PI * 2); c.fill();
  }
}

const FW_COLORS = ['#f5c842','#e05c3a','#5bcefa','#c084fc','#4ade80','#fb923c','#f472b6','#fbbf24'];

function burst(x, y) {
  const color = rnd(FW_COLORS);
  for (let i = 0; i < 60; i++) particles.push(new Particle(x, y, color));
}

function launchFireworks() {
  fwActive = true;
  canvas.classList.add('active');
  particles = [];
  [0, 350, 700, 1050, 1400, 1800].forEach(d =>
    setTimeout(() => {
      if (!fwActive) return;
      burst(canvas.width * (0.2 + Math.random() * 0.6), canvas.height * (0.1 + Math.random() * 0.45));
    }, d)
  );
  animateFireworks();
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.alpha > 0);
  particles.forEach(p => { p.update(); p.draw(ctx); });
  ctx.globalAlpha = 1;
  if (fwActive) fwRaf = requestAnimationFrame(animateFireworks);
}

function stopFireworks() {
  fwActive = false;
  cancelAnimationFrame(fwRaf);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.classList.remove('active');
  particles = [];
}

// ── Init ──────────────────────────────────────────
applyTheme();
showNext(true);