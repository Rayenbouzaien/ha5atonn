<!-- partials/game_screen.php -->
<div id="screen-game">
    <div class="hangman-wrap">
        <img id="hangman-img" src="../../public/images/GAMES/hangman_quest/hangman-0.svg" draggable="false" alt="Hangman">
        <div class="lives-hearts" id="lives-hearts"></div>
    </div>

    <div class="hint-box">
        <div class="hint-label">✦ Whisper from the Void ✦</div>
        <div class="hint-text" id="hint-text">—</div>
        <div class="category-badge" id="category-badge">Category</div>
    </div>

    <div id="word-display"></div>
    <div id="hint-msg"></div>
    <div id="keyboard"></div>

    <div class="ctrl-btns">
        <button class="ctrl-btn hint-btn" id="hint-btn" onclick="useHint()">🔮 Reveal Rune</button>
        <button class="ctrl-btn primary" onclick="newWord()">🌀 New Word</button>
        <button class="ctrl-btn secondary" onclick="resetToMenu()">Change Level</button>
    </div>
</div>