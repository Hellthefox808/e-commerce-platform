const assert = require('assert');
const http = require('http');

// Helper to make test HTTP GET requests
const httpGet = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
    }).on('error', reject);
  });
};

async function runTests() {
  console.log('Running LuxeCommerce Backend Automated Tests...');

  try {
    // 1. Health check test
    const health = await httpGet('http://localhost:5000/api/health');
    assert.strictEqual(health.status, 200);
    assert.strictEqual(health.data.status, 'OK');
    console.log('✔ Health Check Test PASSED');

    // 2. Product Catalog test
    const products = await httpGet('http://localhost:5000/api/v1/products');
    assert.strictEqual(products.status, 200);
    assert.strictEqual(products.data.success, true);
    assert(Array.isArray(products.data.data.products));
    console.log(`✔ Catalog Endpoint Test PASSED (${products.data.data.products.length} items found)`);

    console.log('\nAll Automated API Verification Tests PASSED successfully!');
    process.exit(0);
  } catch (err) {
    console.error('✖ Test Failed:', err.message);
    process.exit(1);
  }
}

// Only run if server is listening
runTests();
