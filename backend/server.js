require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./src/routes/api');
const seedDatabase = require('./src/db/seed');
const errorHandler = require('./src/middleware/errorHandler');
const rateLimiter = require('./src/middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middlewares
const corsOrigin = process.env.CORS_ORIGIN 
  ? (process.env.CORS_ORIGIN.includes(',') ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) : process.env.CORS_ORIGIN)
  : '*';

app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Rate Limiting (150 requests per 15 minutes on business endpoints)
app.use('/api/v1/', rateLimiter({ windowMs: 15 * 60 * 1000, max: 150 }));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Root & Health check endpoints
app.get('/', (req, res) => {
  res.json({
    service: 'LuxeCommerce REST API Backend',
    status: 'ACTIVE',
    version: '1.0.0',
    health: '/api/health',
    api_docs: 'https://github.com/Hellthefox808/Full-Stack-E-Commerce-Development/blob/main/docs/10-api-contract.yaml'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'LuxeCommerce REST API Server',
    timestamp: new Date().toISOString()
  });
});

// Mount API Routes
app.use('/api/v1', apiRoutes);

// Global Error Handler
app.use(errorHandler);

// Start DB seed automatically on startup if database is empty
seedDatabase().catch((err) => console.error('Seed error:', err));

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`LuxeCommerce Backend Server listening on http://localhost:${PORT}`);
  });

  const shutdown = () => {
    console.log('Received termination signal, shutting down gracefully...');
    server.close(() => {
      console.log('Closed all active HTTP connections.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

module.exports = app;

