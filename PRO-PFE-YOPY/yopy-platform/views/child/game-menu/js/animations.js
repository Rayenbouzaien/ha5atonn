// assets/js/animations.js - Bulletproof version

function startMainAnims() {

    // Topbar (always safe)
    gsap.from('.topbar', { 
        y: -80, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
    });

    // Buddy Panel Animations (safe)
    gsap.from('#buddyPanel .buddy-rank-badge', { opacity:0, x:-30, duration:0.7, ease:'back.out(1.7)', delay:0.2 });
    gsap.from('.buddy-name', { opacity:0, x:-20, duration:0.7, ease:'power3.out', delay:0.3 });
    gsap.from('.buddy-element', { opacity:0, duration:0.5, delay:0.4 });
    gsap.from('#buddyFaceWrap', { opacity:0, scale:0.5, rotation:-10, duration:0.9, ease:'back.out(2)', delay:0.5 });
    gsap.from('.speech-bubble', { opacity:0, y:20, duration:0.6, ease:'power3.out', delay:0.8 });
    gsap.from('.stat-row', { opacity:0, x:-20, stagger:0.1, duration:0.5, ease:'power2.out', delay:1 });
    gsap.from('.change-btn', { opacity:0, y:10, duration:0.5, delay:1.4 });

    // Games Header - with existence checks
    const gamesTitle = document.querySelector('.games-title');
    if (gamesTitle) {
        gsap.from(gamesTitle, { 
            opacity: 0, 
            y: -20, 
            duration: 0.7, 
            ease: 'power3.out', 
            delay: 0.4 
        });
    }

    const totalStars = document.querySelector('.total-stars');
    if (totalStars) {
        gsap.from(totalStars, { 
            opacity: 0, 
            scale: 0.8, 
            duration: 0.6, 
            ease: 'back.out(2)', 
            delay: 0.6 
        });
    }

    // Game Cards
    const gameCards = document.querySelectorAll('.game-card');
    if (gameCards.length > 0) {
        gsap.to(gameCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: { amount: 0.6, from: 'start' },
            duration: 0.7,
            ease: 'back.out(1.5)',
            delay: 0.5,
            onComplete: animateBars
        });
    } else {
        console.warn("No .game-card elements found for animation");
    }

    // Panel corners
    gsap.from('.panel-corner', { 
        opacity:0, 
        scale:0, 
        stagger:0.1, 
        duration:0.4, 
        ease:'back.out(2)', 
        delay:0.3 
    });

    // Floating orbs
    gsap.to('.float-orb', { 
        opacity:0.22, 
        scale:1.08, 
        duration:4, 
        ease:'sine.inOut', 
        yoyo:true, 
        repeat:-1, 
        stagger:0.8 
    });

    // Horizon
    gsap.from('#horizon', { 
        opacity:0, 
        y:30, 
        duration:1.2, 
        ease:'power2.out', 
        delay:0.3 
    });

    // Stars layer
    gsap.to('#starsLayer', { 
        opacity:0.85, 
        duration:2, 
        ease:'sine.inOut', 
        yoyo:true, 
        repeat:-1 
    });

    // Logo shimmer
    gsap.to('.tb-logo', { 
        filter: 'brightness(1.3)', 
        duration: 2, 
        ease: 'sine.inOut', 
        yoyo: true, 
        repeat: -1 
    });

    // Card hover effects (only on existing cards)
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.card-icon-svg'), { 
                y: -6, scale: 1.06, duration: 0.3, ease: 'power2.out' 
            });
            const rarityBar = card.querySelector('.card-rarity-bar');
            if (rarityBar) {
                gsap.to(rarityBar, { 
                    scaleX: 1.02, duration: 0.4, ease: 'power2.out', transformOrigin: 'left' 
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.card-icon-svg'), { 
                y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' 
            });
        });
    });
}