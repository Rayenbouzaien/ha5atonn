/**
 * The JavaScript code defines a Hangman game with different difficulty levels, word lists, game
 * mechanics, and visual elements like avatars and animations.
 */
// hangman_quest_script.js

const GAME_ID      = 'hangman_quest';
const SESSION_ID   = '<?= $sessionId ?>';           // Will be replaced when included via PHP
const NICKNAME     = '<?= $nickname ?>';
const BUDDY_ID     = '<?= $buddyId ?>';



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
    guess:     'reaction',
    correct:   'success',
    wrong:     'error',
    hint:      'hint'
};

let collector = new BehaviorCollector('hangman_quest', SIGNAL_MAP);
let serverSessionId = SESSION_ID;

// Word list (same as before)
const wordList = [
    { word: 'guitar', hint: 'A musical instrument with strings.', category: 'Music' },
    { word: 'oxygen', hint: 'A colorless, odorless gas essential for life.', category: 'Science' },
    { word: 'mountain', hint: 'A large natural elevation of the Earth\'s surface.', category: 'Nature' },
    { word: 'painting', hint: 'An art form using colors on a surface.', category: 'Art' },
    { word: 'astronomy', hint: 'The scientific study of celestial objects.', category: 'Science' },
    { word: 'football', hint: 'A popular sport played with a round ball.', category: 'Sports' },
    { word: 'chocolate', hint: 'A sweet treat made from cocoa beans.', category: 'Food' },
    { word: 'butterfly', hint: 'An insect with colorful wings.', category: 'Nature' },
    { word: 'history', hint: 'The study of past events and human civilization.', category: 'Education' },
    { word: 'pizza', hint: 'A savory dish with a round, flattened base and toppings.', category: 'Food' },
    { word: 'jazz', hint: 'A genre of music known for improvisation.', category: 'Music' },
    { word: 'camera', hint: 'A device used to capture images or videos.', category: 'Tech' },
    { word: 'diamond', hint: 'A precious gemstone known for its brilliance.', category: 'Gems' },
    { word: 'adventure', hint: 'An exciting or daring experience.', category: 'Life' },
    { word: 'science', hint: 'The systematic study of the natural world.', category: 'Education' },
    { word: 'bicycle', hint: 'A human-powered vehicle with two wheels.', category: 'Transport' },
    { word: 'sunset', hint: 'The daily disappearance of the sun below the horizon.', category: 'Nature' },
    { word: 'coffee', hint: 'A popular caffeinated beverage from roasted beans.', category: 'Food' },
    { word: 'dance', hint: 'A rhythmic movement of the body, often to music.', category: 'Art' },
    { word: 'galaxy', hint: 'A vast system of stars held together by gravity.', category: 'Space' },
    { word: 'orchestra', hint: 'A large ensemble of musicians.', category: 'Music' },
    { word: 'volcano', hint: 'A mountain that can eject lava and ash.', category: 'Nature' },
    { word: 'novel', hint: 'A long work of fiction with a complex plot.', category: 'Books' },
    { word: 'sculpture', hint: 'A three-dimensional art form.', category: 'Art' },
    { word: 'symphony', hint: 'A long musical composition for a full orchestra.', category: 'Music' },
    { word: 'ballet', hint: 'A classical dance form with precise, graceful movements.', category: 'Art' },
    { word: 'astronaut', hint: 'A person trained to travel and work in space.', category: 'Space' },
    { word: 'waterfall', hint: 'A cascade of water falling from a height.', category: 'Nature' },
    { word: 'technology', hint: 'The application of scientific knowledge for practical use.', category: 'Tech' },
    { word: 'rainbow', hint: 'A colorful arc caused by light refraction in rain.', category: 'Nature' },
    { word: 'universe', hint: 'All existing matter, space, and time as a whole.', category: 'Space' },
    { word: 'piano', hint: 'A keyboard instrument where keys strike strings.', category: 'Music' },
    { word: 'vacation', hint: 'A period of time for rest and relaxation.', category: 'Life' },
    { word: 'theater', hint: 'A place where plays or movies are performed.', category: 'Art' },
    { word: 'language', hint: 'A system of communication using words.', category: 'Education' },
    { word: 'desert', hint: 'A barren land with little precipitation.', category: 'Nature' },
    { word: 'sunflower', hint: 'A tall plant with a large yellow flower head.', category: 'Nature' },
    { word: 'fantasy', hint: 'Imaginative fiction with magic and supernatural elements.', category: 'Books' },
    { word: 'telescope', hint: 'An optical instrument used to view distant objects in space.', category: 'Space' },
    { word: 'illusion', hint: 'A false perception or deceptive appearance.', category: 'Mind' },
    { word: 'moonlight', hint: 'The gentle light that comes from the moon at night.', category: 'Space' },
    { word: 'nostalgia', hint: 'A sentimental longing for the past.', category: 'Emotion' },
    { word: 'brilliant', hint: 'Exceptionally clever, talented, or impressive.', category: 'Mind' },
    { word: 'curiosity', hint: 'A strong desire to know or learn something.', category: 'Emotion' },
    { word: 'shadow', hint: 'A dark shape produced by blocking light.', category: 'Nature' },
    { word: 'mystery', hint: 'Something that is difficult or impossible to explain.', category: 'Mind' },
    { word: 'crystal', hint: 'A transparent mineral with a regular geometric shape.', category: 'Gems' },
    { word: 'voyage', hint: 'A long journey, especially by sea or in space.', category: 'Transport' },
    { word: 'breeze', hint: 'A gentle, refreshing wind.', category: 'Nature' },
    { word: 'jungle', hint: 'A dense tropical forest teeming with wildlife.', category: 'Nature' },
];

