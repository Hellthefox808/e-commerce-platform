import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Printer, ShieldCheck } from 'lucide-react';
import { OrderTimeline } from '../components/OrderTimeline';
import { api } from '../services/api';

export const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.getOrderById(id).then((res) => {
      if (res.success) setOrder(res.data);
    });
  }, [id]);

  if (!order) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Fetching order invoice details...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Success Banner */}
      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(16,185,129,0.3)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
          <CheckCircle2 size={36} />
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Payment Confirmed & Order Placed!</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Thank you for shopping with LuxeCommerce. Order ID: <strong style={{ color: 'var(--primary-accent)' }}>{order.id}</strong>
        </p>
      </div>

      {/* Visual Timeline */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Delivery Progress</h3>
        <OrderTimeline status={order.status} />
      </div>

      {/* Invoice Details */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Invoice Summary</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Payment Gateway: {order.payment_method} ({order.payment_status})</span>
          </div>
          <button onClick={() => window.print()} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <Printer size={16} /> Print Invoice
          </button>
        </div>

        {/* Shipping Address */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>SHIPPING DESTINATION</h4>
          <p style={{ fontWeight: 600 }}>{order.shipping_address}</p>
        </div>

        {/* Order Items */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>ITEMS PURCHASED</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(order.items || []).map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', padding: '0.65rem', background: 'var(--bg-main)', borderRadius: '6px' }}>
                <div>
                  <span style={{ fontWeight: 700 }}>{item.title}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '0.75rem' }}>Qty: {item.quantity}</span>
                </div>
                <span style={{ fontWeight: 800 }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Amount */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800, borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <span>Total Paid</span>
          <span style={{ color: 'var(--primary-accent)' }}>${order.total_amount.toFixed(2)}</span>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/catalog" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>

    </div>
  );
};
