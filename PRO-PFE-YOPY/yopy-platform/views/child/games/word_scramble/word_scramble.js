
// ── PHP values ──
const GAME_ID    = 'word_scramble';
const SESSION_ID = '<?= $sessionId ?>';
const BUDDY_ID   = '<?= $buddyId ?>';

// ── GSAP plugins ──
gsap.registerPlugin(TextPlugin);

// ── Config ──
const DIFF_CONFIG = {
    easy:   { timeLimit: 60, mult: 10, label: 'Acolyte'    },
    medium: { timeLimit: 75, mult: 15, label: 'Scribe'     },
    hard:   { timeLimit: 90, mult: 20, label: 'High Priest'},
};

// ── Word banks ──
const WORDS = {
    easy: ["cat","dog","sun","hat","map","cup","bag","pen","red","hot","big","fun","run","hop","fly","cry","eat","sit","tap","leg","arm","eye","ear","lip","toe","rib","fox","owl","ant","bee","mud","wet","dry","raw","sad","mad","old","new","few","low","ice","air","sea","sky","day","nap","dip","zip","rub","jog"],
    medium: ["cake","bird","fish","frog","lamp","book","door","tree","leaf","star","moon","wind","rain","snow","fire","rock","sand","wave","boat","ship","jump","swim","walk","sing","play","draw","read","grow","skip","spin","blue","pink","gold","dark","tall","warm","cool","soft","hard","fast","glad","kind","calm","neat","tidy","busy","lazy","wise","lion","bear","wolf","duck","swan","worm","crab","toad","deer","goat","drum","bell","horn","harp","tune","song","note","beat","poem","tale","milk","corn","bean","rice","plum","pear","lime","mint","salt","herb"],
    hard:  ["smile","laugh","dance","climb","dream","build","think","write","speak","share","brave","quick","happy","sunny","rainy","windy","snowy","foggy","tiger","zebra","horse","shark","eagle","robin","finch","crane","snail","gecko","apple","grape","lemon","mango","melon","peach","guava","olive","onion","brush","chair","table","bench","shelf","clock","phone","light","plant","stone","ocean","river","beach","cliff","plain","field","grove","swamp","marsh","trail","green","brown","white","black","cream","coral","amber","lilac","kneel","twist","swing","float","drift","glide","march","stomp","proud","sweet","crisp","vivid","shiny","fuzzy","bumpy","steep","quiet","grand"]
};

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];

// ── Wrath messages ──
const WRATH_MSGS = [
    // wrong attempt 1
    [ "The gods stir in their slumber…", "A chill wind moves through the tomb…", "The torches flicker — something watches.", ],
    // wrong attempt 2
    [ "⚠ Anubis sharpens his scales!", "The serpents awaken in the walls!", "Ra's eye narrows with displeasure…", "⚠ The ancient traps begin to creak…" ],
    // wrong attempt 3+
    [ "☠ THE GODS GROW WRATHFUL!", "☠ Apophis stirs in the abyss!", "☠ THE TOMB IS COLLAPSING!", "SETH RISES — FLEE OR PERISH!", "☠ YOU HAVE ANGERED THE PHARAOH!", ]
];

const CORRECT_MSGS = [
    "𓂀 The seals open before you! +{pts} gold!",
    "Ra smiles upon your wisdom! +{pts} gold!",
    "𓃭 The sacred stones align! +{pts} gold!",
    "The tomb yields its treasure! +{pts} gold!",
    "𓅓 Thoth records your victory! +{pts} gold!",
];

const HINT_MSG = "𓆣 The Oracle whispers the answer — no gold this time…";