const DIFF_CONFIG = {
    easy:   { maxLen: 7,   maxWrong: 8, mult: 10, label: 'Easy'   },
    medium: { maxLen: 999, maxWrong: 6, mult: 20, label: 'Medium' },
    hard:   { maxLen: 999, minLen: 8,  maxWrong: 5, mult: 40, label: 'Hard' },
};

const STATE = { INIT:'INIT', PLAYING:'PLAYING', DONE:'DONE', SAVED:'SAVED' };
let gameState      = STATE.INIT;
let difficulty     = 'easy';
let currentWord    = '';
let currentHint    = '';
let currentCategory= '';
let guessedLetters = new Set();
let wrongCount     = 0;
let maxWrong       = 6;
let hintsUsed      = 0;
let elapsed        = 0;
let timerInterval  = null;
let startTimestamp = null;

/**
 * The JavaScript code provided includes functions for a Hangman game, with features such as selecting
 * difficulty, starting the game, guessing letters, using hints, updating game elements, and handling
 * game end scenarios.
 * @param el - The `el` parameter in the `selectDiff` function represents the element that was clicked
 * to select a difficulty level in the game. This function is responsible for updating the selected
 * difficulty level visually by adding a 'selected' class to the clicked element and removing it from
 * other elements. It also triggers a
 * @param diff - The `diff` parameter in the `selectDiff` function represents the difficulty level
 * selected by the user in the game. It is used to set the game difficulty and trigger different game
 * behaviors based on the selected difficulty level.
 */

