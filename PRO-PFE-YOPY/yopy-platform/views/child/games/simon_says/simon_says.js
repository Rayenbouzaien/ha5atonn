// ----- PHP SESSION DATA -----
        // ----- PHP SESSION DATA -----
let gameState = 'INIT';
let difficulty = 'easy';
let pattern = [];
let playerIndex = 0;
let level = 1;
let score = 0;
let errors = 0;
let highScore = 0;
let isShowingSeq = false;
let startTimestamp = null;
let gameStartTime = null;      // ← NEW: total game duration
let lastReactionTime = null;   // ← NEW: reaction time between clicks
let serverSessionId = '<?php echo $sessionId ?? ""; ?>';

// ─────────────────────────────────────────────────────────────
// NEW: SIGNAL_MAP + BehaviorCollector (MUST be before collector)
// ─────────────────────────────────────────────────────────────
/* ─── SIGNAL MAP — specific to Simon Says (exactly like memory_game.js) ─── */
const SIGNAL_MAP = {
    player_input: 'reaction',   // reaction time between taps
    correct:      'success',    // successful sequence step
    wrong:        'error'       // wrong color
};

/* ─── FIX 1: Create collector IMMEDIATELY (same pattern as memory_game.js) ─── */
let collector = new BehaviorCollector('simon_says', SIGNAL_MAP);
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


        const COLORS = ['green', 'red', 'yellow', 'blue'];

        const DIFF_CONFIG = {
            easy: {
                flashMs: 750,
                pauseMs: 350,
                mult: 10,
                label: 'Douce'
            },
            medium: {
                flashMs: 550,
                pauseMs: 280,
                mult: 15,
                label: 'Forêt'
            },
            hard: {
                flashMs: 380,
                pauseMs: 220,
                mult: 20,
                label: 'Djembe'
            }
        };

        // ----- Web Audio (tambours / djembe) -----
        let audioCtx;

        function initAudio() {
            if (!audioCtx) audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        }

        function playDrum(freq, duration, type = 'sine', volume = 0.4, attack = 0.01, decay = 0.2) {
            initAudio();
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.value = volume;
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(gain).connect(audioCtx.destination);
            osc.start();
            osc.stop(now + duration);
        }

        // Sons spécifiques djembe
        function playDjembeLow() {
            playDrum(120, 0.45, 'triangle', 0.6, 0.01, 0.3);
        }

        function playDjembeHigh() {
            playDrum(280, 0.3, 'sine', 0.5, 0.005, 0.2);
        }

        function playCorrectSound() {
            playDjembeHigh();
            setTimeout(() => playDjembeLow(), 120);
        }

        function playWrongSound() {
            playDrum(80, 0.6, 'sawtooth', 0.4);
        }

        function playLevelUpSound() {
            playDjembeHigh();
            setTimeout(() => playDjembeLow(), 80);
            setTimeout(() => playDjembeHigh(), 180);
        }

        function playGameStartSound() {
            playDjembeLow();
            setTimeout(() => playDjembeHigh(), 150);
            setTimeout(() => playDjembeLow(), 280);
        }

        function playButtonSound(color) {
            let freq = 0;
            switch (color) {
                case 'green':
                    freq = 160;
                    break;
                case 'red':
                    freq = 220;
                    break;
                case 'yellow':
                    freq = 280;
                    break;
                case 'blue':
                    freq = 340;
                    break;
                default:
                    freq = 200;
            }
            playDrum(freq, 0.3, 'sine', 0.5);
        }

        // ----- HIGH SCORE -----
        function loadHighScore() {
            try {
                highScore = parseInt(sessionStorage.getItem('simon_hs') || '0');
            } catch (e) {}
            document.getElementById('hud-highscore').textContent = highScore;
        }

        function saveHighScore(val) {
            if (val > highScore) {
                highScore = val;
                try {
                    sessionStorage.setItem('simon_hs', highScore);
                } catch (e) {}
                document.getElementById('hud-highscore').textContent = highScore;
            }
        }

        // ----- DIFFICULTY SELECTION -----
        function selectDiff(el, diff) {
            document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
            el.classList.add('selected');
            difficulty = diff;
        }

        // ----- START GAME -----
       // ----- START GAME -----
