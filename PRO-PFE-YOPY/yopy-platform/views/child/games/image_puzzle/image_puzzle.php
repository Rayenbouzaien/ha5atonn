<?php
// views/child/games/image_puzzle/image_puzzle.php
session_start();
 include '../ad.php'; 
if (!isset($_SESSION['user_id'])) {
    header('Location: ../../../auth/login.php');
    exit;
}

$nickname   = htmlspecialchars($_SESSION['username'] ?? 'Explorer');
$buddyId    = htmlspecialchars($_SESSION['chosen_character']['id'] ?? 'joy');
$sessionId  = htmlspecialchars($_SESSION['current_game_session'] ?? '');

// Include the clean view
require_once 'image_puzzle_view.php';
?>