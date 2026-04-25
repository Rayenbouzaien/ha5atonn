<?php
// views/child/games/hangman_quest/hangman_quest.php
session_start();
  
if (!isset($_SESSION['user_id']) || ($_SESSION['chosen_mode'] ?? '') !== 'child') {
    header('Location: ../../../views/auth/login.php');
    exit;
}

$nickname   = htmlspecialchars($_SESSION['username'] ?? 'Explorer');
$buddyId    = htmlspecialchars($_SESSION['chosen_character']['id'] ?? 'joy');
$sessionId  = htmlspecialchars($_SESSION['current_game_session'] ?? '');

// Include the clean view
require_once 'hangman_quest_view.php';
?>