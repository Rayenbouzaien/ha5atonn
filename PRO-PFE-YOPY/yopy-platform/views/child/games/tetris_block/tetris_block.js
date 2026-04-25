// ── PHP values ──
const GAME_ID    = 'tetris_block';
const SESSION_ID = '<?= $sessionId ?>';
const BUDDY_ID   = '<?= $buddyId ?>';

const BUDDY_EMOJIS = {joy:'😊',sadness:'😢',anger:'😠',disgust:'🤢',fear:'😨',anxiety:'😰'};
document.getElementById('buddy-avatar').textContent = BUDDY_EMOJIS[BUDDY_ID]||'😊';

// ── BEHAVIOR COLLECTOR ──
const SIGNAL_MAP = {
    move:      'reaction',
    rotate:    'reaction',
    drop:      'success',
    line_clear:'success',
    game_over: 'error'
};

let collector = new BehaviorCollector('tetris_block', SIGNAL_MAP);

// ── State & Globals (declared BEFORE any function) ──
const STATE = {INIT:'INIT', READY:'READY', PLAYING:'PLAYING', PAUSED:'PAUSED', OVER:'OVER', SAVED:'SAVED'};
let gameState       = STATE.INIT;
let difficulty      = 'easy';
let board           = [];
let boardColors     = [];
let current         = null;
let nextPiece       = null;
let score           = 0;
let lines           = 0;
let level           = 1;
let dropInterval    = 700;
let dropTimer       = null;
let serverSessionId = SESSION_ID;
let gameStartTime   = null;     // ← accurate completion time
let startTimestamp  = null;

// ── Constants ──
const COLS = 10, ROWS = 20;
const BLOCK = 28;
const NEXT_BLOCK = 20;

const PIECES = {
    I: { shape:[[1,1,1,1]], color:'#22d3ee' },
    O: { shape:[[1,1],[1,1]], color:'#facc15' },
    T: { shape:[[0,1,0],[1,1,1]], color:'#a855f7' },
    S: { shape:[[0,1,1],[1,1,0]], color:'#4ade80' },
    Z: { shape:[[1,1,0],[0,1,1]], color:'#f87171' },
    J: { shape:[[1,0,0],[1,1,1]], color:'#60a5fa' },
    L: { shape:[[0,0,1],[1,1,1]], color:'#fb923c' },
};
const PIECE_KEYS = Object.keys(PIECES);
const LINE_SCORES = [0, 40, 100, 300, 1200];

const DIFF_CONFIG = {
    easy:   { startInterval: 700, mult: 1,   label: 'Easy'   },
    medium: { startInterval: 500, mult: 1.5, label: 'Medium' },
    hard:   { startInterval: 300, mult: 2,   label: 'Hard'   },
};

// ── Canvas setup ──
const canvas     = document.getElementById('tetris-canvas');
const ctx        = canvas.getContext('2d');
canvas.width     = COLS * BLOCK;
canvas.height    = ROWS * BLOCK;
const nextCanvas = document.getElementById('next-canvas');
const nCtx       = nextCanvas.getContext('2d');

// ── Difficulty selection ──
function selectDiff(el, diff) {
    document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    difficulty = diff;
}

