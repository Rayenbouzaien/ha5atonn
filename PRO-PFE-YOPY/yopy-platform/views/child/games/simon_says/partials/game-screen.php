    <!-- GAME SCREEN -->
    <div id="screen-game">
        <div class="game-container">
            <div class="hud-row">
                <div class="hud-stat">
                    <div class="hud-label">NIVEAU</div>
                    <div class="hud-value" id="hud-level">1</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-label">SCORE</div>
                    <div class="hud-value" id="hud-score">0</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-label">ERREURS</div>
                    <div class="hud-value" id="hud-errors">0</div>
                </div>
            </div>

            <div class="progress-bar">
                <div id="progress-fill"></div>
            </div>

            <div id="status-msg">🌿 Préparez-vous... 🌿</div>

            <div class="simon-board">
                <div id="btn-green" class="drum-btn disabled" data-color="green"></div>
                <div id="btn-red" class="drum-btn disabled" data-color="red"></div>
                <div id="btn-yellow" class="drum-btn disabled" data-color="yellow"></div>
                <div id="btn-blue" class="drum-btn disabled" data-color="blue"></div>
            </div>

            <div id="highscore-badge" style="text-align:center; margin-top:12px;">🏆 RECORD: <span id="hud-highscore">0</span></div>
        </div>
    </div>