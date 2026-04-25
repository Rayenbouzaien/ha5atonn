<?php
/**
 * YOPY Admin Module — Front Controller
 * Entry point for admin panel routes.
 */

define('ROOT_PATH', __DIR__);
define('APP_NAME', 'YOPY Admin');

// Base path for links (supports subfolder installs)
$basePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
if ($basePath === '/') {
    $basePath = '';
}
define('BASE_PATH', $basePath);

// Autoload admin module classes
spl_autoload_register(function (string $class): void {
    $map = [
        'Controllers\\AdminModuleController' => ROOT_PATH . '/controllers/AdminModuleController.php',
        'Models\\AdminModuleDatabase'         => ROOT_PATH . '/models/AdminModuleDatabase.php',
        'Models\\AdminModuleUserModel'        => ROOT_PATH . '/models/AdminModuleUserModel.php',
        'Models\\AdminModuleChildModel'       => ROOT_PATH . '/models/AdminModuleChildModel.php',
        'Models\\AdminModuleCharacterModel'   => ROOT_PATH . '/models/AdminModuleCharacterModel.php',
        'Models\\AdminModuleGameModel'        => ROOT_PATH . '/models/AdminModuleGameModel.php',
        'Models\\AdminModuleAnalysisModel'    => ROOT_PATH . '/models/AdminModuleAnalysisModel.php',
    ];
    if (isset($map[$class])) {
        require_once $map[$class];
    }
});

// Session
session_start();

$action = $_GET['action'] ?? 'dashboard';

$publicActions = ['login', 'doLogin'];
if (!isset($_SESSION['admin_logged_in']) && !in_array($action, $publicActions, true)) {
    header('Location: ' . BASE_PATH . '/admin.php?action=login');
    exit;
}

$controller = new Controllers\AdminModuleController();

$routes = [
    // Auth
    'login'              => 'showLogin',
    'doLogin'            => 'processLogin',
    'logout'             => 'logout',

    // Dashboard
    'dashboard'          => 'dashboard',
    'analysis.run_child'  => 'runChildAnalysis',
    'analysis.run_all'    => 'runAllChildrenAnalysis',

    // Users (parent accounts)
    'users'              => 'listUsers',
    'users.create'       => 'createUser',
    'users.store'        => 'storeUser',
    'users.edit'         => 'editUser',
    'users.update'       => 'updateUser',
    'users.delete'       => 'deleteUser',
    'users.toggleStatus' => 'toggleUserStatus',

    // Children
    'children'           => 'listChildren',
    'children.create'    => 'createChild',
    'children.store'     => 'storeChild',
    'children.edit'      => 'editChild',
    'children.update'    => 'updateChild',
    'children.delete'    => 'deleteChild',

    // Characters
    'characters'         => 'listCharacters',
    'characters.create'  => 'createCharacter',
    'characters.store'   => 'storeCharacter',
    'characters.edit'    => 'editCharacter',
    'characters.update'  => 'updateCharacter',
    'characters.delete'  => 'deleteCharacter',
    'characters.toggle'  => 'toggleCharacter',

    // Games
    'games'              => 'listGames',
    'games.edit'         => 'editGame',
    'games.update'       => 'updateGame',
    'games.toggle'       => 'toggleGame',
];

$handler = $routes[$action] ?? 'notFound';

if (method_exists($controller, $handler)) {
    $controller->$handler();
} else {
    $controller->notFound();
}
