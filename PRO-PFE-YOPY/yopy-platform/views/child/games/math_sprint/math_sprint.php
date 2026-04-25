<?php
session_start();

if (!isset($_SESSION['user_id']) || ($_SESSION['chosen_mode'] ?? '') !== 'child') {
    header('Location: ../../../views/auth/login.php');
    exit;
}

$data = [
    'nickname'  => htmlspecialchars($_SESSION['username'] ?? 'Explorer'),
    'buddyId'   => htmlspecialchars($_SESSION['chosen_character']['id'] ?? 'joy'),
    'sessionId' => htmlspecialchars($_SESSION['current_game_session'] ?? '')
];

require 'math_sprint_view.php';