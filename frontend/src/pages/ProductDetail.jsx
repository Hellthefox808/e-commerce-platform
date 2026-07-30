import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/api';

export const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProductBySlug(slug).then((res) => {
      if (res.success) {
        setProduct(res.data);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/catalog')} className="btn-primary" style={{ marginTop: '1rem' }}>
          Back to Catalog
        </button>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Back Button */}
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: 'var(--text-muted)', fontWeight: 600, width: 'fit-content' }}>
        <ArrowLeft size={18} /> Back
      </button>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        
        {/* Product Image */}
        <div className="glass-panel" style={{ overflow: 'hidden', height: '440px', position: 'relative' }}>
          <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button
            onClick={() => toggleWishlist(product)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isFavorite ? '#ef4444' : '#fff'
            }}
          >
            <Heart size={22} fill={isFavorite ? '#ef4444' : 'none'} />
          </button>
        </div>

        {/* Specs & Buy Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '0.5rem' }}>{product.category}</span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: '1.2' }}>{product.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#f59e0b', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Star size={18} fill="#f59e0b" />
                <span style={{ fontWeight: 700 }}>{product.rating}</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>| {product.review_count} Verified Customer Reviews</span>
              <span style={{ color: 'var(--text-muted)' }}>| Brand: <strong>{product.brand}</strong></span>
            </div>
          </div>

          {/* Price & Stock */}
          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Retail Price</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>${product.price.toFixed(2)}</h2>
            </div>
            <div>
              {product.stock > 0 ? (
                <span className="badge badge-success">In Stock ({product.stock} left)</span>
              ) : (
                <span className="badge badge-danger">Out of Stock</span>
              )}
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.98rem' }}>
            {product.description}
          </p>

          {/* Quantity & CTA */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.5rem' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0.5rem 0.8rem', background: 'none', color: 'var(--text-main)', fontWeight: 700 }}>-</button>
              <span style={{ padding: '0 0.75rem', fontWeight: 700 }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0.5rem 0.8rem', background: 'none', color: 'var(--text-main)', fontWeight: 700 }}>+</button>
            </div>

            <button onClick={handleAdd} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.9rem', fontSize: '1rem' }}>
              {added ? <Check size={20} /> : <ShoppingBag size={20} />}
              {added ? 'Added to Cart!' : `Add ${quantity} to Cart`}
            </button>
          </div>

          {/* Guarantees */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={18} color="var(--primary-accent)" /> 2-Day Express Shipping
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} color="#10b981" /> 2-Year Official Warranty
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
