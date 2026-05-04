import React from 'react'

const paymentDescriptions = {
  upi: 'Pay instantly using any UPI app with secure verification.',
  card: 'Use debit or credit cards with encrypted checkout.',
  cod: 'Pay at delivery after your order arrives at your doorstep.',
  netbanking: 'Complete your payment directly through your bank account.',
}

const Checkout = ({
  cartItems,
  totals,
  form,
  notice,
  onFieldChange,
  onPaymentChange,
  onBack,
  onPlaceOrder,
  onLocalPreview,
}) => {
  return (
    <div className="checkout-sheet">
      <div className="checkout-header">
        <div>
          <p className="checkout-label">Secure Checkout</p>
          <h2>Delivery, payment, and order review</h2>
        </div>
        <button className="cart-close" type="button" onClick={onBack}>
          Back to cart
        </button>
      </div>

      {notice ? (
        <div className="auth-notice checkout-notice">
          <span>{notice}</span>
          <button type="button" onClick={onLocalPreview}>
            Preview locally
          </button>
        </div>
      ) : null}

      <div className="checkout-layout">
        <section className="checkout-main">
          <article className="checkout-card">
            <div className="checkout-card-header">
              <span className="checkout-step">1</span>
              <div>
                <h3>Delivery Address</h3>
                <p>Add shipping details just like a real marketplace checkout.</p>
              </div>
            </div>

            <div className="checkout-form-grid">
              <label>
                Full Name
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={onFieldChange}
                  placeholder="Kalash Date"
                />
              </label>
              <label>
                Mobile Number
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onFieldChange}
                  placeholder="+91 9876543210"
                />
              </label>
              <label className="full-width">
                Street Address
                <textarea
                  name="address"
                  value={form.address}
                  onChange={onFieldChange}
                  placeholder="House no, area, landmark"
                  rows="3"
                />
              </label>
              <label>
                City
                <input
                  name="city"
                  value={form.city}
                  onChange={onFieldChange}
                  placeholder="Nagpur"
                />
              </label>
              <label>
                State
                <input
                  name="state"
                  value={form.state}
                  onChange={onFieldChange}
                  placeholder="Maharashtra"
                />
              </label>
              <label>
                Pincode
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={onFieldChange}
                  placeholder="440001"
                />
              </label>
              <label>
                Delivery Slot
                <select
                  name="deliverySlot"
                  value={form.deliverySlot}
                  onChange={onFieldChange}
                >
                  <option value="Tomorrow, 9 AM - 1 PM">Tomorrow, 9 AM - 1 PM</option>
                  <option value="Tomorrow, 2 PM - 6 PM">Tomorrow, 2 PM - 6 PM</option>
                  <option value="Standard, 2-3 days">Standard, 2-3 days</option>
                </select>
              </label>
            </div>
          </article>

          <article className="checkout-card">
            <div className="checkout-card-header">
              <span className="checkout-step">2</span>
              <div>
                <h3>Payment Method</h3>
                <p>Choose the way your customer would finish the order.</p>
              </div>
            </div>

            <div className="payment-options">
              {[
                ['upi', 'UPI / Wallet'],
                ['card', 'Card Payment'],
                ['cod', 'Cash on Delivery'],
                ['netbanking', 'Net Banking'],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className={`payment-option ${form.paymentMethod === value ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={value}
                    checked={form.paymentMethod === value}
                    onChange={onPaymentChange}
                  />
                  <div>
                    <strong>{label}</strong>
                    <p>{paymentDescriptions[value]}</p>
                  </div>
                </label>
              ))}
            </div>
          </article>
        </section>

        <aside className="checkout-summary">
          <article className="checkout-card sticky-card">
            <div className="checkout-card-header compact">
              <div>
                <p className="checkout-label">Order Summary</p>
                <h3>{totals.itemCount} items ready to place</h3>
              </div>
            </div>

            <ul className="checkout-items">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>Qty {item.quantity}</span>
                  </div>
                  <b>Rs. {item.price * item.quantity}</b>
                </li>
              ))}
            </ul>

            <div className="price-stack">
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
              <div className="price-total">
                <span>Total</span>
                <strong>Rs. {totals.total}</strong>
              </div>
            </div>

            <button className="place-order-button" type="button" onClick={onPlaceOrder}>
              Place Order
            </button>
          </article>
        </aside>
      </div>
    </div>
  )
}

export default Checkout
