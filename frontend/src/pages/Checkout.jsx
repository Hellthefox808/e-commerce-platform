import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, Truck, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PaymentModal } from '../components/PaymentModal';
import { api } from '../services/api';

export const Checkout = () => {
  const { cartItems, subtotal, discountAmount, totalAmount, promoCode, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: user ? user.name : 'Alex Morgan',
    street: '124 Fifth Avenue, Suite 400',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('STRIPE');
  const [createdOrder, setCreatedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (cartItems.length === 0 && !createdOrder) {
    return (
      <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate('/catalog')} className="btn-primary" style={{ marginTop: '1rem' }}>
          Browse Products
        </button>
      </div>
    );
  }

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const fullShippingStr = `${address.fullName}, ${address.street}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`;
      const res = await api.createOrder({
        items: cartItems,
        shippingAddress: fullShippingStr,
        paymentMethod,
        promoCode
      });

      if (!res.success) {
        throw new Error(res.error || 'Failed to create order');
      }

      setCreatedOrder(res.data);
      setLoading(false);
      setIsModalOpen(true);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handlePaymentSuccess = (confirmedOrder) => {
    setIsModalOpen(false);
    clearCart();
    navigate(`/confirmation/${createdOrder.orderId}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Title Header */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Checkout & Payment Authorization</h1>
        <p style={{ color: 'var(--text-muted)' }}>Complete your order with 256-bit encrypted gateway tokenization</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        
        {/* Shipping Form */}
        <form onSubmit={handleCreateOrder} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            1. Shipping & Contact Details
          </h2>

          {error && (
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderRadius: '6px', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Full Name</label>
            <input type="text" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} required style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Street Address</label>
            <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} required style={{ width: '100%' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>City</label>
              <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>State / Province</label>
              <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Zip Code</label>
              <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} required style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Country</label>
              <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required style={{ width: '100%' }} />
            </div>
          </div>

          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginTop: '1rem' }}>
            2. Select Payment Provider
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setPaymentMethod('STRIPE')}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: paymentMethod === 'STRIPE' ? '2px solid var(--primary-accent)' : '1px solid var(--border-color)',
                background: paymentMethod === 'STRIPE' ? 'rgba(124, 58, 237, 0.15)' : 'var(--bg-card)',
                color: 'var(--text-main)',
                fontWeight: 700,
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <CreditCard size={18} color="var(--primary-accent)" /> Stripe API
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cards / Apple Pay</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('RAZORPAY')}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: paymentMethod === 'RAZORPAY' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                background: paymentMethod === 'RAZORPAY' ? 'rgba(2, 132, 199, 0.15)' : 'var(--bg-card)',
                color: 'var(--text-main)',
                fontWeight: 700,
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Lock size={18} color="#0284c7" /> Razorpay API
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UPI / Netbanking</span>
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '0.95rem', fontSize: '1rem', marginTop: '1rem' }}>
            {loading ? 'Reserving Stock & Initializing Order...' : `Proceed to ${paymentMethod} Payment Gateway`} <ArrowRight size={20} />
          </button>
        </form>

        {/* Order Summary Box */}
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            Order Summary ({cartItems.length} Items)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                <div>
                  <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.quantity} x ${item.price.toFixed(2)}</span>
                </div>
                <span style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                <span>Discount ({promoCode})</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Express Shipping</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
              <span>Final Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Payment Gateway Modal */}
      {createdOrder && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          orderId={createdOrder.orderId}
          totalAmount={createdOrder.totalAmount}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

    </div>
  );
};
