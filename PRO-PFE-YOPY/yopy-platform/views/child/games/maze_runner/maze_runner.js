const GAME_ID    = 'maze_runner';
const SESSION_ID = '<?= $sessionId ?>';

/* ─── BUDDY SVGs ─── */
const BIG = {
joy:`<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
<ellipse cx="90" cy="30" rx="46" ry="24" fill="#38BDF8"/>
<polygon points="70,20 80,2 93,22" fill="#38BDF8"/>
<polygon points="90,16 102,0 112,20" fill="#60CAFF"/>
<polygon points="50,26 58,6 72,26" fill="#29A8E0"/>
<polygon points="110,22 118,4 130,26" fill="#60CAFF"/>
<ellipse cx="90" cy="120" rx="62" ry="66" fill="#FDE68A"/>
<ellipse cx="40" cy="134" rx="20" ry="12" fill="rgba(251,146,60,.3)"/>
<ellipse cx="140" cy="134" rx="20" ry="12" fill="rgba(251,146,60,.3)"/>
<ellipse cx="66" cy="112" rx="20" ry="22" fill="white"/>
<circle cx="66" cy="115" r="13" fill="#38BDF8"/>
<circle cx="66" cy="115" r="7.5" fill="#1E3A5F"/>
<circle cx="70" cy="110" r="3.5" fill="white"/>
<ellipse cx="114" cy="112" rx="20" ry="22" fill="white"/>
<circle cx="114" cy="115" r="13" fill="#38BDF8"/>
<circle cx="114" cy="115" r="7.5" fill="#1E3A5F"/>
<circle cx="118" cy="110" r="3.5" fill="white"/>
<path d="M52 148 Q90 180 128 148" stroke="#B45309" stroke-width="6" fill="none" stroke-linecap="round"/>
<rect x="74" y="148" width="13" height="12" rx="3.5" fill="white"/>
<rect x="90" y="148" width="13" height="12" rx="3.5" fill="white"/>
<rect x="106" y="148" width="10" height="12" rx="3.5" fill="white"/>
</g></svg>`,
sadness:`<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
<ellipse cx="90" cy="46" rx="54" ry="38" fill="#2563EB"/>
<ellipse cx="50" cy="72" rx="18" ry="32" fill="#1D4ED8"/>
<ellipse cx="90" cy="126" rx="52" ry="60" fill="#93C5FD"/>
<ellipse cx="66" cy="118" rx="15" ry="18" fill="white"/>
<circle cx="66" cy="121" r="11" fill="#2563EB"/>
<circle cx="66" cy="121" r="6" fill="#1E3A8A"/>
<circle cx="70" cy="116" r="3" fill="white"/>
<ellipse cx="114" cy="118" rx="15" ry="18" fill="white"/>
<circle cx="114" cy="121" r="11" fill="#2563EB"/>
<circle cx="114" cy="121" r="6" fill="#1E3A8A"/>
<circle cx="118" cy="116" r="3" fill="white"/>
<path d="M60 156 Q90 144 120 156" stroke="#1D4ED8" stroke-width="5" fill="none" stroke-linecap="round"/>
</g></svg>`,
anger:`<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
<rect x="20" y="52" width="140" height="120" rx="20" fill="#DC2626"/>
<ellipse cx="60" cy="114" rx="20" ry="16" fill="white"/>
<circle cx="60" cy="114" r="11" fill="#7F1D1D"/>
<circle cx="63" cy="110" r="5" fill="white"/>
<ellipse cx="120" cy="114" rx="20" ry="16" fill="white"/>
<circle cx="120" cy="114" r="11" fill="#7F1D1D"/>
<circle cx="123" cy="110" r="5" fill="white"/>
<rect x="46" y="144" width="88" height="22" rx="10" fill="#7F1D1D"/>
<rect x="48" y="144" width="14" height="22" fill="white"/>
<rect x="64" y="144" width="14" height="22" fill="white"/>
<rect x="80" y="144" width="14" height="22" fill="white"/>
<rect x="96" y="144" width="14" height="22" fill="white"/>
</g></svg>`,
disgust:`<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
<ellipse cx="90" cy="34" rx="54" ry="30" fill="#15803D"/>
<ellipse cx="90" cy="120" rx="56" ry="62" fill="#4ADE80"/>
<ellipse cx="64" cy="108" rx="22" ry="18" fill="white"/>
<circle cx="64" cy="108" r="13" fill="#15803D"/>
<circle cx="64" cy="108" r="7" fill="#052e16"/>
<circle cx="68" cy="103" r="4" fill="white"/>
<ellipse cx="116" cy="108" rx="22" ry="18" fill="white"/>
<circle cx="116" cy="108" r="13" fill="#15803D"/>
<circle cx="116" cy="108" r="7" fill="#052e16"/>
<circle cx="120" cy="103" r="4" fill="white"/>
<path d="M56 148 Q74 138 90 142 Q106 138 124 148" stroke="#14532D" stroke-width="5" fill="none" stroke-linecap="round"/>
</g></svg>`,
fear:`<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
<ellipse cx="90" cy="126" rx="48" ry="72" fill="#D8B4FE"/>
<ellipse cx="60" cy="106" rx="26" ry="30" fill="white"/>
<circle cx="60" cy="110" r="18" fill="#7E22CE"/>
<circle cx="60" cy="110" r="9" fill="#1A0533"/>
<circle cx="65" cy="103" r="5.5" fill="white"/>
<ellipse cx="120" cy="106" rx="26" ry="30" fill="white"/>
<circle cx="120" cy="110" r="18" fill="#7E22CE"/>
<circle cx="120" cy="110" r="9" fill="#1A0533"/>
<circle cx="125" cy="103" r="5.5" fill="white"/>
<ellipse cx="90" cy="164" rx="18" ry="14" fill="#4C1D95"/>
<ellipse cx="90" cy="162" rx="12" ry="10" fill="#1A0533"/>
</g></svg>`,
anxiety:`<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
<ellipse cx="90" cy="38" rx="58" ry="32" fill="#EA580C"/>
<ellipse cx="90" cy="128" rx="58" ry="70" fill="#FDBA74"/>
<circle cx="64" cy="118" r="20" fill="white"/>
<circle cx="64" cy="118" r="11" fill="#431407"/>
<circle cx="68" cy="112" r="3.5" fill="white"/>
<circle cx="116" cy="118" r="20" fill="white"/>
<circle cx="116" cy="118" r="11" fill="#431407"/>
<circle cx="120" cy="112" r="3.5" fill="white"/>
<path d="M48 156 Q68 166 90 156 Q112 166 132 156" stroke="#92400E" stroke-width="5" fill="none" stroke-linecap="round"/>
</g></svg>`
};

