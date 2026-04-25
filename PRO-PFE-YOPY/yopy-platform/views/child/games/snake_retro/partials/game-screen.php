<!-- ── Game screen ── -->
<div id="screen-game">
    <div id="board-wrap">
        <canvas id="board"></canvas>

        <!-- Start / pause overlay -->
        <div id="board-overlay">
            <div class="overlay-title" id="overlay-title">Ready?</div>
            <div class="overlay-sub"  id="overlay-sub">Press any arrow to begin</div>
            <div class="overlay-hint" id="overlay-hint">↑ ↓ ← →  or use the D-pad</div>
        </div>
    </div>

    <div id="score-strip">
        <div class="score-box">SCORE &nbsp;<span id="strip-score">0</span></div>
        <div class="score-box">BEST &nbsp;<span id="strip-best">0</span></div>
    </div>

    <!-- Mobile D-pad -->
    <div id="dpad">
        <div class="dpad-btn empty"></div>
        <div class="dpad-btn" id="dpad-up"    ontouchstart="dpadPress('up')"   onclick="dpadPress('up')">▲</div>
        <div class="dpad-btn empty"></div>
        <div class="dpad-btn" id="dpad-left"  ontouchstart="dpadPress('left')" onclick="dpadPress('left')">◀</div>
        <div class="dpad-btn empty"></div>
        <div class="dpad-btn" id="dpad-right" ontouchstart="dpadPress('right')"onclick="dpadPress('right')">▶</div>
        <div class="dpad-btn empty"></div>
        <div class="dpad-btn" id="dpad-down"  ontouchstart="dpadPress('down')" onclick="dpadPress('down')">▼</div>
        <div class="dpad-btn empty"></div>
    </div>
</div>
