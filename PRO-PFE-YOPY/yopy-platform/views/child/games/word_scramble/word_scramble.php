<?php
// views/child/games/word_scramble.php  — Egyptian Tomb Edition
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
<title>YOPY — Tomb of the Lost Words</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=IM+Fell+English:ital@0;1&family=MedievalSharp&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/TextPlugin.min.js"></script>
<link rel="stylesheet" href="word_scramble.css">
</head>
<body>
<canvas id="particles"></canvas>
<?php include '../ad.php'; ?>
<div class="torch-bg"></div>
<div id="wrath-vignette"></div>
<div id="sand-shake"></div>
<div id="screen-fog"></div>

<!-- Side hieroglyph strips -->
<div class="hiero-strip">
    <span>𓂀𓃭𓅓𓆣𓀭𓁺𓋴𓎡𓏏𓐝𓀿𓁀𓁁𓁂𓁃𓂀𓃭𓅓𓆣𓀭𓁺𓋴𓎡𓏏𓐝𓀿𓁀𓁁𓁂𓁃</span>
    <span>𓂀𓃭𓅓𓆣𓀭𓁺𓋴𓎡𓏏𓐝𓀿𓁀𓁁𓁂𓁃𓂀𓃭𓅓𓆣𓀭𓁺𓋴𓎡𓏏𓐝𓀿𓁀𓁁𓁂𓁃</span>
</div>
<div class="hiero-strip right">
    <span>𓁃𓁂𓁁𓁀𓀿𓐝𓏏𓎡𓋴𓁺𓀭𓆣𓅓𓃭𓂀𓁃𓁂𓁁𓁀𓀿𓐝𓏏𓎡𓋴𓁺𓀭𓆣𓅓𓃭𓂀</span>
    <span>𓁃𓁂𓁁𓁀𓀿𓐝𓏏𓎡𓋴𓁺𓀭𓆣𓅓𓃭𓂀𓁃𓁂𓁁𓁀𓀿𓐝𓏏𓎡𓋴𓁺𓀭𓆣𓅓𓃭𓂀</span>
</div>

<!-- ══ Topbar ══ -->
<div class="topbar">
    <div class="topbar-logo">
        YOPY
        <small>TOMB OF LOST WORDS</small>
    </div>
    <div class="hud-center">
        <div class="hud-pill">
            <div><label>Treasure</label><span id="hud-score">0</span> pts</div>
        </div>
        <div class="hud-pill" id="timer-pill">
            <div><label>Sands Fall</label><span id="hud-timer">60</span>s</div>
        </div>
    </div>
    <div class="topbar-right">
        <div>
            <div class="explorer-name">⚔ <?= $nickname ?></div>
        </div>
        <div class="pharaoh-seal" id="buddy-avatar">𓂀</div>
        <a href="../../game-menu/menu.php" class="btn-back">← Retreat</a>
    </div>
</div>

<!-- ══ DIFFICULTY SCREEN ══ -->
<div class="content">
<div id="screen-difficulty">
    <div class="tomb-title">
        <h1>
            <em>𓂀 The Tomb of Lost Words 𓂀</em>
            Decipher the Sacred Cipher
        </h1>
        <p style = "transform: translateX(50%); left: 50%;" >The sands of time swallow those who hesitate.<br>Rearrange the sacred stones to unseal the tomb's secrets before Ra's chariot sets forever.</p>
    </div>

    <div class="divider">𓆣 Choose Your Trial 𓆣</div>

    <div class="difficulty-cards">
        <div class="diff-card selected" data-diff="easy" data-glyph="𓃭" onclick="selectDiff(this,'easy')">
            <span class="diff-icon">𓀭</span>
            <div class="diff-name">Acolyte</div>
            <div class="diff-info">3-letter runes<br>60 sands of Ra</div>
            <div class="diff-badge">×10 gold / word</div>
        </div>
        <div class="diff-card" data-diff="medium" data-glyph="𓅓" onclick="selectDiff(this,'medium')">
            <span class="diff-icon">𓂀</span>
            <div class="diff-name">Scribe</div>
            <div class="diff-info">4-letter runes<br>75 sands of Ra</div>
            <div class="diff-badge">×15 gold / word</div>
        </div>
        <div class="diff-card" data-diff="hard" data-glyph="𓆣" onclick="selectDiff(this,'hard')">
            <span class="diff-icon">𓁺</span>
            <div class="diff-name">High Priest</div>
            <div class="diff-info">5-letter runes<br>90 sands of Ra</div>
            <div class="diff-badge">×20 gold / word</div>
        </div>
    </div>

    <button class="btn-start" style="margin-top: 1em;" onclick="startGame()">𓂀 Enter the Tomb 𓂀</button>
</div>
</div>

<!-- ══ GAME SCREEN ══ -->
<div class="content">
<div id="screen-game">

    <div class="scroll-panel">
        <div class="round-badge">
            <span>Sacred Cipher <span id="word-num">I</span></span>
            <span class="glyph-row">𓂀 𓃭 𓅓</span>
            <span id="diff-label-badge">Acolyte</span>
        </div>

        <div class="area-label">The Scattered Stones</div>
        <div id="scramble-area"></div>

        <br>
        <div class="area-label">The Sacred Sequence</div>
        <div id="answer-area"></div>
    </div>

    <div id="warning-panel">
        <div id="wrath-meter">
            <span class="wrath-skull" id="skull0">💀</span>
            <span class="wrath-skull" id="skull1">💀</span>
            <span class="wrath-skull" id="skull2">💀</span>
        </div>
        <div id="oracle-msg"></div>
        <div id="hint-reveal"></div>
    </div>

    <div class="game-controls">
        <button class="ctrl-btn hint-btn" onclick="useHint()">𓆣 Invoke the Oracle</button>
        <button class="ctrl-btn skip-btn" onclick="skipWord()">Flee this Chamber →</button>
    </div>

</div>
</div>

<!-- ══ RESULT OVERLAY ══ -->
<div id="result-overlay">
    <div class="result-cartouche" id="result-emoji">𓁺</div>
    <div class="result-title" id="result-title">The Sands Have Spoken</div>
    <div class="result-score" id="result-score-display">Treasure: 0 Gold</div>
    <div class="result-detail" id="result-detail"></div>
    <div class="result-scroll" id="result-scroll"></div>
    <div class="result-btns">
        <button class="btn-play-again" onclick="resetToMenu()">Enter Another Tomb</button>
        <button class="btn-menu-out"   onclick="goMenu()">Return to the Oasis</button>
    </div>
</div>
<div class="submitting-badge" id="submitting-badge">⏳ Inscribing your deeds upon the stone…</div>

<script src="../../../../public/js/games/BehaviorCollector.js"></script>

<script src="word_scramble.js"></script>
</script>
</body>
</html>