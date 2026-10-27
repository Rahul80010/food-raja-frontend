const BACKEND_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'https://foodraja-backend.vercel.app';
const API_BASE = BACKEND_URL.endsWith('/api') ? BACKEND_URL : `${BACKEND_URL}/api`;

export async function fetchRestaurants(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.category) query.append('category', params.category);
  if (params.locality) query.append('locality', params.locality);

  const res = await fetch(`${API_BASE}/restaurants?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch restaurants');
  return res.json();
}

export async function fetchRestaurantDetails(idOrSlug) {
  const res = await fetch(`${API_BASE}/restaurants/${idOrSlug}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to load restaurant details');
  }
  return data;
}

export async function searchFoods(params = {}) {
  const query = new URLSearchParams();
  if (params.q) query.append('q', params.q);
  if (params.vegOnly) query.append('vegOnly', 'true');
  if (params.maxPrice) query.append('maxPrice', params.maxPrice);

  const res = await fetch(`${API_BASE}/foods/search?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to search dishes');
  return res.json();
}

export async function submitOrder(orderData, token = null) {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(orderData)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to submit order');
  }
  return data;
}

export async function trackOrder(orderNumber) {
  const res = await fetch(`${API_BASE}/orders/track/${encodeURIComponent(orderNumber)}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Order tracking not found');
  }
  return data;
}

// ==========================================
// CUSTOMER AUTHENTICATION APIs
// ==========================================

export async function loginCustomer(identifier, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }
  return data;
}

export async function registerCustomer(customerData) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerData)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Registration failed.');
  }
  return data;
}

export async function fetchCustomerProfile(token) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch user profile');
  }
  return data;
}

export async function fetchCustomerOrders(token) {
  const res = await fetch(`${API_BASE}/auth/my-orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch your orders');
  }
  return data;
}
