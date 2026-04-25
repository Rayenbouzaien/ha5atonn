<?php
// menu.php - Main Game Menu
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YOPY — Game Menu</title>
 
  <?php include 'includes/header.php'; ?>
</head>
<body>

  <!-- LOADER -->
  <?php include 'includes/loader.php'; ?>

  <!-- Background Elements -->
  <canvas id="particleCanvas"></canvas>
  <div id="bgLayer"></div>
  <div id="starsLayer"></div>
  <div class="float-orb orb1"></div>
  <div class="float-orb orb2"></div>
  <div class="float-orb orb3"></div>
  <div class="float-orb orb4"></div>

  <!-- Horizon -->
  <?php include 'includes/horizon.php'; ?>

  <div id="portal"></div>

  <!-- TOP BAR -->
  <?php include 'includes/topbar.php'; ?>

  <!-- MAIN LAYOUT -->
  <div id="main">
    <!-- BUDDY PANEL -->
    <?php include 'includes/buddy-panel.php'; ?>

    <div class="vdiv"></div>

    <!-- GAMES AREA -->
    <?php include 'includes/games-grid.php'; ?>
  </div>
<?php include 'data/buddies.php'; ?>

<script>
// PASS BUDDY DATA TO JAVASCRIPT - MUST BE BEFORE buddy.js
window.BUDDY_DATA = {
    SVGS: <?= json_encode($BUDDY_SVGS ?? [], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>,
    META: <?= json_encode($BUDDY_META ?? [], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>
};
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<script src="./js/buddy.js"></script>
<script src="./js/particles.js"></script>
<script src="./js/animations.js"></script>
<script src="./js/game-launch.js"></script>
<script src="./js/ui.js"></script>
<script src="./js/main.js"></script>
</body>
</html>