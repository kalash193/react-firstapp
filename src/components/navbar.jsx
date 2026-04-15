import React from 'react'
import './navbar.css'

const Navbar = ({ cartcount, onCartClick }) => {
  return (
    <header className="navcontainer">
      <nav>
        <a className="brand" href="/">
          <span className="brand-mark">K</span>
          <div className="brand-copy">
            <strong>Kalash Store</strong>
            <span>Modern essentials</span>
          </div>
        </a>

        <ul>
          <li><a href="#products">Shop</a></li>
          <li><a href="#products">Categories</a></li>
          <li><a href="#products">Deals</a></li>
        </ul>

        <button className="cart-wrapper" type="button" onClick={onCartClick}>
          <span className="cart-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M3 4h2.2l1.3 6.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.5L20 6.5H7.1"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <circle cx="10" cy="18.5" r="1.5" fill="currentColor" />
              <circle cx="17" cy="18.5" r="1.5" fill="currentColor" />
            </svg>
          </span>
          <span className="cart-text">Cart</span>
          <span className="cart-count">{cartcount}</span>
        </button>
      </nav>
    </header>
  )
}

export default Navbar
