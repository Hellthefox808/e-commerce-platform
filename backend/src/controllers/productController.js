const { allAsync, getAsync, runAsync } = require('../db/database');
const { logAudit } = require('../middleware/auth');

exports.getProducts = async (req, res) => {
  try {
    const { search, category, brand, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ? OR brand LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (brand) {
      query += ' AND brand = ?';
      params.push(brand);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(parseFloat(maxPrice));
    }

    if (sort === 'price-low') {
      query += ' ORDER BY price ASC';
    } else if (sort === 'price-high') {
      query += ' ORDER BY price DESC';
    } else if (sort === 'rating') {
      query += ' ORDER BY rating DESC';
    } else {
      query += ' ORDER BY created_at DESC';
    }

    const products = await allAsync(query, params);
    const categories = await allAsync('SELECT * FROM categories');

    return res.json({
      success: true,
      data: {
        products,
        categories,
        total: products.length
      }
    });
  } catch (err) {
    console.error('getProducts error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const product = await getAsync('SELECT * FROM products WHERE slug = ? OR id = ?', [req.params.slug, req.params.slug]);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    return res.json({ success: true, data: product });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category, brand, image_url, is_featured = 0 } = req.body;
    if (!title || !price || !category) {
      return res.status(400).json({ success: false, error: 'Title, price, and category are required' });
    }

    const id = `prod_${Date.now()}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await runAsync(
      `INSERT INTO products (id, title, slug, description, price, stock, category, brand, image_url, rating, review_count, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 4.5, 0, ?)`,
      [id, title, slug, description || '', parseFloat(price), parseInt(stock) || 10, category, brand || 'Generic', image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', is_featured ? 1 : 0]
    );

    await logAudit(req.user.id, req.user.name, 'PRODUCT_CREATE', `Created product ${title} ($${price})`, req.ip);

    const newProduct = await getAsync('SELECT * FROM products WHERE id = ?', [id]);
    return res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category, brand, image_url, is_featured } = req.body;
    const { id } = req.params;

    const existing = await getAsync('SELECT * FROM products WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, error: 'Product not found' });

    await runAsync(
      `UPDATE products SET title=?, description=?, price=?, stock=?, category=?, brand=?, image_url=?, is_featured=? WHERE id=?`,
      [
        title || existing.title,
        description || existing.description,
        price !== undefined ? parseFloat(price) : existing.price,
        stock !== undefined ? parseInt(stock) : existing.stock,
        category || existing.category,
        brand || existing.brand,
        image_url || existing.image_url,
        is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
        id
      ]
    );

    await logAudit(req.user.id, req.user.name, 'PRODUCT_UPDATE', `Updated product ${id}`, req.ip);

    const updated = await getAsync('SELECT * FROM products WHERE id = ?', [id]);
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await runAsync('DELETE FROM products WHERE id = ?', [id]);
    await logAudit(req.user.id, req.user.name, 'PRODUCT_DELETE', `Deleted product ${id}`, req.ip);
    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
