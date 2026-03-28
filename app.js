/* ────────────────────────────────────────────────
   Lese-Übung  –  app.js
   ──────────────────────────────────────────────── */

// ── Buchstaben-Konfiguration ──────────────────────
// Hier einfach weitere Konsonanten eintragen.
const VOWELS     = ['a', 'e', 'i', 'o', 'u'];
const CONSONANTS = ['l', 's', 't', 'r', 'm', 'n', 'f', 'k', 'p'];
// Erweitert werden kann z. B. mit: 'b','d','g','h','j','v','w','z'

// ── Silben-Generator ─────────────────────────────
function randomCap(str) {
  return Math.random() < 0.5
    ? str.toUpperCase()
    : str.toLowerCase();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Erzeugt eine zufällige zweistellige Silbe (KV oder VK). */
function makeSyllable() {
  const c = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
  const v = VOWELS[Math.floor(Math.random() * VOWELS.length)];

  // KV oder VK
  let syl = Math.random() < 0.5 ? c + v : v + c;

  // Ersten Buchstaben zufällig groß/klein,
  // Rest zufällig groß/klein
  syl = syl
    .split('')
    .map((ch, i) => i === 0 ? randomCap(ch) : ch)
    .join('');

  return syl;
}

/** Gibt eine einzelne Silbe zurück (Stufe 1)
    oder zwei Silben als Array zurück (Stufe 2). */
function getItem(level) {
  if (level === 1) return makeSyllable();
  return [makeSyllable(), makeSyllable()];
}

// ── State ─────────────────────────────────────────
let counter     = 0;
let level       = 1;
let darkMode    = prefersDark();
let isAnimating = false;

// ── DOM-Referenzen ─────────────────────────────────
const stage         = document.getElementById('stage');
const slotA         = document.getElementById('syllable-a');
const slotB         = document.getElementById('syllable-b');  // ungenutzt, aber im DOM
const counterNum    = document.getElementById('counter-num');
const themeBtn      = document.getElementById('theme-btn');
const levelBtn      = document.getElementById('level-btn');
const levelLabel    = document.getElementById('level-label');
const iconMoon      = document.getElementById('icon-moon');
const iconSun       = document.getElementById('icon-sun');
const canvas        = document.getElementById('fireworks-canvas');
const milestoneOverlay = document.getElementById('milestone-overlay');
const milestoneText    = document.getElementById('milestone-text');
const milestoneEmoji   = document.getElementById('milestone-emoji');
const wrapper       = document.getElementById('syllable-wrapper');
const ctx           = canvas.getContext('2d');

// ── Theme ─────────────────────────────────────────
function prefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  iconMoon.style.display = darkMode ? 'block' : 'none';
  iconSun.style.display  = darkMode ? 'none'  : 'block';
}

themeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  darkMode = !darkMode;
  applyTheme();
});

// System-Farbschema live beobachten
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', e => { darkMode = e.matches; applyTheme(); });

// ── Level ─────────────────────────────────────────
levelBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  level = level === 1 ? 2 : 1;
  levelLabel.textContent = `Stufe ${level}`;
  wrapper.classList.toggle('two-syllable', level === 2);
  showNext(true /* immediate */);
});

// ── Font-size anpassen ────────────────────────────
function calcFontSize(text) {
  // Maximale Größe: so groß wie möglich ohne overflow
  const vw = window.innerWidth;
  const vh = window.innerHeight - 64; // header
  const len = text.length;

  // Grobe Formel: je kürzer der Text, desto größer
  let size = Math.min(vw * 0.72, vh * 0.7);
  if (len > 2) size *= 0.85;
  if (len > 4) size *= 0.75;
  return Math.round(size);
}

// ── Inhalt eines Slots setzen ─────────────────────
function setSlotContent(slot, item) {
  slot.innerHTML = '';
  slot.style.fontSize = '';
  slot.style.flexDirection = '';
  slot.style.gap = '';

  if (level === 1) {
    // Einzelne Silbe
    slot.textContent = item;
    slot.style.fontSize = calcFontSize(item) + 'px';
    slot.classList.remove('two-part');
  } else {
    // Zwei Silben nebeneinander mit Bindestrich
    slot.style.display = 'flex';
    slot.style.flexDirection = 'row';
    slot.style.alignItems = 'center';
    slot.style.justifyContent = 'center';
    slot.style.gap = '0.15em';
    slot.style.width = '100%';

    const s1 = document.createElement('span');
    const sep = document.createElement('span');
    const s2 = document.createElement('span');

    s1.textContent  = item[0];
    sep.textContent = '–';
    s2.textContent  = item[1];

    sep.className = 'syllable-separator';

    const fs = calcFontSize(item[0] + item[1]) * 0.85;
    s1.style.cssText  = `font-family: var(--font-main); font-weight: 800; color: var(--fg); font-size: ${fs}px; line-height: 1;`;
    s2.style.cssText  = s1.style.cssText;
    sep.style.fontSize = fs * 0.6 + 'px';

    slot.appendChild(s1);
    slot.appendChild(sep);
    slot.appendChild(s2);
  }
}

