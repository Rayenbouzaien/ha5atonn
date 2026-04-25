<div id="screen-game">
    <div id="maze-wrap">
        <canvas id="maze-canvas"></canvas>
        <div id="win-flash"></div>
    </div>

    <div id="dpad">
        <div class="dpad-empty"></div>
        <div class="dpad-btn" onclick="move('n')">▲</div>
        <div class="dpad-empty"></div>
        <div class="dpad-btn" onclick="move('w')">◀</div>
        <div class="dpad-btn" onclick="move('s')">▼</div>
        <div class="dpad-btn" onclick="move('e')">▶</div>
    </div>

    <div class="ctrl-btns">
        <button class="ctrl-btn" onclick="newMaze()">NEW LABYRINTH</button>
        <button class="ctrl-btn hint-btn" id="hint-btn" onclick="toggleHint()">🏮 TORCHLIGHT HINT</button>
    </div>
    <div id="hint-cost"></div>
</div>
