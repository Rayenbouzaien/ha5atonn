<?php
// views/child/games/tile_puzzle/tile_puzzle.php
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

<?php include 'partials/topbar.php'; ?>
<?php include 'partials/difficulty_screen.php'; ?>
<?php include 'partials/game_screen.php'; ?>
<?php include 'partials/result_overlay.php'; ?>



<!-- Shared scripts -->
<script src="../../../public/js/games/BehaviorCollector.js"></script>
<script src="../../../public/js/games/GameEngine.js"></script>

<!-- PHP → JS bridge -->
<script>
    window.GAME_ID    = 'tile_puzzle';
    window.SESSION_ID = '<?= $sessionId ?>';
    window.BUDDY_ID   = '<?= $buddyId ?>';
    window.NICKNAME   = '<?= $nickname ?>';
</script>

<!-- Modular JS -->
<script src="tile_puzzle.js"></script>

</body>
</html>