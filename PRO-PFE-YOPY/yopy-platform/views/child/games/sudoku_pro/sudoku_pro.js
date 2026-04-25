/* ─── BUDDY SVGs ─── */
const BIG = {
    joy: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
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
    sadness: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
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
    anger: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
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
    disgust: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
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
    fear: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
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
    anxiety: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
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
    joy: {
        color: '#FBBF24',
        rgb: '251,191,36'
    },
    sadness: {
        color: '#60A5FA',
        rgb: '96,165,250'
    },
    anger: {
        color: '#F87171',
        rgb: '248,113,113'
    },
    disgust: {
        color: '#4ADE80',
        rgb: '74,222,128'
    },
    fear: {
        color: '#C084FC',
        rgb: '192,132,252'
    },
    anxiety: {
        color: '#FB923C',
        rgb: '251,146,60'
    }
};

/* ─── INJECT BUDDY AVATAR — read from sessionStorage like menu.php ─── */
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


// ---- 1. CONSTANTS & PHP DATA ----
// We bring the PHP variables into JS first
const PHP_SESSION_ID = "<?= $sessionId ?>";
const GAME_ID = 13; // Set this to your specific Game ID (e.g., REQ-13)

const DIFF_CONFIG = {
    easy: {
        flashMs: 750,
        pauseMs: 350,
        mult: 10,
        label: 'easy',
        maxMistakes: 5
    },
    medium: {
        flashMs: 550,
        pauseMs: 280,
        mult: 15,
        label: 'medium',
        maxMistakes: 4
    },
    hard: {
        flashMs: 380,
        pauseMs: 220,
        mult: 20,
        label: 'hard',
        maxMistakes: 3
    }
};

const PUZZLES = {
    easy: ['083007060910002748207100000190000030652800070004001500501046007840709300729000006', '940168050750230069200000000510700306307490500824356000000800100090013000070009602', '700205916008106700100034020806050201005007000204018503000940002092000157000002609'],
    medium: ['006800002980600300003095000007049506050000000094000087065000871100004000000780050', '003040016070000000200000008004650020050021000000000300902160007007230590015470800', '000005000010000030000762050080620010603190000000004000100937680067000004390806700'],
    hard: ['601008003027000009000000604200804000003000060059000020000000001590070000070086000', '004000000000950140000003000030084020127000800008009500400107060900500300000000008', '035000102960300500010500000100000004000670000690020005000800000050000007400000680']
};

// ---- 2. MUTABLE GLOBALS (Declared at the top to avoid initialization errors) ----
// ---- PHP SESSION DATA + BEHAVIOR COLLECTOR (MUST be first) ----
let gameState = 'INIT';
let difficulty = 'easy';
let currentPuzzle = '';
let solution = [];
let mistakes = 0;
let hintsUsed = 0;
let elapsed = 0;
let timerInterval = null;
let gameEnded = false;
let serverSessionId = "<?= $sessionId ?? ''; ?>";

let gameStartTime = null; // ← total game duration
let lastReactionTime = null; // ← reaction timing

/* ─── SIGNAL MAP — specific to Sudoku (like memory_game & simon_says) ─── */
const SIGNAL_MAP = {
    cell_input: 'reaction', // time between cell inputs
    correct: 'success', // correct number placed
    mistake: 'error', // wrong number / conflict
    hint_used: 'hint' // hint used
};

/* ─── FIX 1: Create collector IMMEDIATELY ─── */
let collector = new BehaviorCollector('sudoku_pro', SIGNAL_MAP);
const completedGroups = {
    rows: new Set(),
    cols: new Set(),
    boxes: new Set()
};

