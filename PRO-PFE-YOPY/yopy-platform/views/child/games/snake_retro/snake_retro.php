<?php
// views/child/games/snake_retro/snake_retro.php
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
<canvas id="particles"></canvas>

<!-- Sounds -->
<audio id="snd-food"     src="../../../public/sounds/snake_retro/food.mp3"     preload="auto"></audio>
<audio id="snd-gameover" src="../../../public/sounds/snake_retro/gameover.mp3" preload="auto"></audio>
<audio id="snd-move"     src="../../../public/sounds/snake_retro/move.mp3"     preload="auto"></audio>
<audio id="snd-music"    src="../../../public/sounds/snake_retro/music.mp3"    preload="auto" loop></audio>

<?php include 'partials/topbar.php'; ?>
<?php include 'partials/difficulty-screen.php'; ?>
<?php include 'partials/game-screen.php'; ?>
<?php include 'partials/result-overlay.php'; ?>

<div class="submitting-badge" id="submitting-badge">⏳ Saving score…</div>

<!-- Shared game scripts -->
<script src="../../../../public/js/games/BehaviorCollector.js"></script>


<!-- PHP → JS bridge -->
<script>
    window.GAME_ID    = 'snake_retro';
    window.SESSION_ID = '<?= $sessionId ?>';
    window.BUDDY_ID   = '<?= $buddyId ?>';
    window.NICKNAME   = '<?= $nickname ?>';
</script>

<!-- Modular JS -->
<script src="snake_retro.js"></script>

</body>
</html>