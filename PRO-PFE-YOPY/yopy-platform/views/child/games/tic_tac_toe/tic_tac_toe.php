<?php
// views/child/games/tic_tac_toe.php
// YOPY Tic-Tac-Toe — Solo vs Bot | Category: Strategy
// SRS: REQ-13, REQ-14, REQ-15, REQ-18 | BR-05, BR-06, BR-07, BR-08
session_start();

if (!isset($_SESSION['user_id']) || ($_SESSION['chosen_mode'] ?? '') !== 'child') {
    header('Location: ../../../views/auth/login.php');
    exit;
}
$nickname  = htmlspecialchars($_SESSION['username']  ?? 'Explorer');
$buddyId   = htmlspecialchars($_SESSION['chosen_character']['id'] ?? 'joy');
$sessionId = htmlspecialchars($_SESSION['current_game_session'] ?? '');
?>
<!DOCTYPE html>
<html lang="en">
<head>
   <?php include 'partials/header.php'; ?>
   
</head>
<body>
<?php include '../ad.php'; ?>
<canvas id="ink-canvas"></canvas>
<div class="wrapper">
    <?php include 'partials/topbar.php'; ?>

    <!-- difficulty screen -->
   
    <?php include 'partials/difficulty_screen.php'; ?>
    <!-- game screen -->
  <?php include 'partials/game-screen.php'; ?>
    <!-- Session End Overlay -->

<?php include 'partials/result_overlay.php'; ?>
    <!-- Round End Overlay (popup) -->
    <div id="round-result-overlay" class="round-result-overlay">
        <div class="result-card">
            <div class="result-emoji" id="round-result-emoji">🏮</div>
            <div class="result-title" id="round-result-title">Round Complete</div>
            <div id="round-result-message" style="font-size:24px; margin:12px; color:#5a3a28;"></div>
            <div style="display:flex; gap:16px; justify-content:center; margin-top:20px;">
                <button class="ink-btn" onclick="playAnotherRound()">🖌 Play Again</button>
                <button class="ink-btn" onclick="changeDifficultyFromRound()">🎚️ Change Difficulty</button>
                <button class="ink-btn" onclick="endSession()">🏁 End Session</button>
            </div>
        </div>
    </div>

    <div class="submitting" id="submitting-badge">⏳ Saving...</div>

</div>

<!-- ink texture filters -->
<svg width="0" height="0" style="position:absolute">
    <filter id="flying-white" x="-0.2" y="-0.2" width="1.4" height="1.4">
        <feTurbulence baseFrequency="0.045" numOctaves="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="wet-ink">
        <feGaussianBlur stdDeviation="0.8"/>
        <feComposite in="SourceGraphic" operator="over"/>
    </filter>
    <filter id="dry-brush">
        <feTurbulence baseFrequency="0.08" numOctaves="1" result="noise"/>
        <feComposite in="SourceGraphic" in2="noise" operator="in"/>
    </filter>
</svg>

<script src="../../../../public/js/games/BehaviorCollector.js"></script>

<script>
    // Pass PHP session variables to JavaScript
    window.GAME_ID    = 'tic_tac_toe';
    window.SESSION_ID = '<?= $sessionId ?>';
    window.BUDDY_ID   = '<?= $buddyId ?>';
    window.NICKNAME   = '<?= $nickname ?>';
    
</script>
<script src="tic_tac_toe.js"></script>
</body>
</html>