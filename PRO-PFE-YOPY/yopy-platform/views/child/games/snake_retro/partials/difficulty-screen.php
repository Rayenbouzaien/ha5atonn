<!-- ── Difficulty selector ── -->
<div id="screen-difficulty">
    <h1>Snake Retro</h1>
    <p>Eat the food, dodge yourself 🐍</p>

    <div class="difficulty-cards">
        <div class="diff-card selected" data-diff="easy" onclick="selectDiff(this,'easy')">
            <div class="diff-icon">🌟</div>
            <div class="diff-name">Easy</div>
            <div class="diff-info">Speed 5<br>Chill pace</div>
            <div class="diff-badge">×1 pts</div>
        </div>
        <div class="diff-card" data-diff="medium" onclick="selectDiff(this,'medium')">
            <div class="diff-icon">🔥</div>
            <div class="diff-name">Medium</div>
            <div class="diff-info">Speed 10<br>Stay sharp!</div>
            <div class="diff-badge">×2 pts</div>
        </div>
        <div class="diff-card" data-diff="hard" onclick="selectDiff(this,'hard')">
            <div class="diff-icon">💎</div>
            <div class="diff-name">Hard</div>
            <div class="diff-info">Speed 17<br>Lightning fast!</div>
            <div class="diff-badge">×3 pts</div>
        </div>
    </div>

    <button class="btn-start" onclick="startGame()">Play!</button>
</div>