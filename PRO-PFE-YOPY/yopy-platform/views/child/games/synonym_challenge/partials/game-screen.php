  <!-- Game screen -->
    <div id="screen-game">
        <div class="game-box">
            <div class="header">✧ THE CHRONICLE ✧</div>
            <p style="font-size: 19px; color:#cdbc8d; margin: 5px 0;">INSCRIBE A SYNONYM FOR</p>
            <div id="word" class="target-word">...</div>
            <input id="input" autocomplete="off" placeholder="✍️ ancient synonym...">
            <div id="msg"></div>
            <div class="action-buttons">
                <button id="hintBtn" onclick="showHint();">💠 HINT (-2s)</button>
                <button id="skipBtn" onclick="skipWord();">⏳ SKIP (-3s)</button>
            </div>
            <div id="hint-box"></div>
        </div>
    </div>