import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)', padding: '4rem 2rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Value Proposition Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Truck size={32} color="var(--primary-accent)" />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Express Global Shipping</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Free delivery on orders over $150</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShieldCheck size={32} color="#10b981" />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>2-Year Luxe Guarantee</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>100% authentic verified products</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Lock size={32} color="#f59e0b" />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Stripe & Razorpay Secure</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>256-bit encrypted checkout tokenization</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <RotateCcw size={32} color="#6366f1" />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>30-Day Easy Returns</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hassle-free instant refund policy</p>
            </div>
          </div>
        </div>

        {/* Links & Copyright */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', paddingTop: '2.5rem' }}>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>LUXE</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 300, color: 'var(--primary-accent)' }}>MARKET</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              © 2026 LuxeCommerce Inc. All Rights Reserved. Clean Architecture & DDD Portfolio Showcase.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <a href="/docs/01-prd.md" target="_blank">PRD Spec</a>
            <a href="/docs/06-system-architecture.md" target="_blank">Architecture</a>
            <a href="/docs/11-security.md" target="_blank">Security Matrix</a>
            <a href="/docs/10-api-contract.yaml" target="_blank">API OpenAPI</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
