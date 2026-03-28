/* ═══════════════════════════════════════════════════════════════
   words.js  –  Wörterliste für Stufe 3
   ═══════════════════════════════════════════════════════════════
   Format:  'SILBE': ['ENDUNG1', 'ENDUNG2', ...]
   Daraus entstehen Wörter:  SILBE + ENDUNG

   Groß-/Kleinschreibung der Silbe bestimmt das angezeigte Wort:
     'Ba': ['ll', 'd']  →  Ball, Bad
     'ba': ['ch', 'nk'] →  bach, bank

   Einfach neue Einträge hinzufügen und alphabetisch einsortieren!
   ─────────────────────────────────────────────────────────────── */
const WORD_MAP = {

  // ── A ──
  'Al':  ['le', 'pen', 'ter'],
  'al':  ['s', 't'],
  'Am':  ['sel', 'pel'],
  'An':  ['fang', 'gel', 'ker', 'zug'],
  'an':  ['', 'ders'],
  'Ap':  ['fel', 'ril'],
  'Arm': ['band', 'ut'],
  'Au':  ['ge', 'to'],
  'au':  ['ch', 'f'],
  'As':  ['t'],

  // ── B ──
  'Ba':  ['d', 'll', 'nk', 'r', 'um', 'by', 'nd'],
  'ba':  ['ld', 'den', 'cken'],
  'Be':  ['ere', 'in', 'rg', 'tt'],
  'Bi':  ['bel', 'ene', 'er', 'ld'],
  'bi':  ['nden', 's'],
  'Bo':  ['den', 'ot', 'xer'],
  'Br':  ['ief', 'ot', 'ücke', 'uder', 'ust'],
  'Bu':  ['ch', 'rg', 's'],
  'bu':  ['nt'],

  // ── D ──
  'Da':  ['ch', 'ckel', 'mpf'],
  'da':  ['nn', 's', 'rum'],
  'De':  ['cke', 'ich'],
  'de':  ['n', 'r', 's'],
  'Di':  ['ng','eb'],
  'di':  ['ch', 'e', 'r'],
  'do':  ['ch', 'of'],
  'Do':  ['rf', 'se'],
  'Dr':  ['ache', 'eck'],
  'Du':  ['ft', 'nkel'],
  'du':  ['nkel', 'rch'],

  // ── E ──
  'Ei':  ['', 'mer', 'ner', 's'],
  'El':  ['ch', 'fe', 'tern'],
  'En':  ['gel', 'te'],
  'Er':  ['de', 'nst', 'nte'],
  'Es':  ['el', 'sen'],

  // ── F ──
  'Fa':  ['hn', 'rm', 'st'],
  'Fe':  ['der', 'ld', 'nst', 'r'],
  'Fi':  ['rm', 'sch'],
  'Fl':  ['iege', 'uss'],
  'fo':  ['rt'],
  'Fo':  ['lge', 'rm', 'to'],
  'Fu':  ['nk', 'nkel', 'ß'],

  // ── G ──
  'Ga':  ['be', 'rten', 'sse'],
  'Ge':  ['ld', 'lb', 'rn'],
  'Gi':  ['ft'],
  'gl':  ['att'],
  'Go':  ['ld', 'tt'],
  'Gr':  ['as', 'ippe', 'oß'],
  'Gu':  ['mmig', 'rt'],
  'gut': [''],

  // ── H ──
  'Ha':  ['ar', 'nd', 'se', 'us'],
  'He':  ['ft', 'rb', 'rd'],
  'Hi':  ['lfe', 'mmel', 'rsch'],
  'Ho':  ['nig', 'se'],
  'ho':  ['ch', 'hl'],
  'Hu':  ['nd', 'ngrig', 't'],

  // ── I ──
  'Ig':  ['el'],
  'Im':  ['ker'],
  'im':  ['mer'],
  'In':  ['sel'],
  'in':  ['s'],

  // ── J ──
  'Ja':  ['hr', 'cke'],
  'Jo':  ['ghurt', 'lle'],
  'Ju':  ['ngel', 'nge'],

  // ── K ──
  'Ka':  ['fir', 'lt', 'mel', 'sse'],
  'Ke':  ['rn', 'ssel', 'tte'],
  'Ki':  ['nd', 'rche', 'ste'],
  'Kl':  ['ang', 'eid'],
  'Ko':  ['ch', 'pf', 'rb'],
  'Kr':  ['ähe', 'öte'],
  'Ku':  ['chen', 'gel', 'h', 'rz'],

  // ── L ──
  'La':  ['mp', 'nd', 'ssen', 'ub'],
  'Le':  ['ben', 'der', 'rnen', 'se'],
  'Li':  ['cht', 'ebe', 'nk'],
  'Lo':  ['ch', 'cke', 'we'],
  'Lu':  ['ft', 'pe', 'stig'],

  // ── M ──
  'Ma':  ['l', 'nn', 'ske', 'use'],
  'Me':  ['er', 'hl', 'ssen'],
  'Mi':  ['lch', 'nze', 'tte'],
  'Mo':  ['nd', 'os', 'rgen'],
  'Mu':  ['nd', 'sik', 'tter'],

  // ── N ──
  'Na':  ['del', 'me', 'cht', 'se'],
  'Ne':  ['bel', 'st', 'tz'],
  'ni':  ['cht'],
  'No':  ['rd', 't'],
  'no':  ['ch'],
  'Nu':  ['del', 'ss'],
  'nu':  ['r'],

  // ── O ──
  'Ob':  ['st'],
  'Of':  ['en'],
  'Oh':  ['r'],
  'Or':  ['gel', 't'],

  // ── P ──
  'Pa':  ['pier', 'rk', 'ss'],
  'Pe':  ['rl', 'nn'],
  'Pi':  ['lot', 'lz'],
  'Po':  ['lster', 'si', 'st'],
  'Pu':  ['ppe', 'nkt', 'ster'],

  // ── R ──
  'Ra':  ['nd', 'tte', 'uch'],
  'Re':  ['gen', 'cht', 'de'],
  'Ri':  ['ese', 'ng', 'cht'],
  'Ro':  ['hr', 'se', 't'],
  'Ru':  ['he', 'nd', 'nde'],

  // ── S ──
  'Sa':  ['ck', 'ft', 'nd'],
  'Sc':  ['haf', 'hiff', 'hnee', 'hule', 'hwein'],
  'Se':  ['gel', 'nse', 'ite'],
  'se':  ['lbst', 'hr', 'hen'],
  'Si':  ['eg', 'lo'],
  'si':  ['ch','cher', 'ngen'],
  'So':  ['hn', 'ft', 'nne', 'rte'],
  'so':  ['ft', 'll'],
  'Sp':  ['echt', 'iel', 'ass'],
  'St':  ['adt', 'ein', 'ern', 'off'],
  'Su':  ['ppe'],

  // ── T ──
  'Ta':  ['g', 'nte', 'sche'],
  'Te':  ['ich', 'xt'],
  'Ti':  ['ef', 'ger', 'sch'],
  'To':  ['ne', 'pf', 'r'],
  'Tr':  ['aube', 'om'],
  'Tu':  ['ch', 'ne', 'rm'],

  // ── U ──
  'Uh':  ['r'],
  'Ul':  ['me'],
  'Un':  ['d', 'se', 'ter'],
  'un':  ['d'],

  // ── V ──
  'Va':  ['ter', 'se'],
  'Vo':  ['gel', 'll', 'n'],
  'Vu':  ['lkan'],

  // ── W ──
  'Wa':  ['ld', 'nd', 'rm', 'sse'],
  'We':  ['cker', 'g', 'lt'],
  'Wi':  ['ese', 'ld', 'nd'],
  'Wo':  ['che', 'hl', 'lke'],
  'Wu':  ['rm', 'rst', 'nder'],

  // ── Z ──
  'Za':  ['hn', 'uber'],
  'Ze':  ['hn', 'it', 'lt'],
  'Zi':  ['ege', 'el', 'tter'],
  'Zo':  ['o', 'pf'],
  'Zu':  ['cker', 'g', 'nft'],

};