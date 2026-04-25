<!-- partials/result_overlay.php -->
<div id="result-overlay">
    <div class="result-emoji" id="result-emoji">🏆</div>
    <div class="result-title" id="result-title">Victory</div>
    <div class="result-word" id="result-word"></div>
    <div class="result-score" id="result-score-display">Score: 0</div>
    <div class="result-detail" id="result-detail"></div>

    <div style="display: flex; gap: 20px; margin-top: 15px;">
        <button class="ctrl-btn primary" onclick="newWord()">Next Word</button>
        <button class="ctrl-btn secondary" onclick="resetToMenu()">Change Difficulty</button>
        <button class="ctrl-btn secondary" onclick="goMenu()">Exit to Menu</button>
    </div>
</div>

<div class="submitting-badge" id="submitting-badge">⏳ Saving progress...</div>