// ---- 3. FUNCTIONS ----
function selectDiff(el, diff) {
    document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    difficulty = diff;
}
function loadPuzzle() {
    // Pick a random puzzle string for the selected difficulty
    const pool = PUZZLES[difficulty];
    currentPuzzle = pool[Math.floor(Math.random() * pool.length)];

    // Parse the puzzle string into a 9×9 board
    const board = puzzleStringToBoard(currentPuzzle);

    // Compute the full solution (deep-copy so solver doesn't mutate the original)
    const solverBoard = board.map(row => [...row]);
    solveSudoku(solverBoard);
    solution = solverBoard;

    // Reset per-game counters
    mistakes = 0;
    hintsUsed = 0;
    document.getElementById('mistake-count').textContent = '0';

    // Reset group-complete tracking
    resetCompletedGroups();

    // Build DOM board and start timer
    buildBoard(board);
    startTimer();
}
async function startGame() {
    if (gameState !== 'INIT') return;

    gameState = 'PLAYING';
    gameEnded = false;

    // Animate transition first
    gsap.to('#screen-difficulty', {
        duration: 0.5, opacity: 0, scale: 0.9,
        onComplete: () => {
            document.getElementById('screen-difficulty').style.display = 'none';
            document.getElementById('screen-game').style.display = 'flex';
            gsap.fromTo('#screen-game', { opacity: 0, y: 40 },
                { duration: 0.7, opacity: 1, y: 0, ease: "backOut" });
        }
    });

    try {
        const res = await fetch('../../../../games/sudoku_pro/sudoku_pro_backend.php?action=start', {
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
    } catch (e) {
        console.warn('[Session] Start failed', e);
    }

    // ✅ Only load the puzzle AFTER serverSessionId is set
    loadPuzzle();

    gameStartTime = Date.now();
    lastReactionTime = Date.now();
}
function buildBoard(board) {
    const el = document.getElementById('sudoku-board');
    el.innerHTML = '';
    for (let r = 0; r < 9; r++)
        for (let c = 0; c < 9; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (c === 2 || c === 5) cell.classList.add('box-right');
            if (r === 2 || r === 5) cell.classList.add('box-bottom');
            const inp = document.createElement('input');
            inp.type = 'text';
            inp.maxLength = 1;
            inp.dataset.row = r;
            inp.dataset.col = c;
            const val = board[r][c];
            if (val !== 0) {
                inp.value = val;
                inp.readOnly = true;
            } else {
                inp.addEventListener('input', onCellInput);
                inp.addEventListener('keydown', onCellKeydown);
            }
            cell.appendChild(inp);
            el.appendChild(cell);
        }
}

function getBoardState() {
    let b = Array(9).fill().map(() => Array(9).fill(0));
    document.querySelectorAll('#sudoku-board input').forEach(inp => {
        let v = parseInt(inp.value);
        if (v >= 1 && v <= 9) b[parseInt(inp.dataset.row)][parseInt(inp.dataset.col)] = v;
    });
    return b;
}

function hasConflict(num, r, c) {
    const inputs = document.querySelectorAll('#sudoku-board input');
    for (let i = 0; i < 9; i++) {
        if (i !== c && parseInt(inputs[r * 9 + i].value) === num) return true;
        if (i !== r && parseInt(inputs[i * 9 + c].value) === num) return true;
    }
    const br = Math.floor(r / 3) * 3,
        bc = Math.floor(c / 3) * 3;
    for (let i = br; i < br + 3; i++)
        for (let j = bc; j < bc + 3; j++)
            if ((i !== r || j !== c) && parseInt(inputs[i * 9 + j].value) === num) return true;
    return false;
}

function revalidateBoard() {
    document.querySelectorAll('#sudoku-board input').forEach(inp => {
        if (inp.readOnly) return;
        let v = inp.value;
        if (!v) {
            inp.classList.remove('error', 'tentative');
            return;
        }
        let num = parseInt(v),
            r = parseInt(inp.dataset.row),
            c = parseInt(inp.dataset.col);
        if (hasConflict(num, r, c)) {
            inp.classList.add('error');
            inp.classList.remove('tentative');
        } else if (num !== solution[r][c]) {
            inp.classList.add('tentative');
            inp.classList.remove('error');
        } else {
            inp.classList.remove('error', 'tentative');
        }
    });
}

// Lock all editable cells (makes them read-only)
function lockBoard() {
    document.querySelectorAll('#sudoku-board input').forEach(inp => {
        if (!inp.readOnly) {
            inp.readOnly = true;
            inp.classList.remove('error', 'tentative');
        }
    });
}

function onCellInput(e) {
    if (gameState !== 'PLAYING' || gameEnded) return;

    const maxMistakes = DIFF_CONFIG[difficulty].maxMistakes;
    if (mistakes >= maxMistakes) {
        endGame(false);
        return;
    }

    let inp = e.target;
    let r = parseInt(inp.dataset.row);
    let c = parseInt(inp.dataset.col);
    let val = inp.value.replace(/[^1-9]/g, '');
    inp.value = val;

    // Record reaction time for every input attempt
    if (collector) {
        const reactionMs = lastReactionTime ? Date.now() - lastReactionTime : 0;
        collector.record('cell_input', reactionMs);
        lastReactionTime = Date.now();
    }

    if (!val) {
        inp.classList.remove('error', 'tentative');
        inp.dataset.wrong = '';
        revalidateBoard();
        return;
    }

    let num = parseInt(val);

    if (hasConflict(num, r, c)) {
        if (!inp.dataset.wrong) {
            inp.dataset.wrong = '1';
            mistakes++;
            document.getElementById('mistake-count').textContent = mistakes;
            if (collector) collector.record('mistake', null); // → 'error'
        }
        inp.classList.add('error');

        if (mistakes >= maxMistakes) endGame(false);
    } else {
        if (num === solution[r][c]) {
            inp.classList.remove('error', 'tentative');
            inp.dataset.wrong = '';
            inp.readOnly = true;
            if (collector) collector.record('correct', num); // → 'success'
            checkCompletedGroups();
            checkWin();
        } else {
            inp.classList.add('tentative');
            inp.classList.remove('error');
            inp.dataset.wrong = '';
            revalidateBoard();
            checkWin();
        }
    }
}

function onCellKeydown(e) {
    const dirs = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1]
    };
    if (!dirs[e.key]) return;
    e.preventDefault();
    let r = parseInt(e.target.dataset.row),
        c = parseInt(e.target.dataset.col),
        [dr, dc] = dirs[e.key];
    let nr = r + dr,
        nc = c + dc;
    if (nr >= 0 && nr < 9 && nc >= 0 && nc < 9) {
        let next = document.querySelector(`input[data-row="${nr}"][data-col="${nc}"]`);
        if (next && !next.readOnly) next.focus();
    }
}

