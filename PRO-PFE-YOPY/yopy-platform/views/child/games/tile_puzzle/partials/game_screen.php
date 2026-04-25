<div id="screen-game">
    <div id="puzzle-board"></div>
    <div id="hint-msg"></div>
    <div id="astar-status"></div>
    <div class="ctrl-btns">
        <button class="ctrl-btn hint"      id="hint-btn" onclick="requestHint()">💡 A* Hint</button>
        <button class="ctrl-btn undo"      id="undo-btn" onclick="undoMove()">↩ Undo</button>
        <button class="ctrl-btn primary"   onclick="newPuzzle()">🔀 New Puzzle</button>
        <button class="ctrl-btn secondary" onclick="resetToMenu()">Change Size</button>
    </div>
</div>