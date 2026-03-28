/* ═══════════════════════════════════════════════════════════════
   words-level5.js  –  Stufe 5: mehrsilbige komplexere Wörter
   ═══════════════════════════════════════════════════════════════
   Format:  'Silbe': ['Endung1', 'Endung2', ...]
   Wörter sind länger (5-10 Buchstaben), mehrsilbig.
   Groß-/Kleinschreibung des Keys ist fix.
   Neue Einträge alphabetisch einsortieren.
   ─────────────────────────────────────────────────────────────── */
const WORDS_L5 = {

  // ── A ──
  'Ab':   ['endrot', 'teilung'],
  'Ach':  ['tung'],
  'Al':   ['ligator', 'phabet'],
  'Am':   ['meise', 'phibie'],
  'An':   ['fänger', 'geber', 'halten', 'kunft', 'zug'],
  'Ap':   ['felsaft', 'rikose'],
  'Ar':   ['beitnehmer', 'tikel'],
  'Ast':  ['ronaut'],
  'Au':   ['bergine', 'fgabe', 'sgang', 'tozug'],

  // ── B ──
  'Ba':   ['ckstein', 'hnhof', 'llspiel', 'nane', 'steln'],
  'Be':   ['deutung', 'gleitung', 'obachter', 'rühmtheit', 'wegung', 'zahlung'],
  'Bi':   ['bliothek', 'enenstock', 'ologie'],
  'Bl':   ['aukraut', 'eitstift', 'umefeld'],
  'Bo':   ['denfläche', 'taniker'],
  'Br':   ['andwache', 'ombeere', 'ückentor'],
  'Bu':   ['chhandlung', 'ntstift', 'rgermeister'],

  // ── D ──
  'Da':   ['menhandtasche', 'mpfmaschine', 'tenbank'],
  'De':   ['ckfarbe', 'mokratie'],
  'Di':   ['chterling', 'nosauria'],
  'Do':   ['nnergrollen', 'ppelzimmer'],
  'Dr':   ['achenflieger', 'ehbuch', 'uckfarbe'],
  'Du':   ['nkelkammer', 'rchmesser'],

  // ── E ──
  'Ei':   ['nbahnstraße', 'senbahn', 'sweiler'],
  'El':   ['efant', 'ektrizität'],
  'En':   ['gelszungen', 'twurf'],
  'Er':   ['dbeben', 'dbeermarmelade', 'findung', 'gebnis', 'innerung', 'klärung', 'öffnung'],

  // ── F ──
  'Fa':   ['brikantin', 'hrradweg', 'lschirmjäger'],
  'Fe':   ['derhalter', 'rnsehturm', 'stlichkeit'],
  'Fi':   ['nanzamt', 'schmarkt'],
  'Fl':   ['amingo', 'aschenpost', 'ugzeug'],
  'Fo':   ['rtschritt', 'tografie'],
  'Fr':   ['emdsprache', 'ühlingsfest'],
  'Fu':   ['nklstation', 'ßballfeld'],

  // ── G ──
  'Ga':   ['nsblümchen', 'rtenarbeit'],
  'Ge':   ['birge', 'burtstag', 'heimnis', 'meinschaft', 'schwindigkeit', 'sellschaft'],
  'Gi':   ['raftiere'],
  'Gl':   ['etscher', 'ühwürmchen'],
  'Go':   ['ldmedaille'],
  'Gr':   ['asgarten', 'enzkontrolle', 'ifvogel'],
  'Gu':   ['rkensalat'],

  // ── H ──
  'Ha':   ['ndtasche', 'ntelbank', 'uptsache', 'usaufgabe'],
  'He':   ['rbstblatt', 'rzschlag', 'xenschuss'],
  'Hi':   ['mmelsrichtung', 'rtenflöte'],
  'Ho':   ['chgebirge', 'ntgasse', 'ppelganger', 'rizont'],
  'Hu':   ['feisen', 'ndefutter'],

  // ── I ──
  'Im':   ['kerei', 'pfstoffe'],
  'In':   ['formieren', 'genieur', 'sektenhaus', 'ternet'],

  // ── J ──
  'Ja':   ['hrmarkt', 'gdsaison'],
  'Jo':   ['ghurtbecher'],
  'Ju':   ['biläum', 'ngtier'],

  // ── K ──
  'Ka':   ['ffeemaschine', 'leidoskop', 'meradschaft', 'rtoffelfeld'],
  'Ki':   ['nderheim', 'rchturm'],
  'Kl':   ['apperschlange', 'ettertour'],
  'Ko':   ['mpassnadel', 'nifere'],
  'Kr':   ['ankenwagen', 'eisverkehr', 'okodil'],
  'Ku':   ['gelbahn', 'nstgalerie', 'rbissuppe'],

  // ── L ──
  'La':   ['ndschaft', 'ternenumzug'],
  'Le':   ['bensmittel', 'hrgebäude', 'uchtturm'],
  'Li':   ['bellenteich', 'monaden'],
  'Ll':   ['amaherde'],
  'Lo':   ['komotive', 'wenherz'],
  'Lu':   ['ftballon', 'pewarmth'],

  // ── M ──
  'Ma':   ['gnetfeld', 'nderley', 'thematikheft', 'trosenanzug'],
  'Me':   ['eresboden', 'hdresse', 'llonenfeld'],
  'Mi':   ['lchstraße', 'ttelalter'],
  'Mo':   ['fahrrad', 'ndfähre', 'squitonetz'],
  'Mu':   ['schelhaufen', 'seumsführung'],

  // ── N ──
  'Na':   ['belschnur', 'chbarschaft', 'turwissenschaft'],
  'Ne':   ['belhorn', 'nnnummer'],
  'Ni':   ['ederschlag', 'lspferd'],
  'No':   ['rdlicht', 'tbremse'],

  // ── O ──
  'Ob':   ['stgarten', 'stkorb'],
  'Or':   ['chestergräben', 'gelkonzert'],

  // ── P ──
  'Pa':   ['lmenblatt', 'pierkorb', 'radiesvogel', 'rkanlage'],
  'Pe':   ['nguinkolonie', 'riodentabelle'],
  'Pi':   ['lotenkanzel', 'ratenschiff'],
  'Pl':   ['ankenweg', 'anetarium'],
  'Po':   ['larlichter', 'stbriefkasten'],
  'Pu':   ['ppenhäuser', 'stelblume'],

  // ── R ──
  'Ra':   ['dfahrer', 'kete', 'umsonde', 'upenblatt'],
  'Re':   ['genbogen', 'genwald', 'ttungshubschrauber'],
  'Ri':   ['esenrad', 'tterspiel'],
  'Ro':   ['ckkonzert', 'senbusch', 'tendorn'],
  'Ru':   ['derboot', 'mpelkammer'],

  // ── S ──
  'Sa':   ['fareise', 'ndburg', 'tzzeichen'],
  'Sc':   ['hmetterling', 'hneeflöckchen', 'hreibtisch'],
  'Se':   ['gelboot', 'rpenthaar'],
  'Si':   ['cherheitsnadel', 'ebengestirn'],
  'So':   ['mmerfest', 'nnenblume', 'nnenschirm'],
  'Sp':   ['ielzeugkiste', 'ringbrunnen'],
  'St':   ['adtbibliothek', 'einbrücke', 'ernenhimmel'],
  'Su':   ['chmaschine', 'mpfgebiet'],

  // ── T ──
  'Ta':   ['geszeitung', 'schenmesser'],
  'Te':   ['lefonnummer', 'mperatur'],
  'Ti':   ['ergartenbesuch', 'gerstreife'],
  'To':   ['nebeschreibung', 'rtenschicht'],
  'Tr':   ['aubenhaus', 'inkwasser'],
  'Tu':   ['rmspringen', 'tenschreiber'],

  // ── U ──
  'Uh':   ['rmacher'],
  'Un':   ['terricht', 'terwasser'],

  // ── V ──
  'Ve':   ['rbindungsweg', 'rkehrsmittel', 'rsprechen'],
  'Vo':   ['gelbeobachtung', 'lksmusik'],

  // ── W ──
  'Wa':   ['lfahrtsort', 'nderweg', 'schmaschine'],
  'We':   ['iterbildung', 'ltkarte'],
  'Wi':   ['esenblume', 'ndkraft'],
  'Wo':   ['lkendecke', 'lkenkratzer'],
  'Wu':   ['nderland', 'rstelsuppe'],

  // ── Z ──
  'Za':   ['uberwald'],
  'Ze':   ['ichentrick', 'itschrift'],
  'Zi':   ['rkeltraining', 'truspresse'],
  'Zu':   ['ckerbäcker', 'greifvogel'],

};