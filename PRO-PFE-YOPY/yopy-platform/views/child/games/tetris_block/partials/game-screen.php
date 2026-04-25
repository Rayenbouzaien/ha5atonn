<div id="screen-game">
    <div id="board-wrap">
        <canvas id="tetris-canvas"></canvas>
        <div id="board-overlay">
            <div class="overlay-title" id="overlay-title">TETRIS</div>
            <div class="overlay-sub"   id="overlay-sub">Press any key or tap to begin</div>
            <button class="overlay-btn" onclick="resumeGame()" id="overlay-btn">▶ Start</button>
        </div>
    </div>

    <div id="side-panel">
        <div class="panel-box">
            <div class="panel-label">Next</div>
            <canvas id="next-canvas" width="80" height="80"></canvas>
        </div>
        <div class="panel-box">
            <div class="panel-label">Score</div>
            <div class="panel-value" id="panel-score">0</div>
        </div>
        <div class="panel-box">
            <div class="panel-label">Level</div>
            <div class="panel-value" id="panel-level">1</div>
        </div>
        <div class="panel-box">
            <div class="panel-label">Lines</div>
            <div class="panel-value" id="panel-lines">0</div>
        </div>
        <div class="panel-box ctrl-hint">
            ← → Move<br>
            ↑ Rotate<br>
            ↓ Soft drop<br>
            Space Hard drop<br>
            P Pause
        </div>

        <!-- Mobile D-pad -->
        <div id="dpad">
            <div class="dpad-btn dpad-empty"></div>
            <div class="dpad-btn" onclick="dpadAction('up')">▲</div>
            <div class="dpad-btn dpad-empty"></div>
            <div class="dpad-btn" onclick="dpadAction('left')">◀</div>
            <div class="dpad-btn" onclick="dpadAction('down')">▼</div>
            <div class="dpad-btn" onclick="dpadAction('right')">▶</div>
        </div>
        <button class="dpad-btn" style="width:100%;border-radius:12px;font-family:'Fredoka One',cursive;font-size:14px;" onclick="dpadAction('space')">⬇ Drop</button>
    </div>
</div>