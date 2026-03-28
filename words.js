/* ═══════════════════════════════════════════════════════════════
   words.js  –  Wörterliste für Stufe 3
   ═══════════════════════════════════════════════════════════════
   Format:  'SILBE': ['ENDUNG1', 'ENDUNG2', ...]
   Daraus entstehen Wörter:  SILBE + ENDUNG
   Groß/Klein der Silbe wird beim Anzeigen zufällig gewählt.

   Einfach neue Einträge hinzufügen!
   ─────────────────────────────────────────────────────────────── */
const WORD_MAP = {
  // ── A ──
  'al':  ['t', 's', 'le', 'pen', 'arm'],
  'an':  ['t', 'ker', 'fang', 'gel'],
  'au':  ['ge', 'to', 'f'],

  // ── B ──
  'ba':  ['ll', 'd', 'ss', 'r', 'ch', 'nk'],
  'be':  ['tt', 'rg', 'in', 'sen'],
  'bi':  ['ld', 'ene', 'er'],
  'bo':  ['ot', 'den', 'xer'],
  'bu':  ['ch', 'nt', 'rg', 's'],

  // ── D ──
  'da':  ['s', 'mpf', 'ckel', 'ch', 'nn'],
  'de':  ['in', 'cke', 'r'],
  'di':  ['ch', 'ng'],
  'do':  ['rf', 'se', 'pf'],
  'du':  ['ft', 'nkel', 'rch'],

  // ── E ──
  'ei':  ['s', 'ner', 'mer', 'er'],
  'el':  ['ch', 'tern', 'fe'],
  'en':  ['te', 'gel'],
  'er':  ['de', 'nst', 'ste'],

  // ── F ──
  'fa':  ['st', 'hn', 'rm'],
  'fe':  ['ld', 'st', 'ns', 'der'],
  'fi':  ['sch', 'rm'],
  'fo':  ['rm', 'to', 'lge'],
  'fu':  ['ß', 'nk', 'nkel'],

  // ── G ──
  'ga':  ['be', 'nz', 'rten'],
  'ge':  ['lb', 'rn', 'ld'],
  'gi':  ['ft'],
  'go':  ['ld', 'tt'],
  'gu':  ['rt', 'mmig'],

  // ── H ──
  'ha':  ['nd', 'nd', 'us', 'se', 'ar'],
  'he':  ['ft', 'rd', 'rb'],
  'hi':  ['lfe', 'rsch', 'mmel'],
  'ho':  ['lz', 'se', 'nig'],
  'hu':  ['nd', 't', 'ngrig'],

  // ── I ──
  'ig':  ['el', 'lu'],
  'im':  ['mer'],
  'in':  ['sel', 'nen'],

  // ── K ──
  'ka':  ['lt', 'sse', 'fir', 'mel'],
  'ke':  ['ssel', 'tte', 'rn'],
  'ki':  ['nd', 'ste', 'rche'],
  'ko':  ['pf', 'rb', 'ch'],
  'ku':  ['chen', 'gel', 'rz'],

  // ── L ──
  'la':  ['mp', 'nd', 'ub', 'ssen'],
  'le':  ['se', 'ben', 'der', 'rnen'],
  'li':  ['cht', 'ebe', 'nk'],
  'lo':  ['ch', 'we', 'cke'],
  'lu':  ['ft', 'pe', 'stig'],

  // ── M ──
  'ma':  ['l', 'nn', 'ske', 'use'],
  'me':  ['er', 'hl', 'ssen'],
  'mi':  ['lch', 'tte', 'nze'],
  'mo':  ['nd', 'os', 'rgen'],
  'mu':  ['nd', 'tter', 'sik'],

  // ── N ──
  'na':  ['me', 'cht', 'se', 'del'],
  'ne':  ['st', 'bel', 'tz'],
  'ni':  ['cht', 'ete'],
  'no':  ['rd', 't', 'ch'],
  'nu':  ['ss', 'r', 'del'],

  // ── O ──
  'ob':  ['st', 'en'],
  'of':  ['en', 't'],
  'oh':  ['ne', 'r'],
  'or':  ['gel', 't'],
  'os':  ['ten'],

  // ── P ──
  'pa':  ['ss', 'rk', 'pier'],
  'pe':  ['nn', 'rl'],
  'pi':  ['lot', 'lz'],
  'po':  ['st', 'si', 'lster'],
  'pu':  ['nkt', 'ppe', 'ster'],

  // ── R ──
  'ra':  ['tte', 'nd', 'uch'],
  're':  ['gen', 'cht', 'de'],
  'ri':  ['ng', 'cht', 'ese'],
  'ro':  ['t', 'se', 'hr'],
  'ru':  ['he', 'nd', 'nde'],

  // ── S ──
  'sa':  ['nd', 'ft', 'ck'],
  'se':  ['ite', 'el', 'hn'],
  'si':  ['ng', 'ch', 'cher'],
  'so':  ['nne', 'ft', 'hn'],
  'su':  ['ppe', 'chen'],

  // ── T ──
  'ta':  ['g', 'sche', 'nte'],
  'te':  ['ich', 'xt'],
  'ti':  ['ger', 'sch', 'ef'],
  'to':  ['r', 'pf', 'ne'],
  'tu':  ['rm', 'ch', 'ne'],

  // ── U ──
  'uh':  ['r'],
  'ul':  ['me'],
  'um':  ['weg'],
  'un':  ['d', 'ter', 'se'],

  // ── V ──
  'va':  ['ter', 'se'],
  'vo':  ['gel', 'll', 'n'],
  'vu':  ['lkan'],

  // ── W ──
  'wa':  ['ld', 'rm', 'sse', 'nd'],
  'we':  ['g', 'lt', 'cker'],
  'wi':  ['nd', 'ese', 'ld'],
  'wo':  ['lke', 'che', 'hl'],
  'wu':  ['rm', 'rst', 'nder'],

  // ── Z ──
  'za':  ['hn', 'uber'],
  'ze':  ['lt', 'it', 'hn'],
  'zi':  ['ege', 'el', 'tter'],
  'zo':  ['o', 'pf'],
  'zu':  ['cker', 'g', 'nft'],
};