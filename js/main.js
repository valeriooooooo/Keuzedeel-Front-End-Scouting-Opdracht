/* ============================================================
   Scouting Nederland — Applicatielogica
   Bevat: mobiel menu, competentieroos opbouw & berekening,
   radardiagram, formulier-afhandeling.
   ============================================================ */

/* ----------------------------------------------------------
   1. Mobiel navigatie-menu
   ---------------------------------------------------------- */
document.getElementById('menu-toggle').addEventListener('click', () => {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
});

// Menu sluiten na klikken op een link
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.add('hidden');
    menu.classList.remove('flex');
  });
});


/* ----------------------------------------------------------
   2. Competentieroos — referentiedata
   Afgeleid uit de aangeleverde Excel (kwalificatiekaart teamleiding).
   ---------------------------------------------------------- */

const HOOFDTAKEN = {
  1: 'Coördinerende en teamgerichte taken',
  2: 'Kwaliteitsbewaking team en programma',
  3: 'Vertegenwoordiging team binnen en buiten groep'
};

const MODULEN = {
  1:  'Spelvisie en spelaanbod',
  3:  'Scouting Academy',
  4:  'Leeftijdseigen kenmerken',
  6:  'Programmeren',
  7:  'Motivatietechnieken en groepsproces',
  8:  'Veiligheid',
  10: 'Gewenst gedrag',
  11: 'Evalueren',
  12: 'Gespreks- en overlegvaardigheden'
};

const ITEMS = [
  { r: 1,  t: 2, m: 1,  txt: 'Belang van de kwaliteit van het activiteitenprogramma.' },
  { r: 2,  t: 2, m: 1,  txt: 'Bewaken kwaliteit van het activiteitenprogramma, rekening houdend met de progressiematrix.' },
  { r: 3,  t: 2, m: 3,  txt: 'Actieve rol aannemen in begeleiding nieuwe teamleden tijdens introductiefase.' },
  { r: 4,  t: 2, m: 3,  txt: 'Kwaliteit leidingteam bewaken, in overleg met team.' },
  { r: 5,  t: 2, m: 3,  txt: 'Kwaliteit leidingteam verbeteren, in overleg met team.' },
  { r: 6,  t: 2, m: 3,  txt: 'Kwaliteit leidingteam bewaken, in overleg met groeps- en praktijkbegeleider.' },
  { r: 7,  t: 2, m: 3,  txt: 'Kwaliteit leidingteam verbeteren, in overleg met groeps- en praktijkbegeleider.' },
  { r: 8,  t: 2, m: 3,  txt: 'Ontwikkelplan team opstellen, in overleg met groeps- en praktijkbegeleider.' },
  { r: 9,  t: 2, m: 4,  txt: 'Complexe leeftijds- en gedragskenmerken in de eigen en naastliggende speltak verklaren, rekening houdend met ontwikkeling brein.' },
  { r: 10, t: 1, m: 6,  txt: 'Periodiek planning taken en werkzaamheden maken.' },
  { r: 11, t: 1, m: 7,  txt: 'Bevorderen samenwerking leidingteam, zowel voor jeugdleden als voor leiding onderling.' },
  { r: 12, t: 1, m: 7,  txt: 'Bevorderen taakverdeling leidingteam, zowel voor jeugdleden als voor leiding onderling.' },
  { r: 13, t: 1, m: 7,  txt: 'Bevorderen gezamenlijke verantwoordelijkheid leidingteam, zowel voor jeugdleden als voor leiding onderling.' },
  { r: 14, t: 1, m: 8,  txt: 'Tonen daadkracht ten aanzien van veiligheid en optreden indien nodig.' },
  { r: 15, t: 1, m: 8,  txt: 'Leiderschap tonen bij crisis.' },
  { r: 16, t: 1, m: 8,  txt: 'Aanpassen eigen houding aan situatie van het moment.' },
  { r: 17, t: 1, m: 8,  txt: 'Aanpassen eigen gedrag aan situatie van het moment.' },
  { r: 18, t: 1, m: 8,  txt: 'Juist afhandelen ongeval richting jeugdlid en ouders, in samenwerking met groepsbestuur.' },
  { r: 19, t: 2, m: 10, txt: 'Binnen leidingteam reflecteren op elkaars houding en gedrag.' },
  { r: 20, t: 2, m: 10, txt: 'Stimuleren en motiveren teamleden om in houding en gedrag het goede voorbeeld te geven.' },
  { r: 21, t: 2, m: 11, txt: 'Initiatief nemen tot (regelmatig) teamoverleg en evaluatie leidingteam.' },
  { r: 22, t: 2, m: 11, txt: 'Zorgen voor zinvol overleg/evaluatie voor samenwerking en kwaliteit van spel.' },
  { r: 23, t: 3, m: 12, txt: 'Actief participeren in overleg met eigen inbreng en afstemming.' },
  { r: 24, t: 3, m: 12, txt: 'Inzien noodzaak juiste taakverdeling.' },
  { r: 25, t: 3, m: 12, txt: 'Eigen werkzaamheden afstemmen met overige teamleden.' },
  { r: 26, t: 3, m: 12, txt: 'Op bekwame wijze de speleenheid vertegenwoordigen binnen de groep.' },
  { r: 27, t: 3, m: 12, txt: 'Op bekwame wijze de speleenheid vertegenwoordigen buiten de groep.' }
];

