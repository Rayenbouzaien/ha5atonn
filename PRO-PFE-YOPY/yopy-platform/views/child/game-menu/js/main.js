
// assets/js/main.js - Fixed for Back Button + bfcache

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loaderBar');

    if (!loader || !loaderBar) {
        initializeMainContent();
        return;
    }

    loader.style.display = 'flex';
    loader.style.opacity = '1';

    gsap.to(loaderBar, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.in',
                onComplete: () => {
                    loader.style.display = 'none';
                    initializeMainContent();
                }
            });
        }
    });
});

function initializeMainContent() {
    // Reset portal (critical for Back button!)
    resetPortal();

    setTimeout(() => {
        if (typeof initBuddy === 'function') initBuddy();
        if (typeof initParticles === 'function') initParticles();
        if (typeof startMainAnims === 'function') startMainAnims();
    }, 150);
}

/** Reset the portal overlay when returning via Back/Forward */
function resetPortal() {
    const portal = document.getElementById('portal');
    if (!portal) return;

    portal.style.transition = 'none';
    portal.style.clipPath = 'circle(0% at 50% 50%)';
    portal.style.background = '';           // remove any game color
    void portal.offsetWidth;                // force reflow
    portal.style.transition = '';           // restore normal transition
}

// Also run reset on pageshow (handles bfcache restore)
window.addEventListener('pageshow', (event) => {
    resetPortal();

    // If the page was restored from cache, re-init animations (optional but nice)
    if (event.persisted) {
        setTimeout(() => {
            if (typeof startMainAnims === 'function') startMainAnims();
        }, 50);
    }
});
