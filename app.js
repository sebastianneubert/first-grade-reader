/* ────────────────────────────────────────────────
   Lese-Übung  –  app.js
   ──────────────────────────────────────────────── */

// ── Buchstaben-Konfiguration ──────────────────────
const VOWELS     = ['a', 'e', 'i', 'o', 'u'];
const CONSONANTS = ['l', 's', 't', 'r', 'm', 'n', 'f', 'k', 'p'];
// Weitere Konsonanten einfach hinzufügen: 'b','d','g','h','j','v','w','z'

// ── Silben-Generator ─────────────────────────────
function randomCap(ch) {
  return Math.random() < 0.5 ? ch.toUpperCase() : ch.toLowerCase();
}

function makeSyllable() {
  const c = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
  const v = VOWELS[Math.floor(Math.random() * VOWELS.length)];
  const raw = Math.random() < 0.5 ? c + v : v + c;
  return raw.split('').map(randomCap).join('');
}

function getItem(lvl) {
  return lvl === 1 ? makeSyllable() : [makeSyllable(), makeSyllable()];
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
const milestoneTap     = document.getElementById('milestone-tap');
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

// ── Level ─────────────────────────────────────────
levelBtn.addEventListener('click', e => {
  e.stopPropagation();
  level = level === 1 ? 2 : 1;
  levelLabel.textContent = `Stufe ${level}`;
  showNext(true);
});

// ── Font-size ─────────────────────────────────────
function calcFontSize(text) {
  const vw  = window.innerWidth;
  const vh  = window.innerHeight - 64;
  const len = text.length;
  let size  = Math.min(vw * 0.72, vh * 0.7);
  if (len > 2) size *= 0.85;
  if (len > 4) size *= 0.75;
  return Math.round(size);
}

// ── Slot-Inhalt setzen ────────────────────────────
function setSlotContent(slot, item) {
  slot.innerHTML = '';
  slot.removeAttribute('style');

  if (level === 1) {
    slot.textContent    = item;
    slot.style.fontSize = calcFontSize(item) + 'px';
  } else {
    // Vertikal stapeln → passt immer auf den Handyscreen
    const vw  = window.innerWidth;
    const vh  = window.innerHeight - 64;
    // Jede Silbe bekommt max ~42 % der Stage-Höhe und max 85 % Breite
    const fs  = Math.round(Math.min(vh * 0.42, vw * 0.85));
    const sepFs = Math.round(fs * 0.3);

    slot.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.04em;width:100%;';

    const s1  = document.createElement('span');
    const sep = document.createElement('span');
    const s2  = document.createElement('span');

    s1.textContent  = item[0];
    sep.textContent = '–';
    s2.textContent  = item[1];

    const sylStyle = `font-family:var(--font-main);font-weight:800;color:var(--fg);font-size:${fs}px;line-height:1.05;`;
    s1.style.cssText  = sylStyle;
    s2.style.cssText  = sylStyle;
    sep.style.cssText = `font-family:var(--font-main);font-weight:800;color:var(--accent);opacity:0.4;font-size:${sepFs}px;line-height:1;`;

    slot.appendChild(s1);
    slot.appendChild(sep);
    slot.appendChild(s2);
  }
}

// ── Animation-Typ ─────────────────────────────────
function pickAnimation() {
  const t = counter % 10;
  if (t === 4 || t === 9) return 'zoom';
  if (t === 2 || t === 7) return 'flip';
  return 'slide';
}

// ── Nächste Silbe ─────────────────────────────────
function showNext(immediate = false) {
  if (isAnimating && !immediate) return;

  const nextItem = getItem(level);

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
  milestoneEmoji.textContent = emoji;
  milestoneText.textContent  = text;
  milestoneCount.textContent   = counter;
  milestoneBgCount.textContent = counter;
  // Silbe verstecken während Feuerwerk läuft
  slotA.style.visibility = 'hidden';
  milestoneOverlay.classList.add('show');
  launchFireworks();
}

function closeMilestone() {
  if (!milestoneActive) return;
  milestoneActive = false;
  milestoneOverlay.classList.remove('show');
  stopFireworks();
  slotA.style.visibility = '';
  showNext();
}

// Tap/Click im Milestone-Overlay schließt es
milestoneOverlay.addEventListener('click', closeMilestone);

// ── Touch / Click ─────────────────────────────────
stage.addEventListener('click', onAdvance);
stage.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') onAdvance();
});

let touchStartX = 0;
stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
stage.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 30) onAdvance();
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
    this.vx = (Math.random() - 0.5) * 14;
    this.vy = (Math.random() - 0.7) * 16;
    this.alpha  = 1;
    this.color  = color;
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
  draw(c) {
    c.globalAlpha = Math.max(0, this.alpha);
    c.fillStyle   = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
  }
}

const FW_COLORS = ['#f5c842','#e05c3a','#5bcefa','#c084fc','#4ade80','#fb923c','#f472b6','#fbbf24'];

function burst(x, y) {
  const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
  for (let i = 0; i < 60; i++) particles.push(new Particle(x, y, color));
}

function launchFireworks() {
  fwActive = true;
  canvas.classList.add('active');
  particles = [];
  [0, 350, 700, 1050, 1400, 1800].forEach(delay => {
    setTimeout(() => {
      if (!fwActive) return;
      burst(canvas.width * (0.2 + Math.random() * 0.6), canvas.height * (0.1 + Math.random() * 0.45));
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