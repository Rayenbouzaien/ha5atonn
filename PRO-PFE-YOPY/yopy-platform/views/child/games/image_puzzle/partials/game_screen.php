<!-- partials/game_screen.php -->
<div id="screen-game">

    <!-- LEFT: stats + hints -->
    <div class="game-sidebar">
        <div class="hud-pill">
            <div class="hud-icon">👣</div>
            <div class="hud-label">Mouvements</div>
            <div class="hud-val" id="hud-moves">0</div>
        </div>
        <div class="hud-pill">
            <div class="hud-icon">✦</div>
            <div class="hud-label">Score</div>
            <div class="hud-val" id="hud-score">1000</div>
        </div>
        <div class="hud-pill">
            <div class="hud-icon">⏱</div>
            <div class="hud-label">Temps</div>
            <div class="hud-val" id="hud-time">00:00</div>
        </div>

        <div class="progress-wrap">
            <div class="progress-label">Progression</div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" id="progress-fill"></div>
            </div>
            <div class="progress-count" id="progress-count">0 / 0</div>
        </div>

        <div class="hint-section">
            <div class="hint-title">⚗ Aides</div>
            <button class="btn-hint green" onclick="toggleRef()">🖼 Référence</button>
            <button class="btn-hint blue" onclick="highlightTiles()">🔍 Positions</button>
            <button class="btn-hint orange" id="btn-autostep" onclick="autoSolveStep()">⚡ Indice <span class="cost">−50pts</span></button>
            <button class="btn-hint red" id="btn-cancel" onclick="clearSelection()" style="display:none">✕ Annuler</button>
            <div class="hint-uses">Indices auto: <b id="hint-count">3</b></div>
        </div>

        <button class="btn-hint" onclick="resetToMenu()" style="margin-top:2px;font-size:9px">⌂ Menu</button>
    </div>

    <!-- CENTER: puzzle -->
    <div class="puzzle-area">
        <div id="puzzle-wrap">
            <div id="fifteen"></div>
            <div id="swap-toast">Sélectionne une 2ᵉ pièce</div>
        </div>
        <div style="font-size:9px;color:var(--text-dim);letter-spacing:1px;font-family:'Cinzel',serif">✦ Clique deux pièces pour les échanger ✦</div>
    </div>

    <!-- RIGHT: reference image -->
    <div class="ref-panel" id="ref-panel">
        <div class="ref-header">🎯 Image Cible</div>
        <div class="ref-image-wrap" onclick="openLightbox()">
            <img id="ref-img" src="" alt="Référence" />
            <div class="ref-grid-overlay" id="ref-grid-overlay"></div>
            <div class="ref-expand-btn">🔍</div>
        </div>
        <div class="ref-label">Clique pour agrandir</div>
        <button class="btn-hint blue" onclick="toggleRefGrid()" id="btn-ref-grid" style="font-size:9px;padding:5px 7px"># Numéros</button>
    </div>
</div>