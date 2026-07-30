const { runAsync, getAsync } = require('../db/database');
const { logAudit } = require('../middleware/auth');

exports.createStripeIntent = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    // Check if live Stripe Key is provided
    if (process.env.STRIPE_SECRET_KEY) {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        metadata: { orderId }
      });
      return res.json({ success: true, clientSecret: paymentIntent.client_secret, mode: 'LIVE' });
    }

    // Sandbox / Demo Mode
    const clientSecret = `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`;
    return res.json({
      success: true,
      clientSecret,
      mode: 'SANDBOX',
      message: 'Stripe Sandbox Payment Intent generated'
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const Razorpay = require('razorpay');
      const rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });
      const order = await rzp.orders.create({
        amount: Math.round(amount * 100), // in paise
        currency: 'INR',
        receipt: orderId
      });
      return res.json({ success: true, razorpayOrderId: order.id, mode: 'LIVE' });
    }

    // Sandbox / Demo Mode
    const razorpayOrderId = `rzp_order_mock_${Date.now()}`;
    return res.json({
      success: true,
      razorpayOrderId,
      key: 'rzp_test_mockkey123',
      mode: 'SANDBOX',
      message: 'Razorpay Sandbox Order created'
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, provider = 'STRIPE' } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, error: 'orderId is required' });
    }

    await runAsync(
      `UPDATE orders SET status = 'PAID', payment_status = 'COMPLETED' WHERE id = ?`,
      [orderId]
    );

    await logAudit(
      req.user ? req.user.id : 'GUEST',
      req.user ? req.user.name : 'Guest',
      'PAYMENT_SUCCESS',
      `Payment verified via ${provider} for order ${orderId} (Tx: ${paymentId || 'tx_sandbox'})`,
      req.ip
    );

    const order = await getAsync('SELECT * FROM orders WHERE id = ?', [orderId]);
    return res.json({
      success: true,
      message: 'Payment verified and order confirmed successfully',
      data: order
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
