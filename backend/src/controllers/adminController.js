const { allAsync, getAsync } = require('../db/database');

exports.getAnalytics = async (req, res) => {
  try {
    const totalSalesRow = await getAsync(`SELECT SUM(total_amount) as totalRevenue, COUNT(*) as totalOrders FROM orders WHERE payment_status = 'COMPLETED' OR status != 'CANCELLED'`);
    const totalUsersRow = await getAsync(`SELECT COUNT(*) as totalUsers FROM users`);
    const totalProductsRow = await getAsync(`SELECT COUNT(*) as totalProducts FROM products`);
    const lowStockProducts = await allAsync(`SELECT id, title, stock FROM products WHERE stock <= 20 ORDER BY stock ASC`);
    const recentOrders = await allAsync(`SELECT * FROM orders ORDER BY created_at DESC LIMIT 5`);

    // Chart mock dataset / aggregated series
    const salesTrend = [
      { month: 'Jan', revenue: 4200 },
      { month: 'Feb', revenue: 5800 },
      { month: 'Mar', revenue: 7100 },
      { month: 'Apr', revenue: 6400 },
      { month: 'May', revenue: 8900 },
      { month: 'Jun', revenue: 11200 },
      { month: 'Jul', revenue: (totalSalesRow.totalRevenue || 0) + 9500 }
    ];

    return res.json({
      success: true,
      data: {
        totalRevenue: totalSalesRow.totalRevenue || 0,
        totalOrders: totalSalesRow.totalOrders || 0,
        totalUsers: totalUsersRow.totalUsers || 0,
        totalProducts: totalProductsRow.totalProducts || 0,
        lowStockAlerts: lowStockProducts,
        recentOrders,
        salesTrend
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await allAsync('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 50');
    return res.json({ success: true, data: logs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await allAsync('SELECT * FROM orders ORDER BY created_at DESC');
    for (const order of orders) {
      order.items = await allAsync('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    }
    return res.json({ success: true, data: orders });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