// ── State ──
const STATE = { INIT:'INITIALISÉ', PLAYING:'EN_COURS', DONE:'TERMINÉ', SAVED:'RÉSULTAT_STOCKÉ' };
let gameState    = STATE.INIT;
let difficulty   = 'easy';
let usedIndices  = new Set();
let currentWord  = '';
let scrambledWord= '';
let answerLetters= [];
let tileMapping  = [];
let wordsSolved  = 0;
let wordsSkipped = 0;
let hintsUsed    = 0;
let score        = 0;
let timeLeft     = 60;
let timerInterval= null;
let serverSessionId = SESSION_ID;
let collector    = null;
let hintRevealed = false;
let wrongStreak  = 0;

const GLYPHS = ['𓀿','𓁀','𓁁','𓁂','𓃭','𓅓','𓆣','𓀭','𓁺','𓋴'];

// ── Difficulty selection ──
function selectDiff(el, diff) {
    document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    difficulty = diff;
}

// ── Start ──
async function startGame() {
    if (gameState !== STATE.INIT) return;

    // Cinematic fog-in
    gsap.to('#screen-fog', { opacity: 1, duration: .4, ease: 'power2.in', onComplete: async () => {

        try {
            const res = await fetch(`../../../games/word_scramble/word_scramble_backend.php?action=start`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ difficulty })
            });
            const data = await res.json();
            if (data.status === 'success') serverSessionId = data.data.session_id;
        } catch(e) {}

        gameState = STATE.PLAYING;
        collector = (typeof BehaviorCollector !== 'undefined')
            ? new BehaviorCollector(GAME_ID) : { record:()=>{}, flush: async()=>{} };

        document.getElementById('screen-difficulty').style.display = 'none';
        const gs = document.getElementById('screen-game');
        gs.style.display = 'flex';
        document.getElementById('diff-label-badge').textContent = DIFF_CONFIG[difficulty].label;

        const cfg = DIFF_CONFIG[difficulty];
        timeLeft = cfg.timeLimit;
        usedIndices.clear();
        wordsSolved = wordsSkipped = hintsUsed = score = wrongStreak = 0;
        updateHUD();
        startTimer();
        nextWord();

        gsap.to('#screen-fog', { opacity: 0, duration: .8, delay: .1, ease: 'power2.out' });
    }});
}

// ── Timer ──
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('hud-timer').textContent = timeLeft;
        const pill = document.getElementById('timer-pill');
        if (timeLeft <= 10) {
            pill.classList.add('danger');
            gsap.to('#wrath-vignette', { opacity: .4 + (10 - timeLeft) * .05, duration: .3 });
        }
        if (timeLeft <= 0) endGame();
    }, 1000);
}

// ── Next word ──
function nextWord() {
    hintRevealed = false;
    wrongStreak  = 0;
    document.getElementById('hint-reveal').textContent = '';
    document.getElementById('oracle-msg').textContent  = '';
    document.getElementById('oracle-msg').className    = '';
    updateSkullMeter(0);
    gsap.to('#wrath-vignette', { opacity: 0, duration: .5 });

    const pool      = WORDS[difficulty];
    const available = pool.filter((_,i) => !usedIndices.has(i));
    if (available.length === 0) { endGame(); return; }

    const idx = pool.indexOf(available[Math.floor(Math.random() * available.length)]);
    usedIndices.add(idx);
    currentWord   = pool[idx].toUpperCase();
    scrambledWord = scramble(currentWord);
    answerLetters = Array(currentWord.length).fill(null);
    tileMapping   = Array(currentWord.length).fill(-1);

    document.getElementById('word-num').textContent = ROMAN[wordsSolved + wordsSkipped] || (wordsSolved + wordsSkipped + 1);
    buildTiles();
    buildAnswerBoxes();
}

function scramble(word) {
    const arr = word.split('');
    let result, attempts = 0;
    do { result = shuffle([...arr]).join(''); attempts++; }
    while (result === word && attempts < 50);
    return result;
}

// ── Build tiles ──
function buildTiles() {
    const area = document.getElementById('scramble-area');
    area.innerHTML = '';
    scrambledWord.split('').forEach((letter, idx) => {
        const tile = document.createElement('div');
        tile.className = 'scramble-tile';
        tile.textContent = letter;
        tile.dataset.idx = idx;
        tile.dataset.glyph = GLYPHS[idx % GLYPHS.length];
        tile.addEventListener('click', () => pickTile(tile, idx));
        area.appendChild(tile);
    });
}

