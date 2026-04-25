<?php
// views/child/games/maze_runner/maze_runner.php
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
<div class="torch-overlay"></div>

<?php include 'partials/topbar.php'; ?>

<?php include 'partials/difficulty_screen.php'; ?>
<?php include 'partials/game_screen.php'; ?>
<?php include 'partials/result_overlay.php'; ?>

<div class="submitting-badge" id="submitting-badge">⏳ Saving...</div>

<!-- Shared game scripts -->
<script src="../../../../public/js/games/BehaviorCollector.js"></script>


<!-- PHP → JS bridge -->
<script>
    window.GAME_ID    = 'maze_runner';
    window.SESSION_ID = '<?= $sessionId ?>';
    window.BUDDY_ID   = '<?= $buddyId ?>';
    window.NICKNAME   = '<?= $nickname ?>';
</script>

<!-- Modular JS files (loaded in correct order) -->
<script src="maze_runner.js"></script>

</body>
</html>