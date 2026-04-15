import React from 'react'

const trackingSteps = [
  'Order placed',
  'Packed',
  'Shipped',
  'Out for delivery',
  'Delivered',
]

const OrderTracking = ({ orders }) => {
  return (
    <section className="tracking-section" id="orders" data-reveal>
      <div className="section-heading">
        <div>
          <p className="section-label">Where Is My Order?</p>
          <h2>Track your recent orders</h2>
        </div>
        <p className="section-copy">
          Follow each step of the delivery journey with live-style progress cards.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="tracking-empty">
          <strong>No orders yet</strong>
          <p>
            Place your first order and the tracking timeline will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="tracking-list">
          {orders.map((order) => (
            <article className="tracking-card" key={order.id}>
              <div className="tracking-card-top">
                <div>
                  <p className="tracking-order-id">Order #{order.id}</p>
                  <h3>{order.items[0]?.name}{order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}</h3>
                </div>
                <span className={`tracking-chip stage-${order.statusIndex}`}>
                  {trackingSteps[order.statusIndex]}
                </span>
              </div>

              <div className="tracking-meta">
                <div>
                  <span>Expected delivery</span>
                  <strong>{order.eta}</strong>
                </div>
                <div>
                  <span>Payment</span>
                  <strong>{order.paymentLabel}</strong>
                </div>
                <div>
                  <span>Total</span>
                  <strong>Rs. {order.total}</strong>
                </div>
              </div>

              <div className="tracking-progress">
                {trackingSteps.map((step, index) => (
                  <div
                    className={`tracking-step ${index <= order.statusIndex ? 'done' : ''}`}
                    key={step}
                  >
                    <span className="tracking-dot" />
                    <small>{step}</small>
                  </div>
                ))}
              </div>

              <div className="tracking-address-row">
                <div>
                  <span>Ship to</span>
                  <strong>{order.fullName}</strong>
                  <p>
                    {order.address}, {order.city}, {order.state} - {order.pincode}
                  </p>
                </div>
                <div>
                  <span>Delivery slot</span>
                  <strong>{order.deliverySlot}</strong>
                  <p>{order.phone}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default OrderTracking
