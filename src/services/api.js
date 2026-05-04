const getDefaultApiUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://127.0.0.1:8000'
  }

  return `${window.location.protocol}//${window.location.hostname}:8000`
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || getDefaultApiUrl()

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }

  return data
}

export const api = {
  me: () => request('/me.php'),
  login: (payload) =>
    request('/login.php', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  register: (payload) =>
    request('/register.php', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  logout: () =>
    request('/logout.php', {
      method: 'POST',
    }),
  checkout: (payload) =>
    request('/checkout.php', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  adminProducts: () => request('/admin/products.php'),
  adminOrders: () => request('/admin/orders.php'),
  adminUsers: () => request('/admin/users.php'),
}