/* ─── BUDDY META (mirrors menu.php BUDDY_META) ─── */
const BUDDY_META = {
    joy:     { color: '#FBBF24', rgb: '251,191,36'  },
    sadness: { color: '#60A5FA', rgb: '96,165,250'  },
    anger:   { color: '#F87171', rgb: '248,113,113' },
    disgust: { color: '#4ADE80', rgb: '74,222,128'  },
    fear:    { color: '#C084FC', rgb: '192,132,252' },
    anxiety: { color: '#FB923C', rgb: '251,146,60'  }
};

/* ─── INJECT BUDDY AVATAR — read from sessionStorage like menu.php ─── */
function initBuddyAvatar() {
    let buddy = null;
    try {
        const raw = sessionStorage.getItem('chosen_character');
        if (raw) buddy = JSON.parse(raw);
    } catch(e) {}

    /* fallback to PHP session value, then to joy */
    const id = (buddy && BIG[buddy.id]) ? buddy.id
             : (BIG['<?= $buddyId ?>']  ? '<?= $buddyId ?>'
             : 'joy');

    const avatarEl = document.getElementById('buddy-avatar');
    if (avatarEl) avatarEl.innerHTML = BIG[id];

    /* apply buddy accent color to avatar ring */
    const meta = BUDDY_META[id] || BUDDY_META.joy;
    const style = document.getElementById('buddy-avatar').style;
    style.borderColor = meta.color;
    style.boxShadow   = `0 0 18px rgba(${meta.rgb}, 0.55), 0 0 6px rgba(${meta.rgb}, 0.3)`;
}
initBuddyAvatar();
// ── STANDARD BEHAVIOR COLLECTOR ──
const SIGNAL_MAP = {
    move:  'reaction',
    hint:  'hint',
    win:   'success',
    game_over: 'error'
};

