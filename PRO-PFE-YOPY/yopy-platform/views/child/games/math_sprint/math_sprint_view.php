<!DOCTYPE html>
<html lang="en">
<head>
    <?php require 'partials/head.php'; ?>
</head>

<body>
    <?php include '../ad.php'; ?>
<div class="math-canvas">
    <div class="bg-grid"></div>
    <div class="bg-symbols"></div>
</div>
<div id="zawa-layer"></div>

<?php require 'partials/topbar.php'; ?>

<div class="game-container">
    <?php require 'partials/difficulty.php'; ?>
    <?php require 'partials/countdown.php'; ?>
    <?php require 'partials/game.php'; ?>
    <?php require 'partials/result.php'; ?>
</div>

<script>
const GAME_CONFIG = {
    sessionId: "<?= $data['sessionId'] ?>",
    buddyId: "<?= $data['buddyId'] ?>",
    nickname: "<?= $data['nickname'] ?>"
};
</script>

<script src="math_sprint.js"></script>

</body>
</html>