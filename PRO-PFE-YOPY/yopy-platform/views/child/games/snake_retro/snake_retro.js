const GAME_ID    = 'snake_retro';
const SESSION_ID = '<?= $sessionId ?>';
const BUDDY_ID   = '<?= $buddyId ?>';

const BUDDY_EMOJIS = { joy:'😊', sadness:'😢', anger:'😠', disgust:'🤢', fear:'😨', anxiety:'😰' };
document.getElementById('buddy-avatar').textContent = BUDDY_EMOJIS[BUDDY_ID] || '😊';

// ── State machine ──
const STATE = { INIT:'INITIALISÉ', WAITING:'EN_ATTENTE', PLAYING:'EN_COURS', DONE:'TERMINÉ', SAVED:'RÉSULTAT_STOCKÉ' };

// ── BEHAVIOR COLLECTOR (must be declared early) ──
const SIGNAL_MAP = {
    move:      'reaction',   // every direction input
    eat:       'success',    // ate food
    collision: 'error'       // game over
};

let collector = new BehaviorCollector('snake_retro', SIGNAL_MAP);

// ── MUTABLE GLOBALS (declared BEFORE any function uses them) ──
let gameState       = STATE.INIT;
let difficulty      = 'easy';
let inputDir        = { x: 0, y: 0 };
let nextDir         = { x: 0, y: 0 };
let directionLocked = false;
let snakeArr        = [{ x: 9, y: 9 }];
let food            = { x: 4, y: 4 };
let score           = 0;
let bestScore       = 0;
let lastPaintTime   = 0;
let rafId           = null;
let serverSessionId = SESSION_ID;
let gameStarted     = false;
let elapsed         = 0;
let startTimestamp  = null;
let accumulator     = 0;

// ── Difficulty config ──
const DIFF_CONFIG = {
    easy:   { speed: 5,  mult: 1, label: 'Easy'   },
    medium: { speed: 8,  mult: 2, label: 'Medium'  },
    hard:   { speed: 12, mult: 3, label: 'Hard'    },
};

// ── Grid & Canvas ──
const GRID = 18;
const canvas  = document.getElementById('board');
const ctx     = canvas.getContext('2d');
const CELL_PX = Math.floor(Math.min(window.innerWidth * 0.8, 440) / GRID);
canvas.width  = CELL_PX * GRID;
canvas.height = CELL_PX * GRID;

// ── Load best score ──
function loadBest() {
    try { bestScore = parseInt(sessionStorage.getItem('snake_best') || '0') || 0; } catch(e) {}
    updateBestDisplay();
}
function saveBest() {
    if (score > bestScore) {
        bestScore = score;
        try { sessionStorage.setItem('snake_best', bestScore); } catch(e) {}
        updateBestDisplay();
    }
}
function updateBestDisplay() {
    document.getElementById('hud-best').textContent    = bestScore;
    document.getElementById('strip-best').textContent  = bestScore;
}

// ── Sound helper ──
function playSound(id, restart = true) {
    try {
        const el = document.getElementById(id);
        if (!el) return;
        if (restart) { el.pause(); el.currentTime = 0; }
        el.play().catch(() => {});
    } catch(e) {}
}
function stopSound(id) {
    try { const el = document.getElementById(id); el.pause(); el.currentTime = 0; } catch(e) {}
}

// ── Difficulty selection ──
function selectDiff(el, diff) {
    document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    difficulty = diff;
}

