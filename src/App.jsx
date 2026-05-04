import { useEffect, useState } from 'react'
import Footer from './components/footer'
import Card from './components/card'
import Navbar from './components/navbar'
import Cart from './components/cart'
import Checkout from './components/checkout'
import OrderSuccess from './components/orderSuccess'
import OrderTracking from './components/orderTracking'
import AuthPanel from './components/authPanel'
import AdminDashboard from './components/adminDashboard'
import { api } from './services/api'
import './App.css'

const initialCheckoutForm = {
  fullName: 'Kalash Date',
  phone: '+91 7499031395',
  address: 'Near IT Park, Premium Residency, Flat 203',
  city: 'Nagpur',
  state: 'Maharashtra',
  pincode: '440001',
  deliverySlot: 'Tomorrow, 9 AM - 1 PM',
  paymentMethod: 'upi',
}

const paymentLabels = {
  upi: 'UPI / Wallet',
  card: 'Card Payment',
  cod: 'Cash on Delivery',
  netbanking: 'Net Banking',
}

const getOrderStatusIndex = (createdAt) => {
  const hoursPassed = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60))

  if (hoursPassed >= 36) return 4
  if (hoursPassed >= 18) return 3
  if (hoursPassed >= 8) return 2
  if (hoursPassed >= 2) return 1
  return 0
}

