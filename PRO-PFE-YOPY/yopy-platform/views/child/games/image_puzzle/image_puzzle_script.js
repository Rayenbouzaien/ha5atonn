// image_puzzle_script.js

const GAME_ID     = 'image_puzzle';
const SESSION_ID  = '<?= $sessionId ?>';
const BUDDY_ID     = '<?= $buddyId ?>';


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

        const IMAGE_POOL = [
            '../../../../public/images/GAMES/image_puzzle/art1.png',
            '../../../../public/images/GAMES/image_puzzle/art2.jpg',
            '../../../../public/images/GAMES/image_puzzle/art3.jpg',
        ];
        const DIFF_CONFIG = {
            easy: {
                grid: [3, 4],
                diff: 100,
                size: [360, 480],
                time: 0.12
            },
            medium: {
                grid: [4, 5],
                diff: 250,
                size: [400, 500],
                time: 0.10
            },
            hard: {
                grid: [5, 6],
                diff: 500,
                size: [400, 480],
                time: 0.08
            },
        };
        const STATE = {
            INIT: 'INIT',
            PLAYING: 'PLAYING',
            DONE: 'DONE'
        };

        let gameState = STATE.INIT;
        let difficulty = 'easy';
        let moveCount = 0;
        let elapsed = 0;
        let timerInterval = null;
        let collector = null;
        let hintCount = 3;
        let hintPenalty = 0;
        let refGridVisible = false;
        let selectedSlot = null;

        /* ══════════════════════════════════════════
           PAGE ENTRANCE
        ══════════════════════════════════════════ */
        window.addEventListener('load', () => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.out'
                }
            });
            tl.to('#topbar', {
                    y: 0,
                    opacity: 1,
                    duration: .8
                })
                .to('#diff-header', {
                    y: 0,
                    opacity: 1,
                    duration: .7
                }, '-=.3')
                .to('#diff-sub', {
                    y: 0,
                    opacity: 1,
                    duration: .5
                }, '-=.3')
                .to('.diff-card', {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: .6,
                    stagger: .15,
                    ease: 'back.out(1.7)'
                }, '-=.2')
                .to('.floating-star', {
                    scale: 1,
                    opacity: .7,
                    duration: .4,
                    stagger: .08
                }, '-=.4');
        });

        /* cursor + parallax */
        document.addEventListener('mousemove', e => {
            gsap.to('#cursor-glow', {
                x: e.clientX,
                y: e.clientY,
                duration: .6,
                ease: 'power2.out'
            });
            const rx = (e.clientX / innerWidth - .5) * 20,
                ry = (e.clientY / innerHeight - .5) * 12;
            gsap.to('#bg-mid', {
                x: rx,
                y: ry,
                duration: 1.2,
                ease: 'power2.out'
            });
        });
        document.querySelectorAll('.diff-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                gsap.to(card, {
                    rotateY: (e.clientX - r.left - r.width / 2) / r.width * 14,
                    rotateX: -(e.clientY - r.top - r.height / 2) / r.height * 14,
                    duration: .3,
                    ease: 'power2.out',
                    transformPerspective: 800
                });
            });
            card.addEventListener('mouseleave', () => gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: .5,
                ease: 'elastic.out(1,.5)'
            }));
        });

        /* ══════════════════════════════════════════
           START GAME
        ══════════════════════════════════════════ */
        async function startGame(diff) {
            difficulty = diff;
            gameState = STATE.PLAYING;
            hintCount = 3;
            hintPenalty = 0;
            document.getElementById('hint-count').textContent = '3';
            document.getElementById('btn-autostep').disabled = false;

            collector = (typeof BehaviorCollector !== 'undefined') ?
                new BehaviorCollector(GAME_ID) :
                {
                    record: () => {},
                    flush: async () => {}
                };

            try {
                await fetch('../../../games/image_puzzle/image_puzzle_backend.php?action=start', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        difficulty
                    })
                });
            } catch (e) {}

            gsap.to('#screen-diff', {
                opacity: 0,
                scale: .95,
                duration: .4,
                ease: 'power2.in',
                onComplete: () => {
                    document.getElementById('screen-diff').style.display = 'none';
                    gsap.set('#screen-diff', {
                        opacity: 1,
                        scale: 1
                    });
                    document.getElementById('screen-game').style.display = 'flex';
                    gsap.fromTo('#screen-game', {
                        opacity: 0,
                        scale: .96
                    }, {
                        opacity: 1,
                        scale: 1,
                        duration: .5,
                        ease: 'power3.out'
                    });
                    gsap.fromTo('.hud-pill', {
                        y: -30,
                        opacity: 0
                    }, {
                        y: 0,
                        opacity: 1,
                        duration: .5,
                        stagger: .1,
                        ease: 'back.out(2)',
                        delay: .2
                    });
                    gsap.fromTo('#puzzle-wrap', {
                        y: 40,
                        opacity: 0,
                        scale: .9
                    }, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: .6,
                        ease: 'back.out(1.4)',
                        delay: .4
                    });
                    gsap.fromTo('.ref-panel', {
                        x: 40,
                        opacity: 0
                    }, {
                        x: 0,
                        opacity: 1,
                        duration: .5,
                        ease: 'power3.out',
                        delay: .5
                    });
                    gsap.fromTo('.game-sidebar', {
                        x: -40,
                        opacity: 0
                    }, {
                        x: 0,
                        opacity: 1,
                        duration: .5,
                        ease: 'power3.out',
                        delay: .4
                    });
                }
            });

            buildPuzzle(diff);
        }

        /* ══════════════════════════════════════════
           BUILD PUZZLE
        ══════════════════════════════════════════ */
        function buildPuzzle(diff) {
            const cfg = DIFF_CONFIG[diff];
            const img = IMAGE_POOL[Math.floor(Math.random() * IMAGE_POOL.length)];

            /* set reference images */
            document.getElementById('ref-img').src = img;
            document.getElementById('lightbox-img').src = img;

            window.setup.puzzle_fifteen = {
                diff: cfg.diff,
                size: [...cfg.size],
                grid: [...cfg.grid],
                fill: false,
                number: false,
                art: {
                    url: img,
                    ratio: false
                },
                keyBoard: false,
                gamePad: false,
                time: cfg.time,
                style: 'border-radius:7px;cursor:pointer;background-color:rgba(10,18,40,.15);' +
                    'display:grid;align-items:center;justify-items:center;' +
                    'font-family:Cinzel,serif;color:#FFD166;font-size:15px;'
            };

            const container = document.getElementById('fifteen');
            container.innerHTML = '';

            document.getElementById('puzzle-wrap').style.width = cfg.size[0] + 'px';
            document.getElementById('puzzle-wrap').style.height = cfg.size[1] + 'px';

            window.p = window.setup.puzzle_fifteen;
            window.freeslot = [];
            window.size = [];
            window.m = [];
            window.f = container;
            window.o = undefined;

            ceation_slots();
            tagSlots();
            setupFreeSwap();
            buildRefGrids(cfg.grid[0], cfg.grid[1]);

            moveCount = 0;
            elapsed = 0;
            selectedSlot = null;
            updateHUD();
            updateProgress();
            startTimer();
        }

        /* ══════════════════════════════════════════
           TAG SLOTS WITH HOME POSITION
        ══════════════════════════════════════════ */
        function tagSlots() {
            const gw = window.p.grid[0] + 1;
            const gh = window.p.grid[1] + 1;
            const tw = window.p.size[0] / gw;
            const th = window.p.size[1] / gh;

            Array.from(document.getElementById('fifteen').children).forEach(slot => {
                const bp = slot.style.backgroundPosition || '';
                const m = bp.match(/([-\d.]+)px\s+([-\d.]+)px/);
                if (m) {
                    const bx = parseFloat(m[1]),
                        by = parseFloat(m[2]);
                    const hx = Math.round(Math.abs(bx) / tw);
                    const hy = Math.round(Math.abs(by) / th);
                    slot.dataset.homeLeft = hx * tw;
                    slot.dataset.homeTop = hy * th;
                    slot.dataset.tileNum = hy * gw + hx + 1;
                    slot.dataset.isBlank = '0';
                } else {
                    slot.dataset.homeLeft = 'blank';
                    slot.dataset.homeTop = 'blank';
                    slot.dataset.isBlank = '1';
                }
            });
        }

        /* ══════════════════════════════════════════
           FREE SWAP — replace engine click handlers
        ══════════════════════════════════════════ */
        function setupFreeSwap() {
            const container = document.getElementById('fifteen');
            /* clone to strip engine listeners */
            Array.from(container.children).forEach(slot => {
                const cl = slot.cloneNode(true);
                container.replaceChild(cl, slot);
            });
            /* add smooth transition + our listener */
            Array.from(container.children).forEach(slot => {
                slot.style.transition = 'left .28s cubic-bezier(.4,0,.2,1), top .28s cubic-bezier(.4,0,.2,1)';
                slot.addEventListener('click', () => handleSlotClick(slot));
                slot.addEventListener('mouseenter', () => {
                    if (slot !== selectedSlot) gsap.to(slot, {
                        scale: 1.05,
                        duration: .15
                    });
                });
                slot.addEventListener('mouseleave', () => {
                    if (slot !== selectedSlot) gsap.to(slot, {
                        scale: 1,
                        duration: .15
                    });
                });
            });
        }

        function handleSlotClick(slot) {
            if (gameState !== STATE.PLAYING) return;
            if (!selectedSlot) {
                selectedSlot = slot;
                slot.classList.add('tile-selected');
                gsap.to(slot, {
                    scale: 1.1,
                    duration: .2,
                    ease: 'back.out(2)'
                });
                document.getElementById('swap-toast').classList.add('show');
                document.getElementById('btn-cancel').style.display = 'flex';
            } else if (selectedSlot === slot) {
                clearSelection();
            } else {
                swapTiles(selectedSlot, slot);
                clearSelection();
            }
        }

        function clearSelection() {
            if (selectedSlot) {
                selectedSlot.classList.remove('tile-selected');
                gsap.to(selectedSlot, {
                    scale: 1,
                    duration: .2
                });
                selectedSlot = null;
            }
            document.getElementById('swap-toast').classList.remove('show');
            document.getElementById('btn-cancel').style.display = 'none';
        }

        /* ══════════════════════════════════════════
           SWAP TWO TILES
        ══════════════════════════════════════════ */
        function swapTiles(a, b, silent) {
            const gw = window.p.grid[0] + 1,
                gh = window.p.grid[1] + 1;
            const tw = window.p.size[0] / gw,
                th = window.p.size[1] / gh;
            const ax = parseFloat(a.style.left),
                ay = parseFloat(a.style.top);
            const bx = parseFloat(b.style.left),
                by = parseFloat(b.style.top);

            gsap.to(a, {
                left: bx,
                top: by,
                duration: .3,
                ease: 'power2.inOut'
            });
            gsap.to(b, {
                left: ax,
                top: ay,
                duration: .3,
                ease: 'power2.inOut',
                onComplete: () => {
                    const aGX = Math.round(ax / tw),
                        aGY = Math.round(ay / th);
                    const bGX = Math.round(bx / tw),
                        bGY = Math.round(by / th);
                    const aV = (window.m[aGY] || [])[aGX];
                    const bV = (window.m[bGY] || [])[bGX];
                    if (window.m[aGY]) window.m[aGY][aGX] = bV;
                    if (window.m[bGY]) window.m[bGY][bGX] = aV;
                    if (!silent) {
                        moveCount++;
                        updateHUD();
                        updateProgress();
                        gsap.fromTo('#hud-moves', {
                            scale: 1.35
                        }, {
                            scale: 1,
                            duration: .3,
                            ease: 'back.out(2)'
                        });
                        if (typeof collector !== 'undefined') collector.record('move_count', moveCount);
                    }
                    checkWin();
                }
            });

            /* mini particles */
            if (!silent) {
                const wr = document.getElementById('puzzle-wrap').getBoundingClientRect();
                spawnParticles((ax + bx) / 2 + wr.left, (ay + by) / 2 + wr.top);
            }
        }

        function spawnParticles(cx, cy) {
            const COLS = ['#FFD166', '#7BDFFF', '#2ED573', '#FF6B35', '#B8A0FF'];
            for (let i = 0; i < 7; i++) {
                const el = document.createElement('div');
                el.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:6px;height:6px;border-radius:50%;background:${COLS[i%COLS.length]};pointer-events:none;z-index:9999;transform:translate(-50%,-50%)`;
                document.body.appendChild(el);
                const ang = (i / 7) * Math.PI * 2;
                gsap.to(el, {
                    x: Math.cos(ang) * 50,
                    y: Math.sin(ang) * 50,
                    opacity: 0,
                    scale: .3,
                    duration: .5 + Math.random() * .3,
                    ease: 'power2.out',
                    onComplete: () => el.remove()
                });
            }
        }

        /* ══════════════════════════════════════════
           WIN CHECK (manual — no engine dependency)
        ══════════════════════════════════════════ */
        function checkWin() {
            const gw = window.p.grid[0] + 1,
                gh = window.p.grid[1] + 1;
            let expected = 1,
                won = true;
            outer: for (let y = 0; y < gh; y++)
                for (let x = 0; x < gw; x++) {
                    const v = (window.m[y] || [])[x];
                    if (v === 0 || v === undefined) {
                        expected++;
                        continue;
                    }
                    if (v !== expected) {
                        won = false;
                        break outer;
                    }
                    expected++;
                }
            if (won) setTimeout(onWin, 300);
        }

        /* ══════════════════════════════════════════
           HINT SYSTEM
        ══════════════════════════════════════════ */
        function highlightTiles() {
            const slots = Array.from(document.getElementById('fifteen').children);
            slots.forEach(s => {
                s.classList.remove('tile-correct', 'tile-wrong');
                if (s.dataset.isBlank === '1') return;
                const dl = Math.abs(parseFloat(s.style.left) - parseFloat(s.dataset.homeLeft));
                const dt = Math.abs(parseFloat(s.style.top) - parseFloat(s.dataset.homeTop));
                s.classList.add(dl < 2 && dt < 2 ? 'tile-correct' : 'tile-wrong');
            });
            gsap.fromTo('.tile-wrong', {
                opacity: .4
            }, {
                opacity: 1,
                duration: .15,
                repeat: 3,
                yoyo: true
            });
            gsap.fromTo('.tile-correct', {
                scale: .96
            }, {
                scale: 1,
                duration: .15,
                repeat: 3,
                yoyo: true,
                ease: 'power1.inOut'
            });
            setTimeout(() => slots.forEach(s => s.classList.remove('tile-correct', 'tile-wrong')), 4500);
        }

        function autoSolveStep() {
            if (hintCount <= 0 || gameState !== STATE.PLAYING) return;
            const slots = Array.from(document.getElementById('fifteen').children);
            let best = null,
                bestDist = -1;
            slots.forEach(s => {
                if (s.dataset.isBlank === '1') return;
                const d = Math.abs(parseFloat(s.style.left) - parseFloat(s.dataset.homeLeft)) +
                    Math.abs(parseFloat(s.style.top) - parseFloat(s.dataset.homeTop));
                if (d > bestDist) {
                    bestDist = d;
                    best = s;
                }
            });
            if (!best || bestDist < 2) return;

            const hl = parseFloat(best.dataset.homeLeft),
                ht = parseFloat(best.dataset.homeTop);
            const target = slots.find(s => Math.abs(parseFloat(s.style.left) - hl) < 2 && Math.abs(parseFloat(s.style.top) - ht) < 2);

            hintCount--;
            hintPenalty += 50;
            document.getElementById('hint-count').textContent = hintCount;
            if (hintCount <= 0) document.getElementById('btn-autostep').disabled = true;

            /* highlight both tiles before swapping */
            gsap.to(best, {
                scale: 1.12,
                duration: .25
            });
            if (target) gsap.to(target, {
                scale: 1.12,
                duration: .25
            });

            setTimeout(() => {
                gsap.to(best, {
                    scale: 1,
                    duration: .2
                });
                if (target) gsap.to(target, {
                    scale: 1,
                    duration: .2
                });
                if (target) swapTiles(best, target, true); // silent=true, moveCount handled below
                else {
                    gsap.to(best, {
                        left: hl,
                        top: ht,
                        duration: .3,
                        ease: 'power2.inOut'
                    });
                }
                /* auto-step costs but doesn't add a move */
                updateHUD();
            }, 350);
        }

        function toggleRef() {
            const p = document.getElementById('ref-panel');
            const visible = parseFloat(p.style.opacity || '1') > 0.5;
            gsap.to(p, {
                opacity: visible ? 0.12 : 1,
                duration: .3
            });
        }

        function toggleRefGrid() {
            refGridVisible = !refGridVisible;
            document.getElementById('ref-grid-overlay').classList.toggle('show', refGridVisible);
            document.getElementById('lb-grid-table').style.opacity = refGridVisible ? '1' : '0';
            document.getElementById('btn-ref-grid').textContent = refGridVisible ? '# Masquer' : '# Numéros';
        }

        function openLightbox() {
            document.getElementById('ref-lightbox').classList.add('show');
            gsap.fromTo('#ref-lightbox > *', {
                y: 20,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: .4,
                stagger: .1,
                ease: 'power2.out'
            });
        }

        function closeLightbox() {
            document.getElementById('ref-lightbox').classList.remove('show');
        }

        /* ══════════════════════════════════════════
           BUILD REFERENCE GRID NUMBER OVERLAYS
        ══════════════════════════════════════════ */
        function buildRefGrids(cols, rows) {
            const gw = cols + 1,
                gh = rows + 1;

            function fill(el) {
                el.innerHTML = '';
                el.style.gridTemplateColumns = `repeat(${gw},1fr)`;
                el.style.gridTemplateRows = `repeat(${gh},1fr)`;
                for (let r = 0; r < gh; r++)
                    for (let c = 0; c < gw; c++) {
                        const cell = document.createElement('div');
                        cell.className = el.classList.contains('ref-grid-overlay') ? 'ref-grid-cell' : 'lb-grid-cell';
                        const num = r * gw + c + 1;
                        if (num <= gw * gh - 1) cell.textContent = num;
                        el.appendChild(cell);
                    }
            }
            fill(document.getElementById('ref-grid-overlay'));
            const lb = document.getElementById('lb-grid-table');
            lb.innerHTML = '';
            lb.style.gridTemplateColumns = `repeat(${gw},1fr)`;
            lb.style.gridTemplateRows = `repeat(${gh},1fr)`;
            for (let r = 0; r < gh; r++)
                for (let c = 0; c < gw; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'lb-grid-cell';
                    const num = r * gw + c + 1;
                    if (num <= gw * gh - 1) cell.textContent = num;
                    lb.appendChild(cell);
                }
            lb.style.opacity = refGridVisible ? '1' : '0';
        }

        /* ══════════════════════════════════════════
           PROGRESS TRACKER
        ══════════════════════════════════════════ */
        function updateProgress() {
            const slots = Array.from(document.getElementById('fifteen').children);
            let correct = 0,
                total = 0;
            slots.forEach(s => {
                if (s.dataset.isBlank === '1') return;
                total++;
                if (Math.abs(parseFloat(s.style.left) - parseFloat(s.dataset.homeLeft)) < 2 &&
                    Math.abs(parseFloat(s.style.top) - parseFloat(s.dataset.homeTop)) < 2) correct++;
            });
            const pct = total ? (correct / total) * 100 : 0;
            document.getElementById('progress-fill').style.width = pct + '%';
            document.getElementById('progress-count').textContent = `${correct} / ${total}`;
        }

        /* ══════════════════════════════════════════
           TIMER / SCORE / HUD
        ══════════════════════════════════════════ */
        function startTimer() {
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                elapsed++;
                document.getElementById('hud-time').textContent =
                    `${String(Math.floor(elapsed/60)).padStart(2,'0')}:${String(elapsed%60).padStart(2,'0')}`;
            }, 1000);
        }

        function calcScore() {
            return Math.max(100, 1000 - moveCount * 5 - hintPenalty);
        }

        function updateHUD() {
            const score = calcScore();
            document.getElementById('hud-moves').textContent = moveCount;
            document.getElementById('hud-score').textContent = score;
            document.getElementById('hud-score-top').textContent = score;
        }

        /* ══════════════════════════════════════════
           WIN HANDLER
        ══════════════════════════════════════════ */
        async function onWin() {
            if (gameState !== STATE.PLAYING) return;
            gameState = STATE.DONE;
            clearInterval(timerInterval);
            clearSelection();
            if (collector) {
                collector.record('completion_rate', 1);
                collector.record('session_duration', elapsed);
                await collector.flush();
            }
            const score = calcScore();
            document.getElementById('res-score').textContent = `Score : ${score}`;
            document.getElementById('res-detail').textContent = `${moveCount} mouvement${moveCount>1?'s':''} · ${formatTime(elapsed)}`;
            document.querySelector('.res-stars').textContent = score >= 900 ? '⭐⭐⭐' : score >= 600 ? '⭐⭐' : '⭐';
            document.getElementById('result-overlay').classList.add('show');
            const tl = gsap.timeline();
            tl.fromTo('#res-container', {
                    scale: .5,
                    opacity: 0,
                    rotateY: 30
                }, {
                    scale: 1,
                    opacity: 1,
                    rotateY: 0,
                    duration: .8,
                    ease: 'back.out(1.7)'
                })
                .fromTo('.res-trophy', {
                    scale: 0,
                    rotation: -30
                }, {
                    scale: 1,
                    rotation: 0,
                    duration: .6,
                    ease: 'elastic.out(1,.5)'
                }, '-=.3')
                .fromTo('.res-stars', {
                    scale: 0
                }, {
                    scale: 1,
                    duration: .4,
                    ease: 'back.out(2)'
                }, '-=.2')
                .fromTo('.res-title', {
                    y: 30,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: .5
                }, '-=.2')
                .fromTo('.res-score', {
                    y: 20,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: .4
                }, '-=.2')
                .fromTo('.res-btns', {
                    y: 20,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: .4
                }, '-=.1');
            launchConfetti();
            await submitScore(score, Math.max(3, elapsed));
        }

        /* ══════════════════════════════════════════
           CONFETTI (Mario Party style)
        ══════════════════════════════════════════ */
        function launchConfetti() {
            const cvs = document.getElementById('confetti-canvas');
            cvs.width = innerWidth;
            cvs.height = innerHeight;
            const ctx = cvs.getContext('2d');
            const COLS = ['#FFD166', '#FF6B35', '#2ED573', '#7BDFFF', '#FF4757', '#FFE566', '#B8A0FF'];
            const pieces = Array.from({
                length: 130
            }, () => ({
                x: Math.random() * innerWidth,
                y: -20 - Math.random() * 200,
                vx: (Math.random() - .5) * 4,
                vy: 2 + Math.random() * 5,
                size: 5 + Math.random() * 10,
                rot: Math.random() * Math.PI * 2,
                vrot: (Math.random() - .5) * .2,
                color: COLS[Math.floor(Math.random() * COLS.length)],
                shape: ['rect', 'circle', 'star'][Math.floor(Math.random() * 3)],
                alpha: 1
            }));
            let frame = 0;
            (function draw() {
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                pieces.forEach(p => {
                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    ctx.fillStyle = p.color;
                    if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                    else if (p.shape === 'circle') {
                        ctx.beginPath();
                        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        ctx.beginPath();
                        for (let i = 0; i < 5; i++) {
                            const a = (i * 4 * Math.PI / 5) - Math.PI / 2,
                                b = a + 2 * Math.PI / 5;
                            i === 0 ? ctx.moveTo(Math.cos(a) * p.size / 2, Math.sin(a) * p.size / 2) : ctx.lineTo(Math.cos(a) * p.size / 2, Math.sin(a) * p.size / 2);
                            ctx.lineTo(Math.cos(b) * p.size / 4, Math.sin(b) * p.size / 4);
                        }
                        ctx.closePath();
                        ctx.fill();
                    }
                    ctx.restore();
                    p.x += p.vx;
                    p.y += p.vy;
                    p.rot += p.vrot;
                    p.vy += .08;
                    if (p.y > innerHeight + 20) p.alpha -= .02;
                });
                if (++frame < 300) requestAnimationFrame(draw);
                else ctx.clearRect(0, 0, cvs.width, cvs.height);
            })();
        }

        /* ══════════════════════════════════════════
           SUBMIT / NAV / UTILS
        ══════════════════════════════════════════ */
        async function submitScore(points, duration) {
            const badge = document.getElementById('saving');
            badge.classList.add('show');
            try {
                const res = await fetch('../../../../games/image_puzzle/image_puzzle_backend.php?action=score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        session_id: SESSION_ID,
                        points,
                        completion_time: duration,
                        difficulty
                    })
                });
            } catch (e) {
                console.warn('Score submit failed:', e);
            } finally {
                badge.classList.remove('show');
            }
        }

        function resetToMenu() {
            gsap.to('#result-overlay', {
                opacity: 0,
                duration: .4,
                ease: 'power2.in',
                onComplete: () => {
                    document.getElementById('result-overlay').classList.remove('show');
                    gsap.set('#result-overlay', {
                        opacity: 1
                    });
                    document.getElementById('screen-game').style.display = 'none';
                    document.getElementById('screen-diff').style.display = 'flex';
                    gsap.fromTo('#screen-diff', {
                        opacity: 0,
                        scale: .96
                    }, {
                        opacity: 1,
                        scale: 1,
                        duration: .5,
                        ease: 'power3.out'
                    });
                    gsap.fromTo('.diff-card', {
                        y: 40,
                        opacity: 0,
                        scale: .9
                    }, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: .5,
                        stagger: .1,
                        ease: 'back.out(1.7)'
                    });
                }
            });
            clearInterval(timerInterval);
            gameState = STATE.INIT;
            moveCount = 0;
            selectedSlot = null;
        }

        function goMenu() {
            window.location.href = '../../game-menu/menu.php';
        }

        function formatTime(s) {
            return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
        }

        /* ══════════════════════════════════════════
           AMBIENT PARTICLES
        ══════════════════════════════════════════ */
        (function() {
            const cvs = document.getElementById('particles'),
                ctx = cvs.getContext('2d');
            const T = [{
                color: '#FFD166',
                glow: 'rgba(255,209,102,.6)',
                size: 3
            }, {
                color: '#7BDFFF',
                glow: 'rgba(123,223,255,.5)',
                size: 2
            }, {
                color: '#4ECDC4',
                glow: 'rgba(78,205,196,.4)',
                size: 2.5
            }, {
                color: '#B8A0FF',
                glow: 'rgba(184,160,255,.4)',
                size: 2
            }, {
                color: '#2ED573',
                glow: 'rgba(46,213,115,.3)',
                size: 1.5
            }];
            const pts = Array.from({
                length: 60
            }, () => {
                const t = T[Math.floor(Math.random() * T.length)];
                return {
                    x: Math.random() * innerWidth,
                    y: Math.random() * innerHeight,
                    r: t.size + Math.random(),
                    vx: (Math.random() - .5) * .5,
                    vy: -.3 - Math.random() * .4,
                    color: t.color,
                    glow: t.glow,
                    life: Math.random()
                };
            });

            function resize() {
                cvs.width = innerWidth;
                cvs.height = innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            function draw() {
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                pts.forEach(p => {
                    ctx.save();
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = p.glow;
                    ctx.globalAlpha = .4 + Math.sin(p.life * Math.PI * 2) * .2;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                    ctx.restore();
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life += .004;
                    if (p.y < -10) {
                        p.y = innerHeight + 10;
                        p.x = Math.random() * innerWidth;
                    }
                    if (p.x < -10 || p.x > cvs.width + 10) p.vx *= -1;
                });
                requestAnimationFrame(draw);
            }
            if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches) draw();
        })();