<!-- partials/topbar.php -->
<div class="topbar">
    <div class="topbar-logo">✦ SHADOW WORD ✦</div>
    <div class="topbar-center">
        <div class="hud-pill timer" id="timer-pill"><span>⏳</span><span id="hud-timer">0s</span></div>
        <div class="hud-pill lives"><span>❤️</span><span id="hud-lives">6</span></div>
        <div class="hud-pill"><span>⚔️</span><span id="hud-score">0</span></div>
    </div>
    <div class="topbar-right" style="display: flex; align-items: center; gap: 15px;">
        <div class="topbar-buddy" style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 14px;"><?= $nickname ?></span>
            <div class="buddy-avatar" id="buddy-avatar">😊</div>
        </div>
        <a href="../../game-menu/menu.php" class="btn-back">← Exit</a>
    </div>
</div>