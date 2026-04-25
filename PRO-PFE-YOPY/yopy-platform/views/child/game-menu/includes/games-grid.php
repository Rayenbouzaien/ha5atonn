<?php
$config = include __DIR__ . '/../../../../config/database.php';

$conn = new mysqli(
    $config['host'],
    $config['username'],
    $config['password'],
    $config['database'],
    $config['port']
);

$gamesById = [];
if (!$conn->connect_error) {
    $result = $conn->query('SELECT game_id, name, category, difficulty, description, is_active FROM games');
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $gamesById[(int) $row['game_id']] = $row;
        }
        $result->free();
    }
    $conn->close();
}

function esc($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}
?>

<div id="cardsGrid">

    <?php $game = $gamesById[1] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ MEMORY MATCH ══ -->
    <div class="game-card"
        style="--gc:#818CF8;--gc-dark:#3730A3;--gc-rgb:129,140,248;--card-bg:linear-gradient(145deg,#0e0c2e 0%,#1e1b4b 60%,#0e0c2e 100%)"
        data-href="../games/memory_game/memory_game.php" data-color-rgb="129,140,248">
        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="hexP" x="0" y="0" width="30" height="34" patternUnits="userSpaceOnUse">
                    <polygon points="15,2 28,9 28,25 15,32 2,25 2,9" fill="none" stroke="#818CF8" stroke-width="1" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#hexP)" />
        </svg>
        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">⭐⭐⭐</div>
        <div class="card-icon-area">
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="40" width="60" height="80" rx="12" fill="#312e81" stroke="#818CF8" stroke-width="2.5" transform="rotate(-8,40,80)" />
                <rect x="90" y="40" width="60" height="80" rx="12" fill="#312e81" stroke="#818CF8" stroke-width="2.5" transform="rotate(8,120,80)" />
                <rect x="50" y="30" width="60" height="80" rx="12" fill="#4338CA" stroke="#818CF8" stroke-width="2.5" />
                <g transform="translate(80,70)">
                    <path d="M0-18 Q14-18 18-8 Q24-2 20 8 Q24 16 16 22 Q8 28 0 24 Q-8 28-16 22 Q-24 16-20 8 Q-24-2-18-8 Q-14-18 0-18Z" fill="#818CF8" />
                    <path d="M0-18 L0 24" stroke="#3730A3" stroke-width="2" fill="none" />
                    <path d="M-20 8 Q-8 2 0 8 Q8 2 20 8" stroke="#3730A3" stroke-width="2" fill="none" />
                    <circle cx="0" cy="-18" r="3.5" fill="#C7D2FE" />
                </g>
                <text x="12" y="32" font-size="16" opacity=".7">✨</text>
                <text x="128" y="36" font-size="14" opacity=".6">⚡</text>
            </svg>
        </div>
        <div class="card-foot">
            <div class="card-divider"></div>
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="65"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">🧠 <?= esc($game['category']) ?></span><span class="spill">⚡ <?= esc(ucfirst($game['difficulty'])) ?></span><span class="spill">👀 Focus</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/memory_game/memory_game.php','#4338CA')">▶ Play Now</button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[2] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ SIMON SAYS ══ -->
    <div class="game-card"
        style="--gc:#4ADE80;--gc-dark:#166534;--gc-rgb:74,222,128;--card-bg:linear-gradient(145deg,#021209 0%,#052e16 60%,#021209 100%)"
        data-href="../games/simon_says/simon_says.php" data-color-rgb="74,222,128">
        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="circP" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="14" fill="none" stroke="#4ADE80" stroke-width="1" />
                    <circle cx="20" cy="20" r="7" fill="none" stroke="#4ADE80" stroke-width=".6" opacity=".5" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#circP)" />
        </svg>
        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">⭐⭐⭐</div>
        <div class="card-icon-area">
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="65" fill="none" stroke="#166534" stroke-width="14" opacity="0.7" />
                <path d="M80 15 A65 65 0 0 1 145 80 Z" fill="#e74c3c" />
                <path d="M80 80 L145 80 A65 65 0 0 1 80 145 Z" fill="#f1c40f" />
                <path d="M80 80 L80 145 A65 65 0 0 1 15 80 Z" fill="#2ecc71" />
                <path d="M80 80 L15 80 A65 65 0 0 1 80 15 Z" fill="#3498db" />
                <circle cx="80" cy="80" r="23" fill="#052e16" />
                <circle cx="80" cy="80" r="13" fill="#166534" />
                <circle cx="80" cy="80" r="38" fill="none" stroke="#fff" stroke-width="3" opacity="0.4" />
                <text x="22" y="28" font-size="19" opacity="0.9">🎵</text>
            </svg>
        </div>
        <div class="card-foot">
            <div class="card-divider"></div>
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="50"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">🎲 <?= esc($game['category']) ?></span><span class="spill">⚡ <?= esc(ucfirst($game['difficulty'])) ?></span><span class="spill">👀 Focus</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/simon_says/simon_says.php','#166534')">▶ Play Now</button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[3] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ SUDOKU ══ -->
    <div class="game-card"
        style="--gc:#38BDF8;--gc-dark:#0c4a6e;--gc-rgb:56,189,248;--card-bg:linear-gradient(145deg,#020a18 0%,#0c2a4a 60%,#020a18 100%)"
        data-href="../games/sudoku_pro/sudoku_pro.php" data-color-rgb="56,189,248">
        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="gridP" x="0" y="0" width="33" height="33" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="33" height="33" fill="none" stroke="#38BDF8" stroke-width=".7" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#gridP)" />
            <line x1="66" y1="0" x2="66" y2="200" stroke="#38BDF8" stroke-width="2" opacity=".6" />
            <line x1="133" y1="0" x2="133" y2="200" stroke="#38BDF8" stroke-width="2" opacity=".6" />
            <line x1="0" y1="66" x2="200" y2="66" stroke="#38BDF8" stroke-width="2" opacity=".6" />
            <line x1="0" y1="133" x2="200" y2="133" stroke="#38BDF8" stroke-width="2" opacity=".6" />
        </svg>
        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">⭐⭐⭐</div>
        <div class="card-icon-area">
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <rect x="18" y="18" width="124" height="124" rx="10" fill="#0c2a4a" stroke="#38BDF8" stroke-width="2.5" />
                <line x1="59" y1="18" x2="59" y2="142" stroke="#38BDF8" stroke-width=".9" opacity=".4" />
                <line x1="101" y1="18" x2="101" y2="142" stroke="#38BDF8" stroke-width=".9" opacity=".4" />
                <line x1="18" y1="59" x2="142" y2="59" stroke="#38BDF8" stroke-width=".9" opacity=".4" />
                <line x1="18" y1="101" x2="142" y2="101" stroke="#38BDF8" stroke-width=".9" opacity=".4" />
                <text x="31" y="50" font-family="monospace" font-weight="800" font-size="18" fill="#38BDF8">5</text>
                <text x="72" y="50" font-family="monospace" font-weight="800" font-size="18" fill="#fff" opacity=".4">3</text>
                <text x="113" y="50" font-family="monospace" font-weight="800" font-size="18" fill="#38BDF8">8</text>
                <text x="31" y="91" font-family="monospace" font-weight="800" font-size="18" fill="#fff" opacity=".4">1</text>
                <text x="72" y="91" font-family="monospace" font-weight="800" font-size="18" fill="#38BDF8">7</text>
                <text x="113" y="91" font-family="monospace" font-weight="800" font-size="18" fill="#fff" opacity=".4">2</text>
                <text x="31" y="133" font-family="monospace" font-weight="800" font-size="18" fill="#38BDF8">4</text>
                <text x="72" y="133" font-family="monospace" font-weight="800" font-size="18" fill="#fff" opacity=".4">9</text>
                <text x="113" y="133" font-family="monospace" font-weight="800" font-size="18" fill="#38BDF8">6</text>
            </svg>
        </div>
        <div class="card-foot">
            <div class="card-divider"></div>
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="40"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">🧠 <?= esc($game['category']) ?></span><span class="spill">⚡ <?= esc(ucfirst($game['difficulty'])) ?></span><span class="spill">👀 Focus</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/sudoku_pro/sudoku_pro.php','#0c4a6e')">▶ Play Now</button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[4] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ TIC-TAC-TOE ══ -->
    <div class="game-card"
        style="--gc:#F472B6;--gc-dark:#831843;--card-bg:linear-gradient(145deg,#1a0514 0%,#3b0a28 60%,#1a0514 100%)"
        data-href="../games/tic_tac_toe/tic_tac_toe.php"
        data-color-rgb="244,114,182">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <!-- 3x3 grid pattern -->
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <line x1="67" y1="10" x2="67" y2="190" stroke="#F472B6" stroke-width="1.2" opacity=".4" />
            <line x1="133" y1="10" x2="133" y2="190" stroke="#F472B6" stroke-width="1.2" opacity=".4" />
            <line x1="10" y1="67" x2="190" y2="67" stroke="#F472B6" stroke-width="1.2" opacity=".4" />
            <line x1="10" y1="133" x2="190" y2="133" stroke="#F472B6" stroke-width="1.2" opacity=".4" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- ORIGINAL Tic-Tac-Toe SVG -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <line x1="53" y1="20" x2="53" y2="140" stroke="#F472B6" stroke-width="5" stroke-linecap="round" />
                <line x1="107" y1="20" x2="107" y2="140" stroke="#F472B6" stroke-width="5" stroke-linecap="round" />
                <line x1="20" y1="53" x2="140" y2="53" stroke="#F472B6" stroke-width="5" stroke-linecap="round" />
                <line x1="20" y1="107" x2="140" y2="107" stroke="#F472B6" stroke-width="5" stroke-linecap="round" />
                <line x1="28" y1="28" x2="46" y2="46" stroke="#9D3FFF" stroke-width="5" stroke-linecap="round" />
                <line x1="46" y1="28" x2="28" y2="46" stroke="#9D3FFF" stroke-width="5" stroke-linecap="round" />
                <circle cx="80" cy="37" r="12" fill="none" stroke="#F472B6" stroke-width="5" />
                <line x1="64" y1="64" x2="96" y2="96" stroke="#9D3FFF" stroke-width="5" stroke-linecap="round" />
                <line x1="96" y1="64" x2="64" y2="96" stroke="#9D3FFF" stroke-width="5" stroke-linecap="round" />
                <circle cx="124" cy="80" r="12" fill="none" stroke="#F472B6" stroke-width="5" />
                <circle cx="37" cy="124" r="12" fill="none" stroke="#F472B6" stroke-width="5" />
                <text x="118" y="28" font-size="14" opacity=".7">&#10024;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="55"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#9889; <?= esc($game['category']) ?></span>
                <span class="spill">&#129504; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#128064; Focus</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/tic_tac_toe/tic_tac_toe.php','#831843')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[5] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ WHACK-A-MOLE ══ -->
    <div class="game-card"
        style="--gc:#4ade80;--gc-dark:#14532d;--card-bg:linear-gradient(145deg,#052e16 0%,#166534 60%,#052e16 100%)"
        data-href="../games/whack_a_mole/whack_a_mole.php"
        data-color-rgb="74,222,128">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="dotP" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="3" fill="#4ade80" opacity=".3" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#dotP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- ORIGINAL Whack-a-Mole SVG -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <!-- grass ground -->
                <rect x="10" y="105" width="140" height="45" rx="8" fill="#15803d" />
                <!-- 3 holes -->
                <ellipse cx="40" cy="108" rx="20" ry="8" fill="#1c0a00" />
                <ellipse cx="80" cy="108" rx="20" ry="8" fill="#1c0a00" />
                <ellipse cx="120" cy="108" rx="20" ry="8" fill="#1c0a00" />
                <!-- mole popping from middle hole -->
                <ellipse cx="80" cy="100" rx="16" ry="18" fill="#a16207" />
                <ellipse cx="80" cy="93" rx="12" ry="13" fill="#c2843a" />
                <!-- eyes -->
                <circle cx="75" cy="90" r="3" fill="white" />
                <circle cx="85" cy="90" r="3" fill="white" />
                <circle cx="76" cy="90" r="1.5" fill="#1c0a00" />
                <circle cx="86" cy="90" r="1.5" fill="#1c0a00" />
                <!-- nose -->
                <ellipse cx="80" cy="95" rx="4" ry="2.5" fill="#7c2d12" />
                <!-- hammer -->
                <rect x="108" y="55" width="8" height="30" rx="3" fill="#92400e" transform="rotate(30 112 70)" />
                <rect x="100" y="48" width="22" height="16" rx="5" fill="#4ade80" transform="rotate(30 111 56)" />
                <!-- stars -->
                <text x="12" y="30" font-size="16" opacity=".8">&#10024;</text>
                <text x="128" y="52" font-size="14" opacity=".7">&#11088;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="70"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#9889; <?= esc($game['category']) ?></span>
                <span class="spill">&#128064; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#127919; Precision</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/whack_a_mole/whack_a_mole.php','#166534')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[6] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ SNAKE RETRO ══ -->
    <div class="game-card"
        style="--gc:#c1121f;--gc-dark:#780000;--card-bg:linear-gradient(145deg,#000814 0%,#001d3d 60%,#000814 100%)"
        data-href="../games/snake_retro/snake_retro.php"
        data-color-rgb="193,18,31">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="snakeGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="20" height="20" fill="none" stroke="#001d3d" stroke-width="1" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#snakeGrid)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="15" width="130" height="130" rx="8" fill="#000814" stroke="#001d3d" stroke-width="1.5" />
                <rect x="30" y="75" width="18" height="18" rx="5" fill="#c1121f" opacity=".7" />
                <rect x="52" y="75" width="18" height="18" rx="5" fill="#c1121f" opacity=".8" />
                <rect x="74" y="75" width="18" height="18" rx="5" fill="#c1121f" opacity=".9" />
                <rect x="74" y="53" width="18" height="18" rx="5" fill="#c1121f" opacity=".9" />
                <rect x="74" y="31" width="18" height="18" rx="5" fill="#780000" />
                <defs>
                    <linearGradient id="headG" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#780000" />
                        <stop offset="100%" stop-color="#c1121f" />
                    </linearGradient>
                </defs>
                <rect x="74" y="31" width="18" height="18" rx="5" fill="url(#headG)" />
                <circle cx="79" cy="36" r="2" fill="#ffc300" />
                <circle cx="87" cy="36" r="2" fill="#ffc300" />
                <rect x="108" y="53" width="18" height="18" rx="5" fill="#ee9b00" stroke="#e76f51" stroke-width="1.5" />
                <text x="120" y="30" font-size="14" opacity=".8">&#10024;</text>
                <text x="22" y="140" font-size="13" opacity=".6">&#11088;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="60"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#9889; <?= esc($game['category']) ?></span>
                <span class="spill">&#129504; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#127919; Precision</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/snake_retro/snake_retro.php','#780000')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[7] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <div class="game-card"
        style="--gc:#4AACFF;--gc-dark:#1e40af;--card-bg:linear-gradient(145deg,#030e1f 0%,#0c2461 60%,#030e1f 100%)"
        data-href="../games/math_sprint/math_sprint.php"
        data-color-rgb="74,172,255">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="mathP" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <text x="8" y="22" font-family="monospace" font-size="16" fill="#4AACFF" opacity=".18">+</text>
                    <text x="24" y="38" font-family="monospace" font-size="14" fill="#4AACFF" opacity=".13">×</text>
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#mathP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- ORIGINAL Math Sprint SVG -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <!-- equations scrolling -->
                <rect x="18" y="18" width="124" height="124" rx="10" fill="#030e1f" stroke="#4AACFF" stroke-width="2" />
                <!-- highlight band -->
                <rect x="18" y="68" width="124" height="24" fill="#4AACFF" opacity=".2" rx="2" />
                <!-- equations text -->
                <text x="30" y="44" font-family="monospace" font-size="12" fill="#4AACFF" opacity=".4">3 × 7 = 21</text>
                <text x="30" y="62" font-family="monospace" font-size="12" fill="#4AACFF" opacity=".6">5 × 6 = 30</text>
                <text x="30" y="84" font-family="monospace" font-size="13" fill="#4AACFF" font-weight="bold">4 × 8 = 32</text>
                <text x="30" y="104" font-family="monospace" font-size="12" fill="#4AACFF" opacity=".5">9 × 3 = 28</text>
                <text x="30" y="122" font-family="monospace" font-size="12" fill="#4AACFF" opacity=".3">2 × 7 = 14</text>
                <!-- wrong/right buttons hint -->
                <rect x="18" y="132" width="58" height="10" rx="3" fill="#d61717" opacity=".7" />
                <rect x="84" y="132" width="58" height="10" rx="3" fill="#0f9e02" opacity=".7" />
                <!-- sparkle -->
                <text x="128" y="28" font-size="14" opacity=".8">&#9889;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="65"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#129504; <?= esc($game['category']) ?></span>
                <span class="spill">&#9889; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#128064; Focus</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/math_sprint/math_sprint.php','#1e40af')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[8] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ WORD SCRAMBLE ══ -->
    <div class="game-card"
        style="--gc:#f59e0b;--gc-dark:#78350f;--card-bg:linear-gradient(145deg,#1c0f03 0%,#451a03 60%,#1c0f03 100%)"
        data-href="../games/word_scramble/word_scramble.php"
        data-color-rgb="245,158,11">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="alphaP" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <text x="8" y="24" font-family="monospace" font-size="18" fill="#f59e0b" opacity=".15">A</text>
                    <text x="24" y="40" font-family="monospace" font-size="16" fill="#f59e0b" opacity=".10">Z</text>
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#alphaP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- ORIGINAL Word Scramble SVG -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <!-- scramble tiles -->
                <rect x="12" y="40" width="38" height="44" rx="10" fill="#f59e0b" opacity=".9" />
                <text x="31" y="70" font-family="monospace" font-size="28" font-weight="bold" fill="white" text-anchor="middle">S</text>
                <rect x="58" y="40" width="38" height="44" rx="10" fill="#f59e0b" opacity=".7" />
                <text x="77" y="70" font-family="monospace" font-size="28" font-weight="bold" fill="white" text-anchor="middle">R</text>
                <rect x="104" y="40" width="38" height="44" rx="10" fill="#f59e0b" opacity=".85" />
                <text x="123" y="70" font-family="monospace" font-size="28" font-weight="bold" fill="white" text-anchor="middle">A</text>
                <!-- answer boxes -->
                <rect x="12" y="96" width="38" height="44" rx="10" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 4" />
                <text x="31" y="126" font-family="monospace" font-size="28" font-weight="bold" fill="#f59e0b" text-anchor="middle" opacity=".8">A</text>
                <rect x="58" y="96" width="38" height="44" rx="10" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 4" />
                <text x="77" y="126" font-family="monospace" font-size="28" font-weight="bold" fill="#f59e0b" text-anchor="middle" opacity=".6">R</text>
                <rect x="104" y="96" width="38" height="44" rx="10" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 4" />
                <text x="123" y="126" font-family="monospace" font-size="28" font-weight="bold" fill="#f59e0b" text-anchor="middle" opacity=".7">S</text>
                <text x="145" y="30" font-size="14" opacity=".8">&#10024;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="60"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#128218; <?= esc($game['category']) ?></span>
                <span class="spill">&#129504; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#9889; Speed</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/word_scramble/word_scramble.php','#78350f')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[9] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ SPELLING BEE ══ -->
    <div class="game-card"
        style="--gc:#f59e0b;--gc-dark:#78350f;--card-bg:linear-gradient(145deg,#1c1003 0%,#451a03 60%,#1c1003 100%)"
        data-href="../games/spelling_bee/spelling_bee.php"
        data-color-rgb="245,158,11">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="beeP" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <text x="6" y="24" font-size="20" opacity=".12">🐝</text>
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#beeP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- ORIGINAL Spelling Bee SVG -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <!-- honeycomb bg -->
                <rect x="15" y="15" width="130" height="130" rx="10" fill="#1c1003" />
                <!-- bee body -->
                <ellipse cx="80" cy="72" rx="28" ry="20" fill="#f59e0b" />
                <rect x="60" y="65" width="12" height="14" rx="3" fill="#1c1003" opacity=".7" />
                <rect x="76" y="65" width="12" height="14" rx="3" fill="#1c1003" opacity=".7" />
                <!-- head -->
                <circle cx="80" cy="52" r="14" fill="#f59e0b" />
                <circle cx="75" cy="49" r="3" fill="#1c1003" />
                <circle cx="85" cy="49" r="3" fill="#1c1003" />
                <!-- antennae -->
                <line x1="75" y1="39" x2="68" y2="30" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" />
                <circle cx="67" cy="29" r="3" fill="#f59e0b" />
                <line x1="85" y1="39" x2="92" y2="30" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" />
                <circle cx="93" cy="29" r="3" fill="#f59e0b" />
                <!-- wings -->
                <ellipse cx="58" cy="58" rx="16" ry="9" fill="white" opacity=".5" transform="rotate(-20 58 58)" />
                <ellipse cx="102" cy="58" rx="16" ry="9" fill="white" opacity=".5" transform="rotate(20 102 58)" />
                <!-- input line hint -->
                <rect x="30" y="108" width="100" height="18" rx="6" fill="none" stroke="#f59e0b" stroke-width="2" />
                <text x="43" y="122" font-family="monospace" font-size="12" fill="#f59e0b" opacity=".7">b-e-e-h-i-v-e</text>
                <text x="130" y="30" font-size="13" opacity=".8">&#10024;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="55"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#128218; <?= esc($game['category']) ?></span>
                <span class="spill">&#128250; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#129504; Memory</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/spelling_bee/spelling_bee.php','#78350f')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[10] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ TETRIS ══ -->
    <div class="game-card"
        style="--gc:#a855f7;--gc-dark:#3b0764;--card-bg:linear-gradient(145deg,#0d0d1a 0%,#1e0a3c 60%,#0d0d1a 100%)"
        data-href="../games/tetris_block/tetris_block.php"
        data-color-rgb="168,85,247">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="tetP" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="1" y="1" width="18" height="18" rx="2" fill="none" stroke="#a855f7" stroke-width=".5" opacity=".15" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#tetP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- ORIGINAL Tetris SVG -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <!-- board outline -->
                <rect x="35" y="12" width="90" height="136" rx="4" fill="#0d0d1a" stroke="#a855f7" stroke-width="2" />
                <!-- I piece - cyan -->
                <rect x="40" y="18" width="16" height="16" rx="2" fill="#22d3ee" />
                <rect x="58" y="18" width="16" height="16" rx="2" fill="#22d3ee" />
                <rect x="76" y="18" width="16" height="16" rx="2" fill="#22d3ee" />
                <rect x="94" y="18" width="16" height="16" rx="2" fill="#22d3ee" />
                <!-- T piece - purple -->
                <rect x="58" y="36" width="16" height="16" rx="2" fill="#a855f7" />
                <rect x="40" y="54" width="16" height="16" rx="2" fill="#a855f7" />
                <rect x="58" y="54" width="16" height="16" rx="2" fill="#a855f7" />
                <rect x="76" y="54" width="16" height="16" rx="2" fill="#a855f7" />
                <!-- L piece - orange -->
                <rect x="94" y="36" width="16" height="16" rx="2" fill="#fb923c" />
                <rect x="94" y="54" width="16" height="16" rx="2" fill="#fb923c" />
                <rect x="94" y="72" width="16" height="16" rx="2" fill="#fb923c" />
                <rect x="76" y="72" width="16" height="16" rx="2" fill="#fb923c" />
                <!-- bottom filled rows -->
                <rect x="40" y="108" width="80" height="16" rx="2" fill="#facc15" opacity=".5" />
                <rect x="40" y="126" width="80" height="16" rx="2" fill="#4ade80" opacity=".6" />
                <!-- line clear flash -->
                <rect x="35" y="106" width="90" height="20" rx="3" fill="white" opacity=".08" />
                <text x="128" y="28" font-size="14" opacity=".8">&#10024;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="70"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#129504; <?= esc($game['category']) ?></span>
                <span class="spill">&#9889; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#128064; Focus</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/tetris_block/tetris_block.php','#3b0764')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[11] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ MAZE RUNNER ══ -->
    <div class="game-card"
        style="--gc:#4ECDC4;--gc-dark:#0e4d49;--card-bg:linear-gradient(145deg,#021a18 0%,#0a3330 60%,#021a18 100%)"
        data-href="../games/maze_runner/maze_runner.php"
        data-color-rgb="78,205,196">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="mazeP" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="10" x2="20" y2="10" stroke="#4ECDC4" stroke-width=".5" opacity=".2" />
                    <line x1="10" y1="0" x2="10" y2="20" stroke="#4ECDC4" stroke-width=".5" opacity=".2" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#mazeP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- ORIGINAL Maze Runner SVG -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <!-- maze walls -->
                <rect x="15" y="15" width="130" height="130" rx="6" fill="#021a18" stroke="#4ECDC4" stroke-width="2" />
                <!-- inner maze lines (simplified) -->
                <line x1="45" y1="15" x2="45" y2="75" stroke="#4ECDC4" stroke-width="3" stroke-linecap="round" />
                <line x1="75" y1="55" x2="75" y2="145" stroke="#4ECDC4" stroke-width="3" stroke-linecap="round" />
                <line x1="105" y1="15" x2="105" y2="85" stroke="#4ECDC4" stroke-width="3" stroke-linecap="round" />
                <line x1="15" y1="55" x2="75" y2="55" stroke="#4ECDC4" stroke-width="3" stroke-linecap="round" />
                <line x1="45" y1="85" x2="105" y2="85" stroke="#4ECDC4" stroke-width="3" stroke-linecap="round" />
                <line x1="75" y1="115" x2="145" y2="115" stroke="#4ECDC4" stroke-width="3" stroke-linecap="round" />
                <!-- start key -->
                <text x="22" y="40" font-size="20">🔑</text>
                <!-- end house -->
                <text x="118" y="140" font-size="20">🏠</text>
                <!-- path dots -->
                <circle cx="30" cy="68" r="3" fill="#4ECDC4" opacity=".7" />
                <circle cx="30" cy="100" r="3" fill="#4ECDC4" opacity=".7" />
                <circle cx="58" cy="100" r="3" fill="#4ECDC4" opacity=".7" />
                <circle cx="88" cy="100" r="3" fill="#4ECDC4" opacity=".7" />
                <circle cx="88" cy="128" r="3" fill="#4ECDC4" opacity=".7" />
                <circle cx="118" cy="128" r="3" fill="#4ECDC4" opacity=".7" />
                <text x="128" y="28" font-size="13" opacity=".8">&#10024;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="65"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#129504; <?= esc($game['category']) ?></span>
                <span class="spill">&#9889; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#128064; Focus</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/maze_runner/maze_runner.php','#0e4d49')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[12] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ TILE PUZZLE ══ -->
    <div class="game-card"
        style="--gc:#9D3FFF;--gc-dark:#3b0764;--card-bg:linear-gradient(145deg,#0d0320 0%,#1e0a3c 60%,#0d0320 100%)"
        data-href="../games/tile_puzzle/tile_puzzle.php"
        data-color-rgb="157,63,255">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="tileP" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect x="2" y="2" width="36" height="36" rx="6" fill="none" stroke="#9D3FFF" stroke-width=".6" opacity=".18" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#tileP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- ORIGINAL Tile Puzzle SVG -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <!-- 3x3 grid of tiles with one missing -->
                <rect x="15" y="15" width="38" height="38" rx="8" fill="#9D3FFF" />
                <text x="34" y="40" font-family="Arial" font-weight="800" font-size="20" fill="white" text-anchor="middle">1</text>
                <rect x="61" y="15" width="38" height="38" rx="8" fill="#7c3aed" />
                <text x="80" y="40" font-family="Arial" font-weight="800" font-size="20" fill="white" text-anchor="middle">2</text>
                <rect x="107" y="15" width="38" height="38" rx="8" fill="#6d28d9" />
                <text x="126" y="40" font-family="Arial" font-weight="800" font-size="20" fill="white" text-anchor="middle">3</text>
                <rect x="15" y="61" width="38" height="38" rx="8" fill="#4AACFF" />
                <text x="34" y="86" font-family="Arial" font-weight="800" font-size="20" fill="white" text-anchor="middle">4</text>
                <rect x="61" y="61" width="38" height="38" rx="8" fill="#4ECDC4" />
                <text x="80" y="86" font-family="Arial" font-weight="800" font-size="20" fill="white" text-anchor="middle">5</text>
                <rect x="107" y="61" width="38" height="38" rx="8" fill="#FFD700" />
                <text x="126" y="86" font-family="Arial" font-weight="800" font-size="20" fill="#333" text-anchor="middle">6</text>
                <rect x="15" y="107" width="38" height="38" rx="8" fill="#f97316" />
                <text x="34" y="132" font-family="Arial" font-weight="800" font-size="20" fill="white" text-anchor="middle">7</text>
                <rect x="61" y="107" width="38" height="38" rx="8" fill="#f59e0b" />
                <text x="80" y="132" font-family="Arial" font-weight="800" font-size="20" fill="white" text-anchor="middle">8</text>
                <!-- empty slot with arrow hint -->
                <rect x="107" y="107" width="38" height="38" rx="8" fill="rgba(157,63,255,.1)" stroke="#9D3FFF" stroke-width="2" stroke-dasharray="5 3" />
                <text x="126" y="132" font-family="Arial" font-size="20" fill="#9D3FFF" text-anchor="middle" opacity=".6">→</text>
                <text x="148" y="28" font-size="13" opacity=".8">&#10024;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="60"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#129504; <?= esc($game['category']) ?></span>
                <span class="spill">&#9889; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#127919; Planning</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/tile_puzzle/tile_puzzle.php','#3b0764')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[13] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ HANGMAN QUEST ══ -->
    <div class="game-card"
        style="--gc:#FF8FBC;--gc-dark:#831843;--card-bg:linear-gradient(145deg,#1f0813 0%,#4a0e2d 60%,#1f0813 100%)"
        data-href="../games/hangman_quest.php"
        data-color-rgb="255,143,188">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="hangP" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <text x="5" y="20" font-family="monospace" font-weight="bold" font-size="14" fill="#FF8FBC" opacity=".15">A</text>
                    <text x="25" y="35" font-family="monospace" font-weight="bold" font-size="12" fill="#FF8FBC" opacity=".10">?</text>
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#hangP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- ORIGINAL Hangman Quest SVG -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <line x1="30" y1="135" x2="100" y2="135" stroke="#4a0e2d" stroke-width="8" stroke-linecap="round" />
                <line x1="65" y1="135" x2="65" y2="30" stroke="#4a0e2d" stroke-width="8" stroke-linecap="round" />
                <line x1="61" y1="30" x2="115" y2="30" stroke="#4a0e2d" stroke-width="8" stroke-linecap="round" />
                <line x1="110" y1="30" x2="110" y2="45" stroke="#4a0e2d" stroke-width="4" stroke-linecap="round" />

                <circle cx="110" cy="58" r="11" fill="none" stroke="#FF8FBC" stroke-width="4.5" />
                <line x1="110" y1="69" x2="110" y2="95" stroke="#FF8FBC" stroke-width="4.5" stroke-linecap="round" />
                <line x1="110" y1="76" x2="95" y2="86" stroke="#FF8FBC" stroke-width="4.5" stroke-linecap="round" />
                <line x1="110" y1="76" x2="125" y2="86" stroke="#FF8FBC" stroke-width="4.5" stroke-linecap="round" />
                <line x1="110" y1="95" x2="98" y2="112" stroke="#FF8FBC" stroke-width="4.5" stroke-linecap="round" />
                <line x1="110" y1="95" x2="122" y2="112" stroke="#FF8FBC" stroke-width="4.5" stroke-linecap="round" />

                <line x1="25" y1="100" x2="45" y2="100" stroke="#FF8FBC" stroke-width="4" stroke-linecap="round" />
                <text x="27" y="93" font-family="monospace" font-size="24" font-weight="bold" fill="#FF8FBC">Y</text>
                <line x1="53" y1="100" x2="73" y2="100" stroke="#FF8FBC" stroke-width="4" stroke-linecap="round" opacity=".3" />

                <text x="18" y="45" font-size="16" opacity=".7">&#10024;</text>
                <text x="135" y="130" font-size="14" opacity=".6">&#9889;</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="45"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#128218; <?= esc($game['category']) ?></span>
                <span class="spill">&#129504; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#9889; Logic</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/hangman_quest/hangman_quest.php','#831843')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[14] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ SYNONYM CHALLENGE ══ -->
    <div class="game-card"
        style="--gc:#4AACFF;--gc-dark:#1e3a8a;--card-bg:linear-gradient(145deg,#08131f 0%,#0e2d4a 60%,#08131f 100%)"
        data-href="../games/synonym_challenge/synonym_challenge.php"
        data-color-rgb="74,172,255">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="synP" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1.5" fill="#4AACFF" opacity=".2" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#synP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- NEW CREATIVE SVG: Speech bubbles with synonym link + glowing match check -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <!-- Left bubble -->
                <path d="M22 48 Q22 35 38 35 L88 35 Q98 35 98 48 L98 70 Q98 80 83 80 L35 80 Q22 80 22 70Z" fill="#4AACFF" />
                <text x="60" y="55" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">HAPPY</text>
                <!-- Right bubble -->
                <path d="M62 85 Q62 98 78 98 L128 98 Q138 98 138 85 L138 63 Q138 53 123 53 L70 53 Q62 53 62 63Z" fill="#9D3FFF" />
                <text x="100" y="73" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">JOYFUL</text>
                <!-- Synonym connection -->
                <line x1="93" y1="61" x2="107" y2="61" stroke="#fff" stroke-width="5" />
                <path d="M105 57 L112 61 L105 65" fill="#fff" />
                <!-- Match check -->
                <path d="M122 115 L132 125 L150 105" fill="none" stroke="#4ade80" stroke-width="7" stroke-linecap="round" />
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="65"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">✍️ <?= esc($game['category']) ?></span>
                <span class="spill">📖 <?= esc(ucfirst($game['difficulty'])) ?></span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/synonym_challenge/synonym_challenge.php','#1e3a8a')">▶ Play Now</button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[15] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ TOWER BLOCKS ══ -->
    <div class="game-card"
        style="--gc:#4AACFF;--gc-dark:#1e3a8a;--card-bg:linear-gradient(145deg,#08131f 0%,#0e2d4a 60%,#08131f 100%)"
        data-href="../games/tower_blocks/tower_blocks.php"
        data-color-rgb="74,172,255">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="synP" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1.5" fill="#4AACFF" opacity=".2" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#synP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;</div>

        <div class="card-icon-area">
            <!-- NEW CREATIVE SVG: Perfectly balanced tower + falling block with motion -->
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <!-- Base -->
                <rect x="42" y="118" width="76" height="17" rx="4" fill="#4AACFF" />
                <!-- Stacked blocks -->
                <rect x="47" y="101" width="66" height="17" rx="4" fill="#1e3a8a" />
                <rect x="45" y="84" width="70" height="17" rx="4" fill="#4AACFF" />
                <rect x="50" y="67" width="60" height="17" rx="4" fill="#1e3a8a" />
                <rect x="44" y="50" width="72" height="17" rx="4" fill="#4AACFF" />
                <!-- Placing block -->
                <rect x="53" y="32" width="54" height="17" rx="4" fill="#FBBF24" />
                <!-- Motion lines -->
                <line x1="50" y1="39" x2="38" y2="39" stroke="#fff" stroke-width="4" opacity="0.8" />
                <line x1="110" y1="39" x2="122" y2="39" stroke="#fff" stroke-width="4" opacity="0.8" />
                <!-- Height arrow -->
                <text x="125" y="68" font-size="24" opacity="0.95">🏗️</text>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="65"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">timing</span>
                <span class="spill"><?= esc(ucfirst($game['difficulty'])) ?></span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/tower_blocks/tower_blocks.php','#1e3a8a')">▶ Play Now</button>
        </div>
    </div>
    <?php endif; ?>

    <?php $game = $gamesById[16] ?? null; if ($game && (int) $game['is_active'] === 1): ?>
    <!-- ══ IMAGE PUZZLE ══ -->
    <div class="game-card"
        style="--gc:#d946ef;--gc-dark:#701a75;--card-bg:linear-gradient(145deg,#2e1065 0%,#4a044e 60%,#2e1065 100%)"
        data-href="../games/image_puzzle.php"
        data-color-rgb="217,70,239">

        <div class="card-bg-solid"></div>
        <div class="card-rarity-bar"></div>
        <svg class="card-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="puzzleP" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="15" height="15" fill="#d946ef" opacity=".05" />
                    <rect x="15" y="15" width="15" height="15" fill="#d946ef" opacity=".05" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#puzzleP)" />
        </svg>

        <div class="card-shine"></div>
        <div class="card-badge">
            <div class="badge-dot"></div><?= esc($game['category']) ?>
        </div>
        <div class="card-stars">&#11088;&#11088;&#11088;</div>

        <div class="card-icon-area">
            <svg class="card-icon-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="25" width="110" height="110" rx="8" fill="#1e1b4b" stroke="#d946ef" stroke-width="7" />

                <path d="M 28 28 L 80 28 L 80 40 A 10 10 0 0 0 100 40 L 100 28 L 132 28 L 132 80 L 120 80 A 10 10 0 0 0 120 100 L 132 100 L 132 132 L 80 132 L 80 120 A 10 10 0 0 1 60 120 L 60 132 L 28 132 Z" fill="#701a75" opacity="0.7" />

                <circle cx="60" cy="55" r="16" fill="#facc15" />
                <path d="M 28 132 L 65 80 L 95 115 L 125 90 L 132 100 L 132 132 Z" fill="#38bdf8" />

                <g transform="translate(85, 85)">
                    <path d="M 0 0 L 40 0 L 40 12 A 10 10 0 0 1 60 12 L 60 0 L 90 0 L 90 40 L 78 40 A 10 10 0 0 1 78 60 L 90 60 L 90 90 L 40 90 L 40 78 A 10 10 0 0 0 20 78 L 20 90 L 0 90 Z" fill="#d946ef" transform="scale(0.45)" />
                    <path d="M -18 -18 L -6 -6 M -10 -25 L 0 -15" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.9" />
                </g>
            </svg>
        </div>

        <div class="card-foot">
            <div class="mini-prog">
                <div class="mini-prog-fill" data-fill="45"></div>
            </div>
            <div class="skill-pills">
                <span class="spill">&#129513; <?= esc($game['category']) ?></span>
                <span class="spill">&#128064; <?= esc(ucfirst($game['difficulty'])) ?></span>
                <span class="spill">&#129504; Logic</span>
            </div>
            <p class="card-game-name"><?= esc($game['name']) ?></p>
            <p class="card-game-desc"><?= esc($game['description']) ?></p>
            <button class="play-btn" onclick="launchGame('../games/image_puzzle/image_puzzle.php','#701a75')">
                &#9654;&nbsp; Play Now
            </button>
        </div>
    </div>
    <?php endif; ?>

</div><!-- /cardsGrid -->