const getOrderEta = (createdAt) => {
  const etaDate = new Date(createdAt + 2 * 24 * 60 * 60 * 1000)

  return etaDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function App() {
  const [authUser, setAuthUser] = useState(null)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = window.localStorage.getItem('kalash-store-cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [orders, setOrders] = useState(() => {
    const savedOrders = window.localStorage.getItem('kalash-store-orders')
    return savedOrders ? JSON.parse(savedOrders) : []
  })
  const [activePanel, setActivePanel] = useState(null)
  const [checkoutForm, setCheckoutForm] = useState(initialCheckoutForm)
  const [placedOrder, setPlacedOrder] = useState(null)
  const [authNotice, setAuthNotice] = useState('')
  const [checkoutNotice, setCheckoutNotice] = useState('')

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -60px 0px' },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    window.localStorage.setItem('kalash-store-cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    window.localStorage.setItem('kalash-store-orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    api
      .me()
      .then(({ user }) => setAuthUser(user))
      .catch(() => setAuthUser(null))
  }, [])

  const signInUser = async ({ mode, name, email, password }) => {
    try {
      if (!email.trim() || password.length < 8) {
        setAuthNotice('Enter an email and a password with at least 8 characters.')
        return
      }

      const action = mode === 'register' ? api.register : api.login
      const { user } = await action({ name, email, password })

      setAuthUser(user)
      setAuthNotice('')
      setActivePanel(null)
    } catch (error) {
      setAuthNotice(
        error.message === 'Failed to fetch'
          ? 'Cannot reach the PHP backend. Start it with: php -S 127.0.0.1:8000 -t backend/public'
          : error.message,
      )
    }
  }

  const signOutUser = async () => {
    try {
      await api.logout()
    } catch {
      // The UI still clears the session state if the backend is unavailable.
    } finally {
      setAuthUser(null)
      setActivePanel(null)
    }
  }

  const requireAuth = (nextPanel) => {
    if (!authUser) {
      setAuthNotice('Sign in to access protected checkout and admin areas.')
      setActivePanel('auth')
      return
    }

    if (nextPanel === 'admin' && authUser.role !== 'admin') {
      setAuthNotice('Admin access requires an admin account. Use an email containing admin for this demo.')
      setActivePanel('auth')
      return
    }

    setAuthNotice('')
    setActivePanel(nextPanel)
  }

  const addToCart = (item) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((currentItem) => currentItem.id === item.id)

      if (existingItem) {
        return currentItems.map((currentItem) =>
          currentItem.id === item.id
            ? { ...currentItem, quantity: currentItem.quantity + 1 }
            : currentItem,
        )
      }

      return [...currentItems, { ...item, quantity: 1 }]
    })
  }

  const decreaseQuantity = (itemId) => {
    setCartItems((currentItems) => {
      return currentItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0)
    })
  }

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 149
  const platformFee = subtotal === 0 ? 0 : 19
  const total = subtotal + shipping + platformFee
  const totals = { itemCount, subtotal, shipping, platformFee, total }

  const updateCheckoutField = (event) => {
    const { name, value } = event.target
    setCheckoutForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const placeOrder = async () => {
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'state', 'pincode']
    const hasMissingFields = requiredFields.some((field) => !checkoutForm[field].trim())

    if (hasMissingFields || cartItems.length === 0) {
      return
    }

    setCheckoutNotice('')

    try {
      const response = await api.checkout({
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        payment_method: checkoutForm.paymentMethod,
        delivery_slot: checkoutForm.deliverySlot,
        shipping_address: `${checkoutForm.address}, ${checkoutForm.city}, ${checkoutForm.state} - ${checkoutForm.pincode}`,
      })

      const orderId = `KS${response.order_id}`
      const createdAt = Date.now()
      const orderRecord = {
        ...checkoutForm,
        id: orderId,
        userId: authUser?.id,
        customerEmail: authUser?.email,
        total: response.total,
        items: cartItems,
        createdAt,
        eta: getOrderEta(createdAt),
        statusIndex: getOrderStatusIndex(createdAt),
        paymentLabel: paymentLabels[checkoutForm.paymentMethod],
      }

      setPlacedOrder(orderRecord)
      setOrders((currentOrders) => [orderRecord, ...currentOrders].slice(0, 6))
      setCartItems([])
      setActivePanel('placed')
    } catch (error) {
      setCheckoutNotice(
        error.message === 'Failed to fetch'
          ? 'Cannot reach the PHP backend. Start it with: php -S 127.0.0.1:8000 -t backend/public'
          : error.message,
      )
    }
  }

  const createLocalOrderPreview = () => {
    const orderId = `KS${Date.now().toString().slice(-8)}`
    const createdAt = Date.now()
    const orderRecord = {
      ...checkoutForm,
      id: orderId,
      userId: authUser?.id,
      customerEmail: authUser?.email,
      total,
      items: cartItems,
      createdAt,
      eta: getOrderEta(createdAt),
      statusIndex: getOrderStatusIndex(createdAt),
      paymentLabel: paymentLabels[checkoutForm.paymentMethod],
    }

    setPlacedOrder(orderRecord)
    setOrders((currentOrders) => [orderRecord, ...currentOrders].slice(0, 6))
    setCartItems([])
    setActivePanel('placed')
  }

  const closePanel = () => {
    setActivePanel(null)
    setPlacedOrder(null)
  }

  return (
    <div className="app-shell">
      <Navbar
        cartcount={itemCount}
        onCartClick={() => setActivePanel('cart')}
        user={authUser}
        onAuthClick={() => setActivePanel('auth')}
        onAdminClick={() => requireAuth('admin')}
        onLogout={signOutUser}
      />

      <main className="app-content">
        <section className="hero-banner" data-reveal>
          <div className="hero-copy">
            <p className="eyebrow">Fresh arrivals for everyday living</p>
            <h1>Build your dream setup with products that feel premium.</h1>
            <p className="hero-text">
              Shop curated home, tech, and lifestyle picks with quick delivery,
              modern design, and prices that stay friendly.
            </p>

            <div className="hero-pill-row">
              <span>Fast checkout</span>
              <span>Trusted quality</span>
              <span>Modern lifestyle picks</span>
            </div>

            <div className="hero-actions">
              <button
                className="primary-action"
                type="button"
                onClick={() => {
                  if (itemCount > 0) {
                    setActivePanel('cart')
                    return
                  }

                  document.querySelector('#products')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
              >
                {itemCount > 0 ? 'View Cart' : 'Shop Now'}
              </button>
              <a className="secondary-action" href="#products">
                Shop Collection
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-highlight">
              <div className="hero-glow" />
              <span>Best Seller</span>
              <strong>Wireless Sound Pods</strong>
              <p>Smart audio, pocket size, all-day battery.</p>
            </div>
            <div className="hero-stats">
              <div>
                <strong>24h</strong>
                <span>dispatch</span>
              </div>
              <div>
                <strong>4.8/5</strong>
                <span>reviews</span>
              </div>
              <div>
                <strong>1200+</strong>
                <span>orders</span>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" data-reveal>
          <div>
            <strong>12K+</strong>
            <span>happy shoppers</span>
          </div>
          <div>
            <strong>48h</strong>
            <span>fast dispatch promise</span>
          </div>
          <div>
            <strong>98%</strong>
            <span>repeat buyer satisfaction</span>
          </div>
          <div>
            <strong>Curated</strong>
            <span>premium everyday essentials</span>
          </div>
        </section>

        <section className="store-section" id="products" data-reveal>
          <div className="section-heading">
            <div>
              <p className="section-label">Featured Products</p>
              <h2>Popular picks from our store</h2>
            </div>
            <p className="section-copy">
              A curated mix of practical upgrades, cozy essentials, and
              everyday tech.
            </p>
          </div>

          <section className="card-panel">
            <Card addToCart={addToCart} />
          </section>
        </section>

        <OrderTracking
          orders={orders.map((order) => ({
            ...order,
            statusIndex: getOrderStatusIndex(order.createdAt),
            eta: getOrderEta(order.createdAt),
          }))}
        />
      </main>

      {activePanel ? (
        <div className="cart-modal-backdrop" onClick={closePanel}>
          <div
            className={`cart-modal ${activePanel !== 'cart' ? 'wide-modal' : ''}`}
            onClick={(event) => event.stopPropagation()}
          >
            {activePanel === 'cart' ? (
              <Cart
                cartItems={cartItems}
                totals={totals}
                onClose={closePanel}
                onIncrease={addToCart}
                onDecrease={decreaseQuantity}
                onCheckout={() => requireAuth('checkout')}
              />
            ) : null}

            {activePanel === 'checkout' ? (
              <Checkout
                cartItems={cartItems}
                totals={totals}
                form={checkoutForm}
                notice={checkoutNotice}
                onFieldChange={updateCheckoutField}
                onPaymentChange={updateCheckoutField}
                onBack={() => setActivePanel('cart')}
                onPlaceOrder={placeOrder}
                onLocalPreview={createLocalOrderPreview}
              />
            ) : null}

            {activePanel === 'placed' && placedOrder ? (
              <OrderSuccess
                order={placedOrder}
                onContinueShopping={closePanel}
                onClose={closePanel}
              />
            ) : null}

            {activePanel === 'auth' ? (
              <AuthPanel
                notice={authNotice}
                onSubmit={signInUser}
                onClose={closePanel}
              />
            ) : null}

            {activePanel === 'admin' && authUser ? (
              <AdminDashboard
                orders={orders}
                user={authUser}
                onClose={closePanel}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  )
}

export default App