// Antwoorden opslaan: { rij-id -> score 1..5 }
const answers = {};

// Kleuren per schaalniveau
const SCALE_COLORS = ['#E5352B', '#E88B00', '#F2C200', '#3B8A1E', '#4AA125'];


/* ----------------------------------------------------------
   3. Competentieroos — DOM opbouwen
   ---------------------------------------------------------- */
function buildRoos() {
  const wrap = document.getElementById('roos-tasks');

  [1, 2, 3].forEach(taskId => {
    const items = ITEMS.filter(i => i.t === taskId);
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl p-6 shadow-sm fade-up';

    const h = document.createElement('h3');
    h.className = 'display font-bold text-lg mb-1';
    h.style.color = 'var(--scout-blue)';
    h.textContent = 'Hoofdtaak ' + taskId;

    const sub = document.createElement('p');
    sub.className = 'text-gray-500 text-sm mb-5';
    sub.textContent = HOOFDTAKEN[taskId];

    card.appendChild(h);
    card.appendChild(sub);

    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'py-3 border-t border-gray-100';

      const q = document.createElement('p');
      q.className = 'text-sm text-gray-700 mb-2';
      q.textContent = item.txt;

      const btns = document.createElement('div');
      btns.className = 'flex gap-2';

      for (let s = 1; s <= 5; s++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'scale-btn w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 font-semibold text-xs sm:text-sm flex items-center justify-center';
        b.style.borderColor = SCALE_COLORS[s - 1];
        b.style.color = SCALE_COLORS[s - 1];
        b.textContent = s;
        b.setAttribute('aria-label', 'Score ' + s + ' voor: ' + item.txt);

        b.addEventListener('click', () => {
          answers[item.r] = s;
          [...btns.children].forEach((c, idx) => {
            const active = (idx + 1) === s;
            c.classList.toggle('active', active);
            c.style.background = active ? SCALE_COLORS[s - 1] : 'transparent';
            c.style.color = active ? '#fff' : SCALE_COLORS[idx];
          });
          recalc();
        });

        btns.appendChild(b);
      }

      row.appendChild(q);
      row.appendChild(btns);
      card.appendChild(row);
    });

    wrap.appendChild(card);
  });

  /* Scorebalkjes per hoofdtaak */
  const taskScores = document.getElementById('roos-task-scores');
  [1, 2, 3].forEach(taskId => {
    const el = document.createElement('div');
    el.dataset.task = taskId;
    el.dataset.max = ITEMS.filter(i => i.t === taskId).length * 5;
    el.innerHTML =
      '<div class="flex justify-between text-sm mb-1">' +
        '<span class="font-medium text-gray-700">Hoofdtaak ' + taskId + '</span>' +
        '<span class="tval font-semibold text-gray-500">0%</span>' +
      '</div>' +
      '<div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">' +
        '<div class="prog-fill h-full rounded-full" style="width:0%;background:var(--scout-green)"></div>' +
      '</div>';
    taskScores.appendChild(el);
  });

  /* Scorebalkjes per module */
  const modScores = document.getElementById('roos-module-scores');
  Object.keys(MODULEN).map(Number).forEach(mId => {
    const items = ITEMS.filter(i => i.m === mId);
    if (!items.length) return;
    const el = document.createElement('div');
    el.dataset.mod = mId;
    el.dataset.max = items.length * 5;
    el.innerHTML =
      '<div class="flex justify-between text-xs mb-1">' +
        '<span class="text-gray-600">' + MODULEN[mId] + '</span>' +
        '<span class="mval font-semibold text-gray-400">0%</span>' +
      '</div>' +
      '<div class="h-2 bg-gray-100 rounded-full overflow-hidden">' +
        '<div class="prog-fill h-full rounded-full" style="width:0%;background:var(--scout-blue)"></div>' +
      '</div>';
    modScores.appendChild(el);
  });
}