function getCandidates(board, r, c) {
    if (board[r][c] !== 0) return [];
    let used = new Set();
    for (let i = 0; i < 9; i++) {
        used.add(board[r][i]);
        used.add(board[i][c]);
    }
    let br = Math.floor(r / 3) * 3,
        bc = Math.floor(c / 3) * 3;
    for (let i = br; i < br + 3; i++)
        for (let j = bc; j < bc + 3; j++) used.add(board[i][j]);
    let cands = [];
    for (let n = 1; n <= 9; n++)
        if (!used.has(n)) cands.push(n);
    return cands;
}

function findAIHint() {
    let board = getBoardState();
    // Naked Single
    for (let r = 0; r < 9; r++)
        for (let c = 0; c < 9; c++)
            if (board[r][c] === 0) {
                let cands = getCandidates(board, r, c);
                if (cands.length === 1) return {
                    r,
                    c,
                    value: cands[0],
                    technique: 'Naked Single',
                    message: `Only ${cands[0]} fits here.`
                };
            }
    // Hidden Single (row)
    for (let r = 0; r < 9; r++)
        for (let n = 1; n <= 9; n++) {
            let cols = [];
            for (let c = 0; c < 9; c++)
                if (board[r][c] === 0 && getCandidates(board, r, c).includes(n)) cols.push(c);
            if (cols.length === 1) return {
                r,
                c: cols[0],
                value: n,
                technique: 'Hidden Single (row)',
                message: `Digit ${n} must be in column ${cols[0]+1}.`
            };
        }
    // Hidden Single (col)
    for (let c = 0; c < 9; c++)
        for (let n = 1; n <= 9; n++) {
            let rows = [];
            for (let r = 0; r < 9; r++)
                if (board[r][c] === 0 && getCandidates(board, r, c).includes(n)) rows.push(r);
            if (rows.length === 1) return {
                r: rows[0],
                c,
                value: n,
                technique: 'Hidden Single (col)',
                message: `Digit ${n} belongs to row ${rows[0]+1}.`
            };
        }
    // Hidden Single (box)
    for (let br = 0; br < 3; br++)
        for (let bc = 0; bc < 3; bc++)
            for (let n = 1; n <= 9; n++) {
                let pos = [];
                for (let i = br * 3; i < br * 3 + 3; i++)
                    for (let j = bc * 3; j < bc * 3 + 3; j++)
                        if (board[i][j] === 0 && getCandidates(board, i, j).includes(n)) pos.push([i, j]);
                if (pos.length === 1) return {
                    r: pos[0][0],
                    c: pos[0][1],
                    value: n,
                    technique: 'Hidden Single (box)',
                    message: `Only cell (${pos[0][0]+1},${pos[0][1]+1}) can hold ${n}.`
                };
            }
    // Fallback
    let bestR = -1,
        bestC = -1,
        best = 10;
    for (let r = 0; r < 9; r++)
        for (let c = 0; c < 9; c++)
            if (board[r][c] === 0) {
                let l = getCandidates(board, r, c).length;
                if (l < best) {
                    best = l;
                    bestR = r;
                    bestC = c;
                }
            }
    if (bestR !== -1) return {
        r: bestR,
        c: bestC,
        value: solution[bestR][bestC],
        technique: 'Advanced Logic',
        message: `Best deduction: put ${solution[bestR][bestC]}.`
    };
    return null;
}

