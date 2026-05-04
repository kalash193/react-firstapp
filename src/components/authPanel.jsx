import React, { useState } from 'react'

const AuthPanel = ({ notice, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: 'admin@kalash.local',
    password: 'admin123',
  })

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="auth-panel" onSubmit={handleSubmit}>
      <div className="checkout-header">
        <div>
          <p className="checkout-label">Protected Access</p>
          <h2>Sign in to continue</h2>
        </div>
        <button className="cart-close" type="button" onClick={onClose}>
          Close
        </button>
      </div>

      {notice ? <p className="auth-notice">{notice}</p> : null}

      <div className="checkout-form-grid auth-form-grid">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Kalash Date"
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="admin@kalash.local"
          />
        </label>
        <label className="full-width">
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            placeholder="Minimum 6 characters"
          />
        </label>
      </div>

      <button className="place-order-button" type="submit">
        Sign In
      </button>
    </form>
  )
}

export default AuthPanel
