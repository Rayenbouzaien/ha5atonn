
// ── PHP values ──
const GAME_ID    = 'whack_a_mole';
const SESSION_ID = '<?= $sessionId ?>';
const BUDDY_ID   = '<?= $buddyId ?>';

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

const BUDDY_META = {
    joy:     { color: '#FBBF24', rgb: '251,191,36'  },
    sadness: { color: '#60A5FA', rgb: '96,165,250'  },
    anger:   { color: '#F87171', rgb: '248,113,113' },
    disgust: { color: '#4ADE80', rgb: '74,222,128'  },
    fear:    { color: '#C084FC', rgb: '192,132,252' },
    anxiety: { color: '#FB923C', rgb: '251,146,60'  }
};

  function initBuddyAvatar() {
            let buddy = null;
            try {
                const raw = sessionStorage.getItem('chosen_character');
                if (raw) buddy = JSON.parse(raw);
            } catch (e) {}

            /* fallback to PHP session value, then to joy */
            const id = (buddy && BIG[buddy.id]) ? buddy.id :
                (BIG['<?= $buddyId ?>'] ? '<?= $buddyId ?>' :
                    'joy');

            const avatarEl = document.getElementById('buddy-avatar');
            if (avatarEl) avatarEl.innerHTML = BIG[id];

            /* apply buddy accent color to avatar ring */
            const meta = BUDDY_META[id] || BUDDY_META.joy;
            const style = document.getElementById('buddy-avatar').style;
            style.borderColor = meta.color;
            style.boxShadow = `0 0 18px rgba(${meta.rgb}, 0.55), 0 0 6px rgba(${meta.rgb}, 0.3)`;
        }
        initBuddyAvatar();
        // ── STANDARD BEHAVIOR COLLECTOR ──
const SIGNAL_MAP = {
    whack: 'success',   // hit a mole
    miss:  'error',     // missed mole or hit bomb
    bomb:  'error'      // hit bomb
};

let collector = new BehaviorCollector('whack_a_mole', SIGNAL_MAP);
let serverSessionId = SESSION_ID;
// ── State machine ──
const STATE = { INIT:'INITIALISÉ', PLAYING:'EN_COURS', DONE:'TERMINÉ', SAVED:'RÉSULTAT_STOCKÉ' };
let gameState = STATE.INIT;

// ── Difficulty config ──
const DIFF_CONFIG = {
    easy:   { moleMs: 1400, bombMs: 3000, timeLimit: 45, mult: 1,   label: 'Easy'   },
    medium: { moleMs: 950,  bombMs: 2200, timeLimit: 35, mult: 1.5, label: 'Medium' },
    hard:   { moleMs: 620,  bombMs: 1600, timeLimit: 25, mult: 2,   label: 'Hard'   },
};

// ── Character image paths ──
const IMG_BASE  = '../../../../public/images/GAMES/whack_a_mole/';
const MOLE_SRC  = IMG_BASE + 'monty-mole.png';
const BOMB_SRC  = IMG_BASE + 'piranha-plant.png'; // piranha plant acts as the "bomb" / hazard

// ── Game state ──
let difficulty      = 'easy';
let score           = 0;
let hits            = 0;
let misses          = 0;
let streak          = 0;
let bestStreak      = 0;
let timeLeft        = 45;
let timerInterval   = null;
let moleTimeout     = null;
let bombTimeout     = null;
let activeMoleHole  = null;
let activeBombHole  = null;

let holes           = [];

// ── Difficulty selection ──
function selectDiff(el, diff) {
    document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    difficulty = diff;
}

// ── Build the 3×3 board ──
function buildBoard() {
    const board = document.getElementById('wam-board');
    board.innerHTML = '';
    holes = [];
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.className = 'hole';
        hole.dataset.idx = i;
        hole.innerHTML = `
            <div class="hole-bg"></div>
            <div class="hole-opening"></div>
            <div class="character"></div>`;
        hole.addEventListener('click', onHoleClick);
        board.appendChild(hole);
        holes.push(hole);
    }
}

