<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

session_set_cookie_params([
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => !empty($_SERVER['HTTPS']),
]);
session_start();

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

function current_user(): ?array
{
    if (empty($_SESSION['user_id'])) {
        return null;
    }

    $statement = db()->prepare('SELECT id, name, email, role FROM users WHERE id = ?');
    $statement->execute([$_SESSION['user_id']]);
    $user = $statement->fetch();

    return $user ?: null;
}

function require_user(): array
{
    $user = current_user();

    if (!$user) {
        json_response(['error' => 'Authentication required'], 401);
    }

    return $user;
}

function require_admin(): array
{
    $user = require_user();

    if ($user['role'] !== 'admin') {
        json_response(['error' => 'Admin access required'], 403);
    }

    return $user;
}

function read_json_body(): array
{
    $body = file_get_contents('php://input');
    $data = json_decode($body ?: '{}', true);

    return is_array($data) ? $data : [];
}
