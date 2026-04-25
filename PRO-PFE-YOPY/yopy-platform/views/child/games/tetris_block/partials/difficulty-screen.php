<div id="screen-difficulty">
    <h1>Tetris</h1>
    <p>Clear lines, score points, level up! 🧱</p>
    <div class="difficulty-cards">
        <div class="diff-card selected" data-diff="easy" onclick="selectDiff(this,'easy')">
            <div class="diff-icon">🌟</div>
            <div class="diff-name">Easy</div>
            <div class="diff-info">Slow start<br>Relaxed pace</div>
            <div class="diff-badge">×1 score</div>
        </div>
        <div class="diff-card" data-diff="medium" onclick="selectDiff(this,'medium')">
            <div class="diff-icon">🔥</div>
            <div class="diff-name">Medium</div>
            <div class="diff-info">Normal speed<br>Classic feel</div>
            <div class="diff-badge">×1.5 score</div>
        </div>
        <div class="diff-card" data-diff="hard" onclick="selectDiff(this,'hard')">
            <div class="diff-icon">💎</div>
            <div class="diff-name">Hard</div>
            <div class="diff-info">Fast from start<br>Intense!</div>
            <div class="diff-badge">×2 score</div>
        </div>
    </div>
    <button class="btn-start" onclick="startGame()">Play!</button>
</div>