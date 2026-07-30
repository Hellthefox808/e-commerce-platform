import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star, Award } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.getProducts().then((res) => {
      if (res.success) {
        setFeaturedProducts(res.data.products.slice(0, 4));
        setCategories(res.data.categories || []);
      }
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      
      {/* Hero Section */}
      <section className="glass-panel" style={{ padding: '4rem 2rem', position: 'relative', overflow: 'hidden', minHeight: '480px', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '600px', zIndex: 2 }}>
          <span className="badge badge-info" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} /> New Q3 2026 Collection
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Experience Next-Gen Luxury Shopping
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Curated precision electronics, designer timepieces, and modern living accessories with instant Stripe & Razorpay checkout tokenization.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/catalog" className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              Explore Collection <ArrowRight size={20} />
            </Link>
            <Link to="/catalog?category=Electronics" className="btn-secondary" style={{ padding: '0.85rem 1.5rem', fontSize: '1rem' }}>
              View Audio Gear
            </Link>
          </div>
        </div>

        {/* Hero Background Decor */}
        <div
          style={{
            position: 'absolute',
            right: '-10%',
            top: '-20%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(0, 0, 0, 0) 70%)',
            pointerEvents: 'none',
            borderRadius: '50%'
          }}
        />
      </section>

      {/* Featured Categories */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Shop by Department</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Browse curated categories designed for discerning tastes</p>
          </div>
          <Link to="/catalog" style={{ color: 'var(--primary-accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${encodeURIComponent(cat.name)}`}
              className="glass-panel"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--primary-accent)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>{cat.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Featured Masterpieces</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Top-rated items handpicked for quality and craftsmanship</p>
          </div>
          <Link to="/catalog" style={{ color: 'var(--primary-accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            View Full Catalog <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Platform Features / Portfolio Showcase Banner */}
      <section className="glass-panel" style={{ padding: '3rem 2rem', background: 'linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(31,41,55,0.9) 100%)', textAlign: 'center' }}>
        <Award size={48} color="var(--primary-accent)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Built with Clean Architecture & Domain-Driven Design</h2>
        <p style={{ maxWidth: '720px', margin: '0 auto 2rem auto', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          LuxeCommerce showcases enterprise software patterns including strict layered decoupling, JWT role-based security, SQLite & MongoDB ORM persistence, dual Stripe/Razorpay payment adapters, and real-time audit logging.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <Zap color="#f59e0b" size={18} /> Sub-300ms REST APIs
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ShieldCheck color="#10b981" size={18} /> OWASP Top 10 Protected
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <Star color="#6366f1" size={18} /> 22 Technical Specs in /docs
          </div>
        </div>
      </section>

    </div>
  );
};