// ── START GAME (fixed path + collector) ──
async function startGame() {
    if (gameState !== STATE.INIT) return;

    try {
        const res = await fetch('../../../../games/snake_retro/snake_retro_backend.php?action=start', {
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
    } catch(e) {
        console.warn('[Session] Start failed', e);
    }

    gameState = STATE.WAITING;
    document.getElementById('screen-difficulty').style.display = 'none';
    const gs = document.getElementById('screen-game');
    gs.style.display = 'flex';
    gs.classList.add('wufff-enter');

    loadBest();
    resetBoard();
    drawFrame();
    playSound('snd-music', false);

    rafId = requestAnimationFrame(gameLoop);
}

// ── Reset board ──
function resetBoard() {
    snakeArr   = [{ x: 9, y: 9 }];
    DIFF_CONFIG[difficulty].speed = ({ easy:5, medium:8, hard:12 })[difficulty];
    inputDir   = { x: 0, y: 0 };
    nextDir    = { x: 0, y: 0 };
    food       = randomFood();
    score      = 0;
    gameStarted = false;
    startTimestamp = null;
    elapsed    = 0;
    accumulator = 0;
    lastPaintTime = 0;
    updateScoreDisplay();
    showOverlay('Ready?', 'Press any arrow to begin', '↑ ↓ ← →  or use the D-pad');
}

// ── Game loop (unchanged) ──
function gameLoop(ctime) {
    rafId = requestAnimationFrame(gameLoop);
    if (gameState !== STATE.WAITING && gameState !== STATE.PLAYING) return;
    if (!gameStarted) { drawFrame(); return; }

    const delta = (ctime - lastPaintTime) / 1000;
    lastPaintTime = ctime;
    accumulator += delta;

    const step = 1 / DIFF_CONFIG[difficulty].speed;
    while (accumulator >= step) {
        tick();
        accumulator -= step;
        if (gameState !== STATE.PLAYING) break;
    }
    drawFrame();
}

// ── Tick ──
function tick() {
    directionLocked = false;
    inputDir = { ...nextDir };
    const newHead = { x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y };

    if (isCollide(newHead)) {
        handleGameOver();
        return;
    }

    snakeArr.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        const cfg = DIFF_CONFIG[difficulty];
        score += cfg.mult;
        updateScoreDisplay();
        saveBest();
        playSound('snd-food');
        if (collector) collector.record('eat', score);   // success

        if (score % 5 === 0) {
            cfg.speed = Math.min(cfg.speed + 0.5, 30);
        }
        food = randomFood();
    } else {
        snakeArr.pop();
    }
}

// ── Collision — Fix 1: checks new head position before it moves ──
function isCollide(head) {
    // Wall
    if (head.x < 1 || head.x > GRID || head.y < 1 || head.y > GRID) return true;
    // Self — ignore last tail segment (it will move away this tick)
    for (let i = 0; i < snakeArr.length - 1; i++) {
        if (snakeArr[i].x === head.x && snakeArr[i].y === head.y) return true;
    }
    return false;
}

// ── Draw ──
function drawFrame() {
    const C = CELL_PX;

    // Background — dark retro grid
    ctx.fillStyle = '#000814';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(0,29,61,.8)';
    ctx.lineWidth = .5;
    for (let i = 0; i <= GRID; i++) {
        ctx.beginPath(); ctx.moveTo(i * C, 0); ctx.lineTo(i * C, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * C); ctx.lineTo(canvas.width, i * C); ctx.stroke();
    }

    // Food
    const fx = (food.x - 1) * C, fy = (food.y - 1) * C;
    const foodGrad = ctx.createLinearGradient(fx, fy, fx + C, fy + C);
    foodGrad.addColorStop(0, '#ee9b00');
    foodGrad.addColorStop(1, '#e9d8a6');
    ctx.fillStyle = foodGrad;
    roundRect(ctx, fx + 2, fy + 2, C - 4, C - 4, 6);
    ctx.fill();
    ctx.strokeStyle = '#e76f51';
    ctx.lineWidth = 1.5;
    roundRect(ctx, fx + 2, fy + 2, C - 4, C - 4, 6);
    ctx.stroke();

    // Snake
    snakeArr.forEach((seg, idx) => {
        const sx = (seg.x - 1) * C, sy = (seg.y - 1) * C;
        if (idx === 0) {
            // Head — gradient + slightly larger
            const grad = ctx.createLinearGradient(sx, sy, sx + C, sy + C);
            grad.addColorStop(0, '#780000');
            grad.addColorStop(1, '#c1121f');
            ctx.fillStyle = grad;
            roundRect(ctx, sx + 1, sy + 1, C - 2, C - 2, 7);
            ctx.fill();
            // Eyes
            const eyeR = Math.max(2, C * 0.1);
            ctx.fillStyle = '#ffc300';
            if (inputDir.x === 1 || inputDir.x === 0) {
                // facing right or idle
                ctx.beginPath(); ctx.arc(sx + C * 0.7, sy + C * 0.3, eyeR, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(sx + C * 0.7, sy + C * 0.7, eyeR, 0, Math.PI * 2); ctx.fill();
            } else if (inputDir.x === -1) {
                ctx.beginPath(); ctx.arc(sx + C * 0.3, sy + C * 0.3, eyeR, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(sx + C * 0.3, sy + C * 0.7, eyeR, 0, Math.PI * 2); ctx.fill();
            } else if (inputDir.y === -1) {
                ctx.beginPath(); ctx.arc(sx + C * 0.3, sy + C * 0.3, eyeR, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(sx + C * 0.7, sy + C * 0.3, eyeR, 0, Math.PI * 2); ctx.fill();
            } else {
                ctx.beginPath(); ctx.arc(sx + C * 0.3, sy + C * 0.7, eyeR, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(sx + C * 0.7, sy + C * 0.7, eyeR, 0, Math.PI * 2); ctx.fill();
            }
        } else {
            // Body
            const alpha = Math.max(0.4, 1 - idx * 0.04);
            ctx.fillStyle = `rgba(193,18,31,${alpha})`;
            roundRect(ctx, sx + 2, sy + 2, C - 4, C - 4, 10);
            ctx.fill();
        }
    });
}

// ── Rounded rect helper ──
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// ── Random food — Fix 6: enumerate free cells to avoid infinite loop ──
function randomFood() {
    const free = [];
    for (let x = 1; x <= GRID; x++) {
        for (let y = 1; y <= GRID; y++) {
            if (!snakeArr.some(s => s.x === x && s.y === y)) free.push({ x, y });
        }
    }
    if (free.length === 0) return { x: -1, y: -1 }; // board full — win state
    return free[Math.floor(Math.random() * free.length)];
}

// ── Overlay helpers ──
function showOverlay(title, sub, hint = '') {
    const ov = document.getElementById('board-overlay');
    ov.classList.remove('hidden');
    document.getElementById('overlay-title').textContent = title;
    document.getElementById('overlay-sub').textContent   = sub;
    document.getElementById('overlay-hint').textContent  = hint;
}
function hideOverlay() {
    document.getElementById('board-overlay').classList.add('hidden');
}

// ── Input — keyboard ──
window.addEventListener('keydown', e => {
    if (gameState !== STATE.WAITING && gameState !== STATE.PLAYING) return;
    let moved = true;

    switch (e.key) {
        case 'ArrowUp':    if (inputDir.y !== 1)  nextDir = { x: 0,  y: -1 }; break;
        case 'ArrowDown':  if (inputDir.y !== -1) nextDir = { x: 0,  y:  1 }; break;
        case 'ArrowLeft':  if (inputDir.x !== 1)  nextDir = { x: -1, y:  0 }; break;
        case 'ArrowRight': if (inputDir.x !== -1) nextDir = { x:  1, y:  0 }; break;
        default: moved = false;
    }

    if (moved && !directionLocked) {
        directionLocked = true;
        if (collector) collector.record('move', null);

        e.preventDefault();
        if (!gameStarted) {
            gameStarted    = true;
            startTimestamp = Date.now();
            gameState      = STATE.PLAYING;
            lastPaintTime  = performance.now();
            accumulator    = 0;
            hideOverlay();
        }
        playSound('snd-move');
    }
});

function dpadPress(dir) {
    if (gameState !== STATE.WAITING && gameState !== STATE.PLAYING) return;
    let moved = true;
    switch (dir) {
        case 'up':    if (inputDir.y !== 1)  nextDir = { x: 0,  y: -1 }; break;
        case 'down':  if (inputDir.y !== -1) nextDir = { x: 0,  y:  1 }; break;
        case 'left':  if (inputDir.x !== 1)  nextDir = { x: -1, y:  0 }; break;
        case 'right': if (inputDir.x !== -1) nextDir = { x:  1, y:  0 }; break;
        default: moved = false;
    }
    if (moved && !directionLocked) {
        directionLocked = true;
        if (collector) collector.record('move', null);

        if (!gameStarted) {
            gameStarted    = true;
            startTimestamp = Date.now();
            gameState      = STATE.PLAYING;
            lastPaintTime  = performance.now();
            accumulator    = 0;
            hideOverlay();
        }
        playSound('snd-move');
    }
}

// ── Game over (with collision signal + flush) ──
async function handleGameOver() {
    if (gameState === STATE.DONE || gameState === STATE.SAVED) return;
    gameState = STATE.DONE;
    cancelAnimationFrame(rafId);
    stopSound('snd-music');
    playSound('snd-gameover');
    saveBest();

    if (collector) {
        collector.record('collision', null);
        await collector.flush();
    }

    elapsed = startTimestamp ? Math.max(3, Math.floor((Date.now() - startTimestamp) / 1000)) : 3;

    const cfg    = DIFF_CONFIG[difficulty];
    const length = snakeArr.length;
    let emoji, title;
    if      (score >= 30) { emoji = '🏆'; title = 'Incredible!'; }
    else if (score >= 15) { emoji = '🎉'; title = 'Great run!'; }
    else if (score >=  5) { emoji = '👍'; title = 'Nice!'; }
    else                  { emoji = '🐍'; title = 'Game Over!'; }

    document.getElementById('result-emoji').textContent        = emoji;
    document.getElementById('result-title').textContent        = title;
    document.getElementById('result-score-display').textContent = `Score: ${score}`;
    document.getElementById('result-detail').textContent = `Length: ${length} · Best: ${bestScore} · ${cfg.label}`;
    document.getElementById('result-overlay').classList.add('show');

    await submitScore(score, elapsed);
    if (gameState === STATE.DONE) gameState = STATE.SAVED;
}

// ── Submit score (correct path + logs) ──
async function submitScore(points, completionTime) {
    console.log('%c[Score] Submitting →', 'color:#FFD700', { points, completionTime });

    try {
        const res = await fetch('../../../../games/snake_retro/snake_retro_backend.php?action=score', {
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
    } catch (err) {
        console.error('%c[Score] Network error:', err);
    }
}

// ── Play again & goMenu (unchanged) ──
function playAgain() {
    document.getElementById('result-overlay').classList.remove('show');
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    gameState = STATE.WAITING;
    resetBoard();
    drawFrame();
    playSound('snd-music', false);
    rafId = requestAnimationFrame(gameLoop);
}

function goMenu() { window.location.href = '../../game-menu/menu.php'; }

function updateScoreDisplay() {
    document.getElementById('hud-score').textContent   = score;
    document.getElementById('strip-score').textContent = score;
}


// ── Particle canvas ──
(function particles() {
    const c = document.getElementById('particles');
    const x = c.getContext('2d');
    const COLORS = ['#FFB0D0','#FFD700','#4AACFF','#4ECDC4','#9D3FFF'];
    let pts = [];
    function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 45; i++) pts.push({
        x: Math.random()*c.width, y: Math.random()*c.height,
        r: Math.random()*3+1, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
        col: COLORS[Math.floor(Math.random()*COLORS.length)],
    });
    function draw() {
        x.clearRect(0,0,c.width,c.height);
        pts.forEach(p => {
            x.beginPath(); x.arc(p.x,p.y,p.r,0,Math.PI*2);
            x.fillStyle=p.col+'55'; x.fill();
            p.x+=p.vx; p.y+=p.vy;
            if(p.x<0||p.x>c.width)  p.vx*=-1;
            if(p.y<0||p.y>c.height) p.vy*=-1;
        });
        requestAnimationFrame(draw);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
})();