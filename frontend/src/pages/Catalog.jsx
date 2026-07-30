import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal, Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/api';

export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('newest');
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(searchParams.get('wishlist') === 'true');

  useEffect(() => {
    setLoading(true);
    api.getProducts({
      search,
      category: selectedCategory === 'All' ? '' : selectedCategory,
      sort
    }).then((res) => {
      if (res.success) {
        setProducts(res.data.products || []);
        setCategories(['All', ...(res.data.categories || []).map(c => c.name)]);
      }
      setLoading(false);
    });
  }, [search, selectedCategory, sort]);

  const displayedProducts = showOnlyWishlist
    ? wishlist
    : products;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {showOnlyWishlist ? 'Your Favorites Wishlist' : 'Store Catalog & Collection'}
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {showOnlyWishlist ? `Showing ${wishlist.length} saved products` : `Discover ${products.length} luxury items with real-time stock verification`}
        </p>
      </div>

      {/* Control Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Category Filter Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowOnlyWishlist(false);
              }}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: selectedCategory === cat && !showOnlyWishlist ? 'var(--primary-gradient)' : 'var(--bg-card)',
                color: selectedCategory === cat && !showOnlyWishlist ? '#ffffff' : 'var(--text-main)',
                border: '1px solid var(--border-color)',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setShowOnlyWishlist(!showOnlyWishlist)}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: showOnlyWishlist ? '#ef4444' : 'var(--bg-card)',
              color: showOnlyWishlist ? '#ffffff' : '#ef4444',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Heart size={15} fill={showOnlyWishlist ? '#fff' : 'none'} /> Wishlist ({wishlist.length})
          </button>
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={18} color="var(--text-muted)" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ fontSize: '0.85rem' }}>
            <option value="newest">Sort: Newest Arrival</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading catalog products...
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <ShoppingBag size={54} color="var(--text-muted)" style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>No products found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search term or category filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
