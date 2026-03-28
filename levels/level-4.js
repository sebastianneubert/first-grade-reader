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
  'Ar':  ['beit', 'm', 't'],
  'As':  ['t'],
  'Au':  ['ge', 'to'],
  'au':  ['ch', 'f'],

  // ── B ──
  'Ba':  ['ch', 'hn', 'll', 'nk', 'um', 'rt'],
  'Be':  ['rg', 'tt', 'sen'],
  'Bi':  ['ld', 'ss'],
  'bl':  ['au'],
  'Bl':  ['att'],
  'Bo':  ['den', 'ot'],
  'Br':  ['ief', 'ot', 'uder', 'ust'],
  'br':  ['aun'],
  'Bu':  ['ch', 'rg', 's'],
  'bu':  ['nt'],

  // ── D ──
  'Da':  ['ch', 'mpf', 'me'],
  'di':  ['ch'],
  'Do':  ['rf', 'se'],
  'du':  ['rch'],
  'Du':  ['ft'],

  // ── E ──
  'Ei':  ['mer', 's', '', 'n', 'ne'],
  'ei':  ['n', 'ne', 'ner'],
  'El':  ['tern', 'f', 'fe', 'ch'],
  'En':  ['gel', 'te', 'de'],
  'en':  ['g'],
  'Er':  ['de', 'nst'],
  'Es':  ['el', 'sen'],

  // ── F ──
  'Fa':  ['hne', 'rn', 'rm', 'st', 'll','rbe'],
  'fa':  ['st'],
  'Fe':  ['ld', 'll'],
  'Fi':  ['sch'],
  'Fl':  ['uss'],
  'Fu':  ['ß', 'nk'],

  // ── G ──
  'Ga':  ['rten', 'bel'],
  'ge':  ['lb'],
  'Ge':  ['ld', 'lb'],
  'Gl':  ['as'],
  'Go':  ['ld'],
  'Gr':  ['as'],
  'gr':  ['au', 'ün', 'oß'],

  // ── H ──
  'Ha':  ['hn', 'nd', 'se', 'ut', 'us'],
  'He':  ['ld', 'rz', 'xe'],
  'Hi':  ['rsch', 'mmel', 'lfe'],
  'Ho':  ['lz', 'nig', 'se', 'f'],
  'hu':  ['pen'],
  'Hu':  ['nd', 't', 'pe', 'f'],

  // ── J ──
  'Ja':  ['gd', 'hr'],

  // ── K ──
  'Ka':  ['hn', 'mm', 'tze'],
  'ka':  ['lt', 'tze'],
  'Ki':  ['nd', 'rche', 'ste', 'no', 'lo'],
  'Ko':  ['pf', 'rb', 'rn'],
  'Kr':  ['öte'],
  'Ku':  ['gel', 'h'],

  // ── L ──
  'La':  ['mm', 'nd', 'ub', 'st', 'us'],
  'Le':  ['der', 'ber', 'go', 'hm', 'ben'],
  'li':  ['la'],
  'Li':  ['cht', 'mo'],
  'Lo':  ['ch', 'hn', 's'],
  'Lu':  ['ft'],

  // ── M ──
  'Ma':  ['nn', 'us', 'st'],
  'Me':  ['er', 'hl', 'sser'],
  'Mo':  ['nd', 'os'],
  'Mu':  ['nd', 'tter'],

  // ── N ──
  'Na':  ['se'],
  'Ne':  ['st', 'tz', 'mo'],
  'ne':  ['tt'],
  'No':  ['rd'],

  // ── O ──
  'Of':  ['en'],
  'of':  ['fen', 't'],
  'Ob':  ['st'],
  'Or':  ['t', 'gel'],

  // ── P ──
  'Pa':  ['rk'],
  'Po':  ['st'],

  // ── R ──
  'Ra':  ['nd', 'uch', 'd'],
  'Re':  ['gen', 'h'],
  'Ri':  ['nd', 'ng'],
  'ro':  ['sa', 't'],
  'Ro':  ['hr', 'ck', 'se'],
  'Ru':  ['he'],
  'ru':  ['nd', 'hig'],

  // ── S ──
  'Sa':  ['ck', 'ft', 'nd', 'tz', 'lat'],
  'sch': ['warz'],
  'Sch': ['warz', 'af', 'uh', 'iff'],
  'Se':  ['il'],
  'si':  ['ch', 'e', 'nd'],
  'So':  ['hn', 'nne', 'fa'],
  'St':  ['ern', 'adt'],

  // ── T ──
  'Ta':  ['kt', 'nz', 'sse', 'g', 'xi'],
  'Te':  ['ig', 'il'],
  'Ti':  ['er', 'ger'],
  'To':  ['n', 'r', 'rte'],
  'to':  ['ben', 'p'],
  'Tu':  ['ch', 'rm', 'lpe'],

  // ── V ──
  'Vi':  ['eh'],

  // ── W ──
  'Wa':  ['ld', 'nd', 'sser', 'nze'],
  'wa':  ['rm', 'rten'],
  'we':  ['iß'],
  'We':  ['in', 'g'],
  'Wi':  ['nd', 'nter'],
  'Wo':  ['lf', 'rt', 'che'],

  // ── Z ──
  'Za':  ['hn', 'hl'],
  'Ze':  ['it', 'lt', 'hn'],
  'Zi':  ['el', 'ege'],
  'Zo':  ['ll', 'pf'],
  'Zu':  ['g', 'nge']

};