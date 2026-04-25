const MOCK_SESSION = "akashic_mock_" + Date.now();
    let gameOverShown = false;
    let currentDifficulty = 'easy';
    

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
    
    // Difficulty selection UI
    function selectDiff(el, diff) {
        document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        currentDifficulty = diff;
        gsap.to(el, { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1, ease: "power1" });
    }
    document.getElementById('diffEasy').onclick = () => selectDiff(document.getElementById('diffEasy'), 'easy');
    document.getElementById('diffMed').onclick = () => selectDiff(document.getElementById('diffMed'), 'medium');
    document.getElementById('diffHard').onclick = () => selectDiff(document.getElementById('diffHard'), 'hard');
    
    // ---- THE GAME CLASS (pure frontend) ----
    class SynonymGame {
        constructor() {
            // Synonym vaults (full victorian lexicon)
            this.database = {
                easy: { 
                    happy:['joyful','glad','cheerful'], brave:['bold','fearless'], fast:['quick','rapid','speedy'], 
                    strong:['powerful','tough'], smart:['clever','bright'], cold:['chilly','cool'], bright:['shiny','light'], 
                    small:['tiny','little'], angry:['mad','upset'], quiet:['silent','calm'], big:['large','huge'], 
                    sad:['unhappy','gloomy'], hot:['warm','burning'], loud:['noisy','rowdy'], good:['nice','great'] 
                },
                medium: { 
                    happy:['delighted','content'], brave:['courageous','valiant'], fast:['swift','speedy'], 
                    strong:['robust','solid'], smart:['intelligent','wise'], cold:['freezing','icy'], bright:['brilliant','vivid'], 
                    small:['compact','miniature'], angry:['furious','annoyed'], quiet:['peaceful','still'], big:['enormous','massive'], 
                    sad:['melancholy','sorrowful'], hot:['scorching','sweltering'], loud:['deafening','thunderous'], good:['excellent','superb'] 
                },
                hard: { 
                    happy:['elated','ecstatic'], brave:['heroic','dauntless'], fast:['fleet','hasty'], 
                    strong:['sturdy','resilient'], smart:['perceptive','insightful'], cold:['frigid','glacial'], bright:['radiant','luminous'], 
                    small:['diminutive','petite'], angry:['irate','enraged'], quiet:['tranquil','serene'], big:['colossal','gigantic'], 
                    sad:['despondent','heartbroken'], hot:['blazing','torrid'], loud:['booming','ear-splitting'], good:['outstanding','phenomenal'] 
                }
            };
            this.synonymsMap = new Map();
            this.remainingKeys = [];
            this.score = 0;
            this.time = 60;
            this.streak = 0;
            this.multiplier = 1;
            this.difficulty = 'easy';
            this.currentWord = '';
            this.highScore = parseInt(localStorage.getItem('yopySynonymHighScore') || '0');
            this.timerInterval = null;
        }
        
        normalize(w) { return w.trim().toLowerCase(); }
        
        loadWords() {
            this.synonymsMap.clear();
            this.remainingKeys = [];
            const tier = this.database[this.difficulty];
            Object.keys(tier).forEach(word => {
                const upper = word.toUpperCase();
                this.synonymsMap.set(upper, tier[word]);
                this.remainingKeys.push(upper);
            });
            this.remainingKeys.sort(() => Math.random() - 0.5);
        }
        
        init() {
            this.loadWords();
            this.start();
        }
        
        start() {
            document.getElementById('input').disabled = false;
            document.getElementById('input').value = '';
            this.nextWord();
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.timerInterval = setInterval(() => {
                this.time--;
                document.getElementById('hud-timer').textContent = this.time;
                if (this.time <= 0) {
                    clearInterval(this.timerInterval);
                    this.endGame();
                }
                if(this.time <= 10) document.getElementById('timer-pill').classList.add('urgent');
                else document.getElementById('timer-pill').classList.remove('urgent');
            }, 1000);
        }
        
        nextWord() {
            if (this.remainingKeys.length === 0) this.loadWords();
            const idx = Math.floor(Math.random() * this.remainingKeys.length);
            this.currentWord = this.remainingKeys.splice(idx, 1)[0];
            const wordEl = document.getElementById('word');
            gsap.killTweensOf(wordEl);
            gsap.fromTo(wordEl, { scale: 0.6, rotationY: -30, opacity: 0 }, { scale: 1, rotationY: 0, opacity: 1, duration: 0.5, ease: "backOut" });
            wordEl.textContent = this.currentWord;
            document.getElementById('hint-box').innerHTML = '';
            document.getElementById('msg').textContent = '';
        }
        
        checkAnswer(val) {
            const inputClean = this.normalize(val);
            const synonymsList = this.synonymsMap.get(this.currentWord);
            if (synonymsList && synonymsList.includes(inputClean)) {
                this.streak++;
                this.multiplier = 1 + Math.floor(this.streak / 3);
                const gain = 10 * this.multiplier;
                this.score += gain;
                this.time = Math.min(this.time + 3, 99);
                document.getElementById('hud-score').textContent = this.score;
                this.displayMessage(`✔ +${gain} (x${this.multiplier})`, '#b6d7a8');
                this.etherealSparkles();
                this.checkLevelUp();
                gsap.to('#hud-score', { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1" });
                this.nextWord();
            } else {
                this.streak = 0;
                this.multiplier = 1;
                this.displayMessage("✖ Not recorded in the Akasha", '#e6b87e');
            }
        }
        
        checkLevelUp() {
            let changed = false;
            if (this.score > 120 && this.difficulty === 'easy') { this.difficulty = 'medium'; changed = true; }
            else if (this.score > 280 && this.difficulty === 'medium') { this.difficulty = 'hard'; changed = true; }
            if (changed) {
                this.loadWords();
                let levelName = this.difficulty === 'easy' ? 'Initiate' : (this.difficulty === 'medium' ? 'Adept' : 'Magus');
                document.getElementById('hud-level').textContent = levelName;
                this.displayMessage(`🌟 LEVEL UP! ${levelName}`, '#f5cb5c');
                gsap.to('#hud-level', { scale: 1.4, duration: 0.3, yoyo: true, repeat: 1 });
            }
        }
        
        showHint() {
            const box = document.getElementById('hint-box');
            const list = this.synonymsMap.get(this.currentWord);
            if (!list || list.length === 0) return;
            const correct = list[Math.floor(Math.random() * list.length)];
            let pool = [];
            this.synonymsMap.forEach((arr, key) => { if (key !== this.currentWord) pool.push(...arr); });
            pool = [...new Set(pool)];
            pool.sort(() => Math.random() - 0.5);
            let options = [correct];
            for (let w of pool) { if (options.length >= 4) break; if (!options.includes(w)) options.push(w); }
            options.sort(() => Math.random() - 0.5);
            box.innerHTML = '';
            options.forEach(opt => {
                let div = document.createElement('div');
                div.className = 'hint-option';
                div.textContent = opt;
                div.onclick = () => {
                    if (opt === correct) { 
                        this.displayMessage("✔ Oracle's guidance!", '#b9f6ca'); 
                        this.checkAnswer(opt); 
                    } else { 
                        this.displayMessage("✖ False whisper (−2s)", '#ffb77c'); 
                        this.time = Math.max(0, this.time - 2); 
                    }
                    box.innerHTML = '';
                };
                box.appendChild(div);
            });
            this.time = Math.max(0, this.time - 2);
        }
        
        skipWord() {
            this.displayMessage("⏭ Skip through the void (−3s)", '#ebc88b');
            this.time = Math.max(0, this.time - 3);
            this.nextWord();
        }
        
        displayMessage(txt, color) {
            const m = document.getElementById('msg');
            m.textContent = txt;
            m.style.color = color;
            gsap.fromTo(m, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
        }
        
        etherealSparkles() {
            for (let i=0;i<16;i++) {
                let spark = document.createElement('div');
                spark.textContent = ['✨','📜','⚜️','🔮','📖'][Math.floor(Math.random()*5)];
                spark.style.cssText = `position:fixed; left:${Math.random()*100}vw; top:-20px; font-size:28px; pointer-events:none; z-index:9999; transition: all 2s ease-out;`;
                document.body.appendChild(spark);
                gsap.to(spark, { y: window.innerHeight+100, x: (Math.random() - 0.5)*200, rotate: Math.random()*360, opacity: 0, duration: 2, ease: "power2.out", onComplete: () => spark.remove() });
            }
        }
        
        endGame() {
            if (gameOverShown) return;
            gameOverShown = true;
            if(this.timerInterval) clearInterval(this.timerInterval);
            const modal = document.getElementById('result-overlay');
            document.getElementById('result-emoji').textContent = this.score > 600 ? '🏆📜' : '📖⚜️';
            document.getElementById('result-title').textContent = 'Chronicle Concluded';
            document.getElementById('result-score-display').textContent = this.score;
            let diffLabel = this.difficulty === 'easy' ? 'INITIATE' : (this.difficulty === 'medium' ? 'ADEPT' : 'MAGUS');
            document.getElementById('result-detail').textContent = `${diffLabel} • ${this.score} Akashic points`;
            modal.classList.add('show');
            if (this.score > this.highScore) { 
                localStorage.setItem('yopySynonymHighScore', this.score);
                this.highScore = this.score;
            }
            this.mockScoreSave();
        }
        
        async mockScoreSave() {
            const badge = document.getElementById('submitting-badge');
            badge.style.display = 'block';
            await new Promise(r => setTimeout(r, 300));
            badge.style.display = 'none';
        }
    }
    
    let activeGame = null;
    
    function startGameFlow() {
        const diffScreen = document.getElementById('screen-difficulty');
        const gameScreen = document.getElementById('screen-game');
        gsap.to(diffScreen, { opacity: 0, duration: 0.5, ease: "power2.in", onComplete: () => {
            diffScreen.style.display = 'none';
            gameScreen.style.display = 'flex';
            gsap.fromTo(gameScreen, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "backOut" });
            activeGame = new SynonymGame();
            activeGame.difficulty = currentDifficulty;
            activeGame.init();
            gsap.fromTo(".game-box", { scale: 0.95, rotateY: -10 }, { scale: 1, rotateY: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
            document.getElementById('input').focus();
        }});
    }
    
    function resetToMenu() {
        if (activeGame && activeGame.timerInterval) clearInterval(activeGame.timerInterval);
        document.getElementById('result-overlay').classList.remove('show');
        document.getElementById('screen-game').style.display = 'none';
        document.getElementById('screen-difficulty').style.display = 'flex';
        gameOverShown = false;
        if (activeGame) activeGame = null;
        gsap.fromTo('#screen-difficulty', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
    }
    
    function restartGame() { location.reload(); }
    function exitToArchive() { resetToMenu(); }
    
    // Event bindings
    document.getElementById('startBtn').addEventListener('click', startGameFlow);
    // Removed erroneous grimoireExitBtn listener because the element does not exist.
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    document.getElementById('changePathBtn').addEventListener('click', resetToMenu);
    document.getElementById('exitArchiveBtn').addEventListener('click', resetToMenu);
    
    // Game action listeners (delegated, but activeGame exists)
    document.getElementById('input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && activeGame) {
            activeGame.checkAnswer(e.target.value);
            e.target.value = '';
        }
    });
    document.getElementById('hintBtn').onclick = () => { if (activeGame) activeGame.showHint(); };
    document.getElementById('skipBtn').onclick = () => { if (activeGame) activeGame.skipWord(); };
    
    // Ambient dust particles
    for(let i=0;i<35;i++) {
        let dust = document.createElement('div');
        dust.classList.add('dust-particle');
        dust.style.width = Math.random()*6+2+'px';
        dust.style.height = dust.style.width;
        dust.style.left = Math.random()*100+'%';
        dust.style.top = Math.random()*100+'%';
        dust.style.opacity = Math.random()*0.3;
        document.body.appendChild(dust);
        gsap.to(dust, { y: 'random(-30, 30)', x: 'random(-20, 20)', duration: 'random(4, 12)', repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
    
    gsap.fromTo(".topbar", { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "bounce.out", delay: 0.2 });
    gsap.fromTo(".difficulty-cards .diff-card", { scale: 0.9, opacity: 0, stagger: 0.1 }, { scale: 1, opacity: 1, duration: 0.7, ease: "backOut" });