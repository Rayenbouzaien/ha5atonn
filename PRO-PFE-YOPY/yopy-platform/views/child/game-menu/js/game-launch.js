// assets/js/game-launch.js
function launchGame(href, color) {
  const portal = document.getElementById('portal');
  portal.style.background = `radial-gradient(circle, ${color} 0%, #050A18 70%)`;
  portal.style.transition = 'none';
  portal.style.clipPath = 'circle(0% at 50% 50%)';
  void portal.offsetWidth;
  portal.style.transition = 'clip-path .85s cubic-bezier(.4,0,.18,1)';
  portal.style.clipPath = 'circle(150% at 50% 50%)';
  setTimeout(() => window.location.href = href, 960);
}