<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

$data = read_json_body();
$email = strtolower(trim((string)($data['email'] ?? '')));
$password = (string)($data['password'] ?? '');

$statement = db()->prepare('SELECT id, password_hash FROM users WHERE email = ?');
$statement->execute([$email]);
$user = $statement->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    json_response(['error' => 'Invalid email or password'], 401);
}

session_regenerate_id(true);
$_SESSION['user_id'] = (int)$user['id'];

json_response(['user' => current_user()]);
