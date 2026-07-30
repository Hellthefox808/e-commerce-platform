const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const paymentController = require('../controllers/paymentController');
const adminController = require('../controllers/adminController');

const { verifyToken, requireRole } = require('../middleware/auth');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', verifyToken, authController.getMe);

// Product Routes
router.get('/products', productController.getProducts);
router.get('/products/:slug', productController.getProductBySlug);
router.post('/products', verifyToken, requireRole('SELLER', 'ADMIN', 'SUPER_ADMIN'), productController.createProduct);
router.put('/products/:id', verifyToken, requireRole('SELLER', 'ADMIN', 'SUPER_ADMIN'), productController.updateProduct);
router.delete('/products/:id', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), productController.deleteProduct);

// Order Routes
router.post('/orders/checkout', orderController.createOrder); // Allows guest or auth user
router.get('/orders/my-orders', verifyToken, orderController.getUserOrders);
router.get('/orders/:id', orderController.getOrderById);
router.patch('/orders/:id/status', verifyToken, requireRole('SELLER', 'ADMIN', 'SUPER_ADMIN'), orderController.updateOrderStatus);

// Payment Routes
router.post('/payments/stripe/create-intent', paymentController.createStripeIntent);
router.post('/payments/razorpay/create-order', paymentController.createRazorpayOrder);
router.post('/payments/verify', paymentController.verifyPayment);

// Admin & Analytics Routes
router.get('/admin/analytics', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), adminController.getAnalytics);
router.get('/admin/audit-logs', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), adminController.getAuditLogs);
router.get('/admin/orders', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), adminController.getAllOrders);

module.exports = router;
