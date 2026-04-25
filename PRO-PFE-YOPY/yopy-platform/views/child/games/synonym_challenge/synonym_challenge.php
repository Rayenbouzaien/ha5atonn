<?php
// views/child/games/synonym_quest.php
// YOPY Synonym Quest | Category: Language / Word
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
<div class="victorian-wrapper">
   
<?php include 'partials/topbar.php'; ?>
<?php include 'partials/difficulty-screen.php'; ?>
<?php include 'partials/game-screen.php'; ?>

</div>

<?php include 'partials/result-overlay.php'; ?>

<!-- Shared scripts -->
<script src="../../../public/js/games/BehaviorCollector.js"></script>
<script src="../../../public/js/games/GameEngine.js"></script>

<!-- PHP → JS bridge -->
<script>
    window.GAME_ID    = 'synonym_challenge';
    window.SESSION_ID = '<?= $sessionId ?>';
    window.BUDDY_ID   = '<?= $buddyId ?>';
    window.NICKNAME   = '<?= $nickname ?>';
</script>

<!-- Modular JS (order matters) -->
<script src="synonyme_challenge.js"></script>
</body>
</html>