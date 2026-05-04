CREATE DATABASE IF NOT EXISTS kalash_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kalash_store;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  slug VARCHAR(140) NOT NULL UNIQUE
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(160) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  stock INT NOT NULL DEFAULT 0,
  status ENUM('active', 'draft', 'archived') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON UPDATE CASCADE
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(40) NOT NULL,
  delivery_slot VARCHAR(80) NOT NULL,
  shipping_address TEXT NOT NULL,
  status ENUM('placed', 'packed', 'shipped', 'out_for_delivery', 'delivered') NOT NULL DEFAULT 'placed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_product (user_id, product_id),
  CONSTRAINT fk_cart_items_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_cart_items_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);

INSERT IGNORE INTO categories (id, name, slug) VALUES
  (1, 'Audio', 'audio'),
  (2, 'Home Office', 'home-office'),
  (3, 'Lifestyle', 'lifestyle'),
  (4, 'Decor', 'decor'),
  (5, 'Wearables', 'wearables'),
  (6, 'Accessories', 'accessories');

INSERT IGNORE INTO users (name, email, password_hash, role) VALUES
  ('Store Admin', 'admin@kalash.local', '$2y$10$rFLuM312obm4W.ldfg6ioe4D.s0gyCOCeNszZ6Vcnl4n8zoA6Wh2O', 'admin');

INSERT IGNORE INTO products (id, category_id, name, description, price, original_price, stock, status) VALUES
  (1, 1, 'Wireless Sound Pods', 'Compact earbuds with rich bass, fast pairing, and long battery life.', 2499.00, 3199.00, 40, 'active'),
  (2, 2, 'Minimal Desk Lamp', 'Soft ambient glow with adjustable brightness for focused work.', 1799.00, 2299.00, 35, 'active'),
  (3, 3, 'Urban Carry Bottle', 'Leak-proof steel bottle designed for daily commutes and travel.', 899.00, 1199.00, 60, 'active'),
  (4, 4, 'Cloud Cushion Set', 'Soft textured cushions that instantly warm up any living space.', 1599.00, 2099.00, 28, 'active'),
  (5, 5, 'Smart Fitness Band', 'Track movement, heart rate, sleep, and workouts with ease.', 3299.00, 3899.00, 24, 'active'),
  (6, 6, 'Travel Tech Pouch', 'Organized compartments for chargers, cables, and daily essentials.', 1099.00, 1499.00, 45, 'active');
