<!-- DIFFICULTY -->
<div id="screen-difficulty">
    <h1>✦ NO GAME NO LIFE ✦</h1>
    <div class="subtitle">〄 // MATRIX GRID //  〄</div>
    <div class="difficulty-cards">
        <div class="diff-card selected" data-diff="easy" onclick="selectDiff(this,'easy')">
            <div class="diff-icon">🌟</div>
            <div class="diff-name">EASY</div>
            <div class="diff-badge">×10 pts</div>
        </div>
        <div class="diff-card" data-diff="medium" onclick="selectDiff(this,'medium')">
            <div class="diff-icon">⚡</div>
            <div class="diff-name">MEDIUM</div>
            <div class="diff-badge">×15 pts</div>
        </div>
        <div class="diff-card" data-diff="hard" onclick="selectDiff(this,'hard')">
            <div class="diff-icon">💠</div>
            <div class="diff-name">HARD</div>
            <div class="diff-badge">×20 pts</div>
        </div>
    </div>
    <button class="btn-start" onclick="startGame()">▶ ENTER THE GRID ◀</button>
</div>