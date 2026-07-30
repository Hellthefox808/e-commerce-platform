import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, User, LogOut, Sun, Moon, ShieldAlert, Store, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Navbar = ({ theme, toggleTheme }) => {
  const { user, logout, hasRole } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{ background: 'var(--primary-gradient)', padding: '0.6rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={22} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>LUXE</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--primary-accent)' }}>MARKET</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', fontWeight: 500 }}>
          <Link to="/" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }}>Home</Link>
          <Link to="/catalog" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }}>Store Catalog</Link>
          {user && (
            <Link to="/profile" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }}>My Orders</Link>
          )}
          {hasRole('ADMIN', 'SUPER_ADMIN') && (
            <Link to="/admin" style={{ color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldAlert size={16} /> Admin Panel
            </Link>
          )}
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '360px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search audio, watches, apparel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingRight: '2.5rem', borderRadius: '9999px', fontSize: '0.9rem' }}
          />
          <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--text-muted)' }}>
            <Search size={18} />
          </button>
        </form>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          
          {/* Theme Toggle */}
          <button onClick={toggleTheme} title="Toggle Dark/Light Mode" className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {/* Wishlist Link */}
          <Link to="/catalog?wishlist=true" style={{ position: 'relative', color: 'var(--text-main)' }}>
            <Heart size={22} />
            {wishlist.length > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Trigger */}
          <button onClick={() => setIsCartOpen(true)} style={{ position: 'relative', background: 'none', color: 'var(--text-main)' }}>
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: 'var(--primary-accent)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)' }}>
                {itemCount}
              </span>
            )}
          </button>

          {/* User Auth Profile Menu */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.4rem 0.8rem', borderRadius: '9999px', border: '1px solid var(--border-color)' }}>
                <User size={16} color="var(--primary-accent)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} title="Sign Out" style={{ background: 'none', color: 'var(--text-muted)' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/profile" className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>
              Sign In
            </Link>
          )}

        </div>

      </div>
    </header>
  );
};
