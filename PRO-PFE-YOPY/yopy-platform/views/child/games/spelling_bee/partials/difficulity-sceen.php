  <!-- ── DIFFICULTY SCREEN ── -->
        <div id="screen-difficulty">
            <div class="school-crest" id="crest-emoji">🏰</div>
            <div class="screen-title">Spelling Bee</div>
            <div class="screen-subtitle">✦ Hogwarts Spell Academy ✦</div>

            <div class="parchment diff-panel" id="diff-panel">
                <span class="corner-ornament tl">❧</span>
                <span class="corner-ornament tr">❧</span>
                <span class="corner-ornament bl">❧</span>
                <span class="corner-ornament br">❧</span>
                <div class="diff-panel-inner">
                    <p class="diff-panel-title">Choose Your Challenge</p>
                    <p class="diff-panel-sub">Professor Dumbledore awaits. Select your level of sorcery, young wizard.</p>
                    <div class="rune-sep">ᚱ ᚢ ᚾ ᛖ</div>

                    <div class="difficulty-cards">
                        <div class="diff-card selected" data-diff="easy" onclick="selectDiff(this,'easy')">
                            <span class="diff-icon">🌟</span>
                            <div class="diff-name">First Year</div>
                            <div class="diff-info">Simple everyday words<br>3 lightning bolts</div>
                            <div class="diff-badge">×10 pts/word</div>
                        </div>
                        <div class="diff-card" data-diff="medium" onclick="selectDiff(this,'medium')">
                            <span class="diff-icon">🔮</span>
                            <div class="diff-name">Fifth Year</div>
                            <div class="diff-info">Trickier spellings<br>3 lightning bolts</div>
                            <div class="diff-badge">×15 pts/word</div>
                        </div>
                        <div class="diff-card" data-diff="hard" onclick="selectDiff(this,'hard')">
                            <span class="diff-icon">💀</span>
                            <div class="diff-name">N.E.W.T. Level</div>
                            <div class="diff-info">Challenging vocabulary<br>3 lightning bolts</div>
                            <div class="diff-badge">×20 pts/word</div>
                        </div>
                    </div>

                    <div class="rune-sep">ᚨ ᚱ ᛏ ᛋ</div>
                    <button class="btn-start" onclick="startGame()">Enter the Great Hall</button>
                </div>
            </div>
        </div>