function buildAnswerBoxes() {
    const area = document.getElementById('answer-area');
    area.innerHTML = '';
    for (let i = 0; i < currentWord.length; i++) {
        const box = document.createElement('div');
        box.className = 'answer-box';
        box.style.opacity = '1';
        box.style.visibility = 'visible';
        box.dataset.pos = i;
        box.addEventListener('click', () => removeFromAnswer(i));
        area.appendChild(box);
    }
    updateAnswerUI();
}

function updateAnswerUI() {
    const area = document.getElementById('answer-area');
    if (area) {
        area.style.opacity = '1';
        area.style.visibility = 'visible';
    }
    document.querySelectorAll('.answer-box').forEach(box => {
        const hasLetter = box.textContent && box.textContent.trim().length > 0;
        box.classList.toggle('filled', hasLetter);
        box.style.opacity = '1';
        box.style.visibility = 'visible';
        box.style.filter = 'none';
    });
}

// ── Tile interaction ──
function pickTile(tile, tileIdx) {
    if (tile.classList.contains('used') || gameState !== STATE.PLAYING) return;
    const pos = answerLetters.indexOf(null);
    if (pos === -1) return;

    tile.classList.add('used');
    answerLetters[pos] = scrambledWord[tileIdx];
    tileMapping[pos]   = tileIdx;

    const box = document.querySelector(`.answer-box[data-pos="${pos}"]`);
    box.textContent = scrambledWord[tileIdx];
    updateAnswerUI();

    if (!answerLetters.includes(null)) setTimeout(checkAnswer, 150);
}

function removeFromAnswer(pos) {
    if (answerLetters[pos] === null || gameState !== STATE.PLAYING) return;
    const tileIdx = tileMapping[pos];
    const tile = document.querySelector(`.scramble-tile[data-idx="${tileIdx}"]`);
    if (tile) {
        tile.classList.remove('used');
        gsap.from(tile, { scale: .8, duration: .2, ease: 'back.out(2)' });
    }
    answerLetters[pos] = null;
    tileMapping[pos]   = -1;
    const box = document.querySelector(`.answer-box[data-pos="${pos}"]`);
    box.textContent = '';
    updateAnswerUI();
    box.classList.remove('correct', 'wrong');
}

// ── Check answer ──
function checkAnswer() {
    const attempt = answerLetters.join('');
    const boxes   = document.querySelectorAll('.answer-box');

    if (attempt === currentWord) {
        const cfg   = DIFF_CONFIG[difficulty];
        const bonus = hintRevealed ? 0 : cfg.mult;
        score      += bonus;
        wordsSolved++;
        updateHUD();
        if (collector) collector.record('matches', 1);

        boxes.forEach(b => b.classList.add('correct'));

        const msg = hintRevealed ? 'The Oracle guided you — the tomb is open.' :
            pick(CORRECT_MSGS).replace('{pts}', bonus);
        setOracle(msg, hintRevealed ? 'warning' : 'good');

        // Golden particle burst
        burstGold();

        setTimeout(() => nextWord(), 1100);
    } else {
        wrongStreak++;
        boxes.forEach(b => b.classList.add('wrong'));
        if (collector) collector.record('errors', 1);

        // Wrath escalation
        const lvl = Math.min(wrongStreak - 1, 2);
        const wrathMsg = pick(WRATH_MSGS[lvl]);
        const cls = lvl === 0 ? 'warning' : lvl === 1 ? 'wrath' : 'doom';
        setOracle(wrathMsg, cls);
        updateSkullMeter(Math.min(wrongStreak, 3));

        // Shake + red flash
        const intensity = Math.min(wrongStreak * 4, 16);
        gsap.to(document.body, { x: intensity, duration: .05, yoyo: true, repeat: 7, ease: 'none', onComplete: () => gsap.set(document.body, {x:0}) });
        gsap.to('#wrath-vignette', { opacity: Math.min(.15 + wrongStreak * .12, .7), duration: .3 });

        setTimeout(() => {
            boxes.forEach(b => b.classList.remove('wrong'));
            answerLetters = Array(currentWord.length).fill(null);
            tileMapping   = Array(currentWord.length).fill(-1);
            boxes.forEach(b => { b.textContent = ''; });
            updateAnswerUI();
            document.querySelectorAll('.scramble-tile').forEach(t => t.classList.remove('used'));
        }, 700);
    }
}

