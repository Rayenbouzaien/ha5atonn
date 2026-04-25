gsap.registerPlugin(TextPlugin);

        // ── PHP values ──
        const GAME_ID = 'spelling_bee';
        const SESSION_ID = '<?= $sessionId ?>';
        const BUDDY_ID = '<?= $buddyId ?>';

        // ── Word banks (unchanged from original) ──
        const WORD_DATA = {
            easy: [{
                    word: 'apple',
                    sentence: 'I ate a red apple for lunch.',
                    meaning: 'A round fruit with red or green skin.'
                },
                {
                    word: 'beach',
                    sentence: 'We played on the beach all day.',
                    meaning: 'A sandy area by the sea.'
                },
                {
                    word: 'candle',
                    sentence: 'She lit a candle when the lights went out.',
                    meaning: 'A stick of wax with a wick that burns.'
                },
                {
                    word: 'dragon',
                    sentence: 'The dragon breathed fire.',
                    meaning: 'A mythical fire-breathing creature.'
                },
                {
                    word: 'engine',
                    sentence: 'The car engine made a loud noise.',
                    meaning: 'A machine that produces power.'
                },
                {
                    word: 'flower',
                    sentence: 'She picked a yellow flower.',
                    meaning: 'The colourful part of a plant.'
                },
                {
                    word: 'garden',
                    sentence: 'Vegetables grow in the garden.',
                    meaning: 'A piece of land for growing plants.'
                },
                {
                    word: 'hammer',
                    sentence: 'He used a hammer to hit the nail.',
                    meaning: 'A heavy tool for hitting.'
                },
                {
                    word: 'island',
                    sentence: 'The island was surrounded by water.',
                    meaning: 'A piece of land surrounded by water.'
                },
                {
                    word: 'jungle',
                    sentence: 'Tigers live in the jungle.',
                    meaning: 'A dense tropical forest.'
                },
                {
                    word: 'kitten',
                    sentence: 'The kitten played with a ball.',
                    meaning: 'A baby cat.'
                },
                {
                    word: 'lemon',
                    sentence: 'Lemonade is made from lemon juice.',
                    meaning: 'A yellow sour citrus fruit.'
                },
                {
                    word: 'magnet',
                    sentence: 'The magnet attracted iron pins.',
                    meaning: 'An object that pulls iron towards it.'
                },
                {
                    word: 'needle',
                    sentence: 'She threaded the needle carefully.',
                    meaning: 'A thin pointed tool used for sewing.'
                },
                {
                    word: 'orange',
                    sentence: 'I drank orange juice at breakfast.',
                    meaning: 'A round citrus fruit with orange skin.'
                },
                {
                    word: 'parrot',
                    sentence: 'The parrot repeated every word.',
                    meaning: 'A colourful bird that can mimic speech.'
                },
                {
                    word: 'rabbit',
                    sentence: 'The rabbit hopped across the field.',
                    meaning: 'A small furry animal with long ears.'
                },
                {
                    word: 'shadow',
                    sentence: 'Her shadow was long in the afternoon.',
                    meaning: 'A dark shape made when light is blocked.'
                },
                {
                    word: 'turtle',
                    sentence: 'The turtle swam slowly in the pond.',
                    meaning: 'A reptile with a hard shell.'
                },
                {
                    word: 'umbrella',
                    sentence: 'I opened my umbrella in the rain.',
                    meaning: 'A device to keep you dry from rain.'
                },
                {
                    word: 'violin',
                    sentence: 'She played a beautiful violin piece.',
                    meaning: 'A small stringed musical instrument.'
                },
                {
                    word: 'window',
                    sentence: 'He looked out of the window.',
                    meaning: 'A glass opening in a wall.'
                },
                {
                    word: 'yellow',
                    sentence: 'The sunflower was bright yellow.',
                    meaning: 'The colour of the sun.'
                },
                {
                    word: 'zigzag',
                    sentence: 'The path went in a zigzag pattern.',
                    meaning: 'A pattern with sharp turns alternating.'
                },
                {
                    word: 'basket',
                    sentence: 'She carried fruit in a basket.',
                    meaning: 'A container made of woven material.'
                },
            ],
            medium: [{
                    word: 'adventure',
                    sentence: 'The hike was a great adventure.',
                    meaning: 'An exciting or unusual experience.'
                },
                {
                    word: 'beautiful',
                    sentence: 'The sunset was beautiful.',
                    meaning: 'Pleasing to the senses; attractive.'
                },
                {
                    word: 'calendar',
                    sentence: 'Mark the date on the calendar.',
                    meaning: 'A chart showing days, weeks and months.'
                },
                {
                    word: 'dangerous',
                    sentence: 'Crossing the road is dangerous.',
                    meaning: 'Likely to cause harm.'
                },
                {
                    word: 'elephant',
                    sentence: 'The elephant raised its trunk.',
                    meaning: 'The largest land animal with a trunk.'
                },
                {
                    word: 'fountain',
                    sentence: 'Water sprayed from the fountain.',
                    meaning: 'A structure that sends water into the air.'
                },
                {
                    word: 'generous',
                    sentence: 'She was generous with her time.',
                    meaning: 'Willing to give freely.'
                },
                {
                    word: 'harmony',
                    sentence: 'The choir sang in perfect harmony.',
                    meaning: 'A pleasing combination of notes.'
                },
                {
                    word: 'imaginary',
                    sentence: 'Dragons are imaginary creatures.',
                    meaning: 'Existing only in the mind; not real.'
                },
                {
                    word: 'jealousy',
                    sentence: 'He felt jealousy when she won.',
                    meaning: 'Resentment of someone\'s success.'
                },
                {
                    word: 'knowledge',
                    sentence: 'Reading builds knowledge.',
                    meaning: 'Facts and information learned.'
                },
                {
                    word: 'language',
                    sentence: 'She speaks three languages.',
                    meaning: 'A system of communication.'
                },
                {
                    word: 'medicine',
                    sentence: 'Take your medicine twice a day.',
                    meaning: 'A substance used to treat illness.'
                },
                {
                    word: 'necessary',
                    sentence: 'Food is necessary to survive.',
                    meaning: 'Required or essential.'
                },
                {
                    word: 'orchestra',
                    sentence: 'The orchestra played beautifully.',
                    meaning: 'A large group of musicians.'
                },
                {
                    word: 'patience',
                    sentence: 'Learning takes patience.',
                    meaning: 'The ability to wait calmly.'
                },
                {
                    word: 'question',
                    sentence: 'Raise your hand to ask a question.',
                    meaning: 'A sentence asking for information.'
                },
                {
                    word: 'rainbow',
                    sentence: 'A rainbow appeared after the rain.',
                    meaning: 'A colourful arc in the sky.'
                },
                {
                    word: 'sentence',
                    sentence: 'Write a sentence with the new word.',
                    meaning: 'A group of words expressing a complete idea.'
                },
                {
                    word: 'treasure',
                    sentence: 'They found buried treasure.',
                    meaning: 'A collection of valuable things.'
                },
                {
                    word: 'umbrella',
                    sentence: 'I forgot my umbrella and got wet.',
                    meaning: 'A device used for protection from rain.'
                },
                {
                    word: 'vegetable',
                    sentence: 'Carrots are a healthy vegetable.',
                    meaning: 'A plant or part of a plant eaten as food.'
                },
                {
                    word: 'wonderful',
                    sentence: 'The show was absolutely wonderful.',
                    meaning: 'Inspiring delight; marvellous.'
                },
                {
                    word: 'yesterday',
                    sentence: 'She called me yesterday afternoon.',
                    meaning: 'The day before today.'
                },
                {
                    word: 'celebrate',
                    sentence: 'We celebrate birthdays with cake.',
                    meaning: 'To mark a special occasion with festivities.'
                },
            ],
            hard: [{
                    word: 'accomplish',
                    sentence: 'She worked hard to accomplish her goal.',
                    meaning: 'To succeed in doing something difficult.'
                },
                {
                    word: 'atmosphere',
                    sentence: 'The atmosphere of the planet is thin.',
                    meaning: 'The layer of gases surrounding a planet.'
                },
                {
                    word: 'biological',
                    sentence: 'They studied biological organisms.',
                    meaning: 'Relating to biology or living things.'
                },
                {
                    word: 'camouflage',
                    sentence: 'The chameleon used camouflage to hide.',
                    meaning: 'Concealment by blending with surroundings.'
                },
                {
                    word: 'conscience',
                    sentence: 'His conscience told him it was wrong.',
                    meaning: 'An inner sense of right and wrong.'
                },
                {
                    word: 'definitely',
                    sentence: 'I will definitely be there on time.',
                    meaning: 'Without any doubt; certainly.'
                },
                {
                    word: 'embarrass',
                    sentence: 'It is easy to embarrass someone.',
                    meaning: 'To cause someone to feel awkward.'
                },
                {
                    word: 'fascinating',
                    sentence: 'The documentary was fascinating.',
                    meaning: 'Extremely interesting or charming.'
                },
                {
                    word: 'government',
                    sentence: 'The government passed a new law.',
                    meaning: 'The group that rules a country.'
                },
                {
                    word: 'hypothesis',
                    sentence: 'The scientist tested her hypothesis.',
                    meaning: 'A proposed explanation based on evidence.'
                },
                {
                    word: 'immediately',
                    sentence: 'Call me immediately if there is trouble.',
                    meaning: 'Without any delay; instantly.'
                },
                {
                    word: 'jealousy',
                    sentence: 'Jealousy can damage friendships.',
                    meaning: 'Unhappy resentment of someone\'s success.'
                },
                {
                    word: 'knowledge',
                    sentence: 'Knowledge is gained through experience.',
                    meaning: 'Information and understanding.'
                },
                {
                    word: 'laboratory',
                    sentence: 'Experiments are done in a laboratory.',
                    meaning: 'A room for scientific experiments.'
                },
                {
                    word: 'magnificent',
                    sentence: 'The palace was magnificent.',
                    meaning: 'Impressively beautiful or elaborate.'
                },
                {
                    word: 'necessary',
                    sentence: 'It is necessary to drink water.',
                    meaning: 'Required; cannot be done without.'
                },
                {
                    word: 'occasionally',
                    sentence: 'She occasionally visits the museum.',
                    meaning: 'Sometimes; not often.'
                },
                {
                    word: 'parliament',
                    sentence: 'Laws are made in parliament.',
                    meaning: 'The group that makes a country\'s laws.'
                },
                {
                    word: 'questionnaire',
                    sentence: 'Please fill in the questionnaire.',
                    meaning: 'A set of questions for gathering information.'
                },
                {
                    word: 'rhythm',
                    sentence: 'She clapped to the rhythm of the music.',
                    meaning: 'A strong regular repeated pattern of sound.'
                },
                {
                    word: 'surveillance',
                    sentence: 'The camera provided surveillance.',
                    meaning: 'Close observation, especially for security.'
                },
                {
                    word: 'technology',
                    sentence: 'Technology has changed how we live.',
                    meaning: 'The application of scientific knowledge.'
                },
                {
                    word: 'unnecessary',
                    sentence: 'His comments were unnecessary.',
                    meaning: 'Not needed; more than required.'
                },
                {
                    word: 'vocabulary',
                    sentence: 'Reading improves your vocabulary.',
                    meaning: 'The words used in a language.'
                },
                {
                    word: 'wilderness',
                    sentence: 'Bears live in the wilderness.',
                    meaning: 'A wild, uncultivated region.'
                },
            ],
        };

        // ── State ──
        const STATE = {
            INIT: 'INITIALISÉ',
            PLAYING: 'EN_COURS',
            DONE: 'TERMINÉ',
            SAVED: 'RÉSULTAT_STOCKÉ'
        };
        let gameState = STATE.INIT;

        const DIFF_CONFIG = {
            easy: {
                mult: 10,
                maxLives: 3,
                label: 'First Year'
            },
            medium: {
                mult: 15,
                maxLives: 3,
                label: 'Fifth Year'
            },
            hard: {
                mult: 20,
                maxLives: 3,
                label: 'N.E.W.T.'
            },
        };

        let difficulty = 'easy',
            pool = [],
            usedSet = new Set(),
            currentEntry = null;
        let wordsSolved = 0,
            wordsSkipped = 0,
            hintsUsed = 0,
            lives = 3,
            score = 0,
            wordCount = 0;
        let serverSessionId = SESSION_ID,
            collector = null,
            meaningShown = false,
            speechReady = false;
            let submitting = false;   // ← ADD THIS

        // ── Speech ──
        window.addEventListener('load', () => {
            if ('speechSynthesis' in window) {
                speechSynthesis.getVoices();
                speechReady = true;
            }
        });

        const DORE_LINES = [
            'Hmm, let us see if you know this one…',
            'Listen carefully, young wizard.',
            'A fine word for the discerning mind.',
            'Even Hermione found this tricky.',
            'Pay close attention…',
        ];

        function speak(text, rate = 0.85, pitch = 1.05) {
            if (!speechReady && !('speechSynthesis' in window)) return;
            speechSynthesis.cancel();
            const utt = new SpeechSynthesisUtterance(text);
            utt.lang = 'en-US';
            utt.rate = rate;
            utt.pitch = pitch;
            // Animate Dumbledore speaking
            animateDoreSpeak();
            speechSynthesis.speak(utt);
        }

        function animateDoreSpeak() {
            const dore = document.getElementById('dumbledore-svg');
            // Wand sparkle burst
            gsap.fromTo('#wand-glow', {
                attr: {
                    r: 4
                }
            }, {
                attr: {
                    r: 12
                },
                duration: 0.3,
                yoyo: true,
                repeat: 5,
                ease: 'power2.inOut'
            });
            // Body sway
            gsap.to(dore, {
                rotation: 3,
                duration: 0.3,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: 3
            });
            // Wand tip sparks
            fireWandSparks();
        }

        function showSpeechBubble(text, duration = 2200) {
            const sb = document.getElementById('speech-bubble');
            sb.textContent = text;
            sb.classList.add('show');
            gsap.fromTo(sb, {
                y: -10,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.35,
                ease: 'back.out(2)'
            });
            setTimeout(() => {
                gsap.to(sb, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => sb.classList.remove('show')
                });
            }, duration);
        }

    function speakWord() {
    if (!currentEntry) return;

    const line = DORE_LINES[Math.floor(Math.random() * DORE_LINES.length)];

    // Fixed: neutral bubble so the word is NOT revealed visually
    showSpeechBubble('🔊 Listen again…', 1800);

    speak(currentEntry.word, 0.72, 0.95);
}

        function speakSentence() {
            if (!currentEntry) return;
            showSpeechBubble('📖 Listen to it in context…');
            speak(currentEntry.sentence, 0.88, 1.0);
            score = Math.max(0, score - 2);
            updateHUD();
            setFeedback('📖 −2 pts for sentence hint', 'wrong');
            setTimeout(() => setFeedback('', ''), 1800);
        }

        // ── Difficulty selection ──
        function selectDiff(el, diff) {
            document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
            el.classList.add('selected');
            difficulty = diff;
            gsap.fromTo(el, {
                scale: 0.95
            }, {
                scale: 1,
                duration: 0.4,
                ease: 'back.out(2)'
            });
        }

        // ── Start game ──
        async function startGame() {
            if (gameState !== STATE.INIT) return;

            try {
                const res = await fetch(`../../../games/spelling_bee/spelling_bee_backend.php?action=start`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        difficulty
                    })
                });
                const data = await res.json();
                if (data.status === 'success') serverSessionId = data.data.session_id;
            } catch (e) {}

            gameState = STATE.PLAYING;
            collector = (typeof BehaviorCollector !== 'undefined') ?
                new BehaviorCollector(GAME_ID) : {
                    record: () => {},
                    flush: async () => {}
                };

            // Hide diff screen, show game
            const diffEl = document.getElementById('screen-difficulty');
            const gameEl = document.getElementById('screen-game');

            gsap.to(diffEl, {
                opacity: 0,
                y: -40,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    diffEl.style.display = 'none';
                    gameEl.style.display = 'flex';
                    gsap.fromTo(gameEl, {
                        opacity: 0,
                        y: 60
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'back.out(1.4)'
                    });
                    gsap.fromTo('#game-panel', {
                        scale: 0.92,
                        rotation: -2
                    }, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.9,
                        ease: 'elastic.out(1, 0.7)'
                    });
                    gsap.fromTo('#dumbledore-svg', {
                        y: 40,
                        opacity: 0
                    }, {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        delay: 0.2
                    });
                }
            });

            const cfg = DIFF_CONFIG[difficulty];
            lives = cfg.maxLives;
            pool = shuffle([...WORD_DATA[difficulty]]);
            usedSet.clear();
            wordsSolved = wordsSkipped = hintsUsed = score = wordCount = 0;
            updateHUD();
            updateLives();

            // Start floating candle GSAP animations
            animateCandles();

            setTimeout(() => nextWord(), 600);
        }

        // ── Next word ──
   function nextWord() {
    submitting = false;                    // Reset anti-spam lock
    meaningShown = false;
    document.getElementById('meaning-box').classList.remove('show');
    document.getElementById('reveal-word').textContent = '';
    setFeedback('', '');

    const available = pool.filter((_, i) => !usedSet.has(i));
    if (available.length === 0) {
        endGame();
        return;
    }

    const idx = pool.indexOf(available[Math.floor(Math.random() * available.length)]);
    usedSet.add(idx);
    currentEntry = pool[idx];
    wordCount++;

    document.getElementById('word-num').textContent = wordCount;

    // Only ONE declaration of inp
    const inp = document.getElementById('spell-input');
    inp.value = '';
    inp.className = '';
    inp.disabled = false;          // Re-enable input for next word
    inp.focus();

    // Animate word transition
    gsap.fromTo('#spell-input', {
        scale: 0.95,
        opacity: 0.5
    }, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(2)'
    });

    setTimeout(() => {
        showSpeechBubble('🎩 Listen carefully…', 1400);
        setTimeout(() => speak(currentEntry.word, 0.72, 0.95), 300);
    }, 300);
}

        // ── Submit ──
        function submitSpelling() {
    if (gameState !== STATE.PLAYING || !currentEntry || submitting) return;

    const inp = document.getElementById('spell-input');
    const attempt = inp.value.trim().toLowerCase();
    if (!attempt) return;

    submitting = true;                    // ← Lock submissions

    if (attempt === currentEntry.word) {
        // ✅ CORRECT
        const cfg = DIFF_CONFIG[difficulty];
        const bonus = meaningShown ? Math.floor(cfg.mult / 2) : cfg.mult;
        score += bonus;
        wordsSolved++;
        updateHUD();
        if (collector) collector.record('matches', 1);

        inp.classList.add('correct');
        setFeedback(`✨ Excellent! +${bonus} House Points!`, 'correct');

        correctCelebration();
        speak('Excellent! Well done, young wizard!', 1.0, 1.1);
        showSpeechBubble('⭐ Splendid work! 10 points to Gryffindor!', 2000);

        // Prevent spam by disabling input
        inp.disabled = true;

        setTimeout(() => {
            submitting = false;
            nextWord();
        }, 1800);
    } else {
        // ❌ WRONG
        lives--;
        updateLives();
        if (collector) collector.record('errors', 1);

        inp.classList.add('wrong');
        inp.value = '';

        wrongAnimation();
        speak('You shall not pass!', 0.75, 0.6);
        showSpeechBubble('🚫 YOU SHALL NOT PASS!!', 2200);
        setFeedback('🚫 YOU SHALL NOT PASS!!', 'wrong');

        setTimeout(() => {
            inp.classList.remove('wrong');
            submitting = false;
        }, 600);

        if (lives <= 0) {
            document.getElementById('reveal-word').textContent = currentEntry.word.toUpperCase();
            setFeedback(`💀 The word was: ${currentEntry.word}`, 'wrong');
            setTimeout(() => {
                submitting = false;
                endGame();
            }, 2400);
        } else {
            setTimeout(() => {
                setFeedback('', '');
                submitting = false;
            }, 2500);
        }
    }
}

        // ── GSAP Correct celebration ──
        function correctCelebration() {
            // Golden flash
            gsap.fromTo('#lightning-flash', {
                opacity: 0,
                background: 'rgba(201,168,76,0.25)'
            }, {
                opacity: 1,
                duration: 0.12,
                yoyo: true,
                repeat: 3,
                ease: 'power2.inOut',
                background: 'rgba(201,168,76,0.15)'
            });
            // Dumbledore bounces
            gsap.to('#dumbledore-svg', {
                y: -20,
                duration: 0.35,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
            // Input grows
            gsap.fromTo('#spell-input', {
                scale: 1
            }, {
                scale: 1.05,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            // Stars burst (wand)
            fireWandSparks(true);
        }

        // ── GSAP Wrong animation — YOU SHALL NOT PASS ──
        function wrongAnimation() {
            // Red screen flash
            const flash = document.getElementById('lightning-flash');
            gsap.set(flash, {
                background: 'rgba(116,0,1,0.4)'
            });
            gsap.fromTo(flash, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.1,
                yoyo: true,
                repeat: 5,
                ease: 'power2.inOut'
            });

            // Dumbledore dramatic raise
            gsap.timeline()
                .to('#dumbledore-svg', {
                    rotation: -8,
                    y: -10,
                    duration: 0.2,
                    ease: 'power2.out'
                })
                .to('#dumbledore-svg', {
                    rotation: 8,
                    duration: 0.15
                })
                .to('#dumbledore-svg', {
                    rotation: -5,
                    duration: 0.15
                })
                .to('#dumbledore-svg', {
                    rotation: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'elastic.out(1,0.5)'
                });

            // Screen shake
            gsap.fromTo('.main-wrapper', {
                x: 0
            }, {
                x: 12,
                duration: 0.08,
                yoyo: true,
                repeat: 7,
                ease: 'power2.inOut',
                onComplete: () => gsap.set('.main-wrapper', {
                    x: 0
                })
            });

            // Dark sparks
            fireWandSparks(false);
        }

        // ── Wand spark particle burst ──
        function fireWandSparks(isGood = true) {
            const canvas = document.getElementById('sparks-canvas');
            const ctx = canvas.getContext('2d');
            // Approximate wand tip position on screen
            const wandEl = document.getElementById('dumbledore-svg');
            if (!wandEl) return;
            const rect = wandEl.getBoundingClientRect();
            // Wand tip is at roughly 97% x, 33% y of the SVG
            const wx = rect.left + rect.width * 0.97;
            const wy = rect.top + rect.height * 0.33;

            const color = isGood ? ['#c9a84c', '#f0d080', '#fff9c4', '#ffcc00'] : ['#ae0001', '#ff3333', '#ff6600', '#ff0000'];
            const count = isGood ? 20 : 24;

            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.5;
                const speed = 2 + Math.random() * 4;
                const sparks = {
                    x: wx,
                    y: wy,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 2,
                    life: 1,
                    col: color[Math.floor(Math.random() * color.length)],
                    r: 1.5 + Math.random() * 3
                };
                animateSpark(ctx, sparks);
            }
        }

        function animateSpark(ctx, s) {
            if (s.life <= 0) return;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * s.life, 0, Math.PI * 2);
            ctx.fillStyle = s.col + Math.floor(s.life * 255).toString(16).padStart(2, '0');
            ctx.fill();
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.15;
            s.life -= 0.03;
            s.r *= 0.97;
            requestAnimationFrame(() => animateSpark(ctx, s));
        }

        // ── Show meaning ──
        function showMeaning() {
            if (!currentEntry || gameState !== STATE.PLAYING) return;
            meaningShown = true;
            hintsUsed++;
            if (collector) collector.record('hints', 1);
            document.getElementById('meaning-text').textContent = currentEntry.meaning;
            const box = document.getElementById('meaning-box');
            box.classList.add('show');
            gsap.fromTo(box, {
                y: -10,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'back.out(2)'
            });
            setFeedback('📜 Half points for this word…', 'wrong');
            setTimeout(() => setFeedback('', ''), 1800);
            showSpeechBubble('📜 A hint from the Headmaster…', 2000);
        }

        // ── Skip ──
        function skipWord() {
            if (gameState !== STATE.PLAYING) return;
            document.getElementById('reveal-word').textContent = currentEntry ? currentEntry.word.toUpperCase() : '';
            wordsSkipped++;
            if (collector) collector.record('errors', 1);
            setFeedback(`Skipped — the word was: ${currentEntry?.word || ''}`, 'wrong');
            showSpeechBubble('Onwards, young wizard…', 1500);
            setTimeout(() => nextWord(), 1500);
        }

        // ── Lives ──
        function updateLives() {
            const cfg = DIFF_CONFIG[difficulty];
            for (let i = 0; i < cfg.maxLives; i++) {
                const el = document.getElementById(`life-${i}`);
                if (!el) continue;
                const isLost = i >= lives;
                el.classList.toggle('lost', isLost);
                if (isLost) gsap.fromTo(el, {
                    scale: 1.3
                }, {
                    scale: 0.7,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        }

        function updateHUD() {
            const el = document.getElementById('hud-score');
            gsap.fromTo(el, {
                scale: 1.4,
                color: '#f0d080'
            }, {
                scale: 1,
                color: '#f0d080',
                duration: 0.4,
                ease: 'back.out(2)'
            });
            el.textContent = score;
        }

        function setFeedback(msg, cls) {
            const el = document.getElementById('feedback-msg');
            el.textContent = msg;
            el.className = cls || '';
            if (msg) gsap.fromTo(el, {
                scale: 0.8,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: 'back.out(3)'
            });
        }

        // ── End game ──
        async function endGame() {
            if (gameState !== STATE.PLAYING) return;
            gameState = STATE.DONE;
            speechSynthesis.cancel();
            if (collector) await collector.flush();

            let emoji, title;
            if (wordsSolved >= 15) {
                emoji = '🏆';
                title = 'Spelling Champion!';
            } else if (wordsSolved >= 8) {
                emoji = '⭐';
                title = 'Outstanding Wizard!';
            } else if (wordsSolved >= 4) {
                emoji = '🎩';
                title = 'Acceptable, young one!';
            } else {
                emoji = '💀';
                title = 'Back to the Library!';
            }

            const cfg = DIFF_CONFIG[difficulty];
            document.getElementById('result-emoji').textContent = emoji;
            document.getElementById('result-title').textContent = title;
            document.getElementById('result-score-display').textContent = `House Points: ${score}`;
            document.getElementById('result-detail').textContent =
                `${wordsSolved} correct · ${wordsSkipped} skipped · ${hintsUsed} hint${hintsUsed!==1?'s':''} · ${cfg.label}`;

            const overlay = document.getElementById('result-overlay');
            overlay.classList.add('show');
            gsap.fromTo(overlay, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.fromTo('.result-crest', {
                scale: 0,
                rotation: -30
            }, {
                scale: 1,
                rotation: 0,
                duration: 0.9,
                delay: 0.2,
                ease: 'elastic.out(1, 0.5)'
            });
            gsap.fromTo('.result-title', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: 0.4
            });
            gsap.fromTo('.result-score', {
                y: 20,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.6
            });

            await submitScore(score, Math.max(3, wordCount * 5));
            gameState = STATE.SAVED;
        }

        async function submitScore(points, completionTime) {
            const badge = document.getElementById('submitting-badge');
            badge.classList.add('show');
            try {
                await fetch(`../../../games/spelling_bee/spelling_bee_backend.php?action=score`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        session_id: serverSessionId,
                        points,
                        completion_time: completionTime,
                        difficulty
                    })
                });
            } catch (e) {} finally {
                badge.classList.remove('show');
            }
        }

        function resetToMenu() {
            const overlay = document.getElementById('result-overlay');
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    overlay.classList.remove('show');
                    const gameEl = document.getElementById('screen-game');
                    const diffEl = document.getElementById('screen-difficulty');
                    gsap.to(gameEl, {
                        opacity: 0,
                        y: 40,
                        duration: 0.4,
                        onComplete: () => {
                            gameEl.style.display = 'none';
                            diffEl.style.display = 'flex';
                            gsap.fromTo(diffEl, {
                                opacity: 0,
                                y: -40
                            }, {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                ease: 'back.out(1.4)'
                            });
                        }
                    });
                }
            });
            gameState = STATE.INIT;
            speechSynthesis.cancel();
        }

        function goMenu() {
            window.location.href = '../../game-menu/menu.php';
        }

        // ── Keyboard ──
        document.getElementById('spell-input').addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitSpelling();
            }
        });

        // ── Shuffle ──
        function shuffle(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        // ── Spark canvas setup ──
        (function setupCanvas() {
            const c = document.getElementById('sparks-canvas');

            function resize() {
                c.width = window.innerWidth;
                c.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);
        })();

        // ── Candle float animations ──
        function animateCandles() {
            ['candle-1', 'candle-2', 'candle-3', 'candle-4'].forEach((id, i) => {
                const el = document.getElementById(id);
                if (!el) return;
                gsap.to(el, {
                    y: -20 - i * 8,
                    duration: 2.5 + i * 0.4,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: i * 0.5
                });
                gsap.to(el, {
                    x: (i % 2 === 0 ? 8 : -8),
                    duration: 3.2 + i * 0.3,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: i * 0.3
                });
            });
        }

        // ── Wand cursor trail ──
        const trails = [
            document.getElementById('wand-trail-1'),
            document.getElementById('wand-trail-2'),
            document.getElementById('wand-trail-3')
        ];
        let mx = 0,
            my = 0;
        let trail1 = {
                x: 0,
                y: 0
            },
            trail2 = {
                x: 0,
                y: 0
            },
            trail3 = {
                x: 0,
                y: 0
            };

        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
        });

        (function trailLoop() {
            const lerp = (a, b, t) => a + (b - a) * t;
            trail1.x = lerp(trail1.x, mx, 0.35);
            trail1.y = lerp(trail1.y, my, 0.35);
            trail2.x = lerp(trail2.x, trail1.x, 0.25);
            trail2.y = lerp(trail2.y, trail1.y, 0.25);
            trail3.x = lerp(trail3.x, trail2.x, 0.18);
            trail3.y = lerp(trail3.y, trail2.y, 0.18);

            if (trails[0]) {
                trails[0].style.left = trail1.x + 'px';
                trails[0].style.top = trail1.y + 'px';
                trails[0].style.opacity = '0.7';
            }
            if (trails[1]) {
                trails[1].style.left = trail2.x + 'px';
                trails[1].style.top = trail2.y + 'px';
                trails[1].style.opacity = '0.45';
            }
            if (trails[2]) {
                trails[2].style.left = trail3.x + 'px';
                trails[2].style.top = trail3.y + 'px';
                trails[2].style.opacity = '0.25';
            }

            requestAnimationFrame(trailLoop);
        })();

        // ── Entry GSAP animations ──
        if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.fromTo('#topbar', {
                y: -50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            });
            gsap.fromTo('.school-crest', {
                scale: 0,
                rotation: -20
            }, {
                scale: 1,
                rotation: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.3
            });
            gsap.fromTo('.screen-title', {
                y: 40,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.9,
                delay: 0.5,
                ease: 'back.out(1.6)'
            });
            gsap.fromTo('.screen-subtitle', {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.8,
                delay: 0.8
            });
            gsap.fromTo('#diff-panel', {
                y: 60,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.6,
                ease: 'back.out(1.4)'
            });
            gsap.fromTo('.diff-card', {
                y: 40,
                rotation: -3,
                opacity: 0
            }, {
                y: 0,
                rotation: 0,
                opacity: 1,
                stagger: 0.12,
                delay: 0.9,
                ease: 'back.out(1.8)',
                duration: 0.7
            });

            // Candles on load
            animateCandles();

            // Moon gentle pulse
            gsap.to('#moon', {
                scale: 1.06,
                duration: 4,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });

            // Dumbledore idle float on diff screen
            gsap.to('.school-crest', {
                y: -8,
                duration: 2.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        }