// ── START GAME ──
async function startGame() {
    if (gameState !== STATE.INIT) return;

    try {
        const res = await fetch('../../../../games/tetris_block/tetris_block_backend.php?action=start', {
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

    const cfg = DIFF_CONFIG[difficulty];
    dropInterval = cfg.startInterval;

    initBoard();
    nextPiece = spawnPiece();
    spawnCurrent();
    drawBoard();
    drawNext();

    document.getElementById('screen-difficulty').style.display = 'none';
    const gs = document.getElementById('screen-game');
    gs.style.display = 'flex';
    gs.classList.add('wufff-enter');

    gameState = STATE.READY;
    showOverlay('TETRIS', 'Press any key or tap ▶ to begin', '▶ Start');
}

function resumeGame() {
    if (gameState !== STATE.READY && gameState !== STATE.PAUSED) return;
    hideOverlay();
    gameState = STATE.PLAYING;
    gameStartTime = Date.now();
    scheduleDrop();
}

// ── Board & Piece functions ──
function initBoard() {
    board       = Array.from({length: ROWS}, () => Array(COLS).fill(0));
    boardColors = Array.from({length: ROWS}, () => Array(COLS).fill(null));
    score = lines = 0; level = 1;
    updateHUD();
}

function spawnPiece() {
    const key = PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)];
    return { key, shape: PIECES[key].shape, color: PIECES[key].color };
}

function spawnCurrent() {
    current = {
        ...nextPiece,
        shape: nextPiece.shape.map(r => [...r]),
        x: Math.floor(COLS / 2) - Math.floor(nextPiece.shape[0].length / 2),
        y: 0,
    };
    nextPiece = spawnPiece();
    drawNext();
}
// ── Draw board ──
function drawBoard() {
    // Background
    ctx.fillStyle = '#0a0a15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,.04)';
    ctx.lineWidth = .5;
    for (let r = 0; r <= ROWS; r++) { ctx.beginPath(); ctx.moveTo(0, r*BLOCK); ctx.lineTo(canvas.width, r*BLOCK); ctx.stroke(); }
    for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(c*BLOCK, 0); ctx.lineTo(c*BLOCK, canvas.height); ctx.stroke(); }

    // Locked blocks
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c]) drawBlock(ctx, c, r, boardColors[r][c], BLOCK);
        }
    }

    // Ghost piece
    if (current && gameState === STATE.PLAYING) {
        const ghost = getGhostY();
        ctx.globalAlpha = 0.2;
        for (let r = 0; r < current.shape.length; r++) {
            for (let c = 0; c < current.shape[r].length; c++) {
                if (current.shape[r][c]) drawBlock(ctx, current.x + c, ghost + r, current.color, BLOCK);
            }
        }
        ctx.globalAlpha = 1;
    }

    // Current piece
    if (current) {
        for (let r = 0; r < current.shape.length; r++) {
            for (let c = 0; c < current.shape[r].length; c++) {
                if (current.shape[r][c]) drawBlock(ctx, current.x + c, current.y + r, current.color, BLOCK);
            }
        }
    }
}

function drawBlock(ctx2, cx, cy, color, size) {
    const x = cx * size, y = cy * size;
    ctx2.fillStyle = color;
    ctx2.fillRect(x+1, y+1, size-2, size-2);
    // Highlight
    ctx2.fillStyle = 'rgba(255,255,255,.25)';
    ctx2.fillRect(x+2, y+2, size-4, 4);
    ctx2.fillRect(x+2, y+2, 4, size-4);
    // Shadow
    ctx2.fillStyle = 'rgba(0,0,0,.3)';
    ctx2.fillRect(x+1, y+size-3, size-2, 2);
    ctx2.fillRect(x+size-3, y+1, 2, size-2);
}

// ── Draw next ──
function drawNext() {
    nCtx.fillStyle = '#0a0a15';
    nCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    if (!nextPiece) return;
    const sh = nextPiece.shape;
    const offX = Math.floor((4 - sh[0].length) / 2);
    const offY = Math.floor((4 - sh.length) / 2);
    for (let r = 0; r < sh.length; r++) {
        for (let c = 0; c < sh[r].length; c++) {
            if (sh[r][c]) drawBlock(nCtx, offX + c, offY + r, nextPiece.color, NEXT_BLOCK);
        }
    }
}

// ── Ghost piece ──
function getGhostY() {
    let gy = current.y;
    while (!collides(current.x, gy + 1, current.shape)) gy++;
    return gy;
}

// ── Collision ──
function collides(nx, ny, shape) {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (!shape[r][c]) continue;
            const x = nx + c, y = ny + r;
            if (x < 0 || x >= COLS || y >= ROWS) return true;
            if (y >= 0 && board[y][x]) return true;
        }
    }
    return false;
}