// ── Wrath skull meter ──
function updateSkullMeter(active) {
    for (let i = 0; i < 3; i++) {
        const el = document.getElementById('skull' + i);
        el.classList.toggle('active', i < active);
    }
}

// ── Oracle text ──
function setOracle(msg, cls) {
    const el = document.getElementById('oracle-msg');
    el.className = cls;
    gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out' });
    el.textContent = msg;
}

// ── Hint ──
function useHint() {
    if (gameState !== STATE.PLAYING) return;
    hintRevealed = true; hintsUsed++;
    if (collector) collector.record('hints', 1);
    document.getElementById('hint-reveal').textContent = currentWord.split('').join(' ');
    gsap.from('#hint-reveal', { opacity: 0, letterSpacing: '20px', duration: .6, ease: 'power2.out' });
    setOracle(HINT_MSG, 'warning');
}

// ── Skip ──
function skipWord() {
    if (gameState !== STATE.PLAYING) return;
    wordsSkipped++;
    if (collector) collector.record('errors', 1);
    setOracle(`The chamber collapses — the word was: ${currentWord}`, 'wrath');
    setTimeout(() => nextWord(), 1300);
}

// ── HUD ──
function updateHUD() { document.getElementById('hud-score').textContent = score; }

// ── Gold burst particles ──
function burstGold() {
    const c = document.getElementById('particles');
    const x = c.getContext('2d');
    const cx = c.width / 2, cy = c.height / 2;
    for (let i = 0; i < 24; i++) {
        const angle = (Math.PI * 2 / 24) * i;
        const speed = 3 + Math.random() * 5;
        let px = cx, py = cy;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        let life = 1;
        (function draw() {
            if (life <= 0) return;
            x.save();
            x.globalAlpha = life;
            x.fillStyle = Math.random() > .5 ? '#D4A017' : '#F5C842';
            x.beginPath();
            x.arc(px, py, 3, 0, Math.PI * 2);
            x.fill();
            x.restore();
            px += vx; py += vy; life -= .04;
            requestAnimationFrame(draw);
        })();
    }
}

// ── End game ──
async function endGame() {
    if (gameState !== STATE.PLAYING) return;
    gameState = STATE.DONE;
    clearInterval(timerInterval);
    if (collector) await collector.flush();

    let emoji, title, scroll;
    if      (wordsSolved >= 10) { emoji='𓁺'; title='Pharaoh of Words!'; scroll='Your name shall be carved upon the walls of eternity. Ra himself bows his head.'; }
    else if (wordsSolved >= 6)  { emoji='𓂀'; title='The Scribe Triumphs!'; scroll='The priests record your deeds. The tomb yields its finest treasure to you.'; }
    else if (wordsSolved >= 3)  { emoji='𓃭'; title='An Honourable Quest'; scroll='You walk out of the tomb with a few jewels and your life. Not a bad trade.'; }
    else                        { emoji='💀'; title='The Sands Swallow You'; scroll='The gods are displeased. But even Osiris allows for a second chance...'; }

    gsap.to('#screen-fog', { opacity: 1, duration: .5, onComplete: () => {
        document.getElementById('result-emoji').textContent         = emoji;
        document.getElementById('result-title').textContent         = title;
        document.getElementById('result-score-display').textContent = `Treasure: ${score} Gold`;
        document.getElementById('result-scroll').textContent        = scroll;
        document.getElementById('result-detail').textContent        =
            `${wordsSolved} seals broken · ${wordsSkipped} chambers fled · ${hintsUsed} oracle${hintsUsed!==1?'s':''} invoked · ${DIFF_CONFIG[difficulty].label} trial`;
        document.getElementById('result-overlay').classList.add('show');
        gsap.to('#screen-fog', { opacity: 0, duration: .6, delay: .1 });

        // Animate result elements
        const els = ['.result-cartouche','.result-title','.result-score','.result-detail','.result-scroll','.result-btns'];
        gsap.from(els, { y: 30, opacity: 0, stagger: .12, duration: .6, ease: 'power2.out', delay: .3 });
    }});

    await submitScore(score, DIFF_CONFIG[difficulty].timeLimit);
    gameState = STATE.SAVED;
}

