    <div id="screen-difficulty">
        <h1>Tower Blocks</h1>
        <p>Stack blocks as high as you can! Click or tap at the right moment.</p>
        <div class="difficulty-cards">
            <div class="diff-card selected" data-diff="easy" onclick="selectDiff(this,'easy')">
                <div class="diff-icon">🌟</div>
                <div class="diff-name">Easy</div>
                <div class="diff-info">Vitesse normale<br>×10 pts / bloc</div>
                <div class="diff-badge">×10</div>
            </div>
            <div class="diff-card" data-diff="medium" onclick="selectDiff(this,'medium')">
                <div class="diff-icon">🔥</div>
                <div class="diff-name">Medium</div>
                <div class="diff-info">Vitesse rapide<br>×20 pts / bloc</div>
                <div class="diff-badge">×20</div>
            </div>
            <div class="diff-card" data-diff="hard" onclick="selectDiff(this,'hard')">
                <div class="diff-icon">💎</div>
                <div class="diff-name">Hard</div>
                <div class="diff-info">Vitesse très rapide<br>×40 pts / bloc</div>
                <div class="diff-badge">×40</div>
            </div>
        </div>
        <button class="btn-start" onclick="startGame()">Jouer</button>
    </div>