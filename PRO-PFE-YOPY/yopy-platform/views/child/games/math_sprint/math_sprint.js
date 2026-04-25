
const GAME_ID     = 'image_puzzle';
const SESSION_ID  = '<?= $sessionId ?>';
const BUDDY_ID     = '<?= $buddyId ?>';

 
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
    // ---- GLOBAL STATE ----
    let gameState = 'INIT'; // INIT, PLAYING, DONE
    let difficulty = 'easy';
    let equations = [];          // {display, correct}
    let playerGuesses = [];
    let currentIdx = 0;
    let timerInterval = null;
    let timePlayed = 0;
    let penaltyTime = 0;
    let serverSessionId = SESSION_ID;
    let collector = null;

    const DIFF_CONFIG = {
        easy:   { questions: 10, maxFactor: 5,  mult: 1 },
        medium: { questions: 25, maxFactor: 9,  mult: 2 },
        hard:   { questions: 50, maxFactor: 12, mult: 3 }
    };

    // BEST SCORES (sessionStorage)
    const BEST_KEYS = { easy:'ms_best_easy', medium:'ms_best_medium', hard:'ms_best_hard' };
    function loadBestTimes() {
        ['easy','medium','hard'].forEach(d => {
            let val = sessionStorage.getItem(BEST_KEYS[d]);
            document.getElementById(`best-${d}`).innerText = val ? val : '—';
        });
    }
    function updateBestTime(diff, finalTimeSec) {
        let key = BEST_KEYS[diff];
        let currentBest = parseFloat(sessionStorage.getItem(key));
        if (!currentBest || finalTimeSec < currentBest) {
            sessionStorage.setItem(key, finalTimeSec.toFixed(1));
            document.getElementById(`best-${diff}`).innerText = finalTimeSec.toFixed(1);
            gsap.to(`#best-${diff}`, {scale:1.3, duration:0.2, yoyo:true, repeat:1});
        }
    }

    // ---- EQUATION GENERATOR (ORIGINAL LOGIC) ----
    function getRandomInt(max) { return Math.floor(Math.random() * max) + 1; }
    function generateEquations() {
        const cfg = DIFF_CONFIG[difficulty];
        const q = cfg.questions;
        const maxF = cfg.maxFactor;
        const correctCount = getRandomInt(q - 1);
        const wrongCount = q - correctCount;
        let arr = [];
        for (let i = 0; i < correctCount; i++) {
            const a = getRandomInt(maxF), b = getRandomInt(maxF);
            arr.push({ display: `${a} × ${b} = ${a * b}`, correct: true });
        }
        for (let i = 0; i < wrongCount; i++) {
            const a = getRandomInt(maxF), b = getRandomInt(maxF);
            const real = a * b;
            const wrongs = [
                `${a} × ${b + 1} = ${real}`,
                `${a} × ${b} = ${real - 1}`,
                `${a + 1} × ${b} = ${real}`,
            ];
            arr.push({ display: wrongs[getRandomInt(3) - 1], correct: false });
        }
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Render equation list
    function renderEquations() {
        const container = document.getElementById('eq-list-container');
        container.innerHTML = '';
        equations.forEach((eq, idx) => {
            const div = document.createElement('div');
            div.className = 'eq-item';
            div.id = `eq-${idx}`;
            div.innerText = eq.display;
            container.appendChild(div);
        });
    }

    function updateActiveHighlight() {
        document.querySelectorAll('.eq-item').forEach(el => el.classList.remove('active'));
        const active = document.getElementById(`eq-${currentIdx}`);
        if (active) {
            active.classList.add('active');
            // smooth scroll into center
            active.scrollIntoView({ behavior: 'smooth', block: 'center' });
            gsap.to('.focus-ring', { scale: 1.02, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.out" });
        }
    }

    function updateProgressUI() {
        const total = equations.length;
        document.getElementById('hud-progress').innerText = `${currentIdx}/${total}`;
        const percent = (currentIdx / total) * 100;
        gsap.to('#progress-fill', { width: `${percent}%`, duration: 0.2 });
    }

    // ZAWA EFFECT (Kaiji tension)
    function triggerZawa(intensity = 1) {
        const container = document.getElementById('zawa-layer');
        for (let i = 0; i < intensity; i++) {
            const zawa = document.createElement('div');
            zawa.className = 'zawa-burst';
            zawa.innerText = Math.random() > 0.6 ? 'ZAWA' : 'ZAWA ZAWA...';
            zawa.style.left = `${15 + Math.random() * 70}vw`;
            zawa.style.top = `${30 + Math.random() * 50}vh`;
            zawa.style.fontSize = `${38 + Math.random() * 40}px`;
            container.appendChild(zawa);
            gsap.fromTo(zawa, { opacity: 0, scale: 0.2, rotation: -30 }, {
                opacity: 1, scale: 1.6, rotation: 20, duration: 0.5, ease: "back.out(1.2)",
                onComplete: () => {
                    gsap.to(zawa, { opacity: 0, y: -120, duration: 0.8, onComplete: () => zawa.remove() });
                }
            });
        }
        // screen shake
        if (intensity > 2) {
            gsap.to('.game-container', { x: 8, duration: 0.05, repeat: 8, yoyo: true, ease: "power1.inOut" });
        }
    }

    // JUDGE CORE
    function judge(guessedCorrect) {
        if (gameState !== 'PLAYING' || currentIdx >= equations.length) return;
        const eq = equations[currentIdx];
        const isHit = (guessedCorrect === eq.correct);
        
        // Visual flash
        const currentEqDiv = document.getElementById(`eq-${currentIdx}`);
        if (isHit) {
            gsap.to(currentEqDiv, { color: "#8CC043", duration: 0.12, yoyo: true, repeat: 1 });
        } else {
            gsap.to(currentEqDiv, { color: "#FF4D4D", duration: 0.1, yoyo: true, repeat: 2 });
            penaltyTime += 0.5;
            triggerZawa(3);
            // Kaiji tension: red flash background
            gsap.to('body', { backgroundColor: '#3a0a0a', duration: 0.1, yoyo: true, repeat: 2, onComplete: () => document.body.style.backgroundColor = '' });
        }
        playerGuesses.push(guessedCorrect);
        if (collector) collector.record(isHit ? 'matches' : 'errors', 1);
        
        currentIdx++;
        updateProgressUI();
        
        if (currentIdx >= equations.length) {
            endGame();
        } else {
            updateActiveHighlight();
        }
    }

    // Timer
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (gameState === 'PLAYING') {
                timePlayed += 0.1;
                document.getElementById('hud-timer').innerText = timePlayed.toFixed(2);
            }
        }, 100);
    }

    // End of match
    async function endGame() {
        if (gameState !== 'PLAYING') return;
        gameState = 'DONE';
        clearInterval(timerInterval);
        if (collector) await collector.flush();
        
        // compute penalties already applied
        const finalTime = timePlayed + penaltyTime;
        updateBestTime(difficulty, finalTime);
        const cfg = DIFF_CONFIG[difficulty];
        let rawScore = Math.max(0, (1000 - finalTime * 10) * cfg.mult);
        const finalScore = Math.round(rawScore);
        
        // Show result overlay
        let medalEmoji = finalTime < 20 ? '🏆' : (finalTime < 40 ? '🥈' : '🥉');
        let titleText = finalTime < 20 ? 'GOLD MEDALIST' : (finalTime < 40 ? 'SILVER TACTICIAN' : 'BRONZE CHALLENGER');
        document.getElementById('result-emoji').innerText = medalEmoji;
        document.getElementById('result-title').innerText = titleText;
        document.getElementById('result-time').innerText = finalTime.toFixed(2) + 's';
        document.getElementById('res-penalty').innerText = penaltyTime.toFixed(1);
        document.getElementById('result-overlay').style.display = 'flex';
        gsap.from('#result-overlay', { opacity: 0, scale: 0.9, duration: 0.6, ease: "back.out" });
        
        // submit score
        const elapsedSec = Math.max(3, Math.round(timePlayed));
        await submitScore(finalScore, elapsedSec);
        gameState = 'SAVED';
    }
    
    async function submitScore(points, completionTime) {
        const badge = document.getElementById('submitting-badge');
        badge.style.display = 'block';
        try {
            await fetch(`../../../games/math_sprint/math_sprint_backend.php?action=score`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: serverSessionId, points, completion_time: completionTime, difficulty })
            });
        } catch(e) { console.warn(e); }
        finally { badge.style.display = 'none'; }
    }

    // ---- COUNTDOWN SEQUENCE ----
    async function startCountdown() {
        try {
            const res = await fetch(`../../../games/math_sprint/math_sprint_backend.php?action=start`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ difficulty })
            });
            const data = await res.json();
            if (data.status === 'success') serverSessionId = data.data.session_id;
        } catch(e) {}
        collector = (typeof BehaviorCollector !== 'undefined') ? new BehaviorCollector(GAME_ID) : { record: () => {}, flush: async () => {} };
        
        equations = generateEquations();
        playerGuesses = [];
        currentIdx = 0;
        timePlayed = 0;
        penaltyTime = 0;
        renderEquations();
        
        // hide difficulty, show countdown
        document.getElementById('screen-difficulty').style.display = 'none';
        const cdDiv = document.getElementById('screen-countdown');
        cdDiv.style.display = 'flex';
        
        let count = 3;
        const cdNum = document.getElementById('countdown-number');
        cdNum.innerText = count;
        await new Promise(resolve => {
            const interval = setInterval(() => {
                count--;
                if (count === 0) {
                    cdNum.innerText = 'GO!';
                    gsap.to(cdNum, { scale: 1.4, duration: 0.2, yoyo: true, repeat: 1 });
                } else if (count < 0) {
                    clearInterval(interval);
                    resolve();
                } else {
                    cdNum.innerText = count;
                    gsap.fromTo(cdNum, { scale: 0.6 }, { scale: 1, duration: 0.3, ease: "back.out" });
                }
            }, 1000);
        });
        
        // launch game
        document.getElementById('screen-countdown').style.display = 'none';
        const gameScreen = document.getElementById('screen-game');
        gameScreen.style.display = 'flex';
        gameState = 'PLAYING';
        updateProgressUI();
        requestAnimationFrame(() => {
            updateActiveHighlight();
            gsap.from('.focus-ring', { opacity: 0, scaleX: 0.8, duration: 0.5, ease: "elastic.out(1,0.5)" });
        });
        startTimer();
    }

    // Difficulty selection & init
    function selectDifficulty(selectedDiff) {
        difficulty = selectedDiff;
        document.querySelectorAll('.diff-card').forEach(card => card.classList.remove('selected'));
        document.querySelector(`.diff-card[data-diff="${selectedDiff}"]`).classList.add('selected');
    }
    document.querySelectorAll('.diff-card').forEach(card => {
        card.addEventListener('click', () => selectDifficulty(card.getAttribute('data-diff')));
    });
    document.getElementById('start-game-btn').addEventListener('click', startCountdown);
    // Add these lines to connect your UI buttons to the game logic
    document.getElementById('btn-wrong').addEventListener('click', () => judge(false));
    document.getElementById('btn-right').addEventListener('click', () => judge(true));

    function resetToMenu() {
        document.getElementById('result-overlay').style.display = 'none';
        document.getElementById('screen-game').style.display = 'none';
        document.getElementById('screen-difficulty').style.display = 'flex';
        gameState = 'INIT';
        if (timerInterval) clearInterval(timerInterval);
        loadBestTimes();
    }
    function goMenu() { window.location.href = '../../game-menu/menu.php'; }

    // keyboard support
    document.addEventListener('keydown', (e) => {
        if (gameState !== 'PLAYING') return;
        if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); judge(true); }
        if (e.key === 'ArrowLeft' || e.key === ' ') { e.preventDefault(); judge(false); }
    });

    // floating math symbols (3B1B style) during gameplay
    setInterval(() => {
        if (gameState === 'PLAYING') {
            const symbol = document.createElement('div');
            symbol.innerText = ['∫', '∑', 'π', '∞', '∇', 'Δ', '∂', 'ℝ', 'ℂ'][Math.floor(Math.random() * 9)];
            symbol.style.position = 'fixed';
            symbol.style.left = Math.random() * 90 + 'vw';
            symbol.style.bottom = '-30px';
            symbol.style.fontSize = 28 + Math.random() * 38 + 'px';
            symbol.style.color = `rgba(212, 175, 55, 0.25)`;
            symbol.style.pointerEvents = 'none';
            symbol.style.zIndex = '1';
            document.body.appendChild(symbol);
            gsap.to(symbol, { y: -window.innerHeight - 100, duration: 8 + Math.random() * 10, ease: "none", onComplete: () => symbol.remove() });
        }
    }, 1400);

    loadBestTimes();
    // default select easy
    document.querySelector('.diff-card[data-diff="easy"]').classList.add('selected');