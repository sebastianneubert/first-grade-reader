/* ═══════════════════════════════════════════════════════════════
   words-level4.js  –  Stufe 4: kurze Wörter per Silben-Stemming
   ═══════════════════════════════════════════════════════════════
   Format:  'Silbe': ['Endung1', 'Endung2', ...]
   Ergibt:  Silbe + Endung  (z. B. 'Sa' + 'ft' = 'Saft')
   Groß-/Kleinschreibung des Keys ist fix.
   Neue Einträge alphabetisch einsortieren.
   ─────────────────────────────────────────────────────────────── */
const WORDS_L4 = {

  // ── A ──
  'Ab':  ['end', 'satz'],
  'al':  ['s', 't'],
  'Am':  ['sel'],
  'An':  ['fang', 'gel', 'ker'],
  'Ar':  ['beit'],
  'As':  ['t'],
  'Au':  ['ge'],

  // ── B ──
  'Ba':  ['ch', 'hn', 'll', 'nk', 'um', 'rt'],
  'Be':  ['rg', 'tt', 'sen'],
  'Bi':  ['ld', 'ss'],
  'bl':  ['au'],
  'Bl':  ['att'],
  'Bo':  ['den', 'ot'],
  'Br':  ['ief', 'ot', 'aun'],
  'br':  ['aun'],
  'Bu':  ['ch', 'rg', 'nt'],
  'bu':  ['nt'],

  // ── D ──
  'Da':  ['ch', 'mpf', 'me'],
  'di':  ['ch'],
  'Do':  ['rf', 'se'],
  'du':  ['rch'],
  'Du':  ['ft'],

  // ── E ──
  'Ei':  ['mer', 's', 's'],
  'El':  ['tern'],
  'En':  ['gel'],
  'Er':  ['de'],
  'Es':  ['el'],

  // ── F ──
  'Fa':  ['hn', 'rm', 'st', 'll'],
  'Fe':  ['ld', 'nst', 'll'],
  'Fi':  ['sch'],
  'Fl':  ['uss'],
  'Fu':  ['ß'],

  // ── G ──
  'Ga':  ['rten', 'bel'],
  'ge':  ['lb'],
  'Ge':  ['ld', 'lb'],
  'Gl':  ['as'],
  'Go':  ['ld', 'tt'],
  'Gr':  ['as'],
  'gr':  ['au', 'ün'],

  // ── H ──
  'Ha':  ['hn', 'nd', 'se', 'ut', 'us'],
  'He':  ['rb', 'rz'],
  'Hi':  ['rsch', 'mmel'],
  'Ho':  ['lz', 'nig', 'se', 'f'],
  'hu':  ['nd'],
  'Hu':  ['nd', 't'],

  // ── J ──
  'Ja':  ['gd', 'hr'],

  // ── K ──
  'Ka':  ['hn', 'mm', 'rn', 'lt', 'tze'],
  'Ki':  ['nd', 'rche', 'ste'],
  'Ko':  ['pf', 'rb', 'rn'],
  'Kr':  ['öte'],
  'Ku':  ['gel', 'h'],

  // ── L ──
  'La':  ['mm', 'nd', 'ub', 'st'],
  'Le':  ['der'],
  'li':  ['la'],
  'Li':  ['la', 'cht', 'mo'],
  'Lo':  ['ch'],
  'Lu':  ['ft'],

  // ── M ──
  'Ma':  ['nn', 'us', 'st'],
  'Me':  ['er', 'hl', 'sser'],
  'Mo':  ['nd', 'os'],
  'Mu':  ['nd', 'tter'],

  // ── N ──
  'Na':  ['se'],
  'Ne':  ['st', 'tz'],
  'No':  ['rd'],

  // ── O ──
  'Of':  ['en'],
  'Ob':  ['st'],
  'Or':  ['te'],

  // ── P ──
  'Pa':  ['rk'],
  'Po':  ['st'],

  // ── R ──
  'Ra':  ['nd', 'uch', 'd'],
  'Re':  ['gen', 'h'],
  'Ri':  ['nd', 'ng'],
  'ro':  ['sa', 't'],
  'Ro':  ['hr', 'ck', 'se', 'sa', 't'],
  'Ru':  ['he'],

  // ── S ──
  'Sa':  ['ck', 'ft', 'nd', 'tz', 'lat'],
  'sch': ['warz'],
  'Sch': ['warz', 'af', 'uh', 'iff'],
  'Se':  ['il'],
  'Si':  ['ch'],
  'So':  ['hn', 'nne', 'fa'],
  'St':  ['ern'],

  // ── T ──
  'Ta':  ['kt', 'nz', 'sse', 'g'],
  'Te':  ['ig', 'il'],
  'Ti':  ['er'],
  'To':  ['rf', 'n', 'r', 'te'],
  'Tu':  ['ch', 'rm', 'lpe'],

  // ── V ──
  'Vi':  ['eh'],

  // ── W ──
  'Wa':  ['ld', 'nd', 'rm', 'sser'],
  'we':  ['iß'],
  'We':  ['in', 'lt', 'iß'],
  'Wi':  ['nd'],
  'Wo':  ['lf', 'rt', 'che'],

  // ── Z ──
  'Za':  ['hn'],
  'Ze':  ['it', 'lt'],
  'Zi':  ['el'],
  'Zo':  ['ll', 'pf'],
  'Zu':  ['g', 'nge']

};