let collector = new BehaviorCollector('maze_runner', SIGNAL_MAP);
let serverSessionId = SESSION_ID;
let gameStartTime = null;
const STATE = { INIT: 'INIT', PLAYING: 'PLAYING', DONE: 'DONE', SAVED: 'SAVED' };
let gameState = STATE.INIT;

// Difficulty config
const DIFF_CONFIG = {
    easy:    { size: 10, mult: 10, timeBonus: 300, label: 'Novice' },
    medium:  { size: 15, mult: 20, timeBonus: 500, label: 'Warrior' },
    hard:    { size: 25, mult: 40, timeBonus: 900, label: 'Minotaur' },
    extreme: { size: 38, mult: 80, timeBonus: 1800, label: 'Legendary' },
};

// Canvas and drawing globals
const canvas = document.getElementById('maze-canvas');
const ctx    = canvas.getContext('2d');
let MAX_SIZE = Math.min(480, window.innerWidth - 32, window.innerHeight - 200);

// Game state variables
let difficulty  = 'easy';
let mazeGrid    = [];
let gridSize    = 10;
let cellSize    = 40;
let playerPos   = { x: 0, y: 0 };
let endPos      = { x: 0, y: 0 };
let moves       = 0;
let elapsed     = 0;
let timerInterval = null;
let startTimestamp = null;

let hintPath    = null;
let hintShown   = false;
let hintUsed    = false;
let hintTimeoutId = null;
const HINT_DURATION_MS = 5000;

// ─────────────────────────────────────────────────────────────────
// CANVAS RESIZE HANDLER
// ─────────────────────────────────────────────────────────────────
function updateCanvasSize() {
    MAX_SIZE = Math.min(480, window.innerWidth - 32, window.innerHeight - 200);
    canvas.width = MAX_SIZE;
    canvas.height = MAX_SIZE;
    if (mazeGrid && mazeGrid.length) {
        cellSize = Math.floor(canvas.width / gridSize);
        draw();
    }
}
updateCanvasSize();
window.addEventListener('resize', () => {
    updateCanvasSize();
    if (mazeGrid && mazeGrid.length && gameState === STATE.PLAYING) {
        cellSize = Math.floor(canvas.width / gridSize);
        draw();
    }
});

// ─────────────────────────────────────────────────────────────────
// MAZE GENERATION — Wilson's algorithm (Uniform Spanning Tree)
// ─────────────────────────────────────────────────────────────────
function buildMaze(size) {
    const delta = {
        n: { y: -1, x: 0, op: 's' },
        s: { y: 1,  x: 0, op: 'n' },
        e: { y: 0,  x: 1, op: 'w' },
        w: { y: 0,  x: -1, op: 'e' }
    };
    const DIRS = ['n', 's', 'e', 'w'];

    const grid = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => ({ n: false, s: false, e: false, w: false, inMaze: false }))
    );

    const key = (x, y) => y * size + x;
    const inBounds = (x, y) => x >= 0 && x < size && y >= 0 && y < size;

    // seed
    grid[0][0].inMaze = true;

    const allCells = [];
    for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++)
            if (!(x === 0 && y === 0)) allCells.push({ x, y });
    for (let i = allCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCells[i], allCells[j]] = [allCells[j], allCells[i]];
    }

    for (const start of allCells) {
        if (grid[start.y][start.x].inMaze) continue;

        const walk = [{ x: start.x, y: start.y }];
        const walkDir = new Map();
        let cur = { x: start.x, y: start.y };

        while (!grid[cur.y][cur.x].inMaze) {
            const d = DIRS[Math.floor(Math.random() * 4)];
            const nx = cur.x + delta[d].x;
            const ny = cur.y + delta[d].y;
            if (!inBounds(nx, ny)) continue;

            walkDir.set(key(cur.x, cur.y), d);

            const revisitIdx = walk.findIndex(c => c.x === nx && c.y === ny);
            if (revisitIdx !== -1) {
                walk.length = revisitIdx + 1;
            }
            cur = { x: nx, y: ny };
            if (!walk.find(c => c.x === cur.x && c.y === cur.y)) walk.push({ ...cur });
        }

        for (let i = 0; i < walk.length - 1; i++) {
            const from = walk[i];
            const d = walkDir.get(key(from.x, from.y));
            if (!d) continue;
            const to = { x: from.x + delta[d].x, y: from.y + delta[d].y };
            if (!inBounds(to.x, to.y)) continue;
            grid[from.y][from.x][d] = true;
            grid[to.y][to.x][delta[d].op] = true;
            grid[to.y][to.x].inMaze = true;
        }
        grid[walk[0].y][walk[0].x].inMaze = true;
    }
    return grid;
}

