<?php
declare(strict_types=1);

require_once __DIR__ . '/../../lib/auth.php';

require_admin();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $products = db()
        ->query('SELECT products.*, categories.name AS category FROM products JOIN categories ON categories.id = products.category_id ORDER BY products.id DESC')
        ->fetchAll();

    json_response(['products' => $products]);
}

$data = read_json_body();
$statement = db()->prepare(
    'INSERT INTO products (category_id, name, description, price, original_price, stock, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
);
$statement->execute([
    (int)$data['category_id'],
    trim((string)$data['name']),
    trim((string)($data['description'] ?? '')),
    (float)$data['price'],
    (float)($data['original_price'] ?? $data['price']),
    (int)($data['stock'] ?? 0),
    (string)($data['status'] ?? 'active'),
]);

json_response(['product_id' => (int)db()->lastInsertId()], 201);
