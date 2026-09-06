const { allAsync, getAsync, runAsync } = require('../db/database');
const { logAudit } = require('../middleware/auth');

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod = 'STRIPE', promoCode } = req.body;
    if (!items || !items.length || !shippingAddress) {
      return res.status(400).json({ success: false, error: 'Items and shipping address are required' });
    }

    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const qty = parseInt(item.quantity, 10);
      if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({ success: false, error: 'Item quantity must be a positive integer' });
      }

      const product = await getAsync('SELECT * FROM products WHERE id = ?', [item.id]);
      if (!product) {
        return res.status(400).json({ success: false, error: `Product ${item.id} not found` });
      }
      if (product.stock < qty) {
        return res.status(400).json({ success: false, error: `Insufficient stock for ${product.title}` });
      }
      subtotal += product.price * qty;
      validatedItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: qty
      });
    }

    let discount = 0;
    if (promoCode && promoCode.toUpperCase() === 'LUXE10') {
      discount = subtotal * 0.1; // 10% off
    }

    const totalAmount = Math.max(0, subtotal - discount);
    const orderId = `ord_${Date.now()}`;
    const userId = req.user ? req.user.id : 'usr_guest';

    await runAsync(
      `INSERT INTO orders (id, user_id, total_amount, discount_amount, status, payment_method, payment_status, shipping_address)
       VALUES (?, ?, ?, ?, 'PENDING', ?, 'PENDING', ?)`,
      [orderId, userId, totalAmount, discount, paymentMethod, typeof shippingAddress === 'object' ? JSON.stringify(shippingAddress) : shippingAddress]
    );

    for (const vItem of validatedItems) {
      await runAsync(
        `INSERT INTO order_items (id, order_id, product_id, title, price, quantity) VALUES (?, ?, ?, ?, ?, ?)`,
        [`item_${Date.now()}_${Math.floor(Math.random()*1000)}`, orderId, vItem.id, vItem.title, vItem.price, vItem.quantity]
      );

      // Reserve stock
      await runAsync(`UPDATE products SET stock = stock - ? WHERE id = ?`, [vItem.quantity, vItem.id]);
    }

    await logAudit(userId, req.user ? req.user.name : 'Guest', 'ORDER_CREATED', `Order ${orderId} created for $${totalAmount.toFixed(2)}`, req.ip);

    return res.status(201).json({
      success: true,
      data: {
        orderId,
        totalAmount,
        discountAmount: discount,
        status: 'PENDING',
        paymentMethod
      }
    });
  } catch (err) {
    console.error('createOrder error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await allAsync('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);

    for (const order of orders) {
      order.items = await allAsync('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    }

    return res.json({ success: true, data: orders });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await getAsync('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

    order.items = await allAsync('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    return res.json({ success: true, data: order });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid order status' });
    }

    await runAsync('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    await logAudit(req.user.id, req.user.name, 'ORDER_STATUS_UPDATE', `Updated order ${id} status to ${status}`, req.ip);

    const updated = await getAsync('SELECT * FROM orders WHERE id = ?', [id]);
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
