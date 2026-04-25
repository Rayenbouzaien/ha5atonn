<?php
// views/child/games/sudoku_pro/sudoku_pro.php
session_start();

if (!isset($_SESSION['user_id']) || ($_SESSION['chosen_mode'] ?? '') !== 'child') {
    header('Location: ../../../views/auth/login.php');
    exit;
}

$nickname  = htmlspecialchars($_SESSION['username'] ?? 'Explorer');
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
<canvas id="matrix-canvas"></canvas>
<div class="anime-overlay"></div>
<div id="floating-sparkles"></div>

<?php include 'partials/topbar.php'; ?>
<?php include 'partials/difficulty_screen.php'; ?>
<?php include 'partials/game_screen.php'; ?>
<?php include 'partials/result_overlay.php'; ?>

<div class="submitting-badge" id="submitting-badge">⏳ SAVING SCORE...</div>

<!-- Shared scripts -->
<script src="../../../../public/js/games/BehaviorCollector.js"></script>


<!-- PHP → JS bridge -->
<script>
    window.GAME_ID    = 'sudoku_pro';
    window.SESSION_ID = '<?= $sessionId ?>';
    window.BUDDY_ID   = '<?= $buddyId ?>';
    window.NICKNAME   = '<?= $nickname ?>';
</script>

<!-- Modular JS (order matters) -->
<script src="sudoku_pro.js"></script>

</body>
</html>