// ── Movement ──
function moveLeft()  { if (!collides(current.x-1, current.y, current.shape)) current.x--; drawBoard(); }
function moveRight() { if (!collides(current.x+1, current.y, current.shape)) current.x++; drawBoard(); }

function softDrop() {
    if (!collides(current.x, current.y+1, current.shape)) {
        current.y++;
        score += 1;
        updateHUD();
    } else lock();
    drawBoard();
}

function hardDrop() {
    let dropped = 0;
    while (!collides(current.x, current.y+1, current.shape)) { current.y++; dropped++; }
    score += dropped * 2;
    updateHUD();
    lock();
    drawBoard();
}

function rotate() {
    const rotated = current.shape[0].map((_, c) => current.shape.map(r => r[c]).reverse());
    for (const kick of [0, -1, 1, -2, 2]) {
        if (!collides(current.x + kick, current.y, rotated)) {
            current.shape = rotated;
            current.x += kick;
            drawBoard();
            if (collector) collector.record('rotate', null);
            return;
        }
    }
}

function lock() {
    clearInterval(dropTimer);
    for (let r = 0; r < current.shape.length; r++) {
        for (let c = 0; c < current.shape[r].length; c++) {
            if (!current.shape[r][c]) continue;
            const y = current.y + r, x = current.x + c;
            if (y < 0) { endGame(); return; }
            board[y][x]       = 1;
            boardColors[y][x] = current.color;
        }
    }
    if (collector) collector.record('drop', score);
    clearLines();
    spawnCurrent();
    if (collides(current.x, current.y, current.shape)) { endGame(); return; }
    scheduleDrop();
}

function clearLines() {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; ) {
        if (board[r].every(c => c === 1)) {
            board.splice(r, 1);
            boardColors.splice(r, 1);
            board.unshift(Array(COLS).fill(0));
            boardColors.unshift(Array(COLS).fill(null));
            cleared++;
        } else r--;
    }
    if (cleared > 0) {
        const cfg = DIFF_CONFIG[difficulty];
        score += Math.round(LINE_SCORES[cleared] * level * cfg.mult);
        lines += cleared;
        level  = Math.floor(lines / 10) + 1;
        dropInterval = Math.max(80, DIFF_CONFIG[difficulty].startInterval - (level - 1) * 35);
        updateHUD();
        if (collector) collector.record('line_clear', cleared);
    }
}

function scheduleDrop() {
    clearInterval(dropTimer);
    dropTimer = setInterval(() => {
        if (gameState !== STATE.PLAYING) return;
        if (!collides(current.x, current.y + 1, current.shape)) {
            current.y++;
            drawBoard();
        } else lock();
    }, dropInterval);
}

function updateHUD() {
    ['hud-score','panel-score'].forEach(id => { const el = document.getElementById(id); if(el) el.textContent = score; });
    ['hud-level','panel-level'].forEach(id => { const el = document.getElementById(id); if(el) el.textContent = level; });
    ['hud-lines','panel-lines'].forEach(id => { const el = document.getElementById(id); if(el) el.textContent = lines; });
}

function showOverlay(title, sub, btnText) {
    document.getElementById('overlay-title').textContent = title;
    document.getElementById('overlay-sub').textContent   = sub;
    document.getElementById('overlay-btn').textContent   = btnText;
    document.getElementById('board-overlay').classList.remove('hidden');
}
function hideOverlay() { document.getElementById('board-overlay').classList.add('hidden'); }

function pauseGame() {
    if (gameState !== STATE.PLAYING) return;
    clearInterval(dropTimer);
    gameState = STATE.PAUSED;
    showOverlay('PAUSED', '', '▶ Resume');
}

