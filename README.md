# Kalash Store

Kalash Store is a React + Vite ecommerce project with a product catalog, cart, guarded checkout flow, order tracking, and an admin dashboard. It also includes a PHP + MySQL backend scaffold for session authentication, hashed passwords, protected checkout/admin endpoints, and normalized relational tables.

## Project Goal

This project demonstrates:

- Branded ecommerce storefront UI
- Featured product grid with cart quantity controls
- Protected checkout access after sign-in
- Order placement and recent order tracking
- Admin dashboard for product management, order tracking, and user administration
- PHP sessions with `password_hash()` and `password_verify()`
- Normalized MySQL schema for users, categories, products, orders, order items, and cart items
- Responsive layouts built with CSS Flexbox and Grid

## Tech Stack

- React 19
- Vite 8
- JavaScript JSX
- Plain CSS
- PHP 8
- MySQL

## Scripts

Use these commands from the project root:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Run Frontend And Backend Together

1. Start MySQL in XAMPP.
2. Import `backend/schema.sql` in phpMyAdmin.
3. Start the PHP API from the project root:

```bash
php -S 127.0.0.1:8000 -t backend/public
```

4. Start the React app:

```bash
npm run dev -- --host 127.0.0.1
```

5. Open `http://127.0.0.1:5173`.

The React app calls the PHP API at `http://127.0.0.1:8000` by default. To use a different backend URL, create a `.env` file with:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Default admin login after importing the schema:

```text
Email: admin@kalash.local
Password: admin12345
```

## Folder Structure

```text
react-firstapp/
|-- backend/
|   |-- schema.sql
|   |-- config/database.php
|   |-- lib/auth.php
|   `-- public/
|       |-- register.php
|       |-- login.php
|       |-- logout.php
|       |-- me.php
|       |-- checkout.php
|       `-- admin/
|           |-- products.php
|           |-- orders.php
|           `-- users.php
|-- src/
|   |-- App.jsx
|   |-- App.css
|   |-- data/products.js
|   `-- components/
|       |-- adminDashboard.jsx
|       |-- authPanel.jsx
|       |-- card.jsx
|       |-- cart.jsx
|       |-- checkout.jsx
|       |-- navbar.jsx
|       |-- orderSuccess.jsx
|       `-- orderTracking.jsx
|-- package.json
`-- README.md
```

## How The App Works

`src/App.jsx` owns the main storefront state and calls the PHP backend through `src/services/api.js`:

- `authUser`: signed-in user for protected checkout and admin access
- `cartItems`: products and quantities in the cart
- `orders`: recent placed orders
- `activePanel`: the current modal panel for cart, checkout, auth, order success, or admin

The cart stores data in `localStorage`, calculates subtotal/shipping/platform fee totals, and opens checkout only after sign-in. Checkout posts cart items to `backend/public/checkout.php`, then stores a local copy of the confirmed order for the tracking section.

## Authentication And Protected Access

The React UI includes a sign-in panel connected to the PHP auth endpoints and blocks checkout/admin access until the user is signed in. The PHP backend adds the server-side version of the same protection:

- `backend/public/register.php` creates users with `password_hash()`.
- `backend/public/login.php` verifies passwords with `password_verify()` and starts a PHP session.
- `backend/lib/auth.php` centralizes `require_user()` and `require_admin()` route guards.
- `backend/public/checkout.php` requires an authenticated customer before placing an order.
- `backend/public/admin/*.php` requires an admin session before returning products, orders, or users.

## Database Design

`backend/schema.sql` defines a normalized MySQL database with 6 relational tables:

- `users`
- `categories`
- `products`
- `orders`
- `order_items`
- `cart_items`

The schema uses primary keys, foreign keys, unique constraints, status columns, and a unique cart item rule per user/product pair.

## Admin Dashboard

`src/components/adminDashboard.jsx` provides admin-facing panels for:

- Product inventory management
- Order tracking
- User administration

The dashboard is reachable from the navbar and requires an admin user in the UI. For the demo, signing in with an email containing `admin` gives admin access.

## Responsive Design

The app uses plain CSS with responsive breakpoints:

- Product cards move from multi-column layout to single-column mobile layout.
- Navbar wraps on small screens.
- Checkout and admin layouts collapse cleanly on tablets and phones.
- Cart and checkout modals adjust spacing on mobile.

## Current Limitations

Payment processing is simulated and does not connect to a live gateway. The frontend now connects to the PHP auth, checkout, and admin APIs, while order tracking still keeps a local UI copy so the latest order appears immediately after checkout.

## Good Next Improvements

- Add category filters and product search
- Add React Router for real protected pages
- Add a live payment gateway
- Add PHPUnit/API tests for protected PHP routes

## Build Status

The project builds successfully with:

```bash
npm run build
```
