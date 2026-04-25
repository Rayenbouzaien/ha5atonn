   <!-- DIFFICULTY SCREEN -->
    <div id="screen-difficulty">
        <div>
            <h1 class="diff-title">SIMON DES ESPRITS</h1>
            <p class="diff-subtitle">ÉCOUTE LA FORÊT • RÉPÈTE LE RYTHME</p>
        </div>

        <div class="diff-grid">
            <div onclick="selectDiff(this,'easy')" class="diff-card selected" data-diff="easy">
                <div class="diff-icon">🍃</div>
                <div class="diff-name">DOUX</div>
                <div class="diff-desc">Rythme lent<br>Esprits calmes</div>
                <div class="diff-badge">×10 pts</div>
            </div>
            <div onclick="selectDiff(this,'medium')" class="diff-card" data-diff="medium">
                <div class="diff-icon">🌿</div>
                <div class="diff-name">FORÊT</div>
                <div class="diff-desc">Cadence normale<br>Éveil de la mémoire</div>
                <div class="diff-badge">×15 pts</div>
            </div>
            <div onclick="selectDiff(this,'hard')" class="diff-card" data-diff="hard">
                <div class="diff-icon">🔥</div>
                <div class="diff-name">DJEMBE</div>
                <div class="diff-desc">Rythme intense<br>Esprit du feu</div>
                <div class="diff-badge">×20 pts</div>
            </div>
        </div>

        <button class="btn-start" onclick="startGame()">
            <span>▶ COMMENCER</span>
        </button>
    </div>