/* ----------------------------------------------------------
   4. Competentieroos — herberekening scores
   ---------------------------------------------------------- */
function recalc() {
  const totalMax = ITEMS.length * 5;
  const currentModuleScores = {};

  /* Hoofdtaak balkjes */
  document.querySelectorAll('#roos-task-scores > div').forEach(el => {
    const t = Number(el.dataset.task);
    const max = Number(el.dataset.max);
    let sum = 0;
    ITEMS.filter(i => i.t === t).forEach(i => { sum += (answers[i.r] || 0); });
    const pct = Math.round(sum / max * 100);
    el.querySelector('.tval').textContent = pct + '%';
    el.querySelector('.prog-fill').style.width = pct + '%';
  });

  /* Module balkjes */
  document.querySelectorAll('#roos-module-scores > div').forEach(el => {
    const m = Number(el.dataset.mod);
    const max = Number(el.dataset.max);
    let sum = 0;
    ITEMS.filter(i => i.m === m).forEach(i => { sum += (answers[i.r] || 0); });
    const pct = Math.round(sum / max * 100);
    el.querySelector('.mval').textContent = pct + '%';
    el.querySelector('.prog-fill').style.width = pct + '%';
    currentModuleScores[m] = pct;
  });

  /* Totaalpercentage */
  let total = 0;
  ITEMS.forEach(i => { total += (answers[i.r] || 0); });
  const totalPct = Math.round(total / totalMax * 100);
  document.getElementById('roos-total-pct').textContent = totalPct + '%';

  drawRadarChart(currentModuleScores);
}


/* ----------------------------------------------------------
   5. Competentieroos — radardiagram (SVG)
   ---------------------------------------------------------- */
function drawRadarChart(scores) {
  const svg = document.getElementById('roos-radar');
  if (!svg) return;
  svg.innerHTML = '';

  const center    = 150;
  const maxRadius = 100;
  const modKeys   = [1, 3, 4, 6, 7, 8, 10, 11, 12];
  const totalAxes = modKeys.length;

  const shortNames = {
    1:  'Spelvisie en sp...',
    3:  'Scouting Academy',
    4:  'Leeftijdseigen',
    6:  'Programmeren',
    7:  'Motivatietechni...',
    8:  'Veiligheid',
    10: 'Gewenst gedrag',
    11: 'Evalueren',
    12: 'Gespreks- en ov...'
  };

  /* Achtergrond webben (5 concentrische 9-hoeken) */
  for (let level = 1; level <= 5; level++) {
    const r = (maxRadius / 5) * level;
    const points = [];
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * (2 * Math.PI / totalAxes) - Math.PI / 2;
      points.push(`${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`);
    }
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', points.join(' '));
    polygon.setAttribute('fill', 'none');
    polygon.setAttribute('stroke', '#E2E8F0');
    polygon.setAttribute('stroke-width', '1');
    svg.appendChild(polygon);
  }

  /* Assen + labels */
  for (let i = 0; i < totalAxes; i++) {
    const angle = i * (2 * Math.PI / totalAxes) - Math.PI / 2;
    const mId   = modKeys[i];

    const outerX = center + maxRadius * Math.cos(angle);
    const outerY = center + maxRadius * Math.sin(angle);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', center); line.setAttribute('y1', center);
    line.setAttribute('x2', outerX); line.setAttribute('y2', outerY);
    line.setAttribute('stroke', '#E2E8F0');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);

    const labelDist = maxRadius + 22;
    const labelX    = center + labelDist * Math.cos(angle);
    let   labelY    = center + labelDist * Math.sin(angle);
    if (Math.sin(angle) >  0.1) labelY += 5;
    if (Math.sin(angle) < -0.1) labelY -= 2;

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', labelX);
    text.setAttribute('y', labelY);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#4A5568');
    text.setAttribute('font-size', '10');
    text.setAttribute('font-family', 'Work Sans, sans-serif');
    text.textContent = shortNames[mId];
    svg.appendChild(text);
  }

  /* Score-polygon + gekleurde stipjes */
  const filledPoints = [];
  const scoreNodes   = [];

  for (let i = 0; i < totalAxes; i++) {
    const angle = i * (2 * Math.PI / totalAxes) - Math.PI / 2;
    const mId   = modKeys[i];
    const pct   = scores[mId] || 0;
    const r     = Math.max(8, (pct / 100) * maxRadius);
    const x     = center + r * Math.cos(angle);
    const y     = center + r * Math.sin(angle);

    filledPoints.push(`${x},${y}`);

    let dotColor = '#E5352B';
    if      (pct >= 80) dotColor = '#4AA125';
    else if (pct >= 40) dotColor = '#FFD500';

    scoreNodes.push({ x, y, color: dotColor, pct });
  }

  const area = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  area.setAttribute('points', filledPoints.join(' '));
  area.setAttribute('fill', 'rgba(0, 92, 185, 0.2)');
  area.setAttribute('stroke', '#005CB9');
  area.setAttribute('stroke-width', '2');
  svg.appendChild(area);

  /* Middencirkel */
  const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  centerCircle.setAttribute('cx', center);
  centerCircle.setAttribute('cy', center);
  centerCircle.setAttribute('r', '12');
  centerCircle.setAttribute('fill', '#FFD500');
  centerCircle.setAttribute('stroke', '#005CB9');
  centerCircle.setAttribute('stroke-width', '2');
  svg.appendChild(centerCircle);

  /* Stipjes op de score-hoekpunten */
  scoreNodes.forEach(node => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', '3.5');
    circle.setAttribute('fill', node.color);
    circle.setAttribute('stroke', '#fff');
    circle.setAttribute('stroke-width', '1');

    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = node.pct + '%';
    circle.appendChild(title);

    svg.appendChild(circle);
  });
}


