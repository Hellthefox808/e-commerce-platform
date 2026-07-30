import React, { useState, useEffect } from 'react';
import { ShieldAlert, Plus, RefreshCw, Edit, Trash2, Package, Check, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AdminAnalyticsChart } from '../components/AdminAnalyticsChart';
import { api } from '../services/api';

export const AdminDashboard = () => {
  const { hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'inventory' | 'orders' | 'audit'

  const [analyticsData, setAnalyticsData] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Product Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('25');
  const [newCategory, setNewCategory] = useState('Electronics');
  const [newBrand, setNewBrand] = useState('Luxe');
  const [newImg, setNewImg] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800');

  const refreshAll = () => {
    setLoading(true);
    Promise.all([
      api.getAnalytics(),
      api.getProducts(),
      api.getAllOrders(),
      api.getAuditLogs()
    ]).then(([analyticsRes, productsRes, ordersRes, auditRes]) => {
      if (analyticsRes.success) setAnalyticsData(analyticsRes.data);
      if (productsRes.success) setProducts(productsRes.data.products || []);
      if (ordersRes.success) setOrders(ordersRes.data || []);
      if (auditRes.success) setAuditLogs(auditRes.data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (hasRole('ADMIN', 'SUPER_ADMIN')) {
      refreshAll();
    }
  }, []);

  if (!hasRole('ADMIN', 'SUPER_ADMIN')) {
    return (
      <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
        <ShieldAlert size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
        <h2>Access Denied: Requires Admin Privileges</h2>
        <p style={{ color: 'var(--text-muted)' }}>Please log in with an administrator account (e.g. admin@luxemarket.com).</p>
      </div>
    );
  }

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    await api.createProduct({
      title: newTitle,
      price: parseFloat(newPrice),
      stock: parseInt(newStock),
      category: newCategory,
      brand: newBrand,
      image_url: newImg
    });
    setShowAddModal(false);
    setNewTitle('');
    setNewPrice('');
    refreshAll();
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    await api.updateOrderStatus(orderId, newStatus);
    refreshAll();
  };

  const handleDeleteProduct = async (prodId) => {
    if (window.confirm('Delete this product from catalog?')) {
      await api.deleteProduct(prodId);
      refreshAll();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Admin Header */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge badge-warning" style={{ marginBottom: '0.4rem' }}>
            <ShieldCheck size={14} /> Platform Oversight
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Admin & Seller Control Panel</h1>
        </div>
        <button onClick={refreshAll} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <RefreshCw size={16} /> Refresh Data
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'analytics' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'analytics' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700
          }}
        >
          Sales Analytics
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'inventory' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'inventory' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700
          }}
        >
          Inventory Management ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'orders' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'orders' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700
          }}
        >
          Order Fulfillment ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'audit' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'audit' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700
          }}
        >
          Security Audit Logs ({auditLogs.length})
        </button>
      </div>

      {/* Tab 1: Sales Analytics */}
      {activeTab === 'analytics' && <AdminAnalyticsChart data={analyticsData} />}

      {/* Tab 2: Inventory CRUD */}
      {activeTab === 'inventory' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Store Inventory List</h3>
            <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <Plus size={16} /> Add Product
            </button>
          </div>

          {/* Add Product Modal */}
          {showAddModal && (
            <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--primary-accent)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Create New Product Listing</h4>
              <form onSubmit={handleAddProductSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block' }}>Title</label>
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block' }}>Price ($)</label>
                  <input type="number" step="0.01" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block' }}>Stock Qty</label>
                  <input type="number" value={newStock} onChange={(e) => setNewStock(e.target.value)} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block' }}>Category</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ width: '100%' }}>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block' }}>Brand</label>
                  <input type="text" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} required style={{ width: '100%' }} />
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
                  <button type="submit" className="btn-primary">Save to Catalog</button>
                </div>
              </form>
            </div>
          )}

          {/* Product Table */}
          <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Product</th>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Price</th>
                  <th style={{ padding: '0.75rem' }}>Stock</th>
                  <th style={{ padding: '0.75rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700 }}>{p.title}</td>
                    <td style={{ padding: '0.75rem' }}>{p.category}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 800 }}>${p.price.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${p.stock <= 20 ? 'badge-warning' : 'badge-success'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <button onClick={() => handleDeleteProduct(p.id)} style={{ background: 'none', color: '#ef4444' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Order Fulfillment */}
      {activeTab === 'orders' && (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Manage Order Fulfillment</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Order ID</th>
                <th style={{ padding: '0.75rem' }}>Customer ID</th>
                <th style={{ padding: '0.75rem' }}>Total</th>
                <th style={{ padding: '0.75rem' }}>Fulfillment Status</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{o.id}</td>
                  <td style={{ padding: '0.75rem' }}>{o.user_id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 800 }}>${o.total_amount.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge badge-info">{o.status}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <select
                      value={o.status}
                      onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                      style={{ fontSize: '0.8rem', padding: '0.35rem' }}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Security Audit Logs */}
      {activeTab === 'audit' && (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Immutable Audit Log Inspection</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Timestamp</th>
                <th style={{ padding: '0.75rem' }}>User</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
                <th style={{ padding: '0.75rem' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{log.user_name} ({log.user_id})</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge badge-info">{log.action}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