async function startGame() {
    if (gameState !== 'INIT') return;

    // ←←← FIXED: same relative path as memory_game.js (this was causing the HTML/JSON error)
    try {
        const res = await fetch('../../../../games/simon_says/simon_says_backend.php?action=start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ difficulty })
        });

        const data = await res.json();

        if (data.status === 'success') {
            serverSessionId = data.data.session_id;
            console.log('%c[Session] Created id=' + serverSessionId, 'color:#00F5FF');
            
            // ←←← CRITICAL: link collector to this session
            if (collector && serverSessionId) {
                collector.setSessionId(serverSessionId);
            }
        } else {
            console.warn('%c[Session] Backend warning:', data.message, 'color:#FFAA00');
        }
    } catch (e) {
        console.warn('%c[Session] Start failed (using fallback)', e);
    }

    gameState = 'PLAYING';

    document.getElementById('screen-difficulty').style.display = 'none';
    const gameScreen = document.getElementById('screen-game');
    gameScreen.style.display = 'flex';
    gsap.from(gameScreen, { opacity: 0, y: 30, duration: 0.5, ease: 'power2.out' });

    loadHighScore();

    pattern = [];
    playerIndex = 0;
    level = 1;
    score = 0;
    errors = 0;
gameStartTime = Date.now();     // ← fixed total game time
lastReactionTime = Date.now();  // initial value for reactions
    updateHUD();

    playGameStartSound();
    await nextRound();
}
        // ----- NEXT ROUND -----
        async function nextRound() {
            playerIndex = 0;
            const cfg = DIFF_CONFIG[difficulty];
            pattern.push(COLORS[Math.floor(Math.random() * 4)]);

            setStatus(`🌱 Niveau ${level} — Écoute la forêt... 🌱`);
            disableBtns();
            isShowingSeq = true;

            await sleep(500);

            if (level > 1) {
                playLevelUpSound();
                await sleep(100);
            }

            for (const color of pattern) {
                await flashBtn(color, cfg.flashMs, cfg.pauseMs);
            }

            isShowingSeq = false;
            enableBtns();
            setStatus(`🎵 À toi de jouer ! Répète le rythme 🎵`);
        }

        function flashBtn(color, flashMs, pauseMs) {
            return new Promise(resolve => {
                playButtonSound(color);
                const el = document.getElementById(`btn-${color}`);
                el.classList.add('lit');
                setTimeout(() => {
                    el.classList.remove('lit');
                    setTimeout(resolve, pauseMs);
                }, flashMs);
            });
        }

        // ----- PLAYER CLICK -----
       function onPlayerClick(color) {
    if (isShowingSeq || gameState !== 'PLAYING') return;

    const el = document.getElementById(`btn-${color}`);
    el.classList.add('pressed');
    setTimeout(() => el.classList.remove('pressed'), 150);
    playButtonSound(color);

    // ── BEHAVIOR RECORDING (now fully working) ──
  // ── BEHAVIOR RECORDING ──
if (collector) {
    const reactionMs = lastReactionTime 
        ? Date.now() - lastReactionTime 
        : 0;
    
    collector.record('player_input', reactionMs);   // → 'reaction'
    lastReactionTime = Date.now();                  // ← only reset reaction time
}

    if (color === pattern[playerIndex]) {
        playerIndex++;
        if (playerIndex === pattern.length) {
            const cfg = DIFF_CONFIG[difficulty];
            score += level * cfg.mult;
            level++;
            saveHighScore(score);
            updateHUD();
            setStatus(`✨ Parfait ! +${level-1 * cfg.mult} points ✨`);

            if (collector) collector.record('correct', level);   // → 'success'

            playCorrectSound();
            flashCombo();

            disableBtns();
            setTimeout(() => nextRound(), 800);
        }
    } else {
        errors++;
        if (collector) collector.record('wrong', null);   // → 'error'

        playWrongSound();
        updateHUD();
        endGame();
    }
}

        function flashCombo() {
            gsap.fromTo('#combo-flash', {
                opacity: 0,
                scale: 0.5,
                y: 30
            }, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'back.out(2)',
                onComplete: () => gsap.to('#combo-flash', {
                    opacity: 0,
                    y: -50,
                    delay: 0.4,
                    duration: 0.4
                })
            });
        }

        // ----- END GAME -----
        async function endGame() {
            if (gameState !== 'PLAYING') return;
            gameState = 'DONE';
            disableBtns();
            saveHighScore(score);

            if (collector) await collector.flush();

            document.getElementById('res-score').textContent = score;
            document.getElementById('res-level').textContent = level - 1;
            document.getElementById('res-errors').textContent = errors;
            document.getElementById('result-badge').innerHTML = level > 4 ? '🏆🌿' : '✨🌱';
            document.getElementById('result-title').innerHTML = level > 4 ? 'MAÎTRE DE LA FORÊT' : 'ESPRIT ÉVEILLÉ';

            document.getElementById('result-overlay').classList.add('show');
            gsap.from('.result-card', {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(2)'
            });

          await submitScore(score, Math.floor((Date.now() - gameStartTime) / 1000));
        }

        // ── submitScore ──────────────────────────────────────────────────────────