function useHint() {
    if (gameState !== 'PLAYING') return;
    // also check mistakes limit before giving hint
    if (mistakes >= DIFF_CONFIG[difficulty].maxMistakes) return;
    dismissHint();
    let hint = findAIHint();
    if (!hint) return;
    let inp = document.querySelector(`input[data-row="${hint.r}"][data-col="${hint.c}"]`);
    if (!inp || inp.readOnly) return;
    inp.classList.add('hint-highlight');
    inp.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    document.getElementById('hint-technique-label').innerHTML = hint.technique;
    document.getElementById('hint-text').innerHTML = hint.message;
    document.getElementById('hint-bubble').classList.add('show');
    gsap.fromTo('#hint-bubble', {
        opacity: 0,
        y: 10
    }, {
        duration: 0.4,
        opacity: 1,
        y: 0
    });
    setTimeout(() => {
        inp.classList.remove('hint-highlight');
        inp.value = hint.value;
        inp.readOnly = true;
        inp.classList.add('solved');
        inp.classList.remove('error');
        hintsUsed++;
        if (collector) collector.record('hint_used', 1); // → 'hint'
        collector?.record('hints', 1);
        revalidateBoard();
        checkCompletedGroups();
        checkWin();
    }, 800);
}

function dismissHint() {
    document.getElementById('hint-bubble').classList.remove('show');
    document.querySelectorAll('.hint-highlight').forEach(el => el.classList.remove('hint-highlight'));
}

function autoSolve() {
    if (gameState !== 'PLAYING') return;
    autoSolved = true;
    document.querySelectorAll('#sudoku-board input').forEach(inp => {
        if (!inp.readOnly) {
            let r = parseInt(inp.dataset.row),
                c = parseInt(inp.dataset.col);
            inp.value = solution[r][c];
            inp.readOnly = true;
            inp.classList.add('solved');
        }
    });
    stopTimer();
    gameState = 'DONE';
    gsap.to('#sudoku-wrap', {
        duration: 0.3,
        scale: 1.02,
        repeat: 2,
        yoyo: true
    });
    setTimeout(() => {
        document.getElementById('result-emoji').textContent = '🤖';
        document.getElementById('result-title').textContent = 'AUTO-SOLVED';
        document.getElementById('result-score-display').textContent = 'Score: 0';
        document.getElementById('result-overlay').classList.add('show');
    }, 400);
}

function getCell(r, c) {
    return document.querySelector(`#sudoku-board input[data-row="${r}"][data-col="${c}"]`)?.parentElement;
}

function flashGroup(cells) {
    cells.forEach(([r, c], idx) => {
        let cell = getCell(r, c);
        if (cell) {
            cell.classList.remove('group-complete');
            void cell.offsetWidth;
            cell.classList.add('group-complete');
            if (idx > 0) cell.classList.add(`flash-delay-${Math.min(idx,8)}`);
        }
    });
}

