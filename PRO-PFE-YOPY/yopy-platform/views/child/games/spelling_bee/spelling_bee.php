<?php
// views/child/games/spelling_bee.php
// YOPY Spelling Bee | Harry Potter Theme
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
    <!-- ── Backgrounds ── -->
    <div class="castle-bg"></div>
    <div class="moon" id="moon"></div>
    <svg class="castle-silhouette" viewBox="0 0 1600 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
        <defs>
            <linearGradient id="castleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#1a0a00" stop-opacity="0.95" />
                <stop offset="1" stop-color="#0d0500" stop-opacity="1" />
            </linearGradient>
        </defs>
        <!-- Base ground -->
        <rect y="480" width="1600" height="60" fill="url(#castleGrad)" />
        <!-- Left wing towers -->
        <rect x="0" y="200" width="60" height="340" fill="url(#castleGrad)" />
        <polygon points="0,200 60,200 30,120" fill="#1a0a00" />
        <rect x="15" y="150" width="8" height="20" fill="#c9a84c" opacity="0.6" /> <!-- window glow -->
        <rect x="80" y="280" width="50" height="260" fill="url(#castleGrad)" />
        <polygon points="80,280 130,280 105,210" fill="#1a0a00" />
        <rect x="150" y="320" width="80" height="220" fill="url(#castleGrad)" />
        <polygon points="150,320 230,320 190,250" fill="#1a0a00" />
        <!-- Central keep -->
        <rect x="550" y="80" width="110" height="460" fill="url(#castleGrad)" />
        <polygon points="550,80 660,80 605,-10" fill="#0d0500" />
        <!-- Central towers flanking -->
        <rect x="480" y="160" width="80" height="380" fill="url(#castleGrad)" />
        <polygon points="480,160 560,160 520,80" fill="#1a0a00" />
        <rect x="650" y="160" width="80" height="380" fill="url(#castleGrad)" />
        <polygon points="650,160 730,160 690,80" fill="#1a0a00" />
        <!-- Great hall body -->
        <rect x="320" y="350" width="160" height="190" fill="url(#castleGrad)" />
        <rect x="720" y="350" width="160" height="190" fill="url(#castleGrad)" />
        <!-- Battlements -->
        <rect x="320" y="340" width="20" height="20" fill="#1a0a00" />
        <rect x="350" y="340" width="20" height="20" fill="#1a0a00" />
        <rect x="380" y="340" width="20" height="20" fill="#1a0a00" />
        <rect x="410" y="340" width="20" height="20" fill="#1a0a00" />
        <rect x="440" y="340" width="20" height="20" fill="#1a0a00" />
        <rect x="720" y="340" width="20" height="20" fill="#1a0a00" />
        <rect x="750" y="340" width="20" height="20" fill="#1a0a00" />
        <rect x="780" y="340" width="20" height="20" fill="#1a0a00" />
        <rect x="810" y="340" width="20" height="20" fill="#1a0a00" />
        <rect x="840" y="340" width="20" height="20" fill="#1a0a00" />
        <!-- Right wing -->
        <rect x="880" y="260" width="90" height="280" fill="url(#castleGrad)" />
        <polygon points="880,260 970,260 925,180" fill="#1a0a00" />
        <rect x="980" y="300" width="70" height="240" fill="url(#castleGrad)" />
        <polygon points="980,300 1050,300 1015,220" fill="#1a0a00" />
        <rect x="1070" y="250" width="55" height="290" fill="url(#castleGrad)" />
        <polygon points="1070,250 1125,250 1097,170" fill="#1a0a00" />
        <rect x="1140" y="310" width="50" height="230" fill="url(#castleGrad)" />
        <rect x="1200" y="280" width="60" height="260" fill="url(#castleGrad)" />
        <polygon points="1200,280 1260,280 1230,200" fill="#1a0a00" />
        <rect x="1270" y="220" width="70" height="320" fill="url(#castleGrad)" />
        <polygon points="1270,220 1340,220 1305,130" fill="#1a0a00" />
        <rect x="1360" y="300" width="80" height="240" fill="url(#castleGrad)" />
        <rect x="1460" y="240" width="140" height="300" fill="url(#castleGrad)" />
        <polygon points="1460,240 1600,240 1530,140" fill="#0d0500" />
        <!-- Glowing windows -->
        <rect x="600" y="200" width="14" height="20" rx="7" fill="#c9a84c" opacity="0.7" />
        <rect x="594" y="300" width="14" height="22" rx="7" fill="#c9a84c" opacity="0.5" />
        <rect x="608" y="380" width="12" height="18" rx="6" fill="#f0a000" opacity="0.6" />
        <rect x="510" y="260" width="10" height="16" rx="5" fill="#c9a84c" opacity="0.4" />
        <rect x="680" y="260" width="10" height="16" rx="5" fill="#c9a84c" opacity="0.4" />
        <rect x="1300" y="300" width="10" height="16" rx="5" fill="#c9a84c" opacity="0.4" />
        <!-- Ground fill -->
        <rect y="480" width="1600" height="60" fill="#0d0500" />
    </svg>
    <div class="mist"></div>
    <canvas id="sparks-canvas"></canvas>

    <!-- Floating candles -->
    <div class="candle" id="candle-1" style="left:8%;top:20%;">
        <div class="candle-flame"></div>
        <div class="candle-body"></div>
        <div class="candle-drip"></div>
    </div>
    <div class="candle" id="candle-2" style="left:92%;top:28%;">
        <div class="candle-flame"></div>
        <div class="candle-body"></div>
        <div class="candle-drip"></div>
    </div>
    <div class="candle" id="candle-3" style="left:5%;top:55%;">
        <div class="candle-flame"></div>
        <div class="candle-body"></div>
        <div class="candle-drip"></div>
    </div>
    <div class="candle" id="candle-4" style="left:95%;top:60%;">
        <div class="candle-flame"></div>
        <div class="candle-body"></div>
        <div class="candle-drip"></div>
    </div>

    <!-- Lightning & burst -->
    <div id="lightning-flash"></div>

    <!-- Wand trail dots -->
    <div class="wand-trail" id="wand-trail-1" style="opacity:0"></div>
    <div class="wand-trail" id="wand-trail-2" style="opacity:0;width:4px;height:4px"></div>
    <div class="wand-trail" id="wand-trail-3" style="opacity:0;width:3px;height:3px"></div>

    <!-- ── Main wrapper ── -->
    <div class="main-wrapper">

        <!-- ── Topbar ── -->

        <?php include 'partials/topbar.php'; ?>

        <!-- ── Difficulty selection screen ── -->
        <?php include 'partials/difficulity-sceen.php'; ?>

        <!-- ── Game screen ── -->
        <?php include 'partials/game-screen.php'; ?>

    </div><!-- /main-wrapper -->


    <!-- ── Result overlay ── -->
    <?php include 'partials/result-overlay.php'; ?>

    <script src="../../../public/js/games/BehaviorCollector.js"></script>
    
    <script>
        window.GAME_ID = 'spelling_bee';
        window.SESSION_ID = '<?= $sessionId ?>';
        window.BUDDY_ID = '<?= $buddyId ?>';
        window.NICKNAME = '<?= $nickname ?>';
    </script>
    <script src="spelling_bee.js"></script>
</body>

</html>