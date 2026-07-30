const bcrypt = require('bcryptjs');
const { runAsync, getAsync } = require('./database');

const seedDatabase = async () => {
  console.log('Seeding LuxeCommerce database...');

  // Wait 1 second for schema initialization to finish
  await new Promise((r) => setTimeout(r, 1000));

  // Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('customer123', 10);
  const sellerPassword = await bcrypt.hash('seller123', 10);

  const existingAdmin = await getAsync('SELECT * FROM users WHERE email = ?', ['admin@luxemarket.com']);
  if (!existingAdmin) {
    await runAsync(
      `INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)`,
      ['usr_admin01', 'admin@luxemarket.com', adminPassword, 'System Administrator', 'ADMIN']
    );
    await runAsync(
      `INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)`,
      ['usr_super01', 'superadmin@luxemarket.com', adminPassword, 'Super Administrator', 'SUPER_ADMIN']
    );
    await runAsync(
      `INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)`,
      ['usr_cust01', 'customer@luxemarket.com', customerPassword, 'Alex Morgan', 'CUSTOMER']
    );
    await runAsync(
      `INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)`,
      ['usr_sell01', 'seller@luxemarket.com', sellerPassword, 'Vanguard Tech Vendor', 'SELLER']
    );
    console.log('Users seeded (Admin, Super Admin, Customer, Seller).');
  }

  // Categories
  const categories = [
    { id: 'cat_01', name: 'Electronics', slug: 'electronics', description: 'High performance audio, wearables & computing' },
    { id: 'cat_02', name: 'Fashion & Apparel', slug: 'fashion', description: 'Designer menswear & luxury streetwear' },
    { id: 'cat_03', name: 'Home & Living', slug: 'home-living', description: 'Modern interior decor & ergonomic living' },
    { id: 'cat_04', name: 'Accessories', slug: 'accessories', description: 'Premium timepieces, leather goods & eyewear' }
  ];

  for (const cat of categories) {
    const exists = await getAsync('SELECT * FROM categories WHERE id = ?', [cat.id]);
    if (!exists) {
      await runAsync(
        `INSERT INTO categories (id, name, slug, description) VALUES (?, ?, ?, ?)`,
        [cat.id, cat.name, cat.slug, cat.description]
      );
    }
  }

  // Products
  const products = [
    {
      id: 'prod_01',
      title: 'Aura Studio Wireless ANC Headphones',
      slug: 'aura-studio-wireless-anc-headphones',
      description: 'Active noise cancellation headphones with 40-hour battery life, acoustic acoustic driver tuning, and champagne gold accents.',
      price: 299.99,
      stock: 45,
      category: 'Electronics',
      brand: 'Aura Audio',
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      review_count: 84,
      is_featured: 1
    },
    {
      id: 'prod_02',
      title: 'Vanguard Chronograph Titanium Watch',
      slug: 'vanguard-chronograph-titanium-watch',
      description: 'Precision sapphire crystal timepiece featuring sapphire glass, Swiss automatic movement, and 100m water resistance.',
      price: 649.00,
      stock: 18,
      category: 'Accessories',
      brand: 'Vanguard Luxe',
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      rating: 4.8,
      review_count: 42,
      is_featured: 1
    },
    {
      id: 'prod_03',
      title: 'ErgoComfort Minimalist Mesh Chair',
      slug: 'ergocomfort-minimalist-mesh-chair',
      description: 'Ergonomic lumbar support office chair crafted with breathable high-density mesh and aluminum alloy frame.',
      price: 399.50,
      stock: 22,
      category: 'Home & Living',
      brand: 'ErgoComfort',
      image_url: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=800&auto=format&fit=crop&q=80',
      rating: 4.7,
      review_count: 59,
      is_featured: 1
    },
    {
      id: 'prod_04',
      title: 'Urban Traveler Leather Duffle Bag',
      slug: 'urban-traveler-leather-duffle-bag',
      description: 'Handcrafted full-grain Italian leather carry-on bag with laptop compartment and brass hardware.',
      price: 249.99,
      stock: 30,
      category: 'Fashion & Apparel',
      brand: 'Luxe Goods',
      image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      review_count: 31,
      is_featured: 0
    },
    {
      id: 'prod_05',
      title: 'UltraView 4K OLED Smart Monitor 32"',
      slug: 'ultraview-4k-oled-smart-monitor-32',
      description: 'Quantum-Dot OLED display with 140Hz refresh rate, HDR1000, and USB-C 90W power delivery.',
      price: 899.00,
      stock: 12,
      category: 'Electronics',
      brand: 'UltraView',
      image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      review_count: 112,
      is_featured: 1
    },
    {
      id: 'prod_06',
      title: 'Minimalist Ceramic Espresso Set',
      slug: 'minimalist-ceramic-espresso-set',
      description: 'Matte black ceramic coffee maker and set of 4 thermal cups designed for coffee connoisseurs.',
      price: 85.00,
      stock: 60,
      category: 'Home & Living',
      brand: 'Nordic Home',
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      rating: 4.6,
      review_count: 27,
      is_featured: 0
    }
  ];

  for (const p of products) {
    const exists = await getAsync('SELECT * FROM products WHERE id = ?', [p.id]);
    if (!exists) {
      await runAsync(
        `INSERT INTO products (id, title, slug, description, price, stock, category, brand, image_url, rating, review_count, is_featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.id, p.title, p.slug, p.description, p.price, p.stock, p.category, p.brand, p.image_url, p.rating, p.review_count, p.is_featured]
      );
    }
  }

  // Sample Order
  const existingOrder = await getAsync('SELECT * FROM orders WHERE id = ?', ['ord_demo01']);
  if (!existingOrder) {
    await runAsync(
      `INSERT INTO orders (id, user_id, total_amount, discount_amount, status, payment_method, payment_status, shipping_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['ord_demo01', 'usr_cust01', 549.98, 54.99, 'SHIPPED', 'STRIPE', 'COMPLETED', '124 Fifth Avenue, Suite 400, New York, NY 10001']
    );

    await runAsync(
      `INSERT INTO order_items (id, order_id, product_id, title, price, quantity)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['item_01', 'ord_demo01', 'prod_01', 'Aura Studio Wireless ANC Headphones', 299.99, 1]
    );

    await runAsync(
      `INSERT INTO order_items (id, order_id, product_id, title, price, quantity)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['item_02', 'ord_demo01', 'prod_04', 'Urban Traveler Leather Duffle Bag', 249.99, 1]
    );
  }

  // Audit Logs
  const existingAudit = await getAsync('SELECT * FROM audit_logs WHERE id = ?', ['aud_01']);
  if (!existingAudit) {
    await runAsync(
      `INSERT INTO audit_logs (id, user_id, user_name, action, details, ip_address)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['aud_01', 'usr_admin01', 'System Administrator', 'SYSTEM_INIT', 'Seeded initial database catalog and roles', '127.0.0.1']
    );
    await runAsync(
      `INSERT INTO audit_logs (id, user_id, user_name, action, details, ip_address)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['aud_02', 'usr_admin01', 'System Administrator', 'PRICE_UPDATE', 'Updated UltraView 4K OLED Monitor promotional price', '127.0.0.1']
    );
  }

  console.log('Database seeding complete!');
};

if (require.main === module) {
  seedDatabase().catch(console.error);
}

module.exports = seedDatabase;
