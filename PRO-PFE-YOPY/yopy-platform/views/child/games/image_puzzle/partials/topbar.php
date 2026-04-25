<!-- partials/topbar.php -->
<div class="topbar">
    <a href="../../game-menu/menu.php" class="btn-back" 
       style="color: var(--gold); text-decoration: none; margin-left: 10px; font-size: 20px; z-index: 300; cursor: pointer; font-family: 'Cinzel', serif;">◀ MENU</a>
    
    <div class="topbar-logo" style="font-family: 'Cinzel', serif;">image puzzle</div>
    
    <div style="display:flex;align-items:center;gap:16px;">
        <div class="topbar-score">★ <span id="hud-score-top">0</span></div>
        <div class="topbar-player">
            <div class="player-avatar" id="buddy-avatar"></div>
            <span><?= $nickname ?></span>
        </div>
    </div>
</div>