// ─────────────────────────────────────────────────────────────────
// BFS SOLVER — returns shortest path array of {x,y}
// ─────────────────────────────────────────────────────────────────
function solveMazeBFS(fromPos, toPos) {
    const delta = { n: { y: -1, x: 0 }, s: { y: 1, x: 0 }, e: { y: 0, x: 1 }, w: { y: 0, x: -1 } };
    const key = (x, y) => y * gridSize + x;
    const visited = new Set();
    const parent = new Map();
    const queue = [{ x: fromPos.x, y: fromPos.y }];
    visited.add(key(fromPos.x, fromPos.y));

    while (queue.length) {
        const cur = queue.shift();
        if (cur.x === toPos.x && cur.y === toPos.y) {
            const path = [];
            let c = cur;
            while (c) {
                path.unshift(c);
                c = parent.get(key(c.x, c.y));
            }
            return path;
        }
        const cell = mazeGrid[cur.y][cur.x];
        for (const d of ['n', 's', 'e', 'w']) {
            if (!cell[d]) continue;
            const nx = cur.x + delta[d].x;
            const ny = cur.y + delta[d].y;
            const nk = key(nx, ny);
            if (!visited.has(nk)) {
                visited.add(nk);
                parent.set(nk, cur);
                queue.push({ x: nx, y: ny });
            }
        }
    }
    return null;
}

// ─────────────────────────────────────────────────────────────────
// MAZE INITIALISATION & DRAW
// ─────────────────────────────────────────────────────────────────
function buildAndDrawMaze() {
    const cfg = DIFF_CONFIG[difficulty];
    gridSize = cfg.size;
    cellSize = Math.floor(canvas.width / gridSize);
    mazeGrid = buildMaze(gridSize);

    const corners = [
        [{ x: 0, y: 0 }, { x: gridSize - 1, y: gridSize - 1 }],
        [{ x: gridSize - 1, y: 0 }, { x: 0, y: gridSize - 1 }],
        [{ x: 0, y: gridSize - 1 }, { x: gridSize - 1, y: 0 }],
        [{ x: gridSize - 1, y: gridSize - 1 }, { x: 0, y: 0 }],
    ];
    const pair = corners[Math.floor(Math.random() * corners.length)];
    playerPos = { ...pair[0] };
    endPos = { ...pair[1] };
    moves = 0;

    if (hintTimeoutId) {
        clearTimeout(hintTimeoutId);
        hintTimeoutId = null;
    }
    hintPath = null;
    hintShown = false;
    hintUsed = false;
    document.getElementById('hint-btn').classList.remove('active');
    document.getElementById('hint-btn').textContent = '🏮 TORCHLIGHT HINT';
    document.getElementById('hint-cost').textContent = '';
    updateHUD();
    draw();

    gsap.from("#maze-canvas", {
        opacity: 0,
        scale: 0.85,
        duration: 0.9,
        ease: "power2.out"
    });
}

