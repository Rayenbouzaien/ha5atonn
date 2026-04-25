  <div id="game-screen" class="game-container">
        <div class="round-badge">Round <span id="round-num">1</span></div>
        <div id="turn-message" class="turn-text">Your Turn</div>
        <div class="board-wrapper">
            <svg class="board-svg" viewBox="0 0 300 300" preserveAspectRatio="none">
                <defs>
                    <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence baseFrequency="0.025" numOctaves="2" result="noise"/>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G"/>
                        <feGaussianBlur stdDeviation="0.5"/>
                    </filter>
                </defs>
                <g filter="url(#ink-bleed)">
                    <rect x="12" y="12" width="276" height="276" />
                    <line x1="104" y1="12" x2="104" y2="288" />
                    <line x1="196" y1="12" x2="196" y2="288" />
                    <line x1="12" y1="104" x2="288" y2="104" />
                    <line x1="12" y1="196" x2="288" y2="196" />
                </g>
            </svg>
            <svg id="win-line-svg" class="win-line-svg" viewBox="0 0 300 300" preserveAspectRatio="none"></svg>
            <div class="grid-cells" id="ttt-grid">
                <div class="cell" data-idx="0"></div><div class="cell" data-idx="1"></div><div class="cell" data-idx="2"></div>
                <div class="cell" data-idx="3"></div><div class="cell" data-idx="4"></div><div class="cell" data-idx="5"></div>
                <div class="cell" data-idx="6"></div><div class="cell" data-idx="7"></div><div class="cell" data-idx="8"></div>
            </div>
        </div>
        <div class="control-group">
            <button class="ink-btn" onclick="newRound()">🖌 New Round</button>
            <button class="ink-btn" onclick="endSession()">📜 Finish</button>
        </div>
    </div>
