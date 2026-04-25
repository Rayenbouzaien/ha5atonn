// assets/js/buddy.js - CLEAN & FIXED VERSION

function initBuddy() {
    // Get data injected from backend
    const BUDDY_SVGS = window.BUDDY_DATA?.SVGS || {};
    const BUDDY_META = window.BUDDY_DATA?.META || {};

    // Default buddy
    let buddy = { id: 'joy', name: 'Joy' };

    // Load saved character from sessionStorage
    try {
        const raw = sessionStorage.getItem('chosen_character');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.id === 'string' && BUDDY_SVGS[parsed.id]) {
                buddy = parsed;
            }
        }
    } catch (e) {
        console.warn("Failed to parse chosen_character from sessionStorage:", e);
    }

    // Get metadata for current buddy (fallback chain)
    const meta = BUDDY_META[buddy.id] 
        || BUDDY_META.joy 
        || {
            color: '#E8C96A',
            rgb: '232,201,106',
            orb: 'rgba(232,201,106,.45)',
            bubble: "Pick a game and let's go! 🌟",
            element: '✦ Spirit Guide ✦'
        };

    // === Safe DOM Updates ===

    // Buddy mini icon (first word/symbol only)
    const tbBuddyMini = document.getElementById('tbBuddyMini');
    if (tbBuddyMini) {
        const elementText = meta.element || '🌙';
        tbBuddyMini.innerHTML = elementText.split(' ')[0] || '🌙';
    }

    // Buddy label
    const tbBuddyLabel = document.getElementById('tbBuddyLabel');
    if (tbBuddyLabel) {
        tbBuddyLabel.textContent = `${buddy.name} is ready!`;
    }

    // Buddy name in main panel
    const bName = document.getElementById('bName');
    if (bName) {
        bName.textContent = buddy.name;
    }

    // Bubble text
    const bubbleEl = document.getElementById('bubbleText');
    if (bubbleEl) {
        bubbleEl.innerHTML = meta.bubble || "Hello! I'm your buddy ✨";
    }

    // Element title
    const elementEl = document.querySelector('.buddy-element');
    if (elementEl) {
        elementEl.textContent = meta.element || '✦ Buddy ✦';
    }

    // Buddy SVG Face
    const faceWrap = document.getElementById('buddyFaceWrap');
    if (faceWrap && BUDDY_SVGS[buddy.id]) {
        faceWrap.innerHTML = BUDDY_SVGS[buddy.id];
    }

    // Orb color
    const orb = document.getElementById('buddyOrb');
    if (orb) {
        orb.style.background = meta.orb ? 
            meta.orb.replace(/\.[\d]+\)/, '1)') : 
            'rgba(232,201,106,1)';
        orb.style.opacity = '0.45';
    }

    // Background gradient
    const bg = document.getElementById('buddyBg');
    if (bg && meta.rgb) {
        bg.style.background = `radial-gradient(ellipse 120% 80% at 50% 100%, rgba(${meta.rgb},0.12), transparent 65%)`;
    }

    // === Stats ===
    const stats = {
        statPlayed: 'gamesPlayed',
        statBest: 'bestScore',
        statStreak: 'streak',
        totalScore: 'totalScore',
        starsCount: 'starsCount'
    };

    Object.keys(stats).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = sessionStorage.getItem(stats[id]) || (id === 'statBest' ? '—' : '0');
        }
    });

    console.log(`✅ Buddy initialized: ${buddy.name} (${buddy.id})`);
}

// Global function for launching games (used in onclick attributes)
window.launchGame = function(href, color) {
    const portal = document.getElementById('portal');
    if (!portal) {
        window.location.href = href;
        return;
    }

    // Reset transition
    portal.style.transition = 'none';
    portal.style.clipPath = 'circle(0% at 50% 50%)';
    
    // Force reflow
    void portal.offsetWidth;

    // Apply new styles
    portal.style.background = `radial-gradient(circle, ${color || '#4facfe'} 0%, #050A18 70%)`;
    portal.style.transition = 'clip-path .85s cubic-bezier(0.4, 0, 0.18, 1)';
    portal.style.clipPath = 'circle(150% at 50% 50%)';

    // Navigate after animation
    setTimeout(() => {
        window.location.href = href;
    }, 960);
};

// Auto-init when script loads (optional - remove if you call it manually)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBuddy);
} else {
    initBuddy();
}