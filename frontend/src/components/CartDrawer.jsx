import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    totalAmount,
    promoCode,
    applyPromo
  } = useCart();

  const [inputPromo, setInputPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    const res = applyPromo(inputPromo.trim());
    setPromoMessage(res);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
      
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
      />

      {/* Slide Drawer Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: 'var(--bg-card)',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
          zIndex: 1001
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={22} color="var(--primary-accent)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Your Shopping Cart</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '2rem' }}>
              <ShoppingBag size={54} color="var(--text-muted)" style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Your cart is currently empty</p>
              <button onClick={() => setIsCartOpen(false)} className="btn-secondary" style={{ marginTop: '1rem' }}>
                Start Browsing
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '0.85rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <img src={item.image_url} alt={item.title} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h4>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-accent)' }}>
                    ${item.price.toFixed(2)}
                  </span>
                  
                  {/* Quantity Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.2rem 0.5rem', background: 'none', color: 'var(--text-main)' }}>
                        <Minus size={14} />
                      </button>
                      <span style={{ padding: '0 0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.2rem 0.5rem', background: 'none', color: 'var(--text-main)' }}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', color: '#ef4444', marginLeft: 'auto' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Promo Code (e.g. LUXE10)"
                  value={inputPromo}
                  onChange={(e) => setInputPromo(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.2rem', fontSize: '0.85rem' }}
                />
                <Tag size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              <button type="submit" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Apply
              </button>
            </form>

            {promoMessage && (
              <p style={{ fontSize: '0.8rem', color: promoMessage.success ? '#10b981' : '#ef4444', marginBottom: '1rem' }}>
                {promoMessage.message}
              </p>
            )}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                  <span>Promo Discount ({promoCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleProceedCheckout} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>

          </div>
        )}

      </div>

    </div>
  );
};