// ── Animation-Typ auswählen ───────────────────────
function pickAnimation() {
  const t = counter % 10;
  if (t === 4 || t === 9) return 'zoom';
  if (t === 2 || t === 7) return 'flip';
  return 'slide';
}

// ── Nächste Silbe anzeigen ────────────────────────
let currentItem = null;

function showNext(immediate = false) {
  if (isAnimating && !immediate) return;

  const nextItem = getItem(level);

  if (immediate) {
    setSlotContent(slotA, nextItem);
    slotA.className = 'syllable-card active';
    slotA.style.opacity   = '1';
    slotA.style.transform = '';
    currentItem = nextItem;
    return;
  }

  isAnimating = true;
  const type       = pickAnimation();
  const exitClass  = type === 'zoom' ? 'anim-exit-zoom'  : type === 'flip' ? 'anim-exit-flip'  : 'anim-exit';
  const enterClass = type === 'zoom' ? 'anim-enter-zoom' : type === 'flip' ? 'anim-enter-flip' : 'anim-enter';

  // 1. Raus-Animation
  slotA.classList.add(exitClass);

  // 2. Nach Exit: Inhalt tauschen + Rein-Animation
  setTimeout(() => {
    slotA.className   = 'syllable-card';
    slotA.style.cssText = '';
    setSlotContent(slotA, nextItem);

    // Zwei rAF-Frames Pause damit Browser den Reset sieht
    requestAnimationFrame(() => requestAnimationFrame(() => {
      slotA.classList.add('active', enterClass);

      setTimeout(() => {
        slotA.className       = 'syllable-card active';
        slotA.style.opacity   = '1';
        slotA.style.transform = '';
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
  void counterNum.offsetWidth; // reflow für animation restart
  counterNum.classList.add('bump');

  const milestone = MILESTONES.find(m => counter % m.at === 0);
  if (milestone) {
    triggerMilestone(milestone);
  }
}

function triggerMilestone({ emoji, text }) {
  milestoneEmoji.textContent = emoji;
  milestoneText.textContent  = text;
  milestoneOverlay.classList.add('show');
  launchFireworks();

  setTimeout(() => {
    milestoneOverlay.classList.remove('show');
    stopFireworks();
    showNext();
  }, 3200);
}

// ── Touch / Click ─────────────────────────────────
stage.addEventListener('click', onAdvance);
stage.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') onAdvance();
});

// Swipe support
let touchStartX = 0;
stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
stage.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 30) onAdvance(); // jede Wischrichtung zählt
});

function onAdvance() {
  if (milestoneOverlay.classList.contains('show')) return;
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
    this.x  = x; this.y  = y;
    this.vx = (Math.random() - 0.5) * 14;
    this.vy = (Math.random() - 0.7) * 16;
    this.alpha = 1;
    this.color = color;
    this.radius = Math.random() * 5 + 2;
    this.gravity = 0.42;
  }
  update() {
    this.x  += this.vx;
    this.y  += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.98;
    this.alpha -= 0.018;
  }
  draw(ctx) {
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const FW_COLORS = [
  '#f5c842','#e05c3a','#5bcefa','#c084fc',
  '#4ade80','#fb923c','#f472b6','#fbbf24'
];

function burst(x, y) {
  const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
  for (let i = 0; i < 60; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function launchFireworks() {
  fwActive = true;
  canvas.classList.add('active');
  particles = [];

  // Mehrere Bursts
  const shots = [0, 300, 600, 900, 1200, 1600];
  shots.forEach(delay => {
    setTimeout(() => {
      if (!fwActive) return;
      const x = canvas.width  * (0.25 + Math.random() * 0.5);
      const y = canvas.height * (0.15 + Math.random() * 0.4);
      burst(x, y);
    }, delay);
  });

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