// ── Start game session ──
async function startGame() {
    if (gameState !== STATE.INIT) return;

    try {
        const res = await fetch('../../../../games/whack_a_mole/whack_a_mole_backend.php?action=start', {
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

    gameState = STATE.PLAYING;
    document.getElementById('screen-difficulty').style.display = 'none';
    const gs = document.getElementById('screen-game');
    gs.style.display = 'flex';
    gs.classList.add('wufff-enter');

    buildBoard();
    resetStats();
    startTimer();
    scheduleMole();
    scheduleBomb();
}

function resetStats() {
    const cfg = DIFF_CONFIG[difficulty];
    score = 0; hits = 0; misses = 0; streak = 0; bestStreak = 0;
    timeLeft = cfg.timeLimit;
    updateHUD();
    setStreak('');
    document.getElementById('timer-pill').classList.remove('urgent');
}

// ── Timer ──
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('hud-timer').textContent = timeLeft;
        if (timeLeft <= 10) document.getElementById('timer-pill').classList.add('urgent');
        if (timeLeft <= 0) endGame();
    }, 1000);
}

// ── Pop a mole ──
function scheduleMole() {
    if (gameState !== STATE.PLAYING) return;
    const cfg = DIFF_CONFIG[difficulty];
    // Small random jitter so rhythm isn't predictable
    const delay = cfg.moleMs * (0.7 + Math.random() * 0.6);

    moleTimeout = setTimeout(() => {
        hideMole();
        const idx = getRandomHole([activeBombHole ? parseInt(activeBombHole.dataset.idx) : -1]);
        activeMoleHole = holes[idx];
        showCharacter(activeMoleHole, MOLE_SRC, 'mole');
        // Auto-hide after the mole's display window
        moleTimeout = setTimeout(() => {
            if (activeMoleHole) {
                hideMole();
                misses++;
                scheduleMole();
            }
        }, cfg.moleMs);
    }, delay);
}

// ── Pop a bomb ──
function scheduleBomb() {
    if (gameState !== STATE.PLAYING) return;
    const cfg = DIFF_CONFIG[difficulty];
    const delay = cfg.bombMs * (0.8 + Math.random() * 0.4);

    bombTimeout = setTimeout(() => {
        hideBomb();
        const idx = getRandomHole([activeMoleHole ? parseInt(activeMoleHole.dataset.idx) : -1]);
        activeBombHole = holes[idx];
        showCharacter(activeBombHole, BOMB_SRC, 'bomb');
        bombTimeout = setTimeout(() => {
            if (activeBombHole) { hideBomb(); scheduleBomb(); }
        }, cfg.bombMs);
    }, delay);
}

// ── Show/hide characters ──
function showCharacter(hole, src, type) {
    const ch = hole.querySelector('.character');
    ch.innerHTML = `<img src="${src}" alt="${type}" draggable="false">`;
    hole.dataset.type = type;
    hole.classList.add('up');
}

function hideMole() {
    if (!activeMoleHole) return;
    activeMoleHole.classList.remove('up', 'whacked');
    activeMoleHole.querySelector('.character').innerHTML = '';
    activeMoleHole.dataset.type = '';
    activeMoleHole = null;
}

function hideBomb() {
    if (!activeBombHole) return;
    activeBombHole.classList.remove('up', 'whacked');
    activeBombHole.querySelector('.character').innerHTML = '';
    activeBombHole.dataset.type = '';
    activeBombHole = null;
}

// ── Click handler ──
function onHoleClick(e) {
    if (gameState !== STATE.PLAYING) return;
    const hole = e.currentTarget;
    const type = hole.dataset.type;

    if (type === 'mole') {
        clearTimeout(moleTimeout);
        const cfg   = DIFF_CONFIG[difficulty];
        streak++;
        bestStreak  = Math.max(bestStreak, streak);
        const bonus  = streak >= 3 ? Math.floor(streak / 3) : 0;
        const pts    = Math.round((10 + bonus * 5) * cfg.mult);
        score       += pts;
        hits++;
        if (collector) collector.record('whack', pts);

        hole.classList.add('whacked');
        playSound('snd-hit');
        showScorePop(hole, `+${pts}`, 'positive');
        setStreak(streak >= 3 ? `🔥 ${streak}× Combo! +${bonus*5} bonus` : '');

        setTimeout(() => { hideMole(); scheduleMole(); }, 220);
        updateHUD();

    } else if (type === 'bomb') {
        clearTimeout(bombTimeout);
        const cfg  = DIFF_CONFIG[difficulty];
        const pen  = Math.round(15 * cfg.mult);
        score      = Math.max(0, score - pen);
        streak     = 0;
        if (collector) collector.record('bomb', null);

        hole.classList.add('whacked');
        hole.querySelector('.character').innerHTML = '<span style="font-size:2em">💥</span>';
        showScorePop(hole, `-${pen}`, 'negative');
        setStreak('');

        setTimeout(() => { hideBomb(); scheduleBomb(); }, 300);
        updateHUD();
    }
}
// ── Floating score pop ──
function showScorePop(hole, text, cls) {
    const pop = document.createElement('div');
    pop.className = `score-pop ${cls}`;
    pop.textContent = text;
    hole.appendChild(pop);
    setTimeout(() => pop.remove(), 700);
}

