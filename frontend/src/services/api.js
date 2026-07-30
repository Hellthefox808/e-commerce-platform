const API_BASE = '/api/v1';

const getHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  const savedToken = token || localStorage.getItem('luxe_token');
  if (savedToken) {
    headers['Authorization'] = `Bearer ${savedToken}`;
  }
  return headers;
};

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  register: async (name, email, password, role = 'CUSTOMER') => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    return res.json();
  },

  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/products?${query}`);
    return res.json();
  },

  getProductBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/products/${slug}`);
    return res.json();
  },

  createProduct: async (productData) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData)
    });
    return res.json();
  },

  updateProduct: async (id, productData) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(productData)
    });
    return res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  // Orders
  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE}/orders/checkout`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData)
    });
    return res.json();
  },

  getUserOrders: async () => {
    const res = await fetch(`${API_BASE}/orders/my-orders`, {
      method: 'GET',
      headers: getHeaders()
    });
    return res.json();
  },

  updateOrderStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Payments
  createStripeIntent: async (orderId, amount) => {
    const res = await fetch(`${API_BASE}/payments/stripe/create-intent`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ orderId, amount })
    });
    return res.json();
  },

  createRazorpayOrder: async (orderId, amount) => {
    const res = await fetch(`${API_BASE}/payments/razorpay/create-order`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ orderId, amount })
    });
    return res.json();
  },

  verifyPayment: async (paymentData) => {
    const res = await fetch(`${API_BASE}/payments/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(paymentData)
    });
    return res.json();
  },

  // Admin
  getAnalytics: async () => {
    const res = await fetch(`${API_BASE}/admin/analytics`, {
      method: 'GET',
      headers: getHeaders()
    });
    return res.json();
  },

  getAuditLogs: async () => {
    const res = await fetch(`${API_BASE}/admin/audit-logs`, {
      method: 'GET',
      headers: getHeaders()
    });
    return res.json();
  },

  getAllOrders: async () => {
    const res = await fetch(`${API_BASE}/admin/orders`, {
      method: 'GET',
      headers: getHeaders()
    });
    return res.json();
  }
};