function draw() {
    const C = cellSize;
    ctx.fillStyle = '#2a1a12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ab8e5c';
    ctx.lineWidth = Math.max(1.5, C / 12);
    ctx.lineCap = 'round';

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const cell = mazeGrid[y][x];
            const px = x * C, py = y * C;
            if (!cell.n) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + C, py); ctx.stroke(); }
            if (!cell.s) { ctx.beginPath(); ctx.moveTo(px, py + C); ctx.lineTo(px + C, py + C); ctx.stroke(); }
            if (!cell.w) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + C); ctx.stroke(); }
            if (!cell.e) { ctx.beginPath(); ctx.moveTo(px + C, py); ctx.lineTo(px + C, py + C); ctx.stroke(); }
        }
    }

    ctx.fillStyle = 'rgba(212,175,55,.25)';
    ctx.fillRect(endPos.x * C + 1, endPos.y * C + 1, C - 2, C - 2);

    if (hintShown && hintPath) {
        ctx.fillStyle = 'rgba(255,98,0,.35)';
        let inPath = false;
        for (const cell of hintPath) {
            if (cell.x === playerPos.x && cell.y === playerPos.y) inPath = true;
            if (!inPath) continue;
            if (cell.x === endPos.x && cell.y === endPos.y) break;
            ctx.beginPath();
            ctx.arc(cell.x * C + C / 2, cell.y * C + C / 2, Math.max(4, C * 0.18), 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.strokeStyle = 'rgba(255,98,0,.8)';
        ctx.lineWidth = Math.max(2, C * 0.1);
        ctx.setLineDash([Math.max(4, C * 0.15), Math.max(5, C * 0.15)]);
        ctx.beginPath();
        let started = false;
        for (const cell of hintPath) {
            if (cell.x === playerPos.x && cell.y === playerPos.y) started = true;
            if (!started) continue;
            const cx = cell.x * C + C / 2, cy = cell.y * C + C / 2;
            if (!started) ctx.moveTo(cx, cy);
            else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }

    const eFont = Math.max(12, Math.floor(C * 0.8));
    ctx.font = `${eFont}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(endPos.x * C + C / 2 - C * 0.3, endPos.y * C + C / 2 - C * 0.3, C * 0.6, C * 0.6);
    ctx.fillStyle = '#ffdd88';
    ctx.fillText('🏛️', endPos.x * C + C / 2, endPos.y * C + C / 2);

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(playerPos.x * C + C / 2 - C * 0.3, playerPos.y * C + C / 2 - C * 0.3, C * 0.6, C * 0.6);
    ctx.fillStyle = '#ffaa66';
    ctx.fillText('🗝️', playerPos.x * C + C / 2, playerPos.y * C + C / 2);
}

// ─────────────────────────────────────────────────────────────────
// MOVEMENT & GAME LOGIC
// ─────────────────────────────────────────────────────────────────
function move(dir) {
    if (gameState !== STATE.PLAYING) return;
    const cell = mazeGrid[playerPos.y][playerPos.x];
    if (!cell[dir]) return;

    const delta = { n: { y: -1, x: 0 }, s: { y: 1, x: 0 }, e: { y: 0, x: 1 }, w: { y: 0, x: -1 } };
    playerPos.x += delta[dir].x;
    playerPos.y += delta[dir].y;
    moves++;
    updateHUD();
    if (collector) collector.record('move', null);

    if (hintShown) hintPath = solveMazeBFS(playerPos, endPos);
    draw();

    if (playerPos.x === endPos.x && playerPos.y === endPos.y) {
        setTimeout(() => endGame(), 200);
        const flash = document.getElementById('win-flash');
        flash.style.display = 'block';
        setTimeout(() => { flash.style.display = 'none'; }, 700);
    }
}

function updateHUD() {
    document.getElementById('hud-moves').textContent = moves;
}

function startTimer() {
    stopTimer();
    elapsed = 0;
    startTimestamp = Date.now();
    timerInterval = setInterval(() => {
        elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
        document.getElementById('hud-timer').textContent = elapsed + 's';
        if (elapsed >= 60) document.getElementById('timer-pill').classList.add('urgent');
    }, 500);
}
function stopTimer() { clearInterval(timerInterval); }

function calcScore() {
    const cfg = DIFF_CONFIG[difficulty];
    const bonus = Math.max(0, cfg.timeBonus - elapsed * 3);
    const movePenalty = Math.max(0, (moves - gridSize * 2) * 2);
    const raw = Math.max(0, Math.round((bonus - movePenalty) * cfg.mult / 10));
    return hintUsed ? Math.round(raw * 0.3) : raw;
}

// ─────────────────────────────────────────────────────────────────
// HINT SYSTEM (BFS overlay with auto‑hide timer)
// ─────────────────────────────────────────────────────────────────
function toggleHint() {
    if (gameState !== STATE.PLAYING) return;

    if (hintTimeoutId) {
        clearTimeout(hintTimeoutId);
        hintTimeoutId = null;
    }

    if (hintShown) {
        hintShown = false;
        document.getElementById('hint-btn').classList.remove('active');
        document.getElementById('hint-btn').textContent = '🏮 TORCHLIGHT HINT';
        draw();
        gsap.to("#hint-btn", { backgroundColor: "#8b0000", duration: 0.3 });
    } else {
        hintPath = solveMazeBFS(playerPos, endPos);
        if (!hintPath) return;

        hintShown = true;
        hintUsed = true;
        if (collector) collector.record('hint', null);
        document.getElementById('hint-btn').classList.add('active');
        document.getElementById('hint-btn').textContent = '🙈 HIDE PATH';
        document.getElementById('hint-cost').textContent = '⚠️ Torchlight reveals the path — Score ×0.3 ⚠️';
        draw();
        gsap.to("#hint-btn", { backgroundColor: "#ffaa00", duration: 0.4 });

        hintTimeoutId = setTimeout(() => {
            if (hintShown) {
                hintShown = false;
                document.getElementById('hint-btn').classList.remove('active');
                document.getElementById('hint-btn').textContent = '🏮 TORCHLIGHT HINT';
                draw();
                gsap.to("#hint-btn", { backgroundColor: "#8b0000", duration: 0.3 });
                hintTimeoutId = null;
            }
        }, HINT_DURATION_MS);
    }
}

// ─────────────────────────────────────────────────────────────────
// GAME FLOW & BACKEND
// ─────────────────────────────────────────────────────────────────
async function startGame() {
    if (gameState !== STATE.INIT) return;

    gsap.to("#screen-difficulty", {
        opacity: 0,
        y: -80,
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => { document.getElementById('screen-difficulty').style.display = 'none'; }
    });

    const gs = document.getElementById('screen-game');
    gs.style.display = 'flex';
    gs.style.opacity = 0;
    gsap.to(gs, { opacity: 1, duration: 1.2, ease: "power3.out" });
    gsap.to(".torch-overlay", { opacity: 0.95, duration: 0.6, repeat: 3, yoyo: true });

    try {
        const res = await fetch('../../../../games/maze_runner/maze_runner_backend.php?action=start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ difficulty })
        });
        const data = await res.json();
        if (data.status === 'success') {
            serverSessionId = data.data.session_id;
            console.log('%c[Session] Created id=' + serverSessionId, 'color:#00F5FF');
            if (collector) collector.setSessionId(serverSessionId);
        }
    } catch(e) { console.warn('[Session] Start failed', e); }

    collector = (typeof BehaviorCollector !== 'undefined')
        ? new BehaviorCollector('maze_runner', SIGNAL_MAP)
        : { record: () => {}, flush: async () => {} };

    gameState = STATE.PLAYING;
    buildAndDrawMaze();
    startTimer();
}
async function endGame() {
    if (gameState !== STATE.PLAYING) return;
    gameState = STATE.DONE;
    stopTimer();

    if (collector) {
        collector.record('game_over', null);
        await collector.flush();
    }

    if (hintTimeoutId) {
        clearTimeout(hintTimeoutId);
        hintTimeoutId = null;
    }

    const score = calcScore();
    const cfg = DIFF_CONFIG[difficulty];
    let emoji, title;
    if (elapsed < 30) { emoji = '🏆'; title = 'MINOTAUR SLAYER!'; }
    else if (elapsed < 60) { emoji = '🎉'; title = 'You escaped the Labyrinth!'; }
    else if (elapsed < 120) { emoji = '👍'; title = 'Made it!'; }
    else { emoji = '😅'; title = 'Finally free...'; }

    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-score-display').textContent = `Score: ${score}`;
    document.getElementById('result-detail').textContent =
        `${elapsed}s · ${moves} move${moves !== 1 ? 's' : ''} · ${cfg.label}`;

    const overlay = document.getElementById('result-overlay');
    overlay.classList.add('show');
    overlay.style.opacity = 0;
    gsap.to(overlay, { opacity: 1, duration: 1.2, ease: "power2.out" });
    gsap.fromTo("#result-emoji", { scale: 0.2, rotation: -30 }, { scale: 1.1, rotation: 0, duration: 1.4, ease: "elastic.out(1,0.5)" });

    await submitScore(score, Math.max(3, elapsed));
    gameState = STATE.SAVED;
}
async function submitScore(points, completionTime) {
    console.log('%c[Score] Submitting →', 'color:#FFD700', { points, completionTime });
    const badge = document.getElementById('submitting-badge');
    badge.classList.add('show');

    try {
        const res = await fetch('../../../../games/maze_runner/maze_runner_backend.php?action=score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session_id: serverSessionId,
                points: points,
                completion_time: completionTime
            })
        });
        const data = await res.json();
        if (data.status === 'success') {
            console.log('%c[Score] Saved ✓ points=' + data.data.points + ' | time=' + data.data.completion_time, 'color:#39FF14');
        } else {
            console.warn('%c[Score] Save failed:', data.message, 'color:#FF4444');
        }
    } catch(e) {
        console.error('%c[Score] Network error:', e);
    } finally {
        badge.classList.remove('show');
    }
}
function newMaze() {
    const overlay = document.getElementById('result-overlay');
    overlay.classList.remove('show');
    overlay.style.display = '';
    
    stopTimer();
    moves = 0;
    elapsed = 0;
    updateHUD();
    document.getElementById('timer-pill').classList.remove('urgent');
    buildAndDrawMaze();
    if (gameState !== STATE.PLAYING) gameState = STATE.PLAYING;
    startTimer();
}

function resetToMenu() {
    if (hintTimeoutId) {
        clearTimeout(hintTimeoutId);
        hintTimeoutId = null;
    }

    gsap.killTweensOf("#screen-difficulty");
    gsap.killTweensOf("#screen-game");

    const overlay = document.getElementById('result-overlay');
    overlay.classList.remove('show');
    overlay.style.display = '';
    overlay.style.opacity = '';

    const gameScreen = document.getElementById('screen-game');
    gameScreen.style.display = 'none';
    gameScreen.style.opacity = '';
    gameScreen.style.transform = '';
    gameScreen.style.visibility = '';

    const diffScreen = document.getElementById('screen-difficulty');
    diffScreen.style.display = 'flex';
    diffScreen.style.opacity = '';
    diffScreen.style.transform = '';
    diffScreen.style.visibility = '';

    gameState = STATE.INIT;
    stopTimer();
    document.getElementById('timer-pill').classList.remove('urgent');

    if (!document.querySelector('.diff-card.selected')) {
        const easyCard = document.querySelector('.diff-card[data-diff="easy"]');
        if (easyCard) easyCard.classList.add('selected');
    }
}

function goMenu() { window.location.href = '../../game-menu/menu.php'; }

function selectDiff(el, diff) {
    document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    difficulty = diff;
}

// Keyboard controls
window.addEventListener('keydown', e => {
    if (gameState !== STATE.PLAYING) return;
    const map = { ArrowUp: 'n', ArrowDown: 's', ArrowLeft: 'w', ArrowRight: 'e', w: 'n', s: 's', a: 'w', d: 'e' };
    if (map[e.key]) { e.preventDefault(); move(map[e.key]); }
});

// Touch swipe
let touchStartX = 0, touchStartY = 0;
canvas.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
}, { passive: false });
canvas.addEventListener('touchend', e => {
    if (gameState !== STATE.PLAYING) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'e' : 'w');
    else move(dy > 0 ? 's' : 'n');
    e.preventDefault();
}, { passive: false });

// GSAP press feedback for all interactive buttons
document.querySelectorAll('.ctrl-btn, .dpad-btn, .btn-start').forEach(btn => {
    btn.addEventListener('mousedown', () => gsap.to(btn, { scale: 0.92, duration: 0.1 }));
    btn.addEventListener('mouseup', () => gsap.to(btn, { scale: 1, duration: 0.2 }));
});