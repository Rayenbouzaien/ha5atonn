<?php
// views/child/games/image_puzzle/image_puzzle_view.php
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YOPY — Image Puzzle</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Nunito:wght@400;600;700;800&family=Fredoka+One&display=swap" rel="stylesheet">
    
    <!-- GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    
    <!-- Styles -->
    <link rel="stylesheet" href="image_puzzle_style.css">
</head>
<body>
<?php include '../ad.php'; ?>
    <div class="cursor-glow" id="cursor-glow"></div>
    <div class="bg-layer back"></div>
    <div class="bg-layer mid" id="bg-mid"></div>
    <div class="aurora"></div>
    <canvas id="particles"></canvas>

    <?php include 'partials/topbar.php'; ?>

    <?php include 'partials/difficulty_screen.php'; ?>
    <?php include 'partials/game_screen.php'; ?>
    <?php include 'partials/ref_lightbox.php'; ?>
    <?php include 'partials/result_overlay.php'; ?>

    <!-- Game Engine Setup -->
    <script>
        window.setup = {
            puzzle_fifteen: {
                diff: 6,
                size: [360, 480],
                grid: [3, 4],
                fill: false,
                number: false,
                art: { url: '../../../../public/images/GAMES/image_puzzle/art1.png', ratio: false },
                keyBoard: false,
                gamePad: false,
                time: 0.12,
                style: 'border-radius:7px;cursor:pointer;background-color:rgba(10,18,40,.15);' +
                       'display:grid;align-items:center;justify-items:center;' +
                       'font-family:Cinzel,serif;color:#FFD166;font-size:15px;'
            }
        };
    </script>

    <script src="fifteen_puzzle.js"></script>
    <script src="../../../public/js/games/BehaviorCollector.js"></script>
    <script src="image_puzzle_script.js"></script>
</body>
</html>