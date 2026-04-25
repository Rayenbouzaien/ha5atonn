<div id="screen-difficulty">
        <h1 class="diff-title">MEMORY</h1>
        <p class="diff-subtitle">◈ SELECT DIFFICULTY PROTOCOL ◈</p>

        <div class="diff-grid">
            <div onclick="selectDiff(this,'easy')" class="diff-card selected" data-diff="easy">
                <span class="diff-badge easy">RECRUIT</span>
                <span class="diff-icon">🌐</span>
                <div class="diff-name" style="color:var(--neon-green)">EASY</div>
                <div class="diff-desc">Basic neural pattern<br>recognition training</div>
                <div class="diff-stat" style="color:var(--neon-green)">4×4 · 8 PAIRS</div>
            </div>

            <div onclick="selectDiff(this,'medium')" class="diff-card" data-diff="medium">
                <span class="diff-badge medium">AGENT</span>
                <span class="diff-icon">⚡</span>
                <div class="diff-name" style="color:var(--neon-gold)">MEDIUM</div>
                <div class="diff-desc">Advanced cognitive<br>synchronization matrix</div>
                <div class="diff-stat" style="color:var(--neon-gold)">4×5 · 10 PAIRS</div>
            </div>

            <div onclick="selectDiff(this,'hard')" class="diff-card" data-diff="hard">
                <span class="diff-badge hard">NEXUS</span>
                <span class="diff-icon">💀</span>
                <div class="diff-name" style="color:var(--neon-magenta)">HARD</div>
                <div class="diff-desc">Maximum cortex<br>override sequence</div>
                <div class="diff-stat" style="color:var(--neon-magenta)">6×4 · 12 PAIRS</div>
            </div>
        </div>

        <button class="btn-start" onclick="startGame()">
            <div class="btn-start-inner">
                INITIALIZE <span class="btn-arrow">▶</span>
            </div>
        </button>
    </div>