<?php
// views/child/games/tetris.php
// YOPY Tetris | Category: Strategy / Reaction
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
  <?php include './partials/header.php'; ?>
</head>
<body>
<?php include '../ad.php'; ?>
<!-- ── Topbar ── -->
<?php include './partials/topbar.php'; ?>

<!-- ── Difficulty selector ── -->
<?php include './partials/difficulty-screen.php'; ?>

<!-- ── Game screen ── -->
<?php include './partials/game-screen.php'; ?>

<!-- ── Result overlay ── -->
<?php include './partials/result-overlay.php'; ?>

<script src="../../../../public/js/games/BehaviorCollector.js"></script>


<script>
    window.GAME_ID    = 'tetris_block';
    window.SESSION_ID = '<?= $sessionId ?>';
    window.BUDDY_ID   = '<?= $buddyId ?>';
    window.NICKNAME   = '<?= $nickname ?>';
</script>
<script src="tetris_block.js"></script>
</body>
</html>