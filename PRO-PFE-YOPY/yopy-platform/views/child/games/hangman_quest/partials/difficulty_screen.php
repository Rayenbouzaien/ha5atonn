<div id="screen-difficulty">
    <h1>Hangman Quest</h1>
    <p style="max-width: 500px;">Unveil the forgotten words. Each mistake darkens the abyss.</p>
    <div class="difficulty-cards">
        <div class="diff-card selected" data-diff="easy" onclick="selectDiff(this,'easy')">
            <div class="diff-icon">🌙</div>
            <div class="diff-name">Easy</div>
            <div class="diff-info">Short words<br>8 lives</div>
            <div class="diff-badge" style="margin-top: 8px; background: #a855f7; border-radius: 20px; padding: 2px 12px;">×10</div>
        </div>
        <div class="diff-card" data-diff="medium" onclick="selectDiff(this,'medium')">
            <div class="diff-icon">🔥</div>
            <div class="diff-name">Medium</div>
            <div class="diff-info">Any length<br>6 lives</div>
            <div class="diff-badge" style="margin-top: 8px; background: #a855f7;">×20</div>
        </div>
        <div class="diff-card" data-diff="hard" onclick="selectDiff(this,'hard')">
            <div class="diff-icon">💀</div>
            <div class="diff-name">Hard</div>
            <div class="diff-info">Long words<br>5 lives</div>
            <div class="diff-badge" style="margin-top: 8px; background: #a855f7;">×40</div>
        </div>
    </div>
    <button class="btn-start" onclick="startGame()">Enter the Abyss</button>
</div>