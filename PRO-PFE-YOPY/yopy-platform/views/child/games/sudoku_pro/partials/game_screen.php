<!-- GAME SCREEN -->
<div id="screen-game">
    <div id="error-badge">❌ MISTAKES: <span id="mistake-count">0</span> / <span id="mistake-max">3</span></div>
    <div id="sudoku-wrap"><div id="sudoku-board"></div></div>
    <div class="game-controls">
        <button class="ctrl-btn primary" id="btn-new-puzzle" onclick="newPuzzle()">🌀 NEW PUZZLE</button>
        <button class="ctrl-btn warning" id="btn-hint" onclick="useHint()">🤖 AI HINT</button>
        <button class="ctrl-btn secondary" id="btn-solve" onclick="autoSolve()">◉ SOLVE</button>
    </div>
    <div id="hint-bubble"><span class="hint-close" onclick="dismissHint()">✕</span><div class="hint-technique" id="hint-technique-label"></div><span id="hint-text"></span></div>
</div>