async function submitScore(points, completionTime) {
    const payload = {
        session_id:      serverSessionId,
        points:          points,
        completion_time: completionTime
    };

    console.log('%c[Score] Submitting →', 'color:#FFD700', payload);

    try {
        const res = await fetch('../../../../games/simon_says/simon_says_backend.php?action=score', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload)
        });

        const data = await res.json();

        if (data.status === 'success') {
            console.log('%c[Score] Saved ✓  points=' + data.data.points + ' | time=' + data.data.completion_time, 'color:#39FF14');
        } else {
            console.warn('%c[Score] Save failed:', data.message, 'color:#FF4444');
        }
    } catch (err) {
        console.error('%c[Score] Network error:', err);
    }
}

        // ----- NAVIGATION -----
        function resetToMenu() {
            document.getElementById('result-overlay').classList.remove('show');
            document.getElementById('screen-game').style.display = 'none';
            document.getElementById('screen-difficulty').style.display = 'flex';
            gameState = 'INIT';
            pattern = [];
            playerIndex = 0;
            level = 1;
            score = 0;
            errors = 0;
            updateHUD();
        }

        function goMenu() {
            window.location.href = '../../game-menu/menu.php';
        }

        // ----- HELPERS -----
        function sleep(ms) {
            return new Promise(r => setTimeout(r, ms));
        }

        function setStatus(msg) {
            const el = document.getElementById('status-msg');
            el.style.opacity = 0;
            setTimeout(() => {
                el.textContent = msg;
                el.style.opacity = 1;
            }, 120);
        }

        function updateHUD() {
            document.getElementById('hud-level').textContent = level;
            document.getElementById('hud-score').textContent = score;
            document.getElementById('hud-score-top').textContent = score;
            document.getElementById('hud-errors').textContent = errors;
            const totalPairs = pattern.length;
            const progress = (playerIndex / totalPairs) * 100;
            document.getElementById('progress-fill').style.width = (isShowingSeq ? 0 : progress) + '%';
        }

        function disableBtns() {
            document.querySelectorAll('.drum-btn').forEach(b => b.classList.add('disabled'));
        }

        function enableBtns() {
            document.querySelectorAll('.drum-btn').forEach(b => b.classList.remove('disabled'));
        }

        // ----- BACKGROUND FOREST (canvas avec particules et lueurs) -----
        const canvas = document.getElementById('forest-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function spawnLeaf() {
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height + 5,
                size: Math.random() * 4 + 2,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -(Math.random() * 1.2 + 0.6),
                alpha: Math.random() * 0.5 + 0.2,
                color: `hsla(${80 + Math.random() * 40}, 70%, 55%, 0.6)`
            });
        }

        function drawForest() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // silhouettes d'arbres
            ctx.fillStyle = '#1A3A2A';
            for (let i = 0; i < 12; i++) {
                ctx.beginPath();
                ctx.rect((i * 120 + Math.sin(Date.now() * 0.0005 + i) * 20) % (canvas.width + 200) - 100, canvas.height - 80, 30, 80);
                ctx.fill();
            }
            // particules
            if (Math.random() < 0.2) spawnLeaf();
            particles = particles.filter(p => p.y > -20 && p.alpha > 0.02);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.002;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.rect(p.x, p.y, p.size, p.size * 1.5);
                ctx.fill();
            });
            requestAnimationFrame(drawForest);
        }
        drawForest();



        // ----- ATTACH EVENT LISTENERS -----
        document.querySelectorAll('.drum-btn').forEach(btn => {
            btn.addEventListener('click', () => onPlayerClick(btn.dataset.color));
        });

        // Petite animation d'entrée pour les cartes de difficulté
        gsap.from('.diff-card', {
            y: 40,
            opacity: 0.9,
            duration: 1.3,
            stagger: 0.1,
            ease: 'back.out(2.3)',
            delay: 0.3
        });