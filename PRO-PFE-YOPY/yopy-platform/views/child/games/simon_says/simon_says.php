<?php
// views/child/games/simon_says/simon_says.php
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
<html lang="fr">
<head>
    <?php include 'partials/header.php'; ?>
</head>
<body>
<?php include '../ad.php'; ?>
<canvas id="forest-canvas"></canvas>
<div class="bg-mist"></div>

<?php include 'partials/topbar.php'; ?>
<?php include 'partials/difficulty-screen.php'; ?>
<?php include 'partials/game-screen.php'; ?>
<?php include 'partials/result-overlay.php'; ?>

<!-- Combo flash -->
<div id="combo-flash">✦ ESPRIT ✦</div>

<!-- PHP → JS bridge -->
<script>
    window.GAME_ID    = 'simon_says';
    window.SESSION_ID = '<?= $sessionId ?>';
    window.BUDDY_ID   = '<?= $buddyId ?>';
    window.NICKNAME   = '<?= $nickname ?>';
</script>
<!-- BehaviorCollector -->
<script src="../../../../public/js/games/BehaviorCollector.js"></script>
<!-- Modular JS (loaded in correct order) -->
<script src="simon_says.js"></script>

</body>
</html>