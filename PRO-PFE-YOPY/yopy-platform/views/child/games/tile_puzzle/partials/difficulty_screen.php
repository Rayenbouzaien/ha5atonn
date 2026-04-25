<div id="screen-difficulty">
    <h1>Tile Puzzle</h1>
    <p>Slide tiles into order — use 💡 A* hints when stuck!</p>
    <div class="difficulty-cards">
        <div class="diff-card selected" data-diff="easy" onclick="selectDiff(this,'easy')">
            <div class="diff-icon">🌟</div>
            <div class="diff-name">Easy</div>
            <div class="diff-info">3×3 grid<br>8 tiles</div>
            <div class="diff-badge">×10 pts</div>
        </div>
        <div class="diff-card" data-diff="medium" onclick="selectDiff(this,'medium')">
            <div class="diff-icon">🔥</div>
            <div class="diff-name">Medium</div>
            <div class="diff-info">4×4 grid<br>15 tiles</div>
            <div class="diff-badge">×20 pts</div>
        </div>
        <div class="diff-card" data-diff="hard" onclick="selectDiff(this,'hard')">
            <div class="diff-icon">💎</div>
            <div class="diff-name">Hard</div>
            <div class="diff-info">5×5 grid<br>24 tiles</div>
            <div class="diff-badge">×40 pts</div>
        </div>
    </div>
    <button class="btn-start" onclick="startGame()">Play!</button>
</div>