function checkCompletedGroups() {
    for (let r = 0; r < 9; r++)
        if (!completedGroups.rows.has(r)) {
            let correct = true;
            for (let c = 0; c < 9; c++) {
                let inp = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
                if (!inp || parseInt(inp.value) !== solution[r][c]) {
                    correct = false;
                    break;
                }
            }
            if (correct) {
                completedGroups.rows.add(r);
                flashGroup(Array.from({
                    length: 9
                }, (_, c) => [r, c]));
            }
        }
    for (let c = 0; c < 9; c++)
        if (!completedGroups.cols.has(c)) {
            let correct = true;
            for (let r = 0; r < 9; r++) {
                let inp = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
                if (!inp || parseInt(inp.value) !== solution[r][c]) {
                    correct = false;
                    break;
                }
            }
            if (correct) {
                completedGroups.cols.add(c);
                flashGroup(Array.from({
                    length: 9
                }, (_, r) => [r, c]));
            }
        }
    for (let br = 0; br < 3; br++)
        for (let bc = 0; bc < 3; bc++) {
            let key = br * 3 + bc;
            if (!completedGroups.boxes.has(key)) {
                let cells = [];
                for (let i = br * 3; i < br * 3 + 3; i++)
                    for (let j = bc * 3; j < bc * 3 + 3; j++) cells.push([i, j]);
                let correct = cells.every(([r, c]) => {
                    let inp = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
                    return inp && parseInt(inp.value) === solution[r][c];
                });
                if (correct) {
                    completedGroups.boxes.add(key);
                    flashGroup(cells);
                }
            }
        }
}

function resetCompletedGroups() {
    completedGroups.rows.clear();
    completedGroups.cols.clear();
    completedGroups.boxes.clear();
    document.querySelectorAll('.cell.group-complete').forEach(c => c.classList.remove('group-complete'));
}

function checkWin() {
    if (gameState !== 'PLAYING') return;
    let all = true;
    const inputs = document.querySelectorAll('#sudoku-board input');
    for (let inp of inputs) {
        let r = parseInt(inp.dataset.row),
            c = parseInt(inp.dataset.col);
        if (parseInt(inp.value) !== solution[r][c]) {
            all = false;
            break;
        }
    }
    if (all) endGame(true);
}

function calcScore() {
    let cfg = DIFF_CONFIG[difficulty];

    const base = 4000;                                      // generous base
    const timePenalty   = Math.floor(elapsed / 20);         // -1 point every 20 seconds
    const hintPenalty   = hintsUsed * 8;                    // only -8 per hint
    const mistakePenalty = mistakes * 25;                   // -25 per mistake

    const totalPenalty = timePenalty + hintPenalty + mistakePenalty;

    let score = Math.max(0, Math.round((base - totalPenalty) * (cfg.mult / 10)));

    console.log('%c[CalcScore] difficulty=' + difficulty +
                ' | elapsed=' + elapsed + 's' +
                ' | hints=' + hintsUsed +
                ' | mistakes=' + mistakes +
                ' → FINAL SCORE = ' + score,
                'color:#00FFAA; font-weight:bold');

    return score;
}
async function endGame(won) {
    if (gameEnded) return;
    gameEnded = true;
    if (gameState !== 'PLAYING') return;

    gameState = 'DONE';
    stopTimer();

    if (collector) await collector.flush();

    // ── ROBUST WIN CHECK ──
    let isActuallyWon = true;
    const inputs = document.querySelectorAll('#sudoku-board input');
    for (let inp of inputs) {
        let r = parseInt(inp.dataset.row);
        let c = parseInt(inp.dataset.col);
        if (parseInt(inp.value || '0') !== solution[r][c]) {
            isActuallyWon = false;
            break;
        }
    }

    let finalWon = won && isActuallyWon;
    let score = finalWon ? calcScore() : 0;

    document.getElementById('hud-score-top').textContent = score;

    if (finalWon) {
        document.getElementById('result-emoji').textContent = '🏆';
        document.getElementById('result-title').textContent = 'SOLVED!';
    } else {
        document.getElementById('result-emoji').textContent = '💀';
        document.getElementById('result-title').textContent = 'YOU LOSE';
    }

    document.getElementById('result-score-display').textContent = `SCORE: ${score}`;
    document.getElementById('result-overlay').classList.add('show');

    lockBoard();

    await submitScore(score, Math.max(3, elapsed));
}
async function submitScore(points, completionTime) {
    console.log('%c[Score] Submitting →', 'color:#FFD700', {
        points,
        completionTime
    });

    try {
        const res = await fetch('../../../../games/sudoku_pro/sudoku_pro_backend.php?action=score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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
            console.warn('%c[Score] Save failed: ' + data.message, 'color:#FF4444');
        }
    } catch (err) {
        console.error('%c[Score] Network error:', err);
    }
}

