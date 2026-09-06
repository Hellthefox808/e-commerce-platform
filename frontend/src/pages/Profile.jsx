import React, { useState, useEffect } from 'react';
import { User, Package, Clock, ShieldCheck, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OrderTimeline } from '../components/OrderTimeline';
import { api } from '../services/api';

export const Profile = () => {
  const { user, login, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('customer@luxemarket.com');
  const [password, setPassword] = useState('customer123');
  const [role, setRole] = useState('CUSTOMER');
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      api.getUserOrders().then((res) => {
        if (res.success) setOrders(res.data || []);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    try {
      if (authMode === 'login') {
        const res = await api.login(email, password);
        if (!res.success) throw new Error(res.error || 'Login failed');
        login(res.data.user, res.data.token);
      } else {
        const res = await api.register(name, email, password, role);
        if (!res.success) throw new Error(res.error || 'Registration failed');
        setAuthSuccess('Account created successfully! Logging you in...');
        setTimeout(() => {
          login(res.data.user, res.data.token);
        }, 800);
      }
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const setDemoUser = (demoEmail, demoPassword) => {
    setAuthMode('login');
    setEmail(demoEmail);
    setPassword(demoPassword);
    setAuthError(null);
  };

  if (!user) {
    return (
      <div style={{ maxWidth: '460px', margin: '2rem auto' }} className="glass-panel">
        <div style={{ padding: '2rem' }}>
          
          {/* Tab Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setAuthError(null); }}
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: 'var(--radius-sm)',
                background: authMode === 'login' ? 'var(--primary-gradient)' : 'transparent',
                color: authMode === 'login' ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setAuthError(null); }}
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: 'var(--radius-sm)',
                background: authMode === 'register' ? 'var(--primary-gradient)' : 'transparent',
                color: authMode === 'register' ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              Create Account
            </button>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {authMode === 'login' ? 'Welcome Back' : 'Join LuxeCommerce'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            {authMode === 'login'
              ? 'Access saved addresses, order history, and live shipment telemetry.'
              : 'Create your luxury shopping account with instant checkout perks.'}
          </p>

          {authError && (
            <div style={{ padding: '0.75rem', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {authError}
            </div>
          )}

          {authSuccess && (
            <div style={{ padding: '0.75rem', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {authSuccess}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {authMode === 'register' && (
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jordan Hayes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            {authMode === 'register' && (
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Account Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%' }}>
                  <option value="CUSTOMER">Customer (Shopper)</option>
                  <option value="SELLER">Seller (Vendor)</option>
                  <option value="ADMIN">System Administrator</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}>
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Quick Demo Credentials:</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setDemoUser('customer@luxemarket.com', 'customer123')}
                className="badge badge-info"
                style={{ cursor: 'pointer', padding: '0.35rem 0.65rem' }}
              >
                Customer: customer@luxemarket.com
              </button>
              <button
                type="button"
                onClick={() => setDemoUser('admin@luxemarket.com', 'admin123')}
                className="badge badge-warning"
                style={{ cursor: 'pointer', padding: '0.35rem 0.65rem' }}
              >
                Admin: admin@luxemarket.com
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Profile Header */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <User size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{user.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{user.email} • Role: <strong style={{ color: 'var(--primary-accent)' }}>{user.role}</strong></p>
          </div>
        </div>
        <button onClick={logout} className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      {/* Order History */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Your Orders & Shipment Tracking</h2>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading order history...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>You have no placed orders yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((ord) => (
              <div key={ord.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', overflow: 'hidden' }}>
                
                {/* Header Row */}
                <div
                  onClick={() => setExpandedOrder(expandedOrder === ord.id ? null : ord.id)}
                  style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order ID: {ord.id}</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>${ord.total_amount.toFixed(2)}</h4>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={`badge ${ord.status === 'DELIVERED' ? 'badge-success' : 'badge-info'}`}>
                      {ord.status}
                    </span>
                    {expandedOrder === ord.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === ord.id && (
                  <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <OrderTimeline status={ord.status} />

                    <div style={{ fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>SHIPPING ADDRESS:</span>
                      <p style={{ fontWeight: 600, marginTop: '0.2rem' }}>{ord.shipping_address}</p>
                    </div>

                    <div style={{ fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>ITEMS:</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.4rem' }}>
                        {(ord.items || []).map((it) => (
                          <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{it.title} (x{it.quantity})</span>
                            <span style={{ fontWeight: 700 }}>${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
