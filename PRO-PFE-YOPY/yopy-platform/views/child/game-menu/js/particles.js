// assets/js/particles.js
const cvs = document.getElementById('particleCanvas');
const ctx = cvs.getContext('2d');

function resizeCvs() {
  cvs.width = innerWidth;
  cvs.height = innerHeight;
}

resizeCvs();
window.addEventListener('resize', resizeCvs);

const PARTICLES = Array.from({length:70}, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  r: Math.random() * 2.2 + 0.3,
  vx: (Math.random()-0.5) * 0.3,
  vy: (Math.random()-0.5) * 0.25,
  a: Math.random() * 0.5 + 0.05,
  type: Math.random() > 0.7 ? 'diamond' : 'circle',
  hue: Math.random() > 0.5 ? [232,201,106] : (Math.random() > 0.5 ? [78,205,196] : [180,140,255])
}));

function initParticles() {
  (function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    PARTICLES.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = cvs.width;
      if (p.x > cvs.width) p.x = 0;
      if (p.y < 0) p.y = cvs.height;
      if (p.y > cvs.height) p.y = 0;

      ctx.save();
      ctx.globalAlpha = p.a;

      if (p.type === 'diamond') {
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI/4);
        ctx.fillStyle = `rgb(${p.hue.join(',')})`;
        ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgb(${p.hue.join(',')})`;
        ctx.fill();
      }
      ctx.restore();
    });
  })();
}