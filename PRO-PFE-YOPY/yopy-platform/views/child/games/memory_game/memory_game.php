<?php
// views/child/games/memory_game/memory_game.php
session_start();

// ───────────────────────────────────────────────────────────────
// AUTH + SESSION GUARD
// modeChose.php is the single source of truth for child_id.
// It sets $_SESSION['child_id'] and $_SESSION['chosen_mode']
// when a child profile is selected.  If those values are missing
// the user skipped the profile picker — send them back.
// ───────────────────────────────────────────────────────────────
if (
    !isset($_SESSION['user_id'])                            ||
    ($_SESSION['chosen_mode'] ?? '') !== 'child'            ||
    empty($_SESSION['child_id'])                            ||
    (int)$_SESSION['child_id'] <= 0
) {
    // Not properly authenticated — return to profile picker.
    header('Location: ../../../../views/modeChose.php');
    exit;
}

$childId  = (int) $_SESSION['child_id'];
$nickname = htmlspecialchars($_SESSION['username'] ?? 'Player');
$buddyId  = htmlspecialchars($_SESSION['chosen_character']['id'] ?? 'joy');
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include 'partials/header.php'; ?>
</head>
<body class="scanlines">
<!-- ?php include '../ad.php'; ?> -->
<!-- BACKGROUND LAYERS -->
<div class="bg-layer bg-grid"></div>
<div class="bg-layer bg-radial"></div>
<canvas id="bg-canvas"></canvas>

<!-- CORNER DECORATIONS -->
<?php include 'partials/corner-decorations.php'; ?>

<!-- COMBO FLASH -->
<div id="combo-flash">MATCH!</div>

<?php include 'partials/topbar.php'; ?>
<?php include 'partials/difficulty-screen.php'; ?>
<?php include 'partials/game-screen.php'; ?>
<?php include 'partials/result-overlay.php'; ?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>

<!-- PHP → JS bridge -->
<script>
    window.BUDDY_ID  = '<?= $buddyId ?>';
    window.NICKNAME  = '<?= $nickname ?>';
    window.CHILD_ID  = <?= $childId ?>;
</script>

<!-- BehaviorCollector -->
<script src="../../../../public/js/games/BehaviorCollector.js"></script>

<!-- Game logic -->
<script src="memory_game.js"></script>

</body>
</html>