function selectDiff(el, diff) {
    document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    difficulty = diff;
    gsap.to(el, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
}

async function startGame() {
    if (gameState !== STATE.INIT) return;

    try {
        const res = await fetch('../../../../games/hangman_quest/hangman_quest_backend.php?action=start', {
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

    collector = (typeof BehaviorCollector !== 'undefined')
        ? new BehaviorCollector('hangman_quest', SIGNAL_MAP)
        : { record: () => {}, flush: async () => {} };

    gameState = STATE.PLAYING;

    // Animate out difficulty screen
    gsap.to("#screen-difficulty", { opacity: 0, y: 30, duration: 0.6, onComplete: () => {
        document.getElementById('screen-difficulty').style.display = 'none';
        const gsScreen = document.getElementById('screen-game');
        gsScreen.style.display = 'flex';
        gsap.fromTo(gsScreen, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(0.5)" });
        gsap.from(".hangman-wrap", { scale: 0.8, opacity: 0, duration: 0.5, delay: 0.2 });
        gsap.from("#word-display .letter-slot", { opacity: 0, y: 20, stagger: 0.03, duration: 0.4, delay: 0.3 });
    }});

    pickWord();
}
function pickWord() {
    const cfg = DIFF_CONFIG[difficulty];
    let pool = wordList.filter(w => w.word.length <= (cfg.maxLen || 999));
    if (cfg.minLen) pool = pool.filter(w => w.word.length >= cfg.minLen);
    if (pool.length === 0) pool = wordList;
    const entry = pool[Math.floor(Math.random() * pool.length)];
    currentWord     = entry.word;
    currentHint     = entry.hint;
    currentCategory = entry.category;
    guessedLetters = new Set();
    wrongCount  = 0;
    hintsUsed   = 0;
    maxWrong    = cfg.maxWrong;
    document.getElementById('hint-text').textContent    = currentHint;
    document.getElementById('category-badge').textContent = currentCategory;
    document.getElementById('hint-msg').textContent     = '';
    document.getElementById('hint-btn').disabled        = false;
    updateHangman();
    updateLivesHearts();
    renderWordDisplay();
    buildKeyboard();
    startTimer();
    updateHUD();
}

function newWord() {
    document.getElementById('result-overlay').classList.remove('show');
    stopTimer();
    if (gameState !== STATE.PLAYING) gameState = STATE.PLAYING;
    pickWord();
    gsap.fromTo("#word-display", { scale: 0.95, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.3 });
}

function renderWordDisplay() {
    const wd = document.getElementById('word-display');
    wd.innerHTML = '';
    [...currentWord].forEach(ch => {
        const slot = document.createElement('div');
        slot.className = 'letter-slot';
        const charEl = document.createElement('div');
        charEl.className = 'letter-char';
        const lineEl = document.createElement('div');
        lineEl.className = 'letter-line';
        slot.appendChild(charEl);
        slot.appendChild(lineEl);
        wd.appendChild(slot);
    });
    revealGuessed();
}

function revealGuessed() {
    const slots = document.querySelectorAll('#word-display .letter-slot');
    [...currentWord].forEach((ch, i) => {
        const charEl = slots[i].querySelector('.letter-char');
        const lineEl = slots[i].querySelector('.letter-line');
        if (guessedLetters.has(ch)) {
            charEl.textContent = ch.toUpperCase();
            lineEl.classList.add('filled');
        } else {
            charEl.textContent = '';
            lineEl.classList.remove('filled');
        }
    });
}

function animateReveal(letter, isHint = false) {
    const slots = document.querySelectorAll('#word-display .letter-slot');
    [...currentWord].forEach((ch, i) => {
        if (ch === letter) {
            const charEl = slots[i].querySelector('.letter-char');
            const lineEl = slots[i].querySelector('.letter-line');
            charEl.textContent = ch.toUpperCase();
            charEl.classList.add('revealed');
            if (isHint) { charEl.classList.add('hint-reveal'); lineEl.classList.add('hint-filled'); }
            else { lineEl.classList.add('filled'); }
            gsap.fromTo(charEl, { scale: 0, rotationY: 90 }, { scale: 1, rotationY: 0, duration: 0.3, ease: "back.out" });
            setTimeout(() => charEl.classList.remove('revealed'), 400);
        }
    });
}

function buildKeyboard() {
    const kb = document.getElementById('keyboard');
    kb.innerHTML = '';
    for (let i = 97; i <= 122; i++) {
        const ch = String.fromCharCode(i);
        const btn = document.createElement('button');
        btn.className = 'key-btn';
        btn.textContent = ch.toUpperCase();
        btn.id = `key-${ch}`;
        btn.addEventListener('click', () => guessLetter(ch));
        kb.appendChild(btn);
    }
}

function guessLetter(letter) {
    if (gameState !== STATE.PLAYING) return;
    if (guessedLetters.has(letter)) return;
    guessedLetters.add(letter);
    const btn = document.getElementById(`key-${letter}`);
    if (currentWord.includes(letter)) {if (collector) collector.record('correct', letter);
        btn.classList.add('correct');
        animateReveal(letter);
        playSound('../../../public/sounds/hangman_quest/green.mp3');
        if (collector) collector.record('matches', 1);
        gsap.to(btn, { scale: 1.15, duration: 0.1, yoyo: true, repeat: 1 });
    } else {if (collector) collector.record('wrong', null);
        wrongCount++;
        btn.classList.add('wrong');
        updateHangman();
        updateLivesHearts();
        playSound('../../../../public/sounds/hangman_quest/wrong.mp3');
        gsap.to("#hangman-img", { x: 3, duration: 0.05, yoyo: true, repeat: 5 });
    }
    btn.disabled = true;
    updateHUD();
    checkEndGame();
}

function useHint() {
    if (gameState !== STATE.PLAYING) return;
    const unrevealed = [...new Set([...currentWord])].filter(ch => !guessedLetters.has(ch));
    if (unrevealed.length === 0) return;
    const letter = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    guessedLetters.add(letter);
    hintsUsed++;
    if (collector) collector.record('hint', null);
    const btn = document.getElementById(`key-${letter}`);
    if (btn) { btn.classList.add('hinted'); btn.disabled = true; }
    animateReveal(letter, true);
    playSound('../../../public/sounds/hangman_quest/green.mp3');
    updateHUD();
    document.getElementById('hint-msg').textContent = `✨ Rune revealed: "${letter.toUpperCase()}" — Score x0.80`;
    setTimeout(() => document.getElementById('hint-msg').textContent = '', 4000);
    checkEndGame();
}

function updateHangman() {
    const maxImageIndex = 6;
    let imageIndex = Math.round((wrongCount / maxWrong) * maxImageIndex);
    if (imageIndex > maxImageIndex) imageIndex = maxImageIndex;
    if (imageIndex < 0) imageIndex = 0;
    document.getElementById('hangman-img').src = `../../../../public/images/GAMES/hangman_quest/hangman-${imageIndex}.svg`;
}

function updateLivesHearts() {
    const el = document.getElementById('lives-hearts');
    const remaining = maxWrong - wrongCount;
    el.innerHTML = '';
    for (let i = 0; i < maxWrong; i++) {
        const heart = document.createElement('span');
        heart.textContent = i < remaining ? '❤️' : '🖤';
        el.appendChild(heart);
    }
    document.getElementById('hud-lives').textContent = remaining;
}

function checkEndGame() {
    const allRevealed = [...currentWord].every(ch => guessedLetters.has(ch));
    if (allRevealed) { setTimeout(() => endGame(true), 250); return; }
    if (wrongCount >= maxWrong) { setTimeout(() => endGame(false), 250); }
}

async function endGame(isVictory) {
    if (gameState !== STATE.PLAYING) return;
    gameState = STATE.DONE;
    stopTimer();

    if (collector) await collector.flush();

    const score = isVictory ? calcScore() : 0;

    let emoji = isVictory ? (score > 800 ? '🏆' : '✨') : '💀';
    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = isVictory ? 'Shadow Monarch\'s Favor' : 'The Abyss Claims...';
    document.getElementById('result-word').textContent = `The word was: ${currentWord.toUpperCase()}`;
    document.getElementById('result-score-display').textContent = `Souls: ${score}`;
    document.getElementById('result-detail').textContent = `${elapsed}s · ${wrongCount} errors · ${hintsUsed} runes · ${DIFF_CONFIG[difficulty].label}`;

    document.getElementById('result-overlay').classList.add('show');
    gsap.fromTo("#result-overlay > *", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" });

    playSound(isVictory ? '../../../public/sounds/hangman_quest/green.mp3' : '../../../public/sounds/hangman_quest/wrong.mp3');

    await submitScore(score, Math.max(3, elapsed));
    gameState = STATE.SAVED;
}
function calcScore() {
    const cfg = DIFF_CONFIG[difficulty];
    const timeBonus = Math.max(0, 1000 - elapsed * 2);
    const wrongPen = wrongCount * 60;
    const raw = Math.max(0, Math.round((timeBonus - wrongPen) * cfg.mult / 10));
    return Math.round(raw * Math.pow(0.80, hintsUsed));
}

function updateHUD() {
    document.getElementById('hud-score').textContent = gameState === STATE.PLAYING ? calcScore() : 0;
}

function startTimer() {
    stopTimer();
    elapsed = 0; startTimestamp = Date.now();
    timerInterval = setInterval(() => {
        elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
        document.getElementById('hud-timer').textContent = elapsed + 's';
        const pill = document.getElementById('timer-pill');
        if (elapsed >= 90) pill.classList.add('urgent');
        else pill.classList.remove('urgent');
        updateHUD();
    }, 500);
}
function stopTimer() { clearInterval(timerInterval); }

async function submitScore(points, completionTime) {
    console.log('%c[Score] Submitting →', 'color:#FFD700', { points, completionTime });
    const badge = document.getElementById('submitting-badge');
    badge.classList.add('show');

    try {
        const res = await fetch('../../../../games/hangman_quest/hangman_quest_backend.php?action=score', {
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
function resetToMenu() {
    document.getElementById('result-overlay').classList.remove('show');
    document.getElementById('screen-game').style.display = 'none';
    document.getElementById('screen-difficulty').style.display = 'flex';
    gameState = STATE.INIT;
    stopTimer();
    gsap.fromTo("#screen-difficulty", { opacity: 0 }, { opacity: 1, duration: 0.5 });
}
function goMenu() { window.location.href = '../../game-menu/menu.php'; }
function playSound(name) {
    // Silent — prevents console spam when files are missing
    try {
        const audio = new Audio(name);
        audio.volume = 0.3;
        audio.play().catch(() => {});
    } catch(e) {}
}

window.addEventListener('keydown', e => {
    if (gameState !== STATE.PLAYING) return;
    const letter = e.key.toLowerCase();
    if (letter >= 'a' && letter <= 'z' && letter.length === 1) {
        e.preventDefault();
        guessLetter(letter);
    }
});

// Enhanced particle system with purple/gold hues
(function particles() {
    const c = document.getElementById('particles');
    const ctx = c.getContext('2d');
    let pts = [];
    function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 80; i++) {
        pts.push({
            x: Math.random()*c.width,
            y: Math.random()*c.height,
            r: Math.random()*3+1,
            vx: (Math.random()-0.5)*0.3,
            vy: (Math.random()-0.5)*0.3,
            col: `hsl(${Math.random() > 0.6 ? 270 : 45}, 80%, 60%)`
        });
    }
    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
            ctx.fillStyle = p.col + '66';
            ctx.fill();
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > c.width) p.vx *= -1;
            if (p.y < 0 || p.y > c.height) p.vy *= -1;
        });
        requestAnimationFrame(draw);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
})();

// Entrance animations for difficulty screen
gsap.from(".diff-card", { duration: 0.6, opacity: 0, y: 50, stagger: 0.1, ease: "back.out(0.6)" });
gsap.from("#screen-difficulty h1", { duration: 0.8, scale: 0.8, opacity: 0, delay: 0.2 });