/* ----------------------------------------------------------
   6. Hulpfunctie — statusbericht tonen
   ---------------------------------------------------------- */
function showMsg(el, text, ok) {
  el.textContent = text;
  el.classList.remove('hidden');
  el.style.color = ok ? 'var(--scout-green)' : 'var(--scout-red)';
}


/* ----------------------------------------------------------
   7. Competentieroos — formulier versturen (mailto)
   ---------------------------------------------------------- */
document.getElementById('roos-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const msg   = document.getElementById('roos-form-msg');
  const name  = document.getElementById('roos-name').value.trim();
  const email = document.getElementById('roos-email').value.trim();

  if (!name || !email)               { showMsg(msg, 'Vul je naam en e-mailadres in.', false); return; }
  if (!Object.keys(answers).length)  { showMsg(msg, 'Vul eerst minimaal één onderdeel in.', false); return; }

  let body = 'Competentieroos ingevuld door: ' + name + ' (' + email + ')\n\n';
  [1, 2, 3].forEach(t => {
    body += 'HOOFDTAAK ' + t + ' — ' + HOOFDTAKEN[t] + '\n';
    ITEMS.filter(i => i.t === t).forEach(i => {
      body += '  [' + (answers[i.r] || '-') + '] ' + i.txt + '\n';
    });
    body += '\n';
  });

  let total = 0;
  ITEMS.forEach(i => { total += (answers[i.r] || 0); });
  body += 'Totaalscore: ' + total + ' / ' + (ITEMS.length * 5) +
          ' (' + Math.round(total / (ITEMS.length * 5) * 100) + '%)\n';

  const subject = 'Competentieroos ingevuld — ' + name;
  window.open(
    'mailto:info@scoutingnederland.nl?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body),
    '_blank'
  );
  showMsg(msg, 'Je e-mailprogramma wordt geopend met de ingevulde samenvatting.', true);
});


/* ----------------------------------------------------------
   8. Contactformulier — versturen (mailto)
   ---------------------------------------------------------- */
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const status  = document.getElementById('cf-msg-status');
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-msg').value.trim();

  if (!name || !email || !message) { showMsg(status, 'Vul alle velden in.', false); return; }

  const body = 'Naam: ' + name + '\nE-mail: ' + email + '\n\n' + message;
  window.open(
    'mailto:info@scoutingnederland.nl?subject=' + encodeURIComponent('Contact via website — ' + name) +
    '&body=' + encodeURIComponent(body),
    '_blank'
  );
  showMsg(status, 'Je e-mailprogramma wordt geopend om je bericht te versturen.', true);
});


/* ----------------------------------------------------------
   9. Initialisatie
   ---------------------------------------------------------- */
buildRoos();
lucide.createIcons();