function resetToMenu() {
    document.getElementById('result-overlay').classList.remove('show');
    document.getElementById('screen-game').style.display = 'none';
    document.getElementById('screen-difficulty').style.display = 'flex';
    gameState = 'INIT';
    gameEnded = false;
    stopTimer();
    elapsed = 0;
    document.getElementById('hud-timer').textContent = '00:00';
    document.getElementById('hud-score-top').textContent = '0';
    gsap.fromTo('#screen-difficulty', {
        opacity: 0,
        scale: 0.95
    }, {
        duration: 0.5,
        opacity: 1,
        scale: 1
    });
}

function goMenu() {
    window.location.href = '../../game-menu/menu.php';
}

function startTimer() {
    stopTimer();
    elapsed = 0;
    timerInterval = setInterval(() => {
        elapsed++;
        document.getElementById('hud-timer').textContent = formatTime(elapsed);
    }, 1000);
}

function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
}

function formatTime(s) {
    return `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
}

function puzzleStringToBoard(str) {
    let b = [];
    for (let i = 0; i < 9; i++) {
        b.push([]);
        for (let j = 0; j < 9; j++) b[i].push(parseInt(str[i * 9 + j]));
    }
    return b;
}

function solveSudoku(board) {
    let findEmpty = () => {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                if (board[i][j] === 0) return [i, j];
        return null;
    };
    let isValid = (num, r, c) => {
        for (let i = 0; i < 9; i++) {
            if (board[r][i] === num && i !== c) return false;
            if (board[i][c] === num && i !== r) return false;
        }
        let br = Math.floor(r / 3) * 3,
            bc = Math.floor(c / 3) * 3;
        for (let i = br; i < br + 3; i++)
            for (let j = bc; j < bc + 3; j++)
                if (board[i][j] === num && !(i === r && j === c)) return false;
        return true;
    };
    let solver = () => {
        let pos = findEmpty();
        if (!pos) return true;
        let [r, c] = pos;
        for (let n = 1; n <= 9; n++) {
            if (isValid(n, r, c)) {
                board[r][c] = n;
                if (solver()) return true;
                board[r][c] = 0;
            }
        }
        return false;
    };
    return solver();
}

function newPuzzle() {
    if (gameState !== 'PLAYING' && gameState !== 'DONE') return;
    stopTimer();
    loadPuzzle();
    gameState = 'PLAYING';
    gameEnded = false;
    document.getElementById('hud-score-top').textContent = '0';
    gsap.fromTo('#sudoku-board', {
        scale: 0.98
    }, {
        duration: 0.3,
        scale: 1
    });
}

// Matrix rain canvas
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
let fontSize = 16,
    columns, drops = [];

function resizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 3, 8, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f8';
    ctx.font = `${fontSize}px 'Monaco', monospace`;
    for (let i = 0; i < drops.length; i++) {
        let text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
window.addEventListener('resize', () => {
    resizeMatrix();
});
resizeMatrix();
setInterval(drawMatrix, 55);
// floating sparkles
for (let i = 0; i < 28; i++) {
    let span = document.createElement('div');
    span.classList.add('floating-sparkle');
    let size = Math.random() * 6 + 3;
    span.style.width = size + 'px';
    span.style.height = size + 'px';
    span.style.left = Math.random() * 100 + '%';
    span.style.top = Math.random() * 100 + '%';
    span.style.animationDelay = Math.random() * 10 + 's';
    span.style.animationDuration = Math.random() * 15 + 10 + 's';
    document.body.appendChild(span);
}
gsap.fromTo('.diff-card', {
    y: 40,
    opacity: 0
}, {
    duration: 0.8,
    stagger: 0.1,
    y: 0,
    opacity: 1,
    ease: "backOut"
});