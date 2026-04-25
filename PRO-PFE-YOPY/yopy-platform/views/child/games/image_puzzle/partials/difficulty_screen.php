<!-- partials/difficulty_screen.php -->
<div id="screen-diff">
    <span class="floating-star" style="top:14%;left:7%;--dur:5s;--delay:0s">⭐</span>
    <span class="floating-star" style="top:18%;right:9%;--dur:7s;--delay:1s">🌟</span>
    <span class="floating-star" style="bottom:20%;left:11%;--dur:6s;--delay:2s">✨</span>
    <span class="floating-star" style="bottom:16%;right:7%;--dur:5.5s;--delay:.5s">⭐</span>
    <span class="floating-star" style="top:38%;left:3%;--dur:8s;--delay:1.5s;font-size:14px">✦</span>

    <div class="diff-header" id="diff-header">
        <h1>Tile Puzzle</h1>
        <div class="subtitle">Réassemble l'image</div>
        <div class="divider"></div>
    </div>
    <p id="diff-sub">Choisis ta difficulté</p>

    <div class="diff-cards">
        <div class="diff-card easy" onclick="startGame('easy')">
            <div class="diff-icon-wrap"><span>🌿</span></div>
            <div class="diff-name">Facile</div>
            <div class="diff-info">Grille 3×4 · 12 pièces</div>
            <div class="diff-badge">100 shuffles</div>
        </div>
        <div class="diff-card medium" onclick="startGame('medium')">
            <div class="diff-icon-wrap"><span>🔥</span></div>
            <div class="diff-name">Moyen</div>
            <div class="diff-info">Grille 4×5 · 20 pièces</div>
            <div class="diff-badge">250 shuffles</div>
        </div>
        <div class="diff-card hard" onclick="startGame('hard')">
            <div class="diff-icon-wrap"><span>💎</span></div>
            <div class="diff-name">Difficile</div>
            <div class="diff-info">Grille 5×6 · 30 pièces</div>
            <div class="diff-badge">500 shuffles</div>
        </div>
    </div>
</div>