async function submitScore(points, completionTime) {
    const badge = document.getElementById('submitting-badge');
    badge.classList.add('show');
    try {
        await fetch(`../../../games/word_scramble/word_scramble_backend.php?action=score`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: serverSessionId, points, completion_time: completionTime, difficulty })
        });
    } catch(e) {} finally { badge.classList.remove('show'); }
}

function resetToMenu() {
    document.getElementById('result-overlay').classList.remove('show');
    document.getElementById('screen-game').style.display = 'none';
    document.getElementById('screen-difficulty').style.display = 'flex';
    gameState = STATE.INIT;
    document.getElementById('timer-pill').classList.remove('danger');
    gsap.to('#wrath-vignette', { opacity: 0, duration: .4 });
    gsap.from('#screen-difficulty', { opacity: 0, y: 20, duration: .6, ease: 'power2.out' });
}
function goMenu() { window.location.href = '../../game-menu/menu.php'; }

// ── Shuffle ──
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ── Keyboard ──
document.addEventListener('keydown', e => {
    if (gameState !== STATE.PLAYING) return;
    if (e.key === 'Backspace') {
        for (let i = currentWord.length - 1; i >= 0; i--) {
            if (answerLetters[i] !== null) { removeFromAnswer(i); break; }
        }
    }
});

// ── Particle canvas (sand dust) ──
(function initParticles() {
    const c = document.getElementById('particles');
    const x = c.getContext('2d');
    const COLORS = ['#D4A017','#F5C842','#C4A96A','#9A7010','#E8D5A3'];
    let pts = [];
    function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 55; i++) pts.push({
        px: Math.random()*innerWidth, py: Math.random()*innerHeight,
        r: Math.random()*2.5+.5, vx:(Math.random()-.5)*.35, vy:-(Math.random()*.4+.1),
        col: COLORS[Math.floor(Math.random()*COLORS.length)],
        life: Math.random(),
    });
    function draw() {
        x.clearRect(0,0,c.width,c.height);
        pts.forEach(p => {
            x.globalAlpha = p.life * .45;
            x.beginPath(); x.arc(p.px,p.py,p.r,0,Math.PI*2);
            x.fillStyle=p.col; x.fill();
            p.px+=p.vx; p.py+=p.vy; p.life-=.003;
            if (p.life<=0) { p.life=1; p.px=Math.random()*c.width; p.py=c.height+10; }
            if(p.px<0||p.px>c.width)  p.vx*=-1;
        });
        x.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
})();

// ── Entrance animation ──
gsap.from('.tomb-title', { y: -30, opacity: 0, duration: .9, ease: 'power3.out' });
gsap.from('.difficulty-cards .diff-card', { y: 40, stagger: .12, duration: .7, ease: 'back.out(1.5)', delay: .3 });
gsap.from('.btn-start', { scale: .8, duration: .6, delay: .7, ease: 'back.out(2)' });

// ── Initial screen state safeguard ──
document.getElementById('screen-difficulty').style.display = 'flex';
document.getElementById('screen-game').style.display = 'none';