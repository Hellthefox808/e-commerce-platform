const http = require('http');
const app = require('../backend/server');

async function runBenchmark() {
  const PORT = 5002;
  const server = app.listen(PORT, async () => {
    console.log(`🚀 Benchmark server listening on port ${PORT}`);
    try {
      const results = {};

      // Benchmark 1: Health endpoint (/api/health)
      console.log('⚡ Benchmarking /api/health (200 requests, concurrency 10)...');
      results.health = await benchmarkEndpoint(`http://127.0.0.1:${PORT}/api/health`, 200, 10);

      // Benchmark 2: Products endpoint (/api/v1/products)
      console.log('⚡ Benchmarking /api/v1/products (100 requests, concurrency 5)...');
      results.products = await benchmarkEndpoint(`http://127.0.0.1:${PORT}/api/v1/products`, 100, 5);

      // Memory footprint
      const mem = process.memoryUsage();
      results.memory = {
        rssMB: (mem.rss / 1024 / 1024).toFixed(2),
        heapTotalMB: (mem.heapTotal / 1024 / 1024).toFixed(2),
        heapUsedMB: (mem.heapUsed / 1024 / 1024).toFixed(2),
        externalMB: (mem.external / 1024 / 1024).toFixed(2)
      };

      console.log('\n📊 === EMPIRICAL BENCHMARK METRICS ===');
      console.log(JSON.stringify(results, null, 2));

      server.close(() => {
        console.log('Benchmark server stopped.');
        process.exit(0);
      });
    } catch (err) {
      console.error('Benchmark failed:', err);
      server.close(() => process.exit(1));
    }
  });
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const duration = performance.now() - start;
        resolve({ statusCode: res.statusCode, duration });
      });
    }).on('error', reject);
  });
}

async function benchmarkEndpoint(url, totalRequests, concurrency) {
  const latencies = [];
  let completed = 0;
  let errors = 0;
  const overallStart = performance.now();

  async function worker() {
    while (completed < totalRequests) {
      completed++;
      try {
        const res = await makeRequest(url);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          latencies.push(res.duration);
        } else {
          errors++;
        }
      } catch (err) {
        errors++;
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  const totalTimeMs = performance.now() - overallStart;

  latencies.sort((a, b) => a - b);
  const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;
  const avg = latencies.reduce((acc, v) => acc + v, 0) / latencies.length;
  const rps = (latencies.length / (totalTimeMs / 1000)).toFixed(2);

  return {
    totalRequests,
    successfulRequests: latencies.length,
    failedRequests: errors,
    totalTimeMs: totalTimeMs.toFixed(2),
    rps: Number(rps),
    avgMs: Number(avg.toFixed(2)),
    p50Ms: Number(p50.toFixed(2)),
    p95Ms: Number(p95.toFixed(2)),
    p99Ms: Number(p99.toFixed(2))
  };
}

runBenchmark();
