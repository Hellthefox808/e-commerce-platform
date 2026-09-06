const assert = require('assert');
const http = require('http');
const app = require('../server');

// Helper to make test HTTP requests
const httpRequest = ({ hostname, port, path, method = 'GET', headers = {}, body = null }) => {
  return new Promise((resolve, reject) => {
    const reqHeaders = { ...headers };
    let postData = null;

    if (body) {
      postData = JSON.stringify(body);
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(
      {
        hostname,
        port,
        path,
        method,
        headers: reqHeaders
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let parsed = null;
          try {
            parsed = JSON.parse(data);
          } catch (e) {
            parsed = data;
          }
          resolve({ status: res.statusCode, data: parsed });
        });
      }
    );

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};

async function runTestSuite() {
  console.log('🚀 Starting LuxeCommerce Comprehensive Backend Test Suite...\n');

  // Start ephemeral server for testing
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const hostname = '127.0.0.1';

  try {
    // 1. Health check test
    const health = await httpRequest({ hostname, port, path: '/api/health' });
    assert.strictEqual(health.status, 200, 'Health check should return status 200');
    assert.strictEqual(health.data.status, 'OK', 'Health status should be OK');
    console.log('✔ Health check endpoint /api/health PASSED');

    // 2. Root service info test
    const root = await httpRequest({ hostname, port, path: '/' });
    assert.strictEqual(root.status, 200, 'Root endpoint should return status 200');
    assert.strictEqual(root.data.service, 'LuxeCommerce REST API Backend');
    console.log('✔ Root endpoint / service info PASSED');

    // 3. Product Catalog test
    const productsRes = await httpRequest({ hostname, port, path: '/api/v1/products' });
    assert.strictEqual(productsRes.status, 200);
    assert.strictEqual(productsRes.data.success, true);
    assert(Array.isArray(productsRes.data.data.products), 'Products should be an array');
    assert(productsRes.data.data.products.length > 0, 'Catalog should have seeded products');
    const sampleProduct = productsRes.data.data.products[0];
    console.log(`✔ Catalog endpoint PASSED (${productsRes.data.data.products.length} products found)`);

    // 4. Product filtering by category test
    const filteredRes = await httpRequest({ hostname, port, path: `/api/v1/products?category=Electronics` });
    assert.strictEqual(filteredRes.status, 200);
    assert.strictEqual(filteredRes.data.success, true);
    for (const p of filteredRes.data.data.products) {
      assert.strictEqual(p.category, 'Electronics', 'Filtered products should only be Electronics');
    }
    console.log('✔ Catalog filtering by category PASSED');

    // 5. User Registration test
    const testEmail = `test_user_${Date.now()}@luxemarket.com`;
    const regRes = await httpRequest({
      hostname,
      port,
      path: '/api/v1/auth/register',
      method: 'POST',
      body: {
        name: 'Automated Test Runner',
        email: testEmail,
        password: 'password123',
        role: 'CUSTOMER'
      }
    });
    assert.strictEqual(regRes.status, 201, 'Registration should return 201');
    assert.strictEqual(regRes.data.success, true);
    assert(regRes.data.data.token, 'Token should be returned on registration');
    const userToken = regRes.data.data.token;
    const registeredUserId = regRes.data.data.user.id;
    console.log(`✔ User registration endpoint PASSED (User ID: ${registeredUserId})`);

    // 6. User Login test
    const loginRes = await httpRequest({
      hostname,
      port,
      path: '/api/v1/auth/login',
      method: 'POST',
      body: {
        email: testEmail,
        password: 'password123'
      }
    });
    assert.strictEqual(loginRes.status, 200, 'Login should return 200');
    assert.strictEqual(loginRes.data.success, true);
    assert.strictEqual(loginRes.data.data.user.email, testEmail);
    console.log('✔ User login endpoint PASSED');

    // 7. Input validation: invalid registration rejection
    const invalidReg = await httpRequest({
      hostname,
      port,
      path: '/api/v1/auth/register',
      method: 'POST',
      body: {
        name: 'Invalid Email User',
        email: 'invalid-email-format',
        password: 'short'
      }
    });
    assert.strictEqual(invalidReg.status, 400, 'Invalid registration should be rejected with 400');
    console.log('✔ Auth input validation & rejection PASSED');

    // 8. Authenticated Checkout with optionalAuth linking
    const orderRes = await httpRequest({
      hostname,
      port,
      path: '/api/v1/orders/checkout',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      body: {
        items: [{ id: sampleProduct.id, quantity: 1 }],
        shippingAddress: '123 Enterprise Blvd, Suite 100, Silicon Valley, CA 94025',
        paymentMethod: 'STRIPE',
        promoCode: 'LUXE10'
      }
    });
    assert.strictEqual(orderRes.status, 201, 'Checkout should return 201');
    assert.strictEqual(orderRes.data.success, true);
    const createdOrderId = orderRes.data.data.orderId;
    assert(createdOrderId, 'Order ID must be generated');
    console.log(`✔ Authenticated order placement PASSED (Order ID: ${createdOrderId})`);

    // 9. Payment Verification
    const paymentRes = await httpRequest({
      hostname,
      port,
      path: '/api/v1/payments/verify',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      body: {
        orderId: createdOrderId,
        paymentId: 'pi_test_verification_01',
        provider: 'STRIPE'
      }
    });
    assert.strictEqual(paymentRes.status, 200, 'Payment verification should return 200');
    assert.strictEqual(paymentRes.data.success, true);
    assert.strictEqual(paymentRes.data.data.status, 'PAID');
    assert.strictEqual(paymentRes.data.data.payment_status, 'COMPLETED');
    console.log('✔ Payment verification & status transition to PAID PASSED');

    // 10. Order Retrieval & Attribution verification in my-orders
    const myOrdersRes = await httpRequest({
      hostname,
      port,
      path: '/api/v1/orders/my-orders',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    assert.strictEqual(myOrdersRes.status, 200);
    assert.strictEqual(myOrdersRes.data.success, true);
    assert(Array.isArray(myOrdersRes.data.data));
    const matchedOrder = myOrdersRes.data.data.find((o) => o.id === createdOrderId);
    assert(matchedOrder, 'Created order MUST be linked to the registered user in my-orders');
    assert.strictEqual(matchedOrder.user_id, registeredUserId, 'Order user_id must match authenticated user');
    console.log('✔ Authenticated order attribution in my-orders PASSED');

    console.log('\n🎉 ALL 10 Automated Integration Verification Tests PASSED Successfully!');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

if (require.main === module) {
  runTestSuite().catch((err) => {
    console.error('\n❌ Test Suite Failed:', err);
    process.exit(1);
  });
}

module.exports = runTestSuite;
