<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

$user = require_user();
$data = read_json_body();
$items = $data['items'] ?? [];

if (!is_array($items) || count($items) === 0) {
    json_response(['error' => 'Cart items are required'], 422);
}

$pdo = db();
$pdo->beginTransaction();

try {
    $total = 0.0;
    $productLookup = $pdo->prepare('SELECT id, price, stock FROM products WHERE id = ? AND status = "active"');
    $orderItems = [];

    foreach ($items as $item) {
        $productLookup->execute([(int)$item['product_id']]);
        $product = $productLookup->fetch();
        $quantity = max(1, (int)($item['quantity'] ?? 1));

        if (!$product || (int)$product['stock'] < $quantity) {
            throw new RuntimeException('One or more products are unavailable');
        }

        $lineTotal = (float)$product['price'] * $quantity;
        $total += $lineTotal;
        $orderItems[] = [$product['id'], $quantity, $product['price']];
    }

    $orderStatement = $pdo->prepare(
        'INSERT INTO orders (user_id, total, payment_method, delivery_slot, shipping_address) VALUES (?, ?, ?, ?, ?)',
    );
    $orderStatement->execute([
        $user['id'],
        $total,
        (string)($data['payment_method'] ?? 'cod'),
        (string)($data['delivery_slot'] ?? 'Standard, 2-3 days'),
        (string)($data['shipping_address'] ?? ''),
    ]);
    $orderId = (int)$pdo->lastInsertId();

    $itemStatement = $pdo->prepare(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
    );
    $stockStatement = $pdo->prepare('UPDATE products SET stock = stock - ? WHERE id = ?');

    foreach ($orderItems as [$productId, $quantity, $unitPrice]) {
        $itemStatement->execute([$orderId, $productId, $quantity, $unitPrice]);
        $stockStatement->execute([$quantity, $productId]);
    }

    $pdo->prepare('DELETE FROM cart_items WHERE user_id = ?')->execute([$user['id']]);
    $pdo->commit();

    json_response(['order_id' => $orderId, 'total' => $total], 201);
} catch (Throwable $error) {
    $pdo->rollBack();
    json_response(['error' => $error->getMessage()], 422);
}
