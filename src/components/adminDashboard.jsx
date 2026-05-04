import React, { useEffect, useMemo, useState } from 'react'
import products from '../data/products'
import { api } from '../services/api'

const demoUsers = [
  { id: 1, name: 'Kalash Date', email: 'kalash@example.com', role: 'customer' },
  { id: 2, name: 'Store Admin', email: 'admin@kalash.local', role: 'admin' },
  { id: 3, name: 'Priya Sharma', email: 'priya@example.com', role: 'customer' },
]

const AdminDashboard = ({ orders, user, onClose }) => {
  const [backendNotice, setBackendNotice] = useState('')
  const [backendUsers, setBackendUsers] = useState([])
  const [backendOrders, setBackendOrders] = useState([])
  const [inventory, setInventory] = useState(
    products.map((product, index) => ({
      ...product,
      stock: 18 + index * 7,
      status: index % 3 === 0 ? 'Low stock' : 'Active',
    })),
  )

  useEffect(() => {
    Promise.all([api.adminProducts(), api.adminOrders(), api.adminUsers()])
      .then(([productsResponse, ordersResponse, usersResponse]) => {
        if (productsResponse.products.length > 0) {
          setInventory(
            productsResponse.products.map((product) => ({
              ...product,
              price: Number(product.price),
              originalPrice: Number(product.original_price),
              image: products.find((item) => item.id === Number(product.id))?.image,
              status: Number(product.stock) <= 5 ? 'Low stock' : 'Active',
            })),
          )
        }

        setBackendOrders(ordersResponse.orders)
        setBackendUsers(usersResponse.users)
        setBackendNotice('')
      })
      .catch((error) => setBackendNotice(error.message))
  }, [])

  const visibleOrders = backendOrders.length > 0 ? backendOrders : orders
  const revenue = visibleOrders.reduce((total, order) => total + Number(order.total), 0)
  const users = useMemo(() => {
    const signedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    if (backendUsers.length > 0) {
      return backendUsers
    }

    return [signedInUser, ...demoUsers.filter((demoUser) => demoUser.email !== user.email)]
  }, [backendUsers, user])

  const updateStock = (productId, direction) => {
    setInventory((currentInventory) =>
      currentInventory.map((product) =>
        product.id === productId
          ? {
              ...product,
              stock: Math.max(0, product.stock + direction),
              status: product.stock + direction <= 5 ? 'Low stock' : 'Active',
            }
          : product,
      ),
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="checkout-header">
        <div>
          <p className="checkout-label">Admin Dashboard</p>
          <h2>Products, orders, and users</h2>
        </div>
        <button className="cart-close" type="button" onClick={onClose}>
          Close
        </button>
      </div>

      {backendNotice ? (
        <p className="auth-notice">
          Backend admin API unavailable: {backendNotice}
        </p>
      ) : null}

      <div className="admin-stats">
        <div>
          <span>Products</span>
          <strong>{inventory.length}</strong>
        </div>
        <div>
          <span>Orders</span>
          <strong>{visibleOrders.length}</strong>
        </div>
        <div>
          <span>Revenue</span>
          <strong>Rs. {revenue}</strong>
        </div>
        <div>
          <span>Users</span>
          <strong>{users.length}</strong>
        </div>
      </div>

      <section className="admin-section">
        <h3>Product Management</h3>
        <div className="admin-table">
          {inventory.map((product) => (
            <article className="admin-row" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <strong>{product.name}</strong>
                <span>{product.category} | Rs. {product.price}</span>
              </div>
              <span className={`admin-chip ${product.status === 'Low stock' ? 'warning' : ''}`}>
                {product.status}
              </span>
              <div className="cart-qty-controls">
                <button type="button" onClick={() => updateStock(product.id, -1)}>
                  -
                </button>
                <span>{product.stock}</span>
                <button type="button" onClick={() => updateStock(product.id, 1)}>
                  +
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h3>Order Tracking</h3>
        <div className="admin-table">
          {visibleOrders.length === 0 ? (
            <p className="cart-empty">No customer orders have been placed yet.</p>
          ) : (
            visibleOrders.map((order) => (
              <article className="admin-row" key={order.id}>
                <div>
                  <strong>#{order.id}</strong>
                  <span>
                    {order.fullName || order.customer_name} | {order.paymentLabel || order.payment_method}
                  </span>
                </div>
                <span className="admin-chip">Rs. {order.total}</span>
                <span>{order.deliverySlot || order.delivery_slot}</span>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="admin-section">
        <h3>User Administration</h3>
        <div className="admin-table">
          {users.map((adminUser) => (
            <article className="admin-row" key={adminUser.email}>
              <div>
                <strong>{adminUser.name}</strong>
                <span>{adminUser.email}</span>
              </div>
              <span className="admin-chip">{adminUser.role}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