async function endGame() {
    if (gameState === STATE.OVER || gameState === STATE.SAVED) return;
    gameState = STATE.OVER;
    clearInterval(dropTimer);
    drawBoard();

    if (collector) {
        collector.record('game_over', null);
        await collector.flush();
    }

    const elapsed = gameStartTime ? Math.max(3, Math.floor((Date.now() - gameStartTime) / 1000)) : 3;

    let emoji = score >= 10000 ? '🏆' : score >= 3000 ? '🎉' : score >= 500 ? '👍' : '🎮';

    document.getElementById('result-emoji').textContent        = emoji;
    document.getElementById('result-score-display').textContent = score.toLocaleString();
    document.getElementById('result-detail').textContent = `${lines} line${lines!==1?'s':''} · Level ${level} · ${DIFF_CONFIG[difficulty].label}`;
    document.getElementById('result-overlay').classList.add('show');

    await submitScore(score, elapsed);
    gameState = STATE.SAVED;
}

async function submitScore(points, completionTime) {
    console.log('%c[Score] Submitting →', 'color:#FFD700', { points, completionTime });
    try {
        const res = await fetch('../../../../games/tetris_block/tetris_block_backend.php?action=score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: serverSessionId, points, completion_time: completionTime })
        });
        const data = await res.json();
        if (data.status === 'success') {
            console.log('%c[Score] Saved ✓ points=' + data.data.points + ' | time=' + data.data.completion_time, 'color:#39FF14');
        } else {
            console.warn('%c[Score] Save failed:', data.message, 'color:#FF4444');
        }
    } catch (err) {
        console.error('%c[Score] Network error:', err);
    }
}

// ── Play again & menu ──
function playAgain() {
    document.getElementById('result-overlay').classList.remove('show');
    gameState = STATE.INIT;
    clearInterval(dropTimer);
    initBoard();
    nextPiece = spawnPiece();
    spawnCurrent();
    drawBoard(); drawNext();
    gameState = STATE.READY;
    showOverlay('TETRIS','Press any key or tap ▶ to begin','▶ Start');
}
function goMenu() { window.location.href = '../../game-menu/menu.php'; }

// ── Keyboard & D-pad (with behavior recording) ──
document.addEventListener('keydown', e => {
    if (gameState === STATE.READY || gameState === STATE.PAUSED) {
        if (!['Tab','F5'].includes(e.key)) resumeGame();
        return;
    }
    if (gameState !== STATE.PLAYING) return;

    if (collector) collector.record('move', null);

    switch(e.key) {
        case 'ArrowLeft':  e.preventDefault(); moveLeft();  break;
        case 'ArrowRight': e.preventDefault(); moveRight(); break;
        case 'ArrowDown':  e.preventDefault(); softDrop();  break;
        case 'ArrowUp':    e.preventDefault(); rotate();    break;
        case ' ':          e.preventDefault(); hardDrop();  break;
        case 'p': case 'P': pauseGame(); break;
    }
});

function dpadAction(dir) {
    if (gameState === STATE.READY || gameState === STATE.PAUSED) { resumeGame(); return; }
    if (gameState !== STATE.PLAYING) return;
    if (collector) collector.record('move', null);
    switch(dir) {
        case 'left':  moveLeft();  break;
        case 'right': moveRight(); break;
        case 'down':  softDrop();  break;
        case 'up':    rotate();    break;
        case 'space': hardDrop();  break;
    }
}
// ── Touch swipe ──
let touchStartX = 0, touchStartY = 0, touchStartTime = 0;
canvas.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    e.preventDefault();
}, {passive: false});

canvas.addEventListener('touchend', e => {
    if (gameState === STATE.READY || gameState === STATE.PAUSED) { resumeGame(); return; }
    if (gameState !== STATE.PLAYING) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const dt = Date.now() - touchStartTime;
    const absDx = Math.abs(dx), absDy = Math.abs(dy);

    if (absDx < 10 && absDy < 10 && dt < 200) { rotate(); return; } // tap = rotate
    if (absDx > absDy) {
        if (dx > 20) moveRight(); else moveLeft();
    } else {
        if (dy > 20 && dy > absDx) hardDrop();
        else if (dy < -20) rotate();
    }
    e.preventDefault();
}, {passive: false});