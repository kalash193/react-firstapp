# Kalash Store

Kalash Store is a React + Vite ecommerce-style frontend that showcases a small product catalog, a branded shopping layout, and a popup cart flow. The project is built as a single-page storefront and is organized with small reusable components for the navbar, product cards, cart modal, and footer.

## Project Goal

This project demonstrates how to build a simple shopping UI with:

- a branded ecommerce landing page
- a featured product grid
- add-to-cart behavior
- remove-from-cart behavior
- a popup cart modal
- responsive layout and styling

## Tech Stack

- React 19
- Vite 8
- Plain CSS
- JavaScript (JSX)

## Scripts

Use these commands from the project root:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Folder Structure

```text
react-firstapp/
├─ src/
│  ├─ App.jsx
│  ├─ App.css
│  ├─ index.css
│  ├─ main.jsx
│  ├─ assets/
│  └─ components/
│     ├─ navbar.jsx
│     ├─ navbar.css
│     ├─ card.jsx
│     ├─ card.css
│     ├─ cart.jsx
│     ├─ footer.jsx
│     └─ footer.css
├─ package.json
└─ README.md
```

## How The App Works

The application entry point is `src/main.jsx`. It renders the top-level `App` component into the `#root` element.

### 1. App Component

`src/App.jsx` is the main controller for the UI. It manages the core state and connects all the components together.

It stores:

- `cartItems`: an array of products added to the cart
- `isCartOpen`: controls whether the cart modal is visible

It defines:

- `addToCart(item)`: adds a selected product to the cart
- `removeFromCart(itemId)`: removes one matching item from the cart

It renders:

- `Navbar`
- hero section
- product section
- popup `Cart`
- `Footer`

### 2. Navbar Component

`src/components/navbar.jsx` displays the top navigation bar for the store.

Responsibilities:

- shows the brand name `Kalash Store`
- provides navigation links
- shows the cart button with item count
- opens the cart modal when the cart button is clicked

The cart icon button receives these props:

- `cartcount`
- `onCartClick`

### 3. Card Component

`src/components/card.jsx` contains the product catalog data and renders each product card.

Each product object includes:

- `id`
- `name`
- `category`
- `price`
- `originalPrice`
- `rating`
- `badge`
- `description`

Each card displays:

- product badge
- category and rating
- product title
- short description
- current and original price
- add-to-cart button

When the button is clicked, the selected product is passed to `addToCart`.

### 4. Cart Component

`src/components/cart.jsx` renders the cart modal content.

Responsibilities:

- lists all added items
- calculates total price using `reduce()`
- removes an item when `Remove` is clicked
- closes the modal when `Close` is clicked

Props used:

- `cartItems`
- `onClose`
- `onRemove`

### 5. Footer Component

`src/components/footer.jsx` renders the bottom section of the page and gives the storefront a finished branded footer.

## State Flow

The project uses simple top-down React state flow:

1. `App.jsx` owns the cart state.
2. `App.jsx` passes `cartcount` to `Navbar`.
3. `App.jsx` passes `addToCart` to `Card`.
4. `App.jsx` passes `cartItems`, `onClose`, and `onRemove` to `Cart`.
5. Child components trigger actions, but `App.jsx` updates the real state.

This is a common React pattern called "lifting state up".

## Layout And Styling

The app uses plain CSS files instead of Tailwind or CSS frameworks.

### Global Styles

`src/index.css` contains global defaults such as:

- fonts
- base colors
- resets for margins
- root and body sizing

### Page Styles

`src/App.css` contains the main layout:

- page background
- hero banner
- section layout
- cart modal
- responsive breakpoints

### Component Styles

- `navbar.css` styles the sticky top navigation
- `card.css` styles the ecommerce product cards
- `footer.css` styles the footer

## Cart Modal Logic

The cart modal is conditionally rendered in `App.jsx`.

If `isCartOpen` is `true`, the modal appears.

This line controls the open behavior:

```jsx
onCartClick={() => setIsCartOpen(true)}
```

This line closes the modal when the dark backdrop is clicked:

```jsx
<div className="cart-modal-backdrop" onClick={() => setIsCartOpen(false)}>
```

This line prevents the modal from closing when the user clicks inside the cart box:

```jsx
onClick={(event) => event.stopPropagation()}
```

## Remove Item Logic

The remove feature removes only one matching item at a time, even if the same product was added multiple times.

The logic works by:

- creating a local `itemRemoved` flag
- filtering the array
- removing only the first matching item

This makes the cart behave more like a real store cart.

## Responsive Design

The layout includes responsive breakpoints for tablets and mobile devices.

Examples:

- hero content stacks on smaller screens
- product cards move from 3 columns to 2 columns and then 1 column
- navbar wraps cleanly on small screens
- cart modal spacing adjusts for mobile

## Current Limitations

This is a frontend-only project, so it does not yet include:

- backend API
- database
- authentication
- product detail page
- quantity selector
- checkout flow
- payment integration
- persistent cart storage

## Good Next Improvements

If you want to keep building this project, strong next steps would be:

- add quantity increase/decrease controls in the cart
- move product data into a separate file like `src/data/products.js`
- add product images
- add category filters and search
- save the cart in `localStorage`
- add React Router for real pages
- build a checkout page

## Quick Code Summary

- `main.jsx` boots the React app
- `App.jsx` controls layout and cart state
- `navbar.jsx` shows branding and cart access
- `card.jsx` renders the store products
- `cart.jsx` renders the cart popup and total
- `footer.jsx` closes the page with branding

## Build Status

The project builds successfully with:

```bash
npm run build
```

## Who This Project Is Good For

This project is a good learning example if you want to understand:

- React props
- React state
- event handling
- conditional rendering
- component-based structure
- ecommerce UI basics
- responsive CSS layout

## Summary

Kalash Store is a clean React ecommerce demo that uses simple component structure and plain CSS to create a branded shopping experience. The code is organized so the UI is easy to extend, and the cart behavior is already wired for adding, removing, counting, and displaying products in a popup modal.
