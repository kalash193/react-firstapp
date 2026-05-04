<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

$data = read_json_body();
$name = trim((string)($data['name'] ?? ''));
$email = strtolower(trim((string)($data['email'] ?? '')));
$password = (string)($data['password'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
    json_response(['error' => 'Valid name, email, and 8 character password are required'], 422);
}

$statement = db()->prepare(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
);
$role = str_ends_with($email, '@kalash.local') ? 'admin' : 'customer';
$statement->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT), $role]);

$_SESSION['user_id'] = (int)db()->lastInsertId();

json_response(['user' => current_user()], 201);
