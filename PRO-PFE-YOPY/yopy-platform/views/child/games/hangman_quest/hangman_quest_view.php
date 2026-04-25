<?php
// views/child/games/hangman_quest/hangman_quest_view.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>YOPY — Shadow Word Quest</title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=UnifrakturCook:wght@700&family=Cinzel:wght@400;700;900&family=Nunito:wght@400;600;800&display=swap" rel="stylesheet">

    <!-- GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

    <!-- Styles -->
    <link rel="stylesheet" href="hangman_quest_style.css">
</head>
<body>
    <?php include '../ad.php'; ?>
    <canvas id="particles"></canvas>

    <?php include 'partials/topbar.php'; ?>

    <?php include 'partials/difficulty_screen.php'; ?>
    <?php include 'partials/game_screen.php'; ?>
    <?php include 'partials/result_overlay.php'; ?>

    <!-- Scripts -->
    <script src="../../../../public/js/games/BehaviorCollector.js"></script>
    
    <script src="hangman_quest_script.js"></script>
</body>
</html>