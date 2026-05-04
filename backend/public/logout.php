<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

$_SESSION = [];
session_destroy();

json_response(['ok' => true]);
