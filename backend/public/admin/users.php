<?php
declare(strict_types=1);

require_once __DIR__ . '/../../lib/auth.php';

require_admin();

$users = db()
    ->query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC')
    ->fetchAll();

json_response(['users' => $users]);
