<?php

$config = include __DIR__ . '/../config/database.php';

$host = $config['host'];
$username = $config['username'];
$password = $config['password'];
$database = $config['database'];
$port = $config['port'];

$conn = new mysqli($host, $username, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Database connection successful!";

$conn->close();
?>