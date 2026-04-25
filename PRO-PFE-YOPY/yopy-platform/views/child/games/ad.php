<?php
// ad.php — Magical Ad Modal for YOPY Games
$basePath = '/PRO-PFE-YOPY/yopy-platform/views/child/games/ADSYOPY/';

$videos = [];
for ($i = 1; $i <= 15; $i++) {
    $videos[] = $basePath . "AD{$i}.mp4";
}
$randomVideo = $videos[array_rand($videos)];
?>

<style>
    :root { --primary: #FFD700; --accent: #FF6BFF; }

    #ad-modal {
        position: fixed; top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(10, 5, 30, 0.96);
        display: none; align-items: center; justify-content: center;
        z-index: 99999; backdrop-filter: blur(8px);
    }
    .ad-container {
        width: 90%; max-width: 920px;
        background: linear-gradient(145deg, #1a0f2e, #2a1a45);
        border-radius: 24px; overflow: hidden;
        position: relative;
    }
    .ad-header {
        padding: 15px 25px;
        background: rgba(0,0,0,0.4);
        display: flex; align-items: center; justify-content: space-between;
        color: var(--primary);
    }
    .ad-header h2 { margin: 0; font-size: 1.4rem; font-family: 'Cinzel', serif; }

    .video-wrapper { position: relative; }
    #ad-video { width: 100%; display: block; max-height: 80vh; }

    /* ── Click-to-play overlay ── */
    #ad-play-overlay {
        position: absolute; inset: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        background: rgba(10, 5, 30, 0.80);
        cursor: pointer; z-index: 5;
        color: var(--primary); gap: 16px;
    }
    .play-circle {
        width: 90px; height: 90px; border-radius: 50%;
        background: var(--accent);
        display: flex; align-items: center; justify-content: center;
        font-size: 2.2rem;
        box-shadow: 0 0 40px var(--accent);
        transition: transform 0.2s;
    }
    .play-circle:hover { transform: scale(1.1); }
    #ad-play-overlay p {
        font-size: 1.1rem; font-family: 'Cinzel', serif;
        text-shadow: 0 0 10px var(--accent);
    }

    /* ── Skip button — always on top ── */
    .skip-btn {
        position: absolute; bottom: 25px; right: 25px;
        background: #FF2D55; color: white;
        padding: 14px 32px; border: none; border-radius: 50px;
        font-weight: bold; font-size: 1rem;
        cursor: pointer;
        opacity: 0; pointer-events: none;
        transition: opacity 0.4s ease;
        z-index: 20; /* above the overlay */
    }
    .skip-btn.show { opacity: 1; pointer-events: all; }

    /* ── Timer ── */
    .timer {
        position: absolute; top: 20px; right: 20px;
        background: rgba(0,0,0,0.6); color: #FFD700;
        padding: 6px 14px; border-radius: 30px;
        font-weight: bold; z-index: 20;
    }

    .magic-glow { animation: magicPulse 4s infinite alternate ease-in-out; }
    @keyframes magicPulse {
        from { box-shadow: 0 0 30px #FFD700; }
        to   { box-shadow: 0 0 80px #FF6BFF; }
    }
</style>

<div id="ad-modal">
    <div class="ad-container magic-glow">
        <div class="ad-header">
            <h2>✨ YOPY Magic Moment ✨</h2>
        </div>
        <div class="video-wrapper">
            <video id="ad-video" playsinline>
                <source src="<?= htmlspecialchars($randomVideo) ?>" type="video/mp4">
            </video>

            <!-- Overlay: dismissed on click → triggers sound autoplay -->
            <div id="ad-play-overlay">
                <div class="play-circle">▶</div>
                <p>Tap to watch your reward!</p>
            </div>

            <!-- Timer & skip: z-index 20, always above overlay -->
            <div class="timer" id="ad-timer">30s</div>
            <button id="skip-btn" class="skip-btn">SKIP →</button>
        </div>
    </div>
</div>

<script>
window.addEventListener('load', () => {
    const modal   = document.getElementById('ad-modal');
    const video   = document.getElementById('ad-video');
    const skipBtn = document.getElementById('skip-btn');
    const timerEl = document.getElementById('ad-timer');
    const overlay = document.getElementById('ad-play-overlay');

    modal.style.display = 'flex';

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none'; // hide overlay — skip btn is now fully visible

        video.play().catch(err => console.warn('Play failed:', err));

        // Start 30s countdown
        let timeLeft = 30;
        timerEl.textContent = timeLeft + 's';

        const timerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft + 's';

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerEl.style.display = 'none';   // hide timer when done
                skipBtn.classList.add('show');     // show skip — stays until clicked
            }
        }, 1000);
    });

    // Skip closes the modal — button stays visible until this fires
    skipBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        video.pause();
        video.src = ''; // free memory
    });
});
</script>