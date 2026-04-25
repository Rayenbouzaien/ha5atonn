// assets/js/ui.js
function animateBars() {
    document.querySelectorAll('.mini-prog-fill').forEach(el => {
        const target = parseInt(el.dataset.fill || '0');
        setTimeout(() => {
            el.style.width = target + '%';
        }, 800);
    });
}