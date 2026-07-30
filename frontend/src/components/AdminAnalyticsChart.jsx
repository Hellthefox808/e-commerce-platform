import React from 'react';
import { TrendingUp, DollarSign, ShoppingBag, Users, AlertTriangle } from 'lucide-react';

export const AdminAnalyticsChart = ({ data }) => {
  if (!data) return null;

  const maxRev = Math.max(...(data.salesTrend || []).map(d => d.revenue), 12000);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Metric Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '12px', color: '#10b981' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Revenue</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>${(data.totalRevenue || 0).toFixed(2)}</h3>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(124, 58, 237, 0.15)', borderRadius: '12px', color: '#7c3aed' }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Orders</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{data.totalOrders || 0}</h3>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '12px', color: '#6366f1' }}>
            <Users size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered Users</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{data.totalUsers || 0}</h3>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '12px', color: '#f59e0b' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Low Stock Alerts</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{(data.lowStockAlerts || []).length} Items</h3>
          </div>
        </div>
      </div>

      {/* Visual Revenue Trend Bar Chart */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Monthly Revenue Growth</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Live aggregated sales telemetry</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 700 }}>
            <TrendingUp size={16} /> +18.4% vs last month
          </div>
        </div>

        <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
          {(data.salesTrend || []).map((item) => {
            const heightPercent = Math.round((item.revenue / maxRev) * 100);
            return (
              <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>${item.revenue}</span>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '40px',
                    height: `${heightPercent}%`,
                    background: 'var(--primary-gradient)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.5s ease',
                    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
                  }}
                />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, marginTop: '0.5rem', color: 'var(--text-main)' }}>{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
