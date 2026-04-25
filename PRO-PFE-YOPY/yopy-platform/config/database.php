<?php
/**
 * config/database.php
 * Your existing config array + a Database class wrapper so all game
 * backends can call  Database::connect()  without any changes.
 *
 * SRS: NF-S4 (PDO prepared statements), ARCH-05 (Singleton)
 */


$dbConfig = [
    'host'     => getenv('DB_HOST') ?: '127.0.0.1',
    'username' => getenv('DB_USERNAME') ?: 'root',
    'password' => getenv('DB_PASSWORD') ?: '',
    'database' => getenv('DB_DATABASE') ?: 'yopy_platform',
    'port'     => (int) (getenv('DB_PORT') ?: 3306),
];

// Allows UserModel to do: $config = include 'database.php';
return $dbConfig;

// ── PDO singleton wrapper (used by game backends) ─────────────────────────
class Database
{
    private static ?PDO $instance = null;

    public static function connect(): PDO
    {
        if (self::$instance === null) {
            global $dbConfig;

            $dsn = sprintf(
                'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
                $dbConfig['host'],
                $dbConfig['port'],
                $dbConfig['database']
            );

            self::$instance = new PDO(
                $dsn,
                $dbConfig['username'],
                $dbConfig['password'],
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]
            );
        }
        return self::$instance;
    }

    private function __clone() {}
    public function __wakeup() { throw new \Exception('Cannot unserialize singleton'); }
}