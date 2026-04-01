const dark = matchMedia('(prefers-color-scheme: dark)').matches;

const W = 680, H = 380;
const PAD_X = 52, PAD_Y = 36;
const BW = W - PAD_X * 2;
const BH = H - PAD_Y * 2;

const LANE_SPACING = BH / 3;
const Y_TOP    = PAD_Y + LANE_SPACING * 0.5;
const Y_BOTTOM = PAD_Y + LANE_SPACING * 1.5;
const Y_MIDDLE = PAD_Y + LANE_SPACING * 1;
const X_LEFT   = PAD_X;
const X_RIGHT  = PAD_X + BW ;
const R_BIG    = LANE_SPACING / 2;
const R_SMALL  = LANE_SPACING / 4;
const LANE_SEP = 15;
const HR = 4.5, PR = 7.0;

const BG      = !dark ? '#2c2010' : '#efcb94';
const WOOD2   = !dark ? '#1c1408' : '#a07820';
const HOLE_IN = !dark ? '#140e04' : '#5a3808';
const HOLE_RM = !dark ? '#5a4020' : '#e8c050';
const LABEL_C = !dark ? '#f0d880' : '#3a2008';
const TRACK_C = !dark ? '#3a2e18' : '#be9b50';
const P1C = '#C0392B', P2C = '#185FA5';

function buildTrack(vOff) {
  const pts = [];

  function straight(x0, x1, y, n) {
    return Array.from({length: n}, (_, i) => ({
      x: x0 + (x1 - x0) * (i + 0.5) / n,
      y
    }));
  }

  function uturn(cx, cy, r, a0, a1, n, radialOff) {
    const R = r + radialOff;
    return Array.from({length: n}, (_, i) => {
      const a = a0 + (a1 - a0) * (i + 0.5) / n;
      return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
    });
  }

  const seg1 = straight(X_LEFT,  X_RIGHT, Y_TOP    + vOff, 35);
  const seg2 = uturn(X_RIGHT, (Y_TOP + Y_BOTTOM) / 2, R_BIG,   -Math.PI/2, Math.PI/2,  10, vOff);
  const seg3 = straight(X_RIGHT, X_LEFT,  Y_BOTTOM + vOff, 35);
  const seg4 = uturn(X_LEFT,  (Y_BOTTOM + Y_MIDDLE) / 2, R_SMALL, Math.PI/2,  3*Math.PI/2, 5, vOff);
  const seg5 = straight(X_LEFT,  X_RIGHT, Y_MIDDLE + vOff, 36);

  return [...seg1, ...seg2, ...seg3, ...seg4, ...seg5];
}

const p1Pts = buildTrack(-LANE_SEP / 2);
const p2Pts = buildTrack(+LANE_SEP / 2);

function getPegPos(score, lane) {
  const pts = lane === 'p1' ? p1Pts : p2Pts;
  const vOff = lane === 'p1' ? -LANE_SEP / 2 : LANE_SEP / 2;
  if (score <= 0) return { x: X_LEFT - 8, y: Y_TOP + vOff };
  const idx = Math.min(Math.round(score) - 1, pts.length - 1);
  return pts[Math.max(0, idx)];
}

const svg = d3.select('#board')
  .append('svg')
  .attr('viewBox', `-10 0 ${W + 40} ${H + 30}`)
  .attr('width', '100%');

// Board background
const boardRight = X_RIGHT + R_BIG + LANE_SEP + 10;
const boardTop   = Y_TOP - LANE_SEP - 15;
const boardBot   = Y_MIDDLE + LANE_SEP + 60;
const boardRX    = R_BIG + LANE_SEP + 45;

svg.append('path')
  .attr('d', `
    M ${8} ${boardTop}
    L ${boardRight - boardRX} ${boardTop}
    Q ${boardRight} ${boardTop} ${boardRight} ${boardTop + boardRX}
    L ${boardRight} ${boardBot - boardRX}
    Q ${boardRight} ${boardBot} ${boardRight - boardRX} ${boardBot}
    L ${8} ${boardBot}
    Q ${8 - 12} ${boardBot} ${8 - 12} ${boardBot - 12}
    L ${8 - 12} ${boardTop + 12}
    Q ${8 - 12} ${boardTop} ${8} ${boardTop}
    Z
  `)
  .attr('fill', BG)
  .attr('stroke', WOOD2)
  .attr('stroke-width', 2);

// Track guide lines — arc path helper
function arcPath(cx, cy, r, a0, a1) {
  const x0 = cx + Math.cos(a0) * r, y0 = cy + Math.sin(a0) * r;
  const x1 = cx + Math.cos(a1) * r, y1 = cy + Math.sin(a1) * r;
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
}

