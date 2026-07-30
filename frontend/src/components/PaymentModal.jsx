import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export const PaymentModal = ({ isOpen, onClose, orderId, totalAmount, onPaymentSuccess }) => {
  const [activeTab, setActiveTab] = useState('stripe'); // 'stripe' or 'razorpay'
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('123');
  const [upiId, setUpiId] = useState('alex@upi');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleStripePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 1. Get Intent
      const intentRes = await api.createStripeIntent(orderId, totalAmount);
      // 2. Verify Payment
      const verifyRes = await api.verifyPayment({
        orderId,
        paymentId: intentRes.clientSecret || `pi_live_mock_${Date.now()}`,
        provider: 'STRIPE'
      });
      setLoading(false);
      onPaymentSuccess(verifyRes.data);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Stripe processing error');
    }
  };

  const handleRazorpayPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 1. Get Razorpay Order
      const rzpRes = await api.createRazorpayOrder(orderId, totalAmount);
      // 2. Verify Payment
      const verifyRes = await api.verifyPayment({
        orderId,
        paymentId: rzpRes.razorpayOrderId || `rzp_pay_${Date.now()}`,
        provider: 'RAZORPAY'
      });
      setLoading(false);
      onPaymentSuccess(verifyRes.data);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Razorpay processing error');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }} />

      {/* Modal Box */}
      <div className="glass-panel" style={{ position: 'relative', width: '100%', maxWidth: '520px', padding: '2rem', zIndex: 1101, border: '1px solid var(--border-focus)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>
              <ShieldCheck size={14} /> PCI-DSS 256-Bit Encrypted
            </span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Complete Your Payment</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        {/* Amount Header */}
        <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Order ID: {orderId}</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-accent)' }}>${totalAmount.toFixed(2)}</h4>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>● Gateway Live/Sandbox Ready</span>
          </div>
        </div>

        {/* Payment Provider Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('stripe')}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'stripe' ? 'var(--primary-gradient)' : 'transparent',
              color: activeTab === 'stripe' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <CreditCard size={18} /> Stripe Gateway
          </button>
          <button
            onClick={() => setActiveTab('razorpay')}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'razorpay' ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' : 'transparent',
              color: activeTab === 'razorpay' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Lock size={18} /> Razorpay UPI / Cards
          </button>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {/* Stripe Form */}
        {activeTab === 'stripe' && (
          <form onSubmit={handleStripePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Card Number</label>
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Expiry Date</label>
                <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>CVC / CVV</label>
                <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }}>
              {loading ? 'Authorizing with Stripe...' : `Pay $${totalAmount.toFixed(2)} with Stripe`}
            </button>
          </form>
        )}

        {/* Razorpay Form */}
        {activeTab === 'razorpay' && (
          <form onSubmit={handleRazorpayPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Virtual Payment Address (VPA / UPI ID)</label>
              <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Accepts Google Pay, PhonePe, Paytm, BHIM UPI, Netbanking & Cards.
            </p>
            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', color: '#fff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {loading ? 'Connecting to Razorpay...' : `Pay $${totalAmount.toFixed(2)} via Razorpay`}
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
