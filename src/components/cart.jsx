import React from 'react'

const Cart = ({
  cartItems,
  totals,
  onClose,
  onIncrease,
  onDecrease,
  onCheckout,
}) => {
  return (
    <div className="cart-sheet">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="cart-close" type="button" onClick={onClose}>
          Close
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details grow">
                  <span>{item.name}</span>
                  <small>Rs. {item.price} each</small>
                </div>
                <div className="cart-qty-controls">
                  <button type="button" onClick={() => onDecrease(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => onIncrease(item)}>
                    +
                  </button>
                </div>
                <strong>Rs. {item.price * item.quantity}</strong>
              </li>
            ))}
          </ul>

          <div className="cart-total stacked">
            <div>
              <span>Subtotal</span>
              <strong>Rs. {totals.subtotal}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>{totals.shipping === 0 ? 'Free' : `Rs. ${totals.shipping}`}</strong>
            </div>
            <div>
              <span>Platform Fee</span>
              <strong>Rs. {totals.platformFee}</strong>
            </div>
            <div className="cart-total-row emphasis">
              <span>Total</span>
              <strong>Rs. {totals.total}</strong>
            </div>
          </div>

          <button className="place-order-button" type="button" onClick={onCheckout}>
            Proceed to Checkout
          </button>

          <p className="cart-helper">
            Fast checkout, address form, and payment flow included.
          </p>
        </>
      )}
    </div>
  )
}

export default Cart