const guides = svg.append('g')
  .attr('stroke', TRACK_C)
  .attr('stroke-width', 1)
  .attr('fill', 'none');

[-LANE_SEP/2, LANE_SEP/2].forEach(vOff => {
  guides.append('line').attr('x1', X_LEFT).attr('y1', Y_TOP + vOff).attr('x2', X_RIGHT).attr('y2', Y_TOP + vOff);
  guides.append('line').attr('x1', X_LEFT).attr('y1', Y_BOTTOM + vOff).attr('x2', X_RIGHT).attr('y2', Y_BOTTOM + vOff);
  guides.append('line').attr('x1', X_LEFT).attr('y1', Y_MIDDLE + vOff).attr('x2', X_RIGHT).attr('y2', Y_MIDDLE + vOff);
  guides.append('path').attr('d', arcPath(X_RIGHT, (Y_TOP + Y_BOTTOM) / 2, R_BIG + vOff, -Math.PI/2, Math.PI/2));
  guides.append('path').attr('d', arcPath(X_LEFT, (Y_BOTTOM + Y_MIDDLE) / 2, R_SMALL + vOff, Math.PI/2, 3*Math.PI/2));
});

// Holes — one group per lane
[p1Pts, p2Pts].forEach(pts => {
  const g = svg.append('g');
  g.selectAll('circle.rim')
    .data(pts)
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', HR + 1.5)
    .attr('fill', HOLE_RM);
  g.selectAll('circle.hole')
    .data(pts)
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', HR)
    .attr('fill', HOLE_IN);
});

// Score number labels
const labelNums = [5,10,15,20,25,30,35, 50,55,60,65,70,75,80, 90,95,100,105,110,115,120,121];
labelNums.forEach(n => {
  if (n < 1 || n > 121) return;
  const p = p1Pts[n - 1];
  if (!p) return;
  let dy;
  if (n <= 35) dy = -(HR + 7);
  else if (n <= 80) dy = HR -15;
  else dy = -(HR + 7);

  svg.append('text')
    .attr('x', p.x)
    .attr('y', p.y + dy)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('fill', LABEL_C)
    .attr('font-size', 7)
    .attr('font-weight', 'bold')
    .text(n);
});

// START label
svg.append('text')
  .attr('x', X_LEFT - 16)
  .attr('y', Y_TOP)
  .attr('text-anchor', 'end')
  .attr('dominant-baseline', 'middle')
  .attr('fill', LABEL_C)
  .attr('font-size', 9)
  .attr('font-weight', 'bold')
  .attr('transform','rotate(90 24,90)')
  .text('START');

// Pegs — two circles with text labels, updated by D3 transitions
const peg1 = svg.append('circle')
  .attr('r', PR)
  .attr('fill', P1C)
  .attr('stroke', 'rgba(0,0,0,0.22)')
  .attr('stroke-width', 1);

const peg2 = svg.append('circle')
  .attr('r', PR)
  .attr('fill', P2C)
  .attr('stroke', 'rgba(0,0,0,0.22)')
  .attr('stroke-width', 1);

const shine1 = svg.append('circle').attr('r', PR * 0.27).attr('fill', 'rgba(255,255,255,0.38)').attr('pointer-events', 'none');
const shine2 = svg.append('circle').attr('r', PR * 0.27).attr('fill', 'rgba(255,255,255,0.38)').attr('pointer-events', 'none');

function placePegs(s1, s2) {
  const pos1 = getPegPos(s1, 'p1');
  const pos2 = getPegPos(s2, 'p2');
  const dur = 700;
  peg1.attr('cx', pos1.x).attr('cy', pos1.y);
  peg2.attr('cx', pos2.x).attr('cy', pos2.y);
  shine1.attr('cx', pos1.x - PR*0.25).attr('cy', pos1.y - PR*0.25);
  shine2.attr('cx', pos2.x - PR*0.25).attr('cy', pos2.y - PR*0.25);
}

function doUpdate() {
  const s1 = Math.min(Math.max(parseInt(document.getElementById('p1Score').value) || 0, 0), 121);
  const s2 = Math.min(Math.max(parseInt(document.getElementById('p2Score').value) || 0, 0), 121);
  placePegs(s1, s2);
  const n1 = document.getElementById('p1Name').value || 'Player 1';
  const n2 = document.getElementById('p2Name').value || 'Player 2';
}

placePegs(0, 0);
doUpdate();