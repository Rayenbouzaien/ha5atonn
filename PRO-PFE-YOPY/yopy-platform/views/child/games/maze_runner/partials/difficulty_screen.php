<div id="screen-difficulty">
    <h1>ENTER THE LABYRINTH</h1>
    <p style="color:#ffcc99; max-width:420px; text-align:center; font-size:clamp(14px, 4vw, 18px);">Beware the Minotaur... Reach the exit before he finds you!</p>
    <div class="difficulty-cards">
        <div class="diff-card selected" data-diff="easy" onclick="selectDiff(this,'easy')">
            <div class="diff-icon">🌟</div>
            <div class="diff-name">Novice Paths</div>
            <div class="diff-info">10×10 • Safe for mortals</div>
            <div class="diff-badge">×10 pts</div>
        </div>
        <div class="diff-card" data-diff="medium" onclick="selectDiff(this,'medium')">
            <div class="diff-icon">🔥</div>
            <div class="diff-name">Warrior's Trial</div>
            <div class="diff-info">15×15 • Twisting corridors</div>
            <div class="diff-badge">×20 pts</div>
        </div>
        <div class="diff-card" data-diff="hard" onclick="selectDiff(this,'hard')">
            <div class="diff-icon">💀</div>
            <div class="diff-name">Minotaur's Domain</div>
            <div class="diff-info">25×25 • Deadly turns</div>
            <div class="diff-badge">×40 pts</div>
        </div>
        <div class="diff-card" data-diff="extreme" onclick="selectDiff(this,'extreme')">
            <div class="diff-icon">🐂</div>
            <div class="diff-name">Legendary Horror</div>
            <div class="diff-info">38×38 • Only the brave survive</div>
            <div class="diff-badge">×80 pts</div>
        </div>
    </div>
    <button class="btn-start" onclick="startGame()">DESCEND INTO THE MAZE</button>
</div>
