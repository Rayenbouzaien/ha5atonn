<?php
// views/child/games/whack_a_mole.php
// YOPY Whack-a-Mole | Category: Reaction / Speed
// SRS: REQ-13, REQ-14, REQ-15, REQ-18 | BR-05, BR-06, BR-07, BR-08
session_start();

if (!isset($_SESSION['user_id']) || ($_SESSION['chosen_mode'] ?? '') !== 'child') {
    header('Location: ../../../views/auth/login.php'); exit;
}
$nickname  = htmlspecialchars($_SESSION['username']  ?? 'Explorer');
$buddyId   = htmlspecialchars($_SESSION['chosen_character']['id'] ?? 'joy');
$sessionId = htmlspecialchars($_SESSION['current_game_session'] ?? '');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YOPY — Whack-a-Mole</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="whack_a_mole.css">
</head>
<body>
<?php include '../ad.php'; ?>
<canvas id="particles"></canvas>

<!-- ── Topbar ── -->
<div class="topbar">
    <div class="topbar-logo">YOPY</div>
    <div class="topbar-center">
        <div class="hud-pill"><span>Score</span><span id="hud-score">0</span></div>
        <div class="hud-pill timer-pill" id="timer-pill"><span>⏱</span><span id="hud-timer">30</span></div>
    </div>
    <div class="topbar-right">
        <div class="topbar-buddy">
            <span><?= $nickname ?></span>
            <div class="buddy-avatar" id="buddy-avatar">😊</div>
        </div>
        <a href="../../game-menu/menu.php" class="btn-back">← Menu</a>
    </div>
</div>

<!-- ── Difficulty selector ── -->
<div id="screen-difficulty">
    <h1>Whack-a-Mole!</h1>
    <p>Whack the moles 🐾 — dodge the bombs 💣</p>

    <div class="difficulty-cards">
        <div class="diff-card selected" data-diff="easy" onclick="selectDiff(this,'easy')">
            <div class="diff-icon">🌟</div>
            <div class="diff-name">Easy</div>
            <div class="diff-info">Slow moles<br>45 seconds</div>
            <div class="diff-badge">×1 pts</div>
        </div>
        <div class="diff-card" data-diff="medium" onclick="selectDiff(this,'medium')">
            <div class="diff-icon">🔥</div>
            <div class="diff-name">Medium</div>
            <div class="diff-info">Faster moles<br>35 seconds</div>
            <div class="diff-badge">×1.5 pts</div>
        </div>
        <div class="diff-card" data-diff="hard" onclick="selectDiff(this,'hard')">
            <div class="diff-icon">💎</div>
            <div class="diff-name">Hard</div>
            <div class="diff-info">Lightning fast<br>25 seconds</div>
            <div class="diff-badge">×2 pts</div>
        </div>
    </div>

    <button class="btn-start" onclick="startGame()">Play!</button>
</div>

<!-- ── Game screen ── -->
<div id="screen-game">
    <div id="streak-badge"></div>

    <div id="wam-board">
        <!-- 9 holes, built by JS -->
    </div>

    <div class="game-controls">
        <button class="ctrl-btn primary"   onclick="restartRound()">Restart</button>
        <button class="ctrl-btn secondary" onclick="goMenu()">Menu</button>
    </div>
</div>

<!-- ── Result overlay ── -->
<div id="result-overlay">
    <div class="result-emoji" id="result-emoji">🎉</div>
    <div class="result-title" id="result-title">Time's up!</div>
    <div class="result-score" id="result-score-display">Score: 0</div>
    <div class="result-detail" id="result-detail"></div>
    <div class="result-btns">
        <button class="btn-play-again" onclick="resetToMenu()">Play Again</button>
        <button class="btn-menu-out"   onclick="goMenu()">Menu</button>
    </div>
</div>
<div class="submitting-badge" id="submitting-badge">⏳ Saving score…</div>

<!-- ── Audio ── -->
<audio id="snd-hit"      src="../../../../public/sounds/whack_a_mole/game-music.mp3" preload="auto"></audio>
<audio id="snd-gameover" src="../../../../public/sounds/whack_a_mole/game-over.mp3"  preload="auto"></audio>

<script src="../../../../public/js/games/BehaviorCollector.js"></script>


<script src="whack_a_mole.js"></script>
    
</script>
</body>
</html>