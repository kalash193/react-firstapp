import React from 'react'

const OrderSuccess = ({ order, onContinueShopping, onClose }) => {
  return (
    <div className="order-success">
      <div className="success-badge">Order placed successfully</div>
      <h2>Thanks for shopping with Kalash Store</h2>
      <p>
        Your order has been confirmed and the payment flow now feels much closer
        to a real Flipkart or Amazon style experience.
      </p>

      <div className="success-grid">
        <div>
          <span>Order ID</span>
          <strong>{order.id}</strong>
        </div>
        <div>
          <span>Payment</span>
          <strong>{order.paymentLabel}</strong>
        </div>
        <div>
          <span>Delivery</span>
          <strong>{order.deliverySlot}</strong>
        </div>
        <div>
          <span>Total Paid</span>
          <strong>Rs. {order.total}</strong>
        </div>
      </div>

      <div className="success-address">
        <span>Shipping to</span>
        <strong>{order.fullName}</strong>
        <p>
          {order.address}, {order.city}, {order.state} - {order.pincode}
        </p>
        <small>{order.phone}</small>
      </div>

      <div className="success-actions">
        <button className="primary-action" type="button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="secondary-action" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default OrderSuccess
