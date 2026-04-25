   <!-- ── GAME SCREEN ── -->
        <div id="screen-game">
            <div class="parchment game-panel" id="game-panel">
                <span class="corner-ornament tl">❧</span>
                <span class="corner-ornament tr">❧</span>
                <span class="corner-ornament bl">❧</span>
                <span class="corner-ornament br">❧</span>

                <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:16px;">

                    <div class="word-badge">📜 Word <span id="word-num">1</span></div>

                    <!-- Dumbledore -->
                    <div id="dumbledore-stage">
                        <div id="dumbledore-wrap" onclick="speakWord()" title="Click Dumbledore to hear the word">
                            <div class="speech-bubble" id="speech-bubble">Click me to hear the word!</div>
                            <!-- SVG Dumbledore figure -->
                            <svg id="dumbledore-svg" viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg">
                                <!-- Robe -->
                                <path d="M30 100 Q15 160 10 220 L150 220 Q145 160 130 100 Q95 120 65 120 Z" fill="#1a1040" stroke="#3a2a60" stroke-width="1.5" />
                                <!-- Robe highlight -->
                                <path d="M60 110 Q50 155 48 220 M100 110 Q110 155 112 220" stroke="#2a1a50" stroke-width="1" fill="none" opacity="0.6" />
                                <!-- Stars on robe -->
                                <text x="45" y="155" font-size="10" fill="#c9a84c" opacity="0.7">✦</text>
                                <text x="95" y="175" font-size="8" fill="#c9a84c" opacity="0.5">✦</text>
                                <text x="65" y="195" font-size="7" fill="#c9a84c" opacity="0.4">⋆</text>
                                <!-- Belt / sash -->
                                <path d="M35 130 Q80 135 125 130" stroke="#c9a84c" stroke-width="2" fill="none" opacity="0.6" />
                                <!-- Body/shirt -->
                                <ellipse cx="80" cy="100" rx="35" ry="28" fill="#d4c0a0" stroke="#b8a060" stroke-width="1" />
                                <!-- Beard -->
                                <path d="M55 115 Q60 145 65 160 Q70 165 75 162 Q80 168 85 162 Q90 166 95 160 Q100 145 105 115 Q90 125 80 127 Q70 125 55 115Z" fill="#e8e0d0" opacity="0.9" />
                                <!-- Beard texture -->
                                <path d="M65 125 Q67 145 68 158 M75 127 Q75 148 75 162 M85 127 Q85 148 86 160 M95 124 Q93 144 92 156" stroke="rgba(150,140,120,0.4)" stroke-width="1" fill="none" />
                                <!-- Head -->
                                <ellipse cx="80" cy="82" rx="26" ry="28" fill="#f0d5b0" stroke="#c9a060" stroke-width="1" />
                                <!-- Face features -->
                                <!-- Eyes (wise) -->
                                <ellipse cx="70" cy="80" rx="4" ry="3.5" fill="white" />
                                <ellipse cx="90" cy="80" rx="4" ry="3.5" fill="white" />
                                <circle cx="71" cy="80" r="2.2" fill="#2244aa" />
                                <circle cx="91" cy="80" r="2.2" fill="#2244aa" />
                                <circle cx="71.8" cy="79" r="0.8" fill="white" />
                                <circle cx="91.8" cy="79" r="0.8" fill="white" />
                                <!-- Eyebrows (bushy) -->
                                <path d="M64 75 Q70 72 76 74" stroke="#888060" stroke-width="2" fill="none" stroke-linecap="round" />
                                <path d="M84 74 Q90 72 96 75" stroke="#888060" stroke-width="2" fill="none" stroke-linecap="round" />
                                <!-- Nose -->
                                <path d="M79 83 Q77 90 74 93 Q78 95 82 95 Q86 95 86 93 Q83 90 81 83Z" fill="rgba(180,130,80,0.3)" />
                                <!-- Half-moon glasses -->
                                <circle cx="70" cy="83" r="6" fill="none" stroke="#c9a84c" stroke-width="1.2" />
                                <circle cx="90" cy="83" r="6" fill="none" stroke="#c9a84c" stroke-width="1.2" />
                                <line x1="76" y1="83" x2="84" y2="83" stroke="#c9a84c" stroke-width="1.2" />
                                <line x1="64" y1="82" x2="60" y2="80" stroke="#c9a84c" stroke-width="1" />
                                <line x1="96" y1="82" x2="100" y2="80" stroke="#c9a84c" stroke-width="1" />
                                <!-- Mouth (wise smile) -->
                                <path d="M74 100 Q80 104 86 100" stroke="#a07850" stroke-width="1.5" fill="none" stroke-linecap="round" />
                                <!-- Long white hair -->
                                <path d="M54 75 Q45 85 42 100 Q40 110 44 118" stroke="#ddd8c8" stroke-width="3" fill="none" stroke-linecap="round" />
                                <path d="M56 72 Q48 80 46 95 Q44 108 48 120" stroke="#e8e4d8" stroke-width="2.5" fill="none" stroke-linecap="round" />
                                <path d="M106 75 Q115 85 118 100 Q120 110 116 118" stroke="#ddd8c8" stroke-width="3" fill="none" stroke-linecap="round" />
                                <path d="M104 72 Q112 80 114 95 Q116 108 112 120" stroke="#e8e4d8" stroke-width="2.5" fill="none" stroke-linecap="round" />
                                <!-- Pointed wizard hat -->
                                <path d="M55 62 Q80 5 105 62 Z" fill="#1a1040" stroke="#3a2a60" stroke-width="1.5" />
                                <path d="M55 62 Q80 15 105 62" fill="none" stroke="rgba(201,168,76,0.3)" stroke-width="1" />
                                <rect x="48" y="60" width="64" height="10" rx="5" fill="#1a1040" stroke="#3a2a60" stroke-width="1.5" />
                                <!-- Hat star -->
                                <text x="73" y="48" font-size="12" fill="#c9a84c" text-anchor="middle">✦</text>
                                <!-- Hat band -->
                                <rect x="48" y="60" width="64" height="4" rx="2" fill="#c9a84c" opacity="0.5" />
                                <!-- Wand (right arm extended) -->
                                <line x1="125" y1="108" x2="155" y2="72" stroke="#5a3e1e" stroke-width="4" stroke-linecap="round" />
                                <line x1="125" y1="108" x2="155" y2="72" stroke="#8a6030" stroke-width="2" stroke-linecap="round" opacity="0.6" />
                                <!-- Wand tip glow -->
                                <circle cx="155" cy="72" r="4" fill="#fff9c4" opacity="0.9" id="wand-glow">
                                    <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="155" cy="72" r="8" fill="#c9a84c" opacity="0.3" id="wand-outer-glow">
                                    <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
                                </circle>
                            </svg>
                        </div>
                        <div class="speech-bubble">🪄 Click to hear the word!</div>
                        <div id="dore-label">✦ Professor Dumbledore ✦</div>
                    </div>

                    <div class="ornament">— ⚯͛ —</div>

                    <div class="spell-input-wrap">
                        <input id="spell-input" type="text"
                            placeholder="Type your spell…"
                            autocomplete="off" autocorrect="off"
                            autocapitalize="off" spellcheck="false">
                    </div>

                    <div id="feedback-msg"></div>
                    <div id="reveal-word"></div>

                    <div id="meaning-box">
                        <strong>📜 Definition Scroll</strong>
                        <span id="meaning-text"></span>
                    </div>

                    <div class="game-controls">
                        <button class="ctrl-btn primary" onclick="submitSpelling()">⚡ Cast Spell</button>
                        <button class="ctrl-btn secondary" onclick="speakWord()">🔊 Hear Again</button>
                        <button class="ctrl-btn secondary" onclick="speakSentence()" id="btn-sentence">📖 Hear Sentence</button>
                        <button class="ctrl-btn secondary" onclick="showMeaning()" id="btn-meaning">📜 Meaning</button>
                        <button class="ctrl-btn muted" onclick="skipWord()">Skip →</button>
                    </div>
                </div>
            </div>
        </div>