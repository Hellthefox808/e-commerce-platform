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
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Rate Limiting (100 requests per 15 minutes)
app.use('/api/', rateLimiter({ windowMs: 15 * 60 * 1000, max: 150 }));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Mount API Routes
app.use('/api/v1', apiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'LuxeCommerce REST API Server',
    timestamp: new Date().toISOString()
  });
});

// Global Error Handler
app.use(errorHandler);

// Start DB seed automatically on startup if database is empty
seedDatabase().catch((err) => console.error('Seed error:', err));

app.listen(PORT, () => {
  console.log(`LuxeCommerce Backend Server listening on http://localhost:${PORT}`);
});
