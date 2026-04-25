/* ---- STARS CANVAS ---- */
(function () {
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < 180; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3,
                a: Math.random(),
                speed: Math.random() * 0.004 + 0.002,
                offset: Math.random() * Math.PI * 2
            });
        }
    }

    function drawStars(t) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            const alpha = (Math.sin(t * s.speed + s.offset) + 1) / 2 * 0.7 + 0.1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fill();
        });
    }

    let raf;

    function loop(t) {
        drawStars(t * 0.001);
        raf = requestAnimationFrame(loop);
    }

    resize();
    initStars();
    requestAnimationFrame(loop);
    window.addEventListener('resize', () => {
        resize();
        initStars();
    });
})();


/* ---- FLOATING SPARKLES ---- */
(function () {
    const field = document.getElementById('sparkleField');
    const chars = ['✦', '✧', '✴', '✸', '✹', '✺', '✻'];
    const colors = ['#c4b5fd', '#f0abfc', '#d946ef', '#a78bfa', '#ffffff'];

    for (let i = 0; i < 40; i++) {
        const sp = document.createElement('div');
        sp.className = 'sp';
        sp.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            --dur: ${4 + Math.random() * 8}s;
            --delay: ${Math.random() * 10}s;
            --size: ${8 + Math.random() * 14}px;
            --color: ${colors[Math.floor(Math.random() * colors.length)]};
        `;

        const char = chars[Math.floor(Math.random() * chars.length)];
        sp.setAttribute('data-char', char);

        const inner = document.createElement('span');
        inner.textContent = char;
        inner.style.cssText = `
            position: absolute;
            font-size: ${8 + Math.random() * 14}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%; left: 50%;
            transform: translate(-50%,-50%);
            line-height: 1;
            opacity: inherit;
            animation: twinkle ${1.5 + Math.random() * 3}s ${Math.random() * 3}s ease-in-out infinite alternate;
        `;
        sp.appendChild(inner);
        field.appendChild(sp);
    }
})();


/* ---- HEADER SCROLL ---- */
(function () {
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    });
})();


/* ---- MOBILE MENU ---- */
(function () {
    const btn  = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    /* Give each list item its stagger index */
    menu.querySelectorAll('li').forEach((li, i) => {
        li.style.setProperty('--item-index', i);
    });

    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('active', !expanded);
        document.body.style.overflow = !expanded ? 'hidden' : '';
    });

    /* Close menu when any link is clicked */
    menu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            btn.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
})();


/* ---- FEATURES GALLERY ---- */
(function () {
    try {
        const track   = document.querySelector('.gallery-track');
        const cards   = document.querySelectorAll('.gallery-card');
        const dots    = document.querySelectorAll('.gallery-dots .dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playBtn = document.getElementById('galleryPlay');

        if (!track || !cards.length) return;

        let current = 0;
        let playing = true;
        let timer   = null;

        function goTo(index) {
            current = (index + cards.length) % cards.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function startAuto() {
            clearInterval(timer);
            timer = setInterval(() => goTo(current + 1), 3500);
        }

        function stopAuto() {
            clearInterval(timer);
        }

        prevBtn && prevBtn.addEventListener('click', () => {
            goTo(current - 1);
            if (playing) startAuto();
        });

        nextBtn && nextBtn.addEventListener('click', () => {
            goTo(current + 1);
            if (playing) startAuto();
        });

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                playing = !playing;
                playBtn.textContent = playing ? 'Pause' : 'Play';
                playing ? startAuto() : stopAuto();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goTo(i);
                if (playing) startAuto();
            });
        });

        goTo(0);
        startAuto();

    } catch (e) {
        console.warn('Gallery init failed:', e);
    }
})();


/* ---- SCROLL REVEAL ---- */
(function () {
    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('revealed');
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    } catch (e) {
        /* Fallback: reveal everything immediately if observer is unsupported */
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    }
})();