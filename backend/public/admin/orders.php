<?php
declare(strict_types=1);

require_once __DIR__ . '/../../lib/auth.php';

require_admin();

$orders = db()
    ->query('SELECT orders.*, users.name AS customer_name, users.email AS customer_email FROM orders JOIN users ON users.id = orders.user_id ORDER BY orders.created_at DESC')
    ->fetchAll();

json_response(['orders' => $orders]);