// ── Sound helper (silently ignores if files missing) ──
function playSound(id, fromStart = true) {
    try {
        const el = document.getElementById(id);
        if (!el) return;
        if (fromStart) { el.pause(); el.currentTime = 0; }
        el.play().catch(() => {});
    } catch(e) {}
}

// ── Helpers ──
function getRandomHole(excludeIdxs = []) {
    const available = Array.from({length:9}, (_,i) => i).filter(i => !excludeIdxs.includes(i));
    return available[Math.floor(Math.random() * available.length)];
}

function setStreak(msg) {
    const el = document.getElementById('streak-badge');
    el.textContent = msg;
}

function updateHUD() {
    document.getElementById('hud-score').textContent = score;
}

// ── Restart within same difficulty ──
function restartRound() {
    if (gameState !== STATE.PLAYING) return;
    clearInterval(timerInterval);
    clearTimeout(moleTimeout);
    clearTimeout(bombTimeout);
    hideMole(); hideBomb();
    buildBoard();
    resetStats();
    startTimer();
    scheduleMole();
    scheduleBomb();
}

// ── End game ──
async function endGame() {
    if (gameState !== STATE.PLAYING) return;
    gameState = STATE.DONE;

    clearInterval(timerInterval);
    clearTimeout(moleTimeout);
    clearTimeout(bombTimeout);
    hideMole(); hideBomb();

    if (collector) {
        collector.record('miss', null);   // final miss signal
        await collector.flush();
    }

    playSound('snd-gameover');

    const cfg     = DIFF_CONFIG[difficulty];
    const elapsed = cfg.timeLimit;

    let emoji, title;
    if      (score >= 200) { emoji = '🏆'; title = 'Amazing!'; }
    else if (score >= 100) { emoji = '🎉'; title = 'Great job!'; }
    else if (score >=  50) { emoji = '👍'; title = 'Not bad!'; }
    else                   { emoji = '😅'; title = 'Keep trying!'; }

    document.getElementById('result-emoji').textContent        = emoji;
    document.getElementById('result-title').textContent        = title;
    document.getElementById('result-score-display').textContent = `Score: ${score}`;
    document.getElementById('result-detail').textContent =
        `${hits} hit${hits!==1?'s':''} · ${bestStreak}× best combo · ${cfg.label}`;
    document.getElementById('result-overlay').classList.add('show');

    await submitScore(score, elapsed);
    gameState = STATE.SAVED;
}

async function submitScore(points, completionTime) {
    console.log('%c[Score] Submitting →', 'color:#FFD700', { points, completionTime });
    const badge = document.getElementById('submitting-badge');
    badge.classList.add('show');

    try {
        const res = await fetch('../../../../games/whack_a_mole/whack_a_mole_backend.php?action=score', {
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

// ── Navigation ──
function resetToMenu() {
    document.getElementById('result-overlay').classList.remove('show');
    try { const g = document.getElementById('snd-gameover'); g.pause(); g.currentTime = 0; } catch(e) {}
    document.getElementById('screen-game').style.display       = 'none';
    document.getElementById('screen-difficulty').style.display = 'flex';
    gameState = STATE.INIT;
}
function goMenu() { window.location.href = '../../game-menu/menu.php'; }

// ── Particle canvas ──
(function particles() {
    const canvas = document.getElementById('particles');
    const ctx    = canvas.getContext('2d');
    const COLORS = ['#FFB0D0','#FFD700','#4AACFF','#4ECDC4','#9D3FFF'];
    let pts = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 45; i++) pts.push({
        x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
        r: Math.random()*3+1, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
        c: COLORS[Math.floor(Math.random()*COLORS.length)],
    });
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pts.forEach(p => {
            ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fillStyle=p.c+'55'; ctx.fill();
            p.x+=p.vx; p.y+=p.vy;
            if(p.x<0||p.x>canvas.width)  p.vx*=-1;
            if(p.y<0||p.y>canvas.height) p.vy*=-1;
        });
        requestAnimationFrame(draw);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
})();