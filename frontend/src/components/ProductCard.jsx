import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  return (
    <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.25 ease, box-shadow 0.25s ease' }}>
      
      {/* Image & Wishlist Button */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#000' }}>
        <img
          src={product.image_url}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        
        {/* Wishlist Toggle */}
        <button
          onClick={() => toggleWishlist(product)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorite ? '#ef4444' : '#ffffff',
            transition: 'transform 0.2s'
          }}
        >
          <Heart size={18} fill={isFavorite ? '#ef4444' : 'none'} />
        </button>

        {/* Featured Tag */}
        {product.is_featured === 1 && (
          <span className="badge badge-info" style={{ position: 'absolute', top: '12px', left: '12px' }}>
            Featured
          </span>
        )}
      </div>

      {/* Product Information */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-accent)', textTransform: 'uppercase' }}>
              {product.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: '#f59e0b' }}>
              <Star size={14} fill="#f59e0b" />
              <span>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({product.review_count})</span>
            </div>
          </div>

          <Link to={`/product/${product.slug || product.id}`}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: '1.3', color: 'var(--text-main)' }}>
              {product.title}
            </h3>
          </Link>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
        </div>

      </div>

    </div>
  );
};
